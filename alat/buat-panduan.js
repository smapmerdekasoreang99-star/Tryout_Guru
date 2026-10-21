/* Pembuat Panduan Guru Asesmen Merdeka (15 Okt 2026) — mesin sama dengan petualangan_sd/alat/buat-panduan.js
   ---------------------------------------------------------------
   Satu sumber isi (ISI di bawah) → dua berkas di akar proyek, dibuka lewat tombol 📘 Panduan di kepala halaman:
     Panduan_Guru_Asesmen_Merdeka.pdf   (dicetak Chrome/Edge tanpa jendela, lewat DevTools Protocol)
     Panduan_Guru_Asesmen_Merdeka.docx  (paket npm "docx")
   Jalankan dari akar proyek:
     npm i --no-save --no-package-lock docx@9      (sekali; node_modules diabaikan git)
     node alat/buat-panduan.js
   Ubah isi panduan di sini bila tampilan atau aturan aplikasi berubah, lalu jalankan ulang. */
"use strict";
const fs = require("fs"), path = require("path"), os = require("os"), { spawn } = require("child_process");

const SUBJUDUL = "Menyusun paket soal, membuka latihan/tryout, dan membaca hasil", UNTUK = "guru, operator/kurikulum, dan pengawas";
const AKAR = path.join(__dirname, ".."), NAMA = "Panduan_Guru_Asesmen_Merdeka";
const JUDUL = "Panduan Guru Asesmen Merdeka", VERSI = "15 Oktober 2026";

/* ================= Isi panduan =================
   Blok: H1/H2/H3 (judul, dinomori otomatis), P (paragraf), UL/OL (daftar), TB (tabel: kepala, baris, lebar relatif),
   KOTAK (jenis: info | saran | awas | bahaya), STAT (kotak angka contoh). Teks boleh memakai **tebal**. */
const H1 = s => ({ t: "h1", s }), H2 = s => ({ t: "h2", s }), H3 = s => ({ t: "h3", s }), P = s => ({ t: "p", s });
const UL = (...a) => ({ t: "ul", a }), OL = (...a) => ({ t: "ol", a });
const TB = (kepala, baris, lebar) => ({ t: "tb", kepala, baris, lebar: lebar || kepala.map(() => 1) });
const KOTAK = (jenis, judul, ...isi) => ({ t: "kotak", jenis, judul, isi });
const STAT = (ket, ...a) => ({ t: "stat", a, ket });

