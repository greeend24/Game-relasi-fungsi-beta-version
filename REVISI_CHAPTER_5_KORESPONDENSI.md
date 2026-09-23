# 📋 HASIL REVISI LENGKAP CHAPTER 5: KORESPONDENSI SATU-SATU
## Bank Soal Game Edukasi "Detektif Data: Relasi dan Fungsi" SMP Kelas VIII

Dokumen ini memuat revisi menyeluruh, pengayaan variasi interaktif, dan kalibrasi kognitif untuk seluruh instrumen soal pada **Chapter 5: Korespondensi Satu-Satu**.

- **Sasaran Pengguna:** Siswa SMP Kelas VIII (Fase D).
- **Nuansa & Bahasa:** Menyenangkan, bernuansa investigasi detektif (*Detektif Data*), pemodelan logika himpunan yang terstruktur, akurat, dan ramah bagi siswa SMP.
- **Mengatasi Masalah Repetisi Ekstrem Dokumen Asal:**
  - Dokumen asal mengulang pola statis `{Siswa A, B, C...} -> {Kursi 1, 2, 3...}` dan `{Elemen A-1, A-2...} -> {Elemen B-1, B-2...}` dengan kunci berulang-ulang `6! = 720` dari Stage 13 sampai 20.
  - Revisi ini merombak total seluruh stage menjadi **variatif, interaktif, dinamis, dan kaya konteks nyata serta logika matematika**.
  - Nilai $n$ divariasikan dari $n = 1, 2, 3, 4, 5$, hingga kasus jebakan $n(A) \neq n(B)$ yang menghasilkan $0$ kemungkinan korespondensi satu-satu.
- **6 Tipe Interaksi Utama Chapter 5:**
  1. **HUBUNGKAN PASANGAN (Interactive Arrow Matching):** Siswa menarik garis panah antara anggota himpunan A dan B. Sistem mengecek secara real-time apakah setiap anggota domain dan kodomain mendapat tepat satu kawan tanpa ada sisa maupun cabang.
  2. **MATCHING (Menjodohkan):** Mencocokkan konsep dunia nyata korespondensi satu-satu (Negara $\leftrightarrow$ Ibu Kota, Siswa $\leftrightarrow$ NISN), atau notasi faktorial dengan nilai perhitungannya.
  3. **DETEKSI KESALAHAN (Fault Detection):** Menampilkan beberapa diagram panah/pasangan berurutan; siswa mengidentifikasi diagram mana yang melanggar syarat korespondensi satu-satu (ada anggota kosong atau bercabang).
  4. **PUZZLE SUSUNAN (Card Arrangement Puzzle):** Siswa menyusun kartu anggota himpunan untuk membentuk pasangan berurutan $(a, b)$ yang memenuhi aturan relasi bijektif.
  5. **HITUNG JUMLAH KEMUNGKINAN (Factorial Calculator):** Menghitung nilai $n!$ berdasarkan jumlah anggota himpunan dengan variasi konteks penyelidikan (sandi sakelar, pos perbatasan, pengawalan).
  6. **MINI PUZZLE (Multi-stage Mystery Code):** Memecahkan serangkaian persoalan matematis di mana jawaban setiap subtugas membentuk digit sandi brankas akhir (misal: digit 1 dari $2!$, digit 2 dari kasus $n(A) \neq n(B) \rightarrow 0$, digit 3 dari $3! \rightarrow 6$, sehingga menghasilkan kode final `206`).
- **Spesifikasi Programmer:** Setiap butir interaktif dilengkapi panduan teknis implementasi di game engine (*komponen UI, validasi logika, penanganan error siswa, dan feedback adaptif*).
- **Kalibrasi Level Kognitif (Bloom C-Level):**
  - C2 (Memahami): Definisi dasar korespondensi satu-satu, syarat mutlak $n(A) = n(B)$, contoh di kehidupan nyata.
  - C3 (Mengaplikasikan): Menghubungkan panah 1-lawan-1, menghitung $n!$ untuk $n \le 5$, menyusun kartu pasangan berurutan.
  - C4 (Menganalisis): Menentukan relasi invers (kebalikan) dari korespondensi 1-1, mengenali kasus $n(A) \neq n(B) \implies 0$, memecahkan mini puzzle sandi bertingkat.
  - C5 (Mengevaluasi): Deteksi kesalahan diagram panah terselubung, evaluasi syarat bijektif pada pemodelan aljabar.

---

# BAGIAN I: 21 STAGE KASUS MODE CHAPTER (ALUR BELAJAR INVESTIGASI)

---

### [ID: CH5-STAGE-01] Misi Kunci Brankas Rahasia: Konsep Dasar 1-Lawan-1
- **Materi:** Definisi Dasar Korespondensi Satu-Satu (Fungsi Bijektif)
- **Indikator:** Diberikan 3 agen detektif dan 3 lencana khusus, siswa dapat menarik garis penghubung 1:1 timbal balik tanpa ada anggota yang kosong atau bercabang.
- **Bentuk Interaksi:** HUBUNGKAN PASANGAN
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif Data harus membagikan 3 lencana digital keamanan kepada 3 agen penyelidik sebelum menyusup ke markas musuh:
  - Himpunan Agen $A = \{\text{Agen Alpha, Agen Bravo, Agen Charlie}\}$
  - Himpunan Lencana $B = \{\text{Lencana 01, Lencana 02, Lencana 03}\}$
  Aturan Keamanan Markas: **Setiap agen wajib memegang tepat satu lencana, dan setiap lencana hanya boleh dipegang oleh tepat satu agen (tidak boleh ada agen tanpa lencana, dan tidak boleh ada lencana yang dipakai berdua).**
  Tariklah garis penghubung dari setiap agen di lingkaran A ke lencananya di lingkaran B!
- **Spesifikasi Programmer:**
  - *Komponen UI:* Dua kolom oval vertikal (Himpunan A di kiri, Himpunan B di kanan).
  - *Interaksi:* Drag and drop tali panah dari titik konektor anggota A ke anggota B.
  - *Validasi Sistem:*
    1. Cek jumlah panah = 3.
    2. Setiap elemen di A memiliki *out-degree* = 1.
    3. Setiap elemen di B memiliki *in-degree* = 1.
  - *Kondisi Siswa Salah:* Jika ada elemen B yang menerima 2 panah, beri kilatan merah pada elemen tersebut dengan pesan: "Lencana tidak boleh dipakai berdua! Satu lencana hanya untuk satu agen."
- **Pilihan Jawaban:** Menghubungkan setiap anggota A ke anggota B secara berpasangan tunggal (misal: Alpha $\rightarrow$ 01, Bravo $\rightarrow$ 02, Charlie $\rightarrow$ 03).
- **Kunci:** Pemetaan bijektif 1:1 sah (seluruh 3 agen terhubung ke 3 lencana berbeda).
- **Pembahasan:**
  Relasi dari A ke B disebut **korespondensi satu-satu** jika:
  1. Setiap anggota himpunan A berpasangan dengan tepat satu anggota himpunan B.
  2. Setiap anggota himpunan B berpasangan dengan tepat satu anggota himpunan A.
  Tidak ada anggota yang tertinggal (tanpa pasangan) dan tidak ada anggota yang bercabang di kedua himpunan.
- **Feedback:**
  - *Benar:* "Sempurna, Detektif! Ketiga agen telah memegang lencana eksklusif masing-masing. Ini adalah contoh sempurna dari korespondensi satu-satu!"
  - *Salah:* "Pastikan tidak ada agen yang belum kebagian lencana, dan tidak ada lencana yang ditautkan ke lebih dari satu agen."

---

### [ID: CH5-STAGE-02] Pemindai Berkas Ilegal: Deteksi Kesalahan Diagram Panah
- **Materi:** Syarat dan Pelanggaran Korespondensi Satu-Satu
- **Indikator:** Siswa dapat menemukan diagram panah yang BUKAN merupakan korespondensi satu-satu di antara beberapa diagram yang disajikan.
- **Bentuk Interaksi:** DETEKSI KESALAHAN
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sistem keamanan markas mendeteksi ada berkas pembagian tugas yang ILEGAL dan melanggar protokol korespondensi satu-satu.
  Periksa keempat diagram panah di bawah ini, lalu **klik diagram yang BUKAN merupakan korespondensi satu-satu**!
- **Spesifikasi Programmer:**
  - *Panel Tampilan (4 Kartu Diagram Panah):*
    - Diagram 1: $A=\{1, 2, 3\} \rightarrow B=\{x, y, z\}$ dengan pasangan $(1, x), (2, y), (3, z)$ [SAH 1:1].
    - Diagram 2: $A=\{1, 2, 3\} \rightarrow B=\{x, y, z\}$ dengan pasangan $(1, y), (2, z), (3, x)$ [SAH 1:1].
    - Diagram 3: $A=\{1, 2, 3\} \rightarrow B=\{x, y, z\}$ dengan pasangan $(1, x), (2, x), (3, z)$, sementara elemen $y$ di B kosong [ILEGAL - BUKAN 1:1].
    - Diagram 4: $A=\{1, 2, 3\} \rightarrow B=\{x, y, z\}$ dengan pasangan $(1, z), (2, x), (3, y)$ [SAH 1:1].
  - *Interaksi:* Siswa mengklik Diagram 3.
  - *Visual Feedback:* Diagram 3 diberi cap stempel merah `MELANGGAR PROTOKOL (DUPLIKASI & KOSONG)`.
- **Pilihan Jawaban:** Klik Diagram 1, Diagram 2, Diagram 3, atau Diagram 4.
- **Kunci:** Diagram 3
- **Pembahasan:**
  Pada Diagram 3:
  - Anggota asal $1$ dan $2$ sama-sama menunjuk ke anggota kawan $x$ (terjadi cabang di kodomain).
  - Anggota kawan $y$ tidak memiliki pasangan sama sekali (tersisa/kosong).
  Meskipun Diagram 3 adalah sebuah *fungsi*, diagram tersebut **bukan korespondensi satu-satu** karena syarat korespondensi satu-satu mengharuskan setiap anggota kawan memiliki tepat satu pasangan asal.
- **Feedback:**
  - *Benar:* "Deteksi akurat! Pada Diagram 3, elemen $x$ menerima dua panah dan elemen $y$ tidak memiliki pasangan. Ini bukan korespondensi satu-satu!"
  - *Salah:* "Periksa kembali setiap diagram: cari diagram yang anggota himpunan kanannya (B) menerima lebih dari satu panah atau ada yang tidak kebagian panah."

---

### [ID: CH5-STAGE-03] Sandi Tiga Sakelar: Menghitung Banyak Korespondensi ($3!$)
- **Materi:** Rumus Banyak Korespondensi Satu-Satu ($n!$)
- **Indikator:** Diberikan $n(A) = n(B) = 3$, siswa dapat menghitung banyak kemungkinan susunan pemetaan yaitu $3! = 3 \times 2 \times 1 = 6$.
- **Bentuk Interaksi:** HITUNG JUMLAH KEMUNGKINAN
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Untuk membuka pintu gerbang rahasia, Detektif Data harus menghubungkan 3 kabel warna $\{\text{Merah, Kuning, Biru}\}$ ke 3 terminal sakelar $\{\text{Sakelar 1, Sakelar 2, Sakelar 3}\}$. Setiap kabel harus masuk ke satu sakelar berbeda.
  Berapa banyak seluruh variasi susunan pasangan kabel yang mungkin dicoba oleh Detektif Data? *(Ketikkan angka hasilnya)*
- **Spesifikasi Programmer:**
  - *Komponen:* Gambar kotak sakelar dengan 3 kabel dan display keypad angka untuk menginput jawaban.
  - *Input Field:* Kotak isian angka numerik integer.
  - *Tombol:* "UJI KOMBINASI".
- **Pilihan Jawaban:** Input angka numerik langsung.
- **Kunci:** `6`
- **Pembahasan:**
  Banyaknya korespondensi satu-satu dari himpunan A ke himpunan B yang memiliki $n$ anggota dihitung dengan rumus faktorial ($n!$):
  $$n! = n \times (n - 1) \times (n - 2) \times \dots \times 1$$
  Karena $n = 3$:
  $$3! = 3 \times 2 \times 1 = 6\text{ cara}$$
  - Kabel pertama memiliki 3 pilihan sakelar.
  - Kabel kedua tersisa 2 pilihan sakelar.
  - Kabel ketiga tersisa 1 pilihan sakelar.
  Total kombinasi = $3 \times 2 \times 1 = 6$ susunan.
- **Feedback:**
  - *Benar:* "Tepat sekali! Dengan rumus faktorial $3! = 3 \times 2 \times 1 = 6$, terdapat 6 kemungkinan susunan kabel yang bisa dibentuk."
  - *Salah:* "Gunakan rumus faktorial $n!$ untuk $n = 3$. Kalikan mundur: $3 \times 2 \times 1 = 6$."

---

### [ID: CH5-STAGE-04] Berkas Paspor Diplomat: Puzzle Susunan Kartu ($n=3$)
- **Materi:** Penyusunan Pasangan Berurutan Korespondensi Satu-Satu
- **Indikator:** Siswa dapat menyusun kartu diplomat dan nomor paspor ke dalam slot pasangan berurutan 1:1 tanpa pengulangan.
- **Bentuk Interaksi:** PUZZLE SUSUNAN
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif Data sedang memverifikasi identitas 3 diplomat di bandara:
  - Himpunan Diplomat $D = \{D_1, D_2, D_3\}$
  - Himpunan Nomor Paspor $P = \{P_{101}, P_{102}, P_{103}\}$
  Berdasarkan catatan intelejen:
  1. $D_1$ memegang paspor bernomor genap.
  2. $D_2$ memegang paspor dengan nomor paling kecil.
  3. $D_3$ memegang paspor yang tersisa.
  Susunlah kartu paspor ke dalam slot masing-masing diplomat agar membentuk pasangan korespondensi satu-satu yang valid!
