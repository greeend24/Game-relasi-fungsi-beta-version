# 📋 HASIL REVISI LENGKAP CHAPTER 2: PENGERTIAN & UNSUR FUNGSI
## Bank Soal Game Edukasi "Detektif Data: Relasi dan Fungsi" SMP Kelas VIII

Dokumen ini memuat revisi menyeluruh dan rekonstruksi total untuk seluruh instrumen soal pada **Chapter 2: Pengertian & Unsur Fungsi**.
- **Sasaran Pengguna:** Siswa SMP Kelas VIII (Fase D).
- **Nuansa & Bahasa:** Naratif investigasi detektif remaja (*Detektif Data*), komunikatif, lugas, dan secara matematis presisi.
- **Fokus Transformasi Interaksi:**
  1. **Diagram Panah Interaktif:** Validasi aturan ketat domain (wajib tepat satu pasangan), fleksibilitas kodomain (boleh cabang/kosong).
  2. **Deteksi Fungsi:** Menemukan dan mengeklik diagram/himpunan yang bukan fungsi (pelanggaran cabang atau elemen kosong).
  3. **Perbaiki Fungsi:** Memperbaiki relasi yang keliru (menghapus cabang atau menghubungkan elemen domain yang jomblo).
  4. **Domain, Kodomain, Range:** Aktivitas klik elemen, sortir/klasifikasi, dan penentuan daerah hasil.
  5. **Matching:** Menjodohkan konsep dan elemen Domain, Kodomain, dan Range.
  6. **Input Angka:** Menghitung ukuran Range dan rumus banyak pemetaan $n(B)^{n(A)}$.
- **Perhatian Khusus:** Seluruh Stage 11 sampai Stage 20 yang sebelumnya kosong/terpotong telah dibangun ulang 100% menjadi aktivitas pemecahan masalah aktif.
- **Kelengkapan Format:** Setiap soal memiliki 11 atribut wajib: *ID, Materi, Indikator, Bentuk Interaksi, C-Level, Soal, Data/Visual yang diperlukan Programmer, Pilihan/Jawaban, Kunci, Pembahasan, Feedback*.

---

# BAGIAN I: 21 STAGE KASUS MODE CHAPTER (ALUR BELAJAR INVESTIGASI)

---

### [ID: CH2-STAGE-01] Penugasan Kunci Loker Bukti
- **Materi:** Pengertian Fungsi & Syarat Mutlak Daerah Asal
- **Indikator:** Siswa dapat menghubungkan setiap anggota domain ke tepat satu anggota kodomain pada diagram panah interaktif.
- **Bentuk Interaksi:** Diagram Panah Interaktif.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Tiga orang detektif muda (**Budi**, **Siti**, dan **Rudi**) harus menyimpan barang bukti ke dalam lemari loker bernomor **101**, **102**, dan **103**.
  Aturan Keamanan Markas: **Setiap detektif WAJIB memiliki loker, dan HANYA BOLEH memegang TEPAT SATU kunci loker** (tidak boleh ada yang tidak memegang kunci, dan tidak boleh memegang dua kunci).
  Hubungkan setiap detektif di Himpunan A ke loker pilihannya di Himpunan B agar membentuk hubungan FUNGSI yang sah!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Himpunan Asal (Domain A): Avatar detektif `Budi`, `Siti`, `Rudi`.
    - Himpunan Kawan (Kodomain B): Lemari loker `Loker 101`, `Loker 102`, `Loker 103`.
    - Mekanik: Drag garis dari anchor detektif ke anchor loker.
    - Sistem Validasi Game: Cek apakah (1) semua 3 detektif memiliki garis keluar, dan (2) masing-masing detektif hanya memiliki 1 garis keluar.
- **Pilihan/Jawaban:** Penarikan garis panah interaktif.
- **Kunci:**
  Contoh pasangan sah yang valid:
  - `Budi ➔ Loker 101`
  - `Siti ➔ Loker 102`
  - `Rudi ➔ Loker 103`
  *(Catatan: Siswa juga sah jika menghubungkan dua detektif ke loker yang sama, asalkan setiap detektif memiliki tepat satu panah).*
- **Pembahasan:**
  Hubungan ini disebut FUNGSI karena memenuhi dua syarat mutlak fungsi pada himpunan asal (Domain):
  1. Semua anggota Domain berpasangan (tidak ada detektif yang tidak mendapat loker).
  2. Setiap anggota Domain dipasangkan dengan tepat satu anggota Kodomain (tidak ada detektif yang memegang lebih dari satu loker).
- **Feedback:**
  - *Benar:* "Hebat, Detektif! Semua anggota domain telah berpasangan tepat satu. Aturan fungsi terpenuhi sempurna!"
  - *Salah:* "Cek kembali aturan fungsi: pastikan semua detektif memiliki pasangan (tidak boleh kosong) dan masing-masing hanya menarik satu panah (tidak boleh bercabang)."

---

### [ID: CH2-STAGE-02] Scanner Mesin Alibi: Deteksi Diagram Bukan Fungsi
- **Materi:** Uji Syarat Fungsi (Pelanggaran Percabangan Domain)
- **Indikator:** Siswa dapat mendeteksi diagram panah yang bukan fungsi karena terdapat anggota domain yang bercabang.
- **Bentuk Interaksi:** Deteksi Fungsi (Memilih diagram yang bukan fungsi).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Mesin Scanner Detektif Data sedang memverifikasi tiga laporan alibi kehadiran saksi di ruangan sekolah. Sebuah laporan dinyatakan **TIDAK VALID (BUKAN FUNGSI)** jika ada saksi yang tercatat berada di dua ruangan berbeda pada jam yang sama!
  Analisis ketiga diagram panah di bawah ini, lalu **KLIK DIAGRAM YANG BUKAN MERUPAKAN FUNGSI**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan 3 panel diagram panah berdampingan yang dapat diklik:
    - **Panel 1 (Diagram Alpha):**
      - Domain: {Ali, Beni, Cici}, Kodomain: {Lab, Kantin, Kelas}
      - Pasangan: `Ali ➔ Lab`, `Beni ➔ Lab`, `Cici ➔ Kelas` (Fungsi Sah).
    - **Panel 2 (Diagram Beta):** [DIAGRAM TARGET BUKAN FUNGSI]
      - Domain: {Ali, Beni, Cici}, Kodomain: {Lab, Kantin, Kelas}
      - Pasangan: `Ali ➔ Lab`, `Ali ➔ Kantin` (Ali bercabang dua!), `Beni ➔ Kelas`, `Cici ➔ Kelas`.
    - **Panel 3 (Diagram Gamma):**
      - Domain: {Ali, Beni, Cici}, Kodomain: {Lab, Kantin, Kelas}
      - Pasangan: `Ali ➔ Kelas`, `Beni ➔ Kelas`, `Cici ➔ Kelas` (Fungsi Konstan Sah).
- **Pilihan/Jawaban:** Klik kartu **Diagram Beta**.
- **Kunci:** Diagram Beta adalah BUKAN fungsi.
- **Pembahasan:**
  Pada Diagram Beta, saksi **Ali** memiliki dua panah sekaligus (bercabang ke *Lab* dan *Kantin*). Dalam matematika, anggota domain pada fungsi TIDAK BOLEH bercabang (harus dipasangkan tepat satu). Maka Diagram Beta gugur dan bukan fungsi.
- **Feedback:**
  - *Benar:* "Tepat sekali, Detektif! Ali tercatat berada di Lab dan Kantin sekaligus (bercabang dua). Ini melanggar syarat fungsi!"
  - *Salah:* "Perhatikan tanda panah yang keluar dari himpunan kiri: cari diagram di mana ada satu orang yang memiliki DUA tanda panah keluar."

---

### [ID: CH2-STAGE-03] Rekonstruksi Sensor Alibi: Perbaiki Fungsi Kosong
- **Materi:** Memperbaiki Hubungan Menjadi Fungsi (Mengatasi Elemen Kosong)
- **Indikator:** Siswa dapat memperbaiki diagram relasi yang belum memenuhi fungsi dengan menghubungkan anggota domain yang belum berpasangan.
- **Bentuk Interaksi:** Perbaiki Fungsi.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sebuah sensor pelacak sedang macet! Pada diagram di bawah, saksi **Fani** belum terdata alibinya sama sekali, sehingga sistem menolak laporan ini sebagai fungsi.
  **Perbaikilah diagram ini agar menjadi FUNGSI YANG SAH** dengan menarik satu garis panah dari Fani ke salah satu pos pengamatan di Himpunan B!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Himpunan Asal: `Dani`, `Eka`, `Fani`.
    - Himpunan Kawan: `Pos 1`, `Pos 2`.
    - Kondisi Awal: `Dani ➔ Pos 1` (aktif), `Eka ➔ Pos 2` (aktif), `Fani` (belum ada panah, berkedip kuning tanda peringatan).
    - Mekanik: Siswa mengeklik node Fani dan menarik garis ke `Pos 1` atau `Pos 2`.
- **Pilihan/Jawaban:** Menarik satu garis panah dari Fani ke Pos 1 atau Pos 2.
- **Kunci:** Menghubungkan `Fani ➔ Pos 1` ATAU `Fani ➔ Pos 2`.
- **Pembahasan:**
  Agar suatu relasi sah menjadi fungsi, SEMUA anggota himpunan asal (domain) wajib memiliki pasangan (tidak boleh ada yang kosong). Dengan menghubungkan Fani ke salah satu pos pengamatan, seluruh anggota domain terpasang tepat satu, sehingga relasi resmi menjadi fungsi.
- **Feedback:**
  - *Benar:* "Sistem aktif! Fani kini telah memiliki alibi tepat satu pos. Laporan resmi sah sebagai fungsi!"
  - *Salah:* "Fani masih belum memiliki pasangan. Tarik garis dari Fani menuju salah satu pos di sebelah kanan!"

---

### [ID: CH2-STAGE-04] Rute Bus Sekolah: Output Bersama (Many-to-One)
- **Materi:** Konsep Pemetaan Banyak ke Satu (Many-to-One)
- **Indikator:** Siswa dapat membuktikan bahwa fungsi memperbolehkan beberapa anggota domain memiliki kawan yang sama di kodomain.
- **Bentuk Interaksi:** Diagram Panah Interaktif.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Tiga orang siswa: **Dina**, **Edo**, dan **Fahri** menaiki bus sekolah yang sama dan turun bersama-sama di **Halte Mawar**.
  Hubungkan ketiga siswa di Himpunan A ke halte tujuannya di Himpunan B! Apakah hubungan ini sah sebagai FUNGSI?
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Himpunan Asal: `Dina`, `Edo`, `Fahri`.
    - Himpunan Kawan: `Halte Mawar`, `Halte Melati`, `Halte Kenanga`.
    - Siswa menghubungkan ketiga siswa ke `Halte Mawar`.
- **Pilihan/Jawaban:** Hubungkan `Dina ➔ Halte Mawar`, `Edo ➔ Halte Mawar`, dan `Fahri ➔ Halte Mawar`.
- **Kunci:**
  - `Dina ➔ Halte Mawar`
  - `Edo ➔ Halte Mawar`
  - `Fahri ➔ Halte Mawar`
  (Hubungan ini adalah FUNGSI SAH).
- **Pembahasan:**
  Meskipun ketiga panah mengumpul ke satu tujuan yang sama (*Halte Mawar*), hubungan ini TETAP MERUPAKAN FUNGSI yang sah. Syarat fungsi hanya mengatur daerah asal (himpunan A): setiap siswa memiliki tepat satu halte tujuan. Himpunan kawan (B) bebas menerima panah lebih dari satu.
- **Feedback:**
  - *Benar:* "Tepat sekali! Fungsi membolehkan banyak anak menuju satu halte yang sama. Yang penting, tidak ada anak yang naik dua bus sekaligus!"
  - *Salah:* "Tarik panah dari Dina, Edo, dan Fahri semuanya mengarah ke Halte Mawar."

---

### [ID: CH2-STAGE-05] Audit Berkas Tersangka: Deteksi Elemen Asal Jomblo
- **Materi:** Syarat Keharusan Pasangan pada Domain
- **Indikator:** Siswa dapat mendeteksi diagram yang bukan fungsi karena terdapat anggota domain yang tidak memiliki pasangan.
- **Bentuk Interaksi:** Deteksi Fungsi.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Detektif Data menerima 3 berkas kartu investigasi. Temukan **SATU BERKAS YANG BUKAN MERUPAKAN FUNGSI** karena ada anggota daerah asal yang diabaikan (tidak memiliki pasangan)!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan 3 kartu diagram panah:
    - **Kartu A:** Domain {1, 2, 3} ➔ Kodomain {x, y}. Pasangan: `1 ➔ x`, `2 ➔ y`, `3 ➔ y` (Fungsi).
    - **Kartu B:** Domain {1, 2, 3} ➔ Kodomain {x, y}. Pasangan: `1 ➔ x`, `2 ➔ y` (Angka 3 kosong tanpa panah!) [BUKAN FUNGSI].
    - **Kartu C:** Domain {1, 2, 3} ➔ Kodomain {x, y}. Pasangan: `1 ➔ x`, `2 ➔ x`, `3 ➔ x` (Fungsi).
- **Pilihan/Jawaban:** Klik **Kartu B**.
- **Kunci:** Kartu B adalah bukan fungsi.
- **Pembahasan:**
  Pada Kartu B, angka 3 pada himpunan asal tidak memiliki pasangan sama sekali. Hal ini melanggar syarat mutlak pertama fungsi: *setiap anggota himpunan asal harus memiliki pasangan*.
