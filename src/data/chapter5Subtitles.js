/**
 * CHAPTER 5 VIDEO LEARNING DATA & SUBTITLES
 * Transcribed verbatim from original narration:
 * - Chapter 5.1.mp4 (Pengertian & Syarat Korespondensi Satu-Satu)
 * - Chapter 5.2.mp4 (Menghitung Banyak Korespondensi / n!)
 * - Chapter 5.3.mp4 (Penerapan Nyata Korespondensi Satu-Satu)
 */

export const CHAPTER5_UNIVERSAL_AUDIO = {
  benar: {
    audio: '/materi/chapter 3/Benar/universal kamu keren banget, dari awal aku juga sudah yakin, kamu pasti bisa.wav',
    text: 'Luar biasa! Jawabanmu benar! Kamu memahami konsep korespondensi satu-satu dengan sempurna. 🏆'
  },
  salah: {
    audio: '/materi/chapter 3/Salah/universal kamu ga perlu karena salah ko, kesalahan juga bisa jadi pelajaran berharga buat kamu untuk memahami materi lebih jauh.wav',
    text: 'Jawabanmu belum tepat, tapi tidak apa-apa! Mari kita pelajari kembali konsep korespondensi satu-satu dan coba lagi.'
  }
};

export const CHAPTER5_VIDEOS = {
  '5.1': {
    id: '5.1',
    chapterId: 5,
    title: 'Pengertian & Syarat Korespondensi 1:1',
    subtitle: 'Fungsi bijektif: satu lawan satu sempurna tanpa ada sisa maupun cabang',
    videoSrc: '/materi/Chapter 5/Chapter 5.1.mp4',
    duration: 176.6,
    subtitles: [
      { start: 0, end: 6, text: 'Hai teman-teman! Kali ini kita akan belajar tentang korespondensi satu-satu.' },
      { start: 6, end: 12, text: 'Gimana, sudah siap belum? Let\'s go!' },
      { start: 12, end: 18, text: 'Apa itu korespondensi satu-satu? Korespondensi satu-satu adalah fungsi khusus...' },
      { start: 18, end: 24, text: 'di mana setiap anggota himpunan A dipasangkan tepat satu dengan anggota himpunan B...' },
      { start: 24, end: 30, text: 'dan begitu juga sebaliknya!' },
      { start: 30, end: 36, text: 'Setiap anggota A mempunyai tepat satu pasangan di B, dan setiap anggota B juga punya tepat satu pasangan dari A.' },
      { start: 36, end: 42, text: 'Arah panah boleh bersilangan ya, tepat satu bukan berarti harus sejajar lurus.' },
      { start: 42, end: 48, text: 'Dan tidak ada yang mendua, tidak ada juga yang kosong atau menganggur.' },
      { start: 48, end: 54, text: 'Dalam matematika, istilah lainnya adalah fungsi bijektif: satu lawan satu sempurna.' },
      { start: 54, end: 60, text: 'Contohnya: himpunan A ada 3 siswa (Ani, Budi, Cici) dan B ada 3 kursi (Kursi 1, Kursi 2, Kursi 3).' },
      { start: 60, end: 66, text: 'Masing-masing siswa duduk di tepat 1 kursi, tidak ada kursi kosong dan tidak ada yang berebut!' },
      { start: 66, end: 72, text: 'Syarat mutlak yang harus dipenuhi: banyak anggota himpunan A (n(A)) harus sama dengan banyak anggota B (n(B)).' },
      { start: 72, end: 78, text: 'Rumusnya: n(A) = n(B).' },
      { start: 78, end: 84, text: 'Jika jumlah anggotanya berbeda, pasti akan ada elemen yang bercabang atau tersisa!' }
    ],
    quiz: {
      id: 'quiz-5.1',
      title: 'Kuis 5.1: Syarat Korespondensi 1:1',
      emoji: '🔗',
      question: 'Manakah syarat mutlak agar suatu relasi antara himpunan A dan B dapat disebut sebagai KORESPONDENSI SATU-SATU (fungsi bijektif)?',
      clue: 'Perhatikan jumlah anggota kedua himpunan dan aturan pemetaannya: tidak boleh ada yang mendua dan tidak boleh ada yang kosong.',
      options: [
        'Banyak anggota n(A) harus sama dengan n(B), dan setiap elemen berpasangan tepat 1:1 timbal balik',
        'Setiap anggota A boleh memiliki 2 kawan di B asalkan n(A) = n(B)',
        'Anggota himpunan B boleh ada yang tidak memiliki pasangan',
        'Jumlah anggota n(A) harus lebih banyak daripada n(B)'
      ],
      correct: 'Banyak anggota n(A) harus sama dengan n(B), dan setiap elemen berpasangan tepat 1:1 timbal balik',
      explanation: 'Tepat sekali! Syarat mutlak korespondensi satu-satu adalah n(A) = n(B), di mana setiap anggota A memiliki tepat satu kawan di B, dan setiap anggota B memiliki tepat satu kawan di A tanpa sisa maupun cabang. ✅',
      retryQuestion: {
        question: 'Diberikan himpunan A = {1, 2, 3} dan B = {p, q}. Apakah relasi dari A ke B dapat membentuk korespondensi satu-satu?',
        clue: 'Hitung jumlah n(A) dan n(B). Apakah n(A) sama dengan n(B)?',
        options: [
          'Tidak bisa, karena jumlah anggota n(A) tidak sama dengan n(B) (3 ≠ 2)',
          'Bisa, karena semua anggota himpunan A punya pasangan',
          'Bisa, asalkan salah satu anggota B menerima dua panah',
          'Bisa, karena relasi selalu bersifat fleksibel'
        ],
        correct: 'Tidak bisa, karena jumlah anggota n(A) tidak sama dengan n(B) (3 ≠ 2)',
        explanation: 'Benar! Karena n(A) = 3 sedangkan n(B) = 2, maka n(A) ≠ n(B). Syarat mutlak korespondensi satu-satu tidak terpenuhi. ✅'
      }
    }
  },

  '5.2': {
    id: '5.2',
    chapterId: 5,
    title: 'Menghitung Banyak Korespondensi (n!)',
    subtitle: 'Menerapkan rumus faktorial n! = n × (n−1) × ... × 1',
    videoSrc: '/materi/Chapter 5/Chapter 5.2.mp4',
    duration: 100.5,
    subtitles: [
      { start: 0, end: 6, text: 'Lanjut! Sekarang kita akan belajar gimana caranya menghitung banyaknya kemungkinan korespondensi satu-satu.' },
      { start: 6, end: 12, text: 'Jika n(A) = n(B) = n, maka banyaknya korespondensi satu-satu yang mungkin dibentuk adalah...' },
      { start: 12, end: 18, text: 'n faktorial (disimbolkan n!).' },
      { start: 18, end: 24, text: 'Rumus untuk n faktorial adalah: n! = n × (n−1) × (n−2) × ... × 1.' },
      { start: 24, end: 30, text: 'Contohnya: jika n = 2, maka 2! = 2 × 1 = 2 cara.' },
      { start: 30, end: 36, text: 'Jika n = 3, maka 3! = 3 × 2 × 1 = 6 cara.' },
      { start: 36, end: 42, text: 'Jika n = 4, maka 4! = 4 × 3 × 2 × 1 = 24 cara.' },
      { start: 42, end: 48, text: 'Analoginya: 3 orang memilih 3 kursi antrian menghasilkan 6 susunan tempat duduk berbeda.' },
      { start: 48, end: 54, text: 'Supaya tidak perlu menggambar satu persatu, kita gunakan rumus n faktorial ini. Mudah kan!' }
    ],
    quiz: {
      id: 'quiz-5.2',
      title: 'Kuis 5.2: Hitung Banyak Korespondensi',
      emoji: '🔢',
      question: 'Diketahui himpunan P = {1, 2, 3, 4} dan himpunan Q = {a, b, c, d}.\nBerapakah banyaknya kemungkinan korespondensi satu-satu yang dapat dibentuk dari P ke Q?',
      clue: 'Hitung n = n(P) = n(Q) = 4. Gunakan rumus n! = 4 × 3 × 2 × 1.',
      options: ['24 cara', '16 cara', '12 cara', '6 cara'],
      correct: '24 cara',
      explanation: 'Karena n(P) = n(Q) = 4, maka banyaknya korespondensi satu-satu adalah:\nn! = 4! = 4 × 3 × 2 × 1 = 24 cara. ✅',
      retryQuestion: {
        question: 'Jika himpunan A = {merah, kuning, hijau} dan B = {1, 2, 3}, berapa banyak korespondensi satu-satu yang mungkin dibentuk?',
        clue: 'Di sini n = 3. Hitung 3 faktorial: 3 × 2 × 1.',
        options: ['6 cara', '9 cara', '3 cara', '12 cara'],
        correct: '6 cara',
        explanation: 'n = 3, maka banyak kemungkinan korespondensi satu-satu = 3! = 3 × 2 × 1 = 6 cara. ✅'
      }
    }
  },

  '5.3': {
    id: '5.3',
    chapterId: 5,
    title: 'Penerapan Nyata Korespondensi 1:1',
    subtitle: 'Contoh nyata hubungan satu lawan satu eksklusif di kehidupan sehari-hari',
    videoSrc: '/materi/Chapter 5/Chapter 5.3.mp4',
    duration: 68.2,
    subtitles: [
      { start: 0, end: 6, text: 'Terakhir, kita akan membahas penerapan korespondensi satu-satu di dunia nyata.' },
      { start: 6, end: 12, text: 'Contoh korespondensi satu-satu dalam kehidupan sehari-hari kita antara lain:' },
      { start: 12, end: 18, text: 'Pertama, setiap warga negara Indonesia memiliki tepat satu Nomor Induk Kependudukan (NIK)...' },
      { start: 18, end: 24, text: 'dan setiap NIK hanya dimiliki oleh tepat satu orang.' },
      { start: 24, end: 30, text: 'Kedua, setiap kendaraan bermotor memiliki satu nomor plat unik.' },
      { start: 30, end: 36, text: 'Dan ketiga, setiap peserta ujian menempati tepat satu nomor meja ujian.' },
      { start: 36, end: 42, text: 'Ciri khas korespondensi satu-satu adalah sifatnya yang unik dan eksklusif...' },
      { start: 42, end: 48, text: 'karena satu lawan satu, tidak ada duplikasi, dan tidak ada yang tersisa.' }
    ],
    quiz: {
      id: 'quiz-5.3',
      title: 'Kuis 5.3: Penerapan Nyata',
      emoji: '🌍',
      question: 'Manakah di bawah ini yang merupakan contoh penerapan nyata KORESPONDENSI SATU-SATU dalam kehidupan sehari-hari?',
      clue: 'Pilih hubungan yang bersifat mutlak 1-lawan-1 unik (tidak boleh ada 1 orang punya dua, dan tidak boleh ada 1 identitas dipakai bersama).',
      options: [
        'Setiap warga negara Indonesia dengan Nomor Induk Kependudukan (NIK)',
        'Setiap siswa dengan mata pelajaran yang disukainya di sekolah',
        'Setiap ibu dengan anak-anak kandungnya',
        'Setiap orang dengan nomor sepatu yang pernah dibelinya'
      ],
      correct: 'Setiap warga negara Indonesia dengan Nomor Induk Kependudukan (NIK)',
      explanation: 'Benar sekali! Satu orang warga negara Indonesia hanya memiliki tepat 1 NIK unik, dan 1 NIK hanya dimiliki oleh 1 orang (satu lawan satu eksklusif tanpa duplikasi). ✅',
      retryQuestion: {
        question: 'Manakah hubungan berikut yang BUKAN merupakan korespondensi satu-satu?',
        clue: 'Cari hubungan di mana satu pihak bisa memiliki lebih dari satu pasangan.',
        options: [
          'Hubungan antara pembeli dengan makanan favoritnya di kantin',
          'Hubungan antara siswa dengan Nomor Induk Siswa Nasional (NISN)',
          'Hubungan antara peserta ujian dengan nomor meja ujiannya',
          'Hubungan antara negara dengan ibu kota resminya'
        ],
        correct: 'Hubungan antara pembeli dengan makanan favoritnya di kantin',
        explanation: 'Tepat! Seorang pembeli bisa menyukai lebih dari satu makanan favorit (bercabang), sehingga bukan merupakan korespondensi satu-satu. ✅'
      }
    }
  }
};
