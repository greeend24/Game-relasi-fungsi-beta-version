/**
 * LATIHAN CHAPTER 5: KORESPONDENSI SATU-SATU (BIJEKSI)
 * 10 Soal Interaktif Taktil dengan Ragam Mekanik Bervariasi + 10 Remedial Variant
 * 
 * Menggunakan bahasa kontekstual yang sederhana dan mudah dipahami siswa SMP:
 * 1. MCQ : Pengertian Korespondensi Satu-Satu
 * 2. SLOT_FILL : Menghitung Kemungkinan Susunan (n = 3)
 * 3. MATCHING : Menjodohkan Siswa dengan Nomor Loker
 * 4. TABLE_BUILDER : Melengkapi Tabel Nomor Meja Peserta Ujian
 * 5. HPB_BUILDER : Menyusun Pasangan Siswa dan Nomor Komputer Lab
 * 6. ARROWS : Diagram Panah Siswa dan Nomor Bangku Kelas
 * 7. SLOT_FILL : Menghitung Nilai Faktorial 4! (4 × 3 × 2 × 1)
 * 8. MCQ_COMPLEX : Memilih Himpunan Pasangan yang Memenuhi Syarat 1-ke-1
 * 9. CARTESIAN : Menandai Titik Koordinat Korespondensi pada Kartesius
 * 10. DRAG_DROP : Memilah Contoh Dunia Nyata (Korespondensi 1-1 vs Relasi Biasa)
 */

