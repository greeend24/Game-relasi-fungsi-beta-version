/**
 * LATIHAN CHAPTER 4: GRAFIK FUNGSI LINEAR PADA BIDANG KARTESIUS
 * 10 Soal Interaktif Taktil + 10 Remedial Variant (100% Interaktif)
 */

export const EXERCISE_CHAPTER_4 = [
  {
    "id": 1,
    "chapterId": 4,
    "type": "MCQ",
    "title": "📈 Bentuk Grafik Fungsi Linear",
    "question": "Bagaimanakah bentuk visual grafik dari fungsi linear f(x) = ax + b pada bidang koordinat Kartesius?",
    "options": [
      "Berupa kurva parabola melengkung",
      "Selalu berupa garis lurus",
      "Berupa lingkaran tertutup",
      "Berupa garis gelombang naik-turun"
    ],
    "correct": "Selalu berupa garis lurus",
    "correctReason": "Tepat sekali! Karena variabel x berpangkat satu (linear), grafik dari fungsi linear f(x) = ax + b selalu membentuk satu garis lurus sempurna.",
    "wrongExplanation": "Grafik fungsi linear selalu berbentuk garis lurus sempurna, bukan parabola atau lingkaran.",
    "explanation": "Tepat sekali! Karena variabel x berpangkat satu (linear), grafik dari fungsi linear f(x) = ax + b selalu membentuk garis lurus.",
    "clue": "Kata 'linear' berhubungan langsung dengan 'garis lurus'.",
    "distractorAnalysis": {
      "Berupa kurva parabola melengkung": "Kurva lengkung parabola adalah grafik fungsi kuadrat berpangkat dua, bukan fungsi linear berpangkat satu.",
      "Berupa lingkaran tertutup": "Bentuk lingkaran bukan grafik fungsi garis lurus.",
      "Berupa garis gelombang naik-turun": "Garis gelombang adalah grafik non-linear, bukan fungsi linear."
    },
    "remedialVariant": {
      "type": "MCQ",
      "title": "📈 Remedial: Bentuk Grafik Fungsi Linear",
      "question": "Grafik dari fungsi f(x) = 2x + 4 pada bidang koordinat selalu berbentuk...",
      "options": [
        "Kurva melengkung ke atas",
        "Lingkaran",
        "Garis lurus",
        "Kurva gelombang acak"
      ],
      "correct": "Garis lurus",
      "correctReason": "Benar! Fungsi linear selalu menghasilkan grafik garis lurus.",
      "wrongExplanation": "Fungsi linear f(x) = 2x + 4 variabelnya berpangkat satu sehingga grafiknya garis lurus.",
      "explanation": "Benar! Grafik fungsi linear f(x) = 2x + 4 selalu berbentuk garis lurus.",
      "clue": "Variabel x berpangkat satu menghasilkan lintasan garis lurus."
    }
  },
  {
    "id": 2,
    "chapterId": 4,
    "type": "CARTESIAN",
    "ruleType": "OPEN_ENDED_CARTESIAN_LINE",
    "slope": 2,
    "intercept": 0,
    "minPoints": 3,
    "formulaLabel": "f(x) = 2x",
    "title": "📍 Tantangan Bebas: Plot Garis f(x) = 2x pada Kartesius",
    "question": "Tandai 3 titik koordinat bebas pada bidang Kartesius yang dilalui oleh grafik fungsi f(x) = 2x (misalnya titik (0, 0), (1, 2), (2, 4), atau titik koordinat lain yang memenuhi rumus fungsi)!",
    "minX": 0,
    "maxX": 5,
    "minY": 0,
    "maxY": 6,
    "correctReason": "Hebat! Semua titik yang kamu tandai benar-benar berada pada garis fungsi f(x) = 2x (nilai y selalu tepat 2 kali lipat nilai x) pada bidang Kartesius.",
    "wrongExplanation": "Pastikan setiap titik (x, y) yang kamu pilih memenuhi rumus f(x) = 2x (y = 2x).",
    "clue": "Pilih 3 titik yang memenuhi y = 2x, contohnya (0, 0), (1, 2), (2, 4), atau (3, 6).",
    "remedialVariant": {
      "type": "CARTESIAN",
      "ruleType": "OPEN_ENDED_CARTESIAN_LINE",
      "slope": 3,
      "intercept": 0,
      "minPoints": 2,
      "formulaLabel": "f(x) = 3x",
      "title": "📍 Tantangan Bebas: Plot Garis f(x) = 3x pada Kartesius",
      "question": "Tandai 2 titik koordinat bebas pada bidang Kartesius yang dilalui garis fungsi f(x) = 3x (misalnya (0, 0), (1, 3), atau (2, 6))!",
      "minX": 0,
      "maxX": 5,
      "minY": 0,
      "maxY": 7,
      "correctReason": "Tepat! Titik-titik yang kamu pilih dilalui oleh garis fungsi f(x) = 3x pada diagram Kartesius.",
      "wrongExplanation": "Pilih titik di mana nilai y bernilai 3 kali lipat nilai x (y = 3x).",
      "clue": "Tandai 2 titik seperti (0, 0), (1, 3), atau (2, 6)."
    }
  },
  {
    "id": 3,
    "chapterId": 4,
    "type": "SLOT_FILL",
    "title": "🧩 Menghitung Titik Potong Sumbu X dan Y",
    "question": "Diketahui fungsi f(x) = 3x − 6. Lengkapi koordinat titik potong grafik terhadap sumbu Y dan sumbu X pada kotak [ ? ]!",
    "subInstruction": "Pasang kartu angka ke kotak koordinat [ ? ]!",
    "slots": [
      {
        "id": "s1",
        "label": "Titik potong sumbu Y (saat x = 0) ➔ (0, [ ? ]):",
        "answer": "-6"
      },
      {
        "id": "s2",
        "label": "Titik potong sumbu X (saat y = 0) ➔ ([ ? ], 0):",
        "answer": "2"
      }
    ],
    "tokens": [
      "-6",
      "-2",
      "2",
      "3",
      "6"
    ],
    "correctReason": "Sempurna! Titik potong sumbu Y adalah (0, -6) dan titik potong sumbu X adalah (2, 0).",
    "wrongExplanation": "Sumbu Y: masukkan x = 0 ➔ f(0) = -6 ➔ (0, -6).\nSumbu X: buat f(x) = 0 ➔ 3x - 6 = 0 ➔ 3x = 6 ➔ x = 2 ➔ (2, 0).",
    "clue": "Titik sumbu Y adalah (0, -6). Untuk sumbu X, 6 dibagi 3 adalah 2, jadi (2, 0).",
    "remedialVariant": {
      "type": "SLOT_FILL",
      "title": "🧩 Remedial: Titik Potong f(x) = 2x - 4",
      "question": "Tentukan titik potong sumbu X dan Y untuk grafik f(x) = 2x - 4!",
      "slots": [
        {
          "id": "s1",
          "label": "Titik potong sumbu Y (saat x = 0) ➔ (0, [ ? ]):",
          "answer": "-4"
        },
        {
          "id": "s2",
          "label": "Titik potong sumbu X (saat y = 0) ➔ ([ ? ], 0):",
          "answer": "2"
        }
      ],
      "tokens": [
        "-4",
        "0",
        "2",
        "4"
      ],
      "correctReason": "Tepat! Sumbu Y di (0, -4) dan sumbu X di (2, 0).",
      "wrongExplanation": "x=0 ➔ y=-4. y=0 ➔ 2x=4 ➔ x=2.",
      "clue": "x=0 ➔ y=-4; y=0 ➔ x=2."
    }
  },
  {
    "id": 4,
    "chapterId": 4,
    "type": "SLOT_FILL",
    "title": "🧩 Menghitung Gradien (Kemiringan Garis)",
    "question": "Garis melewati dua titik A(1, 3) dan B(3, 7). Lengkapi langkah penghitungan gradien m = (y₂ − y₁) ÷ (x₂ − x₁) pada kotak [ ? ]!",
    "subInstruction": "Pasang kartu angka nilai ke kotak perhitungan gradien [ ? ]!",
    "slots": [
      {
        "id": "s1",
        "label": "Perubahan nilai tegak (Δy = y₂ − y₁) =",
        "answer": "4"
      },
      {
        "id": "s2",
        "label": "Perubahan nilai mendatar (Δx = x₂ − x₁) =",
        "answer": "2"
      },
      {
        "id": "s3",
        "label": "Nilai kemiringan garis m (Δy ÷ Δx) =",
        "answer": "2"
      }
    ],
    "tokens": [
      "1",
      "2",
      "2",
      "3",
      "4",
      "6"
    ],
    "correctReason": "Luar biasa! Gradien m = (y₂ − y₁) ÷ (x₂ − x₁) = (7 − 3) ÷ (3 − 1) = 4 ÷ 2 = 2. Garis memiliki kemiringan m = 2.",
    "wrongExplanation": "m = (7 − 3) ÷ (3 − 1) = 4 ÷ 2 = 2.",
    "clue": "Kurangkan y: 7 − 3 = 4. Kurangkan x: 3 − 1 = 2. Bagi: 4 ÷ 2 = 2.",
    "remedialVariant": {
      "type": "SLOT_FILL",
      "title": "🧩 Remedial: Gradien Melalui (1, 2) dan (4, 8)",
      "question": "Hitung gradien garis yang melalui titik (1, 2) dan (4, 8)!",
      "slots": [
        {
          "id": "s1",
          "label": "Perubahan nilai tegak (Δy = y₂ − y₁) =",
          "answer": "6"
        },
        {
          "id": "s2",
          "label": "Perubahan nilai mendatar (Δx = x₂ − x₁) =",
          "answer": "3"
        },
        {
          "id": "s3",
          "label": "Nilai kemiringan garis m (Δy ÷ Δx) =",
          "answer": "2"
        }
      ],
      "tokens": [
        "2",
        "3",
        "4",
        "6"
      ],
      "correctReason": "Bagus! Selisih tegak y = 6, selisih mendatar x = 3, gradien m = 6 ÷ 3 = 2.",
      "wrongExplanation": "m = (8 − 2) ÷ (4 − 1) = 6 ÷ 3 = 2.",
      "clue": "Selisih y = 6, selisih x = 3, m = 6 ÷ 3 = 2."
    }
  },
  {
    "id": 5,
    "chapterId": 4,
    "type": "CARTESIAN",
    "title": "📍 Plot Garis Fungsi f(x) = x + 1 pada Kartesius",
    "question": "Tandai 3 titik koordinat pada bidang Kartesius untuk garis fungsi f(x) = x + 1 dengan x = 0, 1, dan 2!",
    "minX": 0,
    "maxX": 5,
    "minY": 0,
    "maxY": 5,
    "targetPoints": [
      [
        0,
        1
      ],
      [
        1,
        2
      ],
      [
        2,
        3
      ]
    ],
    "correctReason": "Tepat sekali! Titik (0, 1), (1, 2), dan (2, 3) membentuk garis lurus yang rapi dengan gradien 1.",
    "wrongExplanation": "f(0) = 1 ➔ (0, 1); f(1) = 2 ➔ (1, 2); f(2) = 3 ➔ (2, 3).",
    "clue": "Tandai titik (0, 1), (1, 2), dan (2, 3).",
    "remedialVariant": {
      "type": "CARTESIAN",
      "title": "📍 Remedial: Plot Garis f(x) = x + 2 pada Kartesius",
      "question": "Tandai titik koordinat f(x) = x + 2 pada diagram Kartesius untuk x = 0, 1, dan 2: titik (0, 2), (1, 3), dan (2, 4)!",
      "minX": 0,
      "maxX": 5,
      "minY": 0,
      "maxY": 6,
      "targetPoints": [
        [
          0,
          2
        ],
        [
          1,
          3
        ],
        [
          2,
          4
        ]
      ],
      "correctReason": "Sempurna! Titik (0, 2), (1, 3), dan (2, 4) membentuk garis lurus.",
      "wrongExplanation": "Tandai titik (0, 2), (1, 3), dan (2, 4).",
      "clue": "Titik (0, 2), (1, 3), dan (2, 4)."
    }
  },
  {
    "id": 6,
    "chapterId": 4,
    "type": "DRAG_DROP",
    "title": "🎯 Sortir Kemiringan: Positif vs Negatif",
    "question": "Kelompokkan setiap rumus fungsi di bawah ke dalam kotak kemiringan grafik yang sesuai!",
    "categories": [
      "Gradien Positif (Garis Menanjak)",
      "Gradien Negatif (Garis Menurun)"
    ],
    "items": [
      "f(x) = 3x + 1",
      "f(x) = -2x + 5",
      "f(x) = 4x - 7",
      "f(x) = -x + 3"
    ],
    "correctMapping": {
      "f(x) = 3x + 1": "Gradien Positif (Garis Menanjak)",
      "f(x) = -2x + 5": "Gradien Negatif (Garis Menurun)",
      "f(x) = 4x - 7": "Gradien Positif (Garis Menanjak)",
      "f(x) = -x + 3": "Gradien Negatif (Garis Menurun)"
    },
    "itemExplanations": {
      "f(x) = 3x + 1": "Koefisien x adalah +3 (> 0, positif).",
      "f(x) = -2x + 5": "Koefisien x adalah -2 (< 0, negatif).",
      "f(x) = 4x - 7": "Koefisien x adalah +4 (> 0, positif).",
      "f(x) = -x + 3": "Koefisien x adalah -1 (< 0, negatif)."
    },
    "correctReason": "Sangat jeli! Arah kemiringan garis ditentukan langsung oleh tanda tanda koefisien x (gradien m).",
    "wrongExplanation": "Lihat angka di depan x: jika ada tanda minus (-) maka gradien negatif; jika tanda tambah/tanpa minus maka positif.",
    "remedialVariant": {
      "type": "DRAG_DROP",
      "title": "🎯 Remedial: Sortir Kemiringan Garis",
      "question": "Kelompokkan ke kotak Gradien Positif atau Gradien Negatif!",
      "categories": [
        "Gradien Positif (m > 0)",
        "Gradien Negatif (m < 0)"
      ],
      "items": [
        "f(x) = 2x - 3",
        "f(x) = -3x + 1",
        "f(x) = 5x",
        "f(x) = -4x - 2"
      ],
      "correctMapping": {
        "f(x) = 2x - 3": "Gradien Positif (m > 0)",
        "f(x) = -3x + 1": "Gradien Negatif (m < 0)",
        "f(x) = 5x": "Gradien Positif (m > 0)",
        "f(x) = -4x - 2": "Gradien Negatif (m < 0)"
      },
      "correctReason": "Tepat! Koefisien x positif ➔ m > 0. Koefisien x negatif ➔ m < 0.",
      "wrongExplanation": "Periksa tanda angka di depan x.",
      "clue": "Angka depan x: 2 dan 5 positif; -3 dan -4 negatif."
    }
  },
  {
    "id": 7,
    "chapterId": 4,
    "type": "DRAG_DROP",
    "title": "🎯 Uji Titik terhadap Garis f(x) = 2x + 1",
    "question": "Periksa apakah titik koordinat (x, y) berikut terletak pada garis f(x) = 2x + 1 atau berada di luar garis!",
    "categories": [
      "Titik Terletak pada Garis",
      "Titik di Luar Garis"
    ],
    "items": [
      "(1, 3)",
      "(2, 5)",
      "(0, 1)",
      "(1, 4)",
      "(2, 6)"
    ],
    "correctMapping": {
      "(1, 3)": "Titik Terletak pada Garis",
      "(2, 5)": "Titik Terletak pada Garis",
      "(0, 1)": "Titik Terletak pada Garis",
      "(1, 4)": "Titik di Luar Garis",
      "(2, 6)": "Titik di Luar Garis"
    },
    "itemExplanations": {
      "(1, 3)": "2(1) + 1 = 3 (Cocok pada garis).",
      "(2, 5)": "2(2) + 1 = 5 (Cocok pada garis).",
      "(0, 1)": "2(0) + 1 = 1 (Cocok pada garis).",
      "(1, 4)": "2(1) + 1 = 3 ≠ 4 (Di luar garis).",
      "(2, 6)": "2(2) + 1 = 5 ≠ 6 (Di luar garis)."
    },
    "correctReason": "Hebat! Titik terletak pada garis jika koordinat x saat disubstitusi menghasilkan nilai y yang cocok.",
    "wrongExplanation": "Hitung y = 2x + 1. (1, 3), (2, 5), (0, 1) cocok. Sedangkan (1, 4) dan (2, 6) nilainya tidak cocok.",
    "remedialVariant": {
      "type": "DRAG_DROP",
      "title": "🎯 Remedial: Uji Titik f(x) = 3x - 1",
      "question": "Kelompokkan titik koordinat ke kotak Terletak pada Garis atau Tidak Terletak!",
      "categories": [
        "Terletak pada Garis",
        "Tidak Terletak pada Garis"
      ],
      "items": [
        "(1, 2)",
        "(2, 5)",
        "(1, 5)"
      ],
      "correctMapping": {
        "(1, 2)": "Terletak pada Garis",
        "(2, 5)": "Terletak pada Garis",
        "(1, 5)": "Tidak Terletak pada Garis"
      },
      "correctReason": "Bagus! 3(1)-1 = 2 dan 3(2)-1 = 5 terletak pada garis.",
      "wrongExplanation": "Cek substitusi: 3(1)-1=2, 3(2)-1=5.",
      "clue": "(1, 2) dan (2, 5) memenuhi rumus."
    }
  },
  {
    "id": 8,
    "chapterId": 4,
    "type": "SLOT_FILL",
    "title": "🧩 Melengkapi Tabel Koordinat f(x) = 2x",
    "question": "Diketahui grafik fungsi f(x) = 2x. Lengkapi nilai ordinat y pada pasangan titik koordinat (x, y) di bawah!",
    "slots": [
      {
        "id": "s1",
        "label": "Untuk x = 1 ➔ Titik koordinat adalah (1, [ ? ]):",
        "answer": "2"
      },
      {
        "id": "s2",
        "label": "Untuk x = 2 ➔ Titik koordinat adalah (2, [ ? ]):",
        "answer": "4"
      },
      {
        "id": "s3",
        "label": "Untuk x = 3 ➔ Titik koordinat adalah (3, [ ? ]):",
        "answer": "6"
      }
    ],
    "tokens": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "correctReason": "Sempurna! Nilai y = 2(1)=2, 2(2)=4, 2(3)=6. Pasangan titik (1, 2), (2, 4), (3, 6) siap digambar.",
    "wrongExplanation": "Kalikan nilai x dengan 2: 2×1=2, 2×2=4, 2×3=6.",
    "clue": "x dikalikan 2 untuk mendapatkan nilai y.",
    "remedialVariant": {
      "type": "SLOT_FILL",
      "title": "🧩 Remedial: Tabel Koordinat f(x) = 3x",
      "question": "Lengkapi nilai y pada tabel koordinat f(x) = 3x!",
      "slots": [
        {
          "id": "s1",
          "label": "Untuk x = 1 ➔ Titik koordinat adalah (1, [ ? ]):",
          "answer": "3"
        },
        {
          "id": "s2",
          "label": "Untuk x = 2 ➔ Titik koordinat adalah (2, [ ? ]):",
          "answer": "6"
        },
        {
          "id": "s3",
          "label": "Untuk x = 3 ➔ Titik koordinat adalah (3, [ ? ]):",
          "answer": "9"
        }
      ],
      "tokens": [
        "3",
        "4",
        "6",
        "8",
        "9"
      ],
      "correctReason": "Tepat! y = 3, 6, dan 9.",
      "wrongExplanation": "Kalikan x dengan 3: 1×3=3, 2×3=6, 3×3=9.",
      "clue": "3, 6, 9."
    }
  },
  {
    "id": 9,
    "chapterId": 4,
    "type": "CARTESIAN",
    "title": "📍 Plot Garis Melalui Titik Asal: f(x) = 3x pada Kartesius",
    "question": "Tandai 3 titik koordinat pada bidang Kartesius untuk garis f(x) = 3x dengan x = 0, 1, dan 2!",
    "minX": 0,
    "maxX": 5,
    "minY": 0,
    "maxY": 7,
    "targetPoints": [
      [
        0,
        0
      ],
      [
        1,
        3
      ],
      [
        2,
        6
      ]
    ],
    "correctReason": "Luar biasa! Garis f(x) = 3x condong curam ke atas karena gradiennya cukup besar (m = 3) pada bidang Kartesius.",
    "wrongExplanation": "Titik koordinatnya:\n• x = 0 ➔ 3(0) = 0 ➔ (0, 0)\n• x = 1 ➔ 3(1) = 3 ➔ (1, 3)\n• x = 2 ➔ 3(2) = 6 ➔ (2, 6)",
    "clue": "Tandai titik (0, 0), (1, 3), dan (2, 6).",
    "remedialVariant": {
      "type": "CARTESIAN",
      "title": "📍 Remedial: Plot Garis f(x) = 2x pada Kartesius",
      "question": "Tandai titik koordinat garis f(x) = 2x pada diagram Kartesius untuk x = 0, 1, dan 2: titik (0, 0), (1, 2), dan (2, 4)!",
      "minX": 0,
      "maxX": 5,
      "minY": 0,
      "maxY": 6,
      "targetPoints": [
        [
          0,
          0
        ],
        [
          1,
          2
        ],
        [
          2,
          4
        ]
      ],
      "correctReason": "Sempurna! Titik (0, 0), (1, 2), dan (2, 4) terpasang tepat pada diagram Kartesius.",
      "wrongExplanation": "Tandai titik (0, 0), (1, 2), dan (2, 4).",
      "clue": "Titik (0, 0), (1, 2), dan (2, 4)."
    }
  },
  {
    "id": 10,
    "chapterId": 4,
    "type": "CARTESIAN",
    "title": "📍 Plot Titik Garis f(x) = x + 3 pada Kartesius",
    "question": "Tandai 3 titik koordinat pada bidang Kartesius untuk garis f(x) = x + 3 dengan x = 0, 1, dan 2!",
    "minX": 0,
    "maxX": 5,
    "minY": 0,
    "maxY": 6,
    "targetPoints": [
      [
        0,
        3
      ],
      [
        1,
        4
      ],
      [
        2,
        5
      ]
    ],
    "correctReason": "Sempurna! Titik (0, 3), (1, 4), dan (2, 5) terpasang presisi dengan titik potong sumbu Y di (0, 3) pada bidang Kartesius.",
    "wrongExplanation": "x = 0 ➔ 0 + 3 = 3 ➔ (0, 3)\nx = 1 ➔ 1 + 3 = 4 ➔ (1, 4)\nx = 2 ➔ 2 + 3 = 5 ➔ (2, 5)",
    "clue": "Klik koordinat (0, 3), (1, 4), dan (2, 5).",
    "remedialVariant": {
      "type": "CARTESIAN",
      "title": "📍 Remedial: Plot Titik Garis f(x) = x + 1 pada Kartesius",
      "question": "Tandai 3 titik koordinat untuk f(x) = x + 1 pada diagram Kartesius: titik (0, 1), (1, 2), dan (2, 3)!",
      "minX": 0,
      "maxX": 5,
      "minY": 0,
      "maxY": 5,
      "targetPoints": [
        [
          0,
          1
        ],
        [
          1,
          2
        ],
        [
          2,
          3
        ]
      ],
      "correctReason": "Tepat! Titik (0, 1), (1, 2), dan (2, 3) membentuk garis f(x) = x + 1 pada diagram Kartesius.",
      "wrongExplanation": "Tandai titik (0, 1), (1, 2), dan (2, 3).",
      "clue": "x=0 y=1, x=1 y=2, x=2 y=3."
    }
  }
];