- **Feedback:**
  - *Benar:* "Jeli sekali, Detektif! Pada Kartu B, angka 3 tidak dipasangkan ke mana pun, sehingga relasi tersebut gagal menjadi fungsi."
  - *Salah:* "Cek anggota himpunan sebelah kiri {1, 2, 3}: pada kartu manakah ada angka yang sama sekali tidak memiliki panah keluar?"

---

### [ID: CH2-STAGE-06] Menghapus Alibi Ganda: Perbaiki Fungsi Bercabang
- **Materi:** Memperbaiki Hubungan Menjadi Fungsi (Mengeliminasi Cabang)
- **Indikator:** Siswa dapat memperbaiki relasi yang bukan fungsi dengan menghapus garis panah yang membuat anggota domain bercabang.
- **Bentuk Interaksi:** Perbaiki Fungsi (Memilih dan memutus kabel/garis yang salah).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Tersangka **Doni** memberikan keterangan palsu! Pada diagram alibi di bawah, Doni terhubung ke dua tempat sekaligus: **Warnet** dan **Perpustakaan**.
  Detektif membuktikan bahwa Doni sebenarnya berada di **Perpustakaan**. **Hapuslah SATU garis panah yang salah** agar diagram relasi ini menjadi FUNGSI YANG SAH!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Himpunan A: `Doni`, `Rian`.
    - Himpunan B: `Warnet`, `Perpustakaan`.
    - Garis aktif:
      1. `Doni ➔ Warnet` (Garis palsu / penyebab bercabang) <-- [KLIK UNTUK HAPUS]
      2. `Doni ➔ Perpustakaan` (Garis valid)
      3. `Rian ➔ Warnet` (Garis valid)
    - Kursor berubah menjadi ikon gunting saat diarahkan ke garis.
- **Pilihan/Jawaban:** Klik garis panah dari `Doni ➔ Warnet` untuk memutusnya.
- **Kunci:** Menghapus garis `Doni ➔ Warnet`.
- **Pembahasan:**
  Sebelum garis diputus, Doni memiliki dua panah (bercabang), sehingga bukan fungsi. Setelah garis `Doni ➔ Warnet` dihapus, Doni hanya memiliki tepat satu pasangan (`Doni ➔ Perpustakaan`) dan Rian memiliki tepat satu pasangan (`Rian ➔ Warnet`). Relasi kini sah menjadi fungsi.
- **Feedback:**
  - *Benar:* "Garis alibi palsu berhasil diputus! Sekarang setiap tersangka memiliki tepat satu lokasi, diagram sah menjadi fungsi."
  - *Salah:* "Sesuai bukti, Doni berada di Perpustakaan. Jadi garis Doni ke Warnet adalah garis palsu yang harus diputus!"

---

### [ID: CH2-STAGE-07] Pembagian Rompi Detektif: Kodomain Menyisakan Elemen
- **Materi:** Sifat Kodomain pada Fungsi
- **Indikator:** Siswa dapat membuktikan bahwa anggota kodomain boleh tidak memiliki pasangan pada fungsi.
- **Bentuk Interaksi:** Diagram Panah Interaktif.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Ada 3 siswa anggota tim detektif: **Andi**, **Budi**, dan **Cici**. Di lemari perlengkapan tersedia 5 buah rompi bernomor **1, 2, 3, 4, 5**.
  - Andi memakai Rompi 1.
  - Budi memakai Rompi 2.
  - Cici memakai Rompi 3.
  Hubungkan siswa ke nomor rompinya. Apakah sah sebagai fungsi meskipun Rompi 4 dan 5 menganggur?
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Oval Siswa (A): `Andi`, `Budi`, `Cici`.
    - Oval Rompi (B): `Rompi 1`, `Rompi 2`, `Rompi 3`, `Rompi 4`, `Rompi 5`.
    - Siswa menghubungkan garis dari A ke B.
- **Pilihan/Jawaban:** Tarik panah sesuai pembagian rompi.
- **Kunci:**
  - `Andi ➔ Rompi 1`
  - `Budi ➔ Rompi 2`
  - `Cici ➔ Rompi 3`
  - (Rompi 4 dan Rompi 5 dibiarkan kosong tanpa panah).
- **Pembahasan:**
  Relasi ini SAH SEBAGAI FUNGSI. Syarat fungsi hanya mengharuskan anggota himpunan asal (siswa) memiliki tepat satu pasangan. Anggota himpunan kawan (rompi nomor 4 dan 5) yang tidak terpilih sama sekali tidak membatalkan keabsahan fungsi.
- **Feedback:**
  - *Benar:* "Sempurna! Rompi 4 dan 5 boleh menganggur di lemari kawan. Yang utama, semua detektif memakai tepat 1 rompi!"
  - *Salah:* "Hubungkan Andi ke Rompi 1, Budi ke Rompi 2, dan Cici ke Rompi 3. Jangan pasangkan Rompi 4 dan 5 ya!"

---

### [ID: CH2-STAGE-08] Radar Panggilan Rahasia: Klik Anggota Domain
- **Materi:** Unsur Fungsi: Daerah Asal (Domain)
- **Indikator:** Siswa dapat mengidentifikasi dan memilih seluruh anggota daerah asal (domain) dari suatu diagram fungsi.
- **Bentuk Interaksi:** Klik Anggota Domain (Interactive Node Selection).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sebuah pemancar radar menyadap log panggilan telepon dari Agen Lapangan di Himpunan A ke Pos Komando di Himpunan B.
  Detektif Data perlu mengisolasi seluruh **DAERAH ASAL (DOMAIN)** panggilan. **Klik SEMUA anggota yang termasuk dalam himpunan Domain**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Diagram Panah dengan dua kurva:
      - Kurva Kiri bertuliskan *Himpunan Agen (A)* berisi node: `Agen 01`, `Agen 02`, `Agen 03`.
      - Kurva Kanan bertuliskan *Pos Komando (B)* berisi node: `Pos Alpha`, `Pos Bravo`.
      - Panah: `Agen 01 ➔ Pos Alpha`, `Agen 02 ➔ Pos Alpha`, `Agen 03 ➔ Pos Bravo`.
    - Setiap node nama agen dan pos dapat diklik dan menyala hijau saat dipilih.
- **Pilihan/Jawaban:** Siswa mengeklik node pada diagram.
- **Kunci:** Klik node: `Agen 01`, `Agen 02`, dan `Agen 03` (seluruh anggota Himpunan A).
- **Pembahasan:**
  Domain (Daerah Asal) adalah seluruh himpunan awal tempat relasi/fungsi itu bermula. Pada diagram fungsi $f: A 	o B$, maka Domain adalah seluruh anggota himpunan $A = \{	ext{Agen 01}, 	ext{Agen 02}, 	ext{Agen 03}\}$.
- **Feedback:**
  - *Benar:* "Tepat! Domain adalah seluruh elemen himpunan awal di sisi kiri: {Agen 01, Agen 02, Agen 03}."
  - *Salah:* "Domain berada di kurva sebelah kiri (himpunan asal). Pastikan kamu mengeklik seluruh agen di Himpunan A!"

---

### [ID: CH2-STAGE-09] Pemindaian Wilayah Target: Klik Anggota Kodomain
- **Materi:** Unsur Fungsi: Daerah Kawan (Kodomain)
- **Indikator:** Siswa dapat mengidentifikasi dan memilih seluruh anggota daerah kawan (kodomain) tanpa terkecoh oleh elemen yang tidak menerima panah.
- **Bentuk Interaksi:** Klik Anggota Kodomain.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Perhatikan peta operasi pengawasan:
  - Domain $P = \{	ext{Drone 1}, 	ext{Drone 2}\}$
  - Himpunan Sektor Tujuan $Q = \{	ext{Sektor A}, 	ext{Sektor B}, 	ext{Sektor C}, 	ext{Sektor D}\}$
  Drone 1 mengawasi Sektor A, dan Drone 2 mengawasi Sektor B. Sektor C dan D saat ini kosong.
  Tugas: **Klik SEMUA anggota yang merupakan DAERAH KAWAN (KODOMAIN)**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Diagram panah kurva P ke Q. Node di kurva Q dapat diklik.
- **Pilihan/Jawaban:** Siswa mengeklik anggota pada himpunan tujuan Q.
- **Kunci:** Klik: `Sektor A`, `Sektor B`, `Sektor C`, dan `Sektor D` (seluruh anggota himpunan Q).
- **Pembahasan:**
  Kodomain (Daerah Kawan) adalah **SELURUH** anggota himpunan tujuan (himpunan kedua), baik yang mendapat pasangan panah maupun yang tidak mendapat pasangan. Jadi, Kodomain adalah $\{	ext{Sektor A}, 	ext{Sektor B}, 	ext{Sektor C}, 	ext{Sektor D}\}$.
- **Feedback:**
  - *Benar:* "Luar biasa! Kamu tidak terkecoh: Kodomain mencakup SELURUH anggota himpunan kawan di sebelah kanan, termasuk yang kosong!"
  - *Salah:* "Ingat, Kodomain adalah SELURUH anggota di himpunan tujuan kanan, bukan hanya yang terkena panah. Klik keempat sektor di Himpunan Q."

---

### [ID: CH2-STAGE-10] Penemuan Jejak Nyata: Klik Anggota Range (Daerah Hasil)
- **Materi:** Unsur Fungsi: Daerah Hasil (Range)
- **Indikator:** Siswa dapat membedakan Range dari Kodomain dengan hanya memilih elemen yang benar-benar menerima panah.
- **Bentuk Interaksi:** Klik Anggota Range.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Dari 4 tersangka yang diinterogasi, hasil tes alibi menunjukkan:
  - Domain tersangka: $A = \{T_1, T_2, T_3, T_4\}$
  - Kodomain pilihan lokasi: $B = \{10, 20, 30, 40, 50\}$
  Panah yang terhubung:
  $T_1 	o 10$, $T_2 	o 20$, $T_3 	o 20$, $T_4 	o 40$.
  Tugas Detektif: **Klik HANYA angka yang termasuk dalam DAERAH HASIL (RANGE)**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Diagram panah interaktif. Angka pada kurva B (`10`, `20`, `30`, `40`, `50`) dapat diklik.
- **Pilihan/Jawaban:** Klik anggota himpunan kawan yang menerima panah.
- **Kunci:** Klik angka: `10`, `20`, dan `40` saja! (Angka `30` dan `50` tidak boleh diklik).
- **Pembahasan:**
  Range (Daerah Hasil) adalah himpunan bagian dari kodomain yang **benar-benar memiliki pasangan** dari daerah asal.
  - 10 menerima panah dari $T_1$
  - 20 menerima panah dari $T_2$ dan $T_3$
  - 40 menerima panah dari $T_4$
  Angka 30 dan 50 tidak menerima panah, sehingga hanya merupakan anggota Kodomain tetapi BUKAN anggota Range. Range $= \{10, 20, 40\}$.
- **Feedback:**
  - *Benar:* "Detektif ulung! Range hanyalah target yang benar-benar terkena anak panah: {10, 20, 40}. Angka 30 dan 50 berhasil kamu saring!"
  - *Salah:* "Perhatikan ujung mata panah: hanya klik angka yang ditunjuk oleh panah! Angka 30 dan 50 tidak ditunjuk panah, jadi bukan anggota Range."

---

### [ID: CH2-STAGE-11] Pencocokan Berkas Lab: Domain, Kodomain, & Range
- **Materi:** Perbedaan Domain, Kodomain, dan Range
- **Indikator:** Siswa dapat menjodohkan konsep unsur fungsi dengan anggota himpunannya secara tepat.
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan sebuah fungsi yang disajikan dengan diagram panah:
  - Himpunan kiri: $A = \{1, 2, 3\}$
  - Himpunan kanan: $B = \{a, b, c, d\}$
  - Pasangan panah: $1 	o a$, $2 	o b$, $3 	o b$
  Jodohkan istilah unsur fungsi di sebelah kiri dengan himpunan anggotanya yang tepat di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kartu Istilah Kiri: `Domain (Daerah Asal)`, `Kodomain (Daerah Kawan)`, `Range (Daerah Hasil)`.
    - Kartu Himpunan Kanan: `{1, 2, 3}`, `{a, b, c, d}`, `{a, b}`, `{c, d}` [Pengecoh].
- **Pilihan/Jawaban:** Menarik garis jodoh antar kartu.
- **Kunci:**
  - `Domain (Daerah Asal)` ➔ `{1, 2, 3}`
  - `Kodomain (Daerah Kawan)` ➔ `{a, b, c, d}`
  - `Range (Daerah Hasil)` ➔ `{a, b}`
- **Pembahasan:**
  - Domain = semua anggota himpunan mula-mula kiri $= \{1, 2, 3\}$.
  - Kodomain = semua anggota himpunan tujuan kanan $= \{a, b, c, d\}$.
  - Range = anggota himpunan kanan yang menerima panah $= \{a, b\}$.
- **Feedback:**
  - *Benar:* "Sempurna! Kamu menguasai perbedaan esensial antara Domain, Kodomain, dan Range dengan sangat baik."
  - *Salah:* "Ingat: Domain adalah semua yang di kiri {1, 2, 3}, Kodomain semua yang di kanan {a, b, c, d}, dan Range hanya yang terkena panah {a, b}."

---

