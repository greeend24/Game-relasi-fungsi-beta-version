# 📋 HASIL REVISI LENGKAP CHAPTER 4: GRAFIK FUNGSI LINEAR
## Bank Soal Game Edukasi "Detektif Data: Relasi dan Fungsi" SMP Kelas VIII

Dokumen ini memuat revisi menyeluruh, pengayaan interaksi visual, dan kalibrasi kognitif untuk seluruh instrumen soal pada **Chapter 4: Grafik Fungsi Linear**.

- **Sasaran Pengguna:** Siswa SMP Kelas VIII (Fase D).
- **Nuansa & Bahasa:** Menyenangkan, bernuansa investigasi detektif (*Detektif Data*), pemodelan geometri analitis Cartesius yang lugas, terstruktur, dan ramah siswa.
- **Prinsip Variasi Representasi:** Tidak semua soal dijadikan soal cerita! Materi divariasikan secara seimbang antara:
  1. Persamaan aljabar murni ($y = ax + b$).
  2. Tabel pasangan nilai ($x, y$).
  3. Pasangan koordinat Cartesius $(x, y)$.
  4. Grafik garis lurus visual interaktif.
  5. Konteks dunia nyata (tarif taksi, penurunan daya baterai, ketinggian drone, kebocoran tangki air).
- **7 Tipe Interaksi Utama Chapter 4:**
  1. **PILIH TITIK:** Menampilkan bidang koordinat berpetak, siswa mengklik titik yang tepat sesuai rumus/kondisi fungsi.
  2. **PLOT TITIK:** Diberikan persamaan fungsi linear, siswa menandai beberapa titik koordinat pada bidang Cartesius.
  3. **BANGUN GRAFIK:** Siswa memilih titik-titik yang benar; jika titik benar maka titik menyala, dan setelah minimal 2 titik benar terpasang, sistem menarik garis lurus otomatis membentang di koordinat.
  4. **MATCHING (Mencocokkan):** Menjodohkan antara Persamaan $\leftrightarrow$ Tabel $\leftrightarrow$ Grafik Garis atau gradien dengan arah kemiringan.
  5. **DETEKSI KESALAHAN GRAFIK:** Menampilkan garis atau titik yang keliru pada grid koordinat; siswa menganalisis dan menandai letak kesalahan/penyusup.
  6. **INTERPRETASI GRAFIK:** Menganalisis sifat garis (gradien tangga $\frac{\Delta y}{\Delta x}$, titik potong sumbu, perpotongan dua garis, luas daerah di bawah garis).
  7. **PILIHAN GANDA KONSEPTUAL / MCQ KOMPLEKS:** Memvalidasi prinsip dasar (sifat garis lurus, aksioma Euclid dua titik, translasi vertikal, dan uji garis vertikal).
- **Spesifikasi Programmer:** Setiap aktivitas visual dilengkapi parameter teknis: *Sumbu (Rentang X & Y, Grid Step), Label Sumbu, Titik Kunci, Persamaan Garis, Kondisi Input Siswa, State Perubahan Visual, dan Feedback Adaptif.*
- **Kalibrasi Level Kognitif (Bloom C-Level):**
  - C2 (Memahami): Pengenalan sumbu, bentuk garis lurus, arah gradien positif/negatif/nol.
  - C3 (Mengaplikasikan): Menentukan titik potong sumbu X dan Y, memplot titik, membaca nilai dari grafik.
  - C4 (Menganalisis): Menghitung gradien dari visual tangga, menemukan titik potong dua garis, mencocokkan persamaan-tabel-grafik.
  - C5 (Mengevaluasi): Deteksi kesalahan grafik, uji garis vertikal (bukan fungsi), analisis luas daerah segitiga koordinat.

---

# BAGIAN I: 21 STAGE KASUS MODE CHAPTER (ALUR BELAJAR INVESTIGASI)

---

### [ID: CH4-STAGE-01] Radar Pemindai Sumbu: Membaca Sumbu Koordinat Cartesius
- **Materi:** Bidang Koordinat Cartesius pada Fungsi Linear
- **Indikator:** Siswa dapat mengidentifikasi bahwa sumbu mendatar (X) mewakili daerah asal (domain) dan sumbu tegak (Y) mewakili nilai hasil fungsi $f(x)$.
- **Bentuk Interaksi:** INTERPRETASI GRAFIK
- **C-Level:** C2 (Memahami)
- **Soal:**
  Detektif Data mengaktifkan layar radar pemantau koordinat markas. Pada bidang koordinat Cartesius, terdapat sumbu mendatar (horizontal) dan sumbu tegak (vertikal). 
  Manakah pernyataan yang PALING TEPAT mengenai peran kedua sumbu tersebut dalam menggambarkan fungsi $y = f(x)$?
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-5, 5]$, Rentang $Y \in [-5, 5]$, grid step = 1.
  - *Label:* Sumbu horizontal bertuliskan `Sumbu X (Domain / Nilai Asal)`, sumbu vertikal bertuliskan `Sumbu Y (Range / Hasil f(x))`, titik pusat berlabel `(0, 0)`.
  - *Visual State:* Layar radar bernuansa hijau neon gelap dengan grid koordinat presisi. Sumbu X menyala biru muda saat disorot, sumbu Y menyala oranye keemasan.
  - *Kondisi Siswa Salah:* Jika memilih bahwa sumbu Y adalah domain, berikan highlight kedip merah pada sumbu mendatar X.
- **Pilihan Jawaban:**
  A. Sumbu X mewakili daerah asal (domain), dan sumbu Y mewakili nilai hasil fungsi $f(x)$  
  B. Sumbu Y mewakili daerah asal (domain), dan sumbu X mewakili nilai hasil fungsi $f(x)$  
  C. Sumbu mendatar dan sumbu tegak keduanya merupakan daerah hasil  
  D. Daerah asal dan hasil hanya diletakkan pada sumbu X saja  
- **Kunci:** A. Sumbu X mewakili daerah asal (domain), dan sumbu Y mewakili nilai hasil fungsi $f(x)$
- **Pembahasan:**
  Pada sistem koordinat Cartesius untuk fungsi $y = f(x)$:
  1. Sumbu mendatar (horizontal) disebut **sumbu X**, digunakan untuk menaruh nilai masukan/daerah asal (**domain**).
  2. Sumbu tegak (vertikal) disebut **sumbu Y**, digunakan untuk menaruh nilai keluaran/daerah hasil (**range**).
  3. Setiap titik $(x, y)$ pada grafik mewakili pasangan $(x, f(x))$.
- **Feedback:**
  - *Benar:* "Tepat sekali, Detektif! Sumbu mendatar X adalah nilai masukan (domain), sedangkan ketinggian tegak pada sumbu Y adalah nilai keluaran fungsi $f(x)$."
  - *Salah:* "Ingat konvensi Cartesius: arah horizontal mendatar selalu sumbu X (nilai asal/input), dan arah vertikal tegak selalu sumbu Y (hasil fungsi/output)."

---

### [ID: CH4-STAGE-02] Jejak Pertama di Pagar Y: Titik Potong Sumbu Y
- **Materi:** Titik Potong Grafik terhadap Sumbu Y
- **Indikator:** Siswa dapat menentukan dan mengeklik titik potong grafik $f(x) = 2x + 4$ pada sumbu Y di koordinat $(0, 4)$.
- **Bentuk Interaksi:** PILIH TITIK (Titik Interaktif pada Grid)
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Tersangka melarikan diri melewati pagar batas vertikal (sumbu Y). Jalur pelarian tersangka mengikuti fungsi linear:
  $$f(x) = 2x + 4$$
  Klik titik koordinat pada sumbu Y tempat garis tersebut memotong sumbu vertikal!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-4, 4]$, Rentang $Y \in [-2, 8]$, step grid = 1.
  - *Label:* Sumbu X, Sumbu Y, origin $(0, 0)$.
  - *Titik Pilihan (Clickable Targets):* $(0, 4)$ [BENAR], $(4, 0)$ [DISTRAKTOR TERBALIK], $(0, 2)$ [DISTRAKTOR KOEFISIEN], $(2, 0)$ [DISTRAKTOR POTONG X].
  - *Persamaan Garis:* Garis tipis putus-putus membentang $y = 2x + 4$.
  - *Kondisi Siswa Salah:* Jika mengklik $(4, 0)$, tampilkan pesan bantuan "Itu titik di sumbu X! Titik potong sumbu Y harus memiliki nilai $x = 0$."
  - *Feedback Visual:* Titik $(0, 4)$ berpendar hijau terang dengan label koordinat pop-up `(0, 4)`.
- **Pilihan Jawaban:** Klik langsung pada grid koordinat di antara target titik: `(0, 4)`, `(4, 0)`, `(0, 2)`, `(2, 0)`.
- **Kunci:** Titik `(0, 4)`
- **Pembahasan:**
  Titik potong suatu grafik dengan sumbu Y selalu terjadi ketika nilai $x = 0$.
  Substitusikan $x = 0$ ke dalam rumus fungsi:
  $$f(0) = 2(0) + 4 = 0 + 4 = 4$$
  Jadi titik potongnya adalah $(x, y) = (0, 4)$. Pada bentuk umum $f(x) = ax + b$, nilai $b$ langsung menunjukkan titik potong di $(0, b)$.
- **Feedback:**
  - *Benar:* "Bagus! Titik potong sumbu Y selalu bernilai $x = 0$. Karena $f(0) = 4$, koordinatnya tepat di $(0, 4)$."
  - *Salah:* "Titik potong sumbu Y berada tepat di garis tegak sumbu Y, sehingga nilai $x$-nya harus nol: $f(0) = 2(0) + 4 = 4$, yaitu koordinat $(0, 4)$."

---

### [ID: CH4-STAGE-03] Pintu Jebakan di Garis Tanah: Titik Potong Sumbu X
- **Materi:** Titik Potong Grafik terhadap Sumbu X
- **Indikator:** Siswa dapat menentukan dan mengeklik titik potong grafik $f(x) = 3x - 6$ pada sumbu X di koordinat $(2, 0)$.
- **Bentuk Interaksi:** PILIH TITIK (Titik Interaktif pada Grid)
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif mendeteksi ada sensor jebakan di permukaan tanah (sumbu mendatar X). Garis sinar laser mengikuti persamaan:
  $$f(x) = 3x - 6$$
  Klik titik koordinat pada sumbu X di mana sinar laser memotong garis tanah!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-2, 6]$, Rentang $Y \in [-8, 4]$, step grid = 1.
  - *Label:* Sumbu X, Sumbu Y, origin $(0, 0)$.
  - *Titik Pilihan (Clickable Targets):* $(2, 0)$ [BENAR], $(0, -6)$ [DISTRAKTOR POTONG Y], $(-2, 0)$ [DISTRAKTOR SALAH TANDA], $(6, 0)$ [DISTRAKTOR].
  - *Persamaan Garis:* Garis sinar laser merah $y = 3x - 6$.
  - *Kondisi Siswa Salah:* Jika siswa mengklik $(0, -6)$, muncul tooltip: "Itu titik potong sumbu Y saat $x=0$. Untuk sumbu X, jadikan nilai $f(x) = 0$!"
  - *Feedback Visual:* Titik $(2, 0)$ menyala hijau dan muncul cincin target radar.
- **Pilihan Jawaban:** Klik pada titik koordinat: `(2, 0)`, `(0, -6)`, `(-2, 0)`, `(6, 0)`.
- **Kunci:** Titik `(2, 0)`
- **Pembahasan:**
  Titik potong grafik dengan sumbu X selalu terjadi saat nilai ketinggian $y = f(x) = 0$.
  Persamaan:
  $$3x - 6 = 0$$
  $$3x = 6$$
  $$x = \frac{6}{3} = 2$$
  Maka koordinat titik potong sumbu X adalah $(2, 0)$.
- **Feedback:**
  - *Benar:* "Akurat! Pada sumbu X nilai $y = 0$. Dari $3x - 6 = 0$ didapat $x = 2$, sehingga titiknya adalah $(2, 0)$."
  - *Salah:* "Untuk mencari titik potong sumbu X, buatlah $f(x) = 0$. Selesaikan persamaan $3x - 6 = 0 \rightarrow 3x = 6 \rightarrow x = 2$. Koordinatnya $(2, 0)$."

---

### [ID: CH4-STAGE-04] Menandai Dua Pos Penjagaan: Plot Dua Titik Potong Kunci
- **Materi:** Menentukan Pasangan Titik Potong Sumbu Koordinat
- **Indikator:** Diberikan fungsi $f(x) = x - 3$, siswa dapat memplot titik potong sumbu X $(3, 0)$ dan sumbu Y $(0, -3)$ pada bidang koordinat.
- **Bentuk Interaksi:** PLOT TITIK (Multi-point Pinning)
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif Data harus mendirikan dua pos pengintai di sepanjang garis patroli $f(x) = x - 3$:
  1. Pos Pertama di titik potong sumbu Y.
  2. Pos Kedua di titik potong sumbu X.
  Tandai (klik) kedua titik potong tersebut pada bidang koordinat Cartesius di bawah!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-2, 5]$, Rentang $Y \in [-5, 2]$, step grid = 1.
  - *Label:* Sumbu X, Sumbu Y.
  - *Mekanisme Interaksi:* Siswa dapat mengklik titik manapun pada perpotongan grid bulat. Sistem membutuhkan 2 pin yang ditandai.
  - *Jawaban Benar:* Pin 1 di $(0, -3)$ dan Pin 2 di $(3, 0)$ (urutan bebas).
  - *Kondisi Siswa Salah:* Jika menandai $(-3, 0)$ atau $(0, 3)$, tampilkan pesan bimbingan tanda aljabar: "Perhatikan tanda negatif pada $f(x) = x - 3$."
  - *Feedback Visual:* Pin bendera detektif tertancap di $(0, -3)$ dan $(3, 0)$ disertai efek suara 'ting'.
- **Pilihan Jawaban:** Menempatkan dua pin pada bidang koordinat Cartesius.
- **Kunci:** Pin pada titik `(0, -3)` dan titik `(3, 0)`
- **Pembahasan:**
  1. Titik potong sumbu Y ($x = 0$):
     $$f(0) = 0 - 3 = -3 \implies (0, -3)$$
  2. Titik potong sumbu X ($f(x) = 0$):
     $$x - 3 = 0 \implies x = 3 \implies (3, 0)$$
  Kedua titik ini adalah titik koordinat fundamental untuk menggambarkan garis lurus.
- **Feedback:**
  - *Benar:* "Hebat! Kedua pos pengintai berhasil dipasang di $(0, -3)$ dan $(3, 0)$. Dua titik ini adalah jangkar utama garis lurus!"
  - *Salah:* "Cek kembali perhitungannya: saat $x = 0$, $y = -3$ titik $(0, -3)$. Saat $y = 0$, $x - 3 = 0 \implies x = 3$ titik $(3, 0)$."

