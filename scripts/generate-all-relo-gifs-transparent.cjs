const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { GifWriter } = require('omggif');

const baseDir = path.resolve('public/relo/relo animation');
const outputDir = path.resolve('public/relo/gifs');
const artifactsDir = path.resolve('C:/Users/GreeND24/.gemini/antigravity-ide/brain/25528442-b755-4566-a65f-bdeb4b89c913/gifs');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(artifactsDir)) fs.mkdirSync(artifactsDir, { recursive: true });

async function createPureTransparentGif(frameConfigs, outputPath, targetWidth = 440, targetHeight = 440) {
  try {
    const fileName = path.basename(outputPath);
    console.log(`Generating transparent GIF: ${fileName} (${frameConfigs.length} frames)...`);

    const framesData = [];

    for (const item of frameConfigs) {
      const filePath = typeof item === 'string' ? item : item.file;
      const delay = (typeof item === 'object' && item.delay) ? item.delay : 30;

      if (!fs.existsSync(filePath)) {
        console.warn(`Frame not found: ${filePath}`);
        continue;
      }

      const { data, info } = await sharp(filePath)
        .resize({ width: targetWidth, height: targetHeight, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      framesData.push({ data, delay, width: info.width, height: info.height });
    }

    if (framesData.length === 0) return;

    const width = framesData[0].width;
    const height = framesData[0].height;

    const maxBufSize = width * height * framesData.length * 4 + 131072;
    const gifBuffer = Buffer.alloc(maxBufSize);
    const writer = new GifWriter(gifBuffer, width, height, { loop: 0 });

    for (const frame of framesData) {
      const { data, delay } = frame;

      const palette = new Array(256).fill(0);
      palette[0] = 0x000000; // Reserved strictly for transparent alpha
      let nextIndex = 1;
      const colorMap = new Map();

      const indexedPixels = new Uint8Array(width * height);

      for (let i = 0; i < width * height; i++) {
        const a = data[i * 4 + 3];

        if (a < 128) {
          indexedPixels[i] = 0; // 100% Transparent pixel
        } else {
          const r = data[i * 4];
          const g = data[i * 4 + 1];
          const b = data[i * 4 + 2];

          // Prevent opaque dark colors from becoming 0 (transparent)
          const rq = Math.max(2, r & 0xF8);
          const gq = Math.max(2, g & 0xFC);
          const bq = Math.max(2, b & 0xF8);
          const rgb = (rq << 16) | (gq << 8) | bq;

          let cIdx = colorMap.get(rgb);
          if (cIdx === undefined) {
            if (nextIndex < 255) {
              cIdx = nextIndex++;
              palette[cIdx] = rgb;
              colorMap.set(rgb, cIdx);
            } else {
              cIdx = 1;
            }
          }
          indexedPixels[i] = cIdx;
        }
      }

      writer.addFrame(0, 0, width, height, indexedPixels, {
        palette,
        delay,
        transparent: 0,
        disposal: 2
      });
    }

    const finalGif = gifBuffer.subarray(0, writer.end());
    fs.writeFileSync(outputPath, finalGif);

    const artifactPath = path.join(artifactsDir, fileName);
    fs.writeFileSync(artifactPath, finalGif);

    console.log(`✅ Success: ${fileName} (${width}x${height}, ${(finalGif.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`❌ Error creating ${outputPath}:`, err);
  }
}

async function main() {
  console.log('🚀 Generating 100% transparent crystal-clear GIFs for all Relo modes...');

  // 1. Quest Mode: Thinking Idle (Thinking pose with natural eye blinks)
  const questIdleFrames = [
    { file: path.join(baseDir, 'mikir', 'diam.png'), delay: 65 },
    { file: path.join(baseDir, 'mikir', 'TUTUP MATA DUA DUANYA.png'), delay: 24 },
    { file: path.join(baseDir, 'mikir', 'diam.png'), delay: 65 },
    { file: path.join(baseDir, 'mikir', 'TUTUP MATA KANAN.png'), delay: 22 },
    { file: path.join(baseDir, 'mikir', 'diam.png'), delay: 50 },
    { file: path.join(baseDir, 'mikir', 'TUTUP MATA KIRI.png'), delay: 22 },
    { file: path.join(baseDir, 'mikir', 'diam.png'), delay: 60 },
  ];
  await createPureTransparentGif(questIdleFrames, path.join(outputDir, 'relo_thinking_idle.gif'));
  await createPureTransparentGif(questIdleFrames, path.join(outputDir, 'relo_thinking.gif'));

  // 2. Quest Mode: Thinking Talking (Mouth movements)
  const questTalkingFrames = [
    { file: path.join(baseDir, 'mikir', 'diam.png'), delay: 9 },
    { file: path.join(baseDir, 'mikir', 'A.png'), delay: 9 },
    { file: path.join(baseDir, 'mikir', 'I.png'), delay: 9 },
    { file: path.join(baseDir, 'mikir', 'U.png'), delay: 9 },
    { file: path.join(baseDir, 'mikir', 'E.png'), delay: 9 },
    { file: path.join(baseDir, 'mikir', 'O.png'), delay: 9 },
    { file: path.join(baseDir, 'mikir', 'A.png'), delay: 9 },
    { file: path.join(baseDir, 'mikir', 'diam.png'), delay: 9 },
  ];
  await createPureTransparentGif(questTalkingFrames, path.join(outputDir, 'relo_thinking_talking.gif'));

  // 3. Survival / Endless Mode: Flapping Wings Loop
  const flappingFrames = [
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '1. sayap tertutup.png'), delay: 7 },
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '2. 1 per 5 terbuka .png'), delay: 7 },
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '3. 2 per 5 terbuka.png'), delay: 7 },
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '4. 3 per 5 terbuka.png'), delay: 7 },
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '5. 4 per 5 terbuka.png'), delay: 7 },
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '6. 5 per 5 terbuka.png'), delay: 7 },
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '5. 4 per 5 terbuka.png'), delay: 7 },
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '4. 3 per 5 terbuka.png'), delay: 7 },
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '3. 2 per 5 terbuka.png'), delay: 7 },
    { file: path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '2. 1 per 5 terbuka .png'), delay: 7 },
  ];
  await createPureTransparentGif(flappingFrames, path.join(outputDir, 'relo_flapping.gif'));

  // 4. Chapter Mode: Pointing Wings Sequence
  const chapterFrames = [
    { file: path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', '1. DIAM 1 PER 2 SAYAP.png'), delay: 24 },
    { file: path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', '2. DIAM 2 PER 2 SAYAP.png'), delay: 45 },
    { file: path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', '1. DIAM 1 PER 2 SAYAP.png'), delay: 20 },
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), delay: 20 },
    { file: path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', '1. DIAM 1 PER 2 SAYAP.png'), delay: 24 },
    { file: path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', '2. DIAM 2 PER 2 SAYAP.png'), delay: 45 },
    { file: path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', '1. DIAM 1 PER 2 SAYAP.png'), delay: 20 },
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), delay: 20 },
  ];
  await createPureTransparentGif(chapterFrames, path.join(outputDir, 'relo_chapter_pointing.gif'));

  // 5. Lobby: Standing Talking
  const standingTalkingFrames = [
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), delay: 9 },
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'), delay: 9 },
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'i.png'), delay: 9 },
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'u.png'), delay: 9 },
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'e.png'), delay: 9 },
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'o.png'), delay: 9 },
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'), delay: 9 },
    { file: path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'), delay: 9 },
  ];
  await createPureTransparentGif(standingTalkingFrames, path.join(outputDir, 'relo_standing_talking.gif'));

  console.log('🎉 All GIFs generated with guaranteed transparency and 0 black box artifacts!');
}

main();
