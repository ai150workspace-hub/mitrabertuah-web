"use server";

// Satu-satunya jalur tulis dari landing page ke Supabase. Urutan wajib
// (§8 build spec): validasi -> anti-bot -> rate limit -> intake_web_lead()
// lewat service role. Simpan dulu, baru klien diarahkan ke WhatsApp.
import { headers } from "next/headers";
import { leadFormSchema, type LeadFormInput } from "@/schemas/lead";
import { normalizePhoneLocal } from "@/lib/phone";
import { CONSENT_TEXT_VERSION } from "@/lib/consent";
import { checkRateLimit, hashIp } from "@/lib/rate-limit";
import { createServiceRoleClient } from "@/lib/supabase-server";

export interface SubmitLeadInput extends LeadFormInput {
  /** Dibuat sekali di klien saat form dimuat — sama untuk retry submit yang sama. */
  idempotencyKey: string;
  recaptchaToken: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  fbclid?: string;
  landingPage?: string;
  referrer?: string;
}

export interface SubmitLeadResult {
  success: boolean;
  hasil?: "kontak_baru" | "cocok_kontak_lama" | "tertahan_dnc";
  submissionId?: string;
  error?: string;
}

async function verifyRecaptcha(token: string, remoteIp: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    // Belum dikonfigurasi (mis. saat build/uji jalur data di Fase 2,
    // sebelum widget klien dipasang di Fase 5). Jangan blokir diam-diam
    // di produksi — env ini wajib ada sebelum publish, lihat §17 DoD.
    console.warn("[submit-lead] RECAPTCHA_SECRET_KEY belum diset, verifikasi dilewati.");
    return true;
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: remoteIp }),
    });
    const data = (await res.json()) as { success: boolean; score?: number };
    // v3 mengembalikan skor 0-1. 0.5 ambang umum Google; di bawah itu
    // kemungkinan besar bot.
    return data.success && (data.score === undefined || data.score >= 0.5);
  } catch (err) {
    console.error("[submit-lead] verifikasi reCAPTCHA gagal dipanggil:", err);
    return false;
  }
}

export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  const parsed = leadFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Data yang diisi belum lengkap atau tidak valid." };
  }
  const form = parsed.data;

  // Honeypot: field tersembunyi di UI. Bot yang mengisi otomatis biasanya
  // mengisi semua field di DOM. Tolak diam-diam — balas sukses palsu
  // supaya bot tidak tahu ditolak, TANPA menyimpan apa pun (§9).
  if (form.website) {
    return { success: true, hasil: "kontak_baru" };
  }

  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const userAgent = h.get("user-agent") || "";

  const recaptchaOk = await verifyRecaptcha(input.recaptchaToken, remoteIp);
  if (!recaptchaOk) {
    return { success: false, error: "Verifikasi keamanan gagal. Silakan coba lagi." };
  }

  const ipHash = hashIp(remoteIp);
  const withinLimit = await checkRateLimit(ipHash);
  if (!withinLimit) {
    return {
      success: false,
      error: "Terlalu banyak pengajuan dari perangkat ini. Coba lagi dalam beberapa saat.",
    };
  }

  const normalizedPhone = normalizePhoneLocal(form.noHp);
  if (!normalizedPhone) {
    return { success: false, error: "Nomor HP tidak valid." };
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .rpc("intake_web_lead", {
      p: {
        nama: form.nama,
        no_hp: normalizedPhone,
        jenis_kendaraan: form.jenisKendaraan,
        merk_tipe: form.merkTipe || null,
        tahun_kendaraan: form.tahunKendaraan,
        domisili_kota: form.domisiliKota,
        kecamatan: form.kecamatan || null,
        keperluan_dana: form.keperluanDana || null,
        catatan: form.catatan || null,
        estimasi_nilai_kendaraan: form.estimasiNilaiKendaraan ?? null,
        tenor_diminta_bulan: form.tenorDimintaBulan ?? null,
        utm_source: input.utmSource || null,
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        utm_content: input.utmContent || null,
        utm_term: input.utmTerm || null,
        gclid: input.gclid || null,
        fbclid: input.fbclid || null,
        landing_page: input.landingPage || null,
        referrer: input.referrer || null,
        user_agent: userAgent,
        consent_given: true,
        consent_text_version: CONSENT_TEXT_VERSION,
        ip_hash: ipHash,
        idempotency_key: input.idempotencyKey,
      },
    })
    .single();

  if (error) {
    console.error("[submit-lead] intake_web_lead gagal:", error.message);
    return { success: false, error: "Gagal menyimpan pengajuan. Silakan coba lagi." };
  }

  const row = data as { submission_id: string | null; contact_id: string | null; hasil: string };
  return {
    success: true,
    hasil: row.hasil as SubmitLeadResult["hasil"],
    submissionId: row.submission_id ?? undefined,
  };
}
