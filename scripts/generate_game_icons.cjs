const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const sourceIconPath = path.join(rootDir, 'public', 'assets', 'Logo game', 'logo game icon.png');

if (!fs.existsSync(sourceIconPath)) {
  console.error('Source icon not found:', sourceIconPath);
  process.exit(1);
}

// Function to pack multiple PNG buffers into a valid Windows .ICO format
function createIcoBuffer(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = count * dirEntrySize;
  let offset = headerSize + dirSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO type
  header.writeUInt16LE(count, 4); // count of images

  const entries = [];
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256px)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256px)
    entry.writeUInt8(0, 2); // color palette count (0 = no palette)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel (32-bit RGBA)
    entry.writeUInt32LE(buf.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    entries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function run() {
  console.log('🎨 Generating all game icons from:', sourceIconPath);

  // 1. Generate ICO file buffers (16, 32, 48, 64, 128, 256)
  const icoSizes = [16, 32, 48, 64, 128, 256];
  const icoPngBuffers = await Promise.all(
    icoSizes.map(size => sharp(sourceIconPath).resize(size, size).png().toBuffer())
  );
  const icoBuffer = createIcoBuffer(icoPngBuffers, icoSizes);

  // 1a. Save .ico in public/assets/Logo game/
  const logoGameIcoPath = path.join(rootDir, 'public', 'assets', 'Logo game', 'logo game icon.ico');
  fs.writeFileSync(logoGameIcoPath, icoBuffer);
  console.log('  ✅ Wrote:', logoGameIcoPath);

  // 1b. Save favicon.ico in public/
  const publicFaviconIco = path.join(rootDir, 'public', 'favicon.ico');
  fs.writeFileSync(publicFaviconIco, icoBuffer);
  console.log('  ✅ Wrote:', publicFaviconIco);

  // 1c. Save electron-assets/icon.ico & icon.png
  const electronAssetsDir = path.join(rootDir, 'electron-assets');
  if (!fs.existsSync(electronAssetsDir)) fs.mkdirSync(electronAssetsDir, { recursive: true });
  fs.writeFileSync(path.join(electronAssetsDir, 'icon.ico'), icoBuffer);
  await sharp(sourceIconPath).resize(512, 512).png().toFile(path.join(electronAssetsDir, 'icon.png'));
  console.log('  ✅ Wrote Electron assets:', path.join(electronAssetsDir, 'icon.ico'));

  // 2. Web Favicon and Apple Touch icons
  await sharp(sourceIconPath).resize(32, 32).png().toFile(path.join(rootDir, 'public', 'favicon.png'));
  await sharp(sourceIconPath).resize(16, 16).png().toFile(path.join(rootDir, 'public', 'favicon-16x16.png'));
  await sharp(sourceIconPath).resize(32, 32).png().toFile(path.join(rootDir, 'public', 'favicon-32x32.png'));
  await sharp(sourceIconPath).resize(180, 180).png().toFile(path.join(rootDir, 'public', 'apple-touch-icon.png'));
  await sharp(sourceIconPath).resize(192, 192).png().toFile(path.join(rootDir, 'public', 'icon-192.png'));
  await sharp(sourceIconPath).resize(512, 512).png().toFile(path.join(rootDir, 'public', 'icon-512.png'));
  await sharp(sourceIconPath).resize(512, 512).png().toFile(path.join(rootDir, 'public', 'icon.png'));
  console.log('  ✅ Wrote Web PNG icons into public/');

  // 3. Android Mipmap icons (standard, round, foreground)
  const androidResDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');
  if (fs.existsSync(androidResDir)) {
    const densities = [
      { name: 'mipmap-mdpi', launcherSize: 48, fgSize: 108, innerSize: 72 },
      { name: 'mipmap-hdpi', launcherSize: 72, fgSize: 162, innerSize: 108 },
      { name: 'mipmap-xhdpi', launcherSize: 96, fgSize: 216, innerSize: 144 },
      { name: 'mipmap-xxhdpi', launcherSize: 144, fgSize: 324, innerSize: 216 },
      { name: 'mipmap-xxxhdpi', launcherSize: 192, fgSize: 432, innerSize: 288 },
    ];

    for (const d of densities) {
      const targetDir = path.join(androidResDir, d.name);
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

      // Standard launcher icon (launcherSize x launcherSize)
      await sharp(sourceIconPath)
        .resize(d.launcherSize, d.launcherSize)
        .png()
        .toFile(path.join(targetDir, 'ic_launcher.png'));

      // Round launcher icon with circular crop
      const roundCircleSvg = Buffer.from(
        `<svg><circle cx="${d.launcherSize / 2}" cy="${d.launcherSize / 2}" r="${d.launcherSize / 2}" fill="#ffffff"/></svg>`
      );
      await sharp(sourceIconPath)
        .resize(d.launcherSize, d.launcherSize)
        .composite([{ input: roundCircleSvg, blend: 'dest-in' }])
        .png()
        .toFile(path.join(targetDir, 'ic_launcher_round.png'));

      // Adaptive icon foreground: safe area inside fgSize with margin
      const innerIconBuffer = await sharp(sourceIconPath)
        .resize(d.innerSize, d.innerSize)
        .png()
        .toBuffer();

      const padding = Math.floor((d.fgSize - d.innerSize) / 2);
      await sharp({
        create: {
          width: d.fgSize,
          height: d.fgSize,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .composite([{ input: innerIconBuffer, top: padding, left: padding }])
        .png()
        .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));

      console.log(`  ✅ Wrote Android ${d.name} icons`);
    }

    // Remove legacy Android drawable-v24/ic_launcher_foreground.xml vector robot so Android uses mipmap PNGs
    const legacyVector = path.join(androidResDir, 'drawable-v24', 'ic_launcher_foreground.xml');
    if (fs.existsSync(legacyVector)) {
      fs.unlinkSync(legacyVector);
      console.log('  🗑️ Removed legacy Android robot vector ic_launcher_foreground.xml');
    }
  }

  // 4. iOS AppIcon
  const iosIconDir = path.join(rootDir, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset');
  if (fs.existsSync(iosIconDir)) {
    // Apple App Store icon must be opaque 1024x1024
    const bg1024 = await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 3,
        background: '#FAF7F2', // Matches game parchment background
      },
    })
      .png()
      .toBuffer();

    const logo880 = await sharp(sourceIconPath)
      .resize(880, 880)
      .png()
      .toBuffer();

    await sharp(bg1024)
      .composite([{ input: logo880, top: 72, left: 72 }])
      .png()
      .toFile(path.join(iosIconDir, 'AppIcon-512@2x.png'));

    console.log('  ✅ Wrote iOS AppIcon-512@2x.png (1024x1024)');
  }

  // 5. Update Electron loading.html with the new game icon
  const loadingHtmlPath = path.join(rootDir, 'electron', 'loading.html');
  if (fs.existsSync(loadingHtmlPath)) {
    const iconBase64 = (await sharp(sourceIconPath).resize(96, 96).png().toBuffer()).toString('base64');
    let html = fs.readFileSync(loadingHtmlPath, 'utf8');
    html = html.replace(
      /<div class="icon-emoji">.*?<\/div>|<img[^>]*class="icon-emoji"[^>]*\/>/,
      `<img src="data:image/png;base64,${iconBase64}" alt="Logo Game" class="icon-emoji" style="width:56px;height:56px;object-fit:contain;" />`
    );
    fs.writeFileSync(loadingHtmlPath, html, 'utf8');
    console.log('  ✅ Updated electron/loading.html with game icon');
  }

  console.log('🎉 All game icons have been successfully generated and replaced!');
}

run().catch((err) => {
  console.error('Icon generation failed:', err);
  process.exit(1);
});
