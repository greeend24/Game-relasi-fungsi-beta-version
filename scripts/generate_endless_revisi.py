# scripts/generate_endless_revisi.py
# Generator for REVISI_BAGIAN_ENDLESS.md and updating endless questions data

import json

questions = [
    # ══════════════════════════════════════════════════════════════════════════
    # BAB 1: PENGERTIAN & PENYAJIAN RELASI (ENDLESS-001 s/d ENDLESS-020)
    # ══════════════════════════════════════════════════════════════════════════
    {
        "id": "ENDLESS-001",
        "materi": "Pengertian Relasi",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pernyataan: Relasi dari himpunan A ke himpunan B adalah suatu aturan yang memasangkan anggota-anggota himpunan A dengan anggota-anggota himpunan B.",
        "kunci": "Benar",
        "options": ["Benar", "Salah"],
        "feedback": "Tepat! Relasi adalah aturan yang menghubungkan elemen himpunan asal ke himpunan kawan.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-002",
        "materi": "Penyajian Relasi (Pasangan Berurutan)",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pada pasangan berurutan (x, y), unsur x menyatakan...",
        "options": ["Anggota himpunan asal", "Anggota himpunan kawan", "Aturan relasi", "Himpunan semesta"],
        "kunci": "Anggota himpunan asal",
        "feedback": "Benar! Unsur pertama x selalu berasal dari daerah asal (himpunan pertama).",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-003",
        "materi": "Aturan Relasi",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Diberikan pasangan: (2, 4), (3, 6), (5, 10). Aturan relasi yang tepat dari x ke y adalah...",
        "options": ["Setengah dari", "Dua kali dari", "Dua lebihnya dari", "Kuadrat dari"],
        "kunci": "Setengah dari",
        "feedback": "Tepat! 2 adalah setengah dari 4, 3 setengah dari 6, dan 5 setengah dari 10.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-004",
        "materi": "Aturan Relasi Angka",
        "jenis": "Input Angka",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Aturan relasi dari A ke B adalah 'tiga lebihnya dari'. Jika anggota A adalah 7, berapakah pasangannya di B?",
        "kunci": "4",
        "feedback": "Benar! Karena 7 adalah tiga lebihnya dari 4 (7 - 3 = 4).",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-005",
        "materi": "Deteksi Pasangan Relasi",
        "jenis": "Deteksi Kesalahan Singkat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Relasi 'faktor dari' dari {2, 3} ke {4, 6, 9}. Manakah pasangan yang SALAH di bawah ini?",
        "options": ["(2, 4)", "(2, 9)", "(3, 6)", "(3, 9)"],
        "kunci": "(2, 9)",
        "feedback": "Hebat! 2 bukan faktor dari 9, sehingga pasangan (2, 9) keliru.",
        "type": "DETECT_ERROR"
    },
    {
        "id": "ENDLESS-006",
        "materi": "Penyajian Relasi",
        "jenis": "Matching",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Jodohkan bentuk penyajian relasi dengan ciri visual utamanya!",
        "pairs": [
            {"left": "Diagram Panah", "right": "Dua kurva oval dengan tanda panah"},
            {"left": "Pasangan Berurutan", "right": "Kumpulan tanda kurung {(x, y)}"},
            {"left": "Diagram Cartesius", "right": "Titik noktah pada sumbu X dan Y"}
        ],
        "rightOptions": ["Dua kurva oval dengan tanda panah", "Kumpulan tanda kurung {(x, y)}", "Titik noktah pada sumbu X dan Y"],
        "kunci": "Diagram Panah -> Oval bertanda panah, Pasangan Berurutan -> {(x, y)}, Cartesius -> Titik noktah sumbu",
        "feedback": "Benar! Ketiga bentuk penyajian relasi dipasangkan dengan tepat.",
        "type": "MATCHING"
    },
    {
        "id": "ENDLESS-007",
        "materi": "Diagram Panah Relasi",
        "jenis": "Diagram Fungsi",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Hubungkan relasi 'dua kali dari' dari himpunan A = {2, 4} ke himpunan B = {1, 2, 3}!",
        "setA": [2, 4],
        "setB": [1, 2, 3],
        "correctPairs": ["2->1", "4->2"],
        "kunci": "2 -> 1, 4 -> 2",
        "feedback": "Sempurna! 2 adalah dua kali dari 1, dan 4 adalah dua kali dari 2.",
        "type": "ARROWS"
    },
    {
        "id": "ENDLESS-008",
        "materi": "Diagram Cartesius Relasi",
        "jenis": "Pilih Titik",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Pilih titik koordinat pada bidang Cartesius yang menyatakan relasi 'kuadrat dari' untuk x = 4 dan y = 2!",
        "minX": 0, "maxX": 5, "minY": 0, "maxY": 5,
        "targetPoints": [[4, 2]],
        "kunci": "(4, 2)",
        "feedback": "Tepat! Titik (4, 2) menyatakan 4 adalah kuadrat dari 2.",
        "type": "CARTESIAN"
    },
    {
        "id": "ENDLESS-009",
        "materi": "Relasi Himpunan",
        "jenis": "Drag & Drop",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Kelompokkan pasangan ke dalam relasi 'kurang dari' dari himpunan {1, 2} ke {2, 3}!",
        "targetCategory": "Termasuk Relasi Kurang Dari",
        "options": ["(1, 2)", "(1, 3)", "(2, 3)", "(2, 2)"],
        "kunci": ["(1, 2)", "(1, 3)", "(2, 3)"],
        "feedback": "Benar! 1 < 2, 1 < 3, dan 2 < 3. Pasangan (2, 2) tidak termasuk karena 2 tidak kurang dari 2.",
        "type": "DRAG_DROP"
    },
    {
        "id": "ENDLESS-010",
        "materi": "Tabel Relasi",
        "jenis": "Lengkapi Tabel",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Relasi 'tambah 5': Tabel pasangan (x, y). Jika x = 8, berapakah nilai y yang hilang?",
        "kunci": "13",
        "feedback": "Tepat! y = 8 + 5 = 13.",
        "type": "TABLE"
    },
    {
        "id": "ENDLESS-011",
        "materi": "Banyak Anggota Pasangan Relasi",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Diketahui A = {1, 3} dan B = {2, 4}. Berapa banyak kemungkinan SEMUA pasangan berurutan (produk cartesius) dari A ke B?",
        "kunci": "4",
        "feedback": "Benar! n(A x B) = 2 x 2 = 4 pasangan.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-012",
        "materi": "Relasi Kehidupan Sehari-hari",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Relasi 'makanan kesukaan' dari siswa ke menu makanan. Jika Andi suka Bakso dan Soto, apakah hal ini diperbolehkan dalam relasi?",
        "options": ["Boleh, relasi tidak membatasi jumlah pasangan", "Tidak boleh, harus memilih tepat satu", "Hanya boleh jika menu habis", "Harus sama dengan siswa lain"],
        "kunci": "Boleh, relasi tidak membatasi jumlah pasangan",
        "feedback": "Tepat! Dalam relasi umum, satu anggota asal bebas memiliki lebih dari satu pasangan.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-013",
        "materi": "Relasi Bilangan",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pernyataan: Pasangan berurutan (4, 2) menyatakan aturan relasi 'kelipatan dari' adalah BENAR.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! 4 adalah kelipatan dari 2 (4 = 2 x 2).",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-014",
        "materi": "Deteksi Kesalahan Pasangan",
        "jenis": "Deteksi Kesalahan Singkat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Relasi 'satu kurangnya dari'. Manakah pasangan yang SALAH di bawah ini?",
        "options": ["(2, 3)", "(4, 5)", "(7, 8)", "(6, 5)"],
        "kunci": "(6, 5)",
        "feedback": "Bagus! 6 bukan satu kurangnya dari 5, melainkan satu lebihnya. Harusnya (5, 6).",
        "type": "DETECT_ERROR"
    },
    {
        "id": "ENDLESS-015",
        "materi": "Matching Relasi Angka",
        "jenis": "Matching",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Cocokkan nilai x dengan pasangannya y pada relasi 'tiga kali dari' (x adalah tiga kali dari y)!",
        "pairs": [
            {"left": "6", "right": "2"},
            {"left": "9", "right": "3"},
            {"left": "15", "right": "5"}
        ],
        "rightOptions": ["2", "3", "5", "6"],
        "kunci": "6 -> 2, 9 -> 3, 15 -> 5",
        "feedback": "Mantap! 6 = 3x2, 9 = 3x3, dan 15 = 3x5.",
        "type": "MATCHING"
    },
    {
        "id": "ENDLESS-016",
        "materi": "Diagram Panah Relasi",
        "jenis": "Diagram Fungsi",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Hubungkan relasi 'faktor prima dari' untuk A = {3, 5} ke B = {6, 10}!",
        "setA": [3, 5],
        "setB": [6, 10],
        "correctPairs": ["3->6", "5->10"],
        "kunci": "3 -> 6, 5 -> 10",
        "feedback": "Tepat! 3 adalah faktor prima dari 6, dan 5 faktor prima dari 10.",
        "type": "ARROWS"
    },
    {
        "id": "ENDLESS-017",
        "materi": "Pilih Titik Cartesius",
        "jenis": "Pilih Titik",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Tandai titik (2, 5) yang menyatakan relasi 'tiga kurangnya dari' (2 adalah tiga kurangnya dari 5)!",
        "minX": 0, "maxX": 5, "minY": 0, "maxY": 6,
        "targetPoints": [[2, 5]],
        "kunci": "(2, 5)",
        "feedback": "Benar! Titik (2, 5) terpasang di koordinat yang tepat.",
        "type": "CARTESIAN"
    },
    {
        "id": "ENDLESS-018",
        "materi": "Relasi Kosong",
        "jenis": "Benar/Salah",
        "kesulitan": "Sedang (C2)",
        "pertanyaan": "Pernyataan: Pada relasi dari A ke B, diperbolehkan jika ada anggota himpunan A yang tidak mempunyai pasangan sama sekali di B.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Relasi tidak mensyaratkan setiap anggota asal harus memiliki pasangan.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-019",
        "materi": "Lengkapi Tabel Nilai",
        "jenis": "Lengkapi Tabel",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Relasi 'kuadrat dari' (x adalah kuadrat dari y): Jika x = 49, berapakah nilai bilangan asli y?",
        "kunci": "7",
        "feedback": "Tepat! 7 kuadrat adalah 49, sehingga 49 adalah kuadrat dari 7.",
        "type": "TABLE"
    },
    {
        "id": "ENDLESS-020",
        "materi": "Aturan Relasi dari Grafik",
        "jenis": "Jawab Cepat",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Titik-titik noktah pada Cartesius adalah (1, 2), (2, 3), (3, 4). Aturan relasi dari x ke y adalah...",
        "options": ["Satu kurangnya dari", "Satu lebihnya dari", "Dua kali dari", "Faktor dari"],
        "kunci": "Satu kurangnya dari",
        "feedback": "Keren! 1 adalah satu kurangnya dari 2, 2 satu kurangnya dari 3, dst.",
        "type": "MCQ"
    },

    # ══════════════════════════════════════════════════════════════════════════
    # BAB 2: PENGERTIAN & UNSUR FUNGSI (ENDLESS-021 s/d ENDLESS-040)
    # ══════════════════════════════════════════════════════════════════════════
    {
        "id": "ENDLESS-021",
        "materi": "Syarat Fungsi",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pernyataan: Suatu relasi disebut fungsi jika setiap anggota domain memiliki tepat satu pasangan di kodomain.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Syarat fungsi: semua anggota domain terpasang dan tidak ada yang bercabang.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-022",
        "materi": "Identifikasi Fungsi",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Manakah di antara relasi berikut yang merupakan FUNGSI?",
        "options": [
            "{(1, a), (2, b), (3, c)}",
            "{(1, a), (1, b), (2, c)}",
            "{(1, a), (2, b), (2, c)}",
            "{(1, a), (1, b), (1, c)}"
        ],
        "kunci": "{(1, a), (2, b), (3, c)}",
        "feedback": "Tepat! Himpunan domain {1, 2, 3} masing-masing muncul tepat satu kali.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-023",
        "materi": "Menentukan Domain",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Diberikan f = {(2, 4), (3, 9), (4, 16)}. Domain (daerah asal) dari f adalah...",
        "options": ["{2, 3, 4}", "{4, 9, 16}", "{2, 4, 9}", "{3, 4, 16}"],
        "kunci": "{2, 3, 4}",
        "feedback": "Benar! Domain adalah himpunan semua elemen pertama (x), yaitu {2, 3, 4}.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-024",
        "materi": "Menentukan Range",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Diberikan fungsi f = {(a, 1), (b, 2), (c, 2)}. Daerah hasil (range) dari f adalah...",
        "options": ["{1, 2}", "{a, b, c}", "{1, 2, 3}", "{2}"],
        "kunci": "{1, 2}",
        "feedback": "Tepat! Range adalah himpunan elemen kedua yang terpasang, yaitu {1, 2}.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-025",
        "materi": "Deteksi Pelanggaran Fungsi",
        "jenis": "Deteksi Kesalahan Singkat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Pasangan {(1, 4), (2, 5), (1, 6), (3, 7)} bukan fungsi. Manakah elemen domain yang melanggar syarat fungsi?",
        "options": ["Elemen 1 (bercabang ke 4 dan 6)", "Elemen 2", "Elemen 3", "Elemen 5"],
        "kunci": "Elemen 1 (bercabang ke 4 dan 6)",
        "feedback": "Hebat! Angka 1 muncul dua kali (bercabang), sehingga bukan fungsi.",
        "type": "DETECT_ERROR"
    },
    {
        "id": "ENDLESS-026",
        "materi": "Unsur Fungsi",
        "jenis": "Matching",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Jodohkan istilah unsur fungsi dengan artinya yang tepat!",
        "pairs": [
            {"left": "Domain", "right": "Daerah asal"},
            {"left": "Kodomain", "right": "Daerah kawan"},
            {"left": "Range", "right": "Daerah hasil"}
        ],
        "rightOptions": ["Daerah asal", "Daerah kawan", "Daerah hasil", "Daerah bayangan semesta"],
        "kunci": "Domain -> Daerah asal, Kodomain -> Daerah kawan, Range -> Daerah hasil",
        "feedback": "Bagus! Domain, kodomain, dan range terdefinisi secara tepat.",
        "type": "MATCHING"
    },
    {
        "id": "ENDLESS-027",
        "materi": "Diagram Panah Fungsi Konstan",
        "jenis": "Diagram Fungsi",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Bentuk fungsi konstan di mana setiap anggota A = {1, 2, 3} dipetakan ke angka 5 pada B = {4, 5}!",
        "setA": [1, 2, 3],
        "setB": [4, 5],
        "correctPairs": ["1->5", "2->5", "3->5"],
        "kunci": "1 -> 5, 2 -> 5, 3 -> 5",
        "feedback": "Sempurna! Semua anggota domain memiliki tepat satu pasangan yaitu 5.",
        "type": "ARROWS"
    },
    {
        "id": "ENDLESS-028",
        "materi": "Hitung Jumlah Anggota Range",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Fungsi f memetakan: f(1) = 3, f(2) = 4, f(3) = 3, f(4) = 4. Berapakah banyak anggota himpunan range-nya?",
        "kunci": "2",
        "feedback": "Benar! Range hanya memuat {3, 4}, jadi jumlah anggotanya adalah 2.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-029",
        "materi": "Klasifikasi Domain vs Range",
        "jenis": "Drag & Drop",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Kelompokkan unsur-unsur berikut dari relasi {(p, 7), (q, 8), (r, 9)} yang termasuk ke dalam DOMAIN!",
        "targetCategory": "Anggota Domain",
        "options": ["p", "q", "r", "7", "8"],
        "kunci": ["p", "q", "r"],
        "feedback": "Tepat! Domain adalah himpunan pertama yaitu {p, q, r}.",
        "type": "DRAG_DROP"
    },
    {
        "id": "ENDLESS-030",
        "materi": "Uji Garis Vertikal",
        "jenis": "Benar/Salah",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Pernyataan: Pada bidang koordinat, jika sebuah garis vertikal memotong grafik di lebih dari satu titik, maka grafik tersebut BUKAN fungsi.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Ini adalah Uji Garis Vertikal (Vertical Line Test) untuk menguji fungsi.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-031",
        "materi": "Pilih Titik Bukan Fungsi",
        "jenis": "Pilih Titik",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Tandai titik (2, 4) jika sudah ada titik (2, 1) agar grafik tersebut menjadi BUKAN FUNGSI!",
        "minX": 0, "maxX": 4, "minY": 0, "maxY": 5,
        "targetPoints": [[2, 4]],
        "kunci": "(2, 4)",
        "feedback": "Tepat! Menambahkan (2, 4) saat ada (2, 1) membuat x = 2 memiliki dua nilai y (bukan fungsi).",
        "type": "CARTESIAN"
    },
    {
        "id": "ENDLESS-032",
        "materi": "Lengkapi Tabel Domain",
        "jenis": "Lengkapi Tabel",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Tabel fungsi f(x) = x + 4: jika pasangan x adalah (1, 5), (?, 7), (4, 8). Berapakah nilai x yang hilang?",
        "kunci": "3",
        "feedback": "Benar! x + 4 = 7 -> x = 7 - 4 = 3.",
        "type": "TABLE"
    },
    {
        "id": "ENDLESS-033",
        "materi": "Banyak Pemetaan (Fungsi)",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Jika n(A) = 3 dan n(B) = 2, berapakah banyak kemungkinan pemetaan (fungsi) dari himpunan A ke B? (Gunakan rumus n(B)^n(A))",
        "kunci": "8",
        "feedback": "Tepat! Banyak pemetaan = 2^3 = 8.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-034",
        "materi": "Hubungan Range dan Kodomain",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pernyataan: Daerah hasil (Range) selalu merupakan himpunan bagian dari daerah kawan (Kodomain).",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Semua anggota range pasti berada di dalam kodomain.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-035",
        "materi": "Deteksi Anggota Range",
        "jenis": "Deteksi Kesalahan Singkat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Fungsi f dari A = {1, 2, 3} ke B = {a, b, c, d} didefinisikan f = {(1, b), (2, c), (3, b)}. Manakah yang BUKAN anggota range?",
        "options": ["a", "b", "c"],
        "kunci": "a",
        "feedback": "Tepat! Huruf 'a' dan 'd' tidak memiliki panah/pasangan, sehingga bukan anggota range.",
        "type": "DETECT_ERROR"
    },
    {
        "id": "ENDLESS-036",
        "materi": "Banyak Pemetaan Terbalik",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Jika n(A) = 2 dan n(B) = 3, berapakah banyak kemungkinan pemetaan dari himpunan B ke A? (Rumus: n(A)^n(B))",
        "kunci": "8",
        "feedback": "Hebat! Pemetaan dari B ke A = 2^3 = 8.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-037",
        "materi": "Matching Pasangan Fungsi",
        "jenis": "Matching",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Jodohkan himpunan pasangan berurutan dengan status fungsinya!",
        "pairs": [
            {"left": "{(1, 2), (2, 3), (3, 4)}", "right": "Fungsi"},
            {"left": "{(1, 2), (1, 3), (2, 4)}", "right": "Bukan Fungsi (Domain 1 bercabang)"},
            {"left": "{(1, 5), (2, 5), (3, 5)}", "right": "Fungsi (Konstan)"}
        ],
        "rightOptions": ["Fungsi", "Bukan Fungsi (Domain 1 bercabang)", "Fungsi (Konstan)", "Korespondensi 1-1"],
        "kunci": "{(1,2),(2,3),(3,4)} -> Fungsi, {(1,2),(1,3),(2,4)} -> Bukan Fungsi, {(1,5),(2,5),(3,5)} -> Fungsi (Konstan)",
        "feedback": "Tepat! Identifikasi fungsi dan alasannya sangat akurat.",
        "type": "MATCHING"
    },
    {
        "id": "ENDLESS-038",
        "materi": "Diagram Panah Bukan Fungsi",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Jika salah satu anggota domain tidak memiliki panah sama sekali ke kodomain, maka relasi tersebut...",
        "options": ["Bukan fungsi", "Pasti korespondensi satu-satu", "Fungsi konstan", "Fungsi linear"],
        "kunci": "Bukan fungsi",
        "feedback": "Benar! Syarat fungsi adalah SETIAP anggota domain wajib memiliki pasangan.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-039",
        "materi": "Diagram Fungsi Valid",
        "jenis": "Diagram Fungsi",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Hubungkan diagram fungsi dari A = {x, y} ke B = {10, 20} dengan aturan x dipetakan ke 20 dan y dipetakan ke 10!",
        "setA": ["x", "y"],
        "setB": [10, 20],
        "correctPairs": ["x->20", "y->10"],
        "kunci": "x -> 20, y -> 10",
        "feedback": "Tepat! Diagram fungsi terpasang sempurna.",
        "type": "ARROWS"
    },
    {
        "id": "ENDLESS-040",
        "materi": "Kodomain Berlebih",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pernyataan: Pada suatu fungsi, anggota himpunan kodomain BOLEH tidak memiliki pasangan.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Yang wajib punya tepat satu pasangan hanyalah anggota domain.",
        "type": "TRUE_FALSE"
    },

    # ══════════════════════════════════════════════════════════════════════════
    # BAB 3: NOTASI & RUMUS FUNGSI (ENDLESS-041 s/d ENDLESS-060)
    # ══════════════════════════════════════════════════════════════════════════
    {
        "id": "ENDLESS-041",
        "materi": "Substitusi Nilai Fungsi",
        "jenis": "Input Angka",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Diketahui rumus fungsi f(x) = 3x - 5. Berapakah nilai dari f(4)?",
        "kunci": "7",
        "feedback": "Tepat! f(4) = 3(4) - 5 = 12 - 5 = 7.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-042",
        "materi": "Substitusi Nilai Negatif",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Diketahui f(x) = 2x + 9. Berapakah nilai dari f(-3)?",
        "kunci": "3",
        "feedback": "Benar! f(-3) = 2(-3) + 9 = -6 + 9 = 3.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-043",
        "materi": "Substitusi f(0)",
        "jenis": "Input Angka",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Diketahui f(x) = -4x + 12. Berapakah nilai dari f(0)?",
        "kunci": "12",
        "feedback": "Tepat! f(0) = -4(0) + 12 = 12.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-044",
        "materi": "Mencari Nilai Asal (Prapeta)",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Diketahui rumus f(x) = 5x - 2. Jika f(a) = 18, berapakah nilai a?",
        "kunci": "4",
        "feedback": "Mantap! 5a - 2 = 18 -> 5a = 20 -> a = 4.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-045",
        "materi": "Notasi Fungsi",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Notasi f : x -> 2x + 3 jika dituliskan dalam bentuk rumus fungsi adalah...",
        "options": ["f(x) = 2x + 3", "f(x) = 2x - 3", "f(2) = x + 3", "x = 2f + 3"],
        "kunci": "f(x) = 2x + 3",
        "feedback": "Benar! Notasi f : x -> ax + b setara dengan f(x) = ax + b.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-046",
        "materi": "Evaluasi Nilai Fungsi",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Pernyataan: Jika f(x) = 4x + 1, maka bayangan dari x = 3 adalah 13.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! f(3) = 4(3) + 1 = 12 + 1 = 13.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-047",
        "materi": "Lengkapi Tabel Nilai",
        "jenis": "Lengkapi Tabel",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Fungsi f(x) = 2x + 1. | x: 1, 2, 3 | f(x): 3, 5, ? | Berapakah nilai f(3)?",
        "kunci": "7",
        "feedback": "Tepat! f(3) = 2(3) + 1 = 7.",
        "type": "TABLE"
    },
    {
        "id": "ENDLESS-048",
        "materi": "Deteksi Langkah Hitung Salah",
        "jenis": "Deteksi Kesalahan Singkat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Seorang siswa menghitung f(x) = 3x - 4 untuk x = -2: Langkah 1: f(-2) = 3(-2) - 4. Langkah 2: = -6 - 4. Langkah 3: = -2. Di manakah kesalahannya?",
        "options": ["Langkah 3 (seharusnya -10)", "Langkah 2 (seharusnya 6 - 4)", "Langkah 1 (seharusnya 3 - 2)", "Tidak ada kesalahan"],
        "kunci": "Langkah 3 (seharusnya -10)",
        "feedback": "Tepat! -6 - 4 adalah -10, bukan -2.",
        "type": "DETECT_ERROR"
    },
    {
        "id": "ENDLESS-049",
        "materi": "Matching Nilai Bayangan",
        "jenis": "Matching",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Jodohkan nilai x dengan hasil fungsinya untuk rumus f(x) = 10 - 2x!",
        "pairs": [
            {"left": "x = 1", "right": "8"},
            {"left": "x = 2", "right": "6"},
            {"left": "x = 4", "right": "2"}
        ],
        "rightOptions": ["8", "6", "2", "0"],
        "kunci": "x = 1 -> 8, x = 2 -> 6, x = 4 -> 2",
        "feedback": "Bagus sekali! Substitusi nilai x tepat.",
        "type": "MATCHING"
    },
    {
        "id": "ENDLESS-050",
        "materi": "Diagram Mesin Fungsi",
        "jenis": "Diagram Fungsi",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Hubungkan input x = {1, 2} ke output f(x) = 3x + 2 pada himpunan B = {5, 8, 11}!",
        "setA": [1, 2],
        "setB": [5, 8, 11],
        "correctPairs": ["1->5", "2->8"],
        "kunci": "1 -> 5, 2 -> 8",
        "feedback": "Sempurna! f(1) = 5 dan f(2) = 8.",
        "type": "ARROWS"
    },
    {
        "id": "ENDLESS-051",
        "materi": "Mencari Beda Nilai Fungsi",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Diketahui f(x) = 4x + 3. Berapakah nilai dari f(5) - f(3)?",
        "kunci": "8",
        "feedback": "Tepat! f(5) = 23, f(3) = 15. Selisihnya = 23 - 15 = 8 (atau 4 x (5 - 3) = 8).",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-052",
        "materi": "Menentukan Nilai b",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Rumus fungsi f(x) = 2x + b. Jika f(3) = 11, berapakah nilai b?",
        "kunci": "5",
        "feedback": "Benar! 2(3) + b = 11 -> 6 + b = 11 -> b = 5.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-053",
        "materi": "Menentukan Rumus Fungsi",
        "jenis": "Jawab Cepat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Diberikan data: f(1) = 4, f(2) = 7, f(3) = 10. Rumus fungsi f(x) yang tepat adalah...",
        "options": ["f(x) = 3x + 1", "f(x) = 2x + 2", "f(x) = 4x", "f(x) = x + 3"],
        "kunci": "f(x) = 3x + 1",
        "feedback": "Tepat! Beda nilai adalah +3 (a = 3). Saat x = 1: 3(1) + 1 = 4.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-054",
        "materi": "Prapeta Nol",
        "jenis": "Input Angka",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Diketahui f(x) = 6x - 18. Berapakah nilai x agar f(x) = 0?",
        "kunci": "3",
        "feedback": "Benar! 6x - 18 = 0 -> 6x = 18 -> x = 3.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-055",
        "materi": "Klasifikasi Nilai Fungsi",
        "jenis": "Drag & Drop",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Fungsi f(x) = x^2 - 1. Kelompokkan nilai-nilai hasil (output) jika domainnya {1, 2, 3}!",
        "targetCategory": "Hasil Output f(x)",
        "options": ["0", "3", "8", "5", "10"],
        "kunci": ["0", "3", "8"],
        "feedback": "Bagus! f(1) = 0, f(2) = 3, f(3) = 8.",
        "type": "DRAG_DROP"
    },
    {
        "id": "ENDLESS-056",
        "materi": "Pilih Titik Hasil Fungsi",
        "jenis": "Pilih Titik",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Jika f(x) = 2x + 1, tandai titik koordinat (x, f(x)) untuk nilai x = 1 di diagram Cartesius!",
        "minX": 0, "maxX": 4, "minY": 0, "maxY": 5,
        "targetPoints": [[1, 3]],
        "kunci": "(1, 3)",
        "feedback": "Tepat! Saat x = 1, f(1) = 2(1) + 1 = 3 -> titik (1, 3).",
        "type": "CARTESIAN"
    },
    {
        "id": "ENDLESS-057",
        "materi": "Fungsi Kuadrat Sederhana",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Diketahui fungsi f(x) = x^2 + 3. Berapakah nilai dari f(-4)?",
        "kunci": "19",
        "feedback": "Hebat! (-4)^2 = 16. 16 + 3 = 19.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-058",
        "materi": "Sifat Linearitas",
        "jenis": "Benar/Salah",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Pernyataan: Untuk f(x) = 2x + 1, apakah nilai f(1 + 2) sama dengan f(1) + f(2)?",
        "options": ["Benar", "Salah"],
        "kunci": "Salah",
        "feedback": "Tepat! f(3) = 7, sedangkan f(1) + f(2) = 3 + 5 = 8. Jadi f(1+2) != f(1)+f(2).",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-059",
        "materi": "Lengkapi Tabel Nilai Mundur",
        "jenis": "Lengkapi Tabel",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "f(x) = 5 - 2x. Lengkapi tabel: jika x = ?, nilai f(x) = -1. Berapakah nilai x?",
        "kunci": "3",
        "feedback": "Benar! 5 - 2x = -1 -> 2x = 6 -> x = 3.",
        "type": "TABLE"
    },
    {
        "id": "ENDLESS-060",
        "materi": "Menentukan Koefisien a",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Fungsi f(x) = ax + 3. Jika f(2) = 11, berapakah nilai a?",
        "kunci": "4",
        "feedback": "Keren! 2a + 3 = 11 -> 2a = 8 -> a = 4.",
        "type": "INPUT_NUMBER"
    },

    # ══════════════════════════════════════════════════════════════════════════
    # BAB 4: GRAFIK FUNGSI LINEAR (ENDLESS-061 s/d ENDLESS-080)
    # ══════════════════════════════════════════════════════════════════════════
    {
        "id": "ENDLESS-061",
        "materi": "Bentuk Grafik Linear",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pernyataan: Grafik dari persamaan fungsi linear f(x) = ax + b pada bidang Cartesius selalu berupa garis lurus.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Persamaan linear berpangkat satu selalu membentuk garis lurus.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-062",
        "materi": "Titik Potong Sumbu Y",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Grafik fungsi f(x) = 3x - 6 memotong sumbu Y di titik...",
        "options": ["(0, -6)", "(0, 6)", "(2, 0)", "(-2, 0)"],
        "kunci": "(0, -6)",
        "feedback": "Tepat! Potong sumbu Y saat x = 0 -> f(0) = -6 -> (0, -6).",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-063",
        "materi": "Titik Potong Sumbu X",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Grafik fungsi f(x) = 2x - 8 memotong sumbu X di titik (x, 0). Berapakah nilai x?",
        "kunci": "4",
        "feedback": "Benar! 2x - 8 = 0 -> 2x = 8 -> x = 4.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-064",
        "materi": "Gradien Garis",
        "jenis": "Input Angka",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Berapakah gradien (m) dari grafik fungsi linear f(x) = -3x + 7?",
        "kunci": "-3",
        "feedback": "Tepat! Gradien m adalah koefisien dari x, yaitu -3.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-065",
        "materi": "Arah Kemiringan Garis",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Jika gradien suatu garis bernilai positif (m > 0), maka arah grafik garis tersebut...",
        "options": ["Miring naik ke arah kanan", "Miring turun ke arah kanan", "Mendatar horizontal", "Tegak lurus vertikal"],
        "kunci": "Miring naik ke arah kanan",
        "feedback": "Bagus! Gradien positif berarti nilai y bertambah seiring bertambahnya x (naik ke kanan).",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-066",
        "materi": "Pilih Titik Potong Sumbu",
        "jenis": "Pilih Titik",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Tandai titik potong sumbu Y dari fungsi f(x) = x + 3 pada bidang koordinat Cartesius!",
        "minX": 0, "maxX": 4, "minY": 0, "maxY": 5,
        "targetPoints": [[0, 3]],
        "kunci": "(0, 3)",
        "feedback": "Tepat! Saat x = 0, y = 3 -> titik (0, 3).",
        "type": "CARTESIAN"
    },
    {
        "id": "ENDLESS-067",
        "materi": "Deteksi Titik di Luar Garis",
        "jenis": "Deteksi Kesalahan Singkat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Diberikan persamaan garis y = 2x + 1. Manakah titik berikut yang TIDAK terletak pada garis tersebut?",
        "options": ["(1, 3)", "(2, 5)", "(3, 8)", "(0, 1)"],
        "kunci": "(3, 8)",
        "feedback": "Hebat! Untuk x = 3, y = 2(3) + 1 = 7, bukan 8. Jadi (3, 8) tidak pada garis.",
        "type": "DETECT_ERROR"
    },
    {
        "id": "ENDLESS-068",
        "materi": "Matching Persamaan & Titik Potong Y",
        "jenis": "Matching",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Jodohkan persamaan garis dengan titik potong sumbu Y yang sesuai!",
        "pairs": [
            {"left": "y = 4x + 2", "right": "(0, 2)"},
            {"left": "y = -2x + 5", "right": "(0, 5)"},
            {"left": "y = 3x - 1", "right": "(0, -1)"}
        ],
        "rightOptions": ["(0, 2)", "(0, 5)", "(0, -1)", "(0, 0)"],
        "kunci": "y = 4x + 2 -> (0, 2), y = -2x + 5 -> (0, 5), y = 3x - 1 -> (0, -1)",
        "feedback": "Sempurna! Nilai c langsung menentukan perpotongan di sumbu Y.",
        "type": "MATCHING"
    },
    {
        "id": "ENDLESS-069",
        "materi": "Syarat Garis Sejajar",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pernyataan: Dua garis lurus yang memiliki gradien sama (m1 = m2) dipastikan sejajar satu sama lain.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Kemiringan yang identik membuat kedua garis tidak pernah berpotongan (sejajar).",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-070",
        "materi": "Lengkapi Tabel Koordinat Garis",
        "jenis": "Lengkapi Tabel",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Garis y = 3x. Jika titik koordinatnya (x, y): (1, 3), (2, 6), (3, ?). Berapakah nilai y?",
        "kunci": "9",
        "feedback": "Tepat! y = 3(3) = 9.",
        "type": "TABLE"
    },
    {
        "id": "ENDLESS-071",
        "materi": "Plot Dua Titik Garis",
        "jenis": "Pilih Titik",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Tandai dua titik: titik potong sumbu Y (0, 1) dan titik (2, 5) untuk garis y = 2x + 1!",
        "minX": 0, "maxX": 4, "minY": 0, "maxY": 6,
        "targetPoints": [[0, 1], [2, 5]],
        "drawLine": True,
        "kunci": "(0, 1) dan (2, 5)",
        "feedback": "Keren! Dua titik sudah cukup untuk membentuk garis lurus.",
        "type": "CARTESIAN"
    },
    {
        "id": "ENDLESS-072",
        "materi": "Gradien dari Dua Titik",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Garis melalui titik (0, 0) dan (3, 6). Berapakah gradien garis tersebut? (m = (y2 - y1) / (x2 - x1))",
        "kunci": "2",
        "feedback": "Mantap! m = (6 - 0) / (3 - 0) = 6 / 3 = 2.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-073",
        "materi": "Diagram Hubungan x ke y Garis",
        "jenis": "Diagram Fungsi",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Hubungkan titik absis x = {1, 2} ke ordinat y pada garis y = x + 3 pada B = {4, 5, 6}!",
        "setA": [1, 2],
        "setB": [4, 5, 6],
        "correctPairs": ["1->4", "2->5"],
        "kunci": "1 -> 4, 2 -> 5",
        "feedback": "Tepat! y = 1 + 3 = 4 dan y = 2 + 3 = 5.",
        "type": "ARROWS"
    },
    {
        "id": "ENDLESS-074",
        "materi": "Garis Horisontal (Fungsi Konstan)",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Grafik fungsi f(x) = 4 memiliki bentuk berupa garis...",
        "options": ["Mendatar (horizontal) sejajar sumbu X", "Tegak (vertikal) sejajar sumbu Y", "Miring naik ke kanan", "Miring turun ke kanan"],
        "kunci": "Mendatar (horizontal) sejajar sumbu X",
        "feedback": "Benar! Untuk setiap nilai x, nilai y selalu tetap 4 (garis mendatar).",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-075",
        "materi": "Klasifikasi Garis Sejajar",
        "jenis": "Drag & Drop",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Garis acuan: y = 2x + 1. Kelompokkan persamaan di bawah yang SEJAJAR dengan garis acuan!",
        "targetCategory": "Garis yang Sejajar (m = 2)",
        "options": ["y = 2x - 5", "y = 2x + 7", "y = 3x + 1", "y = -2x + 1"],
        "kunci": ["y = 2x - 5", "y = 2x + 7"],
        "feedback": "Bagus! Garis yang memiliki gradien m = 2 pasti sejajar.",
        "type": "DRAG_DROP"
    },
    {
        "id": "ENDLESS-076",
        "materi": "Gradien Negatif Melalui Titik Pusat",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Sebuah garis lurus melalui titik (0, 0) dan (2, -6). Berapakah nilai gradien garis tersebut?",
        "kunci": "-3",
        "feedback": "Tepat! m = (-6 - 0) / (2 - 0) = -6 / 2 = -3.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-077",
        "materi": "Titik Potong Dua Garis",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Garis y = x + 2 dan y = 2x saling berpotongan. Berapakah nilai koordinat x pada titik potong tersebut?",
        "kunci": "2",
        "feedback": "Hebat! x + 2 = 2x -> x = 2.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-078",
        "materi": "Uji Titik pada Garis",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Pernyataan: Titik (3, 7) terletak pada grafik fungsi y = 2x + 1.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! y = 2(3) + 1 = 6 + 1 = 7.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-079",
        "materi": "Deteksi Gradien Keliru",
        "jenis": "Deteksi Kesalahan Singkat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Diberikan 2y = 6x + 4. Seorang siswa menyimpulkan gradiennya adalah 6. Di manakah kesalahannya?",
        "options": ["Belum dibagi 2 (seharusnya m = 3)", "Seharusnya m = 4", "Seharusnya m = -6", "Tidak ada kesalahan"],
        "kunci": "Belum dibagi 2 (seharusnya m = 3)",
        "feedback": "Keren! Bentuk y = mx + c mensyaratkan koefisien y harus 1. Dibagi 2 menjadi y = 3x + 2, jadi m = 3.",
        "type": "DETECT_ERROR"
    },
    {
        "id": "ENDLESS-080",
        "materi": "Lengkapi Tabel Nilai X Nol",
        "jenis": "Lengkapi Tabel",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Garis y = -x + 5. Lengkapi tabel saat x = 0, berapakah nilai y?",
        "kunci": "5",
        "feedback": "Tepat! y = -(0) + 5 = 5.",
        "type": "TABLE"
    },

    # ══════════════════════════════════════════════════════════════════════════
    # BAB 5: KORESPONDENSI SATU-SATU (ENDLESS-081 s/d ENDLESS-100)
    # ══════════════════════════════════════════════════════════════════════════
    {
        "id": "ENDLESS-081",
        "materi": "Syarat Mutlak Korespondensi 1-1",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pernyataan: Syarat mutlak terbentuknya korespondensi satu-satu antara dua himpunan A dan B adalah n(A) = n(B).",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Banyaknya anggota kedua himpunan harus sama persis.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-082",
        "materi": "Perhitungan Faktorial 3!",
        "jenis": "Input Angka",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Jika n(A) = n(B) = 3, berapakah banyak kemungkinan korespondensi satu-satu yang dapat dibentuk? (Hitung 3!)",
        "kunci": "6",
        "feedback": "Tepat! 3! = 3 x 2 x 1 = 6 susunan.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-083",
        "materi": "Perhitungan Faktorial 4!",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Berapakah banyak susunan korespondensi satu-satu dari himpunan dengan 4 anggota? (Hitung 4!)",
        "kunci": "24",
        "feedback": "Benar! 4! = 4 x 3 x 2 x 1 = 24 susunan.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-084",
        "materi": "Perhitungan Faktorial 5!",
        "jenis": "Input Angka",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "5 siswa duduk di 5 kursi bernomor 1 sampai 5 (1 siswa 1 kursi). Berapa banyak cara susunan yang mungkin? (Hitung 5!)",
        "kunci": "120",
        "feedback": "Hebat! 5! = 5 x 4 x 3 x 2 x 1 = 120 cara.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-085",
        "materi": "Identifikasi Korespondensi 1-1",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Manakah di antara relasi berikut yang merupakan korespondensi satu-satu?",
        "options": [
            "{(1, a), (2, b), (3, c)}",
            "{(1, a), (2, a), (3, b)}",
            "{(1, a), (2, b), (3, b)}",
            "{(1, a), (2, b)}"
        ],
        "kunci": "{(1, a), (2, b), (3, c)}",
        "feedback": "Tepat! Setiap input dan setiap output terpasang satu-satu tanpa ada yang dobel.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-086",
        "materi": "Deteksi Pelanggaran Korespondensi",
        "jenis": "Deteksi Kesalahan Singkat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Himpunan A = {1, 2, 3} dan B = {p, q, r}. Diberikan relasi {(1, p), (2, q), (3, q)}. Mengapa BUKAN korespondensi satu-satu?",
        "options": ["Elemen q memiliki dua pasangan (dari 2 dan 3)", "Elemen 1 tidak punya kawan", "Bukan relasi", "Anggotanya ganjil"],
        "kunci": "Elemen q memiliki dua pasangan (dari 2 dan 3)",
        "feedback": "Bagus! Pada korespondensi 1-1, kodomain tidak boleh menerima lebih dari satu panah.",
        "type": "DETECT_ERROR"
    },
    {
        "id": "ENDLESS-087",
        "materi": "Matching Faktorial",
        "jenis": "Matching",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Jodohkan lambang faktorial korespondensi dengan nilai perhitungannya!",
        "pairs": [
            {"left": "2!", "right": "2"},
            {"left": "3!", "right": "6"},
            {"left": "4!", "right": "24"}
        ],
        "rightOptions": ["2", "6", "24", "12"],
        "kunci": "2! -> 2, 3! -> 6, 4! -> 24",
        "feedback": "Sempurna! Nilai faktorial terpasang benar.",
        "type": "MATCHING"
    },
    {
        "id": "ENDLESS-088",
        "materi": "Diagram Panah Korespondensi 1-1",
        "jenis": "Diagram Fungsi",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Hubungkan anggota A = {A1, A2} ke B = {B1, B2} secara korespondensi satu-satu (A1 ke B2, A2 ke B1)!",
        "setA": ["A1", "A2"],
        "setB": ["B1", "B2"],
        "correctPairs": ["A1->B2", "A2->B1"],
        "kunci": "A1 -> B2, A2 -> B1",
        "feedback": "Mantap! Terbentuk korespondensi satu-satu sempurna.",
        "type": "ARROWS"
    },
    {
        "id": "ENDLESS-089",
        "materi": "Pilih Titik Korespondensi 1-1",
        "jenis": "Pilih Titik",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Tandai titik (2, 2) untuk melengkapi titik (1, 1) pada domain {1, 2} dan kodomain {1, 2} agar menjadi korespondensi satu-satu!",
        "minX": 0, "maxX": 3, "minY": 0, "maxY": 3,
        "targetPoints": [[2, 2]],
        "kunci": "(2, 2)",
        "feedback": "Tepat! Setiap baris dan kolom sekarang memuat tepat satu titik noktah.",
        "type": "CARTESIAN"
    },
    {
        "id": "ENDLESS-090",
        "materi": "Contoh Dunia Nyata",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Manakah contoh relasi di dunia nyata yang merupakan korespondensi satu-satu?",
        "options": [
            "Negara dengan lagu kebangsaan resminya",
            "Siswa dengan warna sepatu kesukaannya",
            "Guru dengan mata pelajaran yang diajarkan",
            "Pasien dengan obat yang diminum"
        ],
        "kunci": "Negara dengan lagu kebangsaan resminya",
        "feedback": "Benar! Satu negara memiliki tepat satu lagu kebangsaan resmi, dan sebaliknya.",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-091",
        "materi": "Klasifikasi Relasi Korespondensi",
        "jenis": "Drag & Drop",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Pilihlah relasi-relasi di bawah ini yang MERUPAKAN korespondensi satu-satu!",
        "targetCategory": "Korespondensi Satu-Satu",
        "options": [
            "{(1, x), (2, y)}",
            "{(a, 3), (b, 4)}",
            "{(1, x), (2, x)}",
            "{(p, 1), (p, 2)}"
        ],
        "kunci": ["{(1, x), (2, y)}", "{(a, 3), (b, 4)}"],
        "feedback": "Tepat! Pasangan memiliki anggota unik di domain maupun kodomain.",
        "type": "DRAG_DROP"
    },
    {
        "id": "ENDLESS-092",
        "materi": "Lengkapi Tabel Pasangan 1-1",
        "jenis": "Lengkapi Tabel",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Korespondensi 1-1 antara {A, B, C} dan {1, 2, 3}: (A, 2), (B, ?), (C, 1). Angka berapakah pasangannya B agar tidak kembar?",
        "kunci": "3",
        "feedback": "Benar! Angka yang belum terpakai dari {1, 2, 3} adalah 3.",
        "type": "TABLE"
    },
    {
        "id": "ENDLESS-093",
        "materi": "Uji Garis Horizontal",
        "jenis": "Benar/Salah",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Pernyataan: Suatu fungsi dapat disebut korespondensi satu-satu jika lolos Uji Garis Vertikal DAN Uji Garis Horizontal pada grafiknya.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Garis vertikal menguji fungsi, garis horizontal menguji satu-lawan-satu.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-094",
        "materi": "Banyak Korespondensi Anggota Berbeda",
        "jenis": "Jawab Cepat",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Himpunan P memiliki 3 anggota, sedangkan himpunan Q memiliki 4 anggota. Banyak korespondensi satu-satu yang mungkin adalah...",
        "options": ["0 (tidak dapat dibentuk)", "12", "64", "81"],
        "kunci": "0 (tidak dapat dibentuk)",
        "feedback": "Tepat! Karena n(P) != n(Q), korespondensi satu-satu TIDAK BISA dibentuk (0 kemungkinan).",
        "type": "MCQ"
    },
    {
        "id": "ENDLESS-095",
        "materi": "Perhitungan Faktorial 2!",
        "jenis": "Input Angka",
        "kesulitan": "Mudah (C3)",
        "pertanyaan": "Berapakah banyak kemungkinan korespondensi satu-satu dari himpunan beranggotakan 2 elemen?",
        "kunci": "2",
        "feedback": "Benar! 2! = 2 x 1 = 2 kemungkinan.",
        "type": "INPUT_NUMBER"
    },
    {
        "id": "ENDLESS-096",
        "materi": "Deteksi Pasangan Dobel",
        "jenis": "Deteksi Kesalahan Singkat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Diberikan {(1, 4), (2, 5), (3, 6), (4, 4)}. Pasangan manakah yang merusak sifat korespondensi satu-satu?",
        "options": ["(4, 4) karena angka 4 di kodomain sudah dipakai oleh (1, 4)", "(2, 5)", "(3, 6)", "(1, 4) saja"],
        "kunci": "(4, 4) karena angka 4 di kodomain sudah dipakai oleh (1, 4)",
        "feedback": "Hebat! Angka 4 pada hasil terulang dua kali, melanggar syarat satu-lawan-satu.",
        "type": "DETECT_ERROR"
    },
    {
        "id": "ENDLESS-097",
        "materi": "Sifat Timbal Balik Korespondensi",
        "jenis": "Benar/Salah",
        "kesulitan": "Mudah (C2)",
        "pertanyaan": "Pernyataan: Pada korespondensi satu-satu, relasi kebalikannya (invers) pasti juga merupakan fungsi.",
        "options": ["Benar", "Salah"],
        "kunci": "Benar",
        "feedback": "Benar! Karena hubungan bersifat satu-lawan-satu timbal balik, inversnya selalu merupakan fungsi.",
        "type": "TRUE_FALSE"
    },
    {
        "id": "ENDLESS-098",
        "materi": "Matching Pasangan Ruangan",
        "jenis": "Matching",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Jodohkan 3 agen detektif ke 3 kode ruang rahasia secara satu-satu!",
        "pairs": [
            {"left": "Agen Alpha", "right": "Ruang A"},
            {"left": "Agen Beta", "right": "Ruang B"},
            {"left": "Agen Gamma", "right": "Ruang C"}
        ],
        "rightOptions": ["Ruang A", "Ruang B", "Ruang C", "Ruang D"],
        "kunci": "Alpha -> Ruang A, Beta -> Ruang B, Gamma -> Ruang C",
        "feedback": "Sempurna! Semua agen menempati pos unik tanpa rangkap.",
        "type": "MATCHING"
    },
    {
        "id": "ENDLESS-099",
        "materi": "Diagram Panah 3 Anggota 1-1",
        "jenis": "Diagram Fungsi",
        "kesulitan": "Sedang (C3)",
        "pertanyaan": "Hubungkan himpunan A = {1, 2, 3} ke B = {a, b, c} secara korespondensi satu-satu (1->b, 2->c, 3->a)!",
        "setA": [1, 2, 3],
        "setB": ["a", "b", "c"],
        "correctPairs": ["1->b", "2->c", "3->a"],
        "kunci": "1 -> b, 2 -> c, 3 -> a",
        "feedback": "Keren! Diagram panah korespondensi satu-satu terpasang tepat.",
        "type": "ARROWS"
    },
    {
        "id": "ENDLESS-100",
        "materi": "Sintesis Konsep Relasi dan Fungsi",
        "jenis": "Jawab Cepat",
        "kesulitan": "Sedang (C4)",
        "pertanyaan": "Manakah urutan hierarki konsep dari yang paling umum (luas) hingga yang paling khusus?",
        "options": [
            "Relasi -> Fungsi -> Korespondensi Satu-Satu",
            "Fungsi -> Relasi -> Korespondensi Satu-Satu",
            "Korespondensi Satu-Satu -> Fungsi -> Relasi",
            "Relasi -> Korespondensi Satu-Satu -> Fungsi"
        ],
        "kunci": "Relasi -> Fungsi -> Korespondensi Satu-Satu",
        "feedback": "Luar biasa! Semua korespondensi satu-satu adalah fungsi, dan semua fungsi adalah relasi.",
        "type": "MCQ"
    }
]

