# Tryout TKA Merdeka v4 — Panduan (kisi-kisi → template soal → terbit; data siswa & identitas)

## Alur kerja

```
Guru isi Template_Kisi_Kisi.docx
        │  (Langkah 1, admin.html) unggah → validasi → simpan ke Supabase
        ▼
Aplikasi membuatkan Template_Soal_<KODE>.docx  ← sudah terisi: nomor, varian, bentuk,
        │                                          kompetensi/sub-materi, indikator, level
        ▼
Guru isi perintah soal, pertanyaan, pilihan, kunci, pembahasan
        │  (Langkah 2, admin.html) unggah → dicocokkan dengan kisi-kisi di server → pratinjau
        ▼
Terbitkan → tautan/QR untuk siswa (index.html?ujian=KODE) → hasil & analisis di dasbor guru
```

Isi folder:

| Berkas | Fungsi |
|---|---|
| `Template_Kisi_Kisi.docx` | Diisi guru (INFORMASI UJIAN + tabel kisi-kisi: No, Kompetensi/Materi/Sub-Materi, Indikator, Level Kesulitan, Bentuk) |
| `Contoh_Kisi_Kisi_Stoikiometri.docx` | Contoh kisi-kisi terisi (KIM-STO-01, 20 soal, 2 varian) untuk uji coba Langkah 1 |
| `Contoh_Soal_Terisi_KIM-STO-01.docx` | Contoh Template Soal yang sudah diisi, pasangan kisi-kisi di atas, untuk uji coba Langkah 2 |
| `Contoh_Kisi_Kisi_BIndo_TeksBacaan.docx` + `Contoh_Soal_Terisi_BIN-CTH-01.docx` | Contoh **dengan teks bacaan bersama** (B. Indonesia: 2 teks, 6 soal) untuk Langkah 1 & 2 |
| `admin.html` | Halaman guru/admin (PIN): Langkah 1, Langkah 2, daftar kisi-kisi & paket, tautan/QR, saklar aktif/pembahasan, impor kode hasil |
| `index.html` | Halaman siswa + dasbor guru |
| `Template_Soal_Darurat.docx` | Untuk **jalur darurat** (terbit tanpa kisi-kisi; hanya dengan PIN darurat) |
| `Template_Data_Siswa.xlsx` | Contoh format data siswa (NISN, NIS, Nama, Kelas, Tanggal Lahir); ekspor Dapodik juga diterima |
| `supabase_setup_v4.sql` | Skema database (aman dijalankan di atas v1/v2/v3) |

## A. Pemasangan / pembaruan (±10 menit)

1. Supabase (proyek **Tryout_Guru**) → SQL Editor → tempel seluruh `supabase_setup_v4.sql` → Run.
2. Baris ke-2 `index.html` dan `admin.html`: isi `url` dan `key` (anon public) Supabase — sama seperti sebelumnya.
3. Unggah kedua HTML ke GitHub (timpa yang lama). Tunggu 1–2 menit.

## B. Langkah 1 — Kisi-kisi

- Guru mengisi `Template_Kisi_Kisi.docx`: **Kode ujian** (unik; huruf besar/angka/strip), judul, mapel, kelas, materi, durasi, **jumlah varian (1–4)**, data/rumus umum, petunjuk umum; lalu tabel kisi-kisi. Nomor berurutan mulai 1; baris yang hanya berisi nomor diabaikan.
- **Level Kesulitan**: `Knowing` / `Applying` / `Reasoning` (C1–C6 juga diterima dan dipetakan otomatis).
- **Bentuk**: `PG` / `PG Kompleks` / `Benar - Salah` / `Menjodohkan` / `Isian`.
- **Kode Teks** (opsional, untuk B. Indonesia/Inggris): kode singkat (T1, T2, …) pada nomor-nomor yang mengacu ke satu teks bacaan bersama. Isi teksnya nanti di Template Soal. Kosongkan untuk soal yang berdiri sendiri.
- Admin/guru: `admin.html` → PIN → **Langkah 1** → unggah → periksa komposisi (Knowing/Applying/Reasoning dan sebaran bentuk dihitung otomatis) → **Simpan ke server & unduh Template Soal**.
- Template Soal yang diunduh bernama `Template_Soal_<KODE>.docx`: berisi komposisi paket, pedoman penskoran, ketentuan umum, INFORMASI UJIAN, tabel **TEKS BACAAN** untuk setiap kode teks di kisi-kisi (guru mengisi Judul & Isi), dan **satu tabel per nomor per varian** yang sudah terisi kisi-kisinya (termasuk baris Kode teks). Bisa diunduh ulang kapan saja dari tab *Daftar paket*.

## C. Langkah 2 — Soal

