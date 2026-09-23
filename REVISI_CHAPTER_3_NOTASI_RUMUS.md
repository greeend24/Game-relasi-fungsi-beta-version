# 📋 HASIL REVISI LENGKAP CHAPTER 3: NOTASI & RUMUS FUNGSI
## Bank Soal Game Edukasi "Detektif Data: Relasi dan Fungsi" SMP Kelas VIII

Dokumen ini memuat revisi menyeluruh dan kalibrasi kognitif untuk seluruh instrumen soal pada **Chapter 3: Notasi & Rumus Fungsi**.
- **Sasaran Pengguna:** Siswa SMP Kelas VIII (Fase D).
- **Nuansa & Bahasa:** Menyenangkan, bernuansa investigasi detektif (*Detektif Data*), pemodelan matematis aljabar yang lugas, dan akurat.
- **Variasi Interaksi Utama:**
  1. **Mesin Fungsi (Function Machine):** Visualisasi $x 	o [\text{Mesin } f(x)] 	o \text{Hasil}$ (siswa memasukkan input dan menganalisis output atau menebak rumus).
  2. **Input Nilai:** Mengetik hasil perhitungan substitusi nilai fungsi atau mencari prapeta $k$.
  3. **Lengkapi Tabel:** Mengisi tabel pasangan nilai $x$ dan $f(x)$ yang rumpang.
  4. **Matching:** Menjodohkan rumus fungsi, nilai input $x$, dan output $f(x)$.
  5. **Deteksi Kesalahan (Bug Hunting Aljabar):** Menemukan letak kekeliruan langkah pengerjaan siswa/agen (kesalahan tanda negatif, urutan operasi KABATAKU, atau kesalahan eliminasi).
  6. **Analisis Pernyataan & Perbandingan Model:** Mengevaluasi efisiensi biaya, perbandingan dua fungsi tarif, dan batas domain kontekstual.
- **Kalibrasi Level Kognitif (Bloom C-Level):**
  - Soal substitusi langsung nilai fungsi dikalibrasi ke **C3 (Mengaplikasikan)**, TIDAK LAGI diberi label C5.
  - **C4 (Menganalisis):** Mencari prapeta/nilai asal $x$, menentukan rumus $f(x)=ax+b$ dari dua titik/tabel, analisis tabel fungsi rumpang.
  - **C5 (Mengevaluasi):** Deteksi kesalahan aljabar, perbandingan model fungsi tarif nyata, evaluasi batas domain fisik.
- **Kelengkapan Format:** Seluruh butir soal memuat 11 atribut wajib: *ID, Materi, Indikator, Bentuk Interaksi, C-Level, Soal, Data/Visual yang diperlukan Programmer, Pilihan/Jawaban, Kunci, Pembahasan, Feedback*.

---

# BAGIAN I: 21 STAGE KASUS MODE CHAPTER (ALUR BELAJAR INVESTIGASI)

---

### [ID: CH3-STAGE-01] Mesin Dekoder Sandi: Konsep Masukan dan Keluaran
- **Materi:** Notasi Fungsi sebagai Mesin Pemroses ($x 	o f(x)$)
- **Indikator:** Siswa dapat memasukkan nilai input $x$ ke dalam visual mesin fungsi dan mengamati hasil output $f(x) = ax + b$.
- **Bentuk Interaksi:** Mesin Fungsi (Interactive Function Machine).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif Data menemukan sebuah **Mesin Dekoder Sandi** di laboratorium rahasia. Mesin ini bekerja dengan rumus fungsi:
  $$f(x) = 2x + 5$$
  Artinya: setiap angka masukan $x$ akan dikalikan 2 terlebih dahulu, kemudian hasilnya ditambah 5.
  Ujilah mesin tersebut dengan memasukkan angka sandi masukan **$x = 3$**! Berapakah kode angka hasil keluaran mesin?
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan visual mesin digital retro dengan animasi konveyor:
    - Pintu Masuk (Input Funnel): Slot memasukkan bola angka $x = 3$.
    - Ruang Pemroses Mesin (Chamber): Kaca transparan memperlihatkan gear berputar dengan tulisan formula `2(x) + 5`.
    - Pintu Keluar (Output Tray): Nampan tempat keluarnya bola hasil.
    - Tombol "PROSES MESIN".
- **Pilihan/Jawaban:** Input angka atau menekan tombol proses untuk menghasilkan angka `11`.
- **Kunci:** `11`
- **Pembahasan:**
  Substitusikan nilai $x = 3$ ke dalam rumus fungsi $f(x)$:
  $$f(3) = 2(3) + 5 = 6 + 5 = 11$$
  Maka angka keluaran mesin adalah 11.
- **Feedback:**
  - *Benar:* "Sistem mesin berfungsi! Input 3 dikalikan 2 menjadi 6, lalu ditambah 5 menghasilkan 11. Kode sandi terverifikasi!"
  - *Salah:* "Perhatikan urutan kerja mesin: kalikan masukan dengan 2 terlebih dahulu ($2 \times 3 = 6$), baru kemudian tambahkan 5 ($6 + 5 = 11$)."

---

### [ID: CH3-STAGE-02] Kasus Tarif Ojek Online: Perhitungan Nilai Fungsi Kontekstual
- **Materi:** Nilai Fungsi pada Konteks Nyata
- **Indikator:** Siswa dapat menghitung nilai fungsi linear dari skenario tarif perjalanan sehari-hari.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif Data menyewa ojek online untuk mengejar petunjuk kasus. Perusahaan ojek menerapkan rumus tarif perjalanan:
  $$f(x) = 3.000x + 5.000$$
  di mana $x$ adalah jarak tempuh (dalam km) dan $f(x)$ adalah total tarif ongkos (dalam Rupiah).
  Jika jarak yang ditempuh detektif sejauh **$4	ext{ km}$**, berapakah total ongkos ojek yang harus dibayar? *(Ketikkan nominal angkanya saja tanpa 'Rp')*
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Ilustrasi spedometer motor ojek online dengan odometer menunjukkan angka `4 km` dan kalkulator kasir mini.
- **Pilihan/Jawaban:** Input angka numerik langsung.
- **Kunci:** `17000` (atau `17.000`)
- **Pembahasan:**
  Substitusi nilai jarak $x = 4$ ke dalam rumus fungsi biaya:
  $$f(4) = 3.000(4) + 5.000 = 12.000 + 5.000 = 17.000$$
  Jadi total ongkos untuk perjalanan 4 km adalah Rp 17.000.
- **Feedback:**
  - *Benar:* "Perhitungan akurat! Tarif perjalanan 4 km adalah Rp 12.000 ditambah tarif dasar Rp 5.000, totalnya Rp 17.000."
  - *Salah:* "Hitung perkalian jaraknya dulu: $3.000 \times 4 = 12.000$. Lalu tambahkan biaya awal $5.000$."

---

### [ID: CH3-STAGE-03] Biaya Sewa Kostum Pentas Seni: Melengkapi Tabel Fungsi
- **Materi:** Melengkapi Tabel Nilai Fungsi
- **Indikator:** Siswa dapat mengisi nilai-nilai fungsi yang hilang pada tabel berdasarkan rumus fungsi $f(x) = ax + b$.
- **Bentuk Interaksi:** Lengkapi Tabel (Input Nilai pada Sel Rumpang).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Untuk menyamar dalam penyelidikan di gedung teater, detektif menyewa kostum pentas. Toko kostum menetapkan rumus biaya sewa harian:
  $$f(x) = 15.000x + 20.000$$
  di mana $x$ adalah lama sewa (hari) dan $f(x)$ adalah total biaya sewa (Rp).
  Lengkapilah sel kosong bertanda tanya **[ ? ]** pada tabel biaya sewa di bawah ini!
  
  | Lama Hari ($x$) | Total Biaya $f(x)$ (Rupiah) |
  |:---:|:---:|
  | 1 | 35.000 |
  | 2 | **[ ? ]** |
  | 3 | 65.000 |
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tabel interaktif dua kolom dengan sel rumpang pada baris kedua yang dapat diketik angka.
- **Pilihan/Jawaban:** Input angka pada kotak sel tabel.
- **Kunci:** `50000` (atau `50.000`)
- **Pembahasan:**
  Untuk $x = 2$ hari:
  $$f(2) = 15.000(2) + 20.000 = 30.000 + 20.000 = 50.000$$
  Maka biaya sewa untuk 2 hari adalah Rp 50.000.
- **Feedback:**
  - *Benar:* "Sempurna! Untuk 2 hari sewa biayanya adalah Rp 50.000 ($15.000 \times 2 + 20.000$). Tabel biaya sewa lengkap!"
  - *Salah:* "Substitusi $x = 2$: kalikan $15.000 \times 2 = 30.000$, lalu tambahkan biaya dasar $20.000$."

---

### [ID: CH3-STAGE-04] Sensor Pendingin Lab: Substitusi Nilai Input Negatif
- **Materi:** Nilai Fungsi dengan Masukan Bilangan Negatif
- **Indikator:** Siswa dapat menghitung nilai fungsi linear jika variabel input bernilai negatif dengan memperhatikan hukum tanda aljabar.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah sensor suhu di ruang pendingin laboratorium bekerja dengan formula kalibrasi:
  $$f(x) = 4x - 7$$
  Ketika suhu ruangan turun drastis hingga mencapai nilai **$x = -2$**, berapakah nilai kalibrasi $f(-2)$ yang terbaca pada layar monitor sensor?
- **Data/Visual yang diperlukan:** Layar termometer digital ruang beku berkedip warna biru es.
- **Pilihan/Jawaban:** Input angka bulat (bisa bertanda negatif).
- **Kunci:** `-15`
- **Pembahasan:**
  Substitusikan $x = -2$ ke dalam rumus fungsi:
  $$f(-2) = 4(-2) - 7$$
  Ingat hukum perkalian tanda: bilangan positif dikali bilangan negatif menghasilkan bilangan negatif:
  $$4 	imes (-2) = -8$$
  Lanjutkan operasi pengurangan:
  $$-8 - 7 = -15$$
  Maka nilai $f(-2)$ adalah $-15$.
- **Feedback:**
  - *Benar:* "Luar biasa! $4 \times (-2) = -8$, kemudian $-8 - 7 = -15$. Kamu sangat teliti dalam operasi bilangan bulat negatif!"
  - *Salah:* "Hati-hati dengan tanda negatif: $4 \times (-2) = -8$. Lalu hitung $-8 - 7$ (utang 8 berkurang lagi 7 menjadi $-15$)."

---

### [ID: CH3-STAGE-05] Pencocokan Kode Rahasia: Tiga Serangkai (Rumus, Masukan, Hasil)
- **Materi:** Matching Rumus Fungsi dan Nilai Evaluasi
- **Indikator:** Siswa dapat mencocokkan rumus fungsi dengan hasil perhitungannya pada nilai $x$ tertentu.
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Jodohkan kartu rumus fungsi di sebelah kiri dengan hasil perhitungannya yang tepat di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tiga kartu di kiri dan empat kotak nilai di kanan.
    - Kiri:
      1. `$f(x) = 3x - 1$, untuk $x = 4$`
      2. `$g(x) = 2x + 6$, untuk $x = -1$`
      3. `$h(x) = 5 - x$, untuk $x = 3$`
    - Kanan: `11`, `4`, `2`, `-1` [Pengecoh].
- **Pilihan/Jawaban:** Menarik garis pencocokan antar kartu.
- **Kunci:**
  - `$f(x) = 3x - 1$, untuk $x = 4$` ➔ `11` (karena $3(4) - 1 = 12 - 1 = 11$)
  - `$g(x) = 2x + 6$, untuk $x = -1$` ➔ `4` (karena $2(-1) + 6 = -2 + 6 = 4$)
  - `$h(x) = 5 - x$, untuk $x = 3$` ➔ `2` (karena $5 - 3 = 2$)
- **Pembahasan:**
  - $f(4) = 3(4) - 1 = 11$
  - $g(-1) = 2(-1) + 6 = -2 + 6 = 4$
  - $h(3) = 5 - 3 = 2$
- **Feedback:**
  - *Benar:* "Sempurna! Seluruh perhitungan fungsi berhasil kamu cocokkan dengan tepat."
  - *Salah:* "Hitung satu per satu: ganti $x$ dengan nilai masukan pada kartu, lalu lakukan perkalian sebelum penjumlahan/pengurangan."

---