---

### [ID: CH4-STAGE-05] Menghubungkan Garis Penjara: Bangun Grafik Linear
- **Materi:** Menggambar Grafik Fungsi Linear Melalui Dua Titik Koordinat
- **Indikator:** Diberikan fungsi $f(x) = 2x - 2$, siswa memilih minimal 2 titik benar, lalu sistem otomatis menarik garis lurus sempurna.
- **Bentuk Interaksi:** BANGUN GRAFIK (Dynamic Line Construction)
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Untuk mengurung pergerakan buronan, Detektif Data harus mengaktifkan pagar laser linear dengan rumus:
  $$f(x) = 2x - 2$$
  Pilihlah minimal **dua titik koordinat** yang BENAR dilalui oleh fungsi tersebut. Setelah titik-titik yang kamu pilih terbukti tepat, garis laser akan otomatis terhubung melintasi koordinat!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-2, 5]$, Rentang $Y \in [-4, 6]$, step grid = 1.
  - *Kandidat Titik di Layar (Toggle Buttons on Grid):*
    - A $(0, -2)$ [BENAR - Titik potong Y]
    - B $(1, 0)$ [BENAR - Titik potong X]
    - C $(2, 2)$ [BENAR - f(2) = 2(2)-2 = 2]
    - D $(0, 2)$ [SALAH]
    - E $(2, 4)$ [SALAH]
  - *Trigger Animasi:* Ketika siswa mengklik 2 titik yang keduanya anggota himpunan penyelesaian (misal A dan B, atau A dan C, atau B dan C), kedua titik menyala biru neon dan sebuah garis laser solid $y = 2x - 2$ ditarik melintasi grid dengan efek animasi laser meluncur.
  - *Kondisi Siswa Salah:* Jika memilih titik salah (misal D), titik berkedip merah dan muncul teks: "Titik $(0, 2)$ tidak memenuhi rumus, karena $f(0) = 2(0) - 2 = -2$, bukan 2."
- **Pilihan Jawaban:** Memilih 2 titik valid di antara opsi A, B, C, D, E.
- **Kunci:** Memilih pasangan titik manapun dari `{ (0, -2), (1, 0), (2, 2) }`
- **Pembahasan:**
  Uji titik-titik koordinat:
  - Untuk $x = 0$: $f(0) = 2(0) - 2 = -2 \implies (0, -2)$ [Cocok]
  - Untuk $x = 1$: $f(1) = 2(1) - 2 = 0 \implies (1, 0)$ [Cocok]
  - Untuk $x = 2$: $f(2) = 2(2) - 2 = 2 \implies (2, 2)$ [Cocok]
  Menurut prinsip geometri Euclid, menghubungkan dua titik yang memenuhi persamaan sudah cukup untuk membentuk garis lurus sempurna.
- **Feedback:**
  - *Benar:* "Luar biasa! Dua titik benar telah terpasang dan garis laser fungsi linear $f(x) = 2x - 2$ langsung terbentang mengunci area!"
  - *Salah:* "Pastikan titik yang kamu pilih memenuhi rumus $f(x) = 2x - 2$. Coba hitung nilai $y$ saat $x = 0$ dan saat $x = 1$."

---

### [ID: CH4-STAGE-06] Lintasan Drone Penyelidik: Analisis Gradien Positif ($m > 0$)
- **Materi:** Kemiringan Garis (Gradien Positif)
- **Indikator:** Siswa dapat menganalisis bahwa garis dengan koefisien $a > 0$ condong menanjak naik dari kiri bawah ke kanan atas.
- **Bentuk Interaksi:** INTERPRETASI GRAFIK
- **C-Level:** C2 (Memahami)
- **Soal:**
  Detektif menerbangkan drone pengintai dari stasiun darat. Ketinggian drone (dalam meter) mengikuti fungsi waktu $x$ (dalam menit):
  $$f(x) = 5x + 10$$
  Bagaimanakah bentuk visual pergerakan lintasan drone pada layar pemantau koordinat?
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [0, 6]$ (Waktu), Rentang $Y \in [0, 50]$ (Ketinggian), step grid X = 1, step grid Y = 10.
  - *Visual:* Garis menanjak dari $(0, 10)$ menuju $(6, 40)$ dengan warna cyan menyala. Terdapat ikon drone kecil yang bergerak naik menyusuri garis.
  - *Anotasi:* Tanda panah menunjuk ke arah kanan atas bertuliskan `Gradien m = +5 (Menanjak Naik)`.
- **Pilihan Jawaban:**
  A. Garis lurus menanjak naik dari kiri bawah ke kanan atas, karena gradien bernilai positif ($m = +5$)  
  B. Garis lurus menurun dari kiri atas ke kanan bawah, karena konstanta bernilai 10  
  C. Garis mendatar sempurna sejajar permukaan tanah  
  D. Garis berupa kurva melengkung naik-turun seperti ombak  
- **Kunci:** A. Garis lurus menanjak naik dari kiri bawah ke kanan atas, karena gradien bernilai positif ($m = +5$)
- **Pembahasan:**
  Pada persamaan linear $f(x) = ax + b$:
  - Nilai $a$ adalah gradien/kemiringan ($m = 5$).
  - Karena $m = +5 > 0$ (positif), maka setiap pertambahan nilai $x$ (waktu) akan menyebabkan nilai $y$ (ketinggian) bertambah naik.
  - Secara visual, garis condong menanjak naik dari kiri bawah ke kanan atas.
- **Feedback:**
  - *Benar:* "Analisis tepat! Karena gradien $m = +5$ bernilai positif, semakin lama drone terbang (nilai $x$ bertambah), ketinggiannya makin naik."
  - *Salah:* "Perhatikan tanda angka di depan $x$. Koefisiennya adalah $+5$ (positif). Gradien positif selalu menghasilkan garis yang menanjak ke kanan atas."

---

### [ID: CH4-STAGE-07] Baterai Gadget Detektif: Analisis Gradien Negatif ($m < 0$)
- **Materi:** Kemiringan Garis (Gradien Negatif)
- **Indikator:** Siswa dapat menganalisis bahwa garis dengan koefisien $a < 0$ condong menurun dari kiri atas ke kanan bawah.
- **Bentuk Interaksi:** INTERPRETASI GRAFIK
- **C-Level:** C2 (Memahami)
- **Soal:**
  Daya baterai alat pelacak detektif berkurang secara teratur setiap jam pemakaian sesuai rumus:
  $$f(x) = -10x + 100$$
  di mana $x$ adalah waktu pemakaian (jam) dan $f(x)$ adalah sisa persentase baterai (%).
  Bagaimanakah arah kemiringan grafik fungsi linear tersebut pada koordinat Cartesius?
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [0, 10]$ (Jam), Rentang $Y \in [0, 100]$ (Persen), step X = 1, step Y = 10.
  - *Visual:* Garis lurus merah-oranye menurun dari $(0, 100)$ menuju $(10, 0)$. Indikator baterai di pojok kanan atas berkurang dari hijau penuh menjadi merah kosong seiring kursor digeser dari $x=0$ ke $x=10$.
  - *Anotasi:* Teks penjelas `Gradien m = -10 (Menurun ke Kanan Bawah)`.
- **Pilihan Jawaban:**
  A. Garis lurus condong menurun dari kiri atas ke kanan bawah karena gradiennya bernilai negatif ($m = -10$)  
  B. Garis lurus menanjak naik dari kiri bawah ke kanan atas karena daya awal 100% bernilai positif  
  C. Garis melengkung parabola ke bawah  
  D. Garis tegak vertikal sejajar sumbu Y  
- **Kunci:** A. Garis lurus condong menurun dari kiri atas ke kanan bawah karena gradiennya bernilai negatif ($m = -10$)
- **Pembahasan:**
  Rumus fungsi memiliki gradien $m = a = -10$.
  Nilai gradien negatif ($m < 0$) menunjukkan bahwa seiring bertambahnya waktu $x$, nilai keluaran $f(x)$ justru semakin berkurang.
  Visual garisnya selalu miring menurun dari kiri atas ke kanan bawah (garis lereng turun).
- **Feedback:**
  - *Benar:* "Tepat sekali! Gradien negatif ($m = -10$) melambangkan laju penurunan, sehingga grafiknya miring turun ke kanan bawah."
  - *Salah:* "Nilai gradien adalah angka di depan variabel $x$, yaitu $-10$. Karena negatif, grafik garis harus miring menurun ke kanan bawah."

---

### [ID: CH4-STAGE-08] Investigasi Alibi Palsu: Deteksi Kesalahan Garis Grafik
- **Materi:** Deteksi Kesalahan Penggambaran Titik Potong Grafik
- **Indikator:** Siswa dapat menemukan letak kesalahan penggambaran garis $f(x) = 2x + 3$ yang salah diplot pada titik potong sumbu Y.
- **Bentuk Interaksi:** DETEKSI KESALAHAN GRAFIK
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Tersangka memberikan laporan rute patroli yang diklaim mengikuti persamaan:
  $$f(x) = 2x + 3$$
  Namun, pada monitor terlihat ada **satu titik koordinat jangkar yang salah digambar** oleh tersangka sehingga garisnya menjadi meleset!
  Temukan dan klik titik yang SALAH/MELENCENG pada bidang koordinat tersebut!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-4, 4]$, Rentang $Y \in [-5, 6]$, step grid = 1.
  - *Tampilan Visual:* Sebuah garis merah digambar melintasi titik $(0, -3)$ dan titik $(1.5, 0)$.
  - *Titik Interaktif yang Dapat Diklik:*
    - Titik A: $(0, -3)$ [TITIK SALAH - KUNCI. Tersangka salah meletakkan tanda konstanta $+3$ menjadi $-3$]
    - Titik B: $(2, 1)$
    - Titik C: $(-1, -5)$
  - *State Saat Benar:* Setelah siswa mengklik titik $(0, -3)$, muncul cap merah bertuliskan `BUKTI PALSU TERDETEKSI!`. Garis merah rusak pecah dan garis hijau yang benar muncul melintasi $(0, 3)$ dan $(-1.5, 0)$.
- **Pilihan Jawaban:** Klik titik koordinat yang salah pada grafik: `(0, -3)`.
- **Kunci:** Titik `(0, -3)`
- **Pembahasan:**
  Periksa titik potong sumbu Y dari persamaan $f(x) = 2x + 3$:
  $$x = 0 \implies f(0) = 2(0) + 3 = +3 \implies \text{seharusnya di } (0, 3)$$
  Pada gambar yang disajikan tersangka, garis justru memotong sumbu Y di titik $(0, -3)$. Tersangka terbalik memberi tanda negatif pada konstanta. Titik $(0, -3)$ inilah letak kesalahan fatalnya.
- **Feedback:**
  - *Benar:* "Analisis detektif yang brilian! Tersangka menggambar titik potong di $(0, -3)$, padahal konstanta fungsinya adalah $+3$ sehingga seharusnya berada di $(0, 3)$!"
  - *Salah:* "Coba masukkan $x = 0$ ke persamaan $f(x) = 2x + 3$. Berapakah nilai $y$ seharusnya? Bandingkan dengan titik potong sumbu Y yang ada di layar."

---

### [ID: CH4-STAGE-09] Garis Sinar Melalui Markas Pusat: Bangun Grafik $f(x) = 3x$
- **Materi:** Grafik Fungsi Linear Tanpa Konstanta ($b = 0$)
- **Indikator:** Siswa dapat memplot titik $(0, 0)$ dan $(1, 3)$ dari fungsi $f(x) = 3x$ untuk membangun garis yang melalui titik pusat Cartesius.
- **Bentuk Interaksi:** BANGUN GRAFIK
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sinar laser komunikasi markas detektif memancar langsung dari **titik pusat koordinat $(0, 0)$** dengan aturan fungsi:
  $$f(x) = 3x$$
  Bangunlah grafik garis laser tersebut dengan menandai:
  1. Titik pangkal/pusat koordinat.
  2. Satu titik koordinat lain saat $x = 1$.
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-3, 4]$, Rentang $Y \in [-4, 7]$, step grid = 1.
  - *Label Khusus:* Titik origin $(0, 0)$ diberi ikon markas detektif.
  - *Interaksi:* Siswa menandai dua titik pada grid.
  - *Target Benar:* Titik $(0, 0)$ dan titik $(1, 3)$.
  - *Efek Visual:* Garis emas bercahaya langsung memanjang dari kuadran III menuju kuadran I melintasi $(0, 0)$ dan $(1, 3)$.
- **Pilihan Jawaban:** Menandai dua titik koordinat: `(0, 0)` dan `(1, 3)`.
- **Kunci:** Titik `(0, 0)` dan `(1, 3)`
- **Pembahasan:**
  Fungsi $f(x) = 3x$ memiliki nilai konstanta $b = 0$.
  - Saat $x = 0 \implies f(0) = 3(0) = 0 \implies$ titik $(0, 0)$ (pasti melewati titik pangkal).
  - Saat $x = 1 \implies f(1) = 3(1) = 3 \implies$ titik $(1, 3)$.
  Menghubungkan kedua titik ini menghasilkan garis lurus yang membelah kuadran I dan kuadran III.
- **Feedback:**
  - *Benar:* "Sempurna! Setiap fungsi linear dengan $b = 0$ pasti memotong tepat di titik pusat pangkal $(0, 0)$."
  - *Salah:* "Hitung titik saat $x = 0$ yaitu $(0, 0)$ dan saat $x = 1$ yaitu $3(1) = 3$ menghasilkan titik $(1, 3)$."

---

### [ID: CH4-STAGE-10] Dekoder Berkas Tiga Sisi: Matching Persamaan, Tabel, dan Grafik
- **Materi:** Tiga Representasi Fungsi Linear (Persamaan, Tabel, Grafik)
- **Indikator:** Siswa dapat menjodohkan persamaan fungsi linear dengan tabel pasangan nilai dan grafik garis yang sesuai.
- **Bentuk Interaksi:** MATCHING (Menjodohkan 3 Elemen)
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Detektif Data menemukan 3 berkas bukti terpisah. Jodohkan setiap **Persamaan Garis** di kolom kiri dengan **Tabel Pasangan Nilai** dan **Grafik Kartesius** yang tepat di kolom kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri (Persamaan):*
    1. $f(x) = x + 2$
    2. $f(x) = -2x + 4$
    3. $f(x) = 3x - 3$
  - *Kolom Kanan (Tabel & Ciri Grafik):*
    - [Kartu P]: Tabel $\{(0, 2), (1, 3), (2, 4)\}$ $\leftrightarrow$ Garis menanjak memotong sumbu Y di $(0, 2)$
    - [Kartu Q]: Tabel $\{(0, 4), (1, 2), (2, 0)\}$ $\leftrightarrow$ Garis menurun memotong sumbu Y di $(0, 4)$ dan sumbu X di $(2, 0)$
    - [Kartu R]: Tabel $\{(0, -3), (1, 0), (2, 3)\}$ $\leftrightarrow$ Garis menanjak curam memotong sumbu Y di $(0, -3)$ dan sumbu X di $(1, 0)$
  - *Interaksi:* Drag and drop tali penghubung dari kartu persamaan ke kartu visual di kanan.
