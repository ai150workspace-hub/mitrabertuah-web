# Prosedur permintaan hapus data pribadi

Dokumen ini prosedur MANUAL untuk admin — bukan fitur otomatis di situs.
Mekanismenya (fungsi SQL `hapus_data_pribadi`) ada di
`bertuah-crm/supabase/migrations/0019_hapus_data_pribadi.sql`. Ini bagian
teknis dari janji di [Kebijakan Privasi](/kebijakan-privasi) bagian 7-8
("Hak Anda" / "Cara menggunakan hak Anda") — lihat
`content/kebijakan-privasi.ts`.

**Dokumen ini bukan nasihat hukum.** Batas waktu tanggapan dan beberapa
detail lain di Kebijakan Privasi masih menunggu jawaban penasihat hukum
(ditandai `[[TANYA PENGACARA: ...]]` di sumbernya) — begitu dijawab,
perbarui juga langkah 5 di bawah kalau ada batas waktu yang wajib
dipatuhi.

## 1. Siapa yang menerima permintaan

Permintaan masuk lewat WhatsApp atau email resmi (lihat
`content/kebijakan-privasi.ts` bagian 1 dan 8 untuk kontak yang sudah
dikonfirmasi owner). Siapa pun di tim yang menerimanya meneruskan ke
**admin** (pemegang akses Supabase / CRM) — hanya admin yang menjalankan
langkah 4.

## 2. Cara memastikan identitas pemohon

Sebelum menjalankan penghapusan apa pun, admin memastikan pemohon
memang pemilik nomor yang dimaksud. Cara paling sederhana dan cukup
untuk konteks ini (bukan transaksi finansial, cuma menghapus data
pribadi milik nomor itu sendiri):

- Permintaan **dikirim dari nomor WhatsApp yang sama** dengan nomor yang
  mau dihapus datanya — ini cukup, karena permintaan hapus hanya
  berakibat pada nomor pengirim sendiri.
- Kalau permintaan datang lewat email atau dari nomor lain (mis. mewakili
  keluarga), admin meminta konfirmasi balik ke nomor yang terdaftar di
  `contacts.no_hp` / `web_lead_submissions.no_hp` sebelum lanjut.

Jangan jalankan penghapusan berdasarkan nomor yang **disebutkan** dalam
pesan tapi tidak bisa dipastikan pengirimnya — itu bisa dipakai orang
lain untuk menghapus data orang yang tidak memintanya.

## 3. Apa yang dijalankan

Admin menjalankan lewat Supabase SQL Editor (atau tool admin CRM kalau
sudah ada pembungkusnya nanti):

```sql
select * from public.hapus_data_pribadi('0812xxxxxxxx');
```

Ganti dengan nomor HP pemohon, format apa saja (fungsi menormalkannya
sendiri, sama seperti `intake_web_lead`).

**Yang terjadi di dalam fungsi** (lihat migrasi 0019 untuk detail):

- Baris di `contacts` dan `web_lead_submissions` milik nomor itu
  **dianonimkan** (nama, no HP, catatan bebas teks diganti/dikosongkan),
  **bukan dihapus** — supaya statistik agregat (mis. laporan jumlah
  pengajuan per bulan, per jenis kendaraan) tetap benar tanpa lagi
  bisa dikaitkan ke orang itu.
- Nomornya **ditambahkan ke `do_not_contact`** (alasan "Diminta
  Nasabah") kalau belum ada di sana — supaya tidak ditelepon ulang lewat
  impor data berikutnya. Baris `do_not_contact` **tidak pernah dihapus**
  oleh fungsi ini, termasuk untuk nomor yang sama diminta hapus lagi.

Fungsi mengembalikan berapa baris yang terpengaruh — kalau
`contacts_dianonimkan` dan `submissions_dianonimkan` sama-sama 0, cek
lagi apakah nomornya sudah benar sebelum menganggap permintaan selesai
(bisa juga nomor itu memang belum pernah mengisi apa pun).

## 4. Cara dicatat

Setiap permintaan dicatat admin di tempat pencatatan internal tim
(spreadsheet log atau setara) dengan minimal:

- Tanggal permintaan diterima, dan lewat kanal apa (WhatsApp/email)
- Nomor HP yang diminta dihapus
- Tanggal fungsi `hapus_data_pribadi` dijalankan, dan hasil baris yang
  dikembalikan (`contacts_dianonimkan`, `submissions_dianonimkan`,
  `ditambahkan_ke_dnc`)
- Admin yang menjalankan

Catatan ini bukti kepatuhan kalau suatu saat diminta menunjukkan bahwa
permintaan memang ditindaklanjuti — bukan formalitas kosong.

## 5. Batas waktu tanggapan

Belum ditentukan — menunggu jawaban penasihat hukum soal batas waktu
yang diwajibkan UU PDP (lihat bagian 8 `content/kebijakan-privasi.ts`).
Sampai dijawab, tindak lanjuti permintaan **secepat yang wajar**, jangan
menunda tanpa alasan.