### [ID: CH3-STAGE-06] Mesin Pengganda Berkurang: $f(x) = 5x - 4$
- **Materi:** Mesin Fungsi Interaktif Dua Titik Uji
- **Indikator:** Siswa dapat memproses dua nilai input berbeda pada mesin fungsi linear.
- **Bentuk Interaksi:** Mesin Fungsi (Input-Output Beruntun).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Mesin Analisis Bahan Kimia bekerja menurut rumus:
  $$f(x) = 5x - 4$$
  Detektif perlu menguji dua sampel konsentrasi:
  1. Masukkan sampel $x = 4$, berapakah outputnya?
  2. Masukkan sampel $x = 0$, berapakah outputnya?
- **Data/Visual yang diperlukan:** Antarmuka mesin laboratorium dengan dua tabung reaksi masukan ($x=4$ dan $x=0$).
- **Pilihan/Jawaban:** Memasukkan nilai output: `16` dan `-4`.
- **Kunci:** Output $x = 4$ adalah `16`; Output $x = 0$ adalah `-4`.
- **Pembahasan:**
  - Untuk $x = 4$: $f(4) = 5(4) - 4 = 20 - 4 = 16$.
  - Untuk $x = 0$: $f(0) = 5(0) - 4 = 0 - 4 = -4$.
- **Feedback:**
  - *Benar:* "Bagus sekali! $f(4) = 16$ dan saat $x=0$, $f(0) = -4$. Mesin kimia terkalibrasi stabil!"
  - *Salah:* "Cek kembali saat $x = 0$: $5(0) = 0$, lalu $0 - 4 = -4$ (bukan 4 positif)."

---

### [ID: CH3-STAGE-07] Investigasi Tarif Sewa Sepeda: Analisis Makna Koefisien & Konstanta
- **Materi:** Analisis Komponen Rumus Fungsi Kontekstual ($f(x) = ax + b$)
- **Indikator:** Siswa dapat menginterpretasikan makna koefisien $a$ (laju perubahan) dan konstanta $b$ (nilai awal) pada fungsi linear.
- **Bentuk Interaksi:** Analisis Pernyataan (Pilihan Ganda Analitis).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Rumus tarif sewa sepeda wisata di taman kota dinyatakan dengan:
  $$f(x) = 2.500x + 10.000$$
  di mana $x$ adalah waktu sewa dalam jam dan $f(x)$ adalah biaya sewa dalam Rupiah.
  Manakah pernyataan analisis di bawah ini yang **PALING TEPAT** mengenai makna angka $10.000$ dan $2.500$ pada rumus tersebut?
- **Data/Visual yang diperlukan:** Ilustrasi papan pengumuman penyewaan sepeda wisata.
- **Pilihan/Jawaban:**
  A. Angka 10.000 adalah biaya jaminan per jam, dan 2.500 adalah biaya administrasi tetap di awal.
  B. Angka 10.000 adalah biaya tetap/pokok awal sewa, dan 2.500 adalah biaya tambahan untuk setiap 1 jam pemakaian.
  C. Angka 10.000 adalah biaya maksimal yang bisa dibayar, dan 2.500 adalah batas minimal jam sewa.
  D. Kedua angka tersebut harus dijumlahkan terlebih dahulu sebelum dikalikan dengan jam sewa.
- **Kunci:** B. Angka 10.000 adalah biaya tetap/pokok awal sewa, dan 2.500 adalah biaya tambahan untuk setiap 1 jam pemakaian.
- **Pembahasan:**
  Pada bentuk $f(x) = ax + b$:
  - Konstanta $b = 10.000$ adalah nilai saat $x = 0$ (biaya dasar/tetap saat pertama kali menyewa).
  - Koefisien $a = 2.500$ adalah tarif per satuan jam $x$ (setiap jam bertambah, biaya bertambah Rp 2.500).
- **Feedback:**
  - *Benar:* "Analisis tajam, Detektif! Konstanta 10.000 adalah biaya awal (awal sewa), dan koefisien 2.500 adalah tarif per jam bertambah."
  - *Salah:* "Perhatikan variabel $x$: angka yang menempel pada $x$ (yaitu 2.500) adalah biaya per jam, sedangkan angka yang berdiri sendiri tanpa $x$ (10.000) adalah biaya tetap di awal."

---

### [ID: CH3-STAGE-08] Deteksi Kesalahan Hitung: Jebakan Tanda Negatif
- **Materi:** Deteksi Kesalahan Operasi Aljabar pada Fungsi
- **Indikator:** Siswa dapat mendeteksi baris langkah pengerjaan yang salah saat menghitung nilai fungsi berinput negatif.
- **Bentuk Interaksi:** Deteksi Kesalahan (Menandai baris langkah yang salah).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Seorang asisten detektif pemula diminta menghitung nilai $f(-3)$ untuk rumus fungsi:
  $$f(x) = 2x - 5$$
  Berikut adalah catatan langkah pengerjaannya:
  - **Langkah 1:** $f(-3) = 2(-3) - 5$
  - **Langkah 2:** $f(-3) = -6 - 5$
  - **Langkah 3:** $f(-3) = -1$
  
  Detektif Data melihat ada kejanggalan perhitungan! **Pada LANGKAH KE BERAPAKAH asisten tersebut melakukan kesalahan?**
- **Data/Visual yang diperlukan:** Lembar catatan coretan investigasi asisten detektif dengan baris langkah 1, 2, dan 3 yang dapat diklik.
- **Pilihan/Jawaban:**
  A. Langkah 1
  B. Langkah 2
  C. Langkah 3
- **Kunci:** C. Langkah 3
- **Pembahasan:**
  - Langkah 1 benar: substitusi $x = -3$ menghasilkan $2(-3) - 5$.
  - Langkah 2 benar: $2 	imes (-3) = -6$, sehingga menjadi $-6 - 5$.
  - **Langkah 3 SALAH:** Asisten menghitung $-6 - 5 = -1$ (ia keliru menganggap $-6 + 5$). Operasi yang benar adalah:
    $$-6 - 5 = -11$$
  Maka kesalahan fatal terletak pada **Langkah 3**.
- **Feedback:**
  - *Benar:* "Audit jeli, Detektif! Pada Langkah 3, asisten salah menghitung $-6 - 5$. Seharusnya hasilnya adalah $-11$, bukan $-1$."
  - *Salah:* "Periksa hasil hitungan $-6 - 5$: jika kamu punya utang 6 lalu berutang lagi 5, total utangmu menjadi 11 (yaitu $-11$). Kesalahan ada di Langkah 3!"

---

### [ID: CH3-STAGE-09] Mencari Sinyal Asal: Menentukan Nilai Prapeta $k$
- **Materi:** Menentukan Nilai Input jika Output Diketahui (Prapeta)
- **Indikator:** Siswa dapat menyelesaikan persamaan linear satu variabel untuk menemukan nilai prapeta $k$ dari nilai fungsi yang diketahui.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sebuah pemancar sinyal rahasia memancarkan sinyal menurut rumus:
  $$f(x) = 3x + 8$$
  Alat penerima menangkap sinyal dengan kekuatan **$f(k) = 29$**.
  Berapakah nilai frekuensi masukan **$k$** yang dipancarkan oleh pengirim?
- **Data/Visual yang diperlukan:** Layar radar osiloskop menampilkan gelombang frekuensi berangka `29` dan tombol keypad angka.
- **Pilihan/Jawaban:** Input angka numerik bulat.
- **Kunci:** `7`
- **Pembahasan:**
  Diketahui rumus $f(k) = 3k + 8 = 29$. Selesaikan persamaan linear berikut:
  $$3k + 8 = 29$$
  $$3k = 29 - 8$$
  $$3k = 21$$
  $$k = rac{21}{3} = 7$$
  Maka nilai masukan $k$ adalah 7.
- **Feedback:**
  - *Benar:* "Tepat sekali! $3(7) + 8 = 21 + 8 = 29$. Nilai prapeta $k = 7$ berhasil ditemukan!"
  - *Salah:* "Gunakan aljabar: $3k + 8 = 29 \implies 3k = 29 - 8 = 21$. Kemudian bagi 21 dengan 3 untuk mendapatkan nilai $k$."

---

### [ID: CH3-STAGE-10] Rekonstruksi Tabel Sensor Rumpang: $f(x) = 6 - 2x$
- **Materi:** Melengkapi Tabel Nilai Fungsi Negatif
- **Indikator:** Siswa dapat mengisi nilai fungsi rumpang dengan koefisien bertanda negatif.
- **Bentuk Interaksi:** Lengkapi Tabel (Isian Sel Tabel).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sebuah sensor pelacak jarak berkurang menurut formula:
  $$f(x) = 6 - 2x$$
  Sebagian data log pada tabel di bawah hilang terhapus oleh virus. Lengkapilah nilai keluaran $f(x)$ pada baris **$x = -1$** dan **$x = 2$**!
  
  | Masukan ($x$) | Keluaran $f(x)$ |
  |:---:|:---:|
  | -1 | **[ ?A ]** |
  | 0 | 6 |
  | 1 | 4 |
  | 2 | **[ ?B ]** |
- **Data/Visual yang diperlukan:** Tabel digital interaktif dengan dua kotak input isian pada baris $x = -1$ dan baris $x = 2$.
- **Pilihan/Jawaban:** Input angka pada kotak `?A` dan `?B`.
- **Kunci:**
  - Nilai `?A` (untuk $x = -1$): `8`
  - Nilai `?B` (untuk $x = 2$): `2`
- **Pembahasan:**
  - Saat $x = -1$:
    $$f(-1) = 6 - 2(-1) = 6 - (-2) = 6 + 2 = 8$$
  - Saat $x = 2$:
    $$f(2) = 6 - 2(2) = 6 - 4 = 2$$
  Maka nilai yang hilang adalah 8 dan 2.
- **Feedback:**
  - *Benar:* "Log tabel pulih! Untuk $x=-1$, $6 - (-2) = 8$. Dan untuk $x=2$, $6 - 4 = 2$. Kerja bagus!"
  - *Salah:* "Perhatikan saat $x = -1$: minus ketemu minus menjadi plus ($6 - 2(-1) = 6 + 2 = 8$). Dan saat $x = 2$: $6 - 4 = 2$."

---

### [ID: CH3-STAGE-11] Reverse Engineering Mesin Misterius: Menemukan Rumus dari Pola
- **Materi:** Menentukan Rumus Fungsi dari Pasangan Nilai
- **Indikator:** Siswa dapat menganalisis pola perubahan masukan dan keluaran untuk merumuskan fungsi $f(x) = ax + b$.
- **Bentuk Interaksi:** Mesin Fungsi (Pilihan Rumus dari Pola Input-Output).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sebuah kotak hitam misterius milik sindikat peretas menghasilkan pola data berikut ketika diuji:
  - Input $x = 1 \implies 	ext{Output } 5$
  - Input $x = 2 \implies 	ext{Output } 8$
  - Input $x = 3 \implies 	ext{Output } 11$
  - Input $x = 4 \implies 	ext{Output } 14$
  Bantulah Detektif Data membongkar **RUMUS FUNGSI $f(x)$** yang digunakan oleh kotak hitam tersebut!
- **Data/Visual yang diperlukan:** Animasi kotak sirkuit misterius dengan riwayat log pengujian.
- **Pilihan/Jawaban:**
  A. $f(x) = 2x + 3$
  B. $f(x) = 3x + 2$
  C. $f(x) = 4x + 1$
  D. $f(x) = 3x - 1$
- **Kunci:** B. $f(x) = 3x + 2$
- **Pembahasan:**
  1. Perhatikan selisih nilai output setiap kali $x$ bertambah 1:
     $$8 - 5 = 3$$
     $$11 - 8 = 3$$
     Karena selisihnya konstan 3, maka koefisien $a = 3$. Bentuk sementara: $f(x) = 3x + b$.
  2. Uji untuk $x = 1$:
     $$f(1) = 3(1) + b = 5 \implies 3 + b = 5 \implies b = 2$$
  Maka rumus fungsi yang dicari adalah:
  $$f(x) = 3x + 2$$
- **Feedback:**
  - *Benar:* "Kode kotak hitam terbongkar! Selisih output bertambah 3 (nilai a = 3) dan nilai dasar saat x=1 adalah 5 (b = 2), sehingga $f(x) = 3x + 2$."
  - *Salah:* "Amati selisih outputnya: dari 5 ke 8 bertambah 3, dari 8 ke 11 bertambah 3. Berarti rumusnya berawalan $3x$. Uji: $3(1) + 2 = 5$."

---

