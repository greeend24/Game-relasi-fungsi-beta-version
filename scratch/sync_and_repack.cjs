const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const src = path.join(rootDir, 'dist');
const distPlatform = path.join(rootDir, 'DISTRIBUSI_GAME_ALL_PLATFORM');

// 1. Sync WebView2 game_data
const webview2Dest = path.join(distPlatform, '5_WINDOWS_WEBVIEW2', 'game_data');
fs.cpSync(src, webview2Dest, { recursive: true, force: true });
console.log('✅ Synced to 5_WINDOWS_WEBVIEW2/game_data');

// 2. Sync 6_VERSI_HTML5_WEB (preserve bat & sh launchers and guide)
const html5Dest = path.join(distPlatform, '6_VERSI_HTML5_WEB');
fs.cpSync(src, html5Dest, { recursive: true, force: true });
console.log('✅ Synced to 6_VERSI_HTML5_WEB');

// 3. Pack WebView2 zip
const webviewZip = path.join(distPlatform, 'Detektif_Data_Windows_WebView2.zip');
if (fs.existsSync(webviewZip)) fs.unlinkSync(webviewZip);
cp.execSync(`tar.exe -a -c -f "${webviewZip}" -C "${distPlatform}" 5_WINDOWS_WEBVIEW2`, { stdio: 'inherit' });
console.log(`✅ Repacked Detektif_Data_Windows_WebView2.zip (${(fs.statSync(webviewZip).size / (1024*1024)).toFixed(1)} MB)`);

// 4. Pack HTML5 zip
const html5Zip = path.join(distPlatform, 'Detektif_Data_HTML5_Web.zip');
if (fs.existsSync(html5Zip)) fs.unlinkSync(html5Zip);
cp.execSync(`tar.exe -a -c -f "${html5Zip}" -C "${html5Dest}" .`, { stdio: 'inherit' });
console.log(`✅ Repacked Detektif_Data_HTML5_Web.zip (${(fs.statSync(html5Zip).size / (1024*1024)).toFixed(1)} MB)`);

// 5. Sync Electron unpacked & zip
console.log('📦 Updating Electron unpacked resources...');
const syncUnpackedScript = path.join(rootDir, 'scripts', 'sync_unpacked.cjs');
if (fs.existsSync(syncUnpackedScript)) {
  cp.execSync(`node "${syncUnpackedScript}"`, { stdio: 'inherit' });
}
console.log('🎉 ALL PACKAGES 100% UPDATED WITH ULTRA-FAST HIGH PERFORMANCE ENGINE!');
