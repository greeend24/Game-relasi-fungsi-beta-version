const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { GifWriter } = require('omggif');

const baseDir = path.join(__dirname, '..', 'public', 'relo', 'relo animation');
const outputDir = path.join(__dirname, '..', 'public', 'relo', 'gifs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function quantizeFrame(rgbaBuf, width, height) {
  const transparentIndex = 0;
  const palette = [0x000000]; // Reserve 0 for transparent
  const indexedPixels = new Uint8Array(width * height);
  const colorMap = new Map();

  for (let i = 0; i < width * height; i++) {
    const a = rgbaBuf[i * 4 + 3];
    if (a < 64) {
      indexedPixels[i] = transparentIndex;
    } else {
      const r = rgbaBuf[i * 4];
      const g = rgbaBuf[i * 4 + 1];
      const b = rgbaBuf[i * 4 + 2];
      const rq = r & 0xF8;
      const gq = g & 0xFC;
      const bq = b & 0xF8;
      const rgbKey = (rq << 16) | (gq << 8) | bq;

      let idx = colorMap.get(rgbKey);
      if (idx === undefined) {
        if (palette.length < 255) {
          idx = palette.length;
          palette.push(rgbKey);
          colorMap.set(rgbKey, idx);
        } else {
          idx = 1;
        }
      }
      indexedPixels[i] = idx;
    }
  }

  while (palette.length < 2 || (palette.length & (palette.length - 1)) !== 0) {
    palette.push(0);
  }

  return { palette, indexedPixels, transparentIndex };
}

async function createAnimatedGif(framePaths, delays, outputPath, targetHeight = 400) {
  try {
    console.log(`Processing ${path.basename(outputPath)} (${framePaths.length} frames)...`);

    const frameDataList = [];
    let width = 0;
    let height = 0;

    for (const framePath of framePaths) {
      if (!fs.existsSync(framePath)) {
        console.warn(`File not found: ${framePath}`);
        continue;
      }
      const { data, info } = await sharp(framePath, { limitInputPixels: false })
        .resize({ height: targetHeight, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      width = info.width;
      height = info.height;
      frameDataList.push(data);
    }

    if (frameDataList.length === 0) {
      console.error(`No valid frames for ${outputPath}`);
      return;
    }

    const maxBufSize = width * height * frameDataList.length * 4 + 65536;
    const gifBuffer = Buffer.alloc(maxBufSize);
    const writer = new GifWriter(gifBuffer, width, height, { loop: 0 });

    for (let i = 0; i < frameDataList.length; i++) {
      const rgbaBuf = frameDataList[i];
      const delay = Array.isArray(delays) ? (delays[i] || 25) : delays;
      const { palette, indexedPixels, transparentIndex } = quantizeFrame(rgbaBuf, width, height);

      writer.addFrame(0, 0, width, height, indexedPixels, {
        palette,
        delay,
        transparent: transparentIndex,
        disposal: 2
      });
    }

    const finalGif = gifBuffer.subarray(0, writer.end());
    await fs.promises.writeFile(outputPath, finalGif);
    console.log(`✅ Success: ${path.basename(outputPath)} (${width}x${height}, ${(finalGif.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`❌ Failed to create ${path.basename(outputPath)}:`, err);
  }
}

async function main() {
  console.log('🚀 Generating Animated GIFs for Chapter Mode and Quest Mode...');

  // 1. Chapter Mode Pointing GIF (Right Wing 1/2 -> 2/2 -> Left Wing 1/2 -> 2/2)
  const chapterFrames = [
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', '1. DIAM 1 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', '2. DIAM 2 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', '2. DIAM 2 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', '1. DIAM 1 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', '1. DIAM 1 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', '2. DIAM 2 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', '2. DIAM 2 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', '1. DIAM 1 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'diam.png'),
  ];
  const chapterDelays = [22, 45, 30, 20, 20, 22, 45, 30, 20, 20];
  await createAnimatedGif(chapterFrames, chapterDelays, path.join(outputDir, 'relo_chapter_pointing.gif'), 400);

  // 2. Quest Mode Thinking GIF (Thinking pose with natural eye blinks and head tilt reflection)
  const questFrames = [
    path.join(baseDir, 'mikir', 'diam.png'),
    path.join(baseDir, 'mikir', 'diam.png'),
    path.join(baseDir, 'mikir', 'TUTUP MATA DUA DUANYA.png'),
    path.join(baseDir, 'mikir', 'diam.png'),
    path.join(baseDir, 'mikir', 'diam.png'),
    path.join(baseDir, 'mikir', 'TUTUP MATA KANAN.png'),
    path.join(baseDir, 'mikir', 'diam.png'),
    path.join(baseDir, 'mikir', 'TUTUP MATA KIRI.png'),
    path.join(baseDir, 'mikir', 'diam.png'),
  ];
  const questDelays = [60, 50, 22, 55, 45, 20, 50, 20, 45];
  await createAnimatedGif(questFrames, questDelays, path.join(outputDir, 'relo_thinking_idle.gif'), 400);

  // Also create relo_thinking.gif pointing to thinking idle animation
  await createAnimatedGif(questFrames, questDelays, path.join(outputDir, 'relo_thinking.gif'), 400);

  console.log('🎉 All Chapter Mode & Quest Mode GIFs created successfully!');
}

main();
