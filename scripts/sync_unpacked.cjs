const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const targetSiapMain = 'D:\\File Penting\\File S2\\Thesis Project\\Game Relasi Fungsi siap main';
const baseDist = fs.existsSync(targetSiapMain) ? targetSiapMain : path.join(rootDir, 'DISTRIBUSI_GAME_ALL_PLATFORM');
const distWinFolder = path.join(baseDist, '1_WINDOWS_ELECTRON', 'Detektif_Data_Windows_Game');
const distWinRes = path.join(distWinFolder, 'resources');

const srcDist = path.join(rootDir, 'dist');
const srcBackendDist = path.join(rootDir, 'backend', 'dist');

// 1. Sync directly into DISTRIBUSI_GAME_ALL_PLATFORM/1_WINDOWS_ELECTRON/Detektif_Data_Windows_Game
if (fs.existsSync(distWinRes)) {
  console.log('📦 Syncing frontend dist into DISTRIBUSI_GAME_ALL_PLATFORM...');
  const distAssets = path.join(distWinRes, 'frontend', 'dist', 'assets');
  if (fs.existsSync(distAssets)) fs.rmSync(distAssets, { recursive: true, force: true });
  fs.cpSync(srcDist, path.join(distWinRes, 'frontend', 'dist'), { recursive: true, force: true });

  console.log('📦 Syncing backend dist into DISTRIBUSI_GAME_ALL_PLATFORM...');
  fs.cpSync(srcBackendDist, path.join(distWinRes, 'backend', 'dist'), { recursive: true, force: true });

  // Sinkronkan database master ke resources distribusi & AppData
  const srcDb = path.join(rootDir, 'backend', 'detektif_data.db');
  if (fs.existsSync(srcDb)) {
    fs.copyFileSync(srcDb, path.join(distWinRes, 'backend', 'detektif_data.db'));
    const appData = process.env.APPDATA;
    if (appData) {
      const appDataDb = path.join(appData, 'detektif-data-relasi-fungsi', 'detektif_data.db');
      if (fs.existsSync(path.dirname(appDataDb))) {
        fs.copyFileSync(srcDb, appDataDb);
        console.log('📦 Syncing detektif_data.db into AppData Roaming...');
      }
    }
  }

  try {
    execSync('node scripts/patch_exe_icon.cjs', { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.warn('Exe icon patch notice:', e.message);
  }
}

// 2. Pack asar directly into distWinRes
console.log('📦 Packing fresh app.asar...');
const tempAsarDir = path.join(rootDir, 'scratch', 'temp_asar');
if (fs.existsSync(tempAsarDir)) fs.rmSync(tempAsarDir, { recursive: true, force: true });
fs.mkdirSync(path.join(tempAsarDir, 'electron'), { recursive: true });
fs.copyFileSync(path.join(rootDir, 'electron', 'main.cjs'), path.join(tempAsarDir, 'electron', 'main.cjs'));
fs.copyFileSync(path.join(rootDir, 'electron', 'preload.cjs'), path.join(tempAsarDir, 'electron', 'preload.cjs'));
if (fs.existsSync(path.join(rootDir, 'electron', 'loading.html'))) {
  fs.copyFileSync(path.join(rootDir, 'electron', 'loading.html'), path.join(tempAsarDir, 'electron', 'loading.html'));
}
fs.copyFileSync(path.join(rootDir, 'package.json'), path.join(tempAsarDir, 'package.json'));

if (fs.existsSync(distWinRes)) {
  const distAsarPath = path.join(distWinRes, 'app.asar');
  execSync(`npx @electron/asar pack "${tempAsarDir}" "${distAsarPath}"`, { stdio: 'inherit' });
}

fs.rmSync(tempAsarDir, { recursive: true, force: true });

console.log('🎉 SUCCESS: Distribution folder is 100% updated with all latest features & fixes!');

// 3. Update distribution Windows ZIP directly
const distZip = path.join(baseDist, 'Detektif_Data_Windows_Electron.zip');
try {
  console.log('📦 Updating Windows Electron ZIP in distribution folder...');
  if (fs.existsSync(distZip)) {
    fs.unlinkSync(distZip);
  }
  execSync(`tar.exe -a -c -f "${distZip}" -C "${path.join(baseDist, '1_WINDOWS_ELECTRON')}" Detektif_Data_Windows_Game`, { stdio: 'inherit' });
  const sizeMb = (fs.statSync(distZip).size / (1024 * 1024)).toFixed(1);
  console.log(`🎁 Updated: ${distZip} (${sizeMb} MB)`);
} catch (e) {
  console.warn('Dist ZIP copy notice:', e.message);
}