const ISI = [
  /* ============================ 1 ============================ */
  H1("Mengenal Asesmen Merdeka"),
  P("Asesmen Merdeka adalah aplikasi ujian berbasis web sekolah untuk ulangan harian, penilaian tengah/akhir semester, dan tryout TKA/UTBK. Guru menyusun soal di Word, aplikasi mengubahnya menjadi ujian di HP siswa, menilainya otomatis di server, lalu menyajikan rekap nilai, analisis butir soal, dan rekomendasi tindak lanjut."),
  P("Panduan ini untuk **guru** (menyusun paket, membuka sesi, membaca hasil), **pengawas** (memantau ruang ujian), dan **operator/kurikulum**. Bagian 2–3 tentang menyusun dan mengelola paket; bagian 4 tentang pelaksanaan ujian; bagian 5 tentang membaca hasil."),
  H2("Alur kerja dari soal sampai nilai"),
  OL("**Kisi-kisi** — isi Template Kisi-kisi di Word, unggah di **Pustaka Paket → + Upload soal → Langkah 1**. Aplikasi membuatkan **Template Soal** yang nomor, varian, bentuk, dan indikatornya sudah terisi.",
    "**Soal** — isi pertanyaan, pilihan, kunci, dan pembahasan di Template Soal, unggah di **Langkah 2**, periksa pratinjau, lalu **Terbitkan ke bank soal**.",
    "**Publish** (bila ingin dipakai guru lain) — paket baru hanya terlihat oleh Anda dan operator sampai Anda menekan **Publish** di Pustaka Paket. Sesudah Publish, paket terlihat oleh guru yang mengampu mapel paket itu.",
    "**Latihan / Tryout** — di **Menu utama → Latihan / Tryout**, pilih paket dan kelas peserta, **dengan kode akses** (server memberi kode 6 angka) atau **tanpa kode akses** (cukup NISN), mulai sekarang atau terjadwal.",
    "**Siswa mengerjakan** di HP: buka halaman siswa, ketik NISN (+ kode akses bila ada). Jawaban tersimpan otomatis.",
    "**Hasil** — **Dasbor Hasil**: nilai, analisis butir, sub-materi terlemah, siswa yang belum mengerjakan, unduh Excel."),
  KOTAK("info", "Satu alamat untuk semua ujian",
    "Siswa selalu membuka alamat halaman siswa yang sama. Kode akses sesi sekaligus menentukan ujian mana yang dikerjakan; pada sesi tanpa kode akses, ujiannya ditentukan dari kelas siswa dan jam sesi. Guru tidak perlu membagikan tautan per ujian."),
  H2("Masuk dengan PIN dan jenis PIN"),
  P("Di halaman siswa ketuk **Masuk guru / pengawas** (atau buka alamat dengan akhiran **?guru**), ketik PIN, lalu **Masuk**. PIN cukup dimasukkan sekali: berlaku selama peramban terbuka, juga di halaman Pustaka Paket, Asesmen Bersama, Kontrol Pelaksanaan, dan Admin. Tombol **📘 Panduan** dan **Keluar** ada di pojok kanan atas setiap halaman guru (tidak tampil di halaman siswa); **Keluar** menghapus PIN dari peramban."),
  TB(["PIN", "Tanda di menu", "Yang boleh dilakukan"], [
    ["**PIN pribadi guru** (8 angka, sama dengan PIN Matematika Dasar)", "Guru", "Menu **Latihan / Tryout**, **Dasbor Hasil**, **Pustaka Paket** (termasuk upload soal), **NISN Siswa** (kelas yang Anda ampu). Paket yang diunggah tercatat atas nama Anda."],
    ["**PIN pengawas**", "Pengawas", "Menu **Kontrol Pelaksanaan** (layar ruang Asesmen Bersama) dan **NISN Siswa** (semua kelas)."],
    ["**PIN operator / kurikulum**", "Admin · operator", "Khusus mengelola Asesmen Bersama. Menu **Asesmen Bersama** (termasuk tab **Hasil Siswa**), **Kontrol Pelaksanaan**, **NISN Siswa**, **Admin** (data siswa, PIN guru, cadangan, arsip semester)."],
    ["PIN guru bersama (peralihan)", "pil kuning PIN guru bersama", "Seperti guru, tetapi paket dan sesi tidak tercatat atas nama siapa pun. Mintalah PIN pribadi kepada operator."],
  ], [1.7, 1.2, 3.6]),
  H2("Menu"),
  P("Ubin menu menyesuaikan PIN yang dipakai (struktur menu sejak 21 Oktober 2026)."),
  TB(["Tombol menu", "Isi", "Untuk"], [
    ["**Latihan / Tryout**", "Buka latihan/tryout untuk kelas: dengan atau tanpa kode akses, sekarang atau terjadwal; tampilkan kode, pantau siswa, tambah/kurangi waktu, pembahasan.", "guru"],
    ["**Dasbor Hasil**", "Rekap nilai, analisis butir, sub-materi, belum mengerjakan, riwayat siswa, unduh Excel.", "guru"],
    ["**Pustaka Paket**", "Bank soal per jenis, hanya mapel yang Anda ampu: paket Anda dan paket teman semapel yang sudah Publish. Tombol **+ Upload soal**: Langkah 1 · Kisi-kisi, Langkah 2 · Soal, atau Tanpa Kisi-kisi.", "guru (operator lewat Admin)"],
    ["**NISN Siswa**", "Membantu siswa yang lupa NISN. Guru melihat kelas yang diampunya; operator dan pengawas semua kelas.", "guru, operator, pengawas"],
    ["**Asesmen Bersama**", "Ujian bersama (PAS, tryout bersama): peserta per ruang, jadwal, folder soal, **hasil siswa** (dasbor hasil khusus paket di folder soal), terbitkan, cetak.", "operator"],
    ["**Kontrol Pelaksanaan**", "Layar ruang untuk pengawas: kode ruang, siswa terkunci/tidak aktif, buka kunci, jeda, pesan.", "operator, pengawas"],
    ["**Admin**", "Data siswa, PIN guru, impor kode hasil, cadangan, arsip semester.", "operator"],
  ], [1.4, 3.6, 1.6]),
  H2("Istilah yang dipakai"),
  TB(["Istilah", "Arti"], [
    ["**Paket**", "Satu perangkat soal dengan **kode ujian** unik (mis. KIM-STO-01): judul, mapel, durasi, soal, kunci, pembahasan."],
    ["**Bank soal**", "Kumpulan paket yang sudah terbit. Paket di bank soal belum bisa dikerjakan siswa sampai dibuka sesinya."],
    ["**Kisi-kisi**", "Rancangan paket: nomor, kompetensi/sub-materi, indikator, level kesulitan, bentuk soal, kode teks bacaan."],
    ["**Varian**", "Versi soal untuk nomor yang sama (A–D, paling banyak 4). Tiap siswa mendapat satu varian per nomor secara acak, untuk mengurangi saling contek."],
    ["**Level kognitif**", "**Knowing** (pemahaman), **Applying** (penerapan), **Reasoning** (penalaran/HOTS). C1–C6 juga diterima dan dipetakan otomatis."],
    ["**Sesi ujian**", "Pembukaan satu paket untuk peserta tertentu dalam rentang waktu tertentu (boleh terjadwal), dengan kode akses 6 angka sendiri atau tanpa kode akses (cukup NISN)."],
    ["**Penyusun**", "Guru yang mengunggah paket dengan PIN pribadinya. Hanya penyusun dan operator yang boleh melihat kunci dan mengelola paket."],
    ["**Publish**", "Tanda dari penyusun bahwa paketnya boleh dilihat dan dipakai guru lain yang **mengampu mapel paket itu** (menurut jadwal KBM Data Induk). Paket yang **Belum publish** hanya terlihat oleh penyusun, operator, dan pengawas."],
  ], [1.3, 5.2]),

  /* ============================ 2 ============================ */
  H1("Menyusun Paket Soal"),
  P("Buka **Menu utama → Pustaka Paket**, lalu tekan **+ Upload soal**. Ada tiga tab upload: **Langkah 1 · Kisi-kisi**, **Langkah 2 · Soal**, dan **Tanpa Kisi-kisi**. Dengan kisi-kisi: Langkah 1 lalu Langkah 2. Tanpa kisi-kisi: cukup satu berkas soal, kisi-kisinya disusun sistem."),
  H2("Langkah 1 — Kisi-kisi"),
  P("Tekan **Unduh template kisi-kisi kosong**, isi di Word, lalu unggah berkasnya di kotak Langkah 1. Template berisi dua bagian:"),
  H3("Bagian 1 — Informasi ujian"),
  TB(["Baris", "Cara mengisi"], [
    ["**Kode ujian**", "Unik untuk setiap paket. Huruf besar, angka, dan strip, 3–31 karakter, tanpa spasi (spasi diubah menjadi strip). Contoh: KIM-STO-01. Kode sama = memperbarui paket yang sama."],
    ["Judul, Mata pelajaran, Kelas, Materi", "Isi nama mapel saja (mis. Kimia), sesuai daftar mapel Data Induk. Saat diunggah, mapel bisa dipilih ulang: guru yang mengampu **satu** mapel langsung terisi mapelnya (terkunci); guru yang mengampu beberapa mapel memilih di antara mapel yang diampunya (menurut jadwal KBM; Upacara, Tahsin, dan kegiatan sekolah lain tidak dihitung)."],
    ["**Jenis**", "Pilih salah satu: Asesmen Formatif / Asesmen Sumatif / Tryout ASAS / Tryout TKA / Tryout UTBK. Kosong atau tidak dikenali = **Asesmen Formatif**. Latihan dibaca sebagai Asesmen Formatif; ulangan harian, PTS, PAS, SAS sebagai Asesmen Sumatif; ASAS, TKA, UTBK, SNBT dikenali. Daftar jenis ditentukan sistem dan hanya bertambah bila operator membuat asesmen baru di Asesmen Bersama (paket naskahnya otomatis berjenis nama asesmen itu)."],
    ["**Tingkat peserta**", "Kelas yang mengerjakan, mis. 12 atau 10–12. Kosong = ditebak dari isian Kelas."],
    ["**Cakupan materi**", "Hanya bila materinya dari kelas lain, mis. tryout TKA kelas 12 dengan materi 10–12. Kosongkan bila sama."],
    ["**Semester**", "Mis. Ganjil 2026/2027. Kosong = otomatis dari tanggal (Juli–Desember Ganjil, Januari–Juni Genap)."],
    ["**Guru penyusun**", "Boleh dikosongkan. Begitu paket punya penyusun (guru yang mengunggah dengan PIN pribadinya, atau yang ditetapkan operator), isian ini otomatis diganti nama guru tersebut."],
    ["**Durasi (menit)**", "Wajib, angka lebih dari 0. Menjadi lama pengerjaan bawaan saat membuka sesi."],
    ["**Jumlah varian**", "1–4. Kosong = 1."],
    ["Data/rumus umum, Petunjuk umum", "Boleh kosong. Ditampilkan kepada siswa."],
  ], [1.7, 4.8]),
  KOTAK("info", "Keterangan hanya untuk mencari dan mengelompokkan",
    "Jenis, tingkat, cakupan, semester, dan penyusun dipakai untuk menyaring dan mengelompokkan paket di Pustaka Paket. Siapa yang mengerjakan tetap ditentukan saat membuka sesi."),
  H3("Bagian 2 — Tabel kisi-kisi"),
  P("Kolom: **No · Kompetensi / Materi / Sub-Materi · Indikator Soal · Level Kesulitan · Bentuk · Kode Teks**. Nomor harus berurutan mulai 1 tanpa ganda; baris yang hanya berisi nomor diabaikan. **Level** dan **Bentuk** wajib diisi; indikator kosong hanya diperingatkan."),
  TB(["Kolom", "Isian yang diterima"], [
    ["**Level Kesulitan**", "**Knowing** (juga C1, C2, Pemahaman, L1) · **Applying** (C3, Penerapan, Aplikasi, L2) · **Reasoning** (C4–C6, Penalaran, HOTS, L3)."],
    ["**Bentuk**", "**PG** · **PG Kompleks** (PGK) · **Benar - Salah** (juga Kategori) · **Menjodohkan** · **Isian** (jawaban singkat/angka). Uraian panjang tidak didukung."],
    ["**Kode Teks**", "Opsional, untuk soal yang memakai satu teks bacaan bersama (B. Indonesia, B. Inggris). Kode singkat seperti T1, T2 (≤ 10 karakter). Isi teksnya nanti di Template Soal. Kosongkan untuk soal yang berdiri sendiri."],
  ], [1.5, 5]),
  P("Setelah diunggah, tampil **Hasil pembacaan kisi-kisi**: ringkasan, **Galat** (harus diperbaiki), **Peringatan** (boleh dibiarkan), tabel kisi-kisi, dan baris **Komposisi** (jumlah dan persen Knowing/Applying/Reasoning serta tiap bentuk). Bila sudah benar, tekan **Simpan ke server & unduh Template Soal**. Berkas **Template_Soal_<KODE>.docx** terunduh."),
  KOTAK("saran", "Judul dan keterangan yang sudah tersimpan tidak tertimpa",
    "Bila kisi-kisi dengan kode yang sama diunggah ulang, judul dan keterangan yang sudah tersimpan dipertahankan. Untuk menggantinya pakai **Pustaka Paket → Ubah judul & keterangan**."),
  H2("Isi Template Soal"),
  P("Template Soal berisi: komposisi paket, **pedoman penskoran**, ketentuan umum, tabel INFORMASI UJIAN (jangan diubah), tabel **TEKS BACAAN** untuk setiap kode teks (isi Judul dan Isi), lalu **satu tabel per nomor per varian**. Baris Nomor, Varian, Bentuk, Kompetensi, Indikator, Level, dan Kode teks sudah terisi dari kisi-kisi — **jangan diubah**. Yang Anda isi: **Perintah soal**, **Pertanyaan**, baris khusus bentuk soal, **Kunci**, dan **Pembahasan**."),
  H2("Cara menulis soal per bentuk"),
  TB(["Bentuk", "Baris yang diisi", "Contoh kunci", "Dinilai benar bila"], [
    ["**PG**", "Pilihan A–E (paling sedikit 2, tanpa baris kosong di tengah)", "B", "pilihan siswa = kunci (tepat satu kunci)"],
    ["**PG Kompleks**", "Pilihan A–E", "A, C, E", "semua pilihan benar dipilih dan tidak ada pilihan salah yang dipilih"],
    ["**Benar - Salah**", "Label kategori (bawaan Benar | Salah; boleh Fakta | Opini), Pernyataan 1–5", "Benar, Benar, Salah (atau 1, 1, 2 / B, B, S)", "setiap pernyataan dijawab dan semuanya tepat; jumlah kunci = jumlah pernyataan"],
    ["**Menjodohkan**", "Kiri 1–6, Kanan a–f (Kanan ≥ Kiri)", "1-d, 2-c, 3-e, 4-a", "setiap pasangan tepat; setiap butir Kiri wajib punya kunci"],
    ["**Isian**", "Kunci, Toleransi (angka), Jawaban alternatif (dipisah |)", "2,24 · toleransi 0,05 · alternatif 2.24 | 2,24 L", "jawaban sama dengan kunci atau salah satu alternatif; untuk angka boleh selisih sebesar toleransi"],
  ], [1.2, 2.2, 1.6, 2.4]),
  KOTAK("info", "Penskoran: 1 atau 0 per nomor",
    "Setiap nomor bernilai 1 bila seluruh jawabannya tepat, selain itu 0 (tidak ada skor sebagian). Jawaban kosong = salah. **Nilai = benar ÷ jumlah soal × 100**, dibulatkan. Pada isian, huruf besar/kecil, koma/titik desimal, dan spasi berlebih tidak dipersoalkan."),
  H3("Gambar, tabel, rumus, dan teks bacaan"),
  UL("**Huruf**: tebal, miring, subscript, dan superscript ikut terbaca (garis bawah tidak). Tulisan x^2 atau 3^(-2) di teks biasa otomatis menjadi pangkat.",
    "**Tabel** di dalam sel Perintah soal ikut terbaca. Tabel data yang terlanjur diletakkan tepat di bawah tabel soal dipindahkan otomatis ke Perintah soal.",
    "**Gambar** PNG/JPG (juga GIF, BMP, WEBP, SVG). EMF/WMF ditolak — simpan ulang sebagai PNG. Usahakan tiap gambar < 450 KB dan seluruh paket < 4 MB agar ringan di HP siswa.",
    "**Rumus** Word Equation dibaca dan ditampilkan sebagai rumus. Template menyarankan rumus sederhana diketik biasa; bila memakai Equation, periksa tampilannya di pratinjau.",
    "**Teks bacaan**: isi Judul dan Isi di tabel TEKS BACAAN. Di HP siswa teks tampil di atas setiap soal yang merujuknya (bisa dilipat) dan soal-soal bertopik teks yang sama tetap berkelompok walau urutan diacak."),
  H2("Langkah 2 — Unggah soal dan terbitkan"),
  P("Buka tab **Langkah 2 · Soal**, unggah Template Soal yang sudah diisi. Aplikasi mengambil kisi-kisi dari server dan mencocokkan keduanya. Hasilnya:"),
  TB(["Tanda", "Arti dan tindakan"], [
    ["**Sesuai kisi-kisi — siap diterbitkan**", "Tidak ada galat. Periksa tabel ringkasan dan **Pratinjau soal (kunci ditandai hijau)**, lalu tekan **Terbitkan ke bank soal**."],
    ["**Ada galat — perbaiki Word lalu unggah ulang**", "Baca daftar Galat, perbaiki di Word, unggah lagi."],
  ], [2.3, 4.2]),
  P("Paket **ditolak** bila: kode ujian berbeda dari kisi-kisi, ada nomor yang hilang atau lebih, jumlah varian kurang/lebih, bentuk soal berbeda dari kisi-kisi, kode teks berbeda, atau teks bacaan yang dirujuk belum diisi. Kunci PG yang tidak tepat satu, kunci yang merujuk pilihan yang tidak ada, dan jumlah kunci Benar-Salah yang tidak sama dengan jumlah pernyataan juga galat. Sub-materi, indikator, level, judul, mapel, dan durasi selalu mengikuti kisi-kisi; perbedaannya hanya diperingatkan."),
  P("Sesudah **Terbitkan**, paket masuk bank soal dengan status **Belum publish**, lalu tampil tombol **Buka sesi untuk paket ini**. Di kartu terbit juga tersedia tiga unduhan:"),
  TB(["Tombol", "Isi"], [
    ["**Unduh soal & pembahasan**", "Naskah Word dengan kunci bertanda hijau ✔, pembahasan, dan rekap kunci per varian. Rahasia — untuk guru/arsip."],
    ["**Unduh naskah siswa**", "Tanpa kunci dan pembahasan. Cadangan cetak bila jaringan bermasalah."],
    ["**Unduh cadangan**", "Berkas JSON paket; bisa diunggah lagi di Langkah 2."],
  ], [2, 4.5]),
  H2("Memperbaiki soal yang sudah terbit"),
  P("Perbaiki Word, lalu unggah ulang di **Langkah 2** dengan kode yang sama (hanya penyusun atau operator). Paket ditimpa, **hasil siswa tetap**, status Publish tidak berubah. Bila kisi-kisinya juga berubah: unggah ulang kisi-kisi di Langkah 1 → unduh Template Soal baru → isi ulang bagian yang berubah → Langkah 2."),
  KOTAK("awas", "Hati-hati mengubah soal yang sudah dikerjakan",
    "Nilai siswa yang sudah mengumpulkan tidak dihitung ulang. Bila kunci yang salah baru ditemukan setelah ujian, catat nomornya dan bicarakan dengan operator sebelum menimpa paket."),
  H2("Upload tanpa kisi-kisi"),
  P("Soal yang sudah jadi bisa diterbitkan tanpa Langkah 1 lewat tab **Tanpa Kisi-kisi**, cukup dengan PIN pribadi Anda (paket otomatis atas nama Anda). Ada dua cara menyiapkan berkas: **Unduh template tanpa kisi-kisi** (memindahkan soal sendiri) atau **Unduh prompt AI / Salin prompt** (meminta bantuan ChatGPT/Gemini/Claude). Setiap soal wajib mengisi Bentuk dan Level; aplikasi menyusun kisi-kisi otomatis."),
  P("Paket ini setara paket biasa dan hanya diberi tanda kecil **kisi-kisi otomatis**. Kisi-kisinya boleh dilengkapi kapan saja (tidak wajib): **Pustaka Paket → buka paket → Kisi-kisi .docx**, lengkapi di Word, lalu unggah di **Langkah 1** dengan kode yang sama. Bila nomor dan bentuknya cocok, tandanya dicabut."),

  /* ============================ 3 ============================ */
  H1("Pustaka Paket"),
  P("**Menu utama → Pustaka Paket** menampilkan satu baris untuk setiap kode ujian yang terlihat oleh Anda, dari kisi-kisi sampai hasil. Klik baris untuk membuka rinciannya. Tombol **Muat ulang** mengambil daftar terbaru."),
  H2("Paket mana yang terlihat"),
  TB(["Anda", "Paket yang tampil"], [
    ["**Guru**", "Paket buatan Anda sendiri · paket yang sudah di-**Publish** penyusunnya untuk mapel yang Anda ampu · paket tanpa penyusun (paket lama/dibuat operator) · paket yang pernah Anda pakai untuk membuka sesi."],
    ["**Operator**", "Tidak memakai Pustaka Paket; paket untuk asesmen bersama dipilih di Asesmen Bersama → Folder Soal. Pengawas juga tidak memakai Pustaka Paket."],
  ], [1.4, 5.1]),
  P("Aturan yang sama berlaku di Dasbor Hasil dan saat memilih paket di **Buka sesi baru**."),
  H2("Bilah Perlu tindakan dan saringan"),
  P("Di atas daftar ada bilah **Perlu tindakan** yang menghitung: kisi-kisi menunggu soal, paket dibuka tanpa peserta, dan paket yang keterangannya belum lengkap (jenis, penyusun, atau tingkat kosong). Ketuk salah satunya untuk menyaring. Bila tidak ada: *Tidak ada. Semua paket dalam keadaan baik.*"),
  P("Saringan: kotak cari (judul, kode, materi, mapel, kelas, jenis, atau guru; semua kata harus cocok), **Kelas**, **Jenis**, **Semester**, **Kelompok** (kelas, mata pelajaran, jenis, guru, semester, tanpa kelompok), **Urut** (terakhir diubah, terbaru dibuat, judul, kode, mapel), dan kolom **Mata pelajaran** di samping daftar. Pilihan saringan diingat di perangkat."),
  H2("Status paket"),
  TB(["Status", "Arti", "Tombol di ujung baris"], [
    ["**Menunggu soal**", "Kisi-kisi tersimpan, soal belum diterbitkan.", "Template soal"],
    ["**Siap dibuka**", "Sudah terbit, belum ada sesi terbuka dan belum ada hasil.", "Buka sesi"],
    ["**Sedang dibuka**", "Ada sesi ujian yang sedang terbuka.", "Sesi berjalan / N sesi berjalan"],
    ["**Selesai**", "Tidak ada sesi terbuka dan sudah ada hasil.", "Lihat hasil"],
    ["**Arsip**", "Diarsipkan (paket semester lalu).", "Kembalikan"],
  ], [1.4, 3.4, 1.7]),
  P("Pita kecil empat ruas di setiap baris menunjukkan jalur **Kisi-kisi → Soal → Dibuka/Ditutup → Hasil**. Tanda di judul: jenis paket (bila tidak dikelompokkan menurut jenis), **kisi-kisi otomatis**, dan **Belum publish**. Daftar bawaannya dikelompokkan menurut **jenis**."),
  H2("Rincian paket: Ujian · Soal · Kelola"),
  P("Pita ringkasan di atas berisi mapel, kelas, durasi, jumlah soal dan varian, jumlah hasil, keterangan paket, **penyusun**, dan **status Publish**. Di bawahnya tiga panel:"),
  TB(["Panel", "Tombol", "Fungsi"], [
    ["**Ujian**", "Buka sesi", "Membuka Menu utama → Buka sesi baru dengan paket ini terpilih."],
    ["", "Alamat siswa & QR", "Alamat halaman siswa dan QR-nya."],
    ["", "Lihat hasil", "Membuka Dasbor Hasil untuk paket ini."],
    ["**Soal**", "Coba soal", "Mengerjakan paket seperti siswa. Hasil dinilai tetapi **tidak disimpan**; kunci & pembahasan hanya tampil bila Anda penyusun atau operator."],
    ["", "Lihat soal & kunci", "Pratinjau seluruh soal dengan kunci, plus unduh soal & pembahasan / naskah siswa. Hanya penyusun dan operator."],
    ["", "Template soal .docx · Kisi-kisi .docx", "Mengunduh ulang template soal atau kisi-kisi."],
    ["", "Unduh JSON", "Cadangan paket."],
    ["**Kelola**", "Ubah judul & keterangan", "Judul, mata pelajaran (dari daftar Data Induk), jenis (droplist tetap dari sistem), semester, tingkat peserta, cakupan materi. Guru penyusun tampil tetapi tidak bisa diketik: ia mengikuti penyusun paket (lihat 3.6). Kode tidak bisa diubah."],
    ["", "Arsipkan / Kembalikan dari arsip", "Sesi yang masih terbuka ikut ditutup, paket disembunyikan, hasil tetap. Mengunggah ulang soal dengan kode yang sama juga mengeluarkannya dari arsip."],
    ["", "Hapus paket · Hapus kisi-kisi", "Bila paket punya hasil, Anda ditanya apakah hasilnya ikut dihapus (Batal = hasil tetap disimpan)."],
  ], [1, 2, 3.5]),
  P("Panel **Kelola** dan tombol **Lihat soal & kunci** hanya untuk penyusun paket dan operator. Guru lain melihat pesan bahwa paket itu milik penyusunnya, tetapi tetap bisa membuka sesi dan mencoba soalnya bila paket sudah di-Publish."),
  H2("Publish dan Unpublish"),
  P("Paket yang Anda terbitkan awalnya **Belum publish**: hanya Anda dan operator yang melihatnya. Untuk membagikannya kepada guru lain (mis. satu tim mapel), buka rincian paket dan tekan **Publish**. Status di pita ringkasan berubah menjadi **Publish · terlihat oleh guru yang mengampu** mapel paket itu."),
  TB(["Keadaan", "Yang terjadi"], [
    ["**Belum publish**", "Paket tidak muncul di Pustaka Paket, Dasbor Hasil, maupun pilihan Buka sesi milik guru lain. Coba soal dan Buka sesi oleh guru lain ditolak server."],
    ["**Publish**", "Guru yang mengampu mapel paket itu melihat paket, boleh mencoba soal dan membuka sesi untuk kelasnya. Kunci jawaban dan pengelolaan paket tetap hanya untuk penyusun dan operator."],
    ["**Unpublish** setelah dipakai", "Paket hilang lagi dari guru lain, **kecuali** guru yang pernah membuka sesi dengan paket itu: ia tetap melihat paket, sesi, dan hasil siswanya."],
    ["**Penyusun belum ditetapkan**", "Paket lama atau buatan operator/PIN bersama: *Terlihat oleh semua guru*. Tidak ada tombol Publish. Bila operator menetapkan penyusunnya, paket langsung berstatus Publish dan penyusun boleh meng-Unpublish."],
  ], [1.7, 4.8]),
  KOTAK("info", "Siapa yang mengampu mapel",
    "Diambil dari **jadwal KBM** periode terbaru di Data Induk, ditambah mapel utama guru. Mapel TL disamakan dengan mapel induknya (Matematika TL = Matematika). Guru yang belum punya mapel di jadwal tetap melihat semua paket yang di-Publish. Operator dan pengawas selalu melihat semua paket."),
  KOTAK("saran", "Kapan menekan Publish",
    "Publish paket yang memang dipakai bersama (mis. PAS satu angkatan, tryout yang dibuka beberapa guru). Biarkan Belum publish untuk ulangan harian kelas Anda sendiri atau paket yang masih disusun, supaya soalnya tidak dicoba guru lain sebelum waktunya."),
  H2("Penyusun paket (operator)"),
  P("Operator menekan **Atur** di samping nama penyusun untuk menetapkan atau mengganti penyusun paket, lalu **Simpan penyusun**. Pilihan *— tanpa penyusun —* membuat paket boleh dikelola semua guru."),
  KOTAK("info", "Keterangan Guru penyusun mengikuti Atur",
    "Teks **Guru penyusun** pada keterangan paket dan kisi-kisi selalu sama dengan penyusun yang dipilih di **Atur**. Mengganti penyusun otomatis mengganti teks itu; isian di **Ubah judul & keterangan** tidak bisa diketik."),

  /* ============================ 4 ============================ */
  H1("Latihan / Tryout"),
  P("**Menu utama → Latihan / Tryout** (dulu *Sesi Ujian*) menampilkan **sesi Anda** (yang Anda buka, atau untuk paket yang Anda susun; operator melihat semua) yang **sedang dibuka**, yang **terjadwal**, dan yang **ditutup dalam 12 jam terakhir**, diperbarui otomatis tiap 20 detik. Sesi yang lebih lama tetap terlihat di Dasbor Hasil (kartu *Sesi ujian untuk paket ini*)."),
  H2("Membuka latihan / tryout"),
  P("Tekan **+ Buka latihan / tryout**, lalu isi:"),
  TB(["Isian", "Arti"], [
    ["**Paket soal**", "Cari judul, kode, mapel, atau penyusun. Daftar dikelompokkan per mapel, tanpa paket arsip; tanda *sedang dibuka* bila paket itu sedang dipakai sesi lain."],
    ["**Peserta**", "**Kelas tertentu** (bawaan): ketuk chip kelas, atau **Kelas saya** (rombel yang Anda ampu menurut jadwal KBM), **Semua kelas 10/11/12**, **Kosongkan**. **Siswa tertentu**: cari nama/NISN, pilih semua yang tampil, atau **Tempel daftar NISN**. **Semua siswa**: seluruh siswa aktif."],
    ["**Cara siswa masuk**", "**Dengan kode akses**: siswa mengetik NISN + kode 6 angka yang Anda umumkan. **Tanpa kode akses (cukup NISN)**: selama jam sesi, siswa kelas peserta cukup membuka halaman depan dan mengetik NISN; siswa di luar peserta ditolak. Tanpa kode hanya untuk kelas atau siswa tertentu (bukan semua siswa)."],
    ["**Waktu**", "**Mulai sekarang** (sesi tertutup = sekarang + lama pengerjaan + kelonggaran), atau **Terjadwal**: isi **Bisa dibuka mulai** (paling jauh 7 hari ke depan; bawaan besok 07.00) dan **Sampai** (paling lama 14 hari sesudah mulai), mis. latihan di rumah Senin 07.00 s.d. Jumat 15.00. Sebelum jamnya, siswa diberi tahu *baru dimulai pukul …*. Lama pengerjaan tetap berlaku untuk tiap siswa sejak ia masuk."],
    ["**Sesudah siswa mengumpulkan**", "**Hanya nilai** (bawaan; siswa melihat nilai dan nomor benar/salah, cocok untuk asesmen di kelas) atau **Nilai + kunci & pembahasan** (cocok untuk latihan/belajar di rumah). Bisa diubah kapan saja lewat saklar **Pembahasan** di kartu sesi; pilihan terakhir Anda diingat untuk sesi berikutnya."],
    ["**Lama pengerjaan** (menit)", "Waktu untuk tiap siswa sejak ia masuk. Terisi dari durasi paket; 5–300 menit."],
    ["**Kelonggaran masuk** (menit)", "Tambahan waktu agar siswa yang terlambat masih bisa masuk. Bawaan 10 menit."],
    ["**Sesi tertutup**", "Mulai sekarang: dihitung otomatis (sekarang + lama pengerjaan + kelonggaran). Terjadwal: sama dengan isian Sampai. Sesudahnya siswa tidak bisa masuk."],
  ], [1.7, 4.8]),
  H3("Pengawasan & jalur tamu"),
  TB(["Isian", "Bawaan", "Arti"], [
    ["**Batas keluar halaman**", "5 kali", "Setelah keluar halaman sebanyak ini, ujian di HP siswa terkunci. 0 = tanpa batas (hanya dicatat)."],
    ["**Abaikan keluar di bawah**", "10 detik", "Keluar sesingkat ini (notifikasi diketuk, telepon ditolak, salah sentuh) hanya dicatat, tidak dihitung."],
    ["**Kode buka kunci**", "kosong", "Kode yang diketik pengawas di HP siswa yang terkunci. Kosong = PIN guru, pengawas, atau operator. PIN-PIN itu tetap berlaku walau kode diisi."],
    ["**Izinkan tamu**", "mati", "Siswa yang belum terdaftar boleh masuk dengan nama dan kelas memakai kode akses yang sama. Hasilnya bertanda *tamu*."],
  ], [1.8, 0.9, 3.8]),
  P("Isian pengawasan, kelonggaran, dan tamu diingat sebagai bawaan untuk sesi Anda berikutnya. Tekan **Buka**: server memberi **kode akses 6 angka** dan layar kode besar langsung tampil. Pada sesi tanpa kode akses, layar itu menampilkan alamat halaman siswa + QR dengan tulisan *Cukup NISN*; kode 6 angka tetap ada sebagai cadangan."),
  KOTAK("saran", "Contoh: literasi mingguan jam pertama",
    "Malam sebelumnya Tim Literasi membuka paket dengan **Tanpa kode akses**, peserta kelas yang ikut, **Jadwalkan** besok 07.00, lama pengerjaan 15 menit, kelonggaran 45 menit. Tautan halaman siswa dibagikan ke grup guru. Pagi harinya guru jam pertama cukup membagikan tautan; siswa mengetik NISN dan mengerjakan. Hasil masuk ke Dasbor Hasil Tim Literasi."),
  H2("Kode akses dan Tampilkan besar"),
  P("Kode akses unik di antara sesi yang terbuka, jadi kode sekaligus menentukan ujiannya dan hanya berlaku untuk peserta sesi itu. **Tampilkan besar** menampilkan kode, alamat halaman siswa, jam tutup, dan **QR** untuk proyektor. Siswa yang memindai QR mendapati kode sudah terisi dan tinggal mengetik NISN. Tutup dengan **Tutup tampilan** atau tombol Esc."),
  H2("Kartu sesi"),
  P("Setiap kartu menampilkan mapel, judul, kode paket, peserta, durasi, siapa yang membuka, status **Dibuka s.d. hh.mm**, **Terjadwal**, atau **Ditutup hh.mm**, kode akses (atau *Cukup NISN*), aturan pengawasan, dan hitungan **peserta · sudah masuk · sedang mengerjakan · selesai**. Tombol pengaturan hanya untuk guru yang membuka sesi itu dan operator:"),
  TB(["Tombol", "Fungsi"], [
    ["**− Kurangi | menit | + Tambah**", "Menggeser jam tutup sesi dan batas waktu siswa yang sedang mengerjakan. HP siswa menyesuaikan dalam ±1 menit. Pengurangan dibatasi agar sisa waktu minimal ±1 menit; bila sisa < 2 menit pakai *Tutup sekarang*."],
    ["**Tutup sekarang**", "Siswa tidak bisa masuk lagi. Yang sedang mengerjakan mengumpulkan jawabannya otomatis dalam ±1 menit."],
    ["**Buka kembali +** menit", "Untuk sesi yang sudah ditutup: memberi kesempatan siswa yang belum ikut. Yang sudah mengumpulkan tidak bisa mengulang."],
    ["**Pengawasan**", "Mengubah batas keluar, batas abaikan, dan kode buka saat ujian berjalan. Berlaku paling lambat 1 menit; hitungan keluar yang sudah terjadi tidak dihapus."],
    ["**Pembahasan**", "Saklar: siswa sesi ini yang sudah mengumpulkan boleh melihat kunci & pembahasan. Sesi lain dengan paket yang sama tidak ikut terbuka."],
    ["**Pantau siswa**", "Daftar peserta dan statusnya (semua peran)."],
    ["**Hasil**", "Membuka Dasbor Hasil tersaring untuk sesi ini (semua peran)."],
    ["**Hapus sesi**", "Hanya bila belum ada siswa yang masuk. Sesi yang sudah dipakai hilang sendiri dari daftar 12 jam setelah ditutup; hasilnya tetap di dasbor."],
  ], [1.8, 4.7]),
  H2("Cara waktu siswa dihitung"),
  P("Batas waktu tiap siswa dihitung **server**, sehingga jam HP yang salah tidak berpengaruh. Batasnya adalah yang **lebih awal** di antara (saat siswa **pertama** masuk + lama pengerjaan + tambahan) dan jam sesi tertutup."),
  STAT("Contoh: sesi dibuka 07.30, lama pengerjaan 90 menit, kelonggaran 10 menit → sesi tertutup 09.10.",
    ["07.30", "sesi dibuka"], ["09.00", "batas siswa yang masuk 07.30"], ["09.10", "batas siswa yang masuk 07.45"], ["09.10", "sesi tertutup"]),
  P("Akibatnya siswa yang masuk sangat terlambat mendapat waktu kurang dari lama pengerjaan. Bila perlu, tambahkan waktu dengan **+ Tambah**."),
  H2("Pantau siswa"),
  P("Tabel diperbarui tiap 20 detik dengan chip saring berikut (masing-masing dengan jumlahnya):"),
  TB(["Status", "Arti"], [
    ["**Belum masuk**", "Peserta belum memakai kode akses."],
    ["**Mengerjakan**", "Sudah masuk, belum selesai, HP memberi kabar dalam 3 menit terakhir. Di sampingnya *tersimpan hh.mm* = jam simpanan otomatis terakhir di server."],
    ["**Tidak aktif**", "Sudah masuk tetapi HP tidak memberi kabar lebih dari 3 menit (HP mati, tanpa sinyal, atau halaman ditutup)."],
    ["**Selesai**", "Sudah mengumpulkan di sesi ini, dengan nilainya."],
    ["**Sudah di sesi lain**", "Sudah punya hasil untuk paket ini dari sesi lain. Satu siswa hanya punya satu hasil per paket."],
  ], [1.6, 4.9]),
  P("Kolom lain: Nama (tanda *tamu*), Kelas, Nilai (dengan tanda *terlambat* atau *dari simpanan*), jam Masuk, dan **Keluar hal.** (terisi setelah siswa mengumpulkan)."),
  TB(["Tombol", "Kapan dipakai"], [
    ["**Lepas**", "Siswa harus pindah HP (baterai habis, HP rusak) atau mendapat pesan *sudah masuk di perangkat lain*. Siswa masuk lagi dengan NISN dan kode yang sama; jawaban yang sudah tersimpan ikut pindah, waktunya tetap dihitung sejak pertama masuk."],
    ["**Kumpulkan jawaban tersimpan (N)**", "Ada siswa yang tidak pernah mengirim jawaban akhir (HP mati). Siswa yang waktunya sudah habis lebih dari 2 menit dinilai dari simpanan terakhir dan bertanda *dari simpanan*. Siswa yang waktunya belum habis dilewati."],
  ], [2, 4.5]),
  H2("Yang dialami siswa"),
  P("Ringkasan berikut membantu guru dan pengawas menjelaskan aturan kepada siswa:"),
  UL("**Masuk**: buka halaman siswa, ketik NISN dan kode akses, periksa nama/kelas/ujian di layar *Apakah ini kamu?*, lalu **Ya, benar — mulai mengerjakan**. Tamu memakai *Belum terdaftar? Masuk sebagai tamu* (hanya bila diizinkan).",
    "**Soal diacak** per siswa: urutan soal, urutan pilihan, dan varian. Soal dengan teks bacaan yang sama tetap berdekatan.",
    "**Simpan otomatis**: jawaban disimpan di HP dan dikirim ke server tiap ±30 detik bila ada perubahan. Siswa melihat tanda ☁️ *Jawaban tersimpan di server hh:mm*.",
    "**Waktu habis**: jawaban dikumpulkan otomatis. Perpanjangan dan penutupan oleh guru langsung diberitahukan di layar siswa.",
    "**Keluar halaman**: sirene 2 detik berbunyi dan HP bergetar. Saat kembali muncul peringatan *Dilarang keras, keluar halaman ini selama ujian !!!* dan hitungan *Tercatat n kali — batas b*. Setelah batas tercapai muncul layar **Ujian dikunci**: pengawas mengetik kode buka (atau PIN) lalu **Buka kunci**, atau siswa menekan **Kumpulkan jawaban**. Hitungan dimulai lagi sejak dibuka pengawas.",
    "**Kumpulkan**: tombol **Kumpulkan jawaban** (ada peringatan bila masih ada soal kosong). Layar hasil menampilkan nilai, jumlah benar, capaian per level dan sub-materi, serta peta jawaban.",
    "**Gagal terkirim**: siswa menekan **Kirim ulang** atau **Salin kode hasil** dan mengirimkan kodenya kepada guru; operator memasukkannya lewat Admin → Impor Kode Hasil.",
    "**Pembahasan**: tombol **Lihat kunci & pembahasan** baru berhasil setelah guru menyalakan saklar Pembahasan pada sesi itu."),
  KOTAK("awas", "Halaman web tidak bisa mengunci HP",
    "Aplikasi hanya mendeteksi dan mencatat setiap kali halaman ujian ditinggalkan. Gunakan bersama pengawasan: kode akses diumumkan saat mulai, HP di atas meja, tanpa earphone, dan 2–4 varian soal. Sirene tidak berbunyi bila HP dalam mode senyap."),

  /* ============================ 5 ============================ */
  H1("Dasbor Hasil"),
  P("**Menu utama → Dasbor Hasil**. Dasbor membuka ujian yang terakhir Anda lihat di perangkat ini (atau yang dipilih dari Pustaka Paket / tombol Hasil di kartu sesi)."),
  H2("Memilih ujian"),
  P("Kartu **Ujian yang ditampilkan** berisi judul, jenis, tanda kisi-kisi otomatis, kode, mapel, tingkat, jumlah soal, penyusun, status, dan kemajuan *hasil/peserta*. Tekan **Ganti ujian** untuk membuka daftar: kotak cari, pilihan urut, chip status (**Semua** = semua yang tidak diarsipkan, **Sedang dibuka**, **Selesai**, **Siap dibuka**, **Arsip**), dan daftar per mata pelajaran. Esc menutup daftar; Enter di kotak cari memilih hasil pertama."),
  H2("Bilah status, sesi, dan peserta"),
  UL("**Bilah status**: jumlah soal, *hasil / peserta* dengan batang kemajuan, jumlah tamu, dan jam diperbarui. Tombol putar = muat ulang.",
    "**Sesi ujian untuk paket ini** (bisa diciutkan): semua sesi paket ini — titik hijau dibuka, abu-abu selesai — dengan peserta, jam, pembuka, kode, tanda pembahasan, dan *selesai/peserta*.",
    "**Peserta**: gabungan peserta semua sesi, dengan batang *sudah mengerjakan* dan *belum*. Tamu tidak dihitung."),
  H2("Saringan dan kotak ringkasan"),
  P("Saringan **Sesi** (Semua sesi, satu sesi, atau *Sebelum ada sesi*) dan **Kelas** berlaku untuk tab Rekap, Analisis butir, Sub-materi, dan unduhan Excel. Enam kotak ringkasan dihitung dari baris yang lolos saringan:"),
  TB(["Kotak", "Arti"], [
    ["**siswa mengerjakan**", "Jumlah hasil, termasuk tamu."],
    ["**rata-rata nilai**", "Rata-rata nilai, dibulatkan."],
    ["**tuntas ≥ 75**", "Persen siswa dengan nilai ≥ 75 (jumlahnya dalam kurung). Hijau bila ≥ 75%, kuning ≥ 50%, merah di bawahnya."],
    ["**nilai terendah / tertinggi**", "Nilai paling rendah dan paling tinggi."],
    ["**keluar halaman ≥ 5×**", "Jumlah siswa yang keluar halaman (yang dihitung) 5 kali atau lebih."],
  ], [2, 4.5]),
  P("Warna nilai di seluruh dasbor: **hijau ≥ 75**, **kuning 60–74**, **merah < 60**."),
  H2("Tab Rekap siswa"),
  TB(["Kolom", "Arti"], [
    ["Nama, NISN, Kelas", "Identitas. Tanda di samping nama: **tamu**; **terlambat N mnt** (jawaban akhir sampai lebih dari 2 menit setelah waktu habis — tetap dinilai dari HP); **dari simpanan** (dinilai dari simpanan otomatis karena HP tidak mengirim); **impor** (dimasukkan operator dari kode hasil)."],
    ["**Nilai** · **Benar**", "Nilai 0–100 dan jumlah soal yang benar."],
    ["Kolom level (Knowing, Applying, Reasoning)", "Persen benar siswa pada soal-soal level itu, dengan batang kecil."],
    ["**Terlemah**", "Sub-materi dengan persen benar terendah pada siswa itu."],
    ["**Waktu**", "Lama mengerjakan (menit:detik)."],
    ["**Keluar**", "**a× / b**: a = keluar yang dihitung, b = semua kejadian termasuk yang sekejap. Arahkan kursor untuk melihat jam dan lamanya tiap kejadian. Merah bila ≥ 5, kuning bila ≥ 1."],
    ["**reset** · **hapus**", "Lihat 5.9."],
  ], [2, 4.5]),
  KOTAK("saran", "Membaca kolom Keluar",
    "1× / 6 berarti siswa sering keluar sekejap (mis. notifikasi) tetapi hanya sekali cukup lama untuk dihitung. 6× / 6 dengan kejadian 40 detik berulang perlu ditanyakan kepada siswa dan pengawas."),
  H2("Tab Analisis butir"),
  TB(["Kolom", "Arti"], [
    ["**No**", "Nomor soal menurut kisi-kisi (bukan urutan acak di HP)."],
    ["Sub-materi, Level, Bentuk", "Dari kisi-kisi."],
    ["**n**", "Jumlah siswa yang mendapat soal ini."],
    ["**% benar**", "Persen siswa yang menjawab benar."],
    ["**Kesukaran**", "**sukar** < 30% · **sedang** 30–70% · **mudah** > 70%."],
    ["**Var. A / B / …**", "Persen benar tiap varian (dengan n). Selisih besar antarvarian berarti tingkat kesulitan varian tidak setara."],
  ], [1.6, 4.9]),
  H2("Tab Sub-materi"),
  P("Menampilkan persen benar kelas **per level kognitif** dan **per sub-materi** (terendah di atas), lalu **Rekomendasi tindak lanjut**: sampai 3 sub-materi di bawah 60% dengan saran remedial terarah, atau keterangan bahwa tidak ada sub-materi di bawah 60%."),
  H2("Tab Belum mengerjakan dan Riwayat siswa"),
  UL("**Belum mengerjakan**: peserta (gabungan semua sesi) yang belum punya hasil, mengikuti saringan Kelas. Untuk satu sesi saja, pakai **Pantau siswa** di Latihan / Tryout.",
    "**Riwayat siswa**: nilai siswa lintas ujian. Ketik NISN (4 angka atau lebih) atau nama lalu **Cari**; atau kosongkan dan pilih kelas pada saringan Kelas. Kolomnya satu per kode ujian, ditambah rata-rata."),
  H2("Unduh rekap (Excel)"),
  P("Tombol **Unduh rekap** membuat berkas **Hasil_<KODE>_<kelas>_<tanggal>.xlsx** yang mengikuti saringan sesi dan kelas (perlu internet). Isinya empat lembar:"),
  TB(["Lembar", "Isi"], [
    ["**Rekap**", "Kop sekolah, ringkasan (peserta, rata-rata, tuntas, terendah, tertinggi, keluar ≥ 5×), dan tabel siswa: nilai, benar, persen per level, sub-materi terlemah, durasi, keluar, varian, jam selesai, keterangan (tamu, tuntas/belum tuntas, terlambat, dari simpanan, impor)."],
    ["**Jawaban per Soal**", "1 = benar, 0 = salah untuk setiap soal (S1, S2, …), baris level, dan persen siswa yang menjawab benar per soal."],
    ["**Analisis Butir**", "Sama dengan tab Analisis butir."],
    ["**Sub-materi & Level**", "Persen per level (perlu penguatan < 60, cukup < 75, baik), per sub-materi dengan nomor soalnya dan tindak lanjut (remedial terarah < 60, latihan tambahan < 75, pengayaan), serta rekomendasi."],
  ], [1.7, 4.8]),
  H2("Reset dan hapus hasil"),
  TB(["Tombol", "Akibat", "Siapa"], [
    ["**reset**", "Hasil siswa dihapus dan ia **boleh mengerjakan ulang** (di sesi yang masih terbuka). Untuk siswa yang terkendala teknis.", "penyusun paket, guru yang membuka sesinya, operator"],
    ["**hapus**", "Hasil dihapus (mis. hasil uji tamu yang salah).", "sama"],
  ], [1, 3.7, 1.8]),
  H2("NISN Siswa"),
  P("**Menu utama → NISN Siswa** membantu siswa yang lupa NISN. Guru melihat kelas yang diampunya menurut jadwal KBM; pengawas dan operator melihat semua kelas. Cari nama atau NISN, atau ketuk chip kelas; NISN tampil besar dengan tombol **Salin NISN**. Pilih ujian pada *Tandai sudah/belum mengerjakan* untuk melihat siapa yang sudah, belum, atau bukan peserta. Jangan perlihatkan layar ini kepada siswa lain."),

  /* ============================ 6 ============================ */
  H1("Dari Data ke Tindakan"),
  H2("Situasi umum dan tindakan"),
  TB(["Situasi", "Tindakan"], [
    ["Siswa: *Kode akses salah, atau sesi ujiannya sudah ditutup*", "Periksa kode di kartu sesi dan jam tutupnya. Bila sudah tertutup: **Buka kembali +** menit, atau **+ Tambah** sebelum tertutup."],
    ["Siswa: *Kode ini bukan untuk kelasmu*", "Siswa tidak termasuk peserta sesi. Buka sesi baru untuk kelasnya, atau pastikan ia memakai kode sesi kelasnya."],
    ["Siswa: *NISN tidak terdaftar*", "Cari namanya di **NISN Siswa**. Bila memang belum ada, minta operator menambahkannya, atau izinkan tamu."],
    ["Siswa: *sudah masuk ujian ini di perangkat lain*", "**Pantau siswa → Lepas** pada namanya, lalu siswa masuk lagi."],
    ["HP siswa mati di tengah ujian", "Pinjamkan HP lain → **Lepas** → masuk lagi; jawaban yang tersimpan pulih. Bila tidak sempat, setelah waktunya habis tekan **Kumpulkan jawaban tersimpan**."],
    ["Ujian di HP siswa terkunci", "Pengawas mengetik kode buka (atau PIN guru/pengawas/operator) di HP siswa lalu **Buka kunci**."],
    ["Siswa terkendala teknis dan harus mengulang", "Dasbor Hasil → **reset** pada namanya (sesi harus masih terbuka atau dibuka kembali)."],
    ["Rata-rata rendah dan banyak soal **sukar**", "Periksa kunci soal yang % benarnya sangat rendah (mungkin kunci salah), lalu remedial pada sub-materi di Rekomendasi."],
    ["Selisih % benar antarvarian besar", "Varian tidak setara. Perbaiki varian yang terlalu sulit/mudah sebelum paket dipakai lagi."],
    ["Banyak siswa **keluar halaman ≥ 5×**", "Lihat rincian waktu di kolom Keluar, bicarakan dengan pengawas; pertimbangkan batas keluar yang lebih ketat atau lebih banyak varian."],
    ["Guru lain tidak menemukan paket Anda", "Paket masih **Belum publish** (buka Pustaka Paket → rincian paket → **Publish**), atau guru itu tidak mengampu mapel paket tersebut di jadwal KBM Data Induk."],
  ], [2.4, 4.1]),
  H2("Tanya jawab singkat"),
  TB(["Pertanyaan", "Jawaban"], [
    ["Apakah siswa bisa mengerjakan paket yang sama dua kali?", "Tidak. Satu siswa satu hasil per paket, juga di sesi lain. Untuk mengulang, guru menekan **reset**."],
    ["Apakah kunci jawaban dikirim ke HP siswa?", "Tidak. Penilaian dilakukan di server. Kunci hanya terlihat oleh penyusun dan operator, dan oleh siswa setelah saklar Pembahasan dinyalakan."],
    ["Bolehkah membuka paket yang sama untuk beberapa kelas?", "Boleh: satu sesi untuk beberapa kelas, atau sesi terpisah per kelas dengan kode berbeda."],
    ["Apakah Publish membuat guru lain bisa mengubah soal saya?", "Tidak. Publish hanya membuat paket terlihat dan bisa dipakai untuk sesi. Kunci dan pengelolaan tetap milik penyusun dan operator."],
    ["Apakah Coba soal tercatat sebagai hasil?", "Tidak. Hasil uji coba dinilai tetapi tidak disimpan."],
    ["Mengapa tombol Buka sesi atau Kelola tidak tampil?", "Anda masuk dengan PIN pengawas, atau paket itu bukan milik Anda (Kelola). Tombol pengaturan sesi hanya untuk guru yang membukanya dan operator."],
    ["Bagaimana dengan paket semester lalu?", "**Arsipkan** di Pustaka Paket: tersembunyi, hasil tetap, bisa dikembalikan lewat chip Arsip."],
  ], [2.5, 4]),

  /* ============================ 7 ============================ */
  H1("Untuk Operator"),
  P("Menu **Admin** (hanya PIN operator/kurikulum) berisi tab berikut:"),
  TB(["Tab", "Isi"], [
    ["**Data Siswa**", "**Tarik dari data induk** (sumber yang tersimpan di server) atau unggah Excel/CSV Dapodik (semua sheet dibaca) → periksa **Pemetaan kolom** → **Simpan ke server**. Centang *nonaktifkan siswa yang tidak ada dalam data ini* untuk siswa keluar (peringatan bila > 20% siswa terdampak). **Tambah / ubah satu siswa** untuk mutasi; per baris: ubah, nonaktifkan/aktifkan, hapus. Siswa nonaktif tidak bisa masuk ujian; riwayat nilainya tetap."],
    ["**PIN Guru**", "**Tarik guru dari Data Induk** → **Buat PIN untuk guru yang belum punya** → bagikan **Kartu PIN** (Bagikan ke WhatsApp, Unduh PNG, Unduh XLSX). **Ubah PIN…** melalui empat langkah (pilih aksi, alasan, ketik ID guru, PIN operator) dan tercatat. Setelah semua guru memegang PIN pribadi: **Matikan PIN guru bersama**."],
    ["**Impor Kode Hasil**", "Tempel kode hasil dari siswa yang gagal mengirim (satu per baris) → **Nilai & simpan**. Hasilnya bertanda *impor*."],
    ["**Cadangan**", "**Unduh cadangan** (paket, siswa, hasil; PIN opsional) dan **Pulihkan** (gabung/timpa). **Ukuran database & arsip semester**: arsipkan semester yang sudah berakhir (unduh berkas arsip, lalu kosongkan rincian jawaban dengan mengetik ARSIPKAN <SEMESTER>). Nilai dan analisis butir tetap di database; berkas arsip dibuka dengan **Buka Arsip**."],
  ], [1.4, 5.1]),
  P("Penyusun paket lama diatur di **Pustaka Paket → rincian paket → Atur** (lihat 3.6)."),
];