- **Pilihan Jawaban:**
  Pasangan:
  - $f(x) = x + 2 \rightarrow$ Kartu P
  - $f(x) = -2x + 4 \rightarrow$ Kartu Q
  - $f(x) = 3x - 3 \rightarrow$ Kartu R
- **Kunci:**
  - `f(x) = x + 2` $\leftrightarrow$ Kartu P (Titik potong Y di $(0, 2)$, menanjak)
  - `f(x) = -2x + 4` $\leftrightarrow$ Kartu Q (Titik potong Y di $(0, 4)$, menurun ke $(2, 0)$)
  - `f(x) = 3x - 3` $\leftrightarrow$ Kartu R (Titik potong Y di $(0, -3)$, menanjak ke $(1, 0)$)
- **Pembahasan:**
  1. $f(x) = x + 2$: saat $x=0 \rightarrow y=2$; saat $x=1 \rightarrow y=3$. Gradien $m = +1$ (naik). Cocok dengan Kartu P.
  2. $f(x) = -2x + 4$: saat $x=0 \rightarrow y=4$; saat $x=2 \rightarrow y=0$. Gradien $m = -2$ (turun). Cocok dengan Kartu Q.
  3. $f(x) = 3x - 3$: saat $x=0 \rightarrow y=-3$; saat $x=1 \rightarrow y=0$. Gradien $m = +3$ (naik). Cocok dengan Kartu R.
- **Feedback:**
  - *Benar:* "Ketiga berkas terverifikasi sinkron! Kamu telah menguasai keterkaitan antara rumus aljabar, tabel angka, dan bentuk visual grafik."
  - *Salah:* "Uji nilai $x = 0$ pada masing-masing rumus untuk melihat di mana garis memotong sumbu Y."

---

### [ID: CH4-STAGE-11] Tarif Taksi Radar Kota: Plot Titik Kontekstual
- **Materi:** Penerapan Grafik Linear pada Tarif Transportasi
- **Indikator:** Diberikan fungsi tarif $f(x) = 2x + 5$ (dalam ribuan rupiah), siswa dapat memplot titik $(0, 5)$ dan $(3, 11)$ pada bidang koordinat.
- **Bentuk Interaksi:** PLOT TITIK (Konteks Nyata)
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah armada taksi kota menerapkan aturan tarif:
  $$f(x) = 2x + 5$$
  di mana $x$ adalah jarak tempuh (dalam km) dan $f(x)$ adalah total ongkos (dalam satuan ribuan rupiah).
  Tandai dua titik koordinat pada grafik tarif di bawah:
  1. Posisi saat taksi baru dinaiki ($x = 0$ km).
  2. Posisi saat taksi telah melaju sejauh $x = 3$ km!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [0, 6]$ (Jarak dalam km), Rentang $Y \in [0, 15]$ (Tarif dalam ribuan Rp), step X = 1, step Y = 1.
  - *Label:* Sumbu X `Jarak (km)`, Sumbu Y `Biaya (ribu Rp)`.
  - *Titik Target:* $(0, 5)$ dan $(3, 11)$.
  - *Feedback Visual:* Ikon taksi bergerak dari $(0, 5)$ menyusuri titik $(3, 11)$ saat kedua titik benar diklik.
- **Pilihan Jawaban:** Menandai titik `(0, 5)` dan titik `(3, 11)` pada grid.
- **Kunci:** Titik `(0, 5)` dan `(3, 11)`
- **Pembahasan:**
  1. Untuk $x = 0$ km: $f(0) = 2(0) + 5 = 5$ (artinya biaya buka pintu adalah Rp 5.000), titiknya $(0, 5)$.
  2. Untuk $x = 3$ km: $f(3) = 2(3) + 5 = 6 + 5 = 11$ (artinya ongkos Rp 11.000), titiknya $(3, 11)$.
- **Feedback:**
  - *Benar:* "Mantap! Titik $(0, 5)$ menunjukkan tarif awal buka pintu, dan $(3, 11)$ menunjukkan biaya setelah melaju sejauh 3 km."
  - *Salah:* "Hitung nilai fungsi: untuk $x = 0$, $f(0) = 5 \implies (0, 5)$. Untuk $x = 3$, $f(3) = 2(3) + 5 = 11 \implies (3, 11)$."

---

### [ID: CH4-STAGE-12] Titik Koordinat Penyusup: Menguji Titik yang Terletak pada Garis
- **Materi:** Pengujian Kedudukan Titik Koordinat pada Garis Fungsi Linear
- **Indikator:** Diberikan fungsi $f(x) = 2x + 1$, siswa dapat mendeteksi titik mana di antara titik-titik yang ditampilkan yang TIDAK terletak pada garis.
- **Bentuk Interaksi:** DETEKSI KESALAHAN GRAFIK
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Pada sistem pemantau jalur aman patroli dengan rumus $f(x) = 2x + 1$, terdeteksi 4 titik koordinat sinyal. Tiga di antaranya adalah sinyal agen kawan yang berada tepat di jalur garis, namun ada **SATU SINYAL PENYUSUP** yang berada di luar garis jalur!
  Klik titik sinyal penyusup tersebut!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-2, 4]$, Rentang $Y \in [-2, 8]$, step grid = 1.
  - *Garis di Layar:* Garis biru solid $y = 2x + 1$.
  - *Titik Sinyal yang Muncul:*
    - Sinyal 1: $(0, 1)$ [Pada garis, karena $2(0)+1 = 1$]
    - Sinyal 2: $(1, 3)$ [Pada garis, karena $2(1)+1 = 3$]
    - Sinyal 3: $(2, 5)$ [Pada garis, karena $2(2)+1 = 5$]
    - Sinyal 4: $(2, 7)$ [PENYUSUP - Berada 2 satuan di atas garis!]
  - *State:* Titik sinyal berdenyut. Ketika siswa mengklik $(2, 7)$, alarm merah menyala dengan tulisan `PENYUSUP TERIDENTIFIKASI!`.
- **Pilihan Jawaban:** Klik titik sinyal: `(0, 1)`, `(1, 3)`, `(2, 5)`, atau `(2, 7)`.
- **Kunci:** Titik `(2, 7)`
- **Pembahasan:**
  Uji setiap pasangan koordinat $(x, y)$ ke rumus fungsi $f(x) = 2x + 1$:
  - Sinyal $(0, 1) \implies 2(0) + 1 = 1$ (Sesuai)
  - Sinyal $(1, 3) \implies 2(1) + 1 = 3$ (Sesuai)
  - Sinyal $(2, 5) \implies 2(2) + 1 = 5$ (Sesuai)
  - Sinyal $(2, 7) \implies 2(2) + 1 = 5 \neq 7$ (Tidak sesuai / berada di luar garis!)
  Jadi titik $(2, 7)$ adalah sinyal penyusup yang tidak terletak pada garis.
- **Feedback:**
  - *Benar:* "Hebat, Detektif! Titik $(2, 7)$ adalah penyusup. Seharusnya saat $x = 2$, nilai $y = 2(2)+1 = 5$, bukan 7!"
  - *Salah:* "Masukkan nilai $x$ dari setiap titik ke rumus $2x + 1$. Cari titik mana yang nilai $y$-nya tidak cocok dengan hasil hitungan."

---

### [ID: CH4-STAGE-13] Tangga Segitiga Cartesius: Menghitung Gradien ($\Delta y / \Delta x$)
- **Materi:** Perhitungan Gradien Berdasarkan Perubahan Visual ($rac{\Delta y}{\Delta x}$)
- **Indikator:** Diberikan grafik garis yang melalui $(1, 2)$ dan $(3, 6)$, siswa dapat menghitung nilai gradien $m = rac{6-2}{3-1} = 2$.
- **Bentuk Interaksi:** INTERPRETASI GRAFIK
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Detektif Data mengukur kemiringan lereng pelarian dengan menggambarkan 'segitiga tangga' Cartesius antara dua titik pos pengamatan:
  - Pos A di $(1, 2)$
  - Pos B di $(3, 6)$
  Berapakah nilai angka kemiringan (gradien $m$) dari lereng tersebut?
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [0, 5]$, Rentang $Y \in [0, 8]$, step grid = 1.
  - *Visual:* Garis melalui $(1, 2)$ dan $(3, 6)$. Terdapat segitiga siku-siku bantuan di bawah garis:
    - Sisi tegak bertuliskan `Δy = 6 - 2 = 4 langkah naik`
    - Sisi mendatar bertuliskan `Δx = 3 - 1 = 2 langkah maju`
  - *Pilihan Interaktif:* Input angka atau pilihan ganda dengan display pecahan tangga.
- **Pilihan Jawaban:**
  A. $m = 2$  
  B. $m = 4$  
  C. $m = \frac{1}{2}$  
  D. $m = 3$  
- **Kunci:** A. $m = 2$
- **Pembahasan:**
  Rumus gradien kemiringan garis yang melalui dua titik $(x_1, y_1)$ dan $(x_2, y_2)$ adalah:
  $$m = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}$$
  Substitusikan titik $(1, 2)$ dan $(3, 6)$:
  $$m = \frac{6 - 2}{3 - 1} = \frac{4}{2} = 2$$
  Nilai gradien garis adalah 2.
- **Feedback:**
  - *Benar:* "Perhitungan presisi! Perubahan tegak $\Delta y = 4$ dibagi perubahan mendatar $\Delta x = 2$ menghasilkan gradien $m = 2$."
  - *Salah:* "Gunakan rumus gradien $m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{6 - 2}{3 - 1} = \frac{4}{2} = 2$. Jangan sampai terbalik menaruh selisih $x$ di atas."

---

### [ID: CH4-STAGE-14] Jalur Terjal Gradien Negatif: Bangun Grafik $f(x) = -2x + 6$
- **Materi:** Membangun Grafik Garis dengan Gradien Negatif
- **Indikator:** Diberikan fungsi $f(x) = -2x + 6$, siswa memplot titik potong sumbu Y $(0, 6)$ dan titik potong sumbu X $(3, 0)$, lalu garis menurun otomatis terhubung.
- **Bentuk Interaksi:** BANGUN GRAFIK
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah parasut detektif meluncur turun dengan pola ketinggian fungsi linear:
  $$f(x) = -2x + 6$$
  Bangunlah garis lintasan parasut tersebut dengan menentukan dan mengeklik:
  1. Titik potong grafik pada sumbu Y (ketinggian awal).
  2. Titik potong grafik pada sumbu X (saat parasut menyentuh tanah).
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-1, 5]$, Rentang $Y \in [-2, 8]$, step grid = 1.
  - *Target Benar:* Titik $(0, 6)$ dan titik $(3, 0)$.
  - *Efek Saat Sukses:* Setelah kedua titik ditandai, garis solid oranye-merah condong turun ditarik otomatis melintasi grid, disertai animasi parasut mendarat di $(3, 0)$.
- **Pilihan Jawaban:** Menandai titik `(0, 6)` dan `(3, 0)` pada grid koordinat.
- **Kunci:** Titik `(0, 6)` dan `(3, 0)`
- **Pembahasan:**
  1. Titik potong sumbu Y ($x = 0$):
     $$f(0) = -2(0) + 6 = 6 \implies (0, 6)$$
  2. Titik potong sumbu X ($f(x) = 0$):
     $$-2x + 6 = 0 \implies 2x = 6 \implies x = 3 \implies (3, 0)$$
  Garis yang terbentuk miring menurun dari $(0, 6)$ di kiri atas menuju $(3, 0)$ di kanan bawah, konsisten dengan gradien negatif $m = -2$.
- **Feedback:**
  - *Benar:* "Sempurna! Garis parasut berhasil dibentuk menghubungkan $(0, 6)$ dan $(3, 0)$ dengan kemiringan lereng menurun yang tepat."
  - *Salah:* "Cek titik potongnya: untuk sumbu Y, $x=0 \implies y=6$. Untuk sumbu X, $-2x + 6 = 0 \implies 2x = 6 \implies x = 3$."

---

### [ID: CH4-STAGE-15] Radar Titik Temu Dua Agen: Titik Potong Dua Garis
- **Materi:** Titik Potong Antara Dua Grafik Fungsi Linear
- **Indikator:** Diberikan grafik $f(x) = x + 1$ dan $g(x) = -x + 5$, siswa dapat menentukan titik temu koordinat $(2, 3)$ pada bidang koordinat.
- **Bentuk Interaksi:** INTERPRETASI GRAFIK (Pilih Titik Potong Garis)
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Dua agen detektif bergerak menyusuri dua lintasan berbeda:
  - Jalur Agen 1: $f(x) = x + 1$ (garis biru menanjak)
  - Jalur Agen 2: $g(x) = -x + 5$ (garis merah menurun)
  Pada monitor radar, kedua garis tersebut saling berpotongan di satu titik temu untuk bertukar informasi. Klik titik perpotongan kedua garis tersebut!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-1, 6]$, Rentang $Y \in [-1, 7]$, step grid = 1.
  - *Visual:* Garis biru $y = x + 1$ dan garis merah $y = -x + 5$ digambarkan saling bersilangan.
  - *Titik Interaktif:* Titik potong $(2, 3)$ berkedip kuning keemasan sebagai target klik.
  - *Kandidat Pilihan:* $(2, 3)$ [BENAR], $(3, 2)$ [TERBALIK], $(1, 2)$, $(3, 4)$.
- **Pilihan Jawaban:** Klik koordinat perpotongan: `(2, 3)`.
- **Kunci:** Titik `(2, 3)`
- **Pembahasan:**
  Titik potong dua fungsi terjadi saat $f(x) = g(x)$:
  $$x + 1 = -x + 5$$
  $$x + x = 5 - 1$$
  $$2x = 4 \implies x = 2$$
  Substitusikan $x = 2$ ke salah satu fungsi:
  $$y = f(2) = 2 + 1 = 3$$
  Jadi titik potong kedua garis berada tepat di koordinat $(2, 3)$.
- **Feedback:**
  - *Benar:* "Tepat sasaran! Kedua agen bertemu di koordinat $(2, 3)$. Titik ini memenuhi kedua persamaan sekaligus ($2+1=3$ dan $-2+5=3$)."
  - *Salah:* "Perhatikan titik silang kedua garis pada grid. Titik silang terletak di posisi horizontal $x = 2$ dan ketinggian vertikal $y = 3$, yaitu $(2, 3)$."

---

