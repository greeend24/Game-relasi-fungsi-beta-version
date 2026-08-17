// PBL Subbab Briefings and Stage Level Data for 7 Subbabs (21 Stages each)
// Enforcing 50% Real-World Detective Story Cases + 50% Math/Logic Challenges
// Enforcing Progressive Bloom's Taxonomy Difficulty Levels: C3 (Applying) ➔ C4 (Analyzing) ➔ C5 (Evaluating)!

export const SUBBABS_DATA = {
  1: {
    id: 1,
    key: 'subbab1',
    title: 'Pengertian Relasi',
    caseTitle: 'Berkas yang Tercampur',
    iconName: 'GitFork',
    image: '/images/1.png',
    briefing: 'Kantor detektif menerima dua tumpukan berkas: daftar nama saksi dan daftar ciri-ciri kejadian. Tugas pemain: mencari tahu apakah dua tumpukan itu bisa "dihubungkan" atau tidak — dan menandai hubungan mana yang masuk akal.',
    rules: [
      'Ada dua kolom: Kolom A (kotak bukti) dan Kolom B (kotak petunjuk).',
      'Klik satu item di Kolom A, lalu klik satu item di Kolom B untuk menghubungkannya dengan benang merah.',
      'Sistem akan menilai apakah hubungan tersebut valid berdasarkan aturan relasi yang ditampilkan di layar.'
    ],
    goal: 'Menyambungkan semua pasangan yang valid berdasarkan aturan relasi sebelum waktu habis.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Berdasarkan 20 stage penyelidikan berjenjang (C3 - C5), apakah KESIMPULAN UTAMA dari konsep "RELASI"?',
          options: [
            'Relasi adalah hubungan antara anggota Himpunan A (Domain) ke Himpunan B (Kodomain) di mana setiap elemen A boleh dipasangkan dengan 0, 1, atau lebih dari 1 elemen B.',
            'Relasi adalah aturan wajib di mana setiap elemen A harus punya tepat 1 pasangan di B.',
            'Relasi hanya berlaku jika jumlah n(A) sama dengan n(B).'
          ],
          correctAnswer: 'Relasi adalah hubungan antara anggota Himpunan A (Domain) ke Himpunan B (Kodomain) di mana setiap elemen A boleh dipasangkan dengan 0, 1, atau lebih dari 1 elemen B.',
          hint: '💡 Petunjuk Detektif: Berbeda dengan Fungsi, Relasi TIDAK membatasi jumlah panah. Suatu anggota A boleh tidak punya pasangan, atau punya banyak pasangan di B.'
        };
      }

      const stagePool = [
        // STAGES 1-7: C3 (APPLYING / MENGAPLIKASIKAN)
        { stage: 1, bloomLevel: 'C3', isStoryCase: true, rule: 'Hubungkan Saksi di A dengan "Menu Pesanan Favorit"-nya di B', conceptDef: 'Relasi memetakan setiap anggota Himpunan Asal A (Domain) ke Himpunan Kawan B (Kodomain) sesuai aturan pasangan berurutan (x, y). Suatu anggota A boleh memiliki 0, 1, atau lebih dari 1 pasangan di B.', story: 'Berdasarkan bon Restoran TKP: Budi memesan Nasi Goreng; Siti memesan Soto; Rudi memesan Bakso. Hubungkan saksi ke pesanannya!', setA: ['Budi', 'Siti', 'Rudi'], setB: ['Nasi Goreng', 'Soto', 'Bakso'], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 2, bloomLevel: 'C3', isStoryCase: false, rule: 'Hubungkan angka di A yang "Kurang dari" angka di B', conceptDef: 'Relasi kurang dari (a < b) memetakan elemen a ∈ A ke elemen b ∈ B jika nilai kuantitas a lebih kecil secara matematis daripada b.', story: 'Detektif mencatat angka bukti A [1, 2, 3] dan B [2, 4]. Hubungkan elemen A yang nilainya lebih kecil dari elemen B!', setA: [1, 2, 3], setB: [2, 4], validPairs: [[0, 0], [0, 1], [1, 1], [2, 1]] },
        { stage: 3, bloomLevel: 'C3', isStoryCase: true, rule: 'Hubungkan Plat Kendaraan di A dengan "Kota Asal Registrasi"-nya di B', conceptDef: 'Relasi memetakan elemen Himpunan A ke elemen Himpunan B berdasarkan aturan pengelompokan huruf registrasi wilayah.', story: 'Tim lalu lintas melacak plat kendaraan tersangka: B-1234 (Jakarta), D-5678 (Bandung), L-9012 (Surabaya). Hubungkan mobil dengan kota asalnya!', setA: ['B-1234 (Sedan)', 'D-5678 (Minibus)', 'L-9012 (Pickup)'], setB: ['Jakarta', 'Bandung', 'Surabaya'], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 4, bloomLevel: 'C3', isStoryCase: false, rule: 'Hubungkan angka di A yang merupakan "Faktor dari" angka di B', conceptDef: 'Aturan relasi "faktor dari" memetakan a ke b jika b habis dibagi a tanpa sisa (b mod a = 0).', story: 'Detektif memverifikasi pembagian kode A [2, 3, 5] dengan B [4, 6, 9]. Hubungkan a ke b jika b habis dibagi a!', setA: [2, 3, 5], setB: [4, 6, 9], validPairs: [[0, 0], [0, 1], [1, 1], [1, 2]] },
        { stage: 5, bloomLevel: 'C3', isStoryCase: true, rule: 'Hubungkan Detektif di A dengan "Peralatan Forensic Khusus"-nya di B', conceptDef: 'Relasi memasangkan setiap individu pada himpunan asal dengan objek fungsionalnya pada himpunan kawan.', story: 'Di markas: Detektif Roy membawa Kaca Pembesar; Detektif Ana membawa Lensa UV; Detektif Maya membawa Pemindai Sidik Jari. Hubungkan detektif ke peralatannya!', setA: ['Detektif Roy', 'Detektif Ana', 'Detektif Maya'], setB: ['Kaca Pembesar', 'Lensa UV', 'Pemindai Sidik Jari'], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 6, bloomLevel: 'C3', isStoryCase: false, rule: 'Hubungkan angka di A yang "Dua lebihnya dari" angka di B', conceptDef: 'Persamaan relasi aljabar a = b + 2 menyatakan bahwa selisih nilai antarelemen terhubung adalah persis 2 satuan (a - b = 2).', story: 'Detektif menghitung selisih angka A [4, 5, 6] dengan B [2, 3, 4]. Hubungkan a ke b jika a persis 2 lebih besar dari b!', setA: [4, 5, 6], setB: [2, 3, 4], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 7, bloomLevel: 'C3', isStoryCase: false, rule: 'Hubungkan angka di A yang "Kelipatan dari" angka di B', conceptDef: 'Suatu bilangan a adalah kelipatan dari b jika terdapat bilangan bulat k sehingga a = k × b.', story: 'Tim forensic menguji bilangan A [6, 8, 10, 12] terhadap B [2, 4]. Hubungkan a ke b jika a adalah kelipatan dari b!', setA: [6, 8, 10, 12], setB: [2, 4], validPairs: [[0, 0], [1, 0], [1, 1], [2, 0], [3, 0], [3, 1]] },

        // STAGES 8-14: C4 (ANALYZING / MENGANALISIS)
        { stage: 8, bloomLevel: 'C4', isStoryCase: true, rule: 'Analisis Alibi TKP: Hubungkan Saksi di A yang "Hadir di Jam TKP Sama" dengan Lokasi B', conceptDef: 'Relasi memetakan elemen berdasarkan kesamaan interval nilai variabel waktu pada himpunan domain dan kodomain.', story: 'Analisis CCTV: Saksi Anton dan Budi berada di Restoran Jam 19.00; Saksi Candra di Bank Jam 20.00. Hubungkan saksi ke lokasi berdasarkan jam alibi!', setA: ['Anton (19.00)', 'Budi (19.00)', 'Candra (20.00)'], setB: ['Restoran TKP', 'Bank TKP'], validPairs: [[0, 0], [1, 0], [2, 1]] },
        { stage: 9, bloomLevel: 'C4', isStoryCase: false, rule: 'Analisis Kuadrat Sempurna: Hubungkan a di A jika "a² = b" di B', conceptDef: 'Aturan pemetaan fungsi kuadrat a² = b menghubungkan setiap elemen a dengan hasil perkalian dirinya sendiri.', story: 'Tim pembongkar sandi menganalisis angka bukti A [2, 3, 4, 5] dan kode B [4, 9, 16, 25]. Hubungkan a ke b jika a² = b!', setA: [2, 3, 4, 5], setB: [4, 9, 16, 25], validPairs: [[0, 0], [1, 1], [2, 2], [3, 3]] },
        { stage: 10, bloomLevel: 'C4', isStoryCase: true, rule: 'Analisis Log Peretasan: Hubungkan Komputer TKP di A yang "Mengakses Server B"', conceptDef: 'Relasi jaringan memetakan satu titik asal ke beberapa titik tujuan tanpa batasan jumlah cabang.', story: 'Tim cyber crime menganalisis log IP: PC-A1 mengakses Server Keuangan & Server Email; PC-A2 mengakses Server Backup. Hubungkan PC ke server tujuannya!', setA: ['PC-A1', 'PC-A2'], setB: ['Server Keuangan', 'Server Email', 'Server Backup'], validPairs: [[0, 0], [0, 1], [1, 2]] },
        { stage: 11, bloomLevel: 'C4', isStoryCase: false, rule: 'Analisis Persamaan Komposit: Hubungkan a di A dan b di B jika "a + b = 10"', conceptDef: 'Persamaan linear dua variabel a + b = 10 memetakan setiap elemen a ke elemen b sehingga hasilnya konstan 10.', story: 'Detektif mencocokkan pasangan kunci kombinasi A [2, 3, 4, 7] dan B [3, 6, 7, 8]. Hubungkan a ke b jika a + b = 10!', setA: [2, 3, 4, 7], setB: [3, 6, 7, 8], validPairs: [[0, 3], [1, 2], [2, 1], [3, 0]] },
        { stage: 12, bloomLevel: 'C4', isStoryCase: true, rule: 'Analisis Transaksi Mencurigakan: Hubungkan Rekening Pengirim A yang "Transfer > Rp 10 Juta" ke Penerima B', conceptDef: 'Relasi kriteria ambang batas memetakan elemen yang memenuhi pertidaksamaan nilai kuantitatif > 10 Juta.', story: 'Audit forensic bank: Rekening X kirim 15 Juta ke Rek A; Rek Y kirim 5 Juta ke Rek B; Rek Z kirim 20 Juta ke Rek C. Hubungkan pengirim yang transfernya > 10 Juta!', setA: ['Rek X (15 Juta)', 'Rek Y (5 Juta)', 'Rek Z (20 Juta)'], setB: ['Penerima A', 'Penerima B', 'Penerima C'], validPairs: [[0, 0], [2, 2]] },
        { stage: 13, bloomLevel: 'C4', isStoryCase: false, rule: 'Analisis Akar Pangkat: Hubungkan a di A jika "a = √b" di B', conceptDef: 'Relasi akar kuadrat a = √b memetakan nilai utama non-negatif dari b.', story: 'Detektif matematika menguji variabel A [3, 4, 5] terhadap B [9, 16, 25, 36]. Hubungkan a ke b jika a adalah akar kuadrat dari b!', setA: [3, 4, 5], setB: [9, 16, 25, 36], validPairs: [[0, 0], [1, 1], [2, 2]] },
        { stage: 14, bloomLevel: 'C4', isStoryCase: true, rule: 'Analisis Sinyal Tower HP: Hubungkan No HP Saksi di A yang "Terjangkau Tower BTS B (< 3km)"', conceptDef: 'Relasi spasial memetakan titik koordinat asal ke lokasi dalam jangkauan radius tertentu.', story: 'Laporan BTS: HP Saksi 1 terjangkau Tower A (< 2km); HP Saksi 2 terjangkau Tower A dan Tower B (< 2.5km). Hubungkan HP saksi ke tower BTS terdekat!', setA: ['HP Saksi 1', 'HP Saksi 2'], setB: ['Tower BTS A', 'Tower BTS B'], validPairs: [[0, 0], [1, 0], [1, 1]] },

        // STAGES 15-20: C5 (EVALUATING / MENGEVALUASI)
        { stage: 15, bloomLevel: 'C5', isStoryCase: false, rule: 'Evaluasi Perkalian Multivariabel: Hubungkan a di A dan b di B jika "a × b ≥ 12"', conceptDef: 'Pertidaksamaan perkalian a × b ≥ 12 memetakan pasangan berurutan yang memenuhi ambang batas batas nilai hasil kali minimal 12.', story: 'Ujian evaluasi forensic: Diberikan Himpunan A [2, 3, 4] dan B [3, 4, 5]. Hubungkan pasangan yang hasil kalinya minimal 12!', setA: [2, 3, 4], setB: [3, 4, 5], validPairs: [[1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]] },
        { stage: 16, bloomLevel: 'C5', isStoryCase: true, rule: 'Evaluasi Jaringan Kontak Telepon: Hubungkan Nomor A yang "Menghubungi Nomor B minimal 2 kali"', conceptDef: 'Relasi frekuensi memetakan elemen domain yang memenuhi syarat batas frekuensi interaksi minimal n kali.', story: 'Log panggilan: No A telepon No X (3 kali) & No Y (1 kali); No B telepon No Y (4 kali). Hubungkan penelpon yang menghubungi tujuan minimal 2 kali!', setA: ['No A (Tersangka 1)', 'No B (Tersangka 2)'], setB: ['No X (Saksi)', 'No Y (Saksi)'], validPairs: [[0, 0], [1, 1]] },
        { stage: 17, bloomLevel: 'C5', isStoryCase: false, rule: 'Evaluasi Kongruensi Modulo: Hubungkan a di A dan b di B jika "a ≡ b (mod 3)"', conceptDef: 'Relasi kongruensi aritmetika modulo a ≡ b (mod 3) berlaku jika selisih (a - b) habis dibagi 3 tanpa sisa.', story: 'Detektif membongkar kripto modulo: Himpunan A [4, 7, 9] dan B [1, 3, 4, 6]. Hubungkan a ke b jika memiliki sisa pembagian 3 yang persis sama!', setA: [4, 7, 9], setB: [1, 3, 4, 6], validPairs: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 1], [2, 3]] },
        { stage: 18, bloomLevel: 'C5', isStoryCase: true, rule: 'Evaluasi Alibi Lintas Kota: Hubungkan Saksi A yang "Bisa Bepergian dari Kota A ke B dalam waktu < 2 Jam"', conceptDef: 'Evaluasi kelayakan relasi fisik berdasarkan rasio jarak tempuh terhadap kecepatan waktu perjalanan.', story: 'Evaluasi alibi: Saksi A klaim dari Jakarta ke Bogor (1 jam - Valid); Saksi B klaim dari Jakarta ke Surabaya (1 jam - Tidak Valid!). Hubungkan alibi yang masuk akal!', setA: ['Saksi A (Jakarta-Bogor)', 'Saksi B (Jakarta-Surabaya)'], setB: ['Alibi Valid (< 2 Jam)', 'Alibi Tidak Valid (> 2 Jam)'], validPairs: [[0, 0], [1, 1]] },
        { stage: 19, bloomLevel: 'C5', isStoryCase: false, rule: 'Evaluasi Persamaan Diophantine: Hubungkan a di A dan b di B jika "a + 2b = 10"', conceptDef: 'Persamaan Diophantine aljabar a + 2b = 10 menentukan pasangan bilangan bulat penyelesaian.', story: 'Detektif mengevaluasi kunci sandi A [2, 4, 6, 8] dan B [1, 2, 3, 4]. Hubungkan a ke b jika a + 2b = 10!', setA: [2, 4, 6, 8], setB: [1, 2, 3, 4], validPairs: [[0, 3], [1, 2], [2, 1], [3, 0]] },
        { stage: 20, bloomLevel: 'C5', isStoryCase: true, rule: 'Evaluasi Misi Terakhir: Hubungkan Kasus Utama A dengan "Hasil Keputusan Sidang B"', conceptDef: 'Evaluasi kebenaran logika memetakan hipotesis ke nilai kebenaran validitas hukum.', story: 'Sidang Agung: Kasus 1 (Bukti Kuat) -> Terbukti Valid; Kasus 2 (Bukti Kurang) -> Ditolak. Hubungkan kasus ke keputusan sidang!', setA: ['Kasus 1 (Bukti Kuat)', 'Kasus 2 (Bukti Kurang)'], setB: ['Putusan Valid', 'Putusan Ditolak'], validPairs: [[0, 0], [1, 1]] }
      ];

      return stagePool[stageNum - 1];
    })
  },

  2: {
    id: 2,
    key: 'subbab2',
    title: 'Cara Menyatakan Relasi',
    caseTitle: 'Empat Cara Melapor',
    iconName: 'Kanban',
    image: '/images/2.png',
    briefing: 'Setiap detektif punya gaya melapor berbeda: ada yang pakai sketsa panah, grafik titik kartesius, himpunan pasangan berurutan, dan tabel rapi. Markas pusat meminta semua laporan diseragamkan formatnya.',
    rules: [
      'Pemain diberi satu bentuk laporan (misalnya tabel), lalu diminta memilih/menyusun bentuk lain yang menyatakan informasi SAMA PERSIS.',
      'Ada 4 mode tampilan: Diagram Panah, Diagram Kartesius, Himpunan Pasangan Berurutan, dan Tabel.'
    ],
    goal: 'Mengubah laporan ke format yang diminta tanpa mengubah isi atau maknanya.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Berdasarkan penyelidikan 20 stage berjenjang (C3-C5), apakah KESIMPULAN UTAMA dari 4 cara menyatakan relasi?',
          options: [
            'Relasi dapat dinyatakan dengan Diagram Panah, Diagram Kartesius, Himpunan Pasangan Berurutan, dan Tabel — semuanya menyampaikan himpunan pasangan (x, y) yang sama tanpa mengubah arti.',
            'Diagram Kartesius adalah satu-satunya cara yang sah untuk menyatakan fungsi.',
            'Setiap cara menyatakan relasi menghasilkan nilai pasangan x dan y yang berbeda-beda.'
          ],
          correctAnswer: 'Relasi dapat dinyatakan dengan Diagram Panah, Diagram Kartesius, Himpunan Pasangan Berurutan, dan Tabel — semuanya menyampaikan himpunan pasangan (x, y) yang sama tanpa mengubah arti.',
          hint: '💡 Petunjuk Detektif: Keempat bentuk hanyalah variasi penyajian visual. Nilai elemen asal x dan elemen kawan y wajib identik di semua format.'
        };
      }

      const isStory = stageNum % 2 === 1;
      const bloomLevel = stageNum <= 7 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5';
      const pairsList = isStory ? [
        [{x: 'Saksi A', y: 'Ruang 1'}, {x: 'Saksi B', y: 'Ruang 2'}, {x: 'Saksi C', y: 'Ruang 3'}],
        [{x: 'Detektif 1', y: 'Mobil A'}, {x: 'Detektif 2', y: 'Mobil B'}, {x: 'Detektif 3', y: 'Mobil C'}],
        [{x: 'Tersangka X', y: 'Pos A'}, {x: 'Tersangka Y', y: 'Pos B'}, {x: 'Tersangka Z', y: 'Pos C'}]
      ] : [
        [{x: 1, y: 2}, {x: 2, y: 4}, {x: 3, y: 6}],
        [{x: 2, y: 3}, {x: 3, y: 5}, {x: 4, y: 7}],
        [{x: 1, y: 1}, {x: 2, y: 4}, {x: 3, y: 9}]
      ];

      return {
        stage: stageNum,
        bloomLevel,
        isStoryCase: isStory,
        conceptDef: 'Empat bentuk representasi relasi (Diagram Panah, Diagram Kartesius, Himpunan Pasangan Berurutan R = {(x, y)}, dan Tabel) memasangkan elemen asal x (Domain) dan elemen kawan y (Kodomain) secara seragam tanpa mengubah nilai informasi asli.',
        givenType: ['Tabel', 'Diagram Panah', 'Himpunan Pasangan Berurutan', 'Diagram Kartesius'][(stageNum - 1) % 4],
        targetType: ['Diagram Panah', 'Himpunan Pasangan Berurutan', 'Diagram Kartesius', 'Tabel'][stageNum % 4],
        pairs: pairsList[(stageNum - 1) % pairsList.length]
      };
    })
  },

  3: {
    id: 3,
    key: 'subbab3',
    title: 'Pengertian Fungsi',
    caseTitle: 'Mesin Sidik Jari Rusak',
    iconName: 'CheckCheck',
    image: '/images/3.png',
    briefing: 'Ada mesin pemindai sidik jari di markas yang katanya bisa mengenali identitas seseorang secara otomatis. Pemain harus menemukan mesin mana yang valid sebagai FUNGSI.',
    rules: [
      'Disodorkan beberapa mesin (masing-masing berupa pemetaan relasi).',
      'Klik mesin yang VALID FUNGSI (Setiap item di A memiliki TEPAT SATU pasangan di B).'
    ],
    goal: 'Mengidentifikasi seluruh mesin/relasi yang valid sebagai fungsi tanpa salah pilih.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Apakah KESIMPULAN UTAMA dari syarat suatu relasi dikatakan sebagai FUNGSI (PEMETAAN)?',
          options: [
            'Fungsi adalah relasi khusus di mana SETIAP anggota Himpunan A dipasangkan dengan TEPAT SATU anggota Himpunan B.',
            'Fungsi adalah relasi di mana anggota B tidak boleh menerima lebih dari satu panah.',
            'Fungsi adalah relasi di mana anggota A tidak boleh dipasangkan sama sekali.'
          ],
          correctAnswer: 'Fungsi adalah relasi khusus di mana SETIAP anggota Himpunan A dipasangkan dengan TEPAT SATU anggota Himpunan B.',
          hint: '💡 Petunjuk Detektif: Dua kata kunci FUNGSI: (1) Semua elemen Domain A HARUS terpasang habis, (2) Elemen A TIDAK BOLEH bercabang.'
        };
      }

      const isStory = stageNum % 2 === 1;
      const bloomLevel = stageNum <= 7 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5';

      return {
        stage: stageNum,
        bloomLevel,
        isStoryCase: isStory,
        conceptDef: 'Fungsi (Pemetaan) dari Himpunan A ke Himpunan B mensyaratkan setiap elemen x ∈ A dipasangkan dengan tepat satu elemen y ∈ B (tidak boleh kosong dan tidak boleh bercabang).',
        machines: isStory ? [
          { id: 1, pairs: [['Saksi Budi', 'KTP-101'], ['Saksi Siti', 'KTP-102'], ['Saksi Rudi', 'KTP-103']], isFunction: true, reason: 'Semua saksi terdeteksi tepat ke 1 KTP resmi' },
          { id: 2, pairs: [['Saksi Budi', 'KTP-101'], ['Saksi Budi', 'KTP-999'], ['Saksi Siti', 'KTP-102']], isFunction: false, reason: 'Saksi Budi terdeteksi punya 2 KTP ganda!' },
          { id: 3, pairs: [['Saksi Budi', 'KTP-101'], ['Saksi Siti', 'KTP-102']], isFunction: false, reason: 'Saksi Rudi tidak terdeteksi KTP sama sekali!' },
          { id: 4, pairs: [['Saksi Budi', 'Polres A'], ['Saksi Siti', 'Polres A'], ['Saksi Rudi', 'Polres A']], isFunction: true, reason: 'Semua saksi melapor di Polres A yang sama' }
        ] : [
          { id: 1, pairs: [[1, 'A'], [2, 'B'], [3, 'C']], isFunction: true, reason: 'Semua input A terpasang ke tepat 1 output B' },
          { id: 2, pairs: [[1, 'A'], [1, 'B'], [2, 'C']], isFunction: false, reason: 'Input 1 bercabang ke 2 output berbeda (A dan B)!' },
          { id: 3, pairs: [[1, 'A'], [2, 'B']], isFunction: false, reason: 'Input 3 tidak memiliki pasangan output!' },
          { id: 4, pairs: [[1, 'B'], [2, 'B'], [3, 'B']], isFunction: true, reason: 'Semua input A terpasang ke 1 output (walau output B sama)' }
        ]
      };
    })
  },

  4: {
    id: 4,
    key: 'subbab4',
    title: 'Unsur Fungsi (Domain, Kodomain, Range)',
    caseTitle: 'Inventaris Gudang Bukti',
    iconName: 'Layers',
    image: '/images/4.png',
    briefing: 'Gudang bukti markas punya daftar barang yang masuk (Domain), daftar seluruh rak yang tersedia (Kodomain), dan daftar rak yang benar-benar terisi barang (Range).',
    rules: [
      'Tarik warna label ke area yang sesuai: DOMAIN (Daerah Asal), KODOMAIN (Daerah Kawan), dan RANGE (Daerah Hasil).'
    ],
    goal: 'Menandai ketiga unsur fungsi dengan benar pada skema yang diberikan.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Apakah KESIMPULAN UTAMA mengenai perbedaan Domain, Kodomain, dan Range?',
          options: [
            'Domain = Seluruh Himpunan Asal A; Kodomain = Seluruh Himpunan Tujuan B; Range = Sub-himpunan B yang benar-benar terpilih oleh panah dari A.',
            'Domain = Seluruh Himpunan B; Kodomain = Himpunan A; Range = Elemen A yang belum terpakai.',
            'Domain, Kodomain, dan Range selalu bernilai sama pada setiap fungsi.'
          ],
          correctAnswer: 'Domain = Seluruh Himpunan Asal A; Kodomain = Seluruh Himpunan Tujuan B; Range = Sub-himpunan B yang benar-benar terpilih oleh panah dari A.',
          hint: '💡 Petunjuk Detektif: Domain = daerah asal (A). Kodomain = seluruh daerah kawan (B). Range = daerah hasil (bagian dari B yang terisi).'
        };
      }

      const isStory = stageNum % 2 === 1;
      const bloomLevel = stageNum <= 7 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5';

      return {
        stage: stageNum,
        bloomLevel,
        isStoryCase: isStory,
        conceptDef: 'Unsur-unsur fungsi terdiri dari: Domain D_f (himpunan asal A), Kodomain K_f (seluruh himpunan kawan B), dan Range R_f (sub-himpunan B yang benar-benar dipasangkan dari A).',
        setA: isStory ? ['Bukti 1 (Dompet)', 'Bukti 2 (Kunci)', 'Bukti 3 (HP)', 'Bukti 4 (Dokumen)'] : [1, 2, 3, 4],
        setB: isStory ? ['Rak A', 'Rak B', 'Rak C', 'Rak D', 'Rak E'] : ['Rak A', 'Rak B', 'Rak C', 'Rak D', 'Rak E'],
        mappedPairs: isStory 
          ? [['Bukti 1 (Dompet)', 'Rak A'], ['Bukti 2 (Kunci)', 'Rak C'], ['Bukti 3 (HP)', 'Rak C'], ['Bukti 4 (Dokumen)', 'Rak E']]
          : [[1, 'Rak A'], [2, 'Rak C'], [3, 'Rak C'], [4, 'Rak E']],
        correctDomain: isStory ? ['Bukti 1 (Dompet)', 'Bukti 2 (Kunci)', 'Bukti 3 (HP)', 'Bukti 4 (Dokumen)'] : [1, 2, 3, 4],
        correctKodomain: ['Rak A', 'Rak B', 'Rak C', 'Rak D', 'Rak E'],
        correctRange: ['Rak A', 'Rak C', 'Rak E'],
        quiz: isStory ? [
          { question: 'Manakah himpunan barang bukti yang masuk (Domain)?', options: ['{Bukti 1 (Dompet), Bukti 2 (Kunci), Bukti 3 (HP), Bukti 4 (Dokumen)}', '{Rak A, Rak B, Rak C}', '{Rak A, Rak C, Rak E}'], answer: '{Bukti 1 (Dompet), Bukti 2 (Kunci), Bukti 3 (HP), Bukti 4 (Dokumen)}' },
          { question: 'Manakah rak gudang yang benar-benar terisi barang (Range)?', options: ['{Rak A, Rak C, Rak E}', '{Rak A, Rak B, Rak C, Rak D, Rak E}', '{Bukti 1, Bukti 2}'], answer: '{Rak A, Rak C, Rak E}' },
          { question: 'Apakah Rak B dan Rak D termasuk Kodomain?', options: ['Ya, Kodomain adalah seluruh rak gudang yang tersedia', 'Tidak, karena belum terisi', 'Tergantung barang bukti'], answer: 'Ya, Kodomain adalah seluruh rak gudang yang tersedia' }
        ] : [
          { question: 'Manakah daerah asal (Domain)?', options: ['{1, 2, 3, 4}', '{Rak A, Rak B, Rak C}', '{Rak A, Rak C, Rak E}'], answer: '{1, 2, 3, 4}' },
          { question: 'Manakah daerah hasil (Range)?', options: ['{Rak A, Rak C, Rak E}', '{Rak A, Rak B, Rak C, Rak D, Rak E}', '{1, 2, 3, 4}'], answer: '{Rak A, Rak C, Rak E}' },
          { question: 'Apakah Rak B dan Rak D termasuk Kodomain?', options: ['Ya, Kodomain adalah seluruh himpunan tujuan B', 'Tidak, karena Rak B tidak terisi', 'Tergantung nilai domain'], answer: 'Ya, Kodomain adalah seluruh himpunan tujuan B' }
        ]
      };
    })
  },

  5: {
    id: 5,
    key: 'subbab5',
    title: 'Notasi & Rumus Fungsi',
    caseTitle: 'Kode Rahasia Sang Tersangka',
    iconName: 'Binary',
    image: '/images/5.png',
    briefing: 'Tersangka meninggalkan catatan berisi pola angka. Menerjemahkan pola menjadi notasi resmi f(x) = ax + b dan hitung nilai kuncinya.',
    rules: [
      'Pilih notasi f(x) yang tepat dan hitung nilai substitusi f(x).'
    ],
    goal: 'Menyusun notasi yang tepat dan menjawab hasil perhitungan f(x) dengan benar.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Apakah KESIMPULAN UTAMA dari cara menentukan nilai fungsi f(x)?',
          options: [
            'Nilai fungsi f(x) diperoleh dengan mengganti (men-substitusi) variabel input x pada rumus notasi f(x) dengan angka yang ditentukan.',
            'Nilai fungsi f(x) selalu bernilai nol untuk setiap input x.',
            'Notasi f(x) hanya hiasan dan tidak mempengaruhi perhitungan angka.'
          ],
          correctAnswer: 'Nilai fungsi f(x) diperoleh dengan mengganti (men-substitusi) variabel input x pada rumus notasi f(x) dengan angka yang ditentukan.',
          hint: '💡 Petunjuk Detektif: Notasi f: x ➔ ax + b berarti f(x) = ax + b. Masukkan angka x ke posisi x pada rumus untuk menghitung hasilnya.'
        };
      }

      const isStory = stageNum % 2 === 1;
      const bloomLevel = stageNum <= 7 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5';

      const stories = [
        { isStoryCase: true, story: 'Ongkos Taksi Penyelidikan: Tarif buka pintu Rp 5.000, ditambah Rp 3.000 per km (x). Berapa total ongkos untuk perjalanan 4 km?', options: ['f(x) = 3000x + 5000', 'f(x) = 5000x + 3000', 'f(x) = 3000x - 5000'], correct: 'f(x) = 3000x + 5000', x: 4, ans: 17000 },
        { isStoryCase: false, story: 'Sebuah fungsi aljabar memetakan x ke 2x + 5. Hitunglah nilai fungsi f(3)!', options: ['f(x) = 2x + 5', 'f(x) = 5x + 2', 'f(x) = 2x - 5'], correct: 'f(x) = 2x + 5', x: 3, ans: 11 },
        { isStoryCase: true, story: 'Biaya Sewa Kamera Forensic: Biaya administrasi Rp 20.000, ditambah Rp 50.000 per hari (x). Berapa biaya sewa selama 3 hari?', options: ['f(x) = 50000x + 20000', 'f(x) = 20000x + 50000', 'f(x) = 50000x - 20000'], correct: 'f(x) = 50000x + 20000', x: 3, ans: 170000 },
        { isStoryCase: false, story: 'Diketahui rumus fungsi aljabar f(x) = 4x - 7. Berapakah nilai substitusi dari f(5)?', options: ['f(x) = 4x - 7', 'f(x) = 7x - 4', 'f(x) = 4x + 7'], correct: 'f(x) = 4x - 7', x: 5, ans: 13 },
        { isStoryCase: false, story: 'HOTS: Fungsi linier f(x) = ax + b memenuhi f(2) = 11 dan f(5) = 20. Tentukan rumus f(x) dan hitung nilai f(8)!', options: ['f(x) = 3x + 5', 'f(x) = 2x + 7', 'f(x) = 4x + 3'], correct: 'f(x) = 3x + 5', x: 8, ans: 29 },
        { isStoryCase: false, story: 'HOTS: Suatu fungsi f(x) = ax - 4 memiliki nilai f(3) = 11. Tentukan rumus f(x) lalu hitung nilai f(-2)!', options: ['f(x) = 5x - 4', 'f(x) = 3x - 4', 'f(x) = 4x - 4'], correct: 'f(x) = 5x - 4', x: -2, ans: -14 },
        { isStoryCase: true, story: 'HOTS Sewa Kendaraan: Biaya pokok Rp 5.000, biaya f(10) = Rp 45.000 dan f(20) = Rp 85.000 (dalam ribuan). Hitung f(30)!', options: ['f(x) = 4000x + 5000', 'f(x) = 3000x + 15000', 'f(x) = 5000x'], correct: 'f(x) = 4000x + 5000', x: 30, ans: 125000 },
        { isStoryCase: false, story: 'HOTS Non-Linier: Fungsi f(x) = 3x² - 2x + 1. Evaluasi dan hitunglah nilai f(-3)!', options: ['f(x) = 3x² - 2x + 1', 'f(x) = 2x² - 3x + 1', 'f(x) = 3x² + 2x - 1'], correct: 'f(x) = 3x² - 2x + 1', x: -3, ans: 34 },
        { isStoryCase: false, story: 'HOTS Persamaan: Diketahui rumus f(x) = 2x + 3. Jika nilai f(k) = 19, tentukan nilai variabel k!', options: ['f(x) = 2x + 3', 'f(x) = 3x + 2', 'f(x) = 2x - 3'], correct: 'f(x) = 2x + 3', x: 8, ans: 19 },
        { isStoryCase: false, story: 'Fungsi linier f(x) = 5 - 3x. Hitunglah nilai dari f(-4)!', options: ['f(x) = 5 - 3x', 'f(x) = 3x - 5', 'f(x) = -5 - 3x'], correct: 'f(x) = 5 - 3x', x: -4, ans: 17 },
        { isStoryCase: false, story: 'HOTS: Fungsi linier f(x) = ax + b memenuhi f(1) = 5 dan f(4) = 14. Tentukan rumus f(x) dan hitung nilai f(10)!', options: ['f(x) = 3x + 2', 'f(x) = 4x + 1', 'f(x) = 2x + 3'], correct: 'f(x) = 3x + 2', x: 10, ans: 32 },
        { isStoryCase: false, story: 'HOTS Kuadrat: Rumus fungsi f(x) = 2x² + 5. Evaluasi dan hitunglah nilai dari f(-4)!', options: ['f(x) = 2x² + 5', 'f(x) = 5x² + 2', 'f(x) = 2x² - 5'], correct: 'f(x) = 2x² + 5', x: -4, ans: 37 },
        { isStoryCase: false, story: 'HOTS: Diketahui f(x) = 6x - 11. Jika f(k) = 25, tentukanlah nilai k!', options: ['f(x) = 6x - 11', 'f(x) = 11x - 6', 'f(x) = 6x + 11'], correct: 'f(x) = 6x - 11', x: 6, ans: 25 },
        { isStoryCase: false, story: 'HOTS: Diketahui f(x) = ax - 9. Jika f(4) = 15, tentukan rumus f(x) lalu hitung f(7)!', options: ['f(x) = 6x - 9', 'f(x) = 4x - 9', 'f(x) = 5x - 9'], correct: 'f(x) = 6x - 9', x: 7, ans: 33 },
        { isStoryCase: false, story: 'Fungsi f(x) = 7 - 4x. Evaluasi dan hitunglah nilai f(-5)!', options: ['f(x) = 7 - 4x', 'f(x) = 4x - 7', 'f(x) = -7 - 4x'], correct: 'f(x) = 7 - 4x', x: -5, ans: 27 },
        { isStoryCase: false, story: 'HOTS: Fungsi linier f(x) = ax + b memenuhi f(3) = 13 dan f(7) = 29. Tentukan rumus f(x) lalu hitung f(6)!', options: ['f(x) = 4x + 1', 'f(x) = 3x + 4', 'f(x) = 5x - 2'], correct: 'f(x) = 4x + 1', x: 6, ans: 25 },
        { isStoryCase: false, story: 'HOTS Kuadrat: Diketahui f(x) = 4x² - 10. Evaluasi dan hitung nilai f(-3)!', options: ['f(x) = 4x² - 10', 'f(x) = 10x² - 4', 'f(x) = 4x² + 10'], correct: 'f(x) = 4x² - 10', x: -3, ans: 26 },
        { isStoryCase: false, story: 'HOTS: Diketahui f(x) = 3x + 8. Jika f(k) = 35, tentukan nilai k!', options: ['f(x) = 3x + 8', 'f(x) = 8x + 3', 'f(x) = 3x - 8'], correct: 'f(x) = 3x + 8', x: 9, ans: 35 },
        { isStoryCase: false, story: 'HOTS: Diketahui f(x) = ax + 7. Jika f(-2) = -3, tentukan rumus f(x) lalu hitung f(4)!', options: ['f(x) = 5x + 7', 'f(x) = 2x + 7', 'f(x) = 3x + 7'], correct: 'f(x) = 5x + 7', x: 4, ans: 27 },
        { isStoryCase: false, story: 'Rumus fungsi f(x) = 8x - 15. Hitunglah nilai dari f(6)!', options: ['f(x) = 8x - 15', 'f(x) = 15x - 8', 'f(x) = 8x + 15'], correct: 'f(x) = 8x - 15', x: 6, ans: 33 }
      ];

      const cur = stories[(stageNum - 1) % stories.length];
      return {
        stage: stageNum,
        bloomLevel: stageNum <= 4 ? 'C3' : stageNum <= 14 ? 'C4 (Analyzing)' : 'C5 (Evaluating)',
        isStoryCase: cur.isStoryCase,
        conceptDef: 'Notasi fungsi f: x ➔ ax + b dinyatakan dalam rumus aljabar f(x) = ax + b. Nilai fungsi f(k) diperoleh dengan menggantikan (substitusi) variabel x dengan nilai k.',
        story: cur.story,
        formulaOptions: cur.options,
        correctFormula: cur.correct,
        xVal: cur.x,
        correctAns: cur.ans
      };
    })
  },

  6: {
    id: 6,
    key: 'subbab6',
    title: 'Korespondensi Satu-Satu',
    caseTitle: 'Alibi dan Kursi Saksi',
    iconName: 'Repeat',
    image: '/images/6.png',
    briefing: 'Di ruang sidang, setiap saksi harus duduk di kursi yang berbeda-beda — n(A) harus sama dengan n(B).',
    rules: [
      'Hubungkan tiap Saksi (Kolom A) ke TEPAT SATU Kursi (Kolom B).'
    ],
    goal: 'Menata seluruh saksi dan kursi sampai kondisi "pas satu-satu" tercapai tanpa sisa.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Apakah KESIMPULAN UTAMA dari syarat KORESPONDENSI SATU-SATU (BIJEKSI)?',
          options: [
            'Jumlah n(A) harus sama dengan n(B), di mana setiap anggota A dipasangkan dengan tepat 1 anggota B, dan tidak ada sisa di kedua himpunan.',
            'Korespondensi satu-satu membolehkan ada anggota B yang kosong.',
            'Korespondensi satu-satu berlaku meskipun n(A) berbeda dengan n(B).'
          ],
          correctAnswer: 'Jumlah n(A) harus sama dengan n(B), di mana setiap anggota A dipasangkan dengan tepat 1 anggota B, dan tidak ada sisa di kedua himpunan.',
          hint: '💡 Petunjuk Detektif: Syarat Mutlak Korespondensi 1:1 yaitu n(A) = n(B), dan setiap elemen terhubung pas 1-ke-1 tanpa sisa.'
        };
      }

      const isStory = stageNum % 2 === 1;
      const bloomLevel = stageNum <= 7 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5';
      const count = Math.min(3 + Math.floor((stageNum - 1) / 4), 6);

      const setA = isStory 
        ? Array.from({ length: count }, (_, j) => `Saksi ${String.fromCharCode(65 + j)}`)
        : Array.from({ length: count }, (_, j) => `Elemen A-${j + 1}`);

      const setB = isStory 
        ? Array.from({ length: count }, (_, j) => `Kursi Sidang ${j + 1}`)
        : Array.from({ length: count }, (_, j) => `Elemen B-${j + 1}`);

      return {
        stage: stageNum,
        bloomLevel,
        isStoryCase: isStory,
        conceptDef: 'Korespondensi Satu-Satu (Bijeksi) terjadi jika n(A) = n(B), di mana setiap elemen A dipasangkan dengan tepat 1 elemen B, dan setiap elemen B dipasangkan tepat 1 ke A tanpa sisa.',
        setA,
        setB,
        witnesses: setA,
        seats: setB
      };
    })
  },

  7: {
    id: 7,
    key: 'subbab7',
    title: 'Jenis-Jenis Fungsi',
    caseTitle: 'Ujian Akhir Calon Detektif (Boss Stage)',
    iconName: 'ShieldAlert',
    image: '/images/7.png',
    briefing: 'Ini ujian kelulusan detektif data. Klasifikasikan diagram fungsi ke Injektif, Surjektif, Bijektif, atau Bukan Ketiganya.',
    rules: [
      'Analisis diagram panah dan pilih jenis fungsi yang tepat.'
    ],
    goal: 'Mengklasifikasikan seluruh diagram fungsi dengan benar.',
    stages: Array.from({ length: 21 }, (_, i) => {
      const stageNum = i + 1;
      if (stageNum === 21) {
        return {
          stage: 21,
          isConclusionStage: true,
          bloomLevel: 'C5/C6 (Evaluasi & Sintesis)',
          question: 'Apakah KESIMPULAN UTAMA dari perbedaan fungsi INJEKTIF, SURJEKTIF, dan BIJEKTIF?',
          options: [
            'Injektif = tidak ada B yang kena panah >1x (boleh ada B kosong); Surjektif = seluruh B terisi panah (Range=Kodomain); Bijektif = gabungan Injektif + Surjektif (pas 1:1 sempurna).',
            'Ketiga jenis fungsi memiliki definisi dan sifat pemetaan yang persis sama.',
            'Fungsi Bijektif tidak memerlukan syarat Injektif maupun Surjektif.'
          ],
          correctAnswer: 'Injektif = tidak ada B yang kena panah >1x (boleh ada B kosong); Surjektif = seluruh B terisi panah (Range=Kodomain); Bijektif = gabungan Injektif + Surjektif (pas 1:1 sempurna).',
          hint: '💡 Petunjuk Detektif: Injektif = max 1 panah per B; Surjektif = min 1 panah per B; Bijektif = tepat 1 panah per B.'
        };
      }

      const isStory = stageNum % 2 === 1;
      const bloomLevel = stageNum <= 7 ? 'C3' : stageNum <= 14 ? 'C4' : 'C5';

      const typesList = isStory ? [
        { type: 'Injektif', setA: ['Saksi 1', 'Saksi 2'], setB: ['Kamar A', 'Kamar B', 'Kamar C'], mappedPairs: [['Saksi 1', 'Kamar A'], ['Saksi 2', 'Kamar B']], description: 'Kasus Alibi Hotel: Saksi 1 di Kamar A, Saksi 2 di Kamar B. Tidak ada kamar yang diisi 2 orang, Kamar C kosong. Ini adalah FUNGSI INJEKTIF.', answer: 'Injektif' },
        { type: 'Surjektif', setA: ['Detektif A', 'Detektif B', 'Detektif C'], setB: ['Pos 1', 'Pos 2'], mappedPairs: [['Detektif A', 'Pos 1'], ['Detektif B', 'Pos 1'], ['Detektif C', 'Pos 2']], description: 'Kasus Patroli TKP: 3 Detektif mengisi Pos 1 dan Pos 2. Semua pos penjagaan terisi (Range = Kodomain). Ini adalah FUNGSI SURJEKTIF.', answer: 'Surjektif' },
        { type: 'Bijektif', setA: ['Tersangka A', 'Tersangka B', 'Tersangka C'], setB: ['Sel 1', 'Sel 2', 'Sel 3'], mappedPairs: [['Tersangka A', 'Sel 1'], ['Tersangka B', 'Sel 2'], ['Tersangka C', 'Sel 3']], description: 'Kasus Penahanan Tahanan: 3 Tersangka menempati 3 Sel khusus secara pas 1-ke-1 tanpa sisa. Ini adalah FUNGSI BIJEKTIF.', answer: 'Bijektif' }
      ] : [
        { type: 'Injektif', setA: [1, 2], setB: ['X', 'Y', 'Z'], mappedPairs: [[1, 'X'], [2, 'Y']], description: 'Domain A = {1, 2}, Kodomain B = {X, Y, Z}. Pasangan: (1,X), (2,Y). Tidak ada elemen B yang menerima lebih dari 1 panah. (INJEKTIF)', answer: 'Injektif' },
        { type: 'Surjektif', setA: [1, 2, 3], setB: ['X', 'Y'], mappedPairs: [[1, 'X'], [2, 'X'], [3, 'Y']], description: 'Domain A = {1, 2, 3}, Kodomain B = {X, Y}. Pasangan: (1,X), (2,X), (3,Y). Seluruh B terisi panah (SURJEKTIF)', answer: 'Surjektif' },
        { type: 'Bijektif', setA: [1, 2, 3], setB: ['X', 'Y', 'Z'], mappedPairs: [[1, 'X'], [2, 'Y'], [3, 'Z']], description: 'Domain A = {1, 2, 3}, Kodomain B = {X, Y, Z}. Pasangan: (1,X), (2,Y), (3,Z). Pas 1:1 sempurna (BIJEKTIF)', answer: 'Bijektif' }
      ];

      const item = typesList[(stageNum - 1) % typesList.length];
      return {
        stage: stageNum,
        bloomLevel,
        isStoryCase: isStory,
        conceptDef: 'Klasifikasi Fungsi: Injektif (satu-satu: setiap elemen B dipanah maksimal 1 kali), Surjektif (pada: seluruh elemen B terisi panah / Range = Kodomain), dan Bijektif (gabungan Injektif + Surjektif / tepat 1-ke-1).',
        type: item.type,
        setA: item.setA,
        setB: item.setB,
        mappedPairs: item.mappedPairs,
        description: item.description,
        choices: ['Injektif', 'Surjektif', 'Bijektif', 'Bukan Ketiganya'],
        answer: item.answer
      };
    })
  }
};

