/**
 * Quest Questions Generator Service : 5 Chapter Relasi & Fungsi SMP Kelas 8
 * Generates 30 curriculum-accurate, progressive Bloom (C3, C4, C5) questions
 * specifically tailored for Chapter 1 through Chapter 5.
 *
 * Types: MULTIPLE_CHOICE, ARROWS, MATCHING, TRUE_FALSE
 * Options are properly rotated/shuffled so correct answers are balanced (A, B, C, D).
 * Includes concrete mathematical visualisations for every question.
 */

function rotateOptions(opts, correct, targetIdx) {
  const curIdx = opts.indexOf(correct);
  if (curIdx === -1) return opts;
  const target = Math.abs(targetIdx) % opts.length;
  const newOpts = [...opts];
  newOpts.splice(curIdx, 1);
  newOpts.splice(target, 0, correct);
  return newOpts;
}

export function generateSubbabQuestions(chapterId) {
  const cid = Number(chapterId) || 1;
  const questions = [];
  let mcCount = 0;

  for (let i = 0; i < 30; i++) {
    const qNum = i + 1;
    const formatType = i % 5; // 0: MULTIPLE_CHOICE, 1: ARROWS, 2: CARTESIAN, 3: MATCHING, 4: TRUE_FALSE
    const level = i < 10 ? 'C3' : i < 20 ? 'C4' : 'C5';
    const pts = i < 10 ? 50 : i < 20 ? 80 : 120;

    // ─────────────────────────────────────────────────────────────
    // CHAPTER 1: Pengertian & Cara Menyatakan Relasi
    // ─────────────────────────────────────────────────────────────
    if (cid === 1) {
      if (formatType === 0) {
        const mcList = [
          {
            q: 'Pengertian dari relasi himpunan A ke himpunan B adalah...',
            opts: ['Aturan yang memasangkan anggota himpunan A ke himpunan B', 'Operasi hitung perkalian antara dua himpunan', 'Aturan yang mewajibkan semua elemen berpasangan tepat satu', 'Himpunan bagian dari bilangan cacah'],
            c: 'Aturan yang memasangkan anggota himpunan A ke himpunan B',
            visual: { type: 'arrow_diagram', setA: ['A1', 'A2'], setB: ['B1', 'B2'], pairs: [['A1', 'B1'], ['A2', 'B2']], labelA: 'Himpunan A', labelB: 'Himpunan B', statusBadge: 'Aturan Relasi' }
          },
          {
            q: 'Jika A={2, 3} dan B={4, 6} dengan aturan "faktor dari", pasangan berurutannya adalah...',
            opts: ['{(2, 4), (2, 6), (3, 6)}', '{(2, 4), (3, 6)}', '{(4, 2), (6, 3)}', '{(2, 6), (3, 4)}'],
            c: '{(2, 4), (2, 6), (3, 6)}',
            visual: { type: 'relation_table', title: 'Tabel Relasi Faktor Dari', rule: 'Faktor Dari', headers: ['Himpunan A', 'Himpunan B'], pairs: [['2', '4'], ['2', '6'], ['3', '6']] }
          },
          {
            q: 'Manakah di bawah ini yang BUKAN merupakan cara menyatakan relasi?',
            opts: ['Diagram Venn irisan', 'Diagram Panah', 'Himpunan Pasangan Berurutan', 'Diagram Cartesius'],
            c: 'Diagram Venn irisan',
            visual: { type: 'arrow_diagram', setA: ['1', '2'], setB: ['a', 'b'], pairs: [['1', 'a'], ['2', 'b']], labelA: 'Bentuk Relasi', labelB: 'Representasi' }
          },
          {
            q: 'Pada relasi R = {(1, a), (2, b), (1, c)}, apakah anggota himpunan asal boleh bercabang?',
            opts: ['Boleh, karena relasi tidak membatasi jumlah pasangan', 'Tidak boleh, harus tepat satu', 'Hanya boleh jika elemen berupa huruf', 'Hanya boleh jika jumlahnya genap'],
            c: 'Boleh, karena relasi tidak membatasi jumlah pasangan',
            visual: { type: 'ordered_pairs', title: 'Himpunan Pasangan Berurutan R', setName: 'R', pairs: [['1', 'a'], ['2', 'b'], ['1', 'c']] }
          },
          {
            q: 'Pasangan berurutan dari relasi "setengah dari" pada A={1, 2} ke B={2, 4, 6} adalah...',
            opts: ['{(1, 2), (2, 4)}', '{(2, 1), (4, 2)}', '{(1, 2), (2, 4), (3, 6)}', '{(1, 1), (2, 2)}'],
            c: '{(1, 2), (2, 4)}',
            visual: { type: 'relation_table', title: 'Tabel Relasi "Setengah Dari"', rule: 'Setengah Dari', headers: ['Domain x', 'Kodomain y'], pairs: [['1', '2'], ['2', '4']] }
          },
          {
            q: 'Jika A={3, 5} dan B={6, 10} dengan relasi "faktor dari", maka pasangan yang benar adalah...',
            opts: ['{(3, 6), (5, 10)}', '{(3, 10), (5, 6)}', '{(6, 3), (10, 5)}', '{(3, 5), (6, 10)}'],
            c: '{(3, 6), (5, 10)}',
            visual: { type: 'arrow_diagram', setA: ['3', '5'], setB: ['6', '10'], pairs: [['3', '6'], ['5', '10']], labelA: 'Himpunan A', labelB: 'Himpunan B', statusBadge: 'Aturan: Faktor Dari' }
          },
          {
            q: 'Relasi yang menyajikan data dalam bentuk titik-titik sumbu koordinat datar dan tegak disebut...',
            opts: ['Diagram Cartesius', 'Diagram Panah', 'Tabel Distribusi', 'Diagram Batang'],
            c: 'Diagram Cartesius',
            visual: { type: 'ordered_pairs', title: 'Titik Koordinat Relasi', setName: 'Titik (x, y)', pairs: [['1', '2'], ['2', '3']], domainName: 'Sumbu X (Mendatar)', rangeName: 'Sumbu Y (Tegak)' }
          },
          {
            q: 'Pada relasi "dua lebihnya dari", pasangan dari angka 5 ke himpunan tujuan adalah...',
            opts: ['3', '7', '10', '2'],
            c: '3',
            visual: { type: 'relation_table', title: 'Tabel Bukti Relasi', rule: 'Dua Lebihnya Dari', headers: ['Nilai x', 'Nilai y'], pairs: [['5', '3']] }
          }
        ];
        const cur = mcList[Math.floor(i / 5) % mcList.length];
        const rotated = rotateOptions(cur.opts, cur.c, mcCount++);
        questions.push({ id: qNum, level, pts, type: 'MULTIPLE_CHOICE', question: `${cur.q}`, options: rotated, correct: cur.c, visual: cur.visual });
      } else if (formatType === 1) {
        const offset = (Math.floor(i / 5) % 3) + 1;
        const setA = [offset, offset + 1];
        const setB = [offset * 2, (offset + 1) * 2];
        questions.push({
          id: qNum, level, pts, type: 'ARROWS',
          question: `Hubungkan anggota A ke B dengan aturan "setengah dari"!`,
          setA, setB, rule: 'half_of',
          correctPairs: setA.map((a, idx) => `${a}->${setB[idx]}`)
        });
      } else if (formatType === 2) {
        const cartesianList = [
          {
            q: 'Pasanglah titik-titik koordinat pada diagram Cartesius untuk relasi "setengah dari": (1, 2), (2, 4), dan (3, 6)!',
            minX: 0, maxX: 4, minY: 0, maxY: 7,
            targetPoints: [[1, 2], [2, 4], [3, 6]]
          },
          {
            q: 'Tandai titik koordinat relasi faktor dari A={2, 3} ke B={2, 4, 6}: (2, 2), (2, 4), dan (3, 6)!',
            minX: 0, maxX: 4, minY: 0, maxY: 7,
            targetPoints: [[2, 2], [2, 4], [3, 6]]
          },
          {
            q: 'Pasanglah titik koordinat relasi "dua lebihnya dari" untuk pasangan: (1, 3), (2, 4), dan (3, 5)!',
            minX: 0, maxX: 5, minY: 0, maxY: 6,
            targetPoints: [[1, 3], [2, 4], [3, 5]]
          },
          {
            q: 'Tandai titik koordinat relasi R = {(1, 1), (2, 3), (3, 5)} pada bidang Cartesius!',
            minX: 0, maxX: 4, minY: 0, maxY: 6,
            targetPoints: [[1, 1], [2, 3], [3, 5]]
          },
          {
            q: 'Pasanglah titik-titik koordinat pada relasi "kelipatan dari": (2, 4) dan (3, 6)!',
            minX: 0, maxX: 4, minY: 0, maxY: 7,
            targetPoints: [[2, 4], [3, 6]]
          },
          {
            q: 'Tandai titik koordinat relasi A={1, 2, 3} ke B={3, 4, 5} dengan aturan "ditambah 2": (1, 3), (2, 4), (3, 5)!',
            minX: 0, maxX: 4, minY: 0, maxY: 6,
            targetPoints: [[1, 3], [2, 4], [3, 5]]
          }
        ];
        const curC = cartesianList[Math.floor(i / 5) % cartesianList.length];
        questions.push({
          id: qNum, level, pts, type: 'CARTESIAN',
          question: `${curC.q}`,
          minX: curC.minX, maxX: curC.maxX, minY: curC.minY, maxY: curC.maxY,
          targetPoints: curC.targetPoints,
          hint: 'Klik pada titik persilangan garis untuk memasang atau melepas titik koordinat.'
        });
      } else if (formatType === 3) {
        const matchingList = [
          [
            { x: 'Diagram Panah', result: 'Lingkaran himpunan & garis panah' },
            { x: 'Pasangan Berurutan', result: '{(x, y), ...}' },
            { x: 'Diagram Cartesius', result: 'Titik koordinat sumbu X dan Y' }
          ],
          [
            { x: 'Relasi Kurang Dari', result: '2 dipasangkan ke 3' },
            { x: 'Relasi Faktor Dari', result: '2 dipasangkan ke 4' },
            { x: 'Relasi Dua Kalinya', result: '4 dipasangkan ke 2' }
          ],
          [
            { x: 'Sumbu Mendatar X', result: 'Daerah Asal (Elemen Pertama)' },
            { x: 'Sumbu Tegak Y', result: 'Daerah Kawan (Elemen Kedua)' },
            { x: 'Titik Koordinat (x, y)', result: 'Pasangan Relasi' }
          ]
        ];
        const curPairs = matchingList[Math.floor(i / 5) % matchingList.length];
        questions.push({
          id: qNum, level, pts, type: 'MATCHING',
          question: `Jodohkan cara menyatakan relasi dengan formatnya!`,
          pairs: curPairs
        });
      } else {
        const tfList = [
          { q: 'Dalam relasi, satu anggota himpunan asal boleh memiliki lebih dari satu pasangan.', a: 'Benar', visual: { type: 'relation_table', title: 'Tabel Relasi Bercabang', headers: ['Domain x', 'Kodomain y'], pairs: [['1', 'a'], ['1', 'b']] } },
          { q: 'Setiap relasi pasti merupakan fungsi.', a: 'Salah', visual: { type: 'ordered_pairs', title: 'Himpunan Pasangan R', setName: 'R', pairs: [['1', 'a'], ['1', 'b']], rule: 'Cabang (Bukan Fungsi)' } },
          { q: 'Anggota himpunan asal pada relasi boleh tidak memiliki pasangan sama sekali.', a: 'Benar', visual: { type: 'arrow_diagram', setA: ['1', '2'], setB: ['a'], pairs: [['1', 'a']], statusBadge: 'Boleh Kosong di Relasi' } },
          { q: 'Himpunan pasangan berurutan ditulis dengan format (kodomain, domain).', a: 'Salah' },
          { q: 'Diagram panah menggunakan tanda panah dari daerah asal ke daerah kawan.', a: 'Benar' },
          { q: 'Pada diagram Cartesius, himpunan asal selalu diletakkan pada sumbu mendatar X.', a: 'Benar' },
          { q: 'Relasi "kelipatan dari" memasangkan 6 ke 2 karena 6 kelipatan dari 2.', a: 'Benar' }
        ];
        const cur = tfList[Math.floor(i / 5) % tfList.length];
        questions.push({ id: qNum, level, pts, type: 'TRUE_FALSE', question: `${cur.q}`, options: ['Benar', 'Salah'], correct: cur.a, visual: cur.visual });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // CHAPTER 2: Pengertian & Unsur Fungsi
    // ─────────────────────────────────────────────────────────────
    else if (cid === 2) {
      if (formatType === 0) {
        const mcPool = [
          // C3 Level
          {
            q: 'Manakah syarat utama suatu relasi dikatakan sebagai FUNGSI dari himpunan A ke B?',
            opts: ['Setiap anggota A memiliki tepat satu pasangan di B', 'Ada anggota A yang boleh memilih lebih dari satu pasangan di B', 'Anggota A boleh tidak memiliki pasangan di B', 'Semua anggota B wajib memiliki pasangan'],
            c: 'Setiap anggota A memiliki tepat satu pasangan di B',
            visual: { type: 'arrow_diagram', setA: ['1', '2', '3'], setB: ['p', 'q', 'r'], pairs: [['1', 'p'], ['2', 'q'], ['3', 'r']], labelA: 'Domain', labelB: 'Kodomain', statusBadge: 'Syarat: Tepat 1 Pasangan', isFunction: true }
          },
          {
            q: 'Himpunan pasangan data alat tulis adalah f = {(1, "Pensil"), (2, "Penghapus"), (3, "Penggaris")}. Daerah asal (Domain) dari data tersebut adalah...',
            opts: ['{1, 2, 3}', '{"Pensil", "Penghapus", "Penggaris"}', '{1, 2}', '{"Pensil", "Penggaris"}'],
            c: '{1, 2, 3}',
            visual: { type: 'ordered_pairs', title: 'Data Alat Tulis', setName: 'f', pairs: [['1', 'Pensil'], ['2', 'Penghapus'], ['3', 'Penggaris']], domainName: 'Domain (Nomor)', rangeName: 'Alat Tulis' }
          },
          {
            q: 'Diketahui A={1, 2, 3} dan B={a, b, c}. Jika fungsi f = {(1, a), (2, b), (3, a)}, maka daerah hasil (Range) fungsi f adalah...',
            opts: ['{a, b}', '{a, b, c}', '{1, 2, 3}', '{a}'],
            c: '{a, b}',
            visual: { type: 'arrow_diagram', setA: ['1', '2', '3'], setB: ['a', 'b', 'c'], pairs: [['1', 'a'], ['2', 'b'], ['3', 'a']], labelA: 'Domain A', labelB: 'Kodomain B', highlightRange: ['a', 'b'], statusBadge: 'Range = {a, b}', isFunction: true }
          },
          // C4 Level
          {
            q: 'Guru memeriksa 4 tugas siswa. Manakah relasi berikut yang SAH sebagai FUNGSI?',
            opts: ['{(1, "A"), (2, "B"), (3, "C")}', '{(1, "A"), (1, "B"), (2, "C")}', '{(1, "A"), (2, "B"), (2, "C")}', '{(1, "A"), (1, "C"), (3, "B")}'],
            c: '{(1, "A"), (2, "B"), (3, "C")}',
            visual: { type: 'relation_table', title: 'Tabel Pemetaan Data', headers: ['Nilai (x)', 'Hasil (y)'], pairs: [['1', 'A'], ['2', 'B'], ['3', 'C']] }
          },
          {
            q: 'Mengapa relasi jadwal siswa R = {(Dani, "Lab"), (Dani, "Perpustakaan"), (Budi, "Kelas")} BUKAN merupakan fungsi?',
            opts: ['Karena Dani memiliki dua ruangan sekaligus (bercabang)', 'Karena Budi hanya memiliki satu ruangan', 'Karena jumlah pasangannya ada 3', 'Karena ruangan berupa tempat umum'],
            c: 'Karena Dani memiliki dua ruangan sekaligus (bercabang)',
            visual: { type: 'relation_table', title: 'Jadwal Siswa', headers: ['Siswa', 'Ruangan'], pairs: [['Dani', 'Lab'], ['Dani', 'Perpustakaan'], ['Budi', 'Kelas']] }
          },
          {
            q: 'Diberikan domain A = {2, 4, 6} dan kodomain B = {1, 2, 3, 4, 5}. Jika fungsi f memasangkan setiap x ke "setengah dari x", maka Range fungsinya adalah...',
            opts: ['{1, 2, 3}', '{2, 4, 6}', '{1, 2, 3, 4, 5}', '{2, 3, 4}'],
            c: '{1, 2, 3}',
            visual: { type: 'relation_table', title: 'Tabel Relasi "Setengah dari x"', rule: 'Setengah Dari', headers: ['Domain x', 'Range y'], pairs: [['2', '1'], ['4', '2'], ['6', '3']] }
          },
          // C5 Level
          {
            q: 'Simpulan logis tentang hubungan relasi dan fungsi yang PALING TEPAT adalah...',
            opts: ['Semua fungsi adalah relasi, namun tidak semua relasi adalah fungsi', 'Semua relasi otomatis merupakan fungsi', 'Fungsi dan relasi identik tanpa syarat khusus', 'Relasi selalu memiliki daerah hasil yang sama dengan kodomain'],
            c: 'Semua fungsi adalah relasi, namun tidak semua relasi adalah fungsi',
            visual: { type: 'arrow_diagram', setA: ['Domain'], setB: ['Kodomain'], pairs: [['Domain', 'Kodomain']], statusBadge: 'Fungsi ⊆ Relasi', isFunction: true }
          },
          {
            q: 'Pada penugasan 3 detektif {D1, D2, D3} ke ruang interogasi {R1, R2, R3}, manakah pembagian tugas yang VALID sebagai fungsi?',
            opts: ['D1 ke R1, D2 ke R2, D3 ke R1', 'D1 ke R1 dan R2, D2 ke R3, D3 tidak bertugas', 'D1 ke R2, D2 tidak dapat tugas, D3 ke R3', 'D1 tidak bertugas, D2 ke R1, D3 ke R2'],
            c: 'D1 ke R1, D2 ke R2, D3 ke R1',
            visual: { type: 'arrow_diagram', setA: ['D1', 'D2', 'D3'], setB: ['R1', 'R2', 'R3'], pairs: [['D1', 'R1'], ['D2', 'R2'], ['D3', 'R1']], labelA: 'Detektif', labelB: 'Ruang Interogasi', statusBadge: 'Fungsi Sah (Tiap Detektif 1 Tugas)', isFunction: true }
          }
        ];
        const cur = mcPool[Math.floor(i / 5) % mcPool.length];
        const rotated = rotateOptions(cur.opts, cur.c, mcCount++);
        questions.push({ id: qNum, level, pts, type: 'MULTIPLE_CHOICE', question: `${cur.q}`, options: rotated, correct: cur.c, visual: cur.visual });
      } else if (formatType === 1) {
        const arrowConfigs = [
          { setA: [1, 2, 3], setB: [2, 3, 4], rule: 'Hubungkan x ke f(x) = x + 1 (Saksi ke Nomor Ruang Interogasi)!', pairFn: a => `${a}->${a + 1}` },
          { setA: [1, 2, 3], setB: [4, 5, 6], rule: 'Hubungkan x ke f(x) = x + 3 (Nomor Berkas ke Rak Arsip)!', pairFn: a => `${a}->${a + 3}` },
          { setA: [1, 2, 3], setB: [2, 4, 6], rule: 'Hubungkan x ke f(x) = 2x (Kode Sinyal Detektor Forensik)!', pairFn: a => `${a}->${a * 2}` },
          { setA: [1, 2, 3], setB: [3, 5, 7], rule: 'Hubungkan x ke f(x) = 2x + 1 (Sandi Dekoder Rahasia Markas)!', pairFn: a => `${a}->${a * 2 + 1}` },
          { setA: [1, 2, 3], setB: [6, 7, 8], rule: 'Hubungkan x ke f(x) = x + 5 (Barang Bukti ke Loker Segel)!', pairFn: a => `${a}->${a + 5}` },
          { setA: [1, 2, 3], setB: [2, 5, 8], rule: 'Hubungkan x ke f(x) = 3x - 1 (Penyelidikan Jejak Langkah Tersangka)!', pairFn: a => `${a}->${a * 3 - 1}` },
          { setA: [1, 2, 3], setB: [4, 6, 8], rule: 'Hubungkan x ke f(x) = 2x + 2 (Sinkronisasi Waktu Kamera CCTV)!', pairFn: a => `${a}->${a * 2 + 2}` },
          { setA: [1, 2, 3], setB: [3, 6, 9], rule: 'Hubungkan x ke f(x) = 3x (Rotasi Penugasan Tim Patroli)!', pairFn: a => `${a}->${a * 3}` }
        ];
        const cfg = arrowConfigs[Math.floor(i / 5) % arrowConfigs.length];
        questions.push({
          id: qNum, level, pts, type: 'ARROWS',
          question: `${cfg.rule}`,
          setA: cfg.setA, setB: cfg.setB, rule: `ch2_rule_${i}`,
          correctPairs: cfg.setA.map(cfg.pairFn)
        });
      } else if (formatType === 2) {
        const cartesianList = [
          {
            q: 'Tandai titik-titik koordinat fungsi f(x) = x + 1 untuk domain x = 1, 2, dan 3!',
            minX: 0, maxX: 4, minY: 0, maxY: 5,
            targetPoints: [[1, 2], [2, 3], [3, 4]]
          },
          {
            q: 'Pasang titik koordinat untuk fungsi f(x) = 2x pada domain x = 1, 2, dan 3!',
            minX: 0, maxX: 4, minY: 0, maxY: 7,
            targetPoints: [[1, 2], [2, 4], [3, 6]]
          },
          {
            q: 'Pasang titik koordinat fungsi f(x) = 2x - 1 untuk x ∈ {1, 2, 3}!',
            minX: 0, maxX: 4, minY: 0, maxY: 6,
            targetPoints: [[1, 1], [2, 3], [3, 5]]
          },
          {
            q: 'Tandai titik koordinat fungsi konstan f(x) = 3 untuk domain x = 1, 2, dan 3!',
            minX: 0, maxX: 4, minY: 0, maxY: 5,
            targetPoints: [[1, 3], [2, 3], [3, 3]]
          },
          {
            q: 'Pasang titik koordinat untuk fungsi f(x) = x + 2 pada domain x = 0, 1, dan 2!',
            minX: 0, maxX: 4, minY: 0, maxY: 5,
            targetPoints: [[0, 2], [1, 3], [2, 4]]
          },
          {
            q: 'Tandai titik-titik fungsi f(x) = 3x - 2 untuk domain x = 1 dan x = 2!',
            minX: 0, maxX: 3, minY: 0, maxY: 5,
            targetPoints: [[1, 1], [2, 4]]
          }
        ];
        const curC = cartesianList[Math.floor(i / 5) % cartesianList.length];
        questions.push({
          id: qNum, level, pts, type: 'CARTESIAN',
          question: `${curC.q}`,
          minX: curC.minX, maxX: curC.maxX, minY: curC.minY, maxY: curC.maxY,
          targetPoints: curC.targetPoints,
          hint: 'Klik pada persilangan kotak untuk memasang atau melepas titik.'
        });
      } else if (formatType === 3) {
        const matchingConfigs = [
          {
            q: 'Jodohkan istilah komponen fungsi dengan definisinya yang tepat!',
            pairs: [
              { x: 'Domain', result: 'Daerah asal seluruh nilai x' },
              { x: 'Kodomain', result: 'Daerah kawan seluruh target' },
              { x: 'Range', result: 'Daerah hasil yang terpilih' }
            ]
          },
          {
            q: 'Jodohkan relasi di dunia nyata dengan status fungsinya!',
            pairs: [
              { x: 'Siswa ke Nomor Induk', result: 'Fungsi (1 anak punya 1 NIS)' },
              { x: 'Orang ke Makanan Favorit', result: 'Bukan Fungsi (Bisa suka banyak)' },
              { x: 'Warga ke Golongan Darah', result: 'Fungsi (1 orang 1 gol darah)' }
            ]
          },
          {
            q: 'Analisis himpunan pasangan berurutan berikut!',
            pairs: [
              { x: '{(1,a), (2,b), (3,c)}', result: 'Fungsi Sah' },
              { x: '{(1,a), (1,b), (2,c)}', result: 'Bukan Fungsi (1 mendua)' },
              { x: '{(1,a), (2,a), (3,a)}', result: 'Fungsi Sah (Target sama)' }
            ]
          },
          {
            q: 'Jodohkan himpunan pasangan berurutan dengan Daerah Hasil (Range)!',
            pairs: [
              { x: '{(1, 4), (2, 5), (3, 6)}', result: 'Range = {4, 5, 6}' },
              { x: '{(1, 4), (2, 4), (3, 4)}', result: 'Range = {4}' },
              { x: '{(1, 5), (2, 6), (3, 5)}', result: 'Range = {5, 6}' }
            ]
          },
          {
             q: 'Jodohkan peran setiap bagian rumus f(x) = y!',
            pairs: [
               { x: 'Huruf x', result: 'Nilai dari daerah asal' },
               { x: 'Semua kemungkinan y', result: 'Kodomain (daerah kawan)' },
               { x: 'Nilai f(x) yang terpilih', result: 'Range (daerah hasil)' }
            ]
          },
          {
             q: 'Periksa cara kerja penyimpanan bukti detektif berikut!',
            pairs: [
               { x: 'Saksi ada di 2 lokasi bersamaan', result: 'Alibi Gugur (Bukan Fungsi)' },
               { x: 'Tiap bukti disimpan di 1 loker', result: 'Cara Kerja Sah (Fungsi)' },
               { x: '1 loker berisi 2 berkas berbeda', result: 'Boleh Terjadi (Fungsi)' }
            ]
          },
          {
            q: 'Jodohkan himpunan pasangan dengan deskripsi domain dan range!',
            pairs: [
              { x: 'P = {(2, 9), (3, 9), (4, 9)}', result: 'Domain {2,3,4}, Range {9}' },
              { x: 'Q = {(2, 5), (3, 7), (4, 9)}', result: 'Domain {2,3,4}, Range {5,7,9}' },
              { x: 'R = {(2, 7), (3, 5), (4, 5)}', result: 'Domain {2,3,4}, Range {5,7}' }
            ]
          }
        ];
        const mCfg = matchingConfigs[Math.floor(i / 5) % matchingConfigs.length];
        questions.push({
          id: qNum, level, pts, type: 'MATCHING',
          question: `${mCfg.q}`,
          pairs: mCfg.pairs
        });
      } else {
        const tfPool = [
          { q: 'Fungsi adalah relasi di mana setiap anggota daerah asal (domain) memiliki tepat satu pasangan di daerah kawan.', a: 'Benar', visual: { type: 'arrow_diagram', setA: ['1', '2'], setB: ['a', 'b'], pairs: [['1', 'a'], ['2', 'b']], statusBadge: 'Definisi Fungsi: Tepat 1', isFunction: true } },
          { q: 'Pada fungsi, anggota daerah asal (domain) diperbolehkan tidak memiliki pasangan.', a: 'Salah', visual: { type: 'arrow_diagram', setA: ['1', '2 (Kosong)'], setB: ['a'], pairs: [['1', 'a']], statusBadge: 'Domain Kosong = Bukan Fungsi', isFunction: false } },
          { q: 'Jika ada satu anggota daerah asal yang memiliki dua pasangan (bercabang), maka relasi tersebut BUKAN fungsi.', a: 'Benar', visual: { type: 'ordered_pairs', title: 'Relasi Bercabang', setName: 'R', pairs: [['1', 'a'], ['1', 'b']], rule: 'x=1 bercabang (Bukan Fungsi)' } },
          { q: 'Range (daerah hasil) suatu fungsi selalu merupakan himpunan bagian dari Kodomain (daerah kawan).', a: 'Benar' },
          { q: 'Dua anggota domain yang berbeda boleh dipasangkan ke satu anggota kodomain yang sama dalam sebuah fungsi.', a: 'Benar', visual: { type: 'relation_table', title: 'Tabel Pemetaan Sasaran Sama', headers: ['Domain x', 'Kodomain y'], pairs: [['1', 'Target Sama'], ['2', 'Target Sama']] } },
          { q: 'Daerah kawan (Kodomain) wajib terpasang semuanya dan tidak boleh ada yang tersisa pada fungsi biasa.', a: 'Salah' },
          { q: 'Jika domain A memiliki 3 anggota dan kodomain B memiliki 2 anggota, kita tetap bisa membuat fungsi dari A ke B.', a: 'Benar' }
        ];
        const cur = tfPool[Math.floor(i / 5) % tfPool.length];
        questions.push({ id: qNum, level, pts, type: 'TRUE_FALSE', question: `${cur.q}`, options: ['Benar', 'Salah'], correct: cur.a, visual: cur.visual });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // CHAPTER 3: Notasi & Rumus Fungsi
    // ─────────────────────────────────────────────────────────────
    else if (cid === 3) {
      if (formatType === 0) {
        const mcPool = [
          // C3 Level
          {
            q: 'Sebuah rumus fungsi dinyatakan dengan f(x) = 3x + 2. Bayangan dari nilai x = 4 adalah...',
            opts: ['14', '12', '10', '16'],
            c: '14',
            visual: { type: 'function_machine', formula: 'f(x) = 3x + 2', inputVal: '4', processSteps: '3(4) + 2 = 12 + 2', outputVal: '14', machineName: 'Mesin Fungsi Kasus' }
          },
          {
            q: 'Mobil patroli detektif disewa dengan biaya dasar Rp15.000 ditambah Rp3.000 per km: f(x) = 3000x + 15000. Jika mobil menempuh 5 km, total biayanya adalah...',
            opts: ['Rp30.000', 'Rp25.000', 'Rp35.000', 'Rp20.000'],
            c: 'Rp30.000',
            visual: { type: 'function_machine', formula: 'f(x) = 3000x + 15000', inputVal: '5 km', processSteps: '3000(5) + 15000 = 15000 + 15000', outputVal: 'Rp30.000', machineName: 'Tarif Sewa Patroli' }
          },
          {
            q: 'Diketahui rumus fungsi f(x) = 2x - 5. Nilai bayangan dari bilangan negatif f(-3) adalah...',
            opts: ['-11', '1', '-1', '-16'],
            c: '-11',
            visual: { type: 'function_machine', formula: 'f(x) = 2x - 5', inputVal: '-3', processSteps: '2(-3) - 5 = -6 - 5', outputVal: '-11', machineName: 'Dekoder Negatif' }
          },
          // C4 Level
          {
            q: 'Mesin dekoder sandi rahasia markas menggunakan rumus f(x) = 4x + 3. Jika kode hasil yang diterima adalah 23, berapakah nilai prapeta x?',
            opts: ['5', '4', '6', '7'],
            c: '5',
            visual: { type: 'function_machine', formula: 'f(x) = 4x + 3', inputVal: 'Prapeta x = ?', processSteps: '4x + 3 = 23 ➔ 4x = 20 ➔ x = 5', outputVal: 'Kode 23', machineName: 'Mencari Prapeta x' }
          },
          {
             q: 'Diketahui rumus fungsi f(x) = ax + 5. Jika f(3) = 17, berapakah nilai a?',
            opts: ['4', '3', '5', '6'],
            c: '4',
            visual: { type: 'function_machine', formula: 'f(x) = ax + 5', inputVal: '3', processSteps: '3a + 5 = 17 ➔ 3a = 12 ➔ a = 4', outputVal: '17', machineName: 'Mencari Koefisien a' }
          },
          {
             q: 'Pada rumus f(x) = 5x - 8, berapakah nilai f(2) + f(0)?',
            opts: ['-6', '2', '-8', '10'],
            c: '-6',
            visual: { type: 'function_machine', formula: 'f(x) = 5x - 8', inputVal: '2 & 0', processSteps: 'f(2)=2, f(0)=-8 ➔ 2 + (-8)', outputVal: '-6', machineName: 'Evaluasi Dua Nilai' }
          },
          // C5 Level
          {
            q: 'Sewa drone pengintai markas memiliki tarif awal Rp20.000 ditambah Rp5.000 per menit terbang. Rumus fungsi total biaya T(x) setelah x menit terbang adalah...',
            opts: ['T(x) = 5000x + 20000', 'T(x) = 20000x + 5000', 'T(x) = 25000x', 'T(x) = 5000x - 20000'],
            c: 'T(x) = 5000x + 20000',
            visual: { type: 'function_machine', formula: 'T(x) = 5000x + 20000', inputVal: 'x menit', processSteps: 'Tarif dasar 20.000 + 5.000/menit', outputVal: 'Total Biaya', machineName: 'Tarif Drone Detektif' }
          },
          {
            q: 'Diketahui rumus f(x) = ax + b. Jika f(2) = 11 dan f(4) = 17, berapakah nilai dari f(6)?',
            opts: ['23', '21', '25', '19'],
            c: '23',
            visual: { type: 'function_machine', formula: 'f(x) = 3x + 5', inputVal: '6', processSteps: '3(6) + 5 = 18 + 5', outputVal: '23', machineName: 'Prediksi Nilai f(6)' }
          }
        ];
        const cur = mcPool[Math.floor(i / 5) % mcPool.length];
        const rotated = rotateOptions(cur.opts, cur.c, mcCount++);
        questions.push({ id: qNum, level, pts, type: 'MULTIPLE_CHOICE', question: `${cur.q}`, options: rotated, correct: cur.c, visual: cur.visual });
      } else if (formatType === 1) {
        const arrowConfigs = [
          { setA: [1, 2, 3], setB: [3, 5, 7], rule: 'Hubungkan x ke rumus f(x) = 2x + 1!', pairFn: a => `${a}->${a * 2 + 1}` },
          { setA: [1, 2, 3], setB: [5, 8, 11], rule: 'Hubungkan x ke rumus f(x) = 3x + 2!', pairFn: a => `${a}->${a * 3 + 2}` },
          { setA: [1, 2, 3], setB: [7, 8, 9], rule: 'Hubungkan x ke rumus f(x) = x + 6!', pairFn: a => `${a}->${a + 6}` },
          { setA: [1, 2, 3], setB: [4, 9, 14], rule: 'Hubungkan x ke rumus f(x) = 5x - 1!', pairFn: a => `${a}->${a * 5 - 1}` },
          { setA: [1, 2, 3], setB: [6, 8, 10], rule: 'Hubungkan x ke rumus f(x) = 2x + 4!', pairFn: a => `${a}->${a * 2 + 4}` },
          { setA: [1, 2, 3], setB: [6, 10, 14], rule: 'Hubungkan x ke rumus f(x) = 4x + 2!', pairFn: a => `${a}->${a * 4 + 2}` },
          { setA: [1, 2, 3], setB: [8, 11, 14], rule: 'Hubungkan x ke rumus f(x) = 3x + 5!', pairFn: a => `${a}->${a * 3 + 5}` },
          { setA: [1, 2, 3], setB: [6, 11, 16], rule: 'Hubungkan x ke rumus f(x) = 5x + 1!', pairFn: a => `${a}->${a * 5 + 1}` }
        ];
        const cfg = arrowConfigs[Math.floor(i / 5) % arrowConfigs.length];
        questions.push({
          id: qNum, level, pts, type: 'ARROWS',
          question: `${cfg.rule}`,
          setA: cfg.setA, setB: cfg.setB, rule: `ch3_rule_${i}`,
          correctPairs: cfg.setA.map(cfg.pairFn)
        });
      } else if (formatType === 2) {
        const cartesianList = [
          {
            q: 'Diketahui rumus f(x) = 2x + 1. Pasanglah titik-titik koordinat untuk nilai x = 0, 1, dan 2!',
            minX: 0, maxX: 3, minY: 0, maxY: 6,
            targetPoints: [[0, 1], [1, 3], [2, 5]]
          },
          {
            q: 'Pada rumus f(x) = 3x, pasang titik koordinat (x, f(x)) untuk nilai x = 1 dan x = 2!',
            minX: 0, maxX: 3, minY: 0, maxY: 7,
            targetPoints: [[1, 3], [2, 6]]
          },
          {
            q: 'Diketahui rumus f(x) = 4 - x. Tandai titik koordinat pada diagram Cartesius untuk x = 1, 2, dan 3!',
            minX: 0, maxX: 4, minY: 0, maxY: 5,
            targetPoints: [[1, 3], [2, 2], [3, 1]]
          },
          {
            q: 'Pada rumus f(x) = 2x - 2, pasanglah titik-titik koordinat untuk nilai x = 1, 2, dan 3!',
            minX: 0, maxX: 4, minY: 0, maxY: 5,
            targetPoints: [[1, 0], [2, 2], [3, 4]]
          },
          {
            q: 'Diketahui rumus f(x) = x + 3. Tandai titik koordinat (x, f(x)) untuk x = 0, 1, dan 2!',
            minX: 0, maxX: 3, minY: 0, maxY: 6,
            targetPoints: [[0, 3], [1, 4], [2, 5]]
          },
          {
            q: 'Pada rumus f(x) = 3x - 1, pasang titik koordinat (x, f(x)) untuk nilai x = 1 dan x = 2!',
            minX: 0, maxX: 3, minY: 0, maxY: 6,
            targetPoints: [[1, 2], [2, 5]]
          }
        ];
        const curC = cartesianList[Math.floor(i / 5) % cartesianList.length];
        questions.push({
          id: qNum, level, pts, type: 'CARTESIAN',
          question: `${curC.q}`,
          minX: curC.minX, maxX: curC.maxX, minY: curC.minY, maxY: curC.maxY,
          targetPoints: curC.targetPoints,
          hint: 'Klik pada persilangan kotak untuk menandai titik hasil fungsi.'
        });
      } else if (formatType === 3) {
        const matchingConfigs = [
          {
            q: 'Jodohkan nilai x dengan hasil rumus fungsi f(x) = 2x + 5!',
            pairs: [
              { x: 1, result: 7 },
              { x: 2, result: 9 },
              { x: 3, result: 11 }
            ]
          },
          {
            q: 'Jodohkan nilai x dengan rumus f(x) = 4x - 1!',
            pairs: [
              { x: 1, result: 3 },
              { x: 2, result: 7 },
              { x: 3, result: 11 }
            ]
          },
          {
            q: 'Jodohkan fungsi dengan nilai bayangan saat x = 2!',
            pairs: [
              { x: 'f(x) = 3x + 1', result: 'f(2) = 7' },
              { x: 'f(x) = 5x - 2', result: 'f(2) = 8' },
              { x: 'f(x) = 4x + 3', result: 'f(2) = 11' }
            ]
          },
          {
            q: 'Jodohkan pola masukan tabel dengan rumus fungsinya!',
            pairs: [
              { x: 'x=1 jadi 3, x=2 jadi 5', result: 'f(x) = 2x + 1' },
              { x: 'x=1 jadi 4, x=2 jadi 7', result: 'f(x) = 3x + 1' },
              { x: 'x=1 jadi 5, x=2 jadi 6', result: 'f(x) = x + 4' }
            ]
          },
          {
            q: 'Jodohkan nilai prapeta x saat diketahui output f(x) = 3x + 1!',
            pairs: [
              { x: 'Output f(x) = 7', result: 'Prapeta x = 2' },
              { x: 'Output f(x) = 10', result: 'Prapeta x = 3' },
              { x: 'Output f(x) = 13', result: 'Prapeta x = 4' }
            ]
          },
          {
            q: 'Jodohkan dua petunjuk nilai fungsi dengan rumus persamaannya!',
            pairs: [
              { x: 'f(0) = 4 dan f(1) = 7', result: 'f(x) = 3x + 4' },
              { x: 'f(0) = 2 dan f(1) = 6', result: 'f(x) = 4x + 2' },
              { x: 'f(0) = 5 dan f(1) = 7', result: 'f(x) = 2x + 5' }
            ]
          },
          {
            q: 'Jodohkan istilah pada bentuk rumus f(x) = ax + b!',
            pairs: [
              { x: 'Huruf a', result: 'Koefisien pengali x' },
              { x: 'Huruf x', result: 'Variabel yang nilainya bisa diganti' },
              { x: 'Huruf b', result: 'Konstanta suku tetap' }
            ]
          }
        ];
        const mCfg = matchingConfigs[Math.floor(i / 5) % matchingConfigs.length];
        questions.push({
          id: qNum, level, pts, type: 'MATCHING',
          question: `${mCfg.q}`,
          pairs: mCfg.pairs
        });
      } else {
        const tfPool = [
          { q: 'Pada rumus fungsi linear f(x) = ax + b, huruf "a" disebut koefisien dan "b" disebut konstanta.', a: 'Benar' },
          { q: 'Jika f(x) = 5x - 4, maka nilai f(0) adalah -4.', a: 'Benar', visual: { type: 'function_machine', formula: 'f(x) = 5x - 4', inputVal: '0', processSteps: '5(0) - 4 = 0 - 4', outputVal: '-4', machineName: 'Evaluasi f(0)' } },
          { q: 'Bayangan dari x = 3 pada f(x) = 4x + 1 adalah 13, dan prapeta dari 13 adalah x = 3.', a: 'Benar', visual: { type: 'function_machine', formula: 'f(x) = 4x + 1', inputVal: '3', processSteps: '4(3) + 1 = 12 + 1', outputVal: '13', machineName: 'Bayangan & Prapeta' } },
           { q: 'Penulisan f : x -> 2x + 7 artinya sama persis dengan rumus f(x) = 2x + 7.', a: 'Benar' },
          { q: 'Jika f(x) = 2x - 3, maka bentuk f(a + 1) sama dengan 2a - 1.', a: 'Benar' },
          { q: 'Pada fungsi konstan f(x) = 7, nilai f(10) bernilai 70.', a: 'Salah', visual: { type: 'function_machine', formula: 'f(x) = 7', inputVal: '10', processSteps: 'Konstan tanpa x', outputVal: '7 (Tetap 7)', machineName: 'Fungsi Konstan' } },
          { q: 'Jika rumus fungsi f(x) = 3x + b dan f(2) = 10, maka nilai konstanta b adalah 4.', a: 'Benar', visual: { type: 'function_machine', formula: 'f(2) = 3(2) + b = 10', inputVal: '2', processSteps: '6 + b = 10 ➔ b = 4', outputVal: '10', machineName: 'Mencari Nilai b' } }
        ];
        const cur = tfPool[Math.floor(i / 5) % tfPool.length];
        questions.push({ id: qNum, level, pts, type: 'TRUE_FALSE', question: `${cur.q}`, options: ['Benar', 'Salah'], correct: cur.a, visual: cur.visual });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // CHAPTER 4: Grafik Fungsi Linear
    // ─────────────────────────────────────────────────────────────
    else if (cid === 4) {
      if (formatType === 0) {
        const mcPool = [
          // C3 Level
          {
            q: 'Grafik dari fungsi linear f(x) = ax + b pada bidang koordinat Cartesius selalu berbentuk...',
            opts: ['Garis lurus', 'Garis lengkung parabola', 'Lingkaran tertutup', 'Garis patah-patah acak'],
            c: 'Garis lurus',
            visual: { type: 'cartesian_graph', slope: 1, yIntercept: 0, formula: 'Garis Linear f(x) = x', trend: 'naik' }
          },
          {
            q: 'Grafik fungsi linear f(x) = 3x - 6 memotong sumbu X (saat y = 0) pada titik koordinat...',
            opts: ['(2, 0)', '(0, -6)', '(-2, 0)', '(6, 0)'],
            c: '(2, 0)',
            visual: { type: 'cartesian_graph', slope: 3, yIntercept: -6, xIntercept: 2, formula: 'f(x) = 3x - 6', trend: 'naik' }
          },
          {
            q: 'Manakah titik koordinat berikut yang DILALUI oleh lintasan radar detektif f(x) = 2x + 3?',
            opts: ['(2, 7)', '(2, 6)', '(1, 4)', '(3, 8)'],
            c: '(2, 7)',
            visual: { type: 'cartesian_graph', slope: 2, yIntercept: 3, formula: 'f(x) = 2x + 3', testPoints: [[2, 7]], trend: 'naik' }
          },
          // C4 Level
          {
            q: 'Radar detektif merekam mobil tersangka bergerak melewati titik (0, 2) dan (2, 8). Berapakah nilai gradien (kemiringan) garis lintasan tersebut?',
            opts: ['3', '4', '2', '6'],
            c: '3',
            visual: { type: 'cartesian_graph', slope: 3, yIntercept: 2, formula: 'Lintasan Mobil (m = 3)', testPoints: [[0, 2], [2, 8]], trend: 'naik' }
          },
          {
            q: 'Grafik posisi patroli detektif f(x) = -2x + 10 menyatakan jarak sisa (km) pada menit ke-x. Patroli akan tiba di TKP (jarak sisa = 0 km) pada menit ke...',
            opts: ['5', '10', '2', '8'],
            c: '5',
            visual: { type: 'cartesian_graph', slope: -2, yIntercept: 10, xIntercept: 5, formula: 'f(x) = -2x + 10 (Jarak Patroli)', trend: 'turun' }
          },
          {
            q: 'Grafik fungsi f(x) = 4x - 8 memotong sumbu Y di titik...',
            opts: ['(0, -8)', '(2, 0)', '(-8, 0)', '(0, 4)'],
            c: '(0, -8)',
            visual: { type: 'cartesian_graph', slope: 4, yIntercept: -8, xIntercept: 2, formula: 'f(x) = 4x - 8', trend: 'naik' }
          },
          // C5 Level
          {
            q: 'Dua mobil detektif memiliki lintasan f(x) = 2x + 4 dan g(x) = -x + 10. Pada titik manakah kedua mobil patroli tersebut akan berpapasan (berpotongan)?',
            opts: ['(2, 8)', '(3, 7)', '(1, 6)', '(4, 6)'],
            c: '(2, 8)',
            visual: { type: 'cartesian_graph', slope: 2, yIntercept: 4, formula: 'Titik Temu Patroli (2, 8)', testPoints: [[2, 8]], trend: 'naik' }
          },
          {
            q: 'Sebuah garis lintasan melalui titik potong sumbu Y pada (0, 6) dan memiliki gradien m = -2. Persamaan garis dan titik potong sumbu X adalah...',
            opts: ['f(x) = -2x + 6 dan memotong sumbu X di (3, 0)', 'f(x) = 2x + 6 dan memotong sumbu X di (-3, 0)', 'f(x) = -2x - 6 dan memotong sumbu X di (0, 3)', 'f(x) = 6x - 2 dan memotong sumbu X di (6, 0)'],
            c: 'f(x) = -2x + 6 dan memotong sumbu X di (3, 0)',
            visual: { type: 'cartesian_graph', slope: -2, yIntercept: 6, xIntercept: 3, formula: 'f(x) = -2x + 6', trend: 'turun' }
          }
        ];
        const cur = mcPool[Math.floor(i / 5) % mcPool.length];
        const rotated = rotateOptions(cur.opts, cur.c, mcCount++);
        questions.push({ id: qNum, level, pts, type: 'MULTIPLE_CHOICE', question: `${cur.q}`, options: rotated, correct: cur.c, visual: cur.visual });
      } else if (formatType === 1) {
        const arrowConfigs = [
          { setA: [0, 1, 2], setB: [1, 2, 3], rule: 'Hubungkan nilai x ke nilai y pada garis f(x) = x + 1!', pairFn: a => `${a}->${a + 1}` },
          { setA: [0, 1, 2], setB: [1, 3, 5], rule: 'Hubungkan nilai x ke nilai y pada garis f(x) = 2x + 1!', pairFn: a => `${a}->${a * 2 + 1}` },
          { setA: [0, 1, 2], setB: [3, 5, 7], rule: 'Hubungkan nilai x ke nilai y pada garis f(x) = 2x + 3!', pairFn: a => `${a}->${a * 2 + 3}` },
          { setA: [0, 1, 2], setB: [1, 4, 7], rule: 'Hubungkan nilai x ke nilai y pada garis f(x) = 3x + 1!', pairFn: a => `${a}->${a * 3 + 1}` },
          { setA: [1, 2, 3], setB: [4, 8, 12], rule: 'Hubungkan nilai x ke nilai y pada garis f(x) = 4x!', pairFn: a => `${a}->${a * 4}` },
          { setA: [0, 1, 2], setB: [4, 6, 8], rule: 'Hubungkan nilai x ke nilai y pada garis f(x) = 2x + 4!', pairFn: a => `${a}->${a * 2 + 4}` },
          { setA: [0, 1, 2], setB: [3, 6, 9], rule: 'Hubungkan nilai x ke nilai y pada garis f(x) = 3x + 3!', pairFn: a => `${a}->${a * 3 + 3}` },
          { setA: [0, 1, 2], setB: [5, 6, 7], rule: 'Hubungkan nilai x ke nilai y pada garis f(x) = x + 5!', pairFn: a => `${a}->${a + 5}` }
        ];
        const cfg = arrowConfigs[Math.floor(i / 5) % arrowConfigs.length];
        questions.push({
          id: qNum, level, pts, type: 'ARROWS',
          question: `${cfg.rule}`,
          setA: cfg.setA, setB: cfg.setB, rule: `ch4_rule_${i}`,
          correctPairs: cfg.setA.map(cfg.pairFn)
        });
      } else if (formatType === 2) {
        const cartesianList = [
          {
            q: 'Pasang titik koordinat untuk menggambar grafik garis f(x) = 2x pada domain x = 0, 1, dan 2!',
            minX: 0, maxX: 3, minY: 0, maxY: 5,
            targetPoints: [[0, 0], [1, 2], [2, 4]],
            drawLine: true
          },
          {
            q: 'Pasang titik koordinat garis linear f(x) = x + 2 pada nilai x = 0, 1, dan 2!',
            minX: 0, maxX: 3, minY: 0, maxY: 5,
            targetPoints: [[0, 2], [1, 3], [2, 4]],
            drawLine: true
          },
          {
            q: 'Tandai titik potong sumbu Y (0, 1) dan titik koordinat (1, 3) serta (2, 5) untuk garis f(x) = 2x + 1!',
            minX: 0, maxX: 3, minY: 0, maxY: 6,
            targetPoints: [[0, 1], [1, 3], [2, 5]],
            drawLine: true
          },
          {
            q: 'Pasang titik koordinat lintasan radar f(x) = 2x - 1 untuk domain x = 1, 2, dan 3!',
            minX: 0, maxX: 4, minY: 0, maxY: 6,
            targetPoints: [[1, 1], [2, 3], [3, 5]],
            drawLine: true
          },
          {
            q: 'Tandai titik koordinat garis turun f(x) = 5 - x untuk nilai x = 1, 2, dan 3!',
            minX: 0, maxX: 4, minY: 0, maxY: 5,
            targetPoints: [[1, 4], [2, 3], [3, 2]],
            drawLine: true
          },
          {
            q: 'Pasang titik potong sumbu Y (0, 3) dan satu titik lain (1, 5) pada lintasan f(x) = 2x + 3!',
            minX: 0, maxX: 3, minY: 0, maxY: 6,
            targetPoints: [[0, 3], [1, 5]],
            drawLine: true
          }
        ];
        const curC = cartesianList[Math.floor(i / 5) % cartesianList.length];
        questions.push({
          id: qNum, level, pts, type: 'CARTESIAN',
          question: `${curC.q}`,
          minX: curC.minX, maxX: curC.maxX, minY: curC.minY, maxY: curC.maxY,
          targetPoints: curC.targetPoints,
          drawLine: curC.drawLine,
          hint: 'Klik persilangan kotak untuk menandai titik garis linear.'
        });
      } else if (formatType === 3) {
        const matchingConfigs = [
          {
            q: 'Jodohkan fungsi linear dengan titik potong sumbu Y (saat x = 0)!',
            pairs: [
              { x: 'f(x) = 2x + 5', result: 'Titik potong (0, 5)' },
              { x: 'f(x) = 3x - 4', result: 'Titik potong (0, -4)' },
              { x: 'f(x) = 4x + 1', result: 'Titik potong (0, 1)' }
            ]
          },
          {
            q: 'Jodohkan fungsi linear dengan nilai gradien (kemiringan) garisnya!',
            pairs: [
              { x: 'f(x) = 3x + 2', result: 'Gradien m = 3' },
              { x: 'f(x) = -2x + 7', result: 'Gradien m = -2' },
              { x: 'f(x) = 5x - 1', result: 'Gradien m = 5' }
            ]
          },
          {
            q: 'Jodohkan sifat nilai gradien dengan arah kemiringan grafiknya!',
            pairs: [
              { x: 'Gradien m positif', result: 'Garis naik miring ke kanan' },
              { x: 'Gradien m negatif', result: 'Garis turun miring ke kanan' },
              { x: 'Gradien m sama dengan nol', result: 'Garis mendatar (horizontal)' }
            ]
          },
          {
            q: 'Jodohkan fungsi dengan titik potong sumbu X (saat y = 0)!',
            pairs: [
              { x: 'f(x) = 2x - 8', result: 'Potong X di (4, 0)' },
              { x: 'f(x) = 3x - 9', result: 'Potong X di (3, 0)' },
              { x: 'f(x) = x - 5', result: 'Potong X di (5, 0)' }
            ]
          },
          {
            q: 'Jodohkan pasangan titik uji dengan rumus garis yang dilaluinya!',
            pairs: [
              { x: 'Titik (0, 3) dan (1, 5)', result: 'Garis f(x) = 2x + 3' },
              { x: 'Titik (0, 1) dan (1, 4)', result: 'Garis f(x) = 3x + 1' },
              { x: 'Titik (0, 4) dan (1, 5)', result: 'Garis f(x) = x + 4' }
            ]
          },
          {
            q: 'Jodohkan hubungan dua garis radar detektif dengan sifat pertemuannya!',
            pairs: [
              { x: 'y = 3x + 2 dan y = 3x - 5', result: 'Dua garis sejajar (tidak bertemu)' },
              { x: 'y = 2x + 1 dan y = 4x + 1', result: 'Berpotongan di sumbu Y pada (0, 1)' },
              { x: 'y = 5 (fungsi konstan)', result: 'Garis mendatar sempurna' }
            ]
          },
          {
            q: 'Jodohkan nilai x dengan titik koordinat pada lintasan f(x) = 2x + 1!',
            pairs: [
              { x: 'Nilai x = 3', result: 'Koordinat titik (3, 7)' },
              { x: 'Nilai x = 4', result: 'Koordinat titik (4, 9)' },
              { x: 'Nilai x = 5', result: 'Koordinat titik (5, 11)' }
            ]
          }
        ];
        const mCfg = matchingConfigs[Math.floor(i / 5) % matchingConfigs.length];
        questions.push({
          id: qNum, level, pts, type: 'MATCHING',
          question: `${mCfg.q}`,
          pairs: mCfg.pairs
        });
      } else {
        const tfPool = [
          { q: 'Titik potong sebuah garis grafik dengan sumbu Y selalu memiliki nilai koordinat x = 0.', a: 'Benar', visual: { type: 'cartesian_graph', slope: 2, yIntercept: 4, formula: 'Titik Potong Sumbu Y (0, 4)', trend: 'naik' } },
          { q: 'Jika nilai gradien suatu garis bernilai positif (m > 0), maka grafik garis tersebut miring naik ke kanan.', a: 'Benar', visual: { type: 'cartesian_graph', slope: 2, yIntercept: 1, formula: 'Gradien Positif m = 2', trend: 'naik' } },
          { q: 'Garis dengan persamaan f(x) = 2x + 1 dan g(x) = 2x + 8 saling sejajar karena memiliki gradien yang sama.', a: 'Benar', visual: { type: 'cartesian_graph', slope: 2, yIntercept: 1, formula: 'Dua Garis Sejajar (m = 2)', trend: 'naik' } },
          { q: 'Grafik f(x) = -3x + 9 memotong sumbu Y di titik (0, 9) dan memotong sumbu X di titik (3, 0).', a: 'Benar', visual: { type: 'cartesian_graph', slope: -3, yIntercept: 9, xIntercept: 3, formula: 'f(x) = -3x + 9', trend: 'turun' } },
          { q: 'Semakin besar nilai gradien positif suatu garis, maka garis tersebut akan tampak semakin landai mendatar.', a: 'Salah' },
          { q: 'Dua garis lurus yang memiliki gradien berbeda pasti akan berpotongan di tepat satu titik pada bidang koordinat.', a: 'Benar' },
          { q: 'Garis yang memiliki rumus f(x) = 4x pasti melewati titik pusat koordinat (0, 0).', a: 'Benar', visual: { type: 'cartesian_graph', slope: 4, yIntercept: 0, xIntercept: 0, formula: 'f(x) = 4x melalui (0, 0)', trend: 'naik' } }
        ];
        const cur = tfPool[Math.floor(i / 5) % tfPool.length];
        questions.push({ id: qNum, level, pts, type: 'TRUE_FALSE', question: `${cur.q}`, options: ['Benar', 'Salah'], correct: cur.a, visual: cur.visual });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // CHAPTER 5: Korespondensi Satu-Satu
    // ─────────────────────────────────────────────────────────────
    else if (cid === 5) {
      if (formatType === 0) {
        const mcPool = [
          // C3 Level
          {
            q: 'Syarat MUTLAK agar dua himpunan A dan B dapat membentuk korespondensi satu-satu adalah...',
            opts: ['Banyak anggota kedua himpunan harus sama [n(A) = n(B)]', 'Himpunan A harus lebih banyak anggotanya dari B', 'Anggota himpunan B harus berupa angka genap', 'Himpunan B harus merupakan himpunan kosong'],
            c: 'Banyak anggota kedua himpunan harus sama [n(A) = n(B)]',
            visual: { type: 'one_to_one_board', setA: ['A1', 'A2', 'A3'], setB: ['B1', 'B2', 'B3'], pairs: [['A1', 'B1'], ['A2', 'B2'], ['A3', 'B3']], sizeN: 3, permutations: 6, title: 'Syarat n(A) = n(B)' }
          },
          {
            q: 'Jika n(A) = 3 dan n(B) = 3, banyak korespondensi satu-satu yang dapat dibentuk dari A ke B adalah...',
            opts: ['6 cara', '9 cara', '3 cara', '12 cara'],
            c: '6 cara',
            visual: { type: 'one_to_one_board', setA: ['1', '2', '3'], setB: ['x', 'y', 'z'], pairs: [['1', 'x'], ['2', 'y'], ['3', 'z']], sizeN: 3, permutations: 6, title: 'Banyak Susunan: 3! = 6' }
          },
          {
            q: 'Manakah contoh di dunia nyata yang merupakan KORESPONDENSI SATU-SATU yang sempurna?',
            opts: ['Negara berdaulat dengan Ibu Kota negaranya', 'Siswa dengan warna baju kesukaannya', 'Guru dengan mata pelajaran yang diajarkannya', 'Pengemudi dengan jenis merk kendaraannya'],
            c: 'Negara berdaulat dengan Ibu Kota negaranya',
            visual: { type: 'one_to_one_board', setA: ['Indonesia', 'Jepang', 'Inggris'], setB: ['Jakarta', 'Tokyo', 'London'], pairs: [['Indonesia', 'Jakarta'], ['Jepang', 'Tokyo'], ['Inggris', 'London']], sizeN: 3, permutations: 6, title: 'Negara ➔ Ibu Kota' }
          },
          // C4 Level
          {
            q: 'Markas detektif menugaskan 4 agen rahasia ke 4 distrik kota berbeda (1 agen memegang 1 distrik unik). Ada berapa banyak variasi penugasan yang mungkin?',
            opts: ['24 cara', '16 cara', '8 cara', '64 cara'],
            c: '24 cara',
            visual: { type: 'one_to_one_board', setA: ['Agen 1', 'Agen 2', 'Agen 3', 'Agen 4'], setB: ['Distrik 1', 'Distrik 2', 'Distrik 3', 'Distrik 4'], pairs: [['Agen 1', 'Distrik 1'], ['Agen 2', 'Distrik 2'], ['Agen 3', 'Distrik 3'], ['Agen 4', 'Distrik 4']], sizeN: 4, permutations: 24, title: 'Penugasan Agen: 4! = 24' }
          },
          {
            q: 'Diberikan A = {faktor dari 6} dan B = {bilangan prima kurang dari 8}. Apakah himpunan A dan B dapat membentuk korespondensi satu-satu?',
            opts: ['Dapat, karena n(A) = n(B) = 4 (ada 24 susunan)', 'Tidak dapat, karena faktor dari 6 lebih sedikit', 'Tidak dapat, karena anggotanya berbeda jenis', 'Dapat, tetapi hanya ada 4 susunan'],
            c: 'Dapat, karena n(A) = n(B) = 4 (ada 24 susunan)',
            visual: { type: 'one_to_one_board', setA: ['1', '2', '3', '6'], setB: ['2', '3', '5', '7'], pairs: [['1', '2'], ['2', '3'], ['3', '5'], ['6', '7']], sizeN: 4, permutations: 24, title: 'n(A) = 4, n(B) = 4 (24 Cara)' }
          },
          {
            q: 'Manakah himpunan pasangan berurutan yang merupakan korespondensi satu-satu?',
            opts: ['{(1, "p"), (2, "q"), (3, "r")}', '{(1, "p"), (2, "p"), (3, "q")}', '{(1, "p"), (2, "q"), (2, "r")}', '{(1, "p"), (2, "q")} pada domain {1,2,3}'],
            c: '{(1, "p"), (2, "q"), (3, "r")}',
            visual: { type: 'one_to_one_board', setA: ['1', '2', '3'], setB: ['p', 'q', 'r'], pairs: [['1', 'p'], ['2', 'q'], ['3', 'r']], sizeN: 3, permutations: 6, title: 'Pasangan 1-ke-1 Bijektif' }
          },
          // C5 Level
          {
            q: 'Sebuah brankas berkas rahasia memiliki 5 kabel pengaman berbeda yang harus dipasangkan ke 5 terminal unik. Banyak susunan kombinasi pasangan kabel adalah...',
            opts: ['120 susunan', '25 susunan', '60 susunan', '24 susunan'],
            c: '120 susunan',
            visual: { type: 'one_to_one_board', setA: ['Kabel 1', 'Kabel 2', 'Kabel 3', 'Kabel 4', 'Kabel 5'], setB: ['Term 1', 'Term 2', 'Term 3', 'Term 4', 'Term 5'], pairs: [['Kabel 1', 'Term 1'], ['Kabel 2', 'Term 2'], ['Kabel 3', 'Term 3'], ['Kabel 4', 'Term 4'], ['Kabel 5', 'Term 5']], sizeN: 5, permutations: 120, title: 'Brankas: 5! = 120 Susunan' }
          },
          {
            q: 'Tim kepolisian menyimpulkan: Hubungan antara "Siswa" dengan "Nomor Kartu Pelajar" adalah korespondensi satu-satu, KARENA...',
            opts: ['Setiap siswa memiliki tepat 1 kartu pelajar, dan setiap kartu pelajar dimiliki tepat 1 siswa', 'Satu siswa diperbolehkan memiliki beberapa kartu pelajar', 'Satu nomor kartu pelajar dapat digunakan bergantian oleh banyak siswa', 'Kartu pelajar tidak memiliki kode pengenal'],
            c: 'Setiap siswa memiliki tepat 1 kartu pelajar, dan setiap kartu pelajar dimiliki tepat 1 siswa',
            visual: { type: 'one_to_one_board', setA: ['Siswa A', 'Siswa B', 'Siswa C'], setB: ['Kartu 01', 'Kartu 02', 'Kartu 03'], pairs: [['Siswa A', 'Kartu 01'], ['Siswa B', 'Kartu 02'], ['Siswa C', 'Kartu 03']], sizeN: 3, permutations: 6, title: '1 Siswa ➔ 1 Kartu Pelajar Unik' }
          }
        ];
        const cur = mcPool[Math.floor(i / 5) % mcPool.length];
        const rotated = rotateOptions(cur.opts, cur.c, mcCount++);
        questions.push({ id: qNum, level, pts, type: 'MULTIPLE_CHOICE', question: `${cur.q}`, options: rotated, correct: cur.c, visual: cur.visual });
      } else if (formatType === 1) {
        // Crossed & permuted pairs (not straight lines) to satisfy bijection requirements
        const arrowConfigs = [
          {
            setA: ['Detektif A', 'Detektif B', 'Detektif C'],
            setB: ['Pos 1', 'Pos 2', 'Pos 3'],
            rule: 'Pasangkan 3 Detektif ke 3 Pos Jaga secara korespondensi satu-satu: Detektif A ke Pos 2, Detektif B ke Pos 3, dan Detektif C ke Pos 1!',
            correctPairs: ['Detektif A->Pos 2', 'Detektif B->Pos 3', 'Detektif C->Pos 1']
          },
          {
            setA: ['Saksi 1', 'Saksi 2', 'Saksi 3'],
            setB: ['Ruang A', 'Ruang B', 'Ruang C'],
            rule: 'Pasangkan 3 Saksi ke 3 Ruang Sidang: Saksi 1 ke Ruang B, Saksi 2 ke Ruang C, dan Saksi 3 ke Ruang A!',
            correctPairs: ['Saksi 1->Ruang B', 'Saksi 2->Ruang C', 'Saksi 3->Ruang A']
          },
          {
            setA: ['Sidik Jari', 'Kamera CCTV', 'Pesan Suara'],
            setB: ['Kotak 1', 'Kotak 2', 'Kotak 3'],
            rule: 'Pasangkan 3 Bukti: Sidik Jari ke Kotak 3, CCTV ke Kotak 1, dan Pesan Suara ke Kotak 2!',
            correctPairs: ['Sidik Jari->Kotak 3', 'Kamera CCTV->Kotak 1', 'Pesan Suara->Kotak 2']
          },
          {
            setA: ['Agen Alpha', 'Agen Beta', 'Agen Gamma'],
            setB: ['Distrik 1', 'Distrik 2', 'Distrik 3'],
            rule: 'Tugaskan 3 Agen Intelijen: Agen Alpha ke Distrik 3, Agen Beta ke Distrik 1, dan Agen Gamma ke Distrik 2!',
            correctPairs: ['Agen Alpha->Distrik 3', 'Agen Beta->Distrik 1', 'Agen Gamma->Distrik 2']
          },
          {
            setA: ['Loker 101', 'Loker 102', 'Loker 103'],
            setB: ['Kunci Merah', 'Kunci Biru', 'Kunci Kuning'],
            rule: 'Pasangkan Lemari ke Kunci: Loker 101 ke Kunci Biru, Loker 102 ke Kunci Kuning, Loker 103 ke Kunci Merah!',
            correctPairs: ['Loker 101->Kunci Biru', 'Loker 102->Kunci Kuning', 'Loker 103->Kunci Merah']
          },
          {
            setA: ['Mobil Patroli', 'Mobil Laboratorium', 'Mobil Radar'],
            setB: ['Parkir A', 'Parkir B', 'Parkir C'],
            rule: 'Parkirkan Mobil Dinas: Mobil Patroli ke Parkir B, Mobil Lab ke Parkir C, dan Mobil Radar ke Parkir A!',
            correctPairs: ['Mobil Patroli->Parkir B', 'Mobil Laboratorium->Parkir C', 'Mobil Radar->Parkir A']
          },
          {
            setA: ['Laptop 1', 'Laptop 2', 'Laptop 3'],
            setB: ['Teknisi Andi', 'Teknisi Budi', 'Teknisi Citra'],
            rule: 'Pasangkan Laptop: Laptop 1 ke Teknisi Budi, Laptop 2 ke Teknisi Citra, dan Laptop 3 ke Teknisi Andi!',
            correctPairs: ['Laptop 1->Teknisi Budi', 'Laptop 2->Teknisi Citra', 'Laptop 3->Teknisi Andi']
          },
          {
            setA: ['Sandi Alpha', 'Sandi Beta', 'Sandi Omega'],
            setB: ['Arsip 1', 'Arsip 2', 'Arsip 3'],
            rule: 'Pasangkan Sandi: Sandi Alpha ke Arsip 2, Sandi Beta ke Arsip 3, dan Sandi Omega ke Arsip 1!',
            correctPairs: ['Sandi Alpha->Arsip 2', 'Sandi Beta->Arsip 3', 'Sandi Omega->Arsip 1']
          }
        ];
        const cfg = arrowConfigs[Math.floor(i / 5) % arrowConfigs.length];
        questions.push({
          id: qNum, level, pts, type: 'ARROWS',
          question: `${cfg.rule}`,
          setA: cfg.setA, setB: cfg.setB, rule: `ch5_rule_${i}`,
          correctPairs: cfg.correctPairs
        });
      } else if (formatType === 2) {
        const cartesianList = [
          {
            q: 'Tandai 3 titik koordinat korespondensi satu-satu: (1, 3), (2, 1), dan (3, 2) pada diagram Cartesius!',
            minX: 0, maxX: 4, minY: 0, maxY: 4,
            targetPoints: [[1, 3], [2, 1], [3, 2]]
          },
          {
            q: 'Pasang titik koordinat untuk korespondensi satu-satu f(x) = 4 - x pada domain {1, 2, 3}!',
            minX: 0, maxX: 4, minY: 0, maxY: 4,
            targetPoints: [[1, 3], [2, 2], [3, 1]]
          },
          {
            q: 'Tandai titik koordinat korespondensi satu-satu identitas: (1, 1), (2, 2), dan (3, 3)!',
            minX: 0, maxX: 4, minY: 0, maxY: 4,
            targetPoints: [[1, 1], [2, 2], [3, 3]]
          },
          {
            q: 'Pasang titik-titik korespondensi satu-satu untuk pasangan {(1, 2), (2, 3), (3, 1)}!',
            minX: 0, maxX: 4, minY: 0, maxY: 4,
            targetPoints: [[1, 2], [2, 3], [3, 1]]
          },
          {
            q: 'Tandai titik koordinat fungsi korespondensi satu-satu f(x) = 2x - 1 untuk x ∈ {1, 2, 3}!',
            minX: 0, maxX: 4, minY: 0, maxY: 6,
            targetPoints: [[1, 1], [2, 3], [3, 5]]
          },
          {
            q: 'Pasang titik koordinat korespondensi satu-satu untuk pasangan {(1, 2), (2, 1), (3, 3)}!',
            minX: 0, maxX: 4, minY: 0, maxY: 4,
            targetPoints: [[1, 2], [2, 1], [3, 3]]
          }
        ];
        const curC = cartesianList[Math.floor(i / 5) % cartesianList.length];
        questions.push({
          id: qNum, level, pts, type: 'CARTESIAN',
          question: `${curC.q}`,
          minX: curC.minX, maxX: curC.maxX, minY: curC.minY, maxY: curC.maxY,
          targetPoints: curC.targetPoints,
          hint: 'Ingat: tiap nilai x dan y hanya boleh memiliki 1 titik (korespondensi satu-satu)!'
        });
      } else if (formatType === 3) {
        const matchingConfigs = [
          {
            q: 'Jodohkan contoh hubungan nyata dengan jenis relasi matematisnya!',
            pairs: [
              { x: 'Siswa ke Nomor Induk', result: 'Korespondensi Satu-Satu' },
              { x: 'Siswa ke Makanan Favorit', result: 'Relasi Biasa (Boleh banyak)' },
              { x: 'Siswa ke Tanggal Lahir', result: 'Fungsi Biasa (Bisa sama)' }
            ]
          },
          {
            q: 'Jodohkan jumlah anggota n dengan hasil faktorial n! banyaknya susunan!',
            pairs: [
              { x: 'n = 2 anggota', result: '2! = 2 susunan' },
              { x: 'n = 3 anggota', result: '3! = 6 susunan' },
              { x: 'n = 4 anggota', result: '4! = 24 susunan' }
            ]
          },
          {
            q: 'Tentukan status korespondensi satu-satu himpunan pasangan berurutan!',
            pairs: [
              { x: '{(1, a), (2, b), (3, c)}', result: 'Korespondensi Satu-Satu (Sah)' },
              { x: '{(1, a), (2, a), (3, b)}', result: 'Bukan (Elemen kodomain terpasang dua)' },
              { x: '{(1, a), (2, b)} di domain {1,2,3}', result: 'Bukan (Ada domain tidak terpasang)' }
            ]
          },
          {
            q: 'Jodohkan ukuran himpunan n(A) dan n(B) dengan kemungkinannya!',
            pairs: [
              { x: 'n(A) = 5 dan n(B) = 5', result: 'Dapat dibuat (5! = 120 cara)' },
              { x: 'n(A) = 4 dan n(B) = 3', result: 'Mustahil (Ukuran himpunan beda)' },
              { x: 'n(A) = 1 dan n(B) = 1', result: 'Dapat dibuat (1 susunan)' }
            ]
          },
          {
            q: 'Jodohkan konsep hierarki relasi dalam matematika!',
            pairs: [
              { x: 'Relasi', result: 'Aturan memasangkan anggota dua himpunan' },
              { x: 'Fungsi', result: 'Setiap anggota domain tepat punya 1 pasangan' },
              { x: 'Korespondensi Satu-Satu', result: 'Tepat 1 pasangan timbal balik & n(A)=n(B)' }
            ]
          },
          {
            q: 'Evaluasi kasus pembagian tugas di ruang sidang pengadilan!',
            pairs: [
              { x: '4 Hakim ke 4 Kursi Khusus', result: 'Korespondensi Satu-Satu (24 cara)' },
              { x: '4 Pengacara bela 1 Terdakwa', result: 'Fungsi Banyak ke Satu' },
              { x: '1 Saksi beri 2 alibi beda', result: 'Bukan Fungsi (Bercabang)' }
            ]
          },
          {
            q: 'Evaluasi relasi fungsi f dari A={1,2} ke B={a,b}!',
            pairs: [
              { x: 'f = {(1, b), (2, a)}', result: 'Korespondensi Satu-Satu Sah' },
              { x: 'f = {(1, a), (2, a)}', result: 'Fungsi Biasa (Bukan 1-1)' },
              { x: 'f = {(1, a)}', result: 'Bukan Fungsi (Domain sisa)' }
            ]
          }
        ];
        const mCfg = matchingConfigs[Math.floor(i / 5) % matchingConfigs.length];
        questions.push({
          id: qNum, level, pts, type: 'MATCHING',
          question: `${mCfg.q}`,
          pairs: mCfg.pairs
        });
      } else {
        const tfPool = [
          { q: 'Setiap korespondensi satu-satu pasti merupakan fungsi, dan juga pasti merupakan relasi.', a: 'Benar', visual: { type: 'one_to_one_board', setA: ['1', '2'], setB: ['a', 'b'], pairs: [['1', 'a'], ['2', 'b']], sizeN: 2, permutations: 2, title: 'Fungsi Bijektif 1:1' } },
          { q: 'Jika himpunan A memiliki 3 anggota dan himpunan B memiliki 4 anggota, maka DAPAT dibentuk korespondensi satu-satu.', a: 'Salah', visual: { type: 'one_to_one_board', setA: ['1', '2', '3'], setB: ['a', 'b', 'c', 'd'], pairs: [['1', 'a'], ['2', 'b']], sizeN: 3, permutations: 0, title: 'n(A) ≠ n(B) (Mustahil 1:1)' } },
          { q: 'Pada korespondensi satu-satu, daerah kawan (Kodomain) dan daerah hasil (Range) selalu sama persis tanpa ada sisa.', a: 'Benar', visual: { type: 'one_to_one_board', setA: ['1', '2', '3'], setB: ['a', 'b', 'c'], pairs: [['1', 'a'], ['2', 'b'], ['3', 'c']], sizeN: 3, permutations: 6, title: 'Kodomain = Range Sempurna' } },
          { q: 'Istilah matematis lain untuk korespondensi satu-satu adalah fungsi bijektif (injektif sekaligus surjektif).', a: 'Benar' },
          { q: 'Setiap nomor plat kendaraan bermotor yang terdaftar resmi adalah contoh korespondensi satu-satu dengan kendaraan tersebut.', a: 'Benar' },
          { q: 'Jika banyak korespondensi satu-satu dari A ke B adalah 720 cara, maka banyaknya anggota n(A) adalah 6.', a: 'Benar', visual: { type: 'one_to_one_board', setA: ['1..6'], setB: ['a..f'], pairs: [['1..6', 'a..f']], sizeN: 6, permutations: 720, title: '6! = 6×5×4×3×2×1 = 720' } },
          { q: 'Rumus untuk menghitung banyak korespondensi satu-satu jika n(A) = n(B) = n adalah n pangkat n (n^n).', a: 'Salah' }
        ];
        const cur = tfPool[Math.floor(i / 5) % tfPool.length];
        questions.push({ id: qNum, level, pts, type: 'TRUE_FALSE', question: `${cur.q}`, options: ['Benar', 'Salah'], correct: cur.a, visual: cur.visual });
      }
    }

    // Fallback: default to Chapter 1 questions
    else {
      questions.push({
        id: qNum, level, pts, type: 'MULTIPLE_CHOICE',
        question: `Syarat utama suatu relasi menjadi fungsi adalah...`,
        options: ['Ada elemen domain yang boleh kosong', 'Setiap elemen domain punya tepat 1 pasangan di kodomain', 'Semua elemen kodomain harus terpasang', 'Tidak ada syarat khusus'],
        correct: 'Setiap elemen domain punya tepat 1 pasangan di kodomain'
      });
    }
  }

  return questions;
}
