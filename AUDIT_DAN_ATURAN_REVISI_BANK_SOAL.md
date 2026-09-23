# 📋 DOKUMEN AUDIT DAN ATURAN KERJA REVISI BANK SOAL
## Game Edukasi Matematika "Detektif Data: Relasi dan Fungsi" (SMP Kelas VIII)

**Sumber Dokumen Asal:** `Bank_Soal_dan_Kunci_Jawaban_Game_Detektif_Data.docx`  
**Sasaran Pengguna:** Siswa SMP Kelas VIII (Kurikulum Merdeka / Kurikulum 2013)  
**Total Instrumen Terdata:** ~667 Soal (Kuis Video, Chapter Mode Kasus, Latihan & Remedial, Quest Mode, Endless Mode)  
**Status Tahap Ini:** **AUDIT & ATURAN KERJA REVISI (TIDAK ADA PERUBAHAN SOAL PADA TAHAP INI)**

---

## 📑 DAFTAR ISI AUDIT
1. [Ringkasan Eksekutif & Temuan Kritis](#1-ringkasan-eksekutif--temuan-kritis)
2. [Audit Bagian A: Identifikasi Soal Sesuai Kriteria Evaluasi](#2-audit-bagian-a-identifikasi-soal-sesuai-kriteria-evaluasi)
   - 2.1 Soal yang Sudah Baik
   - 2.2 Soal yang Perlu Perbaikan Bahasa (Bahasa SMP Kelas VIII)
   - 2.3 Soal yang Perlu Perbaikan Konsep Matematika & Kurikulum
   - 2.4 Soal dengan Kunci Jawaban / Format Bermasalah
   - 2.5 Soal yang Terlalu Repetitif & Artifisial
   - 2.6 Soal dengan Tingkat Kognitif (Bloom C-Level) Tidak Sesuai
   - 2.7 Soal yang Sebaiknya Tetap Pilihan Ganda (MCQ)
   - 2.8 Soal yang Sangat Cocok Dijadikan Interaktif
3. [Audit Bagian B: Pemetaan 18 Jenis Interaksi Game "Detektif Data"](#3-audit-bagian-b-pemetaan-18-jenis-interaksi-game-detektif-data)
4. [Aturan Kerja & Standar Operasional Prosedur (SOP) Revisi Tahap Berikutnya](#4-aturan-kerja--standar-operasional-prosedur-sop-revisi-tahap-berikutnya)

---

## 1. RINGKASAN EKSEKUTIF & TEMUAN KRITIS

Dari hasil penelaahan mendalam terhadap seluruh 5.175 baris dokumen teks bank soal, ditemukan beberapa temuan kritis yang membutuhkan perbaikan terstruktur:

| No | Wilayah Masalah | Lokasi / Chapter | Temuan Utama | Dampak pada Game |
|:---|:---|:---|:---|:---|
| **1** | **Konten Hilang / Kosong** | **Bab 2 Chapter Mode (Stage 11–20)** | Stage 11 sampai Stage 20 hanya memuat pengulangan satu baris konsep matematis. **Tidak ada skenario kasus, instruksi soal, opsi, maupun kunci jawaban.** | Bab 2 tidak bisa dimainkan pada stage 11–20 jika diimplementasikan langsung. |
| **2** | **Soal Deklaratif (Bukan Pertanyaan)** | **Bab 2 Chapter Mode (Stage 1–10)** | Formatnya hanya daftar: `Mesin #1: FUNGSI SAH`, `Mesin #2: BUKAN FUNGSI`. Tidak ada pertanyaan aktif bagi siswa. | Siswa hanya membaca kunci jawaban tanpa proses berpikir/investigasi. |
| **3** | **Repetisi Ekstrem & Kering Konteks** | **Bab 5 Chapter Mode (Stage 1–20)** | Semua stage ganjil memakai `{Siswa A, B, C} ➔ {Kursi 1, 2, 3}` dan genap memakai `{Elemen A-1, A-2} ➔ {Elemen B-1, B-2}` dengan kunci identik `1➔1, 2➔2`. | Merusak daya tarik narasi "Detektif Data", membosankan dan tidak bermakna edukatif. |
| **4** | **Ironi "Grafik Tanpa Grafik"** | **Bab 4 Chapter Mode (Stage 1–20)** | Materi mengenai "Grafik Fungsi Linear", namun 100% soal berupa Pilihan Ganda sebaris teks `(0, 6) \| (6, 0)`. Sama sekali tidak ada interaksi koordinat/grafik! | Potensi gamifikasi visual Cartesius terbuang sia-sia. |
| **5** | **Inflasi Level Kognitif (C-Level)** | **Bab 3, 4, 5 (Stage C4 & C5), Quest Mode, Endless Mode** | Substitusi angka biasa (misal menghitung $f(6)$ dari $f(x)=8x-15$) dilabeli **C5 (Evaluasi)** hanya karena angkanya besar atau bernilai negatif. | Bias validitas instrumen pengukuran kognitif siswa SMP. |
| **6** | **Materi di Luar Kurikulum SMP** | **Endless Mode (#76, #80)** | Terdapat materi fungsi komposisi bertingkat $f(f(2))$ dan fungsi nilai mutlak $f(x)=|x|$ yang merupakan kurikulum SMA Kelas X. | Berpotensi membingungkan siswa SMP kelas VIII. |

---

## 2. AUDIT BAGIAN A: IDENTIFIKASI SOAL SESUAI KRITERIA EVALUASI

### 2.1 Soal yang Sudah Baik
Kelompok soal ini telah memenuhi kaidah matematika yang benar, kunci akurat, dan memiliki bobot pedagogis yang pas:
1. **Kuis Video Pop-up Konseptual (Video 1.1, 1.2, 1.3; 2.1, 2.2, 2.3; 3.1; 4.1; 5.1):**
   - Menanyakan intisari video dengan opsi distractor yang logis.
   - Pembahasan menyertakan penguatan konsep (contoh analogi fleksibilitas relasi, analogi mesin minuman untuk fungsi, dan analogi satu kunci satu gembok untuk korespondensi 1-1).
2. **Soal Evaluasi / Kesimpulan Akhir (Stage 21 pada Bab 1 s.d 5):**
   - Menguji pemahaman esensial (Big Idea) dari masing-masing bab.
   - Sifatnya sintesis dan sangat layak dipertahankan sebagai evaluasi penutup stage.
3. **Soal Perhitungan Fungsi Linear Kontekstual Terpilih (Chapter 3 Stage 1, 3, 7):**
   - Kasus tarif ojek online ($f(x) = 3000x + 5000$), sewa kostum pentas seni, dan sewa sepeda wisata. Angkanya realistis dan merefleksikan penerapan aljabar fungsi linear di dunia nyata.
4. **Latihan Format Visual Cartesius & Arrows pada Bagian II (Latihan Bab 1 & 4):**
   - Soal nomor 9 dan 11 pada Latihan Bab 1 & Bab 4 yang menguji penentuan titik potong sumbu koordinat dengan tepat.

---

### 2.2 Soal yang Perlu Perbaikan Bahasa (Natural untuk SMP Kelas VIII)
Banyak soal yang menggunakan bahasa terjemahan harfiah, kaku, berbau pemrograman komputer, atau terlalu teoritis:
1. **Diksi Artifisial & Kering Konteks:**
   - *Teks Dokumen:* "Elemen A-1 dihubungkan ke Elemen B-1", "Mesin #1", "Input 1 bercabang ke 2 output berbeda (A dan B)".
   - *Masalah:* Siswa SMP tidak merasa sedang bermain game detektif, melainkan melihat pseudocode sistem.
   - *Rekomendasi Bahasa:* Ubah menjadi narasi investigasi: "Tersangka A meninggalkan jejak di Lokasi 1", "Kode Sandi Masukan", "Terminal Scanner Bukti", "Berkas Alibi Siswa".
2. **Label "Kasus Cerita Nyata" yang Menipu (Misleading Label):**
   - *Teks Dokumen (Bab 4 Stage 1-20):* Semua stage diberi tajuk `Stage 1: 📖 Kasus Cerita Nyata [Level: C3]`, namun naskah soalnya berbunyi: *"Grafik fungsi linear $f(x) = 2x + 6$. Tentukan titik potong grafik terhadap sumbu Y!"*
   - *Masalah:* Tidak ada cerita, tidak ada kasus nyata.
   - *Rekomendasi Bahasa:* Sesuaikan label menjadi `Tantangan Geometri Analitis` atau berikan narasi kasus detektif (misal: "Radar pelacak posisi buronan membentuk lintasan garis $f(x) = 2x + 6$. Di titik koordinat manakah buronan memotong garis pagar sumbu Y?").
3. **Bahasa Soal Remedial yang Terlalu Mirip:**
   - Sebagian besar soal remedial hanya menjiplak soal utama lalu mengganti angka 2 menjadi 3, atau Andi menjadi Budi. Perlu bahasa alternatif yang lebih membimbing logika siswa yang sempat salah.

---

### 2.3 Soal yang Perlu Perbaikan Konsep Matematika & Kurikulum
1. **Bab 2 Chapter Mode (Stage 11 s.d 20): Konten Hilang (Truncated/Missing):**
   - *Fakta:* Dokumen hanya menuliskan satu baris: *"Dalam fungsi, ada 3 bagian penting: Domain = semua anggota Himpunan Asal A. Kodomain = seluruh anggota Himpunan Kawan B. Range = anggota B yang benar-benar terpilih oleh panah dari A."* diulang 10 kali.
   - *Tindakan:* Pada tahap revisi nanti, 10 stage ini wajib diisi kasus investigasi baru mengenai Domain, Kodomain, dan Range (C4 & C5).
2. **Cakupan Materi Melebihi Silabus SMP Kelas VIII (Endless Mode):**
   - **Endless Soal #76:** $f(f(2))$ menggunakan rumus $f(x)=2x-1$.
     - *Catatan:* Konsep fungsi komposisi $(f \circ f)(x)$ secara resmi baru diajarkan di SMA Kelas X. Untuk kelas VIII, jika ingin dipertahankan, harus dibahasakan sebagai "Proses Enkripsi Dua Tahap: Masukkan angka 2 ke Mesin Kode, lalu hasilnya dimasukkan kembali ke Mesin Kode!".
   - **Endless Soal #80:** Validasi Fungsi Nilai Mutlak $f(x) = |x|$.
     - *Catatan:* Nilai mutlak adalah materi SMA. Lebih tepat diganti dengan fungsi akar kuadrat bulat atau fungsi linear berdomain bilangan bulat.
3. **Soal Fungsi Kuadrat Berlebihan pada Bab Notasi & Rumus Fungsi (Chapter 3):**
   - *Kasus:* Stage 8 ($f(x) = 3x^2 - 2x + 1$), Stage 12 ($f(x) = 2x^2 + 5$), Stage 17 ($f(x) = 4x^2 - 10$).
   - *Catatan:* Materi utama Bab 3 dan Bab 4 SMP kelas VIII adalah **Fungsi Linear**. Penggunaan fungsi kuadrat boleh sesekali sebagai pengayaan substitusi aljabar, namun tidak boleh mendominasi konsep inti rumus linear $f(x) = ax + b$.

---

### 2.4 Soal dengan Kunci Jawaban / Format Bermasalah
1. **Kuis Video Bab 2 (Kuis 2.4):**
   - Opsi jawaban D terpotong di dokumen teks asal.
2. **Inkonsistensi Format Kunci pada Bagian II (Latihan):**
   - Soal tipe `MATCHING`, `ARROWS`, dan `CARTESIAN` tidak menyertakan tag standar `✅ Kunci Jawaban:` melainkan langsung melampirkan teks pasangan atau titik plot di bawah soal. Ini menyebabkan inkonsistensi pembacaan data.
3. **Ketegasan Arah Relasi:**
   - Pada beberapa soal relasi seperti "Kelipatan dari" dan "Faktor dari" (misal A={2, 3} dan B={4, 6}), perlu penegasan eksplisit apakah relasi dari **A ke B** atau **B ke A** agar tidak memunculkan kunci ganda.

---

### 2.5 Soal yang Terlalu Repetitif & Artifisial
1. **Bab 5 Chapter Mode (Stage 1 s.d 20):**
   - Tingkat repetisi 100%. Memasangkan elemen 1 ke 1, 2 ke 2 berulang kali tanpa ada kasus pemecahan teka-teki.
2. **Bab 2 Chapter Mode (Stage 1 s.d 10):**
   - Pengulangan 4 mesin yang sama persis antara nomor ganjil (nama siswa) dan nomor genap (angka 1, 2, 3).
3. **Soal Latihan Remedial (Bagian II):**
   - Soal remedial untuk Benar/Salah hampir selalu memiliki kunci jawaban yang sama persis dengan soal utamanya (jika soal utama Benar, remedialnya Benar). Siswa dapat menebak tanpa membaca.

---

### 2.6 Soal dengan Tingkat Kognitif (Bloom C-Level) Tidak Sesuai
Banyak soal mengalami **inflasi C-level** (diberi label C4 atau C5, padahal hakikat matematisnya hanya C1, C2, atau C3):

| Kode / Lokasi Soal | Label di Dokumen | Karakteristik Soal Nyata | Rekomendasi C-Level Nyata | Alasan Koreksi |
|:---|:---:|:---|:---:|:---|
| **Bab 3 Stage 10** | C4 | Hitung $f(-4)$ jika $f(x) = 5 - 3x$ | **C3** (Aplikasi) | Hanya substitusi satu angka negatif ke perkalian dan pengurangan. Tidak ada proses analitis pemecahan masalah. |
| **Bab 3 Stage 15** | C5 | Evaluasi dan hitung $f(-5)$ jika $f(x) = 7 - 4x$ | **C3** (Aplikasi) | Kata "Evaluasi" hanya ditempel di judul soal; proses kerjanya murni aritmatika dasar. |
| **Bab 3 Stage 20** | C5 | Hitunglah nilai dari $f(6)$ pada $f(x) = 8x - 15$ | **C3** (Aplikasi) | Hitungan perkalian satu langkah ($8 \times 6 - 15 = 33$). Sangat keliru jika dilabeli C5. |
| **Bab 4 Stage 15** | C5 | Menentukan titik potong $f(x) = -x + 4$ terhadap sumbu koordinat | **C3 / C4** | Menentukan titik potong adalah prosedur baku fungsi linear. Baru menjadi C5 jika membandingkan dua model grafik tarif atau efisiensi. |
| **Bab 5 Stage 8–14** | C4 | Memasangkan $n=4$ dan $n=5$ korespondensi 1-1 | **C2 / C3** | Siswa hanya menarik garis lurus sejajar indeks yang sama. |
| **Bab 5 Stage 15–20** | C5 | Memasangkan $n=6$ elemen | **C3** | Hanya menghitung faktorial $6! = 720$ atau menarik 6 garis berurutan. |
| **Quest Mode Soal 21–25** | C5 | Soal aljabar dasar bertanda negatif | **C3 / C4** | Kesulitan teknis hitung tidak otomatis menaikkan level kognitif ke evaluasi. |

---

### 2.7 Soal yang Sebaiknya TETAP Pilihan Ganda (MCQ)
Pilihan ganda tidak boleh dihapus seluruhnya karena sangat efektif untuk:
1. **Kuis Pop-up Video (Chapter 1–5):** Memeriksa pemahaman konsep cepat tanpa mengganggu ritme cerita naratif.
2. **Evaluasi Akhir Bab (Stage 21):** Menguji sintesis konseptual menyeluruh.
3. **Analisis Multi-Pernyataan / Pilihan Kompleks:** Soal bertipe *"Manakah di antara pernyataan berikut yang membuktikan bahwa relasi R bukan merupakan fungsi?"*. Bentuk MCQ/MCQ Kompleks jauh lebih menguji ketelitian nalar daripada interaksi fisik.
4. **Soal Berbasis Waktu Cepat (Time-Attack di Quest & Endless Mode):** Sebagai variasi soal cepat agar alur permainan tetap dinamis dan tidak melelahkan.

---

### 2.8 Soal yang SANGAT COCOK Dijadikan Interaktif
Dari 18 variasi interaksi game yang disediakan, berikut pemetaan soal yang wajib ditransformasi:
1. **Bab 1 (Relasi):**
   - Stage kasus relasi ➔ **Menghubungkan Diagram Panah (Drag line from A to B)**.
   - Penulisan himpunan ➔ **Menyusun Pasangan Berurutan (Drag & drop chips ke dalam kurung kurawal)**.
   - Soal representasi ➔ **Melengkapi Tabel Relasi**.
2. **Bab 2 (Fungsi & Unsur):**
   - Stage 1–10 (Validasi fungsi) ➔ **Deteksi Kasus / Kesalahan (Detective Scanner)**: Siswa memeriksa diagram panah relasi saksi, lalu menandai panah yang bercabang atau tersangka yang tidak punya pasangan.
   - Stage 11–20 (Domain, Kodomain, Range) ➔ **Menentukan Anggota Domain, Kodomain, dan Range (Sorting/Categorizing basket)**: Siswa menyeret angka/nama ke wadah Domain, Kodomain, atau Range.
3. **Bab 3 (Notasi & Rumus):**
   - Soal nilai fungsi ➔ **Input Angka (Mesin Brankas/Decoder Pin)**: Siswa memasukkan angka hasil perhitungan $f(x)$ ke keypad gembok brankas.
   - Soal tabel fungsi ➔ **Melengkapi Tabel (Input kolom $x$ dan $f(x)$)**.
   - Soal mencari nilai $a$ dan $b$ ➔ **Puzzle Kode / Mini Challenge Berbasis Beberapa Langkah (Langkah 1: Eliminasi $a$, Langkah 2: Cari $b$, Langkah 3: Buka Kunci)**.
4. **Bab 4 (Grafik Linear):**
   - Stage titik potong ➔ **Memilih Titik pada Bidang Koordinat (Interactive Grid Picker)**: Klik titik $(0, b)$ dan $(x_0, 0)$ pada kisi Cartesius.
   - Stage menggambar garis ➔ **Menentukan Titik-Titik untuk Membangun Grafik**: Siswa meletakkan 2 titik koordinat, lalu game otomatis menarik garis lurus laser yang menghubungkan keduanya.
   - Stage persamaan ➔ **Mencocokkan Persamaan dengan Grafik (Matching)**.
5. **Bab 5 (Korespondensi Satu-Satu):**
   - Stage alibi/bukti ➔ **Puzzle Kode / Matching Unik**: Setiap tersangka hanya boleh memiliki tepat 1 alibi dan 1 sidik jari tanpa boleh tertukar.
   - Stage audit diagram ➔ **Memperbaiki Diagram yang Salah**: Menggeser satu panah yang salah arah agar relasi sah menjadi korespondensi satu-satu.

---

## 3. AUDIT BAGIAN B: PEMETAAN 18 JENIS INTERAKSI GAME "DETEKTIF DATA"

Berikut adalah matriks rekomendasi distribusi 18 jenis interaksi pada bank soal game:

| No | Jenis Interaksi | Bab / Materi yang Paling Cocok | Contoh Penerapan dalam Kasus "Detektif Data" |
|:---:|:---|:---|:---|
| **1** | **Pilihan Ganda (MCQ)** | Semua Bab (Kuis Video, Quest, Endless) | Quick check teori, diskriminasi definisi matematis. |
| **2** | **Benar / Salah (True/False)** | Bab 1, Bab 2, Bab 5 | Validasi hipotesis detektif ("Apakah alibi relasi ini sah sebagai fungsi?"). |
| **3** | **Input Angka** | Bab 3, Bab 4, Bab 5 | Memasukkan kode PIN brankas (hasil perhitungan nilai $f(k)$ atau gradien $m$). |
| **4** | **Input Jawaban Singkat** | Bab 1, Bab 3 | Memasukkan aturan relasi singkat (contoh: "faktor dari", "dua lebihnya dari"). |
| **5** | **Drag & Drop** | Bab 1, Bab 2, Bab 5 | Menyeret kartu barang bukti ke tersangka, memilah kartu angka ke keranjang Domain/Range. |
| **6** | **Matching / Mencocokkan** | Bab 1, Bab 3, Bab 4 | Menjodohkan kartu persamaan $f(x)$ dengan kemiringan garis atau tabel nilai. |
| **7** | **Menghubungkan Diagram Panah** | Bab 1, Bab 2, Bab 5 | Menarik benang investigasi merah dari papan tersangka (A) ke papan lokasi (B). |
| **8** | **Menyusun Pasangan Berurutan** | Bab 1, Bab 2 | Menyusun kepingan koordinat $(x, y)$ ke dalam berkas laporan kasus. |
| **9** | **Menentukan Domain, Kodomain, Range** | Bab 2 | Memisahkan daftar nomor telepon: yang menelepon (Domain), buku kontak (Kodomain), yang terhubung (Range). |
| **10** | **Menandai Kesalahan pada Diagram** | Bab 2, Bab 5 | Memberikan cap merah ❌ pada anak panah yang melanggar aturan fungsi (bercabang / kosong). |
| **11** | **Memperbaiki Diagram yang Salah** | Bab 2, Bab 5 | Menghapus panah berlebih atau menarik panah baru dari saksi yang belum berpasangan. |
| **12** | **Melengkapi Tabel** | Bab 1, Bab 3, Bab 4 | Mengisi sel kosong pada tabel data observasi log harian nilai $x$ dan $y$. |
| **13** | **Memilih Titik pada Bidang Koordinat** | Bab 4 | Menandai lokasi koordinat GPS buronan pada peta radar Cartesius. |
| **14** | **Menentukan Titik untuk Membangun Grafik** | Bab 4 | Menentukan 2 titik koordinat kunci untuk menyalakan laser lintasan pelarian. |
| **15** | **Mencocokkan Persamaan dg Grafik** | Bab 4 | Memilih gambar garis grafik di layar radar yang sesuai dengan persamaan fungsi linear target. |
| **16** | **Deteksi Kasus / Kesalahan** | Bab 2, Bab 4, Bab 5 | Menemukan kejanggalan dalam laporan data: grafik yang gradiennya terbalik atau data yang mendua. |
| **17** | **Puzzle Kode** | Bab 3, Bab 5 | Menyusun potongan rumus $f(x) = ax + b$ dari petunjuk potongan angka rahasia. |
| **18** | **Mini Challenge Berbasis Langkah** | Bab 3, Bab 4 (Kasus HOTS) | Kasus besar bertingkat (Tahap 1: Analisis data ➔ Tahap 2: Buat model fungsi ➔ Tahap 3: Prediksi nilai). |

---

## 4. ATURAN KERJA & STANDAR OPERASIONAL PROSEDUR (SOP) REVISI TAHAP BERIKUTNYA

Agar revisi pada tahapan berikutnya berjalan teratur, rapi, dan tidak merusak integritas dokumen maupun kode program game, ditetapkan aturan kerja baku berikut:

### 4.1 Prinsip Kerja Utama
1. **Fokus Tunggal Per Tahap (Modularity):**
   - Revisi wajib dilakukan **Bab demi Bab (Chapter by Chapter)**.
   - Dilarang memodifikasi Bab lain sebelum Bab yang sedang dikerjakan selesai ditinjau dan disetujui pengguna.
2. **Kesesuaian Pedagogis Siswa Kelas VIII:**
   - Bahasa narasi harus ramah, komunikatif, bernuansa investigasi detektif remaja, tanpa kehilangan ketepatan terminologi matematika resmi.
   - Bilangan yang digunakan harus terkalibrasi baik (menghindari pecahan yang terlalu rumit kecuali untuk tujuan gradien tertentu).
3. **Ketepatan Validasi Kunci Jawaban:**
   - Setiap butir soal interaktif wajib memiliki kunci jawaban matematis yang tunggal dan terdefinisi dengan format parsing baku (contoh: pasangan panah, koordinat titik, nilai numerik pasti).
4. **Kalibrasi Taksonomi Bloom yang Jujur:**
   - **C3 (Mengaplikasikan):** Perhitungan langsung rumus $f(x)$, penentuan titik potong biasa, pembuatan diagram panah dari aturan baku.
   - **C4 (Menganalisis):** Menemukan aturan relasi dari pola angka yang belum diketahui, mengidentifikasi anomali/pelanggaran fungsi, membedah gradien dari dua titik koordinat, mencari rumus $f(x)=ax+b$ dari dua nilai fungsi.
   - **C5 (Mengevaluasi):** Membandingkan dua opsi tarif/kebijakan berbasis fungsi, menguji keabsahan hipotesis grafik, menganalisis mengapa suatu hubungan gagal menjadi korespondensi satu-satu dalam skenario dilema nyata.

### 4.2 Format Baku Struktur Butir Soal Revisi
Setiap butir soal yang direvisi nanti harus mengikuti struktur metadata yang rapi:

```markdown
### [ID_SOAL] Judul Kasus Detektif
- **Tingkat Kognitif:** [C3 / C4 / C5]
- **Tipe Interaksi:** [Salah satu dari 18 Jenis Interaksi]
- **Skenario Narasi:** [Kasus investigasi ramah siswa SMP kelas VIII]
- **Elemen / Data Soal:** [Himpunan A & B / Persamaan / Tabel / Titik]
- **Instruksi Siswa:** [Instruksi aksi yang harus dilakukan siswa di game]
- **✅ Kunci Jawaban:** [Format kunci baku yang valid]
- **💡 Pembahasan Edukatif:** [Langkah matematis terperinci dan logis]
- **🔍 Petunjuk / Clue:** [Petunjuk edukatif tanpa langsung membocorkan jawaban]
- **↳ Soal Remedial (Variasi Berbeda):** [Kasus & angka alternatif dengan konsep serupa]
```

### 4.3 Rencana Urutan Pengerjaan Tahap Selanjutnya (Roadmap)
- **Langkah 1:** Revisi **Chapter 1: Pengertian & Cara Menyatakan Relasi** (Variasi diagram panah, pasangan berurutan, tabel, deteksi kasus).
- **Langkah 2:** Revisi **Chapter 2: Pengertian & Unsur Fungsi** (Mengisi Stage 11–20 yang kosong, merombak Stage 1–10 menjadi deteksi mesin fungsi, sorting domain/kodomain/range).
- **Langkah 3:** Revisi **Chapter 3: Notasi & Rumus Fungsi** (Input angka pin brankas, melengkapi tabel, puzzle kode, kalibrasi C-level).
- **Langkah 4:** Revisi **Chapter 4: Grafik Fungsi Linear** (Transformasi dari MCQ teks menjadi interaksi koordinat Cartesius, penarikan garis, matching grafik).
- **Langkah 5:** Revisi **Chapter 5: Korespondensi Satu-Satu** (Menghilangkan repetisi ekstrem, mini challenge brankas kunci, kasus sidik jari unik).
- **Langkah 6:** Sinkronisasi Bank Soal Mode Latihan, Quest Mode, dan Endless Mode.

---
**Catatan Akhir Audit:** Dokumen ini telah disimpan ke workspace sebagai panduan kerja resmi. Pengerjaan revisi butir soal akan dimulai pada perintah berikutnya sesuai chapter yang dipilih.