### [ID: CH4-STAGE-16] Barisan Garis Sejajar: Matching Pasangan Gradien Identik
- **Materi:** Karakteristik Dua Garis Sejajar ($m_1 = m_2$)
- **Indikator:** Siswa dapat mencocokkan garis-garis yang memiliki gradien sama sehingga tidak akan pernah berpotongan.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Dua garis pada koordinat Cartesius dikatakan **SEJAJAR** (tidak akan pernah bertemu/berpotongan) jika memiliki nilai gradien (kemiringan) yang persis sama ($m_1 = m_2$).
  Jodohkan setiap fungsi linear di sebelah kiri dengan garis pasangannya yang SEJAJAR di sebelah kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:*
    1. $f(x) = 3x + 2$ ($m = 3$)
    2. $g(x) = -2x + 7$ ($m = -2$)
    3. $h(x) = \frac{1}{2}x - 4$ ($m = \frac{1}{2}$)
  - *Kolom Kanan:*
    - Kartu A: $y = -2x - 5$ ($m = -2$)
    - Kartu B: $y = \frac{1}{2}x + 8$ ($m = \frac{1}{2}$)
    - Kartu C: $y = 3x - 9$ ($m = 3$)
  - *Feedback Visual:* Garis-garis yang berhasil dijodohkan akan bergerak sejajar di layar animasi berdampingan dengan jarak konstan.
- **Pilihan Jawaban:**
  - $f(x) = 3x + 2 \rightarrow$ Kartu C ($y = 3x - 9$)
  - $g(x) = -2x + 7 \rightarrow$ Kartu A ($y = -2x - 5$)
  - $h(x) = \frac{1}{2}x - 4 \rightarrow$ Kartu B ($y = \frac{1}{2}x + 8$)
- **Kunci:**
  - `f(x) = 3x + 2` sejajar dengan `y = 3x - 9` (keduanya bergradien $m = 3$)
  - `g(x) = -2x + 7` sejajar dengan `y = -2x - 5` (keduanya bergradien $m = -2$)
  - `h(x) = 1/2 x - 4` sejajar dengan `y = 1/2 x + 8` (keduanya bergradien $m = 1/2$)
- **Pembahasan:**
  Syarat dua garis sejajar adalah memiliki koefisien kemiringan yang sama ($m_1 = m_2$):
  1. $f(x) = 3x + 2$ memiliki $m = 3$, pasangannya adalah $y = 3x - 9$ yang juga bergradien $m = 3$.
  2. $g(x) = -2x + 7$ memiliki $m = -2$, pasangannya adalah $y = -2x - 5$ yang juga bergradien $m = -2$.
  3. $h(x) = \frac{1}{2}x - 4$ memiliki $m = \frac{1}{2}$, pasangannya adalah $y = \frac{1}{2}x + 8$ dengan gradien $\frac{1}{2}$.
- **Feedback:**
  - *Benar:* "Cemerlang! Kamu mengenali bahwa kunci dua garis sejajar adalah melihat angka koefisien di depan $x$. Jika angkanya sama, kemiringannya pasti sama!"
  - *Salah:* "Fokus pada angka di depan variabel $x$. Dua garis sejajar harus memiliki angka di depan $x$ yang identik beserta tandanya."

---

### [ID: CH4-STAGE-17] Garis Ketinggian Konstan: Grafik Fungsi Horizontal ($m = 0$)
- **Materi:** Grafik Fungsi Konstan $f(x) = c$
- **Indikator:** Siswa dapat memahami bahwa fungsi konstan $f(x) = 4$ menghasilkan garis lurus mendatar horizontal yang sejajar sumbu X dengan gradien $m = 0$.
- **Bentuk Interaksi:** INTERPRETASI GRAFIK
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah satelit mata-mata berada pada ketinggian jelajah tetap yang dimodelkan oleh fungsi:
  $$f(x) = 4$$
  Bagaimanakah bentuk visual grafik fungsi tersebut pada bidang Cartesius?
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-4, 6]$, Rentang $Y \in [-2, 6]$, step grid = 1.
  - *Visual:* Garis horizontal lurus berwarna ungu stabil melintang sejajar sumbu X pada ketinggian $y = 4$. Satelit mini meluncur lurus ke samping tanpa naik atau turun.
- **Pilihan Jawaban:**
  A. Garis lurus mendatar (horizontal) pada ketinggian $y = 4$ yang sejajar dengan sumbu X  
  B. Garis lurus tegak (vertikal) pada posisi $x = 4$ yang sejajar dengan sumbu Y  
  C. Garis miring menanjak dari titik $(0, 0)$ menuju $(4, 4)$  
  D. Garis miring menurun dari titik $(0, 4)$ menuju $(4, 0)$  
- **Kunci:** A. Garis lurus mendatar (horizontal) pada ketinggian $y = 4$ yang sejajar dengan sumbu X
- **Pembahasan:**
  Fungsi $f(x) = 4$ dapat ditulis sebagai $f(x) = 0x + 4$.
  - Koefisien $x$ adalah $a = 0$, artinya gradien kemiringannya adalah nol ($m = 0$).
  - Garis dengan gradien nol sama sekali tidak menanjak dan tidak menurun, melainkan berupa **garis horizontal mendatar sempurna**.
  - Untuk setiap nilai $x$ berapapun ($x = -2, 0, 3, 5$), nilai tingginya selalu tetap $y = 4$.
- **Feedback:**
  - *Benar:* "Tepat sekali! Fungsi konstan memiliki kemiringan $m = 0$, sehingga grafiknya mendatar horizontal sejajar sumbu X."
  - *Salah:* "Fungsi $f(x) = 4$ berarti nilai $y$ selalu bernilai 4 untuk semua $x$. Garis yang semua titiknya bertinggi $y = 4$ adalah garis mendatar horizontal sejajar sumbu X."

---

### [ID: CH4-STAGE-18] Misteri Garis Tembok Vertikal: Mengapa Garis Vertikal Bukan Fungsi?
- **Materi:** Uji Garis Vertikal (*Vertical Line Test*) dan Karakteristik Relasi
- **Indikator:** Siswa dapat mengevaluasi bahwa garis tegak vertikal $x = 4$ bukan merupakan grafik fungsi $y = f(x)$.
- **Bentuk Interaksi:** PILIHAN GANDA (Evaluasi Konseptual)
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Di laboratorium koordinat, terdapat sebuah garis pembatas tegak lurus (vertikal) dengan persamaan $x = 4$.
  Detektif Data menyatakan: *"Garis tegak $x = 4$ ini BUKAN merupakan grafik fungsi $y = f(x)$!"*
  Apakah alasan matematis yang PALING TEPAT untuk membenarkan kesimpulan Detektif Data tersebut?
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-1, 6]$, Rentang $Y \in [-4, 6]$, step grid = 1.
  - *Visual:* Garis vertikal putus-putus merah pada $x = 4$. Terdapat titik-titik $(4, -2), (4, 0), (4, 3), (4, 5)$ yang semuanya menyala merah dengan tanda peringatan 'SATU INPUT BERCABANG TAK TERHINGGA'.
- **Pilihan Jawaban:**
  A. Karena satu nilai masukan ($x = 4$) memiliki tak terhingga banyak pasangan nilai $y$, melanggar syarat utama fungsi  
  B. Karena garis tersebut tidak melewati titik pusat $(0, 0)$  
  C. Karena garis vertikal memiliki gradien bernilai nol  
  D. Karena garis tersebut memotong sumbu X di angka positif  
- **Kunci:** A. Karena satu nilai masukan ($x = 4$) memiliki tak terhingga banyak pasangan nilai $y$, melanggar syarat utama fungsi
- **Pembahasan:**
  Definisi dasar fungsi: setiap anggota daerah asal (domain $x$) harus memiliki **tepat satu pasangan** pada daerah hasil ($y$).
  Pada garis vertikal $x = 4$:
  - Nilai $x = 4$ dipasangkan dengan $y = 1, y = 2, y = 3, y = -5$, dan tak terhingga nilai $y$ lainnya.
  - Hal ini melanggar syarat fungsi (input $x = 4$ bercabang banyak).
  - Menurut *Vertical Line Test*, jika ada garis vertikal yang memotong grafik di lebih dari satu titik, maka grafik tersebut bukan fungsi $y = f(x)$.
- **Feedback:**
  - *Benar:* "Analisis tingkat tinggi! Syarat mutlak fungsi adalah satu $x$ hanya boleh punya tepat satu pasangan $y$. Garis vertikal membuat nilai $x$ memiliki cabang tak terhingga!"
  - *Salah:* "Ingat kembali syarat fungsi dari Bab 2: setiap elemen input $x$ harus memiliki pasangan tunggal. Garis vertikal memiliki satu nilai $x$ dengan banyak sekali nilai $y$."

---

### [ID: CH4-STAGE-19] Memetakan Wilayah Operasi: Luas Segitiga Koordinat
- **Materi:** Hubungan Grafik Linear dengan Geometri (Luas Daerah Segitiga)
- **Indikator:** Diberikan fungsi $f(x) = 2x - 4$, siswa dapat menghitung luas daerah segitiga siku-siku yang dibentuk oleh garis fungsi dengan sumbu X dan sumbu Y.
- **Bentuk Interaksi:** INTERPRETASI GRAFIK
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Garis radar $f(x) = 2x - 4$, sumbu X, dan sumbu Y membatasi sebuah daerah segitiga tertutup yang dijadikan zona operasi penyelidikan.
  Berapakah luas daerah segitiga zona operasi tersebut?
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-2, 5]$, Rentang $Y \in [-6, 3]$, step grid = 1.
  - *Visual:* Garis melalui $(0, -4)$ dan $(2, 0)$. Area segitiga siku-siku antara $(0, 0)$, $(2, 0)$, dan $(0, -4)$ diarsir kuning transparan.
  - *Anotasi:* Label alas $a = 2$ satuan (pada sumbu X) dan tinggi $t = 4$ satuan (panjang vertikal pada sumbu Y).
- **Pilihan Jawaban:**
  A. $4\text{ satuan luas}$  
  B. $8\text{ satuan luas}$  
  C. $2\text{ satuan luas}$  
  D. $6\text{ satuan luas}$  
- **Kunci:** A. $4\text{ satuan luas}$
- **Pembahasan:**
  1. Cari titik potong sumbu X ($y = 0$):
     $$2x - 4 = 0 \implies 2x = 4 \implies x = 2 \implies \text{titik } (2, 0)$$
     Panjang alas segitiga dari titik pusat $(0, 0)$ ke $(2, 0)$ adalah $a = 2\text{ satuan}$.
  2. Cari titik potong sumbu Y ($x = 0$):
     $$f(0) = -4 \implies \text{titik } (0, -4)$$
     Tinggi segitiga adalah jarak mutlak dari $(0, 0)$ ke $(0, -4)$, yaitu $t = |-4| = 4\text{ satuan}$.
  3. Luas segitiga siku-siku:
     $$\text{Luas} = \frac{1}{2} \times \text{alas} \times \text{tinggi} = \frac{1}{2} \times 2 \times 4 = 4\text{ satuan luas}$$
- **Feedback:**
  - *Benar:* "Hebat! Alasnya berjarak 2 satuan pada sumbu X dan tingginya 4 satuan pada sumbu Y. Luasnya $\frac{1}{2} \times 2 \times 4 = 4$ satuan luas."
  - *Salah:* "Gunakan rumus luas segitiga: $\frac{1}{2} \times \text{alas} \times \text{tinggi}$. Alas didapat dari titik potong sumbu X ($x = 2$) dan tinggi dari jarak titik potong sumbu Y ($y = 4$)."

---

### [ID: CH4-STAGE-20] Uji Validitas Model: Deteksi Grafik Bukan Linear
- **Materi:** Membedakan Grafik Fungsi Linear dan Non-Linear
- **Indikator:** Siswa dapat mengidentifikasi fungsi kuadrat (parabola) sebagai grafik yang bukan merupakan fungsi linear.
- **Bentuk Interaksi:** DETEKSI KESALAHAN GRAFIK (Seleksi Visual)
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Detektif Data sedang memfilter 4 sinyal fungsi yang terekam pada osiloskop. Manakah di antara formula dan kurva di bawah ini yang **BUKAN** merupakan fungsi linear?
- **Spesifikasi Programmer:**
  - *Tampilan:* 4 panel kartu beranimasi mini:
    - Panel 1: Formula $f(x) = 3x - 5$ dengan grafik garis lurus menanjak.
    - Panel 2: Formula $g(x) = 2x^2 - 4$ dengan grafik kurva lengkung parabola (berbentuk huruf U).
    - Panel 3: Formula $h(x) = -x + 6$ dengan grafik garis lurus menurun.
    - Panel 4: Formula $k(x) = 5$ dengan grafik garis lurus mendatar.
  - *Interaksi:* Siswa mengklik kartu yang bukan grafik fungsi linear.
- **Pilihan Jawaban:**
  A. $g(x) = 2x^2 - 4$ (grafik kurva melengkung parabola)  
  B. $f(x) = 3x - 5$ (grafik garis lurus menanjak)  
  C. $h(x) = -x + 6$ (grafik garis lurus menurun)  
  D. $k(x) = 5$ (grafik garis lurus mendatar)  
- **Kunci:** A. $g(x) = 2x^2 - 4$ (grafik kurva melengkung parabola)
- **Pembahasan:**
  Fungsi linear memiliki ciri matematis utama:
  1. Variabel $x$ wajib berderajat (berpangkat) paling tinggi **satu** ($x^1$).
  2. Bentuk grafiknya selalu berupa satu **garis lurus**.
  Pada fungsi $g(x) = 2x^2 - 4$, variabel $x$ berpangkat dua ($x^2$). Ini adalah fungsi kuadrat yang menghasilkan grafik kurva lengkung parabola, bukan garis lurus.
- **Feedback:**
  - *Benar:* "Tepat sekali! $g(x) = 2x^2 - 4$ memiliki pangkat dua, sehingga grafiknya melengkung (parabola) dan bukan merupakan fungsi linear."
  - *Salah:* "Perhatikan pangkat variabel $x$. Fungsi linear variabelnya harus berpangkat satu ($x$). Jika ada $x^2$, fungsinya adalah fungsi kuadrat."

---

### [ID: CH4-STAGE-21] Sintesis Akhir Detektif: Anatomi Lengkap Grafik $f(x) = mx + b$
- **Materi:** Rangkuman Esensial Grafik Fungsi Linear
- **Indikator:** Siswa dapat mengevaluasi dan menyimpulkan peranan geometris parameter $m$ dan $b$ pada rumus umum grafik fungsi linear $f(x) = mx + b$.
- **Bentuk Interaksi:** PILIHAN GANDA (Sintesis Big Idea)
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Setelah menuntaskan seluruh penyelidikan Chapter 4, Detektif Data menyusun laporan kesimpulan akhir tentang rumus sakti grafik fungsi linear:
  $$f(x) = mx + b$$
  Manakah kesimpulan yang PALING LENGKAP dan TEPAT mengenai makna visual dari $m$ dan $b$?
