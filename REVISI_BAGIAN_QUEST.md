# 🕵️‍♂️ HASIL REVISI LENGKAP BAGIAN QUEST: INVESTIGASI KASUS DETEKTIF DATA
## Bank Soal Game Edukasi "Detektif Data: Relasi dan Fungsi" SMP Kelas VIII

Dokumen ini memuat perombakan arsitektur dan instrumen soal pada **BAGIAN QUEST (Quest Mode)**.

---

### 🎯 TUJUAN DAN FILOSOFI DESAIN QUEST MODE REVISI
1. **Bukan Kumpulan Soal Terpisah:** Quest Mode TIDAK LAGI berupa 30 soal pilihan ganda lepas yang acak. Sebaliknya, Quest Mode dirancang sebagai **5 Kasus Investigasi Tematik Terintegrasi** di mana setiap butir soal saling berhubungan sebagai bagian dari rantai pengumpulan bukti kriminal / investigasi.
2. **Alur Investigasi Interaktif (Game Mechanics):**
   $$\text{Kasus Misteri} \longrightarrow \text{Bukti 1} \longrightarrow \text{Bukti 2} \longrightarrow \text{Bukti 3} \longrightarrow \text{Bukti 4} \longrightarrow \text{Bukti 5} \longrightarrow \text{Kode Akhir (Case Closed)}$$
3. **Kaya Ragam Interaksi (Bukan Hanya Pilihan Ganda ABCD):**
   - Diagram Panah Interaktif
   - Drag & Drop Klasifikasi Unsur
   - Deteksi Kesalahan / Berkas Palsu
   - Matching (Menjodohkan 4 Format)
   - Klik Titik Koordinat Cartesius
   - Melengkapi Tabel Nilai Fungsi
   - Input Angka Numerik
   - Puzzle Susunan Kartu Bukti
   - Pemecahan Kode Rahasia (Cipher Keypad)
4. **Kalibrasi Kognitif (Bloom C-Level) yang Realistis:**
   - Level soal disesuaikan murni dengan kedalaman berpikir matematisnya (C2 = Pemahaman Konsep, C3 = Aplikasi Rumus/Substitusi, C4 = Analisis Logika/Model, C5 = Evaluasi Kesalahan/Sintesis Kode Akhir).
   - **TIDAK ADA LAGI** pelabelan otomatis C5 hanya karena soal ditaruh di nomor 21-30.
5. **Konsekuensi Kode Akhir:**
   - Setiap bukti yang berhasil dipecahkan memberikan satu angka/petunjuk kode sandi.
   - Pada tahap akhir, siswa memasukkan kode gabungan ke terminal brankas/server. Jika benar $\implies$ **KASUS TERPECAHKAN (CASE CLOSED)**; jika salah $\implies$ **ALARM BERBUNYI / KASUS BELUM TERPECAHKAN**.

---


---

# 🌟 MODEL UTAMA KASUS LINTAS MATERI: "PENYUSUP DI PUSAT DATA SEKOLAH"
### Kasus Investigasi Holistik (Relasi & Fungsi SMP Kelas VIII)

**KASUS:**  
Seorang siswa menemukan aliran data yang sangat mencurigakan di komputer laboratorium sekolah. Pada jam istirahat, layar monitor tiba-tiba menampilkan kode acak yang mengindikasikan bahwa sistem penilaian dan absensi sekolah sedang diretas oleh pihak tak bertanggung jawab.
Detektif Data dipanggil untuk melakukan penyelidikan kriminal siber. Terdapat **4 BUKTI KUNCI + 1 BUKTI FINAL** yang harus dipecahkan secara berurutan menggunakan konsep matematika Relasi dan Fungsi untuk mengungkap identitas peretas dan memasukkan **KODE AKHIR** sebelum data sekolah terhapus permanen!

```
                    ALUR INVESTIGASI KASUS
+-------------------------------------------------------------+
| KASUS: Aliran data mencurigakan di lab komputer sekolah     |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| BUKTI 1: Hubungkan Diagram Panah Transmisi Data (Relasi)    |
| -> Mendapatkan Digit 1                                      |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| BUKTI 2: Tentukan Domain, Kodomain, & Range (Fungsi)        |
| -> Mendapatkan Digit 2                                      |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| BUKTI 3: Hitung Nilai Fungsi Enkripsi f(x) (Rumus Aljabar)  |
| -> Mendapatkan Digit 3                                      |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| BUKTI 4: Periksa Titik & Gradien Grafik Radar (Grafik Linear)|
| -> Mendapatkan Digit 4                                      |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| BUKTI 5: Uji Otorisasi Korespondensi Satu-Satu (Bijektif)    |
| -> Verifikasi Kombinasi                                     |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
| KODE AKHIR: Masukkan Kode 4-Digit ke Mainframe Terminal     |
| [ DIGIT 1 ] [ DIGIT 2 ] [ DIGIT 3 ] [ DIGIT 4 ]             |
+-------------------------------------------------------------+
                               |
             +-----------------+-----------------+
             |                                   |
             v                                   v
+--------------------------+       +--------------------------+
| HASIL AKHIR: SUKSES      |       | HASIL AKHIR: GAGAL       |
| KASUS TERPECAHKAN        |       | KASUS BELUM TERPECAHKAN  |
| Data Selamat, Pelaku     |       | Server Terkunci Darurat, |
| Tertangkap! (CASE CLOSED)|       | Waktu Habis!             |
+--------------------------+       +--------------------------+
```

---

### [ID: QUEST-MEGA-B1] BUKTI 1: Hubungkan Diagram Panah Transmisi Data
- **Materi:** Pengertian Relasi & Diagram Panah
- **Bentuk Interaksi:** DIAGRAM PANAH INTERAKTIF
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario Kasus:**
  Penyusup mengirimkan paket data dari 3 komputer lab $A = \{K_1, K_2, K_3\}$ ke 3 server proxy $B = \{P_1, P_2, P_3\}$. Berdasarkan berkas log router:
  - Komputer $K_1$ mengirim paket ke Server $P_1$
  - Komputer $K_2$ mengirim paket ke Server $P_2$ dan Server $P_3$
  - Komputer $K_3$ tidak aktif (tidak mengirim data apapun)
  Hubungkan panah dari komputer di lingkaran A ke server di lingkaran B!
- **Spesifikasi Programmer:**
  - *Interaksi:* Tarik panah dari node A ke node B.
  - *Validasi:* $(K_1 \rightarrow P_1), (K_2 \rightarrow P_2), (K_2 \rightarrow P_3)$. Node $K_3$ tidak memiliki panah.
  - *Petunjuk Angka Kode:* Jumlah total panah yang berhasil terhubung ($3$ panah) menjadi **DIGIT KE-1 KODE AKHIR: `3`**.
- **Kunci Jawaban:** 3 garis panah: `K1->P1`, `K2->P2`, `K2->P3`.
- **Nilai Angka:** **`3`**
- **Pembahasan:**
  Relasi adalah aturan yang menghubungkan himpunan A ke B tanpa pembatasan ketat:
  - $K_2$ boleh memiliki 2 pasangan (bercabang).
  - $K_3$ boleh tidak memiliki pasangan (kosong).
  Total garis transmisi yang terbentuk adalah 3.
- **Feedback:**
  - *Benar:* "Transmisi terpetakan! Relasi membolehkan anggota bercabang dan kosong. Kamu memperoleh Digit Pertama: 3!"
  - *Salah:* "Hubungkan: $K_1$ ke $P_1$, $K_2$ ke $P_2$ dan $P_3$. $K_3$ biarkan kosong."

---

### [ID: QUEST-MEGA-B2] BUKTI 2: Tentukan Domain, Kodomain, dan Range
- **Materi:** Unsur-Unsur Fungsi (Domain, Kodomain, Range)
- **Bentuk Interaksi:** DRAG & DROP KLASIFIKASI (Pilah Himpunan)
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario Kasus:**
  Untuk menghentikan penyusup, Detektif Data menganalisis firewall penyaring data yang bekerja sebagai sebuah **FUNGSI**.
  Diberikan himpunan port masukan $P = \{1, 2, 3\}$, himpunan port tujuan $Q = \{a, b, c, d\}$, dan sambungan yang dilewati:
  $$f = \{(1, a), (2, b), (3, a)\}$$
  Tentukan anggota **Range (Daerah Hasil)** dari fungsi firewall tersebut!
- **Spesifikasi Programmer:**
  - *Komponen:* Dropzone Range dan pilihan kartu port.
  - *Petunjuk Angka Kode:* Banyaknya anggota pada himpunan Range ($n(\text{Range}) = 2$) menjadi **DIGIT KE-2 KODE AKHIR: `2`**.
- **Kunci Jawaban:** $\text{Range} = \{a, b\}$
- **Nilai Angka:** **`2`** (karena Range memiliki 2 anggota: $a$ dan $b$).
- **Pembahasan:**
  - **Domain:** $\{1, 2, 3\}$
  - **Kodomain:** $\{a, b, c, d\}$
  - **Range:** Anggota kodomain yang benar-benar menerima panah dari domain, yaitu $\{a, b\}$.
  Banyaknya anggota daerah hasil adalah $n(\text{Range}) = 2$.
- **Feedback:**
  - *Benar:* "Tepat sekali! Hanya elemen 'a' dan 'b' yang terpilih oleh panah, sehingga $n(\text{Range}) = 2$. Kamu mendapatkan Digit Kedua: 2!"
  - *Salah:* "Range adalah anggota himpunan kawan yang benar-benar terpasang. Di sini hanya $\{a, b\}$."

---

### [ID: QUEST-MEGA-B3] BUKTI 3: Hitung Nilai Fungsi Enkripsi $f(x)$
- **Materi:** Notasi & Rumus Fungsi Aljabar
- **Bentuk Interaksi:** INPUT ANGKA (Kalkulasi Nilai Fungsi)
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario Kasus:**
  Penyusup mengenkripsi kata sandi server menggunakan rumus fungsi aljabar:
  $$f(x) = 3x - 4$$
  Sistem keamanan membutuhkan nilai otorisasi saat kunci masukan $x = 4$.
  Berapakah nilai dari $f(4)$? *(Ketikkan angka hasilnya)*
- **Spesifikasi Programmer:**
  - *Input Field:* Kotak isian angka integer.
  - *Petunjuk Angka Kode:* Hasil nilai fungsi $f(4) = 8$ menjadi **DIGIT KE-3 KODE AKHIR: `8`**.
- **Kunci Jawaban:** `8`
- **Nilai Angka:** **`8`**
- **Pembahasan:**
  Substitusikan nilai masukan $x = 4$ ke rumus fungsi $f(x)$:
  $$f(4) = 3(4) - 4 = 12 - 4 = 8$$
  Nilai keluaran fungsi enkripsi adalah 8.
- **Feedback:**
  - *Benar:* "Perhitungan aljabar akurat! Nilai $f(4) = 3(4) - 4 = 8$. Kamu mengantongi Digit Ketiga: 8!"
  - *Salah:* "Kalikan dulu: $3 \times 4 = 12$. Lalu kurangkan dengan 4: $12 - 4 = 8$."

