/* Isi Panduan Pantau Kurikulum (22 Okt 2026): cara membaca informasi & grafik di kurikulum.html.
   Dipakai oleh buat-panduan.js dengan pilihan --kurikulum:  node alat/buat-panduan.js --kurikulum */
"use strict";
module.exports = ({ H1, H2, H3, P, UL, OL, TB, KOTAK, STAT }) => [
  /* ============================ 1 ============================ */
  H1("Mengenal Pantau Kurikulum"),
  P("**Pantau Kurikulum** adalah halaman khusus kurikulum untuk melihat seluruh kegiatan asesmen di Asesmen Merdeka: paket soal yang disusun guru, tingkat berpikir soal (C1–C6 / HOTS), sesi yang dibuka di setiap kelas, hasil dan analisis siswa, perkembangan siswa, serta keterlaksanaan asesmen tiap guru. Semua guru, semua mapel, dan semua kelas terlihat."),
  KOTAK("info", "Halaman pantauan",
    "Halaman Pantau Kurikulum **tidak mengubah apa pun**: tidak membuka sesi, mengubah paket, atau menghapus hasil. Aman dibuka kapan saja, termasuk saat ujian berlangsung. Pengelolaan Tryout Umum dan Asesmen Bersama dilakukan di menunya masing-masing."),
  H2("Cara masuk"),
  OL("Buka Asesmen Merdeka, ketuk **Masuk guru / pengawas**.",
    "Ketik **PIN kurikulum** lalu **Masuk**. Menu utama Kurikulum tampil; ketuk **Pantau Kurikulum**.",
    "Tombol **Keluar** di pojok kanan atas untuk mengakhiri. PIN berlaku selama peramban terbuka."),
  TB(["Kelompok menu Kurikulum", "Isi", "Hak"], [
    ["**Pantauan & koordinasi**", "Pantau Kurikulum · Tryout Umum", "Pantau: melihat. Tryout Umum: mengelola penuh seperti koordinator (jadwal, pasang soal, sesi & link, unggah atas nama guru)."],
    ["**Asesmen Bersama (PAS)**", "Asesmen Bersama · Kontrol Pelaksanaan", "Mengelola penuh seperti operator."],
    ["**Kegiatan guru**", "Latihan / Tryout · Dasbor Hasil · Pustaka Paket · NISN Siswa", "Semua guru, hanya melihat (tidak membuka sesi atau mengunggah atas nama sendiri, agar keaktifan guru tetap terhitung benar)."],
  ], [1.6, 2.2, 3.4]),
  P("Tautan **Tryout Umum** dan **Menu utama** di kepala halaman membawa Anda ke menu lain tanpa memasukkan PIN lagi. Menu **Admin** (data siswa, PIN guru, cadangan) tetap milik operator."),
  H2("Empat menu, delapan tab"),
  P("Menu utama ada empat. Menu yang berisi lebih dari satu halaman menampilkan **tab di bawahnya** (garis emas menandai tab yang sedang dibuka); tiap menu mengingat tab terakhir yang Anda buka."),
  TB(["Menu → tab", "Menjawab pertanyaan"], [
    ["**Ringkasan**", "Bagaimana gambaran asesmen sekolah secara umum? Apa temuan terpentingnya?"],
    ["**Guru** → Guru & Paket", "Siapa saja guru yang sudah mengunggah soal dan melatih siswa? Paket apa yang disusun tiap guru, dan bagaimana hasil siswanya?"],
    ["**Guru** → Keterlaksanaan", "Guru mana yang sudah aktif berasesmen, mana yang perlu didorong, dan siapa yang perlu ditindaklanjuti?"],
    ["**Paket & Sesi** → Paket & Kisi-kisi", "Paket apa saja yang disusun, kapan diunggah, dan apakah soalnya sudah HOTS (C4–C6)?"],
    ["**Paket & Sesi** → Sesi & Pelaksanaan", "Sesi apa yang dibuka, di kelas mana, kapan, dan berapa siswa yang mengerjakan?"],
    ["**Hasil Siswa** → Hasil & Analisis", "Untuk satu paket: bagaimana sebaran nilai, kelas mana yang tertinggal, soal dan sub-materi mana yang sulit?"],
    ["**Hasil Siswa** → Analisis Mapel", "Untuk satu mata pelajaran: guru mana yang kelasnya sudah dinilai, bagaimana hasil belajarnya, dan bagaimana kualitas soalnya?"],
    ["**Hasil Siswa** → Perkembangan Siswa", "Untuk satu kelas: apakah nilai kelas dan tiap siswa naik dari waktu ke waktu?"],
  ], [2.2, 5]),

  /* ============================ 2 ============================ */
  H1("Bahasa Visual yang Dipakai"),
  P("Semua grafik memakai aturan warna yang sama di seluruh halaman, jadi sekali dipahami berlaku di mana-mana. **Arahkan atau sentuh** batang, titik, atau kotak pada grafik untuk melihat angka lengkapnya."),
  H2("Warna nilai (hijau · emas · merah)"),
  TB(["Warna", "Arti", "Contoh dengan batas tuntas 75"], [
    ["**Hijau**", "Mencapai batas tuntas", "75 ke atas"],
    ["**Emas**", "Mendekati batas (sampai 15 poin di bawahnya)", "60–74"],
    ["**Merah**", "Jauh di bawah batas", "di bawah 60"],
  ], [1.2, 3, 2.4]),
  P("**Batas tuntas** diatur di saringan atas (bawaan 75) dan diingat di perangkat Anda. Mengubahnya langsung mengubah semua warna dan persentase \"≥ batas\"."),
  H2("Warna tingkat berpikir (biru muda → biru tua)"),
  TB(["Kelompok", "Level kisi-kisi", "Warna"], [
    ["**LOTS** (berpikir tingkat rendah)", "C1 Mengingat, C2 Memahami · kategori TKA Knowing", "biru muda"],
    ["**MOTS** (menengah)", "C3 Menerapkan · kategori TKA Applying", "biru sedang"],
    ["**HOTS** (tingkat tinggi)", "C4 Menganalisis, C5 Mengevaluasi, C6 Mencipta · kategori TKA Reasoning", "biru tua"],
  ], [2, 3.6, 1.2]),
  P("Makin tua birunya, makin tinggi tingkat berpikirnya. Batang komposisi (LOTS | MOTS | HOTS) dibaca dari kiri: makin lebar bagian biru tua, makin banyak soal HOTS. Angka di kanan batang = **persentase HOTS**."),
  KOTAK("awas", "Level C atau kategori TKA",
    "Level diambil dari kolom Level di kisi-kisi. Bila guru menulis C1–C6, halaman memakai level itu. Bila hanya kategori TKA (Knowing/Applying/Reasoning), halaman memetakannya ke LOTS/MOTS/HOTS, tetapi grafik **Sebaran C1–C6** tidak bisa merinci levelnya. Untuk analisis yang lebih tajam, minta guru mengisi Level dengan C1–C6."),
  H2("Peta panas (kotak biru)"),
  P("Pada peta kelas × mapel dan peta kegiatan guru × minggu, **makin tua kotaknya makin banyak isinya** (paket, siswa, atau kegiatan). Kotak putih/kosong = belum ada. Arahkan ke kotak untuk angka persisnya."),
  H2("Saringan di atas"),
  TB(["Saringan", "Keterangan"], [
    ["**Semester**", "Sesi dan hasil dibatasi semester terpilih. Paket dan kisi-kisi selalu ditampilkan semuanya (tanggal unggah tetap terlihat)."],
    ["**Mapel → Jenis → Guru**", "Bertingkat: setelah memilih mapel, pilihan Jenis dan Guru hanya berisi yang ada di mapel itu. Daftar Guru berisi **guru penyusun paket**; guru pengampu yang belum menyusun paket terlihat di tab Analisis Mapel dan Keterlaksanaan."],
    ["**Kegiatan**", "**Tryout Umum** (diatur koordinator untuk banyak kelas, dari halaman Tryout Umum) atau **Tryout Mandiri** (dibuka guru di kelasnya lewat menu Latihan / Tryout, termasuk koordinator dengan PIN guru). Riwayat sesi dan hasil siswa memberi label kategori ini. Keaktifan guru di tab Guru & Paket dan Keterlaksanaan dihitung dari Tryout Mandiri."],
    ["**Batas tuntas**", "Untuk pewarnaan dan hitungan ≥ batas."],
  ], [1.6, 5]),
  KOTAK("saran", "Perhatikan lencana kuning \"Disaring\"",
    "Bila ada saringan aktif, lencana kuning **Disaring: …** muncul di samping saringan dan judul Temuan menyebut saringannya. Angka dan temuan saat itu **hanya untuk saringan tersebut**. Tekan **Hapus saringan** untuk kembali ke semua. Saringan tidak diingat: setiap membuka halaman dimulai dari semua."),

  /* ============================ 3 ============================ */
  H1("Ringkasan"),
  H2("Enam angka utama"),
  TB(["Kotak", "Cara membaca"], [
    ["**Paket soal**", "Jumlah paket di bank soal (+ kisi-kisi yang soalnya belum diunggah). Baris kecil: jumlah butir soal."],
    ["**Guru penyusun**", "Guru yang sudah menyusun paket, dan berapa mapel."],
    ["**Sesi dibuka**", "Sesi latihan/tryout/asesmen yang dibuka guru di semester ini."],
    ["**Siswa mengerjakan**", "Siswa berbeda yang punya hasil semester ini, dibanding seluruh siswa aktif."],
    ["**Rata-rata nilai**", "Rata-rata semua hasil, dan berapa persen yang mencapai batas tuntas."],
    ["**Butir HOTS**", "Persentase butir soal HOTS dari semua butir yang levelnya tercatat."],
  ], [1.6, 5]),
  H2("Temuan utama"),
  P("Kalimat yang disusun otomatis dari data: komposisi LOTS/MOTS/HOTS dan mapel dengan HOTS tertinggi/terendah, paket baru 30 hari terakhir, kisi-kisi yang soalnya belum masuk, kelas yang belum punya hasil, serta paket dengan rata-rata terendah dan tertinggi. Bacalah lebih dulu sebelum grafik."),
  H2("Empat grafik"),
  TB(["Grafik", "Cara membaca", "Yang perlu diperhatikan"], [
    ["**Seberapa tinggi tingkat berpikir soal kita?**", "Satu batang per mapel (baris pertama = semua mapel), terbagi LOTS | MOTS | HOTS.", "Mapel dengan bagian biru tua sempit = soalnya masih dominan LOTS/MOTS."],
    ["**Jenis paket apa saja yang disusun?**", "Banyak paket per jenis (Asesmen Formatif, Sumatif, Tryout, nama asesmen PAS).", "Bila hampir semua Tryout, asesmen formatif harian belum banyak memakai aplikasi."],
    ["**Kapan paket soal diunggah?**", "Kolom = paket baru per minggu.", "Minggu kosong panjang = penyusunan soal berhenti."],
    ["**Seberapa aktif asesmen berjalan?**", "Kolom = jawaban siswa yang dikumpulkan per minggu.", "Lonjakan = minggu tryout/ujian; minggu kosong = tidak ada asesmen di aplikasi."],
  ], [2.1, 2.6, 2.4]),
  H2("Tabel Per guru"),
  P("Satu baris per guru penyusun: paket, butir, batang tingkat berpikir, % HOTS, sesi, kelas yang diuji, hasil siswa, rata-rata, dan unggah terakhir. **Ketuk baris** untuk melihat paket guru itu di tab Paket & Kisi-kisi."),

  /* ============================ 3b ============================ */
  H1("Guru & Paket"),
  P("Tab ini menelusur dari guru ke hasil siswa: **pilih guru → pilih paket soalnya → lihat hasil tiap siswa**. **Semua guru pengampu** (jadwal KBM) tampil, termasuk yang belum mengunggah soal, sehingga terlihat siapa yang aktif."),
  TB(["Bagian", "Cara membaca"], [
    ["**Empat angka**", "Jumlah guru, guru yang sudah mengunggah soal, guru yang sudah melatih siswa (paketnya dikerjakan siswa atau membuka sesi), dan guru yang belum mulai."],
    ["**Daftar guru (kiri)**", "Dikelompokkan per mapel, dengan keterangan \"x/y aktif\" per mapel. Tiap guru: jumlah **paket · sesi · siswa dilatih**, status **● Aktif / ◐ Perlu didorong / ○ Belum mulai**, dan tanggal terakhir aktif. Urutan bisa diganti: paling aktif dulu, belum mulai dulu, atau nama."],
    ["**Kartu guru (kanan)**", "Kelas yang diajar, ringkasan keaktifan, dan **daftar paket soal** yang disusun: tanggal unggah, jenis, butir & varian, tingkat berpikir, sesi, jumlah siswa, rata-rata."],
    ["**Hasil siswa**", "Ketuk paket: angka utama, **tabel tiap siswa** (nama, kelas, NISN, nilai berwarna, waktu kumpul, sesi & guru pembuka), dan **Belum mengerjakan** (siswa kelas sasaran sesi yang belum punya hasil). Saringan **Kelas**, tombol **Analisis lengkap** (ke tab Hasil & Analisis), dan **Unduh Excel**."],
  ], [2, 5]),
  KOTAK("info", "Siswa dilatih", "Dihitung dari siswa berbeda yang mengerjakan paket guru itu, ditambah siswa yang mengumpulkan di sesi yang dibuka guru itu (mis. guru memakai paket guru lain). Status aktif mengikuti kegiatan terakhir: unggah paket/kisi-kisi atau membuka sesi dalam 30 hari."),

  /* ============================ 4 ============================ */
  H1("Keterlaksanaan Asesmen"),
  P("Gambaran apakah setiap guru sudah melaksanakan asesmen di Asesmen Merdeka. **Kegiatan** = mengunggah paket atau kisi-kisi, atau membuka sesi."),
  TB(["Status", "Arti"], [
    ["● **Aktif**", "Ada kegiatan dalam 30 hari terakhir."],
    ["◐ **Perlu didorong**", "Pernah berkegiatan, tetapi terakhir lebih dari 30 hari lalu."],
    ["○ **Belum mulai**", "Belum ada paket, kisi-kisi, atau sesi atas namanya."],
  ], [1.8, 5]),
  TB(["Bagian", "Cara membaca"], [
    ["**Angka utama**", "Guru (pengampu & penyusun), aktif, perlu didorong, belum mulai, **kelas × mapel dinilai** (persentase pasangan kelas-mapel di jadwal KBM yang sudah punya hasil), paket baru bulan ini."],
    ["**Batang status**", "Proporsi guru aktif / perlu didorong / belum mulai."],
    ["**Perlu tindak lanjut**", "Daftar siap pakai untuk rapat atau pembinaan: guru belum mulai (per mapel), guru aktif yang masih punya kelas belum dinilai, dan guru yang semua paketnya diunggah tanpa kisi-kisi."],
    ["**Siapa yang rutin berasesmen?**", "Peta guru × minggu. Kotak makin tua = makin banyak kegiatan pada minggu itu. Deret kotak terisi = rutin; kotak kosong panjang = berhenti."],
    ["**Paket / sesi per bulan**", "Tren jumlah paket dan sesi seluruh guru."],
    ["**Mapel mana yang kelasnya sudah dinilai?**", "Persentase kelas × mapel yang sudah punya hasil, per mapel."],
    ["**Tabel tiap guru**", "Status, mapel, kelas dinilai, paket (semester ini / semua), jumlah formatif · sumatif · tryout, kisi ber-C, HOTS, sesi, terakhir aktif. Urutan bisa diganti. **Ketuk baris** untuk kelas yang diajar (✓ sudah dinilai) dan riwayat kegiatan guru itu."],
  ], [2, 5]),
  KOTAK("awas", "Baca dengan bijak",
    "Hanya kegiatan di Asesmen Merdeka yang tercatat. Ulangan di kertas atau aplikasi lain tidak terhitung, sehingga \"Belum mulai\" belum tentu berarti guru tidak berasesmen. Gunakan halaman ini sebagai bahan pembinaan dan dialog, bukan penilaian kinerja. Mapel \"Kegiatan Sekolah\" (wali kelas, upacara) tidak dihitung."),

  /* ============================ 6 ============================ */
  H1("Paket & Kisi-kisi"),
  TB(["Bagian", "Cara membaca"], [
    ["**Sebaran C1–C6 seluruh butir**", "Kolom per level C, warna dari biru muda (C1) sampai biru tua (C6). Catatan di bawahnya menyebut berapa butir hanya berlabel kategori TKA."],
    ["**Bentuk soal**", "Jumlah butir per bentuk (pilihan ganda, PG kompleks, benar–salah, menjodohkan, kategori, isian, uraian)."],
    ["**Daftar paket soal**", "Tanggal & jam unggah · judul & kode · mapel & tingkat · jenis · guru penyusun · butir (dan varian) · batang tingkat berpikir · HOTS · sesi · hasil · status."],
  ], [2, 5]),
  TB(["Lencana status", "Arti"], [
    ["**publish / belum publish**", "Publish = boleh dipakai guru lain yang mengampu mapel itu."],
    ["**tanpa kisi-kisi**", "Diunggah lewat jalur Upload tanpa kisi-kisi; kisi-kisinya dibuat otomatis dari soal, sehingga level C biasanya belum lengkap."],
    ["**kisi-kisi, soal belum**", "Kisi-kisi sudah diunggah, soalnya belum."],
    ["**arsip**", "Paket semester lalu yang diarsipkan."],
  ], [2, 5]),
  P("**Ketuk baris paket** untuk rincian: komposisi tingkat berpikir, sebaran C1–C6, dan **tabel kisi-kisi lengkap** (no, sub-materi, indikator, level, kategori, bentuk) dengan **% benar per butir** bila sudah ada hasil. % benar diwarnai: hijau ≥ 70%, emas 40–69%, merah < 40%."),

  /* ============================ 7 ============================ */
  H1("Sesi & Pelaksanaan"),
  TB(["Bagian", "Cara membaca"], [
    ["**Angka utama**", "Sesi dibuka (dan oleh berapa guru), kelas terlibat, jawaban terkumpul dibanding peserta sasaran, sesi berlangsung/terjadwal."],
    ["**Sesi dibuka per minggu**", "Kolom per minggu semester ini."],
    ["**Kelas mana sudah diuji di mapel apa?**", "Peta kelas × mapel; angka = banyak paket berbeda yang dikerjakan kelas itu. Kosong = belum ada."],
    ["**Riwayat sesi**", "Tanggal & jam · paket · guru · kelas · batang **mengerjakan/sasaran** · rata-rata · cara masuk (kode akses / tanpa kode / Asesmen Bersama). Lencana \"tanpa hasil\" = sesi selesai tanpa ada yang mengumpulkan. **Ketuk baris** untuk hasil paket itu."],
  ], [2, 5]),

  /* ============================ 8 ============================ */
  H1("Hasil & Analisis"),
  P("Pilih **Paket soal** dan (bila perlu) **Kelas**."),
  TB(["Grafik", "Cara membaca", "Tindak lanjut yang mungkin"], [
    ["**Angka utama**", "Siswa mengerjakan, rata-rata & median, tertinggi, terendah, % mencapai batas, sesi.", "—"],
    ["**Bagaimana sebaran nilainya?**", "Kolom = banyak siswa per rentang 10 poin, diwarnai merah/emas/hijau.", "Menumpuk di kiri = materi belum dikuasai sebagian besar siswa."],
    ["**Kelas mana yang tertinggal?**", "Rata-rata tiap kelas, dari yang terendah.", "Kelas merah: remedial atau pendampingan."],
    ["**Soal mana yang paling sulit?**", "Kolom = % siswa menjawab benar tiap butir, diwarnai tingkat berpikirnya. < 30% sangat sulit; > 85% sangat mudah.", "Butir LOTS yang sangat sulit: periksa kunci/kalimat soal. Butir sangat mudah: tingkatkan."],
    ["**Apakah soal HOTS memang lebih sulit?**", "Rata-rata % benar LOTS, MOTS, HOTS.", "Wajar HOTS paling rendah. Bila HOTS justru tertinggi, label kisi-kisi mungkin kurang tepat."],
    ["**Sub-materi mana yang perlu diperkuat?**", "% benar per sub-materi, dari yang terlemah.", "Bahan perencanaan remedial dan pengayaan."],
  ], [2, 2.7, 2.4]),

  /* ============================ 9 ============================ */
  H1("Analisis Mapel"),
  P("Pilih **Mata pelajaran** di kotak atas. Tab ini membandingkan **semua guru pengampu** mapel itu (dari jadwal KBM Data Induk), termasuk yang belum memakai aplikasi."),
  KOTAK("info", "Hasil dikaitkan ke guru pengampu kelas",
    "Nilai siswa kelas X untuk mapel M dihitung sebagai hasil **guru yang mengajar M di kelas X** menurut jadwal KBM, bukan guru yang mengunggah paket. Jadi bila Bu A menyusun soal tryout dan kelas Pak B mengerjakannya, hasilnya masuk ke Pak B sebagai guru kelas itu."),
  TB(["Bagian", "Cara membaca"], [
    ["**Angka utama**", "Guru pengampu, **kelas sudah diuji** (mis. 1/12 = baru 1 dari 12 rombel yang punya hasil), paket, % HOTS, sesi, rata-rata, % tuntas."],
    ["**Temuan**", "Guru dengan rata-rata kelas tertinggi/terendah, guru yang kelasnya belum punya hasil, pengampu yang belum menyusun paket, guru yang hasil kelasnya naik/turun."],
    ["**Perbandingan guru**", "Kelas diajar · batang kelas sudah diuji · paket · tingkat berpikir soal · HOTS · sesi · siswa dinilai · rata-rata · ≥ batas · **Tren** (garis kecil rata-rata kelasnya dari ujian ke ujian) · terakhir aktif. **Ketuk baris** untuk kartu rincian guru."],
    ["**Kartu guru**", "Hasil per kelas yang diajar (\"belum\" = belum ada hasil), paket yang disusun, dan sesi yang dibuka."],
    ["**Guru × kelas**", "Baris = guru, kolom = kelas. Angka berwarna = rata-rata kelas itu; \"belum\" = diajar tetapi belum ada hasil; abu-abu = tidak diajar guru itu."],
    ["**Rata-rata kelas tiap guru**", "Batang hijau/emas/merah menurut batas tuntas."],
    ["**Perkembangan hasil belajar tiap guru**", "Garis biru = rata-rata kelas guru itu per ujian; **garis putus abu-abu** = rata-rata semua kelas untuk ujian yang sama; garis emas putus = batas tuntas. Garis biru di atas garis abu-abu = kelasnya di atas rata-rata sekolah."],
    ["**Kualitas soal dari waktu ke waktu**", "Titik = % HOTS tiap paket menurut tanggal unggah. Garis naik = soal guru makin HOTS."],
    ["**Materi yang perlu diperkuat**", "12 sub-materi dengan persentase benar terendah, gabungan semua paket mapel itu."],
    ["**Capaian menurut tingkat berpikir**", "Rata-rata % benar butir LOTS, MOTS, HOTS di mapel itu."],
  ], [2, 5]),

  /* ============================ 5 ============================ */
  H1("Perkembangan Siswa"),
  P("Pilih **Kelas**. Saringan Mapel/Jenis/Guru di atas ikut membatasi ujian yang dihitung."),
  TB(["Bagian", "Cara membaca"], [
    ["**Angka utama**", "Siswa, ujian dikerjakan, rata-rata kelas, **siswa naik ≥ 10 poin** dan **turun ≥ 10 poin** (dalam mapel yang sama), belum pernah mengerjakan."],
    ["**Bagaimana perkembangan kelas?**", "Satu grafik per mapel: garis biru = rata-rata kelas per ujian; garis putus abu-abu = rata-rata semua kelas untuk ujian yang sama; garis emas = batas tuntas."],
    ["**Nilai tiap siswa**", "Kolom = ujian (singkatan mapel + tanggal), dari yang terlama. Nilai diwarnai hijau/emas/merah; · = belum mengerjakan. **Tren** = garis kecil nilai dari waktu ke waktu. **Perubahan** = rata-rata selisih nilai terakhir − pertama **di tiap mapel** (▲ naik, ▼ turun); arahkan ke angkanya untuk rincian per mapel."],
    ["**Riwayat siswa**", "Ketuk nama siswa: grafik per mapel (nilai siswa vs rata-rata ujian) dan daftar semua ujiannya."],
  ], [2, 5]),
  KOTAK("info", "Mengapa perubahan dihitung per mapel?",
    "Membandingkan nilai Matematika dengan Bahasa Indonesia tidak menunjukkan perkembangan. Karena itu \"Perubahan\" hanya membandingkan ujian pertama dan terakhir **di mapel yang sama**, lalu dirata-rata."),

  /* ============================ 10 ============================ */
  H1("Dari Grafik ke Tindakan"),
  TB(["Yang terlihat", "Kemungkinan artinya", "Tindakan yang disarankan"], [
    ["Butir HOTS mapel < 20%", "Soal masih dominan mengingat/memahami", "Pendampingan penyusunan soal HOTS; contoh soal C4–C6 dari mapel dengan HOTS tinggi"],
    ["Banyak paket \"tanpa kisi-kisi\"", "Level C tidak tercatat, analisis kurang tajam", "Minta guru melengkapi kisi-kisi (kolom Level C1–C6) di Pustaka Paket"],
    ["Kelas × mapel dinilai rendah", "Banyak kelas belum diasesmen di aplikasi", "Cek di Keterlaksanaan siapa pengampunya; dialog jadwal asesmen"],
    ["Guru \"Perlu didorong\"", "Kegiatan berhenti > 30 hari", "Sapa guru; tanyakan kendala (soal, waktu, teknis)"],
    ["Satu kelas selalu di bawah garis abu-abu", "Kelas tertinggal dari kelas lain", "Bandingkan dengan kelas lain guru yang sama; remedial terarah"],
    ["Butir LOTS dengan % benar sangat rendah", "Kunci atau kalimat soal bermasalah", "Minta penyusun memeriksa butir itu"],
    ["Sesi dengan \"tanpa hasil\" berulang", "Sesi dibuka tetapi tidak dipakai/dibatalkan", "Konfirmasi ke guru; mungkin uji coba"],
  ], [2.2, 2.2, 2.6]),
  H2("Tanya jawab"),
  TB(["Pertanyaan", "Jawaban"], [
    ["Kenapa guru X tidak ada di saringan Guru?", "Saringan Guru hanya berisi guru penyusun paket. Guru pengampu yang belum menyusun paket terlihat di Analisis Mapel dan Keterlaksanaan."],
    ["Kenapa paket baru tidak muncul?", "Periksa lencana kuning **Disaring**: mungkin saringan Jenis/Mapel/Guru sedang aktif. Tekan **Hapus saringan**, lalu **Muat ulang**."],
    ["Apakah data langsung terbarui?", "Data diambil saat halaman dibuka. Tekan **Muat ulang** untuk data terbaru."],
    ["Semester lalu bisa dilihat?", "Pilih di saringan **Semester**. Hasil semester yang sudah diarsipkan tetap terhitung nilainya."],
    ["Mengapa HOTS paket ini tinggi tetapi siswanya justru mudah menjawab?", "Bisa jadi label level di kisi-kisi kurang tepat. Lihat tab Hasil & Analisis → \"Apakah soal HOTS memang lebih sulit?\"."],
  ], [2.4, 4.6]),
];