- **Spesifikasi Programmer:**
  - *Komponen:*
    - 3 Slot Penerima: `[ Diplomat D1 : ___ ]`, `[ Diplomat D2 : ___ ]`, `[ Diplomat D3 : ___ ]`.
    - 3 Kartu Paspor yang dapat di-drag: `[ P101 ]`, `[ P102 ]`, `[ P103 ]`.
  - *Aturan Logika:*
    - $P_{102}$ adalah nomor genap (untuk $D_1$).
    - $P_{101}$ adalah nomor terkecil (untuk $D_2$).
    - $P_{103}$ adalah sisanya (untuk $D_3$).
  - *Feedback Visual:* Kartu terkunci dengan bingkai hijau dan muncul cap `PASPOR TERVERIFIKASI`.
- **Pilihan Jawaban:**
  - $D_1 \rightarrow P_{102}$
  - $D_2 \rightarrow P_{101}$
  - $D_3 \rightarrow P_{103}$
- **Kunci:** Pasangan: `(D1, P102)`, `(D2, P101)`, `(D3, P103)`
- **Pembahasan:**
  - Nomor genap di antara $\{P_{101}, P_{102}, P_{103}\}$ adalah $P_{102}$, maka $D_1$ berpasangan dengan $P_{102}$.
  - Nomor paling kecil adalah $P_{101}$, maka $D_2$ berpasangan dengan $P_{101}$.
  - Paspor yang tersisa adalah $P_{103}$, maka $D_3$ berpasangan dengan $P_{103}$.
  Seluruh diplomat dan paspor berpasangan tepat satu-satu secara unik dan lengkap.
- **Feedback:**
  - *Benar:* "Analisis tepat! Seluruh paspor terpasang sempurna satu lawan satu tanpa ada diplomat yang tertinggal atau paspor ganda."
  - *Salah:* "Perhatikan petunjuk: $D_1$ mendapat nomor genap ($P_{102}$), $D_2$ mendapat nomor terkecil ($P_{101}$), dan $D_3$ mendapat sisanya ($P_{103}$)."

---

### [ID: CH5-STAGE-05] Prinsip Sarang Merpati: Uji $n(A) 
eq n(B)$
- **Materi:** Syarat Mutlak Kesamaan Kardinalitas Himpunan ($n(A) = n(B)$)
- **Indikator:** Siswa dapat membuktikan bahwa relasi antara 4 tersangka dan 3 sel tahanan tidak dapat membentuk korespondensi satu-satu.
- **Bentuk Interaksi:** DETEKSI KESALAHAN (Analisis Logika Matematika)
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Kepala Polisi ingin menempatkan **4 orang tersangka** ke dalam **3 kamar sel isolasi**. Aturan isolasi ketat menyatakan: *Setiap sel hanya boleh diisi tepat 1 orang tersangka, dan tidak boleh ada tersangka yang berada di luar sel.*
  Detektif Data menyatakan: *"Secara matematis, rencana ini MUSTAHIL membentuk korespondensi satu-satu!"*
  Mengapa kesimpulan Detektif Data tersebut PASTI BENAR?
- **Spesifikasi Programmer:**
  - *Visual:* Ilustrasi 4 figur tersangka dan 3 pintu sel jeruji besi bernomor 1, 2, 3.
  - *Animasi Uji:* Ketika pemain mencoba memasukkan 4 tersangka ke 3 sel (1 orang per sel), tersangka ke-4 tertinggal di luar dengan tanda tanya besar merah `TIDAK DAPAT KAMAR!`.
- **Pilihan Jawaban:**
  A. Karena jumlah anggota kedua himpunan tidak sama ($n(A) = 4 \neq n(B) = 3$), sehingga pasti ada tersangka yang tidak kebagian sel atau ada sel yang harus diisi berdua  
  B. Karena tersangka tidak boleh dimasukkan ke dalam sel isolasi  
  C. Karena jumlah kamar sel harus berjumlah genap  
  D. Karena korespondensi satu-satu hanya berlaku untuk himpunan huruf dan angka  
- **Kunci:** A. Karena jumlah anggota kedua himpunan tidak sama ($n(A) = 4 \neq n(B) = 3$), sehingga pasti ada tersangka yang tidak kebagian sel atau ada sel yang harus diisi berdua
- **Pembahasan:**
  Syarat mutlak paling fundamental dari korespondensi satu-satu adalah:
  $$n(A) = n(B)$$
  Jika jumlah anggota asal berbeda dengan jumlah anggota kawan ($4 \neq 3$):
  - Berdasarkan *Pigeonhole Principle* (Prinsip Sarang Merpati), jika 4 tersangka dimasukkan ke dalam 3 sel, pasti ada minimal satu sel yang berisi lebih dari 1 orang (melanggar syarat 1:1), ATAU ada 1 tersangka yang tidak mendapat sel (melanggar syarat fungsi).
  Maka, banyaknya korespondensi satu-satu yang mungkin dibentuk adalah **0**.
- **Feedback:**
  - *Benar:* "Prinsip matematika yang sangat kuat! Tanpa kesamaan jumlah anggota $n(A) = n(B)$, korespondensi satu-satu mustahil terbentuk."
  - *Salah:* "Syarat utama korespondensi 1-1 adalah jumlah anggota himpunan A harus persis sama dengan himpunan B ($n(A) = n(B)$). Jika 4 dan 3, tidak mungkin berpasangan satu-satu."

---

### [ID: CH5-STAGE-06] Penjagaan 4 Pos Perbatasan: Menghitung Nilai $4!$
- **Materi:** Perhitungan Faktorial untuk $n = 4$
- **Indikator:** Diberikan $n = 4$, siswa dapat menghitung banyak korespondensi satu-satu yaitu $4! = 4 \times 3 \times 2 \times 1 = 24$.
- **Bentuk Interaksi:** HITUNG JUMLAH KEMUNGKINAN
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah tim beranggotakan 4 agen detektif $\{A_1, A_2, A_3, A_4\}$ ditugaskan menjaga 4 pos perbatasan kota $\{\text{Pos Utara, Pos Selatan, Pos Timur, Pos Barat}\}$. Setiap pos wajib dijaga oleh tepat 1 agen.
  Berapa banyak seluruh pola penugasan penjagaan pos yang berbeda yang dapat disusun oleh markas?
- **Spesifikasi Programmer:**
  - *Komponen:* Peta kota dengan 4 pin pos penjagaan di 4 arah mata angin dan input keypad kalkulator.
  - *Input:* Angka numerik.
- **Pilihan Jawaban:** Input angka langsung (atau pilihan ganda: 16, 24, 12, 64).
- **Kunci:** `24`
- **Pembahasan:**
  Diketahui:
  $$n(A) = n(B) = 4$$
  Banyaknya kemungkinan susunan korespondensi satu-satu adalah:
  $$n! = 4! = 4 \times 3 \times 2 \times 1 = 24\text{ susunan penugasan}$$
- **Feedback:**
  - *Benar:* "Perhitungan akurat! $4! = 4 \times 3 \times 2 \times 1 = 24$ pola penugasan yang berbeda."
  - *Salah:* "Hitung perkalian faktorial mundur: $4 \times 3 = 12$, lalu $12 \times 2 = 24$, lalu $24 \times 1 = 24$."

---

### [ID: CH5-STAGE-07] Data Identitas Nasional: Matching Hubungan 1:1 Alami
- **Materi:** Contoh Nyata Korespondensi Satu-Satu dalam Kehidupan
- **Indikator:** Siswa dapat mencocokkan himpunan yang memiliki hubungan korespondensi satu-satu alami di dunia nyata.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C2 (Memahami)
- **Soal:**
  Dalam sistem kependudukan dan kenegaraan, beberapa relasi sengaja dirancang sebagai korespondensi satu-satu mutlak demi keamanan data.
  Jodohkan entitas di sebelah kiri dengan pasangannya yang membentuk **KORESPONDENSI SATU-SATU ALAMI** di sebelah kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:*
    1. Setiap Warga Negara Indonesia
    2. Setiap Negara Berdaulat di Dunia
    3. Setiap Siswa Sekolah di Indonesia
  - *Kolom Kanan:*
    - Satu Nomor Induk Kependudukan (NIK) Unik
    - Tepat Satu Ibu Kota Resmi Negara
    - Satu Nomor Induk Siswa Nasional (NISN)
    - Makanan Favorit di Kantin [Distraktor - Relasi Biasa]
- **Pilihan Jawaban:**
  - Warga Negara Indonesia $\rightarrow$ NIK Unik
  - Negara Berdaulat $\rightarrow$ Ibu Kota Resmi
  - Siswa Sekolah $\rightarrow$ NISN
- **Kunci:**
  - Warga Negara Indonesia $\leftrightarrow$ Satu NIK Unik
  - Negara Berdaulat $\leftrightarrow$ Tepat Satu Ibu Kota Resmi
  - Siswa Sekolah $\leftrightarrow$ Satu NISN
- **Pembahasan:**
  - 1 orang warga negara hanya punya 1 NIK, dan 1 NIK hanya dimiliki oleh 1 orang (korespondensi 1:1).
  - 1 negara memiliki tepat 1 ibu kota resmi, dan 1 kota tersebut hanya menjadi ibu kota dari 1 negara (korespondensi 1:1).
  - 1 siswa memiliki 1 NISN unik (korespondensi 1:1).
  - Makanan favorit bukan korespondensi 1:1 karena satu orang bisa suka banyak makanan dan satu makanan disukai banyak orang.
- **Feedback:**
  - *Benar:* "Tepat sekali! NIK, NISN, dan Ibu Kota Resmi adalah contoh nyata penerapan korespondensi satu-satu dalam sistem administrasi modern."
  - *Salah:* "Cari pasangan yang bersifat unik dan eksklusif di mana tidak ada orang/negara yang memiliki dua identitas atau satu identitas dipakai bersama."

---

### [ID: CH5-STAGE-08] Transmisi Sinyal Biner: Hubungkan Pasangan 4 Huruf
- **Materi:** Pemetaan Bijektif Kode Sandi ($n = 4$)
- **Indikator:** Diberikan 4 huruf sandi dan 4 kode biner, siswa menarik garis panah 1:1 sesuai kunci deskripsi intelejen.
- **Bentuk Interaksi:** HUBUNGKAN PASANGAN
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif Data harus menghubungkan 4 huruf sandi $\{A, B, C, D\}$ ke dalam 4 kode biner $\{00, 01, 10, 11\}$ berdasarkan aturan:
  - Huruf $A$ berpasangan dengan kode biner nilai nol mutlak ($00$).
  - Huruf $D$ berpasangan dengan kode biner nilai tertinggi ($11$).
  - Huruf $B$ berpasangan dengan kode biner dengan angka 1 di belakang ($01$).
  - Huruf $C$ berpasangan dengan kode biner yang tersisa ($10$).
  Tarik garis panah dari setiap huruf ke kode binernya!
- **Spesifikasi Programmer:**
  - *Komponen:* Diagram panah interaktif dengan 4 node di kiri dan 4 node di kanan.
  - *Target Garis:*
    - $A \rightarrow 00$
    - $B \rightarrow 01$
    - $C \rightarrow 10$
    - $D \rightarrow 11$
  - *Feedback Visual:* Suara telegraf berbunyi dan kode terkirim sukses.
- **Pilihan Jawaban:** Menghubungkan $A \rightarrow 00$, $B \rightarrow 01$, $C \rightarrow 10$, $D \rightarrow 11$.
- **Kunci:** Pasangan panah: `A -> 00`, `B -> 01`, `C -> 10`, `D -> 11`
- **Pembahasan:**
  Setiap huruf dari 4 alfabet dihubungkan secara unik ke tepat satu dari 4 kode biner. Hubungan ini memenuhi definisi korespondensi satu-satu:
  $$\{(A, 00), (B, 01), (C, 10), (D, 11)\}$$
- **Feedback:**
  - *Benar:* "Transmisi sandi sukses! Keempat huruf terenkripsi secara sempurna ke dalam 4 kode biner unik."
  - *Salah:* "Periksa kembali: $A \rightarrow 00$, $D \rightarrow 11$, $B \rightarrow 01$, dan $C \rightarrow 10$."

---

### [ID: CH5-STAGE-09] Brankas Tiga Digit (Tahap 1): Digit Pertama dari $2!$
- **Materi:** Mini Puzzle Sandi Brankas - Perhitungan Faktorial Sederhana ($n=2$)
- **Indikator:** Siswa menghitung banyak korespondensi satu-satu untuk $n=2$ guna mengungkap digit pertama kode brankas.
- **Bentuk Interaksi:** MINI PUZZLE (Tahap 1 dari 3)
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif Data tiba di depan **Brankas Dokumen Rahasia**. Brankas ini dikunci dengan **KODE 3 DIGIT**.
  Untuk mendapatkan **DIGIT PERTAMA**, pecahkan teka-teki berikut:
  *"Sebuah sistem keamanan hanya memiliki 2 tombol sandi $\{X, Y\}$ dan 2 lampu indikator $\{L_1, L_2\}$. Berapakah banyaknya susunan korespondensi satu-satu yang dapat dibentuk dari tombol ke lampu indikator ($2!$)?"*
