/**
 * GENERATE MASTER PDF: BUKU PANDUAN LENGKAP & DOKUMENTASI SISTEM GAME DETEKTIF DATA
 * Menghasilkan dokumen PDF komprehensif:
 * - Fitur game lengkap & gamifikasi
 * - Alur permainan & arsitektur sistem
 * - TABEL MATRIKS SOAL LENGKAP:
 *   • Latihan Bab 1 s.d. Bab 5 (No, Tipe Mekanik, Judul Misi Kreatif, Konsep Matematis)
 *   • Quest Mode Bab 1 s.d. Bab 5 (No, Tipe Mekanik, Judul Misi Kreatif, Konsep Matematis)
 *   • Endless Mode 100 Soal (Level C3, C4, C5 dengan No, Tipe Mekanik, Judul Misi Kreatif, Konsep Matematis)
 * - Panduan penggunaan untuk Siswa dan Guru
 */

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const exportDir = path.join(rootDir, 'exports');
if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

const htmlPath = path.join(exportDir, 'Buku_Panduan_Lengkap_Game_Detektif_Data.html');
const pdfPathRoot = path.join('D:\\File Penting\\File S2\\Thesis Project', 'Buku_Panduan_Lengkap_Game_Detektif_Data.pdf');
const targetSiapMain = 'D:\\File Penting\\File S2\\Thesis Project\\Game Relasi Fungsi siap main';
const pdfPathSiapMain = path.join(targetSiapMain, 'Buku_Panduan_Lengkap_Game_Detektif_Data.pdf');

function getBadgeColor(type) {
  switch (type) {
    case 'HPB_BUILDER': return 'background: #EDE9FE; color: #5B21B6; border: 1px solid #C4B5FD;';
    case 'TABLE_BUILDER':
    case 'TABLE_FILL': return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;';
    case 'CARTESIAN': return 'background: #DBEAFE; color: #1E40AF; border: 1px solid #93C5FD;';
    case 'ARROWS':
    case 'ARROW_BUILDER_2STEP': return 'background: #DCFCE7; color: #166534; border: 1px solid #86EFAC;';
    case 'MATCHING': return 'background: #E0E7FF; color: #3730A3; border: 1px solid #A5B4FC;';
    case 'SLOT_FILL': return 'background: #FFEDD5; color: #9A3412; border: 1px solid #FDBA74;';
    case 'DRAG_DROP': return 'background: #CCFBF1; color: #115E59; border: 1px solid #5EEAD4;';
    case 'INPUT_NUMBER': return 'background: #CFFAFE; color: #155E75; border: 1px solid #67E8F9;';
    case 'DETECT_ERROR': return 'background: #FFE4E6; color: #9F1239; border: 1px solid #FDA4AF;';
    case 'MCQ_COMPLEX': return 'background: #F3E8FF; color: #6B21A8; border: 1px solid #D8B4FE;';
    case 'TRUE_FALSE': return 'background: #E2E8F0; color: #334155; border: 1px solid #CBD5E1;';
    case 'MCQ':
    default: return 'background: #F1F5F9; color: #334155; border: 1px solid #CBD5E1;';
  }
}

function cleanText(text) {
  if (!text) return '';
  return String(text)
    .replace(/<[^>]*>/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n+/g, ' ')
    .trim();
}

function renderTableRows(items) {
  return items.map((item, idx) => {
    const no = item.id || idx + 1;
    const type = item.type || 'MCQ';
    const badgeStyle = getBadgeColor(type);
    const title = cleanText(item.title || item.missionTitle || `Misi Soal #${no}`);
    const concept = cleanText(item.concept || item.explanation || item.correctReason || item.question);

    return `<tr>
      <td style="text-align: center; font-weight: bold; width: 6%;">${no}</td>
      <td style="width: 20%;">
        <span style="display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 8pt; font-weight: 800; font-family: 'JetBrains Mono', monospace; ${badgeStyle}">
          ${type}
        </span>
      </td>
      <td style="width: 34%; font-weight: 700; color: #0F172A; font-size: 9.5pt;">
        ${title}
      </td>
      <td style="width: 40%; font-size: 9pt; color: #334155; line-height: 1.45;">
        ${concept}
      </td>
    </tr>`;
  }).join('\n');
}

