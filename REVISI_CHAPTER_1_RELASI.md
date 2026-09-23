# 📑 HASIL REVISI LENGKAP CHAPTER 1: PENGERTIAN & CARA MENYATAKAN RELASI
## Bank Soal Game Edukasi "Detektif Data: Relasi dan Fungsi" SMP Kelas VIII

Dokumen ini memuat revisi menyeluruh untuk seluruh instrumen soal pada **Chapter 1: Pengertian & Cara Menyatakan Relasi**.
- **Sasaran Pengguna:** Siswa SMP Kelas VIII (Fase D).
- **Nuansa & Bahasa:** Menyenangkan, komunikatif, bernuansa investigasi detektif remaja ("Detektif Data"), dengan ketepatan terminologi matematika yang kokoh.
- **Variasi Interaksi:** Menghubungkan diagram panah, Drag & drop pasangan berurutan, Matching representasi, Menentukan pasangan berurutan, Deteksi kesalahan (bug hunting), Cartesius interaktif, dan Pilihan ganda berbobot.
- **Standar Informasi:** Setiap butir soal memuat 11 atribut wajib (*ID, Materi, Indikator, Bentuk Interaksi, C-Level, Soal, Data/Visual, Pilihan/Jawaban, Kunci, Pembahasan, Feedback*).

---

# BAGIAN I: 21 STAGE KASUS MODE CHAPTER (ALUR BELAJAR INVESTIGASI)

---

### [ID: CH1-STAGE-01] Skenario Menu Pesanan Kantin Sekolah
- **Materi:** Pengertian Relasi & Diagram Panah
- **Indikator:** Siswa dapat menghubungkan anggota himpunan asal ke himpunan kawan berdasarkan aturan relasi kontekstual menggunakan diagram panah.
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Detektif Data menerima laporan pesanan makan siang tiga saksi di kantin sekolah: Budi memesan Nasi Goreng, Siti memesan Soto, dan Rudi memesan Bakso. Hubungkan nama siswa di Himpunan A ke menu makanan pesanannya di Himpunan B menggunakan garis panah!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan dua kontainer oval berdampingan.
    - Oval Kiri (Himpunan A): `Budi`, `Siti`, `Rudi` (dilengkapi avatar detektif/siswa).
    - Oval Kanan (Himpunan B): `Nasi Goreng`, `Soto`, `Bakso`, `Mie Ayam` (sebagai pengecoh/opsi kosong).
    - Mekanik: Drag garis dari titik anchor nama siswa ke titik anchor makanan. Garis berwarna merah dengan ujung panah.
- **Pilihan/Jawaban:** Interaksi penarikan garis panah langsung pada layar.
- **Kunci:**
  - `Budi ➔ Nasi Goreng`
  - `Siti ➔ Soto`
  - `Rudi ➔ Bakso`
  - (`Mie Ayam` tidak memiliki pasangan).
- **Pembahasan:**
  Relasi adalah aturan yang memasangkan anggota himpunan A ke himpunan B. Aturan relasi kasus ini adalah "memesan makanan". Setiap siswa dipasangkan tepat ke makanan yang dipesannya. Anggota di B yang tidak dipilih (`Mie Ayam`) membuktikan bahwa pada relasi, anggota himpunan kawan boleh tidak berpasangan.
- **Feedback:**
  - *Benar:* "Luar biasa, Detektif! Berkas pesanan kantin berhasil dicocokkan dengan akurat. Alibi makanan para saksi terverifikasi!"
  - *Salah:* "Cek kembali catatan alibi: Budi memesan Nasi Goreng, Siti memesan Soto, dan Rudi memesan Bakso. Pastikan tidak ada panah yang salah sasaran ya!"

---

### [ID: CH1-STAGE-02] Kasus Sandi Bilangan: Aturan "Kurang Dari"
- **Materi:** Relasi Bilangan & Diagram Panah
- **Indikator:** Siswa dapat menentukan pasangan bilangan yang memenuhi aturan relasi "kurang dari".
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah brankas berkode angka menghubungkan angka di Himpunan A ke angka di Himpunan B dengan aturan: **"Kurang dari"**. Hubungkan setiap angka di Himpunan A yang bernilai lebih kecil dari angka di Himpunan B!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Dua kolom kartu bilangan.
    - Oval A: `1`, `2`, `3`
    - Oval B: `2`, `4`
    - Garis dapat ditarik bercabang dari satu angka di A ke lebih dari satu angka di B.
- **Pilihan/Jawaban:** Interaksi penarikan panah antar bilangan.
- **Kunci:**
  - `1 ➔ 2` (karena 1 < 2)
  - `1 ➔ 4` (karena 1 < 4)
  - `2 ➔ 4` (karena 2 < 4)
  - `3 ➔ 4` (karena 3 < 4)
  - *(Catatan: 2 TIDAK dihubungkan ke 2, karena 2 tidak kurang dari 2).*
- **Pembahasan:**
  Aturan "kurang dari" ($a < b$) berarti kita hanya menarik panah jika angka di A lebih kecil dari angka di B.
  - $1 < 2$ dan $1 < 4$ (angka 1 punya 2 panah).
  - $2 < 4$ (angka 2 punya 1 panah).
  - $3 < 4$ (angka 3 punya 1 panah).
  Ini membuktikan sifat relasi: satu anggota asal boleh memiliki lebih dari satu pasangan (bercabang).
- **Feedback:**
  - *Benar:* "Tepat sekali! Angka 1 berhasil bercabang ke 2 dan 4 karena 1 lebih kecil dari keduanya. Sandi brankas terbuka!"
  - *Salah:* "Hati-hati, periksa kembali! Apakah 2 kurang dari 2? Tentu tidak! Hanya hubungkan jika angka kiri benar-benar LEBIH KECIL dari angka kanan."

---

### [ID: CH1-STAGE-03] Berkas Biodata Saksi: Kota Kelahiran
- **Materi:** Penyajian Relasi Pasangan Berurutan
- **Indikator:** Siswa dapat menyusun himpunan pasangan berurutan dari data narasi cerita.
- **Bentuk Interaksi:** Drag & Drop Pasangan Berurutan.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Berdasarkan arsip kependudukan: Andi lahir di Jakarta, Dewi lahir di Bandung, dan Fajar lahir di Surabaya. Bantulah Detektif Data memilah kartu pasangan berurutan yang VALID (sesuai data arsip) ke dalam folder laporan kasusu!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* 
    - Area Drop Zone bertuliskan: `Folder Himpunan Pasangan Berurutan R = { ... }`.
    - Kartu Pilihan (Draggable Cards):
      - Kartu 1: `(Andi, Jakarta)` [Valid]
      - Kartu 2: `(Dewi, Bandung)` [Valid]
      - Kartu 3: `(Fajar, Surabaya)` [Valid]
      - Kartu 4: `(Bandung, Dewi)` [Palsu - urutan terbalik]
      - Kartu 5: `(Andi, Surabaya)` [Palsu - salah pasangan]
- **Pilihan/Jawaban:** Drag kartu-kartu yang valid ke dalam kotak folder.
- **Kunci:** Masukkan kartu: `(Andi, Jakarta)`, `(Dewi, Bandung)`, dan `(Fajar, Surabaya)`.
- **Pembahasan:**
  Pasangan berurutan selalu ditulis $(x, y)$ di mana elemen pertama $x in A$ (nama orang) dan elemen kedua $y in B$ (kota kelahiran). Kartu `(Bandung, Dewi)` salah karena urutannya terbalik (kota dulu baru orang).
- **Feedback:**
  - *Benar:* "Sempurna! Kamu memahami bahwa urutan dalam $(x, y)$ tidak boleh terbalik. Berkas alibi tersusun rapi!"
  - *Salah:* "Ingat kaidah detektif: elemen pertama adalah nama saksi (asal), dan elemen kedua adalah kota lahir (tujuan). Periksa kartu yang posisinya terbalik!"

---

### [ID: CH1-STAGE-04] Tantangan Logika: Aturan "Faktor Dari"
- **Materi:** Relasi Faktor Bilangan & Diagram Panah
- **Indikator:** Siswa dapat menentukan relasi matematis "faktor dari" pada dua himpunan bilangan bulat positif.
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Komputer laboratorium mengunci file rahasia dengan aturan relasi: **"Faktor dari"** dari Himpunan $A = {2, 3, 5}$ ke Himpunan $B = {4, 6, 9}$. Hubungkan setiap angka di A yang habis membagi angka di B tanpa sisa!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Dua wadah kapsul digital neon.
    - Kiri (A): `2`, `3`, `5`
    - Kanan (B): `4`, `6`, `9`
    - Interaksi tarikan garis kabel interaktif bercahaya.
- **Pilihan/Jawaban:** Tarik kabel dari port A ke port B.
- **Kunci:**
  - `2 ➔ 4` (karena 4 habis dibagi 2)
  - `2 ➔ 6` (karena 6 habis dibagi 2)
  - `3 ➔ 6` (karena 6 habis dibagi 3)
  - `3 ➔ 9` (karena 9 habis dibagi 3)
  - (Angka `5` tidak memiliki pasangan panah).
- **Pembahasan:**
  Bilangan $a$ adalah faktor dari $b$ jika $b$ habis dibagi oleh $a$.
  - 2 adalah faktor dari 4 ($4 div 2 = 2$) dan 6 ($6 div 2 = 3$).
  - 3 adalah faktor dari 6 ($6 div 3 = 2$) dan 9 ($9 div 3 = 3$).
  - 5 bukan faktor dari 4, 6, maupun 9 (karena ada sisa). Angka 5 boleh kosong/tidak punya panah, dan hubungan ini tetap sah sebagai relasi!
- **Feedback:**
  - *Benar:* "Akses diterima! Kamu tepat tidak menghubungkan angka 5 karena tidak ada kelipatannya di himpunan B. Sistem relasi aktif!"
  - *Salah:* "Periksa kembali pembagiannya. Angka di A harus membagi habis angka di B. Coba cek: apakah 5 bisa membagi habis 4, 6, atau 9? Jangan dipaksakan ya!"

---

### [ID: CH1-STAGE-05] Pencocokan Bukti Alat Tulis Favorit
- **Materi:** Matching Antar-Bentuk Representasi Relasi
- **Indikator:** Siswa dapat mencocokkan relasi cerita ke dalam sajian himpunan pasangan berurutan.
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Hasil survei barang bawaan siswa di kelas: Rina membawa Pensil Warna, Tono membawa Spidol, dan Maya membawa Penghapus. Jodohkan nama siswa di kolom kiri dengan pasangan berurutan yang sesuai di kolom kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tiga kartu nama di kiri dan empat kotak slot pasangan berurutan di kanan.
    - Kiri: `Rina`, `Tono`, `Maya`
    - Kanan: `(Rina, Pensil Warna)`, `(Tono, Spidol)`, `(Maya, Penghapus)`, `(Tono, Pensil Warna)` [Pengecoh].
- **Pilihan/Jawaban:** Menarik konektor garis pencocokan antar kartu.
- **Kunci:**
  - `Rina` ➔ `(Rina, Pensil Warna)`
  - `Tono` ➔ `(Tono, Spidol)`
  - `Maya` ➔ `(Maya, Penghapus)`
- **Pembahasan:**
  Setiap orang dipasangkan secara tepat dengan barang bawaannya dalam format tanda kurung berurutan $(nama, barang)$.
- **Feedback:**
  - *Benar:* "Pencocokan akurat! Bukti inventaris barang siswa telah lengkap tercatat di buku kasus."
  - *Salah:* "Perhatikan barang masing-masing anak: Rina dengan Pensil Warna, Tono dengan Spidol, dan Maya dengan Penghapus."

---

### [ID: CH1-STAGE-06] Dekoder Selisih: Aturan "Dua Lebihnya Dari"
- **Materi:** Relasi Aljabar & Pasangan Berurutan
- **Indikator:** Siswa dapat menyusun himpunan pasangan berurutan dari relasi "dua lebihnya dari".
- **Bentuk Interaksi:** Menentukan pasangan berurutan (Memilih chip pasangan).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui Himpunan $A = {4, 5, 6}$ dan Himpunan $B = {2, 3, 4}$. Aturan relasi dari A ke B adalah **"Dua lebihnya dari"**. Pilih semua pasangan berurutan $(a, b)$ yang memenuhi aturan ini untuk membuka brankas!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan 6 chip pilihan yang bisa diklik (toggle on/off):
    - `[ (4, 2) ]` [Benar: 4 = 2 + 2]
    - `[ (5, 3) ]` [Benar: 5 = 3 + 2]
    - `[ (6, 4) ]` [Benar: 6 = 4 + 2]
    - `[ (4, 6) ]` [Salah: terbalik]
    - `[ (2, 4) ]` [Salah: terbalik]
    - `[ (5, 2) ]` [Salah: selisih 3]
- **Pilihan/Jawaban:** Memilih chip pasangan yang benar.
- **Kunci:** Pilih chip `(4, 2)`, `(5, 3)`, dan `(6, 4)`.
- **Pembahasan:**
  "Dua lebihnya dari" artinya nilai $a$ di Himpunan A bernilai 2 lebih besar daripada $b$ di Himpunan B ($a = b + 2$).
  - $4 = 2 + 2 implies (4, 2)$
  - $5 = 3 + 2 implies (5, 3)$
  - $6 = 4 + 2 implies (6, 4)$
  Pasangan seperti $(2, 4)$ salah karena 2 adalah dua *kurangnya* dari 4, bukan dua lebihnya!