- **Spesifikasi Programmer:**
  - *Visual:* Brankas besi besar dengan display 3 slot angka: `[ ? ] [ - ] [ - ]`.
  - *Input:* Siswa mengetik digit pertama pada slot 1.
- **Pilihan Jawaban:** Input angka tunggal.
- **Kunci:** `2`
- **Pembahasan:**
  Jumlah anggota himpunan $n = 2$.
  Banyaknya korespondensi satu-satu adalah:
  $$2! = 2 \times 1 = 2\text{ susunan}$$
  Susunannya adalah:
  1. $(X \rightarrow L_1, Y \rightarrow L_2)$
  2. $(X \rightarrow L_2, Y \rightarrow L_1)$
  Maka digit pertama kode brankas adalah **2**.
- **Feedback:**
  - *Benar:* "Digit pertama terbuka! Nilai $2! = 2 \times 1 = 2$. Digit pertama brankas adalah 2!"
  - *Salah:* "Hitung $2!$: $2 \times 1 = 2$."

---

### [ID: CH5-STAGE-10] Brankas Tiga Digit (Tahap 2): Digit Kedua dari Kasus $n(A) 
eq n(B)$
- **Materi:** Mini Puzzle Sandi Brankas - Banyak Korespondensi saat Kardinalitas Berbeda
- **Indikator:** Siswa menganalisis bahwa jika $n(A) \neq n(B)$, banyak korespondensi yang mungkin adalah $0$, menghasilkan digit kedua.
- **Bentuk Interaksi:** MINI PUZZLE (Tahap 2 dari 3)
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Kini temukan **DIGIT KEDUA** kode brankas:
  *"Diberikan himpunan dokumen $A = \{\text{Surat 1, Surat 2, Surat 3, Surat 4}\}$ dengan $n(A) = 4$ dan himpunan amplop $B = \{\text{Amplop A, Amplop B, Amplop C}\}$ dengan $n(B) = 3$.*
  *Berapa banyakkah korespondensi satu-satu yang mungkin dibentuk dari himpunan dokumen $A$ ke himpunan amplop $B$?"*
- **Spesifikasi Programmer:**
  - *Visual:* Display brankas menampilkan: `[ 2 ] [ ? ] [ - ]`.
  - *Input:* Siswa memasukkan angka untuk digit kedua.
- **Pilihan Jawaban:** Input angka tunggal.
- **Kunci:** `0`
- **Pembahasan:**
  Periksa jumlah anggota:
  $$n(A) = 4 \quad \text{dan} \quad n(B) = 3$$
  Karena $n(A) \neq n(B)$, maka **TIDAK MUNGKIN** dibentuk korespondensi satu-satu (pasti ada surat yang tidak kebagian amplop jika 1 amplop untuk 1 surat).
  Oleh karena itu, banyaknya korespondensi satu-satu yang mungkin adalah **0**.
  Maka digit kedua kode brankas adalah **0**.
- **Feedback:**
  - *Benar:* "Luar biasa, Detektif! Karena $n(A) \neq n(B)$, tidak ada korespondensi satu-satu yang bisa dibentuk (nilainya 0). Digit kedua adalah 0!"
  - *Salah:* "Ingat syarat mutlak korespondensi satu-satu: $n(A)$ harus sama dengan $n(B)$. Jika jumlahnya berbeda, tidak ada satu pun korespondensi 1-1 yang bisa dibentuk, jadi jawabannya 0."

---

### [ID: CH5-STAGE-11] Brankas Tiga Digit (Tahap 3): Digit Ketiga dan Pembukaan Brankas
- **Materi:** Mini Puzzle Sandi Brankas - Perhitungan $3!$ dan Verifikasi Kode Final
- **Indikator:** Siswa menghitung $3! = 6$ untuk digit ketiga, lalu memasukkan kode final `206` untuk membuka brankas.
- **Bentuk Interaksi:** MINI PUZZLE (Tahap 3 dari 3 - Final Unlock)
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Pecahkan teka-teki terakhir untuk **DIGIT KETIGA**:
  *"Jika sebuah tim terdiri dari 3 detektif dan tersedia 3 ruang arsip, ada berapa banyak kemungkinan korespondensi satu-satu yang dapat dibentuk ($3!$)?"*
  Setelah kamu mengetahui ketiga digitnya:
  - Digit 1: (dari Stage 09)
  - Digit 2: (dari Stage 10)
  - Digit 3: (dari Stage 11)
  Ketikkan **KODE LENGKAP 3 DIGIT** untuk membuka brankas!
- **Spesifikasi Programmer:**
  - *Visual:* Brankas menampilkan `[ 2 ] [ 0 ] [ ? ]`.
  - *Input:* Field kode 3 digit lengkap.
  - *Efek Sukses:* Tuas brankas berputar, pintu brankas terbuka mengeluarkan berkas rahasia emas.
- **Pilihan Jawaban:** Input 3 digit angka.
- **Kunci:** `206`
- **Pembahasan:**
  1. Digit Pertama (Stage 09): $n=2 \implies 2! = 2 \times 1 = 2$.
  2. Digit Kedua (Stage 10): $n(A) \neq n(B) \implies 0$.
  3. Digit Ketiga (Stage 11): $n=3 \implies 3! = 3 \times 2 \times 1 = 6$.
  Maka kombinasi kode rahasia brankas adalah **206**.
- **Feedback:**
  - *Benar:* "KLIK! Pintu brankas terbuka! Kode 206 terverifikasi sempurna. Konsep faktorial dan syarat $n(A)=n(B)$ berhasil kamu kuasai!"
  - *Salah:* "Gabungkan ketiga jawaban: digit pertama 2, digit kedua 0, dan digit ketiga $3! = 6$. Kodenya adalah 206."

---

### [ID: CH5-STAGE-12] Penyusup di Antara Pasangan: Deteksi Pasangan Berurutan Palsu
- **Materi:** Identifikasi Korespondensi Satu-Satu pada Pasangan Berurutan
- **Indikator:** Siswa dapat mendeteksi himpunan pasangan berurutan yang bukan merupakan korespondensi satu-satu.
- **Bentuk Interaksi:** DETEKSI KESALAHAN
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan himpunan $A = \{1, 2, 3\}$ dan $B = \{a, b, c\}$. Detektif Data menemukan 4 berkas catatan pasangan berurutan.
  Manakah berkas pasangan berurutan di bawah ini yang **BUKAN** merupakan korespondensi satu-satu?
- **Spesifikasi Programmer:**
  - *Komponen:* 4 kartu arsip yang dapat diklik:
    - Berkas A: $\{(1, a), (2, b), (3, c)\}$
    - Berkas B: $\{(1, b), (2, c), (3, a)\}$
    - Berkas C: $\{(1, a), (2, b), (3, a)\}$ [KUNCI BUKAN 1:1]
    - Berkas D: $\{(1, c), (2, a), (3, b)\}$
- **Pilihan Jawaban:**
  A. $\{(1, a), (2, b), (3, c)\}$  
  B. $\{(1, b), (2, c), (3, a)\}$  
  C. $\{(1, a), (2, b), (3, a)\}$  
  D. $\{(1, c), (2, a), (3, b)\}$  
- **Kunci:** C. $\{(1, a), (2, b), (3, a)\}$
- **Pembahasan:**
  Pada pasangan berurutan korespondensi satu-satu:
  - Semua elemen pertama (domain) harus berbeda.
  - Semua elemen kedua (kodomain) juga harus berbeda dan tidak boleh ada pengulangan.
  Pada Berkas C: elemen kedua '$a$' muncul **dua kali**, yaitu pada $(1, a)$ dan $(3, a)$. Ini berarti anggota kodomain '$a$' menerima dua kawan sekaligus, dan elemen '$c$' tidak memiliki kawan. Jadi Berkas C bukan korespondensi satu-satu.
- **Feedback:**
  - *Benar:* "Tepat sekali! Pada Berkas C, huruf '$a$' dipasangkan dua kali (dengan 1 dan 3), sehingga melanggar syarat korespondensi satu-satu."
  - *Salah:* "Periksa elemen kedua pada setiap pasangan tanda kurung. Pada korespondensi satu-satu, tidak boleh ada huruf di posisi belakang yang berulang."

---

### [ID: CH5-STAGE-13] Ruang Interogasi Terisolasi: Puzzle Susunan ($n=4$)
- **Materi:** Pemodelan Pasangan Korespondensi 1:1 Berdasarkan Aturan Khusus
- **Indikator:** Diberikan 4 saksi dan 4 ruang interogasi, siswa menyusun kartu pasangan berdasarkan petunjuk logika.
- **Bentuk Interaksi:** PUZZLE SUSUNAN
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Empat orang saksi kasus $\{S_1, S_2, S_3, S_4\}$ harus ditempatkan ke dalam 4 ruang interogasi $\{R_A, R_B, R_C, R_D\}$ secara 1-lawan-1:
  - Saksi $S_1$ wajib di ruang paling kedap suara, yaitu $R_D$.
  - Saksi $S_4$ menolak masuk ruang $R_A$, sehingga ditempatkan di $R_B$.
  - Saksi $S_2$ ditempatkan di $R_A$.
  - Saksi $S_3$ ditempatkan di ruang yang tersisa.
  Susunlah kartu saksi ke ruang interogasi yang tepat!
- **Spesifikasi Programmer:**
  - *Komponen:* 4 kotak ruang $R_A, R_B, R_C, R_D$ dan 4 bidak saksi yang dapat ditarik (*draggable*).
- **Pilihan Jawaban:**
  - $R_A \leftarrow S_2$
  - $R_B \leftarrow S_4$
  - $R_C \leftarrow S_3$
  - $R_D \leftarrow S_1$
- **Kunci:** Pasangan: `(S2, RA), (S4, RB), (S3, RC), (S1, RD)`
- **Pembahasan:**
  - $S_1 \rightarrow R_D$
  - $S_4 \rightarrow R_B$
  - $S_2 \rightarrow R_A$
  - Tersisa saksi $S_3$ dan ruang $R_C$, maka $S_3 \rightarrow R_C$.
  Semua saksi berada di ruang unik dan tidak ada ruang yang kosong.
- **Feedback:**
  - *Benar:* "Penataan ruang sukses! Keempat saksi terisolasi secara sempurna satu per satu tanpa campur aduk."
  - *Salah:* "Cek kembali penempatan saksi: $S_1$ di $R_D$, $S_4$ di $R_B$, $S_2$ di $R_A$, dan sisanya $S_3$ di $R_C$."

---

### [ID: CH5-STAGE-14] Formasi Pengawalan VVIP: Menghitung Nilai $5!$
- **Materi:** Perhitungan Faktorial untuk $n = 5$
- **Indikator:** Diberikan $n = 5$, siswa dapat menghitung banyak korespondensi satu-satu yaitu $5! = 120$.
- **Bentuk Interaksi:** HITUNG JUMLAH KEMUNGKINAN
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Lima orang agen pengawal elit $\{P_1, P_2, P_3, P_4, P_5\}$ akan menempati 5 posisi kendaraan pengawal iring-iringan presiden $\{\text{Mobil Depan, Mobil Kiri, Mobil Kanan, Mobil Belakang, Mobil Cadangan}\}$.
  Berapa banyak kemungkinan variasi susunan pengawalan yang dapat dibentuk ($5!$)?
- **Spesifikasi Programmer:**
  - *Komponen:* Ilustrasi konvoi mobil kepresidenan dan input angka.
- **Pilihan Jawaban:** Input angka (atau pilihan ganda: 120, 60, 24, 720).
- **Kunci:** `120`
- **Pembahasan:**
  Banyaknya susunan korespondensi satu-satu untuk $n = 5$:
  $$5! = 5 \times 4 \times 3 \times 2 \times 1$$
  $$5 \times 4 = 20$$
  $$20 \times 3 = 60$$
  $$60 \times 2 = 120$$
  $$120 \times 1 = 120\text{ kemungkinan}$$
- **Feedback:**
  - *Benar:* "Luar biasa! $5! = 120$ susunan pengawalan berbeda. Angka faktorial bertambah cepat seiring bertambahnya anggota!"
  - *Salah:* "Hitung perkalian mundur: $5 \times 4 = 20$, lalu $20 \times 3 = 60$, lalu $60 \times 2 = 120$."

---

### [ID: CH5-STAGE-15] Jalur Radar Bolak-Balik: Konsep Relasi Invers
- **Materi:** Sifat Simetris dan Fungsi Invers pada Korespondensi Satu-Satu
- **Indikator:** Siswa dapat memahami bahwa jika $f: A \rightarrow B$ adalah korespondensi satu-satu, maka relasi kebalikannya $f^{-1}: B \rightarrow A$ PASTI juga merupakan fungsi sah.
- **Bentuk Interaksi:** HUBUNGKAN PASANGAN (Arah Balikan / Invers)
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Detektif Data menemukan transmisi dua arah:
  - Garis Maju ($A \rightarrow B$): Agen 1 $\rightarrow$ Radar Alpha; Agen 2 $\rightarrow$ Radar Beta; Agen 3 $\rightarrow$ Radar Gamma.
  Sekarang ujilah arah baliknya ($B \rightarrow A$): Hubungkan kembali setiap stasiun radar di B ke agen pemiliknya di A!
  Apakah relasi balikan ($B \rightarrow A$) ini juga memenuhi syarat sebagai fungsi yang sah?