### [ID: CH3-STAGE-12] Deteksi Kesalahan: Urutan Operasi Hitung (KABATAKU)
- **Materi:** Deteksi Kesalahan Urutan Operasi pada Fungsi
- **Indikator:** Siswa dapat menemukan kesalahan fatal mendahulukan pengurangan dibanding perkalian pada fungsi linear.
- **Bentuk Interaksi:** Deteksi Kesalahan.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan rumus fungsi: $f(x) = 10 - 2x$.
  Agen Rio menghitung nilai $f(4)$ sebagai berikut:
  $$	ext{Langkah 1: } f(4) = 10 - 2(4)$$
  $$	ext{Langkah 2: } f(4) = (10 - 2) 	imes 4$$
  $$	ext{Langkah 3: } f(4) = 8 	imes 4 = 32$$
  
  Analisis pengerjaan Agen Rio di atas: **Mengapa Langkah 2 SALAH, dan berapakah hasil perhitungan yang BENAR?**
- **Data/Visual yang diperlukan:** Papan tulis catatan matematika dengan lingkaran merah pada Langkah 2.
- **Pilihan/Jawaban:**
  A. Langkah 2 salah karena pengurangan $10 - 2$ dilakukan mendahului perkalian $2 	imes 4$; hasil yang benar adalah $2$.
  B. Langkah 2 salah karena angka 4 seharusnya dikalikan dengan 10; hasil yang benar adalah $36$.
  C. Langkah 2 sudah benar, hanya Langkah 3 yang salah hitung perkalian; hasil yang benar adalah $40$.
  D. Seluruh langkah sudah tepat dan hasilnya memang $32$.
- **Kunci:** A. Langkah 2 salah karena pengurangan $10 - 2$ dilakukan mendahului perkalian $2 	imes 4$; hasil yang benar adalah $2$.
- **Pembahasan:**
  Sesuai aturan hierarki operasi matematika (KABATAKU: Kali Bagi Tambah Kurang), operasi perkalian $2(4)$ harus dikerjakan terlebih dahulu sebelum pengurangan:
  $$f(4) = 10 - 2(4) = 10 - 8 = 2$$
  Agen Rio salah karena mengurangkan $10 - 2 = 8$ terlebih dahulu baru dikali 4.
- **Feedback:**
  - *Benar:* "Analisis hebat! Perkalian harus didahulukan: $10 - 2(4) = 10 - 8 = 2$."
  - *Salah:* "Ingat hierarki operasi KABATAKU: perkalian lebih kuat daripada pengurangan! Kalikan $2 \times 4 = 8$ dulu, baru $10 - 8 = 2$."

---

### [ID: CH3-STAGE-13] Pelacakan Prapeta Nilai Negatif
- **Materi:** Persamaan Linear Prapeta
- **Indikator:** Siswa dapat mencari nilai masukan $a$ jika nilai fungsi bernilai negatif.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui rumus fungsi:
  $$f(x) = 5x - 12$$
  Jika diketahui hasil evaluasi fungsi adalah **$f(a) = -2$**, tentukanlah nilai dari masukan **$a$**!
- **Data/Visual yang diperlukan:** Kotak isian numerik keypad detektif.
- **Pilihan/Jawaban:** Input angka bulat.
- **Kunci:** `2`
- **Pembahasan:**
  Substitusikan $f(a) = -2$ ke dalam persamaan:
  $$5a - 12 = -2$$
  $$5a = -2 + 12$$
  $$5a = 10$$
  $$a = rac{10}{5} = 2$$
  Maka nilai $a = 2$.
- **Feedback:**
  - *Benar:* "Tepat sekali! $5(2) - 12 = 10 - 12 = -2$. Nilai masukan $a = 2$."
  - *Salah:* "Pindahkan $-12$ ke ruas kanan menjadi $+12$: $5a = -2 + 12 \implies 5a = 10$. Maka $a = 10 / 5 = 2$."

---

### [ID: CH3-STAGE-14] Matching Nilai Prapeta Sandi $f(x) = 4x + 1$
- **Materi:** Matching Pasangan Prapeta dan Bayangan
- **Indikator:** Siswa dapat mencocokkan nilai $k$ dengan hasil fungsinya $f(k)$ pada rumus $f(x) = 4x + 1$.
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan rumus fungsi: $f(x) = 4x + 1$.
  Jodohkan nilai masukan $k$ di sebelah kiri dengan nilai keluaran $f(k)$ yang sesuai di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kiri (Nilai masukan): `k = 2`, `k = 4`, `k = -1`.
    - Kanan (Hasil fungsi): `9`, `17`, `-3`, `13` [Pengecoh].
- **Pilihan/Jawaban:** Menghubungkan garis pencocokan.
- **Kunci:**
  - `k = 2` ➔ `9` (karena $4(2) + 1 = 8 + 1 = 9$)
  - `k = 4` ➔ `17` (karena $4(4) + 1 = 16 + 1 = 17$)
  - `k = -1` ➔ `-3` (karena $4(-1) + 1 = -4 + 1 = -3$)
- **Pembahasan:**
  - $f(2) = 4(2) + 1 = 9$
  - $f(4) = 4(4) + 1 = 17$
  - $f(-1) = 4(-1) + 1 = -3$
- **Feedback:**
  - *Benar:* "Sempurna! Seluruh nilai fungsi untuk masukan positif dan negatif terhubung tepat."
  - *Salah:* "Hitung nilai masing-masing: kalikan $k$ dengan 4 lalu tambah 1. Untuk $k=-1$, $4(-1)+1 = -4+1 = -3$."

---

### [ID: CH3-STAGE-15] Menemukan Formula Rahasia: Sistem Dua Nilai Fungsi
- **Materi:** Menentukan Bentuk Fungsi $f(x) = ax + b$ dari Dua Nilai
- **Indikator:** Siswa dapat menentukan nilai $a$ dan $b$ dari dua nilai fungsi yang diketahui menggunakan metode eliminasi/substitusi.
- **Bentuk Interaksi:** Analisis Pernyataan (Pilihan Ganda Berbobot).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sebuah pemancar sinyal bekerja dengan rumus linear: $f(x) = ax + b$.
  Detektif Data berhasil menyadap dua sampel data transmisi:
  $$f(2) = 11 \quad 	ext{dan} \quad f(5) = 20$$
  Bantulah Detektif Data memecahkan nilai koefisien $a$ dan konstanta $b$, lalu tentukan **rumus fungsi $f(x)$ yang benar**!
- **Data/Visual yang diperlukan:** Papan analisis aljabar dengan dua persamaan linier.
- **Pilihan/Jawaban:**
  A. $f(x) = 2x + 7$
  B. $f(x) = 3x + 5$
  C. $f(x) = 4x + 3$
  D. $f(x) = 3x - 5$
- **Kunci:** B. $f(x) = 3x + 5$
- **Pembahasan:**
  1. Bentuk dua persamaan dari informasi yang diketahui:
     - $f(5) = 5a + b = 20$  ...(Persamaan 1)
     - $f(2) = 2a + b = 11$  ...(Persamaan 2)
  2. Kurangkan Persamaan 1 dengan Persamaan 2 untuk mengeliminasi $b$:
     $$(5a - 2a) + (b - b) = 20 - 11$$
     $$3a = 9 \implies a = 3$$
  3. Masukkan nilai $a = 3$ ke Persamaan 2:
     $$2(3) + b = 11 \implies 6 + b = 11 \implies b = 11 - 6 = 5$$
  Maka rumus fungsinya adalah:
  $$f(x) = 3x + 5$$
- **Feedback:**
  - *Benar:* "Penyelidikan tingkat tinggi berhasil! Nilai $a = 3$ dan $b = 5$, sehingga rumus fungsinya adalah $f(x) = 3x + 5$."
  - *Salah:* "Eliminasi variabel $b$: kurangkan $f(5) - f(2) \implies 3a = 9 \implies a = 3$. Lalu cari nilai $b$: $3(2) + b = 11 \implies b = 5$."

---

### [ID: CH3-STAGE-16] Prediksi Masa Depan: Evaluasi Nilai Lanjutan $f(8)$
- **Materi:** Penerapan Lanjutan Rumus Fungsi yang Ditemukan
- **Indikator:** Siswa dapat menghitung nilai fungsi untuk input baru menggunakan rumus fungsi yang telah ditemukan pada stage sebelumnya.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Dari hasil analisis pada Stage 15, Detektif Data telah membongkar rumus fungsi pemancar:
  $$f(x) = 3x + 5$$
  Gunakan rumus tersebut untuk memprediksi nilai pancaran pada saat **$x = 8$** (yaitu nilai dari **$f(8)$**)!
- **Data/Visual yang diperlukan:** Layar radar prediksi sinyal dengan kotak isian keypad.
- **Pilihan/Jawaban:** Input angka numerik bulat.
- **Kunci:** `29`
- **Pembahasan:**
  Substitusikan $x = 8$ ke dalam rumus fungsi $f(x) = 3x + 5$:
  $$f(8) = 3(8) + 5 = 24 + 5 = 29$$
  Maka nilai dari $f(8)$ adalah 29.
- **Feedback:**
  - *Benar:* "Prediksi terbukti akurat! $f(8) = 3(8) + 5 = 24 + 5 = 29$."
  - *Salah:* "Kalikan masukan 8 dengan 3 ($3 \times 8 = 24$), lalu tambahkan dengan 5 ($24 + 5 = 29$)."

---

### [ID: CH3-STAGE-17] Deteksi Kesalahan: Eliminasi Aljabar Dua Nilai Fungsi
- **Materi:** Deteksi Kesalahan pada Metode Eliminasi Fungsi
- **Indikator:** Siswa dapat mendeteksi kekeliruan pengurangan suku aljabar pada proses eliminasi sistem fungsi linear.
- **Bentuk Interaksi:** Deteksi Kesalahan.
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Seorang agen forensik mencari nilai $a$ dari dua data fungsi:
  $f(3) = 3a + b = 13$ dan $f(1) = a + b = 7$.
  Berikut catatan eliminasi yang dibuatnya:
  - **Baris 1:** $(3a + b) - (a + b) = 13 - 7$
  - **Baris 2:** $a = 6$
  - **Baris 3:** $b = 7 - 6 = 1$
  
  Detektif Data menemukan bahwa kesimpulan di atas KELIRU. **Pada baris manakah agen tersebut melakukan kekeliruan aljabar, dan apa kesalahan yang dilakukannya?**
- **Data/Visual yang diperlukan:** Lembar catatan eliminasi dengan penanda baris 1, 2, dan 3.
- **Pilihan/Jawaban:**
  A. Baris 1 keliru karena tanda operasi seharusnya penjumlahan bukan pengurangan.
  B. Baris 2 keliru karena hasil dari $3a - a$ adalah $2a$ (seharusnya $2a = 6 \implies a = 3$), bukan $a = 6$.
  C. Baris 3 keliru karena nilai $b$ seharusnya negatif.
  D. Seluruh baris sudah benar dan nilai $a = 6$ sudah tepat.
- **Kunci:** B. Baris 2 keliru karena hasil dari $3a - a$ adalah $2a$ (seharusnya $2a = 6 \implies a = 3$), bukan $a = 6$.
- **Pembahasan:**
  Saat mengurangkan $(3a + b) - (a + b)$:
  $$3a - a = 2a \quad 	ext{dan} \quad b - b = 0$$
  Maka ruas kiri menghasilkan $2a$, bukan $a$. Persamaannya menjadi:
  $$2a = 6 \implies a = 3$$
  Kekeliruan agen terletak pada **Baris 2** karena lupa membagi dengan angka 2.
- **Feedback:**
  - *Benar:* "Analisis tingkat tinggi! $3a - a = 2a$. Maka $2a = 6 \implies a = 3$. Kesalahan fatal agen ada di Baris 2."
  - *Salah:* "Kurangkan koefisien $a$: $3a$ dikurangi $a$ menghasilkan $2a$, bukan $a$! Jadi pada Baris 2 seharusnya tertulis $2a = 6$."

---

### [ID: CH3-STAGE-18] Dilema Transportasi: Evaluasi Perbandingan Dua Fungsi Tarif
- **Materi:** Evaluasi dan Perbandingan Dua Model Fungsi Linear Nyata
- **Indikator:** Siswa dapat mengevaluasi dua fungsi tarif berbeda untuk menentukan opsi yang paling hemat pada jarak tertentu.
- **Bentuk Interaksi:** Analisis Pernyataan (Pilihan Ganda Evaluatif).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Untuk menuju markas pusat sejauh **$10	ext{ km}$**, Detektif Data membandingkan dua armada taksi:
  - **Taksi Kilat:** Memakai rumus biaya $f(x) = 4.000x + 10.000$
  - **Taksi Hemat:** Memakai rumus biaya $g(x) = 5.000x + 4.000$
  (dengan $x$ adalah jarak dalam km).
  
  Bagaimanakah evaluasi perbandingan biaya kedua taksi tersebut untuk jarak $10	ext{ km}$?