- **Feedback:**
  - *Benar:* "Mantap! Kamu tidak terkecoh dengan urutan terbalik. $4$ memang dua lebihnya dari $2$ ($4 = 2 + 2$)!"
  - *Salah:* "Hati-hati dengan kata 'dua lebihnya dari'. Artinya angka pertama harus LEBIH BESAR 2 angka dibanding pasangannya ($a = b + 2$)."

---

### [ID: CH1-STAGE-07] Tantangan Bilangan: Aturan "Kelipatan Dari"
- **Materi:** Relasi Kelipatan & Diagram Panah
- **Indikator:** Siswa dapat memasangkan anggota relasi "kelipatan dari" dengan tepat termasuk relasi bercabang banyak.
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Uji radar alibi: Hubungkan angka di $A = {6, 8, 10, 12}$ ke angka di $B = {2, 4}$ dengan aturan relasi: **"Kelipatan dari"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* 
    - Himpunan A: `6`, `8`, `10`, `12`
    - Himpunan B: `2`, `4`
    - Memungkinkan multi-line drag dari satu node asal ke beberapa node kawan.
- **Pilihan/Jawaban:** Menghubungkan panah dari elemen A ke B.
- **Kunci:**
  - `6 ➔ 2` (6 kelipatan 2)
  - `8 ➔ 2` (8 kelipatan 2)
  - `8 ➔ 4` (8 kelipatan 4)
  - `10 ➔ 2` (10 kelipatan 2)
  - `12 ➔ 2` (12 kelipatan 2)
  - `12 ➔ 4` (12 kelipatan 4)
- **Pembahasan:**
  Bilangan $a$ adalah kelipatan dari $b$ jika $a$ habis dibagi oleh $b$.
  - 6 habis dibagi 2.
  - 8 habis dibagi 2 dan 4.
  - 10 habis dibagi 2.
  - 12 habis dibagi 2 dan 4.
  Total terbentuk 6 garis relasi yang sah.
- **Feedback:**
  - *Benar:* "Sempurna, Detektif! Kamu berhasil menemukan semua kelipatan, termasuk angka 8 dan 12 yang memiliki dua pasangan sekaligus!"
  - *Salah:* "Cek kembali pembagiannya: angka 8 dan 12 bisa dibagi 2 dan juga bisa dibagi 4 lho! Pastikan kedua garis terpasang."

---

### [ID: CH1-STAGE-08] Deteksi Kejanggalan: Jadwal Alibi Siswa
- **Materi:** Deteksi Kesalahan pada Diagram Panah
- **Indikator:** Siswa dapat menganalisis dan menandai satu kesalahan penarikan panah relasi berdasarkan skenario data alibi jadwal.
- **Bentuk Interaksi:** Deteksi Kesalahan (Menandai garis panah yang salah).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Detektif Data mencurigai satu laporan jadwal palsu. Data resmi menyatakan:
  - Andi dan Budi berada di **Ruang Lab** pada pukul 09.00.
  - Cici berada di **Ruang Seni** pada pukul 10.00.
  Namun, pada papan bukti di bawah, ada **SATU panah yang keliru** dipasang oleh asisten detektif. Klik garis panah yang SALAH tersebut untuk membatalkannya!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan diagram panah:
    - Himpunan A: `Andi (09.00)`, `Budi (09.00)`, `Cici (10.00)`
    - Himpunan B: `Ruang Lab`, `Ruang Seni`
    - Garis yang tergambar di layar:
      1. Garis 1: `Andi (09.00) ➔ Ruang Lab` [Benar]
      2. Garis 2: `Budi (09.00) ➔ Ruang Seni` [SALAH / KEJANGGALAN]
      3. Garis 3: `Cici (10.00) ➔ Ruang Seni` [Benar]
    - Interaksi: Setiap garis panah bisa diklik dan akan berubah warna merah saat disorot.
- **Pilihan/Jawaban:** Klik garis panah dari `Budi (09.00) ➔ Ruang Seni`.
- **Kunci:** Garis panah `Budi (09.00) ➔ Ruang Seni` adalah panah yang salah.
- **Pembahasan:**
  Berdasarkan data fakta kasus, Budi berada di Ruang Lab pukul 09.00 bersama Andi. Panah yang menghubungkan Budi ke Ruang Seni adalah kekeliruan data alibi dan harus dihapus.
- **Feedback:**
  - *Benar:* "Mata elang, Detektif! Kamu menemukan garis yang keliru: Budi seharusnya berada di Ruang Lab, bukan di Ruang Seni!"
  - *Salah:* "Periksa kembali catatan kasus di atas: Andi dan Budi ada di Ruang Lab. Cari garis siapa yang nyasar ke ruangan lain!"

---

### [ID: CH1-STAGE-09] Rekonstruksi Pola: Aturan Kuadrat Sempurna
- **Materi:** Analisis Pola Relasi Aljabar
- **Indikator:** Siswa dapat menghubungkan pasangan bilangan berdasarkan aturan $a^2 = b$ (kuadrat dari).
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Untuk mengurai enkripsi data tersangka, temukan pola yang menghubungkan angka di $A = {2, 3, 4, 5}$ dengan angka di $B = {4, 9, 16, 25}$ dengan aturan: **"Kuadratnya sama dengan"** ($a^2 = b$). Hubungkan setiap angka di A ke pasangannya di B!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Dua papan sirkuit digital dengan port kabel.
    - Kiri (A): `2`, `3`, `4`, `5`
    - Kanan (B): `4`, `9`, `16`, `25`
- **Pilihan/Jawaban:** Tarik kabel dari A ke B.
- **Kunci:**
  - `2 ➔ 4` ($2^2 = 4$)
  - `3 ➔ 9` ($3^2 = 9$)
  - `4 ➔ 16` ($4^2 = 16$)
  - `5 ➔ 25` ($5^2 = 25$)
- **Pembahasan:**
  Setiap bilangan di A jika dikalikan dengan dirinya sendiri menghasilkan bilangan di B: $2 	imes 2 = 4$, $3 	imes 3 = 9$, $4 	imes 4 = 16$, dan $5 	imes 5 = 25$.
- **Feedback:**
  - *Benar:* "Hebat! Semua koneksi kuadrat sempurna terhubung. Enkripsi data tersangka terbuka!"
  - *Salah:* "Hitung kembali hasil kuadrat dari masing-masing bilangan ($a 	imes a$). Hubungkan ke hasil perkalian yang tepat."

---

### [ID: CH1-STAGE-10] Pelacakan Sinyal: Sifat Relasi Bebas Bercabang
- **Materi:** Konsep Fleksibilitas Relasi
- **Indikator:** Siswa dapat menganalisis bahwa relasi memperbolehkan satu objek terhubung ke banyak tujuan (multicast/bercabang).
- **Bentuk Interaksi:** Drag & Drop Pasangan Berurutan.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Tim cyber melacak riwayat koneksi WiFi sekolah:
  - **HP Andi** terhubung secara bersamaan ke **WiFi Lab** dan **WiFi Perpustakaan**.
  - **HP Budi** hanya terhubung ke **WiFi Kantin**.
  - **HP Citra** tidak menyalakan WiFi (tidak terhubung ke mana pun).
  Bantu susun himpunan pasangan berurutan yang merefleksikan peristiwa sinyal di atas!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan 4 slot kosong berderet. Disediakan kartu opsi:
    - `[ (HP Andi, WiFi Lab) ]` [Benar]
    - `[ (HP Andi, WiFi Perpustakaan) ]` [Benar]
    - `[ (HP Budi, WiFi Kantin) ]` [Benar]
    - `[ (HP Citra, WiFi Kantin) ]` [Palsu]
    - `[ (HP Citra, Tidak Ada) ]` [Palsu - format salah]
- **Pilihan/Jawaban:** Drag 3 kartu yang tepat ke slot himpunan $R = { ... }$.
- **Kunci:** Masukkan: `(HP Andi, WiFi Lab)`, `(HP Andi, WiFi Perpustakaan)`, dan `(HP Budi, WiFi Kantin)`.
- **Pembahasan:**
  Relasi sangat fleksibel: HP Andi memiliki dua pasangan di himpunan kawan (bercabang), sedangkan HP Citra tidak memiliki pasangan (kosong). Keduanya sah dalam konsep relasi matematika.
- **Feedback:**
  - *Benar:* "Analisis cerdas! HP Andi membuktikan anggota himpunan asal boleh bercabang, dan HP Citra yang kosong membuktikan anggota asal boleh tidak berpasangan!"
  - *Salah:* "Cek kembali data log WiFi: HP Citra tidak terhubung ke jaringan apa pun, jadi jangan masukkan kartu untuk Citra."

---

### [ID: CH1-STAGE-11] Puzzle Brankas: Jumlah Pasangan $a + b = 10$
- **Materi:** Relasi Persamaan Aljabar
- **Indikator:** Siswa dapat menentukan pasangan bilangan yang hasil penjumlahannya memenuhi nilai konstanta tertentu.
- **Bentuk Interaksi:** Menentukan pasangan berurutan (Menyusun kepingan kode).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Kunci gembok kombinasi membutuhkan pasangan bilangan dari $A = {2, 3, 4, 7}$ dan $B = {3, 6, 7, 8}$ dengan aturan: **"Jumlahnya sama dengan 10"** ($a + b = 10$). Pilih SEMUA pasangan berurutan yang tepat untuk membuka gembok!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Kepingan kancing magnetik:
    - `[ (2, 8) ]` [Pilih]
    - `[ (3, 7) ]` [Pilih]
    - `[ (4, 6) ]` [Pilih]
    - `[ (7, 3) ]` [Pilih]
    - `[ (2, 6) ]` [Abaikan: 2+6=8]
    - `[ (4, 7) ]` [Abaikan: 4+7=11]
- **Pilihan/Jawaban:** Memilih kepingan magnetik yang benar.
- **Kunci:** `(2, 8)`, `(3, 7)`, `(4, 6)`, dan `(7, 3)`.
- **Pembahasan:**
  Kita cari semua pasangan $(a, b)$ dengan $a in A, b in B$ sedemikian sehingga $a + b = 10$:
  - $2 + 8 = 10 implies (2, 8)$
  - $3 + 7 = 10 implies (3, 7)$
  - $4 + 6 = 10 implies (4, 6)$
  - $7 + 3 = 10 implies (7, 3)$
- **Feedback:**
  - *Benar:* "Klik! Keempat kunci kombinasi tepat berjumlah 10. Pintu brankas berhasil terbuka!"
  - *Salah:* "Jumlahkan angka pertama dan kedua pada setiap keping. Pastikan hasilnya PAS 10, tidak boleh kurang atau lebih."

---

### [ID: CH1-STAGE-12] Audit Laporan Tabungan: Syarat Nilai $> 	ext{Rp } 10.000$
- **Materi:** Deteksi Kesalahan pada Tabel Relasi
- **Indikator:** Siswa dapat mengidentifikasi baris tabel relasi yang tidak memenuhi kriteria pertidaksamaan.
- **Bentuk Interaksi:** Deteksi Kesalahan pada Tabel (Menandai baris tabel yang tidak valid).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Aturan donasi kelas: Hanya siswa yang menabung **LEBIH DARI Rp 10.000** yang dicatat ke dalam buku relasi donatur celengan. Perhatikan tabel catatan di bawah ini. Temukan baris yang **MELANGGAR ATURAN** donasi!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan tabel interaktif 3 baris:
    - Baris 1: `Rani (Rp 15.000)` | `Celengan Merah`
    - Baris 2: `Doni (Rp 5.000)`  | `Celengan Biru`  <-- [Baris Salah]
    - Baris 3: `Sari (Rp 20.000)` | `Celengan Hijau`
    - Setiap baris memiliki tombol "Laporkan Kesalahan" / bisa di-klik barisnya.
- **Pilihan/Jawaban:** Klik baris ke-2 (Doni).
- **Kunci:** Baris 2: `Doni (Rp 5.000) ➔ Celengan Biru` melanggar aturan.
- **Pembahasan:**
  Syarat relasi adalah menabung $> 	ext{Rp } 10.000$. Tabungan Doni hanya Rp 5.000, sehingga Doni tidak memenuhi syarat dan seharusnya tidak memiliki relasi dengan celengan mana pun.
- **Feedback:**
  - *Benar:* "Audit cermat, Detektif! Tabungan Doni Rp 5.000 tidak memenuhi syarat 'lebih dari Rp 10.000', sehingga tidak boleh dicatat dalam relasi ini."
  - *Salah:* "Periksa kembali nominal tabungan tiap siswa: manakah siswa yang tabungannya TIDAK LEBIH dari Rp 10.000?"

---

### [ID: CH1-STAGE-13] Tantangan Bilangan: Aturan "Akar Kuadrat Dari"
- **Materi:** Relasi Akar Kuadrat
- **Indikator:** Siswa dapat memasangkan relasi "akar kuadrat dari" dari himpunan A ke himpunan B dengan teliti.
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Hubungkan angka di Himpunan Asal $A = {3, 4, 5}$ ke Himpunan Kawan $B = {9, 16, 25, 36}$ dengan aturan relasi: **"Akar kuadrat dari"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Diagram panah dua kolom:
    - Kiri (A): `3`, `4`, `5`
    - Kanan (B): `9`, `16`, `25`, `36`