- **Spesifikasi Programmer:**
  - *Komponen:* Tali penghubung interaktif yang arah panahnya dapat dibalik dari kanan (B) ke kiri (A).
  - *Pertanyaan Evaluasi:* Tombol pilihan [YA, MERUPAKAN FUNGSI] / [BUKAN FUNGSI].
- **Pilihan Jawaban:**
  A. Ya, relasi balikan dari korespondensi satu-satu selalu merupakan fungsi yang sah (fungsi invers)  
  B. Tidak, relasi balikan tidak pernah bisa menjadi fungsi  
  C. Hanya fungsi jika jumlah anggotanya genap  
- **Kunci:** A. Ya, relasi balikan dari korespondensi satu-satu selalu merupakan fungsi yang sah (fungsi invers)
- **Pembahasan:**
  Keistimewaan utama korespondensi satu-satu (fungsi bijektif):
  - Karena setiap elemen B memiliki tepat satu pasangan di A dan tidak ada yang tersisa di B, maka jika arah relasi dibalik ($B \rightarrow A$), setiap elemen B bertindak sebagai domain baru yang memiliki tepat satu pasangan di A.
  - Relasi kebalikan ini disebut **Fungsi Invers ($f^{-1}$)**.
- **Feedback:**
  - *Benar:* "Pemahaman konsep yang sangat mendalam! Hanya fungsi yang berkorespondensi satu-satu yang dijamin memiliki fungsi invers yang sah."
  - *Salah:* "Karena tidak ada anggota B yang mendua atau kosong, saat arah panah dibalik, seluruh syarat fungsi tetap terpenuhi sempurna!"

---

### [ID: CH5-STAGE-16] Notasi Mesin Faktorial: Matching Lambang dan Nilai
- **Materi:** Notasi Faktorial Lengkap ($1!$ s.d. $5!$)
- **Indikator:** Siswa dapat menjodohkan lambang faktorial dengan nilai perhitungannya.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C2 (Memahami)
- **Soal:**
  Jodohkan lambang faktorial di kolom kiri dengan nilai hasil perkaliannya di kolom kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:* $1!$, $2!$, $3!$, $4!$, $5!$
  - *Kolom Kanan:* $1$, $2$, $6$, $24$, $120$
- **Pilihan Jawaban:**
  - $1! \rightarrow 1$
  - $2! \rightarrow 2$
  - $3! \rightarrow 6$
  - $4! \rightarrow 24$
  - $5! \rightarrow 120$
- **Kunci:**
  - `1!` $\leftrightarrow 1$
  - `2!` $\leftrightarrow 2$
  - `3!` $\leftrightarrow 6$
  - `4!` $\leftrightarrow 24$
  - `5!` $\leftrightarrow 120$
- **Pembahasan:**
  - $1! = 1$
  - $2! = 2 \times 1 = 2$
  - $3! = 3 \times 2 \times 1 = 6$
  - $4! = 4 \times 3 \times 2 \times 1 = 24$
  - $5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$
- **Feedback:**
  - *Benar:* "Sempurna! Kamu telah menghafal dan memahami deret nilai faktorial penting dari 1! sampai 5!."
  - *Salah:* "Hitung perkalian mundur berurutan: $3!=6$, $4!=24$, $5!=120$."

---

### [ID: CH5-STAGE-17] Jebakan Fungsi Surjektif: Deteksi Diagram Bukan 1-1
- **Materi:** Membedakan Fungsi Biasa dengan Korespondensi Satu-Satu
- **Indikator:** Siswa dapat menemukan diagram panah yang merupakan fungsi tetapi bukan korespondensi satu-satu.
- **Bentuk Interaksi:** DETEKSI KESALAHAN
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Tersangka mencoba mengelabui penyelidik dengan membuat diagram panah yang sepintas tampak seperti korespondensi satu-satu karena semua anggota terhubung.
  Temukan diagram panah yang **MERUPAKAN FUNGSI TETAPI BUKAN KORESPONDENSI SATU-SATU**!
- **Spesifikasi Programmer:**
  - *Panel 4 Diagram:*
    - Diagram A: $A=\{1, 2, 3\}, B=\{p, q\}$ dengan pasangan $(1, p), (2, q), (3, p)$ [Semua A dan B terpasang, tapi $p$ menerima 2 panah dan $n(A) \neq n(B)$].
    - Diagram B: $A=\{1, 2\}, B=\{p, q\}$ dengan $(1, q), (2, p)$ [1:1 Sah].
    - Diagram C: $A=\{1, 2, 3\}, B=\{p, q, r\}$ dengan $(1, r), (2, p), (3, q)$ [1:1 Sah].
    - Diagram D: $A=\{1\}, B=\{p\}$ dengan $(1, p)$ [1:1 Sah].
- **Pilihan Jawaban:** Klik Diagram A, B, C, atau D.
- **Kunci:** Diagram A
- **Pembahasan:**
  Pada Diagram A:
  - Relasi tersebut merupakan fungsi sah (karena setiap anggota A memiliki tepat 1 panah).
  - Namun, anggota B yaitu '$p$' menerima dua panah (dari 1 dan 3), serta $n(A) = 3 \neq n(B) = 2$.
  Oleh karena itu, Diagram A adalah fungsi tetapi **bukan korespondensi satu-satu**.
- **Feedback:**
  - *Benar:* "Analisis jeli! Diagram A adalah fungsi biasa, tetapi bukan korespondensi satu-satu karena elemen $p$ menerima 2 pasangan."
  - *Salah:* "Perhatikan Diagram A: jumlah anggota di A ada 3 sedangkan di B hanya ada 2. Tidak mungkin terbentuk korespondensi satu-satu."

---

### [ID: CH5-STAGE-18] Aturan "Dua Kali Dari": Puzzle Susunan Angka Matematika
- **Materi:** Korespondensi Satu-Satu Berdasarkan Rumus Relasi Aljabar
- **Indikator:** Diberikan $A = \{1, 2, 3\}$ dan aturan relasi "setengah dari", siswa menyusun pasangan dengan $B = \{2, 4, 6\}$.
- **Bentuk Interaksi:** PUZZLE SUSUNAN
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif Data memiliki himpunan angka $A = \{1, 2, 3\}$ dan himpunan target $B = \{2, 4, 6\}$.
  Aturan relasi yang ditentukan adalah: **"Setengah dari"** (artinya angka di A adalah setengah dari angka di B).
  Susunlah pasangan kartu angka di bawah ini agar membentuk korespondensi satu-satu yang sah secara matematis!
- **Spesifikasi Programmer:**
  - *Komponen:* 3 Slot target:
    - `1 adalah setengah dari [ ? ]`
    - `2 adalah setengah dari [ ? ]`
    - `3 adalah setengah dari [ ? ]`
  - *Pilihan Kartu:* `[ 2 ]`, `[ 4 ]`, `[ 6 ]`.
- **Pilihan Jawaban:**
  - $1 \rightarrow 2$
  - $2 \rightarrow 4$
  - $3 \rightarrow 6$
- **Kunci:** Pasangan: `(1, 2), (2, 4), (3, 6)`
- **Pembahasan:**
  - 1 adalah setengah dari 2 $\implies (1, 2)$
  - 2 adalah setengah dari 4 $\implies (2, 4)$
  - 3 adalah setengah dari 6 $\implies (3, 6)$
  Karena setiap anggota A memiliki tepat 1 kawan di B, dan setiap anggota B memiliki tepat 1 kawan di A tanpa sisa, relasi ini membentuk korespondensi satu-satu yang sah.
- **Feedback:**
  - *Benar:* "Sempurna! Relasi 'setengah dari' antara $\{1, 2, 3\}$ dan $\{2, 4, 6\}$ membentuk korespondensi satu-satu yang bernilai benar."
  - *Salah:* "Cek perhitungannya: $1 \times 2 = 2$, $2 \times 2 = 4$, $3 \times 2 = 6$."

---

### [ID: CH5-STAGE-19] Jebakan Anggota Beda: Hitung Kemungkinan saat $n(P) 
eq n(Q)$
- **Materi:** Banyak Korespondensi Satu-Satu Kasus $n(A) \neq n(B)$
- **Indikator:** Diberikan $n(P) = 5$ dan $n(Q) = 4$, siswa dapat menentukan bahwa banyak korespondensi satu-satu adalah 0.
- **Bentuk Interaksi:** HITUNG JUMLAH KEMUNGKINAN
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sebuah dokumen intelijen rahasia memuat dua himpunan data:
  - Himpunan $P = \{a, b, c, d, e\}$
  - Himpunan $Q = \{1, 2, 3, 4\}$
  Seorang agen magang menduga ada 120 atau 24 kemungkinan korespondensi satu-satu.
  Berapakah banyaknya korespondensi satu-satu yang SEBENARNYA mungkin dibentuk dari himpunan P ke himpunan Q?
- **Spesifikasi Programmer:**
  - *Komponen:* Input angka dengan petunjuk analisis kardinalitas himpunan.
- **Pilihan Jawaban:** Input angka (atau pilihan ganda: 0, 24, 120, 20).
- **Kunci:** `0`
- **Pembahasan:**
  Hitung banyak anggota masing-masing himpunan:
  $$n(P) = 5 \quad \text{dan} \quad n(Q) = 4$$
  Karena $n(P) \neq n(Q)$, maka **tidak ada korespondensi satu-satu yang dapat dibentuk**.
  Banyaknya kemungkinan adalah **0** (nol).
- **Feedback:**
  - *Benar:* "Analisis tajam! Kamu tidak terjebak. Karena $n(P) \neq n(Q)$ ($5 \neq 4$), jumlah korespondensi satu-satu yang mungkin adalah 0!"
  - *Salah:* "Hati-hati! Hitung dulu banyak anggotanya. Karena $n(P)=5$ dan $n(Q)=4$ tidak sama, mustahil membentuk korespondensi satu-satu. Jawabannya adalah 0."

---

### [ID: CH5-STAGE-20] Dekoder Brankas Terakhir: Mini Puzzle Logika Tiga Digit
- **Materi:** Sintesis Nilai Faktorial dan Kasus Khusus Korespondensi 1:1
- **Indikator:** Siswa memecahkan tiga teka-teki logika untuk mendapatkan kode sandi 3 digit: digit pertama dari $1! = 1$, digit kedua dari elemen sisa di kodomain = $0$, dan digit ketiga dari banyak korespondensi $n=4$ dibagi 6 = $24/6 = 4$.
- **Bentuk Interaksi:** MINI PUZZLE (Multi-Clue Cipher)
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Untuk menonaktifkan bom waktu markas lawan, Detektif Data harus memasukkan **KODE FINAL 3 DIGIT**:
  - **Digit Pertama:** Berapakah nilai dari $1!$ (banyak korespondensi 1 anggota ke 1 anggota)?
  - **Digit Kedua:** Berapakah jumlah anggota di kodomain yang BOLEH TIDAK MEMILIKI PASANGAN agar tetap disebut korespondensi satu-satu?
  - **Digit Ketiga:** Nilai dari banyaknya korespondensi $n=4$ anggota dibagi dengan banyaknya korespondensi $n=3$ anggota (yaitu $\frac{4!}{3!}$)?
  Ketikkan kode 3 digit hasil analisismu!
- **Spesifikasi Programmer:**
  - *Visual:* Panel timer digital bom waktu dengan display `[ ? ] [ ? ] [ ? ]`.
  - *Keypad:* Input angka 3 digit.
  - *Animasi Sukses:* Timer berhenti di 00:01 dan lampu hijau `BOM BERHASIL DITETRALISIR` menyala.
- **Pilihan Jawaban:** Input 3 digit angka.
- **Kunci:** `104`
- **Pembahasan:**
  1. Digit Pertama: $1! = 1$.
  2. Digit Kedua: Pada korespondensi satu-satu, tidak boleh ada anggota yang tersisa/kosong, sehingga banyak anggota yang boleh kosong adalah **0**.
  3. Digit Ketiga:
     $$\frac{4!}{3!} = \frac{24}{6} = 4$$
  Maka kode final penjinak bom adalah **104**.
- **Feedback:**
  - *Benar:* "LUAR BIASA! Bom berhasil dijinakkan dengan kode 104! Digit 1 (dari 1!), digit 0 (tidak boleh ada elemen sisa), dan digit 4 (dari 24/6)."
  - *Salah:* "Periksa kembali ketiga petunjuk: Digit 1 = $1! = 1$. Digit 2 = $0$ (harus berpasangan semua). Digit 3 = $\frac{24}{6} = 4$. Kodenya adalah 104."

---

### [ID: CH5-STAGE-21] Sintesis Akhir Detektif: Tiga Pilar Korespondensi Satu-Satu
- **Materi:** Rangkuman dan Sintesis Esensial Korespondensi Satu-Satu
- **Indikator:** Siswa dapat mengevaluasi dan menyimpulkan karakteristik lengkap korespondensi satu-satu (definisi, kardinalitas, dan rumus perhitungan).
- **Bentuk Interaksi:** PILIHAN GANDA (Sintesis Akhir)
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Setelah menuntaskan seluruh investigasi Bab 5, Detektif Data mencatat laporan akhir kasus "Satu Kunci Satu Gembok".
  Manakah pernyataan kesimpulan yang PALING LENGKAP dan BENAR mengenai korespondensi satu-satu?
- **Spesifikasi Programmer:**
  - *Visual:* Sertifikat emas kelulusan Detektif Data dengan ikon gembok dan kunci emas terbuka.
