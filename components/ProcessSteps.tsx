const STEPS = [
  { desc: "Ceritakan kendaraan Anda — isi journey kelayakan atau hubungi kami langsung." },
  { desc: "Kami cek kelayakan awal — usia kendaraan dan estimasi plafon, dalam hitungan detik." },
  { desc: "Pengajuan diteruskan ke perusahaan pembiayaan mitra — berkas Anda kami kirim di hari yang sama." },
  { desc: "Survei dan keputusan mengikuti proses mereka — besaran pencairan sepenuhnya di tangan mereka." },
] as const;

// Nomor besar, tipografi kuat — bukan empat kartu korporat (redesign
// brief). Langkah 03 & 04 sengaja menegaskan keputusan ada di
// perusahaan pembiayaan, bukan di kami.
export function ProcessSteps() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center">Cara Kerjanya</h2>

        <div className="mt-12 space-y-10">
          {STEPS.map(({ desc }, i) => (
            <div key={desc} className="flex items-start gap-5 sm:gap-8">
              <span className="font-heading text-4xl font-extrabold text-primary/30 sm:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-lg font-medium sm:mt-3">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
