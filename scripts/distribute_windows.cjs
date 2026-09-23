const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const targetSiapMain = 'D:\\File Penting\\File S2\\Thesis Project\\Game Relasi Fungsi siap main';
const distPlatform = fs.existsSync(targetSiapMain) ? targetSiapMain : path.join(rootDir, 'DISTRIBUSI_GAME_ALL_PLATFORM');
const winFolder = path.join(distPlatform, 'Detektif data (Windows Version)');
const winGameFolder = path.join(winFolder, 'Detektif_Data_Windows_Game');
const webview2Folder = path.join(distPlatform, 'Detektif data (Windows WebView2 Version)');

console.log('═══════════════════════════════════════════════════════════════');
console.log('       🎮 DISTRIBUSI DETEKTIF DATA KE WINDOWS 🎮               ');
console.log('═══════════════════════════════════════════════════════════════');
console.log(`📁 Target folder distribusi: ${distPlatform}\n`);

// 1. Generate / verify icons
console.log('🎨 [1/7] Memperbarui file icon game (.ico)...');
try {
  execSync('node scripts/generate_game_icons.cjs', { cwd: rootDir, stdio: 'inherit' });
} catch (e) {
  console.warn('Icon notice:', e.message);
}

// 2. Build Frontend
console.log('\n⚡ [2/7] Membangun Frontend (Vite React)...');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

// 3. Build Backend
console.log('\n⚙️ [3/7] Membangun Backend Express (TypeScript → JS)...');
execSync('npm run backend:build', { cwd: rootDir, stdio: 'inherit' });

// 4. Build Electron Package via electron-builder (NSIS Installer & Unpacked)
console.log('\n📦 [4/7] Membangun Installer & Binary Windows (.exe via electron-builder)...');
execSync('npx electron-builder build --win --x64 --config electron-builder.config.cjs', { cwd: rootDir, stdio: 'inherit' });

// 5. Update and Sync Windows Version Folder
console.log('\n📂 [5/7] Menyinkronkan hasil build ke folder distribusi Windows...');
if (!fs.existsSync(winFolder)) {
  fs.mkdirSync(winFolder, { recursive: true });
}

// Cari setup installer .exe di dist-electron
const distElectronDir = path.join(rootDir, 'dist-electron');
let setupExeFile = null;
if (fs.existsSync(distElectronDir)) {
  const files = fs.readdirSync(distElectronDir);
  const found = files.find(f => f.toLowerCase().endsWith('.exe') && !f.toLowerCase().includes('blockmap'));
  if (found) {
    setupExeFile = path.join(distElectronDir, found);
  }
}

if (setupExeFile && fs.existsSync(setupExeFile)) {
  const targetRootSetup = path.join(distPlatform, 'detektif data windows setup.exe');
  const targetWinFolderSetup = path.join(winFolder, 'detektif data windows setup.exe');
  console.log(`  📋 Menyalin installer: ${path.basename(setupExeFile)}`);
  fs.copyFileSync(setupExeFile, targetRootSetup);
  fs.copyFileSync(setupExeFile, targetWinFolderSetup);
}

// Sinkronkan portable unpacked game folder
const unpackedSource = path.join(distElectronDir, 'win-unpacked');
if (fs.existsSync(unpackedSource)) {
  console.log('  📋 Menyalin direktori portable game (win-unpacked)...');
  if (fs.existsSync(winGameFolder)) {
    fs.rmSync(winGameFolder, { recursive: true, force: true });
  }
  fs.cpSync(unpackedSource, winGameFolder, { recursive: true });
}

// Salin icon & konfigurasi server
const iconIco = path.join(rootDir, 'electron-assets', 'icon.ico');
if (fs.existsSync(iconIco)) {
  fs.copyFileSync(iconIco, path.join(winFolder, 'icon.ico'));
  if (fs.existsSync(winGameFolder)) {
    fs.copyFileSync(iconIco, path.join(winGameFolder, 'icon.ico'));
    const winGameRes = path.join(winGameFolder, 'resources');
    if (fs.existsSync(winGameRes)) {
      fs.copyFileSync(iconIco, path.join(winGameRes, 'icon.ico'));
    }
  }
}