### [ID: CH2-STAGE-12] Penyusup dalam Laporan: Deteksi Elemen Range Palsu
- **Materi:** Deteksi Kesalahan Identifikasi Range
- **Indikator:** Siswa dapat mendeteksi elemen kodomain yang keliru dicatat sebagai anggota daerah hasil.
- **Bentuk Interaksi:** Deteksi Kesalahan.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Seorang asisten detektif magang menyusun laporan dari diagram panah fungsi:
  - Domain: $X = \{p, q, r\}$
  - Kodomain: $Y = \{2, 4, 6, 8\}$
  - Pasangan: $p 	o 2$, $q 	o 4$, $r 	o 4$.
  Di laporan tertulis: *"Daerah Hasil (Range) = {2, 4, 8}"*.
  Terdapat **SATU ANGKA PENYUSUP** pada catatan Range tersebut yang seharusnya TIDAK MASUK ke dalam Range. Klik angka penyusup tersebut!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan teks laporan di layar dengan angka dalam kurung kurawal yang bisa diklik:
    `Range = { ` `[ 2 ]` `, ` `[ 4 ]` `, ` `[ 8 ]` ` }`
- **Pilihan/Jawaban:** Klik angka `8`.
- **Kunci:** Angka `8` adalah elemen yang salah/penyusup.
- **Pembahasan:**
  Berdasarkan pasangan panah yang terbentuk ($p 	o 2$, $q 	o 4$, $r 	o 4$), anggota himpunan kawan yang terkena panah hanyalah $2$ dan $4$. Angka $8$ tidak menerima panah sama sekali dari himpunan $X$, sehingga angka 8 bukan anggota Range (hanya anggota Kodomain). Range yang benar adalah $\{2, 4\}$.
- **Feedback:**
  - *Benar:* "Audit tajam, Detektif! Angka 8 tidak pernah menerima panah, jadi tidak berhak masuk ke dalam Range!"
  - *Salah:* "Lihat kembali pasangan panahnya: adakah anggota X yang mengarah ke angka 8? Tidak ada! Berarti angka 8 adalah penyusup."

---

### [ID: CH2-STAGE-13] Klasifikasi Kartu Bukti: Range vs Bukan Range
- **Materi:** Pengelompokan Anggota Kodomain
- **Indikator:** Siswa dapat menyortir anggota kodomain ke dalam kategori Range atau Bukan Range.
- **Bentuk Interaksi:** Drag & Drop Kategori.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan relasi fungsi dari himpunan siswa $S = \{	ext{Ali}, 	ext{Beni}, 	ext{Candra}\}$ ke himpunan ekstrakurikuler $E = \{	ext{PMR}, 	ext{Pramuka}, 	ext{Basket}, 	ext{Robotik}\}$.
  Data pilihan siswa:
  - Ali memilih **Robotik**
  - Beni memilih **PMR**
  - Candra memilih **Robotik**
  Pisahkan kartu-kartu ekstrakurikuler berikut ke dalam dua kotak arsip: **"Daerah Hasil (Range)"** atau **"Bukan Daerah Hasil (Hanya Kodomain)"**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kotak Hijau: `Daerah Hasil (Range)`
    - Kotak Abu-abu: `Hanya Kodomain (Bukan Range)`
    - Kartu yang diseret: `PMR`, `Pramuka`, `Basket`, `Robotik`.
- **Pilihan/Jawaban:** Drag & drop kartu ke kotak yang sesuai.
- **Kunci:**
  - Kotak `Daerah Hasil (Range)`: `PMR`, `Robotik`
  - Kotak `Hanya Kodomain`: `Pramuka`, `Basket`
- **Pembahasan:**
  Hanya ekstrakurikuler yang benar-benar dipilih oleh siswa (PMR dan Robotik) yang menjadi anggota Range. Ekstrakurikuler yang tidak ada peminatnya (Pramuka dan Basket) tetap berada di Kodomain namun bukan anggota Range.
- **Feedback:**
  - *Benar:* "Klasifikasi tuntas! PMR dan Robotik masuk ke Range karena dipilih oleh siswa, sedangkan Pramuka dan Basket tidak terpilih."
  - *Salah:* "Cek siapa yang memilih: Ali dan Candra memilih Robotik, Beni memilih PMR. Pramuka dan Basket tidak dipilih siapapun."

---

### [ID: CH2-STAGE-14] Menghitung Luas Jangkauan Sinyal: Banyak Anggota Range
- **Materi:** Kardinalitas Daerah Hasil $n(	ext{Range})$
- **Indikator:** Siswa dapat menghitung banyaknya anggota daerah hasil dari suatu fungsi.
- **Bentuk Interaksi:** Input Angka.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sebuah jaringan komunikasi memetakan 5 pos pengawas $A = \{P_1, P_2, P_3, P_4, P_5\}$ ke 4 menara radio $B = \{M_1, M_2, M_3, M_4\}$.
  Hasil koneksi:
  - $P_1 	o M_2$
  - $P_2 	o M_2$
  - $P_3 	o M_4$
  - $P_4 	o M_2$
  - $P_5 	o M_4$
  Berapakah **BANYAK ANGGOTA DAERAH HASIL** (nilai dari $n(	ext{Range})$) dari jaringan fungsi tersebut? Ketikkan angka hasil hitunganmu!
- **Data/Visual yang diperlukan:** Kotak input angka numerik dengan tampilan keypad mini gembok.
- **Pilihan/Jawaban:** Input angka bulat.
- **Kunci:** `2`
- **Pembahasan:**
  Mari kita daftarkan menara radio di himpunan $B$ yang menerima sinyal panah:
  - $M_2$ menerima sinyal dari $P_1, P_2, P_4$.
  - $M_4$ menerima sinyal dari $P_3, P_5$.
  - $M_1$ dan $M_3$ tidak menerima sinyal sama sekali.
  Maka daerah hasilnya adalah $	ext{Range} = \{M_2, M_4\}$.
  Banyak anggota daerah hasil adalah $n(	ext{Range}) = 2$.
- **Feedback:**
  - *Benar:* "Tepat sekali! Menara yang aktif menerima sinyal hanya ada 2 menara ($M_2$ dan $M_4$), sehingga $n(	ext{Range}) = 2$."
  - *Salah:* "Hitung berapa banyak menara di himpunan B yang terhubung oleh panah. Hanya ada menara $M_2$ dan $M_4$. Jadi banyaknya adalah 2."

---

### [ID: CH2-STAGE-15] Investigasi Cyber Crime: Uji Himpunan Pasangan Berurutan
- **Materi:** Syarat Fungsi pada Pasangan Berurutan
- **Indikator:** Siswa dapat menganalisis dan memilih himpunan pasangan berurutan yang merupakan fungsi.
- **Bentuk Interaksi:** Deteksi Fungsi (Pilihan Kartu).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Tim forensik digital menyita 4 rekaman transmisi data dari domain $X = \{1, 2, 3\}$ ke kodomain $Y = \{a, b, c\}$.
  Satu rekaman terbukti merupakan **FUNGSI YANG SAH DAN SEMPURNA**. Manakah rekaman tersebut?
- **Data/Visual yang diperlukan:** 4 map arsip digital bertuliskan daftar koordinat pasangan berurutan.
- **Pilihan/Jawaban:**
  A. $R_1 = \{(1, a), (2, b)\}$
  B. $R_2 = \{(1, a), (2, b), (2, c), (3, a)\}$
  C. $R_3 = \{(1, b), (2, b), (3, b)\}$
  D. $R_4 = \{(1, a), (3, c)\}$
- **Kunci:** C. $R_3 = \{(1, b), (2, b), (3, b)\}$
- **Pembahasan:**
  Mari kita evaluasi elemen pertama (Domain $\{1, 2, 3\}$):
  - $R_1$ bukan fungsi karena angka 3 tidak punya pasangan (kurang lengkap).
  - $R_2$ bukan fungsi karena angka 2 muncul dua kali dengan pasangan berbeda $(2, b)$ dan $(2, c)$ (bercabang).
  - $R_3$ adalah **FUNGSI SAH**, karena setiap angka $\{1, 2, 3\}$ muncul tepat satu kali sebagai elemen pertama. Memiliki nilai output sama $(b)$ diperbolehkan dalam fungsi!
  - $R_4$ bukan fungsi karena angka 2 tidak punya pasangan.
- **Feedback:**
  - *Benar:* "Analisis tingkat tinggi! Pada $R_3$, semua elemen {1, 2, 3} muncul tepat 1 kali. Output yang sama ke huruf b sah sebagai fungsi!"
  - *Salah:* "Kunci memeriksa fungsi pada pasangan berurutan: lihat angka di posisi depan $(x, y)$. Angka 1, 2, dan 3 harus muncul semuanya dan TIDAK BOLEH berulang."

---

### [ID: CH2-STAGE-16] Rekonstruksi Koordinat Saksi: Mengganti Pasangan Bercabang
- **Materi:** Perbaikan Pasangan Berurutan agar Membentuk Fungsi
- **Indikator:** Siswa dapat memodifikasi satu pasangan berurutan yang membuat fungsi tidak sah karena elemen domain bercabang.
- **Bentuk Interaksi:** Perbaiki Fungsi (Dropdown / Ganti Elemen).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Diberikan himpunan saksi $S = \{A, B, C\}$ dan himpunan ruang $R = \{1, 2, 3\}$.
  Asisten detektif mencatat himpunan alibi:
  $$\{(A, 1), (B, 2), (A, 3)\}$$
  Catatan di atas **BUKAN FUNGSI** karena saksi $A$ bercabang dan saksi $C$ belum memiliki pasangan.
  Bagaimanakah cara memperbaiki pasangan $(A, 3)$ agar himpunan tersebut menjadi **FUNGSI YANG SAH**?
- **Data/Visual yang diperlukan:** Antarmuka pengeditan kartu koordinat dengan pilihan penggantian elemen.
- **Pilihan/Jawaban:**
  A. Mengubah pasangan $(A, 3)$ menjadi $(B, 3)$
  B. Mengubah pasangan $(A, 3)$ menjadi $(C, 3)$
  C. Menghapus pasangan $(B, 2)$
  D. Mengubah pasangan $(A, 1)$ menjadi $(A, 2)$
- **Kunci:** B. Mengubah pasangan $(A, 3)$ menjadi $(C, 3)$
- **Pembahasan:**
  Pada pasangan mula-mula, elemen pertama adalah $A, B, A$. Saksi $A$ muncul dua kali (bercabang), sedangkan saksi $C$ belum muncul sama sekali. Jika pasangan $(A, 3)$ diubah menjadi $(C, 3)$, maka elemen pertamanya menjadi $A, B, C$. Setiap anggota domain kini muncul tepat satu kali, sehingga menjadi fungsi yang sah: $\{(A, 1), (B, 2), (C, 3)\}$.
- **Feedback:**
  - *Benar:* "Cemerlang! Dengan mengubah $(A, 3)$ menjadi $(C, 3)$, cabang pada saksi A hilang dan saksi C mendapatkan alibi."
  - *Salah:* "Saksi C belum memiliki pasangan di daerah asal. Ganti huruf A pada pasangan $(A, 3)$ dengan huruf C."

---

### [ID: CH2-STAGE-17] Operasi Pemetaan Penuh: Syarat Range = Kodomain
- **Materi:** Fungsi Surjektif (Kondisi Range Sama dengan Kodomain)
- **Indikator:** Siswa dapat membentuk fungsi di mana seluruh anggota kodomain menerima pasangan panah (Range = Kodomain).
- **Bentuk Interaksi:** Diagram Panah Interaktif.
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Misi Khusus: Hubungkan anggota domain $A = \{1, 2, 3, 4\}$ ke kodomain $B = \{x, y\}$ dengan syarat:
  1. Hubungan WAJIB merupakan FUNGSI yang sah.
  2. **SELURUH anggota di B harus menerima panah** (Daerah Hasil / Range harus sama persis dengan Kodomain: $	ext{Range} = \{x, y\}$).
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Himpunan A: `1`, `2`, `3`, `4`.
    - Himpunan B: `x`, `y`.
    - Sistem memvalidasi: (1) Semua node A punya 1 panah, (2) Kedua node di B (x dan y) minimal menerima 1 panah.
- **Pilihan/Jawaban:** Penarikan garis panah interaktif.
- **Kunci:**
  Contoh kombinasi sah yang valid:
  - `1 ➔ x`, `2 ➔ x`, `3 ➔ x`, `4 ➔ y` (atau kombinasi lain asalkan $x$ dan $y$ keduanya terkena panah dan 1, 2, 3, 4 masing-masing memiliki tepat 1 panah).
- **Pembahasan:**
  Agar relasi sah menjadi fungsi, keempat anggota domain $\{1, 2, 3, 4\}$ masing-masing harus menarik tepat satu panah. Agar Range = Kodomain, kedua elemen $\{x, y\}$ tidak boleh ada yang menganggur; minimal satu elemen domain terhubung ke $x$ dan minimal satu elemen domain terhubung ke $y$.
- **Feedback:**
  - *Benar:* "Hebat! Keempat elemen domain memiliki tepat 1 pasangan, dan seluruh anggota kodomain {x, y} berhasil terisi penuh!"
  - *Salah:* "Periksa kembali: apakah x dan y KEDUANYA menerima panah? Jangan sampai salah satu huruf di sebelah kanan kosong ya!"

---

### [ID: CH2-STAGE-18] Menghitung Seluruh Kemungkinan Sandi: Rumus Pemetaan $n(B)^{n(A)}$
- **Materi:** Menghitung Banyaknya Pemetaan (Fungsi) yang Mungkin
- **Indikator:** Siswa dapat menghitung banyaknya pemetaan dari himpunan A ke himpunan B menggunakan rumus $n(B)^{n(A)}$.
- **Bentuk Interaksi:** Input Angka.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Sebuah brankas rahasia menggunakan kombinasi fungsi pemetaan dari Himpunan Huruf $A = \{P, Q, R\}$ ke Himpunan Angka Kunci $B = \{1, 2\}$.
  Berapakah **BANYAKNYA FUNGSI (PEMETAAN) YANG MUNGKIN DIBUAT** dari himpunan A ke himpunan B?
  Gunakan rumus:
  $$	ext{Banyak Pemetaan} = [n(B)]^{n(A)}$$
  Ketikkan jumlah total kemungkinan pemetaan tersebut!
