/**
 * LATIHAN CHAPTER 2: PENGERTIAN & UNSUR FUNGSI (DOMAIN, KODOMAIN, RANGE)
 * 10 Soal Interaktif Taktil + 10 Remedial Variant (100% Interaktif)
 */

export const EXERCISE_CHAPTER_2 = [
  {
    "id": 1,
    "chapterId": 2,
    "type": "MCQ",
    "title": "🎯 Syarat Utama Fungsi",
    "question": "Manakah syarat mutlak agar suatu relasi dari himpunan A ke himpunan B dapat disebut sebagai FUNGSI?",
    "options": [
      "Setiap anggota himpunan B harus memiliki pasangan di A",
      "Setiap anggota himpunan A berpasangan dengan tepat satu anggota himpunan B",
      "Anggota himpunan A boleh memiliki lebih dari satu pasangan di B",
      "Jumlah anggota himpunan A harus selalu sama dengan himpunan B"
    ],
    "correct": "Setiap anggota himpunan A berpasangan dengan tepat satu anggota himpunan B",
    "correctReason": "Tepat sekali! Syarat utama fungsi adalah: setiap anggota himpunan asal (A) wajib memiliki pasangan dan pasangannya harus tepat satu (tidak boleh kosong dan tidak boleh bercabang).",
    "wrongExplanation": "Fungsi mensyaratkan setiap anggota daerah asal memiliki tepat satu kawan.",
    "explanation": "Tepat sekali! Syarat utama fungsi adalah: setiap anggota himpunan A wajib punya pasangan, dan pasangannya harus tepat satu (tidak bercabang dan tidak kosong).",
    "clue": "Fokus pada himpunan asal (A): wajib setia (tepat 1 pasangan) dan tidak boleh kosong.",
    "distractorAnalysis": {
      "Setiap anggota himpunan B harus memiliki pasangan di A": "Kodomain (B) boleh ada yang tidak terpilih pada fungsi biasa.",
      "Anggota himpunan A boleh memiliki lebih dari satu pasangan di B": "Domain (A) tidak boleh bercabang memiliki lebih dari satu pasangan.",
      "Jumlah anggota himpunan A harus selalu sama dengan himpunan B": "Jumlah anggota A dan B tidak harus sama pada fungsi biasa."
    },
    "remedialVariant": {
      "type": "MCQ",
      "title": "🎯 Remedial: Syarat Utama Fungsi",
      "question": "Apa syarat utama bagi anggota daerah asal (domain) pada sebuah fungsi?",
      "options": [
        "Boleh bercabang memiliki dua pasangan",
        "Boleh tidak memilih pasangan sama sekali",
        "Harus memiliki tepat satu pasangan di daerah kawan",
        "Harus memilih semua anggota daerah kawan"
      ],
      "correct": "Harus memiliki tepat satu pasangan di daerah kawan",
      "correctReason": "Benar! Setiap anggota domain harus memiliki tepat satu pasangan.",
      "wrongExplanation": "Domain wajib memiliki tepat satu kawan di kodomain.",
      "explanation": "Benar! Setiap anggota domain harus memiliki tepat satu pasangan.",
      "clue": "Anggota domain tidak boleh bercabang dan tidak boleh kosong."
    }
  },
  {
    "id": 2,
    "chapterId": 2,
    "type": "ARROW_BUILDER_2STEP",
    "title": "🏹 Diagram Panah 2-Langkah: Fungsi 'Ditambah 1'",
    "question": "Langkah 1: Tempatkan anggota domain {1, 2, 3} ke Himpunan A dan kodomain {2, 3, 4} ke Himpunan B. Langkah 2: Hubungkan panah fungsi dengan aturan 'Ditambah 1'!",
    "subInstruction": "Isi kotak kosong dengan kartu angka, lalu sambungkan panahnya!",
    "labelA": "Himpunan A (Domain)",
    "labelB": "Himpunan B (Kodomain)",
    "expectedSetA": [
      "1",
      "2",
      "3"
    ],
    "expectedSetB": [
      "2",
      "3",
      "4"
    ],
    "availableTokens": [
      "1",
      "2",
      "3",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctPairs": [
      "1->2",
      "2->3",
      "3->4"
    ],
    "rule": "Setiap anggota A ditambah 1 menghasilkan pasangannya di B: 1->2, 2->3, 3->4",
    "correctReason": "Sempurna! Kamu telah menyusun anggota himpunan ke kotak-kotak kosong dan menghubungkan seluruh panah fungsi 'Ditambah 1' dengan sangat tepat!",
    "wrongExplanation": "Isi Himpunan A dengan {1, 2, 3} dan Himpunan B dengan {2, 3, 4}. Sambungkan panah: 1->2, 2->3, 3->4.",
    "clue": "1+1=2, 2+1=3, 3+1=4.",
    "remedialVariant": {
      "type": "ARROW_BUILDER_2STEP",
      "title": "🏹 Remedial: Diagram Panah 'Ditambah 2'",
      "question": "Langkah 1: Tempatkan anggota domain {2, 3} ke Himpunan A dan kodomain {4, 5} ke Himpunan B. Langkah 2: Hubungkan panah fungsi 'Ditambah 2'!",
      "labelA": "Himpunan A",
      "labelB": "Himpunan B",
      "expectedSetA": [
        "2",
        "3"
      ],
      "expectedSetB": [
        "4",
        "5"
      ],
      "availableTokens": [
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "correctPairs": [
        "2->4",
        "3->5"
      ],
      "rule": "Setiap anggota A ditambah 2 menghasilkan pasangannya di B: 2->4, 3->5",
      "correctReason": "Tepat! Elemen himpunan dan panah fungsi 'Ditambah 2' terpasang dengan benar.",
      "wrongExplanation": "Hubungkan 2 ke 4 dan 3 ke 5.",
      "clue": "2+2=4, 3+2=5."
    }
  },
  {
    "id": 3,
    "chapterId": 2,
    "type": "SLOT_FILL",
    "title": "🧩 Tentukan Himpunan Domain dan Kodomain",
    "question": "Diketahui fungsi f = {(1, a), (2, b), (3, b), (4, c)} dari himpunan asal A ke himpunan kawan B = {a, b, c, d}. Tentukan himpunan Domain (Daerah Asal) dan himpunan Kodomain (Daerah Kawan) dengan memasang kartu yang sesuai!",
    "subInstruction": "Pasang kartu himpunan yang tepat ke dalam kotak Domain dan Kodomain!",
    "slots": [
      {
        "id": "s1",
        "label": "Himpunan Domain (Daerah Asal):",
        "answer": "{1, 2, 3, 4}"
      },
      {
        "id": "s2",
        "label": "Himpunan Kodomain (Daerah Kawan):",
        "answer": "{a, b, c, d}"
      }
    ],
    "tokens": [
      "{1, 2, 3, 4}",
      "{a, b, c, d}",
      "{a, b, c}",
      "{1, 2, 3}",
      "{b, c, d}"
    ],
    "correctReason": "Tepat sekali! Domain adalah seluruh elemen himpunan asal yaitu {1, 2, 3, 4}, sedangkan Kodomain adalah seluruh elemen himpunan kawan tujuan yaitu {a, b, c, d}.",
    "wrongExplanation": "Domain adalah semua elemen asal (posisi depan): {1, 2, 3, 4}. Kodomain adalah seluruh himpunan kawan tujuan: {a, b, c, d} (sedangkan {a, b, c} adalah Range).",
    "clue": "Domain berisi semua angka di depan pasangan {1, 2, 3, 4}. Kodomain adalah seluruh anggota himpunan kawan B {a, b, c, d}.",
    "remedialVariant": {
      "question": "Diketahui fungsi g = {(2, p), (4, q), (6, r)} dari himpunan P ke himpunan kawan Q = {p, q, r, s}. Pasangkan kartu himpunan Domain dan Kodomain!",
      "slots": [
        {
          "id": "s1",
          "label": "Himpunan Domain (Daerah Asal):",
          "answer": "{2, 4, 6}"
        },
        {
          "id": "s2",
          "label": "Himpunan Kodomain (Daerah Kawan):",
          "answer": "{p, q, r, s}"
        }
      ],
      "tokens": [
        "{2, 4, 6}",
        "{p, q, r, s}",
        "{p, q, r}",
        "{2, 4}"
      ],
      "correctReason": "Bagus sekali! Domain adalah {2, 4, 6} dan Kodomain adalah {p, q, r, s}.",
      "wrongExplanation": "Domain = {2, 4, 6}, Kodomain = {p, q, r, s}.",
      "clue": "Elemen asal di depan adalah {2, 4, 6}. Himpunan kawan tujuan adalah {p, q, r, s}."
    }
  },
  {
    "id": 4,
    "chapterId": 2,
    "type": "DRAG_DROP",
    "title": "🎯 Pindahkan Kartu: Domain vs Range",
    "question": "Diketahui fungsi f = {(2, 10), (3, 15), (4, 20)}. Kelompokkan setiap elemen kartu ke dalam kotak 'Domain (Daerah Asal)' atau 'Range (Daerah Hasil)'!",
    "subInstruction": "Pindahkan angka depan ke kotak Domain dan angka belakang ke kotak Range!",
    "categories": [
      "Domain (Daerah Asal / x)",
      "Range (Daerah Hasil / y)"
    ],
    "items": [
      "2",
      "3",
      "4",
      "10",
      "15",
      "20"
    ],
    "correctMapping": {
      "2": "Domain (Daerah Asal / x)",
      "3": "Domain (Daerah Asal / x)",
      "4": "Domain (Daerah Asal / x)",
      "10": "Range (Daerah Hasil / y)",
      "15": "Range (Daerah Hasil / y)",
      "20": "Range (Daerah Hasil / y)"
    },
    "itemExplanations": {
      "2": "Angka 2 berada di posisi depan (nilai x) ➔ Domain.",
      "3": "Angka 3 berada di posisi depan (nilai x) ➔ Domain.",
      "4": "Angka 4 berada di posisi depan (nilai x) ➔ Domain.",
      "10": "Angka 10 berada di posisi belakang (nilai y) ➔ Range.",
      "15": "Angka 15 berada di posisi belakang (nilai y) ➔ Range.",
      "20": "Angka 20 berada di posisi belakang (nilai y) ➔ Range."
    },
    "correctReason": "Bagus sekali! Elemen depan adalah Domain {2, 3, 4}, dan elemen belakang adalah Range {10, 15, 20}.",
    "wrongExplanation": "Angka di posisi depan = Domain {2, 3, 4}. Angka di posisi belakang = Range {10, 15, 20}.",
    "clue": "Domain = nilai x (depan). Range = nilai y (belakang).",
    "remedialVariant": {
      "question": "Kelompokkan elemen pasangan {(1, 6), (3, 8)} ke Domain atau Range!",
      "categories": [
        "Domain (Daerah Asal / x)",
        "Range (Daerah Hasil / y)"
      ],
      "items": [
        "1",
        "6",
        "3",
        "8"
      ],
      "correctMapping": {
        "1": "Domain (Daerah Asal / x)",
        "3": "Domain (Daerah Asal / x)",
        "6": "Range (Daerah Hasil / y)",
        "8": "Range (Daerah Hasil / y)"
      },
      "correctReason": "Tepat! 1 dan 3 adalah domain, 6 dan 8 adalah range.",
      "wrongExplanation": "Depan = domain, belakang = range.",
      "clue": "Depan = domain, belakang = range."
    }
  },
  {
    "id": 5,
    "chapterId": 2,
    "type": "CARTESIAN",
    "title": "📍 Plot Titik: Uji Pasangan Fungsi pada Kartesius",
    "question": "Diketahui pasangan titik relasi fungsi: (1, 2), (2, 3), dan (3, 4) dengan daerah asal {1, 2, 3}. Tandai ketiga titik koordinat (x, y) tersebut pada diagram Kartesius!",
    "minX": 0,
    "maxX": 5,
    "minY": 0,
    "maxY": 6,
    "targetPoints": [
      [
        1,
        2
      ],
      [
        2,
        3
      ],
      [
        3,
        4
      ]
    ],
    "correctReason": "Hebat! Titik (1, 2), (2, 3), dan (3, 4) terpasang tepat. Setiap anggota daerah asal (x) memiliki tepat satu kawan (y) sehingga membentuk fungsi yang sah!",
    "wrongExplanation": "Tandai ketiga pasangan titik koordinat pada diagram Kartesius:\n• x = 1 dipasangkan ke y = 2 ➔ (1, 2)\n• x = 2 dipasangkan ke y = 3 ➔ (2, 3)\n• x = 3 dipasangkan ke y = 4 ➔ (3, 4)",
    "clue": "Tandai titik (1, 2), (2, 3), dan (3, 4).",
    "remedialVariant": {
      "question": "Tandai titik koordinat relasi fungsi untuk pasangan (2, 3) dan (3, 4) pada diagram Kartesius!",
      "minX": 0,
      "maxX": 5,
      "minY": 0,
      "maxY": 6,
      "targetPoints": [
        [
          2,
          3
        ],
        [
          3,
          4
        ]
      ],
      "correctReason": "Bagus! Titik (2, 3) dan (3, 4) terpasang tepat.",
      "wrongExplanation": "Tandai (2, 3) dan (3, 4).",
      "clue": "x=2 y=3 dan x=3 y=4."
    }
  },
  {
    "id": 6,
    "chapterId": 2,
    "type": "ARROWS",
    "ruleType": "OPEN_ENDED_FUNCTION",
    "title": "🏹 Tantangan Bebas: Bangun Sebuah Fungsi!",
    "question": "Diberikan himpunan siswa A = {Andi, Budi, Citra} dan himpunan hobi B = {Melukis, Berenang, Membaca, Musik}. Hubungkan panah dari himpunan A ke himpunan B sehingga membentuk FUNGSI yang sah! Kamu bebas memilihkan hobi untuk setiap siswa sesukamu, asalkan memenuhi syarat mutlak fungsi (setiap siswa di daerah asal wajib memiliki tepat satu pasangan hobi)!",
    "setA": [
      "Andi",
      "Budi",
      "Citra"
    ],
    "setB": [
      "Melukis",
      "Berenang",
      "Membaca",
      "Musik"
    ],
    "correctReason": "Luar biasa! Relasi yang kamu buat sah sebagai FUNGSI. Setiap siswa di daerah asal (domain) memiliki tepat satu pasangan hobi di kodomain (tidak kosong dan tidak bercabang).",
    "wrongExplanation": "Syarat fungsi: setiap siswa di himpunan asal (A) wajib memilih tepat 1 hobi di himpunan B (tidak boleh kosong dan tidak boleh lebih dari 1).",
    "clue": "Tarik 1 panah dari setiap siswa di himpunan A. Pilihan hobinya bebas sesukamu!",
    "remedialVariant": {
      "type": "ARROWS",
      "ruleType": "OPEN_ENDED_FUNCTION",
      "title": "🏹 Tantangan Bebas: Bangun Fungsi Sah",
      "question": "Hubungkan panah dari himpunan siswa A = {Rani, Doni} ke pilihan ekskul B = {Catur, Robotik, Voli} sehingga membentuk sebuah FUNGSI yang sah! Bebas pasangkan asalkan setiap siswa punya tepat 1 pilihan.",
      "setA": [
        "Rani",
        "Doni"
      ],
      "setB": [
        "Catur",
        "Robotik",
        "Voli"
      ],
      "correctReason": "Hebat! Setiap siswa memiliki tepat satu panah ke ekskul pilihan mereka, sehingga membentuk fungsi yang sah!",
      "wrongExplanation": "Pastikan Rani dan Doni masing-masing memiliki tepat 1 panah ke daerah kawan.",
      "clue": "Tarik tepat 1 panah dari Rani dan 1 panah dari Doni."
    }
  },
  {
    "id": 7,
    "chapterId": 2,
    "type": "DRAG_DROP",
    "title": "🎯 Pindahkan Kartu: Deteksi Alasan Bukan Fungsi",
    "question": "Kedua relasi di bawah ini BUKAN fungsi. Kelompokkan kartu relasi ke dalam kotak alasan pelanggarannya yang tepat!",
    "subInstruction": "Tentukan apakah relasi melanggar karena 'Ada Cabang (Punya Lebih dari 1 Pasangan)' atau 'Ada Anggota Asal Kosong'!",
    "categories": [
      "Pelanggaran: Bercabang",
      "Pelanggaran: Ada Anggota Kosong"
    ],
    "items": [
      "A={1, 2} ke B={a, b} : {(1, a), (1, b), (2, b)}",
      "A={1, 2, 3} ke B={a, b} : {(1, a), (2, b)}"
    ],
    "correctMapping": {
      "A={1, 2} ke B={a, b} : {(1, a), (1, b), (2, b)}": "Pelanggaran: Bercabang",
      "A={1, 2, 3} ke B={a, b} : {(1, a), (2, b)}": "Pelanggaran: Ada Anggota Kosong"
    },
    "itemExplanations": {
      "A={1, 2} ke B={a, b} : {(1, a), (1, b), (2, b)}": "Elemen 1 memiliki 2 pasangan (a dan b) ➔ Pelanggaran cabang.",
      "A={1, 2, 3} ke B={a, b} : {(1, a), (2, b)}": "Elemen 3 tidak memiliki pasangan sama sekali ➔ Pelanggaran kosong."
    },
    "correctReason": "Sempurna! Kamu memahami dua larangan utama fungsi: tidak boleh ada yang bercabang, dan tidak boleh ada anggota asal yang kosong.",
    "wrongExplanation": "Fungsi melarang cabang (1 ke banyak) dan melarang anggota asal yang tidak berpasangan.",
    "clue": "Relasi pertama: 1 bercabang ke a dan b. Relasi kedua: 3 tidak ada pasangan.",
    "remedialVariant": {
      "question": "Pindahkan ke kotak 'Bercabang' atau 'Ada yang Kosong'!",
      "categories": [
        "Pelanggaran: Bercabang",
        "Pelanggaran: Ada Anggota Kosong"
      ],
      "items": [
        "{(2, x), (2, y)}",
        "A={4, 5} : {(4, x)}"
      ],
      "correctMapping": {
        "{(2, x), (2, y)}": "Pelanggaran: Bercabang",
        "A={4, 5} : {(4, x)}": "Pelanggaran: Ada Anggota Kosong"
      },
      "correctReason": "Tepat! 2 bercabang dan 5 kosong.",
      "wrongExplanation": "2 bercabang, 5 kosong.",
      "clue": "2 kembar = bercabang, 5 hilang = kosong."
    }
  },
  {
    "id": 8,
    "chapterId": 2,
    "type": "SLOT_FILL",
    "title": "🧩 Tentukan Himpunan Kodomain dan Range",
    "question": "Diketahui relasi fungsi dari himpunan asal A = {1, 2, 3} ke himpunan kawan B = {2, 4, 6, 8} dengan pasangan {(1, 2), (2, 4), (3, 4)}. Tentukan himpunan Kodomain dan himpunan Range dengan memasang kartu himpunan yang tepat!",
    "subInstruction": "Pasang kartu himpunan ke kotak Kodomain dan Range yang sesuai!",
    "slots": [
      {
        "id": "s1",
        "label": "Himpunan Kodomain (Daerah Kawan B):",
        "answer": "{2, 4, 6, 8}"
      },
      {
        "id": "s2",
        "label": "Himpunan Range (Daerah Hasil):",
        "answer": "{2, 4}"
      }
    ],
    "tokens": [
      "{2, 4, 6, 8}",
      "{2, 4}",
      "{1, 2, 3}",
      "{6, 8}",
      "{2, 4, 6}"
    ],
    "correctReason": "Luar biasa tepat! Kodomain adalah seluruh himpunan di kanan {2, 4, 6, 8}, sedangkan Range hanyalah anggota kawan yang terhubung panah pasangan yaitu {2, 4}.",
    "wrongExplanation": "Kodomain mencakup seluruh anggota himpunan kawan B = {2, 4, 6, 8}. Range adalah anggota kawan yang terpasangkan, yaitu {2, 4}.",
    "clue": "Kodomain = semua anggota B. Range = hanya {2, 4} yang mendapat pasangan.",
    "remedialVariant": {
      "question": "Diketahui pasangan fungsi {(1, 3), (2, 5)} dari A = {1, 2} ke himpunan kawan B = {3, 5, 7}. Tentukan himpunan Kodomain dan Range!",
      "slots": [
        {
          "id": "s1",
          "label": "Himpunan Kodomain (Daerah Kawan B):",
          "answer": "{3, 5, 7}"
        },
        {
          "id": "s2",
          "label": "Himpunan Range (Daerah Hasil):",
          "answer": "{3, 5}"
        }
      ],
      "tokens": [
        "{3, 5, 7}",
        "{3, 5}",
        "{1, 2}",
        "{7}"
      ],
      "correctReason": "Tepat sekali! Kodomain adalah seluruh kawan {3, 5, 7} dan Range adalah kawan terpasang {3, 5}.",
      "wrongExplanation": "Kodomain = {3, 5, 7}, Range yang terpasang = {3, 5}.",
      "clue": "Kodomain adalah {3, 5, 7}, Range adalah {3, 5}."
    }
  },
  {
    "id": 9,
    "chapterId": 2,
    "type": "CARTESIAN",
    "title": "📍 Plot Titik: Himpunan Pasangan Fungsi pada Kartesius",
    "question": "Diketahui himpunan pasangan berurutan fungsi f = {(1, 2), (2, 4), (3, 6)} dengan daerah asal {1, 2, 3}. Tandai 3 titik koordinat (x, y) tersebut pada diagram Kartesius!",
    "minX": 0,
    "maxX": 5,
    "minY": 0,
    "maxY": 8,
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
    "correctReason": "Sempurna! Ketiga titik (1, 2), (2, 4), dan (3, 6) terpasang tepat pada diagram Kartesius. Tidak ada titik yang bertumpuk vertikal sehingga relasi ini sah sebagai fungsi!",
    "wrongExplanation": "Tandai ketiga titik koordinat:\n• (1, 2) ➔ x=1, y=2\n• (2, 4) ➔ x=2, y=4\n• (3, 6) ➔ x=3, y=6",
    "clue": "Tandai titik (1, 2), (2, 4), dan (3, 6).",
    "remedialVariant": {
      "question": "Tandai titik pasangan berurutan fungsi untuk (1, 2) dan (2, 4) pada diagram Kartesius!",
      "minX": 0,
      "maxX": 5,
      "minY": 0,
      "maxY": 8,
      "targetPoints": [
        [
          1,
          2
        ],
        [
          2,
          4
        ]
      ],
      "correctReason": "Tepat! Titik (1, 2) dan (2, 4) terpasang dengan benar pada diagram Kartesius.",
      "wrongExplanation": "Tandai (1, 2) dan (2, 4).",
      "clue": "x=1 y=2 dan x=2 y=4."
    }
  },
  {
    "id": 10,
    "chapterId": 2,
    "type": "DRAG_DROP",
    "title": "🎯 Pindahkan Kartu: Domain, Kodomain, dan Range",
    "question": "Diketahui himpunan asal A = {1, 2}, himpunan tujuan B = {a, b, c}, dan fungsi f = {(1, a), (2, b)}. Kelompokkan setiap elemen kartu di bawah ke dalam kotak kategori yang tepat!",
    "subInstruction": "Pindahkan setiap elemen ke kotak Domain, Kodomain, atau Range!",
    "categories": [
      "Domain (Himpunan Asal)",
      "Kodomain (Himpunan Kawan)",
      "Range (Daerah Hasil)"
    ],
    "items": [
      "Elemen 1",
      "Elemen c",
      "Elemen b",
      "Elemen 2"
    ],
    "correctMapping": {
      "Elemen 1": "Domain (Himpunan Asal)",
      "Elemen c": "Kodomain (Himpunan Kawan)",
      "Elemen b": "Range (Daerah Hasil)",
      "Elemen 2": "Domain (Himpunan Asal)"
    },
    "itemExplanations": {
      "Elemen 1": "Angka 1 adalah anggota himpunan asal A ➔ Domain.",
      "Elemen c": "Huruf c ada di himpunan kawan B tetapi tidak mendapat panah pasangan ➔ Hanya Kodomain.",
      "Elemen b": "Huruf b terpilih sebagai pasangan dari 2 ➔ Termasuk Range (daerah hasil).",
      "Elemen 2": "Angka 2 adalah anggota himpunan asal A ➔ Domain."
    },
    "correctReason": "Hebat! Kamu bisa membedakan dengan sempurna antara seluruh kawan (Kodomain) dan kawan yang terpilih (Range).",
    "wrongExplanation": "Domain = asal {1, 2}. Kodomain = seluruh kawan {a, b, c}. Range = hanya yang terpilih {a, b}.",
    "clue": "Elemen asal (1, 2) adalah domain, c tidak dipilih jadi kodomain murni, b dipilih jadi range.",
    "remedialVariant": {
      "question": "Kelompokkan elemen ke Domain, Kodomain, atau Range untuk f = {(3, 8)} dari A={3} ke B={8, 9}!",
      "categories": [
        "Domain (Himpunan Asal)",
        "Kodomain (Himpunan Kawan)",
        "Range (Daerah Hasil)"
      ],
      "items": [
        "Elemen 3",
        "Elemen 8",
        "Elemen 9"
      ],
      "correctMapping": {
        "Elemen 3": "Domain (Himpunan Asal)",
        "Elemen 8": "Range (Daerah Hasil)",
        "Elemen 9": "Kodomain (Himpunan Kawan)"
      },
      "correctReason": "Tepat! Asal = domain, hasil terpilih = range, kawan tanpa pasangan = kodomain murni.",
      "wrongExplanation": "Asal = domain, hasil terpasang = range, kawan sisa = kodomain.",
      "clue": "3 di asal, 8 terpasang, 9 di kawan tanpa pasangan."
    }
  }
];