- **Spesifikasi Programmer:**
  - *Visual:* Infografis animasi interaktif menampilkan garis yang sudut kemiringannya dapat digeser dengan slider $m$ dan ketinggian titik potongnya dapat dinaik-turunkan dengan slider $b$.
- **Pilihan Jawaban:**
  A. Nilai $m$ menentukan kemiringan arah lereng garis (gradien), sedangkan $b$ menentukan titik temu garis dengan sumbu tegak Y di koordinat $(0, b)$  
  B. Nilai $m$ menentukan panjang garis, sedangkan $b$ menentukan ketebalan garis pada layar  
  C. Nilai $m$ adalah titik potong sumbu X, sedangkan $b$ adalah titik potong sumbu Y  
  D. Nilai $m$ dan $b$ hanya berlaku untuk grafik yang melewati titik pangkal $(0, 0)$  
- **Kunci:** A. Nilai $m$ menentukan kemiringan arah lereng garis (gradien), sedangkan $b$ menentukan titik temu garis dengan sumbu tegak Y di koordinat $(0, b)$
- **Pembahasan:**
  Pada bentuk baku fungsi linear $f(x) = mx + b$:
  1. Parameter $m$ disebut **gradien**:
     - Jika $m > 0$, garis menanjak naik ke kanan atas.
     - Jika $m < 0$, garis menurun miring ke kanan bawah.
     - Jika $m = 0$, garis mendatar sempurna sejajar sumbu X.
  2. Parameter $b$ disebut **konstanta / intersep Y**:
     - Garis selalu memotong sumbu Y tepat di titik koordinat $(0, b)$.
  Ini adalah intisari fundamental geometri analitis fungsi linear.
- **Feedback:**
  - *Benar:* "Selamat Detektif Data! Kamu telah menuntaskan Chapter 4 dengan pemahaman sempurna tentang anatomi dan karakteristik grafik fungsi linear!"
  - *Salah:* "Ingat kembali: $m$ adalah gradien (kemiringan garis), sedangkan konstanta $b$ adalah ketinggian titik temu dengan sumbu Y di titik $(0, b)$."

---

# BAGIAN II: 30 SOAL LATIHAN & REMEDIAL CHAPTER 4 (VARIASI FORMAT & ANGKA)

---

### [ID: CH4-EX-01] Bentuk Visual Grafik Fungsi Linear
- **Materi:** Definisi Visual Grafik Fungsi Linear
- **Indikator:** Siswa dapat mengidentifikasi bahwa grafik fungsi linear selalu membentuk garis lurus.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C2 (Memahami)
- **Soal:**
  Bagaimanakah bentuk visual grafik dari fungsi linear $f(x) = ax + b$ pada bidang koordinat Cartesius?
- **Pilihan Jawaban:**
  A. Selalu berupa garis lurus  
  B. Berupa kurva lengkung parabola  
  C. Berupa lingkaran tertutup  
  D. Berupa gelombang naik-turun  
- **Kunci:** A. Selalu berupa garis lurus
- **Pembahasan:**
  Karena variabel $x$ berpangkat satu (derajat satu / linear), grafik dari fungsi linear $f(x) = ax + b$ selalu membentuk satu garis lurus sempurna di seluruh daerah domain realnya.
- **Feedback:**
  - *Benar:* "Tepat sekali! Kata 'linear' berasal dari 'line' yang berarti garis lurus."
  - *Salah:* "Grafik fungsi berderajat 1 (linear) selalu berupa garis lurus, bukan kurva melengkung."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Grafik dari persamaan fungsi $f(x) = 2x + 7$ pada koordinat Cartesius selalu berupa...
  - *Pilihan Jawaban:* A. Garis lurus | B. Kurva parabola | C. Lingkaran | D. Segitiga
  - *Kunci:* A. Garis lurus
  - *Pembahasan:* Semua fungsi linear membentuk garis lurus.

---

### [ID: CH4-EX-02] Titik Potong Sumbu Y Secara Simbolik
- **Materi:** Karakteristik Titik Potong Sumbu Y
- **Indikator:** Siswa dapat memvalidasi pernyataan bahwa titik potong sumbu Y dari $f(x) = ax + b$ selalu di $(0, b)$.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Grafik fungsi linear $f(x) = ax + b$ selalu memotong sumbu Y di titik koordinat $(0, b)$."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Titik potong sumbu Y terjadi saat $x = 0$. Substitusikan $x = 0$ ke dalam rumus:
  $$f(0) = a(0) + b = b$$
  Maka koordinatnya selalu $(0, b)$. Pernyataan bernilai benar.
- **Feedback:**
  - *Benar:* "Tepat! Nilai konstanta $b$ secara langsung adalah nilai $y$ saat $x = 0$."
  - *Salah:* "Pernyataan ini BENAR. Masukkan $x = 0$, maka hasilnya pasti $y = b$, sehingga titiknya $(0, b)$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Grafik fungsi $f(x) = 4x + 9$ memotong sumbu Y di titik $(0, 9)$.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* A. Benar
  - *Pembahasan:* Saat $x = 0$, $f(0) = 4(0) + 9 = 9$. Koordinatnya $(0, 9)$.

---

### [ID: CH4-EX-03] Menentukan Titik Potong Sumbu Y Numerik
- **Materi:** Perhitungan Titik Potong Sumbu Y
- **Indikator:** Siswa dapat menentukan titik potong sumbu Y dari $f(x) = 3x - 6$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Grafik fungsi linear $f(x) = 3x - 6$ memotong sumbu Y pada titik koordinat...
- **Pilihan Jawaban:**
  A. $(0, -6)$  
  B. $(0, 6)$  
  C. $(-6, 0)$  
  D. $(2, 0)$  
- **Kunci:** A. $(0, -6)$
- **Pembahasan:**
  Titik potong sumbu Y terjadi ketika $x = 0$:
  $$f(0) = 3(0) - 6 = -6$$
  Koordinat titik potongnya adalah $(0, -6)$. Jangan tertukar dengan titik potong sumbu X $(2, 0)$.
- **Feedback:**
  - *Benar:* "Akurat! Pada sumbu Y nilai $x = 0$, sehingga koordinatnya adalah $(0, -6)$."
  - *Salah:* "Substitusi $x = 0$: $f(0) = 3(0) - 6 = -6$. Format koordinatnya adalah $(x, y) = (0, -6)$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Grafik fungsi linear $f(x) = 2x - 8$ memotong sumbu Y di titik...
  - *Pilihan Jawaban:* A. $(0, -8)$ | B. $(0, 8)$ | C. $(-8, 0)$ | D. $(4, 0)$
  - *Kunci:* A. $(0, -8)$
  - *Pembahasan:* $f(0) = 2(0) - 8 = -8 \implies (0, -8)$.

---

### [ID: CH4-EX-04] Menentukan Titik Potong Sumbu X
- **Materi:** Perhitungan Titik Potong Sumbu X
- **Indikator:** Siswa dapat menentukan titik potong sumbu X dari $f(x) = 2x - 6$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Grafik fungsi linear $f(x) = 2x - 6$ memotong sumbu X pada titik koordinat...
- **Pilihan Jawaban:**
  A. $(3, 0)$  
  B. $(0, 3)$  
  C. $(0, -6)$  
  D. $(-3, 0)$  
- **Kunci:** A. $(3, 0)$
- **Pembahasan:**
  Titik potong sumbu X terjadi saat nilai $f(x) = y = 0$:
  $$2x - 6 = 0 \implies 2x = 6 \implies x = 3$$
  Jadi titik koordinatnya adalah $(3, 0)$.
- **Feedback:**
  - *Benar:* "Tepat! Titik potong sumbu X terjadi saat $y = 0$, menghasilkan $x = 3$ dan titik $(3, 0)$."
  - *Salah:* "Jadikan $f(x) = 0$: $2x - 6 = 0 \implies 2x = 6 \implies x = 3$. Titik potong sumbu X adalah $(3, 0)$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Grafik fungsi linear $f(x) = 3x - 12$ memotong sumbu X pada titik koordinat...
  - *Pilihan Jawaban:* A. $(4, 0)$ | B. $(0, 4)$ | C. $(0, -12)$ | D. $(-4, 0)$
  - *Kunci:* A. $(4, 0)$
  - *Pembahasan:* $3x - 12 = 0 \implies 3x = 12 \implies x = 4 \implies (4, 0)$.

---

### [ID: CH4-EX-05] Kemiringan Garis Gradien Positif
- **Materi:** Karakteristik Arah Gradien Positif
- **Indikator:** Siswa dapat mengidentifikasi hubungan koefisien $a > 0$ dengan arah garis yang menanjak naik ke kanan atas.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Jika koefisien gradien $a$ pada $f(x) = ax + b$ bernilai positif ($a > 0$), maka grafik garis lurus akan menanjak naik dari kiri bawah ke kanan atas."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Gradien positif ($a > 0$) berarti laju perubahan bernilai positif: saat nilai $x$ bertambah besar, nilai $y$ juga ikut bertambah besar. Visual grafiknya selalu menanjak naik ke arah kanan atas.
- **Feedback:**
  - *Benar:* "Benar! Gradien positif = lereng menanjak naik ke kanan atas."
  - *Salah:* "Pernyataan ini bernilai BENAR. Garis bergradien positif selalu bergerak naik seiring langkah ke kanan."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Grafik fungsi $f(x) = -3x + 5$ condong menurun dari kiri atas ke kanan bawah.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* A. Benar
  - *Pembahasan:* Karena gradiennya negatif ($-3$), grafiknya condong menurun ke kanan bawah.

---

### [ID: CH4-EX-06] Menjodohkan Titik Potong Sumbu Koordinat
- **Materi:** Titik Potong Sumbu X, Sumbu Y, dan Titik Sebarang
- **Indikator:** Siswa dapat menjodohkan jenis titik potong dari fungsi $f(x) = 2x - 4$ dengan koordinatnya.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan fungsi linear $f(x) = 2x - 4$. Jodohkan jenis titik potong di sebelah kiri dengan koordinatnya yang tepat di sebelah kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:*
    1. Titik potong sumbu Y
    2. Titik potong sumbu X
    3. Titik saat $x = 1$
  - *Kolom Kanan:*
    - $(0, -4)$
    - $(2, 0)$
    - $(1, -2)$
    - $(0, 2)$ [Distraktor]
- **Pilihan Jawaban:**
  - Titik potong sumbu Y $\rightarrow (0, -4)$
  - Titik potong sumbu X $\rightarrow (2, 0)$
  - Titik saat $x = 1 \rightarrow (1, -2)$
- **Kunci:**
  - Titik potong sumbu Y $\leftrightarrow (0, -4)$
  - Titik potong sumbu X $\leftrightarrow (2, 0)$
  - Titik saat $x = 1 \leftrightarrow (1, -2)$
- **Pembahasan:**
  - Potong sumbu Y: $x = 0 \implies f(0) = -4 \implies (0, -4)$.
  - Potong sumbu X: $y = 0 \implies 2x - 4 = 0 \implies 2x = 4 \implies x = 2 \implies (2, 0)$.
  - Saat $x = 1$: $f(1) = 2(1) - 4 = -2 \implies (1, -2)$.
- **Feedback:**
  - *Benar:* "Sempurna! Kamu memahami perbedaan letak titik potong sumbu Y ($x=0$) dan sumbu X ($y=0$)."
  - *Salah:* "Ingat: potong sumbu Y memiliki $x = 0$, sedangkan potong sumbu X memiliki $y = 0$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jodohkan titik potong fungsi $f(x) = 3x - 9$!
  - *Pasangan:*
    - Titik potong sumbu Y $\leftrightarrow (0, -9)$
    - Titik potong sumbu X $\leftrightarrow (3, 0)$
    - Titik saat $x = 2 \leftrightarrow (2, -3)$
  - *Kunci:* Sumbu Y di $(0, -9)$, sumbu X di $(3, 0)$, dan saat $x=2$ di $(2, -3)$.
  - *Pembahasan:* $f(0) = -9$, $3x=9 \implies x=3$, $f(2) = 6-9 = -3$.

---

### [ID: CH4-EX-07] Menentukan Nilai Gradien Garis
- **Materi:** Nilai Gradien dari Bentuk Baku Fungsi Linear
- **Indikator:** Siswa dapat menentukan nilai gradien kemiringan dari $f(x) = -4x + 7$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C2 (Memahami)
- **Soal:**
  Berapakah nilai kemiringan (gradien) dari grafik fungsi linear $f(x) = -4x + 7$?
- **Pilihan Jawaban:**
  A. $-4$  
  B. $4$  
  C. $7$  
  D. $-7$  
- **Kunci:** A. $-4$
- **Pembahasan:**
  Pada rumus umum fungsi linear $f(x) = ax + b$, gradien kemiringan ($m$) adalah koefisien di depan variabel $x$, yaitu $m = a = -4$. Konstanta 7 adalah titik potong sumbu Y.
- **Feedback:**
  - *Benar:* "Tepat! Koefisien di depan variabel $x$ adalah gradien garis, yaitu $-4$."
  - *Salah:* "Gradien adalah angka yang menempel di depan variabel $x$ (koefisien), yaitu $-4$, bukan konstanta 7."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Berapakah nilai gradien kemiringan garis dari fungsi $f(x) = -5x + 3$?
  - *Pilihan Jawaban:* A. $-5$ | B. $5$ | C. $3$ | D. $-3$
  - *Kunci:* A. $-5$
  - *Pembahasan:* Koefisien di depan $x$ adalah $-5$, itulah nilai gradiennya.

---

### [ID: CH4-EX-08] Syarat Penarikan Garis Lurus (Aksioma Euclid)
- **Materi:** Penentuan Garis Lurus Berdasarkan Titik Koordinat
- **Indikator:** Siswa dapat memilih pernyataan-pernyataan yang benar mengenai cara menggambar grafik fungsi linear.
- **Bentuk Interaksi:** MCQ_COMPLEX (Pilihan Ganda Kompleks)
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Manakah pernyataan yang BENAR mengenai cara menggambar grafik fungsi linear pada koordinat Cartesius? *(Pilih semua yang benar)*
- **Pilihan Jawaban:**
  A. Hanya diperlukan minimal 2 titik koordinat berbeda untuk menggambar garis lurus yang pasti  
  B. Titik potong sumbu X dan titik potong sumbu Y adalah dua titik paling mudah untuk menghubungkan garis  
  C. Diperlukan minimal 10 titik agar garisnya tidak melengkung  
  D. Semua titik koordinat $(x, f(x))$ yang memenuhi fungsi pasti terletak tepat pada garis tersebut  