- **Data/Visual yang diperlukan:** Brosur digital tarif kedua armada taksi lengkap dengan grafik perbandingan garis.
- **Pilihan/Jawaban:**
  A. Taksi Hemat lebih murah Rp 4.000 dibanding Taksi Kilat.
  B. Taksi Kilat lebih murah Rp 4.000 dibanding Taksi Hemat.
  C. Kedua taksi mengenakan biaya yang persis sama untuk jarak 10 km.
  D. Taksi Kilat lebih mahal Rp 6.000 dibanding Taksi Hemat.
- **Kunci:** B. Taksi Kilat lebih murah Rp 4.000 dibanding Taksi Hemat.
- **Pembahasan:**
  Hitung biaya masing-masing taksi untuk $x = 10	ext{ km}$:
  1. Biaya Taksi Kilat:
     $$f(10) = 4.000(10) + 10.000 = 40.000 + 10.000 = 	ext{Rp } 50.000$$
  2. Biaya Taksi Hemat:
     $$g(10) = 5.000(10) + 4.000 = 50.000 + 4.000 = 	ext{Rp } 54.000$$
  3. Selisih biaya:
     $$	ext{Rp } 54.000 - 	ext{Rp } 50.000 = 	ext{Rp } 4.000$$
  Maka Taksi Kilat lebih murah (lebih hemat) sebesar Rp 4.000 dibanding Taksi Hemat.
- **Feedback:**
  - *Benar:* "Evaluasi keputusan cerdas! Taksi Kilat (Rp 50.000) lebih hemat Rp 4.000 dibanding Taksi Hemat (Rp 54.000)."
  - *Salah:* "Hitung biaya keduanya saat $x=10$: Taksi Kilat $= 40.000 + 10.000 = 50.000$. Taksi Hemat $= 50.000 + 4.000 = 54.000$. Bandingkan keduanya!"

---

### [ID: CH3-STAGE-19] Sistem Persamaan Tingkat Tinggi: Masukan Bernilai Negatif
- **Materi:** Sistem Eliminasi dengan Nilai Masukan Negatif
- **Indikator:** Siswa dapat memecahkan rumus fungsi linear $f(x) = ax + b$ yang melibatkan nilai masukan negatif.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Diketahui rumus fungsi $f(x) = ax + b$.
  Tim intelijen menemukan data:
  $$f(-2) = -1 \quad 	ext{dan} \quad f(3) = 14$$
  Tentukan nilai dari hasil penjumlahan **$(a + b)$**!
- **Data/Visual yang diperlukan:** Papan kalkulasi aljabar dengan dua persamaan linier.
- **Pilihan/Jawaban:** Input angka numerik bulat.
- **Kunci:** `8`
- **Pembahasan:**
  1. Susun dua persamaan:
     - $f(3) = 3a + b = 14$  ...(1)
     - $f(-2) = -2a + b = -1$  ...(2)
  2. Kurangkan Persamaan 1 dengan Persamaan 2:
     $$(3a - (-2a)) + (b - b) = 14 - (-1)$$
     $$5a = 15 \implies a = 3$$
  3. Tentukan nilai $b$ menggunakan Persamaan 1:
     $$3(3) + b = 14 \implies 9 + b = 14 \implies b = 5$$
  4. Hitung nilai $(a + b)$:
     $$a + b = 3 + 5 = 8$$
  Maka nilai $a + b$ adalah 8.
- **Feedback:**
  - *Benar:* "Luar biasa! $a = 3$ dan $b = 5$, sehingga nilai $a + b = 3 + 5 = 8$. Kamu menuntaskan soal tantangan tinggi dengan sempurna!"
  - *Salah:* "Hati-hati dengan tanda negatif saat eliminasi: $3a - (-2a) = 5a$, dan $14 - (-1) = 15$. Maka $5a = 15 \implies a = 3$."

---

### [ID: CH3-STAGE-20] Batas Domain Fisik: Volume Tangki Bensin Mobil Detektif
- **Materi:** Evaluasi Batasan Domain Kontekstual pada Fungsi
- **Indikator:** Siswa dapat mengevaluasi batas-batas nilai domain yang masuk akal pada penerapan fungsi kehidupan nyata.
- **Bentuk Interaksi:** Analisis Pernyataan (Pilihan Ganda Evaluatif).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Tangki bensin mobil detektif berisi 40 liter. Mobil melaju stabil dan menghabiskan 2 liter bensin per jam perjalanan.
  Rumus sisa volume bensin $V(t)$ setelah berjalan selama $t$ jam adalah:
  $$V(t) = 40 - 2t$$
  Dalam matematika kontekstual, volume bensin tidak mungkin bernilai negatif ($V(t) \ge 0$).
  Manakah batasan **DAERAH ASAL (DOMAIN WAKTU $t$)** yang masuk akal untuk fungsi perjalanan mobil tersebut?
- **Data/Visual yang diperlukan:** Indikator jarum tangki bensin mobil dari Full (40L) ke Empty (0L).
- **Pilihan/Jawaban:**
  A. $0 \le t \le 40$ jam
  B. $0 \le t \le 20$ jam
  C. $t \ge 20$ jam
  D. Semua bilangan real tanpa batas
- **Kunci:** B. $0 \le t \le 20$ jam
- **Pembahasan:**
  1. Waktu tempuh $t$ tidak boleh negatif, jadi $t \ge 0$.
  2. Bensin akan habis saat volume $V(t) = 0$:
     $$40 - 2t = 0 \implies 2t = 40 \implies t = 20	ext{ jam}$$
  Jika perjalanan melebihi 20 jam ($t > 20$), maka nilai $V(t)$ akan menjadi negatif (misal $t=25 \implies V=40-50=-10$), yang secara fisik mustahil terjadi.
  Maka domain waktu yang masuk akal adalah:
  $$0 \le t \le 20	ext{ jam}$$
- **Feedback:**
  - *Benar:* "Nalar matematika kritis yang hebat! Bensin 40 liter akan habis dalam waktu 20 jam ($40 / 2 = 20$), sehingga batas waktunya adalah $0 \le t \le 20$ jam."
  - *Salah:* "Cari saat bensin habis ($V = 0$): $40 - 2t = 0 \implies t = 20$. Karena waktu tidak bisa minus dan bensin tidak bisa minus, batasnya adalah $0 \le t \le 20$."

---

### [ID: CH3-STAGE-21] Sidang Sintesis Bab 3: Filosofi Notasi dan Pemodelan Fungsi
- **Materi:** Sintesis Konseptual Notasi dan Rumus Fungsi
- **Indikator:** Siswa dapat merangkum konsep notasi $f: x 	o ax + b$, rumus $f(x)$, dan peran aljabar dalam pemodelan matematis.
- **Bentuk Interaksi:** Pilihan Ganda Sintesis.
- **C-Level:** C5/C6 (Evaluasi & Sintesis)
- **Soal:**
  Apakah **KESIMPULAN UTAMA** yang paling tepat mengenai **NOTASI DAN RUMUS FUNGSI** dalam matematika?
- **Data/Visual yang diperlukan:** Lencana Penghargaan Master Aljabar Detektif Data.
- **Pilihan/Jawaban:**
  A. Notasi $f(x)$ adalah perkalian antara variabel $f$ dengan variabel $x$, di mana hasilnya selalu bernilai sama dengan nol.
  B. Notasi $f: x 	o ax + b$ menyatakan bahwa fungsi $f$ memetakan masukan $x$ ke aturan bayangan $ax + b$. Nilai fungsi diperoleh dengan menyubstitusikan angka masukan ke variabel $x$, di mana koefisien $a$ menentukan laju perubahan dan konstanta $b$ menentukan nilai awal.
  C. Rumus fungsi hanya berlaku untuk menghitung tarif ojek online dan tidak dapat diaplikasikan pada bentuk bilangan negatif.
  D. Nilai fungsi tidak dapat ditentukan jika rumus fungsi memiliki konstanta suku $b$.
- **Kunci:** B. Notasi $f: x 	o ax + b$ menyatakan bahwa fungsi $f$ memetakan masukan $x$ ke aturan bayangan $ax + b$. Nilai fungsi diperoleh dengan menyubstitusikan angka masukan ke variabel $x$, di mana koefisien $a$ menentukan laju perubahan dan konstanta $b$ menentukan nilai awal.
- **Pembahasan:**
  Simbol $f(x)$ dibaca "ef dari eks", yang melambangkan nilai keluaran (bayangan) dari fungsi $f$ untuk masukan $x$. Rumus fungsi $f(x) = ax + b$ merupakan model matematika aljabar di mana $a$ menyatakan laju perubahan/gradien dan $b$ menyatakan nilai awal saat $x=0$.
- **Feedback:**
  - *Benar:* "SELAMAT, DETEKTIF! Kamu telah menguasai esensi terdalam Notasi dan Rumus Fungsi Aljabar. Bab 3 tuntas dengan predikat SEMPURNA!"
  - *Salah:* "Ingat: $f(x)$ BUKAN $f$ kali $x$, melainkan lambang nilai fungsi. Substitusikan angka masukan ke variabel $x$ untuk mencari bayangannya."

---
---

# BAGIAN II: 30 SOAL LATIHAN LENGKAP CHAPTER 3 (BANK SOAL & EVALUASI)

---

### [ID: CH3-EX-01] Memahami Makna Notasi Fungsi
- **Materi:** Notasi Fungsi $f: x 	o ax + b$
- **Indikator:** Siswa dapat menjelaskan makna matematis notasi $f(x)$.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C2 (Memahami)
- **Soal:**
  Notasi $f: x 	o 3x + 7$ dibaca sebagai "fungsi $f$ memetakan $x$ ke $3x + 7$". Bentuk penulisan rumus fungsi yang setara dengan notasi tersebut adalah...
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. $f + x = 3x + 7$
  B. $f(x) = 3x + 7$
  C. $f 	imes x = 3x + 7$
  D. $x(f) = 3x + 7$
- **Kunci:** B. $f(x) = 3x + 7$
- **Pembahasan:**
  Notasi pemetaan $f: x 	o ax + b$ secara baku dituliskan dalam bentuk rumus fungsi $f(x) = ax + b$, di mana $f(x)$ melambangkan nilai keluaran/bayangan untuk masukan $x$.
- **Feedback:**
  - *Benar:* "Tepat! Notasi $f: x \to 3x + 7$ dituliskan sebagai rumus fungsi $f(x) = 3x + 7$."
  - *Salah:* "Bentuk rumus fungsi standar ditulis $f(x) = ax + b$, bukan tanda tambah atau kali."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Bentuk rumus fungsi dari notasi $g: x 	o 5x - 2$ adalah... (A. $g(x) = 5x - 2$ | B. $g 	imes x = 5x - 2$)
  - *Kunci:* A. $g(x) = 5x - 2$

---

### [ID: CH3-EX-02] Menghitung Nilai Fungsi Masukan Positif
- **Materi:** Substitusi Nilai Fungsi Positif
- **Indikator:** Siswa dapat menghitung nilai fungsi linear untuk nilai $x$ bilangan bulat positif.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui rumus fungsi:
  $$f(x) = 4x + 6$$
  Berapakah nilai dari **$f(5)$**? *(Ketikkan angka jawabannya)*
- **Data/Visual yang diperlukan:** Kotak isian numerik.
- **Pilihan/Jawaban:** Input numerik bulat.
- **Kunci:** `26`
- **Pembahasan:**
  Ganti nilai $x$ dengan angka 5:
  $$f(5) = 4(5) + 6 = 20 + 6 = 26$$
- **Feedback:**
  - *Benar:* "Tepat sekali! $4(5) + 6 = 20 + 6 = 26$."
  - *Salah:* "Kalikan dulu $4 \times 5 = 20$, lalu tambahkan 6 menghasilkan 26."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $f(x) = 3x + 2$, berapakah nilai $f(4)$? (A. 14 | B. 12 | C. 10 | D. 16)
  - *Kunci:* A. 14 ($3(4) + 2 = 14$).

---

### [ID: CH3-EX-03] Menghitung Nilai Fungsi Masukan Negatif
- **Materi:** Substitusi Masukan Bilangan Negatif
- **Indikator:** Siswa dapat menghitung nilai fungsi jika nilai $x$ berupa bilangan negatif.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui rumus fungsi:
  $$f(x) = 3x - 8$$
  Berapakah nilai dari **$f(-4)$**? *(Ketikkan angka jawabannya beserta tanda minus)*
- **Data/Visual yang diperlukan:** Kotak isian numerik.
- **Pilihan/Jawaban:** Input numerik bulat (bertanda negatif).
- **Kunci:** `-20`
- **Pembahasan:**
  Substitusikan $x = -4$:
  $$f(-4) = 3(-4) - 8 = -12 - 8 = -20$$
