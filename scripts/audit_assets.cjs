const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts = ['.jsx', '.js', '.css', '.html']) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== '.git' && item.name !== 'dist' && item.name !== 'dist-electron') {
        files = files.concat(getAllFiles(full, exts));
      }
    } else if (exts.includes(path.extname(item.name))) {
      files.push(full);
    }
  }
  return files;
}

const files = getAllFiles('src');
const assetRegex = /['"](\/(?:assets|Snowy|Ryu|relo|Relo|music|sound|game asset|tampilan)[^'"]+\.[a-zA-Z0-9]+)['"]/g;

const missing = [];
const existing = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = assetRegex.exec(content)) !== null) {
    const rawAssetPath = match[1];
    const cleanAsset = rawAssetPath.split('?')[0].split('#')[0];
    const localPath = path.join('public', cleanAsset);
    if (fs.existsSync(localPath)) {
      existing.add(cleanAsset);
    } else {
      missing.push({ file, asset: cleanAsset, localPath });
    }
  }
}

console.log(`Verified ${existing.size} existing assets.`);
console.log(`Found ${missing.length} missing asset references.`);
if (missing.length > 0) {
  for (const m of missing) {
    console.log(`[MISSING] ${m.asset} in ${m.file}`);
  }
}