- **Kunci:** Pilihan A, B, dan D
- **Pembahasan:**
  - A BENAR: Menurut aksioma geometri Euclid, melalui dua titik berbeda selalu dapat ditarik tepat satu garis lurus.
  - B BENAR: Titik potong sumbu ($(x, 0)$ dan $(0, y)$) sangat mudah dihitung dengan membuat $x=0$ atau $y=0$.
  - C SALAH: Dua titik sudah cukup; tidak perlu 10 titik.
  - D BENAR: Seluruh pasangan penyelesaian $(x, f(x))$ membentuk garis tersebut.
- **Feedback:**
  - *Benar:* "Luar biasa! Dua titik koordinat sudah sangat cukup untuk menarik penggaris membuat garis lurus."
  - *Salah:* "Cek opsi C: kita tidak butuh 10 titik, cukup 2 titik berbeda untuk menentukan satu garis lurus."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Manakah yang BENAR tentang grafik fungsi linear? (Pilih semua yang benar)
  - *Pilihan Jawaban:* A. Dua titik koordinat cukup untuk menggambar grafiknya | B. Grafiknya selalu berupa kurva | C. Titik potong sumbu koordinat sangat membantu penarikan garis
  - *Kunci:* A dan C
  - *Pembahasan:* Dua titik cukup untuk menggambar garis lurus fungsi linear.

---

### [ID: CH4-EX-09] Plot Titik Potong Koordinat $f(x) = 2x - 4$
- **Materi:** Menandai Titik Potong pada Grid Koordinat
- **Indikator:** Siswa dapat memplot titik $(2, 0)$ dan $(0, -4)$ pada bidang Cartesius.
- **Bentuk Interaksi:** PLOT TITIK (Cartesian Point Selection)
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Plot dua titik potong fungsi linear $f(x) = 2x - 4$ dengan sumbu X di titik $(2, 0)$ dan sumbu Y di titik $(0, -4)$ pada bidang koordinat di bawah!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-2, 5]$, Rentang $Y \in [-5, 3]$, step grid = 1.
  - *Target:* Siswa mengklik koordinat $(2, 0)$ dan $(0, -4)$.
  - *Visual Feedback:* Kedua titik menyala hijau dan garis tipis terbentuk.
- **Pilihan Jawaban:** Menandai koordinat `(2, 0)` dan `(0, -4)`.
- **Kunci:** Titik `(2, 0)` dan `(0, -4)`
- **Pembahasan:**
  - Titik potong sumbu X: $y = 0 \implies 2x - 4 = 0 \implies x = 2 \implies (2, 0)$.
  - Titik potong sumbu Y: $x = 0 \implies f(0) = -4 \implies (0, -4)$.
- **Feedback:**
  - *Benar:* "Akurat! Kedua titik potong utama $(2, 0)$ dan $(0, -4)$ berhasil diplot."
  - *Salah:* "Tandai $(2, 0)$ pada sumbu mendatar X dan $(0, -4)$ pada sumbu tegak Y."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Plot titik potong sumbu X dan sumbu Y dari fungsi $f(x) = x - 3$!
  - *Kunci:* Titik $(3, 0)$ dan $(0, -3)$.
  - *Pembahasan:* $x - 3 = 0 \implies x = 3$ titik $(3, 0)$; $f(0) = -3$ titik $(0, -3)$.

---

### [ID: CH4-EX-10] Garis Melalui Titik Pusat $(0, 0)$
- **Materi:** Syarat Garis Melalui Titik Pangkal
- **Indikator:** Siswa dapat mengidentifikasi bahwa fungsi dengan konstanta $b = 0$ ($f(x) = 3x$) pasti melalui titik pangkal $(0, 0)$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C2 (Memahami)
- **Soal:**
  Fungsi linear manakah di bawah ini yang grafiknya PASTI melalui titik pusat koordinat Cartesius $(0, 0)$?
- **Pilihan Jawaban:**
  A. $f(x) = 3x$  
  B. $f(x) = 3x + 2$  
  C. $f(x) = 3x - 4$  
  D. $f(x) = x + 1$  
- **Kunci:** A. $f(x) = 3x$
- **Pembahasan:**
  Syarat garis melalui titik pangkal $(0, 0)$ adalah ketika $x = 0$, maka $y = 0$.
  Pada $f(x) = 3x$, nilai konstantanya adalah $b = 0$. Saat $x = 0$, $f(0) = 3(0) = 0$.
  Fungsi lain memiliki konstanta tak nol ($b \neq 0$) sehingga memotong sumbu Y di atas atau di bawah $(0, 0)$.
- **Feedback:**
  - *Benar:* "Bagus! Fungsi tanpa konstanta tambahan ($b = 0$) selalu memotong tepat di titik pusat $(0, 0)$."
  - *Salah:* "Cari fungsi yang tidak memiliki suku tambah/kurang angka konstanta di belakang $x$ ($b = 0$)."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Manakah fungsi linear yang grafiknya melalui titik pangkal $(0, 0)$?
  - *Pilihan Jawaban:* A. $f(x) = 5x$ | B. $f(x) = 5x - 5$ | C. $f(x) = 2x + 1$ | D. $f(x) = x - 2$
  - *Kunci:* A. $f(x) = 5x$
  - *Pembahasan:* $f(0) = 5(0) = 0$, sehingga melalui $(0, 0)$.

---

### [ID: CH4-EX-11] Grafik Fungsi Konstan
- **Materi:** Orientasi Garis Fungsi Konstan $f(x) = c$
- **Indikator:** Siswa dapat memvalidasi bahwa grafik $f(x) = 5$ berupa garis lurus mendatar yang sejajar sumbu X.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Grafik dari fungsi konstan $f(x) = 5$ adalah garis lurus yang mendatar (sejajar dengan sumbu X)."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Fungsi $f(x) = 5$ memiliki gradien $a = 0$. Nilai kemiringan nol menandakan garis mendatar (horizontal) pada ketinggian $y = 5$, sejajar dengan sumbu X. Pernyataan bernilai benar.
- **Feedback:**
  - *Benar:* "Tepat! Karena ketinggiannya selalu $y = 5$ untuk nilai $x$ berapapun, grafiknya mendatar horizontal."
  - *Salah:* "Pernyataan ini bernilai BENAR. Fungsi konstan $y = c$ selalu sejajar dengan sumbu X."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Grafik fungsi $f(x) = 3$ sejajar dengan sumbu Y (tegak lurus).
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* B. Salah
  - *Pembahasan:* $f(x) = 3$ adalah garis horizontal yang sejajar sumbu X, bukan sumbu Y.

---

### [ID: CH4-EX-12] Titik Terletak pada Garis $f(x) = 3x + 2$
- **Materi:** Pengujian Kedudukan Titik Koordinat pada Garis
- **Indikator:** Siswa dapat menentukan titik mana yang memenuhi persamaan garis $f(x) = 3x + 2$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Manakah titik koordinat di bawah ini yang TERLETAK pada grafik fungsi $f(x) = 3x + 2$?
- **Pilihan Jawaban:**
  A. $(2, 8)$  
  B. $(1, 4)$  
  C. $(3, 10)$  
  D. $(0, 0)$  
- **Kunci:** A. $(2, 8)$
- **Pembahasan:**
  Uji setiap opsi ke dalam rumus $f(x) = 3x + 2$:
  - Titik $(2, 8) \implies f(2) = 3(2) + 2 = 6 + 2 = 8$ [Cocok!]
  - Titik $(1, 4) \implies f(1) = 3(1) + 2 = 5 \neq 4$
  - Titik $(3, 10) \implies f(3) = 3(3) + 2 = 11 \neq 10$
  - Titik $(0, 0) \implies f(0) = 3(0) + 2 = 2 \neq 0$
  Maka hanya titik $(2, 8)$ yang terletak pada garis.
- **Feedback:**
  - *Benar:* "Akurat! Saat $x = 2$, nilai $y = 3(2)+2 = 8$, sehingga $(2, 8)$ terletak pada garis."
  - *Salah:* "Masukkan nilai $x$ pilihan ke $3x + 2$. Pada $x = 2$, diperoleh $3(2)+2 = 8$, cocok dengan titik $(2, 8)$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Titik manakah yang terletak pada grafik fungsi $f(x) = 2x + 5$?
  - *Pilihan Jawaban:* A. $(3, 11)$ | B. $(2, 8)$ | C. $(1, 6)$ | D. $(0, 2)$
  - *Kunci:* A. $(3, 11)$
  - *Pembahasan:* $f(3) = 2(3) + 5 = 11 \implies (3, 11)$.

---

### [ID: CH4-EX-13] Menjodohkan Rumus Fungsi dan Nilai Gradien
- **Materi:** Ekstraksi Gradien Garis Linear
- **Indikator:** Siswa dapat menjodohkan rumus fungsi dengan koefisien kemiringan gradiennya.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C2 (Memahami)
- **Soal:**
  Jodohkan setiap fungsi linear di sebelah kiri dengan nilai gradien ($m$) yang tepat di sebelah kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:*
    1. $f(x) = 5x - 1$
    2. $f(x) = -2x + 4$
    3. $f(x) = x + 9$
  - *Kolom Kanan:*
    - $5$
    - $-2$
    - $1$
    - $9$ [Distraktor]
- **Pilihan Jawaban:**
  - $f(x) = 5x - 1 \rightarrow 5$
  - $f(x) = -2x + 4 \rightarrow -2$
  - $f(x) = x + 9 \rightarrow 1$
- **Kunci:**
  - `f(x) = 5x - 1` $\leftrightarrow 5$
  - `f(x) = -2x + 4` $\leftrightarrow -2$
  - `f(x) = x + 9` $\leftrightarrow 1$
- **Pembahasan:**
  Gradien kemiringan adalah koefisien di depan variabel $x$:
  - Pada $5x - 1$, gradiennya adalah 5.
  - Pada $-2x + 4$, gradiennya adalah $-2$.
  - Pada $x + 9$, koefisien $x$ adalah 1 ($1x$), sehingga gradiennya adalah 1.
- **Feedback:**
  - *Benar:* "Hebat! Ingat bahwa jika tidak ada angka tertulis di depan $x$, nilainya adalah 1."
  - *Salah:* "Ambil angka koefisien tepat di depan $x$. Jangan tertukar dengan suku konstanta di belakang."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jodohkan fungsi dengan gradiennya!
  - *Pasangan:*
    - $f(x) = 4x + 3 \leftrightarrow 4$
    - $f(x) = -3x + 7 \leftrightarrow -3$
    - $f(x) = -x + 2 \leftrightarrow -1$
  - *Kunci:* $4x+3 \rightarrow 4$, $-3x+7 \rightarrow -3$, $-x+2 \rightarrow -1$.
  - *Pembahasan:* Koefisien variabel $x$ adalah nilai gradien.

---

### [ID: CH4-EX-14] Plot Tiga Titik Berurutan $f(x) = 2x + 1$
- **Materi:** Memetakan Himpunan Titik Garis Linear
- **Indikator:** Siswa dapat menandai titik $(0, 1)$, $(1, 3)$, dan $(2, 5)$ pada bidang koordinat.
- **Bentuk Interaksi:** PLOT TITIK (Multi-point Grid)
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Plot titik-titik $(0, 1)$, $(1, 3)$, dan $(2, 5)$ yang merupakan pasangan nilai dari fungsi $f(x) = 2x + 1$ pada bidang koordinat Cartesius!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [0, 4]$, Rentang $Y \in [0, 7]$, step grid = 1.
  - *Target:* Siswa menandai 3 titik: $(0, 1)$, $(1, 3)$, dan $(2, 5)$.
  - *Visual:* Ketiga titik menyala dan sebuah garis lurus menghubungkan ketiganya secara mulus.
- **Pilihan Jawaban:** Menandai tiga titik koordinat pada bidang Cartesius.
- **Kunci:** Titik `(0, 1)`, `(1, 3)`, dan `(2, 5)`
- **Pembahasan:**
  - $x = 0 \implies f(0) = 2(0) + 1 = 1 \implies (0, 1)$
  - $x = 1 \implies f(1) = 2(1) + 1 = 3 \implies (1, 3)$
  - $x = 2 \implies f(2) = 2(2) + 1 = 5 \implies (2, 5)$
  Ketiga titik ini kolinear (terletak pada satu garis lurus yang sama).
- **Feedback:**
  - *Benar:* "Bagus sekali! Ketiga titik tersebut membentuk satu garis lurus yang sangat teratur."
  - *Salah:* "Tandai masing-masing titik koordinat: $(x=0, y=1)$, $(x=1, y=3)$, dan $(x=2, y=5)$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Plot titik $(0, 2)$, $(1, 4)$, dan $(2, 6)$ dari fungsi $f(x) = 2x + 2$!
  - *Kunci:* Titik $(0, 2)$, $(1, 4)$, dan $(2, 6)$.
  - *Pembahasan:* $f(0)=2, f(1)=4, f(2)=6$.

---

### [ID: CH4-EX-15] Titik Potong Kedua Sumbu Sekaligus
- **Materi:** Penentuan Pasangan Titik Potong Sumbu X dan Sumbu Y
- **Indikator:** Siswa dapat menentukan koordinat titik potong sumbu X (titik A) dan sumbu Y (titik B) dari $f(x) = 4x - 8$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Grafik fungsi linear $f(x) = 4x - 8$ memotong sumbu X di titik A dan sumbu Y di titik B. Koordinat titik A dan B berturut-turut adalah...
- **Pilihan Jawaban:**
  A. $A(2, 0)$ dan $B(0, -8)$  
  B. $A(-8, 0)$ dan $B(0, 2)$  
  C. $A(0, 2)$ dan $B(-8, 0)$  
  D. $A(4, 0)$ dan $B(0, -8)$  
- **Kunci:** A. $A(2, 0)$ dan $B(0, -8)$
- **Pembahasan:**
  1. Titik A (potong sumbu X, $y = 0$):
     $$4x - 8 = 0 \implies 4x = 8 \implies x = 2 \implies A(2, 0)$$
  2. Titik B (potong sumbu Y, $x = 0$):
     $$f(0) = 4(0) - 8 = -8 \implies B(0, -8)$$
  Jadi titik A adalah $(2, 0)$ dan titik B adalah $(0, -8)$.
- **Feedback:**
  - *Benar:* "Sangat tepat! Titik potong sumbu X berformat $(x, 0)$ dan sumbu Y berformat $(0, y)$."
  - *Salah:* "Ingat: potong sumbu X memiliki $y = 0 \implies 4x = 8 \implies x = 2$. Potong sumbu Y memiliki $x = 0 \implies y = -8$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Grafik $f(x) = 5x - 10$ memotong sumbu X di P dan sumbu Y di Q. Koordinat P dan Q adalah...
  - *Pilihan Jawaban:** A. $P(2, 0)$ dan $Q(0, -10)$ | B. $P(-10, 0)$ dan $Q(0, 2)$ | C. $P(5, 0)$ dan $Q(0, -10)$
  - *Kunci:* A. $P(2, 0)$ dan $Q(0, -10)$
  - *Pembahasan:* $5x = 10 \implies P(2, 0)$; $f(0) = -10 \implies Q(0, -10)$.