- **Feedback:**
  - *Benar:* "Luar biasa! $3(-4) = -12$, dan $-12 - 8 = -20$. Perhitungan bilangan negatifmu sangat akurat!"
  - *Salah:* "Ingat: positif kali negatif menghasilkan negatif: $3 \times (-4) = -12$. Kemudian $-12 - 8 = -20$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Berapakah nilai dari $f(-2)$ pada fungsi $f(x) = 2x - 5$? (A. -9 | B. -1 | C. 9 | D. -7)
  - *Kunci:* A. -9 ($2(-2) - 5 = -4 - 5 = -9$).

---

### [ID: CH3-EX-04] Evaluasi Nilai Fungsi Masukan Nol ($x = 0$)
- **Materi:** Titik Potong/Nilai Awal ($x = 0$)
- **Indikator:** Siswa dapat membuktikan bahwa nilai $f(0)$ selalu sama dengan suku konstanta $b$.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui rumus fungsi $f(x) = -7x + 19$.
  Berapakah nilai dari **$f(0)$**?
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. 0
  B. -7
  C. 19
  D. 12
- **Kunci:** C. 19
- **Pembahasan:**
  Substitusi $x = 0$:
  $$f(0) = -7(0) + 19 = 0 + 19 = 19$$
  Pada setiap fungsi linear $f(x) = ax + b$, nilai saat $x = 0$ selalu menghasilkan nilai konstanta $b$.
- **Feedback:**
  - *Benar:* "Tepat! Bilangan apapun dikali 0 hasilnya 0, sehingga tersisa konstanta 19."
  - *Salah:* "Substitusi $x=0$: $-7 \times 0 = 0$. Maka $0 + 19 = 19$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Berapakah nilai $f(0)$ pada $f(x) = 8x - 13$? (A. 0 | B. -13 | C. 8 | D. -5)
  - *Kunci:* B. -13.

---

### [ID: CH3-EX-05] Mesin Fungsi Pengganda Selisih
- **Materi:** Mesin Fungsi Interaktif
- **Indikator:** Siswa dapat menguji fungsi aljabar menggunakan mekanisme input-output mesin fungsi.
- **Bentuk Interaksi:** Mesin Fungsi.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah Mesin Fungsi memiliki formula pemroses:
  $$f(x) = 5x - 3$$
  Jika kamu memasukkan bola masukan berangka **$x = 6$**, berapakah angka hasil keluaran yang akan dikeluarkan oleh mesin?
- **Data/Visual yang diperlukan:** Animasi mesin konveyor fungsi dengan tombol proses.
- **Pilihan/Jawaban:** Input angka pada layar mesin.
- **Kunci:** `27`
- **Pembahasan:**
  $$f(6) = 5(6) - 3 = 30 - 3 = 27$$
- **Feedback:**
  - *Benar:* "Mesin bekerja sempurna! $5 \times 6 = 30$, dikurangi 3 menjadi 27."
  - *Salah:* "Hitung: kalikan masukan dengan 5 ($5 \times 6 = 30$), lalu kurangi dengan 3 menghasilkan 27."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Masukkan $x = 3$ ke mesin $f(x) = 4x - 5$. Hasilnya adalah... (A. 7 | B. 12 | C. 17 | D. 1)
  - *Kunci:* A. 7 ($4(3) - 5 = 12 - 5 = 7$).

---

### [ID: CH3-EX-06] Melengkapi Tabel Fungsi Linear Sederhana
- **Materi:** Tabel Pasangan Nilai Fungsi
- **Indikator:** Siswa dapat melengkapi sel-sel rumpang pada tabel fungsi linear.
- **Bentuk Interaksi:** Lengkapi Tabel.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan rumus fungsi: $f(x) = 2x + 1$.
  Lengkapilah nilai keluaran $f(x)$ pada tabel di bawah ini!
  
  | $x$ | 1 | 2 | 3 |
  |:---:|:---:|:---:|:---:|
  | $f(x)$ | 3 | **[ ?A ]** | **[ ?B ]** |
- **Data/Visual yang diperlukan:** Tabel interaktif dua baris dengan sel rumpang pada kolom $x=2$ dan $x=3$.
- **Pilihan/Jawaban:** Mengisi nilai `?A` dan `?B`.
- **Kunci:**
  - Sel `?A` (untuk $x = 2$): `5`
  - Sel `?B` (untuk $x = 3$): `7`
- **Pembahasan:**
  - $f(2) = 2(2) + 1 = 4 + 1 = 5$
  - $f(3) = 2(3) + 1 = 6 + 1 = 7$
- **Feedback:**
  - *Benar:* "Tabel lengkap! Nilai fungsi bertambah secara teratur: 3, 5, 7."
  - *Salah:* "Hitung satu per satu: $f(2) = 2(2)+1 = 5$, dan $f(3) = 2(3)+1 = 7$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada tabel fungsi $f(x) = 3x - 1$, jika $x = 2$, maka $f(x) = $ ... (A. 5 | B. 6 | C. 7 | D. 4)
  - *Kunci:* A. 5.

---

### [ID: CH3-EX-07] Menentukan Nilai Prapeta $x$ dari $f(x)$ Positif
- **Materi:** Menentukan Prapeta (Daerah Asal)
- **Indikator:** Siswa dapat memecahkan nilai input $x$ jika hasil bayangan $f(x)$ telah ditentukan.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui rumus fungsi:
  $$f(x) = 6x - 7$$
  Jika nilai bayangannya adalah **$f(x) = 23$**, tentukanlah nilai dari masukan **$x$**!
- **Data/Visual yang diperlukan:** Kotak isian numerik.
- **Pilihan/Jawaban:** Input numerik bulat.
- **Kunci:** `5`
- **Pembahasan:**
  Persamaan linear:
  $$6x - 7 = 23$$
  $$6x = 23 + 7$$
  $$6x = 30 \implies x = rac{30}{6} = 5$$
  Jadi nilai $x = 5$.
- **Feedback:**
  - *Benar:* "Tepat sekali! $6(5) - 7 = 30 - 7 = 23$. Nilai $x = 5$."
  - *Salah:* "Pindahkan $-7$ ke ruas kanan: $6x = 23 + 7 = 30$. Maka $x = 30 / 6 = 5$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $f(x) = 2x + 4 = 14$, maka nilai $x$ adalah... (A. 5 | B. 7 | C. 9 | D. 10)
  - *Kunci:* A. 5 ($2x = 10 \implies x = 5$).

---

### [ID: CH3-EX-08] Matching Nilai Fungsi Berkoefisien Negatif
- **Materi:** Matching Fungsi Koefisien Negatif
- **Indikator:** Siswa dapat mencocokkan masukan dengan keluaran pada fungsi berbentuk $f(x) = b - ax$.
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan rumus fungsi: $f(x) = 12 - 3x$.
  Jodohkan nilai masukan $x$ di sebelah kiri dengan nilai hasil $f(x)$ di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kiri: `x = 1`, `x = 4`, `x = 5`.
    - Kanan: `9`, `0`, `-3`, `6` [Pengecoh].
- **Pilihan/Jawaban:** Menghubungkan garis pencocokan.
- **Kunci:**
  - `x = 1` ➔ `9` (karena $12 - 3(1) = 9$)
  - `x = 4` ➔ `0` (karena $12 - 3(4) = 0$)
  - `x = 5` ➔ `-3` (karena $12 - 3(5) = 12 - 15 = -3$)
- **Pembahasan:**
  - $f(1) = 12 - 3 = 9$
  - $f(4) = 12 - 12 = 0$
  - $f(5) = 12 - 15 = -3$
- **Feedback:**
  - *Benar:* "Luar biasa! Kamu menyelesaikan perkalian dan pengurangan dengan sangat teliti."
  - *Salah:* "Substitusi nilai $x$: saat $x=5$, $12 - 3(5) = 12 - 15 = -3$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Berapakah nilai $f(2)$ pada rumus $f(x) = 10 - 4x$? (A. 2 | B. -2 | C. 18 | D. 8)
  - *Kunci:* A. 2 ($10 - 8 = 2$).

---

### [ID: CH3-EX-09] Deteksi Kesalahan: Substitusi Variabel Bertanda Minus
- **Materi:** Deteksi Kesalahan Operasi Tanda Kurung
- **Indikator:** Siswa dapat menemukan letak kekeliruan perhitungan pada rumus $f(x) = ax + b$ saat $x$ negatif.
- **Bentuk Interaksi:** Deteksi Kesalahan.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Perhatikan lembar kerja siswa berikut dalam mencari nilai $f(-5)$ untuk fungsi $f(x) = -2x + 3$:
  - **Baris 1:** $f(-5) = -2(-5) + 3$
  - **Baris 2:** $f(-5) = -10 + 3$
  - **Baris 3:** $f(-5) = -7$
  
  Pada baris manakah terjadi **KESALAHAN KONSEP PERHITUNGAN**, dan bagaimana perbaikannya?
- **Data/Visual yang diperlukan:** Lembar catatan kerja digital dengan tombol penanda baris.
- **Pilihan/Jawaban:**
  A. Baris 1 salah karena tanda kurung tidak diperlukan
  B. Baris 2 salah karena perkalian dua bilangan negatif $(-2) 	imes (-5)$ seharusnya menghasilkan bilangan positif $+10$ (sehingga hasil akhirnya adalah $10 + 3 = 13$)
  C. Baris 3 salah karena $-10 + 3$ seharusnya bernilai $-13$
  D. Pengerjaan di atas sudah benar seluruhnya
- **Kunci:** B. Baris 2 salah karena perkalian dua bilangan negatif $(-2) 	imes (-5)$ seharusnya menghasilkan bilangan positif $+10$ (sehingga hasil akhirnya adalah $10 + 3 = 13$)
- **Pembahasan:**
  Perkalian bilangan negatif dengan bilangan negatif selalu menghasilkan bilangan positif:
  $$(-2) 	imes (-5) = +10$$
  Pada Baris 2 siswa menuliskan $-10$, yang merupakan kekeliruan tanda. Pengerjaan yang benar:
  $$f(-5) = 10 + 3 = 13$$
- **Feedback:**
  - *Benar:* "Audit tepat! Negatif dikali negatif hasilnya positif: $(-2) \times (-5) = +10$. Baris 2 salah!"
  - *Salah:* "Ingat kaidah tanda bilangan bulat: $(-a) \times (-b) = +(a \times b)$. Maka $(-2) \times (-5) = +10$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Hasil perkalian dari $(-3) 	imes (-4)$ adalah... (A. -12 | B. 12 | C. -7 | D. 7)
  - *Kunci:* B. 12.

---

### [ID: CH3-EX-10] Menghitung Nilai Operasi Dua Fungsi: $f(a) + f(b)$
- **Materi:** Operasi Aljabar Nilai Fungsi
- **Indikator:** Siswa dapat menghitung nilai penjumlahan dari dua evaluasi fungsi $f(3) + f(1)$.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui rumus fungsi: $f(x) = 3x - 2$.
  Berapakah hasil dari penjumlahan **$f(3) + f(1)$**?
- **Data/Visual yang diperlukan:** Kotak isian numerik.
- **Pilihan/Jawaban:** Input angka bulat.
- **Kunci:** `8`
- **Pembahasan:**
  1. Hitung $f(3)$:
     $$f(3) = 3(3) - 2 = 9 - 2 = 7$$
  2. Hitung $f(1)$:
     $$f(1) = 3(1) - 2 = 3 - 2 = 1$$
  3. Jumlahkan kedua nilai:
     $$f(3) + f(1) = 7 + 1 = 8$$
- **Feedback:**
  - *Benar:* "Tepat! $f(3) = 7$ dan $f(1) = 1$. Hasil penjumlahannya adalah $7 + 1 = 8$."
  - *Salah:* "Hitung masing-masing dulu: $f(3) = 7$ dan $f(1) = 1$. Lalu jumlahkan hasilnya: $7 + 1 = 8$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $f(x) = 2x$, berapakah nilai dari $f(4) + f(2)$? (A. 12 | B. 8 | C. 6 | D. 10)
  - *Kunci:* A. 12 ($8 + 4 = 12$).

---

### [ID: CH3-EX-11] Menghitung Nilai Prapeta Negatif
- **Materi:** Prapeta Bilangan Bulat Negatif
- **Indikator:** Siswa dapat memecahkan persamaan linear untuk masukan negatif jika hasil $f(x)$ negatif.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui rumus fungsi: $f(x) = 4x + 9$.
  Jika nilai bayangannya adalah **$f(k) = -11$**, berapakah nilai dari **$k$**?
