const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const baseDir = path.join(__dirname, '..', 'public', 'relo', 'relo animation');
const outputDir = path.join(__dirname, '..', 'public', 'relo', 'gifs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function createAnimatedGifFromFiles(filePaths, outputPath, delayMs = 120, targetHeight = 512) {
  try {
    const rawBuffers = await Promise.all(filePaths.map(p => fs.promises.readFile(p)));
    
    // Resize each frame to crisp 512px height for ultra-lightweight GIF size and 0% lag
    const resizedImages = await Promise.all(
      rawBuffers.map(b => 
        sharp(b, { limitInputPixels: false })
          .resize({ height: targetHeight, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .ensureAlpha()
          .toBuffer()
      )
    );
    
    const meta = await sharp(resizedImages[0], { limitInputPixels: false }).metadata();

    // Stack frames vertically into a strip
    const joinedBuffer = await sharp({
      create: {
        width: meta.width,
        height: meta.height * resizedImages.length,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite(resizedImages.map((img, idx) => ({
      input: img,
      top: idx * meta.height,
      left: 0
    })))
    .png()
    .toBuffer();

    // Generate animated GIF with looping enabled
    const animatedGif = await sharp(joinedBuffer, {
      pageHeight: meta.height,
      limitInputPixels: false
    })
    .gif({ loop: 0, delay: delayMs })
    .toBuffer();

    await fs.promises.writeFile(outputPath, animatedGif);
    console.log(`✅ Generated GIF: ${path.basename(outputPath)} (${(animatedGif.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`❌ Error generating ${path.basename(outputPath)}:`, err);
  }
}

async function main() {
  console.log('Generating pre-baked lightweight Relo animated GIFs...');

  // 1. Standing Talking GIF (a, i, u, e, o, a)
  const standingTalkingFiles = [
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'i.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'u.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'e.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'o.png'),
    path.join(baseDir, 'Berdiri', 'tanpa aksi sayap', 'tidak mengedip', 'a.png'),
  ].filter(fs.existsSync);

  await createAnimatedGifFromFiles(standingTalkingFiles, path.join(outputDir, 'relo_standing_talking.gif'), 130);

  // 2. Thinking Talking GIF (a, i, u, e, o, a)
  const thinkingTalkingFiles = [
    path.join(baseDir, 'mikir', 'a.png'),
    path.join(baseDir, 'mikir', 'i.png'),
    path.join(baseDir, 'mikir', 'u.png'),
    path.join(baseDir, 'mikir', 'e.png'),
    path.join(baseDir, 'mikir', 'o.png'),
    path.join(baseDir, 'mikir', 'a.png'),
  ].filter(fs.existsSync);

  await createAnimatedGifFromFiles(thinkingTalkingFiles, path.join(outputDir, 'relo_thinking_talking.gif'), 130);

  // 3. Pointing Right Talking GIF
  const pointRightFiles = [
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'a.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'i.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk meperlihatkan sayap kanan', 'a.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'u.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'e.png'),
    path.join(baseDir, 'Berdiri', 'menunjuuk dengan sayap kanan', 'o.png'),
  ].filter(fs.existsSync);

  if (pointRightFiles.length > 0) {
    await createAnimatedGifFromFiles(pointRightFiles, path.join(outputDir, 'relo_point_right_talking.gif'), 130);
  }

  // 4. Pointing Left Talking GIF
  const pointLeftFiles = [
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'a.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'i.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'u.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'e.png'),
    path.join(baseDir, 'Berdiri', 'menuunjuk dengan sayap kiri', 'o.png'),
  ].filter(fs.existsSync);

  if (pointLeftFiles.length > 0) {
    await createAnimatedGifFromFiles(pointLeftFiles, path.join(outputDir, 'relo_point_left_talking.gif'), 130);
  }

  // 5. Wing Flap Sequence GIF
  const flapDir = path.join(baseDir, 'Mengepakkan sayap', 'tanpa aksi mata');
  if (fs.existsSync(flapDir)) {
    const flapFiles = fs.readdirSync(flapDir)
      .filter(f => f.endsWith('.png'))
      .map(f => path.join(flapDir, f));

    await createAnimatedGifFromFiles(flapFiles, path.join(outputDir, 'relo_flapping.gif'), 100);
  }

  console.log('✨ All Relo animated GIFs created successfully!');
}

main();