- Guru mengisi baris **Perintah soal, Pertanyaan, Pilihan/Pernyataan/Kiri–Kanan, Kunci, (Toleransi, Jawaban alternatif), Pembahasan**. Baris lain jangan diubah.
- Format kunci: PG `B` · PG Kompleks `A, C, E` · Benar - Salah `Benar, Benar, Salah` (atau `1, 1, 2`) · Menjodohkan `1-d, 2-c, 3-e, 4-a, 5-b` · Isian `2,24` + Toleransi `0,05` + alternatif `2.24 | 2,24 L`.
- Sub/superscript Word, tabel di sel Perintah soal, dan gambar PNG/JPG (≤ 300 KB) ikut terbaca.
- `admin.html` → **Langkah 2** → unggah → aplikasi mencocokkan dengan kisi-kisi di server. **Ditolak** bila: kode ujian berbeda, nomor hilang/lebih, varian kurang/lebih, bentuk berbeda dari kisi-kisi, kode teks berbeda dari kisi-kisi, atau teks bacaan yang dirujuk belum diisi.
- Di layar siswa, teks bacaan tampil di atas setiap soal yang merujuknya (bisa dilipat), dan soal-soal dengan teks yang sama tetap berkelompok meski urutan diacak. Sub-materi/indikator/level selalu mengikuti kisi-kisi (perbedaan hanya diperingatkan).
- Pratinjau (kunci hijau) → **Terbitkan** → tautan & QR.

## C2. Jalur darurat (hanya keadaan mendesak)

- Tab **Jalur darurat** di `admin.html` menerbitkan paket langsung dari `Template_Soal_Darurat.docx` tanpa Langkah 1.
- Hanya bisa dengan **PIN darurat** (bawaan `darurat2026`, terpisah dari PIN guru; dicek di server). Ganti di SQL Editor: `update public.tka_privat set v = 'PIN_BARU' where k = 'pin_darurat';` Simpan PIN ini pada pimpinan/kurikulum, bukan pada semua guru.
- Setiap tabel soal wajib mengisi Bentuk dan Level; Kompetensi & Indikator sangat dianjurkan. Aplikasi menyusun kisi-kisi otomatis dari soal, menampilkan komposisi (peringatan bila Reasoning < 20% atau Knowing > 30%), lalu menerbitkan.
- Paket dan kisi-kisinya ditandai **Darurat** di daftar admin dan di dasbor guru (bisa diaudit). Kisi-kisi resmi yang sudah ada tidak ditimpa oleh jalur darurat.
- **Pengesahan**: *Daftar paket → Unduh kisi-kisi* (atau tombol setelah terbit darurat) → guru memeriksa/melengkapi di Word → unggah di **Langkah 1** dengan kode yang sama. Bila jumlah soal dan bentuk per nomor cocok dengan paket yang sudah terbit, tanda Darurat dicabut dari kisi-kisi dan paket (jejak "disahkan" tetap tercatat). Bila tidak cocok, kisi-kisi tersimpan tetapi paket tetap berlabel Darurat.

## C3. Data siswa & identitas (v4)

- **Unggah data siswa**: `admin.html` → tab *Data siswa* → unggah ekspor Excel Dapodik (.xls/.xlsx, **semua sheet dibaca dan digabung** — ekspor per rombel langsung bisa) atau CSV. Kolom NISN, Nama, Rombel/Kelas, Tanggal lahir dideteksi otomatis (bisa diubah pada pemetaan kolom); tanggal diterima dalam format `2008-05-17`, `17/05/2008`, `17 Mei 2008`, atau tanggal Excel. Baris tanpa NISN/tanggal dilewati dan dilaporkan. Unggah ulang = memperbarui (NISN sebagai kunci). Perbarui tiap awal tahun ajaran.
- **Mutasi siswa**: *masuk* → isi formulir *Tambah/ubah satu siswa* (NISN, nama, kelas, tanggal lahir) → Simpan; *pindah kelas/koreksi* → tombol **ubah** pada daftar → perbaiki → Simpan; *keluar* → tombol **nonaktifkan** (riwayat nilai tetap tersimpan, siswa tidak bisa masuk ujian dan tidak dihitung "belum mengerjakan"); **hapus** hanya untuk data yang salah. Awal tahun ajaran: unggah ekspor Dapodik terbaru — kelas semua siswa ikut diperbarui otomatis (NISN sebagai kunci).
- **Guru mencoba soal**: halaman siswa → tautan *Guru: coba soal* → kode ujian + PIN guru. Paket **nonaktif pun bisa dicoba** (jadi paket bisa diperiksa sebelum diaktifkan), hasil **tidak disimpan**, dan kunci/pembahasan langsung tersedia di halaman hasil. Untuk membaca semua soal beserta kunci tanpa mengerjakan, gunakan pratinjau di `admin.html` (Langkah 2 sebelum terbit, atau *Daftar paket → JSON*).
- **Masuk ujian**: begitu data siswa ada, halaman siswa meminta **NISN + tanggal lahir** (nama & kelas terisi otomatis dari data sekolah, tidak bisa diketik). Tanpa data siswa, halaman tetap meminta nama/kelas seperti sebelumnya.
- **Satu hasil per siswa per ujian**: siswa yang sudah mengerjakan tidak bisa masuk lagi; guru dapat **reset** dari dasbor (hasil lama dihapus, siswa boleh mengulang). Kirim-ulang jawaban yang gagal terkirim tetap diperbolehkan (bukan pengerjaan baru).
- **Jalur tamu** (per ujian, saklar di dasbor guru): siswa tak terdaftar mengetik nama/kelas; hasilnya berlabel *tamu*. Default mati.
- **Kode akses ujian** (per ujian, diisi di dasbor guru, mis. `4821`): diumumkan di kelas saat ujian dimulai; siapa pun tanpa kode tidak bisa mulai walau tahu tautannya. Kosongkan untuk menonaktifkan.
- **Dasbor guru** bertambah: kolom NISN, tombol *reset*, tab **Belum mengerjakan** (siswa terdaftar tanpa hasil, per kelas), tab **Riwayat siswa** (nilai tiap siswa lintas ujian, cari NISN/nama atau per kelas).
- Privasi: data siswa tersimpan di tabel yang dikunci RLS dan hanya bisa dibaca dengan PIN guru; siswa hanya bisa memverifikasi dirinya sendiri (NISN + tanggal lahir). Tanggal lahir adalah verifikasi ringan — cukup untuk tryout; untuk penilaian berisiko tinggi gunakan kode akses + pengawasan.

