import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetPath = path.resolve('src/data/endlessQuestions.js');

// Load existing data
const { ENDLESS_QUESTIONS } = await import('../src/data/endlessQuestions.js');

// Dictionary of improved questions and explanations
const improvements = {
  1: {
    title: '🔢 Hitung Nilai Fungsi',
    question: 'Diketahui rumus fungsi f(x) = 3x − 2. Berapakah nilai dari f(4)?',
    explanation: 'Substitusi x = 4 ke f(x) = 3x − 2:\nf(4) = 3(4) − 2 = 12 − 2 = 10. ✅'
  },
  2: {
    title: '📌 Syarat Fungsi',
    question: 'Pernyataan: Fungsi adalah relasi khusus di mana setiap anggota himpunan domain memiliki tepat satu pasangan di kodomain.',
    explanation: 'Benar! Setiap anggota domain wajib memiliki pasangan dan tidak boleh bercabang. ✅'
  },
  3: {
    title: '📥 Tentukan Domain',
    question: 'Diketahui himpunan pasangan berurutan f = {(2, 5), (3, 7), (4, 9)}. Daerah asal (domain) dari f adalah...',
    explanation: 'Domain adalah himpunan elemen pertama (nilai x): {2, 3, 4}. ✅'
  },
  4: {
    title: '📐 Rumus Fungsi Input Negatif',
    question: 'Diketahui rumus fungsi f(x) = 2x + 7. Berapakah nilai dari f(−3)?',
    explanation: 'Substitusi x = −3:\nf(−3) = 2(−3) + 7 = −6 + 7 = 1. ✅'
  },
  5: {
    title: '🗂️ Domain Fungsi',
    question: 'Pernyataan: Daerah asal (domain) dari himpunan pasangan f = {(a, 1), (b, 2), (c, 3)} adalah {1, 2, 3}.',
    explanation: 'Salah! Domain adalah himpunan elemen pertama yaitu {a, b, c}. Sedangkan {1, 2, 3} adalah range/kodomain. ✅'
  },
  6: {
    title: '🔡 Unsur-Unsur Fungsi',
    question: 'Jodohkan istilah unsur fungsi di sebelah kiri dengan definisinya yang tepat!',
    explanation: 'Domain = himpunan input (daerah asal), Kodomain = seluruh himpunan output (daerah kawan), Range = hasil output yang terpasang. ✅'
  },
  7: {
    title: '🎯 Daerah Hasil (Range)',
    question: 'Diketahui fungsi f = {(1, a), (2, b), (3, a)} dengan himpunan kodomain B = {a, b, c}. Daerah hasil (range) dari f adalah...',
    explanation: 'Range adalah elemen kodomain yang memiliki pasangan (terkena panah), yaitu {a, b}. ✅'
  },
  8: {
    title: '✍️ Menghitung Nilai Fungsi',
    question: 'Diketahui rumus fungsi f(x) = 5x + 1. Berapakah nilai dari f(3)?',
    explanation: 'Substitusi x = 3:\nf(3) = 5(3) + 1 = 15 + 1 = 16. ✅'
  },
  9: {
    title: '⚖️ Relasi vs Fungsi',
    question: 'Pernyataan: Semua fungsi pasti merupakan relasi, tetapi tidak semua relasi merupakan fungsi.',
    explanation: 'Benar! Fungsi adalah relasi khusus yang memenuhi syarat setiap anggota domain memiliki tepat satu pasangan. ✅'
  },
  10: {
    title: '📏 Koefisien dari Variabel x',
    question: 'Pada rumus fungsi linear f(x) = 4x − 3, berapakah nilai koefisien dari variabel x?',
    explanation: 'Pada bentuk umum linear f(x) = ax + b:\n• Koefisien variabel x adalah a = 4 ✅\n• Konstanta fungsi adalah b = −3'
  },
  11: {
    title: '🪞 Bayangan Suatu Nilai',
    question: 'Diketahui rumus fungsi f(x) = 3x + 2. Bayangan (nilai output) dari x = 5 adalah...',
    explanation: 'Mencari bayangan dari 5 sama dengan menghitung f(5):\nf(5) = 3(5) + 2 = 15 + 2 = 17. ✅'
  },
  12: {
    title: '🏹 Sambungkan Diagram Panah',
    question: 'Hubungkan setiap elemen x pada Himpunan A ke bayangannya f(x) = 2x + 1 pada Himpunan B!',
    explanation: 'f(1) = 2(1)+1 = 3, f(2) = 2(2)+1 = 5, f(3) = 2(3)+1 = 7. Semua panah terpasang tepat! ✅'
  },
  13: {
    title: '📐 Menghitung f(0)',
    question: 'Diketahui rumus fungsi f(x) = 7x − 4. Berapakah nilai dari f(0)?',
    explanation: 'Substitusi x = 0:\nf(0) = 7(0) − 4 = 0 − 4 = −4. ✅'
  },
  14: {
    title: '🔗 Syarat Korespondensi Satu-Satu',
    question: 'Pernyataan: Korespondensi satu-satu antara himpunan A dan B hanya dapat terbentuk jika n(A) = n(B).',
    explanation: 'Benar! Syarat mutlak korespondensi satu-satu adalah jumlah anggota domain dan kodomain harus persis sama. ✅'
  },
  15: {
    title: '🔢 Perhitungan Korespondensi (4!)',
    question: 'Banyak korespondensi satu-satu dari dua himpunan beranggotakan 4 elemen dihitung dengan 4!. Berapakah nilai dari 4! (4 × 3 × 2 × 1)?',
    explanation: '4! = 4 × 3 × 2 × 1 = 24 kemungkinan pasangan korespondensi satu-satu. ✅'
  },
  16: {
    title: '📈 Titik Potong Sumbu Y',
    question: 'Grafik fungsi linear f(x) = 2x + 6 memotong sumbu Y pada titik koordinat...',
    explanation: 'Titik potong sumbu Y terjadi saat x = 0:\nf(0) = 2(0) + 6 = 6. Jadi titik koordinatnya adalah (0, 6). ✅'
  },
  17: {
    title: '📊 Bentuk Grafik Fungsi Linear',
    question: 'Pernyataan: Grafik fungsi linear f(x) = ax + b pada koordinat Cartesius selalu berupa garis lurus.',
    explanation: 'Benar! Karena berpangkat satu (linear), grafiknya selalu berbentuk garis lurus. ✅'
  },
  18: {
    title: '📍 Plot Koordinat Cartesius',
    question: 'Tandai titik-titik koordinat fungsi f(x) = 2x untuk nilai input x = 1, 2, dan 3 pada bidang Cartesius!',
    explanation: 'Titik koordinatnya adalah (1, 2), (2, 4), dan (3, 6). ✅'
  },
  19: {
    title: '📐 Kemiringan (Gradien Garis)',
    question: 'Pada rumus fungsi linear f(x) = −2x + 5, berapakah gradien (kemiringan) garisnya?',
    explanation: 'Bentuk umum y = mx + c atau f(x) = ax + b. Gradien (kemiringan) adalah koefisien di depan x, yaitu −2. ✅'
  },
  20: {
    title: '🔢 Nilai Faktorial Korespondensi',
    question: 'Jodohkan lambang n! berikut dengan hasil perhitungannya yang tepat!',
    explanation: '3! = 3×2×1 = 6, 4! = 24, 5! = 5×4×3×2×1 = 120. ✅'
  },
  21: {
    title: '✏️ Menentukan Rumus dari Nilai',
    question: 'Diberikan tabel nilai fungsi: saat x = 1 menghasilkan 3, saat x = 2 menghasilkan 5, dan saat x = 3 menghasilkan 7. Rumus fungsi f(x) yang tepat adalah...',
    explanation: 'Selisih nilai bertambah 2 (a = 2). Saat x = 1: 2(1) + b = 3 ➔ b = 1. Jadi rumusnya f(x) = 2x + 1. ✅'
  },
  22: {
    title: '❌ Syarat Relasi Bukan Fungsi',
    question: 'Pernyataan: Jika terdapat minimal satu anggota domain yang bercabang (memiliki lebih dari satu pasangan), maka relasi tersebut BUKAN fungsi.',
    explanation: 'Benar! Syarat fungsi adalah setiap anggota domain harus memiliki TEPAT SATU pasangan (tidak boleh bercabang). ✅'
  },
  23: {
    title: '📤 Menentukan Kodomain',
    question: 'Diketahui himpunan A = {1, 2, 3}, himpunan B = {a, b, c, d}, dan fungsi f = {(1, a), (2, b), (3, c)}. Daerah kawan (kodomain) dari fungsi f adalah...',
    explanation: 'Kodomain adalah seluruh himpunan tujuan (himpunan B), yaitu {a, b, c, d}. ✅'
  },
  24: {
    title: '🔢 Menghitung Nilai f(−1)',
    question: 'Diketahui rumus fungsi f(x) = 6x + 3. Berapakah nilai dari f(−1)?',
    explanation: 'Substitusi x = −1:\nf(−1) = 6(−1) + 3 = −6 + 3 = −3. ✅'
  },
  25: {
    title: '📐 Menjodohkan Nilai Bayangan',
    question: 'Jodohkan nilai x dengan nilai bayangan f(x) = 4x − 2 yang sesuai!',
    explanation: 'f(1) = 4(1)−2 = 2, f(2) = 4(2)−2 = 6, f(3) = 4(3)−2 = 10. ✅'
  },
  26: {
    title: '📈 Titik Potong Sumbu X',
    question: 'Grafik fungsi linear f(x) = 2x − 6 memotong sumbu X pada titik koordinat...',
    explanation: 'Titik potong sumbu X terjadi saat f(x) = 0:\n2x − 6 = 0 ➔ 2x = 6 ➔ x = 3. Jadi titik koordinatnya adalah (3, 0). ✅'
  },
  27: {
    title: '📊 Arah Grafik Gradien Negatif',
    question: 'Pernyataan: Jika suatu fungsi linear memiliki gradien negatif (m < 0), maka grafiknya miring menurun dari kiri ke kanan.',
    explanation: 'Benar! Gradien negatif menandakan garis menurun seiring bertambahnya nilai x. ✅'
  },
  28: {
    title: '🏹 Simulasi Korespondensi Satu-Satu',
    question: 'Hubungkan 3 saksi ke 3 nomor ruangan secara satu-satu: Saksi 1 ke Ruang 2, Saksi 2 ke Ruang 3, dan Saksi 3 ke Ruang 1!',
    explanation: 'Korespondensi satu-satu terpasang sempurna tanpa ada anggota yang terlewat maupun rangkap! ✅'
  },
  29: {
    title: '🎯 Menentukan Nilai Prapeta',
    question: 'Diketahui rumus fungsi f(x) = 2x + 4. Jika bayangannya adalah 10 (f(x) = 10), maka nilai prapeta x adalah...',
    explanation: '2x + 4 = 10 ➔ 2x = 10 − 4 ➔ 2x = 6 ➔ x = 3. ✅'
  },
  30: {
    title: '🔑 Contoh Korespondensi di Dunia Nyata',
    question: 'Pernyataan: Hubungan setiap warga negara Indonesia dengan Nomor Induk Kependudukan (NIK/KTP) adalah contoh nyata korespondensi satu-satu.',
    explanation: 'Benar! Satu orang memiliki tepat satu NIK unik, dan satu NIK hanya dimiliki oleh tepat satu orang. ✅'
  },
  31: {
    title: '📐 Konstanta Fungsi Linear',
    question: 'Pada rumus fungsi linear f(x) = 3x + 8, berapakah nilai konstantanya (nilai b)?',
    explanation: 'Pada bentuk umum f(x) = ax + b:\n• Konstanta fungsi adalah b = 8 ✅\n• Koefisien variabel x adalah a = 3'
  },
  32: {
    title: '📍 Titik Grafik Linear Cartesius',
    question: 'Pasang titik koordinat untuk fungsi linear f(x) = x + 2 pada nilai x = 0, 1, dan 2 di diagram koordinat!',
    explanation: 'Saat x=0 ➔ y=2 (0,2); saat x=1 ➔ y=3 (1,3); saat x=2 ➔ y=4 (2,4). ✅'
  },
  33: {
    title: '🔢 Perhitungan Korespondensi (5!)',
    question: 'Banyak korespondensi satu-satu dari dua himpunan dengan 5 anggota dihitung dengan 5!. Berapakah nilai dari 5! (5 × 4 × 3 × 2 × 1)?',
    explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120 kemungkinan pasangan. ✅'
  },
  34: {
    title: '📤 Hubungan Range dan Kodomain',
    question: 'Pernyataan: Daerah hasil (range) selalu merupakan himpunan bagian dari daerah kawan (kodomain).',
    explanation: 'Benar! Range (hasil yang terpasang) selalu berada di dalam atau sama dengan kodomain (Range ⊆ Kodomain). ✅'
  },
  35: {
    title: '✏️ Menghitung Fungsi Kuadrat Sederhana',
    question: 'Diketahui fungsi f(x) = x² + 1. Berapakah nilai dari f(2)?',
    explanation: 'Substitusi x = 2:\nf(2) = (2)² + 1 = 4 + 1 = 5. ✅'
  },
  36: {
    title: '🔍 Analisis Relasi Bukan Fungsi',
    question: 'Mengapa himpunan pasangan berurutan {(1, a), (2, b), (1, c)} BUKAN merupakan fungsi?',
    explanation: 'Elemen domain 1 berpasangan dengan a dan juga dengan c (bercabang 2 pasangan), sehingga melanggar syarat fungsi. ✅'
  },
  37: {
    title: '🧩 Syarat-Syarat Sebuah Fungsi',
    question: 'Pilihlah SEMUA syarat yang wajib dipenuhi agar suatu relasi dinyatakan sebagai fungsi!',
    explanation: 'Syarat fungsi: setiap anggota domain harus punya pasangan, tepat satu pasangan, dan tidak boleh bercabang. Kodomain boleh ada yang tidak terpasang. ✅'
  },
  38: {
    title: '📐 Mencari Nilai Koefisien a',
    question: 'Diketahui rumus fungsi f(x) = ax + b. Jika f(1) = 5 dan f(3) = 11, berapakah nilai koefisien a?',
    explanation: 'Selisih output: f(3) − f(1) = 11 − 5 = 6. Selisih input: 3 − 1 = 2. Maka a = 6 / 2 = 3. ✅'
  },
  39: {
    title: '📊 Hubungan Dua Garis Sejajar',
    question: 'Pernyataan: Dua buah grafik garis lurus yang memiliki nilai gradien sama besar dipastikan sejajar satu sama lain.',
    explanation: 'Benar! Garis dengan gradien (kemiringan) yang sama selalu sejajar (asalkan tidak berimpit). ✅'
  },
  40: {
    title: '🔢 Menghitung Gradien dari Dua Titik',
    question: 'Sebuah garis grafik fungsi melalui titik (1, 2) dan (4, 11). Berapakah gradien (m) garis tersebut?',
    explanation: 'Rumus gradien m = (y₂ − y₁) / (x₂ − x₁) = (11 − 2) / (4 − 1) = 9 / 3 = 3. ✅'
  },
  41: {
    title: '⚖️ Menentukan Range Fungsi',
    question: 'Jodohkan masing-masing himpunan pasangan fungsi dengan himpunan range (daerah hasil) yang tepat!',
    explanation: 'Range diambil hanya dari elemen kedua pasangan yang benar-benar terhubung. ✅'
  },
  42: {
    title: '📐 Menentukan Nilai Konstanta b',
    question: 'Diketahui rumus fungsi f(x) = 3x + b. Jika diketahui nilai f(2) = 10, berapakah nilai b?',
    explanation: 'f(2) = 3(2) + b = 10 ➔ 6 + b = 10 ➔ b = 10 − 6 = 4. ✅'
  },
  43: {
    title: '🏹 Pasangkan Rumus f(x) = 3x − 1',
    question: 'Tarik benang panah dari setiap x = 1, 2, 3 ke nilai bayangannya pada f(x) = 3x − 1!',
    explanation: 'f(1) = 3(1)−1 = 2, f(2) = 3(2)−1 = 5, f(3) = 3(3)−1 = 8. ✅'
  },
  44: {
    title: '📊 Titik Potong dengan Sumbu X',
    question: 'Grafik fungsi f(x) = −2x + 8 memotong sumbu X pada titik koordinat...',
    explanation: 'Potong sumbu X saat f(x) = 0:\n−2x + 8 = 0 ➔ 2x = 8 ➔ x = 4. Titik koordinatnya adalah (4, 0). ✅'
  },
  45: {
    title: '🧩 Unsur-Unsur Himpunan Pasangan',
    question: 'Diketahui fungsi f = {(2, a), (3, b), (4, c)} dengan kodomain B = {a, b, c, d}. Pilihlah SEMUA pernyataan yang BENAR!',
    explanation: 'Domain = {2, 3, 4}, Range = {a, b, c}, dan Kodomain = {a, b, c, d}. Range bukan {a, b, c, d} karena d tidak terpasang. ✅'
  },
  46: {
    title: '🔢 Menentukan Prapeta Suatu Bayangan',
    question: 'Diketahui rumus fungsi f(x) = 4x − 3. Nilai prapeta x yang menghasilkan nilai bayangan 13 adalah...',
    explanation: '4x − 3 = 13 ➔ 4x = 16 ➔ x = 4. Jadi prapeta dari 13 adalah x = 4. ✅'
  },
  47: {
    title: '📈 Analisis Arah Kemiringan Grafik',
    question: 'Pernyataan: Grafik fungsi linear f(x) = −x + 7 memiliki garis yang condong naik ke kanan.',
    explanation: 'Salah! Karena nilai gradiennya negatif (m = −1), maka grafiknya condong turun ke kanan. ✅'
  },
  48: {
    title: '📐 Menentukan Rumus dari Selisih',
    question: 'Diberikan pola nilai fungsi: saat x = 1 bernilai 5, saat x = 2 bernilai 8, dan saat x = 3 bernilai 11. Rumus fungsi f(x) yang tepat adalah...',
    explanation: 'Selisih output bertambah 3 (nilai a = 3). Saat x = 1: 3(1) + b = 5 ➔ b = 2. Rumus fungsinya f(x) = 3x + 2. ✅'
  },
  49: {
    title: '📍 Grafik Garis Linear Cartesius',
    question: 'Tandai titik potong sumbu Y (0, 1) serta titik (1, 3) dan (2, 5) untuk garis f(x) = 2x + 1 pada diagram Cartesius!',
    explanation: 'Garis f(x) = 2x + 1 memiliki gradien m = 2 dan memotong sumbu Y di titik (0, 1). ✅'
  },
  50: {
    title: '🔗 Banyak Korespondensi Satu-Satu',
    question: 'Jika n(A) = 4 dan n(B) = 4, berapakah banyak kemungkinan korespondensi satu-satu yang dapat dibentuk?',
    explanation: 'Rumus banyak korespondensi satu-satu adalah n! = 4! = 4 × 3 × 2 × 1 = 24. ✅'
  },
  51: {
    title: '📐 Menghitung Fungsi Kuadrat',
    question: 'Diketahui fungsi kuadrat f(x) = x² − 3. Berapakah nilai dari f(5)?',
    explanation: 'Substitusi x = 5:\nf(5) = (5)² − 3 = 25 − 3 = 22. ✅'
  },
  52: {
    title: '🔍 Validasi Fungsi Konstan',
    question: 'Pernyataan: Himpunan pasangan berurutan {(a, 1), (b, 1), (c, 1)} merupakan fungsi dari {a, b, c} ke {1, 2, 3}.',
    explanation: 'Benar! Setiap anggota domain {a, b, c} punya tepat satu pasangan, meskipun pasangannya sama-sama bernilai 1 (fungsi konstan). ✅'
  },
  53: {
    title: '📊 Pasangan Garis Sejajar',
    question: 'Garis grafik fungsi f(x) = 2x + 3 sejajar dengan grafik fungsi...',
    explanation: 'Syarat dua garis sejajar adalah memiliki gradien m yang sama. Fungsi g(x) = 2x − 5 memiliki gradien m = 2, sehingga sejajar. ✅'
  },
  54: {
    title: '🔢 Komposisi Fungsi Dua Langkah',
    question: 'Diketahui rumus fungsi f(x) = 2x + 1. Berapakah nilai dari f(f(1))?',
    explanation: 'Langkah 1: f(1) = 2(1) + 1 = 3.\nLangkah 2: f(3) = 2(3) + 1 = 7. Jadi f(f(1)) = 7. ✅'
  },
  55: {
    title: '✂️ Titik Potong Sumbu X',
    question: 'Jodohkan masing-masing fungsi dengan titik potongnya terhadap sumbu X!',
    explanation: 'Titik potong sumbu X dicari dengan menetapkan f(x) = 0. ✅'
  },
  56: {
    title: '🔢 Perhitungan Korespondensi (6!)',
    question: 'Pada materi korespondensi satu-satu untuk n = 6, berapakah nilai faktorial dari 6! (6 × 5 × 4 × 3 × 2 × 1)?',
    explanation: '6! = 6 × 5 × 4 × 3 × 2 × 1 = 720 kemungkinan pasangan. ✅'
  },
  57: {
    title: '📐 Menghitung Gradien Melalui Titik Pusat',
    question: 'Pernyataan: Gradien garis lurus yang melalui titik pusat (0, 0) dan titik (5, 15) adalah 3.',
    explanation: 'Benar! Gradien m = (15 − 0) / (5 − 0) = 15 / 5 = 3. ✅'
  },
  58: {
    title: '📥 Menentukan Domain dari Titik Koordinat',
    question: 'Suatu grafik fungsi memuat titik-titik koordinat (1, 3), (2, 5), dan (3, 7). Himpunan domain fungsi tersebut adalah...',
    explanation: 'Domain adalah kumpulan nilai absis (nilai x): {1, 2, 3}. ✅'
  },
  59: {
    title: '🎯 Menentukan Nilai Input x',
    question: 'Diketahui rumus fungsi f(x) = 5x − 7. Jika diketahui nilai f(x) = 18, berapakah nilai x?',
    explanation: '5x − 7 = 18 ➔ 5x = 25 ➔ x = 5. ✅'
  },
  60: {
    title: '🧩 Analisis Lengkap Grafik Linear',
    question: 'Pilihlah SEMUA pernyataan yang BENAR mengenai grafik fungsi linear f(x) = −3x + 6!',
    explanation: 'Gradien = −3 (garis turun), memotong sumbu Y di (0, 6), dan memotong sumbu X saat −3x + 6 = 0 yaitu di (2, 0). ✅'
  },
  61: {
    title: '🔢 Sifat Fungsi Satu-Satu',
    question: 'Diketahui rumus fungsi f(x) = 2x + 3. Jika diketahui f(a) = f(b), maka hubungan yang tepat adalah...',
    explanation: '2a + 3 = 2b + 3 ➔ 2a = 2b ➔ a = b. Karena fungsi linear adalah fungsi satu-satu (injektif). ✅'
  },
  62: {
    title: '📤 Perbedaan Range dan Kodomain',
    question: 'Pernyataan: Daerah hasil (range) sebuah fungsi selalu sama persis dengan daerah kawannya (kodomain).',
    explanation: 'Salah! Range adalah bagian dari kodomain. Range hanya sama dengan kodomain jika fungsinya bersifat surjektif. ✅'
  },
  63: {
    title: '📐 Sistem Dua Nilai Fungsi',
    question: 'Diketahui rumus fungsi f(x) = ax + b. Jika f(0) = 2 dan f(1) = 5, maka nilai koefisien a adalah...',
    explanation: 'f(0) = a(0) + b = 2 ➔ b = 2. Kemudian f(1) = a(1) + 2 = 5 ➔ a = 3. ✅'
  },
  64: {
    title: '🏹 Penugasan Agen Bijektif (1-ke-1)',
    question: 'Pasangkan 3 agen intelijen ke pos jaga secara bijektif: Alpha ke Pos C, Beta ke Pos A, dan Gamma ke Pos B!',
    explanation: 'Setiap agen memegang pos unik tanpa rangkap, membentuk korespondensi satu-satu sempurna. ✅'
  },
  65: {
    title: '📊 Titik Temu Dua Fungsi Linear',
    question: 'Grafik fungsi f(x) = x + 2 dan g(x) = 3x − 4 saling berpotongan pada nilai x = ...',
    explanation: 'x + 2 = 3x − 4 ➔ 2 + 4 = 3x − x ➔ 6 = 2x ➔ x = 3. ✅'
  },
  66: {
    title: '🔢 Nilai Faktorial 7!',
    question: 'Pernyataan: Banyak susunan korespondensi satu-satu untuk 7 elemen adalah 7! = 5.040.',
    explanation: 'Benar! 7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5.040. ✅'
  },
  67: {
    title: '📍 Grafik Garis Menurun Cartesius',
    question: 'Tandai titik koordinat garis f(x) = 4 − x untuk nilai input x = 1, 2, dan 3 pada bidang koordinat!',
    explanation: 'Saat x=1 ➔ y=3; saat x=2 ➔ y=2; saat x=3 ➔ y=1. Garis menurun dengan gradien m = −1. ✅'
  },
  68: {
    title: '🎯 Syarat Objek Domain Fungsi',
    question: 'Manakah di antara pilihan berikut yang MEMENUHI SYARAT sebagai domain suatu fungsi matematika?',
    explanation: 'Domain fungsi harus berupa suatu himpunan bilangan atau himpunan objek, bukan sekadar angka tunggal atau persamaan. ✅'
  },
  69: {
    title: '📊 Menghitung Gradien Negatif',
    question: 'Sebuah garis lurus melalui titik (2, 8) dan (5, 2). Berapakah nilai gradien (m) garis tersebut?',
    explanation: 'm = (2 − 8) / (5 − 2) = −6 / 3 = −2. ✅'
  },
  70: {
    title: '✍️ Cara Membaca Notasi Fungsi',
    question: 'Pernyataan: Notasi penulisan f : A → B dibaca "fungsi f memetakan himpunan A ke himpunan B".',
    explanation: 'Benar! Itulah pembacaan standar notasi fungsi matematika. ✅'
  },
  71: {
    title: '🏆 Evaluasi Nilai Fungsi Lanjutan',
    question: 'Diketahui rumus fungsi f(x) = ax + b. Jika f(2) = 8 dan f(5) = 17, berapakah nilai dari f(10)?',
    explanation: 'a = (17 − 8) / (5 − 2) = 9 / 3 = 3. f(2) = 3(2) + b = 8 ➔ b = 2. Rumus: f(x) = 3x + 2. Maka f(10) = 3(10) + 2 = 32. ✅'
  },
  72: {
    title: '🧩 Evaluasi Menyeluruh Fungsi Linear',
    question: 'Diberikan fungsi linear f(x) = 3x − 1. Pilihlah SEMUA pernyataan yang BENAR di bawah ini!',
    explanation: 'f(0) = −1, f(1) = 2, gradien = 3, dan memotong sumbu X pada (1/3, 0) saat 3x − 1 = 0. Semua pilihan benar! ✅'
  },
  73: {
    title: '📐 Menentukan Koefisien Kuadrat',
    question: 'Diketahui rumus f(x) = ax² + bx + c. Jika f(0) = 1, f(1) = 6, dan f(2) = 15, berapakah nilai koefisien a?',
    explanation: 'f(0) = c = 1. Dari f(1): a + b = 5. Dari f(2): 4a + 2b = 14 ➔ 2a + b = 7. Eliminasi: a = 2. ✅'
  },
  74: {
    title: '🔗 Evaluasi Korespondensi 7 Elemen',
    question: 'Pernyataan: Jika himpunan A dan B masing-masing memiliki 7 anggota, maka banyak kemungkinan korespondensi satu-satu yang dapat dibentuk adalah 5.040.',
    explanation: 'Benar! Banyak kemungkinan = 7! = 5.040 pasangan. ✅'
  },
  75: {
    title: '📊 Titik Potong Dua Garis',
    question: 'Garis y = 2x + 1 dan garis y = −x + 7 saling berpotongan pada titik koordinat...',
    explanation: '2x + 1 = −x + 7 ➔ 3x = 6 ➔ x = 2. Substitusi x = 2: y = 2(2) + 1 = 5. Titik potongnya adalah (2, 5). ✅'
  },
  76: {
    title: '🔢 Menghitung Nilai f(f(2))',
    question: 'Diketahui rumus fungsi f(x) = 2x − 1. Berapakah hasil perhitungan dari f(f(2))?',
    explanation: 'Langkah 1: f(2) = 2(2) − 1 = 3.\nLangkah 2: f(3) = 2(3) − 1 = 5. Jadi f(f(2)) = 5. ✅'
  },
  77: {
    title: '📐 Sistem Dua Persamaan Fungsi Linear',
    question: 'Diketahui rumus fungsi f(x) = ax + b. Jika f(−1) = 0 dan f(3) = 8, berapakah nilai dari (a + b)?',
    explanation: 'f(−1) = −a + b = 0 ➔ b = a. f(3) = 3a + b = 8 ➔ 4a = 8 ➔ a = 2, sehingga b = 2. Nilai a + b = 2 + 2 = 4. ✅'
  },
  78: {
    title: '🏹 Dekoder Kunci Brankas Bijektif',
    question: 'Sambungkan 4 kabel brankas secara bijektif: Merah ke Pin 3, Biru ke Pin 1, Hijau ke Pin 4, dan Kuning ke Pin 2!',
    explanation: 'Semua 4 kabel brankas terpasang secara tepat membentuk relasi bijektif (4!). ✅'
  },
  79: {
    title: '📊 Gradien Garis Tegak Lurus',
    question: 'Sebuah garis tegak lurus terhadap grafik fungsi f(x) = 2x + 3. Berapakah nilai gradien garis tersebut?',
    explanation: 'Syarat dua garis tegak lurus adalah m₁ × m₂ = −1. Karena m₁ = 2, maka 2 × m₂ = −1 ➔ m₂ = −1/2. ✅'
  },
  80: {
    title: '🎯 Validasi Fungsi Nilai Mutlak',
    question: 'Pernyataan: Rumus f(x) = |x| (fungsi nilai mutlak) merupakan suatu fungsi matematika yang sah.',
    explanation: 'Benar! Setiap bilangan real x yang dimasukkan memiliki tepat satu nilai mutlak sebagai outputnya. ✅'
  },
  81: {
    title: '📐 Menentukan Input Fungsi (Invers Sederhana)',
    question: 'Diketahui rumus fungsi f(x) = 3x + 6. Jika diketahui f(a) = 21, berapakah nilai a?',
    explanation: '3a + 6 = 21 ➔ 3a = 15 ➔ a = 5. ✅'
  },
  82: {
    title: '🧩 Analisis Multi Sifat Grafik Linear',
    question: 'Diberikan fungsi linear f(x) = −2x + 10. Pilihlah SEMUA pernyataan yang BENAR di bawah ini!',
    explanation: 'f(5) = −2(5)+10 = 0 (benar), grafik turun ke kanan (benar karena m=−2), memotong sumbu Y di (0, 10) (benar). Gradiennya adalah −2, bukan 2. ✅'
  },
  83: {
    title: '🔢 Menghitung Jarak Dua Titik Koordinat',
    question: 'Diketahui titik koordinat A(1, 2) dan B(4, 6). Berapakah jarak antara titik A dan titik B?',
    explanation: 'Jarak AB = √((x₂ − x₁)² + (y₂ − y₁)²) = √((4 − 1)² + (6 − 2)²) = √(9 + 16) = √25 = 5 satuan. ✅'
  },
  84: {
    title: '📊 Definisi Fungsi Injektif (Satu-Satu)',
    question: 'Pernyataan: Fungsi injektif (satu-satu) berarti tidak ada dua elemen domain berbeda yang dipetakan ke output yang sama.',
    explanation: 'Benar! Pada fungsi injektif, jika x₁ ≠ x₂, maka f(x₁) ≠ f(x₂). ✅'
  },
  85: {
    title: '📍 Korespondensi Satu-Satu Cartesius',
    question: 'Tandai 3 titik koordinat korespondensi satu-satu (setiap baris dan kolom tepat 1 titik): (1, 3), (2, 1), dan (3, 2)!',
    explanation: 'Memenuhi uji garis vertikal (fungsi) dan uji garis horizontal (korespondensi satu-satu). ✅'
  },
  86: {
    title: '🔗 Perhitungan Korespondensi (8!)',
    question: 'Berapakah banyak kemungkinan korespondensi satu-satu untuk dua himpunan beranggotakan 8 elemen (8!)?',
    explanation: '8! = 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1 = 40.320 kemungkinan pasangan. ✅'
  },
  87: {
    title: '📐 Menjodohkan Nilai Input Negatif',
    question: 'Jodohkan masing-masing fungsi di bawah ini dengan nilai f(−2) yang tepat!',
    explanation: 'f(−2) = 3(−2)+1 = −5; g(−2) = (−2)²−1 = 3; h(−2) = −2(−2)+4 = 8. ✅'
  },
  88: {
    title: '📊 Menentukan Persamaan Garis dari Titik Potong',
    question: 'Sebuah garis memotong sumbu Y di titik (0, 3) dan memiliki gradien m = 4. Persamaan fungsi garis tersebut adalah...',
    explanation: 'Bentuk y = mx + c. Karena m = 4 dan c = 3, maka persamaannya adalah y = 4x + 3. ✅'
  },
  89: {
    title: '🎯 Definisi Fungsi Surjektif (Onto)',
    question: 'Pernyataan: Fungsi surjektif (onto) berarti setiap elemen pada himpunan kodomain memiliki minimal satu pasangan dari domain (Range = Kodomain).',
    explanation: 'Benar! Pada fungsi surjektif, tidak ada satu pun anggota kodomain yang tersisa tanpa pasangan. ✅'
  },
  90: {
    title: '📐 Evaluasi Komposisi Dua Fungsi',
    question: 'Diketahui rumus f(x) = 2x + 1 dan g(x) = x − 3. Berapakah nilai dari f(g(5))?',
    explanation: 'Langkah 1: g(5) = 5 − 3 = 2.\nLangkah 2: f(2) = 2(2) + 1 = 5. Jadi f(g(5)) = 5. ✅'
  },
  91: {
    title: '📍 Garis Linear f(x) = 2x − 1',
    question: 'Pasang titik koordinat garis f(x) = 2x − 1 untuk nilai x = 1, 2, dan 3 pada bidang koordinat Cartesius!',
    explanation: 'Titik koordinatnya adalah (1, 1), (2, 3), dan (3, 5). ✅'
  },
  92: {
    title: '🧩 Analisis Korespondensi Dua Himpunan',
    question: 'Diketahui himpunan A = {1, 2, 3, 4} dan B = {a, b, c, d}. Pilihlah SEMUA pernyataan yang BENAR!',
    explanation: 'Kedua himpunan memiliki jumlah anggota yang sama (n = 4), sehingga dapat dibentuk korespondensi satu-satu sebanyak 4! = 24. Pilihan 16 salah. ✅'
  },
  93: {
    title: '📊 Persamaan Garis Tegak Lurus',
    question: 'Sebuah garis tegak lurus terhadap y = −3x + 2 dan melalui titik (0, 1). Persamaan garis tersebut adalah...',
    explanation: 'Gradien m₁ = −3 ➔ m₂ = 1/3 (karena m₁ × m₂ = −1). Melalui titik (0, 1) berarti c = 1. Jadi persamaannya y = (1/3)x + 1. ✅'
  },
  94: {
    title: '🔗 Definisi Fungsi Bijektif',
    question: 'Pernyataan: Suatu fungsi disebut fungsi bijektif jika dan hanya jika fungsi tersebut bersifat injektif (satu-satu) DAN surjektif (onto) sekaligus.',
    explanation: 'Benar! Fungsi bijektif adalah perpaduan sifat injektif dan surjektif, yang memungkinkan terbentuknya korespondensi satu-satu. ✅'
  },
  95: {
    title: '📐 Evaluasi Nilai Fungsi Faktorisasi',
    question: 'Diketahui rumus fungsi f(x) = (x + 1)(x − 2). Berapakah nilai dari f(3)?',
    explanation: 'Substitusi x = 3:\nf(3) = (3 + 1)(3 − 2) = (4)(1) = 4. ✅'
  },
  96: {
    title: '📊 Menjodohkan Istilah Penting',
    question: 'Jodohkan istilah konsep matematika di sebelah kiri dengan pasangannya yang tepat di sebelah kanan!',
    explanation: 'Domain = himpunan input fungsi, Bijektif = korespondensi satu-satu, Gradien = ukuran kemiringan garis. ✅'
  },
  97: {
    title: '🔢 Sederhanakan Pembagian Faktorial',
    question: 'Berapakah hasil perhitungan pembagian faktorial dari 9! / 7!?',
    explanation: '9! / 7! = (9 × 8 × 7!) / 7! = 9 × 8 = 72. ✅'
  },
  98: {
    title: '📐 Identitas Dua Fungsi',
    question: 'Pernyataan: Dua fungsi f(x) = 2x + 1 dan g(x) = 2x + 1 yang didefinisikan pada domain yang sama merupakan dua fungsi yang identik (sama persis).',
    explanation: 'Benar! Karena domain, kodomain, dan rumus perhitungannya persis sama, maka f dan g adalah fungsi identik. ✅'
  },
  99: {
    title: '🏆 Evaluasi Kesamaan Dua Garis Linear',
    question: 'Dua fungsi linear f(x) = ax + b dan g(x) = cx + d memiliki nilai yang sama pada dua titik berbeda, yaitu f(1) = g(1) dan f(2) = g(2). Kesimpulan yang BENAR adalah...',
    explanation: 'Dua titik unik hanya dapat dilalui oleh tepat satu garis lurus. Jika kedua fungsi linear berimpit di dua titik, maka kedua fungsi tersebut identik (f = g). ✅'
  },
  100: {
    title: '🏆 Evaluasi Pemahaman Keseluruhan',
    question: 'Evaluasi akhir materi fungsi! Pilihlah SEMUA pernyataan konsep yang BENAR di bawah ini!',
    explanation: 'Fungsi adalah relasi khusus (benar), Range selalu himpunan bagian dari Kodomain (benar), n! menyatakan banyak korespondensi satu-satu (benar). Grafik fungsi linear adalah garis lurus, bukan parabola! ✅'
  }
};

