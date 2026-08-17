/**
 * ENDLESS MODE — BANK SOAL RELASI & FUNGSI
 * 100 Soal | Level: C3 (1-35) → C4 (36-70) → C5 (71-100)
 * Tipe: MCQ | MCQ_COMPLEX | TRUE_FALSE | MATCHING
 *
 * Struktur data:
 * - MCQ/TRUE_FALSE: { options[], correct: string }
 * - MCQ_COMPLEX:    { options[], correctMultiple: string[] }
 * - MATCHING:       { pairs: [{left,right}], rightOptions: string[] }
 */

export const ENDLESS_QUESTIONS = [

  // ══════════════════════════════════════════════════
  // C3 — APLIKASI (Soal 1–35)
  // ══════════════════════════════════════════════════

  {
    id: 1, type: 'MCQ', level: 'C3',
    title: '🔢 Hitung Nilai Fungsi Linier',
    question: 'Detektif Relo menemukan rumus f(x) = 3x − 2. Berapakah nilai f(4)?',
    options: ['10', '14', '12', '8'],
    correct: '10',
    explanation: 'f(4) = 3(4) − 2 = 12 − 2 = 10. ✅'
  },
  {
    id: 2, type: 'TRUE_FALSE', level: 'C3',
    title: '🔗 Cek Pasangan Berurutan',
    question: 'Pernyataan: Pasangan berurutan dari relasi "dua kali" untuk x = 5 adalah (5, 10).',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Aturan "dua kali": y = 2x = 2(5) = 10, sehingga pasangannya adalah (5, 10). ✅'
  },
  {
    id: 3, type: 'MCQ', level: 'C3',
    title: '📊 Banyak Pasangan Berurutan A×B',
    question: 'Jika n(A) = 4 dan n(B) = 3, berapakah banyak anggota A × B?',
    options: ['7', '12', '16', '9'],
    correct: '12',
    explanation: 'n(A × B) = n(A) × n(B) = 4 × 3 = 12. ✅'
  },
  {
    id: 4, type: 'MCQ', level: 'C3',
    title: '📐 Aplikasi Rumus Fungsi Negatif',
    question: 'Diketahui f(x) = 2x + 7. Berapakah nilai f(−3)?',
    options: ['13', '1', '−1', '3'],
    correct: '1',
    explanation: 'f(−3) = 2(−3) + 7 = −6 + 7 = 1. ✅'
  },
  {
    id: 5, type: 'TRUE_FALSE', level: 'C3',
    title: '🗂️ Identifikasi Domain',
    question: 'Pernyataan: Domain dari relasi {(2,5), (3,7), (4,9)} adalah {2, 3, 4}.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Domain adalah komponen pertama setiap pasangan berurutan: {2, 3, 4}. ✅'
  },
  {
    id: 6, type: 'MATCHING', level: 'C3',
    title: '🔡 Unsur-Unsur Fungsi',
    question: 'Pasangkan setiap istilah dengan definisi yang tepat!',
    pairs: [
      { left: 'Domain', right: 'Himpunan Asal (A)' },
      { left: 'Kodomain', right: 'Himpunan Kawan (B)' },
      { left: 'Range', right: 'Himpunan Hasil pemetaan' }
    ],
    rightOptions: ['Himpunan Asal (A)', 'Himpunan Kawan (B)', 'Himpunan Hasil pemetaan', 'Himpunan Semesta'],
    explanation: 'Domain = Himpunan Asal, Kodomain = Himpunan Kawan, Range = Himpunan hasil pemetaan yang terpakai. ✅'
  },
  {
    id: 7, type: 'MCQ', level: 'C3',
    title: '➕ Jumlah Nilai Fungsi',
    question: 'Jika f(x) = 4x − 1, berapakah nilai f(2) + f(3)?',
    options: ['18', '16', '20', '22'],
    correct: '18',
    explanation: 'f(2) = 4(2)−1 = 7. f(3) = 4(3)−1 = 11. Jumlah = 7 + 11 = 18. ✅'
  },
  {
    id: 8, type: 'MCQ', level: 'C3',
    title: '🕵️ Cari Nilai x dari Persamaan',
    question: 'Diketahui f(x) = 2x + 3. Jika f(x) = 17, berapakah nilai x?',
    options: ['5', '6', '7', '8'],
    correct: '7',
    explanation: '2x + 3 = 17 → 2x = 14 → x = 7. ✅'
  },
  {
    id: 9, type: 'TRUE_FALSE', level: 'C3',
    title: '✅ Cek Aturan Relasi',
    question: 'Pernyataan: Relasi {(1,2), (2,4), (3,6)} menggunakan aturan "dua kali".',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Setiap y = 2x: 2=2(1), 4=2(2), 6=2(3). Benar, menggunakan aturan "dua kali". ✅'
  },
  {
    id: 10, type: 'MCQ', level: 'C3',
    title: '📈 Fungsi Kuadrat',
    question: 'Diketahui f(x) = x² + 2x. Berapakah nilai f(3)?',
    options: ['12', '15', '9', '18'],
    correct: '15',
    explanation: 'f(3) = (3)² + 2(3) = 9 + 6 = 15. ✅'
  },
  {
    id: 11, type: 'TRUE_FALSE', level: 'C3',
    title: '📊 Range vs Kodomain',
    question: 'Pernyataan: Range selalu merupakan himpunan bagian dari Kodomain.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Range ⊆ Kodomain. Tidak semua anggota kodomain harus memiliki pasangan (kecuali surjektif). ✅'
  },
  {
    id: 12, type: 'MCQ', level: 'C3',
    title: '🔢 Banyak Fungsi dari A ke B',
    question: 'Diketahui A = {1, 2} dan B = {a, b, c}. Berapakah banyak fungsi yang mungkin dari A ke B?',
    options: ['6', '8', '9', '4'],
    correct: '9',
    explanation: 'Banyak fungsi dari A ke B = n(B)^n(A) = 3² = 9. ✅'
  },
  {
    id: 13, type: 'MATCHING', level: 'C3',
    title: '🗺️ Representasi Relasi',
    question: 'Pasangkan setiap representasi relasi dengan nama yang benar!',
    pairs: [
      { left: 'Diagram panah dari A ke B', right: 'Diagram Panah' },
      { left: '{ (1,a), (2,b) }', right: 'Pasangan Berurutan' },
      { left: 'Tabel x dan y berdampingan', right: 'Tabel Relasi' }
    ],
    rightOptions: ['Diagram Panah', 'Pasangan Berurutan', 'Tabel Relasi', 'Grafik Cartesius'],
    explanation: 'Relasi direpresentasikan dengan diagram panah, pasangan berurutan, tabel, atau grafik Cartesius. ✅'
  },
  {
    id: 14, type: 'MCQ', level: 'C3',
    title: '🎯 Nilai f(0)',
    question: 'Diketahui f(x) = 5x + 7. Berapakah nilai f(0)?',
    options: ['0', '5', '7', '12'],
    correct: '7',
    explanation: 'f(0) = 5(0) + 7 = 0 + 7 = 7. ✅'
  },
  {
    id: 15, type: 'TRUE_FALSE', level: 'C3',
    title: '🔍 Syarat Fungsi',
    question: 'Pernyataan: Pemetaan di mana setiap anggota domain berpasangan dengan tepat satu anggota kodomain disebut Fungsi.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Syarat fungsi: setiap elemen domain harus berpasangan dengan TEPAT SATU elemen kodomain. ✅'
  },
  {
    id: 16, type: 'MCQ', level: 'C3',
    title: '🔑 Cari Konstanta k',
    question: 'Diketahui f(x) = 2x + k dan f(3) = 11. Berapakah nilai k?',
    options: ['3', '5', '4', '6'],
    correct: '5',
    explanation: '2(3) + k = 11 → 6 + k = 11 → k = 5. ✅'
  },
  {
    id: 17, type: 'TRUE_FALSE', level: 'C3',
    title: '❌ Validasi Fungsi',
    question: 'Pernyataan: Relasi {(1,2), (1,3), (2,4)} bukan fungsi karena elemen 1 memiliki 2 pasangan.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Elemen 1 berpasangan ke 2 DAN 3 → melanggar syarat fungsi → bukan fungsi. ✅'
  },
  {
    id: 18, type: 'MCQ', level: 'C3',
    title: '➕ Sigma Nilai Fungsi',
    question: 'Jika f(x) = x² − x, berapakah f(1) + f(2) + f(3)?',
    options: ['6', '8', '10', '4'],
    correct: '8',
    explanation: 'f(1)=1−1=0, f(2)=4−2=2, f(3)=9−3=6. Jumlah = 0+2+6 = 8. ✅'
  },
  {
    id: 19, type: 'MCQ', level: 'C3',
    title: '🗂️ Kodomain Relasi',
    question: 'Diketahui relasi {(1,a),(2,b),(3,a)} ke B = {a,b,c,d}. Apakah yang dimaksud Kodomain?',
    options: ['{a,b}', '{a,b,c,d}', '{1,2,3}', '{a}'],
    correct: '{a,b,c,d}',
    explanation: 'Kodomain = seluruh Himpunan Kawan B = {a,b,c,d}, bukan hanya yang terpakai. ✅'
  },
  {
    id: 20, type: 'MATCHING', level: 'C3',
    title: '🏷️ Jenis-Jenis Fungsi',
    question: 'Pasangkan setiap jenis fungsi dengan nama lainnya yang tepat!',
    pairs: [
      { left: 'Injektif', right: 'Fungsi Satu-Satu' },
      { left: 'Surjektif', right: 'Fungsi Pada (Onto)' },
      { left: 'Bijektif', right: 'Korespondensi Satu-Satu' }
    ],
    rightOptions: ['Fungsi Satu-Satu', 'Fungsi Pada (Onto)', 'Korespondensi Satu-Satu', 'Fungsi Konstan'],
    explanation: 'Injektif = Satu-Satu, Surjektif = Pada/Onto, Bijektif = Korespondensi Satu-Satu. ✅'
  },
  {
    id: 21, type: 'TRUE_FALSE', level: 'C3',
    title: '📏 Banyak Anggota Range',
    question: 'Pernyataan: Banyak anggota Range selalu lebih kecil atau sama dengan banyak anggota Kodomain.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Karena Range ⊆ Kodomain, maka n(Range) ≤ n(Kodomain). ✅'
  },
  {
    id: 22, type: 'MCQ', level: 'C3',
    title: '🔎 Cari Nilai x dari f(x)=2',
    question: 'Diketahui f(x) = 3x − 7. Jika f(x) = 2, berapakah nilai x?',
    options: ['2', '3', '4', '5'],
    correct: '3',
    explanation: '3x − 7 = 2 → 3x = 9 → x = 3. ✅'
  },
  {
    id: 23, type: 'MATCHING', level: 'C3',
    title: '🗺️ Jenis Fungsi & Syarat Pemetaan',
    question: 'Pasangkan setiap jenis fungsi dengan syarat pemetaannya!',
    pairs: [
      { left: 'Injektif', right: 'Setiap elemen B dipasangi maks. 1 panah' },
      { left: 'Surjektif', right: 'Setiap elemen B dipasangi min. 1 panah' },
      { left: 'Bijektif', right: 'Setiap elemen B dipasangi tepat 1 panah' }
    ],
    rightOptions: [
      'Setiap elemen B dipasangi maks. 1 panah',
      'Setiap elemen B dipasangi min. 1 panah',
      'Setiap elemen B dipasangi tepat 1 panah',
      'Setiap elemen B tidak boleh dipasangi'
    ],
    explanation: 'Injektif: maks 1 panah ke B. Surjektif: min 1 panah ke B. Bijektif: tepat 1 panah ke B. ✅'
  },
  {
    id: 24, type: 'MCQ', level: 'C3',
    title: '🔢 Banyak Korespondensi Satu-Satu',
    question: 'Berapakah banyak korespondensi satu-satu dari A = {p, q, r} ke B = {1, 2, 3}?',
    options: ['3', '6', '9', '27'],
    correct: '6',
    explanation: 'Banyak korespondensi 1-1 = n! = 3! = 3×2×1 = 6. ✅'
  },
  {
    id: 25, type: 'TRUE_FALSE', level: 'C3',
    title: '🚫 Satu ke Banyak',
    question: 'Pernyataan: Suatu relasi di mana satu elemen A berpasangan dengan lebih dari satu elemen B adalah BUKAN fungsi.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Fungsi melarang satu elemen A berpasangan ke >1 elemen B (tidak boleh "bercabang"). ✅'
  },
  {
    id: 26, type: 'MCQ', level: 'C3',
    title: '📋 Tentukan Range Fungsi Linier',
    question: 'Diketahui f(x) = 2x + 1 dengan domain {1, 2, 3, 4}. Berapakah Range dari f?',
    options: ['{3,5,7,9}', '{2,4,6,8}', '{1,3,5,7}', '{3,4,5,6}'],
    correct: '{3,5,7,9}',
    explanation: 'f(1)=3, f(2)=5, f(3)=7, f(4)=9. Range = {3,5,7,9}. ✅'
  },
  {
    id: 27, type: 'MCQ', level: 'C3',
    title: '🔀 Komposisi Fungsi Dasar',
    question: 'Diketahui f(x) = x + 3 dan g(x) = 2x. Berapakah nilai (f∘g)(2)?',
    options: ['10', '7', '8', '14'],
    correct: '7',
    explanation: '(f∘g)(2) = f(g(2)) = f(4) = 4 + 3 = 7. ✅'
  },
  {
    id: 28, type: 'TRUE_FALSE', level: 'C3',
    title: '✅ Syarat Korespondensi',
    question: 'Pernyataan: Korespondensi satu-satu antara A = {a, b, c} dan B = {1, 2, 3} dapat terbentuk karena n(A) = n(B) = 3.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Syarat korespondensi 1-1: n(A) harus sama dengan n(B). Karena keduanya 3, maka bisa terbentuk. ✅'
  },
  {
    id: 29, type: 'MCQ', level: 'C3',
    title: '🎲 Fungsi Kubik',
    question: 'Diketahui f(x) = x³ + 2x − 1. Berapakah nilai f(−1)?',
    options: ['−4', '2', '0', '−2'],
    correct: '−4',
    explanation: 'f(−1) = (−1)³ + 2(−1) − 1 = −1 − 2 − 1 = −4. ✅'
  },
  {
    id: 30, type: 'TRUE_FALSE', level: 'C3',
    title: '🔢 Fungsi Konstan adalah Fungsi',
    question: 'Pernyataan: Relasi {(1,2),(2,2),(3,2)} adalah suatu fungsi.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Setiap elemen A (1,2,3) masing-masing berpasangan TEPAT SATU ke B (semua ke 2). Ini adalah fungsi konstan yang valid. ✅'
  },
  {
    id: 31, type: 'MATCHING', level: 'C3',
    title: '🧮 Hitung & Pasangkan Nilai f(x)=2x',
    question: 'Diketahui f(x) = 2x. Pasangkan setiap nilai x dengan f(x) yang benar!',
    pairs: [
      { left: 'x = 1', right: '2' },
      { left: 'x = 3', right: '6' },
      { left: 'x = 5', right: '10' }
    ],
    rightOptions: ['2', '4', '6', '8', '10'],
    explanation: 'f(1)=2, f(3)=6, f(5)=10 menggunakan aturan f(x)=2x. ✅'
  },
  {
    id: 32, type: 'MCQ', level: 'C3',
    title: '📊 Banyak Relasi dari A ke B',
    question: 'Jika n(A) = 2 dan n(B) = 3, berapakah banyak relasi yang mungkin dari A ke B?',
    options: ['8', '16', '32', '64'],
    correct: '64',
    explanation: 'Banyak relasi = 2^(n(A)×n(B)) = 2^(2×3) = 2^6 = 64. ✅'
  },
  {
    id: 33, type: 'TRUE_FALSE', level: 'C3',
    title: '🔍 Injektif di Bilangan Real',
    question: 'Pernyataan: f(x) = x² bersifat injektif pada domain semua bilangan real (ℝ).',
    options: ['Benar', 'Salah'],
    correct: 'Salah',
    explanation: 'f(−2) = f(2) = 4 → dua nilai x berbeda menghasilkan y sama → BUKAN injektif di ℝ. ✅'
  },
  {
    id: 34, type: 'MCQ', level: 'C3',
    title: '📐 Range Nilai Mutlak',
    question: 'Tentukan Range dari f(x) = |x| dengan domain {−3, −1, 0, 2, 4}.',
    options: ['{0,1,2,3,4}', '{−3,−1,0,2,4}', '{1,2,3,4}', '{0,2,4}'],
    correct: '{0,1,2,3,4}',
    explanation: '|−3|=3, |−1|=1, |0|=0, |2|=2, |4|=4. Range = {0,1,2,3,4}. ✅'
  },
  {
    id: 35, type: 'MATCHING', level: 'C3',
    title: '🧩 Pasangkan Rumus & Nilai (x=2)',
    question: 'Diketahui x = 2. Pasangkan setiap rumus fungsi dengan nilai yang dihasilkan!',
    pairs: [
      { left: 'f(x) = x + 5', right: '7' },
      { left: 'f(x) = 3x − 1', right: '5' },
      { left: 'f(x) = x²', right: '4' }
    ],
    rightOptions: ['4', '5', '7', '10'],
    explanation: 'x=2: (x+5)=7, (3x−1)=5, x²=4. ✅'
  },

  // ══════════════════════════════════════════════════
  // C4 — ANALISIS (Soal 36–70)
  // ══════════════════════════════════════════════════

  {
    id: 36, type: 'MCQ_COMPLEX', level: 'C4',
    title: '❌ Identifikasi Bukan Fungsi',
    question: 'Pilih SEMUA relasi berikut yang BUKAN merupakan fungsi dari A ke B!',
    options: [
      'A. {(1,2),(1,3),(2,5)}',
      'B. {(1,a),(2,b),(3,c)}',
      'C. {(2,4),(2,6),(3,9)}',
      'D. {(1,5),(2,5),(3,5)}'
    ],
    correctMultiple: ['A. {(1,2),(1,3),(2,5)}', 'C. {(2,4),(2,6),(3,9)}'],
    explanation: 'A: elemen 1 punya 2 pasangan. C: elemen 2 punya 2 pasangan. Keduanya melanggar syarat fungsi. ✅'
  },
  {
    id: 37, type: 'MCQ', level: 'C4',
    title: '🏆 Identifikasi Fungsi Bijektif',
    question: 'A={1,2,3} dan B={a,b,c}. Pemetaan manakah yang merupakan fungsi bijektif?',
    options: [
      '1→a, 2→a, 3→b',
      '1→a, 2→b, 3→c',
      '1→a, 2→b, 3→a',
      '1→a, 2→b'
    ],
    correct: '1→a, 2→b, 3→c',
    explanation: 'Bijektif: setiap elemen A dan B berpasangan tepat satu-satu. Hanya pilihan 2 memenuhi syarat ini. ✅'
  },
  {
    id: 38, type: 'MCQ_COMPLEX', level: 'C4',
    title: '✅ Syarat Agar Relasi Menjadi Fungsi',
    question: 'Pilih SEMUA pernyataan yang merupakan syarat wajib agar sebuah relasi disebut Fungsi!',
    options: [
      'A. Setiap elemen domain harus memiliki pasangan',
      'B. Setiap elemen domain berpasangan tepat satu elemen kodomain',
      'C. Setiap elemen kodomain harus memiliki pasangan',
      'D. Tidak ada elemen domain yang bercabang ke lebih dari satu kodomain'
    ],
    correctMultiple: [
      'A. Setiap elemen domain harus memiliki pasangan',
      'B. Setiap elemen domain berpasangan tepat satu elemen kodomain',
      'D. Tidak ada elemen domain yang bercabang ke lebih dari satu kodomain'
    ],
    explanation: 'A, B, dan D adalah syarat fungsi. C tidak wajib — elemen kodomain boleh tidak berpasangan (tidak surjektif). ✅'
  },
  {
    id: 39, type: 'TRUE_FALSE', level: 'C4',
    title: '🔗 Bijektif → Surjektif',
    question: 'Pernyataan: Setiap fungsi bijektif pasti merupakan fungsi surjektif.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Bijektif = injektif DAN surjektif sekaligus. Bijektif sudah mencakup surjektif. ✅'
  },
  {
    id: 40, type: 'MCQ', level: 'C4',
    title: '🔬 Klasifikasi Jenis Fungsi',
    question: 'f: A→B, A={1,2,3}, B={a,b,c,d}; 1→a, 2→b, 3→c. Elemen d tidak berpasangan. Fungsi ini termasuk?',
    options: ['Injektif saja', 'Surjektif saja', 'Bijektif', 'Bukan fungsi'],
    correct: 'Injektif saja',
    explanation: 'Setiap B menerima maks. 1 panah (injektif ✅). Tapi elemen d tidak berpasangan → bukan surjektif ❌. Jadi hanya injektif. ✅'
  },
  {
    id: 41, type: 'MCQ_COMPLEX', level: 'C4',
    title: '🔍 Ciri Fungsi Injektif',
    question: 'Pilih SEMUA pernyataan yang merupakan ciri fungsi injektif (satu-satu)!',
    options: [
      'A. Tidak ada dua elemen berbeda di A yang memiliki bayangan sama di B',
      'B. Semua elemen B memiliki pasangan dari A',
      'C. Jika f(x₁) = f(x₂), maka x₁ = x₂',
      'D. Setiap elemen B menerima maksimal satu panah dari A'
    ],
    correctMultiple: [
      'A. Tidak ada dua elemen berbeda di A yang memiliki bayangan sama di B',
      'C. Jika f(x₁) = f(x₂), maka x₁ = x₂',
      'D. Setiap elemen B menerima maksimal satu panah dari A'
    ],
    explanation: 'A, C, D adalah definisi ekuivalen injektif. B adalah syarat surjektif. ✅'
  },
  {
    id: 42, type: 'MATCHING', level: 'C4',
    title: '🏷️ Pasangkan Contoh ke Jenis Fungsi',
    question: 'Pasangkan setiap pemetaan dengan jenis fungsinya!',
    pairs: [
      { left: 'A={1,2,3}, B={a,b,c,d}; 1→a,2→b,3→c', right: 'Injektif' },
      { left: 'A={1,2,3}, B={a,b}; 1→a,2→b,3→b', right: 'Surjektif' },
      { left: 'A={1,2,3}, B={a,b,c}; 1→a,2→b,3→c', right: 'Bijektif' }
    ],
    rightOptions: ['Injektif', 'Surjektif', 'Bijektif', 'Bukan Fungsi'],
    explanation: 'Injektif: ada B tidak berpasangan tapi tidak ada B yang >1 panah. Surjektif: semua B berpasangan. Bijektif: 1-1 sempurna. ✅'
  },
  {
    id: 43, type: 'MCQ', level: 'C4',
    title: '🔢 Hitung Fungsi Bijektif',
    question: 'Jika n(A) = 3 dan n(B) = 3, berapakah banyak fungsi bijektif yang mungkin dari A ke B?',
    options: ['3', '6', '9', '27'],
    correct: '6',
    explanation: 'Banyak fungsi bijektif = n! = 3! = 6 (sama dengan banyak korespondensi 1-1). ✅'
  },
  {
    id: 44, type: 'MCQ_COMPLEX', level: 'C4',
    title: '🌐 Ciri Fungsi Surjektif',
    question: 'Pilih SEMUA yang merupakan ciri khas fungsi surjektif (onto/pada)!',
    options: [
      'A. Range = Kodomain',
      'B. Setiap elemen B memiliki setidaknya satu pasangan dari A',
      'C. Tidak ada elemen B yang tidak berpasangan',
      'D. Setiap elemen A memiliki pasangan unik di B'
    ],
    correctMultiple: [
      'A. Range = Kodomain',
      'B. Setiap elemen B memiliki setidaknya satu pasangan dari A',
      'C. Tidak ada elemen B yang tidak berpasangan'
    ],
    explanation: 'A, B, C adalah definisi surjektif: semua elemen B tercakup (Range = Kodomain). D adalah syarat injektif. ✅'
  },
  {
    id: 45, type: 'TRUE_FALSE', level: 'C4',
    title: '🔗 Bijektif → Injektif',
    question: 'Pernyataan: Semua fungsi bijektif pasti merupakan fungsi injektif.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Bijektif = injektif ∩ surjektif. Sehingga bijektif sudah pasti injektif. ✅'
  },
  {
    id: 46, type: 'MCQ', level: 'C4',
    title: '🔀 Analisis Komposisi Fungsi',
    question: 'Jika f(x) = 2x − 1 dan g(x) = x + 4, berapakah (g∘f)(3)?',
    options: ['9', '10', '11', '7'],
    correct: '9',
    explanation: '(g∘f)(3) = g(f(3)) = g(2(3)−1) = g(5) = 5+4 = 9. ✅'
  },
  {
    id: 47, type: 'MCQ_COMPLEX', level: 'C4',
    title: '🔑 Pernyataan Benar tentang Korespondensi',
    question: 'Pilih SEMUA pernyataan yang BENAR tentang korespondensi satu-satu!',
    options: [
      'A. Syaratnya n(A) = n(B)',
      'B. Merupakan fungsi bijektif',
      'C. Setiap elemen A berpasangan tepat satu elemen B dan sebaliknya',
      'D. Dapat terjadi meski n(A) ≠ n(B)'
    ],
    correctMultiple: [
      'A. Syaratnya n(A) = n(B)',
      'B. Merupakan fungsi bijektif',
      'C. Setiap elemen A berpasangan tepat satu elemen B dan sebaliknya'
    ],
    explanation: 'Korespondensi 1-1: n(A)=n(B), merupakan bijektif, dan bersifat 1-1 dua arah. D adalah salah. ✅'
  },
  {
    id: 48, type: 'TRUE_FALSE', level: 'C4',
    title: '📐 Domain Tidak Harus Bilangan Bulat',
    question: 'Pernyataan: Domain suatu fungsi harus selalu berupa himpunan bilangan bulat.',
    options: ['Benar', 'Salah'],
    correct: 'Salah',
    explanation: 'Domain bisa berupa sembarang himpunan: bilangan real, huruf, nama kota, dll. Tidak harus bilangan bulat. ✅'
  },
  {
    id: 49, type: 'MATCHING', level: 'C4',
    title: '📚 Definisi Konsep Fungsi',
    question: 'Pasangkan setiap konsep dengan definisi yang paling tepat!',
    pairs: [
      { left: 'Fungsi Injektif', right: 'Jika f(a)=f(b) maka a=b' },
      { left: 'Fungsi Surjektif', right: 'Range sama dengan Kodomain' },
      { left: 'Invers Fungsi', right: 'Kebalikan dari pemetaan f' }
    ],
    rightOptions: [
      'Jika f(a)=f(b) maka a=b',
      'Range sama dengan Kodomain',
      'Kebalikan dari pemetaan f',
      'Pemetaan dari himpunan kosong'
    ],
    explanation: 'Definisi injektif, surjektif, dan invers fungsi yang tepat. ✅'
  },
  {
    id: 50, type: 'MCQ', level: 'C4',
    title: '⚖️ Relasi vs Fungsi',
    question: 'Apa perbedaan utama antara Relasi dan Fungsi dari A ke B?',
    options: [
      'Relasi boleh kosong, Fungsi tidak boleh kosong',
      'Fungsi mensyaratkan setiap elemen A berpasangan tepat satu elemen B',
      'Relasi hanya bisa direpresentasikan dengan diagram panah',
      'Fungsi hanya berlaku untuk bilangan'
    ],
    correct: 'Fungsi mensyaratkan setiap elemen A berpasangan tepat satu elemen B',
    explanation: 'Relasi adalah pasangan berurutan sembarang. Fungsi adalah relasi khusus: setiap elemen A berpasangan TEPAT SATU ke B. ✅'
  },
  {
    id: 51, type: 'MCQ_COMPLEX', level: 'C4',
    title: '🗺️ Semua Representasi Fungsi',
    question: 'Pilih SEMUA cara yang valid untuk merepresentasikan sebuah fungsi!',
    options: [
      'A. Diagram panah',
      'B. Himpunan pasangan berurutan',
      'C. Tabel nilai x dan y',
      'D. Grafik Cartesius'
    ],
    correctMultiple: [
      'A. Diagram panah',
      'B. Himpunan pasangan berurutan',
      'C. Tabel nilai x dan y',
      'D. Grafik Cartesius'
    ],
    explanation: 'Semua empat cara tersebut adalah representasi valid untuk fungsi! ✅'
  },
  {
    id: 52, type: 'TRUE_FALSE', level: 'C4',
    title: '🤔 Fungsi Konstan & Surjektif',
    question: 'Pernyataan: Fungsi konstan f(x) = 5 adalah fungsi surjektif jika Kodomain = {5}.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Jika Kodomain = {5}, maka elemen 5 berpasangan. Range = {5} = Kodomain → surjektif. ✅'
  },
  {
    id: 53, type: 'MCQ', level: 'C4',
    title: '🔍 Identifikasi Fungsi dari Pasangan',
    question: 'Dari 4 himpunan berikut, manakah yang merupakan fungsi dari A={1,2,3}?',
    options: [
      '{(1,a),(2,b),(3,c),(1,d)}',
      '{(1,a),(2,a),(3,a)}',
      '{(1,a),(2,b)}',
      '{(1,a),(2,b),(3,c),(2,d)}'
    ],
    correct: '{(1,a),(2,a),(3,a)}',
    explanation: 'Pilihan 2: semua elemen A (1,2,3) berpasangan tepat satu ke B. Pilihan lain: ada yang bercabang atau ada A yang tidak berpasangan. ✅'
  },
  {
    id: 54, type: 'MCQ_COMPLEX', level: 'C4',
    title: '🔗 Sifat Relasi Ekuivalen',
    question: 'Pilih SEMUA sifat yang harus dimiliki relasi ekuivalen!',
    options: [
      'A. Refleksif: (a,a) ∈ R untuk semua a',
      'B. Simetri: jika (a,b) ∈ R maka (b,a) ∈ R',
      'C. Transitif: jika (a,b) dan (b,c) ∈ R maka (a,c) ∈ R',
      'D. Antisimetri: jika (a,b) dan (b,a) ∈ R maka a=b'
    ],
    correctMultiple: [
      'A. Refleksif: (a,a) ∈ R untuk semua a',
      'B. Simetri: jika (a,b) ∈ R maka (b,a) ∈ R',
      'C. Transitif: jika (a,b) dan (b,c) ∈ R maka (a,c) ∈ R'
    ],
    explanation: 'Relasi ekuivalen: Refleksif + Simetri + Transitif. Antisimetri adalah sifat relasi order parsial. ✅'
  },
  {
    id: 55, type: 'MATCHING', level: 'C4',
    title: '🔬 Identifikasi Jenis f(x) pada ℕ',
    question: 'Pasangkan setiap fungsi dengan jenis yang paling tepat pada domain ℕ ke ℕ!',
    pairs: [
      { left: 'f(x) = 2x', right: 'Injektif (bukan surjektif)' },
      { left: 'f(x) = x', right: 'Bijektif' },
      { left: 'f(x) = 1 untuk semua x', right: 'Bukan injektif, bukan bijektif' }
    ],
    rightOptions: ['Injektif (bukan surjektif)', 'Bijektif', 'Bukan injektif, bukan bijektif', 'Surjektif (bukan injektif)'],
    explanation: 'f(x)=2x: injektif (bilangan ganjil tidak tercakup). f(x)=x: bijektif. f(x)=1: bukan injektif (semua ke 1). ✅'
  },
  {
    id: 56, type: 'TRUE_FALSE', level: 'C4',
    title: '📐 Fungsi Kubik Bijektif di ℝ',
    question: 'Pernyataan: f(x) = x³ adalah fungsi bijektif pada domain dan kodomain bilangan real (ℝ).',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'f(x)=x³ injektif (x₁³≠x₂³ jika x₁≠x₂) dan surjektif (setiap y ∈ ℝ punya pasangan x=∛y). Bijektif. ✅'
  },
  {
    id: 57, type: 'MCQ', level: 'C4',
    title: '🔄 Pengaruh Perubahan Domain',
    question: 'f(x) = x² dari ℝ ke ℝ bukan injektif. Jika domain diubah menjadi [0,∞), sifatnya menjadi?',
    options: [
      'Tetap bukan injektif',
      'Menjadi injektif',
      'Menjadi bijektif',
      'Menjadi surjektif saja'
    ],
    correct: 'Menjadi injektif',
    explanation: 'Pada domain [0,∞), setiap x≥0 menghasilkan f(x) yang unik. Tidak ada dua x berbeda yang menghasilkan nilai sama → injektif. ✅'
  },
  {
    id: 58, type: 'MCQ_COMPLEX', level: 'C4',
    title: '🔎 Diagram Panah: Mana yang Fungsi?',
    question: 'Pilih SEMUA diagram panah yang menggambarkan fungsi yang VALID dari A ke B!',
    options: [
      'A. Setiap elemen A memiliki tepat satu panah ke B',
      'B. Satu elemen A memiliki dua panah ke dua elemen B berbeda',
      'C. Satu elemen A tidak memiliki panah ke manapun',
      'D. Beberapa elemen B tidak menerima panah, tapi semua A berpanah tepat satu'
    ],
    correctMultiple: [
      'A. Setiap elemen A memiliki tepat satu panah ke B',
      'D. Beberapa elemen B tidak menerima panah, tapi semua A berpanah tepat satu'
    ],
    explanation: 'A dan D memenuhi syarat fungsi. B (satu A ke dua B) dan C (ada A tanpa panah) melanggar syarat fungsi. ✅'
  },
  {
    id: 59, type: 'TRUE_FALSE', level: 'C4',
    title: '🔢 Range f(x)=2x+1 pada ℤ',
    question: 'Pernyataan: Range dari f(x) = 2x + 1 dengan domain bilangan bulat (ℤ) adalah seluruh bilangan ganjil.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: '2x selalu genap → 2x+1 selalu ganjil. Setiap bilangan ganjil n = 2k+1 untuk k∈ℤ. Range = semua bilangan ganjil. ✅'
  },
  {
    id: 60, type: 'MCQ', level: 'C4',
    title: '🏷️ Fungsi Identitas',
    question: 'Fungsi identitas I(x) = x dari ℕ ke ℕ termasuk jenis fungsi apa?',
    options: ['Injektif saja', 'Surjektif saja', 'Bijektif', 'Bukan fungsi'],
    correct: 'Bijektif',
    explanation: 'I(x)=x: setiap bilangan natural dipetakan ke dirinya → injektif dan surjektif → bijektif. ✅'
  },
  {
    id: 61, type: 'MCQ_COMPLEX', level: 'C4',
    title: '❌ Bukan Syarat Korespondensi',
    question: 'Pilih SEMUA yang BUKAN merupakan syarat korespondensi satu-satu antara A dan B!',
    options: [
      'A. n(A) = n(B)',
      'B. n(A) > n(B)',
      'C. n(A) < n(B)',
      'D. Setiap elemen A berpasangan tepat satu ke B'
    ],
    correctMultiple: [
      'B. n(A) > n(B)',
      'C. n(A) < n(B)'
    ],
    explanation: 'Syarat korespondensi 1-1: n(A)=n(B) dan pemetaan bijektif. Jika n(A)≠n(B), korespondensi 1-1 tidak bisa terbentuk. ✅'
  },
  {
    id: 62, type: 'MATCHING', level: 'C4',
    title: '🔬 Klasifikasi Fungsi Lanjut',
    question: 'Analisis dan pasangkan deskripsi pemetaan dengan jenis yang tepat!',
    pairs: [
      { left: 'Semua B berpasangan, ada B terima >1 panah', right: 'Surjektif (bukan bijektif)' },
      { left: 'Semua A dipetakan ke satu nilai B yang sama', right: 'Fungsi Konstan' },
      { left: 'Setiap pasangan A-B unik dan semua B terpakai', right: 'Bijektif' }
    ],
    rightOptions: ['Surjektif (bukan bijektif)', 'Fungsi Konstan', 'Bijektif', 'Injektif (bukan surjektif)'],
    explanation: 'Surjektif bila semua B terpetakan (termasuk >1 panah). Konstan bila semua A ke satu B. Bijektif bila 1-1 sempurna. ✅'
  },
  {
    id: 63, type: 'TRUE_FALSE', level: 'C4',
    title: '🎯 Identitas Selalu Bijektif',
    question: 'Pernyataan: Fungsi identitas I(x) = x pada sembarang himpunan A selalu merupakan fungsi bijektif.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'I(x)=x memetakan setiap elemen ke dirinya sendiri → 1-1 (injektif) dan semua elemen terpetakan (surjektif) → bijektif. ✅'
  },
  {
    id: 64, type: 'MCQ', level: 'C4',
    title: '📊 Banyak Fungsi n(A)=3, n(B)=2',
    question: 'Jika n(A) = 3 dan n(B) = 2, berapakah banyak fungsi yang mungkin dari A ke B?',
    options: ['6', '8', '9', '4'],
    correct: '8',
    explanation: 'Banyak fungsi = n(B)^n(A) = 2³ = 8. Setiap 3 elemen A bisa ke salah satu dari 2 elemen B. ✅'
  },
  {
    id: 65, type: 'MCQ_COMPLEX', level: 'C4',
    title: '✅ Ciri Relasi Berupa Fungsi',
    question: 'Pilih SEMUA ciri yang menunjukkan bahwa relasi R dari A ke B adalah fungsi!',
    options: [
      'A. Setiap elemen A muncul tepat sekali sebagai komponen pertama',
      'B. Tidak ada elemen A yang memiliki dua pasangan berbeda',
      'C. Semua elemen B muncul sebagai komponen kedua',
      'D. Semua elemen A memiliki pasangan (tidak ada yang tertinggal)'
    ],
    correctMultiple: [
      'A. Setiap elemen A muncul tepat sekali sebagai komponen pertama',
      'B. Tidak ada elemen A yang memiliki dua pasangan berbeda',
      'D. Semua elemen A memiliki pasangan (tidak ada yang tertinggal)'
    ],
    explanation: 'A, B, D adalah syarat fungsi. C adalah syarat surjektif (tidak wajib untuk semua fungsi). ✅'
  },
  {
    id: 66, type: 'TRUE_FALSE', level: 'C4',
    title: '🔢 Konsekuensi Korespondensi 1-1',
    question: 'Pernyataan: Jika antara A dan B terdapat korespondensi satu-satu, maka n(A) = n(B).',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Korespondensi 1-1 = bijektif: setiap elemen A dipasangkan tepat ke satu elemen B dan sebaliknya → n(A) = n(B). ✅'
  },
  {
    id: 67, type: 'MCQ', level: 'C4',
    title: '🔀 Komposisi Fungsi Lanjut',
    question: 'Jika f(x) = x² dan g(x) = 3x + 1, berapakah (f∘g)(2)?',
    options: ['49', '25', '13', '37'],
    correct: '49',
    explanation: '(f∘g)(2) = f(g(2)) = f(3(2)+1) = f(7) = 7² = 49. ✅'
  },
  {
    id: 68, type: 'MATCHING', level: 'C4',
    title: '📖 Pasangkan Definisi ke Istilah',
    question: 'Pasangkan setiap definisi dengan istilah yang tepat!',
    pairs: [
      { left: 'Himpunan semua nilai x yang boleh dimasukkan', right: 'Domain' },
      { left: 'Himpunan semua nilai y yang benar-benar dihasilkan', right: 'Range' },
      { left: 'Himpunan semua nilai y yang mungkin dihasilkan', right: 'Kodomain' }
    ],
    rightOptions: ['Domain', 'Range', 'Kodomain', 'Himpunan Semesta'],
    explanation: 'Domain=nilai x yang boleh masuk, Range=nilai y yang benar-benar keluar, Kodomain=semua y yang mungkin keluar. ✅'
  },
  {
    id: 69, type: 'MCQ_COMPLEX', level: 'C4',
    title: '🏆 Identifikasi Semua Bijektif',
    question: 'Pilih SEMUA pemetaan yang merupakan fungsi BIJEKTIF dari A={1,2,3} ke B={a,b,c}!',
    options: [
      'A. 1→a, 2→b, 3→c',
      'B. 1→b, 2→c, 3→a',
      'C. 1→a, 2→a, 3→b',
      'D. 1→c, 2→a, 3→b'
    ],
    correctMultiple: [
      'A. 1→a, 2→b, 3→c',
      'B. 1→b, 2→c, 3→a',
      'D. 1→c, 2→a, 3→b'
    ],
    explanation: 'A, B, D: setiap elemen A dan B berpasangan tepat satu. C: elemen a menerima 2 panah, b tidak berpasangan → bukan bijektif. ✅'
  },
  {
    id: 70, type: 'TRUE_FALSE', level: 'C4',
    title: '📐 Nilai Mutlak Bukan Injektif',
    question: 'Pernyataan: f(x) = |x| adalah fungsi injektif pada domain semua bilangan real (ℝ).',
    options: ['Benar', 'Salah'],
    correct: 'Salah',
    explanation: 'f(3) = |3| = 3 dan f(−3) = |−3| = 3 → dua nilai berbeda menghasilkan output sama → BUKAN injektif. ✅'
  },

  // ══════════════════════════════════════════════════
  // C5 — EVALUASI (Soal 71–100)
  // ══════════════════════════════════════════════════

  {
    id: 71, type: 'MCQ_COMPLEX', level: 'C5',
    title: '🧑‍⚖️ Evaluasi Pernyataan Range',
    question: 'Pilih SEMUA pernyataan yang VALID (benar) tentang Range suatu fungsi!',
    options: [
      'A. Range ⊆ Kodomain selalu berlaku',
      'B. Range = Kodomain hanya jika fungsi surjektif',
      'C. Range bisa lebih besar dari Kodomain',
      'D. Range bisa berupa himpunan kosong jika domain kosong'
    ],
    correctMultiple: [
      'A. Range ⊆ Kodomain selalu berlaku',
      'B. Range = Kodomain hanya jika fungsi surjektif',
      'D. Range bisa berupa himpunan kosong jika domain kosong'
    ],
    explanation: 'A benar (range selalu subset kodomain), B benar (definisi surjektif), D benar (domain kosong → range kosong). C salah karena range tidak bisa melebihi kodomain. ✅'
  },
  {
    id: 72, type: 'MCQ', level: 'C5',
    title: '🎨 Pilih Representasi Terbaik',
    question: 'Peneliti ingin menampilkan hubungan usia dan tinggi badan 100 siswa. Representasi fungsi manakah yang paling tepat?',
    options: [
      'Diagram panah dari A ke B',
      'Himpunan pasangan berurutan',
      'Grafik Cartesius (scatter plot)',
      'Tabel dengan 2 kolom'
    ],
    correct: 'Grafik Cartesius (scatter plot)',
    explanation: 'Untuk 100 titik data kontinu, grafik Cartesius paling informatif: memperlihatkan tren, pola, dan distribusi data secara visual. ✅'
  },
  {
    id: 73, type: 'TRUE_FALSE', level: 'C5',
    title: '⚖️ Evaluasi Klaim Surjektif',
    question: 'Evaluasi: "f(x) = x² dari ℝ ke ℝ bersifat surjektif karena setiap bilangan real memiliki akar kuadrat."',
    options: ['Pernyataan ini Benar', 'Pernyataan ini Salah'],
    correct: 'Pernyataan ini Salah',
    explanation: 'f(x)=x² tidak pernah menghasilkan nilai negatif. Bilangan negatif seperti −4 tidak memiliki pasangan x ∈ ℝ. BUKAN surjektif ke ℝ. ✅'
  },
  {
    id: 74, type: 'MCQ_COMPLEX', level: 'C5',
    title: '🚨 Temukan Pernyataan Salah',
    question: 'Siswa membuat 4 pernyataan. Pilih SEMUA yang SALAH!',
    options: [
      'A. "Setiap relasi adalah fungsi"',
      'B. "Setiap fungsi adalah relasi"',
      'C. "Range dan Kodomain selalu sama"',
      'D. "Fungsi bijektif pasti injektif dan surjektif"'
    ],
    correctMultiple: [
      'A. "Setiap relasi adalah fungsi"',
      'C. "Range dan Kodomain selalu sama"'
    ],
    explanation: 'A salah: ada relasi bukan fungsi (elemen A bercabang). C salah: range=kodomain hanya jika surjektif. B dan D benar. ✅'
  },
  {
    id: 75, type: 'MATCHING', level: 'C5',
    title: '⚖️ Justifikasi Konsep',
    question: 'Evaluasi dan pasangkan setiap situasi dengan kesimpulan yang tepat!',
    pairs: [
      { left: 'n(A)=3, n(B)=2: apakah bijektif bisa terbentuk?', right: 'Tidak bisa (n(A) ≠ n(B))' },
      { left: 'Setiap b ∈ B menerima panah: apakah surjektif?', right: 'Ya, karena Range = Kodomain' },
      { left: 'f(1)=f(2)=5, domain={1,2}: apakah injektif?', right: 'Tidak, karena dua x berbeda ke satu y' }
    ],
    rightOptions: [
      'Tidak bisa (n(A) ≠ n(B))',
      'Ya, karena Range = Kodomain',
      'Tidak, karena dua x berbeda ke satu y',
      'Ya, selalu bijektif'
    ],
    explanation: 'Bijektif perlu n(A)=n(B). Surjektif bila semua B terpetakan. Injektif gagal bila dua x ke satu y. ✅'
  },
  {
    id: 76, type: 'MCQ', level: 'C5',
    title: '🔄 Evaluasi Modifikasi Domain-Kodomain',
    question: 'f(x) = x² dari ℝ ke ℝ bukan bijektif. Jika domain diubah ke [0,∞) dan kodomain ke [0,∞), kesimpulanmu?',
    options: [
      'Tetap bukan bijektif',
      'Menjadi bijektif karena injektif dan surjektif terpenuhi',
      'Hanya menjadi injektif',
      'Hanya menjadi surjektif'
    ],
    correct: 'Menjadi bijektif karena injektif dan surjektif terpenuhi',
    explanation: 'Di [0,∞): injektif (tidak ada dua x≥0 menghasilkan y sama) dan surjektif (setiap y≥0 punya pasangan x=√y). Bijektif. ✅'
  },
  {
    id: 77, type: 'MCQ_COMPLEX', level: 'C5',
    title: '🧪 Pernyataan yang Dapat Dibuktikan',
    question: 'Pilih SEMUA pernyataan yang dapat DIBUKTIKAN kebenarannya secara matematis!',
    options: [
      'A. Jika f dan g injektif, maka (f∘g) injektif',
      'B. Komposisi dua fungsi surjektif selalu surjektif',
      'C. Invers dari fungsi bijektif pasti bijektif',
      'D. Setiap fungsi memiliki invers'
    ],
    correctMultiple: [
      'A. Jika f dan g injektif, maka (f∘g) injektif',
      'B. Komposisi dua fungsi surjektif selalu surjektif',
      'C. Invers dari fungsi bijektif pasti bijektif'
    ],
    explanation: 'A, B, C dapat dibuktikan secara matematis. D salah: hanya fungsi bijektif yang memiliki invers. ✅'
  },
  {
    id: 78, type: 'TRUE_FALSE', level: 'C5',
    title: '🔬 Menambah Domain Bisa Rusak Injektif',
    question: 'Evaluasi: Menambahkan elemen baru ke domain fungsi injektif TIDAK selalu mempertahankan sifat injektif.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Benar. Jika elemen baru x₀ menghasilkan f(x₀) = f(x₁) yang sudah ada, injektif rusak. Contoh: f(x)=x² di ℕ injektif; tambah −1 → f(−1)=f(1)=1 → tidak injektif. ✅'
  },
  {
    id: 79, type: 'MCQ', level: 'C5',
    title: '🌍 Fungsi yang Tepat untuk Absensi',
    question: 'Sistem absensi memetakan setiap NISN ke nama siswa. Jenis fungsi yang paling tepat agar tidak ada kebingungan identitas?',
    options: [
      'Fungsi Konstan',
      'Fungsi Surjektif saja',
      'Fungsi Injektif (minimal)',
      'Relasi sembarang'
    ],
    correct: 'Fungsi Injektif (minimal)',
    explanation: 'Injektif: setiap NISN unik (tidak ada dua siswa dengan NISN sama). Ini mencegah kebingungan identitas. ✅'
  },
  {
    id: 80, type: 'MATCHING', level: 'C5',
    title: '⚖️ Evaluasi Konsistensi Implikasi',
    question: 'Evaluasi setiap pernyataan dan pasangkan dengan status benar/salahnya!',
    pairs: [
      { left: 'Bijektif ⟹ Injektif', right: 'Benar' },
      { left: 'Injektif ⟹ Bijektif', right: 'Salah' },
      { left: 'Surjektif ⟹ Bijektif', right: 'Salah' }
    ],
    rightOptions: ['Benar', 'Salah', 'Bergantung konteks'],
    explanation: 'Bijektif→Injektif (benar). Injektif→Bijektif (salah, bisa tidak surjektif). Surjektif→Bijektif (salah, bisa tidak injektif). ✅'
  },
  {
    id: 81, type: 'MCQ_COMPLEX', level: 'C5',
    title: '🧠 Pilih Argumen Valid',
    question: 'Pilih SEMUA argumen yang VALID secara logika matematika!',
    options: [
      'A. "f bijektif → f surjektif karena bijektif = injektif AND surjektif"',
      'B. "f injektif → f bijektif karena setiap elemen A punya pasangan unik"',
      'C. "Jika Range ⊊ Kodomain, maka f tidak surjektif"',
      'D. "n(A) < n(B) → tidak mungkin ada fungsi injektif dari A ke B"'
    ],
    correctMultiple: [
      'A. "f bijektif → f surjektif karena bijektif = injektif AND surjektif"',
      'C. "Jika Range ⊊ Kodomain, maka f tidak surjektif"'
    ],
    explanation: 'A valid (bijektif mencakup surjektif). C valid (surjektif ↔ Range=Kodomain). B salah (injektif tidak otomatis surjektif). D salah (bisa injektif dari A={1,2} ke B={1,2,3}). ✅'
  },
  {
    id: 82, type: 'MCQ', level: 'C5',
    title: '🔍 Evaluasi Klaim Bijektif Siswa',
    question: 'Siswa A mengklaim: "f(x) = 2x+1 dari ℤ ke ℤ adalah injektif, sehingga juga bijektif." Tanggapanmu?',
    options: [
      'Klaim benar, injektif pasti bijektif',
      'Klaim salah, karena f tidak surjektif (bilangan genap tidak tercakup)',
      'Klaim benar karena kodomainnya ℤ',
      'Klaim salah karena f bukan injektif'
    ],
    correct: 'Klaim salah, karena f tidak surjektif (bilangan genap tidak tercakup)',
    explanation: 'f(x)=2x+1 injektif ✅. Tapi bilangan genap tidak bisa dicapai → Range ≠ ℤ → bukan bijektif. ✅'
  },
  {
    id: 83, type: 'TRUE_FALSE', level: 'C5',
    title: '🔗 Komposisi Dua Injektif',
    question: 'Evaluasi: Jika f: B→C injektif dan g: A→B injektif, maka (f∘g): A→C juga injektif.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Bukti: (f∘g)(x₁)=(f∘g)(x₂) → f(g(x₁))=f(g(x₂)) → g(x₁)=g(x₂) (f injektif) → x₁=x₂ (g injektif). Jadi f∘g injektif. ✅'
  },
  {
    id: 84, type: 'MCQ', level: 'C5',
    title: '✏️ Evaluasi Definisi Siswa',
    question: 'Siswa mendefinisikan: "Fungsi adalah aturan yang menghubungkan A dengan B." Apa kelemahan definisi ini?',
    options: [
      'Tidak ada kelemahan, definisi ini sudah tepat',
      'Tidak menyebutkan syarat setiap elemen A wajib memiliki tepat satu pasangan',
      'Tidak menyebutkan bahwa A dan B harus bilangan',
      'Tidak menyebutkan bahwa B harus lebih besar dari A'
    ],
    correct: 'Tidak menyebutkan syarat setiap elemen A wajib memiliki tepat satu pasangan',
    explanation: 'Definisi siswa terlalu umum (sama dengan relasi). Fungsi harus mencakup: setiap elemen A berpasangan dengan TEPAT SATU elemen B. ✅'
  },
  {
    id: 85, type: 'MCQ_COMPLEX', level: 'C5',
    title: '🚫 Pernyataan Tidak Tepat Korespondensi',
    question: 'Pilih SEMUA pernyataan yang TIDAK TEPAT tentang korespondensi satu-satu!',
    options: [
      'A. Korespondensi 1-1 hanya bisa terjadi jika n(A) = n(B)',
      'B. Korespondensi 1-1 antara A dan B adalah jenis relasi, bukan fungsi',
      'C. Korespondensi 1-1 selalu menghasilkan Range = Kodomain',
      'D. Setiap fungsi bijektif adalah korespondensi satu-satu'
    ],
    correctMultiple: [
      'B. Korespondensi 1-1 antara A dan B adalah jenis relasi, bukan fungsi'
    ],
    explanation: 'B salah: korespondensi 1-1 ADALAH fungsi (bijektif). A, C, D benar secara definisi. ✅'
  },
  {
    id: 86, type: 'TRUE_FALSE', level: 'C5',
    title: '🎯 Surjektif dengan Kodomain {1}',
    question: 'Evaluasi: Jika f: A→{1} adalah fungsi surjektif, maka pasti f(x) = 1 untuk semua x ∈ A.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Kodomain = {1}, satu-satunya elemen. Agar surjektif, elemen 1 harus terpetakan. Agar fungsi, setiap x punya tepat satu pasangan. Satu-satunya pilihan: f(x)=1. ✅'
  },
  {
    id: 87, type: 'MCQ', level: 'C5',
    title: '🏅 Evaluasi Fungsi Identitas',
    question: 'f: A→A dengan f(x) = x untuk semua x ∈ A. Pernyataan yang paling tepat mengevaluasi sifat fungsi ini?',
    options: [
      'Injektif saja karena setiap x unik',
      'Surjektif saja karena semua elemen A terpetakan',
      'Bijektif karena injektif dan surjektif sekaligus',
      'Bukan fungsi karena f(x) = x tampak trivial'
    ],
    correct: 'Bijektif karena injektif dan surjektif sekaligus',
    explanation: 'I(x)=x adalah bijektif: setiap elemen dipetakan ke dirinya sendiri (injektif) dan setiap elemen A dicapai (surjektif). ✅'
  },
  {
    id: 88, type: 'MATCHING', level: 'C5',
    title: '🔗 Evaluasi Implikasi Lanjut',
    question: 'Pasangkan setiap kondisi dengan kesimpulan evaluasi yang paling tepat!',
    pairs: [
      { left: 'f bijektif dan g bijektif', right: '(f∘g) bijektif' },
      { left: 'Range ⊊ Kodomain', right: 'f tidak surjektif' },
      { left: 'Ada a₁≠a₂ dengan f(a₁)=f(a₂)', right: 'f tidak injektif' }
    ],
    rightOptions: [
      '(f∘g) bijektif',
      'f tidak surjektif',
      'f tidak injektif',
      'f selalu bijektif'
    ],
    explanation: 'Komposisi bijektif = bijektif. Range ⊊ Kodomain = tidak surjektif. Ada dua input ke satu output = tidak injektif. ✅'
  },
  {
    id: 89, type: 'MCQ_COMPLEX', level: 'C5',
    title: '🔬 Counter-Example Klaim',
    question: 'Klaim: "Semua fungsi injektif pasti bijektif." Pilih SEMUA yang bisa jadi counter-example!',
    options: [
      'A. f: ℕ→ℕ, f(x)=2x (injektif, bilangan ganjil tidak tercakup)',
      'B. f: {1,2,3}→{a,b,c}, 1→a,2→b,3→c (bijektif)',
      'C. f: ℤ→ℤ, f(x)=x+1 (injektif dan surjektif)',
      'D. f: {1,2}→{a,b,c}, 1→a,2→b (injektif, c tidak berpasangan)'
    ],
    correctMultiple: [
      'A. f: ℕ→ℕ, f(x)=2x (injektif, bilangan ganjil tidak tercakup)',
      'D. f: {1,2}→{a,b,c}, 1→a,2→b (injektif, c tidak berpasangan)'
    ],
    explanation: 'A dan D: fungsi injektif tapi tidak surjektif → tidak bijektif → counter-example valid. B dan C bijektif, tidak bisa jadi counter-example. ✅'
  },
  {
    id: 90, type: 'MCQ', level: 'C5',
    title: '✏️ Perbaikan Definisi Fungsi',
    question: 'Definisi awal: "Fungsi adalah relasi dari A ke B." Manakah perbaikan yang paling tepat dan lengkap?',
    options: [
      '"Fungsi adalah relasi yang sangat khusus"',
      '"Fungsi adalah relasi dari A ke B di mana setiap elemen A berpasangan dengan tepat satu elemen B"',
      '"Fungsi adalah relasi dari A ke B di mana setiap elemen B berpasangan dengan tepat satu elemen A"',
      '"Fungsi adalah relasi dari A ke B di mana n(A) = n(B)"'
    ],
    correct: '"Fungsi adalah relasi dari A ke B di mana setiap elemen A berpasangan dengan tepat satu elemen B"',
    explanation: 'Definisi tepat: SETIAP elemen domain (A) berpasangan dengan TEPAT SATU elemen kodomain (B). ✅'
  },
  {
    id: 91, type: 'TRUE_FALSE', level: 'C5',
    title: '🔁 Relasi dari A ke A Sendiri',
    question: 'Evaluasi: Relasi dari A ke A sendiri belum tentu merupakan fungsi.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Contoh: A={1,2}, relasi {(1,1),(1,2),(2,2)} dari A ke A adalah relasi tapi bukan fungsi (elemen 1 bercabang ke 1 dan 2). ✅'
  },
  {
    id: 92, type: 'MCQ_COMPLEX', level: 'C5',
    title: '📊 Implikasi Perubahan n(A) pada n(B)=4',
    question: 'n(B) = 4. Pilih SEMUA pernyataan yang BENAR!',
    options: [
      'A. Jika n(A) = 4, fungsi bijektif mungkin terbentuk',
      'B. Jika n(A) > 4, tidak mungkin ada fungsi injektif dari A ke B',
      'C. Jika n(A) < 4, tidak mungkin ada fungsi surjektif dari A ke B',
      'D. Jika n(A) = 2, banyak fungsi yang mungkin adalah n(B)^n(A) = 4² = 16'
    ],
    correctMultiple: [
      'A. Jika n(A) = 4, fungsi bijektif mungkin terbentuk',
      'B. Jika n(A) > 4, tidak mungkin ada fungsi injektif dari A ke B',
      'C. Jika n(A) < 4, tidak mungkin ada fungsi surjektif dari A ke B',
      'D. Jika n(A) = 2, banyak fungsi yang mungkin adalah n(B)^n(A) = 4² = 16'
    ],
    explanation: 'A: bijektif butuh n(A)=n(B). B: injektif perlu n(A)≤n(B). C: surjektif perlu n(A)≥n(B). D: rumus banyak fungsi n(B)^n(A) = 4²=16 benar. ✅'
  },
  {
    id: 93, type: 'MCQ', level: 'C5',
    title: '🗣️ Evaluasi Argumen Siswa B',
    question: 'Siswa B: "Jika Range = Kodomain, maka fungsi pasti bijektif." Evaluasi!',
    options: [
      'Benar, karena Range=Kodomain adalah syarat bijektif',
      'Salah, Range=Kodomain hanya syarat surjektif, belum tentu injektif',
      'Benar, karena fungsi dengan range penuh pasti bijektif',
      'Salah, karena bijektif mensyaratkan Range ⊊ Kodomain'
    ],
    correct: 'Salah, Range=Kodomain hanya syarat surjektif, belum tentu injektif',
    explanation: 'Range=Kodomain → surjektif ✅. Tapi belum tentu injektif. Contoh: A={1,2,3}, B={a,b}, 1→a,2→b,3→a → surjektif tapi tidak injektif. ✅'
  },
  {
    id: 94, type: 'TRUE_FALSE', level: 'C5',
    title: '🔄 Invers Fungsi Bijektif',
    question: 'Evaluasi: Jika f: A→B adalah fungsi bijektif, maka inversnya f⁻¹: B→A juga merupakan fungsi bijektif.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Karena f bijektif (1-1 sempurna), f⁻¹ dapat didefinisikan dan juga bijektif: setiap elemen A berpasangan tepat satu ke B. ✅'
  },
  {
    id: 95, type: 'MATCHING', level: 'C5',
    title: '🧑‍⚖️ Pernyataan → Kesimpulan',
    question: 'Pasangkan setiap pernyataan dengan kesimpulan evaluasi yang TEPAT!',
    pairs: [
      { left: '"f dan g bijektif" → tentang f∘g', right: 'f∘g juga bijektif' },
      { left: '"f injektif, g surjektif" → tentang f∘g', right: 'Tidak bisa ditentukan' },
      { left: '"f bijektif" → tentang f⁻¹', right: 'f⁻¹ ada dan bijektif' }
    ],
    rightOptions: [
      'f∘g juga bijektif',
      'Tidak bisa ditentukan',
      'f⁻¹ ada dan bijektif',
      'f∘g pasti injektif saja'
    ],
    explanation: 'Komposisi bijektif = bijektif. Kombinasi injektif+surjektif pada f∘g bergantung urutan. Invers bijektif = bijektif. ✅'
  },
  {
    id: 96, type: 'MCQ', level: 'C5',
    title: '📖 Evaluasi Deskripsi Informal Fungsi',
    question: 'Guru mendeskripsikan: "Fungsi adalah mesin yang menerima satu input dan selalu menghasilkan satu output." Apakah tepat?',
    options: [
      'Tidak tepat, fungsi tidak selalu menghasilkan satu output',
      'Tepat dan mencakup semua aspek definisi formal fungsi',
      'Sebagian tepat: menggambarkan deterministik, tapi tidak mencakup syarat semua input harus terdefinisi',
      'Tidak tepat, karena fungsi bisa menerima banyak input sekaligus'
    ],
    correct: 'Sebagian tepat: menggambarkan deterministik, tapi tidak mencakup syarat semua input harus terdefinisi',
    explanation: 'Deskripsi guru menangkap sifat deterministik. Tapi belum menyebut bahwa SETIAP elemen domain harus memiliki tepat satu pasangan. ✅'
  },
  {
    id: 97, type: 'MCQ_COMPLEX', level: 'C5',
    title: '✅ Kesimpulan Valid dari Bijektif',
    question: 'Premis: "f: A→B adalah bijektif." Pilih SEMUA kesimpulan yang VALID!',
    options: [
      'A. n(A) = n(B)',
      'B. f memiliki invers f⁻¹: B→A yang juga bijektif',
      'C. Setiap elemen B memiliki tepat satu pasangan dari A',
      'D. Range f adalah himpunan bagian sejati dari B'
    ],
    correctMultiple: [
      'A. n(A) = n(B)',
      'B. f memiliki invers f⁻¹: B→A yang juga bijektif',
      'C. Setiap elemen B memiliki tepat satu pasangan dari A'
    ],
    explanation: 'A: bijektif ↔ n(A)=n(B). B: bijektif punya invers bijektif. C: bijektif = setiap B tepat satu pasangan. D salah: bijektif justru Range = B (bukan sejati ⊊). ✅'
  },
  {
    id: 98, type: 'TRUE_FALSE', level: 'C5',
    title: '🤔 Fungsi dengan Domain Kosong',
    question: 'Evaluasi: Fungsi dengan domain kosong (∅) adalah fungsi yang valid secara matematis.',
    options: ['Benar', 'Salah'],
    correct: 'Benar',
    explanation: 'Fungsi kosong f: ∅→B valid: syarat "setiap elemen domain berpasangan" dipenuhi secara vakum (tidak ada elemen yang melanggar). Range-nya juga ∅. ✅'
  },
  {
    id: 99, type: 'MCQ', level: 'C5',
    title: '🌍 Contoh Bijektif Terbaik di Dunia Nyata',
    question: 'Dari contoh berikut, manakah yang PALING TEPAT menggambarkan korespondensi satu-satu (bijektif)?',
    options: [
      'Nomor kursi bioskop ↔ nama penonton (tiket habis terjual, setiap kursi = 1 penonton)',
      'Nama siswa ↔ nilai ujian (beberapa siswa bisa dapat nilai sama)',
      'Nomor telepon ↔ pemilik (satu nomor bisa punya banyak pemilik)',
      'Nama jalan ↔ kota (satu nama jalan bisa ada di banyak kota)'
    ],
    correct: 'Nomor kursi bioskop ↔ nama penonton (tiket habis terjual, setiap kursi = 1 penonton)',
    explanation: 'Jika semua kursi terisi: setiap kursi tepat 1 penonton, setiap penonton tepat 1 kursi → bijektif. Pilihan lain tidak 1-1. ✅'
  },
  {
    id: 100, type: 'MATCHING', level: 'C5',
    title: '🏆 Evaluasi Akhir Master Detective!',
    question: 'Tantangan terakhir! Pasangkan setiap konsep dengan pernyataan evaluasi yang PALING AKURAT!',
    pairs: [
      { left: 'Fungsi Bijektif', right: 'Injektif AND Surjektif — pemetaan sempurna dua arah' },
      { left: 'Relasi bukan Fungsi', right: 'Ada elemen domain yang bercabang ke >1 elemen kodomain' },
      { left: 'Korespondensi Satu-Satu', right: 'Bijektif dengan n(A) = n(B): setiap elemen berpasangan unik' }
    ],
    rightOptions: [
      'Injektif AND Surjektif — pemetaan sempurna dua arah',
      'Ada elemen domain yang bercabang ke >1 elemen kodomain',
      'Bijektif dengan n(A) = n(B): setiap elemen berpasangan unik',
      'Surjektif tapi tidak injektif'
    ],
    explanation: 'Evaluasi final master: Bijektif = injektif+surjektif. Bukan fungsi = ada yang bercabang. Korespondensi 1-1 = bijektif sempurna. Selamat, Master Detektif! 🎉🦉'
  }

];

export default ENDLESS_QUESTIONS;
