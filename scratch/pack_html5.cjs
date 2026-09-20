const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distPlatformDir = path.join(rootDir, 'DISTRIBUSI_GAME_ALL_PLATFORM');

// Pack 6_VERSI_HTML5_WEB
console.log('📦 Packing 6_VERSI_HTML5_WEB...');
const html5Zip = path.join(distPlatformDir, 'Detektif_Data_HTML5_Web.zip');
if (fs.existsSync(html5Zip)) fs.unlinkSync(html5Zip);

// Notice: for itch.io and web distribution, we pack the contents of 6_VERSI_HTML5_WEB or the folder
// Packing the folder from parent directory so it extracts cleanly or works for Itch.io
cp.execSync(`tar.exe -a -c -f "${html5Zip}" -C "${path.join(distPlatformDir, '6_VERSI_HTML5_WEB')}" .`, { stdio: 'inherit' });
console.log(`✅ Detektif_Data_HTML5_Web.zip created: ${(fs.statSync(html5Zip).size / (1024*1024)).toFixed(1)} MB`);