---

### [ID: QUEST-MEGA-B4] BUKTI 4: Periksa Grafik Lintasan Gelombang Data
- **Materi:** Grafik Fungsi Linear & Titik Potong Sumbu
- **Bentuk Interaksi:** KLIK TITIK (Cartesian Point Selection)
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario Kasus:**
  Jejak sinyal frekuensi penyusup membentuk garis lurus linear pada layar osiloskop Cartesius dengan persamaan:
  $$f(x) = 2x - 8$$
  Penyusup menaruh terminal relay tepat di **titik potong grafik dengan sumbu mendatar X** (garis $y = 0$).
  Klik titik koordinat perpotongan sumbu X tersebut pada osiloskop!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-2, 8]$, Rentang $Y \in [-10, 4]$, step grid = 1.
  - *Interaksi:* Siswa mengklik titik $(4, 0)$ pada sumbu X.
  - *Petunjuk Angka Kode:* Nilai absis titik ini ($x = 4$) menjadi **DIGIT KE-4 KODE AKHIR: `4`**.
- **Kunci Jawaban:** Titik `(4, 0)`
- **Nilai Angka:** **`4`** (nilai $x$ pada titik potong sumbu X).
- **Pembahasan:**
  Titik potong sumbu X terjadi saat nilai fungsi $y = f(x) = 0$:
  $$2x - 8 = 0 \implies 2x = 8 \implies x = 4$$
  Jadi titik koordinatnya adalah $(4, 0)$.
- **Feedback:**
  - *Benar:* "Titik koordinat radar terkunci! Sinyal memotong sumbu X tepat di $(4, 0)$. Seluruh 4 digit kode brankas telah terkumpul: 3 - 2 - 8 - 4!"
  - *Salah:* "Untuk mencari titik potong sumbu X, jadikan $2x - 8 = 0 \implies 2x = 8 \implies x = 4$. Titiknya adalah $(4, 0)$."

---

### [ID: QUEST-MEGA-CODE] KODE AKHIR: Membuka Mainframe & Menangkap Penyusup
- **Judul Bukti:** Input 4-Digit Security Master Code
- **Materi:** Sintesis Penyelidikan Lintas Materi Relasi & Fungsi
- **Bentuk Interaksi:** PUZZLE KODE (Terminal Cyber Security)
- **C-Level:** C5 (Mengevaluasi & Sintesis)
- **Skenario & Instruksi:**
  Gabungkan seluruh 4 digit petunjuk yang diperoleh dari Bukti 1 hingga Bukti 4:
  - **Digit 1** (dari Bukti 1): Jumlah garis panah relasi yang sah ($3$).
  - **Digit 2** (dari Bukti 2): Banyaknya elemen pada himpunan Range ($2$).
  - **Digit 3** (dari Bukti 3): Nilai keluaran fungsi enkripsi $f(4)$ ($8$).
  - **Digit 4** (dari Bukti 4): Nilai absis $x$ pada titik potong grafik sumbu X ($4$).
  Ketikkan kode 4 digit pada terminal mainframe untuk melumpuhkan malware!
- **Spesifikasi Programmer:**
  - *Display Terminal:* `ENTER SYSTEM DECRYPTION CODE: [ _ _ _ _ ]`.
  - *Validasi Kode:* `3284`
  - *Hasil Akhir:*
    - **Jika Benar (KODE BERHASIL):** Layar hijau bercahaya, alarm mati, teks emas menyala `MALWARE BERHASIL DIBERSIHKAN! IDENTITAS PENYUSUP DITEMUKAN! KASUS TERPECAHKAN (CASE CLOSED)`.
    - **Jika Salah (KODE SALAH):** Layar merah menyala, sirine bahaya berbunyi, teks `KODE SALAH! KASUS BELUM TERPECAHKAN - WAKTU HITUNG MUNDUR DARURAT DIAKTIFKAN`.
- **Kunci Jawaban:** `3284`
- **Pembahasan:**
  - Digit 1 = 3 (Bukti 1: 3 panah relasi)
  - Digit 2 = 2 (Bukti 2: Range = {a, b} $\implies$ 2 anggota)
  - Digit 3 = 8 (Bukti 3: $f(4) = 3(4) - 4 = 8$)
  - Digit 4 = 4 (Bukti 4: $2x - 8 = 0 \implies x = 4$)
  Maka kode gabungan pembuka mainframe adalah **3284**.
- **Feedback:**
  - *Benar:* "KODE BERHASIL! Kasus terpecahkan sempurna! Kamu membuktikan kehebatan analisis matematika dari Relasi, Unsur Fungsi, Rumus Aljabar, hingga Grafik Linear!"
  - *Salah:* "Periksa kembali catatan buktimu: Digit 1 = 3, Digit 2 = 2, Digit 3 = 8, Digit 4 = 4. Masukkan kode 3284."

---

# DAFTAR 5 KASUS BESAR INVESTIGASI QUEST

| Kasus | Judul Kasus Investigasi | Materi Relasi & Fungsi | Target Penyelidikan |
| :---: | :--- | :--- | :--- |
| **KASUS 1** | **Misteri Pesan Terenkripsi di Kantin Sekolah** | Bab 1: Pengertian & Cara Menyatakan Relasi | Mengungkap nota transaksi rahasia & membongkar brankas kasir kantin |
| **KASUS 2** | **Investigasi Mesin Penjual Otomatis Rusak (Vending Machine)** | Bab 2: Pengertian & Unsur Fungsi (Domain, Kodomain, Range) | Mendeteksi sirkuit tombol yang disabotase & merestart sistem kontrol |
| **KASUS 3** | **Skandal Manipulasi Argo Taksi Liar di Stasiun** | Bab 3: Notasi & Rumus Fungsi ($f(x) = ax + b$) | Membongkar manipulasi tarif aljabar & memblokir server armada ilegal |
| **KASUS 4** | **Jejak Radar Penyelundup di Perbatasan Laut** | Bab 4: Grafik Fungsi Linear (Titik Potong & Gradien) | Memetakan lintasan koordinat radar kapal & menentukan titik sergap |
| **KASUS 5** | **Gembok Master Brankas Bank Data Sentral** | Bab 5: Korespondensi Satu-Satu & Faktorial | Memvalidasi otorisasi bijektif $1:1$ & membuka brankas arsip negara |

---

# KASUS 1: MISTERI PESAN TERENKRIPSI DI KANTIN SEKOLAH
**Materi:** Pengertian Relasi & 4 Cara Menyatakan Relasi  
**Skenario Kasus:**  
Ibu Kantin melapor kepada Detektif Data bahwa mesin kasir kantin dikunci oleh peretas misterius. Peretas meninggalkan pesan bahwa kasir baru bisa dibuka jika Detektif Data berhasil menganalisis 5 lembar bukti relasi pemesanan makanan dan memasukkan 4-digit kode brankas kasir!

---

### [ID: QUEST-C1-B1] BUKTI 1: Rekonstruksi Nota Pesanan Siswa
- **Judul Bukti:** Hubungkan Diagram Panah Pesanan
- **Materi:** Relasi sebagai Aturan Pemasangan Fleksibel
- **Bentuk Interaksi:** DIAGRAM PANAH INTERAKTIF
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Detektif Data menemukan robekan nota pesanan jam istirahat pertama:
  - Siswa Andi memesan **Soto**
  - Siswa Budi memesan **Bakso** dan **Siomay**
  - Siswa Citra **tidak memesan makanan apapun** (hanya duduk menemani temannya)
  Hubungkan nama siswa di himpunan $A = \{\text{Andi, Budi, Citra}\}$ ke menu makanan di himpunan $B = \{\text{Soto, Bakso, Siomay}\}$ menggunakan garis panah!
- **Spesifikasi Programmer:**
  - *Komponen:* Dua oval vertikal interaktif (A di kiri, B di kanan).
  - *Interaksi:* Menarik panah dari A ke B.
  - *Validasi:* Andi $\rightarrow$ Soto, Budi $\rightarrow$ Bakso, Budi $\rightarrow$ Siomay. Citra tidak memiliki panah keluar.
  - *Petunjuk Angka Kode:* Jumlah total panah makanan yang berhasil terhubung secara valid dicatat sebagai **DIGIT KE-1 KODE BRANKAS**.
- **Pilihan / Jawaban:** Menghubungkan panah sesuai skenario.
- **Kunci:** 3 panah valid: `(Andi -> Soto)`, `(Budi -> Bakso)`, `(Budi -> Siomay)`.
- **Nilai Angka Didapat:** **`3`** (karena ada 3 garis panah pesanan yang terbentuk).
- **Pembahasan:**
  Relasi adalah aturan yang memasangkan anggota himpunan A ke himpunan B. Dalam relasi, aturan sangat fleksibel:
  - Budi boleh memesan lebih dari satu menu (bercabang 2).
  - Citra boleh tidak memesan makanan sama sekali (kosong).
  Total garis pesanan yang terbentuk adalah 3 garis.
- **Feedback:**
  - *Benar:* "Rekonstruksi nota berhasil! Relasi mengizinkan anggota bercabang dan anggota kosong. Kamu mendapatkan petunjuk Digit Pertama: 3!"
  - *Salah:* "Periksa kembali nota: Andi memesan 1 menu, Budi memesan 2 menu, dan Citra tidak memesan apapun."

---

### [ID: QUEST-C1-B2] BUKTI 2: Deteksi Transaksi Palsu di Buku Kasir
- **Judul Bukti:** Menemukan Baris Transaksi Palsu
- **Materi:** Pengujian Kebenaran Anggota Relasi
- **Bentuk Interaksi:** DETEKSI KESALAHAN (Tabel Interaktif)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Peretas menyelipkan 1 transaksi fiktif di buku kasir. Aturan resmi transaksi jajanan hemat kantin adalah: **"Harga Makanan Kurang Dari Rp 15.000"**.
  Periksa 4 catatan transaksi di bawah, lalu **klik baris transaksi yang ILEGAL/PALSU**!
- **Spesifikasi Programmer:**
  - *Tabel Transaksi di Layar:*
    - Baris 1: `[Nota #1] Nasi Goreng -> Rp 12.000` (Rp 12.000 < Rp 15.000 $\implies$ Sah)
    - Baris 2: `[Nota #2] Mie Ayam -> Rp 10.000` (Rp 10.000 < Rp 15.000 $\implies$ Sah)
    - Baris 3: `[Nota #3] Es Teh Manis -> Rp 4.000` (Rp 4.000 < Rp 15.000 $\implies$ Sah)
    - Baris 4: `[Nota #4] Paket Steak Jumbo -> Rp 25.000` (Rp 25.000 TIDAK KURANG DARI Rp 15.000 $\implies$ PALSU!)
  - *Petunjuk Angka Kode:* Nomor nota dari transaksi palsu yang ditemukan menjadi **DIGIT KE-2 KODE BRANKAS**.