export const EXERCISE_CHAPTER_5 = [
  {
    id: 1,
    chapterId: 5,
    type: "MCQ",
    title: "🔗 Pengertian Korespondensi Satu-Satu",
    question: "Apakah yang dimaksud dengan korespondensi satu-satu antara himpunan A dan himpunan B?",
    options: [
      "Relasi di mana setiap anggota A berpasangan dengan tepat satu anggota B, dan setiap anggota B berpasangan dengan tepat satu anggota A",
      "Relasi di mana anggota A boleh memiliki lebih dari satu pasangan asalkan semua anggota B terpasang",
      "Fungsi di mana semua anggota A berpasangan ke satu anggota B yang sama",
      "Relasi yang hanya berlaku jika jumlah anggota himpunannya berupa bilangan genap"
    ],
    correct: "Relasi di mana setiap anggota A berpasangan dengan tepat satu anggota B, dan setiap anggota B berpasangan dengan tepat satu anggota A",
    correctReason: "Tepat sekali! Korespondensi satu-satu adalah pemetaan timbal balik yang sempurna: setiap anggota daerah asal memiliki tepat satu kawan, dan sebaliknya setiap anggota daerah kawan juga memiliki tepat satu pasangan (tidak ada yang kosong dan tidak ada yang bercabang).",
    wrongExplanation: "Korespondensi satu-satu mensyaratkan setiap anggota A berpasangan tepat satu dengan anggota B, dan sebaliknya setiap anggota B berpasangan tepat satu dengan anggota A.",
    explanation: "Korespondensi satu-satu adalah relasi timbal balik sempurna di mana setiap anggota domain dan kodomain berpasangan tepat satu-satu tanpa sisa dan tanpa cabang.",
    clue: "Ingat prinsipnya: satu untuk satu, saling setia dan tidak ada yang tersisa di kedua himpunan.",
    distractorAnalysis: {
      "Relasi di mana anggota A boleh memiliki lebih dari satu pasangan asalkan semua anggota B terpasang": "Korespondensi 1-1 melarang keras adanya cabang pada himpunan asal.",
      "Fungsi di mana semua anggota A berpasangan ke satu anggota B yang sama": "Ini adalah fungsi konstan, bukan korespondensi satu-satu.",
      "Relasi yang hanya berlaku jika jumlah anggota himpunannya berupa bilangan genap": "Korespondensi 1-1 berlaku untuk berapa pun jumlah anggotanya, asalkan n(A) = n(B)."
    },
    remedialVariant: {
      type: "MCQ",
      title: "🔗 Remedial: Ciri Utama Korespondensi 1-1",
      question: "Ciri utama dari relasi korespondensi satu-satu adalah...",
      options: [
        "Setiap anggota domain dan kodomain berpasangan tepat satu secara timbal balik",
        "Domain boleh bercabang ke beberapa anggota kodomain",
        "Kodomain boleh memiliki anggota yang tidak memiliki pasangan",
        "Hanya boleh memiliki dua anggota himpunan saja"
      ],
      correct: "Setiap anggota domain dan kodomain berpasangan tepat satu secara timbal balik",
      correctReason: "Benar! Pasangannya harus tepat satu secara timbal balik antara domain dan kodomain.",
      wrongExplanation: "Ciri utama: tepat satu secara timbal balik tanpa cabang dan tanpa sisa.",
      clue: "Satu untuk satu secara timbal balik."
    }
  },
  {
    id: 2,
    chapterId: 5,
    type: "SLOT_FILL",
    title: "🧩 Menghitung Banyak Korespondensi (n = 3)",
    question: "Diberikan himpunan A = {1, 2, 3} dan B = {a, b, c}. Tentukan banyak kemungkinan susunan korespondensi satu-satu dengan melengkapi langkah perhitungan 3! (3 × 2 × 1)!",
    subInstruction: "Pasang kartu angka ke dalam kotak perhitungan [ ? ]:",
    slots: [
      {
        id: "s1",
        label: "Banyak anggota himpunan n(A) = n(B) =",
        answer: "3"
      },
      {
        id: "s2",
        label: "Banyak susunan korespondensi (3!) =",
        answer: "6"
      }
    ],
    tokens: ["2", "3", "4", "6", "9"],
    correctReason: "Luar biasa! Karena jumlah anggota n = 3, banyak kemungkinan susunan korespondensi satu-satu adalah 3! = 3 × 2 × 1 = 6 kemungkinan.",
    wrongExplanation: "Rumus banyak korespondensi satu-satu adalah n! = 3 × 2 × 1 = 6.",
    clue: "Banyak anggota n = 3, lalu hitung 3 × 2 × 1 = 6.",
    remedialVariant: {
      type: "SLOT_FILL",
      title: "🧩 Remedial: Menghitung Susunan 2 Elemen (2!)",
      question: "Diberikan A = {1, 2} dan B = {x, y}. Lengkapi banyak korespondensi satu-satu!",
      slots: [
        { id: "s1", label: "Banyak anggota n =", answer: "2" },
        { id: "s2", label: "Banyak susunan (2!) =", answer: "2" }
      ],
      tokens: ["1", "2", "2", "3", "4"],
      correctReason: "Tepat! 2! = 2 × 1 = 2 susunan.",
      wrongExplanation: "2! = 2 × 1 = 2.",
      clue: "2 × 1 = 2."
    }
  },
  {
    id: 3,
    chapterId: 5,
    type: "MATCHING",
    title: "🔗 Menjodohkan Siswa dengan Nomor Loker",
    question: "Tiga siswa meminjam 3 loker di sekolah: Andi menempati Loker 1, Budi menempati Loker 3, dan Citra menempati Loker 2. Jodohkan setiap nama siswa dengan nomor lokernya yang tepat!",
    labelA: "Nama Siswa",
    labelB: "Nomor Loker",
    pairs: [
      { left: "Andi", right: "Loker 1" },
      { left: "Budi", right: "Loker 3" },
      { left: "Citra", right: "Loker 2" }
    ],
    rightOptions: ["Loker 1", "Loker 2", "Loker 3", "Loker 4"],
    correctReason: "Tepat sekali! Setiap siswa memiliki tepat satu loker eksklusif tanpa berebut, dan seluruh loker terisi penuh. Ini adalah contoh korespondensi satu-satu.",
    wrongExplanation: "Pasangkan: Andi ➔ Loker 1, Budi ➔ Loker 3, dan Citra ➔ Loker 2.",
    clue: "Andi ke Loker 1, Budi ke Loker 3, Citra ke Loker 2.",
    remedialVariant: {
      type: "MATCHING",
      title: "🔗 Remedial: Pasangan 2 Siswa dan Loker",
      question: "Jodohkan siswa dengan nomor lokernya!",
      pairs: [
        { left: "Deni", right: "Loker A" },
        { left: "Eka", right: "Loker B" }
      ],
      rightOptions: ["Loker A", "Loker B", "Loker C"],
      correctReason: "Bagus! Hubungan satu-ke-satu terpasang tepat.",
      wrongExplanation: "Pasangkan Deni ke Loker A dan Eka ke Loker B.",
      clue: "Deni di Loker A, Eka di Loker B."
    }
  },
  {
    id: 4,
    chapterId: 5,
    type: "TABLE_BUILDER",
    title: "📊 Melengkapi Tabel Nomor Meja Peserta Ujian",
    question: "Empat peserta ujian menempati meja masing-masing tanpa nomor ganda: Dika Meja 1, Eka Meja 3, Fani Meja 2, dan Gina Meja 4. Lengkapi nomor meja pada tabel berikut!",
    tableTitle: "Tabel Peserta Ujian (Korespondensi 1-ke-1)",
    subInstruction: "Pindahkan kartu nomor meja ke dalam sel tabel bertanda [ ? ]:",
    headers: ["Nama Siswa", "Nomor Meja"],
    rows: [
      { idX: "r1_x", valX: "Dika", isSlotX: false, idY: "r1_y", valY: null, isSlotY: true },
      { idX: "r2_x", valX: "Eka", isSlotX: false, idY: "r2_y", valY: null, isSlotY: true },
      { idX: "r3_x", valX: "Fani", isSlotX: false, idY: "r3_y", valY: null, isSlotY: true },
      { idX: "r4_x", valX: "Gina", isSlotX: false, idY: "r4_y", valY: null, isSlotY: true }
    ],
    tokens: ["Meja 1", "Meja 2", "Meja 3", "Meja 4", "Meja 5"],
    correctCells: {
      "r1_y": "Meja 1",
      "r2_y": "Meja 3",
      "r3_y": "Meja 2",
      "r4_y": "Meja 4"
    },
    correctReason: "Luar biasa! Tabel terisi sempurna. Setiap siswa menempati tepat satu meja dan setiap meja hanya diisi satu siswa (korespondensi 1-ke-1).",
    wrongExplanation: "Dika ➔ Meja 1, Eka ➔ Meja 3, Fani ➔ Meja 2, dan Gina ➔ Meja 4.",
    clue: "Pasang Meja 1 ke Dika, Meja 3 ke Eka, Meja 2 ke Fani, dan Meja 4 ke Gina.",
    remedialVariant: {
      type: "TABLE_BUILDER",
      title: "📊 Remedial: Tabel 2 Peserta Ujian",
      question: "Lengkapi tabel nomor meja: Rian di Meja A dan Siti di Meja B!",
      tableTitle: "Tabel Nomor Meja",
      headers: ["Nama Siswa", "Nomor Meja"],
      rows: [
        { idX: "r1_x", valX: "Rian", isSlotX: false, idY: "r1_y", valY: null, isSlotY: true },
        { idX: "r2_x", valX: "Siti", isSlotX: false, idY: "r2_y", valY: null, isSlotY: true }
      ],
      tokens: ["Meja A", "Meja B", "Meja C"],
      correctCells: { "r1_y": "Meja A", "r2_y": "Meja B" },
      correctReason: "Tepat! Rian di Meja A dan Siti di Meja B.",
      wrongExplanation: "Rian ➔ Meja A, Siti ➔ Meja B.",
      clue: "Pasang Meja A ke Rian dan Meja B ke Siti."
    }
  },
  {
    id: 5,
    chapterId: 5,
    type: "HPB_BUILDER",
    title: "🧩 Pasangan Siswa dan Nomor Komputer Lab",
    question: "Tiga siswa menggunakan komputer di lab: Rian menggunakan PC-1, Sinta menggunakan PC-2, dan Tono menggunakan PC-3. Susunlah himpunan pasangan berurutan untuk relasi tersebut!",
    subInstruction: "Pindahkan nama siswa atau nomor PC ke dalam kurung pasangan berurutan:",
    setName: "Lab",
    pairs: [
      { idX: "p1_x", idY: "p1_y", ansX: "Rian", ansY: "PC-1", fixedX: "Rian", fixedY: null },
      { idX: "p2_x", idY: "p2_y", ansX: "Sinta", ansY: "PC-2", fixedX: null, fixedY: "PC-2" },
      { idX: "p3_x", idY: "p3_y", ansX: "Tono", ansY: "PC-3", fixedX: "Tono", fixedY: null }
    ],
    tokens: ["PC-1", "Sinta", "PC-3", "Umar", "PC-4"],
    correctSlots: {
      "p1_y": "PC-1",
      "p2_x": "Sinta",
      "p3_y": "PC-3"
    },
    correctReason: "Sangat tepat! Lab = {(Rian, PC-1), (Sinta, PC-2), (Tono, PC-3)}. Setiap siswa menggunakan tepat satu komputer tanpa berebut.",
    wrongExplanation: "Pasangan lengkap: (Rian, PC-1), (Sinta, PC-2), dan (Tono, PC-3).",
    clue: "Rian memakai PC-1, yang memakai PC-2 adalah Sinta, dan Tono memakai PC-3.",
    remedialVariant: {
      type: "HPB_BUILDER",
      title: "🧩 Remedial: Komputer 2 Siswa",
      question: "Susun pasangan berurutan: Ali ke PC-A dan Budi ke PC-B!",
      setName: "Lab",
      pairs: [
        { idX: "p1_x", idY: "p1_y", ansX: "Ali", ansY: "PC-A", fixedX: "Ali", fixedY: null },
        { idX: "p2_x", idY: "p2_y", ansX: "Budi", ansY: "PC-B", fixedX: null, fixedY: "PC-B" }
      ],
      tokens: ["PC-A", "Budi", "PC-C"],
      correctSlots: { "p1_y": "PC-A", "p2_x": "Budi" },
      correctReason: "Bagus! Ali ke PC-A dan Budi ke PC-B.",
      wrongExplanation: "Ali pasangannya PC-A, Budi pasangannya PC-B.",
      clue: "PC-A untuk Ali dan Budi untuk PC-B."
    }
  },
  {
    id: 6,
    chapterId: 5,
    type: "ARROWS",
    title: "🏹 Diagram Panah: Siswa dan Nomor Bangku Kelas",
    question: "Hubungkan tali panah korespondensi satu-satu dari 3 siswa ke 3 nomor bangku kelas: Ali ke Bangku 2, Beni ke Bangku 3, dan Caca ke Bangku 1!",
    labelA: "Nama Siswa",
    labelB: "Nomor Bangku",
    setA: ["Ali", "Beni", "Caca"],
    setB: ["Bangku 1", "Bangku 2", "Bangku 3"],
    rule: "siswa_bangku",
    correctPairs: [
      "Ali->Bangku 2",
      "Beni->Bangku 3",
      "Caca->Bangku 1"
    ],
    correctReason: "Sempurna! Semua siswa dan nomor bangku terhubung tepat satu-satu tanpa ada bangku yang kosong dan tanpa siswa yang berebut bangku.",
    wrongExplanation: "Pastikan: Ali ➔ Bangku 2, Beni ➔ Bangku 3, dan Caca ➔ Bangku 1.",
    clue: "Tarik garis Ali ke Bangku 2, Beni ke Bangku 3, dan Caca ke Bangku 1.",
    remedialVariant: {
      type: "ARROWS",
      title: "🏹 Remedial: Diagram Panah 2 Bangku",
      question: "Hubungkan Dika ke Bangku A dan Erna ke Bangku B secara 1-ke-1!",
      labelA: "Siswa",
      labelB: "Bangku",
      setA: ["Dika", "Erna"],
      setB: ["Bangku A", "Bangku B"],
      correctPairs: ["Dika->Bangku A", "Erna->Bangku B"],
      correctReason: "Bagus! Hubungan 1-ke-1 terpasang tepat.",
      wrongExplanation: "Dika ke Bangku A, Erna ke Bangku B.",
      clue: "Tarik garis Dika ke A dan Erna ke B."
    }
  },
  {
    id: 7,
    chapterId: 5,
    type: "SLOT_FILL",
    title: "🔢 Menghitung Nilai Faktorial 4!",
    question: "Diketahui jumlah anggota n(A) = n(B) = 4. Tentukan banyak seluruh kemungkinan susunan korespondensi satu-satu dengan melengkapi perhitungan 4! (4 × 3 × 2 × 1)!",
    subInstruction: "Pasang kartu angka hasil perhitungan ke dalam kotak [ ? ]:",
    slots: [
      {
        id: "s1",
        label: "Jumlah anggota himpunan n =",
        answer: "4"
      },
      {
        id: "s2",
        label: "Banyak kemungkinan susunan (4!) =",
        answer: "24"
      }
    ],
    tokens: ["4", "12", "16", "24", "48"],
    correctReason: "Tepat sekali! 4! = 4 × 3 × 2 × 1 = 24 cara kemungkinan susunan korespondensi satu-satu.",
    wrongExplanation: "Untuk n = 4, maka 4! = 4 × 3 × 2 × 1 = 24 cara.",
    clue: "Jumlah anggota = 4, lalu hitung 4 × 3 × 2 × 1 = 24.",
    remedialVariant: {
      type: "SLOT_FILL",
      title: "🔢 Remedial: Menghitung Faktorial 3!",
      question: "Hitung banyak korespondensi satu-satu untuk himpunan beranggotakan 3 elemen (n = 3)!",
      slots: [
        { id: "s1", label: "Banyak anggota n =", answer: "3" },
        { id: "s2", label: "Banyak susunan (3!) =", answer: "6" }
      ],
      tokens: ["3", "6", "9", "12"],
      correctReason: "Tepat! 3! = 3 × 2 × 1 = 6 susunan.",
      wrongExplanation: "3! = 3 × 2 × 1 = 6.",
      clue: "3 × 2 × 1 = 6."
    }
  },
  {
    id: 8,
    chapterId: 5,
    type: "MCQ_COMPLEX",
    title: "🔍 Analisis Pasangan Korespondensi Satu-Satu",
    question: "Perhatikan beberapa himpunan pasangan berurutan berikut. Pilih SEMUA himpunan yang memenuhi syarat sebagai korespondensi satu-satu (tidak ada angka depan kembar dan tidak ada huruf belakang kembar)!",
    options: [
      "Himpunan P = {(1, a), (2, b), (3, c)}",
      "Himpunan Q = {(1, a), (2, a), (3, c)} — (Huruf 'a' muncul dua kali)",
      "Himpunan R = {(1, b), (2, c), (3, a)}",
      "Himpunan S = {(1, a), (2, b), (1, c)} — (Angka '1' bercabang dua)"
    ],
    correctMultiple: [
      "Himpunan P = {(1, a), (2, b), (3, c)}",
      "Himpunan R = {(1, b), (2, c), (3, a)}"
    ],
    correctReason: "Luar biasa teliti! Himpunan P dan R sah sebagai korespondensi satu-satu karena seluruh angka depan unik dan seluruh huruf belakang juga unik. Himpunan Q bukan 1-1 karena huruf 'a' kembar, dan Himpunan S bukan 1-1 karena angka '1' bercabang!",
    wrongExplanation: "Himpunan yang sah adalah P dan R. Pada Q ada huruf kembar (a), pada S ada angka kembar (1).",
    clue: "Pilihlah himpunan yang tidak memiliki angka depan kembar dan tidak memiliki huruf belakang kembar.",
    remedialVariant: {
      type: "MCQ_COMPLEX",
      title: "🔍 Remedial: Pasangan 1-ke-1 yang Sah",
      question: "Pilihlah pasangan berurutan yang merupakan korespondensi satu-satu!",
      options: [
        "{(1, x), (2, y)}",
        "{(1, x), (2, x)}",
        "{(3, a), (4, b)}"
      ],
      correctMultiple: [
        "{(1, x), (2, y)}",
        "{(3, a), (4, b)}"
      ],
      correctReason: "Tepat! Pasangan yang tidak memiliki anggota kembar adalah korespondensi satu-satu.",
      wrongExplanation: "{(1, x), (2, x)} bukan 1-1 karena huruf x muncul dua kali.",
      clue: "Hindari pilihan yang memiliki huruf kembar."
    }
  },
  {
    id: 9,
    chapterId: 5,
    type: "CARTESIAN",
    title: "📍 Plot Titik Koordinat Korespondensi Satu-Satu pada Kartesius",
    question: "Tandai 3 titik koordinat pada bidang Kartesius: (1, 2), (2, 3), dan (3, 1). Perhatikan bahwa pada korespondensi satu-satu, setiap kolom tegak dan setiap baris mendatar hanya memuat TEPAT SATU titik!",
    minX: 0,
    maxX: 4,
    minY: 0,
    maxY: 4,
    labelX: "Sumbu X (Domain)",
    labelY: "Sumbu Y (Kodomain)",
    targetPoints: [
      [1, 2],
      [2, 3],
      [3, 1]
    ],
    correctReason: "Luar biasa! Pada bidang Kartesius, korespondensi satu-satu terlihat jelas: tidak ada dua titik di kolom yang sama (garis vertikal) dan tidak ada dua titik di baris yang sama (garis horizontal).",
    wrongExplanation: "Tandai titik koordinat: (1, 2), (2, 3), dan (3, 1).",
    clue: "Klik pada perpotongan garis kisi koordinat (1, 2), (2, 3), dan (3, 1).",
    remedialVariant: {
      type: "CARTESIAN",
      title: "📍 Remedial: Titik Koordinat 1-ke-1",
      question: "Tandai 3 titik koordinat korespondensi satu-satu: (1, 1), (2, 2), dan (3, 3)!",
      minX: 0,
      maxX: 4,
      minY: 0,
      maxY: 4,
      targetPoints: [
        [1, 1],
        [2, 2],
        [3, 3]
      ],
      correctReason: "Sempurna! Setiap baris dan kolom hanya memiliki tepat satu titik.",
      wrongExplanation: "Klik titik (1, 1), (2, 2), dan (3, 3).",
      clue: "Titik (1, 1), (2, 2), dan (3, 3)."
    }
  },
  {
    id: 10,
    chapterId: 5,
    type: "DRAG_DROP",
    title: "🎯 Contoh Nyata: Korespondensi 1-ke-1 vs Relasi Biasa",
    question: "Kelompokkan contoh hubungan sehari-hari berikut ke dalam kotak 'Korespondensi Satu-Satu' atau 'Relasi Biasa (Bisa Bercabang)'!",
    categories: [
      "Korespondensi Satu-Satu",
      "Relasi Biasa (Bisa Bercabang)"
    ],
    items: [
      "Siswa dengan Nomor Induk Siswa Nasional (NISN)",
      "Warga Negara dengan Nomor KTP (NIK)",
      "Siswa dengan Makanan Kesukaannya",
      "Orang dengan Hobi Kegemarannya"
    ],
    correctMapping: {
      "Siswa dengan Nomor Induk Siswa Nasional (NISN)": "Korespondensi Satu-Satu",
      "Warga Negara dengan Nomor KTP (NIK)": "Korespondensi Satu-Satu",
      "Siswa dengan Makanan Kesukaannya": "Relasi Biasa (Bisa Bercabang)",
      "Orang dengan Hobi Kegemarannya": "Relasi Biasa (Bisa Bercabang)"
    },
    itemExplanations: {
      "Siswa dengan Nomor Induk Siswa Nasional (NISN)": "Setiap siswa memiliki tepat 1 NISN unik, dan 1 NISN hanya dimiliki 1 siswa (1-ke-1).",
      "Warga Negara dengan Nomor KTP (NIK)": "Setiap warga negara memiliki tepat 1 NIK unik (1-ke-1).",
      "Siswa dengan Makanan Kesukaannya": "Satu siswa bisa menyukai lebih dari satu makanan sekaligus (Bisa bercabang).",
      "Orang dengan Hobi Kegemarannya": "Satu orang bisa memiliki beberapa hobi kegemaran (Bisa bercabang)."
    },
    correctReason: "Sangat jeli! Kamu dapat membedakan hubungan unik timbal-balik satu-ke-satu di dunia nyata (seperti NISN dan NIK) dengan relasi bebas sehari-hari (seperti makanan dan hobi).",
    wrongExplanation: "NISN dan NIK bersifat eksklusif 1-ke-1. Makanan kesukaan dan hobi bisa bercabang banyak.",
    clue: "NISN dan NIK adalah nomor unik yang tidak mungkin dimiliki bersama.",
    remedialVariant: {
      type: "DRAG_DROP",
      title: "🎯 Remedial: Hubungan 1-ke-1 di Dunia Nyata",
      question: "Kelompokkan ke kotak Korespondensi 1-ke-1 atau Relasi Biasa!",
      categories: [
        "Korespondensi 1-ke-1",
        "Relasi Biasa"
      ],
      items: [
        "Negara dengan Lagu Kebangsaan Resmi",
        "Siswa dengan Warna Favorit"
      ],
      correctMapping: {
        "Negara dengan Lagu Kebangsaan Resmi": "Korespondensi 1-ke-1",
        "Siswa dengan Warna Favorit": "Relasi Biasa"
      },
      correctReason: "Tepat! Lagu kebangsaan bersifat unik 1-ke-1 untuk tiap negara, sedangkan warna favorit bisa bercabang.",
      wrongExplanation: "Lagu kebangsaan = 1-ke-1, warna favorit = bisa banyak.",
      clue: "Lagu kebangsaan unik untuk tiap negara."
    }
  }
];
