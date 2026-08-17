const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const baseDir = path.join(__dirname, '..', 'public', 'relo', 'relo animation');
const outputDir = path.join(__dirname, '..', 'public', 'relo', 'gifs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Base dir:', baseDir);

async function findPngs(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(await findPngs(filePath));
    } else if (file.endsWith('.png')) {
      results.push(filePath);
    }
  }
  return results;
}

async function run() {
  const pngs = await findPngs(baseDir);
  console.log(`Found ${pngs.length} PNG files.`);
}

run();