def generate_markdown():
    md = []
    md.append("# ⚡ HASIL REVISI LENGKAP BAGIAN ENDLESS: FAST-PACED CHALLENGE MODE")
    md.append("## Bank Soal Game Edukasi \"Detektif Data: Relasi dan Fungsi\" SMP Kelas VIII\\n")
    md.append("Dokumen ini memuat perombakan total instrumen soal pada **BAGIAN ENDLESS (Endless Mode)**.\\n")
    md.append("---")
    md.append("### 🎯 TUJUAN & FILOSOFI REVISI ENDLESS MODE")
    md.append("1. **Cepat, Acak, dan Mengalir (Fast-Paced Gameplay):**")
    md.append("   - Setiap butir soal dirancang dapat diselesaikan dalam waktu singkat (5–15 detik).")
    md.append("   - Menghilangkan aktivitas panjang bertele-tele atau aljabar substitusi bertingkat yang melelahkan.")
    md.append("2. **Variasi 9 Jenis Interaksi (Bukan Hanya ABCD):**")
    md.append("   - **Jawab Cepat** (Pilihan cepat 2-4 opsi)")
    md.append("   - **Input Angka** (Mengetik jawaban numerik langsung)")
    md.append("   - **Benar/Salah** (Verifikasi kebenaran konsep dalam 5 detik)")
    md.append("   - **Drag & Drop** (Pengelompokan elemen domain/range/garis)")
    md.append("   - **Matching** (Menjodohkan 3 pasangan cepat)")
    md.append("   - **Diagram Fungsi** (Menghubungkan panah relasi/fungsi)")
    md.append("   - **Pilih Titik** (Menandai koordinat Cartesius)")
    md.append("   - **Lengkapi Tabel** (Mengisi 1 sel nilai tabel yang rumpang)")
    md.append("   - **Deteksi Kesalahan Singkat** (Menemukan pasangan/langkah yang melanggar aturan)")
    md.append("3. **Struktur Metadata Wajib per Butir Soal:**")
    md.append("   - `ID`")
    md.append("   - `Materi`")
    md.append("   - `Jenis interaksi`")
    md.append("   - `Kesulitan`")
    md.append("   - `Kunci`")
    md.append("   - `Feedback`")
    md.append("4. **Bebas Duplikasi & Selaras Kurikulum SMP:**")
    md.append("   - Seluruh materi SMA di luar Fase D SMP (seperti fungsi mutlak $|x|$ dan fungsi komposisi SMA) telah dihapus.")
    md.append("   - 100 soal terbagi merata dan proporsional melingkupi 5 bab materi (20 soal per bab).\\n")
    md.append("---")
    md.append("### 📊 DISTRIBUSI SOAL ENDLESS MODE (TOTAL 100 SOAL)\\n")
    md.append("| Bab | Materi Pokok | Rentang ID | Jumlah Soal |")
    md.append("| :--- | :--- | :---: | :---: |")
    md.append("| **Bab 1** | Pengertian & Penyajian Relasi | `ENDLESS-001` - `ENDLESS-020` | 20 Soal |")
    md.append("| **Bab 2** | Pengertian & Unsur Fungsi (Domain, Kodomain, Range) | `ENDLESS-021` - `ENDLESS-040` | 20 Soal |")
    md.append("| **Bab 3** | Notasi & Rumus Fungsi | `ENDLESS-041` - `ENDLESS-060` | 20 Soal |")
    md.append("| **Bab 4** | Grafik Fungsi Linear | `ENDLESS-061` - `ENDLESS-080` | 20 Soal |")
    md.append("| **Bab 5** | Korespondensi Satu-Satu | `ENDLESS-081` - `ENDLESS-100` | 20 Soal |")
    md.append("| **TOTAL** | **Seluruh Materi Relasi & Fungsi SMP** | `ENDLESS-001` - `ENDLESS-100` | **100 Soal** |\\n")
    md.append("---\\n")

    current_chapter = ""
    for q in questions:
        q_num = int(q["id"].split("-")[1])
        if q_num == 1:
            current_chapter = "BAB 1: PENGERTIAN & PENYAJIAN RELASI"
            md.append(f"# 📂 {current_chapter}\\n")
        elif q_num == 21:
            current_chapter = "BAB 2: PENGERTIAN & UNSUR FUNGSI"
            md.append(f"# 📂 {current_chapter}\\n")
        elif q_num == 41:
            current_chapter = "BAB 3: NOTASI & RUMUS FUNGSI"
            md.append(f"# 📂 {current_chapter}\\n")
        elif q_num == 61:
            current_chapter = "BAB 4: GRAFIK FUNGSI LINEAR"
            md.append(f"# 📂 {current_chapter}\\n")
        elif q_num == 81:
            current_chapter = "BAB 5: KORESPONDENSI SATU-SATU"
            md.append(f"# 📂 {current_chapter}\\n")

        md.append(f"### ⚡ [{q['id']}] {q['materi']}")
        md.append(f"- **ID:** `{q['id']}`")
        md.append(f"- **Materi:** {q['materi']}")
        md.append(f"- **Jenis interaksi:** {q['jenis']}")
        md.append(f"- **Kesulitan:** {q['kesulitan']}")
        md.append(f"\\n**Pertanyaan / Tantangan:**")
        md.append(f"> {q['pertanyaan']}\\n")

        if "options" in q and q["jenis"] not in ["Benar/Salah", "Drag & Drop"]:
            md.append("**Pilihan:**")
            for idx, opt in enumerate(q["options"]):
                letter = chr(65 + idx)
                md.append(f"- {letter}. {opt}")
            md.append("")
        elif q["jenis"] == "Matching":
            md.append("**Pasangan untuk Dijodohkan:**")
            for p in q["pairs"]:
                md.append(f"- `{p['left']}` ➔ `...`")
            md.append(f"- *Pilihan kanan:* {', '.join(q['rightOptions'])}\\n")
        elif q["jenis"] == "Drag & Drop":
            md.append(f"**Target Kategori:** `{q['targetCategory']}`")
            md.append(f"**Pilihan Kartu:** {', '.join(q['options'])}\\n")
        elif q["jenis"] == "Diagram Fungsi":
            md.append(f"**Himpunan A:** `{q['setA']}`")
            md.append(f"**Himpunan B:** `{q['setB']}`\\n")

        if isinstance(q['kunci'], list):
            md.append(f"- **Kunci:** `{', '.join(str(k) for k in q['kunci'])}`")
        else:
            md.append(f"- **Kunci:** `{q['kunci']}`")
        md.append(f"- **Feedback:** {q['feedback']}")
        md.append("\\n---\\n")

    return "\\n".join(md)

if __name__ == "__main__":
    content = generate_markdown()
    with open("REVISI_BAGIAN_ENDLESS.md", "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Successfully generated REVISI_BAGIAN_ENDLESS.md with {len(questions)} questions.")
