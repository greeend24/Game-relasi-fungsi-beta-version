/**
 * CHAPTER 4 VIDEO LEARNING DATA & SUBTITLES
 * Transcribed verbatim from original narration:
 * - Chapter 4.1.mp4 (Pengertian Grafik Fungsi Linear)
 * - Chapter 4.2.mp4 (Titik Potong Sumbu X dan Sumbu Y)
 * - Chapter 4.3.mp4 (Gradien & Kemiringan Garis)
 * - Chapter 4.4.mp4 (Menghitung Gradien Melalui 2 Titik)
 */

export const CHAPTER4_UNIVERSAL_AUDIO = {
  benar: {
    audio: '/materi/chapter 3/Benar/universal kamu keren banget, dari awal aku juga sudah yakin, kamu pasti bisa.wav',
    text: 'Hebat sekali! Jawabanmu benar! Kamu memahami konsep grafik fungsi linear dengan sangat baik. 🏆'
  },
  salah: {
    audio: '/materi/chapter 3/Salah/universal kamu ga perlu karena salah ko, kesalahan juga bisa jadi pelajaran berharga buat kamu untuk memahami materi lebih jauh.wav',
    text: 'Jawabanmu belum tepat, tapi tidak apa-apa! Mari kita pelajari kembali konsepnya dan coba lagi.'
  }
};

