/**
 * LATIHAN CHAPTER 3: NOTASI & RUMUS FUNGSI
 * 30 Soal Interaktif + Variasi Remedial Angka Berbeda
 * Format: MCQ, TRUE_FALSE, MCQ_COMPLEX, MATCHING, ARROWS, CARTESIAN
 */

export const EXERCISE_CHAPTER_3 = [
  {
    id: 1,
    chapterId: 3,
    type: "MCQ",
    title: "🔢 Menghitung Nilai Fungsi",
    question: "Diketahui rumus fungsi f(x) = 3x + 5. Berapakah nilai dari f(4)?",
    options: ["17", "12", "15", "20"],
    correct: "17",
    correctReason: "Tepat sekali! Substitusikan x = 4 ke dalam f(x): f(4) = 3(4) + 5 = 12 + 5 = 17.",
    wrongExplanation: "Pastikan perkalian dilakukan terlebih dahulu: 3 × 4 = 12, baru kemudian dijumlahkan dengan 5 menghasilkan 17.",
    clue: "Ganti huruf x dengan angka 4: hitung 3 × 4 lalu tambah 5.",
    remedialVariant: {
      question: "Diketahui rumus fungsi f(x) = 4x + 3. Berapakah nilai dari f(5)?",
      options: ["23", "20", "25", "17"],
      correct: "23",
      correctReason: "Hebat! Substitusi x = 5: f(5) = 4(5) + 3 = 20 + 3 = 23.",
      wrongExplanation: "Kalikan 4 × 5 = 20, lalu tambah 3 = 23."
    }
  },
  {
    id: 2,
    chapterId: 3,
    type: "TRUE_FALSE",
    title: "📐 Notasi Pemetaan",
    question: "Pernyataan: Notasi pemetaan f: x ➔ 2x − 1 memiliki makna dan rumus fungsi yang sama dengan f(x) = 2x − 1.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! f: x ➔ 2x − 1 dibaca 'fungsi f memetakan x ke 2x − 1', yang bentuk rumusnya ditulis f(x) = 2x − 1.",
    wrongExplanation: "Keduanya adalah penulisan standar yang identik dalam aljabar fungsi.",
    clue: "Notasi panah f: x ➔ ... ekuivalen dengan rumus f(x) = ...",
    remedialVariant: {
      question: "Pernyataan: Notasi g: x ➔ 3x + 4 sama artinya dengan rumus g(x) = 3x + 4.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Bentuk notasi dan rumus tersebut memiliki arti matematika yang sama.",
      wrongExplanation: "Notasi panah merupakan cara lain menuliskan rumus fungsi."
    }
  },
  {
    id: 3,
    chapterId: 3,
    type: "MCQ",
    title: "➖ Nilai x Bilangan Negatif",
    question: "Diketahui fungsi f(x) = 2x − 7. Berapakah nilai dari f(−3)?",
    options: ["−13", "−1", "1", "13"],
    correct: "−13",
    correctReason: "Luar biasa! f(−3) = 2(−3) − 7 = −6 − 7 = −13. Penanganan tanda negatifmu sangat akurat!",
    wrongExplanation: "2 × (−3) = −6. Lalu −6 − 7 = −13 (bukan −1 atau +13).",
    clue: "Perkalian positif dengan negatif menghasilkan negatif: 2 × (−3) = −6.",
    remedialVariant: {
      question: "Diketahui fungsi f(x) = 3x − 4. Berapakah nilai dari f(−2)?",
      options: ["−10", "−2", "2", "10"],
      correct: "−10",
      correctReason: "Tepat! f(−2) = 3(−2) − 4 = −6 − 4 = −10.",
      wrongExplanation: "3 × (−2) = −6, lalu −6 − 4 = −10."
    }
  },
  {
    id: 4,
    chapterId: 3,
    type: "MCQ",
    title: "🔍 Mencari Nilai x",
    question: "Diketahui rumus fungsi f(x) = 4x − 5. Jika nilai f(a) = 11, maka nilai a adalah...",
    options: ["4", "3", "5", "2"],
    correct: "4",
    correctReason: "Hebat! 4a − 5 = 11 ➔ 4a = 11 + 5 = 16 ➔ a = 16 ÷ 4 = 4.",
    wrongExplanation: "Pindahkan konstanta −5 ke ruas kanan menjadi +5: 11 + 5 = 16. Lalu bagi 16 dengan koefisien 4 menghasilkan a = 4.",
    clue: "Buat persamaan: 4a − 5 = 11, lalu selesaikan untuk mencari a.",
    remedialVariant: {
      question: "Diketahui fungsi f(x) = 5x − 3. Jika f(a) = 17, berapakah nilai a?",
      options: ["4", "3", "5", "2"],
      correct: "4",
      correctReason: "Tepat! 5a − 3 = 17 ➔ 5a = 20 ➔ a = 4.",
      wrongExplanation: "5a = 17 + 3 = 20, maka a = 20 ÷ 5 = 4."
    }
  },
  {
    id: 5,
    chapterId: 3,
    type: "TRUE_FALSE",
    title: "🔢 Nilai f(0) dan Konstanta",
    question: "Pernyataan: Pada bentuk fungsi linear f(x) = ax + b, nilai dari f(0) selalu sama dengan nilai konstanta b.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Karena f(0) = a(0) + b = 0 + b = b. Ini juga merupakan titik potong garis dengan sumbu Y pada koordinat (0, b).",
    wrongExplanation: "Substitusi x = 0 selalu menghilangkan suku variabel ax, menyisakan konstanta b.",
    clue: "Apapun nilai a, jika dikalikan 0 hasilnya pasti 0.",
    remedialVariant: {
      question: "Pernyataan: Pada fungsi f(x) = 5x + 9, nilai dari f(0) adalah 9.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! f(0) = 5(0) + 9 = 9.",
      wrongExplanation: "5 dikali 0 adalah 0, ditambah 9 hasilnya tetap 9."
    }
  },
  {
    id: 6,
    chapterId: 3,
    type: "MATCHING",
    title: "🔡 Menjodohkan Nilai x dan Hasil f(x)",
    question: "Diketahui fungsi f(x) = 2x + 1. Jodohkan nilai x di kiri dengan bayangan f(x)-nya di kanan!",
    pairs: [
      { left: "x = 1", right: "3" },
      { left: "x = 3", right: "7" },
      { left: "x = 5", right: "11" }
    ],
    rightOptions: ["3", "7", "11", "15"],
    correctReason: "Sempurna! f(1) = 2(1)+1 = 3; f(3) = 2(3)+1 = 7; f(5) = 2(5)+1 = 11.",
    wrongExplanation: "Kalikan x dengan 2 lalu tambahkan 1.",
    clue: "f(1)=2+1=3; f(3)=6+1=7; f(5)=10+1=11.",
    remedialVariant: {
      question: "Jodohkan nilai x dengan fungsi f(x) = 3x − 1!",
      pairs: [
        { left: "x = 2", right: "5" },
        { left: "x = 4", right: "11" },
        { left: "x = 6", right: "17" }
      ],
      rightOptions: ["5", "11", "17", "20"],
      correctReason: "Tepat! 3(2)−1 = 5; 3(4)−1 = 11; 3(6)−1 = 17.",
      wrongExplanation: "Kalikan nilai x dengan 3 lalu kurangkan 1."
    }
  },
  {
    id: 7,
    chapterId: 3,
    type: "MCQ",
    title: "📐 Menentukan Rumus Fungsi dari Dua Nilai",
    question: "Suatu fungsi linear f(x) = ax + b memiliki nilai f(2) = 7 dan f(4) = 11. Rumus fungsi f(x) tersebut adalah...",
    options: ["f(x) = 2x + 3", "f(x) = 3x + 1", "f(x) = 2x + 5", "f(x) = 4x − 1"],
    correct: "f(x) = 2x + 3",
    correctReason: "Luar biasa! Cari nilai a: a = (11 − 7) / (4 − 2) = 4 / 2 = 2. Lalu cari b: f(2) = 2(2) + b = 7 ➔ 4 + b = 7 ➔ b = 3. Jadi f(x) = 2x + 3.",
    wrongExplanation: "Gunakan eliminasi sistem persamaan: 4a + b = 11 dan 2a + b = 7. Kurangkan: 2a = 4 ➔ a = 2. Substitusi: b = 3.",
    clue: "Cari selisih hasil f(x) dibagi selisih nilai x: (11 − 7)/(4 − 2) = 2 (nilai a).",
    remedialVariant: {
      question: "Diketahui f(1) = 5 dan f(3) = 11 pada f(x) = ax + b. Rumus fungsinya adalah...",
      options: ["f(x) = 3x + 2", "f(x) = 2x + 3", "f(x) = 4x + 1", "f(x) = 3x − 2"],
      correct: "f(x) = 3x + 2",
      correctReason: "Tepat! a = (11 − 5)/(3 − 1) = 6/2 = 3. b = 5 − 3(1) = 2 ➔ f(x) = 3x + 2.",
      wrongExplanation: "Selisih hasil fungsi adalah 6 saat x bertambah 2, sehingga a = 3 dan b = 2."
    }
  },
  {
    id: 8,
    chapterId: 3,
    type: "MCQ_COMPLEX",
    title: "☑️ Komponen Rumus f(x) = ax + b",
    question: "Pada bentuk umum rumus fungsi linear f(x) = ax + b, manakah pernyataan yang BENAR? (Pilih semua yang benar)",
    options: [
      "Nilai 'a' merupakan koefisien dari variabel x sekaligus gradien kemiringan garis",
      "Nilai 'b' merupakan suku konstanta",
      "Variabel x merupakan variabel bebas (angka asal)",
      "Variabel x wajib berpangkat dua"
    ],
    correctMultiple: [
      "Nilai 'a' merupakan koefisien dari variabel x sekaligus gradien kemiringan garis",
      "Nilai 'b' merupakan suku konstanta",
      "Variabel x merupakan variabel bebas (angka asal)"
    ],
    correctReason: "Hebat! Kamu memahami struktur aljabar fungsi linear dengan sangat baik. x berpangkat satu (bukan berpangkat dua).",
    wrongExplanation: "Fungsi linear memiliki x berpangkat 1. Jika x berpangkat dua, fungsinya menjadi fungsi kuadrat, bukan linear.",
    clue: "Fungsi linear selalu berpangkat 1 (derajat satu).",
    remedialVariant: {
      question: "Pada fungsi f(x) = 5x − 8, manakah pernyataan yang BENAR? (Pilih semua yang benar)",
      options: [
        "Koefisien variabel x adalah 5",
        "Konstanta fungsinya adalah −8",
        "Jika x = 0, maka nilainya adalah −8",
        "Gradien garisnya bernilai negatif"
      ],
      correctMultiple: [
        "Koefisien variabel x adalah 5",
        "Konstanta fungsinya adalah −8",
        "Jika x = 0, maka nilainya adalah −8"
      ],
      correctReason: "Tepat! Koefisien = 5 (positif, bukan negatif), konstanta = −8, f(0) = −8.",
      wrongExplanation: "Gradiennya bernilai positif (+5), bukan negatif."
    }
  },
  {
    id: 9,
    chapterId: 3,
    type: "ARROWS",
    title: "🏹 Sambungkan Fungsi f(x) = 3x − 2",
    question: "Hubungkan setiap elemen domain A = {1, 2, 3} ke bayangannya pada B dengan rumus f(x) = 3x − 2!",
    setA: [1, 2, 3],
    setB: [1, 4, 7],
    correctPairs: ["1->1", "2->4", "3->7"],
    correctReason: "Mantap! f(1) = 3(1)−2 = 1; f(2) = 3(2)−2 = 4; f(3) = 3(3)−2 = 7.",
    wrongExplanation: "3(1)−2 = 1 ➔ 1 ke 1; 3(2)−2 = 4 ➔ 2 ke 4; 3(3)−2 = 7 ➔ 3 ke 7.",
    clue: "Kalikan nilai di A dengan 3, lalu kurangkan 2.",
    remedialVariant: {
      question: "Hubungkan fungsi f(x) = 2x + 3 dari A = {1, 2, 3} ke B = {5, 7, 9}!",
      setA: [1, 2, 3],
      setB: [5, 7, 9],
      correctPairs: ["1->5", "2->7", "3->9"],
      correctReason: "Tepat! 2(1)+3 = 5; 2(2)+3 = 7; 2(3)+3 = 9.",
      wrongExplanation: "Kalikan nilai di A dengan 2 lalu tambah 3."
    }
  },
  {
    id: 10,
    chapterId: 3,
    type: "MCQ",
    title: "🔢 Menghitung f(p + 1)",
    question: "Diketahui rumus fungsi f(x) = 2x + 3. Bentuk aljabar dari f(p + 1) adalah...",
    options: ["2p + 5", "2p + 4", "2p + 3", "2p + 1"],
    correct: "2p + 5",
    correctReason: "Bagus sekali! Ganti x dengan (p + 1): f(p + 1) = 2(p + 1) + 3 = 2p + 2 + 3 = 2p + 5.",
    wrongExplanation: "Gunakan sifat distributif perkalian: 2 × (p + 1) = 2p + 2. Lalu tambahkan 3 sehingga menghasilkan 2p + 5.",
    clue: "Substitusikan (p + 1) ke posisi x, lalu buka tanda kurungnya.",
    remedialVariant: {
      question: "Diketahui f(x) = 3x + 2. Bentuk aljabar dari f(k + 2) adalah...",
      options: ["3k + 8", "3k + 6", "3k + 4", "3k + 5"],
      correct: "3k + 8",
      correctReason: "Tepat! 3(k + 2) + 2 = 3k + 6 + 2 = 3k + 8.",
      wrongExplanation: "3(k + 2) = 3k + 6, ditambah 2 menjadi 3k + 8."
    }
  },
  {
    id: 11,
    chapterId: 3,
    type: "CARTESIAN",
    title: "📍 Plot Fungsi f(x) = 2x − 1",
    question: "Tandai titik-titik koordinat fungsi f(x) = 2x − 1 untuk domain x ∈ {1, 2, 3} pada bidang Cartesius!",
    minX: 0,
    maxX: 5,
    minY: 0,
    maxY: 7,
    targetPoints: [[1, 1], [2, 3], [3, 5]],
    correctReason: "Hebat! Titik (1, 1), (2, 3), dan (3, 5) telah terplot dengan sangat rapi.",
    wrongExplanation: "Saat x=1 ➔ 2(1)−1=1; saat x=2 ➔ 2(2)−1=3; saat x=3 ➔ 2(3)−1=5. Tandai (1, 1), (2, 3), dan (3, 5).",
    clue: "Koordinat titiknya adalah: (1, 1), (2, 3), dan (3, 5).",
    remedialVariant: {
      question: "Plot titik fungsi f(x) = 2x + 1 untuk x ∈ {1, 2, 3} pada Cartesius!",
      minX: 0,
      maxX: 5,
      minY: 0,
      maxY: 8,
      targetPoints: [[1, 3], [2, 5], [3, 7]],
      correctReason: "Tepat! f(1)=3, f(2)=5, f(3)=7 ➔ titik (1, 3), (2, 5), dan (3, 7).",
      wrongExplanation: "Tandai koordinat (1, 3), (2, 5), dan (3, 7)."
    }
  },
  {
    id: 12,
    chapterId: 3,
    type: "TRUE_FALSE",
    title: "➕ Penjumlahan Nilai Fungsi",
    question: "Pernyataan: Jika f(x) = 4x − 1, maka nilai dari f(2) + f(3) adalah 18.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! f(2) = 4(2) − 1 = 7. f(3) = 4(3) − 1 = 11. Maka f(2) + f(3) = 7 + 11 = 18.",
    wrongExplanation: "f(2) = 7 dan f(3) = 11. Jumlahnya 7 + 11 = 18.",
    clue: "Hitung nilai f(2) dan f(3) secara terpisah, lalu jumlahkan hasilnya.",
    remedialVariant: {
      question: "Pernyataan: Jika f(x) = 3x + 2, maka nilai dari f(1) + f(2) adalah 13.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! f(1) = 5 dan f(2) = 8. Maka 5 + 8 = 13.",
      wrongExplanation: "f(1) = 3(1)+2 = 5; f(2) = 3(2)+2 = 8. Jumlahnya 5 + 8 = 13."
    }
  },
  {
    id: 13,
    chapterId: 3,
    type: "MCQ",
    title: "🔢 Koefisien Negatif",
    question: "Diketahui rumus fungsi f(x) = −3x + 8. Berapakah nilai dari f(4)?",
    options: ["−4", "4", "−20", "20"],
    correct: "−4",
    correctReason: "Sangat tepat! f(4) = −3(4) + 8 = −12 + 8 = −4.",
    wrongExplanation: "−3 × 4 = −12. Lalu −12 + 8 = −4 (bukan +4 atau −20).",
    clue: "Ingat: perkalian tanda negatif dengan positif adalah negatif (−12), lalu tambah 8.",
    remedialVariant: {
      question: "Diketahui f(x) = −2x + 10. Berapakah nilai dari f(6)?",
      options: ["−2", "2", "−22", "22"],
      correct: "−2",
      correctReason: "Tepat! −2(6) + 10 = −12 + 10 = −2.",
      wrongExplanation: "−2 × 6 = −12, ditambah 10 menghasilkan −2."
    }
  },
  {
    id: 14,
    chapterId: 3,
    type: "MCQ",
    title: "🔍 Nilai x saat Hasil f(x) = 0",
    question: "Diketahui fungsi f(x) = 5x − 15. Untuk nilai x berapakah nilai f(x) = 0?",
    options: ["x = 3", "x = −3", "x = 5", "x = 0"],
    correct: "x = 3",
    correctReason: "Mantap! 5x − 15 = 0 ➔ 5x = 15 ➔ x = 15 ÷ 5 = 3.",
    wrongExplanation: "Pindahkan −15 ke kanan menjadi +15. Maka 5x = 15, sehingga x = 3.",
    clue: "Buat persamaan 5x − 15 = 0.",
    remedialVariant: {
      question: "Diketahui fungsi f(x) = 4x − 20. Nilai x agar f(x) = 0 adalah...",
      options: ["x = 5", "x = −5", "x = 4", "x = 10"],
      correct: "x = 5",
      correctReason: "Tepat! 4x − 20 = 0 ➔ 4x = 20 ➔ x = 5.",
      wrongExplanation: "4x = 20, sehingga x = 5."
    }
  },
  {
    id: 15,
    chapterId: 3,
    type: "MATCHING",
    title: "🧩 Menjodohkan Nilai Fungsi Berkoefisien Negatif",
    question: "Diketahui rumus f(x) = 10 − 2x. Jodohkan nilai x di sebelah kiri dengan nilai f(x) di sebelah kanan!",
    pairs: [
      { left: "x = 1", right: "8" },
      { left: "x = 3", right: "4" },
      { left: "x = 5", right: "0" }
    ],
    rightOptions: ["8", "4", "0", "-2"],
    correctReason: "Hebat! 10 − 2(1) = 8; 10 − 2(3) = 4; 10 − 2(5) = 0.",
    wrongExplanation: "Kurangkan 10 dengan hasil perkalian 2 × x.",
    clue: "Hitung 10 dikurangi (2 × x).",
    remedialVariant: {
      question: "Jodohkan nilai x dengan fungsi f(x) = 12 − 3x!",
      pairs: [
        { left: "x = 1", right: "9" },
        { left: "x = 2", right: "6" },
        { left: "x = 4", right: "0" }
      ],
      rightOptions: ["9", "6", "0", "-3"],
      correctReason: "Tepat! 12 − 3(1)=9; 12 − 3(2)=6; 12 − 3(4)=0.",
      wrongExplanation: "Hitung 12 dikurangi 3x."
    }
  },
  {
    id: 16,
    chapterId: 3,
    type: "MCQ_COMPLEX",
    title: "☑️ Evaluasi f(x) = 2x + 6",
    question: "Diberikan rumus fungsi f(x) = 2x + 6. Manakah pernyataan yang BENAR? (Pilih semua yang benar)",
    options: [
      "Nilai dari f(0) adalah 6",
      "Nilai dari f(−3) adalah 0",
      "Nilai dari f(2) adalah 10",
      "Nilai dari f(1) adalah 7"
    ],
    correctMultiple: [
      "Nilai dari f(0) adalah 6",
      "Nilai dari f(−3) adalah 0",
      "Nilai dari f(2) adalah 10"
    ],
    correctReason: "Bagus! f(0) = 6, f(−3) = 2(−3)+6 = 0, f(2) = 2(2)+6 = 10. Sedangkan f(1) = 2(1)+6 = 8 (bukan 7).",
    wrongExplanation: "f(1) = 2(1) + 6 = 8, jadi pernyataan f(1) = 7 adalah salah.",
    clue: "Uji nilai masing-masing pilihan dengan rumus f(x) = 2x + 6.",
    remedialVariant: {
      question: "Diberikan f(x) = 3x − 6. Manakah yang BENAR? (Pilih semua yang benar)",
      options: [
        "f(2) = 0",
        "f(0) = −6",
        "f(3) = 3",
        "f(1) = 3"
      ],
      correctMultiple: [
        "f(2) = 0",
        "f(0) = −6",
        "f(3) = 3"
      ],
      correctReason: "Tepat! 3(2)−6 = 0, 3(0)−6 = −6, 3(3)−6 = 3. Sedangkan f(1) = −3.",
      wrongExplanation: "f(1) bernilai −3, bukan 3."
    }
  },
  {
    id: 17,
    chapterId: 3,
    type: "TRUE_FALSE",
    title: "📐 Mencari Nilai a dari Dua Titik",
    question: "Pernyataan: Pada fungsi linear f(x) = ax + b, nilai a selalu dapat dihitung dengan rumus selisih: a = [f(x₂) − f(x₁)] / (x₂ − x₁).",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar sekali! Nilai koefisien a sama dengan gradien garis, yaitu laju perubahan nilai f(x) dibagi perubahan nilai x (Δy / Δx).",
    wrongExplanation: "Rumus kemiringan gradien dan koefisien fungsi linear memang a = Δf(x) / Δx.",
    clue: "Koefisien a adalah laju perubahan nilai fungsi per satuan x.",
    remedialVariant: {
      question: "Pernyataan: Koefisien a pada f(x) = ax + b menunjukkan seberapa besar perubahan hasil f(x) setiap nilai x bertambah satu satuan.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Koefisien a menunjukkan laju perubahan hasil fungsi setiap nilai x bertambah 1.",
      wrongExplanation: "Itulah definisi dasar dari gradien/kemiringan fungsi linear."
    }
  },
  {
    id: 18,
    chapterId: 3,
    type: "MCQ",
    title: "🔢 Mencari Konstanta b",
    question: "Suatu fungsi f(x) = 3x + b memiliki nilai f(2) = 11. Berapakah nilai konstanta b?",
    options: ["5", "6", "4", "3"],
    correct: "5",
    correctReason: "Tepat! f(2) = 3(2) + b = 11 ➔ 6 + b = 11 ➔ b = 11 − 6 = 5.",
    wrongExplanation: "3 × 2 = 6. Maka b = 11 − 6 = 5.",
    clue: "Substitusi x = 2 ke rumus 3x + b, lalu samakan dengan 11.",
    remedialVariant: {
      question: "Suatu fungsi f(x) = 4x + b memiliki nilai f(3) = 19. Berapakah nilai b?",
      options: ["7", "6", "5", "8"],
      correct: "7",
      correctReason: "Tepat! 4(3) + b = 19 ➔ 12 + b = 19 ➔ b = 7.",
      wrongExplanation: "12 + b = 19, maka b = 19 − 12 = 7."
    }
  },
  {
    id: 19,
    chapterId: 3,
    type: "MCQ",
    title: "🪞 Bayangan Suatu Nilai",
    question: "Diketahui f(x) = 5 − 3x. Bayangan dari −2 oleh fungsi f adalah...",
    options: ["11", "−1", "1", "−11"],
    correct: "11",
    correctReason: "Luar biasa! Mencari bayangan sama dengan menghitung nilai f(−2): f(−2) = 5 − 3(−2) = 5 − (−6) = 5 + 6 = 11.",
    wrongExplanation: "Perhatikan tanda negatif: −3 × (−2) = +6. Maka 5 + 6 = 11 (bukan −1).",
    clue: "Pengurangan dengan bilangan negatif berubah menjadi penjumlahan: 5 − (−6) = 5 + 6.",
    remedialVariant: {
      question: "Diketahui f(x) = 7 − 2x. Bayangan dari −3 oleh fungsi f adalah...",
      options: ["13", "1", "−13", "10"],
      correct: "13",
      correctReason: "Tepat! 7 − 2(−3) = 7 + 6 = 13.",
      wrongExplanation: "7 − (−6) = 7 + 6 = 13."
    }
  },
  {
    id: 20,
    chapterId: 3,
    type: "ARROWS",
    title: "🏹 Sambungkan Fungsi f(x) = x + 4",
    question: "Hubungkan domain A = {2, 4, 6} ke kodomain B dengan aturan f(x) = x + 4!",
    setA: [2, 4, 6],
    setB: [6, 8, 10],
    correctPairs: ["2->6", "4->8", "6->10"],
    correctReason: "Bagus! 2+4 = 6; 4+4 = 8; 6+4 = 10. Diagram panah tersambung sempurna.",
    wrongExplanation: "Tambahkan 4 pada setiap angka di himpunan A.",
    clue: "2➔6, 4➔8, 6➔10.",
    remedialVariant: {
      question: "Hubungkan fungsi f(x) = x + 5 dari A = {1, 3, 5} ke B = {6, 8, 10}!",
      setA: [1, 3, 5],
      setB: [6, 8, 10],
      correctPairs: ["1->6", "3->8", "5->10"],
      correctReason: "Tepat! 1+5 = 6; 3+5 = 8; 5+5 = 10.",
      wrongExplanation: "Tambahkan 5 pada setiap angka asal."
    }
  },
  {
    id: 21,
    chapterId: 3,
    type: "MCQ",
    title: "🔍 Mengidentifikasi Nilai Fungsi Pecahan",
    question: "Diketahui rumus fungsi f(x) = (1/2)x + 3. Nilai dari f(8) adalah...",
    options: ["7", "4", "11", "5"],
    correct: "7",
    correctReason: "Mantap! f(8) = (1/2) × 8 + 3 = 4 + 3 = 7.",
    wrongExplanation: "Setengah dari 8 adalah 4. Lalu 4 + 3 = 7.",
    clue: "Bagi 8 dengan 2, lalu tambahkan 3.",
    remedialVariant: {
      question: "Diketahui rumus f(x) = (1/3)x + 5. Nilai dari f(9) adalah...",
      options: ["8", "6", "3", "12"],
      correct: "8",
      correctReason: "Tepat! (1/3) × 9 + 5 = 3 + 5 = 8.",
      wrongExplanation: "9 dibagi 3 adalah 3, ditambah 5 hasilnya 8."
    }
  },
  {
    id: 22,
    chapterId: 3,
    type: "TRUE_FALSE",
    title: "📌 Fungsi f(x) = c",
    question: "Pernyataan: Jika rumus fungsi f(x) = 9 (fungsi konstan), maka f(100) tetap bernilai 9.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Karena fungsi tidak memuat variabel x, berapapun nilai x yang dimasukkan, hasilnya selalu tetap 9.",
    wrongExplanation: "Fungsi konstan tidak berubah nilainya berapapun nilai x yang disubstitusikan.",
    clue: "Tidak ada variabel x pada rumus f(x) = 9.",
    remedialVariant: {
      question: "Pernyataan: Pada fungsi konstan f(x) = 15, nilai dari f(0) dan f(50) adalah sama.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Keduanya menghasilkan angka hasil yang sama, yaitu 15.",
      wrongExplanation: "Fungsi konstan menghasilkan nilai yang sama untuk semua nilai x."
    }
  },
  {
    id: 23,
    chapterId: 3,
    type: "MCQ",
    title: "🔢 Selisih Dua Nilai Fungsi",
    question: "Diketahui f(x) = 3x − 2. Nilai dari f(5) − f(2) adalah...",
    options: ["9", "13", "4", "7"],
    correct: "9",
    correctReason: "Hebat! f(5) = 3(5) − 2 = 13. f(2) = 3(2) − 2 = 4. Maka f(5) − f(2) = 13 − 4 = 9.",
    wrongExplanation: "13 − 4 = 9. Perhatikan bahwa selisihnya juga dapat dihitung dari a × (5 − 2) = 3 × 3 = 9.",
    clue: "Hitung f(5) = 13 dan f(2) = 4, lalu kurangkan keduanya.",
    remedialVariant: {
      question: "Diketahui f(x) = 4x + 1. Nilai dari f(4) − f(1) adalah...",
      options: ["12", "17", "5", "8"],
      correct: "12",
      correctReason: "Tepat! f(4) = 17 dan f(1) = 5. Selisihnya 17 − 5 = 12.",
      wrongExplanation: "f(4) − f(1) = 17 − 5 = 12."
    }
  },
  {
    id: 24,
    chapterId: 3,
    type: "MCQ_COMPLEX",
    title: "☑️ Nilai Pembuat Nol Fungsi",
    question: "Nilai x yang menyebabkan f(x) bernilai 0 disebut pembuat nol fungsi. Manakah pasangan fungsi dan pembuat nolnya yang BENAR? (Pilih semua yang benar)",
    options: [
      "f(x) = 2x − 6, pembuat nolnya adalah x = 3",
      "f(x) = 3x + 9, pembuat nolnya adalah x = −3",
      "f(x) = 4x − 8, pembuat nolnya adalah x = 2",
      "f(x) = 5x + 10, pembuat nolnya adalah x = 2"
    ],
    correctMultiple: [
      "f(x) = 2x − 6, pembuat nolnya adalah x = 3",
      "f(x) = 3x + 9, pembuat nolnya adalah x = −3",
      "f(x) = 4x − 8, pembuat nolnya adalah x = 2"
    ],
    correctReason: "Luar biasa! 2(3)−6=0; 3(−3)+9=0; 4(2)−8=0. Sedangkan untuk 5x + 10 = 0, nilai x yang benar adalah −2 (bukan +2).",
    wrongExplanation: "5(2) + 10 = 20 (bukan 0). Pembuat nol dari 5x + 10 adalah x = −2.",
    clue: "Substitusikan nilai x yang diberikan ke dalam fungsi dan periksa apakah hasilnya benar-benar 0.",
    remedialVariant: {
      question: "Manakah pembuat nol fungsi yang BENAR? (Pilih semua yang benar)",
      options: [
        "f(x) = x − 7 memiliki pembuat nol x = 7",
        "f(x) = 2x + 8 memiliki pembuat nol x = −4",
        "f(x) = 3x − 12 memiliki pembuat nol x = 4",
        "f(x) = 2x + 6 memiliki pembuat nol x = 3"
      ],
      correctMultiple: [
        "f(x) = x − 7 memiliki pembuat nol x = 7",
        "f(x) = 2x + 8 memiliki pembuat nol x = −4",
        "f(x) = 3x − 12 memiliki pembuat nol x = 4"
      ],
      correctReason: "Tepat! Semuanya menghasilkan 0 kecuali opsi terakhir yang menghasilkan 12.",
      wrongExplanation: "2(3) + 6 = 12 (bukan 0). Pembuat nolnya adalah x = −3."
    }
  },
  {
    id: 25,
    chapterId: 3,
    type: "MCQ",
    title: "📐 Rumus Fungsi dari Tabel Nilai",
    question: "Diberikan tabel nilai: saat x = 1, f(x) = 4; saat x = 2, f(x) = 7; saat x = 3, f(x) = 10. Rumus fungsi f(x) yang tepat adalah...",
    options: ["f(x) = 3x + 1", "f(x) = 4x", "f(x) = 2x + 2", "f(x) = 3x − 1"],
    correct: "f(x) = 3x + 1",
    correctReason: "Sangat tepat! Nilai f(x) bertambah 3 setiap x bertambah 1, jadi koefisien a = 3. Saat x = 1: 3(1) + b = 4 ➔ b = 1. Rumusnya f(x) = 3x + 1.",
    wrongExplanation: "Cek uji coba: 3(1) + 1 = 4; 3(2) + 1 = 7; 3(3) + 1 = 10. Semua cocok dengan tabel!",
    clue: "Perhatikan selisih nilai f(x): bertambah 3 secara teratur.",
    remedialVariant: {
      question: "Tabel nilai fungsi: x=1 ➔ f(x)=5; x=2 ➔ f(x)=9; x=3 ➔ f(x)=13. Rumus fungsinya adalah...",
      options: ["f(x) = 4x + 1", "f(x) = 5x", "f(x) = 3x + 2", "f(x) = 4x − 1"],
      correct: "f(x) = 4x + 1",
      correctReason: "Tepat! Selisih = 4 ➔ a = 4. 4(1) + b = 5 ➔ b = 1 ➔ f(x) = 4x + 1.",
      wrongExplanation: "Nilai f(x) bertambah 4 setiap x naik 1, sehingga a = 4 dan b = 1."
    }
  },
  {
    id: 26,
    chapterId: 3,
    type: "TRUE_FALSE",
    title: "🔢 Fungsi Kuadratik",
    question: "Pernyataan: Pada fungsi f(x) = x² + 2, bayangan dari x = −3 adalah 11.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! (−3)² + 2 = 9 + 2 = 11.",
    wrongExplanation: "(−3)² = 9. Lalu 9 + 2 = 11.",
    clue: "Kuadrat dari −3 adalah positif 9.",
    remedialVariant: {
      question: "Pernyataan: Pada fungsi f(x) = x² + 3, nilai dari f(−4) adalah 19.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! (−4)² + 3 = 16 + 3 = 19.",
      wrongExplanation: "(−4)² = 16, ditambah 3 hasilnya 19."
    }
  },
  {
    id: 27,
    chapterId: 3,
    type: "MCQ",
    title: "🔍 Persamaan Fungsi Linear Dua Variabel",
    question: "Diketahui f(x) = ax + b. Jika f(3) = 11 dan f(1) = 5, maka nilai dari a + b adalah...",
    options: ["5", "3", "2", "8"],
    correct: "5",
    correctReason: "Luar biasa! a = (11 − 5)/(3 − 1) = 6/2 = 3. b = 5 − 3(1) = 2. Maka nilai a + b = 3 + 2 = 5.",
    wrongExplanation: "a = 3 dan b = 2. Pertanyaannya adalah nilai a + b = 3 + 2 = 5.",
    clue: "Cari nilai a dan b terlebih dahulu, lalu jumlahkan a + b.",
    remedialVariant: {
      question: "Diketahui f(x) = ax + b dengan f(2) = 10 dan f(1) = 6. Berapakah nilai a + b?",
      options: ["6", "4", "2", "8"],
      correct: "6",
      correctReason: "Tepat! a = (10 − 6)/(2 − 1) = 4. b = 6 − 4(1) = 2. Maka a + b = 4 + 2 = 6.",
      wrongExplanation: "a = 4 dan b = 2, sehingga a + b = 6."
    }
  },
  {
    id: 28,
    chapterId: 3,
    type: "MATCHING",
    title: "🧩 Menjodohkan Nilai x dari f(x) Diketahui",
    question: "Diketahui f(x) = 2x + 4. Jodohkan nilai f(x) di kiri dengan nilai x yang sesuai di kanan!",
    pairs: [
      { left: "f(x) = 10", right: "x = 3" },
      { left: "f(x) = 14", right: "x = 5" },
      { left: "f(x) = 0", right: "x = -2" }
    ],
    rightOptions: ["x = 3", "x = 5", "x = -2", "x = 2"],
    correctReason: "Bagus! 2x + 4 = 10 ➔ x = 3; 2x + 4 = 14 ➔ x = 5; 2x + 4 = 0 ➔ x = −2.",
    wrongExplanation: "Kurangkan 4 lalu bagi 2 untuk mencari x.",
    clue: "x = (f(x) − 4) / 2.",
    remedialVariant: {
      question: "Jodohkan nilai f(x) dengan nilai x pada f(x) = 3x + 6!",
      pairs: [
        { left: "f(x) = 15", right: "x = 3" },
        { left: "f(x) = 21", right: "x = 5" },
        { left: "f(x) = 0", right: "x = -2" }
      ],
      rightOptions: ["x = 3", "x = 5", "x = -2", "x = 1"],
      correctReason: "Tepat! 3(3)+6 = 15; 3(5)+6 = 21; 3(−2)+6 = 0.",
      wrongExplanation: "x = (f(x) − 6) / 3."
    }
  },
  {
    id: 29,
    chapterId: 3,
    type: "MCQ",
    title: "🔢 Substitusi Nilai Variabel Pecahan",
    question: "Diketahui rumus fungsi f(x) = 6x − 2. Nilai dari f(1/3) adalah...",
    options: ["0", "2", "4", "−1"],
    correct: "0",
    correctReason: "Tepat! f(1/3) = 6 × (1/3) − 2 = 2 − 2 = 0.",
    wrongExplanation: "6 × 1/3 = 2. Kemudian 2 − 2 = 0.",
    clue: "6 dibagi 3 adalah 2, lalu kurangkan 2.",
    remedialVariant: {
      question: "Diketahui f(x) = 8x − 3. Nilai dari f(1/4) adalah...",
      options: ["−1", "1", "0", "2"],
      correct: "−1",
      correctReason: "Tepat! 8 × (1/4) − 3 = 2 − 3 = −1.",
      wrongExplanation: "8 × 1/4 = 2, lalu 2 − 3 = −1."
    }
  },
  {
    id: 30,
    chapterId: 3,
    type: "MCQ",
    title: "🏆 Rangkuman Notasi & Rumus Fungsi",
    question: "Secara esensi, apa peran utama rumus fungsi f(x) = ax + b dalam matematika?",
    options: [
      "Sebagai aturan pasti yang mengubah nilai x menjadi nilai hasil bayangannya",
      "Sebagai rumus penjumlahan deret bilangan bulat",
      "Hanya sebagai lambang hiasan tanpa kegunaan praktis",
      "Untuk menghitung luas daerah segitiga"
    ],
    correct: "Sebagai aturan pasti yang mengubah nilai x menjadi nilai hasil bayangannya",
    correctReason: "Sempurna! Kamu telah menyelesaikan seluruh latihan Chapter 3 dengan pemahaman rumus dan notasi fungsi yang luar biasa kuat!",
    wrongExplanation: "Rumus fungsi adalah aturan pemrosesan yang pasti untuk memasangkan nilai x ke hasil f(x).",
    clue: "Rumus fungsi mengolah nilai x menjadi angka hasil yang terukur pasti.",
    remedialVariant: {
      question: "Mengapa rumus fungsi f(x) sangat berguna dalam ilmu pengetahuan?",
      options: [
        "Karena memungkinkan kita menghitung nilai hasil untuk nilai x apa pun secara pasti",
        "Karena membuat rumus menjadi lebih panjang dan rumit",
        "Hanya digunakan untuk menggambar tanpa makna",
        "Tidak memiliki kegunaan nyata"
      ],
      correct: "Karena memungkinkan kita menghitung nilai hasil untuk nilai x apa pun secara pasti",
      correctReason: "Luar biasa! Pemahaman konsep rumus fungsimu sudah sangat sempurna!",
      wrongExplanation: "Rumus fungsi memungkinkan perhitungan hasil secara akurat dari nilai x yang diberikan."
    }
  }
];
