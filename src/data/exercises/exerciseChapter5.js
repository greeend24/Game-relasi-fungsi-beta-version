/**
 * LATIHAN CHAPTER 5: KORESPONDENSI SATU-SATU
 * 30 Soal Interaktif + Variasi Remedial Angka Berbeda
 * Format: MCQ, TRUE_FALSE, MCQ_COMPLEX, MATCHING, ARROWS, CARTESIAN
 */

export const EXERCISE_CHAPTER_5 = [
  {
    id: 1,
    chapterId: 5,
    type: "MCQ",
    title: "🔗 Pengertian Korespondensi Satu-Satu",
    question: "Apakah yang dimaksud dengan korespondensi satu-satu (pemetaan bijektif) antara himpunan A dan himpunan B?",
    options: [
      "Relasi di mana setiap anggota A berpasangan dengan tepat satu anggota B, dan setiap anggota B berpasangan dengan tepat satu anggota A",
      "Relasi di mana anggota A boleh memilih lebih dari satu anggota B asalkan semua B terpasang",
      "Fungsi di mana semua anggota A berpasangan ke satu anggota B yang sama",
      "Relasi yang hanya berlaku untuk himpunan yang anggotanya berupa bilangan genap"
    ],
    correct: "Relasi di mana setiap anggota A berpasangan dengan tepat satu anggota B, dan setiap anggota B berpasangan dengan tepat satu anggota A",
    correctReason: "Tepat sekali! Korespondensi satu-satu adalah pemetaan timbal balik yang sempurna: setiap anggota asal punya tepat 1 kawan, dan setiap anggota kawan juga punya tepat 1 kawan di asal (tidak ada yang kosong dan tidak ada yang bercabang di kedua belah pihak).",
    wrongExplanation: "Pada korespondensi satu-satu, kedua himpunan saling mengikat secara eksklusif (1-ke-1) tanpa ada anggota yang jomblo ataupun bercabang.",
    clue: "Ingat prinsip: satu untuk satu, saling setia dan tidak ada yang tersisa di kedua himpunan.",
    remedialVariant: {
      question: "Ciri utama dari relasi korespondensi satu-satu adalah...",
      options: [
        "Setiap anggota domain dan kodomain berpasangan tepat satu secara timbal balik",
        "Domain boleh bercabang ke beberapa anggota kodomain",
        "Kodomain boleh memiliki anggota yang tidak berpasangan",
        "Hanya boleh memiliki 2 anggota himpunan"
      ],
      correct: "Setiap anggota domain dan kodomain berpasangan tepat satu secara timbal balik",
      correctReason: "Benar! Pasangannya tepat satu secara timbal balik antara domain dan kodomain.",
      wrongExplanation: "Korespondensi satu-satu tidak memperbolehkan cabang maupun anggota sisa di kedua himpunan."
    }
  },
  {
    id: 2,
    chapterId: 5,
    type: "TRUE_FALSE",
    title: "⚖️ Syarat Mutlak n(A) = n(B)",
    question: "Pernyataan: Korespondensi satu-satu hanya mungkin terjadi jika jumlah anggota himpunan A persis sama dengan jumlah anggota himpunan B (n(A) = n(B)).",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Ini adalah syarat mutlak yang paling fundamental. Jika jumlah anggotanya berbeda, pasti ada anggota yang tidak kebagian pasangan atau ada yang terpaksa bercabang.",
    wrongExplanation: "Pernyataan ini bernilai Benar. Syarat pertama dan utama korespondensi satu-satu adalah n(A) = n(B).",
    clue: "Jika jumlah anggota berbeda, tidak mungkin semua berpasangan satu lawan satu secara adil.",
    remedialVariant: {
      question: "Pernyataan: Korespondensi satu-satu dapat terbentuk antara himpunan beranggotakan 4 elemen dengan himpunan beranggotakan 5 elemen.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Pernyataan tersebut salah karena n(A) harus sama dengan n(B). Jika 4 dan 5, pasti ada 1 anggota yang tidak memiliki pasangan.",
      wrongExplanation: "Jumlah anggota harus persis sama agar bisa membentuk korespondensi satu-satu."
    }
  },
  {
    id: 3,
    chapterId: 5,
    type: "MCQ",
    title: "🔢 Menghitung Banyak Korespondensi (3!)",
    question: "Diketahui himpunan A = {1, 2, 3} dan B = {a, b, c}. Banyaknya korespondensi satu-satu yang mungkin terbentuk dari A ke B adalah...",
    options: ["6", "9", "8", "3"],
    correct: "6",
    correctReason: "Hebat! Rumus banyak korespondensi satu-satu adalah n! (faktorial). Karena n = 3, maka 3! = 3 × 2 × 1 = 6 kemungkinan.",
    wrongExplanation: "Rumus korespondensi satu-satu adalah n! = n × (n−1) × ... × 1. Untuk n = 3: 3 × 2 × 1 = 6 (bukan 3² = 9).",
    clue: "Gunakan perkalian faktorial: 3 × 2 × 1.",
    remedialVariant: {
      question: "Jika n(A) = n(B) = 3, berapa banyak kemungkinan korespondensi satu-satu yang dapat dibentuk?",
      options: ["6", "8", "9", "12"],
      correct: "6",
      correctReason: "Tepat! 3! = 3 × 2 × 1 = 6 kemungkinan.",
      wrongExplanation: "Banyak korespondensi = 3! = 6."
    }
  },
  {
    id: 4,
    chapterId: 5,
    type: "MCQ",
    title: "🔢 Menghitung Nilai 4!",
    question: "Berapakah banyak korespondensi satu-satu yang mungkin dari dua himpunan yang masing-masing memiliki 4 anggota (4!)?",
    options: ["24", "16", "12", "64"],
    correct: "24",
    correctReason: "Luar biasa! 4! = 4 × 3 × 2 × 1 = 24 kemungkinan susunan pasangan.",
    wrongExplanation: "4! = 4 × 3 × 2 × 1 = 24. Jangan keliru dengan 4² = 16 atau 4 × 4 = 16.",
    clue: "Hitung: 4 × 3 = 12, lalu 12 × 2 = 24, lalu 24 × 1 = 24.",
    remedialVariant: {
      question: "Berapakah hasil perhitungan dari 4! (4 faktorial)?",
      options: ["24", "16", "20", "8"],
      correct: "24",
      correctReason: "Tepat! 4! = 4 × 3 × 2 × 1 = 24.",
      wrongExplanation: "4 × 3 × 2 × 1 = 24."
    }
  },
  {
    id: 5,
    chapterId: 5,
    type: "TRUE_FALSE",
    title: "🔍 Menguji Pasangan Korespondensi",
    question: "Pernyataan: Himpunan pasangan berurutan {(1, a), (2, b), (3, a)} merupakan korespondensi satu-satu.",
    options: ["Benar", "Salah"],
    correct: "Salah",
    correctReason: "Tepat! Pernyataan tersebut SALAH karena anggota kodomain 'a' dipasangkan dua kali (dengan 1 dan dengan 3). Pada korespondensi satu-satu, anggota kodomain tidak boleh dipilih berulang.",
    wrongExplanation: "Meskipun merupakan fungsi yang sah, pasangan ini bukan korespondensi satu-satu karena elemen 'a' menerima dua pasangan.",
    clue: "Periksa elemen kedua: huruf 'a' muncul dua kali, melanggar syarat satu-ke-satu.",
    remedialVariant: {
      question: "Pernyataan: Himpunan pasangan {(1, x), (2, y), (3, z)} merupakan korespondensi satu-satu yang sah.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Semua elemen depan dan belakang berbeda dan berpasangan satu-lawan-satu.",
      wrongExplanation: "Setiap elemen domain dan kodomain berpasangan unik tepat satu kali."
    }
  },
  {
    id: 6,
    chapterId: 5,
    type: "MATCHING",
    title: "🔡 Menjodohkan Nilai Faktorial",
    question: "Jodohkan lambang faktorial di sebelah kiri dengan nilai perhitungannya yang tepat di kanan!",
    pairs: [
      { left: "2!", right: "2" },
      { left: "3!", right: "6" },
      { left: "4!", right: "24" }
    ],
    rightOptions: ["2", "6", "24", "120"],
    correctReason: "Sempurna! 2! = 2×1 = 2; 3! = 3×2×1 = 6; 4! = 4×3×2×1 = 24.",
    wrongExplanation: "Faktorial n! adalah hasil kali semua bilangan bulat positif dari n mundur sampai 1.",
    clue: "2!=2, 3!=6, 4!=24.",
    remedialVariant: {
      question: "Jodohkan lambang faktorial dengan hasil perkaliannya!",
      pairs: [
        { left: "1!", right: "1" },
        { left: "3!", right: "6" },
        { left: "5!", right: "120" }
      ],
      rightOptions: ["1", "6", "120", "24"],
      correctReason: "Tepat! 1! = 1, 3! = 6, dan 5! = 120.",
      wrongExplanation: "5! = 5 × 4 × 3 × 2 × 1 = 120."
    }
  },
  {
    id: 7,
    chapterId: 5,
    type: "MCQ",
    title: "🌍 Contoh Dunia Nyata",
    question: "Manakah contoh hubungan di dunia nyata yang PALING TEPAT menggambarkan korespondensi satu-satu?",
    options: [
      "Setiap negara di dunia dengan lagu kebangsaan resminya",
      "Siswa dengan hobi olahraga",
      "Guru dengan murid-murid di kelasnya",
      "Pengendara motor dengan warna helm yang dipakainya"
    ],
    correct: "Setiap negara di dunia dengan lagu kebangsaan resminya",
    correctReason: "Benar sekali! Setiap negara berdaulat memiliki tepat satu lagu kebangsaan resmi, dan satu lagu kebangsaan resmi hanya dimiliki oleh satu negara tertentu.",
    wrongExplanation: "Siswa bisa memiliki banyak hobi (bercabang); seorang guru mengajar banyak murid (bercabang). Lagu kebangsaan bersifat eksklusif satu negara satu lagu.",
    clue: "Cari hubungan eksklusif di mana kedua belah pihak hanya berpasangan tepat satu.",
    remedialVariant: {
      question: "Manakah hubungan berikut yang merupakan korespondensi satu-satu?",
      options: [
        "Setiap siswa di kelas dengan nomor kursi ujiannya yang telah ditentukan",
        "Siswa dengan menu makanan kantin",
        "Ibu dengan anak-anak kandungnya",
        "Pembeli dengan barang belanjaan di kasir"
      ],
      correct: "Setiap siswa di kelas dengan nomor kursi ujiannya yang telah ditentukan",
      correctReason: "Tepat! Satu siswa duduk di satu kursi ujian, dan satu kursi hanya diduduki oleh satu siswa.",
      wrongExplanation: "Nomor kursi ujian bersifat unik satu siswa satu meja/kursi."
    }
  },
  {
    id: 8,
    chapterId: 5,
    type: "MCQ_COMPLEX",
    title: "☑️ Ciri-ciri Korespondensi Satu-Satu",
    question: "Manakah pernyataan yang BENAR mengenai korespondensi satu-satu? (Pilih semua yang benar)",
    options: [
      "Jumlah anggota himpunan asal wajib sama dengan himpunan kawan: n(A) = n(B)",
      "Daerah hasil (Range) sama persis dengan seluruh Daerah Kawan (Kodomain)",
      "Dapat dibentuk fungsi kebalikan (fungsi invers) yang juga merupakan fungsi sah",
      "Anggota daerah kawan boleh ada yang tidak memiliki pasangan"
    ],
    correctMultiple: [
      "Jumlah anggota himpunan asal wajib sama dengan himpunan kawan: n(A) = n(B)",
      "Daerah hasil (Range) sama persis dengan seluruh Daerah Kawan (Kodomain)",
      "Dapat dibentuk fungsi kebalikan (fungsi invers) yang juga merupakan fungsi sah"
    ],
    correctReason: "Hebat! Pada korespondensi satu-satu, Range = Kodomain (karena semua anggota kawan terpasang), n(A) = n(B), dan fungsi kebalikannya (invers) dijamin sah menjadi fungsi.",
    wrongExplanation: "Pernyataan 'anggota kawan boleh ada yang tidak memiliki pasangan' salah, karena pada korespondensi satu-satu semua anggota kawan wajib terpasang.",
    clue: "Korespondensi satu-satu bersifat sempurna di kedua sisi himpunan.",
    remedialVariant: {
      question: "Manakah syarat dan sifat korespondensi satu-satu? (Pilih semua yang benar)",
      options: [
        "n(A) harus sama dengan n(B)",
        "Tidak ada anggota yang bercabang",
        "Tidak ada anggota yang tertinggal tanpa pasangan",
        "Jumlah anggota domain harus lebih banyak dari kodomain"
      ],
      correctMultiple: [
        "n(A) harus sama dengan n(B)",
        "Tidak ada anggota yang bercabang",
        "Tidak ada anggota yang tertinggal tanpa pasangan"
      ],
      correctReason: "Tepat! n(A)=n(B), tanpa cabang, dan tanpa anggota sisa.",
      wrongExplanation: "Jumlah anggota kedua himpunan wajib sama persis."
    }
  },
  {
    id: 9,
    chapterId: 5,
    type: "ARROWS",
    title: "🏹 Sambungkan Korespondensi Satu-Satu",
    question: "Hubungkan setiap elemen himpunan A ke B sehingga membentuk korespondensi satu-satu dengan aturan f(x) = x + 3!",
    setA: [1, 2, 3],
    setB: [4, 5, 6],
    correctPairs: ["1->4", "2->5", "3->6"],
    correctReason: "Luar biasa! 1➔4, 2➔5, dan 3➔6. Setiap elemen di kedua himpunan memiliki pasangan tepat satu tanpa ada yang tersisa.",
    wrongExplanation: "1+3 = 4; 2+3 = 5; 3+3 = 6. Hubungkan 1 ke 4, 2 ke 5, dan 3 ke 6.",
    clue: "Tambahkan 3 pada masing-masing anggota himpunan A.",
    remedialVariant: {
      question: "Hubungkan korespondensi satu-satu f(x) = x + 2 dari A = {2, 4, 6} ke B = {4, 6, 8}!",
      setA: [2, 4, 6],
      setB: [4, 6, 8],
      correctPairs: ["2->4", "4->6", "6->8"],
      correctReason: "Tepat! 2+2=4; 4+2=6; 6+2=8.",
      wrongExplanation: "Hubungkan 2 ke 4, 4 ke 6, dan 6 ke 8."
    }
  },
  {
    id: 10,
    chapterId: 5,
    type: "MCQ",
    title: "🔢 Menghitung Nilai 5!",
    question: "Jika dua himpunan masing-masing memiliki 5 anggota, banyak korespondensi satu-satu yang mungkin adalah...",
    options: ["120", "25", "60", "24"],
    correct: "120",
    correctReason: "Bagus sekali! 5! = 5 × 4 × 3 × 2 × 1 = 120 kemungkinan pasangan.",
    wrongExplanation: "5! = 5 × 4 × 3 × 2 × 1 = 120 (bukan 5² = 25).",
    clue: "Kalikan 5 dengan 4! (5 × 24 = 120).",
    remedialVariant: {
      question: "Berapakah hasil dari 5! (5 faktorial)?",
      options: ["120", "25", "100", "720"],
      correct: "120",
      correctReason: "Tepat! 5! = 5 × 4 × 3 × 2 × 1 = 120.",
      wrongExplanation: "5 × 4 × 3 × 2 × 1 = 120."
    }
  },
  {
    id: 11,
    chapterId: 5,
    type: "TRUE_FALSE",
    title: "🔄 Konsep Fungsi Invers",
    question: "Pernyataan: Suatu fungsi hanya dapat memiliki fungsi invers (kebalikan) yang sah jika fungsi tersebut merupakan korespondensi satu-satu.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Jika bukan korespondensi satu-satu, ketika arah panahnya dibalik, akan ada anggota yang bercabang atau tidak memiliki pasangan sehingga gagal menjadi fungsi.",
    wrongExplanation: "Pernyataan ini adalah teorema penting dalam matematika: hanya fungsi bijektif (korespondensi satu-satu) yang memiliki invers berupa fungsi.",
    clue: "Ketika panah dibalik, syarat fungsi (tidak boleh kosong dan tidak bercabang) tetap harus terpenuhi.",
    remedialVariant: {
      question: "Pernyataan: Fungsi yang memiliki dua anggota domain memanah ke satu anggota kodomain yang sama tetap dapat dibalik menjadi fungsi invers.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Jika dibalik, satu anggota tersebut akan memancarkan dua panah (bercabang), sehingga bukan fungsi.",
      wrongExplanation: "Cabang saat dibalik menggagalkan syarat fungsi invers."
    }
  },
  {
    id: 12,
    chapterId: 5,
    type: "MCQ",
    title: "🔍 Menentukan Korespondensi dari Pasangan",
    question: "Di antara himpunan pasangan berurutan berikut, manakah yang merupakan KORESPONDENSI SATU-SATU?",
    options: [
      "{(1, p), (2, q), (3, r)}",
      "{(1, p), (2, p), (3, r)}",
      "{(1, p), (2, q), (2, r)}",
      "{(1, p), (3, q)}"
    ],
    correct: "{(1, p), (2, q), (3, r)}",
    correctReason: "Tepat! Elemen asal {1, 2, 3} dan elemen tujuan {p, q, r} semuanya berpasangan tepat satu tanpa ada pengulangan di depan maupun di belakang.",
    wrongExplanation: "Pada opsi B, huruf 'p' berulang. Pada opsi C, angka 2 berulang (bercabang). Pada opsi D, jumlah anggotanya tidak lengkap.",
    clue: "Pastikan semua angka depan unik DAN semua huruf belakang juga unik.",
    remedialVariant: {
      question: "Manakah himpunan pasangan yang merupakan korespondensi satu-satu?",
      options: [
        "{(a, 1), (b, 2), (c, 3)}",
        "{(a, 1), (b, 1), (c, 3)}",
        "{(a, 1), (a, 2), (b, 3)}",
        "{(a, 2), (b, 2)}"
      ],
      correct: "{(a, 1), (b, 2), (c, 3)}",
      correctReason: "Tepat! Semua huruf asal unik dan semua angka tujuan juga unik.",
      wrongExplanation: "Tidak boleh ada pengulangan di elemen pertama maupun kedua."
    }
  },
  {
    id: 13,
    chapterId: 5,
    type: "MATCHING",
    title: "🧩 Menjodohkan Pasangan Korespondensi",
    question: "Relasi dari himpunan A = {Indonesia, Jepang, Perancis} ke B = {Tokyo, Paris, Jakarta} adalah 'ibu kota negara'. Jodohkan dengan tepat!",
    pairs: [
      { left: "Indonesia", right: "Jakarta" },
      { left: "Jepang", right: "Tokyo" },
      { left: "Perancis", right: "Paris" }
    ],
    rightOptions: ["Jakarta", "Tokyo", "Paris", "London"],
    correctReason: "Luar biasa! Hubungan negara dan ibu kotanya merupakan contoh nyata korespondensi satu-satu yang paling terkenal.",
    wrongExplanation: "Ibu kota Indonesia adalah Jakarta, Jepang adalah Tokyo, dan Perancis adalah Paris.",
    clue: "Pasangkan masing-masing negara dengan ibu kota resminya.",
    remedialVariant: {
      question: "Jodohkan negara dengan ibu kotanya!",
      pairs: [
        { left: "Inggris", right: "London" },
        { left: "Italia", right: "Roma" },
        { left: "Jerman", right: "Berlin" }
      ],
      rightOptions: ["London", "Roma", "Berlin", "Madrid"],
      correctReason: "Tepat! Inggris-London, Italia-Roma, Jerman-Berlin.",
      wrongExplanation: "Pasangkan negara dengan ibu kotanya yang tepat."
    }
  },
  {
    id: 14,
    chapterId: 5,
    type: "MCQ",
    title: "🔢 Mencari n dari Nilai Faktorial",
    question: "Banyak korespondensi satu-satu yang mungkin dari himpunan P ke Q adalah 720. Berapakah jumlah anggota himpunan P (n(P))?",
    options: ["6", "5", "7", "8"],
    correct: "6",
    correctReason: "Sangat tepat! Karena 6! = 6 × 5 × 4 × 3 × 2 × 1 = 720. Jadi jumlah anggota himpunan P adalah 6.",
    wrongExplanation: "5! = 120. 6! = 6 × 120 = 720. Jadi nilai n adalah 6.",
    clue: "Coba kalikan 6 × 5!: 6 × 120 = 720.",
    remedialVariant: {
      question: "Jika banyak korespondensi satu-satu dari A ke B adalah 24, berapa banyak anggota himpunan A?",
      options: ["4", "3", "5", "6"],
      correct: "4",
      correctReason: "Tepat! 4! = 24, sehingga n(A) = 4.",
      wrongExplanation: "4 × 3 × 2 × 1 = 24."
    }
  },
  {
    id: 15,
    chapterId: 5,
    type: "TRUE_FALSE",
    title: "📌 Diagram Panah Silang",
    question: "Pernyataan: Pada diagram panah korespondensi satu-satu, garis anak panah boleh saling bersilangan asalkan setiap titik tetap hanya memiliki satu panah.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Arah panah boleh lurus sejajar maupun menyilang, yang terpenting adalah setiap titik asal memancarkan tepat 1 panah dan setiap titik tujuan menerima tepat 1 panah.",
    wrongExplanation: "Posisi garis menyilang tidak mempengaruhi keabsahan matematis dari korespondensi satu-satu.",
    clue: "Yang penting adalah jumlah panah per titik (harus tepat satu), bukan lurus/tidaknya garis panah.",
    remedialVariant: {
      question: "Pernyataan: Garis panah pada korespondensi satu-satu harus selalu digambar lurus sejajar horizontal.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Garis panah bebas mengarah ke anggota mana pun, boleh menyilang.",
      wrongExplanation: "Pasangan elemen bebas dihubungkan ke mana pun selama satu-ke-satu."
    }
  },
  {
    id: 16,
    chapterId: 5,
    type: "MCQ_COMPLEX",
    title: "☑️ Pasangan yang BUKAN Korespondensi Satu-Satu",
    question: "Manakah relasi di bawah ini yang BUKAN merupakan korespondensi satu-satu? (Pilih semua yang benar)",
    options: [
      "{(1, a), (2, a), (3, a)}",
      "{(1, a), (2, b), (3, c), (4, d)}",
      "{(1, x), (2, y), (3, y)}",
      "{(p, 1), (q, 2)}"
    ],
    correctMultiple: [
      "{(1, a), (2, a), (3, a)}",
      "{(1, x), (2, y), (3, y)}"
    ],
    correctReason: "Hebat! Pada opsi pertama semua elemen memanah ke 'a' (bukan satu-satu). Pada opsi ketiga, elemen 'y' menerima dua panah. Opsi kedua dan keempat adalah korespondensi satu-satu yang sah.",
    wrongExplanation: "Korespondensi satu-satu tidak memperbolehkan elemen belakang yang berulang.",
    clue: "Cari opsi yang memiliki huruf/angka di posisi kedua berulang.",
    remedialVariant: {
      question: "Manakah himpunan pasangan yang GAGAL menjadi korespondensi satu-satu? (Pilih semua yang benar)",
      options: [
        "{(2, 4), (3, 4)}",
        "{(1, 5), (2, 6)}",
        "{(a, 1), (b, 1), (c, 1)}",
        "{(x, y), (z, w)}"
      ],
      correctMultiple: [
        "{(2, 4), (3, 4)}",
        "{(a, 1), (b, 1), (c, 1)}"
      ],
      correctReason: "Tepat! Elemen belakang terulang (tidak satu-satu).",
      wrongExplanation: "Angka 4 terulang pada opsi pertama dan angka 1 terulang pada opsi ketiga."
    }
  },
  {
    id: 17,
    chapterId: 5,
    type: "MCQ",
    title: "🔢 Perhitungan Faktorial 1!",
    question: "Berapakah banyak korespondensi satu-satu yang mungkin jika himpunan A dan B masing-masing hanya memiliki 1 anggota?",
    options: ["1", "0", "2", "Tak terhingga"],
    correct: "1",
    correctReason: "Tepat! 1! = 1. Karena hanya ada satu anggota di asal dan satu di tujuan, hanya ada tepat 1 cara untuk memasangkannya.",
    wrongExplanation: "1! = 1. Hanya ada tepat 1 kemungkinan pasangan tunggal.",
    clue: "Hanya ada 1 elemen di A dan 1 elemen di B: pasangannya tunggal.",
    remedialVariant: {
      question: "Banyak korespondensi satu-satu dari himpunan A = {x} ke B = {y} adalah...",
      options: ["1", "0", "2", "4"],
      correct: "1",
      correctReason: "Tepat! Hanya ada 1 kemungkinan: {(x, y)}.",
      wrongExplanation: "1! = 1 kemungkinan."
    }
  },
  {
    id: 18,
    chapterId: 5,
    type: "ARROWS",
    title: "🏹 Sambungkan Korespondensi Invers",
    question: "Hubungkan panah korespondensi satu-satu dari A = {3, 6, 9} ke B = {1, 2, 3} dengan aturan 'sepertiga dari' (f(x) = x / 3)!",
    setA: [3, 6, 9],
    setB: [1, 2, 3],
    correctPairs: ["3->1", "6->2", "9->3"],
    correctReason: "Mantap! 3/3 = 1; 6/3 = 2; 9/3 = 3. Setiap elemen terpasang satu-ke-satu dengan sempurna.",
    wrongExplanation: "3:3 = 1; 6:3 = 2; 9:3 = 3. Pasangkan 3➔1, 6➔2, dan 9➔3.",
    clue: "Bagi setiap angka di himpunan A dengan 3.",
    remedialVariant: {
      question: "Hubungkan fungsi f(x) = x / 2 dari A = {2, 4, 6} ke B = {1, 2, 3}!",
      setA: [2, 4, 6],
      setB: [1, 2, 3],
      correctPairs: ["2->1", "4->2", "6->3"],
      correctReason: "Tepat! 2/2 = 1; 4/2 = 2; 6/2 = 3.",
      wrongExplanation: "Bagi setiap elemen di A dengan 2."
    }
  },
  {
    id: 19,
    chapterId: 5,
    type: "TRUE_FALSE",
    title: "📌 Istilah Pemetaan Bijektif",
    question: "Pernyataan: Dalam istilah matematika tingkat lanjut, korespondensi satu-satu juga disebut sebagai fungsi atau pemetaan BIJEKTIF.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Pemetaan bijektif adalah fungsi yang sekaligus bersifat injektif (satu-satu) dan surjektif (pada). Keduanya bergabung menjadi bijektif (korespondensi satu-satu).",
    wrongExplanation: "Pernyataan ini bernilai benar. Bijektif adalah istilah ilmiah matematika untuk korespondensi satu-satu.",
    clue: "Injektif + Surjektif = Bijektif.",
    remedialVariant: {
      question: "Pernyataan: Fungsi bijektif adalah nama lain dari korespondensi satu-satu.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Istilah bijektif dan korespondensi satu-satu adalah sinonim dalam matematika.",
      wrongExplanation: "Keduanya merujuk pada konsep matematis yang identik."
    }
  },
  {
    id: 20,
    chapterId: 5,
    type: "MCQ",
    title: "🔍 Syarat Himpunan Pasangan",
    question: "Manakah syarat yang harus dipenuhi oleh himpunan pasangan berurutan agar menjadi korespondensi satu-satu?",
    options: [
      "Tidak ada elemen pertama yang kembar DAN tidak ada elemen kedua yang kembar",
      "Hanya elemen pertama yang tidak boleh kembar",
      "Hanya elemen kedua yang tidak boleh kembar",
      "Elemen pertama dan kedua harus berupa bilangan genap"
    ],
    correct: "Tidak ada elemen pertama yang kembar DAN tidak ada elemen kedua yang kembar",
    correctReason: "Luar biasa! Pada korespondensi satu-satu, keunikan berlaku mutlak di kedua sisi: angka depan (x) tidak boleh berulang dan angka belakang (y) juga tidak boleh berulang.",
    wrongExplanation: "Jika hanya elemen pertama yang unik, itu baru fungsi biasa. Agar menjadi korespondensi satu-satu, elemen kedua juga wajib unik.",
    clue: "Kedua posisi koordinat (depan dan belakang) wajib unik tanpa pengulangan.",
    remedialVariant: {
      question: "Jika pada himpunan pasangan ada angka kedua yang berulang, apakah masih bisa menjadi korespondensi satu-satu?",
      options: [
        "Tidak bisa, karena melanggar syarat satu-ke-satu pada kodomain",
        "Bisa, asalkan angka depannya beda",
        "Bisa, jika jumlah pasangannya genap",
        "Pasti bisa"
      ],
      correct: "Tidak bisa, karena melanggar syarat satu-ke-satu pada kodomain",
      correctReason: "Tepat! Pengulangan angka kedua menggugurkan status korespondensi satu-satu.",
      wrongExplanation: "Elemen kedua tidak boleh menerima lebih dari satu pasangan."
    }
  },
  {
    id: 21,
    chapterId: 5,
    type: "MATCHING",
    title: "🧩 Menjodohkan Banyak Pasangan",
    question: "Jodohkan jumlah anggota himpunan n(A) = n(B) di sebelah kiri dengan banyak kemungkinan korespondensi satu-satu di kanan!",
    pairs: [
      { left: "n = 2", right: "2 kemungkinan" },
      { left: "n = 3", right: "6 kemungkinan" },
      { left: "n = 4", right: "24 kemungkinan" }
    ],
    rightOptions: ["2 kemungkinan", "6 kemungkinan", "24 kemungkinan", "120 kemungkinan"],
    correctReason: "Hebat! 2! = 2; 3! = 6; 4! = 24.",
    wrongExplanation: "Gunakan rumus n! untuk masing-masing nilai n.",
    clue: "2!=2, 3!=6, 4!=24.",
    remedialVariant: {
      question: "Jodohkan nilai n dengan banyaknya pemetaan bijektif!",
      pairs: [
        { left: "n = 1", right: "1 kemungkinan" },
        { left: "n = 3", right: "6 kemungkinan" },
        { left: "n = 5", right: "120 kemungkinan" }
      ],
      rightOptions: ["1 kemungkinan", "6 kemungkinan", "120 kemungkinan", "24 kemungkinan"],
      correctReason: "Tepat! 1! = 1, 3! = 6, 5! = 120.",
      wrongExplanation: "Hitung nilai faktorial n!."
    }
  },
  {
    id: 22,
    chapterId: 5,
    type: "TRUE_FALSE",
    title: "📊 Perbandingan Fungsi Biasa vs Korespondensi",
    question: "Pernyataan: Banyak fungsi biasa dari A ke B selalu lebih banyak atau sama dengan banyak korespondensi satu-satu dari A ke B.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Untuk n = 3: banyak fungsi biasa adalah 3³ = 27 kemungkinan, sedangkan korespondensi satu-satu hanya 3! = 6 kemungkinan. Korespondensi satu-satu adalah bagian khusus dari seluruh fungsi biasa.",
    wrongExplanation: "Karena memiliki aturan yang lebih ketat, jumlah kemungkinan korespondensi satu-satu selalu lebih sedikit daripada fungsi biasa.",
    clue: "Bandingkan 3³ = 27 dengan 3! = 6.",
    remedialVariant: {
      question: "Pernyataan: Untuk n(A) = n(B) = 2, banyak fungsi biasa (2² = 4) lebih banyak dari korespondensi satu-satu (2! = 2).",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! 4 kemungkinan fungsi biasa > 2 kemungkinan korespondensi satu-satu.",
      wrongExplanation: "Fungsi biasa memiliki kemungkinan lebih banyak dibanding korespondensi satu-satu."
    }
  },
  {
    id: 23,
    chapterId: 5,
    type: "MCQ",
    title: "🔢 Perhitungan Kombinasi 3 Pasangan",
    question: "Diberikan A = {1, 2} dan B = {x, y}. Himpunan pasangan berurutan yang menunjukkan SEMUA kemungkinan korespondensi satu-satu dari A ke B adalah...",
    options: [
      "{(1, x), (2, y)} dan {(1, y), (2, x)}",
      "{(1, x), (2, x)} dan {(1, y), (2, y)}",
      "{(1, x), (2, y)} saja",
      "{(1, x), (1, y)} dan {(2, x), (2, y)}"
    ],
    correct: "{(1, x), (2, y)} dan {(1, y), (2, x)}",
    correctReason: "Sangat tepat! Karena 2! = 2 kemungkinan: kemungkinan pertama adalah 1➔x dan 2➔y, kemungkinan kedua adalah 1➔y dan 2➔x.",
    wrongExplanation: "Pasangan {(1, x), (2, x)} bukan korespondensi satu-satu karena x dipilih dua kali. Dua susunan yang sah adalah lurus dan bersilangan.",
    clue: "Ada 2 cara: pasangkan lurus atau pasangkan silang.",
    remedialVariant: {
      question: "Ada berapa susunan korespondensi satu-satu dari A = {a, b} ke B = {1, 2}?",
      options: ["2 susunan", "4 susunan", "1 susunan", "8 susunan"],
      correct: "2 susunan",
      correctReason: "Tepat! 2! = 2 susunan: {(a, 1), (b, 2)} dan {(a, 2), (b, 1)}.",
      wrongExplanation: "Hanya ada 2! = 2 kemungkinan susunan."
    }
  },
  {
    id: 24,
    chapterId: 5,
    type: "MCQ_COMPLEX",
    title: "☑️ Contoh Korespondensi di Kehidupan Nyata",
    question: "Manakah contoh relasi yang PASTI merupakan korespondensi satu-satu di dunia nyata? (Pilih semua yang benar)",
    options: [
      "Setiap kendaraan bermotor dengan pelat nomor resminya",
      "Setiap negara anggota PBB dengan benderanya masing-masing",
      "Setiap siswa dengan teman sebangkunya (di meja berdua)",
      "Setiap pembeli di supermarket dengan barang yang dibelinya"
    ],
    correctMultiple: [
      "Setiap kendaraan bermotor dengan pelat nomor resminya",
      "Setiap negara anggota PBB dengan benderanya masing-masing",
      "Setiap siswa dengan teman sebangkunya (di meja berdua)"
    ],
    correctReason: "Hebat! Pelat nomor kendaraan bersifat tunggal dan unik, bendera negara resmi bersifat unik, dan teman sebangku berdua saling berpasangan satu-lawan-satu secara eksklusif.",
    wrongExplanation: "Satu pembeli bisa membeli puluhan barang sekaligus di kasir (bercabang banyak), sehingga bukan korespondensi satu-satu.",
    clue: "Pilihlah hubungan yang eksklusif saling satu-lawan-satu.",
    remedialVariant: {
      question: "Manakah hubungan yang merupakan korespondensi satu-satu? (Pilih semua yang benar)",
      options: [
        "Pengantin pria dengan pengantin wanita pada pernikahan monogami",
        "Setiap pemain sepak bola di lapangan dengan satu nomor punggung unik di timnya",
        "Satu dokter dengan seluruh pasien di rumah sakit",
        "Satu perpustakaan dengan semua buku"
      ],
      correctMultiple: [
        "Pengantin pria dengan pengantin wanita pada pernikahan monogami",
        "Setiap pemain sepak bola di lapangan dengan satu nomor punggung unik di timnya"
      ],
      correctReason: "Tepat! Keduanya merupakan hubungan eksklusif satu-ke-satu.",
      wrongExplanation: "Dokter dan pasien tidak satu-ke-satu (dokter menangani banyak pasien)."
    }
  },
  {
    id: 25,
    chapterId: 5,
    type: "CARTESIAN",
    title: "📍 Plot Korespondensi Satu-Satu",
    question: "Plot titik-titik koordinat korespondensi satu-satu f(x) = 4 − x untuk domain x ∈ {1, 2, 3} pada bidang Cartesius!",
    minX: 0,
    maxX: 5,
    minY: 0,
    maxY: 5,
    targetPoints: [[1, 3], [2, 2], [3, 1]],
    correctReason: "Luar biasa! Titik (1, 3), (2, 2), dan (3, 1) terplot sempurna. Tidak ada nilai x atau y yang berulang.",
    wrongExplanation: "Saat x=1 ➔ y=3; saat x=2 ➔ y=2; saat x=3 ➔ y=1. Tandai titik (1, 3), (2, 2), dan (3, 1).",
    clue: "x=1➔y=3, x=2➔y=2, x=3➔y=1.",
    remedialVariant: {
      question: "Plot titik korespondensi satu-satu f(x) = x pada domain {1, 2, 3}! (titik (1, 1), (2, 2), (3, 3))",
      minX: 0,
      maxX: 5,
      minY: 0,
      maxY: 5,
      targetPoints: [[1, 1], [2, 2], [3, 3]],
      correctReason: "Tepat! Titik identitas (1, 1), (2, 2), dan (3, 3) terplot dengan tepat.",
      wrongExplanation: "Tandai koordinat diagonal (1, 1), (2, 2), dan (3, 3)."
    }
  },
  {
    id: 26,
    chapterId: 5,
    type: "TRUE_FALSE",
    title: "📌 Relasi Bukan Fungsi Tidak Bisa Korespondensi",
    question: "Pernyataan: Jika suatu relasi bukan fungsi, maka sudah pasti relasi tersebut tidak mungkin merupakan korespondensi satu-satu.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Sangat benar! Karena syarat pertama korespondensi satu-satu adalah harus merupakan FUNGSI terlebih dahulu. Jika syarat fungsi saja tidak lolos, otomatis gugur sebagai korespondensi satu-satu.",
    wrongExplanation: "Korespondensi satu-satu adalah jenis khusus dari fungsi. Jika bukan fungsi, pasti bukan korespondensi satu-satu.",
    clue: "Korespondensi satu-satu adalah fungsi khusus.",
    remedialVariant: {
      question: "Pernyataan: Semua korespondensi satu-satu sudah pasti merupakan fungsi yang sah.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Korespondensi satu-satu adalah fungsi yang memenuhi syarat tambahan timbal balik.",
      wrongExplanation: "Setiap korespondensi satu-satu memenuhi semua syarat fungsi."
    }
  },
  {
    id: 27,
    chapterId: 5,
    type: "MCQ",
    title: "🔢 Perhitungan Faktorial 6!",
    question: "Berapakah hasil dari 6! (6 faktorial) yang merupakan banyak korespondensi satu-satu untuk himpunan beranggotakan 6 elemen?",
    options: ["720", "120", "36", "480"],
    correct: "720",
    correctReason: "Mantap! 6! = 6 × 5! = 6 × 120 = 720 kemungkinan.",
    wrongExplanation: "6! = 6 × 5 × 4 × 3 × 2 × 1 = 720.",
    clue: "Kalikan 6 dengan 120.",
    remedialVariant: {
      question: "Berapakah nilai dari 6 × 5!?",
      options: ["720", "120", "600", "360"],
      correct: "720",
      correctReason: "Tepat! 6 × 120 = 720.",
      wrongExplanation: "6 × 120 = 720."
    }
  },
  {
    id: 28,
    chapterId: 5,
    type: "MATCHING",
    title: "🧩 Menjodohkan Relasi dengan Kategori",
    question: "Jodohkan contoh relasi di sebelah kiri dengan klasifikasi yang paling tepat di sebelah kanan!",
    pairs: [
      { left: "Negara ke Ibu Kota Resminya", right: "Korespondensi Satu-Satu" },
      { left: "Siswa ke Makanan Kesukaannya", right: "Relasi Biasa (Bukan Fungsi)" },
      { left: "Siswa ke Tanggal Lahirnya", right: "Fungsi Biasa (Bukan Satu-Satu)" }
    ],
    rightOptions: [
      "Korespondensi Satu-Satu",
      "Relasi Biasa (Bukan Fungsi)",
      "Fungsi Biasa (Bukan Satu-Satu)"
    ],
    correctReason: "Luar biasa! Pemahamanmu membedakan antara Relasi Bebas, Fungsi Biasa (banyak siswa bisa lahir di tanggal sama), dan Korespondensi Satu-Satu (negara & ibu kota) sangat tajam!",
    wrongExplanation: "Siswa ke tanggal lahir adalah fungsi biasa (setiap siswa punya 1 tanggal lahir, tetapi banyak siswa bisa lahir di tanggal sama). Siswa ke makanan adalah relasi bebas.",
    clue: "Negara-Ibu kota: 1-ke-1. Siswa-Makanan: cabang banyak. Siswa-Tanggal lahir: kumpul di tanggal sama.",
    remedialVariant: {
      question: "Jodohkan relasi dengan jenisnya!",
      pairs: [
        { left: "Setiap orang dengan NIK KTP", right: "Korespondensi Satu-Satu" },
        { left: "Orang dengan nomor sepatu", right: "Fungsi Biasa (Bukan Satu-Satu)" },
        { left: "Orang dengan hobi", right: "Relasi Biasa (Bukan Fungsi)" }
      ],
      rightOptions: ["Korespondensi Satu-Satu", "Fungsi Biasa (Bukan Satu-Satu)", "Relasi Biasa (Bukan Fungsi)"],
      correctReason: "Tepat! NIK eksklusif 1-ke-1, nomor sepatu bisa sama untuk banyak orang, hobi bisa banyak per orang.",
      wrongExplanation: "Klasifikasi hubungan tersebut sudah sesuai dengan sifat pemetaannya."
    }
  },
  {
    id: 29,
    chapterId: 5,
    type: "MCQ",
    title: "🔍 Ciri Khusus Diagram Panah Bijektif",
    question: "Pada diagram panah korespondensi satu-satu, apa yang terjadi jika kita membalik semua arah anak panahnya dari kanan ke kiri?",
    options: [
      "Diagram yang baru tetap merupakan fungsi yang sah (fungsi invers)",
      "Diagram yang baru menjadi bukan fungsi",
      "Diagram yang baru menjadi relasi kosong",
      "Anak panahnya akan saling bertabrakan dan rusak"
    ],
    correct: "Diagram yang baru tetap merupakan fungsi yang sah (fungsi invers)",
    correctReason: "Sangat tepat! Karena setiap titik kanan menerima tepat 1 panah dan tidak ada yang kosong, maka saat dibalik dari kanan ke kiri, setiap titik kanan memancarkan tepat 1 panah. Diagram baru tetap merupakan fungsi yang sah!",
    wrongExplanation: "Inilah keistimewaan pemetaan bijektif: selalu dapat dibalik arahnya tanpa merusak syarat fungsi.",
    clue: "Karena semua titik berpasangan tepat 1 timbal balik, arahnya bebas dibalik.",
    remedialVariant: {
      question: "Apakah pembalikan arah panah pada korespondensi satu-satu menghasilkan fungsi yang sah?",
      options: [
        "Ya, menghasilkan fungsi invers yang sah",
        "Tidak, pasti gagal menjadi fungsi",
        "Hanya jika anggotanya sedikit",
        "Tergantung jenis relasinya"
      ],
      correct: "Ya, menghasilkan fungsi invers yang sah",
      correctReason: "Tepat! Pembalikan arah panah korespondensi satu-satu menghasilkan fungsi invers.",
      wrongExplanation: "Korespondensi satu-satu selalu dapat dibalik menjadi fungsi invers."
    }
  },
  {
    id: 30,
    chapterId: 5,
    type: "MCQ",
    title: "🏆 Rangkuman Seluruh Materi Relasi & Fungsi",
    question: "Bagaimanakah urutan hierarki hubungan matematika yang benar dari yang paling umum ke yang paling spesifik?",
    options: [
      "Relasi (paling luas) ➔ Fungsi ➔ Korespondensi Satu-Satu (paling spesifik)",
      "Fungsi ➔ Relasi ➔ Korespondensi Satu-Satu",
      "Korespondensi Satu-Satu ➔ Fungsi ➔ Relasi",
      "Semua memiliki kedudukan yang sama tanpa tingkatan"
    ],
    correct: "Relasi (paling luas) ➔ Fungsi ➔ Korespondensi Satu-Satu (paling spesifik)",
    correctReason: "Sempurna! Selamat! Kamu telah menuntaskan seluruh latihan dari Chapter 1 hingga Chapter 5 dengan pemahaman matematika yang sangat utuh dan komprehensif! 🎉🦉🏆",
    wrongExplanation: "Relasi adalah himpunan aturan paling luas. Fungsi adalah relasi yang lebih khusus (disiplin domain). Korespondensi satu-satu adalah fungsi yang paling khusus (disiplin di kedua domain dan kodomain).",
    clue: "Relasi adalah payung terluas, di dalamnya ada Fungsi, dan di bagian terdalamnya ada Korespondensi Satu-Satu.",
    remedialVariant: {
      question: "Manakah pernyataan yang paling tepat mengenai hierarki Relasi, Fungsi, dan Korespondensi Satu-Satu?",
      options: [
        "Semua korespondensi satu-satu adalah fungsi, dan semua fungsi adalah relasi",
        "Semua relasi adalah korespondensi satu-satu",
        "Fungsi lebih luas daripada relasi",
        "Tidak ada keterkaitan antara ketiganya"
      ],
      correct: "Semua korespondensi satu-satu adalah fungsi, dan semua fungsi adalah relasi",
      correctReason: "Luar biasa! Pemahamanmu mengenai Relasi & Fungsi sudah mencapai tingkat penguasaan penuh!",
      wrongExplanation: "Hierarkinya: Korespondensi ⊂ Fungsi ⊂ Relasi."
    }
  }
];
