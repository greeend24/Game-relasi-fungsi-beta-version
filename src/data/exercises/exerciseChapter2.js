/**
 * LATIHAN CHAPTER 2: PENGERTIAN & UNSUR FUNGSI
 * 30 Soal Interaktif + Variasi Remedial Angka Berbeda
 * Format: MCQ, TRUE_FALSE, MCQ_COMPLEX, MATCHING, ARROWS, CARTESIAN
 */

export const EXERCISE_CHAPTER_2 = [
  {
    id: 1,
    chapterId: 2,
    type: "MCQ",
    title: "🎯 Syarat Utama Fungsi",
    question: "Manakah syarat mutlak agar suatu relasi dari himpunan A ke himpunan B dapat disebut sebagai FUNGSI?",
    options: [
      "Setiap anggota himpunan A berpasangan dengan tepat satu anggota himpunan B",
      "Setiap anggota himpunan B harus memiliki pasangan di A",
      "Anggota himpunan A boleh memiliki lebih dari satu pasangan di B",
      "Jumlah anggota himpunan A harus selalu sama dengan himpunan B"
    ],
    correct: "Setiap anggota himpunan A berpasangan dengan tepat satu anggota himpunan B",
    correctReason: "Tepat sekali! Syarat mutlak fungsi (pemetaan) adalah setiap anggota domain (A) wajib memiliki kawan, dan kawannya harus tepat satu (tidak boleh kosong dan tidak boleh bercabang).",
    wrongExplanation: "Fungsi hanya mensyaratkan aturan ketat pada himpunan asal (A). Himpunan B boleh memiliki anggota yang tidak berpasangan atau berpasangan lebih dari satu.",
    clue: "Fokus pada himpunan asal (A): wajib setia (tepat 1 pasangan) dan tidak boleh jomblo.",
    remedialVariant: {
      question: "Apa syarat utama bagi anggota daerah asal (domain) pada sebuah fungsi?",
      options: [
        "Harus memiliki tepat satu pasangan di daerah kawan",
        "Boleh bercabang memiliki dua pasangan",
        "Boleh tidak memilih pasangan sama sekali",
        "Harus memilih semua anggota daerah kawan"
      ],
      correct: "Harus memiliki tepat satu pasangan di daerah kawan",
      correctReason: "Benar! Setiap anggota domain harus memiliki tepat satu pasangan.",
      wrongExplanation: "Anggota domain tidak boleh bercabang dan tidak boleh kosong pada fungsi."
    }
  },
  {
    id: 2,
    chapterId: 2,
    type: "TRUE_FALSE",
    title: "📥 Definisi Domain",
    question: "Pernyataan: Dalam fungsi dari himpunan A ke himpunan B, seluruh anggota himpunan A disebut sebagai Daerah Asal (Domain).",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Himpunan A adalah himpunan mula-mula tempat anggota berasal, yang secara baku disebut sebagai Domain (Daerah Asal).",
    wrongExplanation: "Pernyataan ini bernilai Benar. Himpunan A adalah Domain, himpunan B adalah Kodomain.",
    clue: "Domain = Daerah Asal (himpunan pertama).",
    remedialVariant: {
      question: "Pernyataan: Kodomain adalah sebutan untuk seluruh anggota himpunan tujuan (himpunan kedua).",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Himpunan tujuan atau kawan disebut sebagai Kodomain.",
      wrongExplanation: "Kodomain adalah istilah baku untuk seluruh anggota daerah kawan (himpunan kedua)."
    }
  },
  {
    id: 3,
    chapterId: 2,
    type: "MCQ",
    title: "🔍 Menentukan Domain",
    question: "Diketahui fungsi f = {(1, a), (2, b), (3, b), (4, c)}. Daerah asal (domain) dari fungsi f adalah...",
    options: ["{1, 2, 3, 4}", "{a, b, c}", "{a, b, b, c}", "{1, 4}"],
    correct: "{1, 2, 3, 4}",
    correctReason: "Hebat! Domain adalah kumpulan elemen pertama dari setiap pasangan berurutan: {1, 2, 3, 4}.",
    wrongExplanation: "Elemen pertama (1, 2, 3, 4) adalah domain. Sedangkan {a, b, c} adalah daerah hasil (range).",
    clue: "Ambil semua angka di posisi depan tanda koma dalam setiap kurung.",
    remedialVariant: {
      question: "Diketahui fungsi g = {(2, p), (4, q), (6, r)}. Daerah asal (domain) dari g adalah...",
      options: ["{2, 4, 6}", "{p, q, r}", "{2, 6}", "{p, r}"],
      correct: "{2, 4, 6}",
      correctReason: "Tepat! Elemen depan {2, 4, 6} merupakan daerah asal (domain).",
      wrongExplanation: "Komponen pertama dari setiap pasangan berurutan membentuk himpunan domain."
    }
  },
  {
    id: 4,
    chapterId: 2,
    type: "MCQ",
    title: "🎯 Menentukan Range (Daerah Hasil)",
    question: "Diketahui himpunan B = {1, 2, 3, 4, 5} dan fungsi f = {(a, 2), (b, 4), (c, 2)}. Daerah hasil (range) dari f adalah...",
    options: ["{2, 4}", "{1, 2, 3, 4, 5}", "{a, b, c}", "{2, 4, 2}"],
    correct: "{2, 4}",
    correctReason: "Luar biasa! Range adalah anggota kodomain yang benar-benar terpilih sebagai pasangan: yaitu {2, 4}.",
    wrongExplanation: "Meskipun kodomainnya {1, 2, 3, 4, 5}, hanya angka 2 dan 4 yang mendapat pasangan. Jadi range-nya {2, 4}.",
    clue: "Range = anggota belakang yang terkena panah / pasangan. Tulis angka uniknya saja.",
    remedialVariant: {
      question: "Diketahui himpunan B = {10, 20, 30} dan fungsi f = {(x, 10), (y, 30), (z, 10)}. Range fungsi f adalah...",
      options: ["{10, 30}", "{10, 20, 30}", "{x, y, z}", "{20}"],
      correct: "{10, 30}",
      correctReason: "Benar! Hanya 10 dan 30 yang memiliki pasangan, sehingga range adalah {10, 30}.",
      wrongExplanation: "Elemen 20 tidak terpilih, sehingga 20 bukan anggota range."
    }
  },
  {
    id: 5,
    chapterId: 2,
    type: "TRUE_FALSE",
    title: "⚖️ Perbedaan Relasi dan Fungsi",
    question: "Pernyataan: Semua fungsi pasti merupakan relasi, tetapi tidak semua relasi merupakan fungsi.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Tepat sekali! Fungsi adalah relasi istimewa yang wajib memenuhi syarat ketat. Oleh karena itu, setiap fungsi adalah relasi, namun relasi umum belum tentu memenuhi syarat fungsi.",
    wrongExplanation: "Pernyataan ini adalah prinsip dasar penting dalam aljabar: fungsi adalah himpunan bagian dari relasi.",
    clue: "Relasi = kelompok besar aturan; Fungsi = relasi khusus yang disiplin.",
    remedialVariant: {
      question: "Pernyataan: Setiap relasi pasti otomatis memenuhi syarat sebagai fungsi.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Benar! Pernyataan tersebut salah karena jika relasi memiliki anggota asal yang bercabang atau kosong, ia bukan fungsi.",
      wrongExplanation: "Relasi yang anggotanya bercabang bukanlah fungsi."
    }
  },
  {
    id: 6,
    chapterId: 2,
    type: "MATCHING",
    title: "🔡 Menjodohkan Unsur Fungsi",
    question: "Jodohkan istilah unsur fungsi di sebelah kiri dengan definisinya yang tepat!",
    pairs: [
      { left: "Domain", right: "Seluruh anggota himpunan asal" },
      { left: "Kodomain", right: "Seluruh anggota himpunan kawan" },
      { left: "Range", right: "Anggota kawan yang memiliki pasangan" }
    ],
    rightOptions: [
      "Seluruh anggota himpunan asal",
      "Seluruh anggota himpunan kawan",
      "Anggota kawan yang memiliki pasangan"
    ],
    correctReason: "Sempurna! Kamu memahami perbedaan Domain (asal), Kodomain (kawan), dan Range (hasil yang terpasang) dengan sangat baik.",
    wrongExplanation: "Domain = asal, Kodomain = kawan/tujuan, Range = hasil nyata yang terpilih.",
    clue: "Ingat: Domain = Daerah Asal; Kodomain = Daerah Kawan; Range = Daerah Hasil.",
    remedialVariant: {
      question: "Jodohkan istilah unsur fungsi dengan sebutan bahasa Indonesianya!",
      pairs: [
        { left: "Domain", right: "Daerah Asal" },
        { left: "Kodomain", right: "Daerah Kawan" },
        { left: "Range", right: "Daerah Hasil" }
      ],
      rightOptions: ["Daerah Asal", "Daerah Kawan", "Daerah Hasil"],
      correctReason: "Tepat! Istilah Indonesianya adalah Daerah Asal, Daerah Kawan, dan Daerah Hasil.",
      wrongExplanation: "Domain = asal, kodomain = kawan, range = hasil."
    }
  },
  {
    id: 7,
    chapterId: 2,
    type: "MCQ",
    title: "❌ Ciri Bukan Fungsi (Cabang)",
    question: "Manakah di antara himpunan pasangan berurutan berikut yang BUKAN merupakan fungsi?",
    options: [
      "{(1, a), (1, b), (2, c)}",
      "{(1, a), (2, a), (3, a)}",
      "{(1, a), (2, b), (3, c)}",
      "{(1, b), (2, c), (3, d)}"
    ],
    correct: "{(1, a), (1, b), (2, c)}",
    correctReason: "Bagus! Pada pasangan {(1, a), (1, b), (2, c)}, anggota domain '1' bercabang (memiliki dua pasangan, yaitu 'a' dan 'b'). Ini melanggar syarat fungsi!",
    wrongExplanation: "Anggota domain tidak boleh muncul lebih dari sekali dengan pasangan berbeda. Pada opsi A, angka 1 muncul dua kali.",
    clue: "Cari opsi yang angka depannya ada yang kembar/berulang.",
    remedialVariant: {
      question: "Manakah himpunan pasangan berurutan yang BUKAN fungsi?",
      options: [
        "{(3, p), (3, q), (4, r)}",
        "{(3, p), (4, p), (5, p)}",
        "{(3, p), (4, q), (5, r)}",
        "{(1, 2), (2, 3), (3, 4)}"
      ],
      correct: "{(3, p), (3, q), (4, r)}",
      correctReason: "Tepat! Elemen domain 3 muncul dua kali (bercabang ke p dan q).",
      wrongExplanation: "Elemen asal 3 memiliki dua pasangan, melanggar syarat fungsi."
    }
  },
  {
    id: 8,
    chapterId: 2,
    type: "MCQ_COMPLEX",
    title: "☑️ Syarat Himpunan Kodomain",
    question: "Pada fungsi dari A ke B, manakah pernyataan yang BENAR mengenai himpunan B (kodomain)? (Pilih semua yang benar)",
    options: [
      "Boleh ada anggota himpunan B yang tidak memiliki pasangan",
      "Boleh ada anggota himpunan B yang menerima lebih dari satu panah (dipilih beberapa kali)",
      "Setiap anggota himpunan B wajib memiliki tepat satu pasangan di A",
      "Daerah hasil (range) merupakan bagian dari himpunan B"
    ],
    correctMultiple: [
      "Boleh ada anggota himpunan B yang tidak memiliki pasangan",
      "Boleh ada anggota himpunan B yang menerima lebih dari satu panah (dipilih beberapa kali)",
      "Daerah hasil (range) merupakan bagian dari himpunan B"
    ],
    correctReason: "Hebat! Kodomain (B) tidak memiliki kewajiban harus berpasangan tepat satu (kecuali pada korespondensi satu-satu). Anggota B boleh kosong atau bercabang, dan Range selalu berada di dalam Kodomain.",
    wrongExplanation: "Pilihan 'Setiap anggota himpunan B wajib memiliki tepat satu pasangan' salah, karena syarat itu hanya untuk korespondensi satu-satu, bukan fungsi biasa.",
    clue: "Aturan ketat fungsi hanya berlaku pada domain A. Kodomain B sangat fleksibel.",
    remedialVariant: {
      question: "Manakah sifat kodomain (daerah kawan) pada fungsi biasa? (Pilih semua yang benar)",
      options: [
        "Boleh ada elemennya yang tidak terpilih sama sekali",
        "Boleh ada elemennya yang menjadi pasangan bagi dua elemen domain sekaligus",
        "Wajib memiliki jumlah anggota yang sama dengan domain",
        "Menampung seluruh kemungkinan daerah hasil (range)"
      ],
      correctMultiple: [
        "Boleh ada elemennya yang tidak terpilih sama sekali",
        "Boleh ada elemennya yang menjadi pasangan bagi dua elemen domain sekaligus",
        "Menampung seluruh kemungkinan daerah hasil (range)"
      ],
      correctReason: "Tepat! Kodomain bebas: boleh jomblo, boleh jadi rebutan, dan menaungi range.",
      wrongExplanation: "Jumlah anggota kodomain tidak harus sama dengan domain pada fungsi biasa."
    }
  },
  {
    id: 9,
    chapterId: 2,
    type: "ARROWS",
    title: "🏹 Sambungkan Fungsi Kuadrat",
    question: "Hubungkan setiap elemen domain A = {1, 2, 3} ke kodomain B dengan fungsi f(x) = x²!",
    setA: [1, 2, 3],
    setB: [1, 4, 9],
    correctPairs: ["1->1", "2->4", "3->9"],
    correctReason: "Luar biasa! f(1) = 1² = 1, f(2) = 2² = 4, f(3) = 3² = 9. Setiap anggota domain terpasang tepat satu ke kodomain.",
    wrongExplanation: "1² = 1, 2² = 4, 3² = 9. Hubungkan 1 ke 1, 2 ke 4, dan 3 ke 9.",
    clue: "Kuadratkan masing-masing angka di himpunan A.",
    remedialVariant: {
      question: "Hubungkan setiap elemen domain A = {2, 3, 4} ke kodomain B dengan fungsi f(x) = x²!",
      setA: [2, 3, 4],
      setB: [4, 9, 16],
      correctPairs: ["2->4", "3->9", "4->16"],
      correctReason: "Tepat! 2² = 4, 3² = 9, 4² = 16.",
      wrongExplanation: "Pasangkan 2 ke 4, 3 ke 9, dan 4 ke 16."
    }
  },
  {
    id: 10,
    chapterId: 2,
    type: "MCQ",
    title: "🔢 Banyaknya Pemetaan (Fungsi)",
    question: "Diketahui n(A) = 2 dan n(B) = 3. Banyaknya fungsi (pemetaan) yang mungkin dari himpunan A ke himpunan B adalah...",
    options: ["9", "8", "6", "5"],
    correct: "9",
    correctReason: "Mantap! Rumus banyak pemetaan dari A ke B adalah n(B)^n(A). Di sini n(B) = 3 dan n(A) = 2, maka 3² = 9 kemungkinan.",
    wrongExplanation: "Rumus pemetaan dari A ke B adalah n(B)^n(A) (tujuan pangkat asal), bukan n(A)^n(B) atau perkalian 2 × 3.",
    clue: "Ingat rumus: banyak pemetaan dari A ke B = (anggota B)^(anggota A) = 3².",
    remedialVariant: {
      question: "Diketahui n(A) = 3 dan n(B) = 2. Banyaknya fungsi yang mungkin dari himpunan A ke himpunan B adalah...",
      options: ["8", "9", "6", "1"],
      correct: "8",
      correctReason: "Tepat! n(B)^n(A) = 2³ = 8 kemungkinan pemetaan.",
      wrongExplanation: "Rumusnya adalah n(B)^n(A) = 2³ = 8."
    }
  },
  {
    id: 11,
    chapterId: 2,
    type: "CARTESIAN",
    title: "📍 Plot Titik Fungsi f(x) = x + 1",
    question: "Plot titik-titik koordinat fungsi f(x) = x + 1 untuk domain x ∈ {1, 2, 3} pada bidang Cartesius!",
    minX: 0,
    maxX: 5,
    minY: 0,
    maxY: 6,
    targetPoints: [[1, 2], [2, 3], [3, 4]],
    correctReason: "Hebat! Titik (1, 2), (2, 3), dan (3, 4) berhasil diplot dengan sempurna.",
    wrongExplanation: "Saat x=1 ➔ y=2; x=2 ➔ y=3; x=3 ➔ y=4. Tandai titik (1, 2), (2, 3), dan (3, 4).",
    clue: "Tambahkan 1 pada setiap nilai x untuk menemukan koordinat y.",
    remedialVariant: {
      question: "Plot titik-titik fungsi f(x) = x + 2 untuk domain x ∈ {1, 2, 3} pada bidang Cartesius!",
      minX: 0,
      maxX: 5,
      minY: 0,
      maxY: 7,
      targetPoints: [[1, 3], [2, 4], [3, 5]],
      correctReason: "Bagus! Titik (1, 3), (2, 4), dan (3, 5) terplot tepat.",
      wrongExplanation: "Koordinat titiknya adalah (1, 3), (2, 4), dan (3, 5)."
    }
  },
  {
    id: 12,
    chapterId: 2,
    type: "TRUE_FALSE",
    title: "🏹 Garis Vertikal (Vertical Line Test)",
    question: "Pernyataan: Pada grafik koordinat Cartesius, jika ada garis vertikal yang memotong grafik di lebih dari satu titik, maka grafik tersebut BUKAN fungsi.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar sekali! Ini dikenal sebagai Uji Garis Vertikal (Vertical Line Test). Jika garis vertikal memotong di 2 titik atau lebih, artinya satu nilai x memiliki lebih dari satu nilai y (bercabang).",
    wrongExplanation: "Uji garis vertikal membuktikan bahwa satu nilai x tidak boleh memiliki dua nilai y. Jika terpotong lebih dari sekali, grafik tersebut bukan fungsi.",
    clue: "Satu nilai x hanya boleh memiliki satu nilai y (satu titik per garis tegak).",
    remedialVariant: {
      question: "Pernyataan: Uji garis vertikal digunakan untuk menentukan apakah suatu grafik Cartesius merupakan fungsi atau bukan.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Tepat! Uji garis vertikal adalah metode standar untuk memverifikasi fungsi pada grafik.",
      wrongExplanation: "Uji garis vertikal memang digunakan untuk menguji keabsahan fungsi."
    }
  },
  {
    id: 13,
    chapterId: 2,
    type: "MCQ",
    title: "📤 Menentukan Kodomain Lengkap",
    question: "Fungsi f memetakan A = {1, 2} ke B = {huruf vokal: a, i, u, e, o}. Jika f(1) = a dan f(2) = i, maka Kodomain dari fungsi tersebut adalah...",
    options: [
      "{a, i, u, e, o}",
      "{a, i}",
      "{1, 2}",
      "{u, e, o}"
    ],
    correct: "{a, i, u, e, o}",
    correctReason: "Tepat! Kodomain adalah SELURUH anggota himpunan tujuan (himpunan B), yaitu {a, i, u, e, o}. Jangan tertukar dengan range yang hanya {a, i}.",
    wrongExplanation: "{a, i} adalah range (daerah hasil). Kodomain adalah seluruh himpunan tujuan B tanpa kecuali.",
    clue: "Kodomain = himpunan B seutuhnya.",
    remedialVariant: {
      question: "Fungsi memetakan A = {1} ke B = {2, 4, 6, 8} dengan f(1) = 4. Kodomain fungsi tersebut adalah...",
      options: ["{2, 4, 6, 8}", "{4}", "{1}", "{2, 6, 8}"],
      correct: "{2, 4, 6, 8}",
      correctReason: "Benar! Seluruh himpunan B {2, 4, 6, 8} adalah kodomain.",
      wrongExplanation: "Kodomain adalah keseluruhan himpunan kawan B, bukan hanya elemen yang terpilih."
    }
  },
  {
    id: 14,
    chapterId: 2,
    type: "MCQ",
    title: "🎯 Hubungan Range dan Kodomain",
    question: "Manakah pernyataan matematis yang paling tepat mengenai hubungan antara Range (Rf) dan Kodomain (Kf)?",
    options: [
      "Range selalu merupakan himpunan bagian dari Kodomain (Rf ⊆ Kf)",
      "Range selalu lebih banyak anggotanya daripada Kodomain",
      "Range dan Kodomain tidak memiliki hubungan sama sekali",
      "Kodomain selalu merupakan himpunan bagian dari Range"
    ],
    correct: "Range selalu merupakan himpunan bagian dari Kodomain (Rf ⊆ Kf)",
    correctReason: "Sangat tepat! Karena daerah hasil (range) diambil dari anggota daerah kawan (kodomain), maka Range pasti himpunan bagian atau sama dengan Kodomain.",
    wrongExplanation: "Range tidak mungkin lebih banyak dari kodomain karena range berasal dari dalam kodomain itu sendiri.",
    clue: "Range berada di dalam lingkungan kodomain (Rf himpunan bagian Kf).",
    remedialVariant: {
      question: "Apakah mungkin jumlah anggota Range melebihi jumlah anggota Kodomain?",
      options: [
        "Tidak mungkin, Range selalu bagian dari Kodomain",
        "Mungkin, jika fungsinya linear",
        "Pasti selalu lebih banyak",
        "Tergantung nilai domainnya"
      ],
      correct: "Tidak mungkin, Range selalu bagian dari Kodomain",
      correctReason: "Tepat! Range tidak pernah bisa melebihi ukuran kodomain.",
      wrongExplanation: "Range adalah elemen kodomain yang terpilih, jadi jumlahnya maksimal sama dengan kodomain."
    }
  },
  {
    id: 15,
    chapterId: 2,
    type: "MATCHING",
    title: "🧩 Menjodohkan Nilai Range",
    question: "Diberikan himpunan pasangan berurutan fungsi. Jodohkan fungsinya di kiri dengan himpunan Range-nya di kanan!",
    pairs: [
      { left: "f = {(1, 2), (2, 4), (3, 6)}", right: "{2, 4, 6}" },
      { left: "g = {(1, 5), (2, 5), (3, 5)}", right: "{5}" },
      { left: "h = {(1, 3), (2, 7), (3, 3)}", right: "{3, 7}" }
    ],
    rightOptions: ["{2, 4, 6}", "{5}", "{3, 7}", "{1, 2, 3}"],
    correctReason: "Bagus sekali! Kamu dapat menyaring elemen hasil (range) unik dari setiap fungsi dengan tepat.",
    wrongExplanation: "Ambil semua nilai di posisi koordinat kedua (y) dan hilangkan pengulangan angka.",
    clue: "Range fungsi g hanya angka 5, range fungsi h adalah {3, 7}.",
    remedialVariant: {
      question: "Jodohkan fungsi dengan daerah hasilnya (range)!",
      pairs: [
        { left: "f = {(a, 1), (b, 2)}", right: "{1, 2}" },
        { left: "g = {(a, 9), (b, 9)}", right: "{9}" },
        { left: "h = {(a, 4), (b, 8)}", right: "{4, 8}" }
      ],
      rightOptions: ["{1, 2}", "{9}", "{4, 8}", "{a, b}"],
      correctReason: "Tepat! Daerah hasil adalah himpunan elemen kedua unik.",
      wrongExplanation: "Ambil angka-angka di posisi belakang setiap kurung."
    }
  },
  {
    id: 16,
    chapterId: 2,
    type: "TRUE_FALSE",
    title: "📌 Fungsi Konstan",
    question: "Pernyataan: Fungsi f = {(1, 4), (2, 4), (3, 4)} tetap merupakan fungsi yang sah meskipun semua anggota domain memilih pasangan yang sama.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Ini disebut fungsi konstan. Setiap anggota domain (1, 2, 3) memiliki tepat satu pasangan (yaitu 4). Yang dilarang adalah domain bercabang, bukan kodomain yang dipilih berulang.",
    wrongExplanation: "Fungsi memperbolehkan banyak anggota domain memanah ke satu anggota kodomain yang sama.",
    clue: "Cek domainnya: 1 punya 1 pasangan, 2 punya 1 pasangan, 3 punya 1 pasangan. Semua sah!",
    remedialVariant: {
      question: "Pernyataan: Suatu relasi bukan fungsi jika semua anak panah dari domain menuju ke satu angka yang sama di kodomain.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Pernyataan tersebut salah karena kondisi tersebut tetap merupakan fungsi yang sah (fungsi konstan).",
      wrongExplanation: "Anak panah boleh berkumpul ke satu titik di kodomain; yang tidak boleh adalah satu titik domain memancarkan banyak panah."
    }
  },
  {
    id: 17,
    chapterId: 2,
    type: "MCQ",
    title: "🔍 Menentukan Fungsi yang Sah",
    question: "Dari diagram pasangan berikut, manakah yang merupakan FUNGSI?",
    options: [
      "{(1, x), (2, y), (3, z)}",
      "{(1, x), (1, y), (1, z)}",
      "{(1, x), (2, y), (2, z)}",
      "{(1, x), (3, y), (3, z)}"
    ],
    correct: "{(1, x), (2, y), (3, z)}",
    correctReason: "Benar! Setiap angka domain (1, 2, 3) muncul tepat satu kali tanpa ada percabangan.",
    wrongExplanation: "Pada opsi lain, ada angka domain yang muncul berulang (bercabang), sehingga bukan fungsi.",
    clue: "Pastikan angka depan tidak ada yang kembar sama sekali.",
    remedialVariant: {
      question: "Manakah di bawah ini yang merupakan fungsi yang sah?",
      options: [
        "{(4, a), (5, b), (6, c)}",
        "{(4, a), (4, b), (5, c)}",
        "{(4, a), (5, b), (5, c)}",
        "{(6, a), (6, b), (6, c)}"
      ],
      correct: "{(4, a), (5, b), (6, c)}",
      correctReason: "Tepat! Domain 4, 5, 6 masing-masing hanya memiliki tepat satu kawan.",
      wrongExplanation: "Opsi lainnya memiliki domain berulang (bercabang)."
    }
  },
  {
    id: 18,
    chapterId: 2,
    type: "MCQ_COMPLEX",
    title: "☑️ Ciri Diagram Panah Fungsi",
    question: "Manakah ciri-ciri visual diagram panah yang menunjukkan suatu FUNGSI? (Pilih semua yang benar)",
    options: [
      "Setiap titik di kurva kiri (domain) memancarkan TEPAT SATU anak panah",
      "Tidak ada titik di kurva kiri yang tidak memancarkan anak panah",
      "Titik di kurva kanan (kodomain) wajib menerima tepat satu anak panah",
      "Titik di kurva kanan boleh menerima lebih dari satu anak panah"
    ],
    correctMultiple: [
      "Setiap titik di kurva kiri (domain) memancarkan TEPAT SATU anak panah",
      "Tidak ada titik di kurva kiri yang tidak memancarkan anak panah",
      "Titik di kurva kanan boleh menerima lebih dari satu anak panah"
    ],
    correctReason: "Luar biasa! Pada diagram panah fungsi, fokus utama adalah kurva kiri: tidak boleh kosong dan tidak boleh bercabang. Kurva kanan bebas menerima 0, 1, atau lebih panah.",
    wrongExplanation: "Titik di kurva kanan tidak wajib menerima tepat satu panah (itu hanya syarat korespondensi satu-satu).",
    clue: "Perhatikan aturan untuk kurva kiri: semua memancarkan tepat 1 panah.",
    remedialVariant: {
      question: "Kondisi apa di kurva kiri (domain) yang membuat diagram panah GAGAL menjadi fungsi? (Pilih semua yang benar)",
      options: [
        "Ada titik di kiri yang tidak memancarkan anak panah",
        "Ada titik di kiri yang memancarkan dua anak panah",
        "Ada titik di kanan yang tidak menerima panah",
        "Ada titik di kanan yang menerima dua panah"
      ],
      correctMultiple: [
        "Ada titik di kiri yang tidak memancarkan anak panah",
        "Ada titik di kiri yang memancarkan dua anak panah"
      ],
      correctReason: "Tepat! Domain kosong atau domain bercabang adalah penyebab gagal menjadi fungsi.",
      wrongExplanation: "Kondisi di kurva kanan tidak menggagalkan status fungsi biasa."
    }
  },
  {
    id: 19,
    chapterId: 2,
    type: "ARROWS",
    title: "🏹 Sambungkan Fungsi 'Dua Kali Dari'",
    question: "Hubungkan setiap elemen domain A = {1, 2, 3} ke bayangannya pada B dengan rumus fungsi f(x) = 2x!",
    setA: [1, 2, 3],
    setB: [2, 4, 6],
    correctPairs: ["1->2", "2->4", "3->6"],
    correctReason: "Hebat! 2(1) = 2, 2(2) = 4, 2(3) = 6. Diagram panah fungsi terpasang presisi!",
    wrongExplanation: "f(1) = 2, f(2) = 4, f(3) = 6. Pasangkan 1➔2, 2➔4, dan 3➔6.",
    clue: "Kalikan nilai di A dengan 2.",
    remedialVariant: {
      question: "Hubungkan fungsi f(x) = 3x dari A = {1, 2, 3} ke B = {3, 6, 9}!",
      setA: [1, 2, 3],
      setB: [3, 6, 9],
      correctPairs: ["1->3", "2->6", "3->9"],
      correctReason: "Tepat! 3(1) = 3, 3(2) = 6, 3(3) = 9.",
      wrongExplanation: "Kalikan elemen A dengan 3 untuk menemukan pasangan di B."
    }
  },
  {
    id: 20,
    chapterId: 2,
    type: "MCQ",
    title: "🔢 Banyak Pemetaan dari Himpunan Sama",
    question: "Jika himpunan P = {a, b} dan himpunan Q = {1, 2}, banyak pemetaan yang mungkin dari P ke Q adalah...",
    options: ["4", "2", "8", "16"],
    correct: "4",
    correctReason: "Tepat! n(Q)^n(P) = 2² = 4 pemetaan yang mungkin terbentuk.",
    wrongExplanation: "Rumus pemetaan P ke Q adalah n(Q)^n(P). Karena n(P)=2 dan n(Q)=2, maka 2² = 4.",
    clue: "n(Q) pangkat n(P) = 2².",
    remedialVariant: {
      question: "Jika n(P) = 1 dan n(Q) = 4, berapa banyak fungsi dari P ke Q?",
      options: ["4", "1", "16", "8"],
      correct: "4",
      correctReason: "Tepat! n(Q)^n(P) = 4¹ = 4 pemetaan.",
      wrongExplanation: "4 pangkat 1 = 4."
    }
  },
  {
    id: 21,
    chapterId: 2,
    type: "TRUE_FALSE",
    title: "📌 Domain Kosong",
    question: "Pernyataan: Jika ada satu saja anggota himpunan domain yang tidak mempunyai pasangan di kodomain, maka relasi tersebut tetap dapat disebut fungsi.",
    options: ["Benar", "Salah"],
    correct: "Salah",
    correctReason: "Tepat! Pernyataan tersebut Salah. Syarat mutlak fungsi adalah SELURUH anggota domain wajib memiliki pasangan tanpa terkecuali.",
    wrongExplanation: "Domain tidak boleh kosong. Jika ada yang tidak berpasangan, relasi tersebut gugur sebagai fungsi.",
    clue: "Ingat prinsip: anggota domain tidak boleh jomblo!",
    remedialVariant: {
      question: "Pernyataan: Semua anggota himpunan daerah asal (domain) wajib memiliki pasangan agar menjadi fungsi.",
      options: ["Benar", "Salah"],
      correct: "Benar",
      correctReason: "Benar! Tidak boleh ada satu pun anggota domain yang tertinggal tanpa pasangan.",
      wrongExplanation: "Seluruh anggota daerah asal wajib berpasangan tepat satu kali."
    }
  },
  {
    id: 22,
    chapterId: 2,
    type: "MCQ",
    title: "🎯 Menentukan Range dari Rumus",
    question: "Diketahui domain A = {0, 1, 2} dan rumus fungsi f(x) = 2x + 3. Daerah hasil (range) fungsi f adalah...",
    options: ["{3, 5, 7}", "{0, 1, 2}", "{2, 3}", "{3, 4, 5}"],
    correct: "{3, 5, 7}",
    correctReason: "Luar biasa! Substitusi domain ke rumus: f(0)=2(0)+3=3; f(1)=2(1)+3=5; f(2)=2(2)+3=7. Jadi range = {3, 5, 7}.",
    wrongExplanation: "Hitung satu per satu: 2(0)+3 = 3; 2(1)+3 = 5; 2(2)+3 = 7. Himpunan hasilnya {3, 5, 7}.",
    clue: "Masukkan x = 0, x = 1, dan x = 2 ke dalam 2x + 3.",
    remedialVariant: {
      question: "Diketahui domain A = {1, 2, 3} dan rumus f(x) = 3x − 1. Daerah hasil (range)-nya adalah...",
      options: ["{2, 5, 8}", "{1, 2, 3}", "{3, 6, 9}", "{2, 4, 6}"],
      correct: "{2, 5, 8}",
      correctReason: "Tepat! f(1)=2, f(2)=5, f(3)=8 ➔ {2, 5, 8}.",
      wrongExplanation: "3(1)−1 = 2; 3(2)−1 = 5; 3(3)−1 = 8."
    }
  },
  {
    id: 23,
    chapterId: 2,
    type: "MCQ",
    title: "🔍 Contoh Fungsi di Sekolah",
    question: "Manakah relasi di lingkungan sekolah yang PASTI merupakan FUNGSI?",
    options: [
      "Relasi antara setiap siswa dengan Nomor Induk Siswa Nasional (NISN)-nya",
      "Relasi antara siswa dengan kegiatan ekstrakurikuler yang diikutinya",
      "Relasi antara siswa dengan makanan favorit di kantin",
      "Relasi antara guru dengan siswa yang diajarnya"
    ],
    correct: "Relasi antara setiap siswa dengan Nomor Induk Siswa Nasional (NISN)-nya",
    correctReason: "Sangat tepat! Setiap siswa pasti memiliki NISN dan hanya memiliki tepat satu NISN (tidak mungkin dua NISN). Sedangkan ekskul, makanan, dan guru bisa bercabang.",
    wrongExplanation: "Siswa bisa menyukai banyak makanan atau ikut lebih dari satu ekskul (bercabang), sehingga bukan fungsi. NISN pasti tunggal.",
    clue: "Cari relasi yang mengharuskan setiap orang memiliki tepat satu identitas unik.",
    remedialVariant: {
      question: "Manakah hubungan berikut yang pasti merupakan fungsi?",
      options: [
        "Setiap warga negara Indonesia dengan Nomor Induk Kependudukan (NIK)-nya",
        "Orang dengan warna baju yang dimilikinya",
        "Siswa dengan buku pelajaran di tasnya",
        "Orang dengan nomor telepon pribadinya"
      ],
      correct: "Setiap warga negara Indonesia dengan Nomor Induk Kependudukan (NIK)-nya",
      correctReason: "Tepat! Setiap warga negara hanya memiliki tepat satu NIK resmi.",
      wrongExplanation: "Satu orang bisa memiliki banyak baju, buku, atau nomor HP (bercabang)."
    }
  },
  {
    id: 24,
    chapterId: 2,
    type: "MATCHING",
    title: "🔗 Menjodohkan Pemetaan Kuadrat",
    question: "Diberikan domain {-2, -1, 0, 1, 2} dan rumus f(x) = x². Jodohkan nilai x di kiri dengan bayangan f(x)-nya di kanan!",
    pairs: [
      { left: "-2", right: "4" },
      { left: "-1", right: "1" },
      { left: "0", right: "0" }
    ],
    rightOptions: ["4", "1", "0", "-4"],
    correctReason: "Mantap! (-2)² = 4, (-1)² = 1, dan 0² = 0. Bilangan negatif jika dikuadratkan hasilnya selalu positif.",
    wrongExplanation: "(-2)² = (-2) × (-2) = +4. Ingat bahwa bilangan negatif berpangkat genap menghasilkan nilai positif.",
    clue: "Perkalian tanda negatif dengan negatif menghasilkan nilai positif.",
    remedialVariant: {
      question: "Jodohkan nilai x dengan hasil fungsi f(x) = x²!",
      pairs: [
        { left: "-3", right: "9" },
        { left: "2", right: "4" },
        { left: "-1", right: "1" }
      ],
      rightOptions: ["9", "4", "1", "-9"],
      correctReason: "Tepat! (-3)² = 9, 2² = 4, (-1)² = 1.",
      wrongExplanation: "Pangkat dua selalu menghasilkan bilangan tak negatif."
    }
  },
  {
    id: 25,
    chapterId: 2,
    type: "TRUE_FALSE",
    title: "📊 Fungsi Berupa Garis Lurus",
    question: "Pernyataan: Fungsi linear f(x) = ax + b selalu memiliki grafik yang berupa garis lurus pada bidang Cartesius.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Benar! Karena variabel x berpangkat satu (derajat satu / linear), grafiknya selalu berupa garis lurus tanpa lengkungan.",
    wrongExplanation: "Karakteristik utama fungsi linear adalah grafiknya selalu berupa garis lurus.",
    clue: "Linear berasal dari kata 'line' yang berarti garis lurus.",
    remedialVariant: {
      question: "Pernyataan: Grafik dari f(x) = 3x − 2 pada bidang Cartesius berbentuk kurva melengkung.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Pernyataan tersebut salah karena f(x) = 3x − 2 adalah fungsi linear yang grafiknya pasti lurus.",
      wrongExplanation: "Fungsi berpangkat 1 selalu menghasilkan garis lurus, bukan kurva melengkung."
    }
  },
  {
    id: 26,
    chapterId: 2,
    type: "MCQ",
    title: "🔢 Banyak Pemetaan Dua Arah",
    question: "Jika n(A) = 3 dan n(B) = 2, berapakah selisih antara banyak pemetaan dari A ke B dengan banyak pemetaan dari B ke A?",
    options: ["1", "2", "3", "0"],
    correct: "1",
    correctReason: "Luar biasa! Pemetaan A ke B: 2³ = 8. Pemetaan B ke A: 3² = 9. Selisihnya adalah 9 − 8 = 1.",
    wrongExplanation: "A ke B = 2³ = 8. B ke A = 3² = 9. Selisih antara 9 dan 8 adalah 1.",
    clue: "Hitung 2³ dan 3², lalu kurangkan hasilnya.",
    remedialVariant: {
      question: "Jika n(A) = 4 dan n(B) = 2, berapa selisih antara banyak pemetaan A ke B dengan B ke A?",
      options: ["0", "2", "4", "8"],
      correct: "0",
      correctReason: "Tepat! A ke B = 2⁴ = 16. B ke A = 4² = 16. Selisihnya 16 − 16 = 0.",
      wrongExplanation: "2⁴ = 16 dan 4² = 16, keduanya bernilai sama sehingga selisihnya 0."
    }
  },
  {
    id: 27,
    chapterId: 2,
    type: "MCQ_COMPLEX",
    title: "☑️ Ciri Himpunan Pasangan Fungsi",
    question: "Manakah himpunan pasangan berurutan yang memenuhi kriteria SEBAGAI FUNGSI? (Pilih semua yang benar)",
    options: [
      "{(1, 2), (2, 3), (3, 4)}",
      "{(a, 1), (b, 1), (c, 1)}",
      "{(p, 2), (p, 4), (q, 6)}",
      "{(1, 5), (2, 5), (3, 7)}"
    ],
    correctMultiple: [
      "{(1, 2), (2, 3), (3, 4)}",
      "{(a, 1), (b, 1), (c, 1)}",
      "{(1, 5), (2, 5), (3, 7)}"
    ],
    correctReason: "Hebat! Pada ketiga himpunan tersebut, elemen depan tidak ada yang berulang (tidak ada cabang). Hanya pada opsi ketiga elemen 'p' bercabang ke 2 dan 4.",
    wrongExplanation: "Pasangan {(p, 2), (p, 4), (q, 6)} bukan fungsi karena elemen 'p' memiliki dua pasangan.",
    clue: "Periksa elemen pertama pada setiap kurung: pastikan semuanya unik.",
    remedialVariant: {
      question: "Manakah himpunan pasangan yang merupakan fungsi yang sah? (Pilih semua yang benar)",
      options: [
        "{(2, 4), (3, 6), (4, 8)}",
        "{(x, 1), (y, 2), (z, 3)}",
        "{(1, 2), (1, 3), (1, 4)}",
        "{(5, a), (6, a)}"
      ],
      correctMultiple: [
        "{(2, 4), (3, 6), (4, 8)}",
        "{(x, 1), (y, 2), (z, 3)}",
        "{(5, a), (6, a)}"
      ],
      correctReason: "Tepat! Elemen depan tidak ada yang bercabang.",
      wrongExplanation: "{(1, 2), (1, 3), (1, 4)} bukan fungsi karena angka 1 bercabang 3 kali."
    }
  },
  {
    id: 28,
    chapterId: 2,
    type: "MCQ",
    title: "📥 Domain Terbesar",
    question: "Diberikan f = {(−2, 4), (−1, 1), (0, 0), (1, 1), (2, 4)}. Banyaknya anggota domain pada fungsi f adalah...",
    options: ["5 anggota", "3 anggota", "4 anggota", "2 anggota"],
    correct: "5 anggota",
    correctReason: "Benar! Anggota domainnya adalah {−2, −1, 0, 1, 2}, sehingga total ada 5 anggota domain.",
    wrongExplanation: "Jangan terkecoh dengan range {0, 1, 4} yang berjumlah 3. Soal menanyakan banyaknya anggota domain, yaitu 5.",
    clue: "Hitung banyaknya kurung pasangan: ada 5 nilai x yang berbeda.",
    remedialVariant: {
      question: "Diberikan f = {(1, 9), (2, 9), (3, 9), (4, 9)}. Berapa banyak anggota domainnya?",
      options: ["4 anggota", "1 anggota", "9 anggota", "2 anggota"],
      correct: "4 anggota",
      correctReason: "Tepat! Domainnya {1, 2, 3, 4} yang berjumlah 4 anggota.",
      wrongExplanation: "Elemen depannya ada 4 buah (1, 2, 3, 4)."
    }
  },
  {
    id: 29,
    chapterId: 2,
    type: "TRUE_FALSE",
    title: "🎯 Range Tunggal",
    question: "Pernyataan: Pada fungsi konstan f(x) = 7 dengan domain himpunan bilangan bulat, daerah hasil (range)-nya hanya terdiri dari satu anggota, yaitu {7}.",
    options: ["Benar", "Salah"],
    correct: "Benar",
    correctReason: "Sangat tepat! Karena berapapun nilai x yang dimasukkan, angka hasilnya selalu bernilai 7, sehingga range = {7}.",
    wrongExplanation: "Fungsi konstan selalu menghasilkan satu nilai tunggal yang tetap pada range-nya.",
    clue: "Semua nilai x menghasilkan angka hasil yang sama persis: 7.",
    remedialVariant: {
      question: "Pernyataan: Pada fungsi konstan f(x) = 5, daerah hasilnya adalah himpunan tak terhingga.",
      options: ["Benar", "Salah"],
      correct: "Salah",
      correctReason: "Tepat! Daerah hasilnya hanya terdiri dari 1 elemen saja, yaitu {5}.",
      wrongExplanation: "Range fungsi konstan hanya memiliki satu anggota tunggal."
    }
  },
  {
    id: 30,
    chapterId: 2,
    type: "MCQ",
    title: "🏆 Rangkuman Konsep Fungsi",
    question: "Manakah analogi kehidupan nyata yang paling tepat menggambarkan prinsip kerja FUNGSI dalam matematika?",
    options: [
      "Mesin cetak tiket bioskop: satu kode booking unik hanya mencetak tepat satu tiket yang sah",
      "Pohon rindang yang memiliki banyak cabang di setiap dahannya",
      "Pintu gerbang yang boleh dimasuki atau dilewati oleh siapa saja tanpa tiket",
      "Lampu lalu lintas yang menyala merah, kuning, dan hijau secara bersamaan"
    ],
    correct: "Mesin cetak tiket bioskop: satu kode booking unik hanya mencetak tepat satu tiket yang sah",
    correctReason: "Luar biasa, sempurna! Kamu telah menyelesaikan seluruh latihan Chapter 2 dengan pemahaman konsep fungsi yang sangat matang dan utuh!",
    wrongExplanation: "Mesin fungsi memproses satu angka x tertentu dan menghasilkan tepat satu angka hasil yang pasti (tidak bercabang).",
    clue: "Pilihlah analogi yang menjamin satu bahan/angka asal menghasilkan tepat satu hasil pasti.",
    remedialVariant: {
      question: "Analogi manakah yang tepat untuk mesin fungsi?",
      options: [
        "Mesin jus buah: memasukkan jeruk mengeluarkan jus jeruk",
        "Dadu acak yang menghasilkan angka berbeda-beda untuk lemparan yang sama",
        "Jalanan bercabang tanpa petunjuk arah",
        "Papan tulis kosong"
      ],
      correct: "Mesin jus buah: memasukkan jeruk mengeluarkan jus jeruk",
      correctReason: "Hebat! Mesin fungsi memproses bahan asal menjadi hasil olahan tertentu secara pasti!",
      wrongExplanation: "Fungsi menghasilkan angka hasil yang pasti dari angka asalnya."
    }
  }
];