/* ================= Penomoran judul ================= */
(function nomori() { const n = [0, 0, 0];
  ISI.forEach(b => { if (!/^h[123]$/.test(b.t)) return; const k = +b.t[1] - 1; n[k]++; for (let i = k + 1; i < 3; i++) n[i] = 0;
    b.no = k === 0 ? `${n[0]}.` : n.slice(0, k + 1).join("."); b.id = "b" + n.slice(0, k + 1).join("-"); }); })();
const DAFTAR = ISI.filter(b => b.t === "h1" || b.t === "h2");

/* ================= HTML untuk PDF ================= */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const sebaris = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const WARNA_KOTAK = { info: ["#2F7FD8", "#E8F1FC"], saran: ["#2E9E5B", "#E7F5EC"], awas: ["#C98A12", "#FDF4E1"], bahaya: ["#D9534F", "#FBE9E8"] };
function htmlBlok(b) {
  if (b.t === "h1") return `<h1 id="${b.id}">${b.no} ${sebaris(b.s)}</h1>`;
  if (b.t === "h2") return `<h2 id="${b.id}">${b.no} ${sebaris(b.s)}</h2>`;
  if (b.t === "h3") return `<h3 id="${b.id}">${b.no} ${sebaris(b.s)}</h3>`;
  if (b.t === "p") return `<p>${sebaris(b.s)}</p>`;
  if (b.t === "ul" || b.t === "ol") return `<${b.t}>${b.a.map(x => `<li>${sebaris(x)}</li>`).join("")}</${b.t}>`;
  if (b.t === "tb") { const tot = b.lebar.reduce((a, x) => a + x, 0);
    return `<table><colgroup>${b.lebar.map(w => `<col style="width:${(w / tot * 100).toFixed(1)}%">`).join("")}</colgroup><thead><tr>${b.kepala.map(k => `<th>${sebaris(k)}</th>`).join("")}</tr></thead>
      <tbody>${b.baris.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="pertama"' : ""}>${sebaris(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`; }
  if (b.t === "kotak") { const [w, l] = WARNA_KOTAK[b.jenis];
    return `<div class="kotak" style="border-color:${w};background:${l}"><div class="kotak-judul" style="color:${w}">${sebaris(b.judul)}</div>${b.isi.map(x => `<p>${sebaris(x)}</p>`).join("")}</div>`; }
  if (b.t === "stat") return `<div class="stat">${b.a.map(([a, k]) => `<div><b>${esc(a)}</b><span>${esc(k)}</span></div>`).join("")}</div><p class="stat-ket">${esc(b.ket)}</p>`;
  throw new Error("Blok tidak dikenal: " + b.t);
}
function buatHTML() {
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>${JUDUL}</title><style>
  @page { size: A4; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Calibri, "Segoe UI", Carlito, sans-serif; font-size: 10.5pt; line-height: 1.45; color: #1F2633; }
  b { font-weight: 700; }
  .sampul { height: 247mm; display: flex; flex-direction: column; justify-content: center; break-after: page; }
  .sampul .atas { font-size: 11pt; font-weight: 700; letter-spacing: .08em; color: #8F6B1A; }
  .sampul h1 { break-before: auto; font-size: 34pt; color: #1D2A3A; margin: 10px 0 6px; border: 0; padding: 0; }
  .sampul .sub { font-size: 15pt; color: #33445A; }
  .sampul .garis { height: 4px; background: linear-gradient(90deg, #1D2A3A 0 70%, #F2B92E 70%); margin: 34px 0 22px; border-radius: 2px; }
  .sampul ul { margin: 8px 0 0; } .sampul .kaki { margin-top: 70px; color: #556070; font-size: 9.5pt; }
  .daftar { break-after: page; } .daftar h1 { break-before: auto; }
  .daftar a { color: inherit; text-decoration: none; display: block; padding: 3px 0; border-bottom: 1px dotted #C9D2DE; }
  .daftar .d1 { font-weight: 700; margin-top: 8px; } .daftar .d2 { padding-left: 18px; color: #33445A; }
  h1 { break-before: page; font-size: 19pt; color: #1D2A3A; margin: 0 0 12px; padding-bottom: 6px; border-bottom: 2.5px solid #1D2A3A; }
  h2 { font-size: 13.5pt; color: #1D2A3A; margin: 20px 0 6px; break-after: avoid; }
  h3 { font-size: 11.5pt; color: #2F6FB8; margin: 14px 0 4px; break-after: avoid; }
  p { margin: 0 0 8px; } ul, ol { margin: 0 0 10px; padding-left: 22px; } li { margin: 0 0 4px; }
  table { width: 100%; border-collapse: collapse; margin: 6px 0 14px; font-size: 9.5pt; }
  th { background: #1D2A3A; color: #fff; text-align: left; padding: 6px 8px; font-weight: 700; }
  td { padding: 6px 8px; border-bottom: 1px solid #D5DCE6; vertical-align: top; }
  tbody tr:nth-child(even) td { background: #F6F8FB; } tr { break-inside: avoid; } td.pertama { font-weight: 400; }
  .kotak { border-left: 5px solid; border-radius: 4px; padding: 10px 14px; margin: 8px 0 14px; break-inside: avoid; font-size: 9.8pt; }
  .kotak-judul { font-weight: 700; margin-bottom: 3px; } .kotak p { margin: 0 0 4px; }
  .stat { display: flex; gap: 6px; margin: 8px 0 2px; break-inside: avoid; }
  .stat div { flex: 1; background: #EEF2F7; border-radius: 6px; padding: 8px 6px; text-align: center; }
  .stat b { display: block; font-size: 17pt; color: #1D2A3A; line-height: 1.1; } .stat span { font-size: 8.5pt; color: #556070; }
  .stat-ket { text-align: center; font-size: 8.5pt; font-style: italic; color: #8A93A3; margin-bottom: 12px; }
  </style></head><body>
  <section class="sampul"><div class="atas">ASESMEN MERDEKA · SMA PLUS MERDEKA SOREANG</div><h1>${JUDUL}</h1>
    <div class="sub">${SUBJUDUL}</div><div class="garis"></div>
    <p>Isi panduan ini:</p><ul>${ISI.filter(b => b.t === "h1").map(b => `<li><b>${esc(b.s)}</b></li>`).join("")}</ul>
    <div class="kaki">Untuk: ${UNTUK}<br>Versi: ${VERSI} (sesuai tampilan aplikasi per tanggal tersebut)</div></section>
  <section class="daftar"><h1>Daftar Isi</h1>${DAFTAR.map(b => `<a class="d${b.t[1]}" href="#${b.id}">${b.no} ${sebaris(b.s)}</a>`).join("")}</section>
  ${ISI.map(htmlBlok).join("\n")}
  </body></html>`;
}

/* ================= Cetak PDF lewat Chrome/Edge (DevTools Protocol) ================= */
function cariPeramban() {
  const calon = [process.env.CHROME, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome", "/usr/bin/chromium", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"];
  const ada = calon.find(p => p && fs.existsSync(p)); if (!ada) throw new Error("Chrome/Edge tidak ditemukan. Atur variabel CHROME ke lokasi chrome.exe."); return ada;
}
const tunggu = ms => new Promise(r => setTimeout(r, ms));
async function cetakPDF(berkasHTML, keluaran) {
  const port = 9300 + Math.floor(Math.random() * 500), profil = fs.mkdtempSync(path.join(os.tmpdir(), "panduan-"));
  const p = spawn(cariPeramban(), ["--headless=new", "--disable-gpu", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, "about:blank"], { stdio: "ignore" });
  try {
    let daftar;
    for (let i = 0; i < 100 && !daftar; i++) { try { daftar = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch (e) { await tunggu(150); } }
    const hal = daftar && daftar.find(x => x.type === "page"); if (!hal) throw new Error("Peramban tidak merespons.");
    const ws = new WebSocket(hal.webSocketDebuggerUrl); await new Promise((ok, gagal) => { ws.onopen = ok; ws.onerror = gagal; });
    let id = 0; const janji = new Map(), acara = [];
    ws.onmessage = m => { const x = JSON.parse(m.data); if (x.id && janji.has(x.id)) { janji.get(x.id)(x); janji.delete(x.id); } else if (x.method) acara.push(x.method); };
    const kirim = (method, params = {}) => new Promise(ok => { const k = ++id; janji.set(k, ok); ws.send(JSON.stringify({ id: k, method, params })); });
    await kirim("Page.enable");
    await kirim("Page.navigate", { url: "file:///" + berkasHTML.replace(/\\/g, "/") });
    for (let i = 0; i < 100 && !acara.includes("Page.loadEventFired"); i++) await tunggu(100);
    await kirim("Runtime.evaluate", { expression: "document.fonts.ready.then(() => 1)", awaitPromise: true });
    const gaya = "font-family:Calibri,'Segoe UI',sans-serif;font-size:8px;color:#8A93A3;width:100%;padding:0 18mm;";
    const opsi = { printBackground: true, displayHeaderFooter: true, paperWidth: 8.27, paperHeight: 11.69, marginTop: 0.75, marginBottom: 0.7, marginLeft: 0.71, marginRight: 0.71,
      headerTemplate: `<div style="${gaya}text-align:right">${JUDUL}</div>`,
      footerTemplate: `<div style="${gaya}text-align:center">Halaman <span class="pageNumber"></span> dari <span class="totalPages"></span></div>`,
      generateDocumentOutline: true, generateTaggedPDF: true };
    let r = await kirim("Page.printToPDF", opsi);
    if (r.error) { delete opsi.generateDocumentOutline; delete opsi.generateTaggedPDF; r = await kirim("Page.printToPDF", opsi); }   // Chrome lama
    if (r.error) throw new Error(r.error.message);
    fs.writeFileSync(keluaran, Buffer.from(r.result.data, "base64")); ws.close();
  } finally { p.kill(); await tunggu(400); try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) { /* biarkan */ } }
}

/* ================= Word (.docx) ================= */
async function buatDOCX(keluaran) {
  const D = require("docx");
  const LEBAR = 9638;   // lebar isi A4 dengan margin 2 cm (twip)
  const lari = (s, o = {}) => String(s).split(/(\*\*.+?\*\*)/).filter(Boolean).map(x => /^\*\*.+\*\*$/.test(x) ? new D.TextRun({ text: x.slice(2, -2), bold: true, ...o }) : new D.TextRun({ text: x, ...o }));
  const par = (s, o = {}, r = {}) => new D.Paragraph({ children: lari(s, r), spacing: { after: 120 }, ...o });
  const garis = { style: D.BorderStyle.SINGLE, size: 4, color: "D5DCE6" }, kosong = { style: D.BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const sel = (isi, lebar, o = {}) => new D.TableCell({ width: { size: lebar, type: D.WidthType.DXA }, margins: { top: 70, bottom: 70, left: 110, right: 110 }, children: isi, ...o });
  let nomorDaftar = 0;
  const blok = b => {
    if (b.t === "h1") return [new D.Paragraph({ heading: D.HeadingLevel.HEADING_1, pageBreakBefore: true, children: lari(`${b.no} ${b.s}`) })];
    if (b.t === "h2") return [new D.Paragraph({ heading: D.HeadingLevel.HEADING_2, children: lari(`${b.no} ${b.s}`) })];
    if (b.t === "h3") return [new D.Paragraph({ heading: D.HeadingLevel.HEADING_3, children: lari(`${b.no} ${b.s}`) })];
    if (b.t === "p") return [par(b.s)];
    if (b.t === "ul") return b.a.map(x => par(x, { bullet: { level: 0 }, spacing: { after: 60 } }));
    if (b.t === "ol") { const n = ++nomorDaftar; return b.a.map(x => par(x, { numbering: { reference: "angka", level: 0, instance: n }, spacing: { after: 60 } })); }
    if (b.t === "tb") { const tot = b.lebar.reduce((a, x) => a + x, 0), w = b.lebar.map(x => Math.round(x / tot * LEBAR));
      return [new D.Table({ width: { size: LEBAR, type: D.WidthType.DXA }, columnWidths: w,
        borders: { top: garis, bottom: garis, left: kosong, right: kosong, insideHorizontal: garis, insideVertical: kosong },
        rows: [new D.TableRow({ tableHeader: true, cantSplit: true, children: b.kepala.map((k, i) => sel([par(k, { spacing: { after: 0 } }, { bold: true, color: "FFFFFF", size: 19 })], w[i], { shading: { type: D.ShadingType.CLEAR, color: "auto", fill: "1D2A3A" } })) }),
          ...b.baris.map((r, j) => new D.TableRow({ cantSplit: true, children: r.map((c, i) => sel([par(c, { spacing: { after: 0 } }, { size: 19 })], w[i], j % 2 ? { shading: { type: D.ShadingType.CLEAR, color: "auto", fill: "F6F8FB" } } : {})) }))] }),
        new D.Paragraph({ spacing: { after: 120 }, children: [] })]; }
    if (b.t === "kotak") { const [w, l] = WARNA_KOTAK[b.jenis].map(x => x.slice(1));
      return [new D.Table({ width: { size: LEBAR, type: D.WidthType.DXA }, columnWidths: [LEBAR],
        borders: { top: kosong, bottom: kosong, right: kosong, left: { style: D.BorderStyle.SINGLE, size: 30, color: w }, insideHorizontal: kosong, insideVertical: kosong },
        rows: [new D.TableRow({ cantSplit: true, children: [sel([par(b.judul, { spacing: { after: 40 } }, { bold: true, color: w, size: 20 }), ...b.isi.map(x => par(x, { spacing: { after: 40 } }, { size: 19 }))], LEBAR,
          { shading: { type: D.ShadingType.CLEAR, color: "auto", fill: l }, margins: { top: 120, bottom: 120, left: 200, right: 160 } })] })] }),
        new D.Paragraph({ spacing: { after: 120 }, children: [] })]; }
    if (b.t === "stat") { const w = Math.floor(LEBAR / b.a.length), putih = { style: D.BorderStyle.SINGLE, size: 24, color: "FFFFFF" };
      return [new D.Table({ width: { size: LEBAR, type: D.WidthType.DXA }, columnWidths: b.a.map(() => w),
        borders: { top: putih, bottom: putih, left: putih, right: putih, insideHorizontal: putih, insideVertical: putih },
        rows: [new D.TableRow({ cantSplit: true, children: b.a.map(([a, k]) => sel([
          new D.Paragraph({ alignment: D.AlignmentType.CENTER, children: [new D.TextRun({ text: a, bold: true, size: 34, color: "1D2A3A" })] }),
          new D.Paragraph({ alignment: D.AlignmentType.CENTER, children: [new D.TextRun({ text: k, size: 16, color: "556070" })] })], w, { shading: { type: D.ShadingType.CLEAR, color: "auto", fill: "EEF2F7" } })) })] }),
        new D.Paragraph({ alignment: D.AlignmentType.CENTER, spacing: { before: 40, after: 160 }, children: [new D.TextRun({ text: b.ket, italics: true, size: 16, color: "8A93A3" })] })]; }
    throw new Error("Blok tidak dikenal: " + b.t);
  };
  const sampul = [
    new D.Paragraph({ spacing: { before: 3200, after: 120 }, children: [new D.TextRun({ text: "ASESMEN MERDEKA · SMA PLUS MERDEKA SOREANG", bold: true, size: 22, color: "8F6B1A" })] }),
    new D.Paragraph({ spacing: { after: 120 }, children: [new D.TextRun({ text: JUDUL, bold: true, size: 64, color: "1D2A3A" })] }),
    new D.Paragraph({ spacing: { after: 400 }, border: { bottom: { style: D.BorderStyle.SINGLE, size: 24, color: "1D2A3A", space: 18 } },
      children: [new D.TextRun({ text: SUBJUDUL, size: 30, color: "33445A" })] }),
    par("Isi panduan ini:"),
    ...ISI.filter(b => b.t === "h1").map(b => par(`**${b.s}**`, { bullet: { level: 0 }, spacing: { after: 40 } })),
    new D.Paragraph({ spacing: { before: 1400, after: 0 }, children: [new D.TextRun({ text: "Untuk: " + UNTUK, size: 19, color: "556070" })] }),
    new D.Paragraph({ children: [new D.TextRun({ text: `Versi: ${VERSI} (sesuai tampilan aplikasi per tanggal tersebut)`, size: 19, color: "556070" })] }),
  ];
  const daftarIsi = [new D.Paragraph({ heading: D.HeadingLevel.HEADING_1, children: [new D.TextRun("Daftar Isi")] }),
    ...DAFTAR.map(b => new D.Paragraph({ spacing: { after: 50, before: b.t === "h1" ? 140 : 0 }, indent: { left: b.t === "h1" ? 0 : 360 },
      children: lari(`${b.no} ${b.s}`, { bold: b.t === "h1", color: b.t === "h1" ? "1F2633" : "33445A" }) }))];
  const kepala = new D.Header({ children: [new D.Paragraph({ alignment: D.AlignmentType.RIGHT, children: [new D.TextRun({ text: JUDUL, size: 16, color: "8A93A3" })] })] });
  const kaki = new D.Footer({ children: [new D.Paragraph({ alignment: D.AlignmentType.CENTER, children: [new D.TextRun({ children: ["Halaman ", D.PageNumber.CURRENT], size: 16, color: "8A93A3" })] })] });
  const halaman = { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } };
  const doc = new D.Document({
    creator: "Asesmen Merdeka", title: JUDUL, description: SUBJUDUL,
    styles: { default: { document: { run: { font: "Calibri", size: 21, color: "1F2633" }, paragraph: { spacing: { line: 276 } } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, color: "1D2A3A" },
          paragraph: { spacing: { before: 0, after: 200 }, border: { bottom: { style: D.BorderStyle.SINGLE, size: 18, color: "1D2A3A", space: 6 } } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 27, bold: true, color: "1D2A3A" }, paragraph: { spacing: { before: 320, after: 100 }, keepNext: true } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 23, bold: true, color: "2F6FB8" }, paragraph: { spacing: { before: 220, after: 80 }, keepNext: true } }] },
    numbering: { config: [{ reference: "angka", levels: [{ level: 0, format: D.LevelFormat.DECIMAL, text: "%1.", alignment: D.AlignmentType.START, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
    sections: [{ properties: halaman, children: sampul },
      { properties: halaman, headers: { default: kepala }, footers: { default: kaki }, children: [...daftarIsi, ...ISI.flatMap(blok)] }],
  });
  fs.writeFileSync(keluaran, await D.Packer.toBuffer(doc));
}

(async () => {
  const html = path.join(os.tmpdir(), NAMA + ".html"); fs.writeFileSync(html, buatHTML());
  if (process.argv.includes("--html")) { fs.copyFileSync(html, path.join(AKAR, NAMA + ".html")); console.log("HTML →", NAMA + ".html"); }
  await cetakPDF(html, path.join(AKAR, NAMA + ".pdf")); console.log("PDF  →", NAMA + ".pdf");
  await buatDOCX(path.join(AKAR, NAMA + ".docx")); console.log("DOCX →", NAMA + ".docx");
})().catch(e => { console.error("Gagal:", e.message); process.exit(1); });