- **Data/Visual yang diperlukan:** Ilustrasi brankas kombinasi kode dengan layar input numerik.
- **Pilihan/Jawaban:** Input angka numerik langsung.
- **Kunci:** `8`
- **Pembahasan:**
  - Diketahui jumlah anggota himpunan asal $n(A) = 3$ (yaitu $P, Q, R$).
  - Diketahui jumlah anggota himpunan tujuan $n(B) = 2$ (yaitu $1, 2$).
  - Rumus banyaknya pemetaan dari himpunan A ke B adalah:
    $$	ext{Banyak Pemetaan} = n(B)^{n(A)} = 2^3 = 2 	imes 2 	imes 2 = 8$$
  Jadi ada 8 variasi fungsi yang mungkin terbentuk.
- **Feedback:**
  - *Benar:* "Akurat sekali! Rumus pemetaan dari A ke B adalah $n(B)^{n(A)} = 2^3 = 8$ kemungkinan fungsi. Sandi brankas terbongkar!"
  - *Salah:* "Ingat rumusnya: $(\text{banyak anggota tujuan})^{(\text{banyak anggota asal})} = 2^3$. Hitung $2 \times 2 \times 2$."

---

### [ID: CH2-STAGE-19] Evakuasi Darurat: Fungsi Konstan (Semua Domain ke Satu Tujuan)
- **Materi:** Konsep Fungsi Konstan
- **Indikator:** Siswa dapat mengidentifikasi dan membentuk fungsi konstan pada diagram panah.
- **Bentuk Interaksi:** Diagram Panah Interaktif.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Sirine bahaya berbunyi! Empat tim detektif $A = \{	ext{Tim 1}, 	ext{Tim 2}, 	ext{Tim 3}, 	ext{Tim 4}\}$ harus segera dievakuasi.
  Protokol Keamanan menyatakan: **Seluruh tim WAJIB dievakuasi ke satu-satunya tempat aman**, yaitu **Bunker Utama** di Himpunan B. (Pilihan lain: *Helipad* dan *Dermaga* ditutup).
  Hubungkan seluruh tim ke tujuannya. Apakah hubungan ini sah sebagai fungsi?
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Himpunan A: `Tim 1`, `Tim 2`, `Tim 3`, `Tim 4`.
    - Himpunan B: `Bunker Utama`, `Helipad (Terkunci)`, `Dermaga (Terkunci)`.
- **Pilihan/Jawaban:** Tarik panah dari keempat tim di A seluruhnya menuju `Bunker Utama`.
- **Kunci:**
  - `Tim 1 ➔ Bunker Utama`
  - `Tim 2 ➔ Bunker Utama`
  - `Tim 3 ➔ Bunker Utama`
  - `Tim 4 ➔ Bunker Utama`
- **Pembahasan:**
  Hubungan di mana semua anggota domain dipasangkan ke satu anggota kodomain yang sama disebut **Fungsi Konstan**. Hubungan ini 100% SAH sebagai fungsi, karena setiap anggota domain memiliki tepat satu pasangan.
- **Feedback:**
  - *Benar:* "Evakuasi sukses! Ini adalah contoh Fungsi Konstan: semua anggota asal terhubung ke satu titik tujuan yang sama secara sah."
  - *Salah:* "Tarik panah dari Tim 1, Tim 2, Tim 3, dan Tim 4 semuanya menuju ke Bunker Utama."

---

### [ID: CH2-STAGE-20] Sidang Mahkamah Logika: Relasi vs Fungsi
- **Materi:** Sintesis Hubungan Relasi dan Fungsi
- **Indikator:** Siswa dapat mengevaluasi hubungan hierarkis antara konsep relasi dan konsep fungsi.
- **Bentuk Interaksi:** Pilihan Ganda Analitis.
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Dua detektif sedang memperdebatkan laporan akhir kasus:
  - **Detektif Reno:** *"Setiap fungsi pasti merupakan relasi, tetapi tidak setiap relasi merupakan fungsi."*
  - **Detektif Vina:** *"Setiap relasi pasti merupakan fungsi, dan relasi adalah bagian kecil dari fungsi."*
  Berdasarkan kaidah matematika yang benar, siapakah yang menyatakan kesimpulan yang TEPAT?
- **Data/Visual yang diperlukan:** Diagram Venn lingkaran besar "Relasi" yang di dalamnya memuat lingkaran kecil "Fungsi".
- **Pilihan/Jawaban:**
  A. Detektif Reno BENAR, karena fungsi adalah bentuk khusus dari relasi yang memiliki syarat ketat (tidak boleh bercabang dan tidak boleh kosong pada domain).
  B. Detektif Vina BENAR, karena konsep relasi memiliki aturan yang jauh lebih rumit dan terbatas dibanding fungsi.
  C. Kedua detektif SALAH, karena relasi dan fungsi adalah dua materi yang sama sekali tidak berhubungan.
  D. Kedua detektif BENAR, karena kata relasi dan fungsi memiliki arti yang persis sama dalam matematika.
- **Kunci:** A. Detektif Reno BENAR, karena fungsi adalah bentuk khusus dari relasi yang memiliki syarat ketat (tidak boleh bercabang dan tidak boleh kosong pada domain).
- **Pembahasan:**
  Pernyataan Detektif Reno tepat. Fungsi adalah relasi khusus. Semua fungsi otomatis adalah relasi. Namun, relasi biasa memperbolehkan anggota asal bercabang atau kosong, sehingga relasi biasa belum tentu memenuhi syarat sebagai fungsi.
- **Feedback:**
  - *Benar:* "Analisis filosofis yang luar biasa! Fungsi adalah 'spesies khusus' di dalam keluarga besar relasi."
  - *Salah:* "Ingat analogi hewan: semua kucing adalah hewan, tetapi tidak semua hewan adalah kucing. Begitu pula: semua fungsi adalah relasi, tetapi tidak semua relasi adalah fungsi."

---

### [ID: CH2-STAGE-21] Kesimpulan Akhir Bab 2: Intisari Syarat & Unsur Fungsi
- **Materi:** Evaluasi & Sintesis Pengertian dan Unsur Fungsi
- **Indikator:** Siswa dapat merangkum dua syarat mutlak fungsi serta membedakan peranan Domain, Kodomain, dan Range.
- **Bentuk Interaksi:** Pilihan Ganda Sintesis.
- **C-Level:** C5/C6 (Evaluasi & Sintesis)
- **Soal:**
  Apakah KESIMPULAN UTAMA yang paling tepat mengenai **SYARAT FUNGSI** dan **PERBEDAAN UNSUR-UNSURNYA**?
- **Data/Visual yang diperlukan:** Sertifikat Kelulusan Bab 2 berstempel "Master of Functions".
- **Pilihan/Jawaban:**
  A. Fungsi membolehkan daerah asal bercabang asalkan semua anggota daerah kawan terisi penuh; Range dan Kodomain selalu memiliki anggota yang sama persis.
  B. Fungsi mewajibkan setiap anggota Domain (daerah asal) memiliki pasangan dan tepat satu di Kodomain. Range (daerah hasil) adalah himpunan bagian dari Kodomain yang benar-benar menerima panah pasangan.
  C. Fungsi adalah relasi yang mengharuskan anggota himpunan kawan tidak boleh menerima lebih dari satu panah, sedangkan daerah asal boleh kosong.
  D. Domain adalah anggota yang terkena panah, Kodomain adalah himpunan asal di kiri, dan Range adalah seluruh semesta pembicaraan.
- **Kunci:** B. Fungsi mewajibkan setiap anggota Domain (daerah asal) memiliki pasangan dan tepat satu di Kodomain. Range (daerah hasil) adalah himpunan bagian dari Kodomain yang benar-benar menerima panah pasangan.
- **Pembahasan:**
  Dua poin pilar Bab 2:
  1. Syarat fungsi fokus pada Domain: wajib punya pasangan (tidak boleh kosong) dan pasangannya harus tepat satu (tidak boleh bercabang).
  2. Unsur fungsi: Domain (seluruh himpunan kiri), Kodomain (seluruh himpunan kanan), dan Range (anggota kanan yang terkena panah, di mana $	ext{Range} \subseteq 	ext{Kodomain}$).
- **Feedback:**
  - *Benar:* "SELAMAT, DETEKTIF! Kamu telah menguasai konsep esensial Bab 2: syarat disiplin fungsi dan pemetaan Domain, Kodomain, serta Range!"
  - *Salah:* "Periksa kembali syarat fungsi: disiplin ada di domain (tidak boleh kosong & tidak boleh bercabang), serta Range adalah bagian dari Kodomain yang menerima panah."

---
---

# BAGIAN II: 30 SOAL LATIHAN LENGKAP CHAPTER 2 (BANK SOAL & EVALUASI)

---

### [ID: CH2-EX-01] Syarat Mutlak Fungsi
- **Materi:** Definisi & Syarat Fungsi
- **Indikator:** Siswa dapat mengidentifikasi syarat mutlak relasi agar dapat dikategorikan sebagai fungsi.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C2 (Memahami)
- **Soal:**
  Manakah pernyataan di bawah ini yang merupakan **SYARAT MUTLAK** agar suatu relasi dari himpunan A ke himpunan B disebut sebagai **FUNGSI (PEMETAAN)**?
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. Setiap anggota himpunan B harus memiliki pasangan di himpunan A
  B. Setiap anggota himpunan A harus berpasangan dengan tepat satu anggota di himpunan B
  C. Jumlah anggota himpunan A harus selalu sama dengan jumlah anggota himpunan B
  D. Anggota himpunan A boleh bercabang asalkan anggota himpunan B terisi semua
- **Kunci:** B. Setiap anggota himpunan A harus berpasangan dengan tepat satu anggota di himpunan B
- **Pembahasan:**
  Syarat mutlak fungsi berpusat pada Himpunan Asal (Domain A):
  1. Setiap anggota A harus memiliki pasangan (tidak boleh ada yang kosong).
  2. Pasangannya harus tepat satu (tidak boleh bercabang).
- **Feedback:**
  - *Benar:* "Tepat! Syarat mutlak fungsi: setiap anggota daerah asal wajib berpasangan tepat satu."
  - *Salah:* "Fokus aturan fungsi ada pada himpunan asal (A): tidak boleh ada yang kosong dan tidak boleh bercabang (tepat satu pasangan)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada sebuah fungsi, apakah anggota himpunan asal (domain) boleh memiliki dua pasangan di himpunan kawan? (A. Boleh | B. Tidak boleh)
  - *Kunci:* B. Tidak boleh.

---

### [ID: CH2-EX-02] Definisi Domain, Kodomain, dan Range
- **Materi:** Unsur-Unsur Fungsi
- **Indikator:** Siswa dapat memvalidasi definisi Domain, Kodomain, dan Range.
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C2 (Memahami)
- **Soal:**
  **Pernyataan:** Pada pemetaan dari himpunan P ke himpunan Q, himpunan P disebut sebagai Daerah Asal (Domain), himpunan Q disebut Daerah Kawan (Kodomain), dan anggota Q yang memiliki pasangan disebut Daerah Hasil (Range).
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai Benar. Secara terminologi matematika standar:
  - $P$ adalah Domain (Daerah Asal).
  - $Q$ adalah Kodomain (Daerah Kawan).
  - Elemen-elemen pada $Q$ yang memiliki pasangan dari $P$ membentuk himpunan Range (Daerah Hasil).
- **Feedback:**
  - *Benar:* "Tepat sekali! Domain adalah asal, Kodomain adalah kawan tujuan, dan Range adalah hasil panah."
  - *Salah:* "Pernyataan ini Benar. P adalah Domain, Q adalah Kodomain, dan anggota Q yang terpilih adalah Range."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Istilah untuk himpunan daerah hasil yang menerima pasangan panah disebut... (A. Kodomain | B. Range | C. Domain | D. Relasi)
  - *Kunci:* B. Range.

---

### [ID: CH2-EX-03] Menentukan Domain dari Himpunan Pasangan Berurutan
- **Materi:** Domain pada Pasangan Berurutan
- **Indikator:** Siswa dapat menentukan himpunan domain dari kumpulan pasangan berurutan suatu fungsi.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui himpunan pasangan berurutan suatu fungsi:
  $$f = \{(1, a), (2, c), (3, b), (4, a)\}$$
  Daerah asal (Domain) dari fungsi tersebut adalah...
- **Data/Visual yang diperlukan:** Teks himpunan pasangan berurutan.
- **Pilihan/Jawaban:**
  A. $\{a, b, c\}$
  B. $\{1, 2, 3, 4\}$
  C. $\{a, c, b, a\}$
  D. $\{1, 2, 3, 4, a, b, c\}$
- **Kunci:** B. $\{1, 2, 3, 4\}$
- **Pembahasan:**
  Domain adalah himpunan seluruh elemen pertama (posisi $x$) pada setiap pasangan berurutan $(x, y)$.
  Elemen pertama pada $f$ adalah $1, 2, 3,$ dan $4$.
  Maka Domain $= \{1, 2, 3, 4\}$.
- **Feedback:**
  - *Benar:* "Bagus! Domain adalah kumpulan angka pertama di posisi depan: {1, 2, 3, 4}."
  - *Salah:* "Domain adalah elemen posisi depan $(x, y)$, sedangkan elemen huruf di belakang $\{a, b, c\}$ adalah Range."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Daerah asal (domain) dari himpunan pasangan $\{(-1, 2), (0, 5), (1, 8)\}$ adalah...
  - *Pilihan:* A. {2, 5, 8} | B. {-1, 0, 1} | C. {-1, 8} | D. {0, 2}
  - *Kunci:* B. {-1, 0, 1}

