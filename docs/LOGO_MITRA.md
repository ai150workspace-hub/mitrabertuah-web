# Logo Mitra Pembiayaan

Catatan internal sumber file logo di `public/logo-mitra/` (dipakai `components/PartnerLogos.tsx`,
data di `lib/mitra.ts`). Rujukan kalau enam bulan lagi perlu ganti/cek ulang file.

**Konteks izin:** section ini adalah pengecualian eksplisit dari "Aturan Mutlak #7" (nama/logo
mitra tidak ditampilkan tanpa izin tertulis, lihat `lib/site-config.ts`) — diizinkan lewat
`PROMPT_LOGO_MITRA_mitrabertuah.md` karena Mitra Bertuah adalah agen resmi terdaftar kelima
perusahaan ini dan sudah bertemu perwakilan masing-masing.

| Perusahaan | File | Dari mana didapat | Tanggal | Dasar kerja sama |
|---|---|---|---|---|
| PT BFI Finance Indonesia Tbk | `bfi.png` | Logo header situs resmi bfi.co.id (`/static/images/logo-bfi.png`) | 2026-08-30 | Agen resmi terdaftar; sudah bertemu perwakilan BFI. Resolusi asli cuma 70x70px — satu-satunya versi tersedia di situs resmi, ganti kalau ada file lebih tinggi dari owner. |
| PT Adira Dinamika Multi Finance Tbk | `adira.png` | Logo header situs resmi adira.co.id (`/logo-adira-header.png`) | 2026-08-30 | Agen resmi terdaftar; sudah bertemu perwakilan Adira Finance. |
| PT Mandiri Utama Finance | `muf.png` | Logo footer situs resmi muf.co.id | 2026-08-30 | Agen resmi terdaftar; MUF secara eksplisit menginstruksikan agennya memasarkan lewat website dan menampilkan citra sebagai "Mitra MUF" — lihat materi sosialisasi program mitra MUF 2026, slide 6. |
| PT Toyota Astra Financial Services | `taf.svg` | Logo header situs resmi taf.co.id (`/files/site/logo-taff.svg`) | 2026-08-30 | Agen resmi terdaftar; sudah bertemu perwakilan TAF. |
| PT Astra Sedaya Finance (ACC) | `acc.png` | Logo footer situs resmi acc.co.id | 2026-08-30 | Agen resmi terdaftar; sudah bertemu perwakilan ACC. Logo maskot lama (100x124px) tapi masih aktif dipakai di footer situs resmi mereka saat ini. |

## Batas yang berlaku

- Semua file diunduh langsung dari situs resmi masing-masing perusahaan — bukan dari Google
  Images, agregator, atau situs kompetitor.
- Tidak ada logo yang dibuat ulang/ditiru — kalau salah satu tidak ketemu di situs resmi, entri
  itu dilewati (tidak terjadi untuk kelima mitra ini, semua ketemu).
- Kalau owner punya file logo resolusi lebih tinggi (terutama BFI & ACC), ganti file di
  `public/logo-mitra/` dan update baris "Dari mana didapat" di tabel ini.