async function buildFullHtml() {
  console.log('⏳ Memuat seluruh modul bank soal...');
  const [exerciseMod, questMod, endlessMod] = await Promise.all([
    import('../src/data/exerciseData.js'),
    import('../src/services/questQuestionsService.js'),
    import('../src/data/endlessQuestions.js')
  ]);

  const CHAPTER_EXERCISES = exerciseMod.CHAPTER_EXERCISES;
  const generateSubbabQuestions = questMod.generateSubbabQuestions;
  const ENDLESS_QUESTIONS = endlessMod.ENDLESS_QUESTIONS;

  // 1. Data Latihan 1-5
  const exercises = {};
  for (let cid = 1; cid <= 5; cid++) {
    const rawList = CHAPTER_EXERCISES[cid]?.questions || [];
    exercises[cid] = rawList.map((q, idx) => {
      let title = q.title || `Soal #${idx + 1}`;
      let concept = q.correctReason || q.explanation || q.wrongExplanation || q.question;
      // Truncate cleanly if too long
      if (concept.length > 220) concept = concept.substring(0, 217) + '...';
      return {
        id: idx + 1,
        type: q.type,
        title: title,
        concept: concept
      };
    });
  }

  // 2. Data Quest Mode 1-5
  const questTitles = {
    1: [
      "Kantin Sekolah: Sifat Fleksibel Relasi",
      "Makanan Kesukaan: Pasangan Berurutan 4 Sahabat",
      "Olahraga Kesukaan: 6 Panah Bercabang",
      "Minuman Favorit: Tabel Relasi 5 Baris",
      "Ekskul Siswa: Plot 5 Titik Kartesius",
      "Sortir Relasi: Pemilahan 8 Kartu Kasus Nyata",
      "Jadwal Piket Kantin: Pasangan Berurutan 4 Siswa",
      "Menu Makan Siang: Diagram Panah 5 Siswa",
      "Rekap Pesanan Menu: Tabel Relasi 5 Siswa",
      "Bazar Sekolah: Koordinat 5 Titik Stan Kartesius"
    ],
    2: [
      "Prinsip Utama: Syarat Relasi Sah sebagai Fungsi",
      "Rumus y = x + 2: Pasangan Berurutan 4 Elemen",
      "Diagram Panah: 4 Elemen Himpunan Fungsi Sah",
      "Unsur Fungsi: Tabel Domain, Kodomain & Range",
      "Uji Garis Vertikal: Kanvas 5 Titik Kartesius",
      "Klasifikasi Fungsi: Sortir 8 Himpunan Pasangan",
      "Rekonstruksi Pasangan: Pemetaan Fungsi Valid",
      "Diagram Panah: Penentuan Pasangan Kodomain",
      "Tabel Pemetaan: Analisis Range yang Terpasang",
      "Grafik Kartesius: Titik Koordinat Fungsi Linear"
    ],
    3: [
      "Notasi Fungsi: Memahami f : x → ax + b",
      "Rumus f(x) = 2x + 1: Pasangan Nilai Aljabar",
      "Tabel Nilai: Perhitungan 5 Baris f(x) = 3x − 2",
      "Diagram Panah: Mesin Hitung Nilai 4 Elemen",
      "Koordinat Kartesius: Plot 4 Titik Nilai Fungsi",
      "Klasifikasi Unsur: Sortir Prapeta vs Bayangan",
      "Sistem Persamaan: Menentukan Nilai a dan b",
      "Pasangan Hasil: Himpunan Pasangan Aljabar",
      "Studi Kasus Kontekstual: Tabel Tarif Ojek Online",
      "Grafik Biaya: Plot Titik Jarak vs Tarif Perjalanan"
    ],
    4: [
      "Kemiringan Garis: Analisis Gradien Positif vs Negatif",
      "Tabel Nilai: Persamaan Garis y = 2x − 4",
      "Titik Potong: Koordinat Perpotongan Sumbu X dan Y",
      "Pasangan Garis: Koordinat yang Terletak pada Garis",
      "Diagram Panah: Hubungan Titik Potong Garis",
      "Sortir Gradien: Klasifikasi Miring Kanan vs Kiri",
      "Gradien Aljabar: Menghitung Nilai Kemiringan m",
      "Menggambar Garis: Menghubungkan 2 Titik Koordinat",
      "Tabel Linear: Fungsi Gradien Negatif y = −2x + 6",
      "Grafik Linear Sempurna: Plot 5 Titik Segaris"
    ],
    5: [
      "Definisi Bijeksi: Syarat Mutlak n(A) = n(B)",
      "Faktorial n!: Perhitungan Banyak Pasangan 1-1",
      "Perbandingan Pemetaan: Rumus b^a vs Rumus n!",
      "Uji Syarat: Sortir Pasangan n(A) = n(B)",
      "Diagram Panah: Hubungan 4 Elemen Timbal Balik",
      "Himpunan Pasangan: Susunan Korespondensi 1-1",
      "Penomoran Meja: Tabel Ujian Siswa 1-ke-1",
      "Pos Jaga Detektif: Penugasan 4 Pos Unik",
      "Misi Bom Brankas: Sambungkan 5 Kabel 1-ke-1",
      "Radar Kartesius: 5 Titik Koordinat Tanpa Dobel"
    ]
  };

  const quests = {};
  for (let cid = 1; cid <= 5; cid++) {
    const rawList = generateSubbabQuestions(cid);
    quests[cid] = rawList.map((q, idx) => {
      let concept = q.explanation || q.question;
      if (concept.length > 220) concept = concept.substring(0, 217) + '...';
      return {
        id: idx + 1,
        type: q.type,
        title: questTitles[cid]?.[idx] || `Misi Quest #${idx + 1}`,
        concept: concept
      };
    });
  }

  // 3. Data Endless Mode 100 Soal
  const endlessC3 = ENDLESS_QUESTIONS.filter(q => q.level === 'C3').map((q, i) => ({
    id: q.id,
    type: q.type,
    title: q.title || `Soal C3 #${i + 1}`,
    concept: q.explanation ? (q.explanation.length > 220 ? q.explanation.substring(0, 217) + '...' : q.explanation) : q.question
  }));

  const endlessC4 = ENDLESS_QUESTIONS.filter(q => q.level === 'C4').map((q, i) => ({
    id: q.id,
    type: q.type,
    title: q.title || `Soal C4 #${i + 1}`,
    concept: q.explanation ? (q.explanation.length > 220 ? q.explanation.substring(0, 217) + '...' : q.explanation) : q.question
  }));

  const endlessC5 = ENDLESS_QUESTIONS.filter(q => q.level === 'C5').map((q, i) => ({
    id: q.id,
    type: q.type,
    title: q.title || `Soal C5 #${i + 1}`,
    concept: q.explanation ? (q.explanation.length > 220 ? q.explanation.substring(0, 217) + '...' : q.explanation) : q.question
  }));

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Buku Panduan Lengkap & Dokumentasi Sistem Game Detektif Data</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');

    @page {
      size: A4;
      margin: 16mm 14mm 16mm 14mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 8.5pt;
        color: #64748B;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10pt;
      line-height: 1.55;
      color: #1E293B;
      background-color: #FFFFFF;
      margin: 0;
      padding: 0;
    }

    h1, h2, h3, h4 {
      color: #0F172A;
      font-weight: 800;
      margin-top: 1.2em;
      margin-bottom: 0.4em;
      line-height: 1.25;
    }

    h1 { font-size: 18pt; border-bottom: 2.5px solid #2563EB; padding-bottom: 5px; page-break-after: avoid; }
    h2 { font-size: 13pt; border-bottom: 1.5px solid #CBD5E1; padding-bottom: 4px; page-break-after: avoid; }
    h3 { font-size: 11pt; color: #1E40AF; page-break-after: avoid; }
    h4 { font-size: 10pt; color: #334155; page-break-after: avoid; }

    p { margin-top: 0; margin-bottom: 0.7em; }

    .page-break { page-break-before: always; }

    /* Cover Page */
    .cover-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      padding: 30px 10px;
      text-align: center;
    }

    .cover-badge {
      display: inline-block;
      background: #EFF6FF;
      color: #1D4ED8;
      border: 1.5px solid #BFDBFE;
      padding: 6px 18px;
      border-radius: 999px;
      font-size: 9.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .cover-title {
      font-size: 24pt;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.2;
      margin: 20px 0 10px 0;
      border: none;
    }

    .cover-subtitle {
      font-size: 12pt;
      color: #475569;
      font-weight: 600;
      max-width: 650px;
      margin: 0 auto 25px auto;
    }

    .cover-card {
      background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #3B82F6 100%);
      color: #FFFFFF;
      border-radius: 18px;
      padding: 30px 22px;
      margin: 20px auto;
      max-width: 680px;
      box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.3);
      text-align: left;
    }

    .cover-card h3 {
      color: #FACC15;
      font-size: 13pt;
      margin-top: 0;
      margin-bottom: 10px;
      border: none;
    }

    .cover-card p {
      color: #F1F5F9;
      font-size: 9.5pt;
      line-height: 1.55;
      margin-bottom: 8px;
    }

    .cover-footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 15px;
      color: #64748B;
      font-size: 8.5pt;
      font-weight: 500;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 16px 0;
      font-size: 8.5pt;
      page-break-inside: auto;
    }

    tr { page-break-inside: avoid; page-break-after: auto; }

    th, td {
      border: 1px solid #CBD5E1;
      padding: 6px 8px;
      text-align: left;
      vertical-align: middle;
    }

    th {
      background-color: #F1F5F9;
      color: #0F172A;
      font-weight: 800;
      font-size: 8.5pt;
    }

    tr:nth-child(even) td {
      background-color: #F8FAFC;
    }

    .callout {
      border-radius: 10px;
      padding: 10px 14px;
      margin: 10px 0;
      page-break-inside: avoid;
      font-size: 9pt;
    }

    .callout-info { background-color: #EFF6FF; border-left: 4px solid #3B82F6; color: #1E3A8A; }
    .callout-success { background-color: #F0FDF4; border-left: 4px solid #22C55E; color: #14532D; }
    .callout-warning { background-color: #FFFBEB; border-left: 4px solid #F59E0B; color: #78350F; }
    .callout-purple { background-color: #FAF5FF; border-left: 4px solid #A855F7; color: #581C87; }
    
    .callout-title { font-weight: 800; margin-bottom: 3px; display: flex; align-items: center; gap: 6px; }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 10px 0;
      page-break-inside: avoid;
    }

    .card {
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 10px;
      background: #FAFAFA;
    }

    .card h4 { margin-top: 0; margin-bottom: 4px; font-size: 9.5pt; }

    .flow-step {
      display: flex;
      margin-bottom: 10px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      overflow: hidden;
      page-break-inside: avoid;
    }

    .flow-number {
      background: #2563EB;
      color: white;
      font-weight: 800;
      font-size: 12pt;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      flex-shrink: 0;
    }

    .flow-body { padding: 8px 12px; flex-grow: 1; }
    .flow-body h4 { margin: 0 0 3px 0; color: #1E3A8A; font-size: 10pt; }
    .flow-body p { margin: 0; font-size: 8.5pt; color: #334155; }
  </style>
</head>
<body>

  <!-- ======================================================== -->
  <!-- COVER PAGE -->
  <!-- ======================================================== -->
  <div class="cover-container">
    <div>
      <span class="cover-badge">Dokumentasi Kurikulum &amp; Bank Soal Lengkap</span>
      <h1 class="cover-title">DETEKTIF DATA:<br>MISTERI RELASI &amp; FUNGSI</h1>
      <p class="cover-subtitle">Buku Panduan, Alur Sistem, dan Katalog Lengkap Bank Soal Game Edukasi Matematika SMP Kelas 8</p>
    </div>

    <div class="cover-card">
      <h3>🔍 Katalog Lengkap &amp; Matriks Pembelajaran</h3>
      <p>Buku dokumentasi ini menyajikan secara utuh dan transparan seluruh isi game <strong>Detektif Data</strong>, meliputi:</p>
      <p>&bull; <strong>Fitur Utama &amp; Gamifikasi:</strong> Voice TTS Relo, Mascots Ryu &amp; Snowy, Pangkat Detektif, dan Sertifikat KKM.</p>
      <p>&bull; <strong>Matriks Soal Latihan (Bab 1 s.d. Bab 5):</strong> 50 Misi latihan interaktif taktil berorientasi detektif.</p>
      <p>&bull; <strong>Matriks Soal Quest Mode (Bab 1 s.d. Bab 5):</strong> 50 Soal ujian formal komprehensif penentu kelulusan KKM.</p>
      <p>&bull; <strong>Matriks Soal Endless Mode (100 Soal):</strong> Bank survival berjenjang Taksonomi Bloom (C3, C4, dan C5).</p>
    </div>

    <div class="cover-footer">
      <p><strong>Penyusun:</strong> Tim Pengembang Media Tesis Magister Pendidikan Matematika &bull; Tahun 2026</p>
      <p>Kurikulum Merdeka &bull; Berbasis Taksonomi Bloom (C1 s.d C5) &bull; Multiplatform (Windows, Android, Web)</p>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- BAB 1: GAMBARAN UMUM & ALUR GAME -->
  <!-- ======================================================== -->
  <div>
    <h1>BAB 1: GAMBARAN UMUM &amp; ALUR SISTEM PERMAINAN</h1>

    <h2>1.1 Identitas &amp; Konsep Edukatif Media</h2>
    <p>
      <strong>Detektif Data: Misteri Relasi &amp; Fungsi</strong> adalah game edukasi digital yang dirancang untuk mengatasi miskonsepsi siswa SMP Kelas 8 terhadap konsep relasi, unsur-unsur fungsi, rumus aljabar linear, grafik koordinat, dan korespondensi satu-satu.
    </p>

    <div class="grid-2">
      <div class="card">
        <h4>🎯 92% Manipulatif Taktil Digital</h4>
        <p>Siswa secara aktif memanipulasi objek matematika: merakit kurung pasangan berurutan (HPB), mengisi sel tabel, menarik kabel diagram panah, dan memplot titik koordinat pada bidang Kartesius 2D.</p>
      </div>
      <div class="card">
        <h4>🔍 Kontekstual &amp; Bertema Detektif</h4>
        <p>Menghapus angka-huruf kering yang membosankan. Seluruh soal diikat oleh narasi penyelidikan kasus nyata: menu kantin Bu Ani, pembagian kunci brankas agen, penugasan pos jaga, hingga radar drone pengintai.</p>
      </div>
    </div>

    <h2>1.2 User Journey &amp; Tiga Pilar Pembelajaran</h2>
    <div class="flow-step">
      <div class="flow-number">1</div>
      <div class="flow-body">
        <h4>Halaman Awal &amp; Profil Siswa</h4>
        <p>Masuk menggunakan Akun Siswa (tersimpan di database kelas) atau Mode Tamu instan. Mendeteksi status jaringan lab secara otomatis.</p>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-number">2</div>
      <div class="flow-body">
        <h4>Pilar 1: Modul Cerita (Chapter Learning)</h4>
        <p>Eksplorasi konsep matematika berbalut komik, narasi suara TTS Detektif Relo, animasi grafis, dan mini-drill konsep.</p>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-number">3</div>
      <div class="flow-body">
        <h4>Pilar 2: Latihan Mandiri (Exercises &amp; Remedial)</h4>
        <p>Drill 10 soal taktil per bab tanpa tekanan waktu. Setiap kekeliruan langsung dibongkar oleh <em>Analisis Distraktor</em> dan remedial otomatis.</p>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-number">4</div>
      <div class="flow-body">
        <h4>Pilar 3: Quest Mode Exam (Ujian Standar KKM 75)</h4>
        <p>Ujian resmi 10 butir soal komprehensif (durasi 15 menit). Siswa yang tuntas (&ge; 75) berhak menerima <strong>Sertifikat Digital Resmi</strong>.</p>
      </div>
    </div>
    <div class="flow-step">
      <div class="flow-number">5</div>
      <div class="flow-body">
        <h4>Endless Mode (Arena Survival Arcade)</h4>
        <p>Tantangan kecepatan 100 soal lintas bab (C3, C4, C5) dengan timer dinamis per soal dan multiplier api ($1\times$ s/d $5\times$) untuk Leaderboard.</p>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ======================================================== -->
  <!-- BAB 2: KATALOG MATRIKS SOAL LATIHAN (BAB 1 - 5) -->
  <!-- ======================================================== -->
  <div>
    <h1>BAB 2: KATALOG MATRIKS SOAL LATIHAN (BAB 1 – 5)</h1>
    <p>Setiap bab latihan memuat 10 misi interaktif taktil dengan ragam mekanik bervariasi untuk mencegah kejenuhan siswa:</p>

    <!-- LATIHAN BAB 1 -->
    <h3>📘 Latihan Bab 1: Pengertian &amp; Cara Menyatakan Relasi</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(exercises[1])}
      </tbody>
    </table>

    <div class="page-break"></div>

    <!-- LATIHAN BAB 2 -->
    <h3>🎯 Latihan Bab 2: Pengertian &amp; Unsur-Unsur Fungsi</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(exercises[2])}
      </tbody>
    </table>

    <!-- LATIHAN BAB 3 -->
    <h3>📐 Latihan Bab 3: Bentuk Notasi, Nilai &amp; Rumus Fungsi</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(exercises[3])}
      </tbody>
    </table>

    <div class="page-break"></div>

    <!-- LATIHAN BAB 4 -->
    <h3>📈 Latihan Bab 4: Grafik Fungsi Linear &amp; Kemiringan (Gradien)</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(exercises[4])}
      </tbody>
    </table>

    <!-- LATIHAN BAB 5 -->
    <h3>🔗 Latihan Bab 5: Korespondensi Satu-Satu (Bijeksi Timbal Balik)</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(exercises[5])}
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <!-- ======================================================== -->
  <!-- BAB 3: KATALOG MATRIKS SOAL QUEST MODE (BAB 1 - 5) -->
  <!-- ======================================================== -->
  <div>
    <h1>BAB 3: KATALOG MATRIKS SOAL QUEST MODE (BAB 1 – 5)</h1>
    <p>Quest Mode menyajikan evaluasi formal berstandar KKM dengan rasio 92% builder taktil dan volume data lebih kaya:</p>

    <!-- QUEST BAB 1 -->
    <h3>🏆 Quest Mode Bab 1: Evaluasi Relasi Kontekstual Murni</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(quests[1])}
      </tbody>
    </table>

    <div class="page-break"></div>

    <!-- QUEST BAB 2 -->
    <h3>🏆 Quest Mode Bab 2: Evaluasi Unsur &amp; Pemetaan Fungsi</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(quests[2])}
      </tbody>
    </table>

    <!-- QUEST BAB 3 -->
    <h3>🏆 Quest Mode Bab 3: Evaluasi Notasi &amp; Rumus Aljabar Linear</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(quests[3])}
      </tbody>
    </table>

    <div class="page-break"></div>

    <!-- QUEST BAB 4 -->
    <h3>🏆 Quest Mode Bab 4: Evaluasi Grafik Garis Lurus &amp; Gradien</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(quests[4])}
      </tbody>
    </table>

    <!-- QUEST BAB 5 -->
    <h3>🏆 Quest Mode Bab 5: Evaluasi Korespondensi Satu-Satu &amp; Faktorial n!</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(quests[5])}
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <!-- ======================================================== -->
  <!-- BAB 4: KATALOG MATRIKS SOAL ENDLESS MODE (100 SOAL) -->
  <!-- ======================================================== -->
  <div>
    <h1>BAB 4: KATALOG MATRIKS SOAL ENDLESS MODE (100 SOAL)</h1>
    <p>Bank soal survival komprehensif lintas materi (Bab 1–5) yang disusun berjenjang berdasarkan Taksonomi Bloom:</p>

    <!-- ENDLESS LEVEL C3 -->
    <h3>🟢 Tingkat C3: Aplikasi Cepat &amp; Komputasi Konsep (Soal 1 – 35)</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(endlessC3)}
      </tbody>
    </table>

    <div class="page-break"></div>

    <!-- ENDLESS LEVEL C4 -->
    <h3>🟡 Tingkat C4: Analisis Kasus &amp; Deteksi Miskonsepsi (Soal 36 – 70)</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(endlessC4)}
      </tbody>
    </table>

    <div class="page-break"></div>

    <!-- ENDLESS LEVEL C5 -->
    <h3>🔴 Tingkat C5: Evaluasi Pemodelan &amp; Dekripsi Kode (Soal 71 – 100)</h3>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Tipe Mekanik</th>
          <th>Judul Misi Kreatif</th>
          <th>Konsep Matematis</th>
        </tr>
      </thead>
      <tbody>
        ${renderTableRows(endlessC5)}
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <!-- ======================================================== -->
  <!-- BAB 5: PANDUAN PENGGUNAAN & TROUBLESHOOTING -->
  <!-- ======================================================== -->
  <div>
    <h1>BAB 5: PANDUAN PENGGUNAAN (USER MANUAL SISWA &amp; GURU)</h1>

    <h2>5.1 Panduan Cepat Penggunaan Game</h2>
    <div class="grid-2">
      <div class="card">
        <h4>💻 Untuk Siswa</h4>
        <ol>
          <li>Jalankan file <code>Detektif Data.exe</code> (versi portable atau hasil instalasi).</li>
          <li>Masukkan Nama Lengkap dan Kelas, lalu tekan Masuk.</li>
          <li>Pelajari materi di <strong>Chapter Mode</strong>, lalu asah keterampilan di <strong>Latihan</strong>.</li>
          <li>Selesaikan <strong>Quest Mode</strong> (&ge; 75 KKM) untuk mengunduh Sertifikat Digital!</li>
          <li>Uji kecepatan di <strong>Endless Mode</strong> untuk meraih posisi puncak Leaderboard.</li>
        </ol>
      </div>
      <div class="card">
        <h4>👨‍🏫 Untuk Guru</h4>
        <ol>
          <li>Gunakan mode proyektor di kelas untuk demonstrasi fitur taktil interaktif.</li>
          <li>Buka file <code>server_url.txt</code> jika ingin menyinkronkan seluruh laptop lab ke laptop server guru secara lokal tanpa internet.</li>
          <li>Buka menu <strong>Papan Peringkat / Admin</strong> untuk merekap nilai ujian seluruh siswa secara otomatis.</li>
        </ol>
      </div>
    </div>

    <h2>5.2 Pemecahan Masalah (Troubleshooting)</h2>
    <table>
      <tr>
        <th style="width: 25%;">Gejala</th>
        <th>Solusi Pemecahan Cepat</th>
      </tr>
      <tr>
        <td><strong>Suara tidak muncul</strong></td>
        <td>Pastikan tombol speaker di pojok kanan atas tidak di-mute, dan volume sistem Windows aktif.</td>
      </tr>
      <tr>
        <td><strong>Titik Kartesius meleset</strong></td>
        <td>Klik tepat pada persilangan garis kisi koordinat. Gunakan tombol "Hapus Titik" untuk reset.</td>
      </tr>
      <tr>
        <td><strong>Status jaringan merah</strong></td>
        <td>Tidak perlu khawatir! Game tetap berjalan 100% normal dan data tersimpan aman di komputer lokal.</td>
      </tr>
    </table>

    <div style="margin-top: 30px; text-align: center; border-top: 1px solid #CBD5E1; padding-top: 12px; color: #64748B; font-size: 8.5pt;">
      &copy; 2026 Game Detektif Data &bull; Hak Cipta Dilindungi Undang-Undang &bull; Dokumentasi Resmi Versi Final
    </div>
  </div>