---

### [ID: CH4-EX-16] Hubungan Dua Garis Sejajar
- **Materi:** Sifat Garis-Garis Sejajar
- **Indikator:** Siswa dapat memvalidasi bahwa $f(x) = 3x + 2$ dan $g(x) = 3x - 7$ adalah dua garis yang saling sejajar.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Pernyataan: *"Dua grafik fungsi linear $f(x) = 3x + 2$ dan $g(x) = 3x - 7$ adalah dua garis lurus yang saling sejajar (tidak akan pernah berpotongan)."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Syarat dua garis saling sejajar adalah memiliki nilai gradien yang sama ($m_1 = m_2$).
  Pada $f(x) = 3x + 2$, nilai $m_1 = 3$.
  Pada $g(x) = 3x - 7$, nilai $m_2 = 3$.
  Karena gradiennya identik dan konstantanya berbeda ($2 \neq -7$), kedua garis memiliki sudut kemiringan yang persis sama sehingga saling sejajar dan tidak akan pernah berpotongan.
- **Feedback:**
  - *Benar:* "Benar! Karena gradien keduanya sama ($m = 3$), arah garisnya sama sehingga sejajar."
  - *Salah:* "Pernyataan ini bernilai BENAR. Kunci garis sejajar adalah gradiennya sama ($m_1 = m_2$)."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Grafik $f(x) = 2x + 1$ dan $g(x) = 5x + 1$ adalah dua garis yang saling sejajar.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* B. Salah
  - *Pembahasan:* Gradiennya berbeda ($2 \neq 5$), sehingga kedua garis pasti berpotongan di satu titik (tidak sejajar).

---

### [ID: CH4-EX-17] Laju Perubahan Nilai $\Delta y = m \cdot \Delta x$
- **Materi:** Interpretasi Nilai Gradien sebagai Laju Perubahan
- **Indikator:** Diberikan fungsi $f(x) = 3x + 1$, siswa dapat menghitung pertambahan nilai $y$ jika $x$ bertambah sebesar 2 satuan.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Pada grafik fungsi linear $f(x) = 3x + 1$, jika nilai $x$ bertambah sebesar 2 satuan, maka nilai $y$ akan bertambah sebesar...
- **Pilihan Jawaban:**
  A. 6 satuan  
  B. 3 satuan  
  C. 2 satuan  
  D. 5 satuan  
- **Kunci:** A. 6 satuan
- **Pembahasan:**
  Gradien kemiringan garis didefinisikan sebagai rasio perubahan:
  $$m = \frac{\Delta y}{\Delta x} \implies \Delta y = m \times \Delta x$$
  Diketahui gradien $m = 3$ dan pertambahan nilai $x$ adalah $\Delta x = 2$.
  Maka perubahan nilai $y$ adalah:
  $$\Delta y = 3 \times 2 = 6\text{ satuan}$$
- **Feedback:**
  - *Benar:* "Luar biasa! Karena setiap kenaikan $x=1$ nilai $y$ naik 3, maka kenaikan $x=2$ membuat $y$ naik $3 \times 2 = 6$ satuan."
  - *Salah:* "Kalikan pertambahan nilai $x$ dengan nilai gradien: $\Delta y = m \times \Delta x = 3 \times 2 = 6$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pada fungsi $f(x) = 4x - 2$, jika nilai $x$ bertambah sebesar 3 satuan, nilai $y$ akan bertambah sebesar...
  - *Pilihan Jawaban:* A. 12 satuan | B. 4 satuan | C. 7 satuan | D. 10 satuan
  - *Kunci:* A. 12 satuan
  - *Pembahasan:* $\Delta y = 4 \times 3 = 12\text{ satuan}$.

---

### [ID: CH4-EX-18] Karakteristik Menyeluruh $f(x) = -2x + 6$
- **Materi:** Analisis Karakteristik Lengkap Garis Linear
- **Indikator:** Siswa dapat memilih semua pernyataan yang benar mengenai grafik $f(x) = -2x + 6$.
- **Bentuk Interaksi:** MCQ_COMPLEX
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan fungsi linear $f(x) = -2x + 6$. Manakah pernyataan di bawah ini yang BENAR mengenai grafiknya? *(Pilih semua yang benar)*
- **Pilihan Jawaban:**
  A. Memotong sumbu Y di titik koordinat $(0, 6)$  
  B. Memotong sumbu X di titik koordinat $(3, 0)$  
  C. Memiliki nilai gradien negatif ($m = -2$)  
  D. Grafiknya menanjak naik dari kiri bawah ke kanan atas  
- **Kunci:** Pilihan A, B, dan C
- **Pembahasan:**
  - A BENAR: Saat $x = 0$, $f(0) = 6 \implies (0, 6)$.
  - B BENAR: Saat $y = 0$, $-2x + 6 = 0 \implies 2x = 6 \implies x = 3 \implies (3, 0)$.
  - C BENAR: Koefisien di depan $x$ adalah $-2$, sehingga gradien $m = -2$ (negatif).
  - D SALAH: Karena gradiennya negatif ($m = -2$), grafiknya condong menurun ke kanan bawah, bukan menanjak naik.
- **Feedback:**
  - *Benar:* "Hebat! Karena gradiennya negatif, grafiknya condong menurun ke kanan bawah. Pernyataan A, B, dan C benar."
  - *Salah:* "Perhatikan tanda gradien $-2$. Garis bergradien negatif tidak mungkin menanjak naik ke kanan atas."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Diberikan $f(x) = -3x + 9$. Manakah yang BENAR? (Pilih semua yang benar)
  - *Pilihan Jawaban:* A. Memotong sumbu Y di $(0, 9)$ | B. Memotong sumbu X di $(3, 0)$ | C. Gradiennya $-3$ | D. Grafiknya melalui $(0, 0)$
  - *Kunci:* A, B, dan C
  - *Pembahasan:* $f(0) = 9$, $3x = 9 \implies x = 3$, gradien $-3$. Garis tidak melalui $(0, 0)$.

---

### [ID: CH4-EX-19] Pasangan Nilai Titik Koordinat Garis
- **Materi:** Menghubungkan Nilai Domain ke Pasangan Titik Koordinat
- **Indikator:** Siswa dapat memasangkan nilai $x \in \{1, 2, 3\}$ ke nilai $y$ pada fungsi $f(x) = 2x + 3$.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Hubungkan setiap nilai masukan $x = 1, 2, 3$ di kolom kiri dengan pasangan nilai titik koordinat $y$ yang tepat pada grafik fungsi $f(x) = 2x + 3$ di kolom kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:* $x = 1$, $x = 2$, $x = 3$
  - *Kolom Kanan:* $y = 5$, $y = 7$, $y = 9$, $y = 11$ [Distraktor]
- **Pilihan Jawaban:**
  - $x = 1 \rightarrow y = 5$
  - $x = 2 \rightarrow y = 7$
  - $x = 3 \rightarrow y = 9$
- **Kunci:**
  - `x = 1` $\leftrightarrow y = 5$
  - `x = 2` $\leftrightarrow y = 7$
  - `x = 3` $\leftrightarrow y = 9$
- **Pembahasan:**
  Substitusikan nilai $x$ ke $f(x) = 2x + 3$:
  - $f(1) = 2(1) + 3 = 5 \implies (1, 5)$
  - $f(2) = 2(2) + 3 = 7 \implies (2, 7)$
  - $f(3) = 2(3) + 3 = 9 \implies (3, 9)$
- **Feedback:**
  - *Benar:* "Bagus! Perhitungan pasangan koordinat $(1, 5), (2, 7), (3, 9)$ sangat tepat."
  - *Salah:* "Hitung nilai $2x + 3$ untuk masing-masing $x$: $2(1)+3=5$, $2(2)+3=7$, dan $2(3)+3=9$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Hubungkan nilai $x$ ke nilai $y$ pada fungsi $f(x) = 3x + 1$ untuk $x = 1, 2, 3$!
  - *Kunci:* $1 \rightarrow 4$, $2 \rightarrow 7$, $3 \rightarrow 10$.
  - *Pembahasan:* $3(1)+1 = 4$; $3(2)+1 = 7$; $3(3)+1 = 10$.

---

### [ID: CH4-EX-20] Gradien Garis dari Dua Titik Koordinat
- **Materi:** Rumus Gradien dari Dua Titik
- **Indikator:** Diberikan titik $(1, 3)$ dan $(3, 7)$, siswa dapat menghitung nilai gradien $m = \frac{7-3}{3-1} = 2$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Suatu grafik garis lurus fungsi linear melalui titik koordinat $(1, 3)$ dan $(3, 7)$. Nilai gradien (kemiringan) garis tersebut adalah...
- **Pilihan Jawaban:**
  A. $2$  
  B. $4$  
  C. $3$  
  D. $1$  
- **Kunci:** A. $2$
- **Pembahasan:**
  Gunakan rumus gradien melalui dua titik $(x_1, y_1)$ dan $(x_2, y_2)$:
  $$m = \frac{y_2 - y_1}{x_2 - x_1}$$
  Substitusikan titik $(1, 3)$ dan $(3, 7)$:
  $$m = \frac{7 - 3}{3 - 1} = \frac{4}{2} = 2$$
- **Feedback:**
  - *Benar:* "Tepat! Selisih $y$ dibagi selisih $x$: $\frac{7 - 3}{3 - 1} = \frac{4}{2} = 2$."
  - *Salah:* "Gunakan rumus $m = \frac{y_2 - y_1}{x_2 - x_1}$. Selisih $y$ adalah $7 - 3 = 4$, selisih $x$ adalah $3 - 1 = 2$. Hasilnya $\frac{4}{2} = 2$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Garis melalui titik $(2, 5)$ dan $(4, 11)$. Berapakah gradiennya?
  - *Pilihan Jawaban:* A. $3$ | B. $6$ | C. $2$ | D. $4$
  - *Kunci:* A. $3$
  - *Pembahasan:* $m = \frac{11 - 5}{4 - 2} = \frac{6}{2} = 3$.

---

### [ID: CH4-EX-21] Validasi Garis Vertikal Bukan Fungsi
- **Materi:** Uji Garis Vertikal (*Vertical Line Test*)
- **Indikator:** Siswa dapat memvalidasi bahwa garis vertikal $x = 3$ bukan fungsi $y = f(x)$.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Garis tegak vertikal $x = 3$ pada koordinat Cartesius BUKAN merupakan grafik fungsi $y = f(x)$."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Pada garis vertikal $x = 3$, untuk satu nilai input $x = 3$, terdapat tak terhingga banyak nilai $y$. Hal ini melanggar definisi fungsi bahwa setiap anggota domain harus memiliki tepat satu pasangan. Pernyataan bernilai benar.
- **Feedback:**
  - *Benar:* "Sangat tepat! Garis vertikal gagal dalam uji garis vertikal (Vertical Line Test) karena memotong tak terhingga titik."
  - *Salah:* "Pernyataan ini bernilai BENAR. Satu nilai $x$ tidak boleh memiliki banyak pasangan $y$ dalam sebuah fungsi."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Garis tegak vertikal $x = 5$ memenuhi syarat sebagai fungsi $y = f(x)$.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* B. Salah
  - *Pembahasan:* Garis vertikal bukan fungsi karena satu input memiliki tak terhingga output.

---

### [ID: CH4-EX-22] Titik Potong Antara Dua Garis Linear
- **Materi:** Titik Temu Dua Garis Linear
- **Indikator:** Diberikan fungsi $f(x) = 2x + 1$ dan $g(x) = x + 3$, siswa dapat menentukan titik potong kedua grafik di $(2, 5)$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Titik potong antara grafik fungsi linear $f(x) = 2x + 1$ dan $g(x) = x + 3$ adalah...
- **Pilihan Jawaban:**
  A. $(2, 5)$  
  B. $(1, 3)$  
  C. $(3, 6)$  
  D. $(0, 1)$  
- **Kunci:** A. $(2, 5)$
- **Pembahasan:**
  Samakan kedua rumus fungsi untuk mencari nilai $x$:
  $$f(x) = g(x)$$
  $$2x + 1 = x + 3$$
  $$2x - x = 3 - 1 \implies x = 2$$
  Substitusikan $x = 2$ ke dalam salah satu rumus:
  $$y = 2(2) + 1 = 5$$
  Jadi titik potong kedua grafik adalah $(2, 5)$.
- **Feedback:**
  - *Benar:* "Luar biasa! Samakan $2x + 1 = x + 3$ untuk mendapatkan $x = 2$, lalu substitusikan kembali untuk memperoleh $y = 5$."
  - *Salah:* "Cari titik potong dengan menyamakan kedua rumus: $2x + 1 = x + 3 \implies x = 2$. Kemudian hitung nilai $y = 2(2) + 1 = 5$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Titik potong antara garis $f(x) = 3x - 2$ dan $g(x) = 2x + 1$ adalah...
  - *Pilihan Jawaban:* A. $(3, 7)$ | B. $(1, 1)$ | C. $(2, 4)$ | D. $(0, 1)$
  - *Kunci:* A. $(3, 7)$
  - *Pembahasan:* $3x - 2 = 2x + 1 \implies x = 3 \implies y = 3(3) - 2 = 7 \implies (3, 7)$.

---

### [ID: CH4-EX-23] Menjodohkan Tanda Gradien dan Arah Garis
- **Materi:** Hubungan Tanda Angka Gradien dengan Arah Garis
- **Indikator:** Siswa dapat menjodohkan nilai gradien (positif, negatif, nol) dengan karakteristik visual garisnya.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C2 (Memahami)
- **Soal:**
  Jodohkan kondisi tanda gradien di sebelah kiri dengan arah kemiringan visual garisnya di sebelah kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:*
    1. Gradien positif ($m > 0$)
    2. Gradien negatif ($m < 0$)
    3. Gradien nol ($m = 0$)
  - *Kolom Kanan:*
    - Condong menanjak naik dari kiri ke kanan
    - Condong menurun miring dari kiri ke kanan
    - Garis horizontal mendatar sempurna
- **Pilihan Jawaban:**
  - Gradien positif ($m > 0$) $\rightarrow$ Condong menanjak naik dari kiri ke kanan
  - Gradien negatif ($m < 0$) $\rightarrow$ Condong menurun miring dari kiri ke kanan
  - Gradien nol ($m = 0$) $\rightarrow$ Garis horizontal mendatar sempurna
- **Kunci:**
  - `m > 0` $\leftrightarrow$ Condong menanjak naik dari kiri ke kanan
  - `m < 0` $\leftrightarrow$ Condong menurun miring dari kiri ke kanan
  - `m = 0` $\leftrightarrow$ Garis horizontal mendatar sempurna
