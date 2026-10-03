# Asesmen Merdeka (Tryout) v7 — Panduan (kisi-kisi → template soal → bank soal → sesi ujian; data siswa; PIN pribadi guru)

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
Terbitkan → masuk bank soal
        │  (Menu guru → Sesi ujian) pilih paket + kelas + lama pengerjaan → kode akses 6 angka
        ▼
Siswa buka index.html, masuk dengan NISN + kode akses → hasil & analisis di dasbor guru
```

Isi folder:

| Berkas | Fungsi |
|---|---|
| `Template_Kisi_Kisi.docx` | Diisi guru (INFORMASI UJIAN + tabel kisi-kisi: No, Kompetensi/Materi/Sub-Materi, Indikator, Level Kesulitan, Bentuk) |
| `Contoh_Kisi_Kisi_Stoikiometri.docx` | Contoh kisi-kisi terisi (KIM-STO-01, 20 soal, 2 varian) untuk uji coba Langkah 1 |
| `Contoh_Soal_Terisi_KIM-STO-01.docx` | Contoh Template Soal yang sudah diisi, pasangan kisi-kisi di atas, untuk uji coba Langkah 2 |
| `Contoh_Kisi_Kisi_BIndo_TeksBacaan.docx` + `Contoh_Soal_Terisi_BIN-CTH-01.docx` | Contoh **dengan teks bacaan bersama** (B. Indonesia: 2 teks, 6 soal) untuk Langkah 1 & 2 |
| `admin.html` | Halaman guru/admin (PIN): Langkah 1, Langkah 2, daftar kisi-kisi & paket, unduh naskah soal (.docx), tautan/QR, saklar aktif/pembahasan, impor kode hasil |
| `index.html` | Halaman siswa + dasbor guru |
| `Template_Soal_Darurat.docx` | Untuk **jalur darurat** (terbit tanpa kisi-kisi; hanya dengan PIN darurat) |
| `Template_Data_Siswa.xlsx` | Contoh format data siswa (NISN, NIS, Nama, Kelas, Tanggal Lahir); ekspor Dapodik juga diterima |
| `supabase_setup_v6.sql` | Skema database (aman dijalankan di atas v1–v5) |

## Menu guru (index.html → Masuk guru / pengawas → PIN)

| Menu | Isi | Pengawas | Guru | Operator |
|---|---|---|---|---|
| **Sesi Ujian** | buka/tutup sesi, kode akses, pantau siswa | ✓ (lihat, Lepas) | ✓ | ✓ |
| **Dasbor Hasil** | rekap, analisis butir, belum mengerjakan, riwayat, Excel | ✓ | ✓ | ✓ |
| **Upload Soal** (`admin.html?menu=soal`) | Langkah 1 · Kisi-kisi, Langkah 2 · Soal, Jalur Darurat | | ✓ | ✓ |
| **Pustaka Paket** (`admin.html?menu=pustaka`) | bank soal: buka sesi, coba soal, lihat hasil, kelola paket | | ✓ | ✓ |
| **Daftar Siswa** | cari NISN siswa yang lupa | ✓ | ✓ | ✓ |
| **Admin** (`admin.html?menu=admin`) | Data Siswa, PIN Guru, Impor Kode Hasil, Cadangan, Bantuan | | | ✓ |

PIN cukup dimasukkan sekali di menu guru; halaman Upload Soal, Pustaka Paket, dan Admin memakai PIN yang sama (tab peramban yang sama). Uji coba soal: Pustaka Paket → buka paket → **Coba soal**. **Lihat hasil** membuka Dasbor Hasil dengan paket itu terpilih.

## A. Pemasangan / pembaruan (±10 menit)

1. Supabase (proyek **Tryout_Guru**) → SQL Editor → tempel seluruh `supabase_setup_v6.sql` → Run.
2. **Sekali saja**: buat berkas `config.js` di folder yang sama (isi contoh ada di `config.js` paket ini) berisi `window.TKA_SUPABASE = { url: "https://xxxx.supabase.co", key: "eyJ..." };` — url = Project URL, key = kunci anon public. Setelah ada `config.js`, pembaruan `index.html`/`admin.html` cukup ditimpa tanpa diedit. (Baris ke-2 HTML dan tautan `?sb=…&key=…` tetap didukung; prioritas: tautan > config.js > baris ke-2.)
3. Unggah kedua HTML (dan `config.js` bila baru dibuat) ke GitHub. Tunggu 1–2 menit.

## B. Langkah 1 — Kisi-kisi

- Guru mengisi `Template_Kisi_Kisi.docx`: **Kode ujian** (unik; huruf besar/angka/strip), judul, mapel, kelas, materi, durasi, **jumlah varian (1–4)**, data/rumus umum, petunjuk umum; lalu tabel kisi-kisi. Nomor berurutan mulai 1; baris yang hanya berisi nomor diabaikan.
- **Level Kesulitan**: `Knowing` / `Applying` / `Reasoning` (C1–C6 juga diterima dan dipetakan otomatis).
- **Bentuk**: `PG` / `PG Kompleks` / `Benar - Salah` / `Menjodohkan` / `Isian`.
- **Kode Teks** (opsional, untuk B. Indonesia/Inggris): kode singkat (T1, T2, …) pada nomor-nomor yang mengacu ke satu teks bacaan bersama. Isi teksnya nanti di Template Soal. Kosongkan untuk soal yang berdiri sendiri.
- Admin/guru: `admin.html` → PIN → **Langkah 1** → unggah → periksa komposisi (Knowing/Applying/Reasoning dan sebaran bentuk dihitung otomatis) → **Simpan ke server & unduh Template Soal**.
- Template Soal yang diunduh bernama `Template_Soal_<KODE>.docx`: berisi komposisi paket, pedoman penskoran, ketentuan umum, INFORMASI UJIAN, tabel **TEKS BACAAN** untuk setiap kode teks di kisi-kisi (guru mengisi Judul & Isi), dan **satu tabel per nomor per varian** yang sudah terisi kisi-kisinya (termasuk baris Kode teks). Bisa diunduh ulang kapan saja dari tab *Pustaka paket* (buka paket → Template soal .docx).

## C. Langkah 2 — Soal

- Guru mengisi baris **Perintah soal, Pertanyaan, Pilihan/Pernyataan/Kiri–Kanan, Kunci, (Toleransi, Jawaban alternatif), Pembahasan**. Baris lain jangan diubah.
- Format kunci: PG `B` · PG Kompleks `A, C, E` · Benar - Salah `Benar, Benar, Salah` (atau `1, 1, 2`) · Menjodohkan `1-d, 2-c, 3-e, 4-a, 5-b` · Isian `2,24` + Toleransi `0,05` + alternatif `2.24 | 2,24 L`.
- Sub/superscript Word, tabel di sel Perintah soal, dan gambar PNG/JPG (≤ 300 KB) ikut terbaca.
- `admin.html` → **Langkah 2** → unggah → aplikasi mencocokkan dengan kisi-kisi di server. **Ditolak** bila: kode ujian berbeda, nomor hilang/lebih, varian kurang/lebih, bentuk berbeda dari kisi-kisi, kode teks berbeda dari kisi-kisi, atau teks bacaan yang dirujuk belum diisi.
- Di layar siswa, teks bacaan tampil di atas setiap soal yang merujuknya (bisa dilipat), dan soal-soal dengan teks yang sama tetap berkelompok meski urutan diacak. Sub-materi/indikator/level selalu mengikuti kisi-kisi (perbedaan hanya diperingatkan).
- Pratinjau (kunci hijau) → **Terbitkan ke bank soal**. Paket belum bisa dikerjakan siswa sampai guru membuka sesinya (bagian C3c).
- **Unduh naskah (.docx)**: di pratinjau Langkah 2, tab *Pustaka paket → buka paket → Lihat soal*, dan jalur darurat tersedia dua unduhan Word — **Soal & pembahasan** (kunci ditandai hijau ✔, pembahasan tiap soal, rekap kunci per varian; rahasia, untuk guru/arsip) dan **Naskah siswa** (tanpa kunci/pembahasan, untuk dicetak sebagai cadangan bila jaringan bermasalah). Tiap varian di halaman terpisah; teks bacaan tampil sekali sebelum soal pertama yang merujuknya; gambar, tabel, sub/superscript ikut; rumus Word Equation tampil sebagai kode `( … )` (belum dikonversi balik ke rumus Word). Hanya untuk PIN guru/operator.

## C2. Jalur darurat (hanya keadaan mendesak)

- Tab **Jalur darurat** di `admin.html` menerbitkan paket langsung dari `Template_Soal_Darurat.docx` tanpa Langkah 1.
- Hanya bisa dengan **PIN darurat** (bawaan `darurat2026`, terpisah dari PIN guru; dicek di server). Ganti di SQL Editor: `update public.tka_privat set v = 'PIN_BARU' where k = 'pin_darurat';` Simpan PIN ini pada pimpinan/kurikulum, bukan pada semua guru.
- Setiap tabel soal wajib mengisi Bentuk dan Level; Kompetensi & Indikator sangat dianjurkan. Aplikasi menyusun kisi-kisi otomatis dari soal, menampilkan komposisi (peringatan bila Reasoning < 20% atau Knowing > 30%), lalu menerbitkan.
- Paket dan kisi-kisinya ditandai **Darurat** di daftar admin dan di dasbor guru (bisa diaudit). Kisi-kisi resmi yang sudah ada tidak ditimpa oleh jalur darurat.
- **Pengesahan**: *Pustaka paket → buka paket → Kisi-kisi .docx* (atau tombol setelah terbit darurat) → guru memeriksa/melengkapi di Word → unggah di **Langkah 1** dengan kode yang sama. Bila jumlah soal dan bentuk per nomor cocok dengan paket yang sudah terbit, tanda Darurat dicabut dari kisi-kisi dan paket (jejak "disahkan" tetap tercatat). Bila tidak cocok, kisi-kisi tersimpan tetapi paket tetap berlabel Darurat.

## C3. Data siswa & identitas (v4)

- **Unggah data siswa**: `admin.html` → tab *Data siswa* → unggah ekspor Excel Dapodik (.xls/.xlsx, **semua sheet dibaca dan digabung** — ekspor per rombel langsung bisa) atau CSV. Kolom NISN, Nama, Rombel/Kelas, Tanggal lahir dideteksi otomatis (bisa diubah pada pemetaan kolom); tanggal diterima dalam format `2008-05-17`, `17/05/2008`, `17 Mei 2008`, atau tanggal Excel. Baris tanpa NISN/tanggal dilewati dan dilaporkan. Unggah ulang = memperbarui (NISN sebagai kunci). Perbarui tiap awal tahun ajaran.
- **Mutasi siswa**: *masuk* → isi formulir *Tambah/ubah satu siswa* (NISN, nama, kelas, tanggal lahir) → Simpan; *pindah kelas/koreksi* → tombol **ubah** pada daftar → perbaiki → Simpan; *keluar* → tombol **nonaktifkan** (riwayat nilai tetap tersimpan, siswa tidak bisa masuk ujian dan tidak dihitung "belum mengerjakan"); **hapus** hanya untuk data yang salah. Awal tahun ajaran: unggah ekspor Dapodik terbaru — kelas semua siswa ikut diperbarui otomatis (NISN sebagai kunci).
- **Guru mencoba soal**: halaman siswa → *Guru / pengawas* → PIN → **Uji coba soal** → kode ujian. Paket mana pun di bank soal bisa dicoba tanpa membuka sesi, hasil **tidak disimpan**, dan kunci/pembahasan tersedia di halaman hasil bila Anda penyusun paketnya (atau operator). Untuk membaca semua soal beserta kunci tanpa mengerjakan, gunakan pratinjau di `admin.html` (Langkah 2 sebelum terbit, atau *Pustaka paket → buka paket → JSON*).
- **Masuk ujian**: siswa membuka `index.html` (satu alamat untuk semua ujian) dan mengisi **NISN + kode akses sesi** (6 angka dari guru/pengawas). Server menampilkan nama, kelas, dan ujiannya; siswa menekan *Ya, benar* baru token pengerjaan dibuat. Tanggal lahir tidak dipakai lagi untuk masuk (tetap disimpan sebagai data).
- **Satu hasil per siswa per paket**: siswa yang sudah mengerjakan tidak bisa masuk lagi, juga di sesi lain dengan paket yang sama; penyusun paket, guru yang membuka sesinya, atau operator dapat **reset** dari dasbor. Kirim-ulang jawaban yang gagal terkirim tetap diperbolehkan (bukan pengerjaan baru).
- **Satu NISN satu perangkat**: selama sesi terbuka, NISN yang sedang mengerjakan tidak bisa masuk dari perangkat lain ("Kamu sudah masuk ujian ini di perangkat lain"). Bila HP siswa mati atau harus berganti perangkat, guru/pengawas membuka *Sesi ujian → Pantau siswa* dan menekan **Lepas** pada namanya.
- **Jalur tamu** (per sesi, *Pengawasan & jalur tamu* saat membuka sesi): siswa tak terdaftar mengetik nama/kelas + kode akses; hasilnya berlabel *tamu*. Default mati.
- **Dasbor guru**: saringan **Sesi**, kolom NISN, tombol *reset*, tab **Belum mengerjakan** (peserta gabungan semua sesi tanpa hasil, per kelas), tab **Riwayat siswa** (nilai tiap siswa lintas ujian, cari NISN/nama atau per kelas).
- Privasi: data siswa tersimpan di tabel yang dikunci RLS dan hanya bisa dibaca dengan PIN guru. Kode akses hanya berlaku selama sesi terbuka dan hanya untuk peserta sesi itu; kode yang salah diperlambat server agar tidak bisa ditebak beruntun.

## C3b. Menu guru, PIN pribadi, dan Daftar siswa (v7)

- Layar awal siswa hanya punya satu tautan kecil **Guru / pengawas** (atau buka langsung `index.html?guru`). Setelah PIN dimasukkan **sekali** (berlaku selama tab/peramban terbuka), tampil **Menu guru**: *Sesi ujian*, *Dasbor hasil*, *Daftar siswa*, *Uji coba soal*, dan *Halaman admin*. Menu menampilkan nama pemilik PIN.
- **PIN** (dicek di server, bukan hanya disembunyikan di layar):

| PIN | Tempat | Boleh |
|---|---|---|
| **Pribadi guru** (8 angka) | `mtd_guru.pin` — sama dengan PIN Matematika Dasar | Unggah paket (tercatat atas namanya), kelola paket buatannya, buka/perpanjang/tutup sesi miliknya, pembahasan, reset hasil sesinya, dasbor; data siswa hanya lihat |
| Operator / kurikulum | `tka_privat.pin_operator` | Semuanya, termasuk data siswa, **guru & PIN pribadi**, penyusun paket, dan semua sesi; juga admin Matematika Dasar |
| Pengawas | `tka_privat.pin_pengawas` | Lihat sesi & dasbor (tanpa tombol pengaturan/reset/hapus), daftar siswa, uji coba soal, **Lepas** siswa, buka kunci di HP siswa |
| Guru bersama (peralihan) | `tka_privat.pin` | Seperti guru tetapi tanpa nama; paket/sesi yang dibuat tidak tercatat atas nama siapa pun. Matikan setelah semua guru memegang PIN pribadi |

- **Membuat PIN pribadi**: `admin.html` → PIN operator → menu **Admin → PIN Guru** → *Tarik guru dari Data Induk* (semua guru aktif + kelas yang diampu menurut jadwal KBM) → *Buat PIN untuk guru yang belum punya*. Bagikan PIN langsung ke masing-masing guru. PIN bisa dibuat ulang atau dihapus per guru. Setelah semua guru memegang PIN pribadi: **Matikan PIN guru bersama**. **Satu tabel daftar guru**: kolom **Kartu PIN (PNG)** di tiap baris — *Lihat* (pratinjau), **Bagikan** (HP → WhatsApp → chat pribadi guru), **Salin** (tempel di WhatsApp Web), **Unduh** PNG. Centang satu atau beberapa guru untuk *Bagikan kartu terpilih*, *Unduh kartu PNG terpilih*, dan **Unduh XLSX** (daftar PIN guru terpilih, atau semua guru ber-PIN bila tidak ada yang dicentang). Guru yang baru dibuatkan PIN langsung tercentang dan bertanda *PIN baru*. Bila peramban menolak menyalin/membagikan, kartu tampil di jendela pratinjau untuk disalin atau disimpan manual. Kartu dibuat di peramban, tidak dikirim ke server.
- ID guru di Data Induk (mis. G161) hanya PIN sementara untuk Matematika Dasar; di Tryout tidak berlaku.
- Ganti PIN operator/pengawas: `update public.tka_privat set v='PIN_BARU' where k='pin_operator';` (juga `k='pin_pengawas'`).
- **Daftar siswa** (bantu login): untuk siswa yang lupa NISN. Kotak cari nama/NISN menyaring seketika; chip kelas untuk mengelompokkan (jumlah siswa aktif per kelas ikut tampil); NISN tampil besar dengan tombol **Salin NISN**. Pilih ujian pada *Tandai sudah/belum mengerjakan* untuk melihat siapa yang belum masuk tanpa pindah ke dasbor. Siswa nonaktif tampil pudar. Tidak ada tombol ubah/hapus di halaman ini — itu tetap di `admin.html`.
- Data daftar siswa dimuat sekali per sesi (tombol *Muat ulang* bila ada perubahan) sehingga pencarian tidak membebani server saat ujian serentak.

## C3c. Sesi ujian (v7)

Paket adalah **bank soal**: tidak ada lagi saklar aktif, tautan `?ujian=KODE`, kode akses manual, atau peruntukan per paket. Ujian dibuka lewat **sesi**.

- **Buka sesi**: Menu guru → **Sesi ujian** → **Buka sesi baru** → pilih paket (cari judul/kode/mapel; semua paket di bank soal boleh dipakai), **peserta** (kelas tertentu — tombol *Kelas saya* memilih rombel yang Anda ampu menurut jadwal KBM, *Semua kelas 12*, dst. — atau siswa tertentu), **lama pengerjaan** (bawaan: durasi paket), dan **kelonggaran masuk** (untuk siswa yang terlambat). Sesi tertutup pada *lama pengerjaan + kelonggaran*. Bagian *Pengawasan & jalur tamu*: batas keluar, toleransi, kode buka (kosong = PIN guru/pengawas/operator), izinkan tamu. Pengaturan terakhir diingat untuk sesi berikutnya.
- Server membuat **kode akses 6 angka**, unik di antara sesi yang terbuka, jadi kode sekaligus menentukan ujiannya. **Tampilkan besar** menampilkan kode untuk proyektor beserta alamat halaman siswa dan jam tutup.
- **Waktu**: batas tiap siswa = yang lebih awal di antara (saat ia masuk + lama pengerjaan) dan akhir sesi, mengikuti jam server. HP siswa memberi kabar tiap menit: bila guru **memperpanjang** (+15/+30 menit) waktunya ikut bertambah; bila guru **menutup sekarang**, siswa yang sedang mengerjakan otomatis mengumpulkan jawaban dalam ±1 menit. Sesi yang sudah tertutup bisa **dibuka lagi 15 menit**.
- **Pantau siswa**: setiap peserta dengan status *Belum masuk*, *Mengerjakan*, *Tidak aktif* (HP tidak memberi kabar >3 menit), *Selesai* (dengan nilai), atau *Sudah di sesi lain*; diperbarui tiap 20 detik. **Lepas** = siswa boleh masuk lagi dari perangkat lain (jawaban di perangkat lama tidak ikut pindah).
- **Pembahasan** per sesi (saklar pada kartu sesi): siswa sesi itu yang sudah mengumpulkan boleh melihat kunci & pembahasan. Kelas lain yang memakai paket sama tidak ikut terbuka.
- Sesi hanya bisa diubah oleh guru yang membukanya dan operator. Sesi tanpa siswa yang masuk boleh **dihapus**. Daftar menampilkan sesi yang terbuka dan yang ditutup 12 jam terakhir; sesi lama tetap terlihat di dasbor (kartu *Sesi ujian untuk paket ini*).
- **Penyusun paket**: paket yang diunggah dengan PIN pribadi tercatat atas nama pengunggahnya. Semua guru boleh memakainya untuk membuka sesi, tetapi melihat soal & kunci, mengubah, mengarsipkan, dan menghapus hanya penyusun dan operator. Paket lama tanpa penyusun tetap boleh dikelola semua guru; operator menetapkan penyusunnya di *Pustaka paket → buka paket → Atur penyusun*.
- Dari admin: *Pustaka paket → buka paket → Buka sesi* membuka Menu guru dengan paket itu sudah terpilih (`index.html?guru&sesi=KODE`).

## C4. Pengawasan keluar halaman

- Halaman web **tidak bisa mencegah** siswa berpindah aplikasi; aplikasi **mendeteksi dan mencatat** setiap kali halaman ujian ditinggalkan (pindah aplikasi/tab, layar dikunci). **Toleransi**: keluar lebih singkat dari batas toleransi (bawaan **10 detik** — notifikasi diketuk, telepon ditolak, salah sentuh) hanya dicatat, tidak dihitung. Keluar yang lebih lama dihitung dan siswa diperingatkan; setelah **batas** (bawaan **5 kali**; 0 = tanpa batas) ujian **dikunci**. Kedua angka diatur guru per sesi saat membuka sesi. Pengawas memasukkan **kode buka** sesi, atau PIN guru/pengawas/operator bila kode buka sesi kosong, di HP siswa; atau siswa mengumpulkan jawaban. Jumlah keluar dan waktunya tersimpan dan tampil di rekap guru (kolom *Keluar*) serta CSV.
- **Alarm & peringatan**: begitu halaman ujian ditinggalkan, HP siswa membunyikan sirene **2 detik** (dan bergetar bila didukung). Setiap kali siswa kembali muncul layar peringatan berjudul **"Dilarang keras, keluar halaman ini selama ujian !!!"** (keluar sekejap: disebutkan tidak dihitung); bila keluarnya dihitung, sirene 2 detik berbunyi lagi sehingga pengawas mendengar. Suara aktif setelah siswa mengetuk layar sekali (aturan peramban), dan **tidak berbunyi bila HP dalam mode senyap/volume media nol**. Sebagian peramban (terutama iPhone) membisukan suara halaman di latar — pada HP seperti itu yang pasti terdengar adalah sirene saat kembali. Uji coba guru tidak membunyikan alarm.
- Rekap menampilkan `jumlah dihitung× / total kejadian` dengan rincian waktu & durasi tiap kejadian, sehingga guru bisa membedakan layar mati sekali dua menit dari keluar 40 detik berulang. Gunakan bersama pengawasan (kode akses diumumkan saat mulai, HP di meja, tanpa earphone, 2–4 varian soal). Untuk penguncian sungguhan gunakan fitur perangkat: Android *Sematkan layar / Screen pinning*, Chromebook mode kiosk, atau Safe Exam Browser di laptop.
- Di HP, aplikasi juga meminta mode layar penuh dan menonaktifkan salin/klik-kanan selama ujian (pengaman ringan).

## D. Setelah ujian

`index.html` → *Guru / pengawas* → PIN → **Dasbor hasil** → pilih ujian: rekap (nilai, % Knowing/Applying/Reasoning, sub-materi terlemah; judul kolom tetap di atas dan kolom nomor & nama tetap di kiri saat tabel digulir), analisis butir (judul kolom juga tetap) (% benar dan kesukaran per nomor, dipisah per varian), rekap sub-materi + rekomendasi, tombol **Unduh (.xlsx)** (buku kerja Excel berformat: lembar Rekap, Jawaban per Soal, Analisis Butir, Sub-materi & Level; kop sekolah, nilai berwarna, panel beku, filter; ExcelJS dimuat dari CDN saat tombol ditekan). Hasil bisa disaring **per sesi**. Saklar **pembahasan** ada pada kartu sesi (Menu guru → Sesi ujian) dan hanya berlaku bagi siswa sesi itu.

Revisi soal: perbaiki Word → unggah ulang di Langkah 2 (kode sama; hanya penyusun atau operator) → paket ditimpa, hasil siswa tetap. Judul dan keterangan paket yang sudah tersimpan tidak ikut tertimpa oleh isian Word (Word hanya mengisi yang masih kosong); untuk menggantinya (bukan kode), buka paketnya di **Pustaka paket** → **Ubah judul & keterangan** — tautan, QR, dan hasil siswa tetap.

Pustaka paket (tab admin): satu baris per kode ujian dengan jalur Kisi-kisi → Soal → Dibuka → Hasil; saring menurut mapel, kelas, jenis, semester, status; kelompokkan menurut kelas, jenis, guru, atau semester; klik baris untuk semua tindakan. Paket semester lalu cukup **diarsipkan** (sesi terbuka ikut ditutup, tersembunyi, tidak bisa dibuka sesinya, hasil tetap; kembalikan lewat saringan Arsip; unggah ulang soal dengan kode sama otomatis mengeluarkannya dari arsip).

Keterangan paket (baris di tabel INFORMASI UJIAN; template kosong: tombol *Unduh template kisi-kisi kosong* di Langkah 1): **Jenis** (Latihan / Ulangan Harian / Tengah Semester / Akhir Semester / Tryout TKA / Tryout UTBK), **Tingkat peserta** (kelas yang mengerjakan, mis. 12 atau 10–12; kosong = ditebak dari isian Kelas), **Cakupan materi** (hanya bila berbeda dari tingkat peserta, mis. tryout TKA kelas 12 dengan materi 10–12), **Semester** (kosong = otomatis dari tanggal), **Guru penyusun**. Keterangan hanya untuk mencari & mengelompokkan paket; siapa yang boleh mengerjakan tetap diatur di Peruntukan. Revisi kisi-kisi: unggah ulang di Langkah 1 → unduh Template Soal baru → isi ulang bagian yang berubah → Langkah 2.

## E. Catatan

- Kunci tidak pernah dikirim ke HP siswa; penilaian di server. PIN: pribadi guru, operator, pengawas, darurat (dan guru bersama selama peralihan).
- Proyek gratis Supabase dijeda bila 7 hari tanpa aktivitas → *Restore* sehari sebelum ujian.
- Diuji ujung-ke-ujung dengan PostgreSQL lokal dan tiruan browser (kisi → template → soal → terbit → data siswa CSV Dapodik → login NISN/tgl lahir → satu hasil → reset → tamu → kode akses → dasbor belum/riwayat → menu guru → tiga PIN → daftar siswa → peruntukan kelas/siswa: tolak login, belum mengerjakan, editor). Tombol "Kembali ke menu guru" tersedia di halaman hasil uji coba. Pembacaan **Excel (.xlsx)** memakai pustaka SheetJS dari CDN dan belum diuji di sini; bila gagal, simpan sebagai CSV. Belum diuji di Supabase/GitHub sungguhan — uji dengan berkas contoh dulu.
