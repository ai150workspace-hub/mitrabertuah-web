// Penerima Supabase Database Webhook — dipanggil trigger di
// bertuah-crm (migrasi 0014) setiap ada insert baru di
// web_lead_submissions. Lihat §5.7 build spec.
//
// PENTING: endpoint ini dipanggil dari Postgres (pg_net), bukan dari
// browser pengunjung. Jangan pernah melonggarkan pengecekan secret di
// bawah — tanpa itu siapa pun yang tahu URL-nya bisa memicu notifikasi
// palsu (atau, kalau logikanya diperluas nanti, memicu efek lain).
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceRoleClient } from "@/lib/supabase-server";

interface WebhookPayload {
  submission_id: string;
  contact_id: string | null;
  nama: string;
  no_hp: string;
  jenis_kendaraan: string;
  tahun_kendaraan: number | null;
  domisili_kota: string;
  keperluan_dana: string | null;
  hasil_intake: "kontak_baru" | "cocok_kontak_lama" | "tertahan_dnc";
}

function verifySecret(req: NextRequest): boolean {
  const expected = process.env.LEAD_WEBHOOK_SECRET;
  if (!expected) return false; // tidak ada secret = tolak, bukan lewatkan
  return req.headers.get("x-webhook-secret") === expected;
}

async function buildMessage(payload: WebhookPayload): Promise<string> {
  const baris = [
    `Lead baru dari mitrabertuah.com`,
    ``,
    `Nama: ${payload.nama}`,
    `No. HP: ${payload.no_hp}`,
    `Kendaraan: ${payload.jenis_kendaraan}${payload.tahun_kendaraan ? ` (${payload.tahun_kendaraan})` : ""}`,
    `Kota: ${payload.domisili_kota}`,
    `Keperluan dana: ${payload.keperluan_dana || "-"}`,
  ];

  if (payload.hasil_intake === "kontak_baru") {
    baris.push(``, `Status: KONTAK BARU.`);
  } else if (payload.hasil_intake === "tertahan_dnc") {
    baris.push(``, `Status: TERTAHAN — nomor ini ada di daftar jangan-hubungi. Tidak dibuatkan kontak baru.`);
  } else {
    // cocok_kontak_lama — wajib sebut kontak sudah ada dan siapa agennya,
    // supaya nasabah tidak ditelepon dua orang (§5.7).
    baris.push(``, `Status: KONTAK SUDAH ADA sebelumnya.`);
    if (payload.contact_id) {
      const supabase = createServiceRoleClient();
      const { data: contact } = await supabase
        .from("contacts")
        .select("assigned_to, users:assigned_to(name)")
        .eq("id", payload.contact_id)
        .maybeSingle();

      const agentName = (contact?.users as { name?: string } | null)?.name;
      baris.push(
        agentName
          ? `Sudah ditangani agen: ${agentName}. Jangan dihubungi agen lain.`
          : `Belum ada agen yang menangani kontak ini.`
      );
    }
  }

  return baris.join("\n");
}

export async function POST(req: NextRequest) {
  if (!verifySecret(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = (await req.json()) as WebhookPayload;
  const message = await buildMessage(payload);

  const resendApiKey = process.env.RESEND_API_KEY;
  const target = process.env.ADMIN_NOTIFY_TARGET;

  if (!resendApiKey || !target) {
    // Belum dikonfigurasi (mis. sebelum owner membuat akun Resend dan
    // mengisi ADMIN_NOTIFY_TARGET). Jangan gagalkan trigger di sisi
    // database — cukup catat di log server supaya lead tidak "hilang
    // diam-diam", tapi juga tidak membuat pg_net menganggap ini error.
    console.warn("[lead-notify] RESEND_API_KEY/ADMIN_NOTIFY_TARGET belum diset. Isi pesan:\n" + message);
    return NextResponse.json({ success: true, sent: false, reason: "not_configured" });
  }

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: "Mitra Bertuah <notifikasi@mitrabertuah.com>",
      to: target.split(",").map((s) => s.trim()),
      subject: `Lead baru: ${payload.nama} (${payload.hasil_intake})`,
      text: message,
    });
    return NextResponse.json({ success: true, sent: true });
  } catch (err) {
    console.error("[lead-notify] Gagal mengirim email:", err);
    // Tetap 200 — lead sudah tersimpan sebelum trigger ini jalan, gagal
    // notifikasi tidak boleh terlihat sebagai kegagalan submission.
    return NextResponse.json({ success: false, sent: false, error: "send_failed" });
  }
}