- **Pilihan/Jawaban:** Tarik panah dari A ke B.
- **Kunci:**
  - `3 ➔ 9` (karena $sqrt{9} = 3$)
  - `4 ➔ 16` (karena $sqrt{16} = 4$)
  - `5 ➔ 25` (karena $sqrt{25} = 5$)
  - (`36` tidak memiliki pasangan karena $sqrt{36} = 6 
otin A$).
- **Pembahasan:**
  $a$ adalah akar kuadrat dari $b$ artinya $sqrt{b} = a$ atau $a^2 = b$.
  - 3 adalah akar dari 9
  - 4 adalah akar dari 16
  - 5 adalah akar dari 25
  Angka 36 di himpunan kawan tidak berpasangan, hal ini sah dalam relasi.
- **Feedback:**
  - *Benar:* "Tepat sekali! 3 akar dari 9, 4 akar dari 16, dan 5 akar dari 25. Angka 36 dibiarkan kosong tanpa panah."
  - *Salah:* "Akar kuadrat dari 9 adalah 3 ($3 	imes 3 = 9$). Hubungkan setiap angka di A ke bilangan kuadratnya di B."

---

### [ID: CH1-STAGE-14] Investigasi Jalur Zonasi: Matching 3 Format Relasi
- **Materi:** Tiga Cara Menyatakan Relasi
- **Indikator:** Siswa dapat mencocokkan tiga format penyajian (Diagram Panah, Pasangan Berurutan, Tabel) untuk relasi yang sama.
- **Bentuk Interaksi:** Matching (Mencocokkan representasi).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Kasus Zonasi: Siswa yang rumahnya berjarak kurang dari 3 km dari sekolah dipasangkan ke jalurnya:
  - Rumah Andi terhubung ke **Jalur A**.
  - Rumah Budi terhubung ke **Jalur A** dan **Jalur B**.
  Jodohkan nama format penyajian di sebelah kiri dengan kotak tampilannya yang tepat di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* 
    - Kiri: 
      1. `Himpunan Pasangan Berurutan`
      2. `Tabel Relasi`
      3. `Diagram Panah`
    - Kanan:
      - Kotak X: Kurva lingkaran dengan anak panah bercabang dari Andi ke Jalur A, Budi ke Jalur A & B.
      - Kotak Y: `{ (Andi, Jalur A), (Budi, Jalur A), (Budi, Jalur B) }`
      - Kotak Z: Tabel dua kolom (Kolom Asal & Kolom Jalur).
- **Pilihan/Jawaban:** Tarik garis jodoh antar kartu.
- **Kunci:**
  - `Himpunan Pasangan Berurutan` ➔ Kotak Y
  - `Tabel Relasi` ➔ Kotak Z
  - `Diagram Panah` ➔ Kotak X
- **Pembahasan:**
  Ketiga bentuk penyajian menyajikan data relasi yang persis sama. Pasangan berurutan menggunakan tanda kurung, tabel menggunakan baris dan kolom, sedangkan diagram panah menggunakan kurva dan garis panah.
- **Feedback:**
  - *Benar:* "Pemahaman representasi yang hebat! Satu relasi dapat diungkapkan dalam berbagai bahasa visual matematika."
  - *Salah:* "Perhatikan ciri khasnya: pasangan berurutan selalu berformat kurung ${(x, y)}$, diagram panah memiliki garis panah, dan tabel berbentuk kolom baris."

---

### [ID: CH1-STAGE-15] Evaluasi Syarat Batas: Perkalian $a 	imes b geq 12$
- **Materi:** Evaluasi Syarat Relasi Pertidaksamaan
- **Indikator:** Siswa dapat mengevaluasi dan memilih seluruh pasangan bilangan yang memenuhi pertidaksamaan perkalian $a 	imes b geq 12$.
- **Bentuk Interaksi:** Drag & Drop Pasangan Berurutan (Memilah ke Keranjang Lolos vs Gugur).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Diberikan Himpunan $A = {2, 3, 4}$ dan $B = {3, 4, 5}$. Aturan relasi: **"Hasil kali $a 	imes b$ minimal bernilai 12 ($a 	imes b ge 12$)"**. Seret setiap kartu pasangan berikut ke keranjang yang tepat: **"Lolos Relasi"** atau **"Gugur (Tidak Memenuhi)"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Keranjang Hijau: `Lolos Relasi (Hasil Kali ≥ 12)`
    - Keranjang Abu-abu: `Gugur (Hasil Kali < 12)`
    - Kartu yang harus disortir:
      - `(2, 5)` ➔ $2 	imes 5 = 10$ [Gugur]
      - `(3, 4)` ➔ $3 	imes 4 = 12$ [Lolos]
      - `(3, 5)` ➔ $3 	imes 5 = 15$ [Lolos]
      - `(4, 3)` ➔ $4 	imes 3 = 12$ [Lolos]
      - `(4, 5)` ➔ $4 	imes 5 = 20$ [Lolos]
      - `(2, 3)` ➔ $2 	imes 3 = 6$ [Gugur]
- **Pilihan/Jawaban:** Drag kartu ke keranjang yang sesuai.
- **Kunci:**
  - Keranjang Lolos: `(3, 4)`, `(3, 5)`, `(4, 3)`, `(4, 5)`
  - Keranjang Gugur: `(2, 5)`, `(2, 3)`
- **Pembahasan:**
  Syarat "minimal 12" berarti hasil kali harus $ge 12$. Angka 12 termasuk lolos. $2 	imes 5 = 10 < 12$ (gugur). $3 	imes 4 = 12$ (lolos karena pas 12).
- **Feedback:**
  - *Benar:* "Evaluasi tepat! Kata 'minimal 12' artinya angka 12 ikut masuk. Kamu teliti memilah pasangan yang bernilai kurang dari 12!"
  - *Salah:* "Perhatikan syaratnya: $a 	imes b ge 12$. Jika hasil kalinya 10 atau 6, maka tidak memenuhi syarat minimal 12."

---

### [ID: CH1-STAGE-16] Audit Log Percakapan: Frekuensi Pesan $ge 2$
- **Materi:** Evaluasi Kasus Nyata Berdasarkan Data Log
- **Indikator:** Siswa dapat mengevaluasi data frekuensi komunikasi dan mendeteksi hubungan yang sah.
- **Bentuk Interaksi:** Deteksi Kesalahan pada Diagram Panah.
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Hasil ekstraksi riwayat pesan rahasia:
  - Andi mengirim pesan ke Budi (3 kali) dan ke Cici (1 kali).
  - Dewi mengirim pesan ke Cici (4 kali) dan ke Budi (0 kali).
  Aturan relasi penyelidikan: Hubungkan pengirim ke penerima jika **"mengirim pesan minimal 2 kali"**. Pada papan diagram panah di bawah, seorang agen keliru memasukkan data. Tandai garis panah yang **TIDAK SAH**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan diagram panah:
    - Pengirim (A): `Andi`, `Dewi`
    - Penerima (B): `Budi`, `Cici`
    - Garis yang aktif:
      1. `Andi ➔ Budi` (3 kali - SAH)
      2. `Andi ➔ Cici` (1 kali - TIDAK SAH karena < 2 kali) <-- [KLIK DISINI]
      3. `Dewi ➔ Cici` (4 kali - SAH)
- **Pilihan/Jawaban:** Klik garis panah `Andi ➔ Cici`.
- **Kunci:** Garis panah dari `Andi ➔ Cici` adalah garis yang tidak sah.
- **Pembahasan:**
  Syarat relasi adalah "minimal 2 kali" ($ge 2$). Andi hanya mengirim pesan ke Cici sebanyak 1 kali ($1 < 2$), sehingga hubungan tersebut tidak memenuhi syarat relasi kasus ini.
- **Feedback:**
  - *Benar:* "Bagus sekali, Detektif! Andi baru berkirim pesan 1 kali ke Cici, belum memenuhi ambang batas minimal 2 kali."
  - *Salah:* "Cek kembali syarat ambang batas: minimal 2 kali pesan. Siapakah yang baru mengirim pesan 1 kali tapi dipasangi panah?"

---

### [ID: CH1-STAGE-17] Kriptografi Modulo: Sisa Pembagian Sama (Sisa Bagi 3)
- **Materi:** Relasi Kongruensi Bilangan (Modulo)
- **Indikator:** Siswa dapat mengevaluasi dan memasangkan bilangan yang memiliki sisa pembagian sama jika dibagi suatu bilangan.
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Untuk memecahkan sandi rahasia: Hubungkan angka di $A = {4, 7, 9}$ ke angka di $B = {1, 3, 4, 6}$ jika kedua bilangan memiliki **"Sisa pembagian yang SAMA jika dibagi 3"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Diagram panah interaktif dengan indikator sisa di setiap angka.
    - Himpunan A: `4`, `7`, `9`
    - Himpunan B: `1`, `3`, `4`, `6`
- **Pilihan/Jawaban:** Tarik panah dari elemen A ke elemen B yang bersisa sama saat dibagi 3.
- **Kunci:**
  - `4 ➔ 1` dan `4 ➔ 4` (karena 4 dibagi 3 sisa 1; 1 dibagi 3 sisa 1; 4 dibagi 3 sisa 1)
  - `7 ➔ 1` dan `7 ➔ 4` (karena 7 dibagi 3 sisa 1)
  - `9 ➔ 3` dan `9 ➔ 6` (karena 9 dibagi 3 sisa 0; 3 dan 6 dibagi 3 sisa 0)
- **Pembahasan:**
  Mari evaluasi sisa bagi dengan 3:
  - Di A: $4 equiv 1 pmod 3$, $7 equiv 1 pmod 3$, $9 equiv 0 pmod 3$.
  - Di B: $1 equiv 1 pmod 3$, $3 equiv 0 pmod 3$, $4 equiv 1 pmod 3$, $6 equiv 0 pmod 3$.
  Maka bilangan bersisa 1 ($4$ dan $7$) dihubungkan ke ($1$ dan $4$). Bilangan bersisa 0 ($9$) dihubungkan ke ($3$ dan $6$).
- **Feedback:**
  - *Benar:* "Luar biasa! Analisis sisa bagi (modulo) kamu sangat tajam. Kode enkripsi tingkat tinggi berhasil dipecahkan!"
  - *Salah:* "Cek sisa pembagian 3: $4 div 3 = 1$ sisa $1$, $7 div 3 = 2$ sisa $1$. Cari angka di himpunan B yang juga bersisa 1!"

---

### [ID: CH1-STAGE-18] Sidang Alibi: Menilai Kewajaran Waktu Perjalanan
- **Materi:** Evaluasi Logika Pernyataan Relasi
- **Indikator:** Siswa dapat mengevaluasi kewajaran data kontekstual dalam relasi sehari-hari.
- **Bentuk Interaksi:** Pilihan Ganda Analitis.
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Seorang saksi menyatakan: *"Saya berjalan kaki sejauh 10 km dari rumah ke sekolah hanya dalam waktu 5 menit."*
  Jika Detektif Data membuat relasi **"Kecepatan Wajar Siswa Berjalan Kaki"**, bagaimanakah evaluasi matematis yang paling tepat terhadap pernyataan saksi tersebut?
- **Data/Visual yang diperlukan:** Ilustrasi stopwatch dan peta rute 10 km.
- **Pilihan/Jawaban:**
  A. Pernyataan tersebut sah dan wajar, karena jalan kaki siswa bebas tanpa hambatan macet.
  B. Pernyataan tersebut palsu/tidak wajar, karena menempuh 10 km dalam 5 menit berarti kecepatannya 120 km/jam (setara mobil di jalan tol).
  C. Pernyataan tersebut sah, karena jarak dan waktu tidak memiliki hubungan relasi apa pun.
  D. Pernyataan tersebut wajar asalkan siswa berjalan kaki di trotoar.
- **Kunci:** B. Pernyataan tersebut palsu/tidak wajar, karena menempuh 10 km dalam 5 menit berarti kecepatannya 120 km/jam (setara mobil di jalan tol).
- **Pembahasan:**
  Kecepatan $v = rac{s}{t} = rac{10	ext{ km}}{5/60	ext{ jam}} = 10 	imes 12 = 120	ext{ km/jam}$. Sangat mustahil bagi manusia untuk berjalan kaki dengan kecepatan 120 km/jam. Maka klaim saksi melanggar batasan relasi fisik nyata.
- **Feedback:**
  - *Benar:* "Tepat sekali, Detektif! Nalarmu membongkar alibi palsu saksi melalui pembuktian matematis $v = 120	ext{ km/jam}$!"
  - *Salah:* "Hitung kecepatannya: menempuh 10 kilometer hanya dalam 5 menit berarti 1 menit menempuh 2 kilometer! Mungkinkah ada orang jalan kaki secepat mobil tol?"

---