// Apply improvements
const updated = ENDLESS_QUESTIONS.map(q => {
  const imp = improvements[q.id];
  if (!imp) return q;
  return {
    ...q,
    title: imp.title || q.title,
    question: imp.question || q.question,
    explanation: imp.explanation || q.explanation
  };
});

// Format as JS file
let fileContent = `/**
 * ENDLESS MODE : BANK SOAL FUNGSI (Relasi Dihapus)
 * 100 Soal | Level: C3 (1-35) → C4 (36-70) → C5 (71-100)
 * Tipe: MCQ | MCQ_COMPLEX | TRUE_FALSE | MATCHING | ARROWS | CARTESIAN
 *
 * Semua soal tentang FUNGSI SMP Kelas 8:
 * - Pengertian & Unsur Fungsi (Domain, Kodomain, Range)
 * - Notasi & Rumus Fungsi (f(x) = ax + b)
 * - Grafik Fungsi Linear
 * - Korespondensi Satu-Satu
 */

export const ENDLESS_QUESTIONS = [

  // ══════════════════════════════════════════════════
  // C3 : APLIKASI (Soal 1-35)
  // ══════════════════════════════════════════════════

`;

updated.forEach((q, idx) => {
  if (q.id === 36) {
    fileContent += `
  // ══════════════════════════════════════════════════
  // C4 : ANALISIS (Soal 36-70)
  // ══════════════════════════════════════════════════

`;
  } else if (q.id === 71) {
    fileContent += `
  // ══════════════════════════════════════════════════
  // C5 : EVALUASI (Soal 71-100)
  // ══════════════════════════════════════════════════

`;
  }
  fileContent += `  ` + JSON.stringify(q) + (idx < updated.length - 1 ? ',' : '') + '\n';
});

fileContent += `
];
`;

fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('Successfully updated all 100 questions in endlessQuestions.js!');
