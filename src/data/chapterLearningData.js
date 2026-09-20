/**
 * CHAPTER LEARNING DATA : 5 Chapter Relasi & Fungsi SMP Kelas 8
 * 
 * Chapter 1: Pengertian & Cara Menyatakan Relasi (Konsep, Benang Merah, 4 Bentuk Penyajian)
 * Chapter 2: Pengertian & Unsur Fungsi (Domain, Kodomain, Range, Syarat Fungsi)
 * Chapter 3: Notasi & Rumus Fungsi (f(x) = ax + b, Hitung Nilai)
 * Chapter 4: Grafik Fungsi Linear (Sumbu X/Y, Gradien m)
 * Chapter 5: Korespondensi Satu-Satu (Fungsi Bijektif, n!)
 *
 * Seluruh kunci jawaban kuis dan remedial retry divariasikan merata (B, C, D, A).
 * Aturan UI: No scroll : semua fit viewport 16:9.
 */

// Saklar Mode Chapter 3:
// Set false = Versi slide klasik (backup sebelum implementation plan untuk semua distribusi)
// Set true  = Versi video pembelajaran interaktif & kuis popup (implementation plan)
export const USE_CHAPTER3_VIDEO = true;

export const CHAPTER3_VIDEO_SEGMENTS = [
  {
    id: 1,
    type: 'video',
    videoKey: '3.1',
    title: 'Video 3.1: Notasi & Rumus Fungsi',
    emoji: '🎬'
  },
  {
    id: 2,
    type: 'video',
    videoKey: '3.2',
    title: 'Video 3.2: Nilai Fungsi Input Negatif',
    emoji: '➖'
  },
  {
    id: 3,
    type: 'video',
    videoKey: '3.3',
    title: 'Video 3.3: Menentukan Rumus dari Tabel',
    emoji: '📊'
  },
  {
    id: 4,
    type: 'video',
    videoKey: '3.4',
    title: 'Video 3.4: Bayangan & Prapeta Fungsi',
    emoji: '💡'
  }
];

export const CHAPTER3_CLASSIC_SEGMENTS = [
  {
    id: 1,
    type: 'lesson',
    title: 'Notasi Fungsi',
    emoji: '✍️',
    content: [
      'Fungsi bisa dituliskan dengan **rumus matematika** seperti ini:',
      '**f : A → B** dibaca "fungsi f memetakan himpunan A ke himpunan B".',
      '**f(x) = y** dibaca "fungsi f memetakan input x menghasilkan output y".',
      'Contoh: f(x) = 2x + 1\n• Jika input x = 3, maka f(3) = 2(3) + 1 = 7.\n• Artinya: angka 3 dipetakan ke angka 7.'
    ],
    visual: {
      type: 'function_machine',
      inputVal: 3,
      formula: 'f(x) = 2x + 1',
      step: '2(3) + 1 = 6 + 1',
      outputVal: 7
    },
    diagram: null
  },
  {
    id: 2,
    type: 'lesson',
    title: 'Rumus Fungsi Linear',
    emoji: '📏',
    content: [
      'Bentuk umum fungsi linear adalah: **f(x) = ax + b**',
      '• **a** = angka pengali dari x (disebut koefisien)',
      '• **b** = angka tetap yang tidak berubah (disebut konstanta)',
      '• **x** = angka masukan (input) yang bisa diganti-ganti',
      'Contoh: f(x) = 3x − 5\n→ a = 3, b = −5\n→ f(2) = 3(2) − 5 = 6 − 5 = 1'
    ],
    visual: {
      type: 'function_machine',
      inputVal: 2,
      formula: 'f(x) = 3x - 5',
      step: '3(2) - 5 = 6 - 5',
      outputVal: 1
    },
    diagram: null
  },
  {
    id: 3,
    type: 'quiz',
    title: 'Kuis: Hitung Nilai Fungsi',
    emoji: '❓',
    clue: 'Ganti x dengan 4 pada rumus f(x) = 2x + 3. Hitung perkalian 2(4) terlebih dahulu, baru jumlahkan hasilnya dengan 3.',
    question: 'Diketahui rumus fungsi f(x) = 2x + 3.\nBerapakah nilai dari f(4)?',
    visual: {
      type: 'function_machine',
      inputVal: 4,
      formula: 'f(x) = 2x + 3',
      step: '2(4) + 3 = 8 + 3',
      outputVal: '?'
    },
    options: [
      '8',
      '9',
      '11',
      '14'
    ],
    correct: '11',
    explanation: 'f(4) = 2(4) + 3 = 8 + 3 = 11 ✅',
    remedial: {
      content: [
        'Langkah menghitung f(4):',
        '1️⃣ Tulis rumus: f(x) = 2x + 3',
        '2️⃣ Ganti x dengan 4: f(4) = 2(4) + 3',
        '3️⃣ Hitung perkalian: 2 × 4 = 8',
        '4️⃣ Jumlahkan: 8 + 3 = 11'
      ],
      retryQuestion: {
        question: 'Diketahui f(x) = 3x + 1.\nBerapakah nilai f(2)?',
        options: [
          '5',
          '7',
          '6',
          '4'
        ],
        correct: '7',
        explanation: 'f(2) = 3(2) + 1 = 6 + 1 = 7 ✅'
      }
    }
  },
  {
    id: 4,
    type: 'lesson',
    title: 'Nilai Fungsi untuk Input Negatif',
    emoji: '➖',
    content: [
      'Bagaimana jika input x bernilai **negatif**?',
      'Contoh: f(x) = 2x + 7\nf(−3) = 2(−3) + 7 = −6 + 7 = **1**',
      '💡 Perhatikan aturan tanda perkalian:\n• Positif × Negatif = Negatif\n• 2 × (−3) = −6',
      'Contoh lagi: g(x) = 5x − 4\ng(−2) = 5(−2) − 4 = −10 − 4 = **−14**'
    ],
    visual: {
      type: 'function_machine',
      inputVal: -3,
      formula: 'f(x) = 2x + 7',
      step: '2(-3) + 7 = -6 + 7',
      outputVal: 1
    },
    diagram: null
  },
  {
    id: 5,
    type: 'quiz',
    title: 'Kuis: Nilai Fungsi Negatif',
    emoji: '❓',
    clue: 'Perhatikan tanda negatif: 4 dikali (-2) bernilai -8. Lalu hitung -8 - 1 (utang bertambah negatif).',
    question: 'Diketahui f(x) = 4x − 1.\nBerapakah nilai f(−2)?',
    visual: {
      type: 'function_machine',
      inputVal: -2,
      formula: 'f(x) = 4x - 1',
      step: '4(-2) - 1 = -8 - 1',
      outputVal: '?'
    },
    options: [
      '−9',
      '7',
      '−7',
      '9'
    ],
    correct: '−9',
    explanation: 'f(−2) = 4(−2) − 1 = −8 − 1 = −9 ✅',
    remedial: {
      content: [
        'Langkah perhitungan:',
        '1️⃣ f(x) = 4x − 1',
        '2️⃣ Masukkan x = −2: f(−2) = 4 × (−2) − 1',
        '3️⃣ 4 × (−2) = −8',
        '4️⃣ −8 − 1 = −9'
      ],
      retryQuestion: {
        question: 'Diketahui g(x) = 3x + 5.\nBerapakah nilai g(−1)?',
        options: [
          '2',
          '8',
          '−2',
          '−8'
        ],
        correct: '2',
        explanation: 'g(−1) = 3(−1) + 5 = −3 + 5 = 2 ✅'
      }
    }
  },
  {
    id: 6,
    type: 'lesson',
    title: 'Menentukan Rumus dari Tabel',
    emoji: '🔍',
    content: [
      'Kadang kita diberi **tabel angka** dan diminta mencari **rumus fungsi**-nya.',
      'Perhatikan **Tabel Data Nilai Fungsi** pada kartu di bawah ini:',
      '**Cara mencari rumus f(x) = ax + b:**\n1️⃣ Hitung selisih antar f(x): 8−5=3, 11−8=3 → a = 3\n2️⃣ Masukkan nilai pertama: f(1) = 3(1) + b = 5 → 3 + b = 5 → b = 2\n3️⃣ Maka rumusnya: **f(x) = 3x + 2** ✅'
    ],
    visual: {
      type: 'relation_table',
      title: 'Tabel Data Nilai Rumus f(x) = 3x + 2',
      rule: 'f(x) = 3x + 2',
      headers: ['x', 'f(x)'],
      rows: [
        ['1', '5'],
        ['2', '8'],
        ['3', '11'],
        ['4', '14']
      ],
      layout: 'horizontal'
    },
    diagram: null
  },
  {
    id: 7,
    type: 'quiz',
    title: 'Kuis: Cari Rumus Fungsi',
    emoji: '❓',
    isHots: true,
    hotsLevel: 'C4 Analisis',
    hotsBadge: 'TANTANGAN HOTS (C4 Analisis)',
    clue: 'Cari laju perubahan (selisih nilai f(x)): 8 - 5 = 3 (ini nilai koefisien a). Lalu uji saat x = 1: 3(1) + b = 5 untuk menemukan nilai konstanta b.',
    question: 'Perhatikan tabel data nilai fungsi di samping.\nRumus fungsi f(x) yang sesuai adalah...',
    visual: {
      type: 'relation_table',
      title: 'Tabel Data Nilai Fungsi',
      rule: 'Pola: +3 tiap langkah',
      headers: ['x', 'f(x)'],
      rows: [
        ['1', '5'],
        ['2', '8'],
        ['3', '11']
      ],
      layout: 'horizontal'
    },
    options: [
      'f(x) = 2x + 3',
      'f(x) = 3x + 2',
      'f(x) = 4x + 1',
      'f(x) = 3x − 1'
    ],
    correct: 'f(x) = 3x + 2',
    explanation: 'Selisih output = 3 (maka a = 3). Saat x = 1: 3(1) + b = 5 → b = 2. Rumus: f(x) = 3x + 2 ✅',
    remedial: {
      content: [
        'Langkah cepat mencari rumus:',
        '1️⃣ Cari selisih nilai f(x): 8 − 5 = 3 (ini nilai a)',
        '2️⃣ Tulis rumus sementara: f(x) = 3x + b',
        '3️⃣ Uji x = 1: f(1) = 3(1) + b = 5 → b = 2',
        '4️⃣ Rumus: f(x) = 3x + 2'
      ],
      retryQuestion: {
        question: 'x = 1 → 3, x = 2 → 5, x = 3 → 7.\nRumus fungsinya adalah...',
        options: [
          'f(x) = x + 3',
          'f(x) = 2x − 1',
          'f(x) = 2x + 1',
          'f(x) = 3x'
        ],
        correct: 'f(x) = 2x + 1',
        explanation: 'Selisih = 2 (a = 2). 2(1) + b = 3 → b = 1. Rumus: f(x) = 2x + 1 ✅'
      }
    }
  },
  {
    id: 8,
    type: 'lesson',
    title: 'Bayangan dan Prapeta',
    emoji: '💡',
    content: [
      'Dua istilah penting yang sering muncul di soal:',
      '• **Bayangan** dari x: artinya hasil hitung f(x). Contoh: bayangan dari 3 pada f(x) = 2x adalah f(3) = 6.',
      '• **Prapeta** dari y: artinya mencari balik nilai x yang menghasilkan y. Contoh: jika f(x) = 10 pada f(x) = 2x, maka x = 5.',
      '📌 Jadi, "Tentukan bayangan dari 4" artinya sama saja dengan "Hitung f(4)".'
    ],
    visual: {
      type: 'function_machine',
      inputVal: 3,
      formula: 'f(x) = 2x',
      step: 'Bayangan dari x=3',
      outputVal: 6
    },
    diagram: null
  },
  {
    id: 9,
    type: 'quiz',
    title: 'Kuis: Bayangan Suatu Nilai',
    emoji: '❓',
    clue: 'Bayangan dari x = 3 artinya mencari hasil nilai f(3). Ganti huruf x dengan angka 3 pada rumus f(x) = 5x - 3.',
    question: 'Diketahui f(x) = 5x − 3.\nBayangan dari x = 3 adalah...',
    visual: {
      type: 'function_machine',
      inputVal: 3,
      formula: 'f(x) = 5x - 3',
      step: '5(3) - 3 = 15 - 3',
      outputVal: '?'
    },
    options: [
      '10',
      '9',
      '15',
      '12'
    ],
    correct: '12',
    explanation: 'Bayangan dari 3 = f(3) = 5(3) − 3 = 15 − 3 = 12 ✅',
    remedial: {
      content: [
        'Bayangan dari x = 3 artinya hitung nilai f(3):',
        'f(x) = 5x − 3',
        'f(3) = 5(3) − 3 = 15 − 3 = 12'
      ],
      retryQuestion: {
        question: 'f(x) = 2x + 4.\nBayangan dari x = 5 adalah...',
        options: [
          '9',
          '10',
          '12',
          '14'
        ],
        correct: '14',
        explanation: 'f(5) = 2(5) + 4 = 10 + 4 = 14 ✅'
      }
    }
  },
  {
    id: 10,
    type: 'quiz',
    title: 'Kuis Akhir Chapter 3',
    emoji: '🏆',
    isHots: true,
    hotsLevel: 'C5 Evaluasi',
    hotsBadge: 'TANTANGAN HOTS (C5 Evaluasi)',
    clue: 'Susun dua persamaan dari pasangan: a(1) + b = 5 dan a(3) + b = 11. Eliminasi konstanta b dengan mengurangkan kedua persamaan: 2a = 6 sehingga a = 3, lalu tentukan nilai b.',
    question: 'Perhatikan himpunan pasangan nilai fungsi f = {(1, 5), (3, 11)} dengan rumus f(x) = ax + b di samping.\nNilai a dan b berturut-turut adalah...',
    visual: {
      type: 'ordered_pairs',
      title: 'Pasangan Nilai Fungsi f',
      setName: 'f',
      rule: 'f(x) = ax + b',
      pairs: [['1', '5'], ['3', '11']],
      domain: ['1', '3'],
      range: ['5', '11'],
      domainName: 'Input (x)',
      rangeName: 'Output f(x)'
    },
    options: [
      'a = 3, b = 2',
      'a = 2, b = 3',
      'a = 5, b = 0',
      'a = 4, b = 1'
    ],
    correct: 'a = 3, b = 2',
    explanation: 'Dari f(1): a + b = 5.\nDari f(3): 3a + b = 11.\nKurangkan: 2a = 6 → a = 3. Lalu 3 + b = 5 → b = 2 ✅',
    remedial: {
      content: [
        'Cara eliminasi 2 persamaan:',
        '1️⃣ f(3) = 3a + b = 11',
        '2️⃣ f(1) = 1a + b = 5',
        '3️⃣ Kurangkan: 2a = 6 → a = 3',
        '4️⃣ Substitusi ke pers 1: 3 + b = 5 → b = 2'
      ],
      retryQuestion: {
        question: 'f(x) = ax + b, f(2) = 7, f(4) = 13.\nNilai a adalah...',
        options: [
          '2',
          '3',
          '4',
          '5'
        ],
        correct: '3',
        explanation: 'f(4)−f(2) = 13−7 = 6. Selisih x = 4−2 = 2. a = 6/2 = 3. ✅'
      }
    }
  }
];