- **Pilihan Jawaban:**
  A. Korespondensi satu-satu adalah fungsi khusus di mana $n(A) = n(B)$, setiap anggota A berpasangan dengan tepat satu anggota B dan sebaliknya tanpa ada yang kosong atau bercabang, dengan total kemungkinan $n!$ cara  
  B. Korespondensi satu-satu memperbolehkan anggota himpunan B tidak berpasangan asalkan seluruh anggota himpunan A berpasangan  
  C. Korespondensi satu-satu dapat terjadi pada dua himpunan dengan jumlah anggota berapapun asalkan hubungannya berupa angka  
  D. Banyaknya korespondensi satu-satu selalu dihitung dengan rumus perpangkatan $n^2$  
- **Kunci:** A. Korespondensi satu-satu adalah fungsi khusus di mana $n(A) = n(B)$, setiap anggota A berpasangan dengan tepat satu anggota B dan sebaliknya tanpa ada yang kosong atau bercabang, dengan total kemungkinan $n!$ cara
- **Pembahasan:**
  Tiga pilar utama korespondensi satu-satu (fungsi bijektif):
  1. **Syarat Kardinalitas:** $n(A) = n(B) = n$.
  2. **Syarat Pemetaan:** Setiap elemen domain punya 1 kawan unik di kodomain, dan setiap elemen kodomain punya 1 kawan unik di domain (injektif dan surjektif sekaligus).
  3. **Rumus Banyak Pemetaan:** $n! = n \times (n-1) \times \dots \times 1$.
- **Feedback:**
  - *Benar:* "SELAMAT, DETEKTIF DATA! Kamu telah menguasai seluruh konsep Relasi dan Fungsi dari Chapter 1 hingga Chapter 5 dengan sempurna!"
  - *Salah:* "Ingat tiga pilar utama: jumlah anggota harus sama ($n(A)=n(B)$), berpasangan 1-lawan-1 tanpa sisa, dan banyaknya kemungkinan adalah $n!$."

---

# BAGIAN II: 30 SOAL LATIHAN & REMEDIAL CHAPTER 5 (VARIASI FORMAT & ANGKA)

---

### [ID: CH5-EX-01] Pengertian Korespondensi Satu-Satu
- **Materi:** Definisi Korespondensi Satu-Satu
- **Indikator:** Siswa dapat menjelaskan pengertian relasi korespondensi satu-satu antara dua himpunan.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C2 (Memahami)
- **Soal:**
  Apakah yang dimaksud dengan korespondensi satu-satu antara himpunan A dan himpunan B?
- **Pilihan Jawaban:**
  A. Relasi di mana setiap anggota A berpasangan dengan tepat satu anggota B, dan setiap anggota B berpasangan dengan tepat satu anggota A  
  B. Relasi di mana anggota A boleh memilih lebih dari satu anggota B asalkan semua B terpasang  
  C. Fungsi di mana semua anggota A berpasangan ke satu anggota B yang sama  
  D. Relasi yang hanya berlaku untuk himpunan bilangan bulat positif  
- **Kunci:** A. Relasi di mana setiap anggota A berpasangan dengan tepat satu anggota B, dan setiap anggota B berpasangan dengan tepat satu anggota A
- **Pembahasan:**
  Korespondensi satu-satu adalah pemetaan timbal balik yang sempurna: setiap anggota asal memiliki tepat 1 kawan, dan setiap anggota kawan juga memiliki tepat 1 kawan di asal tanpa ada yang kosong dan tanpa ada cabang di kedua belah pihak.
- **Feedback:**
  - *Benar:* "Tepat sekali! Hubungannya bersifat eksklusif 1-lawan-1 secara timbal balik tanpa ada anggota sisa."
  - *Salah:* "Korespondensi satu-satu mengharuskan setiap anggota kedua himpunan berpasangan tepat satu secara timbal balik."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Ciri utama dari relasi korespondensi satu-satu adalah...
  - *Pilihan Jawaban:* A. Setiap anggota domain dan kodomain berpasangan tepat satu secara timbal balik | B. Domain boleh bercabang | C. Kodomain boleh kosong
  - *Kunci:* A. Setiap anggota domain dan kodomain berpasangan tepat satu secara timbal balik
  - *Pembahasan:* Tidak ada cabang dan tidak ada sisa di kedua himpunan.

---

### [ID: CH5-EX-02] Syarat Mutlak $n(A) = n(B)$
- **Materi:** Syarat Kardinalitas Himpunan
- **Indikator:** Siswa memvalidasi pernyataan bahwa korespondensi satu-satu mewajibkan $n(A) = n(B)$.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Korespondensi satu-satu hanya mungkin terjadi jika banyak anggota himpunan A persis sama dengan banyak anggota himpunan B ($n(A) = n(B)$)."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Ini adalah syarat mutlak yang paling fundamental. Jika jumlah anggotanya berbeda, pasti ada anggota yang tidak kebagian pasangan atau ada anggota yang terpaksa bercabang. Pernyataan bernilai benar.
- **Feedback:**
  - *Benar:* "Benar! Jika $n(A) \neq n(B)$, mustahil terjadi korespondensi satu-satu."
  - *Salah:* "Pernyataan ini bernilai BENAR. Syarat pertama dan utama korespondensi 1-1 adalah $n(A) = n(B)$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Himpunan beranggotakan 4 elemen dapat membentuk korespondensi satu-satu dengan himpunan beranggotakan 5 elemen.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* B. Salah
  - *Pembahasan:* Karena $4 \neq 5$, pasti ada elemen yang tidak kebagian pasangan.

---

### [ID: CH5-EX-03] Menghitung Banyak Korespondensi ($3!$)
- **Materi:** Rumus Banyak Korespondensi untuk $n = 3$
- **Indikator:** Diberikan $A = \{1, 2, 3\}$ dan $B = \{a, b, c\}$, siswa dapat menghitung banyak korespondensi yang mungkin.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui himpunan $A = \{1, 2, 3\}$ dan $B = \{a, b, c\}$. Banyaknya korespondensi satu-satu yang mungkin terbentuk dari A ke B adalah...
- **Pilihan Jawaban:**
  A. $6$  
  B. $9$  
  C. $8$  
  D. $3$  
- **Kunci:** A. $6$
- **Pembahasan:**
  Karena $n(A) = n(B) = 3$, maka banyaknya korespondensi satu-satu adalah:
  $$n! = 3! = 3 \times 2 \times 1 = 6\text{ kemungkinan}$$
- **Feedback:**
  - *Benar:* "Hebat! Rumusnya adalah $3! = 3 \times 2 \times 1 = 6$."
  - *Salah:* "Gunakan rumus faktorial $n!$, bukan perpangkatan. $3! = 3 \times 2 \times 1 = 6$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jika $n(P) = n(Q) = 3$, berapakah banyak kemungkinan korespondensi satu-satu yang dapat dibentuk?
  - *Pilihan Jawaban:* A. $6$ | B. $9$ | C. $8$ | D. $12$
  - *Kunci:* A. $6$
  - *Pembahasan:* $3! = 6$.

---

### [ID: CH5-EX-04] Menghitung Nilai $4!$
- **Materi:** Perhitungan Faktorial untuk $n = 4$
- **Indikator:** Siswa dapat menghitung banyak korespondensi satu-satu dari dua himpunan dengan 4 anggota.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Berapakah banyak korespondensi satu-satu yang mungkin dari dua himpunan yang masing-masing memiliki 4 anggota ($4!$)?
- **Pilihan Jawaban:**
  A. $24$  
  B. $16$  
  C. $12$  
  D. $64$  
- **Kunci:** A. $24$
- **Pembahasan:**
  $$4! = 4 \times 3 \times 2 \times 1 = 24\text{ cara}$$
- **Feedback:**
  - *Benar:* "Luar biasa! $4! = 4 \times 3 \times 2 \times 1 = 24$."
  - *Salah:* "Hitung perkalian mundur: $4 \times 3 = 12$, lalu $12 \times 2 = 24$, lalu $24 \times 1 = 24$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Berapakah hasil perhitungan dari $4!$ (4 faktorial)?
  - *Pilihan Jawaban:* A. $24$ | B. $16$ | C. $20$ | D. $8$
  - *Kunci:* A. $24$
  - *Pembahasan:* $4 \times 3 \times 2 \times 1 = 24$.

---

### [ID: CH5-EX-05] Menguji Pasangan Korespondensi Satu-Satu
- **Materi:** Validasi Himpunan Pasangan Berurutan
- **Indikator:** Siswa memvalidasi apakah $\{(1, a), (2, b), (3, a)\}$ merupakan korespondensi satu-satu.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Pernyataan: *"Himpunan pasangan berurutan $\{(1, a), (2, b), (3, a)\}$ merupakan korespondensi satu-satu."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** B. Salah
- **Pembahasan:**
  Pernyataan bernilai SALAH karena anggota kodomain '$a$' dipasangkan dua kali (dengan 1 dan dengan 3). Pada korespondensi satu-satu, anggota kodomain tidak boleh dipilih berulang.
- **Feedback:**
  - *Benar:* "Tepat! Huruf '$a$' muncul dua kali pada posisi belakang, sehingga bukan korespondensi satu-satu."
  - *Salah:* "Pernyataan ini SALAH. Huruf '$a$' berulang dua kali, melanggar syarat satu-lawan-satu."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Himpunan pasangan $\{(1, x), (2, y), (3, z)\}$ merupakan korespondensi satu-satu yang sah.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* A. Benar
  - *Pembahasan:* Semua anggota depan dan belakang berbeda dan berpasangan tunggal.

---

### [ID: CH5-EX-06] Menjodohkan Nilai Faktorial
- **Materi:** Nilai Operasi Faktorial
- **Indikator:** Siswa menjodohkan lambang $2!, 3!, 4!$ dengan nilainya.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C2 (Memahami)
- **Soal:**
  Jodohkan lambang faktorial di sebelah kiri dengan nilai perhitungannya yang tepat di kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:* $2!$, $3!$, $4!$
  - *Kolom Kanan:* $2$, $6$, $24$, $120$ [Distraktor]
- **Pilihan Jawaban:**
  - $2! \rightarrow 2$
  - $3! \rightarrow 6$
  - $4! \rightarrow 24$
- **Kunci:**
  - `2!` $\leftrightarrow 2$
  - `3!` $\leftrightarrow 6$
  - `4!` $\leftrightarrow 24$
- **Pembahasan:**
  - $2! = 2 \times 1 = 2$
  - $3! = 3 \times 2 \times 1 = 6$
  - $4! = 4 \times 3 \times 2 \times 1 = 24$
- **Feedback:**
  - *Benar:* "Sempurna! Kamu memahami perhitungan dasar faktorial."
  - *Salah:* "Faktorial $n!$ adalah perkalian mundur dari $n$ sampai 1."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jodohkan faktorial dengan hasilnya!
  - *Pasangan:* $1! \leftrightarrow 1$, $2! \leftrightarrow 2$, $3! \leftrightarrow 6$.
  - *Kunci:* $1!=1, 2!=2, 3!=6$.
  - *Pembahasan:* Perkalian mundur sederhana.

---

### [ID: CH5-EX-07] Syarat Jumlah Pasangan Berurutan
- **Materi:** Kardinalitas Himpunan Pasangan Berurutan
- **Indikator:** Siswa dapat menentukan banyak pasangan berurutan yang terbentuk pada korespondensi satu-satu dari himpunan beranggotakan 5 elemen.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C2 (Memahami)
- **Soal:**
  Jika himpunan A dan himpunan B masing-masing memiliki 5 anggota dan dihubungkan secara korespondensi satu-satu, maka dalam setiap himpunan pasangan berurutannya PASTI terdapat tepat...
- **Pilihan Jawaban:**
  A. 5 pasangan berurutan  
  B. 25 pasangan berurutan  
  C. 120 pasangan berurutan  
  D. 10 pasangan berurutan  
- **Kunci:** A. 5 pasangan berurutan
- **Pembahasan:**
  Dalam satu relasi korespondensi satu-satu, karena setiap anggota A berpasangan tepat satu kali dengan anggota B, maka jumlah pasangan berurutan $(a, b)$ yang terbentuk selalu sama dengan jumlah anggota himpunan, yaitu $n = 5$ pasangan. (120 adalah banyak kemungkinan fungsi yang bisa dibuat, bukan jumlah pasangan dalam satu fungsi).
- **Feedback:**
  - *Benar:* "Akurat! Karena ada 5 anggota di A dan masing-masing punya 1 kawan, pasti terbentuk tepat 5 pasangan berurutan."
  - *Salah:* "Jangan tertukar: 120 adalah banyaknya *variasi fungsi* yang bisa dibuat. Namun dalam *satu fungsi*, jumlah pasangannya tetap 5."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pada korespondensi satu-satu antara himpunan beranggotakan 4 elemen, berapa banyak pasangan berurutan $(x, y)$ dalam satu himpunan penyelesaian?
  - *Pilihan Jawaban:* A. 4 pasangan | B. 16 pasangan | C. 24 pasangan
  - *Kunci:* A. 4 pasangan
  - *Pembahasan:* Setiap anggota memiliki 1 pasangan, jadi total ada 4 pasangan.

---

