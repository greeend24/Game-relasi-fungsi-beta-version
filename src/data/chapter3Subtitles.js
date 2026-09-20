/**
 * CHAPTER 3 VIDEO LEARNING DATA & SUBTITLES
 * Transcribed verbatim from original narration:
 * - chapter 3.1.mp4 (Notasi & Rumus Fungsi)
 * - chapter 3.2.mp4 (Nilai Fungsi Input Negatif)
 * - chapter 3.3.mp4 (Menentukan Rumus dari Tabel)
 * - chapter 3.4.mp4 (Bayangan & Prapeta)
 */

export const CHAPTER3_VIDEOS = {
  '3.1': {
    id: '3.1',
    chapterId: 3,
    title: 'Notasi & Rumus Fungsi',
    subtitle: 'Mengenal bentuk f(x) = ax + b dan cara menghitung nilai fungsi',
    videoSrc: '/materi/chapter 3/chapter 3.1.mp4',
    duration: 168.24,
    subtitles: [
      { start: 0, end: 8, text: 'Selamat datang kembali pada materi ketiga, detektif! Pada materi sebelumnya kita sudah belajar tentang fungsi.' },
      { start: 8, end: 16, text: 'Nah, pada kali ini kita akan belajar cara menotasikan sebuah fungsi.' },
      { start: 16, end: 24, text: 'Sebelum kita tahu bagaimana cara menotasikan sebuah fungsi, kita harus tahu dulu apa sih itu notasi?' },
      { start: 24, end: 33, text: 'Notasi adalah simbol atau cara penulisan yang digunakan untuk mewakili suatu konsep, objek, atau informasi tertentu agar lebih mudah dipahami dan dituliskan.' },
      { start: 33, end: 41, text: 'Cara untuk menotasikan sebuah fungsi bisa seperti ini: f : A → B...' },
      { start: 41, end: 49, text: 'dan dibaca: fungsi f memetakan himpunan A kepada himpunan B...' },
      { start: 49, end: 56, text: 'dan juga boleh menggunakan notasi f(x) = y.' },
      { start: 56, end: 64, text: 'Nah, kalau notasi ini dibaca: fungsi f memetakan x dan menghasilkan y.' },
      { start: 64, end: 72, text: 'Biar gak makin bingung, sini aku kasih contoh! Misalkan kita punya sebuah fungsi: f(x) = 2x + 1.' },
      { start: 72, end: 80, text: 'Jika nilai x adalah 3, maka semua huruf x yang ada pada fungsi tersebut kita ganti dengan 3.' },
      { start: 80, end: 88, text: 'Jadinya akan menghasilkan: f(3) = 2 dikali 3 ditambah 1.' },
      { start: 88, end: 96, text: '2 dikali 3 adalah 6, ditambah 1 diperoleh lah hasilnya 7!' },
      { start: 96, end: 104, text: 'Artinya: angka 3 dipetakan kepada angka 7. Selanjutnya kita akan belajar fungsi linear.' },
      { start: 104, end: 112, text: 'Apa sih fungsi linear itu? Fungsi linear adalah fungsi matematika yang variabelnya memiliki pangkat tertinggi 1...' },
      { start: 112, end: 120, text: 'dan grafiknya berupa garis lurus pada bidang Cartesius. Bentuk umum dari fungsi linear itu sendiri adalah...' },
      { start: 120, end: 128, text: 'f(x) = ax + b, dengan a adalah koefisien dari x, dan x adalah variabel yang nilainya dapat diganti atau berubah...' },
      { start: 128, end: 136, text: 'dan b adalah konstanta, yaitu bilangan yang nilainya tetap.' },
      { start: 136, end: 144, text: 'Contohnya: f(x) = 3x − 5. Nilai a adalah 3, dan nilai b adalah −5.' },
      { start: 144, end: 152, text: 'Jika nilai x adalah 2, maka semua x di dalam fungsi kita ganti dengan 2.' },
      { start: 152, end: 160, text: 'Diperoleh lah f(2) = 3(2) − 5.' },
      { start: 160, end: 168.5, text: '3 dikali 2 adalah 6, maka f(2) = 6 − 5 yaitu 1. Yuk uji pemahamanmu dengan kuis berikut!' }
    ],
    quiz: {
      id: 'quiz-3.1',
      title: 'Kuis Kasus 3.1: Hitung Nilai Fungsi',
      emoji: '🔍',
      question: 'Diketahui rumus fungsi f(x) = 2x + 3.\nBerapakah nilai dari f(4)?',
      clue: 'Ganti huruf x dengan angka 4: f(4) = 2(4) + 3. Hitung perkalian terlebih dahulu, baru jumlahkan hasilnya.',
      options: ['8', '9', '11', '14'],
      correct: '11',
      explanation: 'Substitusi x = 4 ke f(x) = 2x + 3:\nf(4) = 2(4) + 3\nf(4) = 8 + 3 = 11 ✅',
      retryQuestion: {
        question: 'Diketahui rumus fungsi f(x) = 3x + 2.\nBerapakah nilai dari f(5)?',
        clue: 'Substitusi x = 5 ke f(x) = 3x + 2. Hitung 3 dikali 5 lalu tambahkan 2.',
        options: ['13', '15', '17', '19'],
        correct: '17',
        explanation: 'Substitusi x = 5 ke f(x) = 3x + 2:\nf(5) = 3(5) + 2\nf(5) = 15 + 2 = 17 ✅'
      },
      audioBenar: "/materi/chapter 3/Benar/3.1 hebat, jawaban kamu benar, karena kita tinggal mengganti nilai x dengan 4 kemudian di jumlahkan 2 dikali 4 dan ditambah dengan 3 akan menghasilkan 11.wav",
      audioSalah: "/materi/chapter 3/Salah/3.1 yah jawaban kamu kurang tepat, karena seharusnya kita mengganti nilai x terlebih dahulu.wav",
      textBenar: "Hebat! Jawaban kamu benar, karena kita tinggal mengganti nilai x dengan 4 kemudian dikalikan 2 lalu ditambah 3 menghasilkan 11! 🎉",
      textSalah: "Yah, jawabanmu kurang tepat. Seharusnya kita mengganti nilai x terlebih dahulu pada rumus fungsi 2x + 3. Yuk tonton ulang atau coba lagi!"
    }
  },

  '3.2': {
    id: '3.2',
    chapterId: 3,
    title: 'Nilai Fungsi Input Negatif',
    subtitle: 'Aturan tanda perkalian dan substitusi bilangan negatif',
    videoSrc: '/materi/chapter 3/chapter 3.2.mp4',
    duration: 112.30,
    subtitles: [
      { start: 0, end: 7, text: 'Sekarang, bagaimana kalau nilai x yang kita masukkan adalah bilangan negatif?' },
      { start: 7, end: 14, text: 'Kita lihat contoh berikut: diketahui f(x) = 2x + 7.' },
      { start: 14, end: 21, text: 'Kita akan mencari nilai f(−3). Caranya kita ganti x dengan −3.' },
      { start: 21, end: 28, text: 'Jadi f(−3) = 2 dikali (−3) ditambah 7.' },
      { start: 28, end: 35, text: '2 dikali negatif 3 sama dengan negatif 6. Kenapa hasilnya negatif?' },
      { start: 35, end: 42, text: 'Karena dalam perkalian, bilangan positif dikali bilangan negatif hasilnya negatif.' },
      { start: 42, end: 49, text: 'Jadi kita punya negatif 6 ditambah 7, hasilnya adalah 1.' },
      { start: 49, end: 56, text: 'Jadi f(−3) = 1. Sekarang kita coba contoh yang lain: diketahui g(x) = 5x − 4.' },
      { start: 56, end: 63, text: 'Kita akan mencari g(−2). Sama seperti tadi, kita ganti x dengan −2.' },
      { start: 63, end: 70, text: 'Maka g(−2) = 5 dikali (−2) dikurangi 4.' },
      { start: 70, end: 77, text: '5 dikali (−2) = −10, kemudian −10 dikurang 4 = −14.' },
      { start: 77, end: 84, text: 'Jadi g(−2) = −14.' },
      { start: 84, end: 95, text: 'Nah, dari kedua contoh tadi kalau kita mengganti x dengan bilangan negatif...' },
      { start: 95, end: 112.5, text: 'jangan lupa perhatikan tanda positif dan negatifnya ya! Siap untuk kuis kasus ini?' }
    ],
    quiz: {
      id: 'quiz-3.2',
      title: 'Kuis Kasus 3.2: Nilai Fungsi Input Negatif',
      emoji: '➖',
      question: 'Diketahui rumus fungsi f(x) = 4x − 1.\nBerapakah nilai dari f(−2)?',
      clue: 'Hitung perkalian 4 dikali (-2) terlebih dahulu yang menghasilkan -8. Lalu kurangi dengan 1.',
      options: ['−9', '7', '−7', '9'],
      correct: '−9',
      explanation: 'Substitusi x = −2 ke f(x) = 4x − 1:\nf(−2) = 4(−2) − 1\nf(−2) = −8 − 1 = −9 ✅',
      retryQuestion: {
        question: 'Diketahui rumus fungsi f(x) = 3x − 5.\nBerapakah nilai dari f(−3)?',
        clue: 'Perkalian 3 dikali (-3) menghasilkan -9. Lalu -9 dikurangi 5.',
        options: ['−14', '4', '−4', '14'],
        correct: '−14',
        explanation: 'Substitusi x = −3 ke f(x) = 3x − 5:\nf(−3) = 3(−3) − 5\nf(−3) = −9 − 5 = −14 ✅'
      },
      audioBenar: "/materi/chapter 3/Benar/3.2 jawaban kamu benar, karena empat dikali negatif 2 akan menghasilkan negatif 8, dan negatif 8 di kurang 1 hasilnya adalah sembilan.wav",
      audioSalah: "/materi/chapter 3/Salah/3.2 yaah jawaban kamu masi kurang tepat, silahkan mengulangi video jika ada yang masih kurang dipahami, jika sudah silahkan kerjakan soal yang berbeda.wav",
      textBenar: "Jawaban kamu benar! Empat dikali negatif 2 menghasilkan negatif 8, dan negatif 8 dikurang 1 hasilnya adalah negatif sembilan! 🌟",
      textSalah: "Yaah jawaban kamu masih kurang tepat. Silakan ulangi video jika ada yang masih kurang dipahami, atau kerjakan soal serupa lagi ya!"
    }
  },

  '3.3': {
    id: '3.3',
    chapterId: 3,
    title: 'Menentukan Rumus dari Tabel',
    subtitle: 'Menganalisis selisih output untuk mencari koefisien a dan konstanta b',
    videoSrc: '/materi/chapter 3/chapter 3.3.mp4',
    duration: 135.29,
    subtitles: [
      { start: 0, end: 7, text: 'Sekarang kita akan belajar bagaimana menentukan rumus fungsi dari sebuah tabel.' },
      { start: 7, end: 14, text: 'Kadang-kadang kita diberikan beberapa nilai dalam bentuk tabel lalu kita diminta untuk mencari rumus fungsinya.' },
      { start: 14, end: 21, text: 'Perhatikan tabel yang ada di bawah: kita bisa lihat nilai x adalah 1, 2, 3, dan 4.' },
      { start: 21, end: 28, text: 'Sedangkan nilai f(x) adalah 5, 8, 11, dan 14.' },
      { start: 28, end: 35, text: 'Sekarang bagaimana cara kita menemukan rumus fungsinya? Kita tahu bahwa bentuk umum fungsi linear adalah f(x) = ax + b.' },
      { start: 35, end: 42, text: 'Pertama kita cari nilai a. Caranya kita lihat perubahan pada nilai f(x).' },
      { start: 42, end: 49, text: 'Dari 5 ke 8 bertambah 3, dari 8 ke 11 juga bertambah 3. Jadi nilai a adalah 3.' },
      { start: 49, end: 56, text: 'Selanjutnya kita mencari nilai b. Kita gunakan nilai yang pertama yaitu x = 1 dan f(1) = 5.' },
      { start: 56, end: 63, text: 'Kita masukkan ke dalam rumus: f(1) = 3(1) + b = 5.' },
      { start: 63, end: 70, text: '3 + b = 5, maka b = 5 − 3 = 2.' },
      { start: 70, end: 77, text: 'Jadi kita sudah mendapatkan nilai a = 3 dan b = 2. Dengan begitu rumus fungsinya adalah f(x) = 3x + 2.' },
      { start: 77, end: 85, text: 'Nah sekarang kita bisa cek: kalau x = 1 maka 3(1) + 2 hasilnya 5.' },
      { start: 85, end: 92, text: 'Kalau x = 2 hasilnya 8, kalau x = 3 hasilnya 11, kalau x = 4 hasilnya 14.' },
      { start: 92, end: 100, text: 'Ternyata semuanya sesuai dengan tabel!' },
      { start: 100, end: 110, text: 'Jadi rumus fungsi yang kita peroleh adalah f(x) = 3x + 2.' },
      { start: 110, end: 135.5, text: 'Yuk buktikan kemampuanmu di kuis kasus berikutnya!' }
    ],
    quiz: {
      id: 'quiz-3.3',
      title: 'Kuis Kasus 3.3: Cari Rumus Fungsi dari Tabel',
      emoji: '📊',
      prompt: 'Diberikan tabel nilai fungsi berikut:',
      table: {
        x: [1, 2, 3],
        fx: [5, 8, 11]
      },
      subQuestion: 'Rumus fungsi f(x) yang tepat adalah...',
      question: 'Diberikan tabel nilai fungsi:\nx = 1 ➔ f(x) = 5\nx = 2 ➔ f(x) = 8\nx = 3 ➔ f(x) = 11\nRumus fungsi f(x) yang tepat adalah...',
      clue: 'Perhatikan selisih nilai output: 8 - 5 = 3 (nilai a = 3). Lalu uji saat x = 1: 3(1) + b = 5 untuk menemukan b.',
      options: ['f(x) = 2x + 3', 'f(x) = 3x + 2', 'f(x) = 4x + 1', 'f(x) = 3x − 1'],
      correct: 'f(x) = 3x + 2',
      explanation: 'Selisih output = 3 (nilai a = 3)\nSaat x = 1:\n3(1) + b = 5\n➔ 3 + b = 5\n➔ b = 2\nRumus fungsi: f(x) = 3x + 2 ✅',
      retryQuestion: {
        prompt: 'Diberikan tabel nilai fungsi baru berikut:',
        table: {
          x: [1, 2, 3],
          fx: [7, 11, 15]
        },
        subQuestion: 'Rumus fungsi f(x) yang tepat adalah...',
        clue: 'Perhatikan selisih output: 11 - 7 = 4 (nilai a = 4). Saat x = 1: 4(1) + b = 7 untuk mencari b.',
        options: ['f(x) = 4x + 3', 'f(x) = 3x + 4', 'f(x) = 4x − 3', 'f(x) = 5x + 2'],
        correct: 'f(x) = 4x + 3',
        explanation: 'Selisih output = 4 (nilai a = 4)\nSaat x = 1:\n4(1) + b = 7\n➔ 4 + b = 7\n➔ b = 3\nRumus fungsi: f(x) = 4x + 3 ✅'
      },
      audioBenar: "/materi/chapter 3/Benar/3.3 benar, karena selisih hasil dari f(1) dan f(2) yaitu 5 dan 8 selisihnya adalah 3.wav",
      audioSalah: "/materi/chapter 3/Salah/3.3 yaaa kamu masih belum benar, perhatikan selisih hasil dari f(1) dan f(2) maka itu merupakan nilai dari a nya.wav",
      textBenar: "Benar sekali! Selisih hasil dari f(1) dan f(2) yaitu 5 dan 8 adalah 3, sehingga nilai a = 3 dan rumusnya f(x) = 3x + 2! 🎯",
      textSalah: "Yaaa kamu masih belum benar. Perhatikan selisih hasil dari f(1) dan f(2), maka selisih tersebut merupakan nilai koefisien a nya."
    }
  },

  '3.4': {
    id: '3.4',
    chapterId: 3,
    title: 'Bayangan dan Prapeta Fungsi',
    subtitle: 'Memahami arti istilah bayangan nilai dan eliminasi dua persamaan',
    videoSrc: '/materi/chapter 3/chapter 3.4.mp4',
    duration: 107.78,
    subtitles: [
      { start: 0, end: 7, text: 'Selanjutnya kita akan mengenal dua istilah yang sering muncul dalam materi fungsi...' },
      { start: 7, end: 14, text: 'yaitu bayangan dan prapeta. Kita mulai dari bayangan.' },
      { start: 14, end: 21, text: 'Bayangan suatu bilangan adalah hasil yang kita dapatkan setelah bilangan tersebut dimasukkan ke dalam fungsi.' },
      { start: 21, end: 28, text: 'Misalnya kita punya fungsi f(x) = 2x. Kalau kita ditanya apa bayangan dari 3...' },
      { start: 28, end: 35, text: 'artinya kita perlu menghitung f(3). Kita masukkan angka 3 ke dalam fungsi.' },
      { start: 35, end: 42, text: 'Jadi f(3) = 2 dikali 3 = 6. Maka bayangan dari 3 adalah 6.' },
      { start: 42, end: 49, text: 'Nah sekarang ada istilah yang kedua yaitu prapeta. Kalau bayangan tadi kita mencari hasilnya...' },
      { start: 49, end: 56, text: 'maka prapeta kita mencari nilai x yang menghasilkan suatu nilai tertentu.' },
      { start: 56, end: 64, text: 'Contohnya: kita punya fungsi f(x) = 2x. Kita tahu bahwa f(x) = 10.' },
      { start: 64, end: 72, text: 'Kita ingin mencari nilai x yang menghasilkan 10. Karena 2 dikali x = 10, maka x = 5.' },
      { start: 72, end: 80, text: 'Jadi 5 adalah prapeta dari 10.' },
      { start: 80, end: 88, text: 'Jadi ingat baik-baik ya: bayangan berarti kita mencari hasil dari suatu nilai yang dimasukkan ke fungsi...' },
      { start: 88, end: 96, text: 'sedangkan prapeta berarti kita mencari nilai x yang menghasilkan suatu bayangan.' },
      { start: 96, end: 107.8, text: 'Jadi kalau di soal tertulis "Tentukan bayangan dari 3", itu sama saja dengan kita diminta untuk menghitung f(3)!' }
    ],
    quiz: {
      id: 'quiz-3.4',
      title: 'Kuis Kasus 3.4: Bayangan Suatu Nilai',
      emoji: '💡',
      question: 'Diketahui rumus fungsi f(x) = 5x − 3.\nBerapakah bayangan dari x = 3?',
      clue: 'Bayangan dari x = 3 artinya hitung nilai f(3). Ganti x dengan 3 pada 5x - 3.',
      options: ['10', '9', '15', '12'],
      correct: '12',
      explanation: 'Bayangan dari x = 3:\nf(3) = 5(3) − 3\nf(3) = 15 − 3 = 12 ✅',
      retryQuestion: {
        question: 'Diketahui rumus fungsi f(x) = 4x + 6.\nBerapakah bayangan dari x = 4?',
        clue: 'Bayangan dari x = 4 artinya hitung f(4). Ganti x dengan 4 pada 4x + 6.',
        options: ['20', '22', '18', '24'],
        correct: '22',
        explanation: 'Bayangan dari x = 4:\nf(4) = 4(4) + 6\nf(4) = 16 + 6 = 22 ✅'
      },
      audioBenar: "/materi/chapter 3/Benar/3.4.1 kamu benar! cukup mengganti nilai x dengan 3 kemudian di kalikan dengan 5 dan dikurangi dengan 3, akan menghasilkan 12.wav",
      audioSalah: "/materi/chapter 3/Salah/3.4.1 jawabanmu masih belum benar, perhatikan soal lagi dan jika masih tidak paham silahkan nonton ulang video penjelasan ku sebelumnya.wav",
      textBenar: "Kamu benar! Cukup mengganti nilai x dengan 3 kemudian dikalikan 5 dan dikurangi 3, menghasilkan 12! 🏆",
      textSalah: "Jawabanmu masih belum benar. Perhatikan soal lagi dan tonton ulang penjelasanku sebelumnya ya detektif!"
    }
  }
};

export const UNIVERSAL_AUDIO = {
  benar: {
    audio: "/materi/chapter 3/Benar/universal kamu keren banget, dari awal aku juga sudah yakin, kamu pasti bisa.wav",
    text: "Kamu keren banget! Dari awal aku juga sudah yakin, kamu pasti bisa! 🦉✨"
  },
  salah: {
    audio: "/materi/chapter 3/Salah/universal kamu ga perlu karena salah ko, kesalahan juga bisa jadi pelajaran berharga buat kamu untuk memahami materi lebih jauh.wav",
    text: "Kamu tidak perlu berkecil hati karena salah, kesalahan juga bisa jadi pelajaran berharga untuk memahami materi lebih jauh! 💪🔍"
  }
};
