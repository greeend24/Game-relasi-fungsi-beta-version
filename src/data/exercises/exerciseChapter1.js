/**
 * LATIHAN CHAPTER 1: PENGERTIAN & CARA MENYATAKAN RELASI
 * 30 Soal Interaktif + Variasi Remedial Angka Berbeda
 * Format: MCQ, TRUE_FALSE, MCQ_COMPLEX, MATCHING, ARROWS, CARTESIAN
 */

export const EXERCISE_CHAPTER_1 = [
  {
    id: 1,
    chapterId: 1,
    type: "MCQ",
    title: "🔍 Definisi Relasi",
    question: "Dalam matematika, apa yang dimaksud dengan relasi antara himpunan A dan himpunan B?",
    options: [
      "Aturan yang memasangkan anggota himpunan A dengan anggota himpunan B",
      "Operasi penjumlahan seluruh anggota himpunan A dan B",
      "Himpunan yang anggotanya harus selalu berjumlah sama",
      "Aturan yang mengharuskan semua anggota B memiliki pasangan"
    ],
    correct: "Aturan yang memasangkan anggota himpunan A dengan anggota himpunan B",
    correctReason: "Tepat sekali! Relasi adalah aturan yang mengaitkan atau memasangkan anggota suatu himpunan (daerah asal) dengan anggota himpunan lainnya.",
    wrongExplanation: "Relasi tidak mengharuskan operasi hitung tambah, dan tidak mengharuskan jumlah anggota sama. Relasi hanyalah aturan keterkaitan/pemasangan antar dua himpunan.",
    clue: "Ingat analogi 'benang merah': relasi adalah hubungan atau aturan yang menghubungkan dua pihak.",
    remedialVariant: {
      question: "Manakah pernyataan yang paling tepat mengenai pengertian relasi?",
      options: [
        "Hubungan atau aturan yang menghubungkan anggota himpunan pertama ke himpunan kedua",
        "Penggabungan dua himpunan menjadi satu himpunan baru",
        "Pengurangan jumlah anggota himpunan asal dengan anggota himpunan kawan",
        "Himpunan pasangan yang anggotanya tidak boleh berpasangan"
      ],
      correct: "Hubungan atau aturan yang menghubungkan anggota himpunan pertama ke himpunan kedua",
      correctReason: "Benar! Relasi merupakan aturan atau hubungan yang mengaitkan anggota himpunan pertama ke himpunan kedua.",
      wrongExplanation: "Relasi bukan penggabungan atau pengurangan elemen, melainkan hubungan/pemasangan antar elemen."
    }
  },
  {
    id: 2,
    chapterId: 1,
    type: "TRUE_FALSE",
    title: "📜 Cara Menyatakan Relasi",
    question: "Pernyataan: Relasi dapat dinyatakan dengan 3 cara utama, yaitu diagram panah, diagram Cartesius, dan himpunan pasangan berurutan.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Tiga cara standar paling umum untuk merepresentasikan relasi adalah diagram panah, himpunan pasangan berurutan, dan diagram Cartesius (serta rumus/kalimat).",
    wrongExplanation: "Pernyataan ini bernilai benar. Ketiga bentuk representasi visual dan aljabar ini adalah materi pokok cara menyatakan relasi.",
    clue: "Periksa kembali rangkuman materi Chapter 1 mengenai diagram panah, Cartesius, dan pasangan berurutan.",
    remedialVariant: {
      question: "Pernyataan: Diagram Cartesius BUKAN salah satu cara untuk menyatakan relasi.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Pernyataan tersebut salah, karena Diagram Cartesius justru merupakan salah satu cara resmi untuk menyatakan relasi (menggunakan titik koordinat x dan y).",
      wrongExplanation: "Diagram Cartesius adalah salah satu cara resmi menyatakan relasi, jadi pernyataan 'BUKAN cara menyatakan relasi' bernilai Salah."
    }
  },
  {
    id: 3,
    chapterId: 1,
    type: "MCQ",
    title: "🔗 Membaca Relasi Pasangan",
    question: "Perhatikan himpunan pasangan berurutan R berikut. Aturan relasi yang tepat dari himpunan pertama ke kedua adalah...",
    visual: {
      type: "ordered_pairs",
      title: "Himpunan Pasangan Berurutan R",
      setName: "R",
      pairs: [[2, 4], [3, 6], [4, 8]],
      rule: "?"
    },
    options: ["Setengah dari", "Dua kali dari", "Kuadrat dari", "Dua lebihnya dari"],
    correct: "Setengah dari",
    correctReason: "Hebat! 2 adalah setengah dari 4, 3 adalah setengah dari 6, dan 4 adalah setengah dari 8. Pola relasinya tepat: 'setengah dari'.",
    wrongExplanation: "Perhatikan arahnya: 2 ke 4 berarti 2 = 1/2 × 4 (bukan 2 kali dari 4). Jika 'dua kali dari', pasangannya terbalik seperti (4, 2).",
    clue: "Bandingkan angka depan terhadap angka belakang: 2 dibanding 4, 3 dibanding 6. Angka depan bernilai separuh dari angka belakang.",
    remedialVariant: {
      question: "Perhatikan himpunan pasangan berurutan R berikut. Aturan relasi yang tepat dari himpunan pertama ke kedua adalah...",
      visual: {
        type: "ordered_pairs",
        title: "Himpunan Pasangan Berurutan R",
        setName: "R",
        pairs: [[1, 3], [2, 6], [3, 9]],
        rule: "?"
      },
      options: ["Sepertiga dari", "Tiga kali dari", "Tiga lebihnya dari", "Kurang dari 2"],
      correct: "Sepertiga dari",
      correctReason: "Tepat sekali! 1 adalah sepertiga dari 3, 2 adalah sepertiga dari 6, dan 3 adalah sepertiga dari 9.",
      wrongExplanation: "Arah relasi dari depan ke belakang: angka depan adalah 1/3 dari angka belakang, jadi relasinya 'sepertiga dari'."
    }
  },
  {
    id: 4,
    chapterId: 1,
    type: "MCQ",
    title: "🔢 Relasi 'Faktor Dari'",
    question: "Perhatikan diagram panah relasi 'faktor dari' dari himpunan A ke B berikut. Manakah himpunan pasangan berurutan yang benar?",
    visual: {
      type: "arrow_diagram",
      labelA: "Himpunan A",
      labelB: "Himpunan B",
      setA: [2, 3],
      setB: [4, 6],
      pairs: [[2, 4], [2, 6], [3, 6]],
      statusBadge: "Faktor Dari"
    },
    options: [
      "{(2, 4), (2, 6), (3, 6)}",
      "{(2, 4), (3, 4)}",
      "{(2, 6), (3, 4)}",
      "{(2, 4), (3, 6)}"
    ],
    correct: "{(2, 4), (2, 6), (3, 6)}",
    correctReason: "Luar biasa! 2 adalah faktor dari 4 dan 6 (karena habis membagi 4 dan 6). 3 adalah faktor dari 6 (tetapi bukan faktor dari 4). Jadi pasangannya {(2, 4), (2, 6), (3, 6)}.",
    wrongExplanation: "Ingat bahwa 2 habis membagi 4 dan 6, sehingga 2 harus berpasangan dengan 4 dan juga 6. Jangan lewatkan pasangan (2, 6)!",
    clue: "Cek angka yang habis dibagi: 4 habis dibagi 2; 6 habis dibagi 2 dan 3.",
    remedialVariant: {
      question: "Perhatikan diagram panah relasi 'faktor dari' dari A ke B berikut. Pasangan berurutannya adalah...",
      visual: {
        type: "arrow_diagram",
        labelA: "Himpunan A",
        labelB: "Himpunan B",
        setA: [3, 5],
        setB: [6, 10, 15],
        pairs: [[3, 6], [3, 15], [5, 10], [5, 15]],
        statusBadge: "Faktor Dari"
      },
      options: [
        "{(3, 6), (3, 15), (5, 10), (5, 15)}",
        "{(3, 6), (5, 10)}",
        "{(3, 10), (5, 6)}",
        "{(3, 6), (3, 10), (5, 15)}"
      ],
      correct: "{(3, 6), (3, 15), (5, 10), (5, 15)}",
      correctReason: "Tepat! 3 habis membagi 6 dan 15; 5 habis membagi 10 dan 15.",
      wrongExplanation: "Periksa kelipatan: 15 habis dibagi oleh 3 maupun 5, sehingga (3, 15) dan (5, 15) wajib masuk."
    }
  },
  {
    id: 5,
    chapterId: 1,
    type: "TRUE_FALSE",
    title: "🎯 Relasi Kosong / Bebas",
    question: "Pernyataan: Pada sebuah relasi biasa, ada anggota himpunan asal yang boleh tidak mempunyai pasangan sama sekali.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Tepat! Dalam relasi umum, aturan pemasangan sangat bebas. Anggota daerah asal boleh tidak punya pasangan, boleh punya 1 pasangan, atau boleh punya banyak pasangan.",
    wrongExplanation: "Hanya pada 'fungsi' semua anggota asal wajib berpasangan tepat satu. Pada 'relasi umum', anggota boleh saja tidak memiliki kawan/pasangan.",
    clue: "Beda relasi dan fungsi: relasi adalah aturan umum yang fleksibel tanpa syarat ketat seperti fungsi.",
    remedialVariant: {
      question: "Pernyataan: Dalam relasi, satu anggota himpunan asal boleh memiliki lebih dari satu kawan di himpunan tujuan.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Benar sekali! Relasi bersifat fleksibel, satu anggota asal boleh bercabang ke beberapa anggota tujuan.",
      wrongExplanation: "Relasi tidak membatasi jumlah pasangan; cabang diperbolehkan dalam relasi biasa."
    }
  },
  {
    id: 6,
    chapterId: 1,
    type: "MATCHING",
    title: "🧩 Menjodohkan Cara Menyatakan Relasi",
    question: "Jodohkan istilah representasi relasi di kiri dengan deskripsinya yang tepat di kanan!",
    pairs: [
      { left: "Diagram Panah", right: "Kurva tertutup dengan anak panah penghubung" },
      { left: "Himpunan Pasangan Berurutan", right: "Kumpulan titik (x, y) dalam tanda kurung kurawal" },
      { left: "Diagram Cartesius", right: "Titik noktah pada bidang sumbu X dan Y" }
    ],
    rightOptions: [
      "Kurva tertutup dengan anak panah penghubung",
      "Kumpulan titik (x, y) dalam tanda kurung kurawal",
      "Titik noktah pada bidang sumbu X dan Y"
    ],
    correctReason: "Sempurna! Kamu memahami ketiga ciri visual cara menyatakan relasi dengan sangat baik.",
    wrongExplanation: "Diagram panah memakai anak panah, pasangan berurutan memakai format kurawal {(x, y)}, dan Cartesius memakai bidang koordinat sumbu tegak-mendatar.",
    clue: "Perhatikan kata kunci: 'anak panah', 'tanda kurung (x, y)', dan 'sumbu X-Y'.",
    remedialVariant: {
      question: "Jodohkan bentuk penyajian relasi dengan simbol utamanya!",
      pairs: [
        { left: "Pasangan Berurutan", right: "{(a, b)}" },
        { left: "Diagram Panah", right: "Anak Panah (➔)" },
        { left: "Diagram Cartesius", right: "Koordinat Sumbu (X, Y)" }
      ],
      rightOptions: ["{(a, b)}", "Anak Panah (➔)", "Koordinat Sumbu (X, Y)"],
      correctReason: "Tepat! Pasangan berurutan disimbolkan kurung kurawal, diagram panah dengan panah, dan Cartesius dengan sumbu koordinat.",
      wrongExplanation: "Perhatikan simbol identik masing-masing: kurung {(...)}, panah, dan bidang koordinat."
    }
  },
  {
    id: 7,
    chapterId: 1,
    type: "MCQ",
    title: "📐 Relasi 'Kuadrat Dari'",
    question: "Perhatikan diagram panah relasi dari A ke B berikut dengan aturan 'kuadrat dari'. Himpunan pasangan berurutannya adalah...",
    visual: {
      type: "arrow_diagram",
      labelA: "Himpunan A",
      labelB: "Himpunan B",
      setA: [1, 4, 9],
      setB: [1, 2, 3],
      pairs: [[1, 1], [4, 2], [9, 3]],
      statusBadge: "Kuadrat Dari"
    },
    options: [
      "{(1, 1), (4, 2), (9, 3)}",
      "{(1, 1), (2, 4), (3, 9)}",
      "{(1, 2), (4, 3), (9, 1)}",
      "{(4, 2), (9, 3)}"
    ],
    correct: "{(1, 1), (4, 2), (9, 3)}",
    correctReason: "Benar! 1 = 1², 4 = 2², dan 9 = 3². Jadi 1 adalah kuadrat dari 1, 4 kuadrat dari 2, dan 9 kuadrat dari 3.",
    wrongExplanation: "Urutan pasangan adalah (A, B). Karena 4 adalah kuadrat dari 2, maka pasangan yang benar adalah (4, 2), bukan (2, 4).",
    clue: "A adalah kuadrat dari B artinya elemen A = (elemen B)².",
    remedialVariant: {
      question: "Perhatikan diagram panah relasi 'kuadrat dari' berikut. Himpunan pasangannya adalah...",
      visual: {
        type: "arrow_diagram",
        labelA: "Himpunan A",
        labelB: "Himpunan B",
        setA: [16, 25],
        setB: [4, 5],
        pairs: [[16, 4], [25, 5]],
        statusBadge: "Kuadrat Dari"
      },
      options: [
        "{(16, 4), (25, 5)}",
        "{(4, 16), (5, 25)}",
        "{(16, 5), (25, 4)}",
        "{(16, 16), (25, 25)}"
      ],
      correct: "{(16, 4), (25, 5)}",
      correctReason: "Bagus sekali! 16 adalah kuadrat dari 4 (4² = 16) dan 25 kuadrat dari 5 (5² = 25).",
      wrongExplanation: "Ingat arah (A, B): angka asal A di depan (16), angka kawan B di belakang (4)."
    }
  },
  {
    id: 8,
    chapterId: 1,
    type: "MCQ_COMPLEX",
    title: "☑️ Ciri Relasi yang Sah",
    question: "Perhatikan tabel relasi fleksibel berikut. Manakah pernyataan yang BENAR mengenai aturan relasi dari himpunan A ke B? (Pilih semua yang benar)",
    visual: {
      type: "relation_table",
      title: "Tabel Relasi Bukti",
      rule: "Pemasangan Fleksibel",
      headers: ["Himpunan A", "Himpunan B"],
      pairs: [["Ali", "Merah"], ["Ali", "Biru"], ["Budi", "Hijau"]],
      showOrderedPair: true
    },
    options: [
      "Anggota himpunan A boleh memiliki lebih dari satu pasangan di B",
      "Anggota himpunan A boleh tidak memiliki pasangan sama sekali di B",
      "Setiap anggota himpunan B harus selalu berpasangan dengan A",
      "Relasi dapat disajikan dalam bentuk diagram Cartesius"
    ],
    correctMultiple: [
      "Anggota himpunan A boleh memiliki lebih dari satu pasangan di B",
      "Anggota himpunan A boleh tidak memiliki pasangan sama sekali di B",
      "Relasi dapat disajikan dalam bentuk diagram Cartesius"
    ],
    correctReason: "Hebat! Kamu berhasil mengidentifikasi ketiga sifat relasi umum dengan tepat. Pada relasi, keanggotaan dan pemasangan sangat fleksibel.",
    wrongExplanation: "Pilihan 'Setiap anggota himpunan B harus selalu berpasangan' salah, karena dalam relasi anggota kodomain B boleh saja tidak terpilih/tidak berpasangan.",
    clue: "Relasi itu bebas: boleh bercabang, boleh jomblo, dan bisa digambar di Cartesius.",
    remedialVariant: {
      question: "Manakah pernyataan yang BENAR tentang cara menyajikan relasi? (Pilih semua yang benar)",
      options: [
        "Dapat disajikan dengan diagram panah",
        "Dapat disajikan dengan himpunan pasangan berurutan",
        "Hanya boleh dinyatakan dengan rumus aljabar",
        "Dapat disajikan dengan tabel atau diagram Cartesius"
      ],
      correctMultiple: [
        "Dapat disajikan dengan diagram panah",
        "Dapat disajikan dengan himpunan pasangan berurutan",
        "Dapat disajikan dengan tabel atau diagram Cartesius"
      ],
      correctReason: "Tepat! Relasi memiliki banyak cara penyajian (panah, koordinat, tabel, pasangan berurutan), tidak hanya rumus.",
      wrongExplanation: "Relasi tidak terbatas hanya rumus aljabar saja, diagram panah dan Cartesius juga sangat umum."
    }
  },
  {
    id: 9,
    chapterId: 1,
    type: "ARROWS",
    title: "🏹 Hubungkan Relasi 'Satu Kurangnya Dari'",
    question: "Hubungkan setiap elemen pada himpunan A ke bayangannya pada himpunan B dengan aturan 'satu kurangnya dari'!",
    setA: [2, 3, 4],
    setB: [3, 4, 5],
    correctPairs: ["2->3", "3->4", "4->5"],
    correctReason: "Luar biasa! 2 adalah 1 kurangnya dari 3, 3 adalah 1 kurangnya dari 4, dan 4 adalah 1 kurangnya dari 5 (a = b − 1).",
    wrongExplanation: "2 adalah satu kurangnya dari 3 (karena 3 − 1 = 2). Hubungkan 2 ke 3, 3 ke 4, dan 4 ke 5.",
    clue: "Angka di himpunan B adalah angka di himpunan A ditambah 1.",
    remedialVariant: {
      question: "Hubungkan panah dengan aturan relasi 'dua kurangnya dari'!",
      setA: [1, 2, 3],
      setB: [3, 4, 5],
      correctPairs: ["1->3", "2->4", "3->5"],
      correctReason: "Benar! 1 = 3 − 2, 2 = 4 − 2, 3 = 5 − 2. Semua panah terpasang akurat!",
      wrongExplanation: "Aturan dua kurangnya dari berarti elemen B bernilai elemen A + 2 (1➔3, 2➔4, 3➔5)."
    }
  },
  {
    id: 10,
    chapterId: 1,
    type: "MCQ",
    title: "📍 Membaca Relasi dari Koordinat",
    question: "Perhatikan titik-titik pada diagram Cartesius berikut. Aturan relasi yang menghubungkan angka depan (x) ke angka belakang (y) adalah...",
    visual: {
      type: "cartesian_graph",
      title: "Titik Relasi Cartesius",
      minX: 0,
      maxX: 4,
      minY: 0,
      maxY: 5,
      testPoints: [[1, 2], [2, 3], [3, 4]],
      pointsOnly: true
    },
    options: ["Satu kurangnya dari", "Satu lebihnya dari", "Dua kali dari", "Setengah dari"],
    correct: "Satu kurangnya dari",
    correctReason: "Bagus! Nilai x selalu 1 lebih kecil daripada y (1 adalah 1 kurangnya dari 2, 2 adalah 1 kurangnya dari 3).",
    wrongExplanation: "Perhatikan arah dari x ke y: x = y − 1. Berarti x adalah 'satu kurangnya dari' y. Jika dibalik, y adalah 'satu lebihnya dari' x.",
    clue: "x = 1, y = 2 ➔ 1 adalah satu lebih kecil daripada 2.",
    remedialVariant: {
      question: "Perhatikan titik-titik koordinat pada diagram Cartesius berikut. Aturan relasi dari x ke y adalah...",
      visual: {
        type: "cartesian_graph",
        title: "Titik Relasi Cartesius",
        minX: 0,
        maxX: 5,
        minY: 0,
        maxY: 4,
        testPoints: [[2, 1], [3, 2], [4, 3]],
        pointsOnly: true
      },
      options: ["Satu lebihnya dari", "Satu kurangnya dari", "Dua kali dari", "Kebalikan dari"],
      correct: "Satu lebihnya dari",
      correctReason: "Tepat sekali! 2 adalah 1 lebihnya dari 1, 3 adalah 1 lebihnya dari 2.",
      wrongExplanation: "Di sini x lebih besar 1 dibanding y (2 dibanding 1), sehingga relasinya 'satu lebihnya dari'."
    }
  },
  {
    id: 11,
    chapterId: 1,
    type: "CARTESIAN",
    title: "📍 Plot Relasi 'Kelipatan Dari'",
    question: "Plot titik-titik relasi 'kelipatan dari' untuk pasangan x ∈ {4, 6} ke y ∈ {2, 3} pada bidang Cartesius! (4 kelipatan 2; 6 kelipatan 2 dan 3)",
    minX: 0,
    maxX: 7,
    minY: 0,
    maxY: 4,
    targetPoints: [[4, 2], [6, 2], [6, 3]],
    correctReason: "Hebat! Titik (4, 2), (6, 2), dan (6, 3) telah diplot dengan sempurna pada bidang Cartesius.",
    wrongExplanation: "4 adalah kelipatan 2 ➔ (4, 2). 6 adalah kelipatan 2 dan 3 ➔ (6, 2) dan (6, 3). Cek kembali koordinat titikmu.",
    clue: "Tandai 3 titik: (4, 2), (6, 2), dan (6, 3).",
    remedialVariant: {
      question: "Plot titik-titik relasi 'faktor dari' dari x ∈ {2, 3} ke y = 6 pada bidang Cartesius!",
      minX: 0,
      maxX: 5,
      minY: 0,
      maxY: 7,
      targetPoints: [[2, 6], [3, 6]],
      correctReason: "Bagus! 2 dan 3 adalah faktor dari 6, titik (2, 6) dan (3, 6) terplot tepat.",
      wrongExplanation: "Tandai koordinat x = 2, y = 6 dan x = 3, y = 6."
    }
  },
  {
    id: 12,
    chapterId: 1,
    type: "MCQ",
    title: "🔢 Relasi 'Kurang Dari'",
    question: "Diketahui A = {1, 2} dan B = {2, 3}. Relasi dari A ke B adalah 'kurang dari'. Banyaknya pasangan berurutan yang terbentuk adalah...",
    options: ["3 pasangan", "2 pasangan", "4 pasangan", "1 pasangan"],
    correct: "3 pasangan",
    correctReason: "Tepat! Pasangan yang memenuhi x < y adalah: (1, 2), (1, 3), dan (2, 3). Total ada 3 pasangan.",
    wrongExplanation: "(1 < 2), (1 < 3), dan (2 < 3) semuanya benar. Sedangkan (2, 2) tidak memenuhi karena 2 tidak kurang dari 2.",
    clue: "Cek satu per satu: apakah 1 < 2? Ya. Apakah 1 < 3? Ya. Apakah 2 < 2? Tidak. Apakah 2 < 3? Ya.",
    remedialVariant: {
      question: "Diketahui A = {2, 3} dan B = {3, 4}. Relasi 'kurang dari' dari A ke B menghasilkan berapa pasangan?",
      options: ["3 pasangan", "4 pasangan", "2 pasangan", "1 pasangan"],
      correct: "3 pasangan",
      correctReason: "Benar! Pasangannya adalah (2, 3), (2, 4), dan (3, 4) ➔ total 3 pasangan.",
      wrongExplanation: "Pasangan yang memenuhi nilai x < y adalah (2, 3), (2, 4), dan (3, 4)."
    }
  },
  {
    id: 13,
    chapterId: 1,
    type: "TRUE_FALSE",
    title: "🔄 Membalik Relasi",
    question: "Pernyataan: Jika relasi dari A ke B adalah 'kuadrat dari', maka relasi kebalikannya dari B ke A adalah 'akar pangkat dua dari'.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Sangat benar! Contoh: 9 adalah kuadrat dari 3 (9 = 3²). Sebaliknya, 3 adalah akar kuadrat dari 9 (√9 = 3).",
    wrongExplanation: "Operasi kebalikan dari kuadrat (pangkat dua) adalah penarikan akar kuadrat.",
    clue: "Jika 4 kuadrat dari 2, maka 2 apanya dari 4? Akar dari 4.",
    remedialVariant: {
      question: "Pernyataan: Jika relasi dari A ke B adalah 'dua kali dari', maka relasi dari B ke A adalah 'setengah dari'.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Kebalikan dari perkalian dua (dua kali dari) adalah pembagian dua (setengah dari).",
      wrongExplanation: "Jika a = 2b, maka b = (1/2)a."
    }
  },
  {
    id: 14,
    chapterId: 1,
    type: "MCQ",
    title: "🎯 Anggota Himpunan Asal",
    question: "Perhatikan himpunan pasangan berurutan R berikut. Himpunan daerah asal (domain) yang terlibat dalam pasangan tersebut adalah...",
    visual: {
      type: "ordered_pairs",
      title: "Himpunan Pasangan Berurutan R",
      setName: "R",
      pairs: [["a", "1"], ["b", "2"], ["c", "2"]]
    },
    options: ["{a, b, c}", "{1, 2}", "{a, 1}", "{b, c, 2}"],
    correct: "{a, b, c}",
    correctReason: "Bagus! Elemen pertama pada setiap pasangan berurutan (koordinat x) merupakan anggota daerah asal: {a, b, c}.",
    wrongExplanation: "Elemen pertama adalah daerah asal (a, b, c), sedangkan elemen kedua adalah daerah hasil (1, 2).",
    clue: "Ambil semua huruf/angka di posisi depan tanda koma dalam setiap kurung.",
    remedialVariant: {
      question: "Perhatikan pasangan berurutan R berikut. Elemen himpunan pertama (daerah asal) adalah...",
      visual: {
        type: "ordered_pairs",
        title: "Himpunan Pasangan Berurutan R",
        setName: "R",
        pairs: [["p", "4"], ["q", "5"], ["r", "6"]]
      },
      options: ["{p, q, r}", "{4, 5, 6}", "{p, 4}", "{q, r}"],
      correct: "{p, q, r}",
      correctReason: "Tepat! Elemen depan dari pasangan adalah p, q, dan r.",
      wrongExplanation: "Daerah asal dibentuk oleh komponen pertama setiap pasangan berurutan."
    }
  },
  {
    id: 15,
    chapterId: 1,
    type: "MATCHING",
    title: "🔗 Menjodohkan Nilai Relasi",
    question: "Relasi dari A = {2, 3, 4} ke B = {4, 9, 16} adalah 'akar dari'. Jodohkan setiap elemen A dengan pasangannya di B!",
    pairs: [
      { left: "2", right: "4" },
      { left: "3", right: "9" },
      { left: "4", right: "16" }
    ],
    rightOptions: ["4", "9", "16", "25"],
    correctReason: "Mantap! 2 adalah akar dari 4, 3 adalah akar dari 9, dan 4 adalah akar dari 16 (karena 2²=4, 3²=9, 4²=16).",
    wrongExplanation: "√4 = 2, √9 = 3, √16 = 4. Jadi 2 dipasangkan ke 4, 3 ke 9, dan 4 ke 16.",
    clue: "Kuadratkan angka di sebelah kiri untuk menemukan pasangannya di sebelah kanan.",
    remedialVariant: {
      question: "Jodohkan angka sebelah kiri dengan kuadratnya di sebelah kanan (relasi 'akar dari')!",
      pairs: [
        { left: "5", right: "25" },
        { left: "6", right: "36" },
        { left: "7", right: "49" }
      ],
      rightOptions: ["25", "36", "49", "64"],
      correctReason: "Tepat! 5 akar dari 25, 6 akar dari 36, dan 7 akar dari 49.",
      wrongExplanation: "5² = 25, 6² = 36, 7² = 49."
    }
  },
  {
    id: 16,
    chapterId: 1,
    type: "MCQ_COMPLEX",
    title: "☑️ Relasi Kehidupan Sehari-hari",
    question: "Manakah contoh di bawah ini yang merupakan bentuk relasi antara dua kelompok dalam kehidupan sehari-hari? (Pilih semua yang benar)",
    options: [
      "Relasi antara siswa dengan mata pelajaran yang disukainya",
      "Relasi antara negara dengan bahasa resminya",
      "Relasi antara nomor sepatu dengan merk mobil",
      "Relasi antara pasien dengan dokter yang menanganinya"
    ],
    correctMultiple: [
      "Relasi antara siswa dengan mata pelajaran yang disukainya",
      "Relasi antara negara dengan bahasa resminya",
      "Relasi antara pasien dengan dokter yang menanganinya"
    ],
    correctReason: "Hebat! Semua contoh tersebut memiliki aturan keterkaitan logis antara dua himpunan (orang & hobi/bahasa/dokter).",
    wrongExplanation: "Nomor sepatu dan merk mobil tidak memiliki aturan keterkaitan logis dalam konteks umum.",
    clue: "Pilihlah hubungan yang memiliki aturan pemasangan yang bermakna dan jelas.",
    remedialVariant: {
      question: "Manakah contoh hubungan antar dua himpunan yang logis? (Pilih semua yang benar)",
      options: [
        "Siswa dengan hobi olahraganya",
        "Kota dengan provinsi tempatnya berada",
        "Warna baju dengan nomor rekening bank acak",
        "Buku dengan nama penulisnya"
      ],
      correctMultiple: [
        "Siswa dengan hobi olahraganya",
        "Kota dengan provinsi tempatnya berada",
        "Buku dengan nama penulisnya"
      ],
      correctReason: "Benar! Ketiganya merupakan relasi nyata yang terdefinisi dengan baik.",
      wrongExplanation: "Warna baju dan nomor rekening bank tidak memiliki kaitan aturan yang terdefinisi."
    }
  },
  {
    id: 17,
    chapterId: 1,
    type: "TRUE_FALSE",
    title: "📌 Relasi Identitas",
    question: "Pernyataan: Relasi 'sama dengan' pada himpunan A = {1, 2, 3} ke dirinya sendiri menghasilkan himpunan pasangan {(1, 1), (2, 2), (3, 3)}.",
    visual: {
      type: "ordered_pairs",
      title: "Relasi Sama Dengan",
      setName: "R",
      pairs: [[1, 1], [2, 2], [3, 3]],
      rule: "Sama Dengan"
    },
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Tepat! Karena setiap bilangan hanya sama dengan dirinya sendiri: 1 = 1, 2 = 2, 3 = 3.",
    wrongExplanation: "Aturan 'sama dengan' mengharuskan elemen depan dan belakang identik, sehingga menghasilkan (1, 1), (2, 2), dan (3, 3).",
    clue: "x sama dengan y berarti x = y.",
    remedialVariant: {
      question: "Pernyataan: Relasi 'sama dengan' pada himpunan A = {4, 5} menghasilkan pasangan {(4, 5), (5, 4)}.",
      visual: {
        type: "ordered_pairs",
        title: "Relasi Sama Dengan",
        setName: "R",
        pairs: [[4, 4], [5, 5]],
        rule: "Sama Dengan"
      },
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Benar! Pernyataan tersebut salah karena 4 tidak sama dengan 5. Pasangan yang benar adalah {(4, 4), (5, 5)}.",
      wrongExplanation: "Relasi sama dengan menghasilkan elemen yang bernilai persis sama: 4 dengan 4, bukan 4 dengan 5."
    }
  },
  {
    id: 18,
    chapterId: 1,
    type: "MCQ",
    title: "📐 Relasi Kelipatan",
    question: "Perhatikan diagram panah relasi 'faktor dari' dari A ke B berikut. Manakah anggota A yang berpasangan dengan 10?",
    visual: {
      type: "arrow_diagram",
      labelA: "Himpunan A",
      labelB: "Himpunan B",
      setA: [2, 3, 5],
      setB: [10],
      pairs: [[2, 10], [5, 10]],
      statusBadge: "Faktor Dari 10"
    },
    options: ["2 dan 5 saja", "2, 3, dan 5", "5 saja", "3 saja"],
    correct: "2 dan 5 saja",
    correctReason: "Sangat tepat! 10 habis dibagi 2 dan 5. Sedangkan 10 tidak habis dibagi 3 (10 ÷ 3 = 3 sisa 1).",
    wrongExplanation: "3 bukan faktor dari 10 karena 10 tidak habis dibagi 3. Angka yang habis membagi 10 dari himpunan A hanyalah 2 dan 5.",
    clue: "Faktor dari 10 adalah bilangan yang habis membagi 10 tanpa sisa.",
    remedialVariant: {
      question: "Perhatikan diagram panah relasi 'faktor dari' berikut. Anggota A yang berpasangan dengan 14 adalah...",
      visual: {
        type: "arrow_diagram",
        labelA: "Himpunan A",
        labelB: "Himpunan B",
        setA: [2, 3, 7],
        setB: [14],
        pairs: [[2, 14], [7, 14]],
        statusBadge: "Faktor Dari 14"
      },
      options: ["2 dan 7 saja", "2, 3, dan 7", "7 saja", "3 saja"],
      correct: "2 dan 7 saja",
      correctReason: "Benar! 14 habis dibagi 2 dan 7, tetapi tidak habis dibagi 3.",
      wrongExplanation: "14 bukan kelipatan 3, jadi 3 tidak berpasangan dengan 14."
    }
  },
  {
    id: 19,
    chapterId: 1,
    type: "MCQ",
    title: "🏹 Diagram Panah Bercabang",
    question: "Perhatikan diagram panah relasi berikut yang memiliki cabang 3. Pernyataan yang BENAR mengenai diagram tersebut adalah...",
    visual: {
      type: "arrow_diagram",
      labelA: "Daerah Asal",
      labelB: "Daerah Kawan",
      setA: ["Titik 1", "Titik 2"],
      setB: ["Target A", "Target B", "Target C"],
      pairs: [["Titik 1", "Target A"], ["Titik 1", "Target B"], ["Titik 1", "Target C"], ["Titik 2", "Target B"]],
      statusBadge: "Relasi Bercabang"
    },
    options: [
      "Diagram tersebut tetap merupakan relasi yang sah",
      "Diagram tersebut bukan merupakan relasi",
      "Diagram tersebut salah gambar",
      "Diagram tersebut pasti fungsi"
    ],
    correct: "Diagram tersebut tetap merupakan relasi yang sah",
    correctReason: "Tepat sekali! Dalam relasi, suatu anggota asal sah-sah saja memiliki 3 pasangan (bercabang 3).",
    wrongExplanation: "Relasi tidak melarang cabang. Yang melarang cabang adalah 'fungsi'. Jadi diagram ini tetap relasi yang sah.",
    clue: "Relasi itu bebas: boleh bercabang sebanyak apa pun.",
    remedialVariant: {
      question: "Apakah diagram panah yang memiliki anggota asal dengan 2 panah masih tergolong relasi?",
      options: [
        "Ya, tetap merupakan relasi",
        "Tidak, relasi tidak boleh bercabang",
        "Hanya boleh jika anggotanya genap",
        "Salah total"
      ],
      correct: "Ya, tetap merupakan relasi",
      correctReason: "Benar! Relasi memperbolehkan cabang.",
      wrongExplanation: "Aturan relasi memperbolehkan anggota asal memiliki lebih dari 1 panah."
    }
  },
  {
    id: 20,
    chapterId: 1,
    type: "ARROWS",
    title: "🏹 Relasi 'Dua Lebihnya Dari'",
    question: "Hubungkan setiap elemen himpunan A ke pasangannya di himpunan B dengan aturan 'dua lebihnya dari' (a = b + 2)!",
    setA: [4, 5, 6],
    setB: [2, 3, 4],
    correctPairs: ["4->2", "5->3", "6->4"],
    correctReason: "Luar biasa! 4 adalah 2 lebihnya dari 2, 5 adalah 2 lebihnya dari 3, dan 6 adalah 2 lebihnya dari 4.",
    wrongExplanation: "4 = 2 + 2 ➔ 4 ke 2. 5 = 3 + 2 ➔ 5 ke 3. 6 = 4 + 2 ➔ 6 ke 4.",
    clue: "Kurangkan angka di himpunan A dengan 2 untuk mendapatkan pasangannya di himpunan B.",
    remedialVariant: {
      question: "Hubungkan relasi 'tiga lebihnya dari' dari A ke B!",
      setA: [5, 6, 7],
      setB: [2, 3, 4],
      correctPairs: ["5->2", "6->3", "7->4"],
      correctReason: "Tepat! 5 = 2 + 3, 6 = 3 + 3, 7 = 4 + 3. Hubungan panah benar!",
      wrongExplanation: "Kurangkan angka himpunan A dengan 3 untuk menemukan elemen di B."
    }
  },
  {
    id: 21,
    chapterId: 1,
    type: "MCQ",
    title: "📊 Posisi Koordinat Cartesius",
    question: "Dalam diagram Cartesius untuk relasi dari himpunan A ke himpunan B, anggota himpunan A selalu diletakkan pada...",
    visual: {
      type: "cartesian_graph",
      title: "Diagram Cartesius Sumbu X & Y",
      minX: 0,
      maxX: 5,
      minY: 0,
      maxY: 5,
      testPoints: [[1, 2], [2, 4], [3, 1]],
      pointsOnly: true
    },
    options: [
      "Sumbu mendatar (sumbu X)",
      "Sumbu tegak (sumbu Y)",
      "Titik pusat koordinat (0, 0)",
      "Boleh diletakkan di mana saja tanpa aturan"
    ],
    correct: "Sumbu mendatar (sumbu X)",
    correctReason: "Benar! Himpunan asal (A) selalu diwakili oleh sumbu horizontal/mendatar (sumbu X), sedangkan himpunan kawan (B) diwakili sumbu vertikal/tegak (sumbu Y).",
    wrongExplanation: "Secara standar kesepakatan matematika, domain diletakkan pada sumbu mendatar (X) dan kodomain pada sumbu tegak (Y).",
    clue: "Ingat urutan pasangan (x, y): x adalah sumbu mendatar (asal), y adalah sumbu tegak (tujuan).",
    remedialVariant: {
      question: "Pada diagram Cartesius relasi dari himpunan P ke Q, anggota himpunan Q diletakkan pada...",
      options: [
        "Sumbu tegak (sumbu Y)",
        "Sumbu mendatar (sumbu X)",
        "Garis diagonal",
        "Di luar bidang koordinat"
      ],
      correct: "Sumbu tegak (sumbu Y)",
      correctReason: "Tepat! Himpunan tujuan (Q) ditempatkan pada sumbu tegak (sumbu Y).",
      wrongExplanation: "Himpunan tujuan diletakkan pada sumbu tegak (sumbu Y)."
    }
  },
  {
    id: 22,
    chapterId: 1,
    type: "TRUE_FALSE",
    title: "📐 Relasi 'Lebih Dari'",
    question: "Pernyataan: Pada diagram panah relasi 'lebih dari' dari A = {3} ke B = {1, 2, 4}, pasangan yang terbentuk adalah {(3, 1), (3, 2)}.",
    visual: {
      type: "arrow_diagram",
      labelA: "Himpunan A",
      labelB: "Himpunan B",
      setA: [3],
      setB: [1, 2, 4],
      pairs: [[3, 1], [3, 2]],
      statusBadge: "Lebih Dari"
    },
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Tepat! 3 > 1 dan 3 > 2 (benar). Sedangkan 3 tidak lebih dari 4 (3 < 4), jadi (3, 4) tidak termasuk.",
    wrongExplanation: "Karena 3 lebih besar dari 1 dan 2, pasangannya adalah (3, 1) dan (3, 2). 4 tidak ikut karena 3 tidak lebih besar dari 4.",
    clue: "Cek tanda perbandingan: 3 > 1? Ya. 3 > 2? Ya. 3 > 4? Tidak.",
    remedialVariant: {
      question: "Pernyataan: Pada relasi 'lebih dari' dari A = {5} ke B = {2, 6}, pasangan yang terbentuk adalah {(5, 2), (5, 6)}.",
      visual: {
        type: "arrow_diagram",
        labelA: "Himpunan A",
        labelB: "Himpunan B",
        setA: [5],
        setB: [2, 6],
        pairs: [[5, 2]],
        statusBadge: "Lebih Dari"
      },
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Benar! Pernyataan tersebut salah karena 5 tidak lebih besar dari 6. Pasangan yang benar hanyalah {(5, 2)}.",
      wrongExplanation: "5 > 2 benar, tetapi 5 > 6 salah! Jadi (5, 6) tidak boleh masuk."
    }
  },
  {
    id: 23,
    chapterId: 1,
    type: "MCQ",
    title: "🔍 Mengidentifikasi Aturan Relasi",
    question: "Perhatikan himpunan pasangan berurutan berikut. Aturan relasi yang paling tepat dari bilangan pertama ke kedua adalah...",
    visual: {
      type: "ordered_pairs",
      title: "Himpunan Pasangan Berurutan R",
      setName: "R",
      pairs: [[2, 1], [4, 2], [6, 3], [8, 4]],
      rule: "?"
    },
    options: ["Dua kali dari", "Setengah dari", "Dua kurangnya dari", "Kuadrat dari"],
    correct: "Dua kali dari",
    correctReason: "Luar biasa! 2 = 2 × 1, 4 = 2 × 2, 6 = 2 × 3, dan 8 = 2 × 4. Bilangan depan bernilai dua kali lipat bilangan belakang.",
    wrongExplanation: "2 adalah 'dua kali dari' 1. Jika 'setengah dari', angkanya terbalik seperti (1, 2) atau (2, 4).",
    clue: "Bandingkan 4 ke 2: 4 adalah 2 dikali 2.",
    remedialVariant: {
      question: "Perhatikan himpunan pasangan berikut. Aturan relasi dari bilangan pertama ke kedua adalah...",
      visual: {
        type: "ordered_pairs",
        title: "Himpunan Pasangan Berurutan R",
        setName: "R",
        pairs: [[3, 1], [6, 2], [9, 3]],
        rule: "?"
      },
      options: ["Tiga kali dari", "Sepertiga dari", "Tiga lebihnya dari", "Kuadrat dari"],
      correct: "Tiga kali dari",
      correctReason: "Tepat! 3 = 3 × 1, 6 = 3 × 2, 9 = 3 × 3.",
      wrongExplanation: "Angka depan bernilai 3 kali lipat angka belakang, jadi relasinya 'tiga kali dari'."
    }
  },
  {
    id: 24,
    chapterId: 1,
    type: "MCQ_COMPLEX",
    title: "☑️ Relasi yang Menghasilkan Pasangan Terbanyak",
    question: "Diketahui A = {2, 4} dan B = {2, 4}. Manakah relasi dari A ke B yang menghasilkan TEPAT 2 pasangan berurutan? (Pilih semua yang benar)",
    options: [
      "Relasi 'sama dengan'",
      "Relasi 'kelipatan dari'",
      "Relasi 'kurang dari'",
      "Relasi 'faktor dari'"
    ],
    correctMultiple: [
      "Relasi 'sama dengan'"
    ],
    correctReason: "Tepat! Relasi 'sama dengan' menghasilkan {(2, 2), (4, 4)} yang berjumlah tepat 2 pasangan.",
    wrongExplanation: "Relasi 'faktor dari' menghasilkan {(2, 2), (2, 4), (4, 4)} (3 pasangan). Relasi 'kelipatan dari' juga menghasilkan 3 pasangan. Relasi 'kurang dari' hanya menghasilkan {(2, 4)} (1 pasangan).",
    clue: "Cek pasangan dari relasi 'sama dengan': 2=2 dan 4=4 (ada 2 pasangan).",
    remedialVariant: {
      question: "Diketahui A = {3, 5} dan B = {3, 5}. Manakah relasi yang menghasilkan TEPAT 1 pasangan berurutan? (Pilih yang benar)",
      options: [
        "Relasi 'kurang dari'",
        "Relasi 'sama dengan'",
        "Relasi 'faktor dari'",
        "Relasi 'lebih dari'"
      ],
      correctMultiple: [
        "Relasi 'kurang dari'",
        "Relasi 'lebih dari'"
      ],
      correctReason: "Tepat! 'Kurang dari' hanya menghasilkan {(3, 5)} (1 pasangan). 'Lebih dari' hanya menghasilkan {(5, 3)} (1 pasangan).",
      wrongExplanation: "'Sama dengan' menghasilkan 2 pasangan {(3, 3), (5, 5)}."
    }
  },
  {
    id: 25,
    chapterId: 1,
    type: "MCQ",
    title: "🔡 Himpunan Hasil (Range Relasi)",
    question: "Perhatikan himpunan pasangan berurutan R berikut. Elemen himpunan kedua yang terpilih (range) adalah...",
    visual: {
      type: "ordered_pairs",
      title: "Himpunan Pasangan Berurutan R",
      setName: "R",
      pairs: [[1, 3], [2, 5], [3, 3], [4, 5]]
    },
    options: ["{3, 5}", "{1, 2, 3, 4}", "{1, 3, 5}", "{3, 3, 5, 5}"],
    correct: "{3, 5}",
    correctReason: "Bagus sekali! Elemen kedua yang muncul adalah 3 dan 5. Dalam notasi himpunan, elemen berulang cukup ditulis sekali: {3, 5}.",
    wrongExplanation: "Elemen kedua adalah 3 dan 5. Penulisan himpunan tidak mengulang angka yang sama.",
    clue: "Kumpulkan semua angka di posisi belakang kurung: ada angka 3 dan angka 5.",
    remedialVariant: {
      question: "Perhatikan himpunan pasangan berurutan R berikut. Elemen yang terpilih sebagai hasil (elemen kedua) adalah...",
      visual: {
        type: "ordered_pairs",
        title: "Himpunan Pasangan Berurutan R",
        setName: "R",
        pairs: [["a", "7"], ["b", "8"], ["c", "7"]]
      },
      options: ["{7, 8}", "{a, b, c}", "{7, 7, 8}", "{8}"],
      correct: "{7, 8}",
      correctReason: "Tepat! Elemen belakang yang unik adalah {7, 8}.",
      wrongExplanation: "Daerah hasil terdiri dari elemen unik posisi kedua: {7, 8}."
    }
  },
  {
    id: 26,
    chapterId: 1,
    type: "TRUE_FALSE",
    title: "🎯 Relasi Tanpa Pasangan",
    question: "Pernyataan: Relasi 'faktor dari' dari A = {7} ke B = {2, 4, 6} tidak memiliki pasangan sama sekali (relasi kosong).",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Tepat! 7 tidak habis membagi 2, tidak habis membagi 4, dan tidak habis membagi 6. Tidak ada satu pun pasangan yang memenuhi.",
    wrongExplanation: "Karena tidak ada bilangan di B yang habis dibagi 7, himpunan pasangan berurutannya kosong { }.",
    clue: "Apakah 2, 4, atau 6 ada yang merupakan kelipatan dari 7? Tidak ada.",
    remedialVariant: {
      question: "Pernyataan: Relasi 'faktor dari' dari A = {5} ke B = {3, 7, 9} merupakan relasi kosong.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Tidak ada angka di B yang habis dibagi 5, sehingga pasangannya kosong.",
      wrongExplanation: "5 bukan faktor dari 3, 7, maupun 9."
    }
  },
  {
    id: 27,
    chapterId: 1,
    type: "MCQ",
    title: "🔢 Banyak Pasangan Maksimal",
    question: "Jika himpunan A memiliki 3 anggota dan himpunan B memiliki 4 anggota, banyak pasangan maksimal yang mungkin dibentuk dalam suatu relasi dari A ke B adalah...",
    options: ["12 pasangan", "7 pasangan", "64 pasangan", "81 pasangan"],
    correct: "12 pasangan",
    correctReason: "Benar! Banyak pasangan maksimal adalah hasil kali jumlah anggota kedua himpunan: n(A) × n(B) = 3 × 4 = 12 pasangan.",
    wrongExplanation: "Setiap anggota A bisa dipasangkan ke seluruh anggota B. Jadi 3 × 4 = 12 pasangan maksimal.",
    clue: "Rumus perkalian Cartesius: n(A × B) = n(A) × n(B).",
    remedialVariant: {
      question: "Jika n(A) = 2 dan n(B) = 5, berapa jumlah pasangan maksimal yang mungkin terbentuk?",
      options: ["10 pasangan", "7 pasangan", "25 pasangan", "32 pasangan"],
      correct: "10 pasangan",
      correctReason: "Tepat! 2 × 5 = 10 pasangan maksimal.",
      wrongExplanation: "n(A) × n(B) = 2 × 5 = 10."
    }
  },
  {
    id: 28,
    chapterId: 1,
    type: "MATCHING",
    title: "🔗 Menjodohkan Relasi 'Setengah Dari'",
    question: "Perhatikan tabel relasi berikut. Jodohkan elemen himpunan asal di sebelah kiri dengan pasangannya di sebelah kanan dengan aturan 'setengah dari'!",
    visual: {
      type: "relation_table",
      title: "Tabel Relasi: Setengah Dari",
      rule: "Setengah Dari",
      headers: ["Nilai x", "Nilai y"],
      pairs: [["3", "6"], ["5", "10"], ["7", "14"]],
      showOrderedPair: true
    },
    pairs: [
      { left: "3", right: "6" },
      { left: "5", right: "10" },
      { left: "7", right: "14" }
    ],
    rightOptions: ["6", "10", "14", "16"],
    correctReason: "Hebat! 3 = 1/2 × 6, 5 = 1/2 × 10, dan 7 = 1/2 × 14. Pasangan terjodohkan dengan tepat.",
    wrongExplanation: "Aturan setengah dari berarti angka kanan adalah 2 kali lipat angka kiri (3 ke 6, 5 ke 10, 7 ke 14).",
    clue: "Kalikan angka kiri dengan 2 untuk mendapatkan pasangannya di kanan.",
    remedialVariant: {
      question: "Perhatikan tabel relasi berikut. Jodohkan angka kiri dengan pasangannya pada relasi 'sepertiga dari'!",
      visual: {
        type: "relation_table",
        title: "Tabel Relasi: Sepertiga Dari",
        rule: "Sepertiga Dari",
        headers: ["Nilai x", "Nilai y"],
        pairs: [["2", "6"], ["4", "12"], ["5", "15"]],
        showOrderedPair: true
      },
      pairs: [
        { left: "2", right: "6" },
        { left: "4", right: "12" },
        { left: "5", right: "15" }
      ],
      rightOptions: ["6", "12", "15", "18"],
      correctReason: "Bagus! 2 = 1/3 × 6, 4 = 1/3 × 12, dan 5 = 1/3 × 15.",
      wrongExplanation: "Kalikan angka kiri dengan 3 untuk mendapatkan angka di kanan."
    }
  },
  {
    id: 29,
    chapterId: 1,
    type: "MCQ",
    title: "🔍 Relasi 'Kelipatan Dari'",
    question: "Perhatikan diagram panah relasi 'kelipatan dari' dari P ke Q berikut. Pasangan yang BUKAN anggota relasi tersebut adalah...",
    visual: {
      type: "arrow_diagram",
      labelA: "Himpunan P",
      labelB: "Himpunan Q",
      setA: [6, 8],
      setB: [2, 3, 4],
      pairs: [[6, 2], [6, 3], [8, 2], [8, 4]],
      statusBadge: "Kelipatan Dari"
    },
    options: ["(8, 3)", "(6, 2)", "(6, 3)", "(8, 4)"],
    correct: "(8, 3)",
    correctReason: "Sangat tepat! 8 bukan kelipatan dari 3 (8 tidak habis dibagi 3). Jadi (8, 3) bukan anggota relasi.",
    wrongExplanation: "6 kelipatan 2 dan 3; 8 kelipatan 2 dan 4. Sedangkan 8 bukan kelipatan 3, sehingga (8, 3) tidak masuk dalam relasi.",
    clue: "Cari pasangan yang angka depannya tidak habis dibagi oleh angka belakangnya.",
    remedialVariant: {
      question: "Perhatikan diagram panah relasi 'kelipatan dari' berikut. Pasangan yang BUKAN merupakan relasi 'kelipatan dari' adalah...",
      visual: {
        type: "arrow_diagram",
        labelA: "Himpunan P",
        labelB: "Himpunan Q",
        setA: [9, 12],
        setB: [2, 3, 5],
        pairs: [[9, 3], [12, 2], [12, 3]],
        statusBadge: "Kelipatan Dari"
      },
      options: ["(9, 2)", "(9, 3)", "(12, 2)", "(12, 3)"],
      correct: "(9, 2)",
      correctReason: "Tepat! 9 tidak habis dibagi 2, jadi 9 bukan kelipatan 2.",
      wrongExplanation: "9 adalah kelipatan 3, 12 kelipatan 2 dan 3. Tetapi 9 bukan kelipatan 2."
    }
  },
  {
    id: 30,
    chapterId: 1,
    type: "MCQ",
    title: "🏆 Rangkuman Konsep Relasi",
    question: "Manakah kesimpulan yang paling tepat mengenai konsep relasi matematika?",
    options: [
      "Relasi adalah aturan pemasangan antar himpunan yang tidak memiliki batasan ketat mengenai jumlah cabang maupun ketiadaan pasangan",
      "Relasi wajib memasangkan semua anggota tanpa terkecuali tepat satu kali",
      "Relasi hanya bisa digambar dengan diagram panah saja",
      "Relasi adalah operasi hitung aljabar untuk mencari nilai x dan y"
    ],
    correct: "Relasi adalah aturan pemasangan antar himpunan yang tidak memiliki batasan ketat mengenai jumlah cabang maupun ketiadaan pasangan",
    correctReason: "Luar biasa, sempurna! Kamu telah menuntaskan seluruh materi konsep Relasi pada Chapter 1 dengan pemahaman yang sangat mendalam!",
    wrongExplanation: "Relasi adalah aturan umum yang fleksibel (boleh bercabang dan boleh tidak punya pasangan), berbeda dengan fungsi yang memiliki aturan ketat.",
    clue: "Relasi bersifat bebas dan fleksibel.",
    remedialVariant: {
      question: "Pernyataan mana yang paling benar tentang kebebasan relasi dibanding fungsi?",
      options: [
        "Relasi boleh memiliki cabang dan anggota tanpa pasangan, sedangkan fungsi tidak boleh",
        "Relasi tidak boleh bercabang sama sekali",
        "Fungsi lebih bebas aturannya dibanding relasi",
        "Relasi dan fungsi persis sama tanpa perbedaan"
      ],
      correct: "Relasi boleh memiliki cabang dan anggota tanpa pasangan, sedangkan fungsi tidak boleh",
      correctReason: "Hebat! Kamu telah memahami perbedaan mendasar relasi dan fungsi secara utuh!",
      wrongExplanation: "Relasi adalah himpunan aturan umum yang lebih fleksibel, sedangkan fungsi adalah relasi khusus yang bersyarat ketat."
    }
  }
];
