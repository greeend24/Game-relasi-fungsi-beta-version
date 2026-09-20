import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { CHAPTERS_DATA } from '../src/data/chapterLearningData.js';

// Helper to escape HTML characters
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Convert markdown bold **text** to <strong>text</strong>
function formatMarkdown(text) {
  if (!text) return '';
  let str = escapeHtml(text);
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  str = str.replace(/\*(.*?)\*/g, '<em>$1</em>');
  str = str.replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');
  return str;
}

// Render Arrow Diagram as inline SVG
function renderArrowDiagramSvg(visual, diagram) {
  const data = visual || diagram;
  if (!data) return '';

  const setA = data.setA || [];
  const setB = data.setB || [];
  const pairs = data.pairs || data.arrows || [];
  const labelA = data.labelA || 'Himpunan A';
  const labelB = data.labelB || 'Himpunan B';
  const statusBadge = data.statusBadge || '';

  const itemHeight = 40;
  const topPadding = 55;
  const maxItems = Math.max(setA.length, setB.length, 2);
  const svgHeight = Math.max(220, topPadding + maxItems * itemHeight + 35);
  const svgWidth = 500;

  const colA_x = 100;
  const colB_x = 400;

  // Match item index
  function getIndex(val, set) {
    if (val === undefined || val === null) return -1;
    const s = String(val).trim().toLowerCase();
    let idx = set.findIndex(item => String(item).trim().toLowerCase() === s);
    if (idx !== -1) return idx;
    idx = set.findIndex(item => {
      const it = String(item).trim().toLowerCase();
      return it.includes(s) || s.includes(it);
    });
    if (idx !== -1) return idx;
    const num = Number(val);
    if (!isNaN(num) && num >= 0 && num < set.length) return num;
    return -1;
  }

  // Generate arrows
  let arrowPaths = '';
  pairs.forEach((pair, pIdx) => {
    const fromVal = Array.isArray(pair) ? pair[0] : pair.from;
    const toVal = Array.isArray(pair) ? pair[1] : pair.to;
    let idxA = getIndex(fromVal, setA);
    let idxB = getIndex(toVal, setB);

    if (idxA === -1 && typeof fromVal === 'number') idxA = fromVal;
    if (idxB === -1 && typeof toVal === 'number') idxB = toVal;

    if (idxA >= 0 && idxA < setA.length && idxB >= 0 && idxB < setB.length) {
      const yA = topPadding + idxA * itemHeight + 15;
      const yB = topPadding + idxB * itemHeight + 15;
      const xA = colA_x + 58;
      const xB = colB_x - 58;
      const cpX1 = xA + 60;
      const cpX2 = xB - 60;

      const colors = ['#D97706', '#2563EB', '#059669', '#7C3AED', '#DC2626', '#0891B2'];
      const color = colors[pIdx % colors.length];

      arrowPaths += `
        <path d="M ${xA} ${yA} C ${cpX1} ${yA}, ${cpX2} ${yB}, ${xB} ${yB}"
              fill="none" stroke="${color}" stroke-width="2.2" marker-end="url(#arrowhead-${color.replace('#','')})" />
      `;
    }
  });

  // Markers
  const markerColors = ['D97706', '2563EB', '059669', '7C3AED', 'DC2626', '0891B2'];
  let markers = '';
  markerColors.forEach(c => {
    markers += `
      <marker id="arrowhead-${c}" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
        <polygon points="0 0, 9 3.5, 0 7" fill="#${c}" />
      </marker>
    `;
  });

  // Ellipses for Set A & Set B
  const ellipseHeight = Math.max(160, maxItems * itemHeight + 30);
  const ellipseCenterY = topPadding + (maxItems * itemHeight) / 2;

  let itemsSvgA = '';
  setA.forEach((item, i) => {
    const y = topPadding + i * itemHeight + 15;
    itemsSvgA += `
      <circle cx="${colA_x + 55}" cy="${y}" r="4" fill="#D97706" />
      <text x="${colA_x + 40}" y="${y + 4}" text-anchor="end" font-size="12" font-weight="600" fill="#1E293B">${escapeHtml(item)}</text>
    `;
  });

  let itemsSvgB = '';
  setB.forEach((item, i) => {
    const y = topPadding + i * itemHeight + 15;
    itemsSvgB += `
      <circle cx="${colB_x - 55}" cy="${y}" r="4" fill="#2563EB" />
      <text x="${colB_x - 40}" y="${y + 4}" text-anchor="start" font-size="12" font-weight="600" fill="#1E293B">${escapeHtml(item)}</text>
    `;
  });

  return `
    <div class="diagram-wrapper">
      ${statusBadge ? `<div class="diagram-badge">${escapeHtml(statusBadge)}</div>` : ''}
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="arrow-svg" style="max-width: 500px; width: 100%; height: auto;">
        <defs>${markers}</defs>
        <!-- Himpunan A Ellipse -->
        <ellipse cx="${colA_x}" cy="${ellipseCenterY}" rx="75" ry="${ellipseHeight / 2}" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" stroke-dasharray="3,3" opacity="0.85" />
        <text x="${colA_x}" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400E">${escapeHtml(labelA)}</text>

        <!-- Himpunan B Ellipse -->
        <ellipse cx="${colB_x}" cy="${ellipseCenterY}" rx="75" ry="${ellipseHeight / 2}" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2" stroke-dasharray="3,3" opacity="0.85" />
        <text x="${colB_x}" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#1E40AF">${escapeHtml(labelB)}</text>

        <!-- Connecting Arrows -->
        ${arrowPaths}

        <!-- Items -->
        ${itemsSvgA}
        ${itemsSvgB}
      </svg>
      ${data.caption ? `<div class="diagram-caption">${escapeHtml(data.caption)}</div>` : ''}
    </div>
  `;
}

