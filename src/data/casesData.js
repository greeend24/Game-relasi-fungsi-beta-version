// Data Kasus Kehidupan Sehari-hari dan Stage Level Data (21 Stages each)
// Enforcing 50% Real-World Everyday Life Cases + 50% Math/Logic Challenges
// Enforcing Progressive Bloom's Taxonomy Difficulty Levels: C3 (Applying) → C4 (Analyzing) → C5 (Evaluating)!
// Struktur diselaraskan 1-to-1 dengan 5 Chapter Pembelajaran (5 Subbab/Bab)

export const SUBBABS_DATA = {
  // ── BAB 1: PENGERTIAN & CARA MENYATAKAN RELASI ──
  1: {
    id: 1,
    key: 'subbab1',
    title: 'Pengertian & Cara Menyatakan Relasi',
    caseTitle: 'Pasangan yang Cocok & 4 Format Relasi',
    iconName: 'GitFork',
    image: '/images/1.png',
    briefing: 'Di markas detektif, ada daftar petunjuk dan tersangka. Tugasmu: memahami aturan relasi penghubung yang fleksibel dan mengenali 4 bentuk penyajiannya (diagram panah, tabel, pasangan berurutan, dan Kartesius)!',
    rules: [
      'Ada dua himpunan: Himpunan Asal A dan Himpunan Kawan B.',
      'Hubungkan anggota A ke B sesuai aturan relasi yang ditampilkan di layar.',
      'Relasi bersifat sangat fleksibel: boleh bercabang dan boleh tidak punya pasangan (kosong).'
    ],
    goal: 'Menyambungkan dan menyajikan semua pasangan relasi yang valid sebelum waktu habis.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Berdasarkan 20 stage latihan berjenjang (C3 - C5), apakah KESIMPULAN UTAMA dari konsep "RELASI"?',
          options: [
            'Relasi adalah aturan yang memasangkan anggota Himpunan A ke Himpunan B, di mana setiap elemen A bebas dipasangkan dengan 0, 1, atau lebih dari 1 elemen B.',
            'Relasi adalah aturan wajib di mana setiap elemen A harus punya tepat 1 pasangan di B.',
            'Relasi hanya berlaku jika jumlah n(A) sama dengan n(B).'
          ],
          correctAnswer: 'Relasi adalah aturan yang memasangkan anggota Himpunan A ke Himpunan B, di mana setiap elemen A bebas dipasangkan dengan 0, 1, atau lebih dari 1 elemen B.',
          hint: '💡 Petunjuk: Berbeda dengan Fungsi, Relasi TIDAK membatasi jumlah panah. Suatu anggota A boleh tidak punya pasangan, atau punya banyak pasangan di B.'
        };
      }

      const stagePool = [
        // STAGES 1-7: C3 (APPLYING / MENGAPLIKASIKAN)
        { stage: 1, bloomLevel: 'C3', isStoryCase: true, rule: 'Hubungkan Siswa di A dengan "Menu Kesukaan"-nya di B', conceptDef: 'Relasi adalah aturan yang menghubungkan anggota Himpunan A ke Himpunan B. Satu anggota A boleh punya banyak pasangan, satu pasangan, atau bahkan tidak punya pasangan di B.', story: 'Berdasarkan daftar pesanan kantin: Budi memesan Nasi Goreng; Siti memesan Soto; Rudi memesan Bakso. Hubungkan siswa ke pesanannya!', setA: ['Budi', 'Siti', 'Rudi'], setB: ['Nasi Goreng', 'Soto', 'Bakso'], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 2, bloomLevel: 'C3', isStoryCase: false, rule: 'Hubungkan angka di A yang "Kurang dari" angka di B', conceptDef: 'Aturan "kurang dari" artinya: hubungkan angka di A ke angka di B jika angka A lebih kecil dari angka B.', story: 'Bandingkan angka-angka di A [1, 2, 3] dan B [2, 4]. Hubungkan angka A yang nilainya lebih kecil dari angka B!', setA: [1, 2, 3], setB: [2, 4], validPairs: [[0, 0], [0, 1], [1, 1], [2, 1]] },
        { stage: 3, bloomLevel: 'C3', isStoryCase: true, rule: 'Hubungkan Siswa di A dengan "Kota Kelahiran"-nya di B', conceptDef: 'Relasi menghubungkan anggota Himpunan A ke anggota Himpunan B berdasarkan aturan tertentu, misalnya tempat lahir.', story: 'Data biodata kelas: Andi lahir di Jakarta, Dewi lahir di Bandung, Fajar lahir di Surabaya. Hubungkan siswa dengan kota kelahirannya!', setA: ['Andi', 'Dewi', 'Fajar'], setB: ['Jakarta', 'Bandung', 'Surabaya'], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 4, bloomLevel: 'C3', isStoryCase: false, rule: 'Hubungkan angka di A yang merupakan "Faktor dari" angka di B', conceptDef: 'Aturan "faktor dari" artinya: anggota di himpunan A merupakan faktor pembagi dari anggota di himpunan B.', story: 'Periksa faktor bilangan dari himpunan A [2, 3, 5] ke himpunan B [4, 6, 9]. Hubungkan a ke b jika a merupakan faktor dari b!', setA: [2, 3, 5], setB: [4, 6, 9], validPairs: [[0, 0], [0, 1], [1, 1], [1, 2]] },
        { stage: 5, bloomLevel: 'C3', isStoryCase: true, rule: 'Hubungkan Siswa di A dengan "Alat Tulis Favorit"-nya di B', conceptDef: 'Relasi menghubungkan setiap orang di Himpunan A dengan benda pilihannya di Himpunan B.', story: 'Dari survei kelas: Rina suka Pensil Warna; Tono suka Spidol; Maya suka Penghapus Lucu. Hubungkan siswa ke alat tulis favoritnya!', setA: ['Rina', 'Tono', 'Maya'], setB: ['Pensil Warna', 'Spidol', 'Penghapus Lucu'], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 6, bloomLevel: 'C3', isStoryCase: false, rule: 'Hubungkan angka di A yang "Dua lebihnya dari" angka di B', conceptDef: 'Aturan "dua lebihnya dari" artinya: angka di A selalu lebih besar 2 dari angka di B. Contoh: 4 adalah dua lebihnya dari 2.', story: 'Cek selisih angka A [4, 5, 6] dengan B [2, 3, 4]. Hubungkan a ke b jika a persis 2 lebih besar dari b!', setA: [4, 5, 6], setB: [2, 3, 4], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 7, bloomLevel: 'C3', isStoryCase: false, rule: 'Hubungkan angka di A yang "Kelipatan dari" angka di B', conceptDef: 'Angka a disebut kelipatan dari b jika a bisa dibagi b tanpa sisa. Contoh: 6 adalah kelipatan dari 2 karena 6 ÷ 2 = 3 (habis).', story: 'Uji bilangan A [6, 8, 10, 12] terhadap B [2, 4]. Hubungkan a ke b jika a adalah kelipatan dari b!', setA: [6, 8, 10, 12], setB: [2, 4], validPairs: [[0, 0], [1, 0], [1, 1], [2, 0], [3, 0], [3, 1]] },

        // STAGES 8-14: C4 (ANALYZING / MENGANALISIS & 4 FORMAT RELASI)
        { stage: 8, bloomLevel: 'C4', isStoryCase: true, rule: 'Analisis Jadwal: Hubungkan Siswa di A yang "Hadir di Jam Pelajaran Sama" dengan Ruang Kelas B', conceptDef: 'Relasi bisa menghubungkan siswa ke ruangan berdasarkan jadwal yang sama. Siswa yang masuk di jam yang sama berarti ada di ruangan yang sama.', story: 'Jadwal sekolah: Siswa Andi dan Budi ada di Ruang Lab Jam 09.00; Siswa Cici di Ruang Seni Jam 10.00. Hubungkan siswa ke ruangan berdasarkan jadwal!', setA: ['Andi (09.00)', 'Budi (09.00)', 'Cici (10.00)'], setB: ['Ruang Lab', 'Ruang Seni'], validPairs: [[0, 0], [1, 0], [2, 1]] },
        { stage: 9, bloomLevel: 'C4', isStoryCase: false, rule: 'Analisis Akar Kuadrat: Hubungkan a di A jika "a adalah akar kuadrat dari b" di B', conceptDef: 'Aturan "akar kuadrat dari" artinya: bilangan a adalah akar kuadrat dari b (a × a = b). Contoh: 2 × 2 = 4 (2 adalah akar kuadrat dari 4), jadi 2 dihubungkan ke 4.', story: 'Analisis angka A [2, 3, 4, 5] dan B [4, 9, 16, 25]. Hubungkan a ke b jika a adalah akar kuadrat dari b (a × a = b)!', setA: [2, 3, 4, 5], setB: [4, 9, 16, 25], validPairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        { stage: 10, bloomLevel: 'C4', isStoryCase: true, rule: 'Analisis Penggunaan WiFi: Hubungkan HP Siswa di A yang "Terhubung ke WiFi B"', conceptDef: 'Dalam relasi, satu anggota A boleh terhubung ke lebih dari satu anggota B. Contoh: satu HP bisa terhubung ke beberapa WiFi sekaligus.', story: 'Di sekolah: HP Andi terhubung ke WiFi Perpustakaan & WiFi Lab; HP Budi terhubung ke WiFi Kantin. Hubungkan HP ke jaringan WiFi tujuannya!', setA: ['HP Andi', 'HP Budi'], setB: ['WiFi Perpustakaan', 'WiFi Lab', 'WiFi Kantin'], validPairs: [[0, 0], [0, 1], [1, 2]] },
        { stage: 11, bloomLevel: 'C4', isStoryCase: false, rule: 'Hubungkan a di A dan b di B jika "a + b = 10"', conceptDef: 'Aturan "a + b = 10" artinya: cari pasangan angka a dan b yang kalau dijumlahkan hasilnya 10. Contoh: 2 + 8 = 10.', story: 'Cocokkan pasangan angka A [2, 3, 4, 7] dan B [3, 6, 7, 8]. Hubungkan a ke b jika a + b = 10!', setA: [2, 3, 4, 7], setB: [3, 6, 7, 8], validPairs: [[0, 3], [1, 2], [2, 1], [3, 0]] },
        { stage: 12, bloomLevel: 'C4', isStoryCase: true, rule: 'Analisis Uang Jajan: Hubungkan Siswa A yang "Menabung > Rp 10.000" ke Celengan B', conceptDef: 'Relasi bisa punya syarat tertentu, misalnya: hanya hubungkan siswa yang tabungannya lebih dari 10 Ribu ke celengannya.', story: 'Data tabungan kelas: Rani menabung 15 Ribu ke Celengan Merah; Doni menabung 5 Ribu ke Celengan Biru; Sari menabung 20 Ribu ke Celengan Hijau. Hubungkan siswa yang menabung > 10 Ribu!', setA: ['Rani (15 Ribu)', 'Doni (5 Ribu)', 'Sari (20 Ribu)'], setB: ['Celengan Merah', 'Celengan Biru', 'Celengan Hijau'], validPairs: [[0, 0], [2, 2]] },
        { stage: 13, bloomLevel: 'C4', isStoryCase: false, rule: 'Analisis Akar Pangkat: Hubungkan a di A jika "a × a = b" di B', conceptDef: 'Aturan "akar kuadrat" artinya: a adalah akar dari b jika a × a = b. Contoh: 3 × 3 = 9, jadi 3 adalah akar dari 9.', story: 'Uji angka A [3, 4, 5] terhadap B [9, 16, 25, 36]. Hubungkan a ke b jika a × a = b!', setA: [3, 4, 5], setB: [9, 16, 25, 36], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 14, bloomLevel: 'C4', isStoryCase: true, rule: 'Analisis Jarak Rumah: Hubungkan Siswa di A yang "Rumahnya Dekat Sekolah (< 3km)" ke Jalur B', conceptDef: 'Relasi bisa berdasarkan jarak. Hubungkan siswa ke jalur yang dekat dengan rumahnya (jaraknya kurang dari 3 km).', story: 'Data alamat: Rumah Andi dekat Jalur A (< 2km); Rumah Budi dekat Jalur A dan Jalur B (< 2.5km). Hubungkan siswa ke jalur terdekat sekolah!', setA: ['Rumah Andi', 'Rumah Budi'], setB: ['Jalur A', 'Jalur B'], validPairs: [[0, 0], [1, 0], [1, 1]] },

        // STAGES 15-20: C5 (EVALUATING / MENGEVALUASI)
        { stage: 15, bloomLevel: 'C5', isStoryCase: false, rule: 'Hubungkan a di A dan b di B jika "a × b ≥ 12"', conceptDef: 'Aturan "a × b ≥ 12" artinya: hubungkan a dan b yang kalau dikalikan hasilnya 12 atau lebih. Contoh: 3 × 4 = 12, jadi 3 dihubungkan ke 4.', story: 'Latihan evaluasi: Diberikan Himpunan A [2, 3, 4] dan B [3, 4, 5]. Hubungkan pasangan yang hasil kalinya 12 atau lebih!', setA: [2, 3, 4], setB: [3, 4, 5], validPairs: [[1, 1], [1, 2], [2, 0], [2, 1], [2, 2]] },
        { stage: 16, bloomLevel: 'C5', isStoryCase: true, rule: 'Evaluasi Chat Grup: Hubungkan Nomor A yang "Mengirim Pesan ke Nomor B minimal 2 kali"', conceptDef: 'Relasi bisa punya syarat jumlah. Di sini: hubungkan pengirim yang menghubungi temannya paling sedikit 2 kali.', story: 'Log chat grup kelas: Andi mengirim pesan ke Budi (3 kali) & ke Cici (1 kali); Dewi mengirim pesan ke Cici (4 kali). Hubungkan pengirim yang menghubungi teman minimal 2 kali!', setA: ['Andi', 'Dewi'], setB: ['Budi', 'Cici'], validPairs: [[0, 0], [1, 1]] },
        { stage: 17, bloomLevel: 'C5', isStoryCase: false, rule: 'Hubungkan a di A dan b di B jika "sisa bagi 3 sama"', conceptDef: 'Hubungkan angka a dan b yang punya sisa pembagian yang sama kalau dibagi 3. Contoh: 4 dibagi 3 sisa 1, dan 7 dibagi 3 juga sisa 1, jadi 4 dihubungkan ke 7.', story: 'Tantangan sisa bagi: Himpunan A [4, 7, 9] dan B [1, 3, 4, 6]. Hubungkan a ke b jika sisa pembagian 3-nya sama!', setA: [4, 7, 9], setB: [1, 3, 4, 6], validPairs: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 1], [2, 3]] },
        { stage: 18, bloomLevel: 'C5', isStoryCase: true, rule: 'Evaluasi Waktu Perjalanan: Hubungkan Siswa A yang "Bisa Sampai dari Rumah ke Sekolah dalam waktu < 30 Menit"', conceptDef: 'Cek apakah waktu perjalanan siswa masuk akal atau tidak. Kalau jalan kaki 10 km cuma 5 menit, itu tidak wajar kan?', story: 'Data perjalanan siswa: Andi dari rumah ke sekolah naik sepeda (15 menit - Wajar); Budi dari rumah ke sekolah jalan kaki (5 menit untuk 10 km - Tidak Wajar!). Hubungkan yang masuk akal!', setA: ['Andi (Sepeda 15 mnt)', 'Budi (Jalan Kaki 5 mnt/10km)'], setB: ['Wajar (< 30 Menit)', 'Tidak Wajar (> 30 Menit)'], validPairs: [[0, 0], [1, 1]] },
        { stage: 19, bloomLevel: 'C5', isStoryCase: false, rule: 'Hubungkan a di A dan b di B jika "a + 2b = 10"', conceptDef: 'Aturan "a + 2b = 10" artinya: cari pasangan a dan b yang kalau b dikali 2 lalu ditambah a, hasilnya 10. Contoh: a = 2, b = 4 → 2 + (2×4) = 10.', story: 'Evaluasi rumus: Himpunan A [2, 4, 6, 8] dan B [1, 2, 3, 4]. Hubungkan a ke b jika a + 2b = 10!', setA: [2, 4, 6, 8], setB: [1, 2, 3, 4], validPairs: [[0, 3], [1, 2], [2, 1], [3, 0]] },
        { stage: 20, bloomLevel: 'C5', isStoryCase: true, rule: 'Evaluasi Tantangan Akhir: Hubungkan Tugas A dengan "Hasil Penilaian B"', conceptDef: 'Cocokkan tugas dengan hasil penilaiannya. Tugas yang lengkap → Lulus. Tugas yang tidak lengkap → Perlu Perbaikan.', story: 'Penilaian tugas: Tugas 1 (Dikerjakan Lengkap) -> Lulus; Tugas 2 (Tidak Lengkap) -> Perlu Perbaikan. Hubungkan tugas ke hasil penilaiannya!', setA: ['Tugas 1 (Lengkap)', 'Tugas 2 (Tidak Lengkap)'], setB: ['Lulus', 'Perlu Perbaikan'], validPairs: [[0, 0], [1, 1]] }
      ];

      return stagePool[stageNum - 1];
    })
  },

  // ── BAB 2: PENGERTIAN & UNSUR FUNGSI ──
  2: {
    id: 2,
    key: 'subbab2',
    title: 'Pengertian & Unsur Fungsi',
    caseTitle: 'Mesin Detektor & Arsip Kasus',
    iconName: 'Target',
    image: '/images/2.png',
    briefing: 'Fungsi adalah relasi disiplin: setiap anggota Daerah Asal (Domain) wajib memiliki TEPAT SATU pasangan di Daerah Kawan (Kodomain). Bagian yang terkena panah disebut Daerah Hasil (Range)!',
    rules: [
      'Uji apakah relasi memenuhi 2 syarat fungsi: (1) semua domain terpasang habis, dan (2) tidak boleh bercabang.',
      'Identifikasi unsur-unsur fungsi: Domain (asal), Kodomain (seluruh kawan), dan Range (hasil panah).'
    ],
    goal: 'Mengidentifikasi keabsahan fungsi dan menentukan unsur-unsurnya dengan tepat.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Apakah KESIMPULAN UTAMA dari syarat fungsi dan perbedaan Domain, Kodomain, dan Range?',
          options: [
            'Fungsi mewajibkan setiap anggota Domain punya tepat 1 pasangan di Kodomain. Range adalah himpunan bagian dari Kodomain yang benar-benar terpilih oleh panah.',
            'Fungsi membolehkan anggota Domain bercabang asalkan Range sama dengan Kodomain.',
            'Domain, Kodomain, dan Range selalu bernilai sama pada setiap fungsi.'
          ],
          correctAnswer: 'Fungsi mewajibkan setiap anggota Domain punya tepat 1 pasangan di Kodomain. Range adalah himpunan bagian dari Kodomain yang benar-benar terpilih oleh panah.',
          hint: '💡 Petunjuk: Dua syarat mutlak fungsi: tidak boleh kosong dan tidak boleh bercabang di Domain. Range adalah anggota Kodomain yang menerima panah.'
        };
      }

      const isStory = stageNum % 2 === 1;
      const bloomLevel = stageNum <= 7 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5';

      // Tahap 1-10: Uji Syarat Fungsi (Mesin Detektor)
      if (stageNum <= 10) {
        return {
          stage: stageNum,
          bloomLevel,
          isStoryCase: isStory,
          conceptDef: 'Fungsi adalah relasi dengan aturan disiplin: setiap anggota Domain A HARUS memiliki pasangan dan TEPAT SATU di Kodomain B. Tidak boleh kosong dan tidak boleh bercabang.',
          machines: isStory ? [
            { id: 1, pairs: [['Siswa Budi', 'Loker 101'], ['Siswa Siti', 'Loker 102'], ['Siswa Rudi', 'Loker 103']], isFunction: true, reason: 'Semua siswa punya tepat 1 loker masing-masing' },
            { id: 2, pairs: [['Siswa Budi', 'Loker 101'], ['Siswa Budi', 'Loker 999'], ['Siswa Siti', 'Loker 102']], isFunction: false, reason: 'Siswa Budi punya 2 loker sekaligus (bercabang)!' },
            { id: 3, pairs: [['Siswa Budi', 'Loker 101'], ['Siswa Siti', 'Loker 102']], isFunction: false, reason: 'Siswa Rudi tidak punya loker (kosong)!' },
            { id: 4, pairs: [['Siswa Budi', 'Kantin A'], ['Siswa Siti', 'Kantin A'], ['Siswa Rudi', 'Kantin A']], isFunction: true, reason: 'Semua siswa pergi ke Kantin A yang sama (sah sebagai fungsi)' }
          ] : [
            { id: 1, pairs: [[1, 'A'], [2, 'B'], [3, 'C']], isFunction: true, reason: 'Setiap anggota daerah asal A memiliki tepat satu pasangan di B' },
            { id: 2, pairs: [[1, 'A'], [1, 'B'], [2, 'C']], isFunction: false, reason: 'Anggota asal 1 bercabang ke 2 kawan berbeda (A dan B)!' },
            { id: 3, pairs: [[1, 'A'], [2, 'B']], isFunction: false, reason: 'Anggota asal 3 tidak memiliki pasangan kawan!' },
            { id: 4, pairs: [[1, 'B'], [2, 'B'], [3, 'B']], isFunction: true, reason: 'Setiap anggota daerah asal A memiliki tepat satu kawan di B (meskipun kawannya sama, sah sebagai fungsi)' }
          ]
        };
      }

      // Tahap 11-20: Unsur-unsur Fungsi (Domain, Kodomain, Range) — BERVARIASI
      const dkrPool = [
        {
          setA: ['Buku MTK', 'Buku IPA', 'Buku IPS', 'Buku Bahasa'], setB: ['Rak A', 'Rak B', 'Rak C', 'Rak D', 'Rak E'],
          mappedPairs: [['Buku MTK', 'Rak A'], ['Buku IPA', 'Rak C'], ['Buku IPS', 'Rak C'], ['Buku Bahasa', 'Rak E']],
          correctDomain: ['Buku MTK', 'Buku IPA', 'Buku IPS', 'Buku Bahasa'], correctKodomain: ['Rak A', 'Rak B', 'Rak C', 'Rak D', 'Rak E'], correctRange: ['Rak A', 'Rak C', 'Rak E'],
          quiz: [
            { question: 'Manakah daerah asal (Domain)?', options: ['{Buku MTK, Buku IPA, Buku IPS, Buku Bahasa}', '{Rak A, Rak B, Rak C}', '{Rak A, Rak C, Rak E}'], answer: '{Buku MTK, Buku IPA, Buku IPS, Buku Bahasa}' },
            { question: 'Manakah rak yang benar-benar terisi buku (Range)?', options: ['{Rak A, Rak C, Rak E}', '{Rak A, Rak B, Rak C, Rak D, Rak E}', '{Buku MTK, Buku IPA}'], answer: '{Rak A, Rak C, Rak E}' },
            { question: 'Apakah Rak B dan Rak D termasuk Kodomain?', options: ['Ya, Kodomain adalah seluruh rak yang tersedia', 'Tidak, karena belum terisi', 'Tergantung jenis buku'], answer: 'Ya, Kodomain adalah seluruh rak yang tersedia' }
          ]
        },
        {
          setA: ['Andi', 'Budi', 'Cici'], setB: ['Basket', 'Pramuka', 'Seni', 'Renang'],
          mappedPairs: [['Andi', 'Basket'], ['Budi', 'Pramuka'], ['Cici', 'Seni']],
          correctDomain: ['Andi', 'Budi', 'Cici'], correctKodomain: ['Basket', 'Pramuka', 'Seni', 'Renang'], correctRange: ['Basket', 'Pramuka', 'Seni'],
          quiz: [
            { question: 'Manakah Domain dari fungsi ini?', options: ['{Andi, Budi, Cici}', '{Basket, Pramuka, Seni, Renang}', '{Basket, Pramuka, Seni}'], answer: '{Andi, Budi, Cici}' },
            { question: 'Manakah Range-nya?', options: ['{Basket, Pramuka, Seni}', '{Basket, Pramuka, Seni, Renang}', '{Andi, Budi, Cici}'], answer: '{Basket, Pramuka, Seni}' },
            { question: 'Apakah Renang termasuk Kodomain?', options: ['Ya, Kodomain adalah seluruh pilihan ekskul', 'Tidak, karena tidak ada yang memilih', 'Hanya jika ada siswa baru'], answer: 'Ya, Kodomain adalah seluruh pilihan ekskul' }
          ]
        },
        {
          setA: [1, 2, 3, 4], setB: ['P', 'Q', 'R', 'S', 'T'],
          mappedPairs: [[1, 'P'], [2, 'Q'], [3, 'Q'], [4, 'R']],
          correctDomain: [1, 2, 3, 4], correctKodomain: ['P', 'Q', 'R', 'S', 'T'], correctRange: ['P', 'Q', 'R'],
          quiz: [
            { question: 'Manakah Domain?', options: ['{1, 2, 3, 4}', '{P, Q, R, S, T}', '{P, Q, R}'], answer: '{1, 2, 3, 4}' },
            { question: 'Manakah Range?', options: ['{P, Q, R}', '{P, Q, R, S, T}', '{1, 2, 3, 4}'], answer: '{P, Q, R}' },
            { question: 'Apakah S dan T termasuk Range?', options: ['Tidak, karena tidak mendapat panah dari domain', 'Ya, karena termasuk Kodomain', 'Tergantung fungsinya'], answer: 'Tidak, karena tidak mendapat panah dari domain' }
          ]
        },
        {
          setA: ['Kucing', 'Ikan', 'Burung'], setB: ['Darat', 'Air', 'Udara'],
          mappedPairs: [['Kucing', 'Darat'], ['Ikan', 'Air'], ['Burung', 'Udara']],
          correctDomain: ['Kucing', 'Ikan', 'Burung'], correctKodomain: ['Darat', 'Air', 'Udara'], correctRange: ['Darat', 'Air', 'Udara'],
          quiz: [
            { question: 'Manakah Domain?', options: ['{Kucing, Ikan, Burung}', '{Darat, Air, Udara}', '{Kucing, Darat}'], answer: '{Kucing, Ikan, Burung}' },
            { question: 'Apakah Range sama dengan Kodomain?', options: ['Ya, karena semua habitat mendapat pasangan', 'Tidak, selalu berbeda', 'Tergantung jumlah hewan'], answer: 'Ya, karena semua habitat mendapat pasangan' },
            { question: 'Berapa anggota Range?', options: ['3', '2', '6'], answer: '3' }
          ]
        },
        {
          setA: ['Apel', 'Jeruk', 'Mangga', 'Pisang'], setB: ['Keranjang 1', 'Keranjang 2', 'Keranjang 3'],
          mappedPairs: [['Apel', 'Keranjang 1'], ['Jeruk', 'Keranjang 2'], ['Mangga', 'Keranjang 2'], ['Pisang', 'Keranjang 3']],
          correctDomain: ['Apel', 'Jeruk', 'Mangga', 'Pisang'], correctKodomain: ['Keranjang 1', 'Keranjang 2', 'Keranjang 3'], correctRange: ['Keranjang 1', 'Keranjang 2', 'Keranjang 3'],
          quiz: [
            { question: 'Manakah Domain?', options: ['{Apel, Jeruk, Mangga, Pisang}', '{Keranjang 1, 2, 3}', '{Apel, Keranjang 1}'], answer: '{Apel, Jeruk, Mangga, Pisang}' },
            { question: 'Apakah ini fungsi?', options: ['Ya, setiap buah masuk tepat satu keranjang', 'Tidak, ada keranjang berisi dua buah', 'Tidak bisa ditentukan'], answer: 'Ya, setiap buah masuk tepat satu keranjang' },
            { question: 'Berapa anggota Kodomain?', options: ['3', '4', '7'], answer: '3' }
          ]
        },
        {
          setA: ['Rina', 'Doni', 'Sari', 'Tono'], setB: ['Merah', 'Biru', 'Hijau', 'Kuning', 'Ungu'],
          mappedPairs: [['Rina', 'Merah'], ['Doni', 'Biru'], ['Sari', 'Merah'], ['Tono', 'Hijau']],
          correctDomain: ['Rina', 'Doni', 'Sari', 'Tono'], correctKodomain: ['Merah', 'Biru', 'Hijau', 'Kuning', 'Ungu'], correctRange: ['Merah', 'Biru', 'Hijau'],
          quiz: [
            { question: 'Warna apa saja yang dipilih siswa (Range)?', options: ['{Merah, Biru, Hijau}', '{Merah, Biru, Hijau, Kuning, Ungu}', '{Rina, Doni, Sari, Tono}'], answer: '{Merah, Biru, Hijau}' },
            { question: 'Apakah Kuning dan Ungu termasuk Range?', options: ['Tidak, karena tidak ada siswa yang memilihnya', 'Ya, karena tersedia di Kodomain', 'Tergantung jumlah siswa'], answer: 'Tidak, karena tidak ada siswa yang memilihnya' },
            { question: 'Bolehkah dua siswa memilih warna yang sama?', options: ['Boleh, karena fungsi hanya melarang domain bercabang', 'Tidak boleh', 'Hanya jika warnanya primer'], answer: 'Boleh, karena fungsi hanya melarang domain bercabang' }
          ]
        },
        {
          setA: [2, 4, 6], setB: [1, 2, 3, 4, 5],
          mappedPairs: [[2, 1], [4, 2], [6, 3]],
          correctDomain: [2, 4, 6], correctKodomain: [1, 2, 3, 4, 5], correctRange: [1, 2, 3],
          quiz: [
            { question: 'Manakah Domain?', options: ['{2, 4, 6}', '{1, 2, 3, 4, 5}', '{1, 2, 3}'], answer: '{2, 4, 6}' },
            { question: 'Manakah Range?', options: ['{1, 2, 3}', '{1, 2, 3, 4, 5}', '{2, 4, 6}'], answer: '{1, 2, 3}' },
            { question: 'Apakah 4 dan 5 termasuk Range?', options: ['Tidak, karena tidak terpasang oleh domain', 'Ya, karena termasuk Kodomain', 'Tidak pasti'], answer: 'Tidak, karena tidak terpasang oleh domain' }
          ]
        },
        {
          setA: ['Senin', 'Selasa', 'Rabu'], setB: ['MTK', 'IPA', 'B. Indo', 'Seni'],
          mappedPairs: [['Senin', 'MTK'], ['Selasa', 'IPA'], ['Rabu', 'B. Indo']],
          correctDomain: ['Senin', 'Selasa', 'Rabu'], correctKodomain: ['MTK', 'IPA', 'B. Indo', 'Seni'], correctRange: ['MTK', 'IPA', 'B. Indo'],
          quiz: [
            { question: 'Manakah Domain?', options: ['{Senin, Selasa, Rabu}', '{MTK, IPA, B. Indo, Seni}', '{MTK, IPA, B. Indo}'], answer: '{Senin, Selasa, Rabu}' },
            { question: 'Apakah Seni termasuk Range?', options: ['Tidak, karena tidak ada hari yang memetakan ke Seni', 'Ya, karena termasuk mata pelajaran', 'Tergantung jadwal'], answer: 'Tidak, karena tidak ada hari yang memetakan ke Seni' },
            { question: 'Berapa banyak anggota Kodomain?', options: ['4', '3', '7'], answer: '4' }
          ]
        },
        {
          setA: ['Laptop', 'HP', 'Tablet'], setB: ['WiFi A', 'WiFi B', 'WiFi C'],
          mappedPairs: [['Laptop', 'WiFi A'], ['HP', 'WiFi B'], ['Tablet', 'WiFi A']],
          correctDomain: ['Laptop', 'HP', 'Tablet'], correctKodomain: ['WiFi A', 'WiFi B', 'WiFi C'], correctRange: ['WiFi A', 'WiFi B'],
          quiz: [
            { question: 'Manakah Range?', options: ['{WiFi A, WiFi B}', '{WiFi A, WiFi B, WiFi C}', '{Laptop, HP, Tablet}'], answer: '{WiFi A, WiFi B}' },
            { question: 'Apakah WiFi C termasuk Range?', options: ['Tidak, karena tidak ada perangkat yang terhubung', 'Ya, WiFi C tersedia', 'Tergantung jaringan'], answer: 'Tidak, karena tidak ada perangkat yang terhubung' },
            { question: 'Apakah ini fungsi?', options: ['Ya, setiap perangkat terhubung tepat satu WiFi', 'Tidak, Laptop dan Tablet pakai WiFi sama', 'Tidak bisa ditentukan'], answer: 'Ya, setiap perangkat terhubung tepat satu WiFi' }
          ]
        },
        {
          setA: ['A', 'B', 'C', 'D', 'E'], setB: [1, 2, 3],
          mappedPairs: [['A', 1], ['B', 2], ['C', 1], ['D', 3], ['E', 2]],
          correctDomain: ['A', 'B', 'C', 'D', 'E'], correctKodomain: [1, 2, 3], correctRange: [1, 2, 3],
          quiz: [
            { question: 'Berapa banyak anggota Domain?', options: ['5', '3', '8'], answer: '5' },
            { question: 'Apakah Range sama dengan Kodomain di sini?', options: ['Ya, karena semua anggota Kodomain mendapat pasangan', 'Tidak, selalu berbeda', 'Hanya kadang-kadang'], answer: 'Ya, karena semua anggota Kodomain mendapat pasangan' },
            { question: 'Apakah ini fungsi?', options: ['Ya, setiap huruf punya tepat satu angka pasangan', 'Tidak, karena ada angka yang dipakai berulang', 'Tidak bisa ditentukan'], answer: 'Ya, setiap huruf punya tepat satu angka pasangan' }
          ]
        }
      ];

      const dkrItem = dkrPool[(stageNum - 11) % dkrPool.length];
      return {
        stage: stageNum,
        bloomLevel,
        isStoryCase: isStory,
        conceptDef: 'Dalam fungsi, ada 3 bagian penting: Domain = semua anggota Himpunan Asal A. Kodomain = seluruh anggota Himpunan Kawan B. Range = anggota B yang benar-benar terpilih oleh panah dari A.',
        setA: dkrItem.setA,
        setB: dkrItem.setB,
        mappedPairs: dkrItem.mappedPairs,
        correctDomain: dkrItem.correctDomain,
        correctKodomain: dkrItem.correctKodomain,
        correctRange: dkrItem.correctRange,
        quiz: dkrItem.quiz
      };
    })
  },

  // ── BAB 3: NOTASI & RUMUS FUNGSI ──
  3: {
    id: 3,
    key: 'subbab3',
    title: 'Notasi & Rumus Fungsi',
    caseTitle: 'Rumus Ajaib Matematika',
    iconName: 'Binary',
    image: '/images/3.png',
    briefing: 'Di kehidupan sehari-hari, banyak pola yang dapat dimodelkan secara matematis. Tugasmu: menerjemahkan pola menjadi rumus f(x) = ax + b dan menghitung bayangan nilainya!',
    rules: [
      'Pilih rumus fungsi f(x) yang tepat berdasarkan kasus.',
      'Substitusikan nilai x ke dalam rumus untuk menghitung f(x).'
    ],
    goal: 'Menyusun notasi fungsi dan menghitung hasil perhitungan nilai f(x) dengan akurat.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Apakah KESIMPULAN UTAMA dari cara menentukan nilai fungsi f(x)?',
          options: [
            'Nilai fungsi f(x) diperoleh dengan menyubstitusikan (mengganti) variabel x pada rumus f(x) dengan bilangan daerah asal yang ditentukan.',
            'Nilai fungsi f(x) selalu bernilai nol untuk setiap nilai x.',
            'Notasi f(x) hanya simbol nama dan tidak memengaruhi perhitungan angka.'
          ],
          correctAnswer: 'Nilai fungsi f(x) diperoleh dengan menyubstitusikan (mengganti) variabel x pada rumus f(x) dengan bilangan daerah asal yang ditentukan.',
          hint: '💡 Petunjuk: Notasi f(x) = ax + b berarti kalikan nilai x dengan koefisien a, lalu tambahkan dengan konstanta b.'
        };
      }

      const stories = [
        { isStoryCase: true, story: 'Ongkos Ojek Online: Tarif awal Rp 5.000, ditambah Rp 3.000 per km (x). Berapa total ongkos untuk perjalanan 4 km?', options: ['f(x) = 3000x + 5000', 'f(x) = 5000x + 3000', 'f(x) = 3000x - 5000'], correct: 'f(x) = 3000x + 5000', x: 4, ans: 17000 },
        { isStoryCase: false, story: 'Sebuah fungsi memetakan x ke 2x + 5. Hitunglah nilai fungsi f(3)!', options: ['f(x) = 2x + 5', 'f(x) = 5x + 2', 'f(x) = 2x - 5'], correct: 'f(x) = 2x + 5', x: 3, ans: 11 },
        { isStoryCase: true, story: 'Biaya Sewa Kostum Pentas Seni: Biaya administrasi Rp 20.000, ditambah Rp 50.000 per hari (x). Berapa biaya sewa selama 3 hari?', options: ['f(x) = 50000x + 20000', 'f(x) = 20000x + 50000', 'f(x) = 50000x - 20000'], correct: 'f(x) = 50000x + 20000', x: 3, ans: 170000 },
        { isStoryCase: false, story: 'Diketahui rumus fungsi f(x) = 4x - 7. Berapakah nilai dari f(5)?', options: ['f(x) = 4x - 7', 'f(x) = 7x - 4', 'f(x) = 4x + 7'], correct: 'f(x) = 4x - 7', x: 5, ans: 13 },
        { isStoryCase: false, story: 'HOTS: Fungsi linear f(x) = ax + b memenuhi f(2) = 11 dan f(5) = 20. Tentukan rumus f(x) dan hitung nilai f(8)!', options: ['f(x) = 3x + 5', 'f(x) = 2x + 7', 'f(x) = 4x + 3'], correct: 'f(x) = 3x + 5', x: 8, ans: 29 },
        { isStoryCase: false, story: 'HOTS: Suatu fungsi f(x) = ax - 4 memiliki nilai f(3) = 11. Tentukan rumus f(x) lalu hitung nilai f(-2)!', options: ['f(x) = 5x - 4', 'f(x) = 3x - 4', 'f(x) = 4x - 4'], correct: 'f(x) = 5x - 4', x: -2, ans: -14 },
        { isStoryCase: true, story: 'Sewa Sepeda Wisata: Biaya pokok Rp 5.000, biaya f(10) = Rp 45.000 dan f(20) = Rp 85.000. Hitung f(30)!', options: ['f(x) = 4000x + 5000', 'f(x) = 3000x + 15000', 'f(x) = 5000x'], correct: 'f(x) = 4000x + 5000', x: 30, ans: 125000 },
        { isStoryCase: false, story: 'HOTS: Fungsi linear f(x) = ax + b memenuhi f(0) = -4 dan f(3) = 11. Tentukan rumus f(x) lalu hitung f(5)!', options: ['f(x) = 5x - 4', 'f(x) = 4x - 3', 'f(x) = 3x + 2'], correct: 'f(x) = 5x - 4', x: 5, ans: 21 },
        { isStoryCase: false, story: 'HOTS: Diketahui rumus f(x) = 2x + 3. Jika nilai f(k) = 19, tentukan nilai k!', options: ['f(x) = 2x + 3', 'f(x) = 3x + 2', 'f(x) = 2x - 3'], correct: 'f(x) = 2x + 3', x: 8, ans: 19 },
        { isStoryCase: false, story: 'Fungsi linear f(x) = 5 - 3x. Hitunglah nilai dari f(-4)!', options: ['f(x) = 5 - 3x', 'f(x) = 3x - 5', 'f(x) = -5 - 3x'], correct: 'f(x) = 5 - 3x', x: -4, ans: 17 },
        { isStoryCase: false, story: 'HOTS: Fungsi linear f(x) = ax + b memenuhi f(1) = 5 dan f(4) = 14. Tentukan rumus f(x) dan hitung f(10)!', options: ['f(x) = 3x + 2', 'f(x) = 4x + 1', 'f(x) = 2x + 3'], correct: 'f(x) = 3x + 2', x: 10, ans: 32 },
        { isStoryCase: true, story: 'Tabungan Harian: Ayu menabung Rp 2.000 per hari dengan modal awal Rp 15.000. Berapa tabungan setelah 10 hari?', options: ['f(x) = 2000x + 15000', 'f(x) = 15000x + 2000', 'f(x) = 2000x - 15000'], correct: 'f(x) = 2000x + 15000', x: 10, ans: 35000 },
        { isStoryCase: false, story: 'HOTS: Diketahui f(x) = 6x - 11. Jika f(k) = 25, tentukan nilai k!', options: ['f(x) = 6x - 11', 'f(x) = 11x - 6', 'f(x) = 6x + 11'], correct: 'f(x) = 6x - 11', x: 6, ans: 25 },
        { isStoryCase: false, story: 'HOTS: Diketahui f(x) = ax - 9. Jika f(4) = 15, tentukan rumus f(x) lalu hitung f(7)!', options: ['f(x) = 6x - 9', 'f(x) = 4x - 9', 'f(x) = 5x - 9'], correct: 'f(x) = 6x - 9', x: 7, ans: 33 },
        { isStoryCase: false, story: 'Fungsi f(x) = 7 - 4x. Evaluasi dan hitunglah nilai f(-5)!', options: ['f(x) = 7 - 4x', 'f(x) = 4x - 7', 'f(x) = -7 - 4x'], correct: 'f(x) = 7 - 4x', x: -5, ans: 27 },
        { isStoryCase: false, story: 'HOTS: Fungsi linear f(x) = ax + b memenuhi f(3) = 13 dan f(7) = 29. Tentukan rumus f(x) lalu hitung f(6)!', options: ['f(x) = 4x + 1', 'f(x) = 3x + 4', 'f(x) = 5x - 2'], correct: 'f(x) = 4x + 1', x: 6, ans: 25 },
        { isStoryCase: false, story: 'HOTS: Fungsi f(x) = ax + b memenuhi f(2) = 9 dan f(6) = 25. Tentukan rumus f(x) lalu hitung f(-1)!', options: ['f(x) = 4x + 1', 'f(x) = 3x + 3', 'f(x) = 5x - 1'], correct: 'f(x) = 4x + 1', x: -1, ans: -3 },
        { isStoryCase: false, story: 'HOTS: Diketahui f(x) = 3x + 8. Jika f(k) = 35, tentukan nilai k!', options: ['f(x) = 3x + 8', 'f(x) = 8x + 3', 'f(x) = 3x - 8'], correct: 'f(x) = 3x + 8', x: 9, ans: 35 },
        { isStoryCase: false, story: 'HOTS: Diketahui f(x) = ax + 7. Jika f(-2) = -3, tentukan rumus f(x) lalu hitung f(4)!', options: ['f(x) = 5x + 7', 'f(x) = 2x + 7', 'f(x) = 3x + 7'], correct: 'f(x) = 5x + 7', x: 4, ans: 27 },
        { isStoryCase: false, story: 'Rumus fungsi f(x) = 8x - 15. Hitunglah nilai dari f(6)!', options: ['f(x) = 8x - 15', 'f(x) = 15x - 8', 'f(x) = 8x + 15'], correct: 'f(x) = 8x - 15', x: 6, ans: 33 }
      ];

      const cur = stories[(stageNum - 1) % stories.length];
      return {
        stage: stageNum,
        bloomLevel: stageNum <= 4 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5',
        isStoryCase: cur.isStoryCase,
        conceptDef: 'Rumus fungsi f(x) = ax + b artinya: ganti huruf x dengan angka tertentu, lalu hitung hasilnya. Contoh: f(x) = 2x + 3, kalau x = 4, maka f(4) = 2(4) + 3 = 11.',
        story: cur.story,
        formulaOptions: cur.options,
        correctFormula: cur.correct,
        xVal: cur.x,
        correctAns: cur.ans
      };
    })
  },

  // ── BAB 4: GRAFIK FUNGSI LINEAR ──
  4: {
    id: 4,
    key: 'subbab4',
    title: 'Grafik Fungsi Linear',
    caseTitle: 'Jejak Garis di Puncak Koordinat',
    iconName: 'BarChart3',
    image: '/images/4.png',
    briefing: 'Grafik fungsi linear f(x) = ax + b pada bidang Kartesius selalu berupa GARIS LURUS. Tugasmu: menentukan titik potong sumbu X & Y, menghitung nilai kemiringan (gradien m = a), serta membaca arah garisnya!',
    rules: [
      'Titik potong sumbu Y diperoleh saat nilai x = 0, yaitu titik (0, b).',
      'Titik potong sumbu X diperoleh saat f(x) = 0, yaitu nilai x penyelesai ax + b = 0.',
      'Nilai gradien m = a: jika m > 0 garis condong naik ke kanan, jika m < 0 garis condong turun ke kanan.'
    ],
    goal: 'Menganalisis karakteristik garis lurus fungsi linear pada koordinat Kartesius dengan sempurna.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Apakah KESIMPULAN UTAMA dari bentuk dan sifat grafik fungsi linear f(x) = ax + b?',
          options: [
            'Grafiknya selalu berupa garis lurus dengan kemiringan gradien m = a dan memotong sumbu Y di titik koordinat (0, b).',
            'Grafiknya selalu berupa kurva parabola melengkung yang memotong titik pusat (0,0).',
            'Grafiknya selalu berupa lingkaran bertingkat yang tidak memiliki nilai kemiringan.'
          ],
          correctAnswer: 'Grafiknya selalu berupa garis lurus dengan kemiringan gradien m = a dan memotong sumbu Y di titik koordinat (0, b).',
          hint: '💡 Petunjuk: Karena berderajat satu (linear), grafiknya adalah garis lurus. Koefisien a menentukan gradien/kemiringan, dan konstanta b menentukan perpotongan di sumbu Y.'
        };
      }

      const graphCases = [
        // C3: Titik potong sumbu Y & X dasar
        { story: 'Grafik fungsi linear f(x) = 2x + 6. Tentukan titik potong grafik terhadap sumbu Y!', options: ['(0, 6)', '(6, 0)', '(0, 2)', '(2, 0)'], correct: '(0, 6)', explanation: 'Titik potong sumbu Y terjadi saat x = 0: f(0) = 2(0) + 6 = 6. Titik koordinatnya (0, 6).' },
        { story: 'Grafik fungsi linear f(x) = 3x - 9. Tentukan titik potong grafik terhadap sumbu X!', options: ['(3, 0)', '(0, -9)', '(-3, 0)', '(9, 0)'], correct: '(3, 0)', explanation: 'Titik potong sumbu X terjadi saat f(x) = 0: 3x - 9 = 0 ➔ 3x = 9 ➔ x = 3. Titiknya (3, 0).' },
        { story: 'Berapakah nilai kemiringan (gradien m) dari grafik fungsi linear f(x) = -4x + 7?', options: ['m = -4', 'm = 7', 'm = 4', 'm = -7'], correct: 'm = -4', explanation: 'Pada rumus baku f(x) = ax + b, koefisien di depan x adalah gradien: m = a = -4.' },
        { story: 'Grafik fungsi f(x) = 5x - 10 memotong sumbu Y di titik koordinat...', options: ['(0, -10)', '(-10, 0)', '(0, 5)', '(2, 0)'], correct: '(0, -10)', explanation: 'Substitusi x = 0 menghasilkan f(0) = -10, jadi titik potong sumbu Y adalah (0, -10).' },
        { story: 'Jika nilai gradien m dari f(x) bernilai positif (m > 0), bagaimanakah arah garisnya?', options: ['Condong naik ke kanan', 'Condong turun ke kanan', 'Mendatar sejajar sumbu X', 'Tegak sejajar sumbu Y'], correct: 'Condong naik ke kanan', explanation: 'Gradien positif (m > 0) menandakan semakin besar x, semakin besar y (garis naik ke kanan).' },
        { story: 'Grafik fungsi linear f(x) = 4x - 12 memotong sumbu X pada titik koordinat...', options: ['(3, 0)', '(0, -12)', '(-3, 0)', '(12, 0)'], correct: '(3, 0)', explanation: '4x - 12 = 0 ➔ 4x = 12 ➔ x = 3. Jadi titik potong sumbu X adalah (3, 0).' },
        { story: 'Sebuah fungsi tarif parkir f(x) = 2000x + 3000. Berapakah nilai konstanta b yang merupakan titik potong sumbu Y?', options: ['3000', '2000', '5000', '1000'], correct: '3000', explanation: 'Konstanta b = 3000 merupakan titik temu garis saat waktu x = 0.' },

        // C4: Analisis garis, kemiringan & dua titik
        { story: 'Suatu grafik fungsi linear melalui titik (0, 4) dan (2, 10). Tentukan nilai gradien m garis tersebut!', options: ['m = 3', 'm = 2', 'm = 4', 'm = 5'], correct: 'm = 3', explanation: 'm = (y₂ - y₁) / (x₂ - x₁) = (10 - 4) / (2 - 0) = 6 / 2 = 3.' },
        { story: 'Dua grafik fungsi linear f(x) = 3x + 2 dan g(x) = 3x - 5 memiliki gradien yang SAMA (m = 3). Kedua garis ini saling...', options: ['Sejajar', 'Tegak lurus', 'Berhimpit', 'Berpotongan di satu titik'], correct: 'Sejajar', explanation: 'Dua garis dengan gradien sama dan konstanta berbeda akan selalu sejajar dan tidak pernah berpotongan.' },
        { story: 'Grafik fungsi linear f(x) = -2x + 8. Di kuadran manakah grafik ini memotong sumbu koordinat positif?', options: ['Memotong sumbu X positif di (4, 0) dan sumbu Y positif di (0, 8)', 'Memotong sumbu X negatif di (-4, 0)', 'Memotong sumbu Y negatif di (0, -8)', 'Tidak memotong sumbu manapun'], correct: 'Memotong sumbu X positif di (4, 0) dan sumbu Y positif di (0, 8)', explanation: 'x = 0 ➔ y = 8 (positif); y = 0 ➔ -2x + 8 = 0 ➔ x = 4 (positif).' },
        { story: 'Grafik fungsi f(x) = ax + 5 melalui titik (2, 11). Berapakah nilai koefisien a (gradien)-nya?', options: ['a = 3', 'a = 2', 'a = 4', 'a = 6'], correct: 'a = 3', explanation: 'f(2) = 2a + 5 = 11 ➔ 2a = 6 ➔ a = 3.' },
        { story: 'Sebuah tangki air mengalami kebocoran dengan volume sisa f(x) = -5x + 50 liter setelah x menit. Kapan air tangki habis (volume 0)?', options: ['Menit ke-10', 'Menit ke-5', 'Menit ke-50', 'Menit ke-15'], correct: 'Menit ke-10', explanation: 'Volume 0 saat f(x) = 0: -5x + 50 = 0 ➔ 5x = 50 ➔ x = 10 menit.' },
        { story: 'Grafik fungsi f(x) = 6 - 2x memiliki garis yang...', options: ['Condong turun ke kanan karena m = -2', 'Condong naik ke kanan karena b = 6', 'Mendatar horizontal', 'Tegak vertikal'], correct: 'Condong turun ke kanan karena m = -2', explanation: 'Nilai koefisien di depan x bernilai negatif (a = -2), sehingga garis condong turun ke arah kanan.' },
        { story: 'Suatu grafik fungsi linear memotong sumbu X di (5, 0) dan sumbu Y di (0, -10). Rumus fungsinya adalah...', options: ['f(x) = 2x - 10', 'f(x) = -2x - 10', 'f(x) = 5x - 10', 'f(x) = 10x - 5'], correct: 'f(x) = 2x - 10', explanation: 'Gradien m = (0 - (-10)) / (5 - 0) = 10/5 = 2. Konstanta b = -10. Rumus: f(x) = 2x - 10.' },

        // C5: Evaluasi kritis & perpotongan dua garis
        { story: 'Evaluasi: Manakah pernyataan yang PALING TEPAT mengenai grafik f(x) = -x + 4?', options: ['Memotong sumbu X di (4, 0) dan sumbu Y di (0, 4)', 'Memotong sumbu X di (-4, 0) dan sumbu Y di (0, -4)', 'Gradiennya bernilai 4', 'Tidak memiliki titik potong dengan sumbu koordinat'], correct: 'Memotong sumbu X di (4, 0) dan sumbu Y di (0, 4)', explanation: 'x=0 ➔ y=4; y=0 ➔ -x+4=0 ➔ x=4. Kedua titik potong berada di (4, 0) dan (0, 4).' },
        { story: 'Diberikan dua fungsi: f(x) = 2x + 1 dan g(x) = -x + 4. Pada nilai x berapakah kedua grafik saling berpotongan?', options: ['x = 1', 'x = 2', 'x = 3', 'x = 0'], correct: 'x = 1', explanation: 'Titik potong terjadi saat f(x) = g(x): 2x + 1 = -x + 4 ➔ 3x = 3 ➔ x = 1.' },
        { story: 'Evaluasi: Jika sebuah grafik fungsi linear memotong sumbu Y di titik (0, 0), maka bentuk rumus fungsinya adalah...', options: ['f(x) = ax (tanpa konstanta b)', 'f(x) = b', 'f(x) = ax + 1', 'f(x) = 0'], correct: 'f(x) = ax (tanpa konstanta b)', explanation: 'Karena memotong pusat (0,0), nilai konstanta b = 0 sehingga rumusnya menjadi f(x) = ax.' },
        { story: 'Garis f(x) = 3x - 6 dan sumbu koordinat membentuk segitiga siku-siku. Berapakah luas daerah segitiga tersebut?', options: ['Luas = 6 satuan luas', 'Luas = 12 satuan luas', 'Luas = 3 satuan luas', 'Luas = 18 satuan luas'], correct: 'Luas = 6 satuan luas', explanation: 'Alas segitiga = titik potong X di x = 2; Tinggi = titik potong Y di |y| = 6. Luas = 1/2 × 2 × 6 = 6 satuan luas.' },
        { story: 'Evaluasi: Dua fungsi f(x) = 2x + 1 dan g(x) = 2x - 7 memiliki grafik yang...', options: ['Sejajar karena gradien sama (m = 2)', 'Berpotongan di satu titik', 'Berhimpit menjadi satu garis', 'Tidak bisa ditentukan tanpa menggambar'], correct: 'Sejajar karena gradien sama (m = 2)', explanation: 'Kedua fungsi memiliki gradien m = 2 yang sama tetapi konstanta berbeda (1 ≠ -7), sehingga grafik keduanya sejajar.' },
        { story: 'Evaluasi Tantangan Akhir: Manakah di bawah ini yang BUKAN merupakan fungsi linear?', options: ['f(x) = 2x² + 3 (derajat 2)', 'f(x) = 4x - 5', 'f(x) = -3x', 'f(x) = 1/2 x + 8'], correct: 'f(x) = 2x² + 3 (derajat 2)', explanation: 'Fungsi linear wajib memiliki variabel x berpangkat satu. f(x) = 2x² + 3 adalah fungsi kuadrat (berpangkat 2).' }
      ];

      const item = graphCases[(stageNum - 1) % graphCases.length];
      return {
        stage: stageNum,
        bloomLevel: stageNum <= 7 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5',
        isStoryCase: true,
        conceptDef: 'Grafik fungsi linear f(x) = ax + b selalu berupa garis lurus. Sumbu X adalah daerah asal dan sumbu Y adalah nilai hasil. Koefisien a adalah gradien (kemiringan) dan b adalah titik potong sumbu Y.',
        story: item.story,
        formulaOptions: item.options,
        correctFormula: item.correct,
        correctAns: item.correct,
        explanation: item.explanation
      };
    })
  },

  // ── BAB 5: KORESPONDENSI SATU-SATU ──
  5: {
    id: 5,
    key: 'subbab5',
    title: 'Korespondensi Satu-Satu',
    caseTitle: 'Satu Kunci Satu Gembok',
    iconName: 'Link2',
    image: '/images/5.png',
    briefing: 'Korespondensi satu-satu adalah fungsi khusus paling disiplin: setiap anggota A berpasangan dengan TEPAT SATU anggota B, dan sebaliknya (timbal balik). Syarat mutlaknya: n(A) harus sama dengan n(B)!',
    rules: [
      'Jumlah anggota kedua himpunan WAJIB persis sama: n(A) = n(B).',
      'Setiap anggota A dan B berpasangan unik 1-lawan-1 tanpa ada yang kosong atau bercabang.',
      'Banyaknya kemungkinan korespondensi dihitung dengan n faktorial: n! = n × (n−1) × ... × 1.'
    ],
    goal: 'Memastikan syarat mutlak n(A) = n(B), menghitung banyak korespondensi, dan mengklasifikasikan hubungan 1-ke-1.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Apakah KESIMPULAN UTAMA dari syarat KORESPONDENSI SATU-SATU (BIJEKSI)?',
          options: [
            'Jumlah n(A) harus sama dengan n(B), di mana setiap anggota A dipasangkan tepat 1:1 timbal balik dengan anggota B tanpa ada sisa di kedua himpunan.',
            'Korespondensi satu-satu membolehkan ada anggota B yang kosong asalkan di A terpasang semua.',
            'Korespondensi satu-satu berlaku meskipun n(A) berbeda dengan n(B).'
          ],
          correctAnswer: 'Jumlah n(A) harus sama dengan n(B), di mana setiap anggota A dipasangkan tepat 1:1 timbal balik dengan anggota B tanpa ada sisa di kedua himpunan.',
          hint: '💡 Petunjuk: Syarat Mutlak Korespondensi 1:1 yaitu n(A) = n(B), berpasangan tepat satu bolak-balik tanpa ada cabang maupun elemen kosong.'
        };
      }

      const isStory = stageNum % 2 === 1;
      const bloomLevel = stageNum <= 7 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5';

      // Pool 20 skenario berbeda untuk korespondensi satu-satu
      const korPool = [
        // C3 (Stage 1-7)
        { setA: ['Andi', 'Budi', 'Cici'], setB: ['Kursi 1', 'Kursi 2', 'Kursi 3'], quiz: { question: 'Berapa banyak cara korespondensi satu-satu?', options: ['6 (3!)', '9 (3²)', '3'], answer: '6 (3!)' } },
        { setA: ['Kunci A', 'Kunci B', 'Kunci C'], setB: ['Gembok 1', 'Gembok 2', 'Gembok 3'], quiz: { question: 'Apakah ini korespondensi satu-satu?', options: ['Ya, jika setiap kunci membuka tepat satu gembok berbeda', 'Tidak, karena ada 3 gembok', 'Selalu ya'], answer: 'Ya, jika setiap kunci membuka tepat satu gembok berbeda' } },
        { setA: ['Merah', 'Biru', 'Hijau', 'Kuning'], setB: ['Kode 1', 'Kode 2', 'Kode 3', 'Kode 4'], quiz: { question: 'Berapa banyak cara korespondensi satu-satu?', options: ['24 (4!)', '16 (4²)', '8'], answer: '24 (4!)' } },
        { setA: ['Pemain 1', 'Pemain 2', 'Pemain 3'], setB: ['No. 7', 'No. 9', 'No. 10'], quiz: { question: 'Apakah satu nomor punggung boleh dipakai dua pemain?', options: ['Tidak boleh, karena harus satu lawan satu', 'Boleh', 'Tergantung pelatih'], answer: 'Tidak boleh, karena harus satu lawan satu' } },
        { setA: ['X', 'Y', 'Z'], setB: ['P', 'Q', 'R'], quiz: { question: 'Syarat korespondensi satu-satu adalah...', options: ['n(A) = n(B) dan setiap anggota tepat satu pasangan', 'n(A) > n(B)', 'Semua anggota mengarah ke satu titik'], answer: 'n(A) = n(B) dan setiap anggota tepat satu pasangan' } },
        { setA: ['Ayah', 'Ibu', 'Anak'], setB: ['Piring A', 'Piring B', 'Piring C'], quiz: { question: 'Jika setiap orang menggunakan tepat satu piring berbeda, ini disebut...', options: ['Korespondensi satu-satu', 'Relasi biasa', 'Fungsi konstan'], answer: 'Korespondensi satu-satu' } },
        { setA: [1, 2, 3, 4, 5], setB: ['A', 'B', 'C', 'D', 'E'], quiz: { question: 'Berapa banyak cara korespondensi satu-satu?', options: ['120 (5!)', '25 (5²)', '10'], answer: '120 (5!)' } },
        // C4 (Stage 8-14)
        { setA: ['Jakarta', 'Tokyo', 'London'], setB: ['Indonesia', 'Jepang', 'Inggris'], quiz: { question: 'Mengapa ibukota → negara membentuk korespondensi satu-satu?', options: ['Karena setiap ibukota milik tepat satu negara dan sebaliknya', 'Karena ada 3 negara', 'Karena semua di Asia'], answer: 'Karena setiap ibukota milik tepat satu negara dan sebaliknya' } },
        { setA: ['SIM', 'KTP', 'Paspor'], setB: ['Polisi', 'Dukcapil', 'Imigrasi'], quiz: { question: 'Apakah relasi dokumen→lembaga ini korespondensi satu-satu?', options: ['Ya, setiap dokumen dikeluarkan tepat oleh satu lembaga berbeda', 'Tidak, ada lembaga yang kosong', 'Tidak bisa ditentukan'], answer: 'Ya, setiap dokumen dikeluarkan tepat oleh satu lembaga berbeda' } },
        { setA: ['Pensil', 'Penghapus', 'Penggaris', 'Rautan'], setB: ['Kotak 1', 'Kotak 2', 'Kotak 3', 'Kotak 4'], quiz: { question: 'Jika satu kotak hanya untuk satu alat tulis, berapa kemungkinan susunan?', options: ['24 (4!)', '16 (4²)', '4'], answer: '24 (4!)' } },
        { setA: ['Doni', 'Eka', 'Fani', 'Gita'], setB: ['Loker A', 'Loker B', 'Loker C', 'Loker D'], quiz: { question: 'Apa yang terjadi jika n(A) ≠ n(B)?', options: ['Korespondensi satu-satu tidak mungkin terjadi', 'Tetap bisa korespondensi satu-satu', 'Tergantung siapa yang duluan'], answer: 'Korespondensi satu-satu tidak mungkin terjadi' } },
        { setA: ['Gol 1', 'Gol 2', 'Gol 3'], setB: ['Menit 10', 'Menit 25', 'Menit 70'], quiz: { question: 'Jika setiap gol terjadi di menit berbeda, ini korespondensi satu-satu?', options: ['Ya, setiap gol tepat satu menit dan sebaliknya', 'Tidak, gol bisa di menit sama', 'Belum tentu'], answer: 'Ya, setiap gol tepat satu menit dan sebaliknya' } },
        { setA: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'], setB: ['MTK', 'IPA', 'IPS', 'B.Ind', 'Seni'], quiz: { question: 'Berapa kemungkinan jadwal korespondensi satu-satu?', options: ['120 (5!)', '25 (5²)', '10'], answer: '120 (5!)' } },
        { setA: [2, 4, 6, 8], setB: [1, 3, 5, 7], quiz: { question: 'Apakah f: A→B dengan aturan f(x)=x−1 membentuk korespondensi satu-satu?', options: ['Ya, karena setiap anggota A punya tepat satu bayangan berbeda di B', 'Tidak, karena bilangan genap dan ganjil berbeda', 'Tidak bisa ditentukan'], answer: 'Ya, karena setiap anggota A punya tepat satu bayangan berbeda di B' } },
        // C5 (Stage 15-20)
        { setA: ['Pilot A', 'Pilot B', 'Pilot C', 'Pilot D', 'Pilot E', 'Pilot F'], setB: ['Pesawat 1', 'Pesawat 2', 'Pesawat 3', 'Pesawat 4', 'Pesawat 5', 'Pesawat 6'], quiz: { question: 'Berapa banyak cara penugasan pilot ke pesawat?', options: ['720 (6!)', '36 (6²)', '6'], answer: '720 (6!)' } },
        { setA: ['Hari 1', 'Hari 2', 'Hari 3'], setB: ['Tugas A', 'Tugas B', 'Tugas C'], quiz: { question: 'Jika 3 tugas dibagi ke 3 hari (masing-masing satu), berapakah 3!?', options: ['6', '9', '3'], answer: '6' } },
        { setA: ['Ruang 1', 'Ruang 2', 'Ruang 3', 'Ruang 4'], setB: ['Guru A', 'Guru B', 'Guru C', 'Guru D'], quiz: { question: 'Evaluasi: Jika satu guru pindah ke ruang guru lain, apakah masih korespondensi satu-satu?', options: ['Tidak, karena akan ada ruang dengan dua guru atau tanpa guru', 'Ya, tetap korespondensi', 'Tergantung gurunya'], answer: 'Tidak, karena akan ada ruang dengan dua guru atau tanpa guru' } },
        { setA: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'], setB: ['Pos 1', 'Pos 2', 'Pos 3', 'Pos 4', 'Pos 5'], quiz: { question: 'Berapa nilai 5! dibagi 3!?', options: ['20', '60', '2'], answer: '20' } },
        { setA: ['Bola 1', 'Bola 2', 'Bola 3', 'Bola 4'], setB: ['Kotak A', 'Kotak B', 'Kotak C', 'Kotak D'], quiz: { question: 'Evaluasi: Manakah yang BUKAN korespondensi satu-satu?', options: ['Dua bola masuk ke kotak yang sama', 'Setiap bola masuk ke kotak berbeda', 'Empat bola ke empat kotak unik'], answer: 'Dua bola masuk ke kotak yang sama' } },
        { setA: ['Mobil A', 'Mobil B', 'Mobil C'], setB: ['Parkir 1', 'Parkir 2', 'Parkir 3'], quiz: { question: 'Evaluasi: Jika n(A)=3 dan n(B)=4, bisakah korespondensi satu-satu?', options: ['Tidak bisa, karena n(A) ≠ n(B)', 'Bisa, ada satu tempat parkir kosong', 'Tergantung jenis mobil'], answer: 'Tidak bisa, karena n(A) ≠ n(B)' } }
      ];

      const korItem = korPool[(stageNum - 1) % korPool.length];
      return {
        stage: stageNum,
        bloomLevel,
        isStoryCase: isStory,
        conceptDef: 'Korespondensi satu-satu terjadi jika dan hanya jika n(A) = n(B), setiap anggota A dipasangkan tepat satu ke B, dan setiap anggota B dipasangkan tepat satu ke A. Banyaknya pemetaan = n! = n × (n−1) × ... × 1.',
        setA: korItem.setA,
        setB: korItem.setB,
        witnesses: korItem.setA,
        seats: korItem.setB,
        quiz: korItem.quiz
      };
    })
  }
};