- **Data/Visual yang diperlukan:** Kotak isian numerik bertanda minus.
- **Pilihan/Jawaban:** Input numerik bulat (bisa bertanda negatif).
- **Kunci:** `-5`
- **Pembahasan:**
  $$4k + 9 = -11$$
  $$4k = -11 - 9$$
  $$4k = -20 \implies k = rac{-20}{4} = -5$$
  Maka nilai $k = -5$.
- **Feedback:**
  - *Benar:* "Sangat teliti! $4(-5) + 9 = -20 + 9 = -11$. Nilai $k = -5$."
  - *Salah:* "Pindahkan $+9$ ke kanan: $4k = -11 - 9 = -20$. Kemudian bagi $-20$ dengan 4 menghasilkan $-5$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $3x + 5 = -4$, maka $x = $ ... (A. -3 | B. 3 | C. -1 | D. -9)
  - *Kunci:* A. -3 ($3x = -9 \implies x = -3$).

---

### [ID: CH3-EX-12] Melengkapi Tabel Fungsi Maju-Mundur
- **Materi:** Melengkapi Tabel Dua Arah (Mencari Output dan Input)
- **Indikator:** Siswa dapat mencari output $f(x)$ dan sekaligus mencari input $x$ yang bersesuaian pada tabel.
- **Bentuk Interaksi:** Lengkapi Tabel.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan rumus fungsi: $f(x) = 3x - 5$.
  Lengkapilah tabel nilai berikut:
  
  | $x$ | $f(x)$ |
  |:---:|:---:|
  | 2 | **[ ?A ]** |
  | **[ ?B ]** | 10 |
- **Data/Visual yang diperlukan:** Tabel dua kolom dengan sel rumpang pada kolom $f(x)$ baris pertama dan kolom $x$ baris kedua.
- **Pilihan/Jawaban:** Input angka pada kotak `?A` dan `?B`.
- **Kunci:**
  - Nilai `?A` (mencari output saat $x=2$): `1`
  - Nilai `?B` (mencari input saat $f(x)=10$): `5`
- **Pembahasan:**
  - Untuk baris 1: $x = 2 \implies f(2) = 3(2) - 5 = 6 - 5 = 1$.
  - Untuk baris 2: $f(x) = 10 \implies 3x - 5 = 10 \implies 3x = 15 \implies x = 5$.
- **Feedback:**
  - *Benar:* "Sempurna! Saat $x=2$, outputnya 1. Saat outputnya 10, input asalnya adalah 5."
  - *Salah:* "Untuk baris 1: hitung $3(2) - 5 = 1$. Untuk baris 2: selesaikan $3x - 5 = 10 \implies 3x = 15 \implies x = 5$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada $f(x) = 2x + 1$, berapakah nilai $x$ jika $f(x) = 9$? (A. 4 | B. 5 | C. 8 | D. 10)
  - *Kunci:* A. 4 ($2x + 1 = 9 \implies 2x = 8 \implies x = 4$).

---

### [ID: CH3-EX-13] Menemukan Nilai Koefisien $a$
- **Materi:** Menentukan Parameter Rumus Fungsi
- **Indikator:** Siswa dapat mencari nilai koefisien $a$ jika rumus berbentuk $f(x) = ax - 4$ dan satu titik fungsi diketahui.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui rumus fungsi $f(x) = ax - 4$.
  Jika diketahui **$f(3) = 11$**, berapakah nilai koefisien **$a$**?
- **Data/Visual yang diperlukan:** Kotak isian numerik.
- **Pilihan/Jawaban:** Input angka bulat.
- **Kunci:** `5`
- **Pembahasan:**
  Substitusikan $x = 3$ dan $f(3) = 11$:
  $$f(3) = a(3) - 4 = 11$$
  $$3a - 4 = 11$$
  $$3a = 11 + 4$$
  $$3a = 15 \implies a = rac{15}{3} = 5$$
  Maka nilai $a = 5$.
- **Feedback:**
  - *Benar:* "Akurat! $3a - 4 = 11 \implies 3a = 15 \implies a = 5$."
  - *Salah:* "Ganti $x$ dengan 3: $3a - 4 = 11$. Pindahkan $-4$ ke kanan menjadi $+4$: $3a = 15 \implies a = 5$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $f(x) = ax + 2$ dan $f(4) = 14$, berapakah $a$? (A. 3 | B. 4 | C. 2 | D. 5)
  - *Kunci:* A. 3 ($4a + 2 = 14 \implies 4a = 12 \implies a = 3$).

---

### [ID: CH3-EX-14] Menentukan Rumus Fungsi dari Tabel
- **Materi:** Konstruksi Rumus Fungsi dari Tabel
- **Indikator:** Siswa dapat menentukan rumus fungsi $f(x)$ berdasarkan data tabel masukan dan keluaran.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Perhatikan tabel nilai fungsi berikut:
  
  | $x$ | 1 | 2 | 3 | 4 |
  |:---:|:---:|:---:|:---:|:---:|
  | $f(x)$ | 7 | 10 | 13 | 16 |
  
  Rumus fungsi $f(x)$ yang tepat untuk tabel di atas adalah...
- **Data/Visual yang diperlukan:** Tabel data masukan dan keluaran.
- **Pilihan/Jawaban:**
  A. $f(x) = 2x + 5$
  B. $f(x) = 3x + 4$
  C. $f(x) = 4x + 3$
  D. $f(x) = 3x - 4$
- **Kunci:** B. $f(x) = 3x + 4$
- **Pembahasan:**
  1. Selisih output setiap kenaikan 1 satuan $x$:
     $$10 - 7 = 3, \quad 13 - 10 = 3$$
     Maka koefisien $a = 3$. Bentuk umum: $f(x) = 3x + b$.
  2. Masukkan $x = 1$:
     $$3(1) + b = 7 \implies 3 + b = 7 \implies b = 4$$
  Maka rumusnya adalah $f(x) = 3x + 4$.
- **Feedback:**
  - *Benar:* "Tepat sekali! Selisihnya bertambah 3 ($3x$) dan saat $x=1$ hasilnya 7 ($3(1) + 4 = 7$)."
  - *Salah:* "Cek selisih nilai $f(x)$: dari 7 ke 10 selisihnya 3, jadi koefisiennya $3x$. Uji saat $x=1$: $3(1) + b = 7 \implies b = 4$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $x = 1 	o 4$ dan $x = 2 	o 6$, selisihnya adalah 2. Rumus fungsinya adalah... (A. $f(x) = 2x + 2$ | B. $f(x) = 2x + 1$)
  - *Kunci:* A. $f(x) = 2x + 2$ ($2(1) + 2 = 4$).

---

### [ID: CH3-EX-15] Nilai Masukan Pecahan Sederhana
- **Materi:** Substitusi Nilai Pecahan
- **Indikator:** Siswa dapat menghitung nilai fungsi jika input variabel $x$ merupakan bilangan pecahan sederhana.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui rumus fungsi:
  $$f(x) = 6x - 5$$
  Berapakah nilai dari **$f(rac{1}{2})$**?
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. -2
  B. 3
  C. -8
  D. 1
- **Kunci:** A. -2
- **Pembahasan:**
  Substitusikan $x = rac{1}{2}$:
  $$f\left(rac{1}{2}ight) = 6\left(rac{1}{2}ight) - 5 = 3 - 5 = -2$$
- **Feedback:**
  - *Benar:* "Tepat! $6 \times \frac{1}{2} = 3$, dan $3 - 5 = -2$."
  - *Salah:* "Kalikan 6 dengan setengah: $6 \times 1/2 = 3$. Lalu kurangkan dengan 5: $3 - 5 = -2$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Berapakah nilai dari $f(rac{1}{3})$ pada $f(x) = 9x + 2$? (A. 5 | B. 3 | C. 11 | D. 1)
  - *Kunci:* A. 5 ($9(1/3) + 2 = 3 + 2 = 5$).

---

### [ID: CH3-EX-16] Multi-Pernyataan Nilai Fungsi
- **Materi:** Evaluasi Multi Titik pada Fungsi
- **Indikator:** Siswa dapat mengevaluasi kebenaran beberapa pernyataan nilai fungsi.
- **Bentuk Interaksi:** Pilihan Ganda Kompleks (Centang semua yang benar).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan rumus fungsi: $f(x) = 5 - 2x$.
  Centanglah **SEMUA** pernyataan di bawah ini yang bernilai **BENAR**!
- **Data/Visual yang diperlukan:** Checkbox multi-select.
- **Pilihan/Jawaban:**
  [ ] A. Nilai dari $f(0) = 5$
  [ ] B. Nilai dari $f(2) = 1$
  [ ] C. Nilai dari $f(-1) = 7$
  [ ] D. Nilai dari $f(3) = -2$
- **Kunci:** Centang **A**, **B**, dan **C** (Pernyataan D salah karena $f(3) = 5 - 6 = -1$).
- **Pembahasan:**
  - $f(0) = 5 - 2(0) = 5$ (Benar)
  - $f(2) = 5 - 2(2) = 5 - 4 = 1$ (Benar)
  - $f(-1) = 5 - 2(-1) = 5 + 2 = 7$ (Benar)
  - $f(3) = 5 - 2(3) = 5 - 6 = -1$ (Salah, di opsi tertulis $-2$)
- **Feedback:**
  - *Benar:* "Hebat! Pernyataan A, B, dan C benar. Kamu teliti menemukan bahwa $f(3)$ seharusnya $-1$."
  - *Salah:* "Uji nilai $f(3)$: $5 - 2(3) = 5 - 6 = -1$, jadi pernyataan D salah."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Apakah nilai $f(0)$ pada $f(x) = 2x + 7$ adalah 7? (A. Benar | B. Salah)
  - *Kunci:* A. Benar ($2(0) + 7 = 7$).

---

### [ID: CH3-EX-17] Pemodelan Matematika Tarif Parkir
- **Materi:** Pemodelan Aljabar Kontekstual
- **Indikator:** Siswa dapat menyusun model rumus fungsi linear dari narasi tarif biaya parkir.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah gedung parkir memberlakukan aturan tarif mobil:
  - Biaya 1 jam pertama (biaya masuk awal) = Rp 4.000
  - Biaya untuk setiap jam berikutnya = Rp 2.000 per jam
  Jika $x$ menyatakan lama parkir setelah jam pertama, manakah model rumus fungsi biaya total $f(x)$ yang benar?
- **Data/Visual yang diperlukan:** Ilustrasi karcis parkir gedung.
- **Pilihan/Jawaban:**
  A. $f(x) = 2.000x + 4.000$
  B. $f(x) = 4.000x + 2.000$
  C. $f(x) = 6.000x$
  D. $f(x) = 2.000x - 4.000$
- **Kunci:** A. $f(x) = 2.000x + 4.000$
- **Pembahasan:**
  Biaya tetap (konstanta $b$) adalah biaya masuk awal = Rp 4.000.
  Biaya variabel bertambah sebesar Rp 2.000 untuk setiap jam tambahan $x$ (koefisien $a = 2.000$).
  Maka rumus fungsi tarif adalah $f(x) = 2.000x + 4.000$.
- **Feedback:**
  - *Benar:* "Tepat sekali! Biaya variabel per jam adalah $2.000x$ ditambah biaya masuk awal $4.000$."
  - *Salah:* "Biaya awal adalah konstanta (4.000), dan biaya per jam menempel pada variabel $x$ (2.000x)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika tarif awal Rp 3.000 dan tarif per jam Rp 1.500, rumusnya adalah... (A. $1.500x + 3.000$ | B. $3.000x + 1.500$)
  - *Kunci:* A. $1.500x + 3.000$

---

### [ID: CH3-EX-18] Menentukan Rumus Fungsi dari Dua Nilai Titik
- **Materi:** Sistem Persamaan Fungsi Linear
- **Indikator:** Siswa dapat menentukan rumus $f(x) = ax + b$ jika diketahui $f(1) = 5$ dan $f(4) = 14$.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Suatu fungsi linear $f(x) = ax + b$ memenuhi:
  $$f(1) = 5 \quad 	ext{dan} \quad f(4) = 14$$
  Bentuk rumus fungsi $f(x)$ tersebut adalah...
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. $f(x) = 2x + 3$
  B. $f(x) = 3x + 2$
  C. $f(x) = 4x + 1$
  D. $f(x) = 3x - 2$
- **Kunci:** B. $f(x) = 3x + 2$
- **Pembahasan:**
  1. $f(4) = 4a + b = 14$
  2. $f(1) = a + b = 5$
  3. Kurangkan: $3a = 9 \implies a = 3$.
  4. Cari $b$: $3(1) + b = 5 \implies b = 2$.
  Rumus fungsi adalah $f(x) = 3x + 2$.