---

### [ID: CH2-EX-04] Menentukan Kodomain dari Diagram Panah
- **Materi:** Kodomain Diagram Panah
- **Indikator:** Siswa dapat menentukan daerah kawan (kodomain) dari diagram panah.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Perhatikan fungsi $f: K 	o L$ yang dinyatakan pada diagram panah:
  - Himpunan $K = \{2, 3, 5\}$
  - Himpunan $L = \{4, 6, 8, 10, 12\}$
  - Pasangan panah: $2 	o 4$, $3 	o 6$, $5 	o 10$.
  Manakah yang merupakan himpunan **Daerah Kawan (Kodomain)**?
- **Data/Visual yang diperlukan:** Ilustrasi diagram panah sederhana dari $K$ ke $L$.
- **Pilihan/Jawaban:**
  A. $\{4, 6, 10\}$
  B. $\{2, 3, 5\}$
  C. $\{4, 6, 8, 10, 12\}$
  D. $\{8, 12\}$
- **Kunci:** C. $\{4, 6, 8, 10, 12\}$
- **Pembahasan:**
  Kodomain adalah **SELURUH** anggota himpunan tujuan (himpunan $L$), yaitu $\{4, 6, 8, 10, 12\}$.
  *(Pilihan A adalah Range, bukan Kodomain).*
- **Feedback:**
  - *Benar:* "Tepat! Kodomain mencakup seluruh anggota himpunan tujuan L: {4, 6, 8, 10, 12}."
  - *Salah:* "Jangan tertukar dengan Range: Kodomain adalah SELURUH angka di himpunan kanan L, termasuk angka 8 dan 12 yang tidak kena panah."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika fungsi memetakan dari himpunan A ke himpunan B, himpunan manakah yang disebut Kodomain? (A. Himpunan A | B. Himpunan B)
  - *Kunci:* B. Himpunan B.

---

### [ID: CH2-EX-05] Menentukan Range dari Diagram Panah
- **Materi:** Range Diagram Panah
- **Indikator:** Siswa dapat mengekstrak anggota daerah hasil (range) dari diagram panah.
- **Bentuk Interaksi:** Menentukan Anggota Range (Pilihan Chip / Multi-Check).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan fungsi pemetaan dari $A = \{a, b, c\}$ ke $B = \{1, 2, 3, 4\}$.
  Pasangan yang terbentuk adalah:
  $a 	o 2$, $b 	o 4$, $c 	o 2$.
  Pilihlah semua anggota yang termasuk ke dalam **Daerah Hasil (Range)**!
- **Data/Visual yang diperlukan:** Chip pilihan yang bisa diklik: `[ 1 ]`, `[ 2 ]`, `[ 3 ]`, `[ 4 ]`.
- **Pilihan/Jawaban:** Memilih chip anggota yang terkena panah.
- **Kunci:** Pilih chip `2` dan `4` saja.
- **Pembahasan:**
  Anggota di himpunan $B$ yang menerima ujung panah dari himpunan $A$ hanyalah angka $2$ dan $4$. Angka $1$ dan $3$ tidak menerima panah. Maka $	ext{Range} = \{2, 4\}$.
- **Feedback:**
  - *Benar:* "Tepat sekali! Hanya angka 2 dan 4 yang terkena panah, sehingga Range = {2, 4}."
  - *Salah:* "Perhatikan ujung panah: panah hanya mengarah ke angka 2 dan 4. Angka 1 dan 3 tidak terkena panah."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika pasangan fungsi adalah {(1, p), (2, q), (3, p)}, anggota daerah hasilnya adalah...
  - *Pilihan:* A. {1, 2, 3} | B. {p, q} | C. {p, q, p} | D. {q}
  - *Kunci:* B. {p, q}

---

### [ID: CH2-EX-06] Matching Tiga Unsur Fungsi
- **Materi:** Pemahaman Terminologi Unsur Fungsi
- **Indikator:** Siswa dapat mencocokkan istilah Domain, Kodomain, dan Range dengan deskripsinya.
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Jodohkan istilah unsur fungsi di sebelah kiri dengan deskripsi pengertiannya yang tepat di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kiri: `Domain`, `Kodomain`, `Range`.
    - Kanan:
      - `Daerah asal mula-mula (seluruh anggota himpunan pertama)`
      - `Daerah kawan tujuan (seluruh anggota himpunan kedua)`
      - `Daerah hasil (hanya anggota kodomain yang memiliki pasangan)`
      - `Himpunan pasangan yang dibalik` [Pengecoh]
- **Pilihan/Jawaban:** Menghubungkan garis jodoh antar kartu.
- **Kunci:**
  - `Domain` ➔ `Daerah asal mula-mula (seluruh anggota himpunan pertama)`
  - `Kodomain` ➔ `Daerah kawan tujuan (seluruh anggota himpunan kedua)`
  - `Range` ➔ `Daerah hasil (hanya anggota kodomain yang memiliki pasangan)`
- **Pembahasan:**
  Domain adalah himpunan asal di kiri, Kodomain adalah himpunan kawan di kanan, dan Range adalah himpunan bagian dari kodomain yang menerima panah pasangan.
- **Feedback:**
  - *Benar:* "Sempurna! Kamu memahami definisi operasional ketiga unsur fungsi."
  - *Salah:* "Cek kembali: Domain = Asal, Kodomain = Kawan tujuan, Range = Hasil panah."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Anggota kodomain yang benar-benar terpilih oleh panah dari domain disebut... (A. Range | B. Domain | C. Relasi | D. Gradien)
  - *Kunci:* A. Range.

---

### [ID: CH2-EX-07] Deteksi Keabsahan Fungsi Pasangan Berurutan
- **Materi:** Uji Fungsi pada Pasangan Berurutan
- **Indikator:** Siswa dapat menentukan himpunan pasangan berurutan mana yang merupakan fungsi sah.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Di antara himpunan pasangan berurutan berikut, manakah yang merupakan **FUNGSI**?
- **Data/Visual yang diperlukan:** Teks daftar pasangan berurutan.
- **Pilihan/Jawaban:**
  A. $P = \{(1, a), (1, b), (2, c), (3, d)\}$
  B. $Q = \{(1, x), (2, x), (3, x), (4, x)\}$
  C. $R = \{(2, 4), (3, 6), (2, 8)\}$
  D. $S = \{(a, 1), (b, 2), (a, 3)\}$
- **Kunci:** B. $Q = \{(1, x), (2, x), (3, x), (4, x)\}$
- **Pembahasan:**
  - Pada himpunan $P$, angka 1 bercabang: $(1, a)$ dan $(1, b)$ (bukan fungsi).
  - Pada himpunan $Q$, seluruh elemen depan $\{1, 2, 3, 4\}$ masing-masing hanya muncul satu kali. Memiliki pasangan yang sama $(x)$ diperbolehkan. Maka $Q$ adalah FUNGSI.
  - Pada himpunan $R$, angka 2 bercabang: $(2, 4)$ dan $(2, 8)$ (bukan fungsi).
  - Pada himpunan $S$, huruf $a$ bercabang: $(a, 1)$ dan $(a, 3)$ (bukan fungsi).
- **Feedback:**
  - *Benar:* "Tepat sekali! Pada himpunan Q, semua angka depan (1, 2, 3, 4) muncul tepat satu kali tanpa ada percabangan."
  - *Salah:* "Periksa angka posisi depan: jika ada angka depan yang tertulis lebih dari satu kali (seperti angka 1 di P, angka 2 di R, atau huruf a di S), maka itu BUKAN fungsi."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Apakah himpunan {(3, 1), (3, 2)} merupakan fungsi? (A. Ya, fungsi | B. Bukan fungsi)
  - *Kunci:* B. Bukan fungsi (karena angka 3 bercabang).

---

### [ID: CH2-EX-08] Kodomain Boleh Menerima Banyak Panah
- **Materi:** Fleksibilitas Kodomain pada Fungsi
- **Indikator:** Siswa dapat menganalisis bahwa anggota kodomain boleh menerima lebih dari satu panah.
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  **Pernyataan:** Pada sebuah fungsi, satu anggota himpunan kawan (kodomain) diperbolehkan menerima lebih dari satu anak panah dari anggota himpunan asal.
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai Benar. Syarat "tidak boleh bercabang" hanya berlaku untuk anggota himpunan asal (domain). Anggota kodomain bebas menerima banyak panah (misalnya pada fungsi kuadrat $f(x)=x^2$, nilai $x=2$ dan $x=-2$ keduanya mengarah ke $y=4$).
- **Feedback:**
  - *Benar:* "Tepat! Syarat tunggal hanya berlaku untuk domain. Kodomain boleh menerima banyak panah sekaligus."
  - *Salah:* "Pernyataan ini Benar. Kodomain boleh menerima lebih dari satu panah (contohnya banyak anak yang menyukai satu rasa es krim yang sama)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika dua siswa berbeda menyukai warna favorit yang sama, apakah relasi 'warna favorit' tersebut tetap sah sebagai fungsi? (A. Ya, sah sebagai fungsi | B. Tidak sah)
  - *Kunci:* A. Ya, sah sebagai fungsi.

---

### [ID: CH2-EX-09] Diagram Panah Fungsi Tiga Elemen
- **Materi:** Konstruksi Diagram Panah Fungsi
- **Indikator:** Siswa dapat membentuk fungsi yang sah menggunakan diagram panah interaktif.
- **Bentuk Interaksi:** Diagram Panah Interaktif.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan Domain $A = \{1, 2, 3\}$ dan Kodomain $B = \{a, b\}$.
  Hubungkan setiap anggota himpunan A ke himpunan B sehingga membentuk FUNGSI yang sah dengan syarat: **Anggota 'a' menerima tepat dua panah, dan anggota 'b' menerima tepat satu panah**!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kurva A: `1`, `2`, `3`.
    - Kurva B: `a`, `b`.
    - Sistem memvalidasi: setiap node A punya 1 panah; node `a` punya 2 panah masuk; node `b` punya 1 panah masuk.
- **Pilihan/Jawaban:** Penarikan garis panah interaktif.
- **Kunci:**
  Contoh pasangan valid:
  - `1 ➔ a`
  - `2 ➔ a`
  - `3 ➔ b`
  *(Atau variasi lain asalkan dua angka ke 'a' dan satu angka ke 'b').*
- **Pembahasan:**
  Setiap anggota di A ($1, 2, 3$) memiliki tepat satu pasangan, sehingga sah sebagai fungsi. Di himpunan B, elemen 'a' menerima 2 panah dan 'b' menerima 1 panah sesuai instruksi.
- **Feedback:**
  - *Benar:* "Bagus sekali! Seluruh anggota domain berpasangan tepat satu, serta kondisi kodomain terpenuhi."
  - *Salah:* "Pastikan setiap angka 1, 2, dan 3 hanya menarik satu panah. Dua angka harus mengarah ke 'a', dan satu angka mengarah ke 'b'."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Berapa jumlah total anak panah yang menghubungkan $A=\{1, 2, 3, 4\}$ ke himpunan $B$ pada suatu fungsi? (A. 2 | B. 3 | C. 4 | D. Bebas)
  - *Kunci:* C. 4 (karena setiap anggota domain wajib memiliki tepat 1 panah).

---

### [ID: CH2-EX-10] Deteksi Diagram yang Bukan Fungsi
- **Materi:** Analisis Diagram Panah
- **Indikator:** Siswa dapat mendeteksi diagram panah yang melanggar aturan fungsi dari 4 opsi pilihan.
- **Bentuk Interaksi:** Deteksi Fungsi (Pilihan Kartu).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Perhatikan 4 diagram panah di bawah ini. Diagram manakah yang **BUKAN FUNGSI** karena ada anggota domain yang bercabang?
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Tampilkan 4 diagram panah:
    - Opsi A: $1 	o x, 2 	o y, 3 	o z$
    - Opsi B: $1 	o x, 2 	o x, 3 	o x$
    - Opsi C: $1 	o x, 2 	o y, 2 	o z, 3 	o z$ (Angka 2 bercabang ke y dan z) [BUKAN FUNGSI]
    - Opsi D: $1 	o y, 2 	o x, 3 	o z$
- **Pilihan/Jawaban:**
  A. Diagram A
  B. Diagram B
  C. Diagram C
  D. Diagram D
- **Kunci:** C. Diagram C
- **Pembahasan:**
  Pada Diagram C, anggota domain angka 2 memiliki dua anak panah keluar (mengarah ke $y$ dan $z$). Ini melanggar syarat bahwa setiap anggota domain harus berpasangan dengan TEPAT SATU anggota kodomain.
- **Feedback:**
  - *Benar:* "Cepat dan tepat! Pada Diagram C, angka 2 bercabang ke dua tujuan, sehingga bukan fungsi."
  - *Salah:* "Cari diagram di mana ada angka di sebelah kiri yang mengeluarkan DUA anak panah sekaligus."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika anggota asal A memiliki 2 garis panah keluar, apakah diagram tersebut fungsi? (A. Ya | B. Bukan fungsi)
  - *Kunci:* B. Bukan fungsi.

---