### [ID: CH1-STAGE-19] Dekoder Persamaan Linear: $a + 2b = 10$
- **Materi:** Relasi Persamaan Dua Variabel
- **Indikator:** Siswa dapat menyusun himpunan pasangan berurutan yang memenuhi persamaan linear $a + 2b = 10$.
- **Bentuk Interaksi:** Menentukan pasangan berurutan (Menyusun chip kombinasi).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Diberikan himpunan masukan $A = {2, 4, 6, 8}$ dan himpunan kunci $B = {1, 2, 3, 4}$. Susunlah semua pasangan berurutan $(a, b)$ yang memenuhi formula keamanan: **$a + 2b = 10$**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan 4 slot pasangan kosong. Tersedia chip:
    - `[ (2, 4) ]` [Benar: 2 + 2(4) = 10]
    - `[ (4, 3) ]` [Benar: 4 + 2(3) = 10]
    - `[ (6, 2) ]` [Benar: 6 + 2(2) = 10]
    - `[ (8, 1) ]` [Benar: 8 + 2(1) = 10]
    - `[ (4, 2) ]` [Pengecoh: 4 + 4 = 8]
    - `[ (2, 3) ]` [Pengecoh: 2 + 6 = 8]
- **Pilihan/Jawaban:** Memilih dan memasang chip pasangan yang memenuhi persamaan.
- **Kunci:** `(2, 4)`, `(4, 3)`, `(6, 2)`, dan `(8, 1)`.
- **Pembahasan:**
  Uji setiap nilai $a in A$:
  - Jika $a = 2 implies 2 + 2b = 10 implies 2b = 8 implies b = 4 implies (2, 4)$
  - Jika $a = 4 implies 4 + 2b = 10 implies 2b = 6 implies b = 3 implies (4, 3)$
  - Jika $a = 6 implies 6 + 2b = 10 implies 2b = 4 implies b = 2 implies (6, 2)$
  - Jika $a = 8 implies 8 + 2b = 10 implies 2b = 2 implies b = 1 implies (8, 1)$
- **Feedback:**
  - *Benar:* "Luar biasa! Kamu menyelesaikan persamaan $a + 2b = 10$ untuk seluruh anggota himpunan dengan sempurna!"
  - *Salah:* "Gunakan substitusi: jika $a=2$, maka $2 + 2b = 10$, sehingga $2b = 8$ dan $b = 4$. Pasangannya adalah $(2, 4)$."

---

### [ID: CH1-STAGE-20] Klasifikasi Kelengkapan Bukti Kasus
- **Materi:** Evaluasi dan Pengelompokan Relasi
- **Indikator:** Siswa dapat menghubungkan berkas kasus ke status kelulusan berdasarkan kriteria kelengkapan data.
- **Bentuk Interaksi:** Matching / Drag & Drop.
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Sebagai tahap akhir evaluasi berkas detektif:
  - Berkas Kasus 101 memiliki barang bukti lengkap dan alibi terverifikasi.
  - Berkas Kasus 102 tidak memiliki sidik jari dan saksi belum diperiksa.
  - Berkas Kasus 103 memiliki rekaman CCTV lengkap dan bukti fisik valid.
  Hubungkan setiap berkas kasus ke kategori statusnya: **"Lolos Uji Sidang"** atau **"Perlu Investigasi Ulang"**!
- **Data/Visual yang diperlukan:** Tiga map berkas berlabel 101, 102, 103 di sisi kiri dan dua stempel status di sisi kanan.
- **Pilihan/Jawaban:** Tarik garis relasi dari berkas ke stempel status.
- **Kunci:**
  - `Berkas Kasus 101 ➔ Lolos Uji Sidang`
  - `Berkas Kasus 102 ➔ Perlu Investigasi Ulang`
  - `Berkas Kasus 103 ➔ Lolos Uji Sidang`
- **Pembahasan:**
  Berkas yang memenuhi syarat kelengkapan (101 dan 103) dipasangkan ke "Lolos Uji Sidang". Berkas yang tidak lengkap (102) dipasangkan ke "Perlu Investigasi Ulang". Ini merupakan contoh relasi kategori dalam evaluasi data.
- **Feedback:**
  - *Benar:* "Sempurna! Semua berkas telah diklasifikasikan dengan benar. Penyelidikan Bab 1 tuntas!"
  - *Salah:* "Periksa kembali status berkas: berkas yang bukti dan alibinya lengkap dipasangkan ke 'Lolos Uji Sidang'."

---

### [ID: CH1-STAGE-21] Sidang Kesimpulan: Hakikat Relasi Dua Himpunan
- **Materi:** Sintesis Konsep Dasar Relasi
- **Indikator:** Siswa dapat mengevaluasi dan merumuskan kesimpulan esensial mengenai pengertian, fleksibilitas, dan cara penyajian relasi.
- **Bentuk Interaksi:** Pilihan Ganda Sintesis.
- **C-Level:** C5/C6 (Evaluasi & Sintesis)
- **Soal:**
  Setelah menyelesaikan seluruh 20 stage kasus investigasi, apakah KESIMPULAN UTAMA yang paling tepat mengenai konsep **RELASI** dalam matematika?
- **Data/Visual yang diperlukan:** Sertifikat Kelulusan Detektif Data Bab 1 dengan lencana emas.
- **Pilihan/Jawaban:**
  A. Relasi adalah aturan yang mewajibkan setiap anggota asal memiliki tepat satu pasangan yang sama persis di himpunan kawan.
  B. Relasi adalah aturan yang memasangkan anggota himpunan asal dengan anggota himpunan kawan, di mana anggota asal bebas memiliki banyak pasangan (bercabang) ataupun tidak memiliki pasangan sama sekali.
  C. Relasi adalah operasi hitung penjumlahan antara dua himpunan bilangan bulat yang hanya bisa digambar menggunakan diagram Cartesius.
  D. Relasi hanya berlaku untuk nama orang dan makanan, serta tidak dapat dinyatakan dengan rumus matematika.
- **Kunci:** B. Relasi adalah aturan yang memasangkan anggota himpunan asal dengan anggota himpunan kawan, di mana anggota asal bebas memiliki banyak pasangan (bercabang) ataupun tidak memiliki pasangan sama sekali.
- **Pembahasan:**
  Ciri utama relasi adalah fleksibilitasnya: relasi adalah aturan pengaitan/pemasangan dua himpunan. Tidak ada syarat ketat apakah anggota daerah asal harus punya pasangan atau tidak boleh bercabang (berbeda dengan *fungsi* yang akan dipelajari di Bab 2). Relasi dapat disajikan dengan 4 cara: diagram panah, pasangan berurutan, diagram Cartesius, dan tabel.
- **Feedback:**
  - *Benar:* "SELAMAT, DETEKTIF! Kamu telah menguasai konsep hakiki Relasi Matematika. Bab 1 selesai dengan predikat SEMPURNA!"
  - *Salah:* "Ingat kembali ciri khas utama relasi yang telah kita pelajari di 20 stage: sifatnya sangat bebas, boleh bercabang dan boleh tidak punya pasangan."

---
---

# BAGIAN II: 30 SOAL LATIHAN LENGKAP CHAPTER 1 (BANK SOAL & EVALUASI)

---

### [ID: CH1-EX-01] Definisi Dasar Relasi
- **Materi:** Pengertian Relasi
- **Indikator:** Siswa dapat mengidentifikasi pengertian formal relasi matematika.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C2 (Memahami)
- **Soal:**
  Dalam matematika, apa yang dimaksud dengan **relasi** antara Himpunan A dan Himpunan B?
- **Data/Visual yang diperlukan:** Tidak diperlukan visual grafis (teks narasi murni).
- **Pilihan/Jawaban:**
  A. Operasi penjumlahan seluruh anggota himpunan A dengan himpunan B
  B. Aturan yang memasangkan anggota himpunan A dengan anggota himpunan B
  C. Aturan yang mengharuskan semua anggota A memiliki pasangan yang kembar di B
  D. Penggabungan dua himpunan menjadi satu himpunan baru yang lebih besar
- **Kunci:** B. Aturan yang memasangkan anggota himpunan A dengan anggota himpunan B
- **Pembahasan:**
  Relasi dari himpunan A ke himpunan B didefinisikan sebagai suatu aturan yang mengaitkan atau memasangkan anggota-anggota himpunan A dengan anggota-anggota himpunan B.
- **Feedback:**
  - *Benar:* "Tepat! Relasi adalah aturan pemasangan atau pengaitan antaranggota dua himpunan."
  - *Salah:* "Ingat analogi 'hubungan': relasi adalah aturan yang mengaitkan/memasangkan anggota himpunan asal ke himpunan kawan."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Hubungan keterkaitan antara himpunan siswa kelas VIII dengan nomor sepatu masing-masing di sekolah disebut sebagai...
  - *Pilihan:* A. Relasi | B. Himpunan Kosong | C. Bilangan Cacah | D. Diagram Lingkaran
  - *Kunci:* A. Relasi

---

### [ID: CH1-EX-02] Empat Cara Menyatakan Relasi
- **Materi:** Bentuk Penyajian Relasi
- **Indikator:** Siswa dapat memverifikasi kebenaran ragam bentuk penyajian relasi.
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C2 (Memahami)
- **Soal:**
  **Pernyataan:** Relasi matematika dapat disajikan dalam 4 bentuk, yaitu: Diagram Panah, Himpunan Pasangan Berurutan, Diagram Cartesius, dan Tabel Relasi.
- **Data/Visual yang diperlukan:** Ikon representasi 4 bentuk penyajian.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan di atas benar. Empat cara baku menyajikan relasi pada tingkat SMP adalah: (1) Diagram Panah, (2) Himpunan Pasangan Berurutan, (3) Diagram Cartesius, dan (4) Tabel Relasi.
- **Feedback:**
  - *Benar:* "Tepat sekali! Keempat metode tersebut merupakan cara standar untuk menampilkan data relasi."
  - *Salah:* "Pernyataan tersebut benar. Relasi dapat disajikan dengan diagram panah, himpunan pasangan berurutan, koordinat Cartesius, maupun tabel."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pernyataan: Diagram Panah adalah satu-satunya cara untuk menyajikan relasi matematika. (A. Benar / B. Salah)
  - *Kunci:* B. Salah (karena ada 3 cara lainnya).

---

### [ID: CH1-EX-03] Membaca Relasi dari Himpunan Pasangan Berurutan
- **Materi:** Pasangan Berurutan
- **Indikator:** Siswa dapat membaca aturan relasi yang tersirat dari himpunan pasangan berurutan.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan himpunan pasangan berurutan: $R = {(1, 2), (2, 3), (3, 4), (4, 5)}$.
  Aturan relasi yang paling tepat dari himpunan pertama ke himpunan kedua adalah...
- **Data/Visual yang diperlukan:** Ilustrasi deretan pasangan angka.
- **Pilihan/Jawaban:**
  A. "Dua kalinya dari"
  B. "Satu kurangnya dari"
  C. "Lebih dari"
  D. "Kuadrat dari"
- **Kunci:** B. "Satu kurangnya dari"
- **Pembahasan:**
  Perhatikan selisih angka pertama ($x$) terhadap angka kedua ($y$):
  - $1 = 2 - 1$ (1 adalah satu kurangnya dari 2)
  - $2 = 3 - 1$ (2 adalah satu kurangnya dari 3)
  - $3 = 4 - 1$ (3 adalah satu kurangnya dari 4)
  - $4 = 5 - 1$ (4 adalah satu kurangnya dari 5)
  Maka aturan relasinya adalah "satu kurangnya dari".
- **Feedback:**
  - *Benar:* "Cermat sekali! Angka pertama selalu 1 angka lebih kecil dibanding angka pasangannya."
  - *Salah:* "Cek hubungannya: 1 ke 2, 2 ke 3, 3 ke 4. Apakah 1 dua kalinya dari 2? Bukan! 1 adalah satu angka lebih sedikit dari 2 (satu kurangnya dari)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika pasangan berurutan adalah ${(2, 1), (3, 2), (4, 3)}$, aturan relasinya adalah...
  - *Pilihan:* A. Satu lebihnya dari | B. Setengah dari | C. Kurang dari | D. Dua kalinya dari
  - *Kunci:* A. Satu lebihnya dari ($2 = 1 + 1$).

---

### [ID: CH1-EX-04] Diagram Panah: Relasi "Faktor Dari"
- **Materi:** Relasi Faktor & Diagram Panah
- **Indikator:** Siswa dapat menghubungkan pasangan diagram panah berdasarkan relasi "faktor dari".
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan Himpunan $A = {2, 3}$ dan $Himpunan B = {4, 6, 9}$. Hubungkan anggota A ke anggota B dengan aturan relasi: **"Faktor dari"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* 
    - Oval A: `2`, `3`
    - Oval B: `4`, `6`, `9`
    - Siswa menghubungkan titik panah dari A ke B.
- **Pilihan/Jawaban:** Penarikan garis panah interaktif.
- **Kunci:**
  - `2 ➔ 4`
  - `2 ➔ 6`
  - `3 ➔ 6`
  - `3 ➔ 9`
- **Pembahasan:**
  - 2 adalah faktor dari 4 dan 6 (karena 4 dan 6 habis dibagi 2).
  - 3 adalah faktor dari 6 dan 9 (karena 6 dan 9 habis dibagi 3).
  - 2 bukan faktor dari 9, dan 3 bukan faktor dari 4.