- **Feedback:**
  - *Benar:* "Sempurna! Eliminasi $b$ menghasilkan $3a = 9 \implies a = 3$ dan $b = 2$. Rumus $f(x) = 3x + 2$."
  - *Salah:* "Kurangkan kedua persamaan: $(4a + b) - (a + b) = 14 - 5 \implies 3a = 9 \implies a = 3$. Lalu masukkan ke persamaan pertama untuk mencari $b$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $f(1) = 3$ dan $f(2) = 5$, selisihnya adalah 2. Rumusnya adalah... (A. $f(x) = 2x + 1$ | B. $f(x) = 2x - 1$)
  - *Kunci:* A. $f(x) = 2x + 1$ ($2(1) + 1 = 3$).

---

### [ID: CH3-EX-19] Deteksi Kesalahan Baris Persamaan
- **Materi:** Evaluasi Aljabar Eliminasi
- **Indikator:** Siswa dapat menandai baris yang salah dalam penyelesaian sistem eliminasi rumus fungsi.
- **Bentuk Interaksi:** Deteksi Kesalahan.
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Seorang siswa mencari rumus $f(x) = ax + b$ dari data $f(2) = 7$ dan $f(5) = 19$:
  - **Baris 1:** $5a + b = 19$
  - **Baris 2:** $2a + b = 7$
  - **Baris 3:** $3a = 12 \implies a = 4$
  - **Baris 4:** $2(4) + b = 7 \implies 8 + b = 7 \implies b = 15$
  
  Di antara baris di atas, **Baris manakah yang memuat KESALAHAN PERHITUNGAN**?
- **Data/Visual yang diperlukan:** Lembar catatan aljabar empat baris.
- **Pilihan/Jawaban:**
  A. Baris 1
  B. Baris 2
  C. Baris 3
  D. Baris 4
- **Kunci:** D. Baris 4
- **Pembahasan:**
  Baris 1, 2, dan 3 sudah benar ($3a = 12 \implies a = 4$).
  Pada Baris 4:
  $$8 + b = 7 \implies b = 7 - 8 = -1$$
  Siswa salah memindahkan tanda dan justru menjumlahkan $7 + 8 = 15$. Seharusnya nilai $b = -1$. Kesalahan terletak pada **Baris 4**.
- **Feedback:**
  - *Benar:* "Audit tepat! Pada Baris 4, $b = 7 - 8 = -1$, bukan 15. Siswa salah memindahkan ruas."
  - *Salah:* "Periksa Baris 4: $8 + b = 7$. Jika 8 pindah ke ruas kanan, maka $b = 7 - 8 = -1$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $5 + b = 3$, berapakah nilai $b$? (A. 8 | B. -2 | C. 2 | D. -8)
  - *Kunci:* B. -2 ($b = 3 - 5 = -2$).

---

### [ID: CH3-EX-20] Matching Rumus Fungsi dengan Tabelnya
- **Materi:** Representasi Rumus ke Tabel
- **Indikator:** Siswa dapat mencocokkan rumus fungsi aljabar dengan tabel nilai pasangan yang bersesuaian.
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Jodohkan rumus fungsi di sebelah kiri dengan tabel pasangan $(x 	o y)$ yang tepat di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kiri: 
      1. `$f(x) = 2x + 3$`
      2. `$g(x) = 4x - 1$`
      3. `$h(x) = 5 - x$`
    - Kanan:
      - Tabel Alpha: `{(1, 5), (2, 7), (3, 9)}`
      - Tabel Beta: `{(1, 3), (2, 7), (3, 11)}`
      - Tabel Gamma: `{(1, 4), (2, 3), (3, 2)}`
- **Pilihan/Jawaban:** Menghubungkan garis pencocokan antar kartu.
- **Kunci:**
  - `$f(x) = 2x + 3$` ➔ `Tabel Alpha` (karena $2(1)+3=5$, $2(2)+3=7$, $2(3)+3=9$)
  - `$g(x) = 4x - 1$` ➔ `Tabel Beta` (karena $4(1)-1=3$, $4(2)-1=7$, $4(3)-1=11$)
  - `$h(x) = 5 - x$` ➔ `Tabel Gamma` (karena $5-1=4$, $5-2=3$, $5-3=2$)
- **Pembahasan:**
  Uji titik $x = 1$:
  - $f(1) = 2(1) + 3 = 5 \implies$ Tabel Alpha
  - $g(1) = 4(1) - 1 = 3 \implies$ Tabel Beta
  - $h(1) = 5 - 1 = 4 \implies$ Tabel Gamma
- **Feedback:**
  - *Benar:* "Sempurna! Kamu mencocokkan ketiga rumus fungsi ke tabelnya dengan tepat."
  - *Salah:* "Uji nilai $x=1$ pada setiap rumus untuk mencocokkan dengan angka pertama pada tabel."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Tabel manakah yang cocok untuk $f(x) = 3x$? (A. {(1, 3), (2, 6)} | B. {(1, 4), (2, 5)})
  - *Kunci:* A. {(1, 3), (2, 6)}

---

### [ID: CH3-EX-21] Nilai Aljabar Bentuk $f(k+1)$
- **Materi:** Substitusi Bentuk Aljabar pada Fungsi
- **Indikator:** Siswa dapat menentukan bentuk aljabar dari $f(x+1)$ jika rumus $f(x) = 3x + 2$ diketahui.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui rumus fungsi:
  $$f(x) = 3x + 2$$
  Bentuk aljabar yang paling sederhana untuk **$f(x + 1)$** adalah...
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. $3x + 3$
  B. $3x + 5$
  C. $4x + 3$
  D. $3x + 6$
- **Kunci:** B. $3x + 5$
- **Pembahasan:**
  Ganti variabel $x$ pada rumus dengan suku $(x + 1)$:
  $$f(x + 1) = 3(x + 1) + 2$$
  Gunakan sifat distributif:
  $$= 3x + 3 + 2 = 3x + 5$$
  Maka bentuk sederhananya adalah $3x + 5$.
- **Feedback:**
  - *Benar:* "Luar biasa! $3(x + 1) + 2 = 3x + 3 + 2 = 3x + 5$. Penguasaan aljabar yang matang!"
  - *Salah:* "Gunakan kurung: $3(x + 1) + 2$. Kalikan ke dalam: $3x + 3$, lalu tambahkan 2 menjadi $3x + 5$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Bentuk sederhana dari $2(x + 3) + 1$ adalah... (A. $2x + 7$ | B. $2x + 4$ | C. $2x + 6$ | D. $3x + 4$)
  - *Kunci:* A. $2x + 7$.

---

### [ID: CH3-EX-22] Selisih Perubahan Nilai Fungsi: $f(x+1) - f(x)$
- **Materi:** Sifat Laju Perubahan Fungsi Linear
- **Indikator:** Siswa dapat membuktikan bahwa selisih nilai $f(x+1) - f(x)$ pada fungsi linear selalu bernilai konstan sebesar gradien $a$.
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  **Pernyataan:** Untuk setiap fungsi linear $f(x) = 5x + 3$, nilai selisih antara nilai fungsi setelahnya dengan nilai fungsi sebelumnya ($f(x+1) - f(x)$) selalu bernilai tetap, yaitu sama dengan **$5$**.
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai Benar.
  $$f(x+1) = 5(x+1) + 3 = 5x + 8$$
  $$f(x) = 5x + 3$$
  $$f(x+1) - f(x) = (5x + 8) - (5x + 3) = 5$$
  Pada setiap fungsi linear $f(x) = ax + b$, pertambahan 1 satuan nilai $x$ selalu menyebabkan nilai $f(x)$ bertambah sebesar nilai koefisien $a$.
- **Feedback:**
  - *Benar:* "Analisis tingkat tinggi! Koefisien $a = 5$ adalah laju pertambahan nilai fungsi untuk setiap kenaikan 1 satuan $x$."
  - *Salah:* "Pernyataan ini Benar. Uji dengan angka: $f(1) = 8$ dan $f(2) = 13$. Selisihnya adalah $13 - 8 = 5$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Berapakah selisih pertambahan nilai output setiap kenaikan 1 satuan $x$ pada $f(x) = 4x - 1$? (A. 4 | B. 1 | C. 3 | D. 5)
  - *Kunci:* A. 4 (sebesar koefisien $x$).

---

### [ID: CH3-EX-23] Evaluasi Perbandingan Dua Paket Les Privat
- **Materi:** Evaluasi Fungsi Biaya Nyata
- **Indikator:** Siswa dapat menganalisis titik impas / perbandingan biaya dua paket bimbingan belajar.
- **Bentuk Interaksi:** Analisis Pernyataan (Pilihan Ganda Evaluatif).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Seorang siswa mempertimbangkan dua paket bimbingan belajar:
  - **Paket Juara:** Biaya pendaftaran Rp 50.000 + Biaya Rp 30.000 per pertemuan ($f(x) = 30.000x + 50.000$)
  - **Paket Hebat:** Biaya pendaftaran Rp 20.000 + Biaya Rp 35.000 per pertemuan ($g(x) = 35.000x + 20.000$)
  
  Jika siswa tersebut berencana mengikuti **10 kali pertemuan ($x = 10$)**, paket manakah yang **LEBIH HEMAT** dan berapa selisih penghematannya?
- **Data/Visual yang diperlukan:** Brosur perbandingan biaya bimbel.
- **Pilihan/Jawaban:**
  A. Paket Juara lebih hemat Rp 20.000
  B. Paket Hebat lebih hemat Rp 20.000
  C. Paket Juara lebih hemat Rp 30.000
  D. Kedua paket memakan biaya yang sama persis
- **Kunci:** A. Paket Juara lebih hemat Rp 20.000
- **Pembahasan:**
  Hitung biaya untuk $x = 10$:
  1. Paket Juara:
     $$f(10) = 30.000(10) + 50.000 = 300.000 + 50.000 = 	ext{Rp } 350.000$$
  2. Paket Hebat:
     $$g(10) = 35.000(10) + 20.000 = 350.000 + 20.000 = 	ext{Rp } 370.000$$
  3. Selisih:
     $$	ext{Rp } 370.000 - 	ext{Rp } 350.000 = 	ext{Rp } 20.000$$
  Maka Paket Juara lebih hemat sebesar Rp 20.000.
- **Feedback:**
  - *Benar:* "Evaluasi keputusan finansial yang tepat! Paket Juara (Rp 350.000) menghemat Rp 20.000 dibanding Paket Hebat (Rp 370.000)."
  - *Salah:* "Hitung biaya keduanya saat $x=10$: Paket Juara $= 350.000$, Paket Hebat $= 370.000$. Selisihnya adalah Rp 20.000."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Mana yang lebih murah untuk $x=2$: $f(x)=10x+5$ atau $g(x)=5x+20$? (A. $f(x)$ lebih murah | B. $g(x)$ lebih murah)
  - *Kunci:* A. $f(x)$ lebih murah ($25$ vs $30$).

---

### [ID: CH3-EX-24] Mesin Fungsi Bersusun Sederhana
- **Materi:** Mesin Pemroses Dua Tahap
- **Indikator:** Siswa dapat menghitung keluaran dari proses beruntun dua mesin fungsi.
- **Bentuk Interaksi:** Mesin Fungsi.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Dua mesin pengolah data dirangkai berurutan:
  - **Mesin 1:** Mengubah masukan $x$ dengan aturan $f(x) = 2x + 1$
  - **Mesin 2:** Menerima hasil dari Mesin 1 dan memprosesnya dengan aturan $g(u) = 3u - 2$
  
  Jika angka masukan awal adalah **$x = 3$**, berapakah angka akhir yang keluar dari Mesin 2?
- **Data/Visual yang diperlukan:** Diagram alir dua mesin konveyor yang saling terhubung.
- **Pilihan/Jawaban:** Input angka bulat.
- **Kunci:** `19`
- **Pembahasan:**
  - Tahap 1 (Mesin 1 dengan $x = 3$):
    $$u = f(3) = 2(3) + 1 = 7$$
  - Tahap 2 (Mesin 2 dengan masukan $u = 7$):
    $$g(7) = 3(7) - 2 = 21 - 2 = 19$$
  Maka keluaran akhirnya adalah 19.
- **Feedback:**
  - *Benar:* "Kerja berantai yang cermat! Mesin 1 menghasilkan 7, lalu 7 diproses Mesin 2 menghasilkan 19."
  - *Salah:* "Kerjakan bertahap: masukkan 3 ke mesin pertama $\implies 2(3)+1 = 7$. Lalu masukkan hasil 7 ke mesin kedua $\implies 3(7)-2 = 19$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Masukkan 2 ke mesin $f(x)=x+3$, lalu masukkan hasilnya ke mesin $g(u)=2u$. Hasil akhirnya adalah... (A. 10 | B. 7 | C. 8 | D. 12)
  - *Kunci:* A. 10 ($2+3=5 \implies 2 	imes 5 = 10$).

