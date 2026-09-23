/**
 * LATIHAN CHAPTER 1: PENGERTIAN & CARA MENYATAKAN RELASI
 * 10 Soal Interaktif Taktil + 10 Remedial Variant (100% Interaktif)
 * Menggunakan konteks kehidupan sehari-hari (bervariasi: literasi, cita-cita, transportasi, teknologi, piket, lab IPA, geografi)
 * Tanpa rumus / fungsi aljabar matematika yang belum dipelajari siswa.
 */

export const EXERCISE_CHAPTER_1 = [
  {
    id: 1,
    chapterId: 1,
    type: "MCQ",
    title: "🔍 Definisi Relasi",
    question: "Dalam kehidupan sehari-hari di sekolah, hubungan seperti 'Ali meminjam Buku Ensiklopedia di perpustakaan' dan 'Siti bertugas piket hari Senin' merupakan contoh relasi. Dalam matematika, apa yang dimaksud dengan relasi antara himpunan A dan himpunan B?",
    options: [
      "Operasi penjumlahan seluruh anggota himpunan A dan B",
      "Aturan yang memasangkan anggota himpunan A dengan anggota himpunan B",
      "Himpunan yang anggotanya harus selalu berjumlah sama",
      "Aturan yang mengharuskan semua anggota B memiliki pasangan"
    ],
    correct: "Aturan yang memasangkan anggota himpunan A dengan anggota himpunan B",
    correctReason: "Tepat sekali! Relasi adalah aturan atau hubungan yang mengaitkan anggota himpunan pertama (daerah asal) dengan anggota himpunan kedua (daerah kawan). Hubungan relasi bersifat fleksibel.",
    wrongExplanation: "Relasi adalah aturan pemasangan antar anggota dua himpunan (seperti hubungan peminjaman buku perpustakaan atau jadwal piket), bukan operasi hitung matematika.",
    explanation: "Tepat sekali! Relasi adalah aturan yang mengaitkan atau memasangkan anggota suatu himpunan (daerah asal) dengan anggota himpunan lainnya.",
    clue: "Ingat kata kunci: relasi adalah aturan yang memasangkan anggota himpunan A ke himpunan B.",
    distractorAnalysis: {
      "Operasi penjumlahan seluruh anggota himpunan A dan B": "Penjumlahan adalah operasi aritmatika, bukan aturan pemasangan antar dua himpunan.",
      "Himpunan yang anggotanya harus selalu berjumlah sama": "Relasi tidak mengharuskan jumlah anggota kedua himpunan sama.",
      "Aturan yang mengharuskan semua anggota B memiliki pasangan": "Dalam relasi, anggota tidak harus semua berpasangan (bersifat fleksibel)."
    },
    remedialVariant: {
      type: "MCQ",
      title: "🔍 Remedial: Definisi Relasi",
      question: "Ibu guru mencatat data kegiatan siswa di sekolah, seperti 'Rian bertugas piket hari Senin'. Hubungan tersebut merupakan relasi. Manakah pernyataan yang paling tepat mengenai pengertian relasi?",
      options: [
        "Penggabungan dua himpunan menjadi satu himpunan baru",
        "Pengurangan jumlah anggota himpunan asal dengan anggota himpunan kawan",
        "Hubungan atau aturan yang menghubungkan anggota himpunan pertama ke himpunan kedua",
        "Himpunan pasangan yang anggotanya tidak boleh berpasangan"
      ],
      correct: "Hubungan atau aturan yang menghubungkan anggota himpunan pertama ke himpunan kedua",
      correctReason: "Benar! Relasi merupakan aturan atau hubungan yang mengaitkan anggota himpunan pertama ke himpunan kedua.",
      wrongExplanation: "Relasi adalah aturan yang mengaitkan atau memasangkan anggota himpunan asal ke himpunan kawan.",
      explanation: "Benar! Relasi merupakan aturan atau hubungan yang mengaitkan anggota himpunan pertama ke himpunan kedua.",
      clue: "Pikirkan kata kunci relasi: aturan yang memasangkan atau menghubungkan anggota himpunan pertama ke himpunan kedua."
    }
  },
  {
    id: 2,
    chapterId: 1,
    type: "HPB_BUILDER",
    title: "🧩 Susun Pasangan Berurutan: 'Cita-Cita Masa Depan'",
    question: "Tiga siswa merencanakan cita-cita masa depan mereka: Andi ingin menjadi Dokter, Budi ingin menjadi Arsitek, dan Citra ingin menjadi Programmer. Susunlah himpunan pasangan berurutan untuk relasi 'cita-cita masa depan' tersebut!",
    subInstruction: "Pindahkan nama siswa atau profesi ke dalam kurung pasangan berurutan!",
    setName: "R",
    pairs: [
      { idX: "p1_x", idY: "p1_y", ansX: "Andi", ansY: "Dokter", fixedX: "Andi", fixedY: null },
      { idX: "p2_x", idY: "p2_y", ansX: "Budi", ansY: "Arsitek", fixedX: null, fixedY: "Arsitek" },
      { idX: "p3_x", idY: "p3_y", ansX: "Citra", ansY: "Programmer", fixedX: null, fixedY: null }
    ],
    tokens: ["Programmer", "Dokter", "Doni", "Citra", "Budi", "Pilot"],
    correctReason: "Luar biasa tepat! Himpunan pasangan berurutan yang terbentuk adalah R = {(Andi, Dokter), (Budi, Arsitek), (Citra, Programmer)}. Setiap nama siswa dipasangkan secara tepat dengan profesi cita-citanya.",
    wrongExplanation: "Pasangan berurutan ditulis dalam bentuk (Nama Siswa, Cita-Cita):\n• Andi pasangannya Dokter ➔ (Andi, Dokter)\n• Budi pasangannya Arsitek ➔ (Budi, Arsitek)\n• Citra pasangannya Programmer ➔ (Citra, Programmer)",
    clue: "Andi ingin jadi Dokter, Budi ingin jadi Arsitek, dan Citra ingin jadi Programmer.",
    remedialVariant: {
      type: "HPB_BUILDER",
      title: "🧩 Remedial: Pasangan Berurutan 'Peralatan Praktikum'",
      question: "Dua siswa membawa perlengkapan praktikum: Dedi membawa Mikroskop dan Erna membawa Tabung Reaksi. Lengkapi pasangan berurutan berikut!",
      subInstruction: "Pindahkan kartu ke dalam kurung pasangan berurutan!",
      setName: "R",
      pairs: [
        { idX: "rp1_x", idY: "rp1_y", ansX: "Dedi", ansY: "Mikroskop", fixedX: "Dedi", fixedY: null },
        { idX: "rp2_x", idY: "rp2_y", ansX: "Erna", ansY: "Tabung Reaksi", fixedX: null, fixedY: "Tabung Reaksi" }
      ],
      tokens: ["Mikroskop", "Erna", "Termometer", "Fajar"],
      correctReason: "Tepat sekali! R = {(Dedi, Mikroskop), (Erna, Tabung Reaksi)}. Pasangan berurutan tersusun sempurna!",
      wrongExplanation: "Dedi membawa Mikroskop ➔ (Dedi, Mikroskop); Erna membawa Tabung Reaksi ➔ (Erna, Tabung Reaksi).",
      clue: "Pasangkan Dedi dengan Mikroskop dan Erna dengan Tabung Reaksi."
    }
  },
  {
    id: 3,
    chapterId: 1,
    type: "ARROW_BUILDER_2STEP",
    title: "🏹 Diagram Panah 2-Langkah: 'Moda Transportasi ke Sekolah'",
    question: "Langkah 1: Taruh nama siswa ke Himpunan A dan moda transportasi ke Himpunan B. Langkah 2: Sambungkan panah relasi sesuai data: Ali naik Sepeda, Budi naik Bus Sekolah & Ojek Online, Cici naik Ojek Online!",
    subInstruction: "Tempatkan nama anggota terlebih dahulu, kemudian sambungkan tali panahnya!",
    labelA: "Himpunan A",
    labelB: "Himpunan B",
    expectedSetA: ["Ali", "Budi", "Cici"],
    expectedSetB: ["Sepeda", "Bus Sekolah", "Ojek Online"],
    availableTokens: ["Ali", "Budi", "Cici", "Sepeda", "Bus Sekolah", "Ojek Online"],
    correctPairs: [
      "Ali->Sepeda",
      "Budi->Bus Sekolah",
      "Budi->Ojek Online",
      "Cici->Ojek Online"
    ],
    rule: "Ali naik Sepeda, Budi naik Bus Sekolah & Ojek Online, Cici naik Ojek Online",
    correctReason: "Sempurna! Kamu telah menamai diagram himpunan dan menghubungkan tali panah relasi transportasi dengan tepat!",
    wrongExplanation: "Pastikan nama di Himpunan A: Ali, Budi, Cici; Himpunan B: Sepeda, Bus Sekolah, Ojek Online. Sambungkan: Ali->Sepeda, Budi->Bus Sekolah, Budi->Ojek Online, Cici->Ojek Online.",
    clue: "Budi menggunakan 2 moda transportasi (Bus Sekolah dan Ojek Online).",
    remedialVariant: {
      type: "ARROW_BUILDER_2STEP",
      title: "🏹 Remedial: Diagram Panah 'Peralatan Menggambar'",
      question: "Tempatkan nama siswa di A dan peralatan di B, lalu sambungkan panah: Dito membawa Penggaris & Jangka, Eka membawa Jangka!",
      labelA: "Himpunan A",
      labelB: "Himpunan B",
      expectedSetA: ["Dito", "Eka"],
      expectedSetB: ["Penggaris", "Jangka"],
      availableTokens: ["Dito", "Eka", "Penggaris", "Jangka"],
      correctPairs: [
        "Dito->Penggaris",
        "Dito->Jangka",
        "Eka->Jangka"
      ],
      rule: "Dito membawa Penggaris & Jangka, Eka membawa Jangka",
      correctReason: "Bagus sekali! Diagram panah relasi peralatan menggambar tersusun dengan rapi dan akurat.",
      wrongExplanation: "Pastikan nama di Himpunan A: Dito, Eka; Himpunan B: Penggaris, Jangka. Sambungkan panah: Dito->Penggaris, Dito->Jangka, dan Eka->Jangka.",
      clue: "Dito membawa 2 alat (Penggaris dan Jangka)."
    }
  },
  {
    id: 4,
    chapterId: 1,
    type: "TABLE_BUILDER",
    title: "📊 Lengkapi Tabel Relasi: 'Aplikasi Belajar Digital'",
    question: "Dalam pembelajaran berbasis teknologi, 4 siswa menggunakan aplikasi digital: Rian menggunakan Canva, Siti menggunakan Scratch, Doni menggunakan Duolingo, dan Putri menggunakan Notion. Lengkapi sel-sel tabel relasi berikut!",
    subInstruction: "Pindahkan kartu nama siswa atau aplikasi ke sel bertanda [ ? ]!",
    tableTitle: "Tabel Relasi: 'Aplikasi Belajar Siswa'",
    headers: ["Nama Siswa", "Aplikasi Belajar"],
    rows: [
      { idX: "r1_x", isSlotX: false, valX: "Rian", idY: "r1_y", isSlotY: true, valY: "Canva" },
      { idX: "r2_x", isSlotX: true, valX: "Siti", idY: "r2_y", isSlotY: false, valY: "Scratch" },
      { idX: "r3_x", isSlotX: false, valX: "Doni", idY: "r3_y", isSlotY: true, valY: "Duolingo" },
      { idX: "r4_x", isSlotX: true, valX: "Putri", idY: "r4_y", isSlotY: true, valY: "Notion" }
    ],
    tokens: ["Canva", "Siti", "Duolingo", "Putri", "Notion", "CapCut", "Quizizz"],
    correctReason: "Luar biasa! Seluruh baris tabel relasi aplikasi belajar terisi dengan tepat: Rian ➔ Canva, Siti ➔ Scratch, Doni ➔ Duolingo, dan Putri ➔ Notion.",
    wrongExplanation: "Cocokkan data aplikasi tiap siswa:\n• Rian ➔ Canva\n• Siti ➔ Scratch\n• Doni ➔ Duolingo\n• Putri ➔ Notion",
    clue: "Rian menggunakan Canva, pasangannya Scratch adalah Siti, Doni menggunakan Duolingo, dan Putri menggunakan Notion.",
    remedialVariant: {
      type: "TABLE_BUILDER",
      title: "📊 Remedial: Tabel Relasi 'Tugas Proyek Kelas'",
      question: "Tiga peserta proyek memilih format tugas: Eko membuat Poster, Fani membuat Video, dan Gita membuat Maket. Lengkapi tabel relasi berikut!",
      subInstruction: "Pindahkan kartu ke sel bertanda [ ? ]!",
      tableTitle: "Tabel Relasi: 'Format Proyek'",
      headers: ["Nama Peserta", "Format Tugas"],
      rows: [
        { idX: "r1_x", isSlotX: false, valX: "Eko", idY: "r1_y", isSlotY: true, valY: "Poster" },
        { idX: "r2_x", isSlotX: true, valX: "Fani", idY: "r2_y", isSlotY: false, valY: "Video" },
        { idX: "r3_x", isSlotX: false, valX: "Gita", idY: "r3_y", isSlotY: true, valY: "Maket" }
      ],
      tokens: ["Poster", "Fani", "Maket", "Podcast"],
      correctReason: "Tepat sekali! Eko ➔ Poster, Fani ➔ Video, dan Gita ➔ Maket. Tabel relasi selesai!",
      wrongExplanation: "Pasangkan: Eko dengan Poster, Fani dengan Video, dan Gita dengan Maket.",
      clue: "Eko membuat Poster, Fani membuat Video, dan Gita membuat Maket."
    }
  },
  {
    id: 5,
    chapterId: 1,
    type: "CARTESIAN",
    title: "📍 Diagram Kartesius: Relasi 'Jadwal Hari Piket Kelas'",
    question: "Tiga siswa terjadwal piket kebersihan kelas: Andi bertugas hari Senin dan Rabu, Budi bertugas hari Selasa, serta Citra bertugas hari Senin dan Selasa. Tandai seluruh pasangan titik jadwal piket mereka pada diagram Kartesius berikut!",
    labelX: "Nama Siswa",
    labelY: "Hari Piket",
    xLabels: { 1: "Andi", 2: "Budi", 3: "Citra" },
    yLabels: { 1: "Senin", 2: "Selasa", 3: "Rabu" },
    minX: 0,
    maxX: 3,
    minY: 0,
    maxY: 3,
    targetPoints: [
      [1, 1],
      [1, 3],
      [2, 2],
      [3, 1],
      [3, 2]
    ],
    correctReason: "Hebat sekali! Pasangan titik jadwal piket berhasil kamu tandai dengan tepat pada diagram Kartesius. Dalam relasi, satu anggota asal boleh memiliki lebih dari satu kawan pasangan (bercabang)!",
    wrongExplanation: "Periksa kembali jadwal tiap siswa:\n• Andi: Senin dan Rabu (tandai persilangan kolom Andi dengan baris Senin dan Rabu)\n• Budi: Selasa (tandai persilangan kolom Budi dengan baris Selasa)\n• Citra: Senin dan Selasa (tandai persilangan kolom Citra dengan baris Senin dan Selasa)",
    clue: "Andi bertugas 2 hari (Senin & Rabu), Budi bertugas 1 hari (Selasa), dan Citra bertugas 2 hari (Senin & Selasa).",
    remedialVariant: {
      question: "Dua siswa membawa perlengkapan seni rupa: Dedi membawa Krayon dan Cat Air, serta Erna membawa Cat Air dan Kuas. Tandai seluruh pasangan titik perlengkapan seni mereka pada diagram Kartesius berikut!",
      labelX: "Nama Siswa",
      labelY: "Alat Seni Rupa",
      xLabels: { 1: "Dedi", 2: "Erna" },
      yLabels: { 1: "Krayon", 2: "Cat Air", 3: "Kuas" },
      minX: 0,
      maxX: 2,
      minY: 0,
      maxY: 3,
      targetPoints: [
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 3]
      ],
      correctReason: "Bagus sekali! Dedi membawa 2 alat dan Erna membawa 2 alat. Seluruh titik relasi terpasang tepat pada diagram Kartesius.",
      wrongExplanation: "Tandai titik temu nama siswa di sumbu mendatar dengan peralatannya di sumbu tegak:\n• Dedi: Krayon dan Cat Air\n• Erna: Cat Air dan Kuas",
      clue: "Dedi membawa 2 alat (Krayon dan Cat Air), Erna membawa 2 alat (Cat Air dan Kuas)."
    }
  },
  {
    id: 6,
    chapterId: 1,
    type: "DRAG_DROP",
    title: "🎯 Pindahkan Kartu: Analisis Aturan Relasi Pasangan Berurutan",
    question: "Diberikan empat pasangan berurutan (x, y). Analisislah aturan hubungan dari elemen pertama (x) ke elemen kedua (y), lalu kelompokkan ke kotak aturan relasi yang tepat!",
    subInstruction: "Pindahkan setiap kartu pasangan ke kotak 'Relasi \"Setengah Dari\"' atau 'Relasi \"Dua Kali Dari\"'!",
    categories: [
      'Relasi "Setengah Dari"',
      'Relasi "Dua Kali Dari"'
    ],
    items: [
      "(2, 4)",
      "(3, 6)",
      "(4, 2)",
      "(6, 3)"
    ],
    correctMapping: {
      "(2, 4)": 'Relasi "Setengah Dari"',
      "(3, 6)": 'Relasi "Setengah Dari"',
      "(4, 2)": 'Relasi "Dua Kali Dari"',
      "(6, 3)": 'Relasi "Dua Kali Dari"'
    },
    itemExplanations: {
      "(2, 4)": "Pada pasangan (2, 4), elemen pertama 2 bernilai setengah dari 4 (2 = ½ × 4).",
      "(3, 6)": "Pada pasangan (3, 6), elemen pertama 3 bernilai setengah dari 6 (3 = ½ × 6).",
      "(4, 2)": "Pada pasangan (4, 2), elemen pertama 4 bernilai dua kali dari 2 (4 = 2 × 2).",
      "(6, 3)": "Pada pasangan (6, 3), elemen pertama 6 bernilai dua kali dari 3 (6 = 2 × 3)."
    },
    correctReason: "Luar biasa! Kamu memahami bahwa urutan pasangan (x, y) sangat penting dalam relasi: (2, 4) adalah relasi 'setengah dari', sedangkan (4, 2) adalah relasi 'dua kali dari'.",
    wrongExplanation: "Periksa aturan hubungan dari elemen x ke elemen y:\n• Relasi 'Setengah Dari' (x = ½y): (2, 4) dan (3, 6)\n• Relasi 'Dua Kali Dari' (x = 2y): (4, 2) dan (6, 3)",
    clue: "Perhatikan urutannya: apakah x bernilai setengah dari y, ataukah x bernilai dua kali lipat dari y?",
    remedialVariant: {
      question: "Kelompokkan pasangan berurutan (x, y) berikut ke dalam kotak aturan relasi 'Setengah Dari' atau 'Dua Kali Dari' yang tepat!",
      categories: [
        'Relasi "Setengah Dari"',
        'Relasi "Dua Kali Dari"'
      ],
      items: [
        "(1, 2)",
        "(5, 10)",
        "(2, 1)",
        "(10, 5)"
      ],
      correctMapping: {
        "(1, 2)": 'Relasi "Setengah Dari"',
        "(5, 10)": 'Relasi "Setengah Dari"',
        "(2, 1)": 'Relasi "Dua Kali Dari"',
        "(10, 5)": 'Relasi "Dua Kali Dari"'
      },
      correctReason: "Tepat sekali! (1, 2) dan (5, 10) menyatakan 'setengah dari', sedangkan (2, 1) dan (10, 5) menyatakan 'dua kali dari'.",
      wrongExplanation: "• Relasi 'Setengah Dari' (x = ½y): (1, 2) dan (5, 10)\n• Relasi 'Dua Kali Dari' (x = 2y): (2, 1) dan (10, 5)",
      clue: "1 adalah setengah dari 2, sedangkan 2 adalah dua kali dari 1."
    }
  },
  {
    id: 7,
    chapterId: 1,
    type: "HPB_BUILDER",
    title: "🧩 Susun Pasangan Berurutan: 'Kota Kelahiran'",
    question: "Data kota kelahiran tiga anak: Fajar lahir di Bandung, Gita lahir di Surabaya, dan Hadi lahir di Jakarta. Susunlah himpunan pasangan berurutan untuk relasi 'kota kelahiran' tersebut!",
    subInstruction: "Pindahkan kartu nama atau kota ke dalam kurung pasangan berurutan!",
    setName: "R",
    pairs: [
      { idX: "p1_x", idY: "p1_y", ansX: "Fajar", ansY: "Bandung", fixedX: "Fajar", fixedY: null },
      { idX: "p2_x", idY: "p2_y", ansX: "Gita", ansY: "Surabaya", fixedX: null, fixedY: "Surabaya" },
      { idX: "p3_x", idY: "p3_y", ansX: "Hadi", ansY: "Jakarta", fixedX: null, fixedY: null }
    ],
    tokens: ["Gita", "Semarang", "Bandung", "Hadi", "Ilham", "Jakarta"],
    correctReason: "Sempurna! Pasangan berurutan kota kelahiran tersusun tepat: R = {(Fajar, Bandung), (Gita, Surabaya), (Hadi, Jakarta)}.",
    wrongExplanation: "Pasangkan nama anak dengan kota kelahirannya:\n• Fajar lahir di Bandung ➔ (Fajar, Bandung)\n• Gita lahir di Surabaya ➔ (Gita, Surabaya)\n• Hadi lahir di Jakarta ➔ (Hadi, Jakarta)",
    clue: "Fajar di Bandung, pasangannya Surabaya adalah Gita, dan Hadi di Jakarta.",
    remedialVariant: {
      type: "HPB_BUILDER",
      title: "🧩 Remedial: Pasangan Berurutan 'Kota Kelahiran'",
      question: "Lengkapi pasangan berurutan data kelahiran: Indah lahir di Yogyakarta dan Joko lahir di Medan!",
      subInstruction: "Pindahkan kartu ke dalam kotak kurung pasangan berurutan!",
      setName: "R",
      pairs: [
        { idX: "rp1_x", idY: "rp1_y", ansX: "Indah", ansY: "Yogyakarta", fixedX: "Indah", fixedY: null },
        { idX: "rp2_x", idY: "rp2_y", ansX: "Joko", ansY: "Medan", fixedX: null, fixedY: "Medan" }
      ],
      tokens: ["Yogyakarta", "Joko", "Padang"],
      correctReason: "Bagus sekali! R = {(Indah, Yogyakarta), (Joko, Medan)}. Selesai dengan benar!",
      wrongExplanation: "Indah di Yogyakarta ➔ (Indah, Yogyakarta); Joko di Medan ➔ (Joko, Medan).",
      clue: "Pasangkan Indah dengan Yogyakarta dan Joko dengan Medan."
    }
  },
  {
    id: 8,
    chapterId: 1,
    type: "ARROW_BUILDER_2STEP",
    title: "🏹 Diagram Panah 2-Langkah: 'Peminjaman Bahan Bacaan di Perpustakaan'",
    question: "Langkah 1: Tempatkan nama siswa {Rani, Tono} di Himpunan A dan jenis bacaan {Ensiklopedia, Majalah Sains} di Himpunan B. Langkah 2: Sambungkan panah relasi sesuai data: Rani meminjam Ensiklopedia dan Majalah Sains, sedangkan Tono meminjam Ensiklopedia!",
    subInstruction: "Lengkapi nama anggota di lingkaran himpunan, lalu sambungkan panah relasinya!",
    labelA: "Himpunan A",
    labelB: "Himpunan B",
    expectedSetA: ["Rani", "Tono"],
    expectedSetB: ["Ensiklopedia", "Majalah Sains"],
    availableTokens: ["Rani", "Tono", "Ensiklopedia", "Majalah Sains"],
    correctPairs: [
      "Rani->Ensiklopedia",
      "Rani->Majalah Sains",
      "Tono->Ensiklopedia"
    ],
    rule: "Rani meminjam Ensiklopedia & Majalah Sains, Tono meminjam Ensiklopedia",
    correctReason: "Luar biasa! Rani meminjam dua bahan bacaan (Ensiklopedia dan Majalah Sains), sedangkan Tono meminjam Ensiklopedia. Diagram panah 2-langkah tuntas!",
    wrongExplanation: "Sambungkan: Rani ke Ensiklopedia, Rani ke Majalah Sains, dan Tono ke Ensiklopedia.",
    clue: "Rani memiliki 2 cabang panah (ke Ensiklopedia dan Majalah Sains). Tono hanya 1 panah ke Ensiklopedia.",
    remedialVariant: {
      type: "ARROW_BUILDER_2STEP",
      title: "🏹 Remedial: Diagram Panah 'Divisi Panitia Pentas Seni'",
      question: "Tempatkan nama di A dan divisi di B, lalu sambungkan panah: Diva bertugas di Acara dan Dokumentasi, sedangkan Evan bertugas di Acara!",
      labelA: "Himpunan A",
      labelB: "Himpunan B",
      expectedSetA: ["Diva", "Evan"],
      expectedSetB: ["Acara", "Dokumentasi"],
      availableTokens: ["Diva", "Evan", "Acara", "Dokumentasi"],
      correctPairs: [
        "Diva->Acara",
        "Diva->Dokumentasi",
        "Evan->Acara"
      ],
      rule: "Diva bertugas di Acara & Dokumentasi, Evan bertugas di Acara",
      correctReason: "Bagus! Diva bercabang ke Acara dan Dokumentasi, Evan ke Acara.",
      wrongExplanation: "Pastikan nama di Himpunan A: Diva, Evan; Himpunan B: Acara, Dokumentasi. Sambungkan panah: Diva->Acara, Diva->Dokumentasi, dan Evan->Acara.",
      clue: "Diva memiliki 2 panah (Acara dan Dokumentasi)."
    }
  },
  {
    id: 9,
    chapterId: 1,
    type: "TABLE_BUILDER",
    title: "📊 Lengkapi Tabel: 'Jabatan Pengurus Kelas'",
    question: "SMP Nusantara mengumumkan susunan pengurus kelas: Bayu menjabat Ketua Kelas, Laras menjabat Sekretaris, Dimas menjabat Bendahara, dan Siska menjabat Seksi IT. Lengkapi sel-sel tabel relasi berikut!",
    subInstruction: "Pindahkan kartu nama siswa atau jabatan ke sel tabel!",
    tableTitle: "Tabel Relasi: 'Pengurus Kelas Siswa'",
    headers: ["Nama Siswa", "Jabatan Kelas"],
    rows: [
      { idX: "r1_x", isSlotX: false, valX: "Bayu", idY: "r1_y", isSlotY: true, valY: "Ketua Kelas" },
      { idX: "r2_x", isSlotX: true, valX: "Laras", idY: "r2_y", isSlotY: false, valY: "Sekretaris" },
      { idX: "r3_x", isSlotX: false, valX: "Dimas", idY: "r3_y", isSlotY: true, valY: "Bendahara" },
      { idX: "r4_x", isSlotX: true, valX: "Siska", idY: "r4_y", isSlotY: true, valY: "Seksi IT" }
    ],
    tokens: ["Ketua Kelas", "Laras", "Bendahara", "Siska", "Seksi IT", "Seksi Mading", "Seksi Kebersihan"],
    correctReason: "Hebat sekali! Bayu ➔ Ketua Kelas, Laras ➔ Sekretaris, Dimas ➔ Bendahara, dan Siska ➔ Seksi IT. Tabel relasi pengurus kelas selesai dengan sempurna!",
    wrongExplanation: "Cocokkan nama siswa dengan jabatannya:\n• Bayu ➔ Ketua Kelas\n• Laras ➔ Sekretaris\n• Dimas ➔ Bendahara\n• Siska ➔ Seksi IT",
    clue: "Bayu menjabat Ketua Kelas, pasangannya Sekretaris adalah Laras, Dimas menjabat Bendahara, dan Siska menjabat Seksi IT.",
    remedialVariant: {
      type: "TABLE_BUILDER",
      title: "📊 Remedial: Tabel 'Bahasa Asing yang Dipelajari'",
      question: "Tiga siswa mengambil kelas bahasa: Aldo belajar Bahasa Jepang, Bella belajar Bahasa Inggris, dan Citra belajar Bahasa Mandarin. Lengkapi tabel berikut!",
      subInstruction: "Pindahkan kartu ke sel tabel yang kosong!",
      tableTitle: "Tabel Relasi: 'Bahasa Asing'",
      headers: ["Nama Siswa", "Bahasa Asing"],
      rows: [
        { idX: "r1_x", isSlotX: false, valX: "Aldo", idY: "r1_y", isSlotY: true, valY: "Jepang" },
        { idX: "r2_x", isSlotX: true, valX: "Bella", idY: "r2_y", isSlotY: false, valY: "Inggris" },
        { idX: "r3_x", isSlotX: false, valX: "Citra", idY: "r3_y", isSlotY: true, valY: "Mandarin" }
      ],
      tokens: ["Jepang", "Bella", "Mandarin", "Korea"],
      correctReason: "Tepat! Aldo ➔ Jepang, Bella ➔ Inggris, Citra ➔ Mandarin.",
      wrongExplanation: "Pasangkan nama siswa dengan bahasa asing yang dipelajari.",
      clue: "Aldo belajar Jepang, Bella belajar Inggris, dan Citra belajar Mandarin."
    }
  },
  {
    id: 10,
    chapterId: 1,
    type: "CARTESIAN",
    title: "📍 Diagram Kartesius: Relasi 'Alat Praktikum Laboratorium IPA'",
    question: "Tiga siswa mencatat alat praktikum laboratorium IPA yang mereka gunakan: Fajar menggunakan Mikroskop dan Tabung Reaksi, Gita menggunakan Gelas Ukur, serta Hadi menggunakan Mikroskop dan Gelas Ukur. Tandai seluruh pasangan titik alat praktikum yang mereka gunakan pada diagram Kartesius berikut!",
    labelX: "Nama Siswa",
    labelY: "Alat Praktikum IPA",
    xLabels: { 1: "Fajar", 2: "Gita", 3: "Hadi" },
    yLabels: { 1: "Mikroskop", 2: "Tabung Reaksi", 3: "Gelas Ukur" },
    minX: 0,
    maxX: 3,
    minY: 0,
    maxY: 3,
    targetPoints: [
      [1, 1],
      [1, 2],
      [2, 3],
      [3, 1],
      [3, 3]
    ],
    correctReason: "Luar biasa! Fajar (Mikroskop & Tabung Reaksi), Gita (Gelas Ukur), dan Hadi (Mikroskop & Gelas Ukur) telah terpasang dengan tepat pada diagram Kartesius. Karakteristik utama relasi adalah anggota asal boleh memiliki banyak pasangan!",
    wrongExplanation: "Tandai persilangan nama siswa (sumbu mendatar) dan alat praktikum yang digunakan (sumbu tegak):\n• Fajar: Mikroskop dan Tabung Reaksi\n• Gita: Gelas Ukur\n• Hadi: Mikroskop dan Gelas Ukur",
    clue: "Fajar menggunakan 2 alat (Mikroskop & Tabung Reaksi), Gita menggunakan Gelas Ukur, dan Hadi menggunakan 2 alat (Mikroskop & Gelas Ukur).",
    remedialVariant: {
      question: "Dua siswa menyiapkan perlengkapan praktikum biologi: Rian membawa Lup dan Pinset, serta Tiara membawa Pinset dan Cawan Petri. Tandai seluruh pasangan titik perlengkapan praktikum mereka pada diagram Kartesius berikut!",
      labelX: "Nama Siswa",
      labelY: "Alat Praktikum",
      xLabels: { 1: "Rian", 2: "Tiara" },
      yLabels: { 1: "Lup", 2: "Pinset", 3: "Cawan Petri" },
      minX: 0,
      maxX: 2,
      minY: 0,
      maxY: 3,
      targetPoints: [
        [1, 1],
        [1, 2],
        [2, 2],
        [2, 3]
      ],
      correctReason: "Tepat sekali! Rian (Lup & Pinset) dan Tiara (Pinset & Cawan Petri) terpasang sempurna pada diagram Kartesius.",
      wrongExplanation: "Pasangkan: Rian dengan Lup dan Pinset; Tiara dengan Pinset dan Cawan Petri.",
      clue: "Rian membawa 2 alat (Lup & Pinset), Tiara membawa 2 alat (Pinset & Cawan Petri)."
    }
  }
];
