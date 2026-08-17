import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDirs = [
  path.resolve(process.cwd(), 'public/relo/relo animation'),
  path.resolve(process.cwd(), 'relo/relo animation')
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
      // Only process files larger than 500KB
      if (stats.size > 500 * 1024) {
        console.log(`Optimizing: ${entry.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
        
        const tempPath = fullPath + '.tmp.png';
        try {
          await sharp(fullPath)
            .resize({ width: 512, height: 512, fit: 'inside', withoutEnlargement: true })
            .png({ compressionLevel: 8, quality: 85 })
            .toFile(tempPath);

          fs.renameSync(tempPath, fullPath);
          const newStats = fs.statSync(fullPath);
          console.log(`  -> Optimized to ${(newStats.size / 1024).toFixed(2)} KB!`);
        } catch (err) {
          console.error(`  Failed to optimize ${entry.name}:`, err.message);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting Relo PNG frame optimization...');
  for (const dir of targetDirs) {
    await processDirectory(dir);
  }
  console.log('✅ Optimization complete!');
}

main();
