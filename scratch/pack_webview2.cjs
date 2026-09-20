const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distPlatformDir = path.join(rootDir, 'DISTRIBUSI_GAME_ALL_PLATFORM');

// 1. Pack WebView2
console.log('📦 Packing 5_WINDOWS_WEBVIEW2...');
const webview2Zip = path.join(distPlatformDir, 'Detektif_Data_Windows_WebView2.zip');
if (fs.existsSync(webview2Zip)) fs.unlinkSync(webview2Zip);
cp.execSync(`tar.exe -a -c -f "${webview2Zip}" -C "${distPlatformDir}" 5_WINDOWS_WEBVIEW2`, { stdio: 'inherit' });
console.log(`✅ Detektif_Data_Windows_WebView2.zip created: ${(fs.statSync(webview2Zip).size / (1024*1024)).toFixed(1)} MB`);