- **Feedback:**
  - *Benar:* "Tepat! 2 membagi habis 4 dan 6, sedangkan 3 membagi habis 6 dan 9."
  - *Salah:* "Periksa kembali pembagian: 4 habis dibagi 2, 6 habis dibagi 2 dan 3, 9 habis dibagi 3."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $A = {3}$ dan $B = {6, 12, 15}$, berapakah banyak panah yang keluar dari angka 3 dengan aturan 'faktor dari'? (A. 1 panah | B. 2 panah | C. 3 panah | D. 0 panah)
  - *Kunci:* C. 3 panah (karena 3 adalah faktor dari 6, 12, dan 15).

---

### [ID: CH1-EX-05] Sifat Fleksibilitas Relasi: Anggota Kosong & Bercabang
- **Materi:** Konsep Sifat Relasi
- **Indikator:** Siswa dapat membedakan sifat kebebasan relasi dibanding fungsi.
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C2 (Memahami)
- **Soal:**
  **Pernyataan:** Pada sebuah relasi dari himpunan A ke himpunan B, anggota himpunan A diperbolehkan memiliki lebih dari satu pasangan, dan diperbolehkan pula tidak memiliki pasangan sama sekali.
- **Data/Visual yang diperlukan:** Tidak diperlukan visual grafis.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai Benar. Syarat relasi sangat longgar dan bebas: anggota himpunan asal boleh bercabang banyak dan boleh kosong (tidak punya kawan). Aturan ketat "harus tepat satu pasangan" hanya berlaku untuk *Fungsi*.
- **Feedback:**
  - *Benar:* "Tepat sekali! Relasi bersifat fleksibel tanpa batasan cabang ataupun elemen kosong."
  - *Salah:* "Pernyataan ini Benar. Relasi memperbolehkan anggota asal bercabang maupun kosong."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika pada diagram panah terdapat anggota di himpunan asal yang tidak memiliki tanda panah ke himpunan kawan, apakah diagram tersebut masih sah disebut relasi? (A. Benar, tetap sah | B. Salah, tidak sah)
  - *Kunci:* A. Benar, tetap sah.

---

### [ID: CH1-EX-06] Jodohkan Ciri Visual 3 Cara Menyatakan Relasi
- **Materi:** Representasi Relasi
- **Indikator:** Siswa dapat mencocokkan nama bentuk penyajian relasi dengan ciri visual utamanya.
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Jodohkan bentuk penyajian relasi di sebelah kiri dengan ciri khas visualnya di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* 3 kartu di kiri dan 4 kotak penjelasan di kanan.
    - Kiri: 
      1. `Diagram Panah`
      2. `Himpunan Pasangan Berurutan`
      3. `Diagram Cartesius`
    - Kanan:
      - `Kurva oval tertutup dengan garis berarah panah`
      - `Kumpulan titik koordinat (x, y) dalam kurung kurawal`
      - `Titik-titik noktah pada bidang sumbu koordinat X dan Y`
      - `Garis kurva melengkung parabola` [Pengecoh]
- **Pilihan/Jawaban:** Menarik garis penghubung pencocokan.
- **Kunci:**
  - `Diagram Panah` ➔ `Kurva oval tertutup dengan garis berarah panah`
  - `Himpunan Pasangan Berurutan` ➔ `Kumpulan titik koordinat (x, y) dalam kurung kurawal`
  - `Diagram Cartesius` ➔ `Titik-titik noktah pada bidang sumbu koordinat X dan Y`
- **Pembahasan:**
  Setiap sajian relasi memiliki representasi visual khusus yang mempermudah pembacaan data hubungan antar-elemen.
- **Feedback:**
  - *Benar:* "Sempurna! Kamu memahami karakteristik visual dari ketiga cara menyatakan relasi."
  - *Salah:* "Perhatikan kata kuncinya: 'panah' untuk diagram panah, 'kurung kurawal (x, y)' untuk pasangan berurutan, dan 'sumbu X-Y' untuk Cartesius."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Tanda kurung kurawal ${~}$ dengan elemen berupa pasangan $(x, y)$ merupakan ciri dari bentuk penyajian... (A. Diagram Batang | B. Himpunan Pasangan Berurutan | C. Diagram Lingkaran | D. Tabel Frekuensi)
  - *Kunci:* B. Himpunan Pasangan Berurutan.

---

### [ID: CH1-EX-07] Relasi "Kuadrat Dari"
- **Materi:** Relasi Kuadrat
- **Indikator:** Siswa dapat menyusun himpunan pasangan berurutan dengan aturan "kuadrat dari".
- **Bentuk Interaksi:** Menentukan pasangan berurutan.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui Himpunan $A = {1, 4, 9}$ dan $B = {1, 2, 3}$. Aturan relasi dari A ke B adalah **"Kuadrat dari"**. Pilihlah himpunan pasangan berurutan yang benar!
- **Data/Visual yang diperlukan:** Kartu pasangan berurutan.
- **Pilihan/Jawaban:**
  A. ${(1, 1), (2, 4), (3, 9)}$
  B. ${(1, 1), (4, 2), (9, 3)}$
  C. ${(4, 2), (9, 3)}$
  D. ${(1, 2), (4, 3), (9, 1)}$
- **Kunci:** B. ${(1, 1), (4, 2), (9, 3)}$
- **Pembahasan:**
  Aturan "kuadrat dari" ($a = b^2$):
  - $1 = 1^2 implies (1, 1)$
  - $4 = 2^2 implies (4, 2)$
  - $9 = 3^2 implies (9, 3)$
  Pilihan A salah karena urutannya terbalik ($2$ bukan kuadrat dari $4$, melainkan $4$ kuadrat dari $2$).
- **Feedback:**
  - *Benar:* "Tepat! 1 adalah kuadrat dari 1, 4 kuadrat dari 2, dan 9 kuadrat dari 3."
  - *Salah:* "Hati-hati dengan urutan pasangan $(a, b)$. Angka pertama $a in A$ harus merupakan hasil kuadrat dari angka kedua $b in B$ ($4 = 2^2$, jadi $(4, 2)$ bukan $(2, 4)$)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika relasi dari $A = {16, 25}$ ke $B = {4, 5}$ adalah 'kuadrat dari', pasangannya adalah...
  - *Pilihan:* A. {(4, 16), (5, 25)} | B. {(16, 4), (25, 5)} | C. {(16, 5), (25, 4)} | D. {(4, 5), (16, 25)}
  - *Kunci:* B. {(16, 4), (25, 5)}

---

### [ID: CH1-EX-08] Multi-Karakteristik Relasi yang Sah
- **Materi:** Analisis Syarat Relasi
- **Indikator:** Siswa dapat mengevaluasi beberapa pernyataan dan memilih semua karakteristik yang berlaku pada relasi matematika.
- **Bentuk Interaksi:** Pilihan Ganda Kompleks (Centang semua yang benar).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Manakah pernyataan di bawah ini yang **BENAR** mengenai relasi antara dua himpunan? (Pilih semua pernyataan yang benar!)
- **Data/Visual yang diperlukan:** Kotak checkbox interaktif (Multi-selection).
- **Pilihan/Jawaban:**
  [ ] A. Setiap anggota himpunan asal boleh memiliki lebih dari satu pasangan di himpunan kawan.
  [ ] B. Jumlah anggota himpunan asal harus selalu sama persis dengan himpunan kawan.
  [ ] C. Ada anggota himpunan asal yang tidak memiliki pasangan sama sekali, relasi tetap sah.
  [ ] D. Relasi dapat dinyatakan dalam bentuk diagram panah, himpunan pasangan berurutan, diagram Cartesius, dan tabel.
- **Kunci:** Centang **A**, **C**, dan **D** (Pernyataan B salah).
- **Pembahasan:**
  - Pernyataan A BENAR (relasi boleh bercabang).
  - Pernyataan B SALAH (jumlah anggota himpunan asal dan kawan bebas, tidak wajib sama).
  - Pernyataan C BENAR (anggota asal boleh kosong).
  - Pernyataan D BENAR (ada 4 bentuk penyajian baku).
- **Feedback:**
  - *Benar:* "Hebat! Kamu menguasai seluruh sifat relasi: fleksibel, bebas jumlah anggota, dan dapat disajikan dalam 4 bentuk."
  - *Salah:* "Ingat, jumlah anggota dua himpunan tidak harus sama persis. Relasi tetap sah meskipun himpunan asal beranggotakan 2 orang dan himpunan kawan beranggotakan 10 barang."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Apakah jumlah anggota himpunan A dan B harus sama agar bisa dibentuk suatu relasi? (A. Wajib sama | B. Tidak harus sama, bebas)
  - *Kunci:* B. Tidak harus sama, bebas.

---

### [ID: CH1-EX-09] Relasi "Satu Kurangnya Dari"
- **Materi:** Relasi Pengurangan & Diagram Panah
- **Indikator:** Siswa dapat menarik garis diagram panah untuk relasi "satu kurangnya dari".
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan $A = {1, 2, 3}$ dan $B = {2, 3, 4, 5}$. Hubungkan anggota A ke anggota B dengan aturan relasi: **"Satu kurangnya dari"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* 
    - Lingkaran A: `1`, `2`, `3`
    - Lingkaran B: `2`, `3`, `4`, `5`
- **Pilihan/Jawaban:** Penarikan garis panah interaktif.
- **Kunci:**
  - `1 ➔ 2` ($1 = 2 - 1$)
  - `2 ➔ 3` ($2 = 3 - 1$)
  - `3 ➔ 4` ($3 = 4 - 1$)
  - (Elemen `5` di B tidak berpasangan).
- **Pembahasan:**
  "Satu kurangnya dari" berarti $a = b - 1 iff b = a + 1$.
  - 1 dihubungkan ke $1 + 1 = 2$.
  - 2 dihubungkan ke $2 + 1 = 3$.
  - 3 dihubungkan ke $3 + 1 = 4$.
- **Feedback:**
  - *Benar:* "Tepat! 1 berpasangan dengan 2, 2 dengan 3, dan 3 dengan 4."
  - *Salah:* "Artinya: angka di A bernilai 1 lebih kecil daripada angka pasangannya di B. Contoh: 1 adalah satu kurangnya dari 2."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada relasi 'satu kurangnya dari', angka 5 di daerah asal akan dipasangkan ke angka berapa di daerah kawan? (A. 4 | B. 6 | C. 10 | D. 5)
  - *Kunci:* B. 6 ($5 = 6 - 1$).

---

### [ID: CH1-EX-10] Membaca Titik pada Diagram Cartesius
- **Materi:** Diagram Cartesius Relasi
- **Indikator:** Siswa dapat menuliskan himpunan pasangan berurutan dari titik-titik yang tertera pada diagram Cartesius.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Pada sebuah bidang koordinat Cartesius, terdapat tiga titik noktah hitam pada koordinat $(1, 3)$, $(2, 4)$, dan $(3, 5)$. Jika sumbu X mewakili himpunan A dan sumbu Y mewakili himpunan B, aturan relasi yang paling tepat dari A ke B adalah...
- **Data/Visual yang diperlukan:** Grafik Cartesius mini menampilkan sumbu horizontal X ($1, 2, 3$) dan vertikal Y ($1, 2, 3, 4, 5$) dengan 3 titik koordinat $(1,3)$, $(2,4)$, $(3,5)$.
- **Pilihan/Jawaban:**
  A. "Dua lebihnya dari"
  B. "Dua kurangnya dari"
  C. "Dua kalinya dari"
  D. "Faktor dari"
- **Kunci:** B. "Dua kurangnya dari"
- **Pembahasan:**
  Perhatikan hubungan dari nilai $x$ (sumbu X) ke nilai $y$ (sumbu Y):
  - $1 = 3 - 2$ (1 adalah dua kurangnya dari 3)
  - $2 = 4 - 2$ (2 adalah dua kurangnya dari 4)
  - $3 = 5 - 2$ (3 adalah dua kurangnya dari 5)
  Maka aturan relasinya adalah "dua kurangnya dari" ($x = y - 2$).
- **Feedback:**
  - *Benar:* "Hebat! Nilai pada sumbu X selalu 2 angka lebih kecil dibanding nilai pada sumbu Y ($x = y - 2$)."
  - *Salah:* "Jangan terbalik! Dari X ke Y: 1 ke 3, 2 ke 4, 3 ke 5. Angka di X dua angka lebih kecil daripada Y, artinya 'dua kurangnya dari'."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika titik koordinat Cartesius berada di $(2, 6)$, $(3, 9)$, dan $(4, 12)$, aturan relasi dari sumbu X ke sumbu Y adalah...
  - *Pilihan:* A. Tiga kalinya dari | B. Sepertiga dari | C. Kurang dari | D. Tiga lebihnya dari
  - *Kunci:* B. Sepertiga dari ($2 = rac{1}{3} 	imes 6$).

---

### [ID: CH1-EX-11] Plot Titik Koordinat: Relasi "Kelipatan Dari"
- **Materi:** Diagram Cartesius Interaktif
- **Indikator:** Siswa dapat meletakkan titik-titik koordinat $(x, y)$ pada bidang Cartesius berdasarkan relasi kelipatan.
- **Bentuk Interaksi:** Memilih titik pada bidang koordinat Cartesius (Interactive Grid Plotting).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan $A = {4, 6}$ (pada sumbu mendatar X) dan $B = {2, 3}$ (pada sumbu tegak Y). Pasanglah titik-titik koordinat pada kisi Cartesius yang memenuhi aturan relasi: **"Kelipatan dari"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan grid Cartesius:
    - Sumbu X: nilai 0, 1, 2, 3, 4, 5, 6
    - Sumbu Y: nilai 0, 1, 2, 3, 4
    - Siswa dapat mengeklik perempatan garis untuk memunculkan noktah biru.