- **Pilihan / Jawaban:** Mengklik Baris Nota #1, Nota #2, Nota #3, atau Nota #4.
- **Kunci:** `Nota #4`
- **Nilai Angka Didapat:** **`4`** (dari Nota #4).
- **Pembahasan:**
  Aturan relasi yang sah adalah harga makanan harus bernilai kurang dari Rp 15.000.
  Pada Nota #4, harganya adalah Rp 25.000. Karena $25.000 > 15.000$, transaksi ini melanggar aturan relasi dan merupakan transaksi palsu buatan peretas. Nomor notanya adalah 4.
- **Feedback:**
  - *Benar:* "Deteksi cerdas! Paket Steak Rp 25.000 melanggar aturan jajanan hemat (< Rp 15.000). Kamu mengamankan petunjuk Digit Kedua: 4!"
  - *Salah:* "Cari baris transaksi yang nominal harganya sama dengan atau melebihi Rp 15.000."

---

### [ID: QUEST-C1-B3] BUKTI 3: Menyatukan Potongan Format Bukti
- **Judul Bukti:** Matching 4 Bentuk Penyajian Relasi
- **Materi:** 4 Cara Menyatakan Relasi (Panah, Pasangan Berurutan, Tabel, Cartesius)
- **Bentuk Interaksi:** MATCHING
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Peretas merobek berkas panduan kantin menjadi 4 kepingan terpisah. Jodohkan setiap **Format Penyajian Relasi** di sebelah kiri dengan **Ciri Visual Fisiknya** di sebelah kanan agar arsip investigasi kembali utuh!
- **Spesifikasi Programmer:**
  - *Kolom Kiri:*
    1. Diagram Panah
    2. Himpunan Pasangan Berurutan
    3. Tabel Relasi
    4. Diagram Cartesius
  - *Kolom Kanan:*
    - Kurva tertutup oval yang dihubungkan anak panah berarah
    - Pasangan tanda kurung kurawal berformat $\{(x, y), ...\}$
    - Baris dan kolom berisi masukan $x$ di kiri dan kawan $y$ di kanan
    - Titik-titik noktah pada perpotongan sumbu mendatar X dan sumbu tegak Y
- **Pilihan / Jawaban:** Menjodohkan keempat pasangan secara lengkap.
- **Kunci:**
  - Diagram Panah $\leftrightarrow$ Kurva tertutup oval & anak panah
  - Pasangan Berurutan $\leftrightarrow \{(x, y), ...\}$
  - Tabel Relasi $\leftrightarrow$ Baris dan kolom $x$ dan $y$
  - Diagram Cartesius $\leftrightarrow$ Titik noktah pada sumbu X dan Y
- **Nilai Angka Didapat:** Terbuka akses ke peta koordinat Cartesius untuk Bukti 4.
- **Pembahasan:**
  Ada 4 cara baku menyatakan relasi matematika: (1) Diagram Panah, (2) Himpunan Pasangan Berurutan, (3) Tabel, dan (4) Diagram Cartesius. Keempatnya menyajikan hubungan antar-himpunan yang sama dengan representasi visual berbeda.
- **Feedback:**
  - *Benar:* "Arsip berhasil direkonstruksi! Keempat bentuk penyajian relasi terverifikasi sinkron."
  - *Salah:* "Perhatikan simbol masing-masing format: kurung kurawal untuk pasangan berurutan, sumbu X-Y untuk Cartesius."

---

### [ID: QUEST-C1-B4] BUKTI 4: Menandai Titik Logbook di Koordinat Cartesius
- **Judul Bukti:** Plot Titik Waktu dan Antrean di Bidang Cartesius
- **Materi:** Diagram Cartesius pada Relasi
- **Bentuk Interaksi:** KLIK TITIK (Cartesian Plotting)
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Data sensor pintu kantin mencatat waktu kedatangan siswa (menit ke-$x$) dan nomor loket kasir yang dituju ($y$). Tiga catatan sah adalah:
  $$(1, 2), \quad (2, 4), \quad (3, 6)$$
  Tandai ketiga titik koordinat tersebut pada bidang koordinat Cartesius di bawah!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [0, 5]$, Rentang $Y \in [0, 8]$, step grid = 1.
  - *Interaksi:* Siswa mengklik koordinat $(1, 2)$, $(2, 4)$, dan $(3, 6)$.
  - *Petunjuk Angka Kode:* Nilai ordinat $y$ pada titik pertama saat $x = 1$ (yaitu angka `2`) dicatat sebagai **DIGIT KE-3 KODE BRANKAS**.
- **Pilihan / Jawaban:** Menandai titik $(1, 2)$, $(2, 4)$, dan $(3, 6)$.
- **Kunci:** Koordinat `(1, 2)`, `(2, 4)`, dan `(3, 6)`
- **Nilai Angka Didapat:** **`2`** (ketinggian $y$ pada titik pertama).
- **Pembahasan:**
  Setiap pasangan waktu dan loket diplotkan sebagai titik $(x, y)$:
  - $x = 1, y = 2 \implies$ Titik $(1, 2)$
  - $x = 2, y = 4 \implies$ Titik $(2, 4)$
  - $x = 3, y = 6 \implies$ Titik $(3, 6)$
  Ketiga titik membentuk garis lurus dengan pola relasi $y = 2x$.
- **Feedback:**
  - *Benar:* "Plot titik sangat presisi! Koordinat $(1, 2), (2, 4), (3, 6)$ terpetakan sempurna. Kamu mendapatkan petunjuk Digit Ketiga: 2!"
  - *Salah:* "Perhatikan sumbu: sumbu mendatar adalah $x$ dan sumbu tegak adalah $y$."

---

### [ID: QUEST-C1-B5] BUKTI 5: Menganalisis Rumus Relasi Aljabar
- **Judul Bukti:** Menentukan Nama Aturan Relasi Matematika
- **Materi:** Menentukan Aturan Relasi dari Himpunan Pasangan
- **Bentuk Interaksi:** PILIHAN GANDA (Analisis Pola)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Berdasarkan titik-titik pasangan berurutan yang ditemukan:
  $$R = \{(1, 2), (2, 4), (3, 6), (5, 10)\}$$
  Apakah nama aturan relasi matematika yang PALING TEPAT dari himpunan pertama ke himpunan kedua?
- **Spesifikasi Programmer:**
  - *Komponen:* 4 kartu pilihan formula relasi.
  - *Petunjuk Angka Kode:* Jumlah huruf vokal pada kata aturan yang benar ("Setengah dari" memiliki huruf vokal E, E, A, A, I = 5 huruf vokal) ATAU jumlah cara menyatakan relasi = **DIGIT KE-4 KODE BRANKAS: `4`** (karena ada 4 cara menyatakan relasi).
- **Pilihan Jawaban:**
  A. "Setengah dari" (karena $1 = \frac{1}{2} \times 2, \; 2 = \frac{1}{2} \times 4, \; 3 = \frac{1}{2} \times 6$)  
  B. "Dua lebihnya dari"  
  C. "Faktor dari"  
  D. "Kuadrat dari"  
- **Kunci:** A. "Setengah dari"
- **Nilai Angka Didapat:** **`4`** (diambil dari total 4 format relasi yang telah dipecahkan).
- **Pembahasan:**
  Periksa hubungan antara elemen pertama ($x$) dan kedua ($y$):
  - 1 adalah setengah dari 2
  - 2 adalah setengah dari 4
  - 3 adalah setengah dari 6
  - 5 adalah setengah dari 10
  Maka aturan relasi dari himpunan asal ke himpunan kawan adalah **"Setengah dari"**.
- **Feedback:**
  - *Benar:* "Analisis sempurna! Aturan relasi yang mengikat seluruh bukti adalah 'Setengah dari'. Seluruh 4 digit kode brankas telah lengkap terkumpul!"
  - *Salah:* "Uji pola angkanya: apakah $1$ dua lebihnya dari $2$? Tidak. $1$ adalah setengah dari $2$."

---

### [ID: QUEST-C1-CODE] KODE AKHIR KASUS 1: Membuka Brankas Kasir Kantin
- **Judul Bukti:** Input 4-Digit Master Code Kasir
- **Materi:** Sintesis Hasil Investigasi Kasus 1
- **Bentuk Interaksi:** PUZZLE KODE (Digital Keypad Input)
- **C-Level:** C5 (Mengevaluasi & Sintesis)
- **Skenario & Instruksi:**
  Detektif Data telah mengumpulkan seluruh 4 digit petunjuk dari lembar bukti:
  - **Digit 1** (dari Bukti 1): Jumlah garis panah pesanan yang valid.
  - **Digit 2** (dari Bukti 2): Nomor nota transaksi palsu yang melanggar batas harga.
  - **Digit 3** (dari Bukti 4): Nilai ordinat $y$ pada titik waktu pertama $(1, y)$.
  - **Digit 4** (dari Bukti 5): Total banyaknya format resmi untuk menyatakan relasi.
  Masukkan kode 4-digit tersebut ke keypad mesin kasir untuk menuntaskan kasus!
- **Spesifikasi Programmer:**
  - *Komponen:* Keypad angka 0-9 dan display display digital `[ _ ] [ _ ] [ _ ] [ _ ]`.
  - *Validasi Kode:* `3424`
  - *Hasil Akhir:*
    - **Jika Benar:** Efek suara brankas terbuka `KLIK-CHING!`, konfeti berhamburan, dan stempel emas bertuliskan `KASUS 1 SELESAI: KASIR KANTIN BERHASIL DISELAMATKAN! (CASE CLOSED)`.
    - **Jika Salah:** Alarm meraung merah, teks berkedip `KODE SALAH! KASUS BELUM TERPECAHKAN`.
- **Pilihan / Jawaban:** Input kode numerik 4 digit: `3424`.
- **Kunci:** `3424`
- **Pembahasan:**
  - Digit 1 = 3 (3 panah valid pada nota)
  - Digit 2 = 4 (Nota #4 palsu)
  - Digit 3 = 2 (Nilai $y$ pada titik $(1, 2)$)
  - Digit 4 = 4 (4 cara menyatakan relasi)
  Maka kombinasi kodenya adalah **3424**.
- **Feedback:**
  - *Benar:* "KASUS 1 TERPECAHKAN! Kode 3424 berhasil membuka kasir kantin. Ibu Kantin mengucapkan terima kasih sebesar-besarnya kepada Detektif Data!"
  - *Salah:* "Periksa kembali catatan buktimu: Digit 1 = 3, Digit 2 = 4, Digit 3 = 2, Digit 4 = 4. Masukkan kode 3424."

---

# KASUS 2: INVESTIGASI MESIN PENJUAL OTOMATIS RUSAK (VENDING MACHINE)
**Materi:** Pengertian Fungsi, Syarat Fungsi, Domain, Kodomain, dan Range  
**Skenario Kasus:**  
Mesin penjual otomatis (*vending machine*) di lobi sekolah dilaporkan mengalami kekacauan: ada tombol yang mengeluarkan 2 kaleng sekaligus, dan ada tombol yang tidak merespons sama sekali. Detektif Data membuka panel kontrol mikroprosesor mesin untuk memulihkan fungsi normalnya.

---

### [ID: QUEST-C2-B1] BUKTI 1: Memeriksa Protokol Syarat Fungsi Mesin
- **Judul Bukti:** Validasi Logika Fungsi Pemetaan
- **Materi:** Syarat Mutlak Sebuah Fungsi
- **Bentuk Interaksi:** PILIHAN GANDA (Logika Sistem)
- **C-Level:** C2 (Memahami)
- **Skenario & Instruksi:**
  Buku manual vending machine menyatakan prinsip kerja tombol input:
  *"Mesin dikatakan bekerja secara NORMAL sebagai FUNGSI jika dan hanya jika..."*
  Manakah pernyataan di bawah ini yang paling tepat menggambarkan syarat mutlak fungsi mesin tersebut?
- **Spesifikasi Programmer:**
  - *Visual:* Animasi diagram mesin minuman dengan tombol masukan di kiri dan slot kaleng di kanan.
  - *Petunjuk Angka Kode:* Jumlah cabang maksimal yang diperbolehkan keluar dari 1 tombol = **DIGIT KE-1 KODE RESET: `1`**.
- **Pilihan Jawaban:**
  A. Setiap tombol input WAJIB terhubung dan HANYA BOLEH mengeluarkan tepat satu jenis minuman  
  B. Satu tombol boleh mengeluarkan dua minuman berbeda asalkan pembeli membayar lebih  
  C. Boleh ada tombol yang tidak terhubung ke minuman apapun di etalase  
  D. Semua minuman di etalase harus selalu keluar bersamaan  
- **Kunci:** A. Setiap tombol input WAJIB terhubung dan HANYA BOLEH mengeluarkan tepat satu jenis minuman
- **Nilai Angka Didapat:** **`1`** (karena setiap input harus punya tepat 1 output).
- **Pembahasan:**
  Sebuah relasi disebut **fungsi** jika memenuhi 2 syarat mutlak pada daerah asal (domain):
  1. Setiap anggota domain harus memiliki pasangan (tidak boleh kosong/macet).
  2. Setiap anggota domain hanya boleh berpasangan tepat satu (tidak boleh bercabang/mengeluarkan dua produk berbeda untuk satu tombol).
- **Feedback:**
  - *Benar:* "Tepat sekali! Fungsi menuntut disiplin penuh: setiap input harus punya tepat 1 kawan. Kamu mengamankan Digit Pertama: 1!"
  - *Salah:* "Ingat syarat dasar fungsi: tidak boleh ada input yang kosong, dan tidak boleh ada input yang mendua."

---

### [ID: QUEST-C2-B2] BUKTI 2: Menemukan Sirkuit Tombol yang Disabotase
- **Judul Bukti:** Deteksi Diagram Sirkuit Rusak
- **Materi:** Mengidentifikasi Relasi yang Bukan Fungsi
- **Bentuk Interaksi:** DETEKSI KESALAHAN (Diagram Panah Sirkuit)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Detektif Data memindai 4 blok sirkuit tombol vending machine. Temukan **BLOK SIRKUIT YANG RUSAK / BUKAN MERUPAKAN FUNGSI**!
- **Spesifikasi Programmer:**
  - *Tampilan 4 Blok Diagram Panah:*
    - Blok 1: Tombol $\{A, B\} \rightarrow$ Minuman $\{X, Y\}$ dengan $(A, X), (B, Y)$ [Fungsi Sah].
    - Blok 2: Tombol $\{A, B\} \rightarrow$ Minuman $\{X, Y\}$ dengan $(A, X), (B, X)$ [Fungsi Sah, many-to-one diperbolehkan].
    - Blok 3: Tombol $\{A, B\} \rightarrow$ Minuman $\{X, Y\}$ dengan $(A, X), (A, Y)$, sementara tombol B tidak terpasang [RUSAK - BERCABANG & KOSONG!].
    - Blok 4: Tombol $\{A\} \rightarrow$ Minuman $\{X\}$ dengan $(A, X)$ [Fungsi Sah].
  - *Petunjuk Angka Kode:* Nomor blok sirkuit yang rusak menjadi **DIGIT KE-2 KODE RESET: `3`**.
- **Pilihan Jawaban:** Klik Blok 1, Blok 2, Blok 3, atau Blok 4.
- **Kunci:** `Blok 3`
- **Nilai Angka Didapat:** **`3`** (dari Blok 3).
- **Pembahasan:**
  Pada Blok 3:
  - Tombol A bercabang ke dua minuman ($X$ dan $Y$).
  - Tombol B tidak memiliki pasangan sama sekali.
  Ini melanggar kedua syarat fungsi sekaligus! Blok 3 adalah sumber kerusakan mesin.
- **Feedback:**
  - *Benar:* "Sirkuit rusak terlacak! Blok 3 melanggar aturan fungsi karena tombol A mendua dan tombol B kosong. Kamu mendapatkan Digit Kedua: 3!"
  - *Salah:* "Cari diagram di mana ada huruf di sebelah kiri yang memiliki 2 cabang panah atau tidak punya panah."

---

### [ID: QUEST-C2-B3] BUKTI 3: Pemilahan Berkas Domain, Kodomain, dan Range
- **Judul Bukti:** Drag & Drop Unsur-Unsur Fungsi
- **Materi:** Membedakan Domain, Kodomain, dan Range
- **Bentuk Interaksi:** DRAG & DROP KLASIFIKASI
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Pada vending machine yang berhasil diperbaiki:
  - Himpunan Tombol $A = \{T_1, T_2, T_3\}$
  - Himpunan Menu di Etalase $B = \{\text{Susu, Teh, Jus, Kopi}\}$
  - Sambungan aktif: $T_1 \rightarrow \text{Susu}, \; T_2 \rightarrow \text{Teh}, \; T_3 \rightarrow \text{Susu}$ (Kopi tidak dipilih).
  Pilah elemen-elemen berikut ke kotak kategori yang benar:
  - Kotak 1: **Domain (Daerah Asal)**
  - Kotak 2: **Kodomain (Daerah Kawan)**
  - Kotak 3: **Range (Daerah Hasil)**
- **Spesifikasi Programmer:**
  - *Komponen:* 3 kotak penerima (Dropzones) dan kartu-kartu label yang dapat ditarik.
  - *Target Drop:*
    - Dropzone Domain: $\{T_1, T_2, T_3\}$
    - Dropzone Kodomain: $\{\text{Susu, Teh, Jus, Kopi}\}$
    - Dropzone Range: $\{\text{Susu, Teh}\}$ (karena hanya Susu dan Teh yang menerima panah).
- **Pilihan / Jawaban:** Menempatkan seluruh kartu ke kotak yang benar.
- **Kunci:**
  - Domain = $\{T_1, T_2, T_3\}$
  - Kodomain = $\{	ext{Susu, Teh, Jus, Kopi}\}$
  - Range = $\{	ext{Susu, Teh}\}$
- **Nilai Angka Didapat:** Banyak anggota daerah hasil Range $= 2$ (yaitu Susu dan Teh) $\implies$ **DIGIT KE-3 KODE RESET: `2`**.
- **Pembahasan:**
  - **Domain:** Seluruh anggota himpunan masukan di kiri $\{T_1, T_2, T_3\}$.
  - **Kodomain:** Seluruh anggota himpunan kawan di kanan $\{\text{Susu, Teh, Jus, Kopi}\}$.
  - **Range:** Anggota kodomain yang benar-benar terpilih menerima panah, yaitu $\{\text{Susu, Teh}\}$ (ada 2 anggota).
- **Feedback:**
  - *Benar:* "Pengelompokan sempurna! Range hanya memuat elemen yang menerima panah (Susu & Teh, ada 2 anggota). Kamu mengamankan Digit Ketiga: 2!"
  - *Salah:* "Ingat: Kodomain adalah seluruh menu di etalase, sedangkan Range hanya menu yang benar-benar tersambung oleh panah."

---

### [ID: QUEST-C2-B4] BUKTI 4: Menghitung Kapasitas Pemetaan ($n(B)^{n(A)}$)
- **Judul Bukti:** Perhitungan Banyak Fungsi yang Mungkin Terbentuk
- **Materi:** Rumus Banyak Pemetaan antara Dua Himpunan
- **Bentuk Interaksi:** INPUT ANGKA (Kalkulasi Cepat)
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Sebuah modul tombol cadangan memiliki 2 sakelar input $\{S_1, S_2\}$ dan 3 indikator lampu $\{L_1, L_2, L_3\}$.
  Berapa banyakkah seluruh kemungkinan pemetaan (fungsi) yang dapat dibentuk dari sakelar ke indikator lampu? *(Gunakan rumus $n(B)^{n(A)}$)*
- **Spesifikasi Programmer:**
  - *Input Field:* Kotak isian angka numerik integer.
- **Pilihan / Jawaban:** Input angka langsung.
- **Kunci:** `9`
- **Nilai Angka Didapat:** Diperoleh verifikasi daya tampung memori sistem = 9 slot.
- **Pembahasan:**
  Diketahui:
  - Jumlah anggota domain $n(A) = 2$
  - Jumlah anggota kodomain $n(B) = 3$
  Rumus banyaknya pemetaan dari himpunan A ke B adalah:
  $$n(B)^{n(A)} = 3^2 = 3 \times 3 = 9\text{ kemungkinan pemetaan}$$
- **Feedback:**
  - *Benar:* "Kalkulasi akurat! Rumus pemetaan adalah $\text{Kodomain}^{\text{Domain}} = 3^2 = 9$ cara."
  - *Salah:* "Gunakan rumus $n(B)^{n(A)}$. Karena $n(B)=3$ dan $n(A)=2$, maka $3^2 = 9$."

---

### [ID: QUEST-C2-B5] BUKTI 5: Analisis Fenomena "Many-to-One"
- **Judul Bukti:** Mengapa Dua Tombol Boleh Memilih Minuman yang Sama?
- **Materi:** Konsep Fungsi Surjektif / Many-to-One
- **Bentuk Interaksi:** PILIHAN GANDA (Analisis Konseptual)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Pada mesin minuman, tombol nomor 1 dan tombol nomor 3 sama-sama mengeluarkan kaleng "Susu Cokelat".
  Apakah konfigurasi ini melanggar syarat fungsi matematika?
- **Spesifikasi Programmer:**
  - *Visual:* Dua tombol menunjuk ke satu slot kaleng susu yang sama.
  - *Petunjuk Angka Kode:* Jumlah syarat mutlak fungsi yang harus dipenuhi domain = **DIGIT KE-4 KODE RESET: `2`** (yaitu: terpasang semua, dan tidak bercabang).
- **Pilihan Jawaban:**
  A. TIDAK MELANGGAR. Itu adalah fungsi yang sah, karena syarat fungsi hanya melarang domain bercabang, sedangkan kodomain bebas menerima lebih dari satu panah  
  B. MELANGGAR, karena setiap minuman hanya boleh dihubungkan ke satu tombol saja  
  C. MELANGGAR, karena tidak boleh ada dua panah yang mengarah ke tujuan yang sama  
  D. HANYA SAH jika tombolnya ditekan bersamaan  
- **Kunci:** A. TIDAK MELANGGAR. Itu adalah fungsi yang sah, karena syarat fungsi hanya melarang domain bercabang, sedangkan kodomain bebas menerima lebih dari satu panah
- **Nilai Angka Didapat:** **`2`** (dari 2 syarat mutlak fungsi).
- **Pembahasan:**
  Dalam fungsi:
  - Daerah asal (domain) TIDAK BOLEH mendua.
  - Daerah kawan (kodomain) BOLEH menerima lebih dari satu panah (*many-to-one*). Contohnya: dua tombol dispenser berbeda boleh sama-sama mengeluarkan air mineral dingin. Ini adalah fungsi yang 100% sah.
- **Feedback:**
  - *Benar:* "Pemahaman logika fungsi yang matang! Domain tidak boleh mendua, tetapi kodomain boleh menerima banyak panah. Kamu mengantongi Digit Keempat: 2!"
  - *Salah:* "Syarat fungsi hanya mengikat himpunan asal (domain). Kodomain boleh dipilih berulang kali oleh anggota domain yang berbeda."

---

### [ID: QUEST-C2-CODE] KODE AKHIR KASUS 2: Merestart Microchip Vending Machine
- **Judul Bukti:** Memasukkan 4-Digit Kode Reset Kontrol
- **Materi:** Sintesis Hasil Investigasi Kasus 2
- **Bentuk Interaksi:** PUZZLE KODE (Terminal Input)
- **C-Level:** C5 (Mengevaluasi & Sintesis)
- **Skenario & Instruksi:**
  Kumpulkan 4 digit hasil investigasi sistem vending machine:
  - **Digit 1** (dari Bukti 1): Jumlah cabang maksimal yang diizinkan keluar dari satu tombol ($1$).
  - **Digit 2** (dari Bukti 2): Nomor blok diagram sirkuit yang rusak/sabotase ($3$).
  - **Digit 3** (dari Bukti 3): Banyaknya anggota pada himpunan Range aktif ($2$).
  - **Digit 4** (dari Bukti 5): Total syarat mutlak fungsi yang wajib dipenuhi oleh domain ($2$).
  Ketikkan kode 4 digit untuk me-reboot mesin otomatis!
- **Spesifikasi Programmer:**
  - *Display:* Layar LCD retro mesin bertuliskan `ENTER RESET CODE: [ _ _ _ _ ]`.
  - *Validasi Kode:* `1322`
  - *Efek:* Bunyi 'BEEP-BEEP-BEEP-CLINK!', kaleng minuman dingin jatuh ke tempat pengambilan dengan mulus, dan status berubah menjadi `SYSTEM NORMAL - CASE 2 CLOSED!`.
- **Pilihan / Jawaban:** Input kode numerik 4 digit: `1322`.
- **Kunci:** `1322`
- **Pembahasan:**
  - Digit 1 = 1 (Tepat 1 kawan)
  - Digit 2 = 3 (Blok 3 rusak)
  - Digit 3 = 2 (Range = {Susu, Teh}, ada 2 anggota)
  - Digit 4 = 2 (2 syarat fungsi: habis dan tidak bercabang)
  Maka kode reset adalah **1322**.
- **Feedback:**
  - *Benar:* "KASUS 2 SELESAI! Vending machine kembali beroperasi normal dan siswa sekolah bisa menikmati minuman segar tanpa kendala!"
  - *Salah:* "Periksa kembali empat digitmu: Digit 1 = 1, Digit 2 = 3, Digit 3 = 2, Digit 4 = 2. Masukkan kode 1322."

---

# KASUS 3: SKANDAL MANIPULASI ARGO TAKSI LIAR DI STASIUN
**Materi:** Notasi & Rumus Fungsi ($f(x) = ax + b$), Substitusi, Tabel Nilai, dan Pencarian Prapeta  
**Skenario Kasus:**  
Banyak pelancong di Stasiun Kereta Pusat mengadu bahwa mereka ditagih ongkos taksi gelap selangit. Detektif Data menyita sebuah unit argo digital yang telah dipasang chip peretas aljabar. Detektif harus menganalisis formula fungsi tarif dan mengunci frekuensi argo ilegal tersebut.

---

### [ID: QUEST-C3-B1] BUKTI 1: Perhitungan Tarif Resmi Standar
- **Judul Bukti:** Substitusi Nilai Fungsi Tarif Standar
- **Materi:** Menghitung Nilai Fungsi $f(x) = ax + b$
- **Bentuk Interaksi:** INPUT ANGKA (Substitusi Aljabar)
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Regulasi resmi dinas perhubungan menetapkan rumus tarif taksi kota:
  $$f(x) = 4.000x + 6.000$$
  di mana $x$ adalah jarak tempuh (dalam km) dan $f(x)$ adalah total tarif ongkos (dalam Rupiah).
  Berapakah tarif resmi yang seharusnya dibayar penumpang jika menempuh jarak sejauh **$5\text{ km}$**? *(Ketikkan angka nominalnya saja)*
- **Spesifikasi Programmer:**
  - *Input Field:* Angka numerik.
  - *Petunjuk Angka Kode:* Angka puluhan ribu dari tarif ini (Rp 26.000 $\implies$ angka `2`) dicatat sebagai **DIGIT KE-1 KODE BLOKIR**.
- **Pilihan / Jawaban:** Input angka: `26000` (atau `26.000`).
- **Kunci:** `26000`
- **Nilai Angka Didapat:** **`2`** (angka puluhan ribu tarif Rp 26.000).
- **Pembahasan:**
  Substitusikan $x = 5$ ke rumus fungsi tarif:
  $$f(5) = 4.000(5) + 6.000 = 20.000 + 6.000 = 26.000$$
  Jadi tarif resmi perjalanan sejauh 5 km adalah Rp 26.000.
- **Feedback:**
  - *Benar:* "Perhitungan akurat! Tarif normal untuk 5 km adalah Rp 26.000. Kamu mengamankan Digit Pertama: 2!"
  - *Salah:* "Hitung perkalian terlebih dahulu: $4.000 \times 5 = 20.000$. Lalu tambahkan tarif awal buka pintu $6.000$, totalnya Rp 26.000."

---

### [ID: QUEST-C3-B2] BUKTI 2: Melengkapi Sel Tabel Argo yang Sengaja Dihapus
- **Judul Bukti:** Mengisi Tabel Nilai Fungsi
- **Materi:** Melengkapi Tabel Pasangan Nilai Fungsi
- **Bentuk Interaksi:** LENGKAPI TABEL
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Pelaku menghapus beberapa angka pada tabel memori argo resmi $f(x) = 4.000x + 6.000$. Lengkapi nilai ongkos yang hilang pada tabel di bawah:
  | Jarak ($x$ km) | Tarif ($f(x)$ Rupiah) |
  | :---: | :---: |
  | 1 | 10.000 |
  | 2 | **[ Kolom A ]** |
  | 3 | 18.000 |
  | 4 | **[ Kolom B ]** |
- **Spesifikasi Programmer:**
  - *Komponen:* Tabel interaktif dengan dua kotak input untuk Kolom A dan Kolom B.
  - *Petunjuk Angka Kode:* Digit satuan dari jarak $x$ pada Kolom B ($x = 4$) menjadi **DIGIT KE-2 KODE BLOKIR: `4`**.
- **Pilihan / Jawaban:**
  - Kolom A: `14000`
  - Kolom B: `22000`
- **Kunci:** Kolom A = `14000`, Kolom B = `22000`
- **Nilai Angka Didapat:** **`4`** (dari jarak baris Kolom B).
- **Pembahasan:**
  - Untuk $x = 2$: $f(2) = 4.000(2) + 6.000 = 8.000 + 6.000 = 14.000$.
  - Untuk $x = 4$: $f(4) = 4.000(4) + 6.000 = 16.000 + 6.000 = 22.000$.
  Setiap penambahan jarak 1 km, tarif bertambah tepat Rp 4.000 sesuai gradien fungsinya.
- **Feedback:**
  - *Benar:* "Tabel argo berhasil dipulihkan lengkap! Kamu mendapatkan petunjuk Digit Kedua: 4!"
  - *Salah:* "Setiap kenaikan 1 km, tarif bertambah 4.000. Untuk $x=2$ tarifnya $14.000$, untuk $x=4$ tarifnya $22.000$."

---

### [ID: QUEST-C3-B3] BUKTI 3: Menemukan Jarak Tempuh Riil Korban (Mencari Prapeta $x$)
- **Judul Bukti:** Hitung Mundur Jarak Riil Korban
- **Materi:** Menentukan Nilai $x$ Jika Nilai $f(x)$ Diketahui
- **Bentuk Interaksi:** INPUT ANGKA (Penyelesaian Persamaan Linear)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Seorang turis menunjukkan struk pembayaran resmi sebesar **Rp 38.000**. Rumus tarif adalah $f(x) = 4.000x + 6.000$.
  Berapakah jarak tempuh riil (dalam km) yang telah dilalui oleh turis tersebut?
- **Spesifikasi Programmer:**
  - *Input Field:* Angka numerik.
  - *Petunjuk Angka Kode:* Angka hasil jarak tempuh ini langsung menjadi **DIGIT KE-3 KODE BLOKIR: `8`**.
- **Pilihan / Jawaban:** Input angka integer: `8`.
- **Kunci:** `8`
- **Nilai Angka Didapat:** **`8`** (jarak 8 km).
- **Pembahasan:**
  Persamaan fungsi biaya:
  $$f(x) = 38.000$$
  $$4.000x + 6.000 = 38.000$$
  $$4.000x = 38.000 - 6.000$$
  $$4.000x = 32.000$$
  $$x = \frac{32.000}{4.000} = 8\text{ km}$$
  Jadi jarak riil perjalanan turis tersebut adalah 8 km.
- **Feedback:**
  - *Benar:* "Penyelidikan cermat! Dengan memecahkan persamaan linear, jarak riil terbukti 8 km. Kamu mengantongi Digit Ketiga: 8!"
  - *Salah:* "Kurangkan biaya buka pintu terlebih dahulu: $38.000 - 6.000 = 32.000$. Lalu bagi dengan tarif per km: $32.000 / 4.000 = 8$."

---

### [ID: QUEST-C3-B4] BUKTI 4: Membongkar Rumus Manipulasi Argo Liar
- **Judul Bukti:** Analisis Dua Titik untuk Menemukan Rumus Liar
- **Materi:** Menentukan Rumus Fungsi Linear $f(x) = ax + b$ dari Dua Titik
- **Bentuk Interaksi:** PILIHAN GANDA (Aljabar Eliminasi)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Detektif Data memeriksa 2 struk sitaan dari taksi liar yang sama:
  - Struk 1 (Jarak $2\text{ km}$): Ditagih sebesar **Rp 18.000** $\implies f(2) = 18.000$
  - Struk 2 (Jarak $5\text{ km}$): Ditagih sebesar **Rp 36.000** $\implies f(5) = 36.000$
  Manakah rumus fungsi tarif curang yang ditanamkan pelaku pada chip argo liar tersebut?
- **Spesifikasi Programmer:**
  - *Komponen:* Gambar dua struk bukti dan 4 kartu opsi formula.
- **Pilihan Jawaban:**
  A. $f(x) = 6.000x + 6.000$  
  B. $f(x) = 5.000x + 8.000$  
  C. $f(x) = 4.000x + 10.000$  
  D. $f(x) = 6.000x + 4.000$  
- **Kunci:** A. $f(x) = 6.000x + 6.000$
- **Nilai Angka Didapat:** Nilai tarif per kilometer liar $a = 6.000$ (angka ribuannya = `6`).
- **Pembahasan:**
  Bentuk umum fungsi: $f(x) = ax + b$.
  1. $f(2) = 2a + b = 18.000$
  2. $f(5) = 5a + b = 36.000$
  Kurangkan persamaan (2) dengan (1):
  $$(5a + b) - (2a + b) = 36.000 - 18.000$$
  $$3a = 18.000 \implies a = 6.000$$
  Substitusikan $a = 6.000$ ke persamaan (1):
  $$2(6.000) + b = 18.000$$
  $$12.000 + b = 18.000 \implies b = 6.000$$
  Jadi rumus tarif argo curang adalah $f(x) = 6.000x + 6.000$. Pelaku menaikkan tarif per km menjadi Rp 6.000 (resmi hanya Rp 4.000)!
- **Feedback:**
  - *Benar:* "Modus kejahatan terbongkar! Pelaku memodifikasi fungsi menjadi $6.000x + 6.000$. Bukti kejahatan aljabar tak terbantahkan!"
  - *Salah:* "Gunakan eliminasi: selisih biaya $36.000 - 18.000 = 18.000$ dibagi selisih jarak $5 - 2 = 3$ menghasilkan $a = 6.000$. Lalu cari $b = 6.000$."

---

### [ID: QUEST-C3-B5] BUKTI 5: Menghitung Kerugian Korban
- **Judul Bukti:** Menghitung Selisih Tarif Liar vs Resmi
- **Materi:** Perbandingan Dua Nilai Fungsi
- **Bentuk Interaksi:** INPUT ANGKA
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Untuk perjalanan sejauh **$3\text{ km}$**:
  - Tarif Liar: $f(3) = 6.000(3) + 6.000 = 24.000$
  - Tarif Resmi: $g(3) = 4.000(3) + 6.000 = 18.000$
  Berapakah selisih kerugian lebih bayar yang dialami korban dalam satuan ribuan rupiah? *(Ketikkan angka ribuannya saja, contoh: Rp 5.000 ketik 5)*
- **Spesifikasi Programmer:**
  - *Input Field:* Angka integer.
  - *Petunjuk Angka Kode:* Angka selisih kerugian ini menjadi **DIGIT KE-4 KODE BLOKIR: `6`**.
- **Pilihan / Jawaban:** Input angka: `6`.
- **Kunci:** `6`
- **Nilai Angka Didapat:** **`6`** (selisih Rp 6.000).
- **Pembahasan:**
  Selisih tarif pada $x = 3$:
  $$\text{Selisih} = 24.000 - 18.000 = 6.000\text{ Rupiah}$$
  Angka dalam ribuan adalah 6.
- **Feedback:**
  - *Benar:* "Tepat! Korban dirugikan sebesar Rp 6.000 per 3 km perjalanan. Seluruh 4 digit kode pemblokir server telah lengkap: 2 - 4 - 8 - 6!"
  - *Salah:* "Kurangkan: $24.000 - 18.000 = 6.000$. Ketikkan angka 6."

---

### [ID: QUEST-C3-CODE] KODE AKHIR KASUS 3: Memblokir Server Argo Liar
- **Judul Bukti:** Input 4-Digit Security Override Code
- **Materi:** Sintesis Hasil Investigasi Kasus 3
- **Bentuk Interaksi:** PUZZLE KODE (Terminal Cyber Police)
- **C-Level:** C5 (Mengevaluasi & Sintesis)
- **Skenario & Instruksi:**
  Masukkan 4-digit kode hasil investigasi untuk memutus koneksi server argo liar:
  - **Digit 1** (dari Bukti 1): Angka puluhan ribu tarif resmi 5 km ($2$).
  - **Digit 2** (dari Bukti 2): Jarak $x$ pada baris Kolom B tabel ($4$).
  - **Digit 3** (dari Bukti 3): Jarak riil turis untuk tarif Rp 38.000 ($8$).
  - **Digit 4** (dari Bukti 5): Selisih kelebihan bayar per 3 km dalam ribuan ($6$).
  Ketikkan kode 4 digit untuk menghentikan operasi armada liar!
- **Spesifikasi Programmer:**
  - *Display:* Layar command line terminal cyber police: `ENTER OVERRIDE CODE: [ _ _ _ _ ]`.
  - *Validasi Kode:* `2486`
  - *Efek:* Sirene mobil patroli polisi berbunyi, server argo ilegal terkunci permanen, dan muncul stempel `KASUS 3 SELESAI: ARGO LIAR DIBEKUKAN! (CASE CLOSED)`.
- **Pilihan / Jawaban:** Input kode 4 digit: `2486`.
- **Kunci:** `2486`
- **Pembahasan:**
  - Digit 1 = 2 (Rp 26.000 $\implies$ 2)
  - Digit 2 = 4 (Jarak 4 km)
  - Digit 3 = 8 (Jarak 8 km)
  - Digit 4 = 6 (Selisih Rp 6.000 $\implies$ 6)
  Maka kode penonaktifannya adalah **2486**.
- **Feedback:**
  - *Benar:* "KASUS 3 TUNTAS! Server taksi liar berhasil diblokir dengan kode 2486. Seluruh penumpang di stasiun kini terlindungi oleh tarif resmi!"
  - *Salah:* "Periksa kembali catatan buktimu: Digit 1 = 2, Digit 2 = 4, Digit 3 = 8, Digit 4 = 6. Masukkan kode 2486."

---

# KASUS 4: JEJAK RADAR PENYELUNDUP DI PERBATASAN LAUT
**Materi:** Grafik Fungsi Linear, Titik Potong Sumbu X dan Y, Gradien, dan Perpotongan Dua Garis  
**Skenario Kasus:**  
Kapal cepat penyelundup terdeteksi radar penjaga pantai melintasi perairan perbatasan pada malam berkabut. Detektif Data bersama kapten kapal patroli harus memetakan persamaan garis lintasan kapal dan menentukan titik koordinat penyergapan yang presisi di laut lepas.

---

### [ID: QUEST-C4-B1] BUKTI 1: Melacak Dermaga Keberangkatan (Titik Potong Sumbu Y)
- **Judul Bukti:** Klik Posisi Keberangkatan Kapal di Pagar Sumbu Y
- **Materi:** Menentukan Titik Potong Sumbu Y pada Grafik Linear
- **Bentuk Interaksi:** KLIK TITIK (Radar Grid)
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Kapal penyelundup mulai bergerak dari garis pantai barat (sumbu Y) mengikuti lintasan radar:
  $$f(x) = 2x + 6$$
  Klik titik koordinat pada sumbu Y tempat kapal penyelundup memulai pelariannya!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [-2, 6]$, Rentang $Y \in [0, 10]$, step grid = 1.
  - *Interaksi:* Siswa mengklik titik $(0, 6)$ pada sumbu Y.
  - *Petunjuk Angka Kode:* Ordinat titik potong ini (angka `6`) menjadi **DIGIT KE-1 KORDINAT SERGAP**.
- **Pilihan / Jawaban:** Mengklik titik `(0, 6)` pada grid koordinat radar.
- **Kunci:** Titik `(0, 6)`
- **Nilai Angka Didapat:** **`6`** (koordinat dermaga awal).
- **Pembahasan:**
  Titik potong sumbu Y terjadi ketika nilai absis $x = 0$.
  $$f(0) = 2(0) + 6 = 6 \implies (0, 6)$$
  Jadi kapal penyelundup berangkat dari titik koordinat $(0, 6)$.
- **Feedback:**
  - *Benar:* "Sinyal keberangkatan terdeteksi! Kapal berangkat tepat dari koordinat $(0, 6)$. Kamu mendapatkan Digit Pertama: 6!"
  - *Salah:* "Titik potong sumbu Y berada di garis tegak $x = 0$. Masukkan $x=0$, maka $y = 6$ di titik $(0, 6)$."

---

### [ID: QUEST-C4-B2] BUKTI 2: Titik Pelintasan Garis Pantai Selatan (Titik Potong Sumbu X)
- **Judul Bukti:** Klik Titik Potong Sumbu X Garis Radar
- **Materi:** Menentukan Titik Potong Sumbu X pada Grafik Linear
- **Bentuk Interaksi:** KLIK TITIK (Radar Grid)
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Sensor sonar mendeteksi sebuah ranjau suar yang dipasang penyelundup di garis perairan dangkal (sumbu mendatar X). Jalur kabel sonar mengikuti persamaan:
  $$g(x) = 3x - 9$$
  Klik titik koordinat pada sumbu X di mana kabel sonar memotong garis perairan dangkal!
- **Spesifikasi Programmer:**
  - *Sumbu:* Rentang $X \in [0, 6]$, Rentang $Y \in [-10, 2]$, step grid = 1.
  - *Interaksi:* Siswa mengklik titik $(3, 0)$ pada sumbu X.
  - *Petunjuk Angka Kode:* Nilai absis titik ini (angka `3`) menjadi **DIGIT KE-2 KORDINAT SERGAP**.
- **Pilihan / Jawaban:** Mengklik titik `(3, 0)` pada grid radar.
- **Kunci:** Titik `(3, 0)`
- **Nilai Angka Didapat:** **`3`** (posisi ranjau sonar).
- **Pembahasan:**
  Titik potong sumbu X terjadi saat nilai ordinat $y = g(x) = 0$:
  $$3x - 9 = 0 \implies 3x = 9 \implies x = 3$$
  Koordinat perpotongannya adalah $(3, 0)$.
- **Feedback:**
  - *Benar:* "Ranjau sonar berhasil ditandai di koordinat $(3, 0)$! Kamu mengamankan Digit Kedua: 3!"
  - *Salah:* "Jadikan $g(x) = 0$: $3x - 9 = 0 \implies 3x = 9 \implies x = 3$. Titiknya adalah $(3, 0)$."

---

### [ID: QUEST-C4-B3] BUKTI 3: Menghitung Kemiringan Sudut Kecepatan (Gradien $m$)
- **Judul Bukti:** Perhitungan Gradien Jalur Kapal Patroli
- **Materi:** Menghitung Gradien dari Dua Titik Koordinat
- **Bentuk Interaksi:** INPUT ANGKA (Kalkulasi Kemiringan)
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Kapal patroli polisi melaju dari Pos Pengintai A di koordinat $(1, 2)$ menuju Pos Pengintai B di koordinat $(4, 8)$.
  Berapakah nilai angka kemiringan (gradien $m$) lintasan kapal patroli polisi?
- **Spesifikasi Programmer:**
  - *Input Field:* Angka integer.
  - *Petunjuk Angka Kode:* Nilai gradien ini (angka `2`) menjadi **DIGIT KE-3 KORDINAT SERGAP**.
- **Pilihan / Jawaban:** Input angka: `2`.
- **Kunci:** `2`
- **Nilai Angka Didapat:** **`2`** (nilai gradien lintasan).
- **Pembahasan:**
  Rumus gradien melalui dua titik:
  $$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{8 - 2}{4 - 1} = \frac{6}{3} = 2$$
  Nilai gradien kemiringan garis kapal patroli adalah 2.
- **Feedback:**
  - *Benar:* "Perhitungan navigasi presisi! Gradien kecepatan kapal patroli adalah $m = 2$. Kamu mendapatkan Digit Ketiga: 2!"
  - *Salah:* "Gunakan rumus $m = (y_2 - y_1) / (x_2 - x_1) = (8 - 2) / (4 - 1) = 6 / 3 = 2$."

---

### [ID: QUEST-C4-B4] BUKTI 4: Membongkar Sinyal Umpan Palsu Penyelundup
- **Judul Bukti:** Menguji Titik yang Terletak pada Garis
- **Materi:** Uji Kedudukan Titik Koordinat pada Garis Fungsi Linear
- **Bentuk Interaksi:** DETEKSI KESALAHAN (Radar Sinyal Titik)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Jalur asli kapal penyelundup mengikuti persamaan:
  $$f(x) = -2x + 8$$
  Layar radar menampilkan 4 titik sinyal kapal. Tiga di antaranya berada tepat di jalur garis pelarian, namun ada **SATU SINYAL PALSU (UMPAN)** yang posisinya melenceng di luar garis!
  Klik titik sinyal palsu tersebut!
- **Spesifikasi Programmer:**
  - *Grid Radar:* Garis $y = -2x + 8$.
  - *4 Titik yang Muncul:*
    - Sinyal 1: $(1, 6)$ [Benar pada garis: $-2(1)+8 = 6$]
    - Sinyal 2: $(2, 4)$ [Benar pada garis: $-2(2)+8 = 4$]
    - Sinyal 3: $(3, 2)$ [Benar pada garis: $-2(3)+8 = 2$]
    - Sinyal 4: $(2, 7)$ [UMPAN PALSU - Di luar garis: seharusnya $y=4$, bukan 7!]
- **Pilihan Jawaban:** Klik titik $(1, 6)$, $(2, 4)$, $(3, 2)$, atau $(2, 7)$.
- **Kunci:** Titik `(2, 7)`
- **Nilai Angka Didapat:** Umpan berhasil dieliminasi; koordinat riil kapal terfokus ke jalur asli.
- **Pembahasan:**
  Substitusikan nilai $x = 2$ ke dalam persamaan garis:
  $$f(2) = -2(2) + 8 = -4 + 8 = 4$$
  Sinyal yang asli seharusnya berada di $(2, 4)$. Titik $(2, 7)$ memiliki nilai $y = 7$ yang tidak cocok, sehingga terbukti merupakan sinyal umpan palsu.
- **Feedback:**
  - *Benar:* "Umpan palsu terdeteksi! Titik $(2, 7)$ tidak memenuhi persamaan $-2x + 8$. Radar kini terkunci penuh ke kapal target!"
  - *Salah:* "Masukkan nilai $x$ masing-masing titik ke $-2x + 8$. Cari titik yang hasil $y$-nya tidak sesuai."

---

### [ID: QUEST-C4-B5] BUKTI 5: Menentukan Titik Temu Penyergapan (Interseksi Dua Garis)
- **Judul Bukti:** Titik Potong Dua Garis Linear
- **Materi:** Menentukan Titik Potong Antara Dua Grafik Fungsi Linear
- **Bentuk Interaksi:** PILIHAN GANDA (Analisis Titik Temu)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Kapal patroli polisi melaju di lintasan garis $y = x + 1$, sementara kapal penyelundup bergerak di lintasan $y = -x + 5$.
  Pada titik koordinat manakah kedua kapal akan saling berpotongan di mana penyergapan harus dilakukan?
- **Spesifikasi Programmer:**
  - *Visual:* Dua garis bersilangan di layar radar dengan cincin target berkedip.
  - *Petunjuk Angka Kode:* Nilai absis $x$ dari titik sergap ini (angka `2`) menjadi **DIGIT KE-4 KORDINAT SERGAP**.
- **Pilihan Jawaban:**
  A. $(2, 3)$  
  B. $(3, 2)$  
  C. $(1, 2)$  
  D. $(4, 1)$  
- **Kunci:** A. $(2, 3)$
- **Nilai Angka Didapat:** **`2`** (nilai koordinat $x$ titik potong).
- **Pembahasan:**
  Samakan kedua fungsi untuk mencari titik potongnya:
  $$x + 1 = -x + 5$$
  $$x + x = 5 - 1$$
  $$2x = 4 \implies x = 2$$
  Substitusikan $x = 2$ ke salah satu fungsi:
  $$y = 2 + 1 = 3$$
  Titik temu kedua kapal berada tepat di koordinat $(2, 3)$.
- **Feedback:**
  - *Benar:* "Koordinat intersepsi terkunci! Titik potong kedua garis adalah $(2, 3)$. Seluruh 4 digit koordinat penyergapan siap diluncurkan: 6 - 3 - 2 - 2!"
  - *Salah:* "Samakan persamaan: $x + 1 = -x + 5 \implies 2x = 4 \implies x = 2$. Maka $y = 3$, titiknya $(2, 3)$."

---

### [ID: QUEST-C4-CODE] KODE AKHIR KASUS 4: Mengunci Koordinat Intersepsi Armada
- **Judul Bukti:** Input 4-Digit Radar Intercept Code
- **Materi:** Sintesis Hasil Investigasi Kasus 4
- **Bentuk Interaksi:** PUZZLE KODE (Radar Tactical Terminal)
- **C-Level:** C5 (Mengevaluasi & Sintesis)
- **Skenario & Instruksi:**
  Gabungkan 4 digit data navigasi hasil pelacakan radar:
  - **Digit 1** (dari Bukti 1): Posisi $y$ dermaga keberangkatan ($6$).
  - **Digit 2** (dari Bukti 2): Posisi $x$ ranjau sonar pantai ($3$).
  - **Digit 3** (dari Bukti 3): Nilai gradien kapal patroli ($2$).
  - **Digit 4** (dari Bukti 5): Koordinat absis $x$ titik temu penyergapan ($2$).
  Ketikkan kode 4 digit untuk memerintahkan kapal patroli melakukan pengepungan!
- **Spesifikasi Programmer:**
  - *Display:* Layar taktis hijau radar laut: `TARGET COORDINATES: [ _ _ _ _ ]`.
  - *Validasi Kode:* `6322`
  - *Efek:* Lampu sorot kapal menyala terang di layar, kapal penyelundup terkepung tanpa perlawanan, dan stempel `KASUS 4 SELESAI: PENYELUNDUP BERHASIL DICEGAT! (CASE CLOSED)`.
- **Pilihan / Jawaban:** Input kode 4 digit: `6322`.
- **Kunci:** `6322`
- **Pembahasan:**
  - Digit 1 = 6 (Dermaga Y di $(0, 6)$)
  - Digit 2 = 3 (Pantai X di $(3, 0)$)
  - Digit 3 = 2 (Gradien $m = 2$)
  - Digit 4 = 2 (Titik potong $x = 2$ pada $(2, 3)$)
  Maka kode koordinat intersepnya adalah **6322**.
- **Feedback:**
  - *Benar:* "KASUS 4 TERPECAHKAN! Koordinat 6322 mengarahkan kapal patroli tepat ke sasaran. Kapal penyelundup berhasil diamankan!"
  - *Salah:* "Cek kembali data buktimu: Digit 1 = 6, Digit 2 = 3, Digit 3 = 2, Digit 4 = 2. Masukkan kode 6322."

---

# KASUS 5: GEMBOK MASTER BRANKAS BANK DATA SENTRAL
**Materi:** Korespondensi Satu-Satu (Fungsi Bijektif) dan Perhitungan Faktorial ($n!$)  
**Skenario Kasus:**  
Bank Data Sentral diserang oleh virus siber yang mengunci brankas arsip rahasia negara. Sistem keamanan darurat hanya menerima otorisasi korespondensi satu-satu (fungsi bijektif) yang sempurna. Detektif Data harus memecahkan 5 teka-teki enkripsi untuk membuka brankas utama sebelum data terhapus otomatis!

---

### [ID: QUEST-C5-B1] BUKTI 1: Menghubungkan Kunci Otorisasi Digital ($1:1$)
- **Judul Bukti:** Hubungkan Pasangan 3 Kunci ke 3 Port Server
- **Materi:** Syarat Dasar Korespondensi Satu-Satu
- **Bentuk Interaksi:** DIAGRAM PANAH INTERAKTIF
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Detektif Data memiliki 3 kunci token digital $\{K_1, K_2, K_3\}$ dan 3 port server $\{P_A, P_B, P_C\}$.
  Protokol Keamanan: **Setiap kunci harus masuk ke tepat satu port, dan setiap port hanya boleh dimasuki tepat satu kunci (tidak boleh ada port kosong dan tidak boleh ada kunci dobel).**
  Tarik garis panah untuk membentuk korespondensi satu-satu yang sah!
- **Spesifikasi Programmer:**
  - *Komponen:* Diagram panah 3 node kiri dan 3 node kanan.
  - *Validasi:* Setiap node kiri punya tepat 1 panah keluar, setiap node kanan menerima tepat 1 panah masuk.
  - *Petunjuk Angka Kode:* Jumlah kemungkinan susunan korespondensi satu-satu untuk 3 anggota ($3!$) dicatat sebagai **DIGIT KE-1 KODE MASTER: `6`**.
- **Pilihan / Jawaban:** Menghubungkan setiap kunci ke satu port berbeda (misal $K_1 \rightarrow P_A, K_2 \rightarrow P_B, K_3 \rightarrow P_C$).
- **Kunci:** Pemetaan bijektif 1:1 valid.
- **Nilai Angka Didapat:** **`6`** (dari nilai $3! = 3 \times 2 \times 1 = 6$).
- **Pembahasan:**
  Relasi korespondensi satu-satu menuntut pemetaan timbal balik:
  Setiap elemen domain punya tepat 1 kawan di kodomain, dan setiap elemen kodomain punya tepat 1 kawan di domain. Banyaknya susunan yang mungkin adalah $3! = 3 \times 2 \times 1 = 6$ cara.
- **Feedback:**
  - *Benar:* "Koneksi otorisasi sukses! Korespondensi satu-satu 3 elemen menghasilkan $3! = 6$ cara susunan. Kamu mendapatkan Digit Pertama: 6!"
  - *Salah:* "Pastikan tidak ada kunci yang memilih port yang sama, dan semua port terisi penuh."

---

### [ID: QUEST-C5-B2] BUKTI 2: Menemukan Diagram Transmisi Data Ilegal
- **Judul Bukti:** Deteksi Pelanggaran Syarat Korespondensi Satu-Satu
- **Materi:** Pelanggaran Karakteristik Bijektif
- **Bentuk Interaksi:** DETEKSI KESALAHAN
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Virus siber mencoba menyusup dengan diagram transmisi palsu. Temukan diagram yang **BUKAN MERUPAKAN KORESPONDENSI SATU-SATU**!
- **Spesifikasi Programmer:**
  - *Panel 4 Diagram:*
    - Diagram A: $\{(1, a), (2, b), (3, c)\}$ [Sah 1:1]
    - Diagram B: $\{(1, b), (2, c), (3, a)\}$ [Sah 1:1]
    - Diagram C: $\{(1, a), (2, a), (3, c)\}$ [ILEGAL - Elemen $a$ menerima dua kunci, dan elemen $b$ kosong!]
    - Diagram D: $\{(1, c), (2, a), (3, b)\}$ [Sah 1:1]
- **Pilihan Jawaban:** Klik Diagram A, B, C, atau D.
- **Kunci:** `Diagram C`
- **Nilai Angka Didapat:** Serangan virus pada jalur C berhasil dinetralisir.
- **Pembahasan:**
  Pada Diagram C:
  - Anggota asal 1 dan 2 sama-sama memanah anggota kawan '$a$'.
  - Anggota kawan '$b$' tidak menerima panah sama sekali.
  Ini melanggar syarat korespondensi satu-satu.
- **Feedback:**
  - *Benar:* "Transmisi virus terdeteksi! Diagram C melanggar syarat 1:1 karena elemen '$a$' bercabang dua dan '$b$' kosong."
  - *Salah:* "Cari diagram yang anggota himpunan kanannya menerima 2 panah atau ada yang kosong."

---

### [ID: QUEST-C5-B3] BUKTI 3: Uji Kemungkinan Kasus $n(A) 
eq n(B)$
- **Judul Bukti:** Analisis Kardinalitas Himpunan Berbeda
- **Materi:** Syarat Mutlak $n(A) = n(B)$
- **Bentuk Interaksi:** INPUT ANGKA (Logika Matematika)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Sistem mendeteksi upaya pembuatan korespondensi satu-satu antara:
  - Himpunan Token $A = \{T_1, T_2, T_3, T_4, T_5\}$ dengan $n(A) = 5$
  - Himpunan Port $B = \{P_1, P_2, P_3, P_4\}$ dengan $n(B) = 4$
  Berapakah banyaknya kemungkinan korespondensi satu-satu yang dapat dibentuk dari himpunan A ke himpunan B?
- **Spesifikasi Programmer:**
  - *Input Field:* Angka integer.
  - *Petunjuk Angka Kode:* Hasil perhitungan ini (angka `0`) menjadi **DIGIT KE-2 KODE MASTER: `0`**.
- **Pilihan / Jawaban:** Input angka: `0`.
- **Kunci:** `0`
- **Nilai Angka Didapat:** **`0`** (karena mustahil dibentuk saat jumlah anggota berbeda).
- **Pembahasan:**
  Syarat mutlak paling fundamental dari korespondensi satu-satu adalah:
  $$n(A) = n(B)$$
  Karena $n(A) = 5$ dan $n(B) = 4$ ($5 \neq 4$), pasti ada 1 token yang tidak kebagian port atau ada port yang diisi lebih dari 1 token.
  Oleh karena itu, banyaknya korespondensi satu-satu yang mungkin dibentuk adalah **0**.
- **Feedback:**
  - *Benar:* "Analisis logika yang tajam! Karena jumlah anggota tidak sama ($5 \neq 4$), jawabannya adalah 0. Kamu mendapatkan Digit Kedua: 0!"
  - *Salah:* "Jangan terjebak rumus faktorial! Syarat utama korespondensi 1-1 adalah jumlah anggota harus sama. Jika berbeda, hasilnya 0."

---

### [ID: QUEST-C5-B4] BUKTI 4: Menghitung Nilai Faktorial Pengawalan Terminal ($2!$)
- **Judul Bukti:** Perhitungan Faktorial untuk $n = 2$
- **Materi:** Nilai Faktorial Sederhana
- **Bentuk Interaksi:** INPUT ANGKA
- **C-Level:** C3 (Mengaplikasikan)
- **Skenario & Instruksi:**
  Dua firewall cadangan $\{F_1, F_2\}$ melindungi 2 saluran data $\{D_1, D_2\}$.
  Berapakah banyak kemungkinan susunan korespondensi satu-satu yang dapat dibentuk dari firewall ke saluran data ($2!$)?
- **Spesifikasi Programmer:**
  - *Input Field:* Angka integer.
  - *Petunjuk Angka Kode:* Hasil perkalian faktorial ini (angka `2`) menjadi **DIGIT KE-3 KODE MASTER: `2`**.
- **Pilihan / Jawaban:** Input angka: `2`.
- **Kunci:** `2`
- **Nilai Angka Didapat:** **`2`** (dari $2! = 2$).
- **Pembahasan:**
  Untuk $n = 2$:
  $$2! = 2 \times 1 = 2\text{ kemungkinan cara}$$
- **Feedback:**
  - *Benar:* "Tepat! $2! = 2 \times 1 = 2$. Kamu mengamankan Digit Ketiga: 2!"
  - *Salah:* "Hitung perkalian mundur: $2 \times 1 = 2$."

---

### [ID: QUEST-C5-B5] BUKTI 5: Penyederhanaan Pecahan Faktorial ($rac{4!}{3!}$)
- **Judul Bukti:** Menghitung Rasio Kapasitas Enkripsi
- **Materi:** Operasi Aljabar Faktorial
- **Bentuk Interaksi:** PILIHAN GANDA (Kalkulasi Rasio)
- **C-Level:** C4 (Menganalisis)
- **Skenario & Instruksi:**
  Prosesor enkripsi membandingkan banyaknya korespondensi untuk 4 terminal data ($4!$) dengan 3 terminal data ($3!$):
  $$\text{Rasio} = \frac{4!}{3!}$$
  Berapakah nilai hasil dari pembagian nilai faktorial tersebut?
- **Spesifikasi Programmer:**
  - *Petunjuk Angka Kode:* Hasil rasio ini (angka `4`) menjadi **DIGIT KE-4 KODE MASTER: `4`**.
- **Pilihan Jawaban:**
  A. $4$  
  B. $12$  
  C. $2$  
  D. $8$  
- **Kunci:** A. $4$
- **Nilai Angka Didapat:** **`4`** (hasil bagi $\frac{24}{6} = 4$).
- **Pembahasan:**
  $$\frac{4!}{3!} = \frac{4 \times 3 \times 2 \times 1}{3 \times 2 \times 1} = 4$$
  Atau $\frac{24}{6} = 4$.
- **Feedback:**
  - *Benar:* "Kalkulasi sempurna! $\frac{24}{6} = 4$. Keempat digit master brankas bank data telah lengkap terkumpul: 6 - 0 - 2 - 4!"
  - *Salah:* "Coret faktor $3!$ di atas dan bawah, tersisa angka 4. Atau hitung $24 / 6 = 4$."

---

### [ID: QUEST-C5-CODE] KODE AKHIR KASUS 5: Membuka Brankas Master Bank Data Sentral
- **Judul Bukti:** Input 4-Digit Master Cipher Brankas Sentral
- **Materi:** Sintesis Penyelidikan Kasus 5
- **Bentuk Interaksi:** PUZZLE KODE (Master Vault Terminal)
- **C-Level:** C5 (Mengevaluasi & Sintesis)
- **Skenario & Instruksi:**
  Waktu hitung mundur tersisa beberapa detik! Masukkan 4 digit kode master verifikasi:
  - **Digit 1** (dari Bukti 1): Banyak kemungkinan korespondensi 3 anggota ($6$).
  - **Digit 2** (dari Bukti 3): Banyak kemungkinan korespondensi saat $n(A) \neq n(B)$ ($0$).
  - **Digit 3** (dari Bukti 4): Hasil perhitungan nilai $2!$ ($2$).
  - **Digit 4** (dari Bukti 5): Hasil perhitungan dari $\frac{4!}{3!}$ ($4$).
  Ketikkan kode master 4 digit untuk membuka brankas sentral!
- **Spesifikasi Programmer:**
  - *Display:* Brankas baja titanium dengan keypad digital glowing emas: `ENTER MASTER CIPHER: [ _ _ _ _ ]`.
  - *Validasi Kode:* `6024`
  - *Efek:* Roda gembok raksasa berputar 360 derajat, pintu brankas terbuka mengeluarkan sinar keemasan, konfeti berhamburan masif, lagu kemenangan berkumandang, dan muncul piagam penghargaan: `SELURUH QUEST INVESTIGASI SELESAI: GELAR MASTER DETEKTIF DATA RESMI DIRAIH! (CASE CLOSED)`.
- **Pilihan / Jawaban:** Input kode 4 digit: `6024`.
- **Kunci:** `6024`
- **Pembahasan:**
  - Digit 1 = 6 ($3! = 6$)
  - Digit 2 = 0 ($n(A) \neq n(B) \implies 0$)
  - Digit 3 = 2 ($2! = 2$)
  - Digit 4 = 4 ($\frac{4!}{3!} = 4$)
  Maka kombinasi kodenya adalah **6024**.
- **Feedback:**
  - *Benar:* "KASUS 5 SELESAI DENGAN GEMILANG! Brankas Bank Data Sentral berhasil dibuka dengan kode 6024! Seluruh data negara terselamatkan dan kamu dinobatkan sebagai Master Detektif Data!"
  - *Salah:* "Periksa kembali catatan buktimu: Digit 1 = 6, Digit 2 = 0, Digit 3 = 2, Digit 4 = 4. Masukkan kode 6024."

---

# RANGKUMAN IMPLEMENTASI TEKNIS QUEST MODE UNTUK DEVELOPER

| Komponen Game | Implementasi pada Engine (`QuestModeExam.jsx`) |
| :--- | :--- |
| **Penyajian Kasus** | Siswa memilih 1 dari 5 Kasus Besar di menu Quest. Layar menampilkan kartu briefing kasus dengan narasi investigasi visual. |
| **Sistem Rantai Bukti** | Soal 1 s/d 5 disajikan sebagai "Bukti 1" s/d "Bukti 5". Penyelesaian setiap bukti membuka clue angka untuk "KODE AKHIR". |
| **Mekanik Interaksi** | - `ARROWS`: Menghubungkan titik panah.<br>- `CARTESIAN`: Menandai koordinat titik di bidang koordinat.<br>- `MATCHING`: Menjodohkan pasangan kartu.<br>- `FAULT_DETECTION`: Mengklik diagram/nota yang salah.<br>- `TABLE_FILL`: Mengisi sel tabel yang hilang.<br>- `NUMBER_INPUT`: Mengetik nilai angka perhitungan.<br>- `CIPHER_KEYPAD`: Memasukkan 4-digit kode brankas akhir. |
| **Kondisi Menang / Kalah** | - **Menang (Case Closed):** 5 Bukti teranalisis dan Kode Akhir benar $\implies$ Animasi Brankas Terbuka + Nilai Sempurna + Badge Detektif Emas.<br>- **Kalah (Case Pending):** Kode salah atau waktu 30 menit habis $\implies$ Alarm berbunyi + Kesempatan retry investigasi. |
