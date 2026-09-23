/**
 * QUEST MODE QUESTION GENERATOR ENGINE (DETEKTIF DATA)
 * Generates exactly 10 curriculum-aligned, high-depth questions per chapter.
 * 
 * Karakteristik Khusus Quest Mode (Ujian Tantangan):
 * - Memiliki volume data/elemen LEBIH BANYAK dan LEBIH MENANTANG dibanding Latihan Biasa
 *   (misal: 4-5 nama siswa pada HPB/tabel/kartesius, 6-8 kartu pada drag-drop, 4-7 tali panah).
 * - Tetap setia pada kurikulum masing-masing bab:
 *   • Bab 1: Murni RELASI kontekstual (fleksibel/bercabang, TANPA rumus fungsi f(x)).
 *   • Bab 2: UNSUR FUNGSI (Domain, Kodomain, Range, Syarat 1-kawan).
 *   • Bab 3: NOTASI & RUMUS FUNGSI (Substitusi, bayangan, prapeta, aljabar).
 *   • Bab 4: GRAFIK FUNGSI LINEAR (Garis lurus, titik potong, gradien).
 *   • Bab 5: KORESPONDENSI SATU-SATU (Bijeksi timbal balik, n!, kabel brankas).
 * 
 * Bloom Distribution per Chapter:
 * Q1 - Q3: C3 (Aplikasi) - 50 Poin
 * Q4 - Q7: C4 (Analisis Kasus) - 80 Poin
 * Q8 - Q10: C5 (Evaluasi & Pemecahan Kode) - 120 Poin
 */

import { shuffleArray } from '../utils/shuffle.js';

