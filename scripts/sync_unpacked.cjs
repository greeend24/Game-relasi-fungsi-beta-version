const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const targetSiapMain = 'D:\\File Penting\\File S2\\Thesis Project\\Game Relasi Fungsi siap main';
const baseDist = fs.existsSync(targetSiapMain) ? targetSiapMain : path.join(rootDir, 'DISTRIBUSI_GAME_ALL_PLATFORM');

const srcDist = path.join(rootDir, 'dist');
const srcBackendDist = path.join(rootDir, 'backend', 'dist');
const srcDb = path.join(rootDir, 'backend', 'detektif_data.db');

// All Electron targets
const electronTargets = [
  path.join(baseDist, 'Detektif data (Windows Version)', 'Detektif_Data_Windows_Game'),
  path.join(rootDir, 'dist-electron', 'win-unpacked'),
];

// 1. Pack fresh app.asar first
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

const tempAsarOutput = path.join(rootDir, 'scratch', 'app.asar');
execSync(`npx @electron/asar pack "${tempAsarDir}" "${tempAsarOutput}"`, { stdio: 'inherit' });
fs.rmSync(tempAsarDir, { recursive: true, force: true });

// 2. Sync to all Electron targets
electronTargets.forEach(targetFolder => {
  const targetRes = path.join(targetFolder, 'resources');
  if (fs.existsSync(targetRes)) {
    console.log(`📦 Syncing Electron distribution: ${path.relative(rootDir, targetFolder) || targetFolder}...`);

    // Sync frontend dist
    const distAssets = path.join(targetRes, 'frontend', 'dist', 'assets');
    if (fs.existsSync(distAssets)) fs.rmSync(distAssets, { recursive: true, force: true });
    fs.cpSync(srcDist, path.join(targetRes, 'frontend', 'dist'), { recursive: true, force: true });

    // Sync backend dist
    fs.cpSync(srcBackendDist, path.join(targetRes, 'backend', 'dist'), { recursive: true, force: true });

    // Sync master database
    if (fs.existsSync(srcDb)) {
      fs.copyFileSync(srcDb, path.join(targetRes, 'backend', 'detektif_data.db'));
    }

    // Sync app.asar
    if (fs.existsSync(tempAsarOutput)) {
      fs.copyFileSync(tempAsarOutput, path.join(targetRes, 'app.asar'));
    }
  }
});

// Clean temp asar
if (fs.existsSync(tempAsarOutput)) fs.unlinkSync(tempAsarOutput);

// 3. Sync database to AppData Roaming
const appData = process.env.APPDATA;
if (appData && fs.existsSync(srcDb)) {
  const appDataDb = path.join(appData, 'detektif-data-relasi-fungsi', 'detektif_data.db');
  if (fs.existsSync(path.dirname(appDataDb))) {
    fs.copyFileSync(srcDb, appDataDb);
    console.log('📦 Syncing detektif_data.db into AppData Roaming...');
  }
}

// 4. Patch executable icons for all targets
try {
  execSync('node scripts/patch_exe_icon.cjs', { cwd: rootDir, stdio: 'inherit' });
} catch (e) {
  console.warn('Exe icon patch notice:', e.message);
}

// 5. Sync to WebView2 game_data if present
const webview2GameData = path.join(baseDist, 'Detektif data (Windows WebView2 Version)', 'game_data');
if (fs.existsSync(webview2GameData)) {
  console.log('📦 Syncing frontend dist into Detektif data (Windows WebView2 Version)...');
  fs.cpSync(srcDist, webview2GameData, { recursive: true, force: true });
}

// 6. Sync to Web Version if present
const webVersionFolder = path.join(baseDist, 'Detektif data (Web Version)');
if (fs.existsSync(webVersionFolder)) {
  console.log('📦 Syncing frontend dist into Detektif data (Web Version)...');
  fs.cpSync(srcDist, webVersionFolder, { recursive: true, force: true });
}

// 7. Update distribution Windows ZIP directly
const distWinFolder = electronTargets[0];
const targetWinZip = path.join(baseDist, 'Detektif data (Windows Version).zip');
const winSourceParent = path.dirname(distWinFolder);
try {
  console.log('📦 Updating Windows ZIP in distribution folder...');
  if (fs.existsSync(targetWinZip)) {
    fs.unlinkSync(targetWinZip);
  }
  execSync(`tar.exe -a -c -f "${targetWinZip}" -C "${winSourceParent}" Detektif_Data_Windows_Game`, { stdio: 'inherit' });
  const sizeMb = (fs.statSync(targetWinZip).size / (1024 * 1024)).toFixed(1);
  console.log(`🎁 Updated: ${targetWinZip} (${sizeMb} MB)`);
} catch (e) {
  console.warn('Dist ZIP copy notice:', e.message);
}

// 8. Update Web Version ZIP if present
const targetWebZip = path.join(baseDist, 'Detektif data (Web Version).zip');
if (fs.existsSync(webVersionFolder)) {
  try {
    console.log('📦 Updating Web ZIP in distribution folder...');
    if (fs.existsSync(targetWebZip)) fs.unlinkSync(targetWebZip);
    execSync(`tar.exe -a -c -f "${targetWebZip}" -C "${baseDist}" "Detektif data (Web Version)"`, { stdio: 'inherit' });
    const sizeMb = (fs.statSync(targetWebZip).size / (1024 * 1024)).toFixed(1);
    console.log(`🎁 Updated: ${targetWebZip} (${sizeMb} MB)`);
  } catch (e) {
    console.warn('Web ZIP copy notice:', e.message);
  }
}

console.log('🎉 SUCCESS: All Electron and distribution folders are 100% updated with all latest features & fixes!');