### [ID: CH2-EX-11] Perbaiki Diagram Panah agar Menjadi Fungsi
- **Materi:** Perbaikan Diagram Menjadi Fungsi
- **Indikator:** Siswa dapat memperbaiki diagram panah yang melanggar fungsi dengan menghapus panah berlebih.
- **Bentuk Interaksi:** Perbaiki Fungsi (Klik untuk memutus garis).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Pada diagram panah di bawah, relasi dari $A = \{1, 2, 3\}$ ke $B = \{p, q\}$ belum menjadi fungsi karena angka **3** memiliki dua cabang panah: **$3 	o p$** dan **$3 	o q$**.
  Jika pasangan yang benar seharusnya adalah **$3 	o q$**, klik garis panah yang **SALAH** untuk menghapusnya agar diagram menjadi fungsi yang sah!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:* Diagram panah interaktif dengan garis yang menyala saat disentuh mouse.
    - Garis 1: `1 ➔ p`
    - Garis 2: `2 ➔ p`
    - Garis 3: `3 ➔ p` [GARIS SALAH / KLIK UNTUK HAPUS]
    - Garis 4: `3 ➔ q` [Garis benar]
- **Pilihan/Jawaban:** Klik garis panah dari `3 ➔ p`.
- **Kunci:** Menghapus garis panah `3 ➔ p`.
- **Pembahasan:**
  Dengan menghapus garis `3 ➔ p`, maka angka 3 hanya memiliki tepat satu pasangan yaitu `3 ➔ q`. Seluruh anggota domain $\{1, 2, 3\}$ kini masing-masing memiliki tepat satu panah, sehingga relasi menjadi fungsi yang sah.
- **Feedback:**
  - *Benar:* "Bagus sekali! Garis salah berhasil dihapus. Sekarang setiap anggota domain memiliki tepat 1 pasangan."
  - *Salah:* "Instruksi menyebutkan bahwa pasangan yang benar adalah $3 	o q$. Maka garis dari 3 ke p adalah garis salah yang harus kamu klik untuk dihapus."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika anggota $x$ terhubung ke $a$ dan $b$, berapa garis yang harus dihapus agar $x$ memenuhi syarat fungsi? (A. 1 garis | B. 2 garis | C. Tidak ada)
  - *Kunci:* A. 1 garis (agar tersisa tepat 1 garis).

---

### [ID: CH2-EX-12] Hubungan Himpunan Bagian: Range $\subseteq$ Kodomain
- **Materi:** Teori Himpunan Unsur Fungsi
- **Indikator:** Siswa dapat menganalisis hubungan matematis antara Daerah Hasil (Range) dan Daerah Kawan (Kodomain).
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Bagaimanakah hubungan matematis yang selalu berlaku antara **Daerah Hasil (Range)** dengan **Daerah Kawan (Kodomain)** pada setiap fungsi?
- **Data/Visual yang diperlukan:** Diagram Venn hubungan himpunan bagian ($\subseteq$).
- **Pilihan/Jawaban:**
  A. Range selalu merupakan himpunan bagian dari Kodomain ($	ext{Range} \subseteq 	ext{Kodomain}$)
  B. Kodomain selalu lebih sedikit jumlah anggotanya dibanding Range
  C. Range dan Kodomain tidak boleh memiliki anggota yang beririsan
  D. Range selalu sama dengan himpunan kosong
- **Kunci:** A. Range selalu merupakan himpunan bagian dari Kodomain ($	ext{Range} \subseteq 	ext{Kodomain}$)
- **Pembahasan:**
  Karena Range adalah kumpulan anggota-anggota di Kodomain yang menerima panah, maka setiap anggota Range pasti merupakan anggota Kodomain. Dengan demikian, Range selalu merupakan **himpunan bagian** dari Kodomain ($	ext{Range} \subseteq 	ext{Kodomain}$). Jumlah anggota Range paling banyak sama dengan jumlah anggota Kodomain.
- **Feedback:**
  - *Benar:* "Tepat sekali! Range selalu merupakan himpunan bagian dari Kodomain (Range ⊆ Kodomain)."
  - *Salah:* "Range diambil dari dalam Kodomain, jadi Range selalu menjadi bagian (himpunan bagian) dari Kodomain."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Mungkinkah jumlah anggota Range lebih banyak daripada jumlah anggota Kodomain? (A. Mungkin | B. Tidak mungkin)
  - *Kunci:* B. Tidak mungkin (karena Range berada di dalam Kodomain).

---

### [ID: CH2-EX-13] Menghitung Banyak Anggota Range $n(	ext{Range})$
- **Materi:** Kardinalitas Range
- **Indikator:** Siswa dapat menghitung banyak anggota daerah hasil dari kumpulan pasangan berurutan.
- **Bentuk Interaksi:** Input Angka.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan fungsi $f = \{(1, 5), (2, 7), (3, 5), (4, 9), (5, 7)\}$.
  Berapakah **BANYAK ANGGOTA DAERAH HASIL** ($n(	ext{Range})$) dari fungsi $f$ tersebut?
- **Data/Visual yang diperlukan:** Kotak input angka numerik.
- **Pilihan/Jawaban:** Input numerik bulat.
- **Kunci:** `3`
- **Pembahasan:**
  Mari daftarkan seluruh nilai kedua ($y$) yang muncul pada pasangan:
  Nilai $y$ yang ada adalah $5, 7, 5, 9, 7$.
  Himpunan Daerah Hasil (Range) adalah kumpulan nilai $y$ tanpa pengulangan:
  $$	ext{Range} = \{5, 7, 9\}$$
  Banyak anggota Range adalah $n(	ext{Range}) = 3$.
- **Feedback:**
  - *Benar:* "Sangat teliti! Nilai output yang muncul adalah {5, 7, 9}, sehingga banyak anggotanya adalah 3."
  - *Salah:* "Ingat kaidah himpunan: angka yang kembar dihitung satu kali! Angka 5 dan 7 muncul berulang, jadi anggotanya hanya {5, 7, 9} (total ada 3)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Berapa banyak anggota daerah hasil dari {(1, 4), (2, 4), (3, 4)}? (A. 1 | B. 3 | C. 4 | D. 0)
  - *Kunci:* A. 1 (karena hanya ada satu nilai yaitu {4}).

---

### [ID: CH2-EX-14] Formula Banyaknya Pemetaan
- **Materi:** Rumus Banyak Pemetaan
- **Indikator:** Siswa dapat mengidentifikasi formula baku banyaknya pemetaan dari himpunan A ke himpunan B.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C2 (Memahami)
- **Soal:**
  Jika $n(A)$ adalah banyak anggota himpunan A dan $n(B)$ adalah banyak anggota himpunan B, manakah rumus yang benar untuk menghitung **banyaknya pemetaan (fungsi) yang mungkin dari himpunan A ke himpunan B**?
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. $n(A) 	imes n(B)$
  B. $[n(A)]^{n(B)}$
  C. $[n(B)]^{n(A)}$
  D. $n(A) + n(B)$
- **Kunci:** C. $[n(B)]^{n(A)}$
- **Pembahasan:**
  Rumus baku banyaknya pemetaan dari himpunan asal A ke himpunan tujuan B adalah:
  $$	ext{Banyak Pemetaan } A 	o B = [n(	ext{tujuan})]^{n(	ext{asal})} = [n(B)]^{n(A)}$$
- **Feedback:**
  - *Benar:* "Tepat! Rumusnya adalah (banyak anggota himpunan kawan) pangkat (banyak anggota himpunan asal) = n(B)^n(A)."
  - *Salah:* "Hati-hati jangan terbalik basis dan pangkatnya! Rumus pemetaan A ke B adalah anggota tujuan dipangkatkan anggota asal: $n(B)^{n(A)}$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika dibalik, rumus pemetaan dari himpunan B ke himpunan A adalah... (A. $n(A)^{n(B)}$ | B. $n(B)^{n(A)}$)
  - *Kunci:* A. $n(A)^{n(B)}$

---

### [ID: CH2-EX-15] Perhitungan Banyak Pemetaan Dua Himpunan
- **Materi:** Aplikasi Rumus Pemetaan
- **Indikator:** Siswa dapat menghitung nilai numerik banyaknya pemetaan dari dua himpunan berhingga.
- **Bentuk Interaksi:** Input Angka.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diketahui himpunan $A = \{a, b\}$ dan himpunan $B = \{1, 2, 3\}$.
  Berapakah **banyaknya pemetaan yang mungkin dari himpunan A ke himpunan B**?
  *(Ketikkan angka hasil perhitungannya)*
- **Data/Visual yang diperlukan:** Kotak isian numerik.
- **Pilihan/Jawaban:** Input numerik bulat.
- **Kunci:** `9`
- **Pembahasan:**
  - Banyak anggota himpunan asal: $n(A) = 2$
  - Banyak anggota himpunan kawan: $n(B) = 3$
  - Banyak pemetaan dari A ke B:
    $$	ext{Banyak Pemetaan} = n(B)^{n(A)} = 3^2 = 9$$
- **Feedback:**
  - *Benar:* "Luar biasa! $n(B)^{n(A)} = 3^2 = 9$ kemungkinan pemetaan."
  - *Salah:* "Gunakan rumus: $n(B)^{n(A)}$. Di sini $n(B) = 3$ dan $n(A) = 2$, maka hitung $3^2 = 3 \times 3 = 9$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $n(A) = 3$ dan $n(B) = 2$, berapakah banyak pemetaan dari A ke B? (A. 6 | B. 8 | C. 9 | D. 5)
  - *Kunci:* B. 8 ($2^3 = 8$).

---

### [ID: CH2-EX-16] Karakteristik Komprehensif Fungsi
- **Materi:** Analisis Multi Sifat Fungsi
- **Indikator:** Siswa dapat membedakan mana saja sifat yang berlaku dan tidak berlaku pada fungsi.
- **Bentuk Interaksi:** Pilihan Ganda Kompleks (Centang semua yang benar).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Pilihlah **SEMUA** pernyataan di bawah ini yang **BENAR** mengenai fungsi!
- **Data/Visual yang diperlukan:** Kotak centang multi-select.
- **Pilihan/Jawaban:**
  [ ] A. Setiap fungsi otomatis merupakan relasi
  [ ] B. Setiap relasi otomatis merupakan fungsi
  [ ] C. Anggota daerah asal tidak boleh bercabang
  [ ] D. Anggota daerah kawan boleh tidak memiliki pasangan
- **Kunci:** Centang **A**, **C**, dan **D** (Pernyataan B salah).
- **Pembahasan:**
  - A benar: fungsi adalah bagian khusus dari relasi.
  - B salah: relasi biasa boleh bercabang atau kosong di domain, sehingga tidak semua relasi adalah fungsi.
  - C benar: syarat mutlak fungsi adalah domain tidak boleh bercabang.
  - D benar: anggota kodomain (daerah kawan) bebas dan boleh kosong.
- **Feedback:**
  - *Benar:* "Hebat! Kamu menguasai seluruh aspek sifat fungsi dan perbedaannya dengan relasi biasa."
  - *Salah:* "Pernyataan B salah karena relasi biasa belum tentu fungsi (relasi biasa boleh bercabang di domain)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Apakah semua relasi pasti merupakan fungsi? (A. Ya, pasti | B. Belum tentu)
  - *Kunci:* B. Belum tentu.

---

### [ID: CH2-EX-17] Sifat Khusus Fungsi Konstan
- **Materi:** Fungsi Konstan
- **Indikator:** Siswa dapat menganalisis fungsi di mana seluruh domain dipetakan ke satu elemen yang sama.
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  **Pernyataan:** Suatu relasi di mana seluruh anggota himpunan asal dipasangkan ke satu anggota himpunan kawan yang sama (misalnya $\{(1, 5), (2, 5), (3, 5)\}$) tetap merupakan FUNGSI yang sah (disebut Fungsi Konstan).
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** A. Benar
- **Pembahasan:**
  Pernyataan bernilai Benar. Syarat fungsi terpenuhi: setiap anggota domain ($1, 2, 3$) memiliki tepat satu pasangan (yaitu angka 5). Fakta bahwa pasangannya bernilai sama di kodomain sama sekali tidak melanggar aturan fungsi.
- **Feedback:**
  - *Benar:* "Tepat! Selama setiap anggota asal hanya punya 1 panah, meskipun semuanya mengarah ke angka 5, relasi ini tetap fungsi yang sah."
  - *Salah:* "Pernyataan ini Benar. Anggota kawan boleh menerima banyak panah, jadi pemetaan ke satu nilai yang sama tetap sah sebagai fungsi."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada himpunan pasangan {(a, 0), (b, 0), (c, 0)}, berapakah banyak anggota daerah hasilnya? (A. 0 | B. 1 | C. 3 | D. Tak hingga)
  - *Kunci:* B. 1 (hanya angka {0}).

---

### [ID: CH2-EX-18] Membedakan Relasi vs Fungsi pada Diagram Cartesius
- **Materi:** Uji Garis Vertikal (Vertical Line Test) pada Cartesius
- **Indikator:** Siswa dapat membedakan grafik/titik Cartesius yang merupakan fungsi melalui prinsip titik segaris vertikal.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Pada bidang koordinat Cartesius, kumpulan titik koordinat manakah yang **BUKAN MERUPAKAN FUNGSI**?
- **Data/Visual yang diperlukan:** Ilustrasi kisi koordinat dengan titik-titik plot.
- **Pilihan/Jawaban:**
  A. $\{(1, 2), (2, 3), (3, 4)\}$
  B. $\{(2, 1), (2, 5), (3, 4)\}$
  C. $\{(1, 4), (2, 4), (3, 4)\}$
  D. $\{(0, 0), (1, 1), (2, 2)\}$
- **Kunci:** B. $\{(2, 1), (2, 5), (3, 4)\}$
- **Pembahasan:**
  Pada pilihan B, terdapat dua titik yang memiliki nilai $x$ yang sama, yaitu $(2, 1)$ dan $(2, 5)$. Jika ditarik garis vertikal pada $x = 2$, garis tersebut akan memotong dua titik sekaligus. Ini artinya nilai input $2$ memiliki dua pasangan output ($1$ dan $5$), sehingga BUKAN FUNGSI.