export const CHAPTER4_VIDEOS = {
  '4.1': {
    id: '4.1',
    chapterId: 4,
    title: 'Pengertian Grafik Fungsi Linear',
    subtitle: 'Mengenal representasi visual titik (x, y) dan bidang Kartesius',
    videoSrc: '/materi/Chapter 4/Chapter 4.1.mp4',
    duration: 46.5,
    subtitles: [
      { start: 0, end: 6, text: 'Halo detektif! Selamat datang kembali di materi grafik fungsi.' },
      { start: 6, end: 12, text: 'Apa sih grafik fungsi itu? Grafik fungsi adalah representasi visual kumpulan titik-titik koordinat (x, y)...' },
      { start: 12, end: 18, text: 'yang memenuhi rumus fungsi pada bidang Kartesius.' },
      { start: 18, end: 24, text: 'Bidang Kartesius memiliki dua sumbu, yaitu sumbu X dan sumbu Y.' },
      { start: 24, end: 30, text: 'Pertama, sumbu X adalah sumbu horizontal atau mendatar yang berfungsi sebagai nilai variabel domain.' },
      { start: 30, end: 36, text: 'Yang kedua, sumbu Y adalah sumbu vertikal atau tegak lurus yang mewakili nilai fungsi.' },
      { start: 36, end: 42, text: 'Grafik fungsi linear berbunyi f(x) = ax + b.' },
      { start: 42, end: 46.5, text: 'Grafik ini selalu berbentuk garis lurus! Yuk uji pemahamanmu dengan kuis berikut.' }
    ],
    quiz: {
      id: 'quiz-4.1',
      title: 'Kuis 4.1: Pengertian Grafik Fungsi',
      emoji: '📈',
      question: 'Pada bidang Kartesius, sumbu manakah yang mewakili daerah asal (domain) dan daerah hasil dari grafik fungsi linear?',
      clue: 'Ingat penjelasan video: sumbu mendatar (horizontal) adalah X, dan sumbu tegak (vertikal) adalah Y.',
      options: [
        'Sumbu X mewakili daerah asal (domain), dan sumbu Y mewakili nilai hasil fungsi',
        'Sumbu Y mewakili daerah asal (domain), dan sumbu X mewakili nilai hasil fungsi',
        'Sumbu X dan Sumbu Y keduanya merupakan daerah asal',
        'Hanya sumbu X saja yang digunakan pada bidang Kartesius'
      ],
      correct: 'Sumbu X mewakili daerah asal (domain), dan sumbu Y mewakili nilai hasil fungsi',
      explanation: 'Tepat sekali! Sumbu mendatar (X) memuat anggota daerah asal (domain), sedangkan sumbu tegak (Y) memuat nilai bayangan/hasil fungsi f(x). Grafiknya selalu berbentuk garis lurus. ✅',
      retryQuestion: {
        question: 'Grafik dari suatu fungsi linear f(x) = ax + b pada bidang Kartesius selalu berbentuk...',
        clue: 'Fungsi linear memiliki variabel berpangkat satu, sehingga bentuk grafiknya tidak melengkung.',
        options: [
          'Garis lurus',
          'Kurva melengkung parabola',
          'Lingkaran sempurna',
          'Garis zig-zag putus-putus'
        ],
        correct: 'Garis lurus',
        explanation: 'Benar! Grafik fungsi linear f(x) = ax + b selalu membentuk garis lurus sempurna pada bidang Kartesius. ✅'
      }
    }
  },

  '4.2': {
    id: '4.2',
    chapterId: 4,
    title: 'Titik Potong Sumbu X dan Y',
    subtitle: 'Menentukan koordinat perpotongan garis terhadap sumbu koordinat',
    videoSrc: '/materi/Chapter 4/Chapter 4.2.mp4',
    duration: 51.0,
    subtitles: [
      { start: 0, end: 6, text: 'Nah, sekarang saatnya kita mempelajari tentang titik potong sumbu pada grafik fungsi terhadap sumbu koordinat.' },
      { start: 6, end: 12, text: 'Yang pertama, kita akan mencari garis yang memotong sumbu Y. Titik potong sumbu Y selalu terjadi saat...' },
      { start: 12, end: 18, text: 'nilai x sama dengan nol. Misalnya kita punya fungsi f(x) = 2x + 3.' },
      { start: 18, end: 24, text: 'Jika x = 0, maka f(0) = 2(0) + 3, hasilnya adalah 3.' },
      { start: 24, end: 30, text: 'Garis tersebut memotong sumbu Y di koordinat (0, 3).' },
      { start: 30, end: 36, text: 'Yang kedua, titik potong sumbu X selalu terjadi ketika nilai y atau f(x) = 0.' },
      { start: 36, end: 42, text: 'Misalnya f(x) = 2x + 3, maka 2x + 3 = 0, diperoleh 2x = −3...' },
      { start: 42, end: 48, text: 'sehingga diperoleh x = −1,5.' },
      { start: 48, end: 51, text: 'Maka titik potong sumbu X berada di koordinat (−1,5; 0).' }
    ],
    quiz: {
      id: 'quiz-4.2',
      title: 'Kuis 4.2: Titik Potong Sumbu Y',
      emoji: '🎯',
      question: 'Diketahui rumus fungsi linear f(x) = 2x + 6.\nDi titik koordinat manakah grafik fungsi tersebut memotong sumbu Y?',
      clue: 'Titik potong sumbu Y selalu terjadi saat nilai x = 0. Masukkan nilai x = 0 ke rumus f(x).',
      options: ['(0, 6)', '(6, 0)', '(0, 3)', '(3, 0)'],
      correct: '(0, 6)',
      explanation: 'Titik potong sumbu Y terjadi saat x = 0:\nf(0) = 2(0) + 6 = 0 + 6 = 6.\nMaka titik koordinatnya adalah (0, 6). ✅',
      retryQuestion: {
        question: 'Diketahui fungsi linear f(x) = 3x − 9.\nDi titik manakah grafik fungsi tersebut memotong sumbu Y?',
        clue: 'Ganti nilai x dengan 0: f(0) = 3(0) − 9.',
        options: ['(0, −9)', '(−9, 0)', '(0, 3)', '(3, 0)'],
        correct: '(0, −9)',
        explanation: 'Substitusi x = 0 ke f(x) = 3x − 9:\nf(0) = 3(0) − 9 = −9.\nKoordinat titik potong sumbu Y adalah (0, −9). ✅'
      }
    }
  },

  '4.3': {
    id: '4.3',
    chapterId: 4,
    title: 'Gradien & Kemiringan Garis',
    subtitle: 'Makna nilai m pada rumus f(x) = ax + b dan arah kemiringan garis',
    videoSrc: '/materi/Chapter 4/Chapter 4.3.mp4',
    duration: 50.5,
    subtitles: [
      { start: 0, end: 6, text: 'Selanjutnya kita masuk pada materi gradien atau kemiringan garis.' },
      { start: 6, end: 12, text: 'Gradien disimbolkan dengan m kecil, menyatakan tingkat kemiringan grafik fungsi.' },
      { start: 12, end: 18, text: 'Pada rumus f(x) = ax + b, simbol gradien m = a, di mana a adalah koefisien dari x.' },
      { start: 18, end: 24, text: 'Ada beberapa tingkat kemiringan: pertama, jika a > 0...' },
      { start: 24, end: 30, text: 'maka grafik garisnya naik miring ke kanan atas.' },
      { start: 30, end: 36, text: 'Kedua, jika a < 0, maka garisnya turun miring ke kanan.' },
      { start: 36, end: 42, text: 'Dan ketiga, jika a = 0, grafik garis mendatar horizontal sejajar sumbu X.' },
      { start: 42, end: 48, text: 'Contohnya f(x) = 3x − 2 memiliki gradien 3 (a > 0)...' },
      { start: 48, end: 50.5, text: 'maka grafiknya naik miring ke kanan atas.' }
    ],
    quiz: {
      id: 'quiz-4.3',
      title: 'Kuis 4.3: Kemiringan Garis',
      emoji: '📐',
      question: 'Diketahui grafik fungsi linear f(x) = −2x + 5.\nBagaimanakah arah kemiringan grafik garis tersebut pada bidang Kartesius?',
      clue: 'Perhatikan nilai koefisien a di depan x. Nilai a adalah −2. Apakah a > 0 atau a < 0?',
      options: [
        'Garis menurun miring ke kanan, karena gradien a bernilai negatif (a = −2)',
        'Garis menanjak naik ke kanan atas, karena nilai b bernilai positif (+5)',
        'Garis mendatar horizontal sejajar sumbu X',
        'Garis tegak vertikal sejajar sumbu Y'
      ],
      correct: 'Garis menurun miring ke kanan, karena gradien a bernilai negatif (a = −2)',
      explanation: 'Benar sekali! Gradien m = a = −2. Karena a < 0 (negatif), maka garis condong menurun ke arah kanan. ✅',
      retryQuestion: {
        question: 'Jika fungsi f(x) = 4x + 1 memiliki koefisien a = 4 (a > 0), maka arah kemiringan garisnya adalah...',
        clue: 'Jika nilai gradien a positif (a > 0), grafik akan naik menuju ke kanan atas.',
        options: [
          'Garis menanjak naik ke kanan atas',
          'Garis menurun ke kanan bawah',
          'Garis mendatar sempurna',
          'Garis berupa lingkaran'
        ],
        correct: 'Garis menanjak naik ke kanan atas',
        explanation: 'Tepat! Karena a = 4 > 0, maka grafiknya menanjak naik ke arah kanan atas. ✅'
      }
    }
  },

  '4.4': {
    id: '4.4',
    chapterId: 4,
    title: 'Menghitung Gradien Melalui 2 Titik',
    subtitle: 'Penerapan rumus m = (y2 − y1) / (x2 − x1) pada koordinat',
    videoSrc: '/materi/Chapter 4/Chapter 4.4.mp4',
    duration: 53.9,
    subtitles: [
      { start: 0, end: 6, text: 'Sebelumnya kita telah mempelajari tentang gradien. Mari kita lanjut pada penerapan dalam menentukan gradien...' },
      { start: 6, end: 12, text: 'dari 2 titik koordinat (x1, y1) dan (x2, y2).' },
      { start: 12, end: 18, text: 'Maka gradien dapat dihitung dengan rumus: m = (y2 − y1) / (x2 − x1).' },
      { start: 18, end: 24, text: 'Contohnya garis melalui titik (1, 3) dan titik (3, 9).' },
      { start: 24, end: 30, text: 'Dari titik tersebut diketahui x1 = 1, x2 = 3, y1 = 3, dan y2 = 9.' },
      { start: 30, end: 36, text: 'Kita gunakan rumus mencari gradien: m = (9 − 3) / (3 − 1)...' },
      { start: 36, end: 42, text: 'maka m = 6 / 2, hasilnya adalah 3.' },
      { start: 42, end: 48, text: 'Artinya: setiap geser 1 satuan ke kanan pada sumbu X...' },
      { start: 48, end: 53.9, text: 'nilai y akan naik sebesar 3 satuan pada bidang Kartesius. Keren kan!' }
    ],
    quiz: {
      id: 'quiz-4.4',
      title: 'Kuis 4.4: Hitung Gradien 2 Titik',
      emoji: '📊',
      question: 'Sebuah garis lurus melewati titik koordinat (1, 2) dan (3, 8).\nBerapakah nilai gradien (m) dari garis tersebut?',
      clue: 'Gunakan rumus m = (y2 − y1) / (x2 − x1). Di sini x1=1, y1=2, x2=3, y2=8.',
      options: ['3', '2', '4', '6'],
      correct: '3',
      explanation: 'Perhitungan rumus gradien:\nm = (y2 − y1) / (x2 − x1)\nm = (8 − 2) / (3 − 1) = 6 / 2 = 3 ✅',
      retryQuestion: {
        question: 'Sebuah garis lurus melewati titik koordinat (1, 4) dan (4, 10).\nBerapakah nilai gradien (m) garis tersebut?',
        clue: 'Hitung selisih y dibagi selisih x: m = (10 − 4) / (4 − 1).',
        options: ['2', '3', '4', '6'],
        correct: '2',
        explanation: 'm = (10 − 4) / (4 − 1) = 6 / 3 = 2 ✅'
      }
    }
  }
};
