/**
 * LATIHAN CHAPTER 4: GRAFIK FUNGSI LINEAR
 * 30 Soal Interaktif + Variasi Remedial Angka Berbeda
 * Format: MCQ, TRUE_FALSE, MCQ_COMPLEX, MATCHING, ARROWS, CARTESIAN
 */

export const EXERCISE_CHAPTER_4 = [
  {
    id: 1,
    chapterId: 4,
    type: "MCQ",
    title: "📈 Bentuk Grafik Fungsi Linear",
    question: "Bagaimanakah bentuk visual grafik dari fungsi linear f(x) = ax + b pada koordinat Cartesius?",
    options: [
      "Selalu berupa garis lurus",
      "Berupa kurva parabola melengkung",
      "Berupa lingkaran tertutup",
      "Berupa garis gelombang naik-turun"
    ],
    correct: "Selalu berupa garis lurus",
    correctReason: "Tepat sekali! Karena variabel x berpangkat satu (linear), grafik dari fungsi linear f(x) = ax + b selalu membentuk satu garis lurus sempurna.",
    wrongExplanation: "Kurva parabola adalah grafik fungsi kuadrat (x²), bukan linear. Fungsi linear selalu berupa garis lurus.",
    clue: "Kata 'linear' berhubungan langsung dengan 'garis lurus'.",
    remedialVariant: {
      question: "Grafik dari fungsi f(x) = 2x + 4 pada bidang koordinat selalu berbentuk...",
      options: [
        "Garis lurus",
        "Kurva melengkung ke atas",
        "Lingkaran",
        "Titik acak tanpa pola"
      ],
      correct: "Garis lurus",
      correctReason: "Benar! Semua fungsi linear membentuk garis lurus.",
      wrongExplanation: "Grafik fungsi berderajat 1 selalu berupa garis lurus."
    }
  },
  {
    id: 2,
    chapterId: 4,
    type: "TRUE_FALSE",
    title: "📍 Titik Potong Sumbu Y",
    question: "Pernyataan: Grafik fungsi linear f(x) = ax + b selalu memotong sumbu Y di titik koordinat (0, b).",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Titik potong sumbu Y terjadi ketika nilai x = 0. f(0) = a(0) + b = b, sehingga titik koordinatnya selalu (0, b).",
    wrongExplanation: "Pernyataan ini bernilai benar. Nilai konstanta b secara langsung adalah nilai y pada titik potong sumbu Y.",
    clue: "Masukkan nilai x = 0, maka y = b.",
    remedialVariant: {
      question: "Pernyataan: Titik potong grafik f(x) = 3x + 8 dengan sumbu Y adalah (0, 8).",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Saat x = 0, f(0) = 8, sehingga titik potongnya adalah (0, 8).",
      wrongExplanation: "Konstanta 8 adalah nilai y saat x = 0."
    }
  },
  {
    id: 3,
    chapterId: 4,
    type: "MCQ",
    title: "🎯 Menentukan Titik Potong Sumbu Y",
    question: "Grafik fungsi linear f(x) = 3x − 6 memotong sumbu Y pada titik koordinat...",
    options: ["(0, −6)", "(0, 6)", "(−6, 0)", "(2, 0)"],
    correct: "(0, −6)",
    correctReason: "Hebat! Saat memotong sumbu Y, nilai x = 0: f(0) = 3(0) − 6 = −6. Titik koordinatnya adalah (0, −6).",
    wrongExplanation: "Titik potong sumbu Y memiliki nilai x = 0, jadi bentuknya (0, y). Jangan tertukar dengan titik potong sumbu X (2, 0).",
    clue: "Titik potong sumbu Y selalu memiliki nilai x = 0. Jadi koordinatnya (0, konstanta).",
    remedialVariant: {
      question: "Grafik fungsi f(x) = 2x − 8 memotong sumbu Y di titik...",
      options: ["(0, −8)", "(0, 8)", "(−8, 0)", "(4, 0)"],
      correct: "(0, −8)",
      correctReason: "Tepat! Titik potong sumbu Y adalah (0, −8).",
      wrongExplanation: "f(0) = −8, sehingga titik koordinatnya (0, −8)."
    }
  },
  {
    id: 4,
    chapterId: 4,
    type: "MCQ",
    title: "📐 Titik Potong Sumbu X",
    question: "Grafik fungsi f(x) = 2x − 6 memotong sumbu X pada titik koordinat...",
    options: ["(3, 0)", "(0, 3)", "(0, −6)", "(−3, 0)"],
    correct: "(3, 0)",
    correctReason: "Luar biasa! Titik potong sumbu X terjadi saat f(x) = 0: 2x − 6 = 0 ➔ 2x = 6 ➔ x = 3. Jadi titik koordinatnya adalah (3, 0).",
    wrongExplanation: "Syarat memotong sumbu X adalah y = 0. 2x − 6 = 0 menghasilkan x = 3, sehingga titiknya (3, 0).",
    clue: "Jadikan f(x) = 0, lalu cari nilai x.",
    remedialVariant: {
      question: "Grafik fungsi f(x) = 3x − 12 memotong sumbu X di titik...",
      options: ["(4, 0)", "(0, 4)", "(0, −12)", "(−4, 0)"],
      correct: "(4, 0)",
      correctReason: "Tepat! 3x − 12 = 0 ➔ 3x = 12 ➔ x = 4. Titiknya (4, 0).",
      wrongExplanation: "3x = 12, maka x = 4, jadi koordinatnya (4, 0)."
    }
  },
  {
    id: 5,
    chapterId: 4,
    type: "TRUE_FALSE",
    title: "📈 Kemiringan Gradien Positif",
    question: "Pernyataan: Jika nilai gradien kemiringan (a) pada f(x) = ax + b bernilai positif (a > 0), maka garis grafik akan miring naik dari kiri bawah ke kanan atas.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Gradien positif (a > 0) menandakan bahwa seiring bertambahnya nilai x, nilai y juga ikut bertambah (grafik menanjak naik).",
    wrongExplanation: "Pernyataan ini bernilai benar. Garis dengan gradien positif selalu condong menanjak ke kanan atas.",
    clue: "Gradien positif = grafik menanjak naik dari kiri ke kanan.",
    remedialVariant: {
      question: "Pernyataan: Grafik fungsi f(x) = −2x + 5 condong menurun dari kiri atas ke kanan bawah.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Karena gradiennya negatif (−2), grafiknya condong menurun.",
      wrongExplanation: "Gradien negatif selalu menghasilkan garis menurun seiring bertambahnya x."
    }
  },
  {
    id: 6,
    chapterId: 4,
    type: "MATCHING",
    title: "🔡 Menjodohkan Titik Potong",
    question: "Diberikan f(x) = 2x − 4. Jodohkan jenis titik potong di kiri dengan titik koordinatnya yang tepat di kanan!",
    pairs: [
      { left: "Titik potong sumbu Y", right: "(0, -4)" },
      { left: "Titik potong sumbu X", right: "(2, 0)" },
      { left: "Titik saat x = 1", right: "(1, -2)" }
    ],
    rightOptions: ["(0, -4)", "(2, 0)", "(1, -2)", "(0, 2)"],
    correctReason: "Sempurna! x = 0 ➔ (0, −4); y = 0 ➔ 2x = 4 ➔ (2, 0); x = 1 ➔ 2(1)−4 = −2 ➔ (1, −2).",
    wrongExplanation: "Titik potong sumbu Y memiliki x = 0. Titik potong sumbu X memiliki y = 0.",
    clue: "Potong sumbu Y: (0, b). Potong sumbu X: selesaikan 2x − 4 = 0.",
    remedialVariant: {
      question: "Jodohkan titik potong fungsi f(x) = 3x − 9!",
      pairs: [
        { left: "Titik potong sumbu Y", right: "(0, -9)" },
        { left: "Titik potong sumbu X", right: "(3, 0)" },
        { left: "Titik saat x = 2", right: "(2, -3)" }
      ],
      rightOptions: ["(0, -9)", "(3, 0)", "(2, -3)", "(0, 3)"],
      correctReason: "Tepat! Titik potong sumbu Y adalah (0, −9), sumbu X adalah (3, 0), dan f(2) = −3.",
      wrongExplanation: "Ganti x = 0 untuk sumbu Y, ganti y = 0 untuk sumbu X."
    }
  },
  {
    id: 7,
    chapterId: 4,
    type: "MCQ",
    title: "📏 Menentukan Gradien Garis",
    question: "Berapakah nilai kemiringan (gradien) dari grafik fungsi linear f(x) = −4x + 7?",
    options: ["−4", "7", "4", "−7"],
    correct: "−4",
    correctReason: "Tepat! Pada rumus linear f(x) = ax + b, nilai gradien (m) adalah koefisien di depan x, yaitu a = −4.",
    wrongExplanation: "Gradien adalah angka yang menempel di depan variabel x (yaitu −4), bukan konstanta 7.",
    clue: "Gradien = koefisien dari x pada f(x) = ax + b.",
    remedialVariant: {
      question: "Berapakah gradien kemiringan garis dari f(x) = −5x + 3?",
      options: ["−5", "3", "5", "−3"],
      correct: "−5",
      correctReason: "Hebat! Koefisien di depan x adalah −5, itulah nilai gradiennya.",
      wrongExplanation: "Gradien adalah koefisien variabel x."
    }
  },
  {
    id: 8,
    chapterId: 4,
    type: "MCQ_COMPLEX",
    title: "☑️ Dua Titik Cukup untuk Garis Lurus",
    question: "Manakah pernyataan yang BENAR mengenai cara menggambar grafik fungsi linear? (Pilih semua yang benar)",
    options: [
      "Hanya diperlukan minimal 2 titik koordinat berbeda untuk menggambar garis lurus",
      "Titik potong sumbu X dan titik potong sumbu Y adalah dua titik paling mudah untuk membuat garis",
      "Diperlukan minimal 10 titik agar garisnya lurus",
      "Semua titik koordinat (x, f(x)) pasti terletak tepat pada garis tersebut"
    ],
    correctMultiple: [
      "Hanya diperlukan minimal 2 titik koordinat berbeda untuk menggambar garis lurus",
      "Titik potong sumbu X dan titik potong sumbu Y adalah dua titik paling mudah untuk membuat garis",
      "Semua titik koordinat (x, f(x)) pasti terletak tepat pada garis tersebut"
    ],
    correctReason: "Luar biasa! Menurut aksioma geometri Euclid, melalui dua titik berbeda selalu dapat ditarik tepat satu garis lurus. Titik potong sumbu adalah titik termudah untuk menghubungkan garis.",
    wrongExplanation: "Kita tidak memerlukan 10 titik; cukup 2 titik saja untuk menentukan posisi dan arah sebuah garis lurus.",
    clue: "Dua titik cukup untuk menarik penggaris lurus.",
    remedialVariant: {
      question: "Manakah yang BENAR tentang grafik fungsi linear? (Pilih semua yang benar)",
      options: [
        "Dua titik koordinat sudah cukup untuk menggambar grafiknya",
        "Grafiknya tidak pernah memotong sumbu koordinat",
        "Titik potong sumbu koordinat sangat membantu penarikan garis",
        "Kemiringan garis ditentukan oleh koefisien x"
      ],
      correctMultiple: [
        "Dua titik koordinat sudah cukup untuk menggambar grafiknya",
        "Titik potong sumbu koordinat sangat membantu penarikan garis",
        "Kemiringan garis ditentukan oleh koefisien x"
      ],
      correctReason: "Tepat! Dua titik cukup, titik potong sangat membantu, dan koefisien x menentukan kemiringan.",
      wrongExplanation: "Grafik fungsi linear hampir selalu memotong sumbu koordinat."
    }
  },
  {
    id: 9,
    chapterId: 4,
    type: "CARTESIAN",
    title: "📍 Plot Titik Potong f(x) = 2x − 4",
    question: "Plot dua titik potong fungsi f(x) = 2x − 4 dengan sumbu X (2, 0) dan sumbu Y (0, -4) pada bidang koordinat!",
    minX: -1,
    maxX: 5,
    minY: -5,
    maxY: 3,
    targetPoints: [[2, 0], [0, -4]],
    correctReason: "Hebat! Kedua titik potong utama (2, 0) dan (0, −4) telah diplot dengan sangat akurat.",
    wrongExplanation: "Titik potong sumbu X adalah (2, 0) dan sumbu Y adalah (0, −4). Tandai kedua titik tersebut.",
    clue: "Tandai titik (2, 0) pada sumbu X dan titik (0, −4) pada sumbu Y.",
    remedialVariant: {
      question: "Plot titik potong sumbu X dan sumbu Y dari fungsi f(x) = x − 3! (titik (3, 0) dan (0, -3))",
      minX: -1,
      maxX: 5,
      minY: -4,
      maxY: 3,
      targetPoints: [[3, 0], [0, -3]],
      correctReason: "Tepat! Titik (3, 0) dan (0, −3) terplot dengan tepat.",
      wrongExplanation: "Tandai titik x=3, y=0 dan x=0, y=−3."
    }
  },
  {
    id: 10,
    chapterId: 4,
    type: "MCQ",
    title: "📈 Grafik Melewati Titik Pusat",
    question: "Fungsi linear manakah yang grafiknya PASTI melewati titik pusat koordinat (0, 0)?",
    options: ["f(x) = 3x", "f(x) = 3x + 2", "f(x) = 3x − 4", "f(x) = x + 1"],
    correct: "f(x) = 3x",
    correctReason: "Bagus sekali! Pada f(x) = 3x, konstantanya b = 0. Saat x = 0, nilainya f(0) = 3(0) = 0, sehingga melewati titik (0, 0).",
    wrongExplanation: "Garis melewati (0, 0) hanya jika konstantanya b = 0. Fungsi f(x) = 3x + 2 melewati (0, 2), bukan (0, 0).",
    clue: "Cari fungsi yang tidak memiliki suku konstanta tambah/kurang (b = 0).",
    remedialVariant: {
      question: "Manakah fungsi yang grafiknya melalui titik pangkal (0, 0)?",
      options: ["f(x) = 5x", "f(x) = 5x − 5", "f(x) = 2x + 1", "f(x) = x − 2"],
      correct: "f(x) = 5x",
      correctReason: "Tepat! f(0) = 5(0) = 0, sehingga melalui (0, 0).",
      wrongExplanation: "Fungsi tanpa konstanta (b = 0) selalu melalui titik pusat (0, 0)."
    }
  },
  {
    id: 11,
    chapterId: 4,
    type: "TRUE_FALSE",
    title: "➖ Grafik Garis Mendatar",
    question: "Pernyataan: Grafik dari fungsi konstan f(x) = 5 adalah garis lurus yang mendatar (sejajar dengan sumbu X).",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Karena gradiennya a = 0, kemiringannya datar (tidak naik dan tidak turun). Seluruh titik pada garis memiliki nilai tegak y = 5, sejajar sumbu X.",
    wrongExplanation: "Pernyataan ini bernilai benar. Fungsi konstan selalu berupa garis horizontal mendatar.",
    clue: "y = 5 untuk semua x berarti ketinggian garis selalu sama (mendatar).",
    remedialVariant: {
      question: "Pernyataan: Grafik fungsi f(x) = 3 sejajar dengan sumbu Y (tegak lurus).",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! f(x) = 3 adalah garis horizontal (sejajar sumbu X, bukan sumbu Y).",
      wrongExplanation: "Garis horizontal sejajar dengan sumbu X."
    }
  },
  {
    id: 12,
    chapterId: 4,
    type: "MCQ",
    title: "📐 Titik Terletak pada Garis",
    question: "Manakah titik koordinat di bawah ini yang TERLETAK pada grafik fungsi f(x) = 3x + 2?",
    options: ["(2, 8)", "(1, 4)", "(3, 10)", "(0, 0)"],
    correct: "(2, 8)",
    correctReason: "Tepat! Masukkan x = 2 ke dalam rumus: f(2) = 3(2) + 2 = 6 + 2 = 8. Karena nilai y = 8 cocok, titik (2, 8) terletak pada garis.",
    wrongExplanation: "Saat x=1 ➔ f(1)=5 (bukan 4); saat x=3 ➔ f(3)=11 (bukan 10). Hanya (2, 8) yang cocok.",
    clue: "Cek nilai y dengan menghitung 3x + 2 untuk setiap pilihan titik.",
    remedialVariant: {
      question: "Titik manakah yang terletak pada garis f(x) = 2x + 5?",
      options: ["(3, 11)", "(2, 8)", "(1, 6)", "(0, 2)"],
      correct: "(3, 11)",
      correctReason: "Tepat! 2(3) + 5 = 6 + 5 = 11, sehingga titik (3, 11) terletak pada garis.",
      wrongExplanation: "f(3) = 11, cocok dengan titik (3, 11)."
    }
  },
  {
    id: 13,
    chapterId: 4,
    type: "MATCHING",
    title: "🔗 Menjodohkan Gradien Kemiringan",
    question: "Jodohkan fungsi linear di sebelah kiri dengan nilai gradiennya di sebelah kanan!",
    pairs: [
      { left: "f(x) = 5x − 1", right: "5" },
      { left: "f(x) = −2x + 4", right: "-2" },
      { left: "f(x) = x + 9", right: "1" }
    ],
    rightOptions: ["5", "-2", "1", "9"],
    correctReason: "Hebat! Gradien adalah angka di depan x: pada 5x−1 gradiennya 5, pada −2x+4 gradiennya −2, dan pada x+9 gradiennya 1.",
    wrongExplanation: "Ingat: jika di depan x tidak tertulis angka, nilainya adalah 1 (x = 1x).",
    clue: "Ambil koefisien di depan x.",
    remedialVariant: {
      question: "Jodohkan fungsi linear dengan nilai gradiennya!",
      pairs: [
        { left: "f(x) = 4x + 3", right: "4" },
        { left: "f(x) = −3x + 7", right: "-3" },
        { left: "f(x) = −x + 2", right: "-1" }
      ],
      rightOptions: ["4", "-3", "-1", "2"],
      correctReason: "Tepat! Koefisien x adalah 4, −3, dan −1.",
      wrongExplanation: "Perhatikan tanda minus di depan x: −x berarti gradien −1."
    }
  },
  {
    id: 14,
    chapterId: 4,
    type: "CARTESIAN",
    title: "📍 Plot Titik Koordinat Fungsi Linear",
    question: "Plot titik-titik (0, 1), (1, 3), dan (2, 5) dari fungsi f(x) = 2x + 1 pada bidang koordinat Cartesius!",
    minX: 0,
    maxX: 4,
    minY: 0,
    maxY: 6,
    targetPoints: [[0, 1], [1, 3], [2, 5]],
    correctReason: "Luar biasa! Ketiga titik tersebut membentuk garis lurus yang sangat rapi dan tepat.",
    wrongExplanation: "Tandai titik (0, 1), (1, 3), dan (2, 5) pada bidang Cartesius.",
    clue: "x=0➔y=1; x=1➔y=3; x=2➔y=5.",
    remedialVariant: {
      question: "Plot titik (0, 2), (1, 4), dan (2, 6) dari fungsi f(x) = 2x + 2!",
      minX: 0,
      maxX: 4,
      minY: 0,
      maxY: 7,
      targetPoints: [[0, 2], [1, 4], [2, 6]],
      correctReason: "Tepat! Ketiga titik linear terplot dengan tepat.",
      wrongExplanation: "Tandai koordinat (0, 2), (1, 4), dan (2, 6)."
    }
  },
  {
    id: 15,
    chapterId: 4,
    type: "MCQ",
    title: "🔍 Titik Potong Kedua Sumbu",
    question: "Grafik fungsi f(x) = 4x − 8 memotong sumbu X di titik A dan sumbu Y di titik B. Koordinat titik A dan B berturut-turut adalah...",
    options: [
      "A(2, 0) dan B(0, −8)",
      "A(−8, 0) dan B(0, 2)",
      "A(0, 2) dan B(−8, 0)",
      "A(4, 0) dan B(0, −8)"
    ],
    correct: "A(2, 0) dan B(0, −8)",
    correctReason: "Sangat tepat! Potong sumbu X: 4x − 8 = 0 ➔ 4x = 8 ➔ x = 2 ➔ A(2, 0). Potong sumbu Y: x = 0 ➔ y = −8 ➔ B(0, −8).",
    wrongExplanation: "Titik potong sumbu X berformat (x, 0) dan sumbu Y berformat (0, y). Jangan terbalik urutannya.",
    clue: "A memiliki y = 0, B memiliki x = 0.",
    remedialVariant: {
      question: "Grafik fungsi f(x) = 5x − 10 memotong sumbu X di P dan sumbu Y di Q. Koordinat P dan Q adalah...",
      options: [
        "P(2, 0) dan Q(0, −10)",
        "P(−10, 0) dan Q(0, 2)",
        "P(5, 0) dan Q(0, −10)",
        "P(0, 2) dan Q(−10, 0)"
      ],
      correct: "P(2, 0) dan Q(0, −10)",
      correctReason: "Tepat! 5x = 10 ➔ P(2, 0); f(0) = −10 ➔ Q(0, −10).",
      wrongExplanation: "P adalah titik pada sumbu X (2, 0) dan Q pada sumbu Y (0, −10)."
    }
  },
  {
    id: 16,
    chapterId: 4,
    type: "TRUE_FALSE",
    title: "📊 Garis Sejajar",
    question: "Pernyataan: Dua grafik fungsi linear f(x) = 3x + 2 dan g(x) = 3x − 7 adalah dua garis yang saling sejajar (tidak akan pernah berpotongan).",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Karena kedua garis memiliki gradien kemiringan yang persis sama (m₁ = m₂ = 3), arah kemiringannya sama sehingga kedua garis tersebut pasti sejajar.",
    wrongExplanation: "Syarat dua garis sejajar adalah gradiennya sama (m₁ = m₂). Di sini keduanya bergradien 3.",
    clue: "Perhatikan koefisien x: jika koefisiennya sama, kedua garis pasti sejajar.",
    remedialVariant: {
      question: "Pernyataan: Grafik f(x) = 2x + 1 dan g(x) = 5x + 1 adalah dua garis yang sejajar.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Pernyataan tersebut salah karena gradiennya berbeda (2 dan 5), sehingga kedua garis akan saling berpotongan.",
      wrongExplanation: "Garis dengan gradien berbeda pasti berpotongan di satu titik."
    }
  },
  {
    id: 17,
    chapterId: 4,
    type: "MCQ",
    title: "📈 Perubahan Nilai y terhadap x",
    question: "Pada grafik fungsi f(x) = 3x + 1, jika nilai x bertambah sebesar 2 satuan, maka nilai y akan bertambah sebesar...",
    options: ["6 satuan", "3 satuan", "2 satuan", "5 satuan"],
    correct: "6 satuan",
    correctReason: "Luar biasa! Karena gradiennya m = 3, setiap x bertambah 1, y bertambah 3. Maka jika x bertambah 2, y akan bertambah 3 × 2 = 6 satuan.",
    wrongExplanation: "Δy = m × Δx. Dengan m = 3 dan Δx = 2, maka perubahan nilai y adalah 3 × 2 = 6.",
    clue: "Kalikan pertambahan x dengan nilai gradiennya (3).",
    remedialVariant: {
      question: "Pada fungsi f(x) = 4x − 2, jika nilai x bertambah 3 satuan, nilai y bertambah sebesar...",
      options: ["12 satuan", "4 satuan", "7 satuan", "10 satuan"],
      correct: "12 satuan",
      correctReason: "Tepat! Δy = 4 × 3 = 12 satuan.",
      wrongExplanation: "Pertambahan y = gradien × pertambahan x = 4 × 3 = 12."
    }
  },
  {
    id: 18,
    chapterId: 4,
    type: "MCQ_COMPLEX",
    title: "☑️ Karakteristik f(x) = −2x + 6",
    question: "Diberikan fungsi linear f(x) = −2x + 6. Manakah pernyataan yang BENAR mengenai grafiknya? (Pilih semua yang benar)",
    options: [
      "Memotong sumbu Y di titik (0, 6)",
      "Memotong sumbu X di titik (3, 0)",
      "Memiliki gradien bernilai negatif (m = −2)",
      "Grafiknya menanjak naik dari kiri bawah ke kanan atas"
    ],
    correctMultiple: [
      "Memotong sumbu Y di titik (0, 6)",
      "Memotong sumbu X di titik (3, 0)",
      "Memiliki gradien bernilai negatif (m = −2)"
    ],
    correctReason: "Hebat! Karena gradiennya m = −2 (negatif), grafiknya condong menurun (bukan menanjak naik). Ketiga pernyataan lainnya benar.",
    wrongExplanation: "Garis bergradien negatif akan condong menurun ke kanan bawah, bukan menanjak naik.",
    clue: "Periksa: titik potong Y saat x=0; titik potong X saat y=0; gradien di depan x.",
    remedialVariant: {
      question: "Diberikan f(x) = −3x + 9. Manakah yang BENAR? (Pilih semua yang benar)",
      options: [
        "Memotong sumbu Y di (0, 9)",
        "Memotong sumbu X di (3, 0)",
        "Gradien garis bernilai −3",
        "Grafik garis melalui titik (0, 0)"
      ],
      correctMultiple: [
        "Memotong sumbu Y di (0, 9)",
        "Memotong sumbu X di (3, 0)",
        "Gradien garis bernilai −3"
      ],
      correctReason: "Tepat! Garis memotong Y di (0, 9), X di (3, 0), dan bergradien −3. Garis tidak melalui (0, 0).",
      wrongExplanation: "Garis memotong sumbu Y di (0, 9), bukan di (0, 0)."
    }
  },
  {
    id: 19,
    chapterId: 4,
    type: "ARROWS",
    title: "🏹 Sambungkan Titik dan Garis Fungsi",
    question: "Hubungkan nilai x ∈ {1, 2, 3} ke nilai y pada grafik fungsi f(x) = 2x + 3!",
    setA: [1, 2, 3],
    setB: [5, 7, 9],
    correctPairs: ["1->5", "2->7", "3->9"],
    correctReason: "Bagus! f(1)=2(1)+3=5; f(2)=2(2)+3=7; f(3)=2(3)+3=9.",
    wrongExplanation: "2(1)+3 = 5; 2(2)+3 = 7; 2(3)+3 = 9. Pasangkan 1➔5, 2➔7, dan 3➔9.",
    clue: "Hitung nilai 2x + 3 untuk setiap nilai x di himpunan A.",
    remedialVariant: {
      question: "Hubungkan nilai x ke nilai y pada fungsi f(x) = 3x + 1!",
      setA: [1, 2, 3],
      setB: [4, 7, 10],
      correctPairs: ["1->4", "2->7", "3->10"],
      correctReason: "Tepat! 3(1)+1 = 4; 3(2)+1 = 7; 3(3)+1 = 10.",
      wrongExplanation: "Kalikan nilai di A dengan 3 lalu tambah 1."
    }
  },
  {
    id: 20,
    chapterId: 4,
    type: "MCQ",
    title: "📐 Gradien dari Dua Titik",
    question: "Suatu grafik fungsi linear melalui titik (1, 3) dan (3, 7). Nilai gradien (kemiringan) garis tersebut adalah...",
    options: ["2", "4", "3", "1"],
    correct: "2",
    correctReason: "Tepat! Rumus gradien dari dua titik: m = (y₂ − y₁) / (x₂ − x₁) = (7 − 3) / (3 − 1) = 4 / 2 = 2.",
    wrongExplanation: "Selisih y dibagi selisih x: (7 − 3) / (3 − 1) = 4 / 2 = 2.",
    clue: "Kurangkan nilai y kedua titik, lalu bagi dengan selisih nilai x-nya.",
    remedialVariant: {
      question: "Garis fungsi linear melalui titik (2, 5) dan (4, 11). Berapakah gradiennya?",
      options: ["3", "6", "2", "4"],
      correct: "3",
      correctReason: "Tepat! m = (11 − 5) / (4 − 2) = 6 / 2 = 3.",
      wrongExplanation: "Perubahan y adalah 6 dan perubahan x adalah 2. 6 ÷ 2 = 3."
    }
  },
  {
    id: 21,
    chapterId: 4,
    type: "TRUE_FALSE",
    title: "📌 Garis Tegak Bukan Fungsi",
    question: "Pernyataan: Garis tegak vertikal x = 3 pada koordinat Cartesius BUKAN merupakan grafik fungsi y = f(x).",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Sangat benar! Pada garis vertikal x = 3, satu nilai x = 3 memiliki pasangan nilai y yang tak terhingga banyak. Ini melanggar syarat fungsi (bercabang tak terhingga).",
    wrongExplanation: "Garis vertikal gagal dalam Vertical Line Test karena memotong di tak terhingga titik untuk satu nilai x.",
    clue: "Fungsi y = f(x) tidak boleh memiliki garis tegak vertikal.",
    remedialVariant: {
      question: "Pernyataan: Garis vertikal x = 5 memenuhi syarat sebagai fungsi y = f(x).",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Garis vertikal bukan fungsi karena satu nilai x memiliki pasangan tak terhingga.",
      wrongExplanation: "Garis vertikal tidak dapat dinyatakan sebagai fungsi y terhadap x."
    }
  },
  {
    id: 22,
    chapterId: 4,
    type: "MCQ",
    title: "🔍 Titik Potong Dua Garis",
    question: "Titik potong antara grafik fungsi f(x) = 2x + 1 dan g(x) = x + 3 adalah...",
    options: ["(2, 5)", "(1, 3)", "(3, 6)", "(0, 1)"],
    correct: "(2, 5)",
    correctReason: "Luar biasa! Samakan kedua fungsi: 2x + 1 = x + 3 ➔ 2x − x = 3 − 1 ➔ x = 2. Masukkan x = 2: y = 2(2) + 1 = 5. Titik potongnya adalah (2, 5).",
    wrongExplanation: "Titik potong dicari dengan menyamakan f(x) = g(x): 2x + 1 = x + 3 ➔ x = 2. Lalu y = 5.",
    clue: "Samakan 2x + 1 = x + 3 untuk mencari nilai x.",
    remedialVariant: {
      question: "Titik potong antara garis f(x) = 3x − 2 dan g(x) = 2x + 1 adalah...",
      options: ["(3, 7)", "(1, 1)", "(2, 4)", "(0, 1)"],
      correct: "(3, 7)",
      correctReason: "Tepat! 3x − 2 = 2x + 1 ➔ x = 3. y = 3(3) − 2 = 7 ➔ titik (3, 7).",
      wrongExplanation: "3x − 2x = 1 + 2 ➔ x = 3, y = 7."
    }
  },
  {
    id: 23,
    chapterId: 4,
    type: "MATCHING",
    title: "🧩 Menjodohkan Karakter Arah Garis",
    question: "Jodohkan tanda gradien di kiri dengan bentuk arah garisnya di kanan!",
    pairs: [
      { left: "Gradien positif (m > 0)", right: "Condong naik dari kiri ke kanan" },
      { left: "Gradien negatif (m < 0)", right: "Condong menurun dari kiri ke kanan" },
      { left: "Gradien nol (m = 0)", right: "Garis horizontal mendatar sempurna" }
    ],
    rightOptions: [
      "Condong naik dari kiri ke kanan",
      "Condong menurun dari kiri ke kanan",
      "Garis horizontal mendatar sempurna"
    ],
    correctReason: "Mantap! Kamu memahami hubungan langsung antara tanda angka gradien dengan arah kemiringan visual garis.",
    wrongExplanation: "Gradien positif ➔ menanjak; gradien negatif ➔ menurun; gradien nol ➔ mendatar horizontal.",
    clue: "Positif = naik, Negatif = turun, Nol = datar.",
    remedialVariant: {
      question: "Jodohkan fungsi dengan arah visual grafiknya!",
      pairs: [
        { left: "f(x) = 4x + 1", right: "Garis menanjak naik" },
        { left: "f(x) = -3x + 2", right: "Garis menurun" },
        { left: "f(x) = 7", right: "Garis mendatar" }
      ],
      rightOptions: ["Garis menanjak naik", "Garis menurun", "Garis mendatar"],
      correctReason: "Tepat! Koefisien positif naik, negatif menurun, konstanta mendatar.",
      wrongExplanation: "Perhatikan tanda di depan x pada masing-masing rumus."
    }
  },
  {
    id: 24,
    chapterId: 4,
    type: "MCQ",
    title: "🔢 Garis Melalui Kuadran",
    question: "Grafik fungsi f(x) = 2x memiliki konstanta b = 0 dan gradien m = 2 (positif). Garis ini melintasi kuadran...",
    options: ["Kuadran I dan Kuadran III", "Kuadran II dan Kuadran IV", "Hanya Kuadran I saja", "Semua Kuadran"],
    correct: "Kuadran I dan Kuadran III",
    correctReason: "Benar! Saat x positif, y positif (Kuadran I). Saat x negatif, y negatif (Kuadran III). Garis melalui titik pusat (0, 0) menghubungkan Kuadran I dan III.",
    wrongExplanation: "f(1) = 2 (x+, y+ ➔ Kuadran I). f(−1) = −2 (x−, y− ➔ Kuadran III).",
    clue: "Cek tanda x dan y: jika x > 0 maka y > 0 (Kuadran I); jika x < 0 maka y < 0 (Kuadran III).",
    remedialVariant: {
      question: "Grafik fungsi f(x) = −3x melalui titik pusat (0, 0). Garis ini melintasi kuadran...",
      options: ["Kuadran II dan Kuadran IV", "Kuadran I dan Kuadran III", "Hanya Kuadran II", "Kuadran I saja"],
      correct: "Kuadran II dan Kuadran IV",
      correctReason: "Tepat! Saat x negatif, y positif (Kuadran II); saat x positif, y negatif (Kuadran IV).",
      wrongExplanation: "x negatif menghasilkan y positif (Kuadran II), x positif menghasilkan y negatif (Kuadran IV)."
    }
  },
  {
    id: 25,
    chapterId: 4,
    type: "TRUE_FALSE",
    title: "📌 Sumbu Koordinat Sebagai Garis",
    question: "Pernyataan: Sumbu X pada bidang koordinat Cartesius memiliki persamaan fungsi y = 0.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Seluruh titik di sepanjang sumbu X memiliki nilai y = 0, sehingga persamaannya adalah y = 0.",
    wrongExplanation: "Sumbu horizontal X adalah garis ketinggian y = 0. Sedangkan sumbu vertikal Y memiliki persamaan x = 0.",
    clue: "Setiap titik di sumbu X tidak memiliki ketinggian (y = 0).",
    remedialVariant: {
      question: "Pernyataan: Persamaan garis sumbu X adalah x = 0.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Pernyataan tersebut salah karena sumbu X persamaannya adalah y = 0 (bukan x = 0).",
      wrongExplanation: "x = 0 adalah persamaan sumbu Y."
    }
  },
  {
    id: 26,
    chapterId: 4,
    type: "MCQ",
    title: "🔍 Menggambar dari Titik Potong",
    question: "Suatu garis memotong sumbu X di (4, 0) dan memotong sumbu Y di (0, 2). Rumus fungsi linear yang sesuai adalah...",
    options: ["f(x) = −(1/2)x + 2", "f(x) = (1/2)x + 2", "f(x) = −2x + 4", "f(x) = 2x + 4"],
    correct: "f(x) = −(1/2)x + 2",
    correctReason: "Luar biasa! Titik potong Y di (0, 2) artinya konstanta b = 2. Gradien m = (2 − 0) / (0 − 4) = 2 / −4 = −1/2. Jadi f(x) = −(1/2)x + 2.",
    wrongExplanation: "Garis condong menurun dari (0, 2) ke (4, 0) sehingga gradiennya negatif: m = (0 − 2)/(4 − 0) = −2/4 = −1/2.",
    clue: "Hitung gradien: (y₂ − y₁)/(x₂ − x₁) = (0 − 2)/(4 − 0) = −1/2.",
    remedialVariant: {
      question: "Garis memotong sumbu X di (6, 0) dan sumbu Y di (0, 3). Rumus fungsinya adalah...",
      options: ["f(x) = −(1/2)x + 3", "f(x) = (1/2)x + 3", "f(x) = −2x + 6", "f(x) = 2x + 6"],
      correct: "f(x) = −(1/2)x + 3",
      correctReason: "Tepat! m = (0 − 3)/(6 − 0) = −3/6 = −1/2, konstanta b = 3 ➔ f(x) = −(1/2)x + 3.",
      wrongExplanation: "Gradiennya −1/2 dan konstanta titik potong Y adalah 3."
    }
  },
  {
    id: 27,
    chapterId: 4,
    type: "MCQ_COMPLEX",
    title: "☑️ Efek Perubahan Konstanta b",
    question: "Jika grafik f(x) = 2x digeser ke atas sejauh 3 satuan, manakah pernyataan yang BENAR? (Pilih semua yang benar)",
    options: [
      "Rumus fungsi barunya menjadi f(x) = 2x + 3",
      "Gradien kemiringan garisnya tetap sama (m = 2)",
      "Garis yang baru akan sejajar dengan garis mula-mula",
      "Titik potong sumbu Y berubah menjadi (0, 3)"
    ],
    correctMultiple: [
      "Rumus fungsi barunya menjadi f(x) = 2x + 3",
      "Gradien kemiringan garisnya tetap sama (m = 2)",
      "Garis yang baru akan sejajar dengan garis mula-mula",
      "Titik potong sumbu Y berubah menjadi (0, 3)"
    ],
    correctReason: "Sempurna! Semua pernyataan di atas bernilai BENAR. Menggeser garis secara vertikal hanya mengubah konstanta b, tanpa mengubah kemiringan (gradien) garis sehingga kedua garis tetap sejajar.",
    wrongExplanation: "Pergeseran vertikal tidak mengubah sudut kemiringan garis; semua pernyataan di atas adalah sifat translasi grafik linear yang benar.",
    clue: "Pergeseran ke atas sejauh 3 menambah nilai konstanta dengan +3.",
    remedialVariant: {
      question: "Jika f(x) = 3x digeser ke bawah sejauh 2 satuan, manakah yang BENAR? (Pilih semua yang benar)",
      options: [
        "Rumus barunya f(x) = 3x − 2",
        "Gradien garis tetap 3",
        "Garis baru sejajar garis awal",
        "Titik potong sumbu Y menjadi (0, −2)"
      ],
      correctMultiple: [
        "Rumus barunya f(x) = 3x − 2",
        "Gradien garis tetap 3",
        "Garis baru sejajar garis awal",
        "Titik potong sumbu Y menjadi (0, −2)"
      ],
      correctReason: "Tepat! Semua pernyataan benar, garis hanya bergeser vertikal sejajar.",
      wrongExplanation: "Pergeseran ke bawah mengubah konstanta menjadi −2 tanpa merubah gradien."
    }
  },
  {
    id: 28,
    chapterId: 4,
    type: "MCQ",
    title: "📈 Membaca Nilai dari Grafik",
    question: "Sebuah garis linear f(x) memotong sumbu koordinat di (0, 4) dan (2, 0). Berapakah nilai dari f(1)?",
    options: ["2", "3", "1", "0"],
    correct: "2",
    correctReason: "Hebat! Karena titik x = 1 berada tepat di tengah-tengah antara x = 0 dan x = 2, maka nilai y-nya juga tepat di tengah antara 4 dan 0, yaitu 2.",
    wrongExplanation: "Rumus fungsinya adalah f(x) = −2x + 4. Maka f(1) = −2(1) + 4 = 2.",
    clue: "Titik tengah antara (0, 4) dan (2, 0) memiliki nilai x = 1 dan y = 2.",
    remedialVariant: {
      question: "Garis linear memotong di (0, 6) dan (4, 0). Berapakah nilai f(2)?",
      options: ["3", "4", "2", "1"],
      correct: "3",
      correctReason: "Tepat! x = 2 adalah titik tengah, maka y = (6 + 0) / 2 = 3.",
      wrongExplanation: "f(x) = −(3/2)x + 6 ➔ f(2) = −3 + 6 = 3."
    }
  },
  {
    id: 29,
    chapterId: 4,
    type: "TRUE_FALSE",
    title: "📐 Gradien Garis Sejajar Sumbu Y",
    question: "Pernyataan: Gradien kemiringan garis vertikal (tegak lurus terhadap sumbu X) tidak terdefinisi (tak terhingga).",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Karena pada garis vertikal nilai x tidak berubah (Δx = 0), rumus gradien m = Δy / Δx menghasilkan pembagian dengan angka nol, yang dalam matematika tidak terdefinisi.",
    wrongExplanation: "Pembagian dengan nol tidak terdefinisi, sehingga gradien garis vertikal tidak terdefinisi.",
    clue: "Pembagi Δx bernilai 0.",
    remedialVariant: {
      question: "Pernyataan: Garis horizontal memiliki nilai gradien sama dengan 0.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Pada garis horizontal Δy = 0, sehingga 0 / Δx = 0.",
      wrongExplanation: "Kemiringan garis mendatar sempurna adalah 0."
    }
  },
  {
    id: 30,
    chapterId: 4,
    type: "MCQ",
    title: "🏆 Rangkuman Grafik Fungsi Linear",
    question: "Apakah makna visual paling mendasar dari gradien (m) dan konstanta (b) pada grafik f(x) = mx + b?",
    options: [
      "m menentukan kemiringan arah garis, sedangkan b menentukan titik temu garis dengan sumbu tegak Y",
      "m menentukan panjang garis, sedangkan b menentukan ketebalan garis",
      "m dan b tidak mempengaruhi bentuk visual grafik",
      "m adalah titik potong sumbu X dan b adalah titik potong sumbu Y"
    ],
    correct: "m menentukan kemiringan arah garis, sedangkan b menentukan titik temu garis dengan sumbu tegak Y",
    correctReason: "Sempurna! Kamu telah menyelesaikan seluruh latihan Chapter 4 dengan penguasaan konsep grafik fungsi linear yang sangat mendalam dan kokoh!",
    wrongExplanation: "Gradien m adalah ukuran kemiringan lereng garis, dan konstanta b adalah titik potong sumbu Y (ketinggian awal).",
    clue: "m = kemiringan lereng, b = titik potong sumbu Y.",
    remedialVariant: {
      question: "Jika dua garis memiliki gradien m yang sama tetapi konstanta b yang berbeda, bagaimana posisi kedua garis tersebut?",
      options: [
        "Saling sejajar dan tidak berpotongan",
        "Saling tegak lurus",
        "Menjadi satu garis yang sama",
        "Berpotongan di titik (0, 0)"
      ],
      correct: "Saling sejajar dan tidak berpotongan",
      correctReason: "Luar biasa! Pemahaman grafik fungsi linearmu sudah sangat sempurna!",
      wrongExplanation: "Gradien sama artinya kemiringan sama, sehingga garisnya sejajar."
    }
  }
];