- **Feedback:**
  - *Benar:* "Analisis grafis yang hebat! Titik (2, 1) dan (2, 5) berada pada garis vertikal yang sama (x = 2), membuktikan nilai x bercabang!"
  - *Salah:* "Cari pasangan yang nilai $x$ (angka depan)-nya sama persis: pada pilihan B, angka 2 muncul dua kali pada $(2, 1)$ dan $(2, 5)$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika dua titik pada Cartesius terletak lurus vertikal sejajar sumbu Y, apakah grafik tersebut fungsi? (A. Bukan fungsi | B. Fungsi)
  - *Kunci:* A. Bukan fungsi.

---

### [ID: CH2-EX-19] Deteksi Kesalahan pada Pasangan Berurutan Fungsi
- **Materi:** Deteksi Pelanggaran Fungsi
- **Indikator:** Siswa dapat menemukan pasangan berurutan yang menyebabkan relasi gagal menjadi fungsi.
- **Bentuk Interaksi:** Deteksi Kesalahan.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan domain $A = \{1, 2, 3\}$.
  Relasi $R = \{(1, 8), (2, 9), (3, 10), (1, 12)\}$ dinyatakan gagal menjadi fungsi karena adanya **SATU PASANGAN BERLEBIH**.
  Pasangan manakah yang jika dihapus akan membuat relasi tersebut menjadi fungsi yang sah?
- **Data/Visual yang diperlukan:** Teks himpunan pasangan berurutan.
- **Pilihan/Jawaban:**
  A. Pasangan $(2, 9)$
  B. Pasangan $(3, 10)$
  C. Pasangan $(1, 12)$
  D. Pasangan $(1, 8)$ dan $(2, 9)$ sekaligus
- **Kunci:** C. Pasangan $(1, 12)$
- **Pembahasan:**
  Elemen 1 bercabang ke dua nilai: $(1, 8)$ dan $(1, 12)$. Jika pasangan $(1, 12)$ dihapus, maka elemen 1 hanya berpasangan dengan 8. Himpunan tersisa menjadi $\{(1, 8), (2, 9), (3, 10)\}$, di mana setiap anggota $\{1, 2, 3\}$ memiliki tepat satu pasangan.
- **Feedback:**
  - *Benar:* "Tepat! Dengan menghapus $(1, 12)$, cabang pada angka 1 hilang dan relasi sah menjadi fungsi."
  - *Salah:* "Perhatikan angka 1: ia dipasangkan ke 8 dan ke 12. Menghapus salah satunya (yaitu $(1, 12)$) akan menghilangkan percabangan."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada pasangan {(4, a), (4, b), (5, c)}, angka manakah yang menyebabkan bukan fungsi? (A. 4 | B. 5 | C. a | D. c)
  - *Kunci:* A. 4 (karena bercabang ke a dan b).

---

### [ID: CH2-EX-20] Konstruksi Diagram Panah: Huruf ke Angka
- **Materi:** Relasi Huruf ke Angka
- **Indikator:** Siswa dapat menghubungkan diagram panah dari himpunan huruf ke himpunan angka sesuai syarat fungsi.
- **Bentuk Interaksi:** Diagram Panah Interaktif.
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan Domain $A = \{x, y, z\}$ dan Kodomain $B = \{1, 2, 3, 4\}$.
  Hubungkan setiap huruf di A ke angka di B dengan ketentuan:
  - $x$ dipasangkan ke bilangan ganjil terkecil.
  - $y$ dipasangkan ke bilangan genap terkecil.
  - $z$ dipasangkan ke bilangan prima genap.
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kurva A: `x`, `y`, `z`.
    - Kurva B: `1`, `2`, `3`, `4`.
    - Penarikan garis interaktif.
- **Pilihan/Jawaban:** Tarik panah dari A ke B.
- **Kunci:**
  - `x ➔ 1` (ganjil terkecil)
  - `y ➔ 2` (genap terkecil)
  - `z ➔ 2` (satu-satunya bilangan prima genap)
- **Pembahasan:**
  - Bilangan ganjil terkecil di B adalah 1 $\implies x 	o 1$.
  - Bilangan genap terkecil di B adalah 2 $\implies y 	o 2$.
  - Bilangan prima genap di B adalah 2 $\implies z 	o 2$.
  Setiap anggota domain terpasang tepat satu, sehingga sah sebagai fungsi.
- **Feedback:**
  - *Benar:* "Sempurna! x ke 1, y ke 2, dan z ke 2. Kamu menggabungkan konsep fungsi dengan sifat bilangan secara tepat!"
  - *Salah:* "Cek sifat bilangannya: ganjil terkecil adalah 1 ($x 	o 1$), genap terkecil adalah 2 ($y 	o 2$), dan prima genap adalah 2 ($z 	o 2$)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Bilangan prima genap satu-satunya di antara angka {1, 2, 3, 4} adalah... (A. 1 | B. 2 | C. 3 | D. 4)
  - *Kunci:* B. 2.

---

### [ID: CH2-EX-21] Matching Kategori Diagram: Fungsi vs Bukan Fungsi
- **Materi:** Klasifikasi Representasi Fungsi
- **Indikator:** Siswa dapat mengklasifikasikan diagram panah ke dalam kategori "Fungsi" atau "Bukan Fungsi".
- **Bentuk Interaksi:** Matching (Menjodohkan ke Kategori).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Jodohkan masing-masing gambar diagram di sebelah kiri ke statusnya yang tepat di sebelah kanan (**Fungsi** atau **Bukan Fungsi**)!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Diagram 1: Domain {1, 2} ke Kodomain {a}. Pasangan: `1 ➔ a`, `2 ➔ a`.
    - Diagram 2: Domain {1, 2} ke Kodomain {a, b}. Pasangan: `1 ➔ a`, `1 ➔ b`, `2 ➔ b`.
    - Diagram 3: Domain {1, 2, 3} ke Kodomain {a}. Pasangan: `1 ➔ a`, `2 ➔ a` (elemen 3 kosong).
    - Kotak Kategori Kanan: `FUNGSI`, `BUKAN FUNGSI`.
- **Pilihan/Jawaban:** Menghubungkan diagram ke kategori yang sesuai.
- **Kunci:**
  - `Diagram 1` ➔ `FUNGSI`
  - `Diagram 2` ➔ `BUKAN FUNGSI` (karena 1 bercabang)
  - `Diagram 3` ➔ `BUKAN FUNGSI` (karena 3 kosong)
- **Pembahasan:**
  - Diagram 1 adalah Fungsi (semua anggota domain punya tepat 1 pasangan).
  - Diagram 2 Bukan Fungsi (anggota 1 bercabang ke $a$ dan $b$).
  - Diagram 3 Bukan Fungsi (anggota 3 tidak memiliki pasangan).
- **Feedback:**
  - *Benar:* "Tepat! Diagram 1 fungsi sah, sedangkan Diagram 2 (bercabang) dan Diagram 3 (ada yang kosong) bukan fungsi."
  - *Salah:* "Periksa domain (sisi kiri): jika ada yang bercabang atau ada yang kosong tanpa panah, maka diagram tersebut BUKAN FUNGSI."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika pada diagram panah terdapat elemen asal yang tidak punya panah, diagram tersebut masuk kategori... (A. Fungsi | B. Bukan Fungsi)
  - *Kunci:* B. Bukan Fungsi.

---

### [ID: CH2-EX-22] Kodomain Memiliki Anggota Kosong
- **Materi:** Sifat Kodomain pada Fungsi
- **Indikator:** Siswa dapat mengevaluasi keabsahan fungsi jika terdapat anggota kodomain yang tidak memiliki pasangan.
- **Bentuk Interaksi:** Benar / Salah (True/False).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  **Pernyataan:** Jika pada suatu relasi terdapat anggota daerah kawan (kodomain) yang tidak memiliki pasangan sama sekali, maka relasi tersebut otomatis GAGAL menjadi fungsi.
- **Data/Visual yang diperlukan:** Tidak ada visual grafis khusus.
- **Pilihan/Jawaban:**
  A. Benar
  B. Salah
- **Kunci:** B. Salah
- **Pembahasan:**
  Pernyataan bernilai SALAH. Syarat fungsi sama sekali tidak melarang adanya anggota kodomain yang kosong. Yang dilarang kosong hanyalah anggota daerah asal (domain). Contohnya: relasi dari 3 siswa ke 5 pilihan menu, jika ada 2 menu yang tidak dipesan siapapun, relasi tersebut tetap sah sebagai fungsi.
- **Feedback:**
  - *Benar:* "Tepat sekali! Anggota kodomain (daerah kawan) BOLEH KOSONG. Yang wajib berpasangan hanyalah domain."
  - *Salah:* "Pernyataan ini Salah. Kodomain boleh memiliki anggota yang tidak berpasangan tanpa membatalkan fungsi."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Apakah anggota kodomain (sebelah kanan) wajib memiliki pasangan semua pada fungsi? (A. Wajib | B. Tidak wajib, boleh kosong)
  - *Kunci:* B. Tidak wajib, boleh kosong.

---

### [ID: CH2-EX-23] Rekonstruksi Pasangan Berurutan Fungsi
- **Materi:** Penyusunan Pasangan Berurutan Fungsi
- **Indikator:** Siswa dapat memilih satu pasangan pelengkap agar suatu himpunan pasangan berurutan menjadi fungsi penuh.
- **Bentuk Interaksi:** Menentukan Pasangan (Pilihan Ganda Terarah).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Diberikan himpunan daerah asal $A = \{1, 2, 3\}$ dan daerah kawan $B = \{a, b\}$.
  Saat ini baru terbentuk dua pasangan: $\{(1, a), (2, b)\}$.
  Manakah **SATU PASANGAN TAMBAHAN** yang harus dimasukkan agar himpunan tersebut menjadi **FUNGSI PENUH** dari A ke B?
- **Data/Visual yang diperlukan:** Teks himpunan pasangan berurutan dengan slot kosong: $\{(1, a), (2, b), \mathbf{(?, ?)}\}$.
- **Pilihan/Jawaban:**
  A. $(1, b)$
  B. $(2, a)$
  C. $(3, a)$
  D. $(a, 3)$
- **Kunci:** C. $(3, a)$
- **Pembahasan:**
  Himpunan daerah asal adalah $\{1, 2, 3\}$. Saat ini baru angka 1 dan 2 yang memiliki pasangan. Angka 3 belum memiliki pasangan sama sekali. Maka pasangan tambahan harus berawalan angka 3, yaitu $(3, a)$ atau $(3, b)$.
  Pilihan A dan B salah karena akan membuat angka 1 atau 2 bercabang. Pilihan D salah karena urutannya terbalik.
- **Feedback:**
  - *Benar:* "Tepat! Angka 3 belum punya pasangan, jadi pasangan tambahannya adalah $(3, a)$."
  - *Salah:* "Lihat angka di posisi depan: angka 1 dan 2 sudah berpasangan, tinggal angka 3 yang belum. Cari pasangan yang berawalan angka 3!"
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika domain adalah {x, y} dan baru ada pasangan {(x, 1)}, pasangan pelengkapnya adalah... (A. (x, 2) | B. (y, 1) | C. (1, y) | D. (1, x))
  - *Kunci:* B. (y, 1) [karena y belum berpasangan].

---

### [ID: CH2-EX-24] Kondisi Khusus: Range Sama dengan Kodomain
- **Materi:** Karakteristik Fungsi Surjektif
- **Indikator:** Siswa dapat menganalisis kondisi ketika Daerah Hasil sama persis dengan Daerah Kawan.
- **Bentuk Interaksi:** Pilihan Ganda Kompleks (Centang pernyataan yang benar).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui fungsi $f: A 	o B$. Kondisi di mana **Daerah Hasil sama persis dengan Daerah Kawan ($	ext{Range} = 	ext{Kodomain}$)** menandakan bahwa... (Pilih semua yang benar!)
- **Data/Visual yang diperlukan:** Checkbox interaktif.
- **Pilihan/Jawaban:**
  [ ] A. Seluruh anggota di himpunan B menerima minimal satu anak panah
  [ ] B. Tidak ada satupun anggota di himpunan B yang menganggur/kosong
  [ ] C. Setiap anggota himpunan A harus dipasangkan ke anggota B yang berbeda-beda
  [ ] D. Banyaknya anggota Range sama dengan banyaknya anggota Kodomain ($n(	ext{Range}) = n(B)$)
- **Kunci:** Centang **A**, **B**, dan **D** (Pernyataan C tidak wajib, karena beberapa anggota A boleh menuju anggota B yang sama asalkan seluruh B terisi).
- **Pembahasan:**
  Jika Range = Kodomain:
  - Seluruh elemen Kodomain $B$ terpilih menerima panah (A benar).
  - Tidak ada anggota $B$ yang menganggur (B benar).
  - Banyak anggota Range sama dengan $n(B)$ (D benar).
  - Pernyataan C salah karena dua anggota A boleh saja memetakan ke elemen B yang sama.
- **Feedback:**
  - *Benar:* "Analisis tepat! Jika Range = Kodomain, seluruh anggota di himpunan kawan pasti terisi tanpa ada yang tersisa."
  - *Salah:* "Pernyataan C tidak wajib benar (misal $A=\{1, 2, 3\}$ ke $B=\{x, y\}$ dengan $1 	o x, 2 	o x, 3 	o y$; elemen A tidak harus berbeda pasangannya asalkan x dan y terisi semua)."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika Kodomain memiliki 3 anggota, dan semuanya menerima panah, berapakah banyak anggota Range? (A. 1 | B. 2 | C. 3 | D. 0)
  - *Kunci:* C. 3.