/**
 * Math Symbol Explanations per Subbab/Bab (1 to 5) provided by Kak Relo
 */
export const SUBBAB_SYMBOL_EXPLANATIONS = {
  1: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• A → B dibaca 'Himpunan A dihubungkan ke Himpunan B'.\n• (x, y) dibaca 'pasangan berurutan' di mana anggota x dihubungkan ke anggota y.\n• 4 Cara Menyatakan: Diagram Panah, Pasangan Berurutan, Tabel, dan Diagram Kartesius.",
  2: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• f: A → B dibaca 'Fungsi f memetakan Himpunan A tepat satu ke B'.\n• Syarat Fungsi: Setiap anggota asal WAJIB punya TEPAT 1 pasangan di kawan.\n• Domain = Daerah Asal (A), Kodomain = Daerah Kawan (B), Range = Daerah Hasil (bagian B yang terkena panah).",
  3: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• f(x) dibaca 'f dari x' artinya nilai bayangan (hasil) dari x.\n• f(x) = ax + b: ganti huruf x dengan angka, kalikan a, lalu tambah b.",
  4: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• f(x) = ax + b menghasilkan grafik berupa garis lurus pada bidang Kartesius.\n• Titik Potong Sumbu Y = (0, b) dan Titik Potong Sumbu X saat f(x) = 0.\n• Gradien (m) = nilai kemiringan garis (m = a).",
  5: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• n(A) = n(B) artinya 'jumlah anggota Himpunan A sama banyak dengan Himpunan B'.\n• n! (n faktorial) = n × (n−1) × ... × 1 (banyak cara korespondensi satu-satu).\n• Pasangan tepat 1:1 timbal balik tanpa sisa di kedua himpunan."
};