- **Pembahasan:**
  - Gradien positif melambangkan kenaikan lereng (naik ke kanan atas).
  - Gradien negatif melambangkan penurunan lereng (turun ke kanan bawah).
  - Gradien nol melambangkan tidak adanya kemiringan (mendatar rata).
- **Feedback:**
  - *Benar:* "Mantap! Positif = menanjak, Negatif = menurun, Nol = mendatar rata."
  - *Salah:* "Perhatikan: jika $m > 0$ garis naik, jika $m < 0$ garis turun, dan jika $m = 0$ garis mendatar."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jodohkan fungsi dengan arah visual garisnya!
  - *Pasangan:*
    - $f(x) = 4x + 1 \leftrightarrow$ Garis menanjak naik
    - $f(x) = -3x + 2 \leftrightarrow$ Garis menurun
    - $f(x) = 7 \leftrightarrow$ Garis mendatar
  - *Kunci:* $4x+1$ naik, $-3x+2$ turun, $7$ mendatar.
  - *Pembahasan:* Koefisien positif naik, negatif turun, konstanta mendatar.

---

### [ID: CH4-EX-24] Garis Melintasi Kuadran Melalui Titik Pangkal
- **Materi:** Kuadran yang Dilalui Garis $f(x) = ax$
- **Indikator:** Siswa dapat menganalisis kuadran mana saja yang dilintasi oleh fungsi $f(x) = 2x$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Grafik fungsi linear $f(x) = 2x$ memiliki konstanta $b = 0$ dan gradien $m = 2$ (positif). Garis lurus ini melintasi kuadran...
- **Pilihan Jawaban:**
  A. Kuadran I dan Kuadran III  
  B. Kuadran II dan Kuadran IV  
  C. Hanya Kuadran I saja  
  D. Seluruh Kuadran (I, II, III, IV)  
- **Kunci:** A. Kuadran I dan Kuadran III
- **Pembahasan:**
  - Saat $x > 0$ (positif), maka $y = 2x > 0$ (positif). Titik $(+, +)$ berada di **Kuadran I**.
  - Saat $x = 0$, garis melalui titik pusat $(0, 0)$.
  - Saat $x < 0$ (negatif), maka $y = 2x < 0$ (negatif). Titik $(-, -)$ berada di **Kuadran III**.
  Jadi garis $f(x) = 2x$ membentang melintasi Kuadran I dan Kuadran III.
- **Feedback:**
  - *Benar:* "Akurat! Input positif menghasilkan output positif (Kuadran I), input negatif menghasilkan output negatif (Kuadran III)."
  - *Salah:* "Cek koordinat titik: $(1, 2)$ di Kuadran I dan $(-1, -2)$ di Kuadran III. Garis melintasi Kuadran I dan III."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Grafik fungsi $f(x) = -3x$ melalui titik pusat $(0, 0)$. Garis ini melintasi kuadran...
  - *Pilihan Jawaban:* A. Kuadran II dan Kuadran IV | B. Kuadran I dan Kuadran III | C. Hanya Kuadran II
  - *Kunci:* A. Kuadran II dan Kuadran IV
  - *Pembahasan:* $x > 0 \implies y < 0$ (Kuadran IV); $x < 0 \implies y > 0$ (Kuadran II).

---

### [ID: CH4-EX-25] Persamaan Sumbu Koordinat
- **Materi:** Persamaan Garis Sumbu X dan Sumbu Y
- **Indikator:** Siswa dapat memvalidasi bahwa sumbu X memiliki persamaan garis $y = 0$.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Sumbu mendatar X pada bidang koordinat Cartesius memiliki persamaan garis $y = 0$."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Setiap titik yang terletak tepat di sepanjang sumbu mendatar X tidak memiliki ketinggian vertikal, sehingga nilai ordinatnya selalu $y = 0$. Oleh karena itu, persamaan garis dari sumbu X adalah $y = 0$. Sedangkan persamaan garis sumbu Y adalah $x = 0$.
- **Feedback:**
  - *Benar:* "Benar! Seluruh titik pada sumbu X memiliki $y = 0$."
  - *Salah:* "Pernyataan ini bernilai BENAR. Garis sumbu X adalah garis ketinggian $y = 0$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Persamaan garis dari sumbu tegak Y adalah $x = 0$.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* A. Benar
  - *Pembahasan:* Seluruh titik pada sumbu vertikal Y memiliki koordinat $x = 0$.

---

### [ID: CH4-EX-26] Menyusun Rumus Fungsi dari Titik Potong
- **Materi:** Menemukan Rumus Fungsi Linear dari Dua Titik Potong
- **Indikator:** Diberikan titik potong $(4, 0)$ dan $(0, 2)$, siswa dapat menentukan rumus fungsi $f(x) = -\frac{1}{2}x + 2$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Suatu garis fungsi linear memotong sumbu X di titik $(4, 0)$ dan memotong sumbu Y di titik $(0, 2)$. Rumus fungsi linear yang sesuai adalah...
- **Pilihan Jawaban:**
  A. $f(x) = -\frac{1}{2}x + 2$  
  B. $f(x) = \frac{1}{2}x + 2$  
  C. $f(x) = -2x + 4$  
  D. $f(x) = 2x + 4$  
- **Kunci:** A. $f(x) = -\frac{1}{2}x + 2$
- **Pembahasan:**
  1. Titik potong sumbu Y adalah $(0, 2)$, artinya konstanta $b = 2$.
  2. Hitung gradien $m$ melalui $(4, 0)$ dan $(0, 2)$:
     $$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{2 - 0}{0 - 4} = \frac{2}{-4} = -\frac{1}{2}$$
  3. Bentuk rumus fungsi:
     $$f(x) = mx + b = -\frac{1}{2}x + 2$$
- **Feedback:**
  - *Benar:* "Luar biasa! Gradiennya $-\frac{1}{2}$ dan konstanta titik potong Y adalah 2, sehingga $f(x) = -\frac{1}{2}x + 2$."
  - *Salah:* "Garis condong menurun dari $(0, 2)$ ke $(4, 0)$ sehingga gradiennya negatif: $m = \frac{0 - 2}{4 - 0} = -\frac{2}{4} = -\frac{1}{2}$. Konstantanya $b = 2$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Garis memotong sumbu X di $(6, 0)$ dan sumbu Y di $(0, 3)$. Rumus fungsinya adalah...
  - *Pilihan Jawaban:* A. $f(x) = -\frac{1}{2}x + 3$ | B. $f(x) = \frac{1}{2}x + 3$ | C. $f(x) = -2x + 6$
  - *Kunci:* A. $f(x) = -\frac{1}{2}x + 3$
  - *Pembahasan:* $m = \frac{0 - 3}{6 - 0} = -\frac{3}{6} = -\frac{1}{2}$, $b = 3 \implies f(x) = -\frac{1}{2}x + 3$.

---

### [ID: CH4-EX-27] Efek Pergeseran Vertikal (Translasi Grafik)
- **Materi:** Translasi Vertikal Grafik Fungsi Linear
- **Indikator:** Siswa dapat mengevaluasi efek pergeseran grafik $f(x) = 2x$ ke atas sejauh 3 satuan.
- **Bentuk Interaksi:** MCQ_COMPLEX
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Jika grafik fungsi linear $f(x) = 2x$ digeser ke atas sejauh 3 satuan secara vertikal, manakah pernyataan yang BENAR mengenai grafik yang baru? *(Pilih semua yang benar)*
- **Pilihan Jawaban:**
  A. Rumus fungsi barunya menjadi $f(x) = 2x + 3$  
  B. Gradien kemiringan garisnya tetap sama ($m = 2$)  
  C. Garis yang baru akan sejajar dengan garis mula-mula  
  D. Titik potong sumbu Y berubah menjadi $(0, 3)$  
- **Kunci:** Pilihan A, B, C, dan D (Semua Benar)
- **Pembahasan:**
  Pergeseran secara vertikal ke atas sejauh 3 satuan hanya menambahkan konstanta sebesar $+3$ pada rumus fungsi:
  - Rumus baru: $f(x) = 2x + 3$ (A Benar).
  - Gradien kemiringan tidak berubah ($m = 2$) karena sudut kemiringan tetap (B Benar).
  - Karena gradiennya sama, garis baru dan garis awal saling sejajar (C Benar).
  - Titik potong sumbu Y bergeser dari $(0, 0)$ menjadi $(0, 3)$ (D Benar).
- **Feedback:**
  - *Benar:* "Sempurna! Menggeser garis secara vertikal hanya mengubah konstanta $b$ tanpa mengubah kemiringan garis."
  - *Salah:* "Semua pilihan di atas bernilai BENAR. Pergeseran ke atas sejauh 3 membuat rumus menjadi $2x + 3$ dan garis tetap sejajar."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jika $f(x) = 3x$ digeser ke bawah sejauh 2 satuan, manakah yang BENAR? (Pilih semua yang benar)
  - *Pilihan Jawaban:* A. Rumus baru $f(x) = 3x - 2$ | B. Gradien tetap 3 | C. Garis baru sejajar garis awal | D. Titik potong Y di $(0, -2)$
  - *Kunci:* A, B, C, dan D
  - *Pembahasan:* Semua pernyataan benar; pergeseran ke bawah mengubah konstanta menjadi $-2$.

---

### [ID: CH4-EX-28] Membaca Nilai Tengah dari Grafik (Interpolasi)
- **Materi:** Pembacaan Nilai Fungsi dari Koordinat Grafik
- **Indikator:** Diberikan grafik yang melalui $(0, 4)$ dan $(2, 0)$, siswa dapat menentukan nilai $f(1)$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah garis linear $f(x)$ memotong sumbu koordinat di titik $(0, 4)$ dan $(2, 0)$. Berapakah nilai dari $f(1)$?
- **Pilihan Jawaban:**
  A. $2$  
  B. $3$  
  C. $1$  
  D. $0$  
- **Kunci:** A. $2$
- **Pembahasan:**
  - Cara Geometris: Nilai $x = 1$ berada tepat di tengah antara $x = 0$ dan $x = 2$. Karena grafiknya garis lurus beraturan, nilai $y$ juga berada tepat di tengah-tengah antara $4$ dan $0$, yaitu $\frac{4 + 0}{2} = 2$.
  - Cara Aljabar: Gradien $m = \frac{0 - 4}{2 - 0} = -2$, konstanta $b = 4 \implies f(x) = -2x + 4$.
    Maka $f(1) = -2(1) + 4 = 2$.
- **Feedback:**
  - *Benar:* "Tepat sekali! Karena $x=1$ tepat di tengah domain, nilai fungsinya juga berada di tengah antara 4 dan 0, yaitu 2."
  - *Salah:* "Persamaan garisnya adalah $f(x) = -2x + 4$. Masukkan $x = 1$: $f(1) = -2(1) + 4 = 2$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Garis memotong di $(0, 6)$ dan $(4, 0)$. Berapakah nilai $f(2)$?
  - *Pilihan Jawaban:* A. $3$ | B. $4$ | C. $2$ | D. $1$
  - *Kunci:* A. $3$
  - *Pembahasan:* $x = 2$ adalah titik tengah antara 0 dan 4, maka nilainya $\frac{6 + 0}{2} = 3$.

---

### [ID: CH4-EX-29] Kemiringan Garis Vertikal Tidak Terdefinisi
- **Materi:** Karakteristik Kemiringan Garis Vertikal
- **Indikator:** Siswa dapat memvalidasi bahwa nilai kemiringan garis vertikal tidak terdefinisi karena pembagian dengan nol.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Nilai gradien (kemiringan) dari garis tegak vertikal adalah tidak terdefinisi."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Pada garis vertikal, tidak ada perubahan mendatar pada nilai $x$ (artinya $\Delta x = 0$).
  Rumus gradien $m = \frac{\Delta y}{\Delta x} = \frac{\Delta y}{0}$.
  Karena pembagian dengan angka nol tidak didefinisikan dalam matematika, maka nilai kemiringan garis vertikal dikatakan **tidak terdefinisi**. Pernyataan bernilai benar.
- **Feedback:**
  - *Benar:* "Benar! Garis vertikal memiliki $\Delta x = 0$, sehingga pembagian dengan nol menghasilkan nilai yang tidak terdefinisi."
  - *Salah:* "Pernyataan ini bernilai BENAR. Pembagian dengan nol tidak terdefinisi, sehingga gradien garis vertikal tidak terdefinisi."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Nilai gradien dari garis mendatar horizontal adalah sama dengan 0.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* A. Benar
  - *Pembahasan:* Pada garis horizontal $\Delta y = 0$, sehingga $\frac{0}{\Delta x} = 0$.

---

### [ID: CH4-EX-30] Rangkuman Makna Geometri $m$ dan $b$
- **Materi:** Rangkuman Pemahaman Geometri Koordinat Fungsi Linear
- **Indikator:** Siswa dapat merangkum peranan pokok gradien $m$ dan konstanta $b$ pada grafik linear.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Apakah makna visual paling mendasar dari gradien ($m$) dan konstanta ($b$) pada persamaan grafik fungsi linear $f(x) = mx + b$?
- **Pilihan Jawaban:**
  A. $m$ menentukan kemiringan arah lereng garis, sedangkan $b$ menentukan titik temu garis dengan sumbu tegak Y  
  B. $m$ menentukan panjang garis, sedangkan $b$ menentukan ketebalan garis  
  C. $m$ adalah titik potong sumbu X, sedangkan $b$ adalah titik potong sumbu Y  
  D. $m$ dan $b$ tidak memiliki pengaruh visual pada grafik  
- **Kunci:** A. $m$ menentukan kemiringan arah lereng garis, sedangkan $b$ menentukan titik temu garis dengan sumbu tegak Y
- **Pembahasan:**
  - Koefisien $m$ adalah ukuran kemiringan (lereng) garis: menentukan apakah garis menanjak, menurun, atau mendatar, serta seberapa curam sudut garisnya.
  - Konstanta $b$ adalah intersep Y: menentukan posisi perpotongan garis dengan sumbu vertikal Y di titik $(0, b)$.
- **Feedback:**
  - *Benar:* "Sempurna! Kamu telah menyelesaikan seluruh latihan Chapter 4 dengan penguasaan konsep grafik fungsi linear yang sangat kokoh dan mendalam!"
  - *Salah:* "$m$ adalah ukuran kemiringan lereng (gradien), dan $b$ adalah ketinggian titik temu dengan sumbu Y."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jika dua garis fungsi linear memiliki gradien $m$ yang sama tetapi konstanta $b$ yang berbeda, bagaimanakah posisi kedua garis tersebut pada bidang koordinat?
  - *Pilihan Jawaban:* A. Saling sejajar dan tidak pernah berpotongan | B. Saling tegak lurus | C. Berhimpit menjadi satu garis
  - *Kunci:* A. Saling sejajar dan tidak pernah berpotongan
  - *Pembahasan:* Gradien sama artinya kemiringannya sama, sehingga kedua garis pasti sejajar.