---

### [ID: CH2-EX-25] Membedah Alasan Kegagalan Menjadi Fungsi
- **Materi:** Analisis Pelanggaran Fungsi
- **Indikator:** Siswa dapat menjelaskan alasan matematis mengapa suatu relasi bukan merupakan fungsi.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan relasi "makanan kesukaan" dari siswa $A = \{	ext{Andi}, 	ext{Budi}\}$ ke makanan $B = \{	ext{Bakso}, 	ext{Soto}, 	ext{Sate}\}$.
  Hasil survei:
  - Andi menyukai Bakso dan Soto.
  - Budi menyukai Sate.
  Mengapa relasi tersebut **BUKAN MERUPAKAN FUNGSI**?
- **Data/Visual yang diperlukan:** Diagram panah relasi kesukaan makanan.
- **Pilihan/Jawaban:**
  A. Karena ada makanan yang tidak disukai oleh siapapun
  B. Karena Andi memiliki lebih dari satu makanan kesukaan (bercabang)
  C. Karena Budi hanya memilih satu makanan
  D. Karena jumlah makanan lebih banyak daripada jumlah siswa
- **Kunci:** B. Karena Andi memiliki lebih dari satu makanan kesukaan (bercabang)
- **Pembahasan:**
  Alasan relasi ini bukan fungsi adalah karena **Andi** (anggota daerah asal) memiliki dua pasangan panah sekaligus (ke *Bakso* dan *Soto*). Syarat fungsi mewajibkan setiap anggota daerah asal memiliki pasangan TEPAT SATU.
- **Feedback:**
  - *Benar:* "Tepat sekali! Andi memiliki dua cabang kesukaan, sehingga melanggar syarat mutlak fungsi."
  - *Salah:* "Fokus pada himpunan asal (siswa): Andi memilih dua makanan sekaligus (bercabang). Hal inilah yang menggagalkan fungsi."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika Siti menyukai IPA dan Matematika, apakah relasi 'mata pelajaran favorit' dari himpunan siswa adalah fungsi? (A. Bukan fungsi, karena Siti bercabang | B. Fungsi)
  - *Kunci:* A. Bukan fungsi, karena Siti bercabang.

---

### [ID: CH2-EX-26] Analisis Nilai Output pada Diagram Panah
- **Materi:** Evaluasi Pasangan Fungsi
- **Indikator:** Siswa dapat menghitung nilai jumlahan elemen daerah hasil dari fungsi numerik.
- **Bentuk Interaksi:** Input Angka.
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan fungsi dari $A = \{1, 2, 3\}$ ke $B = \{10, 20, 30, 40\}$.
  Pasangan panah yang terbentuk:
  - $1 	o 10$
  - $2 	o 30$
  - $3 	o 10$
  Berapakah **JUMLAH TOTAL DARI SELURUH ANGGOTA DAERAH HASIL (RANGE)**?
  *(Petunjuk: Cari terlebih dahulu anggota Range-nya, lalu jumlahkan angka-angkanya).*
- **Data/Visual yang diperlukan:** Kotak isian numerik.
- **Pilihan/Jawaban:** Input numerik bulat.
- **Kunci:** `40`
- **Pembahasan:**
  1. Identifikasi anggota Daerah Hasil (Range):
     Angka di $B$ yang menerima panah adalah $10$ dan $30$.
     Maka $	ext{Range} = \{10, 30\}$.
  2. Hitung jumlah total anggota Range:
     $$10 + 30 = 40$$
  *(Catatan: Angka 10 hanya dihitung satu kali karena merupakan elemen himpunan).*
- **Feedback:**
  - *Benar:* "Luar biasa! Anggota Range adalah {10, 30}. Jumlahnya adalah $10 + 30 = 40$."
  - *Salah:* "Anggota Range hanya 10 dan 30 (angka 10 cukup dihitung sekali). Jumlahkan: $10 + 30 = 40$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika Range suatu fungsi adalah {2, 5}, berapakah jumlah seluruh anggota Range? (A. 7 | B. 10 | C. 3 | D. 25)
  - *Kunci:* A. 7 ($2 + 5 = 7$).

---

### [ID: CH2-EX-27] Memperbaiki Pasangan Berurutan yang Bercabang
- **Materi:** Rekonstruksi Himpunan Pasangan Fungsi
- **Indikator:** Siswa dapat memilih tindakan yang benar untuk memperbaiki himpunan pasangan berurutan yang bercabang.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diberikan relasi: $R = \{(1, 4), (2, 5), (3, 6), (2, 7)\}$.
  Relasi di atas bukan fungsi. Manakah tindakan perbaikan yang paling tepat agar relasi $R$ menjadi fungsi dengan Domain $\{1, 2, 3\}$?
- **Data/Visual yang diperlukan:** Teks himpunan pasangan berurutan.
- **Pilihan/Jawaban:**
  A. Menghapus pasangan $(1, 4)$
  B. Menghapus salah satu pasangan antara $(2, 5)$ atau $(2, 7)$
  C. Menambahkan pasangan $(3, 7)$
  D. Mengubah pasangan $(3, 6)$ menjadi $(1, 6)$
- **Kunci:** B. Menghapus salah satu pasangan antara $(2, 5)$ atau $(2, 7)$
- **Pembahasan:**
  Penyebab $R$ bukan fungsi adalah angka 2 memiliki dua pasangan: $(2, 5)$ dan $(2, 7)$. Jika salah satu dari pasangan tersebut dihapus, maka angka 2 hanya memiliki satu pasangan, sehingga seluruh domain $\{1, 2, 3\}$ memiliki tepat satu pasangan.
- **Feedback:**
  - *Benar:* "Tepat sekali! Menghapus salah satu dari pasangan bercabang pada angka 2 akan mengembalikan status relasi menjadi fungsi sah."
  - *Salah:* "Fokus pada angka 2 yang mendua: ada $(2, 5)$ dan $(2, 7)$. Hapus salah satunya agar angka 2 hanya punya satu pasangan."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada pasangan {(a, 1), (a, 2)}, bagaimana cara menjadikannya fungsi berdomain {a}? (A. Hapus salah satu pasangan | B. Tambah pasangan baru)
  - *Kunci:* A. Hapus salah satu pasangan.

---

### [ID: CH2-EX-28] Matching Tiga Himpunan Bagian: Domain, Kodomain, Range
- **Materi:** Identifikasi Lengkap Unsur Fungsi
- **Indikator:** Siswa dapat mencocokkan diagram panah kompleks dengan rincian ketiga himpunan unsurnya.
- **Bentuk Interaksi:** Matching (Menjodohkan).
- **C-Level:** C3 (Mengaplikasikan)
- **Soal:**
  Perhatikan fungsi yang menghubungkan:
  - $A = \{p, q, r\}$ ke $B = \{1, 2, 3, 4\}$
  - Dengan pasangan: $p 	o 1$, $q 	o 3$, $r 	o 1$.
  Jodohkan nama unsur fungsi di sebelah kiri dengan daftar anggotanya yang benar di sebelah kanan!
- **Data/Visual yang diperlukan:**
  - *Panduan Programmer:*
    - Kiri: `Domain`, `Kodomain`, `Range`.
    - Kanan: `{p, q, r}`, `{1, 2, 3, 4}`, `{1, 3}`, `{2, 4}` [Pengecoh].
- **Pilihan/Jawaban:** Menarik garis penghubung pencocokan.
- **Kunci:**
  - `Domain` ➔ `{p, q, r}`
  - `Kodomain` ➔ `{1, 2, 3, 4}`
  - `Range` ➔ `{1, 3}`
- **Pembahasan:**
  - Domain adalah himpunan asal: $\{p, q, r\}$.
  - Kodomain adalah seluruh himpunan kawan: $\{1, 2, 3, 4\}$.
  - Range adalah elemen kawan yang menerima panah: $\{1, 3\}$.
- **Feedback:**
  - *Benar:* "Sempurna! Kamu mencocokkan ketiga unsur fungsi tanpa ada kesalahan."
  - *Salah:* "Domain adalah himpunan huruf {p, q, r}, Kodomain semua angka {1, 2, 3, 4}, dan Range hanya angka yang kena panah {1, 3}."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Pada fungsi di atas, angka berapakah di kodomain yang TIDAK masuk ke dalam Range? (A. 1 dan 3 | B. 2 dan 4 | C. Hanya 1 | D. Hanya 3)
  - *Kunci:* B. 2 dan 4.

---

### [ID: CH2-EX-29] Perbandingan Pemetaan Bolak-Balik: $A 	o B$ vs $B 	o A$
- **Materi:** Kombinatorika Pemetaan
- **Indikator:** Siswa dapat membandingkan banyaknya pemetaan dari A ke B dan sebaliknya dari B ke A.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C4 (Menganalisis)
- **Soal:**
  Diketahui himpunan $A = \{1, 2, 3\}$ dan $B = \{x, y\}$.
  Berapakah banyaknya pemetaan dari **A ke B**, dan berapakah banyaknya pemetaan sebaliknya dari **B ke A**?
- **Data/Visual yang diperlukan:** Teks perbandingan formula eksponen.
- **Pilihan/Jawaban:**
  A. Dari A ke B ada 6 cara, dari B ke A ada 6 cara
  B. Dari A ke B ada 8 cara, dari B ke A ada 9 cara
  C. Dari A ke B ada 9 cara, dari B ke A ada 8 cara
  D. Dari A ke B ada 5 cara, dari B ke A ada 5 cara
- **Kunci:** B. Dari A ke B ada 8 cara, dari B ke A ada 9 cara
- **Pembahasan:**
  - $n(A) = 3$ dan $n(B) = 2$.
  - Banyak pemetaan dari $A 	o B$:
    $$n(B)^{n(A)} = 2^3 = 8	ext{ cara}$$
  - Banyak pemetaan sebaliknya dari $B 	o A$:
    $$n(A)^{n(B)} = 3^2 = 9	ext{ cara}$$
  Maka jawabannya adalah 8 cara dan 9 cara.
- **Feedback:**
  - *Benar:* "Analisis kombinatorika yang luar biasa! $A 	o B$ adalah $2^3 = 8$, sedangkan $B 	o A$ adalah $3^2 = 9$."
  - *Salah:* "Hati-hati: $A 	o B$ adalah $n(B)^{n(A)} = 2^3 = 8$. Sedangkan $B 	o A$ adalah $n(A)^{n(B)} = 3^2 = 9$."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Jika $n(A) = 2$ dan $n(B) = 2$, berapakah banyak pemetaan dari A ke B? (A. 2 | B. 4 | C. 6 | D. 8)
  - *Kunci:* B. 4 ($2^2 = 4$).

---

### [ID: CH2-EX-30] Evaluasi Komprehensif: Karakteristik Pemetaan
- **Materi:** Evaluasi Teoretis Hakikat Fungsi
- **Indikator:** Siswa dapat mengevaluasi dan merumuskan kriteria kebenaran esensial fungsi matematika.
- **Bentuk Interaksi:** Pilihan Ganda (MCQ).
- **C-Level:** C5 (Mengevaluasi)
- **Soal:**
  Seorang programmer membuat algoritma untuk memvalidasi apakah suatu data relasi merupakan **FUNGSI**.
  Manakah logika pengecekan di bawah ini yang **PALING BENAR DAN TUNTAS** untuk dimasukkan ke dalam kode program tersebut?
- **Data/Visual yang diperlukan:** Bagan alur (flowchart) verifikasi fungsi.
- **Pilihan/Jawaban:**
  A. "Cek apakah jumlah elemen A sama dengan B; jika sama maka Fungsi, jika berbeda maka Bukan Fungsi."
  B. "Hitung banyak panah keluar dari setiap elemen A: jika setiap elemen A memiliki panah keluar tepat 1 (tidak 0 dan tidak > 1), maka FUNGSI, tanpa mempermasalahkan kondisi elemen B."
  C. "Cek apakah seluruh elemen B menerima panah; jika ada elemen B yang kosong maka langsung tolak sebagai Bukan Fungsi."
  D. "Cek apakah ada anak panah yang bersilangan; jika ada panah yang bersilangan maka otomatis Bukan Fungsi."
- **Kunci:** B. "Hitung banyak panah keluar dari setiap elemen A: jika setiap elemen A memiliki panah keluar tepat 1 (tidak 0 dan tidak > 1), maka FUNGSI, tanpa mempermasalahkan kondisi elemen B."
- **Pembahasan:**
  Definisi matematis dari fungsi sepenuhnya bergantung pada himpunan asal (A). Suatu relasi adalah fungsi jika dan hanya jika setiap anggota $a \in A$ memiliki tepat satu pasangan $b \in B$. Kondisi himpunan $B$ (apakah ada yang kosong, apakah ada yang menerima banyak panah) sama sekali tidak menggagalkan fungsi. Maka logika program pada pilihan B adalah yang paling tepat dan tuntas.
- **Feedback:**
  - *Benar:* "Brilian, Detektif Data! Logika algoritma tersebut mencerminkan hakikat sejati fungsi: disiplin penuh pada daerah asal A!"
  - *Salah:* "Kunci fungsi hanya ada pada himpunan asal A: setiap anggota A harus punya panah keluar tepat 1. Kondisi himpunan B tidak membatalkan fungsi."
- **↳ Soal Remedial (Variasi Berbeda):**
  - *Soal:* Untuk memastikan suatu diagram panah adalah fungsi, himpunan manakah yang harus kita periksa secara ketat agar tidak bercabang dan tidak kosong? (A. Himpunan Asal / Kiri | B. Himpunan Kawan / Kanan)
  - *Kunci:* A. Himpunan Asal / Kiri.

---
