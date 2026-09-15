const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { GifWriter } = require('omggif');

const baseDir = path.join(__dirname, '..', 'public', 'relo', 'relo animation');
const outputDir = path.join(__dirname, '..', 'public', 'relo', 'gifs');
const artifactsDir = path.join('C:', 'Users', 'GreeND24', '.gemini', 'antigravity-ide', 'brain', 'a4118c3b-2ad8-49ac-b290-c8e25b17fb2c', 'gifs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

/**
 * Quantize RGBA buffer into a GIF frame palette + indexed pixels
 */
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
      // Quantize 24-bit color space into fast palette
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

async function createTalkingGif(framePaths, outputPath, delayHundredths = 9, targetHeight = 400) {
  try {
    console.log(`Processing ${path.basename(outputPath)} (${framePaths.length} frames)...`);

    const frameDataList = [];
    let width = 0;
    let height = 0;

    for (const framePath of framePaths) {
      const { data, info } = await sharp(framePath, { limitInputPixels: false })
        .resize({ height: targetHeight, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      width = info.width;
      height = info.height;
      frameDataList.push(data);
    }

    const maxBufSize = width * height * frameDataList.length * 4 + 65536;
    const gifBuffer = Buffer.alloc(maxBufSize);
    const writer = new GifWriter(gifBuffer, width, height, { loop: 0 });

    for (const rgbaBuf of frameDataList) {
      const { palette, indexedPixels, transparentIndex } = quantizeFrame(rgbaBuf, width, height);

      writer.addFrame(0, 0, width, height, indexedPixels, {
        palette,
        delay: delayHundredths,
        transparent: transparentIndex,
        disposal: 2 // Clear previous frame to prevent ghosting/stacking
      });
    }

    const finalGif = gifBuffer.subarray(0, writer.end());

    await fs.promises.writeFile(outputPath, finalGif);
    const artifactPath = path.join(artifactsDir, path.basename(outputPath));
    await fs.promises.writeFile(artifactPath, finalGif);

    console.log(`✅ Success: ${path.basename(outputPath)} (${width}x${height}, ${framePaths.length} pages, ${(finalGif.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`❌ Failed to create ${path.basename(outputPath)}:`, err);
  }
}

async function main() {
  console.log('🚀 Generating TRUE multi-page animated GIFs using omggif...');

  // 1. Standing Talking GIF
  const standingTalkingFiles = [
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'DIAM.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'i.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'u.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'e.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'o.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'DIAM.png'),
  ].filter(fs.existsSync);

  await createTalkingGif(standingTalkingFiles, path.join(outputDir, 'relo_standing_talking.gif'), 9, 400);

  // 2. Thinking Talking GIF
  const thinkingTalkingFiles = [
    path.join(baseDir, 'mikir', 'diam.png'),
    path.join(baseDir, 'mikir', 'a.png'),
    path.join(baseDir, 'mikir', 'i.png'),
    path.join(baseDir, 'mikir', 'u.png'),
    path.join(baseDir, 'mikir', 'e.png'),
    path.join(baseDir, 'mikir', 'o.png'),
    path.join(baseDir, 'mikir', 'a.png'),
    path.join(baseDir, 'mikir', 'diam.png'),
  ].filter(fs.existsSync);

  await createTalkingGif(thinkingTalkingFiles, path.join(outputDir, 'relo_thinking_talking.gif'), 9, 400);

  // 3. Point Right Talking GIF
  const pointRightFiles = [
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', '2. DIAM 2 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'a.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk megenai sayap kanan', 'i.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'i.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'u.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'e.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'o.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'a.png'),
  ].filter(fs.existsSync);

  if (pointRightFiles.length > 0) {
    await createTalkingGif(pointRightFiles, path.join(outputDir, 'relo_point_right_talking.gif'), 9, 400);
  }

  // 4. Point Left Talking GIF
  const pointLeftFiles = [
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', '2. DIAM 2 PER 2 SAYAP.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'A.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'I.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'U.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'E.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'O.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'A.png'),
  ].filter(fs.existsSync);

  if (pointLeftFiles.length > 0) {
    await createTalkingGif(pointLeftFiles, path.join(outputDir, 'relo_point_left_talking.gif'), 9, 400);
  }

  // 5. Flapping GIF
  const flappingFiles = [
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '1. sayap tertutup.png'),
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '2. 1 per 5 terbuka .png'),
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '3. 2 per 5 terbuka.png'),
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '4. 3 per 5 terbuka.png'),
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '5. 4 per 5 terbuka.png'),
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '6. 5 per 5 terbuka.png'),
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '5. 4 per 5 terbuka.png'),
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '4. 3 per 5 terbuka.png'),
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '3. 2 per 5 terbuka.png'),
    path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata', '2. 1 per 5 terbuka .png'),
  ].filter(fs.existsSync);

  if (flappingFiles.length > 0) {
    await createTalkingGif(flappingFiles, path.join(outputDir, 'relo_flapping.gif'), 7, 400);
  }

  console.log('🎉 Done! All multi-page animated GIFs generated successfully!');
}

main();