---

### [ID: CH3-EX-25] Prapeta dari Persamaan Pecahan
- **Materi:** Persamaan Prapeta dengan Pecahan
- **Indikator:** Siswa dapat mencari nilai masukan $x$ jika rumus fungsi memuat suku pembagian sederhana.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui rumus fungsi:
  $$f(x) = rac{x + 7}{3}$$
  Jika diketahui hasil bayangannya adalah **$f(a) = 5$**, tentukanlah nilai dari **$a$**!
- **Data/Visual yang diperlukan:** Kotak isian numerik.
- **Pilihan/Jawaban:** Input angka bulat.
- **Kunci:** `8`
- **Pembahasan:**
  $$rac{a + 7}{3} = 5$$
  Kalikan kedua ruas dengan 3:
  $$a + 7 = 5 	imes 3$$
  $$a + 7 = 15 \implies a = 15 - 7 = 8$$
  Maka nilai $a = 8$.
- **Feedback:**
  - *Benar:* "Tepat! $\frac{8 + 7}{3} = \frac{15}{3} = 5$. Nilai $a = 8$."
  - *Salah:* "Kalikan silang dulu: $a + 7 = 5 \times 3 = 15$. Lalu kurangkan: $a = 15 - 7 = 8$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $rac{x + 2}{2} = 4$, maka $x = $ ... (A. 6 | B. 8 | C. 10 | D. 4)
  - *Kunci:* A. 6 ($x + 2 = 8 \implies x = 6$).

---

### [ID: CH3-EX-26] Melengkapi Tabel Fungsi Selisih Konstan Negatif
- **Materi:** Tabel Nilai Fungsi Bertanda Negatif
- **Indikator:** Siswa dapat mengisi nilai yang hilang pada fungsi yang bernilai menurun.
- **Bentuk Interaksi:** Lengkapi Tabel.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan rumus fungsi: $f(x) = 8 - 3x$.
  Lengkapilah nilai keluaran $f(x)$ pada tabel di bawah ini!
  
  | $x$ | 0 | 1 | 2 | 3 |
  |:---:|:---:|:---:|:---:|:---:|
  | $f(x)$ | 8 | 5 | **[ ? ]** | -1 |
- **Data/Visual yang diperlukan:** Tabel interaktif dengan satu sel kosong pada $x = 2$.
- **Pilihan/Jawaban:** Input angka pada kotak sel.
- **Kunci:** `2`
- **Pembahasan:**
  Untuk $x = 2$:
  $$f(2) = 8 - 3(2) = 8 - 6 = 2$$
  Perhatikan polanya: setiap kali $x$ bertambah 1, nilai $f(x)$ selalu berkurang 3 ($8 	o 5 	o 2 	o -1$).
- **Feedback:**
  - *Benar:* "Tepat sekali! Polanya selalu berkurang 3: $8, 5, 2, -1$."
  - *Salah:* "Hitung $f(2) = 8 - 3(2) = 8 - 6 = 2$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Berapakah nilai $f(1)$ pada $f(x) = 7 - 2x$? (A. 5 | B. 9 | C. 3 | D. 4)
  - *Kunci:* A. 5 ($7 - 2 = 5$).

---

### [ID: CH3-EX-27] Deteksi Kesalahan Interpretasi Soal Cerita
- **Materi:** Deteksi Kesalahan Pemodelan Kontekstual
- **Indikator:** Siswa dapat mengevaluasi kesalahan penulisan rumus fungsi dari narasi soal cerita.
- **Bentuk Interaksi:** Deteksi Kesalahan.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sebuah tangki air berisi 100 liter. Air dialirkan keluar dengan debit 5 liter per menit.
  Agen Dito membuat model rumus sisa air:
  $$f(x) = 5x - 100$$
  (dengan $x$ adalah waktu dalam menit).
  
  Detektif Data menyatakan model Agen Dito SALAH. **Di manakah letak kesalahan model tersebut, dan bagaimana rumus yang benar?**
- **Data/Visual yang diperlukan:** Ilustrasi tangki air bocor/mengalirkan air.
- **Pilihan/Jawaban:**
  A. Rumus Dito salah karena volume air mula-mula adalah 100 dan berkurang 5 liter per menit, sehingga rumus yang benar adalah $f(x) = 100 - 5x$.
  B. Rumus Dito salah karena seharusnya debit air dibagi dengan 100.
  C. Rumus Dito sudah benar karena ada tanda minus.
  D. Rumus Dito salah karena seharusnya $f(x) = 100 + 5x$.
- **Kunci:** A. Rumus Dito salah karena volume air mula-mula adalah 100 dan berkurang 5 liter per menit, sehingga rumus yang benar adalah $f(x) = 100 - 5x$.
- **Pembahasan:**
  Volume air mula-mula adalah 100 liter (positif). Karena air dialirkan keluar, maka volumenya berkurang sebesar $5x$. Jadi sisa air adalah $100 - 5x$. Model Dito $5x - 100$ akan menghasilkan nilai negatif saat $x=0$ (yaitu $-100$), yang tidak masuk akal.
- **Feedback:**
  - *Benar:* "Analisis pemodelan yang sangat tepat! Air mula-mula 100 dan berkurang 5 liter per menit, jadi rumusnya $100 - 5x$."
  - *Salah:* "Uji saat $x=0$ (menit ke-0): pada rumus Dito $5(0) - 100 = -100$. Masak air mula-mula negatif 100 liter? Seharusnya $100 - 5x$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika tabungan awal Rp 50.000 dan diambil Rp 5.000 per hari, rumusnya adalah... (A. $50.000 - 5.000x$ | B. $5.000x - 50.000$)
  - *Kunci:* A. $50.000 - 5.000x$.

---

### [ID: CH3-EX-28] Titik Temu Dua Fungsi (Penyelesaian $f(x) = g(x)$)
- **Materi:** Persamaan Dua Fungsi Linear
- **Indikator:** Siswa dapat menemukan nilai $x$ saat dua fungsi menghasilkan nilai bayangan yang sama.
- **Bentuk Interaksi:** Input Nilai (Input Angka).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Dua pemancar sinyal memiliki rumus fungsi frekuensi:
  $$f(x) = 4x + 6 \quad 	ext{dan} \quad g(x) = 2x + 14$$
  Pada nilai masukan **$x$** berapakah kedua pemancar menghasilkan frekuensi yang SAMA ($f(x) = g(x)$)?
- **Data/Visual yang diperlukan:** Tampilan radar frekuensi dua gelombang yang berpotongan.
- **Pilihan/Jawaban:** Input angka numerik bulat.
- **Kunci:** `4`
- **Pembahasan:**
  Samakan kedua rumus fungsi:
  $$f(x) = g(x)$$
  $$4x + 6 = 2x + 14$$
  Kumpulkan suku bervariabel $x$ di ruas kiri dan konstanta di ruas kanan:
  $$4x - 2x = 14 - 6$$
  $$2x = 8 \implies x = rac{8}{2} = 4$$
  Cek: $f(4) = 4(4) + 6 = 22$ dan $g(4) = 2(4) + 14 = 22$ (Sama!).
- **Feedback:**
  - *Benar:* "Tepat sekali! Pada nilai $x = 4$, kedua fungsi menghasilkan nilai yang sama yaitu 22."
  - *Salah:* "Samakan kedua rumus: $4x + 6 = 2x + 14 \implies 4x - 2x = 14 - 6 \implies 2x = 8 \implies x = 4$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada nilai $x$ berapakah $3x = x + 6$? (A. 3 | B. 2 | C. 6 | D. 4)
  - *Kunci:* A. 3 ($2x = 6 \implies x = 3$).

---

### [ID: CH3-EX-29] Menentukan Daerah Hasil (Range) dari Domain Bilangan Bulat
- **Materi:** Daerah Hasil dari Domain Berhingga
- **Indikator:** Siswa dapat mendaftarkan seluruh anggota range dari fungsi dengan domain bilangan bulat tertentu.
- **Bentuk Interaksi:** Matching (Menjodohkan Himpunan).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui fungsi $f(x) = 2x - 3$ dengan daerah asal (domain):
  $$D = \{-1, 0, 1, 2\}$$
  Jodohkan setiap elemen domain di sebelah kiri dengan pasangannya di daerah hasil (Range) di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kiri: `x = -1`, `x = 0`, `x = 1`, `x = 2`.
    - Kanan: `-5`, `-3`, `-1`, `1`, `3` [Pengecoh].
- **Pilihan/Jawaban:** Menghubungkan garis pencocokan.
- **Kunci:**
  - `x = -1` ➔ `-5` (karena $2(-1) - 3 = -5$)
  - `x = 0` ➔ `-3` (karena $2(0) - 3 = -3$)
  - `x = 1` ➔ `-1` (karena $2(1) - 3 = -1$)
  - `x = 2` ➔ `1` (karena $2(2) - 3 = 1$)
- **Pembahasan:**
  - $f(-1) = -2 - 3 = -5$
  - $f(0) = 0 - 3 = -3$
  - $f(1) = 2 - 3 = -1$
  - $f(2) = 4 - 3 = 1$
  Daerah Hasilnya adalah $	ext{Range} = \{-5, -3, -1, 1\}$.
- **Feedback:**
  - *Benar:* "Luar biasa! Seluruh elemen Range {-5, -3, -1, 1} berhasil kamu hitung dengan tepat."
  - *Salah:* "Hitung nilai untuk masing-masing $x$: saat $x=-1$, $2(-1)-3 = -5$. Saat $x=0$, hasilnya $-3$, dst."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika domain $D = \{1, 2\}$ dan $f(x) = 3x$, maka Range adalah... (A. {3, 6} | B. {1, 2} | C. {3, 5} | D. {4, 5})
  - *Kunci:* A. {3, 6}.

---

### [ID: CH3-EX-30] Evaluasi Filosofis: Pemodelan Aljabar Fungsi
- **Materi:** Sintesis Evaluasi Fungsi Linear
- **Indikator:** Siswa dapat mengevaluasi keunggulan representasi rumus aljabar dibanding representasi diagram pada data skala besar.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Mengapa rumus fungsi aljabar (seperti $f(x) = 3.000x + 5.000$) **JAUH LEBIH EFEKTIF DAN UNGGUL** dibandingkan Diagram Panah ketika Detektif Data harus menghitung biaya untuk jarak $x = 1.000	ext{ km}$?
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. Karena diagram panah tidak boleh digunakan untuk angka ribuan sama sekali menurut hukum matematika.
  B. Karena rumus fungsi aljabar memungkinkan perhitungan nilai keluaran secara instan melalui substitusi matematika untuk angka masukan berapapun tanpa perlu menggambar ribuan lingkaran dan garis panah yang tidak praktis.
  C. Karena rumus fungsi aljabar selalu menghasilkan nilai yang lebih kecil daripada diagram panah.
  D. Karena diagram panah hanya boleh digambar dengan tinta berwarna merah.
- **Kunci:** B. Karena rumus fungsi aljabar memungkinkan perhitungan nilai keluaran secara instan melalui substitusi matematika untuk angka masukan berapapun tanpa perlu menggambar ribuan lingkaran dan garis panah yang tidak praktis.
- **Pembahasan:**
  Keunggulan utama bentuk rumus aljabar $f(x) = ax + b$ adalah efisiensi generalisasi: kita dapat menghitung nilai fungsi untuk input sebesar apa pun (misal $x = 1.000 \implies f(1.000) = 3.000.000 + 5.000 = 3.005.000$) secara langsung dalam hitungan detik. Diagram panah sangat baik untuk visualisasi konsep himpunan beranggota sedikit, namun tidak realistis untuk data berjumlah ratusan atau ribuan.
- **Feedback:**
  - *Benar:* "Evaluasi brilian, Detektif! Rumus aljabar adalah alat pemodelan yang sangat kuat untuk menangani data besar secara efisien!"
  - *Salah:* "Pikirkan kepraktisan: bayangkan jika kamu harus menggambar 1.000 garis panah pada diagram! Tentu rumus aljabar jauh lebih cepat dan instan melalui substitusi angka."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Manakah bentuk penyajian yang paling praktis untuk menghitung nilai fungsi pada masukan $x = 500$? (A. Rumus aljabar $f(x)$ | B. Menggambar diagram panah 500 garis)
  - *Kunci:* A. Rumus aljabar $f(x)$.

---