export const CHAPTERS_DATA = {
  1: {
    id: 1,
    key: 'chapter1',
    title: 'Pengertian & Cara Menyatakan Relasi',
    subtitle: 'Konsep relasi, benang merah, 4 cara menyatakan relasi',
    icon: '🪢',
    color: '#D97706',
    totalSegments: 12,
    segments: [
      {
        id: 1,
        type: 'lesson',
        title: 'Apa itu Relasi?',
        emoji: '🤔',
        content: [
          'Dalam matematika, **Relasi** dari himpunan A ke himpunan B adalah **suatu aturan yang memasangkan** anggota himpunan A dengan anggota himpunan B.',
          'Bayangkan di kantin sekolah: ada daftar nama siswa (Himpunan A) dan daftar menu makanan (Himpunan B). Hubungan antara siswa dan makanan kesukaannya adalah sebuah **relasi**.',
          '📌 Kata kunci: Relasi adalah **aturan penghubung** antara dua himpunan.'
        ],
        visual: {
          type: 'arrow_diagram',
          setA: ['Budi', 'Siti', 'Rudi'],
          setB: ['Soto', 'Nasi Goreng', 'Bakso'],
          pairs: [['Budi', 'Soto'], ['Siti', 'Nasi Goreng'], ['Rudi', 'Bakso']],
          labelA: 'Nama (Domain)',
          labelB: 'Makanan (Kodomain)',
          statusBadge: 'Relasi Makanan Kesukaan'
        },
        diagram: {
          type: 'arrow',
          title: 'Contoh Relasi "Makanan Kesukaan"',
          setA: ['Budi', 'Siti', 'Rudi'],
          setB: ['Soto', 'Nasi Goreng', 'Bakso'],
          arrows: [['Budi', 'Soto'], ['Siti', 'Nasi Goreng'], ['Rudi', 'Bakso']],
          caption: 'Setiap siswa dihubungkan ke makanan kesukaannya 🍜'
        }
      },
      {
        id: 2,
        type: 'interactive_connect',
        title: 'Praktik: Hubungkan Pasangannya!',
        emoji: '📌',
        instruction: 'Tarik garis penghubung dari nama siswa di Himpunan A ke menu makanan di Himpunan B berdasarkan daftar pesanan kantin!',
        ruleText: 'Budi pesan Soto; Siti pesan Nasi Goreng; Rudi pesan Bakso.',
        setA: ['Budi', 'Siti', 'Rudi'],
        setB: ['Soto', 'Nasi Goreng', 'Bakso'],
        labelA: 'Nama Siswa (A)',
        labelB: 'Pesanan Menu (B)',
        validPairs: [[0, 0], [1, 1], [2, 2]],
        successMessage: 'Luar biasa! Seluruh pasangan tersambung tepat sesuai daftar pesanan kantin! 🎉',
        hint: 'Hubungkan Budi ➔ Soto, Siti ➔ Nasi Goreng, dan Rudi ➔ Bakso.'
      },
      {
        id: 3,
        type: 'quiz',
        title: 'Kuis: Konsep Dasar Relasi',
        emoji: '❓',
        clue: 'Perhatikan arah panah: Relasi adalah aturan yang menghubungkan anggota himpunan asal A ke anggota himpunan kawan B.',
        question: 'Perhatikan diagram panah relasi di samping.\nManakah pernyataan yang PALING TEPAT mengenai relasi ini?',
        visual: {
          type: 'arrow_diagram',
          setA: ['Budi', 'Siti'],
          setB: ['Soto', 'Bakso'],
          pairs: [['Budi', 'Soto'], ['Siti', 'Bakso']],
          labelA: 'Domain A',
          labelB: 'Kodomain B',
          statusBadge: 'Relasi Makanan',
          isFunction: true
        },
        options: [
          'Aturan yang memasangkan setiap orang di A dengan makanan yang disukainya di B',
          'Aturan yang menjumlahkan total harga makanan pesanan',
          'Aturan yang mewajibkan semua orang memesan jenis makanan yang sama',
          'Aturan yang melarang anggota A memilih anggota di B'
        ],
        correct: 'Aturan yang memasangkan setiap orang di A dengan makanan yang disukainya di B',
        explanation: 'Relasi adalah aturan yang menghubungkan / memasangkan anggota himpunan asal A ke anggota himpunan kawan B. ✅',
        remedial: {
          content: [
            'Ingat definisi dasar relasi:',
            '• Relasi = Aturan memasangkan elemen A ke B',
            '• A = Himpunan Asal (Domain)',
            '• B = Himpunan Kawan (Kodomain)',
            'Contoh: "Gemar bermain bola", "Ukuran sepatu", "Ibu kota dari"'
          ],
          retryQuestion: {
            question: 'Jika A = {Jakarta, Manila} dan B = {Indonesia, Filipina}, aturan relasi yang tepat dari A ke B adalah...',
            options: [
              'Ibu kota negara dari',
              'Bahasa nasional dari',
              'Mata uang dari',
              'Lagu kebangsaan dari'
            ],
            correct: 'Ibu kota negara dari',
            explanation: 'Jakarta adalah ibu kota Indonesia, dan Manila adalah ibu kota Filipina. ✅'
          }
        }
      },
      {
        id: 4,
        type: 'lesson',
        title: 'Fleksibilitas Relasi (Bebas Cabang & Kosong)',
        emoji: '🪢',
        content: [
          'Ciri khas utama **Relasi** adalah sifatnya yang **sangat fleksibel**:',
          '1️⃣ **Boleh Bercabang**: Satu anggota di A boleh punya 2 atau lebih pasangan di B. Contoh: Budi menyukai Soto DAN Nasi Goreng sekaligus!',
          '2️⃣ **Boleh Kosong**: Anggota di A boleh tidak memiliki pasangan sama sekali jika tidak memenuhi aturan.',
          '💡 Inilah pembeda besar Relasi dengan Fungsi (yang aturannya jauh lebih ketat).'
        ],
        visual: {
          type: 'arrow_diagram',
          setA: ['Budi (Cabang)', 'Siti', 'Eka (Kosong)'],
          setB: ['Soto', 'Nasi Goreng', 'Bakso'],
          pairs: [['Budi', 'Soto'], ['Budi', 'Nasi Goreng'], ['Siti', 'Bakso']],
          labelA: 'Domain Bebas',
          labelB: 'Pilihan',
          statusBadge: 'Relasi: Boleh Cabang & Kosong'
        },
        diagram: null
      },
      {
        id: 5,
        type: 'interactive_connect',
        title: 'Praktik: Relasi Angka "Faktor Dari"',
        emoji: '🔢',
        instruction: 'Tarik garis penghubung dari angka di A ke angka di B jika angka di A merupakan "Faktor Dari" (habis membagi) angka di B!',
        ruleText: 'Aturan: "Faktor Dari" (b habis dibagi a tanpa sisa). Angka 2 membagi 4 dan 6; angka 3 membagi 6; angka 5 tidak membagi keduanya.',
        setA: ['2', '3', '5'],
        setB: ['4', '6'],
        labelA: 'Angka A',
        labelB: 'Angka B',
        validPairs: [[0, 0], [0, 1], [1, 1]],
        successMessage: 'Tepat sekali! Angka 2 bercabang ke 4 dan 6, angka 3 ke 6, sedangkan angka 5 tidak punya pasangan. Inilah sifat fleksibel relasi! 🎉',
        hint: 'Ingat: 4 dan 6 habis dibagi 2 (2 panah). 6 habis dibagi 3 (1 panah). 5 bukan faktor dari 4 maupun 6.'
      },
      {
        id: 6,
        type: 'quiz',
        title: 'Kuis: Fleksibilitas Relasi',
        emoji: '❓',
        clue: 'Ingat sifat fleksibel relasi biasa: anggota asal boleh punya lebih dari 1 pasangan (cabang) atau tidak punya pasangan sama sekali (kosong).',
        question: 'Perhatikan diagram relasi bercabang di samping.\nApakah anggota asal boleh memiliki 2 atau lebih pasangan di kawan?',
        visual: {
          type: 'arrow_diagram',
          setA: ['Budi', 'Siti'],
          setB: ['Soto', 'Bakso', 'Sate'],
          pairs: [['Budi', 'Soto'], ['Budi', 'Bakso'], ['Siti', 'Sate']],
          labelA: 'Domain A',
          labelB: 'Pilihan B',
          statusBadge: 'Boleh Bercabang',
          isFunction: true
        },
        options: [
          'Tidak boleh sama sekali dalam aturan matematika',
          'Boleh, karena relasi tidak membatasi jumlah panah/pasangan',
          'Hanya boleh jika jumlah anggota himpunan bernilai ganjil',
          'Hanya boleh untuk anggota yang bernilai negatif'
        ],
        correct: 'Boleh, karena relasi tidak membatasi jumlah panah/pasangan',
        explanation: 'Relasi bebas: boleh memiliki 0 pasangan, 1 pasangan, maupun banyak pasangan bercabang. ✅',
        remedial: {
          content: [
            'Perhatikan ketentuan relasi:',
            '✅ 1 orang suka 2 hobi? Boleh! (Bercabang)',
            '✅ 1 orang tidak punya hobi? Boleh! (Kosong)',
            'Relasi tidak melarang cabang ataupun elemen kosong.'
          ],
          retryQuestion: {
            question: 'Pada relasi "Hobi Siswa", Dani menyukai Renang dan Futsal. Apakah ini menyalahi konsep relasi?',
            options: [
              'Ya, karena harus memilih satu saja',
              'Tergantung guru olahraganya',
              'Tidak menyalahi, karena relasi boleh bercabang',
              'Hanya sah jika Dani ikut kompetisi'
            ],
            correct: 'Tidak menyalahi, karena relasi boleh bercabang',
            explanation: 'Benar, satu orang boleh menyukai lebih dari satu hobi pada konsep relasi. ✅'
          }
        }
      },
      {
        id: 7,
        type: 'lesson',
        title: '4 Cara Menyatakan Relasi',
        emoji: '📋',
        content: [
          'Sebuah relasi bisa ditampilkan dalam **4 bentuk yang berbeda tapi isinya sama**:',
          '1️⃣ **Diagram Panah** : lingkaran himpunan dan garis panah.',
          '2️⃣ **Tabel Relasi** : kolom input X dan kolom output Y.',
          '3️⃣ **Diagram Cartesius** : titik koordinat (x, y).',
          '4️⃣ **Pasangan Berurutan** : himpunan {(x, y), ...}.',
          '💡 Keempat bentuk ini menyajikan relasi yang sama secara visual!'
        ],
        visual: {
          type: 'arrow_diagram',
          setA: ['1', '2'],
          setB: ['2', '4'],
          pairs: [['1', '2'], ['2', '4']],
          labelA: 'X (Asal)',
          labelB: 'Y (Kawan)',
          statusBadge: 'Bentuk 1: Diagram Panah',
          isFunction: true
        },
        diagram: null
      },
      {
        id: 8,
        type: 'interactive_table',
        title: 'Praktik: Lengkapi Tabel Data & Pasangan Berurutan!',
        emoji: '📊',
        instruction: 'Lengkapi kolom kosong pada tabel data untuk relasi "Setengah dari" dari Himpunan A = {1, 2, 3} ke B = {2, 4, 6}!',
        ruleText: 'Aturan: y = 2x ("x setengah dari y"). Isi nilai pasangan yang tepat!',
        columns: ['Nilai X', 'Aturan Relasi', 'Nilai Y', 'Pasangan (x, y)'],
        rows: [
          { id: 'r1', x: '1', rule: 'setengah dari', y: '2', pair: '(1, 2)', blankField: 'y' },
          { id: 'r2', x: '2', rule: 'setengah dari', y: '4', pair: '(2, 4)', blankField: 'pair' },
          { id: 'r3', x: '3', rule: 'setengah dari', y: '6', pair: '(3, 6)', blankField: 'y' },
        ],
        availableChips: ['2', '(2, 4)', '6', '(1, 4)', '5', '(3, 5)'],
        expectedAssignments: {
          r1: '2',
          r2: '(2, 4)',
          r3: '6',
        },
        successMessage: 'Hebat! Tabel data dan himpunan pasangan berurutan tersusun sempurna: {(1, 2), (2, 4), (3, 6)}! 🎉',
        hint: '1 setengah dari 2; 2 setengah dari 4 sehingga pasangannya (2, 4); 3 setengah dari 6.'
      },
      {
        id: 9,
        type: 'interactive_cartesian',
        title: 'Praktik: Plot Titik Koordinat pada Diagram Cartesius!',
        emoji: '📍',
        instruction: 'Tandai titik koordinat (x, y) di atas diagram Cartesius sesuai relasi "setengah dari": (1, 2), (2, 4), dan (3, 6)!',
        ruleText: 'Klik perpotongan garis untuk memasang/menghapus titik (1, 2), (2, 4), dan (3, 6).',
        minX: 0,
        maxX: 5,
        minY: 0,
        maxY: 7,
        labelX: 'Sumbu X (Domain: 1, 2, 3)',
        labelY: 'Sumbu Y (Kodomain: 2, 4, 6)',
        targetPoints: [[1, 2], [2, 4], [3, 6]],
        drawLine: false,
        successMessage: 'Luar biasa! Ketiga titik koordinat (1, 2), (2, 4), dan (3, 6) berhasil terplot dengan akurat di bidang Cartesius! 🎉',
        hint: 'Klik pada titik perpotongan: x = 1 naik ke y = 2; x = 2 naik ke y = 4; x = 3 naik ke y = 6.'
      },
      {
        id: 10,
        type: 'quiz',
        title: 'Kuis: 4 Representasi Relasi',
        emoji: '❓',
        isHots: true,
        hotsLevel: 'C4 Analisis',
        hotsBadge: 'TANTANGAN HOTS (C4 Analisis)',
        clue: 'Setiap baris tabel [x | y] bersesuaian langsung dengan titik koordinat (x, y) pada diagram Cartesius. Periksa kesesuaian posisi (x, y).',
        question: 'Perhatikan tabel relasi R di samping.\nManakah pernyataan yang BENAR mengenai representasi relasi ini?',
        visual: {
          type: 'relation_table',
          title: 'Tabel Data Relasi R',
          rule: 'Relasi R',
          headers: ['Nilai (x)', 'Hasil (y)'],
          pairs: [['1', 'a'], ['2', 'b'], ['3', 'b']],
          layout: 'vertical'
        },
        options: [
          'Pada diagram Cartesius, titik koordinatnya adalah (1, a), (2, b), dan (3, b)',
          'Relasi ini tidak bisa dibuatkan tabel karena nilai b dipakai dua kali',
          'Pasangan berurutan selalu menaruh himpunan kawan di posisi pertama',
          'Diagram Cartesius hanya berlaku untuk data yang berupa angka negatif'
        ],
        correct: 'Pada diagram Cartesius, titik koordinatnya adalah (1, a), (2, b), dan (3, b)',
        explanation: 'Setiap pasangan berurutan (x, y) bersesuaian langsung dengan titik koordinat (x, y) pada diagram Cartesius. ✅',
        remedial: {
          content: [
            'Hubungan 4 cara menyatakan relasi:',
            '• Panah x ➔ y',
            '• Pasangan (x, y)',
            '• Titik Cartesius (x, y)',
            '• Baris tabel [x | y]',
            'Semuanya menyajikan data pasangan yang persis sama!'
          ],
          retryQuestion: {
            question: 'Jika relasi disajikan dalam pasangan R = {(2, 4), (3, 6)}, maka pada diagram Cartesius titiknya berada di...',
            options: [
              '(4, 2) dan (6, 3)',
              '(2, 4) dan (3, 6)',
              '(2, 6) dan (3, 4)',
              '(2, 2) dan (3, 3)'
            ],
            correct: '(2, 4) dan (3, 6)',
            explanation: 'Titik koordinat Cartesius selalu mengikuti (x, y) yaitu (2, 4) dan (3, 6). ✅'
          }
        }
      },
      {
        id: 11,
        type: 'lesson',
        title: 'Ringkasan Chapter 1: Relasi',
        emoji: '📝',
        content: [
          '🎯 **Relasi** = aturan yang memasangkan anggota Himpunan Asal ke Himpunan Kawan.',
          '🪢 **Sifat Fleksibel** = anggota asal boleh bercabang ke banyak kawan dan boleh kosong.',
          '📊 **4 Cara Penyajian** = Diagram Panah, Tabel Relasi, Diagram Cartesius, dan Himpunan Pasangan Berurutan.'
        ],
        visual: {
          type: 'ordered_pairs',
          title: 'Himpunan Pasangan Berurutan Relasi',
          setName: 'R',
          rule: 'Makanan Kesukaan',
          pairs: [['Budi', 'Soto'], ['Budi', 'Bakso'], ['Siti', 'Bakso']],
          domain: ['Budi', 'Siti'],
          range: ['Soto', 'Bakso'],
          domainName: 'Nama (Domain)',
          rangeName: 'Menu (Range)'
        },
        diagram: null
      },
      {
        id: 12,
        type: 'quiz',
        title: 'Kuis Akhir Chapter 1',
        emoji: '🏆',
        isHots: true,
        hotsLevel: 'C4 Analisis',
        hotsBadge: 'TANTANGAN HOTS (C4 Analisis)',
        clue: 'Uji aturan "setengah dari": angka depan (x) bernilai separuh angka belakang (y). Contoh: 1 adalah setengah dari 2 ➔ (1, 2). Jangan sampai urutan pasangannya terbalik!',
        question: 'Perhatikan tabel relasi "setengah dari" di samping.\nHimpunan pasangan berurutan yang tepat adalah...',
        visual: {
          type: 'relation_table',
          title: 'Tabel Relasi "Setengah Dari"',
          rule: 'Setengah Dari',
          headers: ['Bilangan x', 'Bilangan y'],
          pairs: [['1', '2'], ['2', '4'], ['3', '6']],
          layout: 'vertical'
        },
        options: [
          'R = {(2, 1), (4, 2), (6, 3)}',
          'R = {(1, 1), (2, 2), (3, 3)}',
          'R = {(1, 6), (2, 4), (3, 2)}',
          'R = {(1, 2), (2, 4), (3, 6)}'
        ],
        correct: 'R = {(1, 2), (2, 4), (3, 6)}',
        explanation: '1 adalah setengah dari 2 ➔ (1, 2). 2 adalah setengah dari 4 ➔ (2, 4). 3 adalah setengah dari 6 ➔ (3, 6). ✅',
        remedial: {
          content: [
            'Langkah menguji aturan "setengah dari":',
            '• Ambil elemen A: 1 ➔ 1 adalah setengah dari 2 (ada di B) ➔ (1, 2)',
            '• Ambil elemen A: 2 ➔ 2 adalah setengah dari 4 (ada di B) ➔ (2, 4)',
            '• Ambil elemen A: 3 ➔ 3 adalah setengah dari 6 (ada di B) ➔ (3, 6)',
            'Himpunan pasangan berurutan: {(1, 2), (2, 4), (3, 6)}'
          ],
          retryQuestion: {
            question: 'A = {2, 3} dan B = {4, 6} dengan aturan "setengah dari". Himpunan pasangan berurutannya adalah...',
            options: [
              '{(4, 2), (6, 3)}',
              '{(2, 4), (3, 6)}',
              '{(2, 6), (3, 4)}',
              '{(2, 2), (3, 3)}'
            ],
            correct: '{(2, 4), (3, 6)}',
            explanation: '2 setengah dari 4, 3 setengah dari 6. Pasangan = {(2, 4), (3, 6)}. ✅'
          }
        }
      }
    ]
  },

  2: {
    id: 2,
    key: 'chapter2',
    title: 'Pengertian & Unsur Fungsi',
    subtitle: 'Apa itu fungsi? Domain, Kodomain, Range',
    icon: '🎯',
    color: '#2563EB',
    totalSegments: 10,
    segments: [
      {
        id: 1,
        type: 'lesson',
        title: 'Apa itu Fungsi?',
        emoji: '🤔',
        content: [
          '**Fungsi** (atau **pemetaan**) adalah relasi khusus yang menghubungkan **setiap** anggota himpunan asal ke **tepat satu** anggota himpunan kawan.',
          'Bayangkan mesin minuman otomatis: kamu memasukkan uang koin (input), lalu keluar **satu** jenis minuman (output). Satu koin → satu minuman. Itulah fungsi!',
          '📌 Dua kata kunci FUNGSI: **"Setiap"** elemen asal harus berpasangan, dan **"Tepat Satu"** (tidak boleh bercabang).'
        ],
        visual: {
          type: 'arrow_diagram',
          setA: ['Ani', 'Budi', 'Cici'],
          setB: ['Matematika', 'IPA', 'Bahasa'],
          pairs: [['Ani', 'Matematika'], ['Budi', 'IPA'], ['Cici', 'Bahasa']],
          labelA: 'Siswa (Domain)',
          labelB: 'Pelajaran (Kodomain)',
          statusBadge: 'Fungsi Sah (Tepat 1)',
          isFunction: true
        },
        diagram: {
          type: 'arrow',
          title: 'Contoh Fungsi',
          setA: ['Ani', 'Budi', 'Cici'],
          setB: ['Matematika', 'IPA', 'Bahasa'],
          arrows: [['Ani', 'Matematika'], ['Budi', 'IPA'], ['Cici', 'Bahasa']],
          caption: 'Setiap siswa punya tepat 1 mata pelajaran favorit ✅'
        }
      },
      {
        id: 2,
        type: 'lesson',
        title: 'Kapan BUKAN Fungsi?',
        emoji: '❌',
        content: [
          'Ada **2 alasan** kenapa sebuah relasi **BUKAN** fungsi:',
          '**1️⃣ Ada anggota di kiri yang bercabang** : satu orang punya 2 panah jawaban. Contoh: Dani suka Matematika DAN IPA sekaligus.',
          '**2️⃣ Ada anggota di kiri yang tidak punya pasangan** : satu orang tidak menjawab sama sekali (kosong).',
          '💡 Ingat rumus: Fungsi = Semua terpasang + Tidak ada yang mendua/bercabang!'
        ],
        visual: {
          type: 'arrow_diagram',
          setA: ['Dani (Cabang)', 'Eka', 'Fani (Kosong)'],
          setB: ['Matematika', 'IPA', 'Bahasa'],
          pairs: [['Dani', 'Matematika'], ['Dani', 'IPA'], ['Eka', 'Bahasa']],
          labelA: 'Domain Bermasalah',
          labelB: 'Kodomain',
          statusBadge: 'Bukan Fungsi',
          isFunction: false
        },
        diagram: {
          type: 'arrow',
          title: '❌ Bukan Fungsi (Bercabang & Kosong)',
          setA: ['Dani', 'Eka', 'Fani'],
          setB: ['Matematika', 'IPA', 'Bahasa'],
          arrows: [['Dani', 'Matematika'], ['Dani', 'IPA'], ['Eka', 'Bahasa']],
          caption: 'Dani punya 2 panah (bercabang), dan Fani tidak punya panah (kosong) ❌'
        }
      },
      {
        id: 3,
        type: 'quiz',
        title: 'Kuis: Fungsi atau Bukan?',
        emoji: '❓',
        clue: 'Periksa 2 syarat fungsi: (1) Semua anggota A punya panah, (2) Tidak ada anggota A yang bercabang (punya 2 panah).',
        question: 'Perhatikan diagram panah di samping.\nApakah relasi ini merupakan fungsi?',
        visual: {
          type: 'arrow_diagram',
          setA: ['1', '2', '3'],
          setB: ['a', 'b', 'c'],
          pairs: [['1', 'a'], ['2', 'b'], ['3', 'c']],
          labelA: 'Domain A',
          labelB: 'Kodomain B',
          statusBadge: 'Tepat 1 Pasangan',
          isFunction: true
        },
        options: [
          'Bukan fungsi, karena tidak ada rumus aljabar',
          'Ya, ini fungsi karena setiap anggota A punya tepat satu pasangan di B',
          'Bukan fungsi, karena elemen B belum terpakai semua',
          'Tidak dapat ditentukan'
        ],
        correct: 'Ya, ini fungsi karena setiap anggota A punya tepat satu pasangan di B',
        explanation: 'Setiap anggota A (1, 2, 3) punya tepat satu pasangan di B. Tidak ada yang bercabang dan tidak ada yang kosong. ✅',
        remedial: {
          content: [
            'Cara mudah cek fungsi atau bukan:',
            '✅ Cek 1: Semua anggota di kiri (Domain) HARUS punya panah',
            '✅ Cek 2: Setiap anggota di kiri HANYA BOLEH punya SATU panah',
            'Kalau dua syarat itu terpenuhi → itu FUNGSI!'
          ],
          retryQuestion: {
            question: 'A = {p, q, r} → B = {1, 2, 3}\nAturan: p→1, q→2, r→3\nApakah ini fungsi?',
            options: [
              'Bukan fungsi',
              'Tergantung nilainya',
              'Ya, ini fungsi',
              'Bukan, karena berupa huruf'
            ],
            correct: 'Ya, ini fungsi',
            explanation: 'Semua elemen A terhubung tepat ke 1 elemen B. Ini fungsi! ✅'
          }
        }
      },
      {
        id: 4,
        type: 'lesson',
        title: 'Bedanya Relasi & Fungsi',
        emoji: '⚖️',
        content: [
          '**Relasi** = aturan penghubung dua himpunan. Boleh bercabang, boleh kosong.',
          '**Fungsi** = relasi KHUSUS yang lebih ketat. Tidak boleh bercabang, tidak boleh kosong di domain.',
          '🔑 Jadi: **Semua fungsi adalah relasi, tapi TIDAK semua relasi adalah fungsi!**',
          'Analoginya: Semua kucing adalah hewan, tapi tidak semua hewan adalah kucing. 🐱'
        ],
        visual: {
          type: 'arrow_diagram',
          setA: ['Fungsi (Ketat)'],
          setB: ['Relasi (Umum)'],
          pairs: [['Fungsi (Ketat)', 'Relasi (Umum)']],
          labelA: 'Khusus',
          labelB: 'Semesta',
          statusBadge: 'Fungsi ⊆ Relasi',
          isFunction: true
        },
        diagram: null
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Kuis: Relasi vs Fungsi',
        emoji: '❓',
        clue: 'Analogi hewan & kucing: Semua kucing adalah hewan, tapi tidak semua hewan adalah kucing. Fungsi adalah jenis khusus dari relasi.',
        question: 'Perhatikan bagan konsep di samping.\nManakah pernyataan yang PALING BENAR tentang hubungan relasi dan fungsi?',
        visual: {
          type: 'arrow_diagram',
          setA: ['Fungsi (Ketat)'],
          setB: ['Relasi (Umum)'],
          pairs: [['Fungsi (Ketat)', 'Relasi (Umum)']],
          labelA: 'Konsep',
          labelB: 'Keluarga',
          statusBadge: 'Fungsi ⊆ Relasi',
          isFunction: true
        },
        options: [
          'Semua fungsi adalah relasi, tapi tidak semua relasi adalah fungsi',
          'Semua relasi pasti merupakan fungsi',
          'Fungsi dan relasi adalah hal yang sama persis tanpa perbedaan',
          'Fungsi tidak ada hubungannya sama sekali dengan relasi'
        ],
        correct: 'Semua fungsi adalah relasi, tapi tidak semua relasi adalah fungsi',
        explanation: 'Fungsi adalah relasi khusus yang memenuhi syarat "setiap elemen domain tepat satu pasangan". ✅',
        remedial: {
          content: [
            'Ingat analogi ini:',
            '🐱 Kucing → Hewan (semua kucing adalah hewan)',
            '🐕 Hewan → Kucing? TIDAK (ada anjing, ikan, dll)',
            'Sama: Fungsi adalah bagian dari relasi dengan syarat lebih ketat.'
          ],
          retryQuestion: {
            question: 'Apakah BENAR bahwa setiap fungsi pasti merupakan relasi?',
            options: [
              'Salah, fungsi berdiri sendiri',
              'Benar, fungsi adalah jenis relasi yang memiliki syarat khusus',
              'Salah, relasi lebih sempit daripada fungsi',
              'Hanya benar untuk bilangan pecahan'
            ],
            correct: 'Benar, fungsi adalah jenis relasi yang memiliki syarat khusus',
            explanation: 'Ya! Fungsi adalah jenis relasi yang khusus (lebih ketat aturannya). ✅'
          }
        }
      },
      {
        id: 6,
        type: 'lesson',
        title: 'Domain (Daerah Asal)',
        emoji: '📥',
        content: [
          '**Domain** = himpunan semua anggota yang menjadi **input** (masukan) fungsi.',
          'Domain berada di **sisi kiri** diagram panah.',
          'Contoh: Jika f menghubungkan siswa ke nilai ujian:\n• Domain = {Ani, Budi, Cici} (seluruh siswa)',
          '📌 Domain disimbolkan sebagai **Df** atau **daerah asal f**.'
        ],
        visual: {
          type: 'relation_table',
          title: 'Tabel Relasi Siswa & Nilai Ujian',
          headers: ['Domain (Siswa)', 'Nilai Ujian'],
          pairs: [['Ani', '85'], ['Budi', '90'], ['Cici', '78']],
          layout: 'vertical'
        },
        diagram: {
          type: 'highlight',
          title: 'Domain ditandai 🟦',
          setA: ['Ani 🟦', 'Budi 🟦', 'Cici 🟦'],
          setB: ['85', '90', '78'],
          arrows: [['Ani', '85'], ['Budi', '90'], ['Cici', '78']],
          caption: 'Domain = {Ani, Budi, Cici}'
        }
      },
      {
        id: 7,
        type: 'lesson',
        title: 'Kodomain & Range',
        emoji: '📤',
        content: [
          '**Kodomain** = himpunan semua anggota yang MUNGKIN menjadi **output**. Kodomain ada di **sisi kanan** diagram.',
          '**Range** = anggota kodomain yang BENAR-BENAR terpasangkan (terkena panah). Range ⊆ Kodomain.',
          'Contoh: Kodomain = {85, 90, 78, 95}\nRange = {85, 90, 78} (yang terkena panah)',
          '💡 Perbedaan: Kodomain = semua pilihan yang ada di kanan. Range = yang benar-benar terpilih.'
        ],
        visual: {
          type: 'arrow_diagram',
          setA: ['Siswa 1', 'Siswa 2', 'Siswa 3'],
          setB: ['Nilai 85', 'Nilai 90', 'Nilai 78', 'Nilai 95'],
          pairs: [['Siswa 1', 'Nilai 85'], ['Siswa 2', 'Nilai 90'], ['Siswa 3', 'Nilai 78']],
          labelA: 'Domain',
          labelB: 'Kodomain',
          highlightRange: ['Nilai 85', 'Nilai 90', 'Nilai 78'],
          statusBadge: 'Range ⊆ Kodomain'
        },
        diagram: null
      },
      {
        id: 8,
        type: 'quiz',
        title: 'Kuis: Domain, Kodomain, Range',
        emoji: '❓',
        isHots: true,
        hotsLevel: 'C4 Analisis',
        hotsBadge: 'TANTANGAN HOTS (C4 Analisis)',
        clue: 'Range HANYA mengambil elemen himpunan kawan (kanan) yang benar-benar tersambung pasangan panah. Elemen kodomain yang tidak tersambung jangan dimasukkan ke Range!',
        question: 'Perhatikan himpunan pasangan berurutan fungsi f di samping: f = {(1, a), (2, b), (3, a)} dengan Kodomain B = {a, b, c}.\nBerapakah Range (daerah hasil) dari fungsi f?',
        visual: {
          type: 'ordered_pairs',
          title: 'Himpunan Pasangan Berurutan Fungsi f',
          setName: 'f',
          pairs: [['1', 'a'], ['2', 'b'], ['3', 'a']],
          domain: ['1', '2', '3'],
          range: ['a', 'b'],
          domainName: 'Domain (Asal)',
          rangeName: 'Range (Hasil)'
        },
        options: [
          '{1, 2, 3}',
          '{a, b, c}',
          '{a}',
          '{a, b}'
        ],
        correct: '{a, b}',
        explanation: 'Range = anggota B yang benar-benar menjadi pasangan. Elemen "a" dan "b" terkena panah, tapi "c" tidak. Jadi Range = {a, b}. ✅',
        remedial: {
          content: [
            'Cara menentukan Range:',
            '1️⃣ Lihat sisi kanan (B)',
            '2️⃣ Ambil elemen yang ada di dalam pasangan: (1, a) ➔ a, (2, b) ➔ b, (3, a) ➔ a',
            '3️⃣ Kumpulkan tanpa duplikat: {a, b}',
            'Huruf "c" tidak dipilih, jadi "c" bukan Range.'
          ],
          retryQuestion: {
            question: 'Fungsi g = {(x, 1), (y, 2), (z, 1)} dengan B = {1, 2, 3}.\nRange dari g adalah...',
            options: [
              '{1, 2}',
              '{1, 2, 3}',
              '{x, y, z}',
              '{1}'
            ],
            correct: '{1, 2}',
            explanation: 'Yang terpilih di B hanya angka 1 dan 2. Range = {1, 2}. ✅'
          }
        }
      },
      {
        id: 9,
        type: 'lesson',
        title: 'Ringkasan Chapter 2',
        emoji: '📝',
        content: [
          '🎯 **Fungsi** = setiap elemen Domain punya TEPAT SATU pasangan di Kodomain.',
          '❌ **Bukan Fungsi** jika: ada yang bercabang ATAU ada yang tidak punya pasangan.',
          '📥 **Domain** = himpunan input asal (sisi kiri).',
          '📤 **Kodomain** = seluruh himpunan tujuan kawan (sisi kanan).',
          '🎯 **Range** = kodomain yang terkena panah pasangan (Range ⊆ Kodomain).'
        ],
        visual: {
          type: 'relation_table',
          title: 'Tabel Pemetaan Fungsi f',
          headers: ['Domain (x)', 'Range (y)'],
          pairs: [['1', 'a'], ['2', 'b'], ['3', 'a']]
        },
        diagram: null
      },
      {
        id: 10,
        type: 'quiz',
        title: 'Kuis Akhir Chapter 2',
        emoji: '🏆',
        isHots: true,
        hotsLevel: 'C5 Evaluasi',
        hotsBadge: 'TANTANGAN HOTS (C5 Evaluasi)',
        clue: 'Evaluasi satu per satu: Domain = seluruh elemen A, Kodomain = seluruh elemen B, Range = elemen B yang punya panah pasangan (periksa apakah elemen s memiliki pasangan atau tidak).',
        question: 'Perhatikan diagram panah relasi di samping.\nDomain, Kodomain, dan Range berturut-turut adalah...',
        visual: {
          type: 'arrow_diagram',
          setA: ['1', '2', '3', '4'],
          setB: ['p', 'q', 'r', 's'],
          pairs: [['1', 'p'], ['2', 'q'], ['3', 'p'], ['4', 'r']],
          labelA: 'Domain A',
          labelB: 'Kodomain B',
          statusBadge: 'Fungsi Sah',
          isFunction: true
        },
        options: [
          'Domain={p,q,r,s}, Kodomain={1,2,3,4}, Range={p,q,r}',
          'Domain={1,2,3,4}, Kodomain={p,q,r}, Range={p,q,r,s}',
          'Domain={1,2,3,4}, Kodomain={p,q,r,s}, Range={p,q,r}',
          'Domain={1,2,3,4}, Kodomain={p,q,r,s}, Range={p,q,r,s}'
        ],
        correct: 'Domain={1,2,3,4}, Kodomain={p,q,r,s}, Range={p,q,r}',
        explanation: 'Domain = A = {1,2,3,4}. Kodomain = B = {p,q,r,s}. Range = yang terkena panah = {p,q,r} (elemen s tidak terkena panah). ✅',
        remedial: {
          content: [
            'Langkah-langkah penentuan:',
            '1️⃣ Domain = seluruh himpunan A (input) = {1, 2, 3, 4}',
            '2️⃣ Kodomain = seluruh himpunan B (output) = {p, q, r, s}',
            '3️⃣ Range = elemen B yang punya pasangan: p, q, r. (s tidak kena).',
            'Maka Range = {p, q, r}'
          ],
          retryQuestion: {
            question: 'f = {(a,1), (b,2), (c,3)}\nA = {a,b,c}, B = {1,2,3,4}\nRange dari f adalah...',
            options: [
              '{1, 2, 3, 4}',
              '{a, b, c}',
              '{1}',
              '{1, 2, 3}'
            ],
            correct: '{1, 2, 3}',
            explanation: 'Yang kena panah di B: 1, 2, 3. Angka 4 tidak kena. Range = {1, 2, 3}. ✅'
          }
        }
      }
    ]
  },

  3: {
    id: 3,
    key: 'chapter3',
    title: 'Notasi & Rumus Fungsi',
    subtitle: 'f(x) = ax + b, menghitung nilai fungsi',
    icon: '📐',
    color: '#059669',
    totalSegments: USE_CHAPTER3_VIDEO ? 4 : 10,
    isVideoChapter: USE_CHAPTER3_VIDEO,
    segments: USE_CHAPTER3_VIDEO ? CHAPTER3_VIDEO_SEGMENTS : CHAPTER3_CLASSIC_SEGMENTS
  },

  4: {
    id: 4,
    key: 'chapter4',
    title: 'Grafik Fungsi Linear',
    subtitle: 'Menggambar & membaca grafik f(x) = ax + b',
    icon: '📊',
    color: '#0284C7',
    totalSegments: 10,
    segments: [
      {
        id: 1,
        type: 'lesson',
        title: 'Apa itu Grafik Fungsi?',
        emoji: '📈',
        content: [
          '**Grafik fungsi** adalah gambar titik-titik (x, y) yang memenuhi rumus fungsi di **bidang Cartesius**.',
          'Bidang Cartesius punya dua garis utama:\n• **Sumbu X** (garis mendatar) → tempat menuliskan nilai input x\n• **Sumbu Y** (garis tegak) → tempat menuliskan nilai output f(x)',
          '💡 Grafik fungsi linear (f(x) = ax + b) selalu berbentuk **garis lurus**!'
        ],
        visual: {
          type: 'cartesian_graph',
          slope: 2,
          yIntercept: 1,
          formula: 'f(x) = 2x + 1',
          trend: 'naik',
          testPoints: [[1, 3], [2, 5]]
        },
        diagram: null
      },
      {
        id: 2,
        type: 'interactive_cartesian',
        title: 'Praktik: Gambar Garis Grafik f(x) = 2x + 1!',
        emoji: '📈',
        instruction: 'Tandai titik koordinat fungsi linear f(x) = 2x + 1 di bidang Cartesius: titik (0, 1), (1, 3), dan (2, 5) untuk menarik garis grafik!',
        ruleText: 'Rumus: f(x) = 2x + 1. Titik uji: (0, 1), (1, 3), dan (2, 5). Klik pada grid untuk memasang titik.',
        minX: 0,
        maxX: 4,
        minY: 0,
        maxY: 6,
        labelX: 'Sumbu X (Input x)',
        labelY: 'Sumbu Y (Output f(x))',
        targetPoints: [[0, 1], [1, 3], [2, 5]],
        drawLine: true,
        successMessage: 'Sempurna! Ketiga titik berhasil diplot dan otomatis membentuk garis lurus fungsi linear f(x) = 2x + 1! 🎉',
        hint: 'Klik pada titik (0, 1), (1, 3), dan (2, 5). Garis lurus akan otomatis terbentuk menghubungkan titik-titik tersebut.'
      },
      {
        id: 3,
        type: 'quiz',
        title: 'Kuis: Titik pada Grafik',
        emoji: '❓',
        clue: 'Uji nilai x pada opsi ke rumus f(x) = x + 3. Cek apakah hasil perhitungannya persis sama dengan nilai y pada pasangan titik tersebut.',
        question: 'Perhatikan lintasan grafik f(x) = x + 3 di samping.\nManakah titik yang terletak pada grafik fungsi tersebut?',
        visual: {
          type: 'cartesian_graph',
          slope: 1,
          yIntercept: 3,
          formula: 'f(x) = x + 3',
          trend: 'naik',
          testPoints: [[2, 5]]
        },
        options: [
          '(2, 6)',
          '(3, 3)',
          '(1, 5)',
          '(2, 5)'
        ],
        correct: '(2, 5)',
        explanation: 'Uji x = 2: f(2) = 2 + 3 = 5. Karena y = 5, maka titik (2, 5) terletak pada grafik fungsi. ✅',
        remedial: {
          content: [
            'Cara menguji titik (x, y):',
            '1️⃣ Ambil nilai x dari opsi titik',
            '2️⃣ Masukkan ke rumus f(x)',
            '3️⃣ Jika hasilnya sama dengan nilai y ➔ titik terletak di garis.',
            'Uji (2, 5): f(2) = 2 + 3 = 5 ✅ (Cocok)'
          ],
          retryQuestion: {
            question: 'f(x) = 2x − 1. Manakah titik yang terletak pada grafik?',
            options: [
              '(3, 5)',
              '(3, 7)',
              '(2, 5)',
              '(1, 3)'
            ],
            correct: '(3, 5)',
            explanation: 'f(3) = 2(3) − 1 = 5. Titik (3, 5) terletak pada grafik fungsi. ✅'
          }
        }
      },
      {
        id: 4,
        type: 'lesson',
        title: 'Titik Potong Sumbu',
        emoji: '✂️',
        content: [
          'Titik potong garis terhadap sumbu koordinat:',
          '• **Titik potong sumbu Y** ➔ terjadi saat x = 0.\nf(x) = 2x + 3 → f(0) = 3 → Koordinat: **(0, 3)**.',
          '• **Titik potong sumbu X** ➔ terjadi saat f(x) = 0.\n2x + 3 = 0 → 2x = −3 → x = −1.5 → Koordinat: **(−1.5, 0)**.',
          '💡 Tips Cepat: Pada f(x) = ax + b, titik potong sumbu Y selalu di titik **(0, b)**.'
        ],
        visual: {
          type: 'cartesian_graph',
          slope: 2,
          yIntercept: 3,
          xIntercept: -1.5,
          formula: 'f(x) = 2x + 3',
          trend: 'naik',
          minX: -2,
          maxX: 4,
          minY: -2,
          maxY: 8
        },
        diagram: null
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Kuis: Titik Potong Sumbu Y',
        emoji: '❓',
        clue: 'Titik potong sumbu Y selalu memiliki nilai x = 0. Masukkan nilai x = 0 ke rumus fungsi f(x) = 3x - 6.',
        question: 'Perhatikan lintasan grafik f(x) = 3x − 6 di samping.\nGrafik memotong sumbu Y di titik...',
        visual: {
          type: 'cartesian_graph',
          slope: 3,
          yIntercept: -6,
          formula: 'f(x) = 3x - 6',
          trend: 'naik',
          minX: -1,
          maxX: 5,
          minY: -8,
          maxY: 6
        },
        options: [
          '(0, 6)',
          '(0, −6)',
          '(2, 0)',
          '(−6, 0)'
        ],
        correct: '(0, −6)',
        explanation: 'Potong sumbu Y artinya x = 0. f(0) = 3(0) − 6 = −6. Koordinat titik potongnya adalah (0, −6). ✅',
        remedial: {
          content: [
            'Titik potong sumbu Y selalu memiliki x = 0.',
            'Masukkan x = 0 ke rumus:',
            'f(0) = 3(0) − 6 = 0 − 6 = −6',
            'Titik = (0, −6)'
          ],
          retryQuestion: {
            question: 'Grafik g(x) = 2x + 4 memotong sumbu Y di titik...',
            options: [
              '(4, 0)',
              '(0, 2)',
              '(0, 4)',
              '(2, 0)'
            ],
            correct: '(0, 4)',
            explanation: 'x = 0 ➔ g(0) = 2(0) + 4 = 4. Titik = (0, 4) ✅'
          }
        }
      },
      {
        id: 6,
        type: 'lesson',
        title: 'Gradien (Kemiringan Garis)',
        emoji: '📐',
        content: [
          '**Gradien** (m) menunjukkan seberapa miring sebuah garis.',
          'Pada rumus f(x) = ax + b, **gradien = nilai a** (angka di depan x).',
          '• Jika a > 0 (positif) → garis **naik ke kanan** ↗',
          '• Jika a < 0 (negatif) → garis **turun ke kanan** ↘',
          '• Jika a = 0 → garis **mendatar** →',
          'Contoh: f(x) = 3x − 2 punya gradien m = 3 (garis naik curam).'
        ],
        visual: {
          type: 'cartesian_graph',
          slope: 3,
          yIntercept: -2,
          formula: 'f(x) = 3x - 2',
          trend: 'naik',
          minX: -1,
          maxX: 4,
          minY: -4,
          maxY: 8,
          testPoints: [[1, 1], [2, 4]]
        },
        diagram: null
      },
      {
        id: 7,
        type: 'quiz',
        title: 'Kuis: Menentukan Gradien',
        emoji: '❓',
        clue: 'Pada rumus f(x) = ax + b, gradien adalah nilai koefisien a di depan x. Tanda minus (-) menunjukkan garis menurun ke arah kanan ↘.',
        question: 'Perhatikan grafik f(x) = −3x + 5 di samping.\nBagaimanakah karakteristik bentuk kemiringan grafik garisnya?',
        visual: {
          type: 'cartesian_graph',
          slope: -3,
          yIntercept: 5,
          formula: 'f(x) = -3x + 5',
          trend: 'turun',
          minX: -1,
          maxX: 4,
          minY: -5,
          maxY: 8,
          testPoints: [[1, 2]]
        },
        options: [
          'Garis turun ke kanan (↘) dengan gradien −3',
          'Garis naik ke kanan (↗) dengan gradien 3',
          'Garis mendatar horizontal tanpa kemiringan',
          'Garis naik ke kanan (↗) dengan gradien 5'
        ],
        correct: 'Garis turun ke kanan (↘) dengan gradien −3',
        explanation: 'Nilai koefisien a = −3 (negatif). Karena a negatif, garis turun ke kanan dengan gradien m = −3. ✅',
        remedial: {
          content: [
            'Pada bentuk f(x) = ax + b:',
            '• Gradien m = a (angka di depan x)',
            '• Pada f(x) = −3x + 5, angka di depan x adalah −3',
            '• Tanda negatif artinya garis turun ke arah kanan ↘'
          ],
          retryQuestion: {
            question: 'g(x) = 4x − 2. Gradien kemiringan garisnya adalah...',
            options: [
              '−2',
              '2',
              '−4',
              '4'
            ],
            correct: '4',
            explanation: 'Koefisien x adalah 4, maka gradiennya adalah 4. ✅'
          }
        }
      },
      {
        id: 8,
        type: 'lesson',
        title: 'Gradien dari Dua Titik Koordinat',
        emoji: '👀',
        content: [
          'Kalau kita tahu dua titik pada garis, kita bisa hitung gradiennya pakai rumus:',
          '**m = (y₂ − y₁) / (x₂ − x₁)**',
          'Contoh: garis lewat titik (1, 3) dan (3, 9):',
          '• m = (9 − 3) / (3 − 1) = 6 / 2 = **3**',
          'Artinya: setiap geser 1 langkah ke kanan, nilai Y naik 3 langkah.'
        ],
        visual: {
          type: 'cartesian_graph',
          slope: 3,
          yIntercept: 0,
          formula: 'm = (9-3)/(3-1) = 3',
          trend: 'naik',
          minX: 0,
          maxX: 4,
          minY: 0,
          maxY: 10,
          testPoints: [[1, 3], [3, 9]]
        },
        diagram: null
      },
      {
        id: 9,
        type: 'quiz',
        title: 'Kuis: Gradien dari 2 Titik',
        emoji: '❓',
        isHots: true,
        hotsLevel: 'C4 Analisis',
        hotsBadge: 'TANTANGAN HOTS (C4 Analisis)',
        clue: 'Gunakan rumus gradien m = (y₂ - y₁) / (x₂ - x₁): hitung selisih nilai y (9 - 3), lalu bagi dengan selisih nilai x (3 - 1).',
        question: 'Perhatikan grafik garis melalui titik (1, 3) dan (3, 9) di samping.\nGradien garis tersebut adalah...',
        visual: {
          type: 'cartesian_graph',
          slope: 3,
          yIntercept: 0,
          formula: 'Titik (1,3) & (3,9)',
          trend: 'naik',
          minX: 0,
          maxX: 4,
          minY: 0,
          maxY: 10,
          testPoints: [[1, 3], [3, 9]]
        },
        options: [
          '6',
          '2',
          '3',
          '4'
        ],
        correct: '3',
        explanation: 'm = (y₂ − y₁) / (x₂ − x₁) = (9 − 3) / (3 − 1) = 6 / 2 = 3 ✅',
        remedial: {
          content: [
            'Rumus gradien 2 titik:',
            'm = (y₂ − y₁) / (x₂ − x₁)',
            'Titik 1: x₁ = 1, y₁ = 3',
            'Titik 2: x₂ = 3, y₂ = 9',
            'm = (9 − 3) / (3 − 1) = 6 / 2 = 3'
          ],
          retryQuestion: {
            question: 'Garis melalui titik (2, 1) dan (4, 7). Gradiennya adalah...',
            options: [
              '2',
              '3',
              '6',
              '4'
            ],
            correct: '3',
            explanation: 'm = (7 − 1) / (4 − 2) = 6 / 2 = 3 ✅'
          }
        }
      },
      {
        id: 10,
        type: 'quiz',
        title: 'Kuis Akhir Chapter 4',
        emoji: '🏆',
        isHots: true,
        hotsLevel: 'C5 Evaluasi',
        hotsBadge: 'TANTANGAN HOTS (C5 Evaluasi)',
        clue: 'Garis memotong sumbu X saat nilai output f(x) = 0. Selesaikan persamaan linear 2x - 4 = 0 untuk memperoleh koordinat (x, 0).',
        question: 'Perhatikan lintasan grafik f(x) = 2x − 4 di samping.\nGrafik memotong sumbu X di titik...',
        visual: {
          type: 'cartesian_graph',
          slope: 2,
          yIntercept: -4,
          xIntercept: 2,
          formula: 'f(x) = 2x - 4',
          trend: 'naik',
          minX: -1,
          maxX: 5,
          minY: -6,
          maxY: 6
        },
        options: [
          '(2, 0)',
          '(0, −4)',
          '(−2, 0)',
          '(4, 0)'
        ],
        correct: '(2, 0)',
        explanation: 'Potong sumbu X artinya f(x) = 0. 2x − 4 = 0 → 2x = 4 → x = 2. Titik koordinat = (2, 0). ✅',
        remedial: {
          content: [
            'Langkah mencari titik potong sumbu X:',
            '1️⃣ Buat f(x) = 0',
            '2️⃣ 2x − 4 = 0',
            '3️⃣ 2x = 4 → x = 2',
            '4️⃣ Titik potongnya = (2, 0)'
          ],
          retryQuestion: {
            question: 'Grafik g(x) = 3x − 9 memotong sumbu X di titik...',
            options: [
              '(3, 0)',
              '(0, −9)',
              '(9, 0)',
              '(−3, 0)'
            ],
            correct: '(3, 0)',
            explanation: '3x − 9 = 0 → 3x = 9 → x = 3. Titik potong = (3, 0) ✅'
          }
        }
      }
    ]
  },

  5: {
    id: 5,
    key: 'chapter5',
    title: 'Korespondensi Satu-Satu',
    subtitle: 'Pemetaan bijektif, syarat & menghitung n!',
    icon: '🔗',
    color: '#DC2626',
    totalSegments: 8,
    segments: [
      {
        id: 1,
        type: 'lesson',
        title: 'Apa itu Korespondensi Satu-Satu?',
        emoji: '🤝',
        content: [
          '**Korespondensi satu-satu** adalah fungsi khusus di mana setiap anggota A dipasangkan dengan **tepat satu** anggota B, dan **sebaliknya**.',
          'Artinya:\n✅ Setiap anggota A punya tepat 1 pasangan di B\n✅ Setiap anggota B juga punya tepat 1 pasangan dari A\n✅ Arah panah **BOLEH BERSILANGAN** (pasangan tepat satu BUKAN berarti harus sejajar lurus)!\n✅ Tidak ada yang mendua, tidak ada yang kosong/nganggur',
          '🎯 Dalam matematika, istilah lainnya adalah **fungsi bijektif** (satu lawan satu sempurna).'
        ],
        visual: {
          type: 'one_to_one_board',
          setA: ['Ani', 'Budi', 'Cici'],
          setB: ['Kursi 1', 'Kursi 2', 'Kursi 3'],
          pairs: [['Ani', 'Kursi 2'], ['Budi', 'Kursi 3'], ['Cici', 'Kursi 1']],
          title: 'Korespondensi Satu-Satu (Bersilangan)',
          sizeN: 3,
          permutations: '3! = 6 cara'
        },
        diagram: {
          type: 'arrow',
          title: '✅ Korespondensi Satu-Satu (Bersilangan)',
          setA: ['Ani', 'Budi', 'Cici'],
          setB: ['Kursi 1', 'Kursi 2', 'Kursi 3'],
          arrows: [['Ani', 'Kursi 2'], ['Budi', 'Kursi 3'], ['Cici', 'Kursi 1']],
          caption: 'Panah bersilangan tetap sah korespondensi satu-satu: 1 siswa tepat 1 kursi, 1 kursi tepat 1 siswa! ✅'
        }
      },
      {
        id: 2,
        type: 'lesson',
        title: 'Syarat Korespondensi Satu-Satu',
        emoji: '📋',
        content: [
          '**Syarat mutlak:** Banyaknya anggota Himpunan A harus **sama persis** dengan banyaknya anggota Himpunan B.',
          '**n(A) = n(B)**',
          'Contoh:\n✅ A = {1, 2, 3} dan B = {a, b, c} → n(A) = n(B) = 3 → BISA dibentuk korespondensi satu-satu.\n❌ A = {1, 2, 3} dan B = {a, b} → n(A) ≠ n(B) → TIDAK BISA dibentuk korespondensi satu-satu.',
          '💡 Jika jumlah anggotanya berbeda, pasti akan ada elemen yang berbagi atau tersisa!'
        ],
        visual: {
          type: 'one_to_one_board',
          setA: ['1', '2', '3'],
          setB: ['a', 'b', 'c'],
          pairs: [['1', 'b'], ['2', 'c'], ['3', 'a']],
          title: 'Syarat: n(A) = n(B)',
          sizeN: 3,
          permutations: 'n(A) = n(B) = 3'
        },
        diagram: null
      },
      {
        id: 3,
        type: 'quiz',
        title: 'Kuis: Syarat Korespondensi',
        emoji: '❓',
        clue: 'Hitung banyaknya anggota himpunan n(A) dan n(B). Syarat wajib korespondensi satu-satu adalah n(A) = n(B).',
        question: 'Perhatikan papan himpunan A dan B di samping.\nApakah antara kedua himpunan dapat dibentuk korespondensi satu-satu?',
        visual: {
          type: 'one_to_one_board',
          setA: ['p', 'q', 'r', 's'],
          setB: ['1', '2', '3', '4'],
          pairs: [['p', '3'], ['q', '1'], ['r', '4'], ['s', '2']],
          title: 'Uji Syarat n(A) = n(B)',
          sizeN: 4,
          permutations: 'n(A) = n(B) = 4'
        },
        options: [
          'Ya, dapat dibentuk karena n(A) = n(B) = 4',
          'Tidak bisa, karena jenis elemennya berbeda (huruf vs angka)',
          'Hanya bisa jika disusun secara berurutan',
          'Tidak dapat ditentukan tanpa rumus fungsi'
        ],
        correct: 'Ya, dapat dibentuk karena n(A) = n(B) = 4',
        explanation: 'Syarat utama korespondensi satu-satu adalah n(A) = n(B). Karena sama-sama memiliki 4 anggota, korespondensi satu-satu bisa dibentuk. ✅',
        remedial: {
          content: [
            'Syarat korespondensi satu-satu:',
            '1️⃣ Hitung n(A) = jumlah anggota A',
            '2️⃣ Hitung n(B) = jumlah anggota B',
            '3️⃣ Jika n(A) = n(B) ➔ BISA!',
            'Jenis isi elemen (huruf, angka, nama) tidak menjadi masalah.'
          ],
          retryQuestion: {
            question: 'A = {a, b} dan B = {1, 2, 3}. Apakah bisa dibentuk korespondensi satu-satu?',
            options: [
              'Ya, bisa',
              'Tergantung aturannya',
              'Bisa jika elemen 3 diabaikan',
              'Tidak bisa, karena n(A) ≠ n(B)'
            ],
            correct: 'Tidak bisa, karena n(A) ≠ n(B)',
            explanation: 'n(A) = 2 sedangkan n(B) = 3. Karena jumlahnya beda, tidak bisa korespondensi satu-satu. ✅'
          }
        }
      },
      {
        id: 4,
        type: 'lesson',
        title: 'Menghitung Banyaknya Korespondensi',
        emoji: '🔢',
        content: [
          'Jika n(A) = n(B) = n, maka banyaknya korespondensi satu-satu yang mungkin dibentuk adalah **n!** (n faktorial).',
          '**Rumus: n! = n × (n−1) × (n−2) × ... × 2 × 1**',
          'Contoh perhitungan:\n• n = 2 → 2! = 2 × 1 = **2** cara\n• n = 3 → 3! = 3 × 2 × 1 = **6** cara\n• n = 4 → 4! = 4 × 3 × 2 × 1 = **24** cara',
          '💡 Analoginya: 3 orang memilih 3 kursi antrean menghasilkan 6 kombinasi susunan tempat duduk berbeda.'
        ],
        visual: {
          type: 'one_to_one_board',
          setA: ['A', 'B', 'C'],
          setB: ['1', '2', '3'],
          pairs: [['A', '2'], ['B', '3'], ['C', '1']],
          title: 'Rumus Faktorial: n!',
          sizeN: 3,
          permutations: '3! = 3 × 2 × 1 = 6'
        },
        diagram: null
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Kuis: Hitung Nilai Faktorial n!',
        emoji: '❓',
        isHots: true,
        hotsLevel: 'C4 Analisis',
        hotsBadge: 'TANTANGAN HOTS (C4 Analisis)',
        clue: 'Gunakan rumus n faktorial: hitung 4! = 4 × 3 × 2 × 1 untuk permutasi 4 pasangan satu-satu.',
        question: 'Perhatikan papan 4 anggota di samping.\nBerapa banyakkah korespondensi satu-satu yang dapat dibentuk dari A ke B?',
        visual: {
          type: 'one_to_one_board',
          setA: ['a', 'b', 'c', 'd'],
          setB: ['1', '2', '3', '4'],
          pairs: [['a', '3'], ['b', '1'], ['c', '4'], ['d', '2']],
          title: 'Hitung 4! Cara',
          sizeN: 4,
          permutations: '4! = 24 cara'
        },
        options: [
          '16',
          '8',
          '24',
          '4'
        ],
        correct: '24',
        explanation: 'n(A) = n(B) = 4. Banyak korespondensi = 4! = 4 × 3 × 2 × 1 = 24 cara. ✅',
        remedial: {
          content: [
            'Langkah menghitung 4!:',
            '4! = 4 × 3 × 2 × 1',
            '4 × 3 = 12',
            '12 × 2 = 24',
            '24 × 1 = 24'
          ],
          retryQuestion: {
            question: 'A = {x, y, z} dan B = {1, 2, 3}.\nBanyak korespondensi satu-satu yang mungkin adalah...',
            options: [
              '6',
              '9',
              '3',
              '27'
            ],
            correct: '6',
            explanation: 'n = 3 → 3! = 3 × 2 × 1 = 6 cara. ✅'
          }
        }
      },
      {
        id: 6,
        type: 'lesson',
        title: 'Penerapan di Dunia Nyata',
        emoji: '🌍',
        content: [
          '**Contoh korespondensi satu-satu dalam kehidupan sehari-hari:**',
          '🆔 Setiap WNI memiliki **tepat satu** Nomor Induk Kependudukan (NIK/KTP), dan setiap NIK hanya dimiliki **tepat satu** orang.',
          '🚗 Setiap kendaraan terdaftar memiliki **tepat satu** nomor plat unik.',
          '🎒 Setiap peserta ujian duduk di **tepat satu** nomor meja ujian.',
          '📌 Ciri khas: Bersifat **unik & eksklusif** (satu lawan satu, tidak ada duplikasi).'
        ],
        visual: {
          type: 'one_to_one_board',
          setA: ['WNI 1', 'WNI 2', 'WNI 3'],
          setB: ['NIK 001', 'NIK 002', 'NIK 003'],
          pairs: [['WNI 1', 'NIK 002'], ['WNI 2', 'NIK 003'], ['WNI 3', 'NIK 001']],
          title: 'Unik & Eksklusif',
          sizeN: 3,
          permutations: '1 WNI = 1 NIK'
        },
        diagram: null
      },
      {
        id: 7,
        type: 'quiz',
        title: 'Kuis: Penerapan Nyata',
        emoji: '❓',
        clue: 'Korespondensi satu-satu wajib unik dan eksklusif: tidak boleh banyak orang memiliki hal yang sama, dan tidak boleh satu orang memiliki banyak hal sekaligus.',
        question: 'Manakah situasi di bawah ini yang merupakan contoh korespondensi satu-satu?',
        visual: {
          type: 'one_to_one_board',
          setA: ['Siswa 1', 'Siswa 2', 'Siswa 3'],
          setB: ['Absen 01', 'Absen 02', 'Absen 03'],
          pairs: [['Siswa 1', 'Absen 02'], ['Siswa 2', 'Absen 03'], ['Siswa 3', 'Absen 01']],
          title: 'Penerapan di Sekolah',
          sizeN: 3,
          permutations: '1 Siswa = 1 Absen'
        },
        options: [
          'Beberapa siswa menyukai cabang olahraga yang sama',
          'Setiap siswa di kelas memiliki tepat satu nomor absen unik yang tidak dimiliki siswa lain',
          'Satu orang guru mengajar banyak kelas di sekolah',
          'Satu mata pelajaran diajarkan oleh beberapa guru berbeda'
        ],
        correct: 'Setiap siswa di kelas memiliki tepat satu nomor absen unik yang tidak dimiliki siswa lain',
        explanation: 'Nomor absen bersifat satu lawan satu: 1 siswa punya 1 nomor unik, dan 1 nomor hanya milik 1 siswa. ✅',
        remedial: {
          content: [
            'Korespondensi satu-satu mensyaratkan:',
            '• Tidak boleh berbagi: hobi bisa sama ➔ bukan satu-satu',
            '• Guru mengajar banyak kelas ➔ bercabang ➔ bukan satu-satu',
            '• Nomor absen ➔ unik dan eksklusif ➔ korespondensi satu-satu'
          ],
          retryQuestion: {
            question: 'Manakah yang BUKAN merupakan korespondensi satu-satu?',
            options: [
              'Setiap kunci membuka tepat satu gembok unik',
              'Beberapa orang memiliki golongan darah yang sama',
              'Setiap negara memiliki tepat satu lagu kebangsaan',
              'Setiap siswa memiliki satu kartu NISN resmi'
            ],
            correct: 'Beberapa orang memiliki golongan darah yang sama',
            explanation: 'Banyak orang bisa memiliki golongan darah A yang sama (banyak-ke-satu), bukan satu-satu. ✅'
          }
        }
      },
      {
        id: 8,
        type: 'quiz',
        title: 'Kuis Akhir Chapter 5',
        emoji: '🏆',
        isHots: true,
        hotsLevel: 'C5 Evaluasi',
        hotsBadge: 'TANTANGAN HOTS (C5 Evaluasi)',
        clue: 'Terdapat n = 5 anggota himpunan. Hitung nilai faktorial 5! = 5 × 4 × 3 × 2 × 1 cara korespondensi satu-satu.',
        question: 'Perhatikan papan 5 anggota di samping.\nBerapakah banyaknya korespondensi satu-satu yang mungkin dibentuk antara A dan B?',
        visual: {
          type: 'one_to_one_board',
          setA: ['1', '2', '3', '4', '5'],
          setB: ['A', 'B', 'C', 'D', 'E'],
          pairs: [['1', 'C'], ['2', 'E'], ['3', 'A'], ['4', 'B'], ['5', 'D']],
          title: 'Faktorial 5! (Lima Anggota)',
          sizeN: 5,
          permutations: '5! = 120 cara'
        },
        options: [
          '25',
          '10',
          '32',
          '120'
        ],
        correct: '120',
        explanation: 'n = 5. Banyak korespondensi = 5! = 5 × 4 × 3 × 2 × 1 = 120 cara. ✅',
        remedial: {
          content: [
            'Menghitung 5!:',
            '5! = 5 × 4 × 3 × 2 × 1',
            '5 × 4 = 20',
            '20 × 3 = 60',
            '60 × 2 = 120',
            '120 × 1 = 120'
          ],
          retryQuestion: {
            question: 'Hitung nilai dari 6! (enam faktorial)...',
            options: [
              '36',
              '120',
              '720',
              '6'
            ],
            correct: '720',
            explanation: '6! = 6 × 120 = 720 ✅'
          }
        }
      }
    ]
  }
};