- **Pilihan/Jawaban:** Menandai persilangan koordinat pada grid.
- **Kunci:** Pasang 3 titik pada koordinat:
  - Titik $(4, 2)$ [karena 4 kelipatan 2]
  - Titik $(6, 2)$ [karena 6 kelipatan 2]
  - Titik $(6, 3)$ [karena 6 kelipatan 3]
  *(Titik $(4, 3)$ tidak dipasang karena 4 bukan kelipatan 3).*
- **Pembahasan:**
  Nilai $x in A$ harus merupakan kelipatan dari nilai $y in B$:
  - $x = 4$: kelipatan dari $y = 2 implies (4, 2)$.
  - $x = 6$: kelipatan dari $y = 2$ dan $y = 3 implies (6, 2)$ dan $(6, 3)$.
- **Feedback:**
  - *Benar:* "Titik koordinat terpasang presisi! Titik $(4, 2)$, $(6, 2)$, dan $(6, 3)$ berhasil memetakan relasi kelipatan pada Cartesius."
  - *Salah:* "Periksa kembali: 4 hanya habis dibagi 2 (titik $(4, 2)$), sedangkan 6 habis dibagi 2 dan 3 (titik $(6, 2)$ dan $(6, 3)$)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Manakah pasangan titik yang tepat untuk relasi 'faktor dari' jika $x in {2}$ dan $y in {4, 6}$? (A. (2, 4) dan (2, 6) | B. (4, 2) dan (6, 2))
  - *Kunci:* A. (2, 4) dan (2, 6) [karena sumbu X adalah daerah asal 2].

---

### [ID: CH1-EX-12] Sortir Pasangan: Aturan "Kurang Dari"
- **Materi:** Relasi Pertidaksamaan
- **Indikator:** Siswa dapat menyaring pasangan berurutan yang memenuhi pertidaksamaan $a < b$.
- **Bentuk Interaksi:** Drag & Drop Pasangan Berurutan.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan himpunan $A = {2, 3}$ dan $B = {1, 3, 4}$. Seret kartu-kartu berikut ke dalam zona **"Memenuhi Aturan Kurang Dari"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Dropzone kotak hijau berlabel `Himpunan Pasangan Kurang Dari`.
  - Kartu Pilihan:
    - `[ (2, 3) ]` [Seret ke zona]
    - `[ (2, 4) ]` [Seret ke zona]
    - `[ (3, 4) ]` [Seret ke zona]
    - `[ (2, 1) ]` [Abaikan: 2 > 1]
    - `[ (3, 3) ]` [Abaikan: 3 = 3]
    - `[ (3, 1) ]` [Abaikan: 3 > 1]
- **Pilihan/Jawaban:** Menyeret kartu pasangan yang memenuhi $a < b$.
- **Kunci:** Masukkan kartu: `(2, 3)`, `(2, 4)`, dan `(3, 4)`.
- **Pembahasan:**
  Syarat $a < b$:
  - $(2, 3) implies 2 < 3$ (Benar)
  - $(2, 4) implies 2 < 4$ (Benar)
  - $(3, 4) implies 3 < 4$ (Benar)
  Pasangan $(3, 3)$ tidak memenuhi karena $3$ sama dengan $3$, bukan kurang dari.
- **Feedback:**
  - *Benar:* "Tepat sekali! Ketiga pasangan tersebut memiliki angka pertama yang lebih kecil dari angka kedua."
  - *Salah:* "Pastikan angka kiri benar-benar lebih kecil dari angka kanan ($a < b$). Pasangan dengan angka sama seperti $(3, 3)$ tidak termasuk ya!"
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Apakah pasangan $(5, 5)$ memenuhi aturan relasi 'kurang dari'? (A. Ya | B. Tidak)
  - *Kunci:* B. Tidak (karena 5 sama dengan 5).

---

### [ID: CH1-EX-13] Konsep Pembalikan Arah Relasi (Relasi Invers)
- **Materi:** Hubungan Invers Relasi
- **Indikator:** Siswa dapat menganalisis perubahan aturan jika arah relasi dibalik dari B ke A.
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  **Pernyataan:** Jika relasi dari Himpunan A ke Himpunan B adalah **"Setengah dari"**, maka kebalikannya (relasi dari Himpunan B ke Himpunan A) adalah aturan **"Dua kali dari"**.
- **Data/Visual yang diperlukan:** Diagram panah bolak-balik mini ($1 	o 2$ dan $2 	o 1$).
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai Benar.
  Jika $a$ setengah dari $b$ ($a = rac{1}{2}b$), maka jika dibalik dari $b$ ke $a$, berlaku $b = 2a$ (artinya $b$ adalah dua kali dari $a$). Contoh: 2 adalah setengah dari 4, maka 4 adalah dua kali dari 2.
- **Feedback:**
  - *Benar:* "Keren, Detektif! Kamu memahami hubungan invers: kebalikan dari 'setengah dari' adalah 'dua kali dari'."
  - *Salah:* "Pernyataan ini Benar. Uji dengan angka: 3 adalah setengah dari 6. Jika dibalik dari 6 ke 3, maka 6 adalah dua kali dari 3."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika relasi dari A ke B adalah 'dua lebihnya dari' ($a = b + 2$), maka relasi sebaliknya dari B ke A adalah...
  - *Pilihan:* A. Dua kurangnya dari | B. Dua kalinya dari | C. Setengah dari | D. Sama dengan
  - *Kunci:* A. Dua kurangnya dari ($b = a - 2$).

---

### [ID: CH1-EX-14] Menentukan Anggota Himpunan Asal
- **Materi:** Komponen Relasi (Daerah Asal / Domain Relasi)
- **Indikator:** Siswa dapat mengekstrak seluruh elemen daerah asal dari himpunan pasangan berurutan.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan himpunan pasangan berurutan:
  $R = {(2, 4), (2, 6), (3, 6), (5, 10)}$.
  Himpunan anggota daerah asal (elemen pertama) dari relasi tersebut adalah...
- **Data/Visual yang diperlukan:** Kotak teks berhias berkas kasus.
- **Pilihan/Jawaban:**
  A. ${4, 6, 10}$
  B. ${2, 3, 5}$
  C. ${2, 2, 3, 5}$
  D. ${2, 3, 4, 6, 10}$
- **Kunci:** B. ${2, 3, 5}$
- **Pembahasan:**
  Elemen pertama pada pasangan $(x, y)$ adalah angka $2$, $3$, dan $5$. Dalam penulisan himpunan matematika, elemen yang berulang (angka $2$) cukup dituliskan satu kali. Jadi, himpunan daerah asalnya adalah ${2, 3, 5}$.
- **Feedback:**
  - *Benar:* "Tepat! Elemen pertama adalah 2, 3, dan 5. Angka 2 yang berulang cukup ditulis sekali dalam notasi himpunan."
  - *Salah:* "Kumpulkan semua angka di posisi depan $(x, y)$: ada angka 2, 3, dan 5. Ingat kaidah himpunan: angka yang sama tidak perlu ditulis ganda."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Himpunan daerah kawan/pasangan (elemen kedua) dari ${(1, a), (2, b), (3, a)}$ adalah...
  - *Pilihan:* A. {1, 2, 3} | B. {a, b} | C. {a, b, a} | D. {1, a}
  - *Kunci:* B. {a, b}

---

### [ID: CH1-EX-15] Matching Relasi Akar Kuadrat
- **Materi:** Relasi Bentuk Akar
- **Indikator:** Siswa dapat mencocokkan bilangan asal dengan bilangan kawan pada relasi "akar kuadrat dari".
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Jodohkan setiap bilangan di Himpunan A sebelah kiri dengan pasangannya di Himpunan B sebelah kanan berdasarkan aturan: **"Akar kuadrat dari"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tiga node bilangan di kiri dan empat node bilangan di kanan.
    - Kiri (A): `2`, `3`, `5`
    - Kanan (B): `4`, `9`, `25`, `16` [Pengecoh]
- **Pilihan/Jawaban:** Menghubungkan garis pencocokan.
- **Kunci:**
  - `2` ➔ `4` (karena $sqrt{4} = 2$)
  - `3` ➔ `9` (karena $sqrt{9} = 3$)
  - `5` ➔ `25` (karena $sqrt{25} = 5$)
- **Pembahasan:**
  - 2 adalah akar kuadrat dari 4 ($sqrt{4} = 2$)
  - 3 adalah akar kuadrat dari 9 ($sqrt{9} = 3$)
  - 5 adalah akar kuadrat dari 25 ($sqrt{25} = 5$)
- **Feedback:**
  - *Benar:* "Sempurna! Kamu memahami konsep akar kuadrat: $2 = sqrt{4}$, $3 = sqrt{9}$, dan $5 = sqrt{25}$."
  - *Salah:* "Ingat: $a$ akar dari $b$ artinya $a 	imes a = b$. Contoh: $2 	imes 2 = 4$, jadi 2 dipasangkan ke 4."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Angka 6 adalah akar kuadrat dari bilangan... (A. 12 | B. 36 | C. 3 | D. 18)
  - *Kunci:* B. 36 ($6 	imes 6 = 36$).

---

### [ID: CH1-EX-16] Penerapan Relasi Nyata yang Fleksibel
- **Materi:** Relasi Kontekstual Sehari-Hari
- **Indikator:** Siswa dapat menganalisis contoh relasi nyata yang secara alami memiliki sifat bercabang dan kosong.
- **Bentuk Interaksi:** Pilihan Ganda Kompleks (Centang yang benar).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Manakah hubungan dalam kehidupan sehari-hari di bawah ini yang **DAPAT memiliki cabang lebih dari satu** sekaligus **boleh ada yang kosong** (ciri khas relasi umum)? (Pilih semua yang benar!)
- **Data/Visual yang diperlukan:** Checkbox multi-select.
- **Pilihan/Jawaban:**
  [ ] A. Relasi antara siswa dengan akun media sosial yang dimilikinya
  [ ] B. Relasi antara siswa dengan tanggal kelahirannya
  [ ] C. Relasi antara pembeli dengan buku yang dibelinya di toko buku
  [ ] D. Relasi antara warga negara dengan nomor Kartu Tanda Penduduk (KTP)
- **Kunci:** Centang **A** dan **C** (Pilihan B dan D adalah korespondensi satu-satu/fungsi khusus).
- **Pembahasan:**
  - A benar: Satu siswa bisa punya lebih dari satu akun media sosial (Instagram, TikTok), dan ada siswa yang tidak punya akun sama sekali.
  - B salah: Setiap orang pasti punya tepat 1 tanggal lahir (tidak bisa lahir di 2 tanggal berbeda, tidak bisa tidak punya tanggal lahir).
  - C benar: Pembeli bisa membeli lebih dari satu buku, atau pulang tanpa membeli buku.
  - D salah: Satu warga negara wajib memiliki tepat 1 nomor KTP unik.
- **Feedback:**
  - *Benar:* "Analisis kontekstual yang sangat matang! Media sosial dan pembelian buku adalah contoh nyata relasi bebas bercabang dan kosong."
  - *Salah:* "Pikirkan apakah seseorang bisa punya dua tanggal lahir? Tentu tidak bisa! Pilihlah hubungan yang memungkinkan seseorang memilih banyak barang atau tidak memilih sama sekali."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Relasi 'hobi olahraga kegemaran' seorang siswa: apakah siswa boleh punya lebih dari satu hobi? (A. Ya, boleh punya banyak hobi | B. Tidak boleh)
  - *Kunci:* A. Ya, boleh punya banyak hobi.

---

### [ID: CH1-EX-17] Relasi Identitas ("Sama Dengan")
- **Materi:** Relasi Identitas
- **Indikator:** Siswa dapat mengevaluasi karakteristik himpunan pasangan berurutan pada relasi identitas $a = b$.
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  **Pernyataan:** Jika himpunan $A = {1, 2, 3}$ dan aturan relasinya adalah **"Sama dengan"**, maka seluruh pasangan berurutannya selalu memiliki angka pertama dan angka kedua yang bernilai persis sama, yaitu ${(1, 1), (2, 2), (3, 3)}$.
- **Data/Visual yang diperlukan:** Tidak diperlukan visual grafis.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Aturan "sama dengan" berarti $a = b$. Oleh karena itu, elemen $1$ hanya bisa dipasangkan dengan $1$, $2$ dengan $2$, dan $3$ dengan $3$, sehingga terbentuk pasangan ${(1, 1), (2, 2), (3, 3)}$.
- **Feedback:**
  - *Benar:* "Tepat! Aturan 'sama dengan' selalu menghubungkan setiap elemen ke dirinya sendiri."
  - *Salah:* "Pernyataan ini Benar. Karena aturannya 'sama dengan', maka $1$ dipasangkan ke $1$, $2$ ke $2$, dan $3$ ke $3$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pasangan berurutan dari relasi 'sama dengan' untuk himpunan $A = {5, 7}$ adalah... (A. {(5, 7)} | B. {(5, 5), (7, 7)} | C. {(7, 5)} | D. {(5, 0), (7, 0)})
  - *Kunci:* B. {(5, 5), (7, 7)}