### [ID: CH5-EX-08] Contoh Nyata Korespondensi Satu-Satu
- **Materi:** Identifikasi Relasi 1:1 Kontekstual
- **Indikator:** Siswa dapat memilih contoh relasi yang merupakan korespondensi satu-satu di dunia nyata.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C2 (Memahami)
- **Soal:**
  Manakah relasi di bawah ini yang merupakan KORESPONDENSI SATU-SATU dalam kehidupan sehari-hari?
- **Pilihan Jawaban:**
  A. Relasi antara setiap siswa dengan nomor induk siswa nasional (NISN)  
  B. Relasi antara setiap orang dengan warna baju yang disukainya  
  C. Relasi antara setiap ibu dengan anak-anak kandungnya  
  D. Relasi antara pembeli dengan barang yang dibeli di minimarket  
- **Kunci:** A. Relasi antara setiap siswa dengan nomor induk siswa nasional (NISN)
- **Pembahasan:**
  - Satu siswa hanya memiliki tepat 1 NISN, dan 1 NISN hanya dimiliki oleh 1 siswa (bersifat eksklusif 1-ke-1).
  - Pilihan lain bukan korespondensi 1-1 karena 1 orang bisa menyukai banyak warna atau 1 ibu bisa memiliki lebih dari 1 anak.
- **Feedback:**
  - *Benar:* "Tepat! NISN bersifat unik dan eksklusif untuk setiap siswa."
  - *Salah:* "Pilih relasi di mana satu pihak hanya punya satu pasangan dan tidak boleh dipakai bersama."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Manakah relasi yang merupakan korespondensi satu-satu?
  - *Pilihan Jawaban:* A. Setiap negara dengan lagu kebangsaan resminya | B. Setiap orang dengan hobi | C. Setiap guru dengan murid-muridnya
  - *Kunci:* A. Setiap negara dengan lagu kebangsaan resminya
  - *Pembahasan:* 1 negara memiliki 1 lagu kebangsaan unik.

---

### [ID: CH5-EX-09] Menghitung Nilai $5!$
- **Materi:** Perhitungan Banyak Korespondensi untuk $n = 5$
- **Indikator:** Diberikan $n(A) = n(B) = 5$, siswa dapat menghitung banyak korespondensi satu-satu yang mungkin dibentuk.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Banyaknya kemungkinan korespondensi satu-satu yang dapat dibuat dari himpunan $P = \{1, 2, 3, 4, 5\}$ ke himpunan $Q = \{a, b, c, d, e\}$ adalah...
- **Pilihan Jawaban:**
  A. $120$  
  B. $25$  
  C. $60$  
  D. $720$  
- **Kunci:** A. $120$
- **Pembahasan:**
  $$n = 5 \implies 5! = 5 \times 4 \times 3 \times 2 \times 1 = 120\text{ cara}$$
- **Feedback:**
  - *Benar:* "Bagus sekali! $5! = 120$ kemungkinan pemetaan."
  - *Salah:* "Hitung $5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jika $n(K) = n(L) = 5$, berapa banyak korespondensi satu-satu yang dapat dibentuk?
  - *Pilihan Jawaban:* A. $120$ | B. $25$ | C. $24$ | D. $50$
  - *Kunci:* A. $120$
  - *Pembahasan:* $5! = 120$.

---

### [ID: CH5-EX-10] Bukan Korespondensi Jika $n(A) 
eq n(B)$
- **Materi:** Evaluasi Kardinalitas Berbeda
- **Indikator:** Siswa memvalidasi bahwa jika $n(A) = 3$ dan $n(B) = 4$, korespondensi satu-satu tidak dapat terbentuk.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Jika himpunan A memiliki 3 anggota dan himpunan B memiliki 4 anggota, maka mustahil dibentuk korespondensi satu-satu dari A ke B."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai BENAR. Syarat mutlak korespondensi satu-satu adalah $n(A) = n(B)$. Jika $n(A) = 3$ dan $n(B) = 4$, pasti ada 1 anggota di B yang tidak memiliki kawan di A.
- **Feedback:**
  - *Benar:* "Tepat! Karena anggotanya tidak sama banyak, pasti ada anggota yang tertinggal."
  - *Salah:* "Pernyataan ini bernilai BENAR. Syarat mutlak korespondensi 1-1 adalah $n(A) = n(B)$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Antara himpunan beranggotakan 2 elemen dengan 3 elemen dapat dibentuk korespondensi satu-satu.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* B. Salah
  - *Pembahasan:* Karena $2 \neq 3$, mustahil membentuk korespondensi satu-satu.

---

### [ID: CH5-EX-11] Karakteristik Lengkap Korespondensi Satu-Satu
- **Materi:** Sifat-Sifat Fungsi Bijektif
- **Indikator:** Siswa dapat memilih semua pernyataan yang benar mengenai korespondensi satu-satu.
- **Bentuk Interaksi:** MCQ_COMPLEX
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Manakah pernyataan di bawah ini yang BENAR mengenai korespondensi satu-satu? *(Pilih semua yang benar)*
- **Pilihan Jawaban:**
  A. Jumlah anggota daerah asal dan daerah kawan harus persis sama ($n(A) = n(B)$)  
  B. Setiap anggota daerah asal berpasangan dengan tepat satu anggota daerah kawan  
  C. Tidak boleh ada anggota daerah kawan yang kosong (tidak berpasangan)  
  D. Boleh ada anggota daerah asal yang memiliki dua kawan asalkan di daerah kawan habis  
- **Kunci:** Pilihan A, B, dan C
- **Pembahasan:**
  - A BENAR: Syarat mutlak $n(A) = n(B)$.
  - B BENAR: Syarat fungsi (tidak boleh bercabang di asal).
  - C BENAR: Syarat surjektif (semua kodomain terpasang habis / range = kodomain).
  - D SALAH: Anggota asal tidak boleh bercabang (harus tepat satu kawan).
- **Feedback:**
  - *Benar:* "Luar biasa! Korespondensi satu-satu adalah fungsi bijektif yang memenuhi A, B, dan C."
  - *Salah:* "Periksa opsi D: pada fungsi dan korespondensi satu-satu, anggota asal tidak boleh memiliki lebih dari satu kawan."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Manakah sifat korespondensi satu-satu? (Pilih semua yang benar)
  - *Pilihan Jawaban:* A. $n(A) = n(B)$ | B. Tidak ada anggota kosong di kodomain | C. Anggota domain boleh bercabang
  - *Kunci:* A dan B
  - *Pembahasan:* Domain tidak boleh bercabang.

---

### [ID: CH5-EX-12] Menentukan Nilai $n$ dari Banyak Korespondensi
- **Materi:** Menemukan Jumlah Anggota dari Nilai Faktorial
- **Indikator:** Diberikan banyak korespondensi = 24 cara, siswa dapat menentukan banyak anggota himpunan $n = 4$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Jika banyaknya korespondensi satu-satu yang mungkin dibentuk antara himpunan A dan himpunan B adalah 24 cara, maka banyaknya anggota himpunan A adalah...
- **Pilihan Jawaban:**
  A. $4$ anggota  
  B. $3$ anggota  
  C. $5$ anggota  
  D. $6$ anggota  
- **Kunci:** A. $4$ anggota
- **Pembahasan:**
  Rumus banyaknya korespondensi adalah $n! = 24$.
  Kita cari nilai $n$:
  - $1! = 1$
  - $2! = 2$
  - $3! = 6$
  - $4! = 4 \times 3 \times 2 \times 1 = 24$
  Maka nilai $n = 4$. Himpunan A memiliki 4 anggota.
- **Feedback:**
  - *Benar:* "Hebat! Karena $4! = 24$, maka jumlah anggotanya adalah 4."
  - *Salah:* "Cari nilai $n$ sehingga $n! = 24$. Uji perkalian: $4 \times 3 \times 2 \times 1 = 24$, jadi $n = 4$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jika banyak korespondensi satu-satu adalah 6 cara, berapakah banyak anggota himpunan tersebut?
  - *Pilihan Jawaban:* A. $3$ | B. $2$ | C. $4$ | D. $6$
  - *Kunci:* A. $3$
  - *Pembahasan:* $3! = 3 \times 2 \times 1 = 6 \implies n = 3$.

---

### [ID: CH5-EX-13] Pasangan Berurutan Korespondensi Sah
- **Materi:** Memilih Himpunan Pasangan Berurutan 1:1
- **Indikator:** Siswa dapat memilih himpunan pasangan berurutan yang merupakan korespondensi satu-satu.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Di antara himpunan pasangan berurutan berikut, manakah yang merupakan KORESPONDENSI SATU-SATU?
- **Pilihan Jawaban:**
  A. $\{(a, 1), (b, 2), (c, 3)\}$  
  B. $\{(a, 1), (b, 1), (c, 1)\}$  
  C. $\{(a, 1), (b, 2), (a, 3)\}$  
  D. $\{(a, 1), (b, 2), (c, 2)\}$  
- **Kunci:** A. $\{(a, 1), (b, 2), (c, 3)\}$
- **Pembahasan:**
  - Opsi A: elemen depan $\{a, b, c\}$ semua berbeda, elemen belakang $\{1, 2, 3\}$ semua berbeda $\implies$ Korespondensi satu-satu sah.
  - Opsi B: elemen belakang hanya '1' (bercabang di kawan).
  - Opsi C: elemen depan 'a' muncul dua kali (bukan fungsi).
  - Opsi D: elemen belakang '2' muncul dua kali (bukan 1:1).
- **Feedback:**
  - *Benar:* "Tepat! Pada opsi A, seluruh elemen depan dan belakang berpasangan unik 1-lawan-1."
  - *Salah:* "Cari opsi di mana tidak ada elemen depan yang berulang dan tidak ada elemen belakang yang berulang."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Manakah pasangan yang merupakan korespondensi satu-satu?
  - *Pilihan Jawaban:* A. $\{(p, 4), (q, 5), (r, 6)\}$ | B. $\{(p, 4), (q, 4), (r, 5)\}$ | C. $\{(p, 4), (p, 5), (r, 6)\}$
  - *Kunci:* A. $\{(p, 4), (q, 5), (r, 6)\}$
  - *Pembahasan:* Semua elemen domain dan kodomain unik.

---

### [ID: CH5-EX-14] Menghubungkan Pasangan Bilangan Kuadrat
- **Materi:** Pemetaan Bijektif Relasi Kuadrat
- **Indikator:** Diberikan $A = \{2, 3, 4\}$ dan $B = \{4, 9, 16\}$ dengan aturan "kuadrat dari", siswa menghubungkan pasangan yang sesuai.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Hubungkan setiap anggota himpunan $A = \{2, 3, 4\}$ dengan pasangannya pada $B = \{4, 9, 16\}$ berdasarkan aturan relasi **"Kuadrat dari"** ($a^2 = b$)!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:* $2$, $3$, $4$
  - *Kolom Kanan:* $4$, $9$, $16$
- **Pilihan Jawaban:**
  - $2 \rightarrow 4$
  - $3 \rightarrow 9$
  - $4 \rightarrow 16$
- **Kunci:**
  - `2` $\leftrightarrow 4$
  - `3` $\leftrightarrow 9$
  - `4` $\leftrightarrow 16$
- **Pembahasan:**
  - $2^2 = 4 \implies (2, 4)$
  - $3^2 = 9 \implies (3, 9)$
  - $4^2 = 16 \implies (4, 16)$
  Relasi ini membentuk korespondensi satu-satu sempurna.
- **Feedback:**
  - *Benar:* "Sangat tepat! $2^2=4$, $3^2=9$, dan $4^2=16$."
  - *Salah:* "Kalikan masing-masing angka di A dengan dirinya sendiri: $2 \times 2 = 4$, $3 \times 3 = 9$, $4 \times 4 = 16$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Hubungkan $A = \{1, 5\}$ ke $B = \{1, 25\}$ dengan aturan kuadrat!
  - *Kunci:* $1 \rightarrow 1$, $5 \rightarrow 25$.
  - *Pembahasan:* $1^2=1, 5^2=25$.

---

### [ID: CH5-EX-15] Korespondensi Himpunan Beranggotakan 1 Elemen
- **Materi:** Kasus Khusus $n = 1$
- **Indikator:** Siswa dapat menentukan banyak korespondensi satu-satu jika $n(A) = n(B) = 1$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C2 (Memahami)
- **Soal:**
  Jika himpunan A dan B masing-masing hanya memiliki 1 anggota ($n = 1$), berapakah banyak kemungkinan korespondensi satu-satu yang dapat dibentuk?
- **Pilihan Jawaban:**
  A. $1$ cara  
  B. $0$ cara  
  C. $2$ cara  
  D. Tak hingga  
- **Kunci:** A. $1$ cara
- **Pembahasan:**
  $$1! = 1\text{ cara}$$
  Hanya ada tepat 1 cara, yaitu satu-satunya anggota A dipasangkan ke satu-satunya anggota B.
- **Feedback:**
  - *Benar:* "Tepat! $1! = 1$, hanya ada satu cara pemetaan."
  - *Salah:* "Untuk $n = 1$, nilainya adalah $1! = 1$ cara."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Berapakah nilai dari $1!$?
  - *Pilihan Jawaban:* A. $1$ | B. $0$ | C. $2$
  - *Kunci:* A. $1$
  - *Pembahasan:* $1! = 1$.

---