// Render Cartesian Graph as SVG
function renderCartesianGraphSvg(visual) {
  if (!visual) return '';
  const { formula, slope, yIntercept, testPoints = [], twoPoints = [] } = visual;

  const w = 460;
  const h = 280;
  const ox = 200;
  const oy = 160;
  const step = 28; // pixels per unit

  let gridLines = '';
  for (let x = -6; x <= 8; x++) {
    const px = ox + x * step;
    gridLines += `<line x1="${px}" y1="20" x2="${px}" y2="${h - 20}" stroke="#E2E8F0" stroke-width="1" />`;
    if (x !== 0 && x >= -5 && x <= 7) {
      gridLines += `<text x="${px}" y="${oy + 14}" text-anchor="middle" font-size="9" fill="#94A3B8">${x}</text>`;
    }
  }
  for (let y = -4; y <= 5; y++) {
    const py = oy - y * step;
    gridLines += `<line x1="20" y1="${py}" x2="${w - 20}" y2="${py}" stroke="#E2E8F0" stroke-width="1" />`;
    if (y !== 0 && y >= -4 && y <= 4) {
      gridLines += `<text x="${ox - 8}" y="${py + 3}" text-anchor="end" font-size="9" fill="#94A3B8">${y}</text>`;
    }
  }

  // Calculate line endpoints if formula / slope available
  let lineSvg = '';
  const m = slope !== undefined ? slope : (formula && formula.includes('2x + 1') ? 2 : 1);
  const c = yIntercept !== undefined ? yIntercept : (formula && formula.includes('2x + 1') ? 1 : 0);

  if (m !== undefined && c !== undefined) {
    // x from -4 to 4
    const xStart = -4.5;
    const yStart = m * xStart + c;
    const xEnd = 4.5;
    const yEnd = m * xEnd + c;

    const px1 = ox + xStart * step;
    const py1 = oy - yStart * step;
    const px2 = ox + xEnd * step;
    const py2 = oy - yEnd * step;

    lineSvg = `
      <line x1="${px1}" y1="${py1}" x2="${px2}" y2="${py2}" stroke="#0284C7" stroke-width="3" />
      <text x="${px2 - 10}" y="${py2 - 8}" font-size="11" font-weight="bold" fill="#0369A1">${escapeHtml(formula || `y = ${m}x + ${c}`)}</text>
    `;
  }

  // Plot Points
  let pointsSvg = '';
  const allPoints = [...testPoints, ...twoPoints];
  allPoints.forEach(pt => {
    const [pxVal, pyVal] = pt;
    const cx = ox + pxVal * step;
    const cy = oy - pyVal * step;
    pointsSvg += `
      <circle cx="${cx}" cy="${cy}" r="5" fill="#EF4444" stroke="#FFFFFF" stroke-width="2" />
      <rect x="${cx + 6}" y="${cy - 16}" width="42" height="16" rx="4" fill="#1E293B" opacity="0.8" />
      <text x="${cx + 27}" y="${cy - 4}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#FFFFFF">(${pxVal}, ${pyVal})</text>
    `;
  });

  return `
    <div class="diagram-wrapper">
      <div class="diagram-badge">Grafik Garis Lurus: ${escapeHtml(formula || 'Koordinat Cartesius')}</div>
      <svg viewBox="0 0 ${w} ${h}" style="max-width: 460px; width: 100%; height: auto;">
        <defs>
          <marker id="axis-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#64748B" />
          </marker>
        </defs>
        <!-- Grid -->
        ${gridLines}
        <!-- X and Y Axes -->
        <line x1="20" y1="${oy}" x2="${w - 15}" y2="${oy}" stroke="#475569" stroke-width="2" marker-end="url(#axis-arrow)" />
        <line x1="${ox}" y1="${h - 15}" x2="${ox}" y2="15" stroke="#475569" stroke-width="2" marker-end="url(#axis-arrow)" />
        <text x="${w - 10}" y="${oy - 8}" font-size="12" font-weight="bold" fill="#334155">X</text>
        <text x="${ox + 10}" y="18" font-size="12" font-weight="bold" fill="#334155">Y</text>
        <text x="${ox - 8}" y="${oy + 14}" font-size="10" font-weight="bold" fill="#475569">O</text>
        <!-- Slope Line -->
        ${lineSvg}
        <!-- Plotted points -->
        ${pointsSvg}
      </svg>
    </div>
  `;
}

// Render Function Machine Visual
function renderFunctionMachineHtml(visual) {
  const { formula = 'f(x) = ax + b', inputVal = 'x', outputVal = 'y', processSteps = '', step = '', machineName = 'Mesin Fungsi' } = visual;
  const displayedStep = processSteps || step;
  return `
    <div class="function-machine-box">
      <div class="machine-title">⚙️ ${escapeHtml(machineName)} (Input ➔ Proses ➔ Output)</div>
      <div class="machine-pipeline">
        <div class="machine-node node-input">
          <span class="node-label">INPUT (x)</span>
          <span class="node-val">${escapeHtml(String(inputVal))}</span>
        </div>
        <div class="machine-arrow">➔</div>
        <div class="machine-core">
          <span class="core-tag">RUMUS & PROSES</span>
          <span class="core-formula">${escapeHtml(formula)}</span>
          ${displayedStep ? `<span class="core-step">${escapeHtml(displayedStep)}</span>` : ''}
        </div>
        <div class="machine-arrow">➔</div>
        <div class="machine-node node-output">
          <span class="node-label">OUTPUT (f(x))</span>
          <span class="node-val">${escapeHtml(String(outputVal))}</span>
        </div>
      </div>
    </div>
  `;
}