---

### [ID: CH1-EX-18] Deteksi Kesalahan Relasi "Faktor Dari"
- **Materi:** Deteksi Kesalahan pada Pasangan Berurutan
- **Indikator:** Siswa dapat menemukan satu pasangan berurutan yang salah dalam sebuah himpunan relasi.
- **Bentuk Interaksi:** Deteksi Kesalahan (Menandai pasangan yang salah).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan himpunan $A = {2, 3, 5}$ dan $B = {6, 10, 15}$.
  Seorang siswa menuliskan himpunan pasangan relasi **"Faktor dari"** sebagai berikut:
  $R = {(2, 6), (2, 10), (3, 6), (3, 10), (3, 15), (5, 10), (5, 15)}$
  Di antara pasangan di atas, manakah **SATU pasangan yang KELIRU** dan harus dihapus?
- **Data/Visual yang diperlukan:** 7 kartu pasangan berurutan yang dapat di-klik untuk memilih pasangan yang salah.
- **Pilihan/Jawaban:**
  A. $(2, 6)$
  B. $(3, 10)$
  C. $(3, 15)$
  D. $(5, 15)$
- **Kunci:** B. $(3, 10)$
- **Pembahasan:**
  Mari uji pembagian untuk masing-masing pasangan:
  - $6 div 2 = 3$ (habis $implies$ sah)
  - $10 div 2 = 5$ (habis $implies$ sah)
  - $6 div 3 = 2$ (habis $implies$ sah)
  - $10 div 3 = 3$ sisa $1$ (TIDAK HABIS $implies$ BUKAN FAKTOR!)
  - $15 div 3 = 5$ (habis $implies$ sah)
  Maka pasangan $(3, 10)$ adalah data palsu yang salah dan harus dihapus.
- **Feedback:**
  - *Benar:* "Cemerlang, Detektif! $10$ tidak habis dibagi $3$ (ada sisa 1), sehingga $3$ bukan faktor dari $10$."
  - *Salah:* "Cek pembagian: apakah 10 habis dibagi 3? Tidak, $10 div 3 = 3$ sisa 1. Maka pasangan $(3, 10)$ salah!"
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Manakah yang BUKAN faktor dari 12? (A. 2 | B. 3 | C. 4 | D. 5)
  - *Kunci:* D. 5 (karena 12 tidak habis dibagi 5).

---

### [ID: CH1-EX-19] Analisis Diagram Panah: Derajat Percabangan
- **Materi:** Membaca Diagram Panah
- **Indikator:** Siswa dapat menganalisis banyak cabang panah yang keluar dari anggota himpunan asal.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Perhatikan relasi "Kelipatan dari" dari Himpunan $A = {12}$ ke Himpunan $B = {2, 3, 4, 5, 6}$.
  Berapakah banyak tanda panah yang keluar dari angka $12$ pada diagram panah tersebut?
- **Data/Visual yang diperlukan:** Diagram panah dengan angka 12 di sisi kiri dan angka ${2, 3, 4, 5, 6}$ di sisi kanan.
- **Pilihan/Jawaban:**
  A. 2 panah
  B. 3 panah
  C. 4 panah
  D. 5 panah
- **Kunci:** C. 4 panah
- **Pembahasan:**
  Angka 12 adalah kelipatan dari bilangan yang membagi habis 12:
  - 12 kelipatan dari 2 ($12 div 2 = 6$)
  - 12 kelipatan dari 3 ($12 div 3 = 4$)
  - 12 kelipatan dari 4 ($12 div 4 = 3$)
  - 12 kelipatan dari 6 ($12 div 6 = 2$)
  Angka 12 bukan kelipatan dari 5 (karena $12 div 5$ bersisa).
  Jadi ada 4 tanda panah yang keluar dari angka 12 (mengarah ke 2, 3, 4, dan 6).
- **Feedback:**
  - *Benar:* "Sangat teliti! Angka 12 memiliki 4 panah karena habis dibagi 2, 3, 4, dan 6."
  - *Salah:* "Uji angka 12: apakah 12 bisa dibagi 2? Ya. Dibagi 3? Ya. Dibagi 4? Ya. Dibagi 5? Tidak. Dibagi 6? Ya. Hitung total angka yang bisa membagi 12."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Berapa banyak panah yang keluar dari angka 10 jika dihubungkan ke $B = {2, 3, 5}$ dengan aturan 'kelipatan dari'? (A. 1 panah | B. 2 panah | C. 3 panah | D. 0 panah)
  - *Kunci:* B. 2 panah (ke angka 2 dan 5).

---

### [ID: CH1-EX-20] Relasi "Dua Lebihnya Dari" (Diagram Panah)
- **Materi:** Relasi Aljabar
- **Indikator:** Siswa dapat menghubungkan pasangan diagram panah dengan aturan "dua lebihnya dari".
- **Bentuk Interaksi:** Menghubungkan anggota himpunan dengan garis (Diagram Panah Interaktif).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan Himpunan $A = {5, 6, 7}$ dan $B = {3, 4, 5}$. Hubungkan anggota A ke anggota B dengan aturan: **"Dua lebihnya dari"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* 
    - Lingkaran A: `5`, `6`, `7`
    - Lingkaran B: `3`, `4`, `5`
- **Pilihan/Jawaban:** Penarikan garis panah langsung.
- **Kunci:**
  - `5 ➔ 3` ($5 = 3 + 2$)
  - `6 ➔ 4` ($6 = 4 + 2$)
  - `7 ➔ 5` ($7 = 5 + 2$)
- **Pembahasan:**
  "Dua lebihnya dari" artinya nilai $a$ sama dengan $b$ ditambah 2 ($a = b + 2$):
  - $5 = 3 + 2 implies 5 	o 3$
  - $6 = 4 + 2 implies 6 	o 4$
  - $7 = 5 + 2 implies 7 	o 5$
- **Feedback:**
  - *Benar:* "Tepat! 5 berpasangan dengan 3, 6 dengan 4, dan 7 dengan 5."
  - *Salah:* "Kurangi setiap angka di A dengan 2 untuk menemukan pasangannya di B: $5 - 2 = 3$, $6 - 2 = 4$, $7 - 2 = 5$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $a$ dua lebihnya dari $b$, dan diketahui $a = 10$, berapakah nilai $b$? (A. 12 | B. 8 | C. 20 | D. 5)
  - *Kunci:* B. 8 ($10 = 8 + 2$).

---

### [ID: CH1-EX-21] Menentukan Posisi Sumbu pada Diagram Cartesius
- **Materi:** Format Diagram Cartesius
- **Indikator:** Siswa dapat mengidentifikasi penempatan himpunan asal dan kawan pada sumbu Cartesius.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C2 (Memahami)
- **Soal:**
  Pada penyajian relasi dari himpunan A ke himpunan B menggunakan Diagram Cartesius, manakah posisi penempatan sumbu yang benar?
- **Data/Visual yang diperlukan:** Ilustrasi salib sumbu Cartesius horizontal (X) dan vertikal (Y).
- **Pilihan/Jawaban:**
  A. Sumbu mendatar (X) untuk Himpunan A, dan sumbu tegak (Y) untuk Himpunan B
  B. Sumbu tegak (Y) untuk Himpunan A, dan sumbu mendatar (X) untuk Himpunan B
  C. Kedua himpunan diletakkan bebas di sumbu mana saja secara bergantian
  D. Sumbu Cartesius tidak dapat memuat nama selain angka negatif
- **Kunci:** A. Sumbu mendatar (X) untuk Himpunan A, dan sumbu tegak (Y) untuk Himpunan B
- **Pembahasan:**
  Secara konvensi standar matematika, daerah asal (Himpunan A) selalu diposisikan pada sumbu horizontal / mendatar (sumbu X), sedangkan daerah kawan (Himpunan B) diletakkan pada sumbu vertikal / tegak (sumbu Y).
- **Feedback:**
  - *Benar:* "Tepat sekali! Sumbu mendatar (X) mewakili daerah asal, dan sumbu tegak (Y) mewakili daerah kawan."
  - *Salah:* "Ingat kaidah koordinat $(x, y)$: huruf pertama (asal) berada di sumbu mendatar X, dan huruf kedua (kawan) di sumbu tegak Y."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada koordinat titik $(4, 7)$, angka manakah yang mewakili anggota himpunan asal? (A. 7 | B. 4 | C. 11 | D. 28)
  - *Kunci:* B. 4 (elemen horizontal pertama).

---

### [ID: CH1-EX-22] Analisis Relasi Pertidaksamaan: Aturan "Lebih Dari"
- **Materi:** Relasi Pertidaksamaan
- **Indikator:** Siswa dapat menguji kebenaran pasangan berurutan pada relasi "lebih dari".
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  **Pernyataan:** Pasangan berurutan $(7, 5)$ dan $(7, 2)$ keduanya merupakan pasangan yang sah pada relasi beraturan **"Lebih dari"**.
- **Data/Visual yang diperlukan:** Tidak diperlukan visual grafis.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai Benar.
  Karena $7 > 5$ (7 lebih dari 5) dan $7 > 2$ (7 lebih dari 2), maka kedua pasangan tersebut memenuhi aturan relasi "lebih dari". Hal ini juga menunjukkan anggota 7 bercabang ke dua anggota kawan.
- **Feedback:**
  - *Benar:* "Tepat! 7 lebih besar dari 5 dan juga lebih besar dari 2. Keduanya sah dalam relasi 'lebih dari'."
  - *Salah:* "Uji satu per satu: apakah 7 lebih dari 5? Ya. Apakah 7 lebih dari 2? Ya. Karena keduanya benar, maka pernyataan ini Benar."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Apakah pasangan $(3, 8)$ memenuhi relasi 'lebih dari'? (A. Ya | B. Tidak)
  - *Kunci:* B. Tidak (karena 3 lebih kecil dari 8).

---

### [ID: CH1-EX-23] Mengidentifikasi Aturan Relasi dari Daftar Pasangan
- **Materi:** Menemukan Pola Relasi
- **Indikator:** Siswa dapat menyimpulkan aturan relasi yang mendasari sekumpulan pasangan berurutan.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan himpunan pasangan berurutan:
  $R = {(2, 1), (4, 2), (6, 3), (8, 4)}$.
  Aturan relasi yang menghubungkan elemen pertama ke elemen kedua adalah...
- **Data/Visual yang diperlukan:** Tabel perbandingan angka $x$ dan $y$.
- **Pilihan/Jawaban:**
  A. "Setengah dari"
  B. "Dua kali dari"
  C. "Dua lebihnya dari"
  D. "Kuadrat dari"
- **Kunci:** B. "Dua kali dari"
- **Pembahasan:**
  Perhatikan hubungan dari elemen pertama ($a$) ke elemen kedua ($b$):
  - $2 = 2 	imes 1$ (2 adalah dua kali dari 1)
  - $4 = 2 	imes 2$ (4 adalah dua kali dari 2)
  - $6 = 2 	imes 3$ (6 adalah dua kali dari 3)
  - $8 = 2 	imes 4$ (8 adalah dua kali dari 4)
  Maka aturan relasinya adalah "dua kali dari" ($a = 2b$).
  *(Catatan: Jangan terbalik dengan 'setengah dari'; 1 memang setengah dari 2, tetapi kita membaca dari kiri ke kanan: 2 adalah dua kali dari 1).*
- **Feedback:**
  - *Benar:* "Cermat! 2 adalah dua kali dari 1, 4 dua kali dari 2, dst. Kamu tidak terbalik membaca arah relasinya."
  - *Salah:* "Perhatikan arahnya dari kiri ke kanan: 2 dibanding 1, 4 dibanding 2. Angka kiri adalah DUA KALI lipat angka kanan ($a = 2b$)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada pasangan ${(3, 1), (6, 2), (9, 3)}$, aturan relasi dari elemen pertama ke kedua adalah...
  - *Pilihan:* A. Tiga kali dari | B. Sepertiga dari | C. Tiga lebihnya dari | D. Kurang dari
  - *Kunci:* A. Tiga kali dari ($3 = 3 	imes 1$).

---

### [ID: CH1-EX-24] Menentukan Pasangan Maksimal pada Relasi Sembarang
- **Materi:** Kombinatorika Relasi Dasar
- **Indikator:** Siswa dapat menganalisis banyak pasangan maksimal yang mungkin terbentuk dari dua himpunan berhingga.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Himpunan $A = {p, q, r}$ memiliki $n(A) = 3$, dan Himpunan $B = {1, 2}$ memiliki $n(B) = 2$.
  Berapakah **jumlah pasangan berurutan MAKSIMAL** yang dapat terbentuk jika seluruh anggota A dihubungkan ke seluruh anggota B?
- **Data/Visual yang diperlukan:** Diagram kisi perkalian silang Cartesius $3 	imes 2$.
- **Pilihan/Jawaban:**
  A. 5 pasangan
  B. 6 pasangan
  C. 8 pasangan
  D. 9 pasangan
