/**
 * LATIHAN CHAPTER 3: NOTASI, NILAI, DAN RUMUS FUNGSI
 * 10 Soal Interaktif Taktil + 10 Remedial Variant (100% Interaktif)
 */

export const EXERCISE_CHAPTER_3 = [
  {
    "id": 1,
    "chapterId": 3,
    "type": "SLOT_FILL",
    "title": "🧩 Hitung Nilai Fungsi: f(4)",
    "question": "Sebuah fungsi bekerja dengan rumus f(x) = 3x + 5. Untuk nilai x = 4, tentukan nilai bayangan f(4) dengan melengkapi langkah perhitungan pada kotak [ ? ]!",
    "subInstruction": "Pilih kartu angka dari kotak pilihan lalu pasang ke dalam setiap kotak [ ? ]!",
    "slots": [
      {
        "id": "s1",
        "label": "Substitusi x = 4 ➔ Nilai suku 3(4) =",
        "answer": "12"
      },
      {
        "id": "s2",
        "label": "Nilai bayangan akhir f(4) =",
        "answer": "17"
      }
    ],
    "tokens": [
      "10",
      "12",
      "15",
      "17",
      "20"
    ],
    "correctReason": "Tepat sekali! Substitusikan x = 4: f(4) = 3(4) + 5 = 12 + 5 = 17.",
    "wrongExplanation": "Kerjakan perkalian terlebih dahulu: 3 × 4 = 12, kemudian tambahkan 5 = 17.",
    "clue": "Kalikan 3 dengan 4 terlebih dahulu, lalu tambahkan dengan 5.",
    "remedialVariant": {
      "question": "Mesin fungsi bekerja dengan rumus f(x) = 4x + 3. Lengkapi perhitungan f(5)!",
      "slots": [
        {
          "id": "s1",
          "label": "Substitusi x = 5 ➔ Nilai suku 4(5) =",
          "answer": "20"
        },
        {
          "id": "s2",
          "label": "Nilai bayangan akhir f(5) =",
          "answer": "23"
        }
      ],
      "tokens": [
        "15",
        "20",
        "23",
        "25",
        "27"
      ],
      "correctReason": "Benar! f(5) = 4(5) + 3 = 20 + 3 = 23.",
      "wrongExplanation": "4 × 5 = 20, lalu 20 + 3 = 23.",
      "clue": "Hitung 4 × 5 lalu tambah 3."
    }
  },
  {
    "id": 2,
    "chapterId": 3,
    "type": "SLOT_FILL",
    "title": "🧩 Nilai x Negatif: Hitung f(−3)",
    "question": "Diketahui rumus fungsi f(x) = 2x − 7. Lengkapi langkah perhitungan f(−3) dengan kartu angka yang tepat agar tidak keliru tanda negatif!",
    "subInstruction": "Pasang kartu angka ke kotak perhitungan [ ? ]!",
    "slots": [
      {
        "id": "s1",
        "label": "Substitusi x = −3 ➔ Nilai suku 2(−3) =",
        "answer": "-6"
      },
      {
        "id": "s2",
        "label": "Nilai bayangan akhir f(−3) =",
        "answer": "-13"
      }
    ],
    "tokens": [
      "-6",
      "6",
      "-1",
      "-13",
      "13"
    ],
    "correctReason": "Luar biasa teliti! 2 × (−3) = −6, lalu −6 − 7 = −13. Penanganan tanda negatifmu sangat akurat!",
    "wrongExplanation": "Ingat aturan tanda: positif dikali negatif menghasilkan negatif (2 × −3 = −6). Lalu −6 − 7 = −13.",
    "clue": "2 dikali −3 menghasilkan −6. Lalu −6 dikurangi 7 menghasilkan −13.",
    "remedialVariant": {
      "question": "Diketahui f(x) = 3x − 4. Lengkapi perhitungan f(−2)!",
      "slots": [
        {
          "id": "s1",
          "label": "Substitusi x = −2 ➔ Nilai suku 3(−2) =",
          "answer": "-6"
        },
        {
          "id": "s2",
          "label": "Nilai bayangan akhir f(−2) =",
          "answer": "-10"
        }
      ],
      "tokens": [
        "-6",
        "6",
        "-2",
        "-10",
        "10"
      ],
      "correctReason": "Hebat! 3 × (−2) = −6, lalu −6 − 4 = −10.",
      "wrongExplanation": "3 × (−2) = −6, lalu −6 − 4 = −10.",
      "clue": "Positif × negatif = negatif."
    }
  },
  {
    "id": 3,
    "chapterId": 3,
    "type": "SLOT_FILL",
    "title": "🧩 Menentukan Prapeta (Nilai x)",
    "question": "Diketahui rumus fungsi f(x) = 5x − 3. Jika nilai bayangan f(a) = 17, lengkapi langkah aljabar untuk menemukan nilai a!",
    "subInstruction": "Pindahkan kartu angka ke kotak persamaan [ ? ]!",
    "slots": [
      {
        "id": "s1",
        "label": "Persamaan aljabar: 5a − 3 = 17 ➔ 5a =",
        "answer": "20"
      },
      {
        "id": "s2",
        "label": "Nilai prapeta a =",
        "answer": "4"
      }
    ],
    "tokens": [
      "3",
      "4",
      "14",
      "20",
      "22"
    ],
    "correctReason": "Sempurna! 5a − 3 = 17 ➔ 5a = 20 ➔ a = 4. Nilai asal/prapeta terbukti 4.",
    "wrongExplanation": "Pindahkan konstanta: 5a = 17 + 3 = 20. Lalu bagi dengan koefisien: a = 20 ÷ 5 = 4.",
    "clue": "Tambahkan 17 dengan 3 (dapat 20), lalu bagi 20 dengan 5.",
    "remedialVariant": {
      "question": "Diketahui f(x) = 4x − 2. Jika f(a) = 14, tentukan nilai a!",
      "slots": [
        {
          "id": "s1",
          "label": "Persamaan aljabar: 4a − 2 = 14 ➔ 4a =",
          "answer": "16"
        },
        {
          "id": "s2",
          "label": "Nilai prapeta a =",
          "answer": "4"
        }
      ],
      "tokens": [
        "2",
        "3",
        "4",
        "12",
        "16"
      ],
      "correctReason": "Tepat! 4a = 16 ➔ a = 4.",
      "wrongExplanation": "4a = 14 + 2 = 16 ➔ a = 16 ÷ 4 = 4.",
      "clue": "14 + 2 = 16, lalu 16 ÷ 4 = 4."
    }
  },
  {
    "id": 4,
    "chapterId": 3,
    "type": "SLOT_FILL",
    "title": "🧩 Menentukan Rumus f(x) = ax + b",
    "question": "Diketahui fungsi f(x) = ax + b memiliki nilai f(1) = 5 dan f(3) = 11. Tentukan nilai koefisien a dan konstanta b dengan memasang kartu angka pada kotak [ ? ]!",
    "subInstruction": "Pasang kartu angka nilai a dan b ke kotak rumus fungsi [ ? ]!",
    "slots": [
      {
        "id": "s1",
        "label": "Nilai koefisien a =",
        "answer": "3"
      },
      {
        "id": "s2",
        "label": "Nilai konstanta b =",
        "answer": "2"
      }
    ],
    "tokens": [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "correctReason": "Luar biasa! a = (11 - 5)/(3 - 1) = 6/2 = 3. Lalu 3(1) + b = 5 ➔ b = 2. Rumus fungsi adalah f(x) = 3x + 2.",
    "wrongExplanation": "Cari beda nilai: a = (11 - 5) ÷ (3 - 1) = 6 ÷ 2 = 3. Lalu masukkan ke f(1): 3(1) + b = 5 ➔ b = 2.",
    "clue": "Selisih f(x) dibagi selisih x menghasilkan a = 3. Lalu cari b = 2.",
    "remedialVariant": {
      "question": "Diketahui f(1) = 4 dan f(3) = 10 untuk f(x) = ax + b. Lengkapi a dan b!",
      "slots": [
        {
          "id": "s1",
          "label": "Nilai koefisien a =",
          "answer": "3"
        },
        {
          "id": "s2",
          "label": "Nilai konstanta b =",
          "answer": "1"
        }
      ],
      "tokens": [
        "1",
        "2",
        "3",
        "4",
        "6"
      ],
      "correctReason": "Tepat! a = (10-4)/2 = 3, lalu 3(1)+b = 4 ➔ b = 1.",
      "wrongExplanation": "a = 6/2 = 3, b = 4 - 3 = 1."
    }
  },
  {
    "id": 5,
    "chapterId": 3,
    "type": "ARROWS",
    "title": "🏹 Sambungkan Fungsi f(x) = 3x − 2",
    "question": "Tarik panah dari daerah asal A = {1, 2, 3} ke daerah kawan B = {1, 4, 7} yang memenuhi rumus f(x) = 3x − 2!",
    "setA": [
      1,
      2,
      3
    ],
    "setB": [
      1,
      3,
      4,
      6,
      7
    ],
    "correctPairs": [
      "1->1",
      "2->4",
      "3->7"
    ],
    "correctReason": "Hebat! 3(1)-2 = 1, 3(2)-2 = 4, dan 3(3)-2 = 7. Seluruh panah terhubung sempurna ke bayangan yang tepat!",
    "wrongExplanation": "Hitung nilai fungsi tiap anggota:\n• x=1 ➔ 3(1)-2 = 1\n• x=2 ➔ 3(2)-2 = 4\n• x=3 ➔ 3(3)-2 = 7",
    "clue": "1 dipasangkan ke 1; 2 ke 4; 3 ke 7.",
    "remedialVariant": {
      "question": "Tarik panah fungsi f(x) = 2x + 1 dari A = {1, 2} ke pilihan bayangan di B = {2, 3, 4, 5}!",
      "setA": [
        1,
        2
      ],
      "setB": [
        2,
        3,
        4,
        5
      ],
      "correctPairs": [
        "1->3",
        "2->5"
      ],
      "correctReason": "Tepat! 2(1)+1=3 dan 2(2)+1=5."
    }
  },
  {
    "id": 6,
    "chapterId": 3,
    "type": "DRAG_DROP",
    "title": "🎯 Sortir Nilai: Positif vs Negatif",
    "question": "Diberikan rumus fungsi f(x) = 2x − 6. Pindahkan setiap kartu nilai fungsi ke dalam kelompok tanda hasil yang sesuai!",
    "subInstruction": "Pindahkan kartu ke kotak 'Hasil Positif (f(x) > 0)' atau 'Hasil Negatif (f(x) < 0)'!",
    "categories": [
      "Hasil Positif (f(x) > 0)",
      "Hasil Negatif (f(x) < 0)"
    ],
    "items": [
      "f(5)",
      "f(1)",
      "f(4)",
      "f(2)"
    ],
    "correctMapping": {
      "f(5)": "Hasil Positif (f(x) > 0)",
      "f(1)": "Hasil Negatif (f(x) < 0)",
      "f(4)": "Hasil Positif (f(x) > 0)",
      "f(2)": "Hasil Negatif (f(x) < 0)"
    },
    "itemExplanations": {
      "f(5)": "f(5) = 2(5) − 6 = 10 − 6 = 4 (> 0, Positif).",
      "f(1)": "f(1) = 2(1) − 6 = 2 − 6 = −4 (< 0, Negatif).",
      "f(4)": "f(4) = 2(4) − 6 = 8 − 6 = 2 (> 0, Positif).",
      "f(2)": "f(2) = 2(2) − 6 = 4 − 6 = −2 (< 0, Negatif)."
    },
    "correctReason": "Sangat jeli! Kamu dapat mengevaluasi dan memprediksi tanda hasil fungsi linear berdasarkan nilai masukannya.",
    "wrongExplanation": "Cek hasil hitungan: f(5)=4 dan f(4)=2 bernilai positif; f(1)=-4 dan f(2)=-2 bernilai negatif.",
    "clue": "Hitung f(x) = 2x − 6 untuk masing-masing nilai x lalu periksa apakah hasilnya positif atau negatif.",
    "remedialVariant": {
      "type": "DRAG_DROP",
      "title": "🎯 Remedial: Sortir Nilai f(x) = 3x - 9",
      "question": "Diberikan fungsi f(x) = 3x − 9. Kelompokkan ke kotak hasil positif atau negatif!",
      "categories": [
        "Hasil Positif (f(x) > 0)",
        "Hasil Negatif (f(x) < 0)"
      ],
      "items": [
        "f(4)",
        "f(1)",
        "f(5)",
        "f(2)"
      ],
      "correctMapping": {
        "f(4)": "Hasil Positif (f(x) > 0)",
        "f(1)": "Hasil Negatif (f(x) < 0)",
        "f(5)": "Hasil Positif (f(x) > 0)",
        "f(2)": "Hasil Negatif (f(x) < 0)"
      },
      "correctReason": "Tepat! Kamu bisa membedakan tanda hasil fungsi linear dengan tepat.",
      "wrongExplanation": "Periksa hasil perhitungan rumus f(x) = 3x − 9.",
      "clue": "f(4)=3 dan f(5)=6 positif. f(1)=-6 dan f(2)=-3 negatif."
    }
  },
  {
    "id": 7,
    "chapterId": 3,
    "type": "SLOT_FILL",
    "title": "🧩 Melengkapi Tabel Nilai Fungsi",
    "question": "Diketahui fungsi f(x) = 2x + 1. Lengkapi nilai bayangan f(x) pada kotak tabel [ ? ] untuk setiap nilai x yang diberikan!",
    "subInstruction": "Pasang kartu angka hasil ke kotak tabel [ ? ]!",
    "slots": [
      {
        "id": "s1",
        "label": "Bayangan untuk x = −1 ➔ f(−1) =",
        "answer": "-1"
      },
      {
        "id": "s2",
        "label": "Bayangan untuk x = 0 ➔ f(0) =",
        "answer": "1"
      },
      {
        "id": "s3",
        "label": "Bayangan untuk x = 2 ➔ f(2) =",
        "answer": "5"
      }
    ],
    "tokens": [
      "-1",
      "0",
      "1",
      "3",
      "5"
    ],
    "correctReason": "Sempurna! f(-1) = -1, f(0) = 1, dan f(2) = 5. Pola tabel nilai fungsi lengkap!",
    "wrongExplanation": "Substitusikan x: 2(-1)+1 = -1, 2(0)+1 = 1, 2(2)+1 = 5.",
    "clue": "Hitung nilai bayangan satu per satu: f(-1), f(0), dan f(2).",
    "remedialVariant": {
      "type": "SLOT_FILL",
      "title": "🧩 Remedial: Tabel Nilai f(x) = 3x + 1",
      "question": "Lengkapi nilai bayangan f(x) = 3x + 1 pada kotak tabel [ ? ]!",
      "subInstruction": "Pasang kartu angka hasil ke kotak tabel [ ? ]!",
      "slots": [
        {
          "id": "s1",
          "label": "Bayangan untuk x = −1 ➔ f(−1) =",
          "answer": "-2"
        },
        {
          "id": "s2",
          "label": "Bayangan untuk x = 0 ➔ f(0) =",
          "answer": "1"
        },
        {
          "id": "s3",
          "label": "Bayangan untuk x = 2 ➔ f(2) =",
          "answer": "7"
        }
      ],
      "tokens": [
        "-2",
        "0",
        "1",
        "4",
        "7"
      ],
      "correctReason": "Bagus! f(-1) = -2, f(0) = 1, dan f(2) = 7.",
      "wrongExplanation": "Substitusi: 3(-1)+1 = -2, 3(0)+1 = 1, 3(2)+1 = 7.",
      "clue": "Hitung f(-1), f(0), dan f(2) dengan f(x) = 3x + 1."
    }
  },
  {
    "id": 8,
    "chapterId": 3,
    "type": "CARTESIAN",
    "title": "📍 Plot Titik Koordinat f(x) = x + 2 pada Kartesius",
    "question": "Tandai 3 titik koordinat (x, f(x)) pada bidang Kartesius untuk fungsi f(x) = x + 2 dengan x = 0, 1, dan 2!",
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
    "correctReason": "Luar biasa! Titik (0, 2), (1, 3), dan (2, 4) membentuk garis lurus yang sesuai rumus f(x) = x + 2.",
    "wrongExplanation": "Pasangan koordinatnya adalah:\n• x = 0 ➔ (0, 2)\n• x = 1 ➔ (1, 3)\n• x = 2 ➔ (2, 4)",
    "clue": "Tandai titik pada (0, 2), (1, 3), dan (2, 4).",
    "remedialVariant": {
      "type": "CARTESIAN",
      "title": "📍 Remedial: Plot Titik f(x) = x + 1 pada Kartesius",
      "question": "Tandai 3 titik koordinat pada diagram Kartesius untuk f(x) = x + 1 dengan x = 0, 1, dan 2: (0, 1), (1, 2), dan (2, 3)!",
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
      "correctReason": "Sempurna! Titik (0, 1), (1, 2), dan (2, 3) membentuk garis f(x) = x + 1.",
      "wrongExplanation": "Tandai titik (0, 1), (1, 2), dan (2, 3).",
      "clue": "x=0 ➔ y=1, x=1 ➔ y=2, x=2 ➔ y=3."
    }
  },
  {
    "id": 9,
    "chapterId": 3,
    "type": "DRAG_DROP",
    "title": "🎯 Deteksi Hasil Perhitungan Benar",
    "question": "Untuk rumus fungsi f(x) = 4x − 5, kelompokkan pernyataan nilai berikut ke dalam kotak 'Perhitungan Benar' atau 'Perhitungan Salah'!",
    "categories": [
      "Perhitungan Benar",
      "Perhitungan Salah"
    ],
    "items": [
      "f(2) = 3",
      "f(3) = 8",
      "f(0) = -5",
      "f(1) = 0"
    ],
    "correctMapping": {
      "f(2) = 3": "Perhitungan Benar",
      "f(3) = 8": "Perhitungan Salah",
      "f(0) = -5": "Perhitungan Benar",
      "f(1) = 0": "Perhitungan Salah"
    },
    "itemExplanations": {
      "f(2) = 3": "4(2) - 5 = 8 - 5 = 3 (Benar).",
      "f(3) = 8": "4(3) - 5 = 12 - 5 = 7, bukan 8 (Salah).",
      "f(0) = -5": "4(0) - 5 = -5 (Benar).",
      "f(1) = 0": "4(1) - 5 = 4 - 5 = -1, bukan 0 (Salah)."
    },
    "correctReason": "Sangat teliti! Kamu berhasil menemukan kekeliruan perhitungan aljabar dengan cepat.",
    "wrongExplanation": "f(2)=3 (benar), f(3)=7 (pada kartu tertulis 8, jadi salah), f(0)=-5 (benar), f(1)=-1 (pada kartu tertulis 0, jadi salah).",
    "remedialVariant": {
      "type": "DRAG_DROP",
      "title": "🎯 Remedial: Uji Hitung f(x) = 5x - 3",
      "question": "Untuk f(x) = 5x - 3, kelompokkan ke kotak Perhitungan Benar atau Perhitungan Salah!",
      "categories": [
        "Perhitungan Benar",
        "Perhitungan Salah"
      ],
      "items": [
        "f(1) = 2",
        "f(2) = 6",
        "f(0) = -3"
      ],
      "correctMapping": {
        "f(1) = 2": "Perhitungan Benar",
        "f(2) = 6": "Perhitungan Salah",
        "f(0) = -3": "Perhitungan Benar"
      },
      "correctReason": "Tepat! f(1)=2 benar, f(2)=7 (bukan 6), f(0)=-3 benar.",
      "wrongExplanation": "5(2)-3 = 10-3 = 7, bukan 6.",
      "clue": "f(1)=2 dan f(0)=-3 benar."
    }
  },
  {
    "id": 10,
    "chapterId": 3,
    "type": "CARTESIAN",
    "title": "📍 Plot Pasangan Fungsi f(x) = 2x pada Kartesius",
    "question": "Tandai 3 titik koordinat (x, f(x)) untuk fungsi f(x) = 2x pada bidang Kartesius dengan domain x = 1, 2, dan 3!",
    "minX": 0,
    "maxX": 5,
    "minY": 0,
    "maxY": 7,
    "targetPoints": [
      [
        1,
        2
      ],
      [
        2,
        4
      ],
      [
        3,
        6
      ]
    ],
    "correctReason": "Sempurna! Titik (1, 2), (2, 4), dan (3, 6) berbaris lurus dengan gradien 2 pada bidang Kartesius.",
    "wrongExplanation": "Titik koordinat yang dicari:\n• x = 1 ➔ (1, 2)\n• x = 2 ➔ (2, 4)\n• x = 3 ➔ (3, 6)",
    "clue": "Klik koordinat (1, 2), (2, 4), dan (3, 6).",
    "remedialVariant": {
      "type": "CARTESIAN",
      "title": "📍 Remedial: Plot Titik f(x) = 3x pada Kartesius",
      "question": "Tandai titik koordinat untuk f(x) = 3x pada diagram Kartesius untuk x = 1 dan x = 2: titik (1, 3) dan (2, 6)!",
      "minX": 0,
      "maxX": 5,
      "minY": 0,
      "maxY": 7,
      "targetPoints": [
        [
          1,
          3
        ],
        [
          2,
          6
        ]
      ],
      "correctReason": "Hebat! Titik (1, 3) dan (2, 6) terplot dengan tepat pada diagram Kartesius.",
      "wrongExplanation": "Tandai titik x=1 y=3 dan x=2 y=6.",
      "clue": "Titik (1, 3) dan (2, 6)."
    }
  }
];