// Render Relation Table Visual
function renderRelationTableHtml(visual) {
  const { title = 'Tabel Data Relasi', headers = ['x', 'y'], pairs = [] } = visual;
  return `
    <div class="table-visual-box">
      <div class="table-title">📊 ${escapeHtml(title)}</div>
      <table class="data-table">
        <thead>
          <tr>
            ${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${pairs.map(row => `
            <tr>
              ${row.map(cell => `<td>${escapeHtml(String(cell))}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// Render Ordered Pairs Visual
function renderOrderedPairsHtml(visual) {
  const { title = 'Himpunan Pasangan Berurutan', pairs = [], domain = [], kodomain = [], range = [] } = visual;
  const pairsStr = pairs.map(p => `(${p[0]}, ${p[1]})`).join(', ');
  return `
    <div class="pairs-visual-box">
      <div class="pairs-title">📦 ${escapeHtml(title)}</div>
      <div class="pairs-code">R = { ${escapeHtml(pairsStr)} }</div>
      <div class="pairs-meta">
        ${domain.length ? `<div class="meta-tag tag-domain"><strong>Domain (Asal):</strong> { ${escapeHtml(domain.join(', '))} }</div>` : ''}
        ${kodomain.length ? `<div class="meta-tag tag-kodomain"><strong>Kodomain (Kawan):</strong> { ${escapeHtml(kodomain.join(', '))} }</div>` : ''}
        ${range.length ? `<div class="meta-tag tag-range"><strong>Range (Hasil):</strong> { ${escapeHtml(range.join(', '))} }</div>` : ''}
      </div>
    </div>
  `;
}

// Render One-to-One Board Visual
function renderOneToOneBoardHtml(visual) {
  const { title = 'Papan Korespondensi Satu-Satu', setA = [], setB = [], pairs = [], rule = '' } = visual;
  return `
    <div class="bijection-box">
      <div class="bijection-title">⚡ ${escapeHtml(title)}</div>
      ${rule ? `<div class="bijection-rule">Aturan: <strong>${escapeHtml(rule)}</strong> (Setiap anggota tepat memiliki 1 pasangan unik)</div>` : ''}
      <div class="bijection-grid">
        ${pairs.map((p, idx) => `
          <div class="bijection-item">
            <span class="item-left">${escapeHtml(p[0])}</span>
            <span class="item-arrow">⟷</span>
            <span class="item-right">${escapeHtml(p[1])}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Generate Slide Visual Dispatcher
function renderSlideVisual(seg) {
  let out = '';
  if (seg.visual) {
    switch (seg.visual.type) {
      case 'arrow_diagram':
        out += renderArrowDiagramSvg(seg.visual, seg.diagram);
        break;
      case 'cartesian_graph':
        out += renderCartesianGraphSvg(seg.visual);
        break;
      case 'function_machine':
        out += renderFunctionMachineHtml(seg.visual);
        break;
      case 'relation_table':
        out += renderRelationTableHtml(seg.visual);
        break;
      case 'ordered_pairs':
        out += renderOrderedPairsHtml(seg.visual);
        break;
      case 'one_to_one_board':
        out += renderOneToOneBoardHtml(seg.visual);
        break;
      default:
        break;
    }
  } else if (seg.diagram && seg.diagram.type === 'arrow') {
    out += renderArrowDiagramSvg(null, seg.diagram);
  }
  return out;
}

// Build Entire HTML Document
export function buildHtmlDocument() {
  const chapterList = Object.values(CHAPTERS_DATA);
  let chaptersContent = '';

  chapterList.forEach((ch) => {
    let slidesContent = '';

    ch.segments.forEach((seg, sIdx) => {
      const slideNum = sIdx + 1;
      const totalSlides = ch.segments.length;
      let badgeType = '';
      let badgeClass = '';
      let bodyHtml = '';
      let videoActionNote = '';

      if (seg.type === 'lesson') {
        badgeType = 'Materi Pembelajaran (Lesson Slide)';
        badgeClass = 'badge-lesson';
        videoActionNote = `
          <strong>🎬 Catatan Video Interaktif (Scene & Narasi):</strong><br>
          • <em>Visual Animasi:</em> Tampilkan grafis/diagram langkah demi langkah serempak dengan narasi suara Detektif Relo.<br>
          • <em>Titik Fokus:</em> Tekankan kata kunci utama dengan efek highlight teks bercahaya sebelum transisi ke aktivitas berikutnya.
        `;

        const contentLines = Array.isArray(seg.content) ? seg.content : [seg.content];
        bodyHtml += `
          <div class="lesson-content">
            ${contentLines.map(line => `<p class="lesson-para">${formatMarkdown(line)}</p>`).join('')}
          </div>
          ${renderSlideVisual(seg)}
        `;
      } else if (seg.type === 'interactive_connect') {
        badgeType = 'Praktik Interaktif: Hubungkan Garis (Interactive Cable Connect)';
        badgeClass = 'badge-interactive';
        videoActionNote = `
          <strong>🎬 Catatan Video Interaktif (Interaksi Peserta):</strong><br>
          • <em>Interactive Pause:</em> Video berhenti otomatis dan memunculkan canvas interaktif penarikan garis pin.<br>
          • <em>Audio & Masuk Selanjutnya:</em> Efek suara tali/kabel saat ditarik. Setelah tombol 'Verifikasi' ditekan dan benar, suara Relo memberikan apresiasi dan video berlanjut otomatis.
        `;

        bodyHtml += `
          <div class="interactive-box">
            <div class="interactive-instruction">🎯 <strong>Instruksi Praktik:</strong> ${escapeHtml(seg.instruction)}</div>
            <div class="interactive-rule">📋 <strong>Skenario / Aturan:</strong> ${escapeHtml(seg.ruleText)}</div>
            
            <div class="interactive-sets">
              <div class="set-col">
                <span class="set-head">${escapeHtml(seg.labelA || 'Himpunan A')}</span>
                <ul>
                  ${(seg.setA || []).map((item, i) => `<li><span class="idx-dot">${i + 1}</span> ${escapeHtml(item)}</li>`).join('')}
                </ul>
              </div>
              <div class="set-arrow">⤳</div>
              <div class="set-col">
                <span class="set-head">${escapeHtml(seg.labelB || 'Himpunan B')}</span>
                <ul>
                  ${(seg.setB || []).map((item, i) => `<li><span class="idx-dot">${i + 1}</span> ${escapeHtml(item)}</li>`).join('')}
                </ul>
              </div>
            </div>

            <div class="interactive-solution">
              <span class="sol-title">🔑 Kunci Sambungan Pasangan yang Benar:</span>
              <div class="sol-list">
                ${(seg.validPairs || []).map(p => {
                  const itemA = seg.setA ? seg.setA[p[0]] : p[0];
                  const itemB = seg.setB ? seg.setB[p[1]] : p[1];
                  return `<span class="sol-item">${escapeHtml(itemA)} ➔ ${escapeHtml(itemB)}</span>`;
                }).join(' ')}
              </div>
            </div>

            ${seg.hint ? `<div class="interactive-hint">💡 <strong>Petunjuk Bantuan (Hint):</strong> ${escapeHtml(seg.hint)}</div>` : ''}
            ${seg.successMessage ? `<div class="interactive-success">🎉 <strong>Umpan Balik Sukses:</strong> ${escapeHtml(seg.successMessage)}</div>` : ''}
          </div>
        `;
      } else if (seg.type === 'interactive_table') {
        badgeType = 'Praktik Interaktif: Lengkapi Tabel & Pasangan Berurutan';
        badgeClass = 'badge-interactive';
        videoActionNote = `
          <strong>🎬 Catatan Video Interaktif:</strong><br>
          • <em>Video Breakpoint:</em> Siswa memasukkan input nilai y dan pasangan (x, y) ke dalam slot interaktif.<br>
          • <em>Feedback:</em> Penjelasan visual instan bila isian baris sudah sesuai dengan aturan fungsi/relasi.
        `;

        bodyHtml += `
          <div class="interactive-box">
            <div class="interactive-instruction">🎯 <strong>Instruksi:</strong> ${escapeHtml(seg.instruction)}</div>
            ${seg.ruleText ? `<div class="interactive-rule">📋 <strong>Aturan Relasi:</strong> ${escapeHtml(seg.ruleText)}</div>` : ''}
            
            ${seg.tableData ? `
              <div class="table-visual-box" style="margin: 12px 0;">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Input x</th>
                      <th>Aturan Pemetaan</th>
                      <th>Hasil y</th>
                      <th>Pasangan (x, y)</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${seg.tableData.map(row => `
                      <tr>
                        <td><strong>${escapeHtml(String(row.x))}</strong></td>
                        <td>${escapeHtml(row.formula || row.rule || '-')}</td>
                        <td><span class="badge-accent">${escapeHtml(String(row.y))}</span></td>
                        <td><code>(${escapeHtml(String(row.x))}, ${escapeHtml(String(row.y))})</code></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}

            ${seg.hint ? `<div class="interactive-hint">💡 <strong>Petunjuk:</strong> ${escapeHtml(seg.hint)}</div>` : ''}
          </div>
        `;
      } else if (seg.type === 'interactive_cartesian') {
        badgeType = 'Praktik Interaktif: Plot Titik & Grafik Cartesius';
        badgeClass = 'badge-interactive';
        videoActionNote = `
          <strong>🎬 Catatan Video Interaktif:</strong><br>
          • <em>Layar Interaktif:</em> Bidang koordinat Cartesius muncul di layar video. Siswa mengklik titik koordinat target sebelum garis fungsi linear otomatis terbentuk menyambungkan seluruh titik.
        `;

        bodyHtml += `
          <div class="interactive-box">
            <div class="interactive-instruction">🎯 <strong>Instruksi:</strong> ${escapeHtml(seg.instruction)}</div>
            ${seg.functionFormula ? `<div class="interactive-rule">📐 <strong>Persamaan Garis / Rumus:</strong> <code>${escapeHtml(seg.functionFormula)}</code></div>` : ''}

            ${seg.tablePoints && seg.tablePoints.length ? `
              <div class="cartesian-points-table">
                <span class="sol-title">📍 Titik Koordinat yang Dihitung:</span>
                <div class="points-badge-row">
                  ${seg.tablePoints.map(pt => `<span class="pt-pill">(${pt[0]}, ${pt[1]})</span>`).join('')}
                </div>
              </div>
            ` : ''}

            ${renderCartesianGraphSvg({ formula: seg.functionFormula || 'f(x) = 2x + 1', testPoints: seg.tablePoints || [[-1,-1], [0,1], [1,3], [2,5]] })}

            ${seg.hint ? `<div class="interactive-hint">💡 <strong>Petunjuk:</strong> ${escapeHtml(seg.hint)}</div>` : ''}
          </div>
        `;
      } else if (seg.type === 'quiz') {
        badgeType = 'Kuis Formatif Interaktif (Interactive Quiz)';
        badgeClass = 'badge-quiz';
        videoActionNote = `
          <strong>🎬 Catatan Video Interaktif (Percabangan Kuis):</strong><br>
          • <em>Interactive Branching:</em> Video berhenti dan menampilkan 4 tombol pilihan.<br>
          • <em>Jika Jawaban Benar:</em> Terdengar suara benar, animasi bintang/piala, dan video berlanjut.<br>
          • <em>Jika Jawaban Salah:</em> Pemutar video secara otomatis dialihkan ke sub-scene remedial (penjelasan konsep dan soal remedial retry).
        `;

        bodyHtml += `
          <div class="quiz-box">
            ${seg.clue ? `
              <div class="quiz-clue">
                <span class="clue-icon">🕵️‍♂️</span>
                <div class="clue-text"><strong>Petunjuk Detektif Relo:</strong> ${escapeHtml(seg.clue)}</div>
              </div>
            ` : ''}

            <div class="quiz-question">
              <strong>Pertanyaan:</strong><br>
              ${escapeHtml(seg.question).replace(/\n/g, '<br>')}
            </div>

            ${renderSlideVisual(seg)}

            <div class="quiz-options">
              ${(seg.options || []).map((opt, oIdx) => {
                const optLetter = String.fromCharCode(65 + oIdx);
                const isCorrect = opt === seg.correct;
                return `
                  <div class="quiz-opt-item ${isCorrect ? 'opt-correct' : ''}">
                    <span class="opt-letter">${optLetter}</span>
                    <span class="opt-text">${escapeHtml(opt)}</span>
                    ${isCorrect ? '<span class="opt-badge">✔ Kunci Jawaban</span>' : ''}
                  </div>
                `;
              }).join('')}
            </div>

            ${seg.explanation ? `
              <div class="quiz-explanation">
                <div class="exp-head">📖 <strong>Pembahasan Mendalam:</strong></div>
                <div class="exp-body">${escapeHtml(seg.explanation)}</div>
              </div>
            ` : ''}

            ${seg.remedial ? `
              <div class="quiz-remedial">
                <div class="remedial-badge">🔄 Modul Remedial Cabang Video</div>
                <div class="remedial-content">
                  ${(seg.remedial.content || []).map(line => `<div class="remedial-line">${formatMarkdown(line)}</div>`).join('')}
                </div>
                ${seg.remedial.retryQuestion ? `
                  <div class="remedial-retry">
                    <div class="retry-q"><strong>Soal Uji Remedial (Retry):</strong> ${escapeHtml(seg.remedial.retryQuestion.question)}</div>
                    <div class="retry-options">
                      ${(seg.remedial.retryQuestion.options || []).map((rOpt, rIdx) => {
                        const rLetter = String.fromCharCode(65 + rIdx);
                        const isRCorrect = rOpt === seg.remedial.retryQuestion.correct;
                        return `
                          <div class="retry-opt ${isRCorrect ? 'retry-opt-correct' : ''}">
                            <strong>${rLetter}.</strong> ${escapeHtml(rOpt)} ${isRCorrect ? '(✔ Kunci)' : ''}
                          </div>
                        `;
                      }).join('')}
                    </div>
                    ${seg.remedial.retryQuestion.explanation ? `
                      <div class="retry-exp">💡 <em>Pembahasan Remedial:</em> ${escapeHtml(seg.remedial.retryQuestion.explanation)}</div>
                    ` : ''}
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        `;
      }

      slidesContent += `
        <div class="slide-card" id="ch${ch.id}-s${slideNum}">
          <div class="slide-header">
            <div class="slide-meta">
              <span class="chapter-tag" style="background-color: ${ch.color};">CHAPTER ${ch.id}</span>
              <span class="slide-counter">SLIDE ${slideNum} DARI ${totalSlides}</span>
              <span class="slide-type-badge ${badgeClass}">${badgeType}</span>
            </div>
            <h3 class="slide-title">
              <span class="slide-emoji">${seg.emoji || '📌'}</span>
              ${escapeHtml(seg.title)}
            </h3>
          </div>

          <div class="slide-body">
            ${bodyHtml}
          </div>

          <div class="video-note-box">
            ${videoActionNote}
          </div>
        </div>
      `;
    });

    chaptersContent += `
      <div class="chapter-section" id="chapter-${ch.id}">
        <!-- CHAPTER COVER PAGE -->
        <div class="chapter-cover" style="border-top: 6px solid ${ch.color};">
          <div class="cover-icon-circle" style="background-color: ${ch.color}18; color: ${ch.color}; border: 2px solid ${ch.color}40;">
            ${ch.icon || '📚'}
          </div>
          <div class="cover-eyebrow" style="color: ${ch.color};">MODUL PEMBELAJARAN INTERAKTIF • SMP KELAS 8</div>
          <h2 class="cover-title">Chapter ${ch.id}: ${escapeHtml(ch.title)}</h2>
          <p class="cover-subtitle">${escapeHtml(ch.subtitle)}</p>
          
          <div class="cover-stats-row">
            <div class="stat-pill"><strong>Total Slide:</strong> ${ch.segments.length} Slide</div>
            <div class="stat-pill"><strong>Format:</strong> Video Interaktif &amp; Gamifikasi</div>
            <div class="stat-pill"><strong>Fokus:</strong> Konsep, Praktik &amp; Evaluasi Formatif</div>
          </div>
        </div>

        <!-- SLIDES LIST -->
        <div class="slides-container">
          ${slidesContent}
        </div>
      </div>
    `;
  });

  // Table of Contents HTML
  let tocHtml = '';
  chapterList.forEach(ch => {
    tocHtml += `
      <div class="toc-chapter-block">
        <div class="toc-ch-title" style="color: ${ch.color};">
          <span>Chapter ${ch.id}: ${escapeHtml(ch.title)}</span>
          <span class="toc-ch-count">${ch.segments.length} Slide</span>
        </div>
        <div class="toc-slides-grid">
          ${ch.segments.map((s, idx) => `
            <a href="#ch${ch.id}-s${idx + 1}" class="toc-slide-link">
              <span class="toc-s-num">${idx + 1}</span>
              <span class="toc-s-name">${escapeHtml(s.title)}</span>
              <span class="toc-s-type">${s.type === 'lesson' ? 'Materi' : (s.type === 'quiz' ? 'Kuis' : 'Praktik')}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Modul Materi Video Interaktif Relasi &amp; Fungsi - Chapter Mode</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

    @page {
      size: A4 portrait;
      margin: 12mm 14mm 14mm 14mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 9pt;
        color: #64748B;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      color: #1E293B;
      background: #FFFFFF;
      font-size: 10.5pt;
      line-height: 1.55;
    }

    /* MASTER COVER PAGE */
    .master-cover {
      page-break-after: always;
      min-height: 94vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #E2E8F0;
      border-radius: 20px;
      padding: 40px;
      background: linear-gradient(145deg, #F8FAFC 0%, #EFF6FF 50%, #FAF5FF 100%);
      position: relative;
      overflow: hidden;
    }
    .cover-top-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: #3B82F6;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 11pt;
      border-radius: 999px;
      width: fit-content;
      letter-spacing: 0.5px;
    }
    .cover-hero {
      margin: 40px 0;
    }
    .cover-hero h1 {
      font-size: 32pt;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.2;
      margin: 0 0 16px 0;
      letter-spacing: -0.5px;
    }
    .cover-hero .cover-sub {
      font-size: 15pt;
      font-weight: 600;
      color: #475569;
      line-height: 1.4;
      margin-bottom: 24px;
    }
    .cover-hero .cover-desc {
      font-size: 11pt;
      color: #64748B;
      max-width: 650px;
      line-height: 1.6;
    }
    .cover-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      margin: 30px 0;
    }
    .ch-card-pill {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 12px;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }
    .ch-card-pill .icon { font-size: 22pt; margin-bottom: 4px; }
    .ch-card-pill .title { font-size: 9.5pt; font-weight: 700; color: #1E293B; }
    .ch-card-pill .slides { font-size: 8pt; color: #64748B; font-weight: 600; }
    .cover-footer {
      border-top: 1px solid #CBD5E1;
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9.5pt;
      color: #64748B;
    }

    /* TABLE OF CONTENTS PAGE */
    .toc-section {
      page-break-before: always;
      page-break-after: always;
      padding: 20px 0;
    }
    .toc-header {
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .toc-header h2 {
      font-size: 20pt;
      font-weight: 800;
      color: #0F172A;
      margin: 0 0 6px 0;
    }
    .toc-chapter-block {
      margin-bottom: 20px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 14px 18px;
    }
    .toc-ch-title {
      font-size: 12pt;
      font-weight: 800;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      border-bottom: 1px dashed #CBD5E1;
      padding-bottom: 6px;
    }
    .toc-slides-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 16px;
    }
    .toc-slide-link {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 9pt;
      color: #334155;
      text-decoration: none;
      padding: 3px 6px;
      border-radius: 6px;
    }
    .toc-slide-link:hover {
      background: #E2E8F0;
    }
    .toc-s-num {
      font-weight: 800;
      color: #0F172A;
      background: #E2E8F0;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 8pt;
    }
    .toc-s-name {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
    }
    .toc-s-type {
      font-size: 7.5pt;
      padding: 1px 6px;
      background: #EDE9FE;
      color: #6D28D9;
      border-radius: 4px;
      font-weight: 700;
    }

    /* CHAPTER SECTION */
    .chapter-section {
      page-break-before: always;
    }

    .chapter-cover {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 24px 28px;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    .cover-icon-circle {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26pt;
      margin-bottom: 12px;
    }
    .cover-eyebrow {
      font-size: 9pt;
      font-weight: 800;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    .cover-title {
      font-size: 20pt;
      font-weight: 800;
      color: #0F172A;
      margin: 0 0 6px 0;
    }
    .cover-subtitle {
      font-size: 11pt;
      color: #475569;
      margin: 0 0 16px 0;
    }
    .cover-stats-row {
      display: flex;
      gap: 12px;
    }
    .stat-pill {
      background: #F1F5F9;
      border: 1px solid #E2E8F0;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 8.5pt;
      color: #334155;
    }

    /* SLIDE CARD */
    .slide-card {
      background: #FFFFFF;
      border: 1.5px solid #E2E8F0;
      border-radius: 14px;
      padding: 18px 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .slide-header {
      border-bottom: 1px solid #F1F5F9;
      padding-bottom: 10px;
      margin-bottom: 14px;
    }
    .slide-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .chapter-tag {
      color: #FFFFFF;
      font-size: 7.5pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }
    .slide-counter {
      font-size: 8pt;
      font-weight: 700;
      color: #64748B;
      background: #F1F5F9;
      padding: 2px 8px;
      border-radius: 6px;
    }
    .slide-type-badge {
      font-size: 8pt;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
      margin-left: auto;
    }
    .badge-lesson { background: #E0F2FE; color: #0369A1; }
    .badge-interactive { background: #FEF3C7; color: #B45309; }
    .badge-quiz { background: #FCE7F3; color: #BE185D; }

    .slide-title {
      font-size: 13.5pt;
      font-weight: 800;
      color: #0F172A;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .slide-emoji { font-size: 15pt; }

    /* LESSON CONTENT */
    .lesson-content {
      margin-bottom: 14px;
    }
    .lesson-para {
      margin: 0 0 8px 0;
      font-size: 10pt;
      color: #334155;
      line-height: 1.55;
    }
    .lesson-para:last-child { margin-bottom: 0; }
    .inline-code {
      font-family: 'JetBrains Mono', monospace;
      background: #F1F5F9;
      color: #0F172A;
      padding: 1px 5px;
      border-radius: 4px;
      font-size: 9pt;
    }

    /* DIAGRAM & VISUALS */
    .diagram-wrapper {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 12px;
      margin: 12px 0;
      text-align: center;
    }
    .diagram-badge {
      display: inline-block;
      font-size: 8pt;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 999px;
      background: #E2E8F0;
      color: #334155;
      margin-bottom: 8px;
    }
    .diagram-caption {
      font-size: 8.5pt;
      font-style: italic;
      color: #64748B;
      margin-top: 6px;
    }

    /* FUNCTION MACHINE */
    .function-machine-box {
      background: #FFFBEB;
      border: 1.5px solid #FCD34D;
      border-radius: 12px;
      padding: 12px 16px;
      margin: 12px 0;
    }
    .machine-title {
      font-size: 9pt;
      font-weight: 800;
      color: #B45309;
      margin-bottom: 10px;
    }
    .machine-pipeline {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    .machine-node {
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
      border-radius: 10px;
      padding: 8px 14px;
      text-align: center;
      min-width: 90px;
    }
    .node-input { border-color: #93C5FD; background: #EFF6FF; }
    .node-output { border-color: #86EFAC; background: #F0FDF4; }
    .node-label { display: block; font-size: 7.5pt; font-weight: 800; color: #475569; }
    .node-val { font-size: 13pt; font-weight: 800; color: #0F172A; font-family: 'JetBrains Mono', monospace; }
    .machine-arrow { font-size: 16pt; color: #F59E0B; font-weight: bold; }
    .machine-core {
      background: #78350F;
      color: #FFFFFF;
      border-radius: 10px;
      padding: 8px 16px;
      text-align: center;
      min-width: 140px;
    }
    .core-tag { display: block; font-size: 7pt; font-weight: 800; color: #FDE68A; letter-spacing: 0.5px; }
    .core-formula { display: block; font-size: 12pt; font-weight: 800; font-family: 'JetBrains Mono', monospace; margin: 2px 0; }
    .core-step { display: block; font-size: 8pt; color: #FEF3C7; font-family: 'JetBrains Mono', monospace; }

    /* TABLES */
    .table-visual-box {
      margin: 10px 0;
    }
    .table-title {
      font-size: 9pt;
      font-weight: 800;
      color: #334155;
      margin-bottom: 6px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
    }
    .data-table th, .data-table td {
      border: 1px solid #CBD5E1;
      padding: 6px 10px;
      text-align: center;
    }
    .data-table th {
      background: #F1F5F9;
      font-weight: 700;
      color: #1E293B;
    }
    .data-table tr:nth-child(even) {
      background: #F8FAFC;
    }

    /* ORDERED PAIRS */
    .pairs-visual-box {
      background: #F1F5F9;
      border: 1px solid #CBD5E1;
      border-radius: 10px;
      padding: 10px 14px;
      margin: 10px 0;
    }
    .pairs-title { font-size: 8.5pt; font-weight: 800; color: #334155; margin-bottom: 4px; }
    .pairs-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11pt;
      font-weight: 700;
      color: #0F172A;
      background: #FFFFFF;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid #E2E8F0;
      margin-bottom: 8px;
    }
    .pairs-meta { display: flex; flex-wrap: wrap; gap: 8px; }
    .meta-tag {
      font-size: 8pt;
      padding: 2px 8px;
      border-radius: 6px;
      border: 1px solid #CBD5E1;
      background: #FFFFFF;
    }
    .tag-domain { color: #1E40AF; border-color: #BFDBFE; background: #EFF6FF; }
    .tag-kodomain { color: #854D0E; border-color: #FDE68A; background: #FEFCE8; }
    .tag-range { color: #166534; border-color: #BBF7D0; background: #F0FDF4; }

    /* ONE TO ONE BIJECTION */
    .bijection-box {
      background: #FAF5FF;
      border: 1px solid #D8B4FE;
      border-radius: 10px;
      padding: 10px 14px;
      margin: 10px 0;
    }
    .bijection-title { font-size: 9pt; font-weight: 800; color: #6B21A8; margin-bottom: 4px; }
    .bijection-rule { font-size: 8.5pt; color: #581C87; margin-bottom: 8px; }
    .bijection-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 8px;
    }
    .bijection-item {
      background: #FFFFFF;
      border: 1px solid #E9D5FF;
      border-radius: 8px;
      padding: 6px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 9pt;
      font-weight: 600;
    }
    .item-arrow { color: #9333EA; font-weight: bold; }

    /* INTERACTIVE SECTIONS */
    .interactive-box {
      background: #FFFDF5;
      border: 1.5px dashed #F59E0B;
      border-radius: 12px;
      padding: 12px 14px;
      margin: 10px 0;
    }
    .interactive-instruction { font-size: 9.5pt; color: #1E293B; margin-bottom: 6px; }
    .interactive-rule { font-size: 9pt; color: #92400E; margin-bottom: 10px; }
    .interactive-sets {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin: 12px 0;
    }
    .set-col {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 10px;
      padding: 8px 14px;
      min-width: 140px;
    }
    .set-head { display: block; font-size: 8.5pt; font-weight: 800; color: #334155; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; margin-bottom: 6px; text-align: center; }
    .set-col ul { margin: 0; padding: 0; list-style: none; font-size: 9pt; }
    .set-col li { padding: 3px 0; display: flex; align-items: center; gap: 6px; }
    .idx-dot { font-size: 7.5pt; font-weight: 800; background: #F1F5F9; color: #475569; width: 16px; height: 16px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
    .set-arrow { font-size: 18pt; color: #F59E0B; font-weight: bold; }
    
    .interactive-solution {
      background: #ECFDF5;
      border: 1px solid #6EE7B7;
      border-radius: 8px;
      padding: 8px 12px;
      margin-top: 10px;
    }
    .sol-title { display: block; font-size: 8.5pt; font-weight: 800; color: #065F46; margin-bottom: 4px; }
    .sol-list { display: flex; flex-wrap: wrap; gap: 6px; }
    .sol-item {
      background: #FFFFFF;
      border: 1px solid #A7F3D0;
      color: #047857;
      font-size: 8.5pt;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
    }
    .interactive-hint {
      margin-top: 8px;
      font-size: 8.5pt;
      color: #B45309;
      background: #FEF3C7;
      padding: 6px 10px;
      border-radius: 6px;
    }
    .interactive-success {
      margin-top: 8px;
      font-size: 8.5pt;
      color: #065F46;
      background: #D1FAE5;
      padding: 6px 10px;
      border-radius: 6px;
    }
    .badge-accent {
      background: #DBEAFE;
      color: #1E40AF;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: bold;
    }
    .cartesian-points-table { margin: 10px 0; }
    .points-badge-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
    .pt-pill {
      background: #EFF6FF;
      border: 1px solid #BFDBFE;
      color: #1D4ED8;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9pt;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
    }

    /* QUIZ STYLING */
    .quiz-box {
      margin: 10px 0;
    }
    .quiz-clue {
      background: #EFF6FF;
      border-left: 3px solid #3B82F6;
      border-radius: 0 8px 8px 0;
      padding: 8px 12px;
      margin-bottom: 12px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 9pt;
      color: #1E40AF;
    }
    .clue-icon { font-size: 14pt; line-height: 1; }
    .quiz-question {
      font-size: 10.5pt;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .quiz-options {
      display: grid;
      grid-template-columns: 1fr;
      gap: 6px;
      margin-bottom: 12px;
    }
    .quiz-opt-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      background: #F8FAFC;
      font-size: 9pt;
    }
    .opt-letter {
      font-weight: 800;
      color: #475569;
      background: #E2E8F0;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 8pt;
      flex-shrink: 0;
    }
    .opt-text { flex: 1; font-weight: 500; }
    .opt-correct {
      border-color: #86EFAC;
      background: #F0FDF4;
    }
    .opt-correct .opt-letter {
      background: #22C55E;
      color: #FFFFFF;
    }
    .opt-badge {
      font-size: 7.5pt;
      font-weight: 800;
      color: #15803D;
      background: #DCFCE7;
      border: 1px solid #86EFAC;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .quiz-explanation {
      background: #F0FDF4;
      border: 1px solid #BBF7D0;
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 10px;
      font-size: 9pt;
      color: #166534;
    }
    .exp-head { margin-bottom: 2px; }

    /* REMEDIAL BLOCK */
    .quiz-remedial {
      background: #FFF7ED;
      border: 1px dashed #FB923C;
      border-radius: 8px;
      padding: 10px 12px;
      margin-top: 10px;
    }
    .remedial-badge {
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 800;
      background: #FFEDD5;
      color: #C2410C;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .remedial-content {
      font-size: 8.5pt;
      color: #9A3412;
      margin-bottom: 8px;
      line-height: 1.45;
    }
    .remedial-line { margin-bottom: 3px; }
    .remedial-retry {
      background: #FFFFFF;
      border: 1px solid #FED7AA;
      border-radius: 6px;
      padding: 8px 10px;
    }
    .retry-q { font-size: 9pt; color: #1E293B; margin-bottom: 6px; }
    .retry-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 10px;
      margin-bottom: 6px;
      font-size: 8.5pt;
    }
    .retry-opt { color: #475569; }
    .retry-opt-correct { color: #15803D; font-weight: 700; }
    .retry-exp { font-size: 8pt; color: #7C2D12; }

    /* VIDEO STORYBOARD FOOTER NOTE */
    .video-note-box {
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px dashed #CBD5E1;
      font-size: 8.5pt;
      color: #475569;
      line-height: 1.45;
      background: #F8FAFC;
      padding: 8px 12px;
      border-radius: 8px;
    }
    .video-note-box strong {
      color: #0F172A;
    }
  </style>
</head>
<body>

  <!-- MASTER FRONT COVER -->
  <div class="master-cover">
    <div class="cover-top-badge">
      <span>🎬</span> STORYBOARD &amp; MODUL MATERI VIDEO INTERAKTIF
    </div>

    <div class="cover-hero">
      <div class="cover-eyebrow" style="color: #2563EB; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px;">
        KURIKULUM MERDEKA • MATEMATIKA SMP KELAS 8
      </div>
      <h1>Materi Pembelajaran Relasi &amp; Fungsi</h1>
      <div class="cover-sub">Dokumen Master Modul, Visualisasi Diagram &amp; Naskah Interaktif (Chapter Mode)</div>
      <div class="cover-desc">
        Buku panduan lengkap yang menyusun seluruh materi dari <strong>Chapter 1 hingga Chapter 5</strong> (Total 50 Slide). 
        Dipisahkan secara sistematis berdasarkan <strong>nomor Chapter</strong> dan <strong>nomor Slide</strong>, dilengkapi visual diagram panah SVG, tabel data, 
        mesin fungsi, koordinat Cartesius, korespondensi satu-satu, kunci aktivitas interaktif, serta kuis formatif beserta cabang remedialnya.
      </div>
    </div>

    <div class="cover-grid">
      <div class="ch-card-pill">
        <div class="icon">🪢</div>
        <div class="title">Chapter 1: Relasi</div>
        <div class="slides">12 Slide</div>
      </div>
      <div class="ch-card-pill">
        <div class="icon">⚙️</div>
        <div class="title">Chapter 2: Fungsi</div>
        <div class="slides">10 Slide</div>
      </div>
      <div class="ch-card-pill">
        <div class="icon">📐</div>
        <div class="title">Chapter 3: Rumus</div>
        <div class="slides">10 Slide</div>
      </div>
      <div class="ch-card-pill">
        <div class="icon">📈</div>
        <div class="title">Chapter 4: Grafik</div>
        <div class="slides">10 Slide</div>
      </div>
      <div class="ch-card-pill">
        <div class="icon">⚡</div>
        <div class="title">Chapter 5: 1-ke-1</div>
        <div class="slides">8 Slide</div>
      </div>
    </div>

    <div class="cover-footer">
      <div><strong>Detektif Relo:</strong> Game &amp; Video Interaktif Relasi &amp; Fungsi</div>
      <div>Thesis Research Project • Total: 50 Slide Pembelajaran</div>
    </div>
  </div>

  <!-- TABLE OF CONTENTS -->
  <div class="toc-section">
    <div class="toc-header">
      <h2>📑 Daftar Isi &amp; Peta Navigasi Slide</h2>
      <div style="color: #64748B; font-size: 10pt;">Struktur lengkap 5 Chapter dan 50 Slide Pembelajaran Interaktif</div>
    </div>

    ${tocHtml}
  </div>

  <!-- CHAPTERS & SLIDES CONTENT -->
  ${chaptersContent}

</body>
</html>
`;
}

// Generate HTML and invoke Chrome to export PDF
async function main() {
  try {
    console.log('Building HTML content...');
    const htmlContent = buildHtmlDocument();

    const outputHtmlPath = path.resolve('exports/materi_chapter_mode.html');
    const outputPdfPath = path.resolve('exports/Materi_Chapter_Mode_Relasi_Fungsi.pdf');

    fs.writeFileSync(outputHtmlPath, htmlContent, 'utf-8');
    console.log(`HTML generated at: ${outputHtmlPath} (${(fs.statSync(outputHtmlPath).size / 1024).toFixed(1)} KB)`);

    console.log('Compiling to PDF via Chrome Headless...');
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

    const args = [
      '--headless',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--print-to-pdf=${outputPdfPath}`,
      `file://${outputHtmlPath}`
    ];

    execFile(chromePath, args, (err, stdout, stderr) => {
      if (err) {
        console.error('Failed to generate PDF:', err);
      } else {
        if (fs.existsSync(outputPdfPath)) {
          const stats = fs.statSync(outputPdfPath);
          console.log('==============================================');
          console.log('SUCCESS! PDF GENERATED SUCCESSFULLY!');
          console.log(`Path: ${outputPdfPath}`);
          console.log(`Size: ${(stats.size / 1024).toFixed(1)} KB (${stats.size} bytes)`);
          console.log('==============================================');
        } else {
          console.error('PDF file was not found after execution.');
        }
      }
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

main();