const serverUrlTxt = path.join(rootDir, 'server_url.txt');
if (fs.existsSync(serverUrlTxt)) {
  fs.copyFileSync(serverUrlTxt, path.join(distPlatform, 'server_url.txt'));
  fs.copyFileSync(serverUrlTxt, path.join(winFolder, 'server_url.txt'));
  if (fs.existsSync(winGameFolder)) {
    fs.copyFileSync(serverUrlTxt, path.join(winGameFolder, 'server_url.txt'));
    const winGameRes = path.join(winGameFolder, 'resources');
    if (fs.existsSync(winGameRes)) {
      fs.copyFileSync(serverUrlTxt, path.join(winGameRes, 'server_url.txt'));
    }
  }
}

// Sinkronkan master database ke AppData agar langsung aktif di laptop lokal
const srcDb = path.join(rootDir, 'backend', 'detektif_data.db');
if (fs.existsSync(srcDb)) {
  const appData = process.env.APPDATA;
  if (appData) {
    const appDataDb = path.join(appData, 'detektif-data-relasi-fungsi', 'detektif_data.db');
    if (fs.existsSync(path.dirname(appDataDb))) {
      fs.copyFileSync(srcDb, appDataDb);
      console.log('  💾 Master database disinkronkan ke AppData pengguna.');
    }
  }
}

// Patch icon PE executable jika perlu
try {
  execSync('node scripts/patch_exe_icon.cjs', { cwd: rootDir, stdio: 'inherit' });
} catch (e) {
  console.warn('  ⚠️ Exe icon notice:', e.message);
}

// 6. Update Windows WebView2 Version
console.log('\n🌐 [6/7] Menyinkronkan Windows WebView2 Version...');
if (fs.existsSync(webview2Folder)) {
  const webview2GameData = path.join(webview2Folder, 'game_data');
  fs.cpSync(path.join(rootDir, 'dist'), webview2GameData, { recursive: true, force: true });
  if (fs.existsSync(iconIco)) {
    fs.copyFileSync(iconIco, path.join(webview2Folder, 'icon.ico'));
  }
  console.log('  ✅ WebView2 game_data berhasil diperbarui!');
}

// 7. Repack ZIP Windows
console.log('\n🗜️ [7/7] Membuat arsip ZIP untuk kemudahan distribusi...');
const repackZip = (zipPath, cwdPath, target) => {
  try {
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    execSync(`tar.exe -a -c -f "${zipPath}" -C "${cwdPath}" ${target}`, { stdio: 'ignore' });
    const sizeMb = (fs.statSync(zipPath).size / (1024 * 1024)).toFixed(1);
    console.log(`  🎁 ${path.basename(zipPath)} (${sizeMb} MB)`);
  } catch (e) {
    console.warn(`  ⚠️ Gagal zip ${path.basename(zipPath)}:`, e.message);
  }
};

// Detektif data (Windows Version).zip (Portable)
if (fs.existsSync(winGameFolder)) {
  repackZip(path.join(distPlatform, 'Detektif data (Windows Version).zip'), winFolder, 'Detektif_Data_Windows_Game');
}

// detektif data windows setup.zip (Installer)
const rootSetupExe = path.join(distPlatform, 'detektif data windows setup.exe');
if (fs.existsSync(rootSetupExe)) {
  repackZip(path.join(distPlatform, 'detektif data windows setup.zip'), distPlatform, '"detektif data windows setup.exe"');
}

// Detektif data (Windows WebView2 Version).zip
if (fs.existsSync(webview2Folder)) {
  repackZip(path.join(distPlatform, 'Detektif data (Windows WebView2 Version).zip'), distPlatform, '"Detektif data (Windows WebView2 Version)"');
}

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('🎉 DISTRIBUSI KE WINDOWS SELESAI & SUDAH SIAP DIMAINKAN!');
console.log('═══════════════════════════════════════════════════════════════');
console.log(`📂 Lokasi Installer & Portable:`);
console.log(`   1. Installer: ${path.join(distPlatform, 'detektif data windows setup.exe')}`);
console.log(`   2. Portable : ${winGameFolder}\\Detektif Data.exe`);
console.log(`   3. ZIP Siap Kirim:`);
console.log(`      • ${path.join(distPlatform, 'detektif data windows setup.zip')}`);
console.log(`      • ${path.join(distPlatform, 'Detektif data (Windows Version).zip')}`);
console.log(`      • ${path.join(distPlatform, 'Detektif data (Windows WebView2 Version).zip')}`);
console.log('═══════════════════════════════════════════════════════════════\n');
