import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDirs = [
  path.resolve(process.cwd(), 'public/relo/relo animation'),
  path.resolve(process.cwd(), 'public/images'),
  path.resolve(process.cwd(), 'public/assets')
];

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      const stats = fs.statSync(fullPath);
      // Process files larger than 400KB
      if (stats.size > 400 * 1024) {
        console.log(`Optimizing: ${entry.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
        
        const tempPath = fullPath + '.tmp.png';
        try {
          // Relo mascot frames need 512x512 max, UI assets can be larger
          const isRelo = fullPath.includes('relo animation') || fullPath.includes('relo');
          const maxDim = isRelo ? 512 : 1280;

          await sharp(fullPath)
            .resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true })
            .png({ compressionLevel: 9, quality: 85, effort: 7 })
            .toFile(tempPath);

          fs.renameSync(tempPath, fullPath);
          const newStats = fs.statSync(fullPath);
          console.log(`  -> Optimized to ${(newStats.size / 1024).toFixed(2)} KB! (Saved ${((1 - newStats.size / stats.size) * 100).toFixed(1)}%)`);
        } catch (err) {
          console.error(`  Failed to optimize ${entry.name}:`, err.message);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting PNG frame and asset optimization...');
  for (const dir of targetDirs) {
    await processDirectory(dir);
  }
  console.log('✅ Asset optimization complete!');
}

main();