- **Kunci:** B. 6 pasangan
- **Pembahasan:**
  Jumlah pasangan maksimal yang mungkin terbentuk pada relasi dari himpunan A ke B adalah perkalian jumlah anggota kedua himpunan:
  $$	ext{Maksimal Pasangan} = n(A) 	imes n(B) = 3 	imes 2 = 6	ext{ pasangan}$$
  Pasangan lengkapnya adalah: ${(p, 1), (p, 2), (q, 1), (q, 2), (r, 1), (r, 2)}$.
- **Feedback:**
  - *Benar:* "Tepat sekali! Jumlah pasangan maksimal adalah perkalian $n(A) 	imes n(B) = 3 	imes 2 = 6$."
  - *Salah:* "Pasangan maksimal diperoleh dengan mengalikan banyak anggota kedua himpunan ($n(A) 	imes n(B)$), bukan dijumlahkan!"
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $n(A) = 4$ dan $n(B) = 3$, banyak pasangan berurutan maksimal yang dapat dibentuk adalah...
  - *Pilihan:* A. 7 | B. 12 | C. 64 | D. 81
  - *Kunci:* B. 12 ($4 	imes 3 = 12$).

---

### [ID: CH1-EX-25] Menentukan Daerah Hasil (Range Relasi)
- **Materi:** Unsur Daerah Hasil Relasi
- **Indikator:** Siswa dapat menentukan himpunan daerah hasil (range) dari diagram relasi yang diberikan.
- **Bentuk Interaksi:** Menentukan anggota range (Memilih chip anggota).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan relasi dari $A = {1, 2, 3, 4}$ ke $B = {10, 20, 30, 40}$ yang dinyatakan dengan himpunan pasangan berurutan:
  $R = {(1, 10), (2, 20), (3, 20)}$.
  Pilihlah semua anggota yang termasuk ke dalam **Daerah Hasil (Range)** dari relasi tersebut!
- **Data/Visual yang diperlukan:** Chip angka pilihan yang bisa di-toggle: `[ 10 ]`, `[ 20 ]`, `[ 30 ]`, `[ 40 ]`.
- **Pilihan/Jawaban:** Memilih chip anggota range yang benar.
- **Kunci:** Pilih chip `10` dan `20`.
- **Pembahasan:**
  Daerah Hasil (Range) adalah himpunan semua elemen di himpunan kawan B yang benar-benar memiliki kawan/pasangan dari himpunan A.
  Pada pasangan $(1, 10)$, $(2, 20)$, $(3, 20)$, nilai $y$ yang muncul adalah 10 dan 20.
  Elemen 30 dan 40 tidak masuk ke dalam Range karena tidak ada panah yang mengarah ke sana.
- **Feedback:**
  - *Benar:* "Tepat! Range (daerah hasil) hanya mencakup anggota di B yang benar-benar mendapatkan pasangan panah, yaitu {10, 20}."
  - *Salah:* "Daerah hasil (Range) adalah kumpulan angka di posisi kanan yang terpilih. Angka 30 dan 40 tidak ada pasangannya, jadi jangan dipilih."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada himpunan pasangan ${(a, 1), (b, 3), (c, 1)}$, berapakah banyak anggota daerah hasilnya? (A. 1 | B. 2 | C. 3 | D. 4)
  - *Kunci:* B. 2 anggota (yaitu {1, 3}).

---

### [ID: CH1-EX-26] Validitas Relasi Kosong
- **Materi:** Himpunan Bagian Relasi
- **Indikator:** Siswa dapat menganalisis apakah dua himpunan dapat memiliki relasi yang tidak menghasilkan pasangan sama sekali (relasi kosong).
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  **Pernyataan:** Jika himpunan $A = {2, 4}$ dan himpunan $B = {3, 5}$ dihubungkan dengan aturan **"Kelipatan dari"**, tidak ada satu pun anggota A yang terhubung ke B. Hubungan ini tetap diakui secara sah dalam matematika sebagai **Relasi Kosong** ($emptyset$).
- **Data/Visual yang diperlukan:** Diagram panah tanpa ada garis penghubung sama sekali.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai Benar.
  Karena tidak ada bilangan di A yang merupakan kelipatan dari B ($2$ bukan kelipatan $3$ atau $5$; $4$ juga bukan kelipatan $3$ atau $5$), maka tidak ada garis panah yang terbentuk. Himpunan pasangan berurutannya adalah himpunan kosong $R = {}$. Dalam teori himpunan matematika, himpunan kosong adalah himpunan bagian dari $A 	imes B$, sehingga relasi kosong tetap merupakan relasi yang sah.
- **Feedback:**
  - *Benar:* "Analisis tingkat tinggi! Relasi tanpa pasangan disebut Relasi Kosong dan tetap sah secara konsep himpunan matematika."
  - *Salah:* "Pernyataan ini Benar. Meskipun tidak ada panah yang terhubung, aturan tersebut tetap sah sebagai relasi (disebut Relasi Kosong)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Himpunan yang tidak memiliki anggota pasangan relasi sama sekali disimbolkan dengan... (A. {0} | B. ∅ atau { } | C. {∞} | D. {-1})
  - *Kunci:* B. ∅ atau { }

---

### [ID: CH1-EX-27] Melengkapi Tabel Relasi
- **Materi:** Penyajian Relasi dalam Bentuk Tabel
- **Indikator:** Siswa dapat mengisi nilai pasangan yang hilang pada tabel relasi berdasarkan aturan tertentu.
- **Bentuk Interaksi:** Input Angka pada Tabel Interaktif.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah relasi dengan aturan **"Tiga lebihnya dari"** ($x = y + 3$) disajikan dalam tabel berikut. Isilah kotak kosong pada baris ketiga!
  
  | Nilai Masukan (x) | Nilai Kawan (y) |
  |:---:|:---:|
  | 5 | 2 |
  | 7 | 4 |
  | 9 | **[ ? ]** |
- **Data/Visual yang diperlukan:** Tabel interaktif dua kolom dengan input box pada baris ketiga kolom kanan.
- **Pilihan/Jawaban:** Input numerik langsung.
- **Kunci:** `6`
- **Pembahasan:**
  Aturan relasi adalah "tiga lebihnya dari", artinya nilai $x$ adalah nilai $y$ ditambah 3 ($x = y + 3 iff y = x - 3$).
  Pada baris ketiga, $x = 9$.
  Maka $y = 9 - 3 = 6$.
  Cek: 9 adalah tiga lebihnya dari 6 ($9 = 6 + 3$). Nilai yang tepat adalah 6.
- **Feedback:**
  - *Benar:* "Tepat sekali! $9 - 3 = 6$. Sel tabel relasi berhasil dilengkapi."
  - *Salah:* "Hitung kembali: $x$ tiga lebihnya dari $y$, artinya $y = x - 3$. Jika $x = 9$, maka $y = 9 - 3 = 6$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $x = 8$ pada relasi 'dua kurangnya dari' ($x = y - 2$), berapakah nilai $y$? (A. 6 | B. 10 | C. 16 | D. 4)
  - *Kunci:* B. 10 ($8 = 10 - 2$).

---

### [ID: CH1-EX-28] Matching Relasi "Setengah Dari"
- **Materi:** Relasi Pecahan / Kelipatan
- **Indikator:** Siswa dapat menjodohkan pasangan bilangan pada relasi "setengah dari".
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Jodohkan angka di Himpunan A sebelah kiri ke pasangannya di Himpunan B sebelah kanan berdasarkan aturan: **"Setengah dari"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tiga kartu angka di kiri dan empat kartu angka di kanan.
    - Kiri (A): `1`, `3`, `4`
    - Kanan (B): `2`, `6`, `8`, `12` [Pengecoh]
- **Pilihan/Jawaban:** Menghubungkan garis pencocokan antar kartu.
- **Kunci:**
  - `1` ➔ `2` ($1 = rac{1}{2} 	imes 2$)
  - `3` ➔ `6` ($3 = rac{1}{2} 	imes 6$)
  - `4` ➔ `8` ($4 = rac{1}{2} 	imes 8$)
- **Pembahasan:**
  "Setengah dari" berarti angka di kiri adalah $rac{1}{2}$ dari angka di kanan ($b = 2a$):
  - 1 adalah setengah dari 2
  - 3 adalah setengah dari 6
  - 4 adalah setengah dari 8
- **Feedback:**
  - *Benar:* "Sempurna! 1 setengah dari 2, 3 setengah dari 6, dan 4 setengah dari 8."
  - *Salah:* "Kalikan angka kiri dengan 2 untuk menemukan pasangannya di kanan: $1 	imes 2 = 2$, $3 	imes 2 = 6$, $4 	imes 2 = 8$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Angka 7 adalah setengah dari bilangan... (A. 3.5 | B. 14 | C. 21 | D. 49)
  - *Kunci:* B. 14 ($7 	imes 2 = 14$).

---

### [ID: CH1-EX-29] Deteksi Kesalahan pada Relasi "Kelipatan Dari"
- **Materi:** Deteksi Kesalahan pada Diagram Panah
- **Indikator:** Siswa dapat menemukan garis panah yang melanggar aturan kelipatan.
- **Bentuk Interaksi:** Deteksi Kesalahan (Menandai garis panah yang keliru).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Perhatikan diagram panah relasi **"Kelipatan dari"** dari $A = {6, 9}$ ke $B = {2, 3}$ di bawah ini.
  Terdapat **SATU panah yang salah arah/keliru aturan**. Temukan dan klik panah yang salah tersebut!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan diagram panah dengan 4 garis penghubung:
    1. Garis 1: `6 ➔ 2` [Benar]
    2. Garis 2: `6 ➔ 3` [Benar]
    3. Garis 3: `9 ➔ 3` [Benar]
    4. Garis 4: `9 ➔ 2` [SALAH]
    - Setiap garis dapat di-klik.
- **Pilihan/Jawaban:** Klik garis panah `9 ➔ 2`.
- **Kunci:** Garis panah dari `9 ➔ 2` adalah garis yang salah.
- **Pembahasan:**
  Bilangan 9 bukan merupakan kelipatan dari 2 karena $9$ adalah bilangan ganjil yang tidak habis dibagi 2 ($9 div 2 = 4$ sisa 1). Maka panah dari $9$ ke $2$ adalah sebuah kesalahan.
- **Feedback:**
  - *Benar:* "Pengamatan jeli! 9 adalah bilangan ganjil dan bukan kelipatan dari 2, sehingga panah tersebut keliru."
  - *Salah:* "Periksa apakah 9 bisa dibagi habis oleh 2? Tidak! $9 div 2$ ada sisa. Cari panah yang menghubungkan 9 ke 2."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Manakah bilangan yang BUKAN kelipatan dari 3? (A. 6 | B. 9 | C. 12 | D. 14)
  - *Kunci:* D. 14 (karena 14 tidak habis dibagi 3).

---

### [ID: CH1-EX-30] Evaluasi Menyeluruh: Analisis Kebenaran Relasi
- **Materi:** Evaluasi Komprehensif Karakteristik Relasi
- **Indikator:** Siswa dapat mengevaluasi argumen dan memvalidasi pernyataan konseptual relasi yang paling tepat.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Seorang siswa membuat kesimpulan: *"Jika setiap anggota himpunan kawan (B) terhubung oleh minimal satu panah, maka hubungan tersebut pasti bukan relasi melainkan operasi perkalian."*
  Bagaimanakah penilaian evaluasi yang paling tepat terhadap kesimpulan siswa tersebut?
- **Data/Visual yang diperlukan:** Tidak diperlukan visual grafis.
- **Pilihan/Jawaban:**
  A. Kesimpulan siswa SALAH, karena relasi tetap sah bagaimanapun pola panahnya, baik anggota kawan terisi semua, ada yang bercabang, maupun ada yang kosong.
  B. Kesimpulan siswa BENAR, karena himpunan kawan tidak boleh menerima panah lebih dari satu.
  C. Kesimpulan siswa BENAR, karena relasi mengharuskan himpunan kawan selalu kosong.
  D. Kesimpulan siswa SALAH, karena relasi hanya boleh menghubungkan huruf dengan angka saja.
- **Kunci:** A. Kesimpulan siswa SALAH, karena relasi tetap sah bagaimanapun pola panahnya, baik anggota kawan terisi semua, ada yang bercabang, maupun ada yang kosong.
- **Pembahasan:**
  Relasi adalah konsep matematis yang sangat umum. Mau semua anggota kawan terisi, sebagian terisi, atau bahkan tidak ada yang terisi sama sekali, selama ada aturan pengaitan antara dua himpunan, hubungan tersebut tetap sah sebagai relasi. Argumen siswa yang menyatakan bahwa hubungan tersebut "bukan relasi" adalah keliru.
- **Feedback:**
  - *Benar:* "Evaluasi brilian, Detektif! Kamu memahami bahwa relasi mencakup segala bentuk pengaitan dua himpunan tanpa batasan apakah daerah kawan penuh atau tidak."
  - *Salah:* "Pikirkan kembali definisi relasi: relasi adalah aturan pemasangan. Pola panah apa pun di himpunan kawan tetap sah sebagai relasi."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Apakah sah suatu relasi jika semua anggota daerah kawan menerima panah dari daerah asal? (A. Sah | B. Tidak sah)
  - *Kunci:* A. Sah.

---