</body>
</html>
`;
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(' 📚 GENERATOR MASTER PDF LENGKAP DENGAN MATRIKS BANK SOAL 📚');
  console.log('═══════════════════════════════════════════════════════════════');

  console.log('1. Membangun dokumen HTML standar percetakan A4...');
  const htmlContent = await buildFullHtml();
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log(`   ✅ File HTML berhasil dibuat di: ${htmlPath}`);

  console.log('\n2. Mengonversi ke PDF resolusi tinggi via Headless Chrome...');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  const intermediatePdf = path.join(exportDir, 'Buku_Panduan_Lengkap_Game_Detektif_Data.pdf');
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${intermediatePdf}`,
    fileUrl
  ];

  execFile(chromePath, args, (err, stdout, stderr) => {
    if (err) {
      console.error('   ❌ Gagal mengekspor PDF:', err);
      process.exit(1);
    }

    if (fs.existsSync(intermediatePdf)) {
      const stats = fs.statSync(intermediatePdf);
      const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`   🎉 Berhasil menghasilkan PDF Master (${sizeMb} MB)!`);

      // 1. Salin ke folder siap main
      if (fs.existsSync(targetSiapMain)) {
        try {
          fs.copyFileSync(intermediatePdf, pdfPathSiapMain);
          console.log(`   📍 Lokasi Siap Main: ${pdfPathSiapMain}`);
        } catch (copyErr) {
          console.warn('   ⚠️ Gagal menyalin ke folder siap main:', copyErr.message);
        }
      }

      // 2. Salin ke folder proyek utama dengan nama _Terbaru
      const pdfPathTerbaru = path.join('D:\\File Penting\\File S2\\Thesis Project', 'Buku_Panduan_Lengkap_Game_Detektif_Data_Terbaru.pdf');
      try {
        fs.copyFileSync(intermediatePdf, pdfPathTerbaru);
        console.log(`   📍 Lokasi Proyek: ${pdfPathTerbaru}`);
      } catch (copyErr) {
        console.warn('   ⚠️ Gagal menyalin ke file terbaru:', copyErr.message);
      }

      // 3. Coba salin ke file original jika tidak di-lock
      try {
        fs.copyFileSync(intermediatePdf, pdfPathRoot);
        console.log(`   📍 Lokasi Original: ${pdfPathRoot}`);
      } catch (lockErr) {
        console.log('   ℹ️ Catatan: File Buku_Panduan_Lengkap_Game_Detektif_Data.pdf sedang dibuka di viewer pengguna, file terbaru disimpan di Buku_Panduan_Lengkap_Game_Detektif_Data_Terbaru.pdf');
      }

      console.log('\n═══════════════════════════════════════════════════════════════');
      console.log('✅ BUKU PANDUAN DAN DOKUMENTASI MATRIKS SOAL PDF SIAP DIGUNAKAN!');
      console.log('═══════════════════════════════════════════════════════════════\n');
    } else {
      console.error('   ❌ File PDF tidak ditemukan setelah proses eksekusi.');
      process.exit(1);
    }
  });
}

main();