### [ID: CH5-EX-16] Hubungan Dua Arah (Fungsi Bijektif)
- **Materi:** Konsep Fungsi Injektif dan Surjektif Sekaligus
- **Indikator:** Siswa memvalidasi bahwa korespondensi satu-satu disebut juga sebagai fungsi bijektif.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Dalam istilah matematika tingkat lanjut, korespondensi satu-satu disebut juga sebagai fungsi bijektif (perpaduan antara fungsi injektif/satu-satu dan surjektif/pada)."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai BENAR. Fungsi bijektif adalah fungsi yang memenuhi dua sifat sekaligus:
  1. Injektif (setiap anggota kodomain menerima maksimal satu kawan).
  2. Surjektif (seluruh anggota kodomain terpasang habis / daerah hasil = daerah kawan).
- **Feedback:**
  - *Benar:* "Benar! Korespondensi satu-satu = fungsi bijektif."
  - *Salah:* "Pernyataan ini bernilai BENAR. Bijektif adalah istilah matematis untuk korespondensi satu-satu."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Fungsi bijektif sama artinya dengan relasi korespondensi satu-satu.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* A. Benar
  - *Pembahasan:* Keduanya adalah istilah yang merujuk pada konsep yang sama.

---

### [ID: CH5-EX-17] Perbedaan Rumus Pemetaan dan Korespondensi
- **Materi:** Membandingkan Rumus Pemetaan ($n(B)^{n(A)}$) dengan Korespondensi ($n!$)
- **Indikator:** Diberikan $n(A) = n(B) = 3$, siswa dapat membedakan banyak fungsi biasa ($3^3 = 27$) dengan banyak korespondensi satu-satu ($3! = 6$).
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui $n(A) = 3$ dan $n(B) = 3$. Berapakah selisih antara banyaknya fungsi biasa dari A ke B dengan banyaknya korespondensi satu-satu dari A ke B?
- **Pilihan Jawaban:**
  A. $21$  
  B. $27$  
  C. $6$  
  D. $9$  
- **Kunci:** A. $21$
- **Pembahasan:**
  1. Banyak fungsi biasa dari A ke B:
     $$n(B)^{n(A)} = 3^3 = 27\text{ cara}$$
  2. Banyak korespondensi satu-satu:
     $$n! = 3! = 3 \times 2 \times 1 = 6\text{ cara}$$
  3. Selisih:
     $$27 - 6 = 21$$
- **Feedback:**
  - *Benar:* "Analisis tingkat tinggi! Fungsi biasa bernilai $3^3 = 27$, sedangkan korespondensi satu-satu bernilai $3! = 6$. Selisihnya adalah 21."
  - *Salah:* "Hitung banyak fungsi biasa: $3^3 = 27$. Hitung korespondensi 1-1: $3! = 6$. Kurangkan: $27 - 6 = 21$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jika $n(A)=2$ dan $n(B)=2$, berapa selisih banyak fungsi biasa ($2^2=4$) dengan banyak korespondensi ($2!=2$)?
  - *Pilihan Jawaban:* A. $2$ | B. $4$ | C. $0$
  - *Kunci:* A. $2$
  - *Pembahasan:* $4 - 2 = 2$.

---

### [ID: CH5-EX-18] Menjodohkan Himpunan dan Nilai Faktorialnya
- **Materi:** Perhitungan Banyak Korespondensi Berdasarkan Jumlah Anggota
- **Indikator:** Siswa menjodohkan himpunan dengan jumlah anggota $n=2, 3, 4$ ke banyak korespondensi 1:1.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Jodohkan pasangan himpunan di sebelah kiri dengan banyak korespondensi satu-satu yang mungkin dibentuk di sebelah kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:*
    1. $A=\{1, 2\}$ dan $B=\{x, y\}$
    2. $C=\{a, b, c\}$ dan $D=\{1, 2, 3\}$
    3. $E=\{p, q, r, s\}$ dan $F=\{w, x, y, z\}$
  - *Kolom Kanan:*
    - 2 cara
    - 6 cara
    - 24 cara
    - 120 cara [Distraktor]
- **Pilihan Jawaban:**
  - Pasangan 1 $\rightarrow$ 2 cara
  - Pasangan 2 $\rightarrow$ 6 cara
  - Pasangan 3 $\rightarrow$ 24 cara
- **Kunci:**
  - Pasangan 1 ($n=2$) $\leftrightarrow 2\text{ cara}$
  - Pasangan 2 ($n=3$) $\leftrightarrow 6\text{ cara}$
  - Pasangan 3 ($n=4$) $\leftrightarrow 24\text{ cara}$
- **Pembahasan:**
  - $n=2 \implies 2! = 2$
  - $n=3 \implies 3! = 6$
  - $n=4 \implies 4! = 24$
- **Feedback:**
  - *Benar:* "Sempurna! Kamu menguasai perhitungan faktorial untuk berbagai jumlah anggota himpunan."
  - *Salah:* "Hitung jumlah anggota masing-masing pasangan, lalu terapkan rumus $n!$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jodohkan jumlah anggota dengan banyak kemungkinan!
  - *Pasangan:* $n=3 \leftrightarrow 6$, $n=4 \leftrightarrow 24$.
  - *Kunci:* $3 \rightarrow 6, 4 \rightarrow 24$.
  - *Pembahasan:* $3!=6, 4!=24$.

---

### [ID: CH5-EX-19] Alasan Kodomain Tidak Boleh Kosong
- **Materi:** Syarat Surjektif pada Korespondensi Satu-Satu
- **Indikator:** Siswa dapat menjelaskan alasan mengapa pada korespondensi satu-satu tidak boleh ada anggota kodomain yang kosong.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Mengapa pada relasi korespondensi satu-satu, anggota himpunan kodomain (kawan) TIDAK BOLEH ada yang kosong (tidak memiliki pasangan)?
- **Pilihan Jawaban:**
  A. Karena jika ada anggota kodomain yang kosong, maka ketika relasi dibalik arahnya, relasi kebalikannya tidak akan memenuhi syarat fungsi  
  B. Karena kodomain harus selalu berisi angka genap  
  C. Karena garis panah tidak boleh menyilang  
  D. Karena jumlah anggota kodomain selalu lebih sedikit daripada domain  
- **Kunci:** A. Karena jika ada anggota kodomain yang kosong, maka ketika relasi dibalik arahnya, relasi kebalikannya tidak akan memenuhi syarat fungsi
- **Pembahasan:**
  Korespondensi satu-satu menuntut hubungan timbal balik yang simetris:
  - Setiap $a \in A$ punya 1 pasangan di $B$.
  - Setiap $b \in B$ punya 1 pasangan di $A$.
  Jika ada anggota $B$ yang kosong, maka hubungan dari $B$ ke $A$ tidak bisa disebut fungsi (karena ada anggota domain baru yang tidak memiliki kawan).
- **Feedback:**
  - *Benar:* "Analisis konsep yang hebat! Korespondensi satu-satu harus bisa dibalik bolak-balik sebagai fungsi yang sah."
  - *Salah:* "Ingat konsep fungsi invers: jika di kodomain ada yang kosong, maka saat dibalik akan ada anggota yang tidak punya pasangan."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pada korespondensi satu-satu, daerah hasil (range) selalu...
  - *Pilihan Jawaban:* A. Sama persis dengan seluruh anggota kodomain | B. Lebih kecil dari kodomain | C. Hanya memuat satu anggota
  - *Kunci:* A. Sama persis dengan seluruh anggota kodomain
  - *Pembahasan:* Semua anggota kodomain wajib terpasang habis (range = kodomain).

---

### [ID: CH5-EX-20] Uji Korespondensi Satu-Satu pada Grafik Cartesius
- **Materi:** Horizontal Line Test pada Grafik Cartesius
- **Indikator:** Siswa dapat memahami bahwa grafik fungsi linear $f(x) = 2x + 1$ merupakan korespondensi satu-satu.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Pernyataan: *"Grafik fungsi linear $f(x) = 2x + 1$ dengan daerah asal seluruh bilangan real merupakan contoh korespondensi satu-satu, karena setiap nilai $x$ menghasilkan tepat satu $y$ dan setiap nilai $y$ berasal dari tepat satu nilai $x$."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai BENAR. Garis lurus dengan kemiringan bukan nol ($m \neq 0$) lolos uji garis vertikal (*Vertical Line Test*) dan lolos uji garis horizontal (*Horizontal Line Test*), sehingga merupakan pemetaan bijektif (korespondensi satu-satu) dari himpunan bilangan real ke bilangan real.
- **Feedback:**
  - *Benar:* "Luar biasa! Kamu mengaitkan konsep fungsi linear Chapter 4 dengan korespondensi satu-satu Chapter 5!"
  - *Salah:* "Pernyataan ini bernilai BENAR. Setiap satu nilai $x$ tepat menghasilkan satu nilai $y$, dan setiap $y$ memiliki tepat satu $x$ asal."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Fungsi $f(x) = 3x$ adalah korespondensi satu-satu pada himpunan bilangan real.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* A. Benar
  - *Pembahasan:* Memenuhi sifat bijektif 1-ke-1.

---

### [ID: CH5-EX-21] Menghitung Nilai Faktorial $6!$
- **Materi:** Perhitungan Lanjutan $6!$
- **Indikator:** Siswa dapat menghitung nilai faktorial $6! = 720$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Berapakah banyaknya korespondensi satu-satu yang mungkin dari dua himpunan yang masing-masing memiliki 6 anggota ($6!$)?
- **Pilihan Jawaban:**
  A. $720$  
  B. $120$  
  C. $36$  
  D. $64$  
- **Kunci:** A. $720$
- **Pembahasan:**
  $$6! = 6 \times 5 \times 4 \times 3 \times 2 \times 1 = 6 \times 120 = 720\text{ kemungkinan}$$
- **Feedback:**
  - *Benar:* "Akurat! $6! = 6 \times 120 = 720$ cara."
  - *Salah:* "Kalikan 6 dengan hasil dari $5!$: $6 \times 120 = 720$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Hitung nilai $6!$:
  - *Pilihan Jawaban:* A. $720$ | B. $120$ | C. $240$
  - *Kunci:* A. $720$
  - *Pembahasan:* $6 \times 5 \times 4 \times 3 \times 2 \times 1 = 720$.

---

### [ID: CH5-EX-22] Menemukan Nilai $n$ Jika $n! = 120$
- **Materi:** Pemecahan Nilai $n$ dari Faktorial
- **Indikator:** Diberikan banyak korespondensi 120, siswa menentukan banyak anggota $n = 5$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Dua himpunan A dan B dapat membentuk 120 kemungkinan korespondensi satu-satu. Berapakah banyak anggota dari masing-masing himpunan tersebut?
- **Pilihan Jawaban:**
  A. $5$ anggota  
  B. $4$ anggota  
  C. $6$ anggota  
  D. $10$ anggota  
- **Kunci:** A. $5$ anggota
- **Pembahasan:**
  Cari bilangan bulat positif $n$ yang memenuhi $n! = 120$:
  $$5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$$
  Jadi banyak anggotanya adalah 5.
- **Feedback:**
  - *Benar:* "Tepat! $5! = 120$, sehingga banyak anggota himpunan adalah 5."
  - *Salah:* "Uji nilai faktorial: $4! = 24$, $5! = 120$, $6! = 720$. Maka $n = 5$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jika banyak korespondensi adalah 24, berapa banyak anggota himpunannya?
  - *Pilihan Jawaban:* A. $4$ | B. $3$ | C. $5$
  - *Kunci:* A. $4$
  - *Pembahasan:* $4! = 24$.

---

### [ID: CH5-EX-23] Matching Konteks Nyata dan Bukan 1:1
- **Materi:** Membedakan Relasi 1:1 dan Bukan 1:1 di Kehidupan Sehari-hari
- **Indikator:** Siswa menjodohkan deskripsi relasi dengan jenis relasinya.
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Jodohkan contoh relasi di kolom kiri dengan klasifikasi jenis relasinya di kolom kanan!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:*
    1. Siswa dengan Nomor Kursi Ujian Resmi di Kelas
    2. Siswa dengan Warna Favorit
    3. Mobil dengan Nomor Rangka Mesin
  - *Kolom Kanan:*
    - Korespondensi Satu-Satu
    - Relasi Biasa (Bukan 1-1)
    - Korespondensi Satu-Satu
- **Pilihan Jawaban:**
  - Kursi Ujian $\rightarrow$ Korespondensi Satu-Satu
  - Warna Favorit $\rightarrow$ Relasi Biasa
  - Nomor Rangka $\rightarrow$ Korespondensi Satu-Satu
- **Kunci:**
  - Kursi Ujian $\leftrightarrow$ Korespondensi Satu-Satu
  - Warna Favorit $\leftrightarrow$ Relasi Biasa (Bukan 1-1)
  - Nomor Rangka Mesin $\leftrightarrow$ Korespondensi Satu-Satu
- **Pembahasan:**
  - Nomor kursi ujian dan nomor rangka mesin bersifat unik 1-lawan-1 eksklusif (korespondensi 1-1).
  - Warna favorit bisa dipilih banyak orang atau satu orang suka banyak warna (relasi biasa).
- **Feedback:**
  - *Benar:* "Sangat cermat! Kamu membedakan relasi eksklusif dengan relasi terbuka."
  - *Salah:* "Identitas unik (nomor kursi resmi, nomor rangka) adalah korespondensi 1-1, sedangkan hobi/kesukaan adalah relasi biasa."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Hubungkan: Buku dengan nomor ISBN unik $\rightarrow$ jenis apa?
  - *Kunci:* Korespondensi Satu-Satu.
  - *Pembahasan:* Setiap buku edisi resmi memiliki 1 ISBN unik.

---

