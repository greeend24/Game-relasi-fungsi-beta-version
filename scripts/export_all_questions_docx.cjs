/**
 * EXPORT ALL QUESTIONS & ANSWERS TO DOCX
 * Menghasilkan Dokumen Lengkap Bank Soal & Kunci Jawaban:
 * 1. Chapter Mode (Kasus Interaktif & Kuis Video)
 * 2. Latihan Chapter Mode (30 Soal Utama + 30 Soal Remedial x 5 Chapter)
 * 3. Quest Mode (30 Soal x 5 Chapter)
 * 4. Endless Mode (100 Soal C3, C4, C5)
 */

const fs = require('fs');
const path = require('path');
const {
  Document,
  Paragraph,
  TextRun,
  Packer,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType
} = require('docx');

async function main() {
  console.log('⏳ Memuat seluruh modul data soal game...');

  const [
    casesMod,
    c1SubMod,
    c2SubMod,
    c3SubMod,
    c4SubMod,
    c5SubMod,
    e1Mod,
    e2Mod,
    e3Mod,
    e4Mod,
    e5Mod,
    questMod,
    endlessMod
  ] = await Promise.all([
    import('../src/data/casesData.js'),
    import('../src/data/chapter1Subtitles.js'),
    import('../src/data/chapter2Subtitles.js'),
    import('../src/data/chapter3Subtitles.js'),
    import('../src/data/chapter4Subtitles.js'),
    import('../src/data/chapter5Subtitles.js'),
    import('../src/data/exercises/exerciseChapter1.js'),
    import('../src/data/exercises/exerciseChapter2.js'),
    import('../src/data/exercises/exerciseChapter3.js'),
    import('../src/data/exercises/exerciseChapter4.js'),
    import('../src/data/exercises/exerciseChapter5.js'),
    import('../src/services/questQuestionsService.js'),
    import('../src/data/endlessQuestions.js')
  ]);

  const SUBBABS_DATA = casesMod.SUBBABS_DATA;
  const exercises = [
    { chapterId: 1, title: 'Chapter 1: Pengertian & Cara Menyatakan Relasi', data: e1Mod.EXERCISE_CHAPTER_1 },
    { chapterId: 2, title: 'Chapter 2: Pengertian & Unsur Fungsi', data: e2Mod.EXERCISE_CHAPTER_2 },
    { chapterId: 3, title: 'Chapter 3: Notasi & Rumus Fungsi', data: e3Mod.EXERCISE_CHAPTER_3 },
    { chapterId: 4, title: 'Chapter 4: Grafik Fungsi Linear', data: e4Mod.EXERCISE_CHAPTER_4 },
    { chapterId: 5, title: 'Chapter 5: Korespondensi Satu-Satu', data: e5Mod.EXERCISE_CHAPTER_5 },
  ];
  const questGenerator = questMod.generateSubbabQuestions;
  const endlessQuestions = endlessMod.ENDLESS_QUESTIONS;

  const docChildren = [];

  // Helper functions for docx styling
  function pTitle(text) {
    return new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: { after: 200, before: 100 },
      children: [new TextRun({ text, bold: true, size: 44, color: '1E3A8A', font: 'Arial' })]
    });
  }

  function pSubtitle(text) {
    return new Paragraph({
      spacing: { after: 400 },
      children: [new TextRun({ text, italics: true, size: 24, color: '4B5563', font: 'Arial' })]
    });
  }

  function pH1(text) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
      children: [new TextRun({ text, bold: true, size: 32, color: '1E3A8A', font: 'Arial' })]
    });
  }

  function pH2(text) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 150 },
      children: [new TextRun({ text, bold: true, size: 26, color: '2563EB', font: 'Arial' })]
    });
  }

  function pH3(text) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100 },
      children: [new TextRun({ text, bold: true, size: 22, color: '92400E', font: 'Arial' })]
    });
  }

  function pBody(runs, spacing = { after: 120, before: 40 }) {
    return new Paragraph({
      spacing,
      children: Array.isArray(runs) ? runs : [new TextRun({ text: runs, size: 20, font: 'Calibri' })]
    });
  }

  function pBullet(runs) {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 60 },
      children: Array.isArray(runs) ? runs : [new TextRun({ text: runs, size: 20, font: 'Calibri' })]
    });
  }

  function pOption(label, text, isCorrect) {
    return new Paragraph({
      indent: { left: 400 },
      spacing: { after: 60 },
      children: [
        new TextRun({ text: `${label}. `, bold: true, size: 20, font: 'Calibri', color: isCorrect ? '065F46' : '1F2937' }),
        new TextRun({ text, size: 20, font: 'Calibri', color: isCorrect ? '065F46' : '1F2937', bold: isCorrect })
      ]
    });
  }

  function pAnswer(answerText) {
    return new Paragraph({
      spacing: { before: 100, after: 80 },
      children: [
        new TextRun({ text: '✅ Kunci Jawaban: ', bold: true, size: 20, color: '065F46', font: 'Calibri' }),
        new TextRun({ text: String(answerText), bold: true, size: 20, color: '065F46', font: 'Calibri' })
      ]
    });
  }

  function pExplanation(explanationText) {
    if (!explanationText) return null;
    return new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({ text: '💡 Pembahasan / Penjelasan: ', bold: true, size: 19, color: '1E40AF', font: 'Calibri' }),
        new TextRun({ text: String(explanationText), size: 19, color: '374151', font: 'Calibri' })
      ]
    });
  }

  function pClue(clueText) {
    if (!clueText) return null;
    return new Paragraph({
      spacing: { after: 160 },
      children: [
        new TextRun({ text: '🔍 Petunjuk / Clue: ', italics: true, bold: true, size: 18, color: 'B45309', font: 'Calibri' }),
        new TextRun({ text: String(clueText), italics: true, size: 18, color: '78350F', font: 'Calibri' })
      ]
    });
  }

  function pDivider() {
    return new Paragraph({
      spacing: { before: 160, after: 160 },
      children: [new TextRun({ text: '────────────────────────────────────────────────────────', color: 'D1D5DB', size: 18 })]
    });
  }

  // ==========================================
  // 1. COVER PAGE / HEADER METADATA
  // ==========================================
  docChildren.push(pTitle('BANK SOAL & KUNCI JAWABAN LENGKAP'));
  docChildren.push(pSubtitle('GAME EDUKASI MATEMATIKA BERBASIS WEB & DESKTOP:\n"DETEKTIF DATA: RELASI DAN FUNGSI SMP KELAS 8"'));

  docChildren.push(pBody([
    new TextRun({ text: 'Dokumen ini memuat seluruh instrumen evaluasi, latihan interaktif, ujian bertingkat (Taxonomy Bloom C3 - C5), dan kuis pembelajaran yang diimplementasikan di dalam Game Edukasi Detektif Data.', size: 20, font: 'Calibri' })
  ]));

  docChildren.push(new Paragraph({ spacing: { after: 100 } }));

  // Summary Box / Table
  const summaryRows = [
    ['Mode Game', 'Cakupan Materi / Format', 'Jumlah Soal', 'Kelengkapan'],
    ['1. Mode Chapter', 'Kasus Interaktif Tiap Stage (Bab 1 - 5) & Kuis Video', '105 Kasus + 12 Kuis Video', 'Lengkap Kunci & Pembahasan'],
    ['2. Mode Latihan Chapter', 'Latihan 30 Soal + 30 Remedial Tiap Bab (Bab 1 - 5)', '300 Soal (150 Utama + 150 Remedial)', 'Lengkap Kunci, Clue, & Alasan'],
    ['3. Mode Quest', 'Ujian Berjenjang Waktu (30 Soal x 5 Chapter: C3, C4, C5)', '150 Soal', 'Lengkap Kunci & Visualisasi'],
    ['4. Mode Endless', 'Tantangan Bertahan Tanpa Batas (C3, C4, C5)', '100 Soal', 'Lengkap Kunci & Pembahasan'],
    ['TOTAL KESELURUHAN', 'Seluruh Bank Soal Game Detektif Data', '667 Soal', '100% Siap Uji & Validasi']
  ];

  const tableRows = summaryRows.map((r, idx) => {
    return new TableRow({
      children: r.map((c, ci) => {
        return new TableCell({
          width: { size: ci === 0 ? 2500 : ci === 1 ? 4000 : ci === 2 ? 2200 : 2500, type: WidthType.DXA },
          shading: { fill: idx === 0 ? '1E3A8A' : idx === summaryRows.length - 1 ? 'E0E7FF' : idx % 2 === 1 ? 'F3F4F6' : 'FFFFFF' },
          children: [
            new Paragraph({
              alignment: ci >= 2 ? AlignmentType.CENTER : AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: c,
                  bold: idx === 0 || idx === summaryRows.length - 1 || ci === 0,
                  color: idx === 0 ? 'FFFFFF' : idx === summaryRows.length - 1 ? '1E3A8A' : '1F2937',
                  size: 19,
                  font: 'Calibri'
                })
              ]
            })
          ]
        });
      })
    });
  });

  docChildren.push(new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } }));
  docChildren.push(new Paragraph({ spacing: { after: 300 } }));

  // =========================================================================
  // BAGIAN I: CHAPTER MODE (MATERI, KUIS VIDEO, & KASUS INTERAKTIF PEMBELAJARAN)
  // =========================================================================
  docChildren.push(pH1('BAGIAN I: CHAPTER MODE (MATERI & KASUS INTERAKTIF PEMBELAJARAN)'));
  docChildren.push(pBody([
    new TextRun({ text: 'Mode Chapter merupakan inti alur belajar naratif game. Setiap Bab memiliki kuis pop-up video pembelajaran, 20 Stage Kasus berjenjang (C3 - C5) yang memadukan 50% Kasus Kontekstual Kehidupan Nyata dan 50% Logika Matematis, serta Stage 21 berupa Soal Evaluasi & Kesimpulan Akhir Bab.', size: 20, font: 'Calibri' })
  ]));

  // Video Subtitles Quizzes
  const videoSubs = [
    { bab: 1, name: 'Bab 1: Pengertian & Cara Menyatakan Relasi', videos: c1SubMod.CHAPTER1_VIDEOS },
    { bab: 2, name: 'Bab 2: Pengertian & Unsur Fungsi', videos: c2SubMod.CHAPTER2_VIDEOS },
    { bab: 3, name: 'Bab 3: Notasi & Rumus Fungsi', videos: c3SubMod.CHAPTER3_VIDEOS },
    { bab: 4, name: 'Bab 4: Grafik Fungsi Linear', videos: c4SubMod.CHAPTER4_VIDEOS },
    { bab: 5, name: 'Bab 5: Korespondensi Satu-Satu', videos: c5SubMod.CHAPTER5_VIDEOS }
  ];

  docChildren.push(pH2('A. Kuis Pop-up Video Pembelajaran (Chapter 1 s.d. 5)'));

  for (const vSub of videoSubs) {
    docChildren.push(pH3(`Kuis Video ${vSub.name}`));
    for (const vKey in vSub.videos) {
      const v = vSub.videos[vKey];
      if (!v || !v.quiz) continue;

      const qList = v.quiz.questions && Array.isArray(v.quiz.questions) ? v.quiz.questions : [v.quiz];
      for (const q of qList) {
        docChildren.push(pBody([
          new TextRun({ text: `[Video ${vKey}] ${q.title || v.quiz.title}: `, bold: true, color: '1E3A8A' }),
          new TextRun({ text: q.question, bold: true })
        ]));

        if (q.options && Array.isArray(q.options)) {
          q.options.forEach((opt, oi) => {
            const letter = String.fromCharCode(65 + oi);
            const isCor = opt === q.correct;
            docChildren.push(pOption(letter, opt, isCor));
          });
        }

        docChildren.push(pAnswer(q.correct));
        if (q.explanation) docChildren.push(pExplanation(q.explanation));
        if (q.clue) docChildren.push(pClue(q.clue));

        if (q.retryQuestion) {
          docChildren.push(pBody([
            new TextRun({ text: '   ↳ Variasi Soal Retry Remedial: ', bold: true, italics: true, color: '7C3AED' }),
            new TextRun({ text: q.retryQuestion.question, italics: true })
          ]));
          if (q.retryQuestion.options) {
            q.retryQuestion.options.forEach((ro, ri) => {
              const rLetter = String.fromCharCode(65 + ri);
              const rCor = ro === q.retryQuestion.correct;
              docChildren.push(pOption(rLetter, ro, rCor));
            });
          }
          docChildren.push(pAnswer(q.retryQuestion.correct));
        }

        docChildren.push(pDivider());
      }
    }
  }

  // Chapter Cases (Bab 1 to 5)
  docChildren.push(pH2('B. Kasus Interaktif Stage 1 s.d. Stage 21 (Bab 1 s.d. Bab 5)'));

  for (let b = 1; b <= 5; b++) {
    const babData = SUBBABS_DATA[b];
    if (!babData) continue;

    docChildren.push(pH2(`Bab ${b}: ${babData.title}`));
    docChildren.push(pBody([
      new TextRun({ text: `Judul Kasus: ${babData.caseTitle} | Tujuan: ${babData.goal}`, italics: true, color: '4B5563' })
    ]));

    const stages = babData.stages || [];
    for (const st of stages) {
      if (st.isConclusionStage) {
        docChildren.push(pH3(`Stage ${st.stage}: Kesimpulan Akhir Bab ${b} [${st.bloomLevel}]`));
        docChildren.push(pBody([new TextRun({ text: st.question, bold: true })]));
        if (st.options) {
          st.options.forEach((opt, oi) => {
            const letter = String.fromCharCode(65 + oi);
            docChildren.push(pOption(letter, opt, opt === st.correctAnswer));
          });
        }
        docChildren.push(pAnswer(st.correctAnswer));
        if (st.hint) docChildren.push(pClue(st.hint));
        docChildren.push(pDivider());
        continue;
      }

      // Regular Stage Cases
      docChildren.push(pH3(`Stage ${st.stage}: ${st.isStoryCase ? '📖 Kasus Cerita Nyata' : '🔢 Tantangan Logika'} [Level: ${st.bloomLevel}]`));

      if (st.story) {
        docChildren.push(pBody([
          new TextRun({ text: 'Skenario Kasus: ', bold: true, color: '1F2937' }),
          new TextRun({ text: st.story })
        ]));
      }

      if (st.rule) {
        docChildren.push(pBody([
          new TextRun({ text: 'Aturan Relasi: ', bold: true, color: 'B45309' }),
          new TextRun({ text: st.rule, bold: true })
        ]));
      }

      if (st.conceptDef) {
        docChildren.push(pBody([
          new TextRun({ text: 'Konsep Matematis: ', italics: true, color: '4B5563' }),
          new TextRun({ text: st.conceptDef, italics: true })
        ]));
      }

      // Bab 1 Sets & Valid Pairs
      if (b === 1 && st.setA && st.setB) {
        docChildren.push(pBody([
          new TextRun({ text: `Himpunan Asal A = { ${st.setA.join(', ')} }\n`, bold: true }),
          new TextRun({ text: `Himpunan Kawan B = { ${st.setB.join(', ')} }\n`, bold: true }),
          new TextRun({
            text: `Kunci Pasangan Valid: ${st.validPairs.map(([ai, bi]) => `(${st.setA[ai]} ➔ ${st.setB[bi]})`).join(', ')}`,
            bold: true,
            color: '065F46'
          })
        ]));
      }

      // Bab 2 Machines
      if (b === 2 && st.machines) {
        docChildren.push(pBody([new TextRun({ text: 'Uji Hubungan Mesin Fungsi:', bold: true })]));
        st.machines.forEach(m => {
          const pairsStr = m.pairs.map(([x, y]) => `(${x} ➔ ${y})`).join(', ');
          docChildren.push(pBullet([
            new TextRun({ text: `Mesin #${m.id} [ ${pairsStr} ] : `, bold: true }),
            new TextRun({ text: m.isFunction ? 'FUNGSI SAH' : 'BUKAN FUNGSI', bold: true, color: m.isFunction ? '065F46' : 'BE123C' }),
            new TextRun({ text: ` (${m.reason})` })
          ]));
        });
      }

      // Bab 3 Formula Options & Answers
      if (b === 3 && st.formulaOptions) {
        docChildren.push(pBody([
          new TextRun({ text: `Pilihan Rumus: ${st.formulaOptions.join('  |  ')}\n` }),
          new TextRun({ text: `Rumus Fungsi yang Tepat: ${st.correctFormula}\n`, bold: true, color: '065F46' }),
          new TextRun({ text: `Nilai untuk x = ${st.xVal}: f(${st.xVal}) = ${st.correctAns}`, bold: true, color: '065F46' })
        ]));
      }

      // Bab 4 Linear Graph & Points
      if (b === 4 && st.formulaOptions) {
        docChildren.push(pBody([
          new TextRun({ text: `Pilihan Jawaban: ${st.formulaOptions.join('  |  ')}\n` }),
          new TextRun({ text: `Kunci Jawaban: ${st.correctAns}\n`, bold: true, color: '065F46' }),
          new TextRun({ text: `Pembahasan: ${st.explanation}`, color: '1E40AF' })
        ]));
      }

      // Bab 5 One-to-one
      if (b === 5 && st.setA && st.setB) {
        docChildren.push(pBody([
          new TextRun({ text: `Himpunan Asal A [n=${st.setA.length}]: { ${st.setA.join(', ')} }\n` }),
          new TextRun({ text: `Himpunan Kawan B [n=${st.setB.length}]: { ${st.setB.join(', ')} }\n` }),
          new TextRun({
            text: `Kunci Hubungan 1:1 Sah: ${st.setA.map((a, idx) => `(${a} ➔ ${st.setB[idx]})`).join(', ')} (Banyak pemetaan = ${st.setA.length}! = ${st.setA.reduce((acc, _, i) => acc * (i + 1), 1)} kemungkinan)`,
            bold: true,
            color: '065F46'
          })
        ]));
      }

      docChildren.push(pDivider());
    }
  }

  // =========================================================================
  // BAGIAN II: LATIHAN CHAPTER MODE (30 SOAL UTAMA + 30 SOAL REMEDIAL PER BAB)
  // =========================================================================
  docChildren.push(pH1('BAGIAN II: LATIHAN CHAPTER MODE (BANK SOAL LATIHAN & REMEDIAL)'));
  docChildren.push(pBody([
    new TextRun({ text: 'Mode Latihan Chapter menyediakan 30 soal interaktif berbobot per bab yang mencakup beragam tipe (Pilihan Ganda Biasa, Benar/Salah, Pilihan Ganda Kompleks, Menjodohkan, Diagram Panah, dan Diagram Cartesius). Dilengkapi dengan variasi soal remedial dengan angka/kasus berbeda untuk memastikan ketuntasan belajar siswa.', size: 20, font: 'Calibri' })
  ]));

  for (const ex of exercises) {
    docChildren.push(pH2(ex.title));
    docChildren.push(pBody([
      new TextRun({ text: `Total: 30 Soal Utama + 30 Soal Remedial (Total 60 soal pada bab ini)`, italics: true, color: '4B5563' })
    ]));

    for (let i = 0; i < ex.data.length; i++) {
      const q = ex.data[i];
      const qNum = i + 1;

      docChildren.push(pH3(`Soal #${qNum}: ${q.title || 'Soal Latihan'} [Tipe: ${q.type}]`));

      // Visual context if any
      if (q.visual) {
        let vText = '';
        if (q.visual.type === 'ordered_pairs' && q.visual.pairs) {
          vText = `[Visual: Himpunan Pasangan Berurutan ${q.visual.setName || 'R'} = { ${q.visual.pairs.map(p => `(${p[0]}, ${p[1]})`).join(', ')} }]`;
        } else if (q.visual.type === 'arrow_diagram') {
          vText = `[Visual: Diagram Panah Himpunan A={${(q.visual.setA || []).join(',')}} ke B={${(q.visual.setB || []).join(',')}} dengan pasangan: ${(q.visual.pairs || []).map(p => `(${p[0]}➔${p[1]})`).join(', ')}]`;
        } else if (q.visual.type === 'relation_table') {
          vText = `[Visual: Tabel Relasi (${q.visual.rule || ''}) memuat pasangan: ${(q.visual.pairs || []).map(p => `(${p[0]}, ${p[1]})`).join(', ')}]`;
        } else if (q.visual.type === 'cartesian_graph') {
          vText = `[Visual: Titik Koordinat Cartesius: ${(q.visual.points || []).map(p => `(${p[0]}, ${p[1]})`).join(', ')}]`;
        }
        if (vText) {
          docChildren.push(pBody([new TextRun({ text: vText, italics: true, color: '4B5563', size: 19 })]));
        }
      }

      docChildren.push(pBody([new TextRun({ text: q.question, bold: true })]));

      // Format options based on type
      if (q.type === 'MCQ' || q.type === 'TRUE_FALSE' || q.type === 'MCQ_COMPLEX') {
        if (q.options && Array.isArray(q.options)) {
          q.options.forEach((opt, oi) => {
            const letter = String.fromCharCode(65 + oi);
            const isCor = q.type === 'MCQ_COMPLEX'
              ? (q.correctMultiple || []).includes(opt)
              : opt === q.correct;
            docChildren.push(pOption(letter, opt, isCor));
          });
        }
      } else if (q.type === 'MATCHING' && q.pairs) {
        docChildren.push(pBody([new TextRun({ text: 'Pasangan Menjodohkan:', italics: true, color: '1F2937' })]));
        q.pairs.forEach(pair => {
          docChildren.push(pBullet([
            new TextRun({ text: `${pair.left} `, bold: true }),
            new TextRun({ text: `${q.matchingLabel || 'berpasangan dengan:'} `, italics: true }),
            new TextRun({ text: pair.right, bold: true, color: '065F46' })
          ]));
        });
        if (q.rightOptions) {
          docChildren.push(pBody([
            new TextRun({ text: `Pilihan yang Disediakan: [ ${q.rightOptions.join('  |  ')} ]`, italics: true, size: 18, color: '4B5563' })
          ]));
        }
      } else if (q.type === 'ARROWS' && q.pairs) {
        docChildren.push(pBody([
          new TextRun({ text: `Hubungan Panah Sah: ${q.pairs.map(([a, b]) => `(${a} ➔ ${b})`).join(', ')}`, bold: true, color: '065F46' })
        ]));
      } else if (q.type === 'CARTESIAN' && q.targetPoints) {
        docChildren.push(pBody([
          new TextRun({ text: `Titik Plot Cartesius yang Benar: ${q.targetPoints.map(([x, y]) => `(${x}, ${y})`).join(', ')}`, bold: true, color: '065F46' })
        ]));
      }

      // Kunci Jawaban
      if (q.type === 'MCQ_COMPLEX') {
        docChildren.push(pAnswer(`Pilihan Benar: ${(q.correctMultiple || []).join('; ')}`));
      } else if (q.correct) {
        docChildren.push(pAnswer(q.correct));
      }

      if (q.correctReason) docChildren.push(pExplanation(q.correctReason));
      else if (q.wrongExplanation) docChildren.push(pExplanation(q.wrongExplanation));
      if (q.clue) docChildren.push(pClue(q.clue));

      // REMEDIAL VARIANT
      if (q.remedialVariant) {
        const rem = q.remedialVariant;
        docChildren.push(new Paragraph({
          spacing: { before: 80, after: 60 },
          children: [
            new TextRun({ text: '   ↳ SOAL REMEDIAL (VARIASI ANGKA/KASUS BERBEDA):', bold: true, color: '7C3AED', size: 20 })
          ]
        }));

        if (rem.title && rem.title !== q.title) {
          docChildren.push(pBody([new TextRun({ text: `     Judul Remedial: ${rem.title}`, italics: true, color: '6D28D9' })]));
        }

        if (rem.visual) {
          let rvText = '';
          if (rem.visual.type === 'ordered_pairs' && rem.visual.pairs) {
            rvText = `[Visual Remedial: Himpunan Pasangan ${rem.visual.setName || 'R'} = { ${rem.visual.pairs.map(p => `(${p[0]}, ${p[1]})`).join(', ')} }]`;
          } else if (rem.visual.type === 'arrow_diagram') {
            rvText = `[Visual Remedial: Diagram Panah Himpunan A={${(rem.visual.setA || []).join(',')}} ke B={${(rem.visual.setB || []).join(',')}} pasangan: ${(rem.visual.pairs || []).map(p => `(${p[0]}➔${p[1]})`).join(', ')}]`;
          } else if (rem.visual.type === 'relation_table') {
            rvText = `[Visual Remedial: Tabel Relasi (${rem.visual.rule || ''}) pasangan: ${(rem.visual.pairs || []).map(p => `(${p[0]}, ${p[1]})`).join(', ')}]`;
          }
          if (rvText) {
            docChildren.push(pBody([new TextRun({ text: `     ${rvText}`, italics: true, color: '4B5563', size: 18 })]));
          }
        }

        docChildren.push(pBody([new TextRun({ text: `     ${rem.question}`, bold: true, color: '374151' })]));

        if (rem.options && Array.isArray(rem.options)) {
          rem.options.forEach((ro, ri) => {
            const letter = String.fromCharCode(65 + ri);
            const isCor = ro === rem.correct;
            docChildren.push(new Paragraph({
              indent: { left: 800 },
              spacing: { after: 50 },
              children: [
                new TextRun({ text: `${letter}. `, bold: true, size: 20, color: isCor ? '065F46' : '4B5563' }),
                new TextRun({ text: ro, size: 20, color: isCor ? '065F46' : '4B5563', bold: isCor })
              ]
            }));
          });
        } else if (rem.pairs) {
          rem.pairs.forEach(pair => {
            docChildren.push(new Paragraph({
              indent: { left: 800 },
              spacing: { after: 50 },
              children: [
                new TextRun({ text: `• ${pair.left} `, bold: true }),
                new TextRun({ text: `${rem.matchingLabel || 'berpasangan dengan:'} `, italics: true }),
                new TextRun({ text: pair.right, bold: true, color: '065F46' })
              ]
            }));
          });
        } else if (rem.targetPoints) {
          docChildren.push(pBody([
            new TextRun({ text: `     Titik Plot Remedial: ${rem.targetPoints.map(([x, y]) => `(${x}, ${y})`).join(', ')}`, bold: true, color: '065F46' })
          ]));
        }

        if (rem.correct) {
          docChildren.push(new Paragraph({
            indent: { left: 400 },
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: '✅ Kunci Remedial: ', bold: true, size: 20, color: '065F46' }),
              new TextRun({ text: String(rem.correct), bold: true, size: 20, color: '065F46' })
            ]
          }));
        }

        if (rem.correctReason) {
          docChildren.push(new Paragraph({
            indent: { left: 400 },
            spacing: { after: 60 },
            children: [
              new TextRun({ text: '💡 Pembahasan Remedial: ', bold: true, size: 19, color: '1E40AF' }),
              new TextRun({ text: String(rem.correctReason), size: 19, color: '374151' })
            ]
          }));
        } else if (rem.wrongExplanation) {
          docChildren.push(new Paragraph({
            indent: { left: 400 },
            spacing: { after: 60 },
            children: [
              new TextRun({ text: '💡 Pembahasan Remedial: ', bold: true, size: 19, color: '1E40AF' }),
              new TextRun({ text: String(rem.wrongExplanation), size: 19, color: '374151' })
            ]
          }));
        }

        if (rem.clue) {
          docChildren.push(new Paragraph({
            indent: { left: 400 },
            spacing: { after: 120 },
            children: [
              new TextRun({ text: '🔍 Clue Remedial: ', italics: true, bold: true, size: 18, color: 'B45309' }),
              new TextRun({ text: String(rem.clue), italics: true, size: 18, color: '78350F' })
            ]
          }));
        }
      }

      docChildren.push(pDivider());
    }
  }

  // =========================================================================
  // BAGIAN III: QUEST MODE (BANK SOAL UJIAN EVALUASI WAKTU 30 MENIT)
  // =========================================================================
  docChildren.push(pH1('BAGIAN III: QUEST MODE (BANK SOAL UJIAN & EVALUASI TERUKUR)'));
  docChildren.push(pBody([
    new TextRun({ text: 'Quest Mode menyajikan tantangan ujian waktu 30 menit dengan 30 soal terstandar kurikulum per bab, berjenjang secara kognitif: Soal 1-10 (Level C3 - 50 Poin), Soal 11-20 (Level C4 - 80 Poin), dan Soal 21-30 (Level C5 - 120 Poin). Dilengkapi visualisasi matematis, diagram panah, tabel relasi, dan kisi koordinat Cartesius.', size: 20, font: 'Calibri' })
  ]));

  for (let b = 1; b <= 5; b++) {
    const questQuestions = questGenerator(b);
    docChildren.push(pH2(`Quest Mode Bab ${b}: ${exercises[b - 1].title}`));
    docChildren.push(pBody([
      new TextRun({ text: `Total: 30 Soal Ujian (Soal 1-10: C3, Soal 11-20: C4, Soal 21-30: C5)`, italics: true, color: '4B5563' })
    ]));

    for (let i = 0; i < questQuestions.length; i++) {
      const q = questQuestions[i];
      docChildren.push(pH3(`Soal Quest #${q.id} [Level: ${q.level} | Bobot: ${q.pts} Poin | Format: ${q.type}]`));

      if (q.visual) {
        let vStr = '';
        if (q.visual.type === 'arrow_diagram') {
          vStr = `[Diagram Panah: A={${(q.visual.setA || []).join(',')}} ke B={${(q.visual.setB || []).join(',')}} Pasangan: ${(q.visual.pairs || []).map(p => `(${p[0]}➔${p[1]})`).join(', ')}]`;
        } else if (q.visual.type === 'relation_table') {
          vStr = `[Tabel Relasi: Aturan "${q.visual.rule || ''}" Pasangan: ${(q.visual.pairs || []).map(p => `(${p[0]}, ${p[1]})`).join(', ')}]`;
        } else if (q.visual.type === 'ordered_pairs') {
          vStr = `[Himpunan Pasangan Berurutan: { ${(q.visual.pairs || []).map(p => `(${p[0]}, ${p[1]})`).join(', ')} }]`;
        } else if (q.visual.type === 'cartesian_graph') {
          vStr = `[Grafik Cartesius: Titik ${(q.visual.points || []).map(p => `(${p[0]}, ${p[1]})`).join(', ')}]`;
        }
        if (vStr) {
          docChildren.push(pBody([new TextRun({ text: vStr, italics: true, color: '4B5563', size: 19 })]));
        }
      }

      docChildren.push(pBody([new TextRun({ text: q.question, bold: true })]));

      if (q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE') {
        if (q.options) {
          q.options.forEach((opt, oi) => {
            const letter = String.fromCharCode(65 + oi);
            const isCor = opt === q.correct;
            docChildren.push(pOption(letter, opt, isCor));
          });
        }
        docChildren.push(pAnswer(q.correct));
      } else if (q.type === 'ARROWS') {
        docChildren.push(pBody([
          new TextRun({ text: `Himpunan Asal A: { ${(q.setA || []).join(', ')} }\n` }),
          new TextRun({ text: `Himpunan Kawan B: { ${(q.setB || []).join(', ')} }\n` }),
          new TextRun({ text: `Kunci Hubungan Panah: ${(q.correctPairs || []).join(', ')}`, bold: true, color: '065F46' })
        ]));
        docChildren.push(pAnswer((q.correctPairs || []).join(', ')));
      } else if (q.type === 'CARTESIAN') {
        docChildren.push(pBody([
          new TextRun({ text: `Titik Koordinat yang Wajib Diplot: ${(q.targetPoints || []).map(p => `(${p[0]}, ${p[1]})`).join(', ')}`, bold: true, color: '065F46' })
        ]));
        docChildren.push(pAnswer((q.targetPoints || []).map(p => `(${p[0]}, ${p[1]})`).join(', ')));
      } else if (q.type === 'MATCHING') {
        docChildren.push(pBody([new TextRun({ text: 'Kunci Pasangan Menjodohkan:', italics: true })]));
        (q.pairs || []).forEach(p => {
          docChildren.push(pBullet([
            new TextRun({ text: `${p.x} `, bold: true }),
            new TextRun({ text: '➔ ', color: '2563EB' }),
            new TextRun({ text: p.result, bold: true, color: '065F46' })
          ]));
        });
        docChildren.push(pAnswer((q.pairs || []).map(p => `${p.x} = ${p.result}`).join('; ')));
      }

      if (q.hint) docChildren.push(pClue(q.hint));
      docChildren.push(pDivider());
    }
  }

  // =========================================================================
  // BAGIAN IV: ENDLESS MODE (100 SOAL BANK BERTINGKAT C3, C4, C5)
  // =========================================================================
  docChildren.push(pH1('BAGIAN IV: ENDLESS MODE (BANK SOAL TANTANGAN BERTAHAN 100 SOAL)'));
  docChildren.push(pBody([
    new TextRun({ text: 'Endless Mode merupakan bank soal komprehensif 100 soal acak yang menantang pemahaman siswa secara adaptif dan kontinu. Terbagi ke dalam 3 tingkat kemahiran berpikir: C3 (Mengaplikasikan - 35 Soal), C4 (Menganalisis - 40 Soal), dan C5 (Mengevaluasi - 25 Soal).', size: 20, font: 'Calibri' })
  ]));

  let currentLevel = '';
  for (let i = 0; i < endlessQuestions.length; i++) {
    const q = endlessQuestions[i];
    if (q.level !== currentLevel) {
      currentLevel = q.level;
      const levelLabel = currentLevel === 'C3'
        ? 'TINGKAT C3: MENGAPLIKASIKAN (APPLICATION)'
        : currentLevel === 'C4'
        ? 'TINGKAT C4: MENGANALISIS (ANALYSIS)'
        : 'TINGKAT C5: MENGEVALUASI (EVALUATION)';
      docChildren.push(pH2(levelLabel));
    }

    docChildren.push(pH3(`Endless Soal #${q.id}: ${q.title || 'Tantangan Relasi & Fungsi'} [Level: ${q.level} | Format: ${q.type}]`));
    docChildren.push(pBody([new TextRun({ text: q.question, bold: true })]));

    if (q.type === 'MCQ' || q.type === 'TRUE_FALSE') {
      if (q.options) {
        q.options.forEach((opt, oi) => {
          const letter = String.fromCharCode(65 + oi);
          const isCor = opt === q.correct;
          docChildren.push(pOption(letter, opt, isCor));
        });
      }
      docChildren.push(pAnswer(q.correct));
    } else if (q.type === 'MATCHING' && q.pairs) {
      docChildren.push(pBody([new TextRun({ text: 'Kunci Pasangan Menjodohkan:', italics: true })]));
      q.pairs.forEach(p => {
        docChildren.push(pBullet([
          new TextRun({ text: `${p.left} `, bold: true }),
          new TextRun({ text: '➔ ', color: '2563EB' }),
          new TextRun({ text: p.right, bold: true, color: '065F46' })
        ]));
      });
      if (q.rightOptions) {
        docChildren.push(pBody([
          new TextRun({ text: `Pilihan Opsi: [ ${q.rightOptions.join('  |  ')} ]`, italics: true, size: 18, color: '4B5563' })
        ]));
      }
      docChildren.push(pAnswer(q.pairs.map(p => `${p.left} = ${p.right}`).join('; ')));
    } else if (q.type === 'ARROWS' && q.pairs) {
      docChildren.push(pBody([
        new TextRun({ text: `Kunci Hubungan Panah: ${q.pairs.map(p => `(${p[0]} ➔ ${p[1]})`).join(', ')}`, bold: true, color: '065F46' })
      ]));
      docChildren.push(pAnswer(q.pairs.map(p => `(${p[0]} ➔ ${p[1]})`).join(', ')));
    }

    if (q.explanation) docChildren.push(pExplanation(q.explanation));
    docChildren.push(pDivider());
  }

  // =========================================================================
  // BUILD DOCUMENT
  // =========================================================================
  console.log(`📑 Menyusun dokumen DOCX dengan ${docChildren.length} elemen paragraf/tabel...`);

  const doc = new Document({
    title: 'Bank Soal dan Kunci Jawaban Lengkap Game Detektif Data: Relasi & Fungsi',
    description: 'Bank soal komprehensif mode chapter, latihan chapter, quest mode, dan endless mode beserta kunci jawaban',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: docChildren
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);

  const outputPath1 = path.join(__dirname, '..', 'Bank_Soal_dan_Kunci_Jawaban_Game_Detektif_Data.docx');
  const outputPath2 = 'D:\\File Penting\\File S2\\Thesis Project\\Bank_Soal_dan_Kunci_Jawaban_Game_Detektif_Data.docx';
  const outputPath3 = 'D:\\File Penting\\File S2\\Thesis Project\\Game Relasi Fungsi siap main\\Bank_Soal_dan_Kunci_Jawaban_Game_Detektif_Data.docx';

  fs.writeFileSync(outputPath1, buffer);
  console.log(`✅ File berhasil disimpan ke: ${outputPath1} (${(buffer.length / 1024).toFixed(1)} KB)`);

  try {
    fs.writeFileSync(outputPath2, buffer);
    console.log(`✅ File berhasil disalin ke: ${outputPath2}`);
  } catch (e) {
    console.warn(`Peringatan copy ke path 2: ${e.message}`);
  }

  try {
    fs.writeFileSync(outputPath3, buffer);
    console.log(`✅ File berhasil disalin ke: ${outputPath3}`);
  } catch (e) {
    console.warn(`Peringatan copy ke path 3: ${e.message}`);
  }

  console.log('🎉 Selesai! Seluruh soal dan kunci jawaban dari 4 mode telah diekspor ke format DOCX!');
}

main().catch(err => {
  console.error('❌ Terjadi kesalahan saat membuat DOCX:', err);
  process.exit(1);
});