export function generateSubbabQuestions(chapterId) {
  const cid = Number(chapterId) || 1;
  const questions = [];

  // ═════════════════════════════════════════════════════════════════════════
  // CHAPTER 1: PENGERTIAN & CARA MENYATAKAN RELASI (DATA KAYA & BESAR)
  // Menampilkan relasi dunia nyata dengan 4-5 siswa, banyak pasangan,
  // dan sifat fleksibel (boleh bercabang & boleh kosong). TANPA FUNGSI/RUMUS.
  // ═════════════════════════════════════════════════════════════════════════
  if (cid === 1) {
    // Q1: C3 MCQ - Definisi & Sifat Fleksibel Relasi (Peminjaman Buku Perpustakaan)
    questions.push({
      id: 1, level: 'C3', pts: 50, type: 'MCQ',
      question: 'Di perpustakaan sekolah, tercatat data peminjaman buku 5 siswa: Ali meminjam Ensiklopedia dan Novel, Budi meminjam Komik Edukasi, Citra meminjam Atlas Dunia dan Buku Sejarah, Doni meminjam Novel, sedangkan Eka tidak meminjam buku apa pun karena membaca di tempat. Mengapa data peminjaman buku tersebut sah digolongkan sebagai RELASI matematika?',
      options: [
        'Karena aturan relasi bersifat fleksibel: anggota asal boleh memiliki lebih dari satu pasangan dan boleh tidak memilih pasangan',
        'Hanya sah apabila seluruh siswa meminjam judul buku yang sama persis',
        'Tidak sah sebagai relasi karena ada siswa yang meminjam lebih dari satu buku dan ada yang tidak meminjam',
        'Hanya sah apabila jumlah siswa di perpustakaan sama banyak dengan jumlah seluruh buku di rak'
      ],
      correct: 'Karena aturan relasi bersifat fleksibel: anggota asal boleh memiliki lebih dari satu pasangan dan boleh tidak memilih pasangan',
      explanation: 'Dalam matematika, aturan relasi antara dua himpunan bersifat sangat fleksibel (tidak kaku): anggota himpunan asal diperbolehkan memiliki lebih dari satu kawan pasangan (bercabang) dan diperbolehkan tidak memiliki pasangan sama sekali (kosong).'
    });

    // Q2: C3 HPB_BUILDER - Cita-Cita & Profesi Impian 4 Siswa (Open-Ended)
    questions.push({
      id: 2, level: 'C3', pts: 50, type: 'HPB_BUILDER',
      isOpenEnded: true,
      question: '[Soal Terbuka] Pada sesi bimbingan karier kelas, buatlah himpunan pasangan berurutan R untuk relasi "cita-cita profesi impian" antara 4 siswa dan profesi yang mereka minati! Kamu bebas menentukan cita-cita tiap siswa dari kartu yang tersedia.',
      subInstruction: 'Pindahkan kartu nama siswa dan profesi ke seluruh kotak kurung [ ? ] yang kosong (bebas berkreasi):',
      setName: 'R',
      pairs: [
        { idX: 'p1_x', idY: 'p1_y', ansX: 'Andi', ansY: 'Dokter', fixedX: null, fixedY: null },
        { idX: 'p2_x', idY: 'p2_y', ansX: 'Budi', ansY: 'Arsitek', fixedX: null, fixedY: null },
        { idX: 'p3_x', idY: 'p3_y', ansX: 'Citra', ansY: 'Programmer', fixedX: null, fixedY: null },
        { idX: 'p4_x', idY: 'p4_y', ansX: 'Doni', ansY: 'Pilot', fixedX: null, fixedY: null }
      ],
      tokens: ['Andi', 'Budi', 'Citra', 'Doni', 'Eka', 'Dokter', 'Arsitek', 'Programmer', 'Pilot', 'Animator', 'Penulis'],
      openEndedRules: {
        slots: {
          'p1_x': { role: 'X', validTokens: ['Andi', 'Budi', 'Citra', 'Doni', 'Eka'] },
          'p1_y': { role: 'Y', validTokens: ['Dokter', 'Arsitek', 'Programmer', 'Pilot', 'Animator', 'Penulis'] },
          'p2_x': { role: 'X', validTokens: ['Andi', 'Budi', 'Citra', 'Doni', 'Eka'] },
          'p2_y': { role: 'Y', validTokens: ['Dokter', 'Arsitek', 'Programmer', 'Pilot', 'Animator', 'Penulis'] },
          'p3_x': { role: 'X', validTokens: ['Andi', 'Budi', 'Citra', 'Doni', 'Eka'] },
          'p3_y': { role: 'Y', validTokens: ['Dokter', 'Arsitek', 'Programmer', 'Pilot', 'Animator', 'Penulis'] },
          'p4_x': { role: 'X', validTokens: ['Andi', 'Budi', 'Citra', 'Doni', 'Eka'] },
          'p4_y': { role: 'Y', validTokens: ['Dokter', 'Arsitek', 'Programmer', 'Pilot', 'Animator', 'Penulis'] }
        },
        distinctX: true,
        criteriaDescription: 'Bebas menentukan cita-cita asalkan setiap kurung berformat (Nama Siswa, Profesi) dan seluruh kotak terisi.'
      },
      correctSlots: {
        'p1_x': 'Andi', 'p1_y': 'Dokter',
        'p2_x': 'Budi', 'p2_y': 'Arsitek',
        'p3_x': 'Citra', 'p3_y': 'Programmer',
        'p4_x': 'Doni', 'p4_y': 'Pilot'
      },
      explanation: 'Luar biasa! Pada soal terbuka (open-ended), kamu bebas memasangkan setiap siswa dengan profesi impian pilihannya.'
    });

    // Q3: C3 ARROWS - Moda Transportasi ke Sekolah 4 Siswa
    questions.push({
      id: 3, level: 'C3', pts: 50, type: 'ARROWS',
      question: 'Data survei sarana berangkat sekolah dari 4 siswa kelas 8 mencatat:\n• Ali naik Sepeda dan Jalan Kaki.\n• Budi naik Bus Sekolah dan Sepeda.\n• Cici naik Ojek Online.\n• Dedi naik Sepeda.\nHubungkan tali panah untuk membentuk relasi "Kendaraan ke Sekolah" sesuai data tersebut!',
      labelA: 'Himpunan A (Siswa)',
      labelB: 'Himpunan B (Transportasi)',
      setA: ['Ali', 'Budi', 'Cici', 'Dedi'],
      setB: ['Sepeda', 'Bus Sekolah', 'Ojek Online', 'Jalan Kaki'],
      rule: 'transportasi_sekolah',
      correctPairs: [
        'Ali->Sepeda', 'Ali->Jalan Kaki',
        'Budi->Bus Sekolah', 'Budi->Sepeda',
        'Cici->Ojek Online',
        'Dedi->Sepeda'
      ],
      explanation: 'Tepat sekali! Relasi transportasi terbentuk sesuai data: Ali (Sepeda, Jalan Kaki), Budi (Bus Sekolah, Sepeda), Cici (Ojek Online), dan Dedi (Sepeda).'
    });

    // Q4: C4 TABLE_BUILDER - Aplikasi Belajar Siswa
    questions.push({
      id: 4, level: 'C4', pts: 80, type: 'TABLE_BUILDER',
      question: 'Lima siswa mencatat aplikasi digital yang digunakan untuk tugas belajar multimedia:\n• Rian menggunakan Canva\n• Siti menggunakan CapCut\n• Doni menggunakan Scratch\n• Putri menggunakan Duolingo\n• Eka menggunakan YouTube Edu\nLengkapi tabel relasi "Aplikasi Belajar Siswa" berikut dengan menaruh kartu ke dalam sel [ ? ] yang tepat!',
      tableTitle: "Tabel Relasi: 'Aplikasi Belajar 5 Siswa'",
      subInstruction: 'Pindahkan kartu nama siswa atau aplikasi ke sel tabel [ ? ] yang kosong:',
      headers: ['Nama Siswa', 'Aplikasi Favorit'],
      rows: [
        { idX: 'r1_x', valX: 'Rian', isSlotX: false, idY: 'r1_y', valY: null, isSlotY: true },
        { idX: 'r2_x', valX: null, isSlotX: true, idY: 'r2_y', valY: 'CapCut', isSlotY: false },
        { idX: 'r3_x', valX: 'Doni', isSlotX: false, idY: 'r3_y', valY: null, isSlotY: true },
        { idX: 'r4_x', valX: 'Putri', isSlotX: false, idY: 'r4_y', valY: null, isSlotY: true },
        { idX: 'r5_x', valX: null, isSlotX: true, idY: 'r5_y', valY: 'YouTube Edu', isSlotY: false }
      ],
      tokens: ['Canva', 'Siti', 'Scratch', 'Duolingo', 'Eka', 'Notion', 'Photoshop'],
      correctCells: {
        'r1_y': 'Canva',
        'r2_x': 'Siti',
        'r3_y': 'Scratch',
        'r4_y': 'Duolingo',
        'r5_x': 'Eka'
      },
      explanation: 'Tabel relasi aplikasi belajar berhasil dilengkapi dengan tepat: Rian ➔ Canva, Siti ➔ CapCut, Doni ➔ Scratch, Putri ➔ Duolingo, dan Eka ➔ YouTube Edu.'
    });

    // Q5: C4 CARTESIAN - Jadwal Piket Kebersihan Kelas 4 Siswa
    questions.push({
      id: 5, level: 'C4', pts: 80, type: 'CARTESIAN',
      question: 'Empat siswa terjadwal piket kebersihan kelas sebagai berikut:\n• Andi piket hari Senin dan Rabu.\n• Budi piket hari Selasa.\n• Citra piket hari Senin dan Kamis.\n• Doni piket hari Selasa dan Rabu.\nTandai seluruh pasangan titik jadwal piket siswa tersebut pada diagram Kartesius!',
      labelX: 'Nama Siswa',
      labelY: 'Hari Piket',
      xLabels: { 1: 'Andi', 2: 'Budi', 3: 'Citra', 4: 'Doni' },
      yLabels: { 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis' },
      minX: 0, maxX: 4, minY: 0, maxY: 4,
      targetPoints: [
        [1, 1], [1, 3],
        [2, 2],
        [3, 1], [3, 4],
        [4, 2], [4, 3]
      ],
      hint: 'Pasang titik piket: Andi (Senin, Rabu), Budi (Selasa), Citra (Senin, Kamis), Doni (Selasa, Rabu).',
      explanation: 'Titik koordinat jadwal piket kelas berhasil kamu pasang tepat: Andi (Senin, Rabu), Budi (Selasa), Citra (Senin, Kamis), dan Doni (Selasa, Rabu).'
    });

    // Q6: C4 DRAG_DROP - Klasifikasi Pasangan Berurutan Berdasarkan Aturan Relasi
    questions.push({
      id: 6, level: 'C4', pts: 80, type: 'DRAG_DROP',
      question: 'Diberikan enam pasangan berurutan (x, y). Analisislah aturan relasi dari x ke y, lalu kelompokkan setiap pasangan ke dalam kotak Relasi "Setengah Dari" atau Relasi "Dua Kali Dari"!',
      subInstruction: "Pindahkan setiap pasangan (x, y) ke kotak aturan relasi yang tepat:",
      categories: ['Relasi "Setengah Dari"', 'Relasi "Dua Kali Dari"'],
      items: [
        '(2, 4)',
        '(3, 6)',
        '(5, 10)',
        '(4, 2)',
        '(6, 3)',
        '(10, 5)'
      ],
      correctMapping: {
        '(2, 4)': 'Relasi "Setengah Dari"',
        '(3, 6)': 'Relasi "Setengah Dari"',
        '(5, 10)': 'Relasi "Setengah Dari"',
        '(4, 2)': 'Relasi "Dua Kali Dari"',
        '(6, 3)': 'Relasi "Dua Kali Dari"',
        '(10, 5)': 'Relasi "Dua Kali Dari"'
      },
      explanation: 'Relasi "Setengah Dari" (x = ½y): (2, 4), (3, 6), dan (5, 10) karena 2 = ½(4), 3 = ½(6), dan 5 = ½(10).\nRelasi "Dua Kali Dari" (x = 2y): (4, 2), (6, 3), dan (10, 5) karena 4 = 2(2), 6 = 2(3), dan 10 = 2(5).'
    });

    // Q7: C4 HPB_BUILDER - Kota Kelahiran 4 Siswa
    questions.push({
      id: 7, level: 'C4', pts: 80, type: 'HPB_BUILDER',
      question: 'Empat siswa mencatat kota tempat kelahiran mereka:\n• Fajar lahir di Bandung\n• Gita lahir di Surabaya\n• Hadi lahir di Jakarta\n• Indah lahir di Yogyakarta\nLengkapi himpunan pasangan berurutan untuk relasi "Kota Kelahiran" tersebut!',
      subInstruction: 'Pindahkan kartu nama siswa atau kota ke dalam kotak kurung [ ? ] yang tepat:',
      setName: 'R',
      pairs: [
        { idX: 'p1_x', idY: 'p1_y', ansX: 'Fajar', ansY: 'Bandung', fixedX: 'Fajar', fixedY: null },
        { idX: 'p2_x', idY: 'p2_y', ansX: 'Gita', ansY: 'Surabaya', fixedX: null, fixedY: 'Surabaya' },
        { idX: 'p3_x', idY: 'p3_y', ansX: 'Hadi', ansY: 'Jakarta', fixedX: 'Hadi', fixedY: null },
        { idX: 'p4_x', idY: 'p4_y', ansX: 'Indah', ansY: 'Yogyakarta', fixedX: null, fixedY: null }
      ],
      tokens: ['Bandung', 'Gita', 'Jakarta', 'Indah', 'Yogyakarta', 'Semarang', 'Medan', 'Denpasar'],
      correctSlots: {
        'p1_y': 'Bandung',
        'p2_x': 'Gita',
        'p3_y': 'Jakarta',
        'p4_x': 'Indah',
        'p4_y': 'Yogyakarta'
      },
      explanation: 'Himpunan pasangan berurutan yang tepat: R = { (Fajar, Bandung), (Gita, Surabaya), (Hadi, Jakarta), (Indah, Yogyakarta) }.'
    });

    // Q8: C5 ARROWS - Peminjaman Buku Perpustakaan 4 Siswa
    questions.push({
      id: 8, level: 'C5', pts: 120, type: 'ARROWS',
      question: 'Data peminjaman buku perpustakaan sekolah pada hari Senin mencatat:\n• Rani meminjam Ensiklopedia Sains dan Novel Petualangan.\n• Tono meminjam Komik Edukasi dan Buku Sejarah.\n• Umar meminjam Novel Petualangan.\n• Vina meminjam Ensiklopedia Sains dan Komik Edukasi.\nHubungkan tali panah untuk membentuk diagram panah relasi "Buku yang Dipinjam" sesuai catatan tersebut!',
      labelA: 'Himpunan A (Siswa)',
      labelB: 'Himpunan B (Buku Perpustakaan)',
      setA: ['Rani', 'Tono', 'Umar', 'Vina'],
      setB: ['Ensiklopedia Sains', 'Novel Petualangan', 'Komik Edukasi', 'Buku Sejarah'],
      rule: 'buku_perpustakaan_kompleks',
      correctPairs: [
        'Rani->Ensiklopedia Sains', 'Rani->Novel Petualangan',
        'Tono->Komik Edukasi', 'Tono->Buku Sejarah',
        'Umar->Novel Petualangan',
        'Vina->Ensiklopedia Sains', 'Vina->Komik Edukasi'
      ],
      explanation: 'Tepat sekali! Relasi peminjaman buku perpustakaan terhubung sesuai data: Rani (Ensiklopedia Sains, Novel Petualangan), Tono (Komik Edukasi, Buku Sejarah), Umar (Novel Petualangan), dan Vina (Ensiklopedia Sains, Komik Edukasi).'
    });

    // Q9: C5 TABLE_BUILDER - Jabatan Pengurus Kelas 5 Siswa (Open-Ended)
    questions.push({
      id: 9, level: 'C5', pts: 120, type: 'TABLE_BUILDER',
      isOpenEnded: true,
      question: '[Soal Terbuka] Lengkapi tabel relasi "Jabatan Pengurus Kelas" untuk 5 siswa! Kamu bebas menentukan siapa memegang amanah tugas apa dari kartu yang tersedia.',
      tableTitle: "Tabel Relasi: 'Pengurus Kelas 5 Siswa'",
      subInstruction: 'Pindahkan kartu nama siswa dan jabatan ke seluruh sel tabel [ ? ] yang kosong (bebas berkreasi):',
      headers: ['Nama Siswa', 'Jabatan Kelas'],
      rows: [
        { idX: 'r1_x', isSlotX: true, valX: null, idY: 'r1_y', isSlotY: true, valY: null },
        { idX: 'r2_x', isSlotX: true, valX: null, idY: 'r2_y', isSlotY: true, valY: null },
        { idX: 'r3_x', isSlotX: true, valX: null, idY: 'r3_y', isSlotY: true, valY: null },
        { idX: 'r4_x', isSlotX: true, valX: null, idY: 'r4_y', isSlotY: true, valY: null },
        { idX: 'r5_x', isSlotX: true, valX: null, idY: 'r5_y', isSlotY: true, valY: null }
      ],
      tokens: ['Bayu', 'Laras', 'Dimas', 'Siska', 'Taufik', 'Rian', 'Ketua Kelas', 'Sekretaris', 'Bendahara', 'Seksi Kebersihan', 'Seksi Mading', 'Seksi IT', 'Seksi Disiplin'],
      openEndedRules: {
        cells: {
          'r1_x': { role: 'X', validTokens: ['Bayu', 'Laras', 'Dimas', 'Siska', 'Taufik', 'Rian'] },
          'r1_y': { role: 'Y', validTokens: ['Ketua Kelas', 'Sekretaris', 'Bendahara', 'Seksi Kebersihan', 'Seksi Mading', 'Seksi IT', 'Seksi Disiplin'] },
          'r2_x': { role: 'X', validTokens: ['Bayu', 'Laras', 'Dimas', 'Siska', 'Taufik', 'Rian'] },
          'r2_y': { role: 'Y', validTokens: ['Ketua Kelas', 'Sekretaris', 'Bendahara', 'Seksi Kebersihan', 'Seksi Mading', 'Seksi IT', 'Seksi Disiplin'] },
          'r3_x': { role: 'X', validTokens: ['Bayu', 'Laras', 'Dimas', 'Siska', 'Taufik', 'Rian'] },
          'r3_y': { role: 'Y', validTokens: ['Ketua Kelas', 'Sekretaris', 'Bendahara', 'Seksi Kebersihan', 'Seksi Mading', 'Seksi IT', 'Seksi Disiplin'] },
          'r4_x': { role: 'X', validTokens: ['Bayu', 'Laras', 'Dimas', 'Siska', 'Taufik', 'Rian'] },
          'r4_y': { role: 'Y', validTokens: ['Ketua Kelas', 'Sekretaris', 'Bendahara', 'Seksi Kebersihan', 'Seksi Mading', 'Seksi IT', 'Seksi Disiplin'] },
          'r5_x': { role: 'X', validTokens: ['Bayu', 'Laras', 'Dimas', 'Siska', 'Taufik', 'Rian'] },
          'r5_y': { role: 'Y', validTokens: ['Ketua Kelas', 'Sekretaris', 'Bendahara', 'Seksi Kebersihan', 'Seksi Mading', 'Seksi IT', 'Seksi Disiplin'] }
        },
        distinctX: true,
        criteriaDescription: 'Bebas menentukan jabatan asalkan kolom Nama diisi siswa dan kolom Jabatan diisi nama tugas jabatan.'
      },
      correctCells: {
        'r1_x': 'Bayu', 'r1_y': 'Ketua Kelas',
        'r2_x': 'Laras', 'r2_y': 'Sekretaris',
        'r3_x': 'Dimas', 'r3_y': 'Bendahara',
        'r4_x': 'Siska', 'r4_y': 'Seksi Kebersihan',
        'r5_x': 'Taufik', 'r5_y': 'Seksi Mading'
      },
      explanation: 'Tabel relasi kepengurusan kelas berhasil kamu buat sesuai kreasimu!'
    });

    // Q10: C5 CARTESIAN - Peminjaman Alat Praktikum IPA 4 Siswa
    questions.push({
      id: 10, level: 'C5', pts: 120, type: 'CARTESIAN',
      question: 'Pada kegiatan laboratorium IPA, tercatat peminjaman alat praktikum oleh 4 siswa:\n• Fajar meminjam Mikroskop dan Tabung Reaksi.\n• Gita meminjam Gelas Ukur.\n• Hadi meminjam Mikroskop dan Termometer.\n• Irfan meminjam Tabung Reaksi dan Gelas Ukur.\nTandai seluruh pasangan titik alat praktikum yang mereka pinjam pada diagram Kartesius!',
      labelX: 'Nama Siswa',
      labelY: 'Alat Praktikum IPA',
      xLabels: { 1: 'Fajar', 2: 'Gita', 3: 'Hadi', 4: 'Irfan' },
      yLabels: { 1: 'Mikroskop', 2: 'Tabung Reaksi', 3: 'Gelas Ukur', 4: 'Termometer' },
      minX: 0, maxX: 4, minY: 0, maxY: 4,
      targetPoints: [
        [1, 1], [1, 2],
        [2, 3],
        [3, 1], [3, 4],
        [4, 2], [4, 3]
      ],
      hint: 'Pasang titik alat yang dipinjam: Fajar (Mikroskop, Tabung Reaksi), Gita (Gelas Ukur), Hadi (Mikroskop, Termometer), Irfan (Tabung Reaksi, Gelas Ukur).',
      explanation: 'Pasangan titik koordinat peminjaman alat praktikum IPA berhasil kamu tandai tepat sesuai catatan laboratorium!'
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CHAPTER 2: PENGERTIAN & UNSUR FUNGSI (DOMAIN, KODOMAIN, RANGE)
  // Menekankan syarat sah fungsi: setiap domain wajib tepat satu pasangan.
  // Volume data diperbanyak: 4-5 elemen domain, 8 kartu drag-drop, 3 slot isian.
  // ═════════════════════════════════════════════════════════════════════════
  else if (cid === 2) {
    // Q1: C3 MCQ - Syarat Utama Fungsi
    questions.push({
      id: 1, level: 'C3', pts: 50, type: 'MCQ',
      question: 'Diberikan empat buah relasi pemetaan dari himpunan A ke B. Manakah syarat mutlak yang harus dipenuhi agar relasi tersebut sah digolongkan sebagai FUNGSI?',
      options: [
        'Setiap anggota himpunan asal A wajib berpasangan dan pasangannya harus tepat satu di himpunan B',
        'Setiap anggota himpunan kawan B harus memiliki pasangan di himpunan asal A',
        'Anggota himpunan asal A diperbolehkan memilih lebih dari satu kawan di B asalkan semuanya terpasang',
        'Jumlah anggota himpunan asal A harus selalu sama banyak dengan jumlah anggota himpunan kawan B'
      ],
      correct: 'Setiap anggota himpunan asal A wajib berpasangan dan pasangannya harus tepat satu di himpunan B',
      explanation: 'Syarat mutlak fungsi adalah setiap anggota daerah asal (domain) wajib memiliki pasangan, dan pasangannya harus tepat satu (tidak bercabang dan tidak boleh kosong).'
    });

    // Q2: C3 ARROWS - Membentuk Fungsi Sah (Open-Ended)
    questions.push({
      id: 2, level: 'C3', pts: 50, type: 'ARROWS',
      isOpenEnded: true,
      question: '[Soal Terbuka] Buatlah diagram panah yang merupakan FUNGSI SAH dari Domain A = {1, 2, 3, 4} ke Kodomain B = {2, 3, 4, 5, 6}! Kamu bebas mengarahkan panah ke angka mana saja di B, asalkan memenuhi syarat mutlak fungsi: setiap anggota Domain A wajib memiliki tepat satu kawan di B.',
      labelA: 'Domain A',
      labelB: 'Kodomain B',
      setA: [1, 2, 3, 4],
      setB: [2, 3, 4, 5, 6],
      rule: 'fungsi_sah_bebas',
      openEndedRules: {
        requireFunction: true,
        criteriaDescription: 'Setiap anggota Domain A wajib memiliki tepat 1 panah pasangan ke Kodomain B.'
      },
      correctPairs: ['1->2', '2->3', '3->4', '4->5'],
      explanation: 'Hebat! Relasi yang kamu buat sah sebagai fungsi karena setiap anggota daerah asal A memiliki tepat satu pasangan di B.'
    });

    // Q3: C3 SLOT_FILL - Tentukan Domain, Kodomain, dan Range (5 Pasangan)
    questions.push({
      id: 3, level: 'C3', pts: 50, type: 'SLOT_FILL',
      question: 'Diketahui fungsi f = {(1, a), (2, b), (3, b), (4, c), (5, c)} dari himpunan asal A ke himpunan kawan B = {a, b, c, d, e}. Pasang kartu himpunan yang tepat untuk Domain, Kodomain, dan Range!',
      subInstruction: 'Pasang kartu himpunan yang tepat ke dalam setiap kotak [ ? ]:',
      slots: [
        { id: 's1', label: 'Himpunan Domain (Daerah Asal):', answer: '{1, 2, 3, 4, 5}' },
        { id: 's2', label: 'Himpunan Kodomain (Daerah Kawan):', answer: '{a, b, c, d, e}' },
        { id: 's3', label: 'Himpunan Range (Daerah Hasil):', answer: '{a, b, c}' }
      ],
      tokens: ['{1, 2, 3, 4, 5}', '{a, b, c, d, e}', '{a, b, c}', '{1, 2, 3, 4}', '{b, c, d}'],
      explanation: 'Domain = {1, 2, 3, 4, 5}, Kodomain = {a, b, c, d, e}, dan Range yang terpasang = {a, b, c}.'
    });

    // Q4: C4 DRAG_DROP - Domain vs Range (8 Kartu Angka)
    questions.push({
      id: 4, level: 'C4', pts: 80, type: 'DRAG_DROP',
      question: 'Diketahui fungsi f = {(2, 10), (3, 15), (4, 20), (5, 25)}. Kelompokkan seluruh 8 angka ke dalam kotak "Domain (Daerah Asal / x)" atau "Range (Daerah Hasil / y)"!',
      subInstruction: 'Pindahkan angka depan (x) ke kotak Domain dan angka belakang (y) ke kotak Range:',
      categories: ['Domain (Daerah Asal / x)', 'Range (Daerah Hasil / y)'],
      items: ['2', '3', '4', '5', '10', '15', '20', '25'],
      correctMapping: {
        '2': 'Domain (Daerah Asal / x)',
        '3': 'Domain (Daerah Asal / x)',
        '4': 'Domain (Daerah Asal / x)',
        '5': 'Domain (Daerah Asal / x)',
        '10': 'Range (Daerah Hasil / y)',
        '15': 'Range (Daerah Hasil / y)',
        '20': 'Range (Daerah Hasil / y)',
        '25': 'Range (Daerah Hasil / y)'
      },
      explanation: 'Nilai depan x adalah Domain {2, 3, 4, 5}, nilai belakang y adalah Range {10, 15, 20, 25}.'
    });

    // Q5: C4 CARTESIAN - Plot Titik Pasangan Fungsi (4 Titik)
    questions.push({
      id: 5, level: 'C4', pts: 80, type: 'CARTESIAN',
      question: 'Diketahui pasangan titik fungsi: (1, 2), (2, 3), (3, 4), dan (4, 5) dengan daerah asal {1, 2, 3, 4}. Tandai keempat titik koordinat (x, y) tersebut pada diagram Kartesius!',
      minX: 0, maxX: 5, minY: 0, maxY: 6,
      targetPoints: [[1, 2], [2, 3], [3, 4], [4, 5]],
      drawLine: true,
      hint: 'Tandai titik (1, 2), (2, 3), (3, 4), dan (4, 5). Setiap garis tegak hanya memuat 1 titik.',
      explanation: 'Titik koordinat fungsi adalah (1, 2), (2, 3), (3, 4), dan (4, 5).'
    });

    // Q6: C4 ARROWS - Relasi Fungsi 'Dua Kali Dari'
    questions.push({
      id: 6, level: 'C4', pts: 80, type: 'ARROWS',
      question: 'Diberikan fungsi dengan aturan "Dua Kali Dari" dari Domain A = {1, 2, 3, 4} ke Kodomain B = {2, 4, 6, 8, 10}. Hubungkan tali panah untuk membentuk diagram panah fungsi tersebut!',
      labelA: 'Domain A',
      labelB: 'Kodomain B',
      setA: [1, 2, 3, 4],
      setB: [2, 4, 6, 8, 10],
      rule: 'dua_kali_dari',
      correctPairs: ['1->2', '2->4', '3->6', '4->8'],
      explanation: 'Sangat tepat! Setiap elemen Domain A dipasangkan dengan tepat dua kali nilainya di Kodomain B: 1➔2, 2➔4, 3➔6, dan 4➔8.'
    });

    // Q7: C4 DRAG_DROP - Fungsi Sah vs Bukan Fungsi (6 Relasi)
    questions.push({
      id: 7, level: 'C4', pts: 80, type: 'DRAG_DROP',
      question: 'Uji syarat sah fungsi: kelompokkan setiap relasi pasangan berurutan ke dalam kategori "Fungsi Sah" atau "Bukan Fungsi (Bercabang/Kosong)"!',
      subInstruction: "Pindahkan kartu ke kelompok yang sesuai:",
      categories: ['Fungsi Sah', 'Bukan Fungsi (Bercabang/Kosong)'],
      items: [
        '{(1, a), (2, b), (3, c), (4, d)}',
        '{(1, a), (1, b), (2, c), (3, d)}',
        '{(1, x), (2, x), (3, x), (4, x)}',
        '{(2, y), (2, z), (3, w), (4, w)}',
        '{(a, 1), (b, 2), (c, 3), (d, 4)}',
        '{(a, 1), (b, 2), (b, 3), (c, 4)}'
      ],
      correctMapping: {
        '{(1, a), (2, b), (3, c), (4, d)}': 'Fungsi Sah',
        '{(1, a), (1, b), (2, c), (3, d)}': 'Bukan Fungsi (Bercabang/Kosong)',
        '{(1, x), (2, x), (3, x), (4, x)}': 'Fungsi Sah',
        '{(2, y), (2, z), (3, w), (4, w)}': 'Bukan Fungsi (Bercabang/Kosong)',
        '{(a, 1), (b, 2), (c, 3), (d, 4)}': 'Fungsi Sah',
        '{(a, 1), (b, 2), (b, 3), (c, 4)}': 'Bukan Fungsi (Bercabang/Kosong)'
      },
      explanation: 'Relasi yang memiliki elemen x bercabang ke lebih dari satu pasangan otomatis digolongkan Bukan Fungsi.'
    });

    // Q8: C5 SLOT_FILL - Analisis Unsur Domain, Kodomain, dan Range (3 Slot)
    questions.push({
      id: 8, level: 'C5', pts: 120, type: 'SLOT_FILL',
      question: 'Diberikan fungsi dari daerah asal A = {1, 2, 3, 4, 5} ke daerah kawan B = {a, b, c, d, e, f} dengan pasangan {(1, a), (2, b), (3, b), (4, c), (5, c)}. Lengkapi analisis jumlah unsur fungsi berikut!',
      subInstruction: 'Pasang kartu angka hasil analisis ke kotak [ ? ]:',
      slots: [
        { id: 's1', label: 'Banyak anggota Domain n(A) =', answer: '5' },
        { id: 's2', label: 'Banyak anggota Kodomain n(B) =', answer: '6' },
        { id: 's3', label: 'Banyak anggota Range (daerah hasil terpasang) =', answer: '3' }
      ],
      tokens: ['3', '4', '5', '6', '7'],
      explanation: 'n(A) = 5, n(B) = 6, dan anggota Range yang terhubung hanya {a, b, c} sehingga banyaknya = 3.'
    });

    // Q9: C5 HPB_BUILDER - Pasangan Berurutan Fungsi (Open-Ended)
    questions.push({
      id: 9, level: 'C5', pts: 120, type: 'HPB_BUILDER',
      isOpenEnded: true,
      question: '[Soal Terbuka] Susunlah pasangan berurutan yang merupakan FUNGSI dari Domain A = {1, 2, 3, 4} ke Kodomain B = {a, b, c, d}! Kamu bebas memilih pasangan bayangan untuk setiap angka dari kartu yang tersedia.',
      subInstruction: 'Pasang huruf hasil pemetaan ke dalam kurung pasangan berurutan (bebas berkreasi):',
      setName: 'f',
      pairs: [
        { idX: 'p1_x', idY: 'p1_y', ansX: '1', ansY: null, fixedX: '1', fixedY: null },
        { idX: 'p2_x', idY: 'p2_y', ansX: '2', ansY: null, fixedX: '2', fixedY: null },
        { idX: 'p3_x', idY: 'p3_y', ansX: '3', ansY: null, fixedX: '3', fixedY: null },
        { idX: 'p4_x', idY: 'p4_y', ansX: '4', ansY: null, fixedX: '4', fixedY: null }
      ],
      tokens: ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd'],
      openEndedRules: {
        slots: {
          'p1_y': { role: 'Y', validTokens: ['a', 'b', 'c', 'd'] },
          'p2_y': { role: 'Y', validTokens: ['a', 'b', 'c', 'd'] },
          'p3_y': { role: 'Y', validTokens: ['a', 'b', 'c', 'd'] },
          'p4_y': { role: 'Y', validTokens: ['a', 'b', 'c', 'd'] }
        },
        criteriaDescription: 'Bebas memilih pasangan bayangan asalkan seluruh domain 1, 2, 3, 4 terisi huruf kodomain.'
      },
      correctSlots: { 'p1_y': 'a', 'p2_y': 'b', 'p3_y': 'a', 'p4_y': 'c' },
      explanation: 'Sempurna! Himpunan pasangan berurutan yang kamu buat sah sebagai fungsi karena setiap elemen domain 1, 2, 3, 4 memiliki tepat satu bayangan.'
    });

    // Q10: C5 TABLE_BUILDER - Tabel Pemetaan Daerah Hasil (4 Baris)
    questions.push({
      id: 10, level: 'C5', pts: 120, type: 'TABLE_BUILDER',
      question: 'Lengkapi tabel pemetaan fungsi dengan aturan "Ditambah Dua" dari domain A = {1, 2, 3, 4} untuk melengkapi seluruh nilai daerah hasil (range)!',
      tableTitle: 'Tabel Pemetaan Fungsi: Ditambah Dua',
      subInstruction: 'Pindahkan kartu angka dari kotak pilihan ke sel daerah hasil (range) yang kosong:',
      headers: ['Domain (Asal)', 'Range (Hasil)'],
      rows: [
        { idX: 'r1_x', valX: '1', isSlotX: false, idY: 'r1_y', valY: null, isSlotY: true },
        { idX: 'r2_x', valX: '2', isSlotX: false, idY: 'r2_y', valY: null, isSlotY: true },
        { idX: 'r3_x', valX: '3', isSlotX: false, idY: 'r3_y', valY: null, isSlotY: true },
        { idX: 'r4_x', valX: '4', isSlotX: false, idY: 'r4_y', valY: null, isSlotY: true }
      ],
      tokens: ['3', '4', '5', '6', '7', '8'],
      correctCells: { 'r1_y': '3', 'r2_y': '4', 'r3_y': '5', 'r4_y': '6' },
      explanation: 'Daerah hasil (range) yang diperoleh: 1+2=3, 2+2=4, 3+2=5, dan 4+2=6.'
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CHAPTER 3: NOTASI, NILAI, DAN RUMUS FUNGSI (DATA KAYA & MULTI-STEP)
  // Notasi f(x) = ax + b, substitusi nilai, prapeta, penentuan nilai a & b
  // ═════════════════════════════════════════════════════════════════════════
  else if (cid === 3) {
    // Q1: C3 SLOT_FILL - Hitung Nilai Bayangan f(4) dan f(5) pada f(x) = 3x + 5
    questions.push({
      id: 1, level: 'C3', pts: 50, type: 'SLOT_FILL',
      question: 'Sebuah fungsi bekerja dengan rumus f(x) = 3x + 5. Lengkapi langkah perhitungan nilai bayangan f(4) dan bayangan f(5)!',
      subInstruction: 'Pasang kartu angka hasil perhitungan ke kotak [ ? ]:',
      slots: [
        { id: 's1', label: 'Nilai perkalian suku 3(4) =', answer: '12' },
        { id: 's2', label: 'Nilai bayangan akhir f(4) =', answer: '17' },
        { id: 's3', label: 'Nilai bayangan akhir f(5) =', answer: '20' }
      ],
      tokens: ['12', '15', '17', '20', '23'],
      explanation: 'f(4) = 3(4) + 5 = 12 + 5 = 17. Dan f(5) = 3(5) + 5 = 15 + 5 = 20.'
    });

    // Q2: C3 SLOT_FILL - Nilai x Negatif: Hitung f(-3) dan f(-4) pada f(x) = 2x - 7
    questions.push({
      id: 2, level: 'C3', pts: 50, type: 'SLOT_FILL',
      question: 'Diketahui rumus fungsi f(x) = 2x − 7. Lengkapi langkah perhitungan nilai bayangan f(−3) dan f(−4) dengan teliti!',
      subInstruction: 'Pasang kartu angka ke kotak perhitungan [ ? ]:',
      slots: [
        { id: 's1', label: 'Nilai suku 2(−3) =', answer: '-6' },
        { id: 's2', label: 'Nilai bayangan akhir f(−3) =', answer: '-13' },
        { id: 's3', label: 'Nilai bayangan akhir f(−4) =', answer: '-15' }
      ],
      tokens: ['-6', '-8', '-13', '-15', '13', '15'],
      explanation: 'f(-3) = 2(-3) - 7 = -6 - 7 = -13. Dan f(-4) = 2(-4) - 7 = -8 - 7 = -15.'
    });

    // Q3: C3 HPB_BUILDER - Pasangan Nilai f(x) = 2x + 3 untuk 4 Domain
    questions.push({
      id: 3, level: 'C3', pts: 50, type: 'HPB_BUILDER',
      question: 'Susun himpunan pasangan nilai fungsi f(x) = 2x + 3 untuk domain x = {1, 2, 3, 4} ke dalam kurung aljabar!',
      subInstruction: 'Pasang nilai bayangan ke dalam kurung pasangan berurutan:',
      setName: 'f',
      pairs: [
        { idX: 'p1_x', idY: 'p1_y', ansX: '1', ansY: '5', fixedX: '1', fixedY: null },
        { idX: 'p2_x', idY: 'p2_y', ansX: '2', ansY: '7', fixedX: '2', fixedY: null },
        { idX: 'p3_x', idY: 'p3_y', ansX: '3', ansY: '9', fixedX: '3', fixedY: null },
        { idX: 'p4_x', idY: 'p4_y', ansX: '4', ansY: '11', fixedX: '4', fixedY: null }
      ],
      tokens: ['5', '7', '9', '11', '13'],
      correctSlots: { 'p1_y': '5', 'p2_y': '7', 'p3_y': '9', 'p4_y': '11' },
      explanation: 'f(1)=5, f(2)=7, f(3)=9, f(4)=11. Himpunan pasangan nilai: {(1, 5), (2, 7), (3, 9), (4, 11)}.'
    });

    // Q4: C4 SLOT_FILL - Menentukan Prapeta (Nilai x)
    questions.push({
      id: 4, level: 'C4', pts: 80, type: 'SLOT_FILL',
      question: 'Diketahui rumus fungsi f(x) = 5x − 3. Jika nilai bayangan f(a) = 17 dan f(b) = 32, lengkapi langkah aljabar untuk menemukan prapeta a dan b!',
      subInstruction: 'Pindahkan kartu angka ke kotak persamaan [ ? ]:',
      slots: [
        { id: 's1', label: 'Persamaan 5a − 3 = 17 ➔ 5a =', answer: '20' },
        { id: 's2', label: 'Nilai prapeta a =', answer: '4' },
        { id: 's3', label: 'Nilai prapeta b (dari 5b = 35) =', answer: '7' }
      ],
      tokens: ['4', '7', '14', '20', '35'],
      explanation: '5a = 20 ➔ a = 4. Serta 5b - 3 = 32 ➔ 5b = 35 ➔ b = 7.'
    });

    // Q5: C4 ARROWS - Sambungkan Nilai Fungsi 4 Elemen
    questions.push({
      id: 5, level: 'C4', pts: 80, type: 'ARROWS',
      question: 'Tarik panah dari daerah asal A = {1, 2, 3, 4} ke daerah kawan B = {1, 4, 7, 10, 13} yang memenuhi rumus f(x) = 3x − 2!',
      labelA: 'Domain A',
      labelB: 'Bayangan f(x)',
      setA: [1, 2, 3, 4],
      setB: [1, 4, 7, 10, 13],
      rule: 'tiga_x_kurang_dua_empat',
      correctPairs: ['1->1', '2->4', '3->7', '4->10'],
      explanation: '3(1)-2 = 1, 3(2)-2 = 4, 3(3)-2 = 7, 3(4)-2 = 10.'
    });

    // Q6: C4 DRAG_DROP - Sortir 6 Nilai Fungsi: Positif vs Negatif
    questions.push({
      id: 6, level: 'C4', pts: 80, type: 'DRAG_DROP',
      question: 'Diberikan rumus fungsi f(x) = 2x − 6. Pindahkan seluruh 6 kartu nilai fungsi ke dalam kelompok tanda hasil yang sesuai!',
      subInstruction: "Pindahkan kartu ke kotak 'Hasil Positif (f(x) > 0)' atau 'Hasil Negatif (f(x) < 0)':",
      categories: ['Hasil Positif (f(x) > 0)', 'Hasil Negatif (f(x) < 0)'],
      items: ['f(5)', 'f(1)', 'f(4)', 'f(2)', 'f(6)', 'f(0)'],
      correctMapping: {
        'f(5)': 'Hasil Positif (f(x) > 0)',
        'f(1)': 'Hasil Negatif (f(x) < 0)',
        'f(4)': 'Hasil Positif (f(x) > 0)',
        'f(2)': 'Hasil Negatif (f(x) < 0)',
        'f(6)': 'Hasil Positif (f(x) > 0)',
        'f(0)': 'Hasil Negatif (f(x) < 0)'
      },
      explanation: 'Hasil Positif: f(4)=2, f(5)=4, f(6)=6. Hasil Negatif: f(0)=-6, f(1)=-4, f(2)=-2.'
    });

    // Q7: C4 TABLE_BUILDER - Tabel Mesin Fungsi 4 Baris
    questions.push({
      id: 7, level: 'C4', pts: 80, type: 'TABLE_BUILDER',
      question: 'Lengkapi tabel mesin fungsi f(x) = 4x + 1 untuk nilai x = {0, 1, 2, 3}!',
      tableTitle: 'Mesin Fungsi: f(x) = 4x + 1',
      subInstruction: 'Pindahkan kartu angka dari kotak pilihan ke seluruh sel nilai f(x):',
      headers: ['Nilai x', 'Nilai f(x)'],
      rows: [
        { idX: 'r1_x', valX: '0', isSlotX: false, idY: 'r1_y', valY: null, isSlotY: true },
        { idX: 'r2_x', valX: '1', isSlotX: false, idY: 'r2_y', valY: null, isSlotY: true },
        { idX: 'r3_x', valX: '2', isSlotX: false, idY: 'r3_y', valY: null, isSlotY: true },
        { idX: 'r4_x', valX: '3', isSlotX: false, idY: 'r4_y', valY: null, isSlotY: true }
      ],
      tokens: ['1', '5', '9', '13', '17'],
      correctCells: { 'r1_y': '1', 'r2_y': '5', 'r3_y': '9', 'r4_y': '13' },
      explanation: 'f(0) = 4(0)+1 = 1; f(1) = 4(1)+1 = 5; f(2) = 4(2)+1 = 9; f(3) = 4(3)+1 = 13.'
    });

    // Q8: C5 SLOT_FILL - Menentukan Rumus f(x) = ax + b dan Nilai f(5)
    questions.push({
      id: 8, level: 'C5', pts: 120, type: 'SLOT_FILL',
      question: 'Diketahui fungsi f(x) = ax + b memiliki nilai f(1) = 5 dan f(3) = 11. Tentukan nilai a, b, dan nilai bayangan baru f(5)!',
      subInstruction: 'Pasang nilai a, b, dan f(5) yang diperoleh ke kotak [ ? ]:',
      slots: [
        { id: 's1', label: 'Nilai koefisien a =', answer: '3' },
        { id: 's2', label: 'Nilai konstanta b =', answer: '2' },
        { id: 's3', label: 'Nilai bayangan f(5) =', answer: '17' }
      ],
      tokens: ['2', '3', '4', '15', '17'],
      explanation: 'a = (11 - 5) ÷ (3 - 1) = 3. Lalu b = 5 - 3(1) = 2. Maka f(5) = 3(5) + 2 = 17.'
    });

    // Q9: C5 HPB_BUILDER - Pasangan Nilai f(x) = 5 - 2x (4 Pasangan)
    questions.push({
      id: 9, level: 'C5', pts: 120, type: 'HPB_BUILDER',
      question: 'Susunlah himpunan pasangan nilai fungsi f(x) = 5 − 2x untuk x = {0, 1, 2, 3}!',
      subInstruction: 'Pasang angka hasil ke kurung pasangan berurutan:',
      setName: 'f',
      pairs: [
        { idX: 'p1_x', idY: 'p1_y', ansX: '0', ansY: '5', fixedX: '0', fixedY: null },
        { idX: 'p2_x', idY: 'p2_y', ansX: '1', ansY: '3', fixedX: '1', fixedY: null },
        { idX: 'p3_x', idY: 'p3_y', ansX: '2', ansY: '1', fixedX: '2', fixedY: null },
        { idX: 'p4_x', idY: 'p4_y', ansX: '3', ansY: '-1', fixedX: '3', fixedY: null }
      ],
      tokens: ['5', '3', '1', '-1', '-3'],
      correctSlots: { 'p1_y': '5', 'p2_y': '3', 'p3_y': '1', 'p4_y': '-1' },
      explanation: 'f(0)=5, f(1)=3, f(2)=1, f(3)=-1. Himpunan pasangan nilai: {(0, 5), (1, 3), (2, 1), (3, -1)}.'
    });

    // Q10: C5 CARTESIAN - Plot 4 Titik Koordinat Fungsi Linear
    questions.push({
      id: 10, level: 'C5', pts: 120, type: 'CARTESIAN',
      question: 'Tandai 4 titik koordinat pasangan (x, f(x)) untuk fungsi linear f(x) = 2x + 1: (0, 1), (1, 3), (2, 5), dan (3, 7) pada bidang Kartesius!',
      minX: 0, maxX: 4, minY: 0, maxY: 8,
      targetPoints: [[0, 1], [1, 3], [2, 5], [3, 7]],
      drawLine: true,
      hint: 'Tandai titik (0, 1), (1, 3), (2, 5), dan (3, 7). Seluruh titik membentuk satu garis lurus.',
      explanation: 'Titik koordinat (0, 1), (1, 3), (2, 5), dan (3, 7) membentuk garis linear f(x) = 2x + 1.'
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CHAPTER 4: GRAFIK FUNGSI LINEAR PADA BIDANG KARTESIUS (DATA BESAR)
  // Bentuk garis lurus, titik potong sumbu X & Y, gradien kemiringan garis
  // ═════════════════════════════════════════════════════════════════════════
  else if (cid === 4) {
    // Q1: C3 MCQ - Karakteristik Grafik Fungsi Linear
    questions.push({
      id: 1, level: 'C3', pts: 50, type: 'MCQ',
      question: 'Bagaimanakah bentuk visual grafik dari fungsi linear f(x) = ax + b pada bidang koordinat Kartesius?',
      options: [
        'Selalu berupa garis lurus',
        'Berupa kurva parabola melengkung',
        'Berupa lingkaran tertutup',
        'Berupa garis gelombang naik-turun'
      ],
      correct: 'Selalu berupa garis lurus',
      explanation: 'Karena variabel x berpangkat satu (linear), grafik fungsi linear selalu membentuk garis lurus sempurna.'
    });

    // Q2: C3 CARTESIAN - Plot 4 Titik Garis f(x) = 2x
    questions.push({
      id: 2, level: 'C3', pts: 50, type: 'CARTESIAN',
      question: 'Tandai 4 titik koordinat pada bidang Kartesius yang dilalui oleh grafik fungsi linear f(x) = 2x: (0, 0), (1, 2), (2, 4), dan (3, 6)!',
      minX: 0, maxX: 4, minY: 0, maxY: 7,
      targetPoints: [[0, 0], [1, 2], [2, 4], [3, 6]],
      drawLine: true,
      hint: 'Tandai titik (0, 0), (1, 2), (2, 4), dan (3, 6).',
      explanation: 'Garis f(x) = 2x melewati titik pangkal (0, 0), (1, 2), (2, 4), dan (3, 6).'
    });

    // Q3: C3 SLOT_FILL - Menghitung Titik Potong Dua Garis Linear
    questions.push({
      id: 3, level: 'C3', pts: 50, type: 'SLOT_FILL',
      question: 'Diberikan fungsi f(x) = 3x − 6 dan g(x) = 2x − 8. Lengkapi nilai koordinat titik potong sumbu berikut!',
      subInstruction: 'Pasang kartu angka ke kotak koordinat [ ? ]:',
      slots: [
        { id: 's1', label: 'Titik potong sumbu Y garis f(x) (saat x = 0) ➔ (0, [ ? ]):', answer: '-6' },
        { id: 's2', label: 'Titik potong sumbu X garis f(x) (saat y = 0) ➔ ([ ? ], 0):', answer: '2' },
        { id: 's3', label: 'Titik potong sumbu X garis g(x) (saat y = 0) ➔ ([ ? ], 0):', answer: '4' }
      ],
      tokens: ['-6', '2', '4', '6', '8'],
      explanation: 'f(x): x=0 ➔ y=-6; y=0 ➔ 3x=6 ➔ x=2. g(x): y=0 ➔ 2x=8 ➔ x=4.'
    });

    // Q4: C4 SLOT_FILL - Menghitung Gradien (Kemiringan Garis)
    questions.push({
      id: 4, level: 'C4', pts: 80, type: 'SLOT_FILL',
      question: 'Garis melewati dua titik (1, 3) dan (3, 7). Lengkapi langkah penghitungan gradien kemiringan garis m = Δy ÷ Δx pada kotak [ ? ]!',
      subInstruction: 'Pasang kartu angka nilai ke kotak perhitungan gradien:',
      slots: [
        { id: 's1', label: 'Perubahan nilai tegak (Δy = 7 − 3) =', answer: '4' },
        { id: 's2', label: 'Perubahan nilai mendatar (Δx = 3 − 1) =', answer: '2' },
        { id: 's3', label: 'Nilai kemiringan garis m (Δy ÷ Δx) =', answer: '2' }
      ],
      tokens: ['2', '2', '4', '6', '8'],
      explanation: 'Δy = 7-3 = 4; Δx = 3-1 = 2; Gradien m = 4 ÷ 2 = 2.'
    });

    // Q5: C4 CARTESIAN - Plot 4 Titik Segaris y = x + 2
    questions.push({
      id: 5, level: 'C4', pts: 80, type: 'CARTESIAN',
      question: 'Tandai 4 titik koordinat segaris fungsi linear y = x + 2: (0, 2), (1, 3), (2, 4), dan (3, 5) pada bidang Kartesius!',
      minX: 0, maxX: 4, minY: 0, maxY: 6,
      targetPoints: [[0, 2], [1, 3], [2, 4], [3, 5]],
      drawLine: true,
      hint: 'Tandai titik (0, 2), (1, 3), (2, 4), dan (3, 5).',
      explanation: 'Titik-titik koordinat segaris y = x + 2 adalah (0, 2), (1, 3), (2, 4), dan (3, 5).'
    });

    // Q6: C4 DRAG_DROP - Kelompokkan 6 Garis Linear Berdasarkan Gradien
    questions.push({
      id: 6, level: 'C4', pts: 80, type: 'DRAG_DROP',
      question: 'Kelompokkan 6 fungsi linear berikut berdasarkan tanda gradien (koefisien x) kemiringan garisnya!',
      subInstruction: "Pindahkan ke kotak 'Gradien Positif (Naik)' atau 'Gradien Negatif (Turun)':",
      categories: ['Gradien Positif (Naik)', 'Gradien Negatif (Turun)'],
      items: ['y = 3x - 2', 'y = -2x + 5', 'y = 4x + 1', 'y = -x + 7', 'y = 5x - 3', 'y = -4x + 2'],
      correctMapping: {
        'y = 3x - 2': 'Gradien Positif (Naik)',
        'y = -2x + 5': 'Gradien Negatif (Turun)',
        'y = 4x + 1': 'Gradien Positif (Naik)',
        'y = -x + 7': 'Gradien Negatif (Turun)',
        'y = 5x - 3': 'Gradien Positif (Naik)',
        'y = -4x + 2': 'Gradien Negatif (Turun)'
      },
      explanation: 'Gradien positif (garis menanjak): y = 3x-2, y = 4x+1, y = 5x-3. Gradien negatif (garis menurun): y = -2x+5, y = -x+7, y = -4x+2.'
    });

    // Q7: C4 TABLE_BUILDER - Tabel Koordinat Titik Garis Menurun y = -2x + 8 (4 Baris)
    questions.push({
      id: 7, level: 'C4', pts: 80, type: 'TABLE_BUILDER',
      question: 'Lengkapi tabel koordinat titik grafik garis menurun y = −2x + 8 untuk x = {1, 2, 3, 4}!',
      tableTitle: 'Grafik Menurun: y = -2x + 8',
      subInstruction: 'Pindahkan kartu angka untuk mengisi seluruh nilai y:',
      headers: ['Nilai x', 'Nilai y'],
      rows: [
        { idX: 'r1_x', valX: '1', isSlotX: false, idY: 'r1_y', valY: null, isSlotY: true },
        { idX: 'r2_x', valX: '2', isSlotX: false, idY: 'r2_y', valY: null, isSlotY: true },
        { idX: 'r3_x', valX: '3', isSlotX: false, idY: 'r3_y', valY: null, isSlotY: true },
        { idX: 'r4_x', valX: '4', isSlotX: false, idY: 'r4_y', valY: null, isSlotY: true }
      ],
      tokens: ['6', '4', '2', '0', '-2'],
      correctCells: { 'r1_y': '6', 'r2_y': '4', 'r3_y': '2', 'r4_y': '0' },
      explanation: 'Untuk x=1 ➔ y=6; x=2 ➔ y=4; x=3 ➔ y=2; x=4 ➔ y=0.'
    });

    // Q8: C5 DRAG_DROP - Arah Kemiringan 6 Grafik Linear
    questions.push({
      id: 8, level: 'C5', pts: 120, type: 'DRAG_DROP',
      question: 'Kelompokkan 6 fungsi linear berikut berdasarkan arah kemiringan grafiknya (m > 0 menanjak, m < 0 menurun)!',
      categories: ['Garis Menanjak (m > 0)', 'Garis Menurun (m < 0)'],
      items: ['y = 2x + 1', 'y = -3x + 4', 'y = 5x - 2', 'y = -x + 6', 'y = 3x', 'y = -5x + 1'],
      correctMapping: {
        'y = 2x + 1': 'Garis Menanjak (m > 0)',
        'y = -3x + 4': 'Garis Menurun (m < 0)',
        'y = 5x - 2': 'Garis Menanjak (m > 0)',
        'y = -x + 6': 'Garis Menurun (m < 0)',
        'y = 3x': 'Garis Menanjak (m > 0)',
        'y = -5x + 1': 'Garis Menurun (m < 0)'
      },
      explanation: 'Garis menanjak (m > 0): y = 2x + 1, y = 5x - 2, y = 3x. Garis menurun (m < 0): y = -3x + 4, y = -x + 6, y = -5x + 1.'
    });

    // Q9: C5 HPB_BUILDER - Koordinat Segaris y = 3x - 1 (3 Pasangan Lengkap)
    questions.push({
      id: 9, level: 'C5', pts: 120, type: 'HPB_BUILDER',
      question: 'Susun pasangan koordinat segaris untuk fungsi linear y = 3x − 1 pada x = {1, 2, 3}!',
      subInstruction: 'Pasang angka ke dalam kurung pasangan berurutan:',
      setName: 'Titik',
      pairs: [
        { idX: 'p1_x', idY: 'p1_y', ansX: '1', ansY: '2', fixedX: '1', fixedY: null },
        { idX: 'p2_x', idY: 'p2_y', ansX: '2', ansY: '5', fixedX: '2', fixedY: null },
        { idX: 'p3_x', idY: 'p3_y', ansX: '3', ansY: '8', fixedX: '3', fixedY: null }
      ],
      tokens: ['2', '5', '8', '11'],
      correctSlots: { 'p1_y': '2', 'p2_y': '5', 'p3_y': '8' },
      explanation: 'x=1 ➔ y=2 ➔ (1, 2); x=2 ➔ y=5 ➔ (2, 5); x=3 ➔ y=8 ➔ (3, 8).'
    });

    // Q10: C5 CARTESIAN - Titik Potong Sumbu X dan Y Dua Garis Linear
    questions.push({
      id: 10, level: 'C5', pts: 120, type: 'CARTESIAN',
      question: 'Tandai titik potong sumbu X (4, 0) dan sumbu Y (0, 4) untuk garis y = −x + 4, serta titik potong sumbu X (2, 0) untuk garis y = 2x − 4 pada bidang Kartesius!',
      minX: 0, maxX: 5, minY: 0, maxY: 5,
      targetPoints: [[4, 0], [0, 4], [2, 0]],
      drawLine: true,
      hint: 'Tandai ketiga titik: (4, 0), (0, 4), dan (2, 0).',
      explanation: 'Titik potong sumbu yang terbentuk adalah (4, 0), (0, 4), dan (2, 0).'
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CHAPTER 5: KORESPONDENSI SATU-SATU (BIJEKTIF) (DATA BESAR & KAYA)
  // Syarat n(A) = n(B), pemetaan timbal balik 1-1, rumus faktorial n!
  // ═════════════════════════════════════════════════════════════════════════
  else if (cid === 5) {
    // Q1: C3 MCQ - Analisis Kasus Korespondensi Satu-Satu
    questions.push({
      id: 1, level: 'C3', pts: 50, type: 'MCQ',
      question: 'Di sebuah laboratorium komputer, terdapat 5 orang siswa dan 5 unit komputer bernomor 1 sampai 5. Setiap siswa wajib menggunakan tepat satu unit komputer yang berbeda, dan tidak boleh ada komputer yang dipakai bersamaan atau dibiarkan kosong. Hubungan ini merupakan contoh korespondensi satu-satu. Manakah pernyataan yang paling tepat mengenai pengertian korespondensi satu-satu?',
      options: [
        'Relasi di mana setiap anggota daerah asal berpasangan dengan tepat satu anggota kawan, dan setiap anggota kawan berpasangan dengan tepat satu anggota asal secara timbal balik',
        'Relasi di mana satu siswa diperbolehkan menggunakan beberapa komputer sekaligus asalkan semua komputer menyala',
        'Fungsi di mana seluruh siswa berkumpul menggunakan satu komputer yang sama secara bergantian',
        'Relasi yang hanya sah apabila anggotanya berupa bilangan genap saja'
      ],
      correct: 'Relasi di mana setiap anggota daerah asal berpasangan dengan tepat satu anggota kawan, dan setiap anggota kawan berpasangan dengan tepat satu anggota asal secara timbal balik',
      explanation: 'Korespondensi satu-satu adalah pemetaan timbal balik yang sempurna: setiap anggota asal berpasangan tepat satu dengan kawan, dan sebaliknya (syarat mutlak: n(A) = n(B)).'
    });

    // Q2: C3 SLOT_FILL - Menghitung Banyak Korespondensi n = 3, n = 4, n = 5 (3 Slot)
    questions.push({
      id: 2, level: 'C3', pts: 50, type: 'SLOT_FILL',
      question: 'Hitung banyak kemungkinan susunan korespondensi satu-satu yang dapat dibentuk untuk nilai n = 3, n = 4, dan n = 5!',
      subInstruction: 'Pasang kartu angka hasil perhitungan faktorial (n!) ke kotak [ ? ]:',
      slots: [
        { id: 's1', label: 'Banyak korespondensi untuk n = 3, (3!) =', answer: '6' },
        { id: 's2', label: 'Banyak korespondensi untuk n = 4, (4!) =', answer: '24' },
        { id: 's3', label: 'Banyak korespondensi untuk n = 5, (5!) =', answer: '120' }
      ],
      tokens: ['6', '24', '60', '120', '720'],
      explanation: '3! = 3×2×1 = 6; 4! = 4×3×2×1 = 24; 5! = 5×4×3×2×1 = 120.'
    });

    // Q3: C3 SLOT_FILL - Pemetaan Biasa vs Korespondensi 1-1
    questions.push({
      id: 3, level: 'C3', pts: 50, type: 'SLOT_FILL',
      question: 'Diberikan himpunan A = {1, 2, 3} dan B = {a, b, c}. Hitung banyak seluruh pemetaan biasa (b^a) dan banyak korespondensi satu-satu (n!)!',
      subInstruction: 'Pasang kartu angka hasil perhitungan ke kotak [ ? ]:',
      slots: [
        { id: 's1', label: 'Banyak anggota n(A) = n(B) =', answer: '3' },
        { id: 's2', label: 'Banyak pemetaan biasa yang mungkin (3³) =', answer: '27' },
        { id: 's3', label: 'Banyak korespondensi satu-satu (3!) =', answer: '6' }
      ],
      tokens: ['3', '6', '9', '27', '81'],
      explanation: 'Banyak fungsi biasa dari A ke B = 3³ = 27. Sedangkan banyak korespondensi satu-satu = 3! = 6.'
    });

    // Q4: C4 DRAG_DROP - Uji Syarat n(A) = n(B) (6 Pasangan Himpunan)
    questions.push({
      id: 4, level: 'C4', pts: 80, type: 'DRAG_DROP',
      question: 'Uji syarat korespondensi satu-satu (n(A) harus sama dengan n(B))! Kelompokkan 6 pasangan himpunan berikut:',
      subInstruction: 'Pindahkan ke kotak "Bisa Korespondensi 1-1" atau "Tidak Bisa":',
      categories: ['Bisa Korespondensi 1-1 (n(A) = n(B))', 'Tidak Bisa (n(A) ≠ n(B))'],
      items: [
        'A={1, 2, 3, 4} & B={a, b, c, d}',
        'P={1, 2, 3} & Q={p, q, r, s}',
        'K={Senin, Selasa, Rabu} & L={Pagi, Siang, Sore}',
        'M={1, 2} & N={x, y, z}',
        'X={Merah, Kuning, Hijau, Biru} & Y={1, 2, 3, 4}',
        'E={a, b, c} & F={1, 2}'
      ],
      correctMapping: {
        'A={1, 2, 3, 4} & B={a, b, c, d}': 'Bisa Korespondensi 1-1 (n(A) = n(B))',
        'P={1, 2, 3} & Q={p, q, r, s}': 'Tidak Bisa (n(A) ≠ n(B))',
        'K={Senin, Selasa, Rabu} & L={Pagi, Siang, Sore}': 'Bisa Korespondensi 1-1 (n(A) = n(B))',
        'M={1, 2} & N={x, y, z}': 'Tidak Bisa (n(A) ≠ n(B))',
        'X={Merah, Kuning, Hijau, Biru} & Y={1, 2, 3, 4}': 'Bisa Korespondensi 1-1 (n(A) = n(B))',
        'E={a, b, c} & F={1, 2}': 'Tidak Bisa (n(A) ≠ n(B))'
      },
      explanation: 'Bisa jika n(A) = n(B): 4 & 4, 3 & 3, 4 & 4. Tidak bisa jika jumlah anggota berbeda.'
    });

    // Q5: C4 ARROWS - Diagram Panah Korespondensi 1-1 (4 Elemen)
    questions.push({
      id: 5, level: 'C4', pts: 80, type: 'ARROWS',
      question: 'Tarik garis korespondensi satu-satu dari A = {1, 2, 3, 4} ke B = {W, X, Y, Z}: 1 ke X, 2 ke Z, 3 ke W, dan 4 ke Y (setiap anggota unik timbal balik)!',
      labelA: 'Himpunan A',
      labelB: 'Himpunan B',
      setA: [1, 2, 3, 4],
      setB: ['W', 'X', 'Y', 'Z'],
      rule: 'korespondensi_empat',
      correctPairs: ['1->X', '2->Z', '3->W', '4->Y'],
      explanation: 'Korespondensi satu-satu terpasang sempurna 1-ke-1 tanpa cabang dan tanpa ada yang kosong.'
    });

    // Q6: C4 HPB_BUILDER - Susun Pasangan Korespondensi 1-1 (4 Elemen)
    questions.push({
      id: 6, level: 'C4', pts: 80, type: 'HPB_BUILDER',
      question: 'Susun pasangan korespondensi satu-satu dari A = {1, 2, 3, 4} ke B = {A, B, C, D}: 1 ke B, 2 ke D, 3 ke A, dan 4 ke C!',
      subInstruction: 'Pasang huruf unik ke setiap kurung tanpa rangkap:',
      setName: 'K',
      pairs: [
        { idX: 'p1_x', idY: 'p1_y', ansX: '1', ansY: 'B', fixedX: '1', fixedY: null },
        { idX: 'p2_x', idY: 'p2_y', ansX: '2', ansY: 'D', fixedX: '2', fixedY: null },
        { idX: 'p3_x', idY: 'p3_y', ansX: '3', ansY: 'A', fixedX: '3', fixedY: null },
        { idX: 'p4_x', idY: 'p4_y', ansX: '4', ansY: 'C', fixedX: '4', fixedY: null }
      ],
      tokens: ['A', 'B', 'C', 'D', 'E'],
      correctSlots: { 'p1_y': 'B', 'p2_y': 'D', 'p3_y': 'A', 'p4_y': 'C' },
      explanation: 'K = {(1, B), (2, D), (3, A), (4, C)}. Seluruh anggota terpasang 1-ke-1 secara unik.'
    });

    // Q7: C4 TABLE_BUILDER - Tabel Penomoran Meja 1-1 (4 Siswa)
    questions.push({
      id: 7, level: 'C4', pts: 80, type: 'TABLE_BUILDER',
      question: 'Lengkapi tabel penomoran peserta ujian 1-ke-1 tanpa nomor ganda: Andi Meja 1, Budi Meja 2, Cici Meja 3, Doni Meja 4!',
      tableTitle: 'Jadwal Peserta Ujian 1-1',
      subInstruction: 'Pindahkan kartu nomor ujian ke seluruh sel tabel:',
      headers: ['Nama Siswa', 'Nomor Meja'],
      rows: [
        { idX: 'r1_x', valX: 'Andi', isSlotX: false, idY: 'r1_y', valY: null, isSlotY: true },
        { idX: 'r2_x', valX: 'Budi', isSlotX: false, idY: 'r2_y', valY: null, isSlotY: true },
        { idX: 'r3_x', valX: 'Cici', isSlotX: false, idY: 'r3_y', valY: null, isSlotY: true },
        { idX: 'r4_x', valX: 'Doni', isSlotX: false, idY: 'r4_y', valY: null, isSlotY: true }
      ],
      tokens: ['Meja 1', 'Meja 2', 'Meja 3', 'Meja 4', 'Meja 5'],
      correctCells: { 'r1_y': 'Meja 1', 'r2_y': 'Meja 2', 'r3_y': 'Meja 3', 'r4_y': 'Meja 4' },
      explanation: 'Andi ➔ Meja 1, Budi ➔ Meja 2, Cici ➔ Meja 3, Doni ➔ Meja 4.'
    });

    // Q8: C5 HPB_BUILDER - Pos Jaga 4 Detektif Unik
    questions.push({
      id: 8, level: 'C5', pts: 120, type: 'HPB_BUILDER',
      question: 'Susunlah penugasan 4 detektif ke 4 pos jaga unik (korespondensi satu-satu): (D1, P3), (D2, P1), (D3, P4), (D4, P2)!',
      subInstruction: 'Pasang kode pos jaga ke dalam pasangan berurutan:',
      setName: 'Pos',
      pairs: [
        { idX: 'p1_x', idY: 'p1_y', ansX: 'D1', ansY: 'P3', fixedX: 'D1', fixedY: null },
        { idX: 'p2_x', idY: 'p2_y', ansX: 'D2', ansY: 'P1', fixedX: 'D2', fixedY: null },
        { idX: 'p3_x', idY: 'p3_y', ansX: 'D3', ansY: 'P4', fixedX: 'D3', fixedY: null },
        { idX: 'p4_x', idY: 'p4_y', ansX: 'D4', ansY: 'P2', fixedX: 'D4', fixedY: null }
      ],
      tokens: ['P1', 'P2', 'P3', 'P4', 'P5'],
      correctSlots: { 'p1_y': 'P3', 'p2_y': 'P1', 'p3_y': 'P4', 'p4_y': 'P2' },
      explanation: 'Penugasan pos jaga detektif: Pos = {(D1, P3), (D2, P1), (D3, P4), (D4, P2)}.'
    });

    // Q9: C5 ARROWS - Misi 5 Kabel Brankas 1-ke-1
    questions.push({
      id: 9, level: 'C5', pts: 120, type: 'ARROWS',
      question: 'Misi Kode 5 Kabel Brankas (Korespondensi 1-1): Pasangkan Merah ke Pin 3, Biru ke Pin 1, Hijau ke Pin 5, Kuning ke Pin 2, dan Putih ke Pin 4!',
      labelA: 'Warna Kabel',
      labelB: 'Nomor Pin',
      setA: ['Merah', 'Biru', 'Hijau', 'Kuning', 'Putih'],
      setB: ['Pin 1', 'Pin 2', 'Pin 3', 'Pin 4', 'Pin 5'],
      rule: 'brankas_lima_kabel',
      correctPairs: [
        'Merah->Pin 3',
        'Biru->Pin 1',
        'Hijau->Pin 5',
        'Kuning->Pin 2',
        'Putih->Pin 4'
      ],
      explanation: 'Kelima kabel brankas tersambung tepat 1-ke-1: Merah->Pin 3, Biru->Pin 1, Hijau->Pin 5, Kuning->Pin 2, Putih->Pin 4.'
    });

    // Q10: C5 CARTESIAN - Titik Koordinat Korespondensi 1-1 (5 Titik pada Kisi 5x5)
    questions.push({
      id: 10, level: 'C5', pts: 120, type: 'CARTESIAN',
      question: 'Tandai 5 titik koordinat korespondensi satu-satu pada bidang Kartesius: (1, 3), (2, 5), (3, 1), (4, 4), dan (5, 2)! Perhatikan bahwa setiap baris mendatar dan setiap kolom tegak hanya memuat tepat satu titik.',
      minX: 0, maxX: 5, minY: 0, maxY: 5,
      targetPoints: [[1, 3], [2, 5], [3, 1], [4, 4], [5, 2]],
      hint: 'Pastikan setiap baris mendatar (y) dan kolom tegak (x) hanya memiliki tepat satu titik.',
      explanation: 'Ciri utama korespondensi 1-1 pada diagram Kartesius adalah setiap garis tegak (nilai x) dan setiap garis mendatar (nilai y) hanya ditembus oleh tepat satu titik.'
    });
  }

  return questions.map(q => {
    const res = { ...q };
    if (res.options && Array.isArray(res.options) && res.type !== 'TRUE_FALSE') {
      res.options = shuffleArray(res.options);
    }
    if (res.tokens && Array.isArray(res.tokens)) {
      res.tokens = shuffleArray(res.tokens);
    }
    return res;
  });
}
