/**
 * CHAPTER 2 VIDEO LEARNING DATA & SUBTITLES
 * Transcribed verbatim from original narration & synced with video frames:
 * - Chapter 2.1.mp4 (Pengertian & Syarat Fungsi)
 * - Chapter 2.2.mp4 (Perbedaan Relasi dan Fungsi)
 * - Chapter 2.3.mp4 (Domain, Kodomain, dan Range)
 * - Chapter 2.4.mp4 (Ringkasan Materi Fungsi)
 *
 * CATATAN PEDAGOGIS:
 * - Video 2.1 & 2.2 HANYA menggunakan istilah "Himpunan Asal", "Himpunan Kawan", "Bercabang", dan "Kosong".
 *   Istilah "Domain", "Kodomain", dan "Range" BARU diperkenalkan di Video 2.3.
 * - Petunjuk (clues) murni memicu analisis kritis siswa, TIDAK membocorkan jawaban langsung.
 */

export const CHAPTER2_VIDEOS = {
  '2.1': {
    id: '2.1',
    chapterId: 2,
    title: 'Pengertian & Syarat Fungsi',
    subtitle: 'Konsep pemetaan, syarat setiap & tepat satu, serta ciri bukan fungsi',
    videoSrc: '/materi/chapter 2/Chapter 2.1.mp4',
    duration: 107.71,
    subtitles: [
      { start: 0, end: 6.5, text: 'Sebelumnya kita telah mempelajari tentang relasi dan cara menyatakan relasi.' },
      { start: 6.5, end: 12.0, text: 'Nah, selanjutnya kita akan mempelajari tentang fungsi.' },
      { start: 12.0, end: 20.0, text: 'Apa itu fungsi? Fungsi atau pemetaan adalah relasi khusus yang menghubungkan setiap anggota himpunan asal ke tepat satu anggota himpunan kawan.' },
      { start: 20.0, end: 28.0, text: 'Bayangkan mesin minuman otomatis: kamu memasukkan uang koin, lalu keluar satu jenis minuman. Nah, satu koin itu untuk satu minuman. Itulah fungsi!' },
      { start: 28.0, end: 35.0, text: 'Dua kata kunci fungsi yaitu: setiap elemen asal harus berpasangan, dan tepat satu (tidak boleh bercabang).' },
      { start: 35.0, end: 42.0, text: 'Berikut adalah contoh fungsi: terdapat dua himpunan, yaitu himpunan A dan himpunan B.' },
      { start: 42.0, end: 49.0, text: 'Himpunan A adalah nama-nama siswa dan himpunan B adalah mata pelajaran favorit siswa.' },
      { start: 49.0, end: 57.0, text: 'Ani menyukai Matematika, Budi menyukai Bahasa, dan Cici menyukai IPA. Jadi setiap siswa punya tepat satu mata pelajaran favorit!' },
      { start: 57.0, end: 63.5, text: 'Sekarang, kapan dikatakan bukan fungsi? Ada dua alasan mengapa sebuah relasi bukan fungsi.' },
      { start: 63.5, end: 70.0, text: 'Pertama, ada anggota di himpunan kiri yang bercabang, artinya satu orang punya dua panah pilihan.' },
      { start: 70.0, end: 76.5, text: 'Kedua, ada anggota himpunan kiri yang tidak punya pasangan sama sekali, artinya satu orang tidak memilih sama sekali.' },
      { start: 76.5, end: 84.0, text: 'Ingat rumus fungsi: semua terpasang dan tidak ada yang bercabang!' },
      { start: 84.0, end: 91.0, text: 'Berikut contoh bukan fungsi (bercabang dan kosong): pada himpunan A dan himpunan B,' },
      { start: 91.0, end: 98.0, text: 'Dani menyukai Matematika dan IPA, Eka menyukai pelajaran Bahasa, dan Fani tidak menyukai pelajaran apa pun.' },
      { start: 98.0, end: 105.0, text: 'Dari bentuk himpunan ini, Dani memiliki dua panah yang bercabang dan Fani tidak punya panah sama sekali.' },
      { start: 105.0, end: 107.7, text: 'Sehingga contoh ini bukan fungsi! Yuk uji pemahamanmu dengan kuis berikut!' }
    ],
    quiz: {
      id: 'quiz-2.1',
      title: 'Kuis Kasus 2.1: Syarat Mutlak Fungsi',
      emoji: '🎯',
      question: 'Berdasarkan video penjelasan, apa dua kata kunci utama agar suatu relasi dapat disebut sebagai FUNGSI?',
      clue: 'Ingat kembali analogi mesin minuman otomatis dan bagaimana koin diperlakukan.',
      options: [
        'Anggota himpunan asal boleh bercabang asalkan semua anggota kawan terisi',
        'Setiap anggota himpunan asal harus berpasangan, dan pasangannya harus tepat satu',
        'Jumlah anggota himpunan asal harus sama persis dengan himpunan kawan',
        'Anggota himpunan kawan tidak boleh menerima lebih dari satu panah'
      ],
      correct: 'Setiap anggota himpunan asal harus berpasangan, dan pasangannya harus tepat satu',
      explanation: 'Dua kata kunci fungsi: (1) Setiap anggota himpunan asal wajib berpasangan (tidak boleh kosong), dan (2) Pasangannya harus tepat satu (tidak boleh bercabang). ✅',
      retryQuestion: {
        question: 'Perhatikan contoh kasus di video: Dani menyukai Matematika dan IPA, sedangkan Fani tidak memilih pelajaran apa pun. Mengapa relasi tersebut BUKAN fungsi?',
        clue: 'Perhatikan jumlah cabang panah yang keluar dari nama Dani dan Fani.',
        options: [
          'Karena pelajaran Matematika dan IPA terlalu mirip',
          'Karena jumlah pilihan pelajaran lebih banyak dari jumlah siswa',
          'Karena Dani memiliki panah bercabang dan Fani tidak memiliki pasangan sama sekali',
          'Karena Eka hanya memilih pelajaran Bahasa'
        ],
        correct: 'Karena Dani memiliki panah bercabang dan Fani tidak memiliki pasangan sama sekali',
        explanation: 'Fungsi melarang anggota asal bercabang (Dani) dan melarang anggota asal kosong/tidak berpasangan (Fani). Oleh karena itu relasi tersebut bukan fungsi. ✅'
      },
      audioBenar: "/materi/chapter 2/Benar/2.1 hebat jawaban kamu benar, dua syarat fungsi adalah berpasangan dan tepat satu.wav",
      audioSalah: "/materi/chapter 2/Salah/2.1 yah jawaban kamu kurang tepat, ingat kembali syarat mutlak fungsi.wav",
      textBenar: "Hebat! Jawaban kamu benar, Detektif! Dua kata kunci fungsi adalah setiap anggota himpunan asal wajib punya pasangan dan pasangannya harus tepat satu, tidak boleh bercabang ataupun kosong!",
      textSalah: "Iya, jawaban kamu kurang tepat. Ingat kembali syarat mutlak fungsi ya: anggota di sebelah kiri tidak boleh ada yang kosong dan tidak boleh bercabang. Yuk coba lagi!"
    }
  },

  '2.2': {
    id: '2.2',
    chapterId: 2,
    title: 'Perbedaan Relasi dan Fungsi',
    subtitle: 'Mengapa semua fungsi adalah relasi, namun tidak semua relasi adalah fungsi?',
    videoSrc: '/materi/chapter 2/Chapter 2.2.mp4',
    duration: 31.43,
    subtitles: [
      { start: 0, end: 6.5, text: 'Selanjutnya kita akan mempelajari apa sih bedanya relasi dan fungsi.' },
      { start: 6.5, end: 14.0, text: 'Dimulai dari relasi: relasi adalah aturan penghubung dua himpunan yang boleh bercabang dan boleh kosong.' },
      { start: 14.0, end: 21.0, text: 'Sedangkan fungsi adalah relasi khusus yang tidak boleh bercabang dan tidak boleh ada anggota himpunan asal yang tidak memiliki pasangan.' },
      { start: 21.0, end: 27.5, text: 'Jadi, semua fungsi adalah relasi, namun tidak semua relasi adalah fungsi!' },
      { start: 27.5, end: 31.4, text: 'Analoginya: semua kucing adalah hewan, namun tidak semua hewan adalah kucing!' }
    ],
    quiz: {
      id: 'quiz-2.2',
      title: 'Kuis Kasus 2.2: Hubungan Relasi dan Fungsi',
      emoji: '⚖️',
      question: 'Berdasarkan analogi kucing dan hewan di video, manakah pernyataan yang PALING TEPAT mengenai hubungan relasi dan fungsi?',
      clue: 'Hubungkan analogi kelompok hewan (luas) dengan kelompok kucing (khusus).',
      options: [
        'Semua relasi pasti fungsi, namun tidak semua fungsi adalah relasi',
        'Relasi dan fungsi adalah dua konsep yang sama sekali tidak saling berhubungan',
        'Semua fungsi adalah relasi, namun tidak semua relasi adalah fungsi',
        'Sebuah aturan tidak bisa menjadi relasi dan fungsi secara bersamaan'
      ],
      correct: 'Semua fungsi adalah relasi, namun tidak semua relasi adalah fungsi',
      explanation: 'Fungsi adalah bentuk relasi khusus yang memiliki syarat ketat (tidak bercabang dan tidak kosong). Maka setiap fungsi otomatis adalah relasi, namun relasi biasa belum tentu fungsi. ✅',
      retryQuestion: {
        question: 'Apa perbedaan sifat aturan antara relasi biasa dengan fungsi?',
        clue: 'Pikirkan aturan mana yang lebih bebas dan mana yang memiliki batasan ketat.',
        options: [
          'Relasi biasa tidak boleh digambar dengan diagram panah, sedangkan fungsi wajib diagram panah',
          'Relasi biasa boleh bercabang dan boleh kosong, sedangkan fungsi wajib tepat satu pasangan',
          'Relasi biasa hanya berlaku untuk angka, sedangkan fungsi hanya untuk kata-kata',
          'Relasi biasa tidak memiliki himpunan kawan sama sekali'
        ],
        correct: 'Relasi biasa boleh bercabang dan boleh kosong, sedangkan fungsi wajib tepat satu pasangan',
        explanation: 'Relasi biasa bersifat fleksibel (boleh bercabang & boleh kosong), sedangkan fungsi memiliki aturan ketat (tidak boleh bercabang & tidak boleh kosong). ✅'
      },
      audioBenar: "/materi/chapter 2/Benar/2.2 tepat sekali, semua fungsi adalah relasi seperti semua kucing adalah hewan.wav",
      audioSalah: "/materi/chapter 2/Salah/2.2 yah masih kurang tepat, perhatikan kembali analogi hewan dan kucing.wav",
      textBenar: "Tepat sekali, Detektif! Semua fungsi pasti merupakan relasi, sama seperti semua kucing adalah hewan, tapi relasi biasa belum tentu sebuah fungsi!",
      textSalah: "Yah, masih kurang tepat. Ingat, relasi itu sifatnya lebih bebas, sedangkan fungsi punya aturan ketat. Coba cermati lagi ya!"
    }
  },

  '2.3': {
    id: '2.3',
    chapterId: 2,
    title: 'Domain, Kodomain, dan Range',
    subtitle: 'Mengenal daerah asal, daerah kawan, dan daerah hasil pemetaan',
    videoSrc: '/materi/chapter 2/Chapter 2.3.mp4',
    duration: 114.82,
    subtitles: [
      { start: 0, end: 7.5, text: 'Halo detektif! Sebelumnya kita sudah mempelajari tentang apa itu fungsi, kapan dikatakan bukan fungsi, dan perbedaan antara relasi dan fungsi.' },
      { start: 7.5, end: 14.5, text: 'Sekarang kita akan melangkah pada unsur-unsur dalam fungsi, yaitu yang pertama adalah domain atau daerah asal.' },
      { start: 14.5, end: 21.5, text: 'Apa sih itu domain? Domain adalah himpunan semua anggota yang menjadi masukan dari suatu fungsi.' },
      { start: 21.5, end: 28.5, text: 'Ingat kuncinya: pada diagram panah, domain selalu berada di sisi sebelah kiri ya!' },
      { start: 28.5, end: 36.0, text: 'Mari kita berikan contoh berikut: jika ada fungsi yang menghubungkan data siswa ke nilai ujian, himpunan A di sisi sebelah kiri berisi Ani, Budi, dan Cici.' },
      { start: 36.0, end: 43.5, text: 'Karena mereka berada di sisi kiri dan bertindak sebagai masukan, maka seluruh siswa dihimpun menjadi yang disebut sebagai domain.' },
      { start: 43.5, end: 51.0, text: 'Dalam notasi matematika, domain ditulis dengan simbol huruf D kapital. Untuk fungsi f, Df-nya adalah himpunan {Ani, Budi, Cici}.' },
      { start: 51.0, end: 57.0, text: 'Gimana, gampang bukan? Nah sekarang kita masuk pada unsur selanjutnya yang ada di dalam fungsi,' },
      { start: 57.0, end: 64.0, text: 'yaitu kodomain dan range. Kodomain adalah himpunan semua anggota yang mungkin menjadi pasangan dari domain.' },
      { start: 64.0, end: 71.0, text: 'Kodomain berada di sisi kanan pada diagram panah. Contoh: diberikan pilihan nilai yang tersedia di sisi kanan atau kodomain adalah angka 85, 90, 78, dan 95.' },
      { start: 71.0, end: 78.5, text: 'Lalu apa itu range? Jika tadi kodomain adalah semua angka yang tersedia, maka range adalah anggota kodomain yang benar-benar berpasangan' },
      { start: 78.5, end: 86.0, text: 'atau terkena panah dari himpunan di sisi kiri. Jadi nilainya pasti ada di dalam kelompok kodomain tadi.' },
      { start: 86.0, end: 93.0, text: 'Pada contoh nilai tadi, Ani dapat nilai 85, Budi dapat 90, dan Cici dapat 78. Sedangkan nilai 95 tidak ada yang mendapatkan.' },
      { start: 93.0, end: 100.5, text: 'Maka range-nya hanyalah angka 85, 90, dan 78 saja! Ditulis dengan simbol Rf.' },
      { start: 100.5, end: 107.5, text: 'Sedangkan kodomainnya mencakup semua nilai yaitu 85, 90, 78, dan 95.' },
      { start: 107.5, end: 114.8, text: 'Yuk uji pemahaman analisismu pada kuis berikut!' }
    ],
    quiz: {
      id: 'quiz-2.3',
      title: 'Kuis Kasus 2.3: Menentukan Daerah Hasil (Range)',
      emoji: '🎯',
      question: 'Perhatikan contoh diagram panah pada video:\nHimpunan asal di kiri (Domain) = {Ani, Budi, Cici}\nPilihan nilai di kanan (Kodomain) = {85, 90, 78, 95}\nJika Ani bernilai 85, Budi 90, dan Cici 78,\nmanakah yang merupakan himpunan Range (Daerah Hasil)?',
      clue: 'Pilih hanya nilai pada himpunan kawan yang memiliki ujung panah pasangan.',
      options: [
        '{Ani, Budi, Cici}',
        '{85, 90, 78, 95}',
        '{95}',
        '{85, 90, 78}'
      ],
      correct: '{85, 90, 78}',
      explanation: 'Kodomain mencakup seluruh angka di sisi kanan {85, 90, 78, 95}. Namun Range (daerah hasil) hanyalah angka yang benar-benar memiliki pasangan panah, yaitu {85, 90, 78}. Angka 95 tidak masuk Range karena tidak ada yang memilihnya. ✅',
      retryQuestion: {
        question: 'Berdasarkan video, apa perbedaan utama antara Kodomain dan Range pada diagram panah?',
        clue: 'Pikirkan mana istilah untuk seluruh target yang tersedia dan mana untuk hasil yang benar-benar terpilih.',
        options: [
          'Kodomain adalah himpunan di sisi kiri, sedangkan Range adalah himpunan di sisi kanan',
          'Range selalu memiliki jumlah anggota yang lebih banyak dibandingkan Kodomain',
          'Kodomain adalah semua pilihan yang ada di sisi kanan, sedangkan Range adalah pilihan yang benar-benar terkena panah',
          'Kodomain dan Range memiliki arti dan anggota yang selalu sama persis'
        ],
        correct: 'Kodomain adalah semua pilihan yang ada di sisi kanan, sedangkan Range adalah pilihan yang benar-benar terkena panah',
        explanation: 'Benar sekali! Kodomain adalah semua anggota himpunan kawan yang tersedia di sebelah kanan, sedangkan Range adalah daerah hasil yang benar-benar mendapat panah pasangan. ✅'
      },
      audioBenar: "/materi/chapter 2/Benar/2.3 luar biasa, jawaban kamu benar karena range hanya yang terkena panah.wav",
      audioSalah: "/materi/chapter 2/Salah/2.3 yah jawabanmu belum tepat, perhatikan bedanya kodomain dengan range.wav",
      textBenar: "Luar biasa, Detektif! Jawaban kamu benar! Kodomain memang mencakup semua angka di sebelah kanan, tapi range hanya nilai yang benar-benar terkena panah, yaitu 78, 85, dan 90!",
      textSalah: "Jawabanmu belum tepat. Hati-hati ya, kodomain adalah semua pilihan di sebelah kanan, sedangkan range hanyalah yang terkena panah. Ayo coba lagi!"
    }
  },

  '2.4': {
    id: '2.4',
    chapterId: 2,
    title: 'Ringkasan Materi Fungsi',
    subtitle: 'Rangkuman lengkap aturan fungsi, domain, kodomain, dan range',
    videoSrc: '/materi/chapter 2/Chapter 2.4.mp4',
    duration: 33.68,
    subtitles: [
      { start: 0, end: 7.0, text: 'Sampailah kita di akhir chapter tentang fungsi. Berikut ringkasannya:' },
      { start: 7.0, end: 14.0, text: 'Yang pertama, fungsi adalah setiap elemen domain memiliki tepat satu pasangan di kodomain.' },
      { start: 14.0, end: 21.0, text: 'Dikatakan bukan fungsi jika ada domain yang bercabang atau tidak memiliki pasangan di kodomain.' },
      { start: 21.0, end: 28.0, text: 'Unsur-unsur fungsi sendiri ada domain, kodomain, dan range. Domain adalah himpunan di sisi kiri, kodomain seluruh himpunan kawan sisi kanan,' },
      { start: 28.0, end: 33.7, text: 'dan range yaitu yang benar-benar memiliki pasangan. Itulah ringkasan tentang fungsi, sampai ketemu di chapter selanjutnya!' }
    ],
    quiz: {
      id: 'quiz-2.4',
      title: 'Kuis Kasus 2.4: Analisis Keabsahan Fungsi & Unsur-unsurnya',
      emoji: '🧠',
      question: 'Diberikan himpunan domain A = {1, 2, 3} dan kodomain B = {a, b, c}. Seorang detektif menguji 4 relasi pasangan berurutan berikut:\n• R₁ = {(1, a), (2, a), (3, a)}\n• R₂ = {(1, a), (2, b)}\n• R₃ = {(1, b), (2, c), (2, a), (3, b)}\n• R₄ = {(1, c), (2, b), (3, a), (3, c)}\n\nBerdasarkan syarat fungsi dan unsur-unsurnya, manakah pernyataan analisis yang PALING TEPAT?',
      clue: 'Fokus periksa anggota himpunan asal di koordinat depan: pastikan seluruh angka {1, 2, 3} muncul tepat satu kali.',
      options: [
        'R₂ adalah fungsi yang sah dengan Range {a, b}, karena tidak ada anggota domain yang bercabang',
        'R₁ adalah FUNGSI yang sah dengan Range {a}, karena setiap anggota domain memiliki tepat satu pasangan',
        'R₃ adalah fungsi yang sah dengan Range {a, b, c}, karena semua elemen kodomain terisi',
        'Tidak ada satupun yang merupakan fungsi, karena pada R₁ semua anggota domain menuju ke huruf yang sama'
      ],
      correct: 'R₁ adalah FUNGSI yang sah dengan Range {a}, karena setiap anggota domain memiliki tepat satu pasangan',
      explanation: 'Tepat sekali! Syarat mutlak fungsi: setiap anggota himpunan asal (domain) wajib memiliki tepat satu pasangan. Pada R₁, semua angka 1, 2, dan 3 berpasangan tepat satu kali ke "a" (Range = {a}). Ini adalah fungsi yang sah!\nSedangkan R₂ bukan fungsi (angka 3 kosong), serta R₃ dan R₄ bukan fungsi (ada anggota domain yang bercabang). ✅',
      retryQuestion: {
        question: 'Empat siswa (Raka, Sinta, Tono, Vina) memesan makanan dari daftar menu kantin = {Bakso, Soto, Mie Ayam, Nasi Goreng}.\nTercatat pesanan:\n• Raka → Soto\n• Sinta → Bakso\n• Tono → Soto\n• Vina → Mie Ayam\n\nBerdasarkan konsep fungsi dan unsurnya, pernyataan manakah yang BENAR?',
        clue: 'Periksa apakah setiap siswa memesan tepat satu menu, lalu bedakan antara seluruh menu yang tersedia dengan menu yang benar-benar dipesan.',
        options: [
          'Relasi tersebut BUKAN fungsi karena menu Soto dipesan oleh dua orang berbeda',
          'Relasi tersebut merupakan FUNGSI dengan Range {Bakso, Soto, Mie Ayam, Nasi Goreng}',
          'Relasi pesanan tersebut merupakan FUNGSI dengan Range {Bakso, Soto, Mie Ayam}',
          'Relasi tersebut BUKAN fungsi karena ada menu Nasi Goreng yang tidak dipesan'
        ],
        correct: 'Relasi pesanan tersebut merupakan FUNGSI dengan Range {Bakso, Soto, Mie Ayam}',
        explanation: 'Benar sekali! Relasi ini adalah fungsi yang sah karena setiap siswa (domain) memilih tepat satu menu. Nasi Goreng adalah anggota Kodomain (semua menu yang tersedia), sedangkan Range (daerah hasil) hanyalah menu yang benar-benar dipesan: {Bakso, Soto, Mie Ayam}. ✅'
      },
      audioBenar: "/materi/chapter 2/Benar/2.4 mantap sekali, analisismu tepat bahwa kawan yang sama tetap sah sebagai fungsi.wav",
      audioSalah: "/materi/chapter 2/Salah/2.4 yah analisismu masih keliru, fokus periksa angka domain di depan.wav",
      textBenar: "Mantap sekali, Detektif! Analisismu sangat tajam! Meskipun semua menuju ke huruf 'a', asalkan setiap angka di domain punya tepat satu pasangan, itu tetap sah sebagai fungsi!",
      textSalah: "Iya, analisismu masih keliru. Ingat kuncinya: fokus periksa anggota himpunan asal di depan. Yang dilarang adalah jika angka depannya bercabang atau kosong!"
    }
  }
};

export const CHAPTER2_UNIVERSAL_AUDIO = {
  benar: {
    audio: "/materi/chapter 2/Benar/universal kamu keren banget, pemahamanmu tentang fungsi sudah sangat mantap.wav",
    text: "Kamu keren banget, pemahamanmu tentang fungsi sudah sangat mantap! Pertahankan ya!"
  },
  salah: {
    audio: "/materi/chapter 2/Salah/universal gapapa salah, kesalahan juga bagian dari proses belajar.wav",
    text: "Nggak apa-apa salah, kesalahan juga bagian dari proses belajar. Yuk kita coba lagi!"
  }
};