### [ID: CH5-EX-24] Domain dan Range pada Korespondensi Satu-Satu
- **Materi:** Hubungan Domain, Kodomain, dan Range
- **Indikator:** Siswa dapat menganalisis bahwa pada korespondensi satu-satu, daerah hasil (range) selalu sama dengan daerah kawan (kodomain).
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Pada relasi korespondensi satu-satu antara himpunan A dan himpunan B, manakah pernyataan yang PALING TEPAT mengenai daerah hasil (Range)?
- **Pilihan Jawaban:**
  A. Daerah hasil (Range) selalu sama persis dengan seluruh anggota daerah kawan (Kodomain)  
  B. Daerah hasil hanya berisi sebagian kecil dari daerah kawan  
  C. Daerah hasil tidak ada hubungannya dengan daerah kawan  
  D. Daerah hasil boleh kosong  
- **Kunci:** A. Daerah hasil (Range) selalu sama persis dengan seluruh anggota daerah kawan (Kodomain)
- **Pembahasan:**
  Karena pada korespondensi satu-satu setiap anggota kodomain wajib memiliki pasangan (tidak boleh ada yang tersisa/kosong), maka seluruh anggota himpunan B pasti terpilih menjadi anggota range. Akibatnya: $\text{Range} = \text{Kodomain}$.
- **Feedback:**
  - *Benar:* "Tepat! Tidak ada anggota kodomain yang menganggur, sehingga Range = Kodomain."
  - *Salah:* "Karena semua anggota kodomain wajib berpasangan, maka daerah hasil persis sama dengan daerah kawan."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jika $B = \{1, 2, 3\}$ adalah kodomain korespondensi 1-1, maka daerah hasilnya adalah...
  - *Pilihan Jawaban:* A. $\{1, 2, 3\}$ | B. $\{1, 2\}$ | C. $\{1\}$
  - *Kunci:* A. $\{1, 2, 3\}$
  - *Pembahasan:* Range sama dengan seluruh anggota kodomain.

---

### [ID: CH5-EX-25] Syarat Dua Himpunan Hingga Ekuivalen
- **Materi:** Pengertian Himpunan Ekuivalen ($A \sim B$)
- **Indikator:** Siswa memvalidasi bahwa dua himpunan yang dapat berkorespondensi satu-satu disebut himpunan yang ekuivalen.
- **Bentuk Interaksi:** TRUE_FALSE
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pernyataan: *"Dua himpunan A dan B dikatakan ekuivalen ($A \sim B$) jika dan hanya jika antara kedua himpunan tersebut dapat dibentuk korespondensi satu-satu."*
- **Pilihan Jawaban:**
  A. Benar  
  B. Salah  
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai BENAR. Definisi matematis dari dua himpunan yang ekuivalen adalah memiliki kardinalitas yang sama ($n(A) = n(B)$), yang menjadi syarat mutlak terjalinnya korespondensi satu-satu.
- **Feedback:**
  - *Benar:* "Benar! Ekuivalen berarti memiliki jumlah anggota yang sama sehingga bisa berkorespondensi satu-satu."
  - *Salah:* "Pernyataan ini bernilai BENAR. Ekuivalensi himpunan didefinisikan melalui adanya korespondensi satu-satu."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pernyataan: Himpunan $\{a, b\}$ dan $\{1, 2\}$ adalah dua himpunan yang ekuivalen.
  - *Pilihan Jawaban:* A. Benar | B. Salah
  - *Kunci:* A. Benar
  - *Pembahasan:* Keduanya sama-sama memiliki 2 anggota.

---

### [ID: CH5-EX-26] Menghitung Nilai Faktorial Bertingkat $rac{5!}{3!}$
- **Materi:** Penyederhanaan Operasi Faktorial pada Masalah Korespondensi
- **Indikator:** Siswa dapat menghitung nilai operasi pecahan faktorial $\frac{5!}{3!} = 20$.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Berapakah hasil dari pembagian nilai kemungkinan korespondensi 5 anggota dengan 3 anggota, yaitu $\frac{5!}{3!}$?
- **Pilihan Jawaban:**
  A. $20$  
  B. $2$  
  C. $10$  
  D. $40$  
- **Kunci:** A. $20$
- **Pembahasan:**
  $$\frac{5!}{3!} = \frac{5 \times 4 \times 3 \times 2 \times 1}{3 \times 2 \times 1} = 5 \times 4 = 20$$
  Atau $\frac{120}{6} = 20$.
- **Feedback:**
  - *Benar:* "Hebat! $\frac{120}{6} = 20$, atau mencoret faktor $3!$ menyisakan $5 \times 4 = 20$."
  - *Salah:* "Bagi $120$ dengan $6$: $\frac{120}{6} = 20$."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Berapakah nilai dari $\frac{4!}{2!}$?
  - *Pilihan Jawaban:* A. $12$ | B. $2$ | C. $6$
  - *Kunci:* A. $12$
  - *Pembahasan:* $\frac{24}{2} = 12$.

---

### [ID: CH5-EX-27] Karakteristik Diagram Panah Korespondensi
- **Materi:** Visual Diagram Panah Korespondensi Satu-Satu
- **Indikator:** Siswa dapat memilih semua ciri visual diagram panah yang merupakan korespondensi satu-satu.
- **Bentuk Interaksi:** MCQ_COMPLEX
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Manakah ciri-ciri visual yang PASTI ditemukan pada diagram panah sebuah korespondensi satu-satu? *(Pilih semua yang benar)*
- **Pilihan Jawaban:**
  A. Dari setiap titik di lingkaran kiri hanya keluar tepat satu garis panah  
  B. Pada setiap titik di lingkaran kanan hanya masuk tepat satu ujung anak panah  
  C. Tidak ada satu pun titik di lingkaran kiri maupun lingkaran kanan yang tidak tersambung garis  
  D. Jumlah titik di lingkaran kiri harus lebih banyak daripada lingkaran kanan  
- **Kunci:** Pilihan A, B, dan C
- **Pembahasan:**
  - A BENAR: Keluar tepat 1 panah dari domain (syarat fungsi).
  - B BENAR: Masuk tepat 1 panah ke kodomain (syarat satu-lawan-satu).
  - C BENAR: Tidak ada titik yang kosong di kedua lingkaran (syarat bijektif).
  - D SALAH: Jumlah titik di kedua lingkaran harus sama persis.
- **Feedback:**
  - *Benar:* "Sempurna! Ciri visual diagram panah 1:1 adalah keluar satu, masuk satu, dan tidak ada yang tersisa."
  - *Salah:* "Periksa opsi D: jumlah titik di kedua lingkaran harus sama ($n(A)=n(B)$), tidak boleh berbeda."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Pada diagram panah korespondensi satu-satu, bolehkah ada anggota kodomain yang menerima 2 panah?
  - *Pilihan Jawaban:* A. Tidak boleh | B. Boleh asalkan domainnya habis
  - *Kunci:* A. Tidak boleh
  - *Pembahasan:* Setiap anggota hanya boleh menerima tepat satu panah.

---

### [ID: CH5-EX-28] Menyusun Kode Pasangan Berurutan dari Tabel
- **Materi:** Penerjemahan Tabel Pasangan Menjadi Notasi Pasangan Berurutan
- **Indikator:** Diberikan tabel pasangan 1:1, siswa dapat memilih representasi pasangan berurutan yang sesuai.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan tabel korespondensi satu-satu:
  | Input ($x$) | Output ($y$) |
  | :---: | :---: |
  | A | 3 |
  | B | 1 |
  | C | 2 |

  Bentuk himpunan pasangan berurutan yang sesuai dengan tabel di atas adalah...
- **Pilihan Jawaban:**
  A. $\{(A, 3), (B, 1), (C, 2)\}$  
  B. $\{(A, 1), (B, 2), (C, 3)\}$  
  C. $\{(3, A), (1, B), (2, C)\}$  
  D. $\{(A, B, C), (3, 1, 2)\}$  
- **Kunci:** A. $\{(A, 3), (B, 1), (C, 2)\}$
- **Pembahasan:**
  Setiap baris pada tabel dipasangkan sebagai koordinat $(x, y)$:
  - Baris 1: $(A, 3)$
  - Baris 2: $(B, 1)$
  - Baris 3: $(C, 2)$
  Himpunannya adalah $\{(A, 3), (B, 1), (C, 2)\}$.
- **Feedback:**
  - *Benar:* "Tepat! Pasangkan baris per baris dalam format $(x, y)$."
  - *Salah:* "Lihat pasangannya: A berpasangan dengan 3, B dengan 1, dan C dengan 2."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Jika $P$ berpasangan dengan 2 dan $Q$ dengan 5, himpunan pasangan berurutannya adalah...
  - *Pilihan Jawaban:* A. $\{(P, 2), (Q, 5)\}$ | B. $\{(2, P), (5, Q)\}$
  - *Kunci:* A. $\{(P, 2), (Q, 5)\}$
  - *Pembahasan:* Format $(x, y) = (P, 2)$ dan $(Q, 5)$.

---

### [ID: CH5-EX-29] Identifikasi Kasus Kemungkinan Nol
- **Materi:** Pengujian Kasus Banyak Korespondensi = 0
- **Indikator:** Siswa dapat menentukan pasangan himpunan mana yang memiliki 0 kemungkinan korespondensi satu-satu.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Di antara pasangan himpunan berikut, manakah yang memiliki **NOL (0)** kemungkinan korespondensi satu-satu?
- **Pilihan Jawaban:**
  A. $A = \{1, 2, 3\}$ dan $B = \{a, b\}$  
  B. $P = \{1, 2\}$ dan $Q = \{x, y\}$  
  C. $K = \{a, b, c\}$ dan $L = \{p, q, r\}$  
  D. $M = \{5\}$ dan $N = \{z\}$  
- **Kunci:** A. $A = \{1, 2, 3\}$ dan $B = \{a, b\}$
- **Pembahasan:**
  - Pada opsi A: $n(A) = 3$ sedangkan $n(B) = 2$. Karena $n(A) \neq n(B)$, maka tidak mungkin dibentuk korespondensi satu-satu (kemungkinannya = 0).
  - Opsi B ($n=2 \implies 2$), Opsi C ($n=3 \implies 6$), Opsi D ($n=1 \implies 1$).
- **Feedback:**
  - *Benar:* "Cermat sekali! Pada opsi A jumlah anggotanya 3 dan 2 (tidak sama), sehingga kemungkinannya adalah 0."
  - *Salah:* "Cari pasangan himpunan yang jumlah anggotanya tidak sama."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Manakah yang memiliki 0 kemungkinan korespondensi satu-satu?
  - *Pilihan Jawaban:* A. $n(A)=4, n(B)=3$ | B. $n(A)=3, n(B)=3$
  - *Kunci:* A. $n(A)=4, n(B)=3$
  - *Pembahasan:* $4 \neq 3 \implies 0$ kemungkinan.

---

### [ID: CH5-EX-30] Rangkuman Master Korespondensi Satu-Satu
- **Materi:** Rangkuman Pemahaman Menyeluruh Korespondensi Satu-Satu
- **Indikator:** Siswa dapat merangkum konsep dasar, syarat, dan rumus korespondensi satu-satu.
- **Bentuk Interaksi:** PILIHAN GANDA
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Apakah kesimpulan paling mendasar dari seluruh pembelajaran materi **Korespondensi Satu-Satu**?
- **Pilihan Jawaban:**
  A. Korespondensi satu-satu adalah pemetaan timbal balik yang adil dan sempurna antara dua himpunan dengan jumlah anggota sama ($n(A)=n(B)=n$), di mana setiap elemen memiliki kawan tunggal tanpa sisa, dengan $n!$ cara kemungkinan susunan  
  B. Korespondensi satu-satu adalah relasi bebas tanpa syarat jumlah anggota  
  C. Korespondensi satu-satu sama saja dengan relasi biasa  
  D. Korespondensi satu-satu hanya berlaku untuk himpunan huruf abjad  
- **Kunci:** A. Korespondensi satu-satu adalah pemetaan timbal balik yang adil dan sempurna antara dua himpunan dengan jumlah anggota sama ($n(A)=n(B)=n$), di mana setiap elemen memiliki kawan tunggal tanpa sisa, dengan $n!$ cara kemungkinan susunan
- **Pembahasan:**
  Korespondensi satu-satu mengintegrasikan:
  1. Syarat kardinalitas: $n(A) = n(B)$.
  2. Sifat relasi: Tepat satu kawan secara timbal balik (injektif dan surjektif).
  3. Perhitungan kombinatorika: $n! = n \times (n-1) \times \dots \times 1$.
- **Feedback:**
  - *Benar:* "SELAMAT! Kamu telah menyelesaikan seluruh rangkaian instrumen latihan dengan penguasaan konsep matematika yang paripurna!"
  - *Salah:* "Pilihan A merangkum seluruh esensi materi: $n(A)=n(B)$, berpasangan tunggal tanpa sisa, dan $n!$ cara."
- **Variasi Remedial (Berbeda Angka):**
  - *Soal Remedial:* Dua syarat utama korespondensi satu-satu adalah...
  - *Pilihan Jawaban:* A. $n(A) = n(B)$ dan setiap anggota berpasangan tepat satu secara timbal balik | B. $n(A) > n(B)$ dan bebas bercabang
  - *Kunci:* A. $n(A) = n(B)$ dan setiap anggota berpasangan tepat satu secara timbal balik
  - *Pembahasan:* Jumlah anggota sama dan pemetaan 1-ke-1 tanpa sisa.