## C4. Pengawasan keluar halaman

- Halaman web **tidak bisa mencegah** siswa berpindah aplikasi; aplikasi **mendeteksi dan mencatat** setiap kali halaman ujian ditinggalkan (pindah aplikasi/tab, layar dikunci). **Toleransi**: keluar lebih singkat dari batas toleransi (bawaan **10 detik** — notifikasi diketuk, telepon ditolak, salah sentuh) hanya dicatat, tidak dihitung. Keluar yang lebih lama dihitung dan siswa diperingatkan; setelah **batas** (bawaan **5 kali**; 0 = tanpa batas) ujian **dikunci**. Kedua angka diatur guru per ujian di dasbor. Pengawas memasukkan **kode buka** (diatur guru; bila kosong dipakai kode akses ujian) di HP siswa, atau siswa mengumpulkan jawaban. Jumlah keluar dan waktunya tersimpan dan tampil di rekap guru (kolom *Keluar*) serta CSV.
- Rekap menampilkan `jumlah dihitung× / total kejadian` dengan rincian waktu & durasi tiap kejadian, sehingga guru bisa membedakan layar mati sekali dua menit dari keluar 40 detik berulang. Gunakan bersama pengawasan (kode akses diumumkan saat mulai, HP di meja, tanpa earphone, 2–4 varian soal). Untuk penguncian sungguhan gunakan fitur perangkat: Android *Sematkan layar / Screen pinning*, Chromebook mode kiosk, atau Safe Exam Browser di laptop.
- Di HP, aplikasi juga meminta mode layar penuh dan menonaktifkan salin/klik-kanan selama ujian (pengaman ringan).

## D. Setelah ujian

`index.html` → *Masuk sebagai guru* → pilih ujian: rekap (nilai, % Knowing/Applying/Reasoning, sub-materi terlemah), analisis butir (% benar dan kesukaran per nomor, dipisah per varian), rekap sub-materi + rekomendasi, CSV. Saklar **pembahasan** membuka kunci & pembahasan bagi siswa yang sudah selesai.

Revisi soal: perbaiki Word → unggah ulang di Langkah 2 (kode sama) → paket ditimpa, hasil siswa tetap. Revisi kisi-kisi: unggah ulang di Langkah 1 → unduh Template Soal baru → isi ulang bagian yang berubah → Langkah 2.

## E. Catatan

- Kunci tidak pernah dikirim ke HP siswa; penilaian di server. PIN tunggal untuk admin & guru (+ PIN darurat terpisah).
- Proyek gratis Supabase dijeda bila 7 hari tanpa aktivitas → *Restore* sehari sebelum ujian.
- Diuji ujung-ke-ujung dengan PostgreSQL lokal dan tiruan browser (kisi → template → soal → terbit → data siswa CSV Dapodik → login NISN/tgl lahir → satu hasil → reset → tamu → kode akses → dasbor belum/riwayat). Pembacaan **Excel (.xlsx)** memakai pustaka SheetJS dari CDN dan belum diuji di sini; bila gagal, simpan sebagai CSV. Belum diuji di Supabase/GitHub sungguhan — uji dengan berkas contoh dulu.