/**
 * Math Symbol Explanations per Subbab provided by Detektif Relo
 */
export const SUBBAB_SYMBOL_EXPLANATIONS = {
  1: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• A → B dibaca 'Himpunan A dihubungkan ke Himpunan B'.\n• (x, y) dibaca 'pasangan berurutan' di mana elemen x dihubungkan ke y.",
  2: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• {(x, y)} dibaca 'Himpunan Pasangan Berurutan'.\n• Pada Diagram Kartesius: Sumbu X (Mendatar) = Domain, Sumbu Y (Tegak) = Kodomain.",
  3: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• f: A → B dibaca 'Fungsi f memetakan Himpunan A tepat satu ke B'.\n• Syarat Fungsi: Setiap anggota A (domain) WAJIB memiliki TEPAT 1 pasangan di B.",
  4: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• D_f = Domain (Daerah Asal/Input)\n• K_f = Kodomain (Daerah Kawan)\n• R_f = Range (Daerah Hasil/Output nyata)\n• ∈ dibaca 'elemen/anggota dari'.",
  5: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• f(x) dibaca 'f dari x' (artinya nilai output bayangan untuk input x).\n• f: x → ax + b menyatakan notasi pemetaan ke rumus aljabar linear (ax + b).",
  6: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• n(A) = n(B) dibaca 'jumlah anggota Himpunan A sama dengan Himpunan B'.\n• n! (Faktorial) = n × (n-1) × ... × 1 (banyaknya cara susunan korespondensi 1-1).",
  7: "🔣 SIMBOL MATEMATIKA DETEKTIF RELO:\n• Injektif (Satu-Satu): Tidak ada 2 input x yang punya output y sama.\n• Surjektif (Pada/Onto): Range R_f = Kodomain K_f.\n• Bijektif: Gabungan Injektif & Surjektif (Korespondensi 1-1)."
};

