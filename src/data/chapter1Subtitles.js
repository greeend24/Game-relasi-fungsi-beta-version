/**
 * CHAPTER 1 VIDEO LEARNING DATA & SUBTITLES
 * Narasi Video Pembelajaran & Kuis Interaktif Ramah Siswa SMP/MTs:
 * - Chapter 1_1.mp4 (Pengertian Relasi & Analogi Detektif)
 * - Chapter 1_2.mp4 (Sifat Fleksibilitas Relasi: Bercabang & Kosong)
 * - Chapter 1_3.mp4 (4 Cara Menyatakan Relasi)
 *
 * Kunci jawaban divariasikan seimbang (B, C, D, A).
 * Bahasa disesuaikan agar mudah dipahami siswa SMP/MTs kelas 8.
 */

export const CHAPTER1_VIDEOS = {
  '1.1': {
    id: '1.1',
    chapterId: 1,
    title: 'Pengertian Relasi & Analogi Detektif',
    subtitle: 'Konsep aturan penghubung antara Himpunan A dan Himpunan B',
    videoSrc: '/materi/chapter 1/Chapter 1_1.mp4',
    duration: 81.0,
    subtitles: [
      { start: 0, end: 6.0, text: 'Hai! Hari ini kita akan belajar relasi dan cara menyatakan relasi. Sudah siap semuanya?' },
      { start: 6.0, end: 12.0, text: 'Apa itu relasi dalam matematika?' },
      { start: 12.0, end: 18.0, text: 'Relasi adalah suatu aturan yang memasangkan anggota himpunan A dengan anggota himpunan B.' },
      { start: 18.0, end: 24.0, text: 'Bayangkan seorang detektif di markas: ada daftar tersangka (himpunan A)' },
      { start: 24.0, end: 30.0, text: 'dan daftar barang bukti (himpunan B). Hubungan antara tersangka dan barang bukti adalah sebuah relasi!' },
      { start: 30.0, end: 36.0, text: 'Kata kuncinya: relasi adalah aturan penghubung antara dua himpunan. Gimana, mudah kan?' },
      { start: 36.0, end: 42.0, text: 'Berikut adalah gambaran relasi tersangka dan barang buktinya.' },
      { start: 42.0, end: 48.0, text: 'Himpunan tersangka di sini sebagai daerah asal atau disebut domain,' },
      { start: 48.0, end: 54.0, text: 'dan himpunan barang bukti sebagai daerah kawan atau disebut kodomain.' },
      { start: 54.0, end: 60.0, text: 'Misalkan ada 3 tersangka dan 3 barang bukti:' },
      { start: 60.0, end: 66.0, text: 'Budi memiliki barang bukti sarung tangan, Rio memiliki barang bukti berupa sidik jari,' },
      { start: 66.0, end: 72.0, text: 'dan Rudi memiliki barang bukti berupa jejak sepatu.' },
      { start: 72.0, end: 78.0, text: 'Nah, ini namanya relasi diagram panah yang akan kita pelajari berikutnya!' },
      { start: 78.0, end: 81.0, text: 'Yuk uji pemahamanmu dengan kuis kasus berikut!' }
    ],
    quiz: {
      id: 'quiz-1.1',
      title: 'Kuis 1.1: Konsep Dasar Relasi',
      emoji: '🔍',
      question: 'Berdasarkan video penjelasan, apa yang dimaksud dengan RELASI dalam matematika?',
      clue: 'Ingat kembali: relasi adalah aturan yang menghubungkan atau memasangkan anggota himpunan A dengan anggota himpunan B.',
      options: [
        'Aturan yang menjumlahkan seluruh anggota dua himpunan secara berurutan',
        'Aturan yang memasangkan anggota Himpunan A dengan anggota Himpunan B',
        'Aturan yang mewajibkan setiap anggota memiliki pasangan yang persis sama',
        'Himpunan yang berdiri sendiri tanpa memerlukan anggota asal maupun aturan'
      ],
      correct: 'Aturan yang memasangkan anggota Himpunan A dengan anggota Himpunan B',
      explanation: 'Tepat sekali! Relasi adalah aturan yang menghubungkan atau memasangkan anggota Himpunan A dengan anggota Himpunan B. Hubungan ini sangat fleksibel dan bebas cabang maupun kosong! ✅',
      retryQuestion: {
        question: 'Jika anggota himpunan asal A dihubungkan ke anggota himpunan kawan B menggunakan garis berarah panah, bentuk penyajian visual ini dinamakan...',
        clue: 'Perhatikan tanda panah berarah yang ditarik dari himpunan asal menuju himpunan kawan.',
        options: [
          'Diagram Batang',
          'Diagram Lingkaran',
          'Diagram Panah',
          'Tabel Frekuensi'
        ],
        correct: 'Diagram Panah',
        explanation: 'Benar! Menghubungkan anggota daerah asal ke daerah kawan dengan garis berarah panah disebut Diagram Panah. ✅'
      },
      audioBenar: '/materi/chapter 3/Benar/universal kamu keren banget, dari awal aku juga sudah yakin, kamu pasti bisa.wav',
      audioSalah: '/materi/chapter 3/Salah/universal kamu ga perlu karena salah ko, kesalahan juga bisa jadi pelajaran berharga buat kamu untuk memahami materi lebih jauh.wav',
      textBenar: 'Luar biasa! Jawabanmu tepat. Relasi adalah aturan yang menghubungkan atau memasangkan anggota Himpunan A dengan anggota Himpunan B!',
      textSalah: 'Jawabanmu masih kurang tepat. Ingat kembali: kata kuncinya adalah aturan yang menghubungkan anggota himpunan A dengan anggota himpunan B. Yuk coba lagi!'
    }
  },

  '1.2': {
    id: '1.2',
    chapterId: 1,
    title: 'Sifat Fleksibilitas Relasi',
    subtitle: 'Bebas cabang dan bebas kosong: ciri khas utama relasi biasa',
    videoSrc: '/materi/chapter 1/Chapter 1_2.mp4',
    duration: 31.0,
    subtitles: [
      { start: 0, end: 6.0, text: 'Ciri khas utama relasi adalah sifatnya yang sangat fleksibel!' },
      { start: 6.0, end: 12.0, text: 'Satu: boleh bercabang. Satu anggota di A boleh punya dua atau lebih pasangan di B,' },
      { start: 12.0, end: 18.0, text: 'begitu juga sebaliknya. Contohnya: Budi memiliki barang bukti sarung tangan dan jejak sepatu.' },
      { start: 18.0, end: 24.0, text: 'Yang kedua: boleh kosong! Anggota di A ataupun B boleh tidak memiliki pasangan sama sekali' },
      { start: 24.0, end: 30.0, text: 'jika memang tidak memenuhi aturan relasi.' },
      { start: 30.0, end: 31.0, text: 'Yuk uji pemahamanmu dengan kuis berikut!' }
    ],
    quiz: {
      id: 'quiz-1.2',
      title: 'Kuis 1.2: Fleksibilitas Relasi',
      emoji: '🪢',
      question: 'Mengapa relasi matematika disebut memiliki sifat yang "sangat fleksibel atau bebas"?',
      clue: 'Pikirkan apakah anggota himpunan dibatasi jumlah pasangannya, atau bebas memiliki banyak pasangan bahkan tidak punya pasangan.',
      options: [
        'Karena jumlah anggota di himpunan asal dan kawan harus selalu sama persis',
        'Karena semua tanda panah harus berkumpul mengarah ke satu tujuan yang sama',
        'Karena anggota asal boleh bercabang (punya banyak pasangan) dan boleh kosong (tidak punya pasangan)',
        'Karena relasi hanya berlaku untuk bilangan bulat positif saja'
      ],
      correct: 'Karena anggota asal boleh bercabang (punya banyak pasangan) dan boleh kosong (tidak punya pasangan)',
      explanation: 'Ciri khas utama relasi adalah sifatnya yang sangat fleksibel: anggota asal boleh punya banyak pasangan (bercabang) dan boleh tidak punya pasangan sama sekali (kosong). ✅',
      retryQuestion: {
        question: 'Pada sebuah relasi dari himpunan A ke himpunan B, ada anggota himpunan asal A yang tidak memiliki pasangan sama sekali. Apakah hubungan ini tetap sah sebagai relasi?',
        clue: 'Ingat kembali dua sifat fleksibel relasi: boleh bercabang dan boleh kosong.',
        options: [
          'Tidak sah, karena setiap anggota wajib memiliki minimal dua pasangan',
          'Tidak sah, karena semua anggota wajib memiliki pasangan',
          'Hanya sah jika anggota yang kosong tersebut dihapus',
          'Tetap sah, karena relasi memperbolehkan anggota yang kosong atau tidak berpasangan'
        ],
        correct: 'Tetap sah, karena relasi memperbolehkan anggota yang kosong atau tidak berpasangan',
        explanation: 'Tepat sekali! Relasi sangat fleksibel dan memperbolehkan anggota himpunan asal maupun kawan untuk kosong tanpa pasangan. ✅'
      },
      audioBenar: '/materi/chapter 3/Benar/universal kamu keren banget, dari awal aku juga sudah yakin, kamu pasti bisa.wav',
      audioSalah: '/materi/chapter 3/Salah/universal kamu ga perlu karena salah ko, kesalahan juga bisa jadi pelajaran berharga buat kamu untuk memahami materi lebih jauh.wav',
      textBenar: 'Tepat sekali! Sifat fleksibel relasi artinya anggotanya bebas: boleh bercabang memiliki banyak pasangan, dan boleh juga kosong tanpa pasangan!',
      textSalah: 'Jawabanmu belum tepat. Ingat dua sifat fleksibel relasi: boleh bercabang (punya banyak pasangan) dan boleh kosong (tidak punya pasangan). Yuk coba lagi!'
    }
  },

  '1.3': {
    id: '1.3',
    chapterId: 1,
    title: '4 Cara Menyatakan Relasi',
    subtitle: 'Diagram Panah, Tabel Relasi, Diagram Kartesius, dan Himpunan Pasangan Berurutan',
    videoSrc: '/materi/chapter 1/Chapter 1_3.mp4',
    duration: 64.5,
    subtitles: [
      { start: 0, end: 6.0, text: 'Sebuah relasi bisa ditampilkan dalam 4 bentuk yang berbeda tapi isinya sama!' },
      { start: 6.0, end: 12.0, text: 'Yang pertama: ada diagram panah yang terdiri atas himpunan dan garis panah, seperti gambar relasi yang sebelumnya itu lho.' },
      { start: 12.0, end: 18.0, text: 'Yang kedua: ada tabel relasi, terdiri atas kolom nilai X dan kolom nilai Y.' },
      { start: 18.0, end: 24.0, text: 'Yang ketiga: ada diagram Kartesius berbentuk grafik berpetak dengan dua garis saling tegak lurus,' },
      { start: 24.0, end: 30.0, text: 'garis mendatar sumbu X dan garis tegak sumbu Y.' },
      { start: 30.0, end: 36.0, text: 'Hubungannya ditandai dengan titik hitam tebal di pertemuan baris dan kolom yang cocok.' },
      { start: 36.0, end: 42.0, text: 'Yang terakhir: ada himpunan pasangan berurutan.' },
      { start: 42.0, end: 48.0, text: 'Isinya berupa tanda kurung kecil berpasangan (asal, tujuan) yang dipisahkan tanda koma.' },
      { start: 48.0, end: 54.0, text: 'Urutannya tidak boleh tertukar: anggota sebelah kiri selalu daerah asal X,' },
      { start: 54.0, end: 60.0, text: 'dan sebelah kanan daerah kawan Y.' },
      { start: 60.0, end: 64.5, text: 'Yuk uji ketelitian analisismu pada kuis kasus berikut!' }
    ],
    quiz: {
      id: 'quiz-1.3',
      title: 'Kuis 1.3: 4 Cara Menyatakan Relasi',
      emoji: '📊',
      questions: [
        // ── SOAL 1: DIAGRAM PANAH (Kunci: B) ──
        {
          id: 'quiz-1.3-1',
          title: 'Cara 1: Diagram Panah',
          emoji: '🏹',
          question: 'Bagaimanakah relasi dua himpunan disajikan dalam bentuk DIAGRAM PANAH?',
          clue: 'Perhatikan garis penghubung yang memiliki mata panah penunjuk arah dari himpunan asal ke himpunan kawan.',
          options: [
            'Dengan membuat kotak tabel kolom x dan y secara vertikal',
            'Dengan menarik garis berarah panah dari anggota asal menuju anggota kawan pasangannya',
            'Dengan menuliskan pasangan angka di dalam kurung kurawal tanpa gambar',
            'Dengan membuat lingkaran bertingkat yang tidak memiliki arah garis'
          ],
          correct: 'Dengan menarik garis berarah panah dari anggota asal menuju anggota kawan pasangannya',
          explanation: 'Tepat sekali! Diagram panah menyajikan relasi dengan menggambar dua kurva himpunan dan menghubungkan anggotanya menggunakan garis berarah panah dari asal menuju kawan. ✅',
          retryQuestion: {
            question: 'Pada diagram panah, mata panah selalu ditarik mengarah dari mana ke mana?',
            clue: 'Ingat posisi daerah asal di sebelah kiri dan daerah tujuan/kawan di sebelah kanan.',
            options: [
              'Dari daerah kawan menuju daerah kawan lainnya',
              'Dari anggota himpunan asal menuju anggota himpunan kawan',
              'Bebas bolak-balik tanpa aturan arah tujuan',
              'Dari himpunan hasil menuju himpunan kosong'
            ],
            correct: 'Dari anggota himpunan asal menuju anggota himpunan kawan',
            explanation: 'Benar! Garis panah selalu ditarik mulai dari daerah asal (kiri) menuju daerah kawan (kanan). ✅'
          }
        },

        // ── SOAL 2: TABEL RELASI (Kunci: C) ──
        {
          id: 'quiz-1.3-2',
          title: 'Cara 2: Tabel Relasi',
          emoji: '📋',
          question: 'Pada penyajian relasi menggunakan TABEL, bagaimana peranan kolom sebelah kiri dan kolom sebelah kanan?',
          clue: 'Kolom pertama memuat daerah asal dan kolom kedua memuat daerah kawan pasangannya.',
          options: [
            'Kedua kolom harus selalu diisi dengan angka genap yang bernilai sama persis',
            'Kolom kiri memuat daerah kawan dan kolom kanan memuat daerah asal',
            'Kolom kiri memuat anggota daerah asal (x), dan kolom kanan memuat anggota daerah kawan pasangannya (y)',
            'Tabel relasi tidak memerlukan kolom daerah asal sama sekali'
          ],
          correct: 'Kolom kiri memuat anggota daerah asal (x), dan kolom kanan memuat anggota daerah kawan pasangannya (y)',
          explanation: 'Benar! Pada tabel relasi, kolom kiri diisi anggota daerah asal (x) dan kolom kanan diisi anggota daerah kawan pasangannya (y). ✅',
          retryQuestion: {
            question: 'Jika pada baris sebuah tabel relasi tertulis kolom x = 2 dan kolom y = 6, apa arti pasangan tersebut?',
            clue: 'Nilai pada kolom x berpasangan dengan nilai pada kolom y di baris yang sama.',
            options: [
              'Nilai 6 dikurangi 2 menghasilkan 4',
              'Anggota 6 dipasangkan ke anggota 2',
              'Anggota 2 dari himpunan asal berpasangan dengan anggota 6 di himpunan kawan',
              'Tabel tersebut keliru dan tidak bisa dibaca'
            ],
            correct: 'Anggota 2 dari himpunan asal berpasangan dengan anggota 6 di himpunan kawan',
            explanation: 'Tepat sekali! Baris tersebut menunjukkan anggota 2 dari daerah asal berpasangan dengan 6 di daerah kawan. ✅'
          }
        },

        // ── SOAL 3: DIAGRAM KARTESIUS (Kunci: D) ──
        {
          id: 'quiz-1.3-3',
          title: 'Cara 3: Diagram Kartesius',
          emoji: '📈',
          question: 'Pada DIAGRAM KARTESIUS, manakah garis sumbu yang mewakili daerah asal dan daerah kawan?',
          clue: 'Garis mendatar (horizontal) adalah sumbu X dan garis tegak (vertikal) adalah sumbu Y.',
          options: [
            'Garis tegak (sumbu Y) mewakili daerah asal, dan garis mendatar (sumbu X) mewakili daerah kawan',
            'Kedua sumbu mendatar dan tegak bebas ditukar kapan saja tanpa aturan',
            'Diagram Kartesius hanya menggunakan satu garis melengkung tanpa sumbu',
            'Garis mendatar (sumbu X) mewakili daerah asal, dan garis tegak (sumbu Y) mewakili daerah kawan'
          ],
          correct: 'Garis mendatar (sumbu X) mewakili daerah asal, dan garis tegak (sumbu Y) mewakili daerah kawan',
          explanation: 'Keren! Pada diagram Kartesius, sumbu mendatar (horizontal / X) selalu memuat daerah asal, dan sumbu tegak (vertikal / Y) memuat daerah kawan. Hubungannya ditandai dengan titik noktah tebal. ✅',
          retryQuestion: {
            question: 'Titik noktah tebal pada bidang Kartesius diletakkan pada posisi...',
            clue: 'Pertemuan antara garis tegak lurus dari sumbu mendatar x dan sumbu tegak y.',
            options: [
              'Ujung paling atas sumbu Y saja',
              'Pusat titik nol (0,0) saja',
              'Pertemuan nilai daerah asal x pada sumbu mendatar dan nilai kawan y pada sumbu tegak',
              'Di luar bidang garis Kartesius'
            ],
            correct: 'Pertemuan nilai daerah asal x pada sumbu mendatar dan nilai kawan y pada sumbu tegak',
            explanation: 'Benar sekali! Titik koordinat (noktah) diletakkan tepat pada pertemuan nilai daerah asal x dan nilai daerah kawan y. ✅'
          }
        },

        // ── SOAL 4: HIMPUNAN PASANGAN BERURUTAN (Kunci: A) ──
        {
          id: 'quiz-1.3-4',
          title: 'Cara 4: Himpunan Pasangan Berurutan',
          emoji: '🔗',
          question: 'Bagaimanakah format penulisan HIMPUNAN PASANGAN BERURUTAN yang benar dari daerah asal x ke daerah kawan y?',
          clue: 'Gunakan kurung kurawal { } di luar, dan kurung biasa (asal, kawan) di dalam. Urutannya tidak boleh tertukar!',
          options: [
            'Ditulis dalam tanda kurung kurawal dengan format (x, y), di mana x daerah asal dan y daerah kawan',
            'Ditulis bebas terbalik (y, x) tanpa tanda koma pemisah antar elemen',
            'Ditulis hanya dengan tanda penjumlahan: {x + y}',
            'Ditulis dalam format pecahan: {x / y}'
          ],
          correct: 'Ditulis dalam tanda kurung kurawal dengan format (x, y), di mana x daerah asal dan y daerah kawan',
          explanation: 'Hebat! Format penulisan pasangan berurutan selalu (x, y) di mana anggota daerah asal selalu di sebelah kiri (depan) dan daerah kawan di sebelah kanan (belakang). Urutannya tidak boleh dibalik! ✅',
          retryQuestion: {
            question: 'Jika Rino berpasangan dengan Biru, dan Sinta berpasangan dengan Merah, bagaimanakah penulisan himpunan pasangan berurutan yang benar?',
            clue: 'Nama siswa (daerah asal) ditulis di depan, dan warna (daerah kawan) ditulis di belakang.',
            options: [
              '{(Rino, Biru), (Sinta, Merah)}',
              '{(Biru, Rino), (Merah, Sinta)}',
              '{Rino + Biru, Sinta + Merah}',
              '(Rino - Biru - Sinta - Merah)'
            ],
            correct: '{(Rino, Biru), (Sinta, Merah)}',
            explanation: 'Tepat sekali! Anggota asal diletakkan di depan dan anggota kawan di belakang: {(Rino, Biru), (Sinta, Merah)}. ✅'
          }
        }
      ],
      audioBenar: '/materi/chapter 3/Benar/universal kamu keren banget, dari awal aku juga sudah yakin, kamu pasti bisa.wav',
      audioSalah: '/materi/chapter 3/Salah/universal kamu ga perlu karena salah ko, kesalahan juga bisa jadi pelajaran berharga buat kamu untuk memahami materi lebih jauh.wav',
      textBenar: 'Keren sekali! Kamu telah berhasil menuntaskan semua kuis 4 cara menyatakan relasi dengan sempurna! 🏆',
      textSalah: 'Jawabanmu belum tepat. Coba perhatikan kembali ciri khas bentuk penyajian relasi yang ditanyakan, yuk coba lagi!'
    }
  }
};

export const CHAPTER1_UNIVERSAL_AUDIO = {
  benar: {
    audio: '/materi/chapter 3/Benar/universal kamu keren banget, dari awal aku juga sudah yakin, kamu pasti bisa.wav',
    text: 'Kamu keren banget! Dari awal aku juga sudah yakin, kamu pasti bisa! 🦉✨'
  },
  salah: {
    audio: '/materi/chapter 3/Salah/universal kamu ga perlu karena salah ko, kesalahan juga bisa jadi pelajaran berharga buat kamu untuk memahami materi lebih jauh.wav',
    text: 'Kamu tidak perlu berkecil hati karena salah, kesalahan juga bisa jadi pelajaran berharga untuk memahami materi lebih jauh! 💪🔍'
  }
};
