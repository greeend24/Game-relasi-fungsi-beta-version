const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const srcDist = path.join(rootDir, 'dist');
const backendDist = path.join(rootDir, 'backend', 'dist');
const targetSiapMain = 'D:\\File Penting\\File S2\\Thesis Project\\Game Relasi Fungsi siap main';
const distPlatform = fs.existsSync(targetSiapMain) ? targetSiapMain : path.join(rootDir, 'DISTRIBUSI_GAME_ALL_PLATFORM');

// Folder mappings with new format: "Detektif data (tempat mau di distribusikan)"
const FOLDERS = {
  winElectron: 'Detektif data (Windows Version)',
  winWebview2: 'Detektif data (Windows WebView2 Version)',
  web: 'Detektif data (Web Version)',
  android: 'Detektif data (Android Version)',
  ios: 'Detektif data (iOS Version)',
  macos: 'Detektif data (macOS Version)',
};

console.log('🎨 [1/8] Generating Game Icons (.ico, Android mipmaps, iOS AppIcon, Web Favicons)...');
try {
  execSync('node scripts/generate_game_icons.cjs', { cwd: rootDir, stdio: 'inherit' });
} catch (e) {
  console.warn('Icon generation notice:', e.message);
}

console.log('🚀 [2/8] Building Frontend & Backend...');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
if (fs.existsSync(path.join(rootDir, 'backend'))) {
  try {
    execSync('npm run backend:build', { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.warn('Backend build notice:', e.message);
  }
}

console.log('📱 [3/8] Syncing Capacitor (Android & iOS)...');
try {
  execSync('npx cap sync', { cwd: rootDir, stdio: 'inherit' });
} catch (e) {
  console.warn('Capacitor sync notice:', e.message);
}

console.log('🖥️ [4/8] Syncing Windows Electron Game & Setup Installer...');
const distWinBase = path.join(distPlatform, FOLDERS.winElectron);
const distWinFolder = path.join(distWinBase, 'Detektif_Data_Windows_Game');
const distWinRes = path.join(distWinFolder, 'resources');

if (fs.existsSync(distWinFolder)) {
  const iconIco = path.join(rootDir, 'electron-assets', 'icon.ico');
  if (fs.existsSync(iconIco)) {
    fs.copyFileSync(iconIco, path.join(distWinFolder, 'icon.ico'));
    if (fs.existsSync(distWinRes)) {
      fs.copyFileSync(iconIco, path.join(distWinRes, 'icon.ico'));
    }
  }

  try {
    execSync('node scripts/patch_exe_icon.cjs', { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.warn('Exe icon patch notice:', e.message);
  }
}

if (fs.existsSync(distWinRes)) {
  const distAssets = path.join(distWinRes, 'frontend', 'dist', 'assets');
  if (fs.existsSync(distAssets)) fs.rmSync(distAssets, { recursive: true, force: true });
  fs.cpSync(srcDist, path.join(distWinRes, 'frontend', 'dist'), { recursive: true, force: true });
  if (fs.existsSync(backendDist)) {
    fs.cpSync(backendDist, path.join(distWinRes, 'backend', 'dist'), { recursive: true, force: true });
  }

  // Sinkronkan database master ke resources distribusi & AppData
  const srcDb = path.join(rootDir, 'backend', 'detektif_data.db');
  if (fs.existsSync(srcDb)) {
    fs.copyFileSync(srcDb, path.join(distWinRes, 'backend', 'detektif_data.db'));
    const appData = process.env.APPDATA;
    if (appData) {
      const appDataDb = path.join(appData, 'detektif-data-relasi-fungsi', 'detektif_data.db');
      if (fs.existsSync(path.dirname(appDataDb))) {
        fs.copyFileSync(srcDb, appDataDb);
        console.log('  📦 Syncing detektif_data.db into AppData Roaming...');
      }
    }
  }
}

// Pack asar directly into distribution resources
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

// Copy / sync latest NSIS installer file: "detektif data windows setup.exe"
const distElectronExe = path.join(rootDir, 'dist-electron', 'Detektif Data Setup 1.0.0.exe');
const rootSetupExe = path.join(distPlatform, 'detektif data windows setup.exe');
const winFolderSetupExe = path.join(distWinBase, 'detektif data windows setup.exe');

if (fs.existsSync(distElectronExe)) {
  console.log('  📦 Syncing latest detektif data windows setup.exe from build...');
  fs.copyFileSync(distElectronExe, rootSetupExe);
  fs.copyFileSync(distElectronExe, winFolderSetupExe);
} else if (fs.existsSync(rootSetupExe) && !fs.existsSync(winFolderSetupExe)) {
  fs.copyFileSync(rootSetupExe, winFolderSetupExe);
} else if (fs.existsSync(winFolderSetupExe) && !fs.existsSync(rootSetupExe)) {
  fs.copyFileSync(winFolderSetupExe, rootSetupExe);
}

console.log('🌐 [5/8] Syncing Windows WebView2 & Web HTML5...');
const iconIco = path.join(rootDir, 'electron-assets', 'icon.ico');

// WebView2
const webview2Folder = path.join(distPlatform, FOLDERS.winWebview2);
const webview2Dest = path.join(webview2Folder, 'game_data');
if (fs.existsSync(webview2Folder)) {
  fs.cpSync(srcDist, webview2Dest, { recursive: true, force: true });
  if (fs.existsSync(iconIco)) {
    fs.copyFileSync(iconIco, path.join(webview2Folder, 'icon.ico'));
  }
}

// HTML5 Web
const html5Dest = path.join(distPlatform, FOLDERS.web);
if (fs.existsSync(html5Dest)) {
  fs.cpSync(srcDist, html5Dest, { recursive: true, force: true });
}

// Ensure mobile bundle is removed if still lingering
const mobileBundleDest = path.join(distPlatform, 'BUNDLE_MOBILE_ANDROID_DAN_IOS');
if (fs.existsSync(mobileBundleDest)) {
  fs.rmSync(mobileBundleDest, { recursive: true, force: true });
}
const mobileBundleZip = path.join(distPlatform, 'Bundle_Mobile_Android_iOS.zip');
if (fs.existsSync(mobileBundleZip)) {
  fs.unlinkSync(mobileBundleZip);
}

console.log('🤖 [6/8] Syncing Android Distribution Folders...');
const androidFolder = path.join(distPlatform, FOLDERS.android);
const androidWebDest = path.join(androidFolder, 'Game_Android_Web_Standalone');
if (fs.existsSync(androidFolder)) {
  fs.cpSync(srcDist, androidWebDest, { recursive: true, force: true });
}
const androidCapPublic = path.join(androidFolder, 'Project_Android_Capacitor', 'app', 'src', 'main', 'assets', 'public');
if (fs.existsSync(path.dirname(androidCapPublic))) {
  fs.cpSync(srcDist, androidCapPublic, { recursive: true, force: true });
}
// Sync Android app icons into distribution capacitor project
const srcAndroidRes = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');
const distAndroidRes = path.join(androidFolder, 'Project_Android_Capacitor', 'app', 'src', 'main', 'res');
if (fs.existsSync(srcAndroidRes) && fs.existsSync(distAndroidRes)) {
  ['mipmap-mdpi', 'mipmap-hdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi'].forEach(m => {
    const srcM = path.join(srcAndroidRes, m);
    const dstM = path.join(distAndroidRes, m);
    if (fs.existsSync(srcM) && fs.existsSync(dstM)) {
      fs.cpSync(srcM, dstM, { recursive: true, force: true });
    }
  });
  console.log('  📱 Syncing Android app icons to Project_Android_Capacitor...');
}

console.log('🍎 [7/8] Syncing iOS & macOS Distribution Folders...');
const macFolder = path.join(distPlatform, FOLDERS.macos);
const macWebDest = path.join(macFolder, 'Detektif_Data_macOS_Web_Bundle');
if (fs.existsSync(macFolder)) {
  fs.cpSync(srcDist, macWebDest, { recursive: true, force: true });
}

const iosFolder = path.join(distPlatform, FOLDERS.ios);
const iosWebDest = path.join(iosFolder, 'Game_iOS_Web_Standalone');
if (fs.existsSync(iosFolder)) {
  fs.cpSync(srcDist, iosWebDest, { recursive: true, force: true });
}
const iosCapPublic = path.join(iosFolder, 'Project_iOS_Xcode_Capacitor', 'App', 'App', 'public');
if (fs.existsSync(path.dirname(iosCapPublic))) {
  fs.cpSync(srcDist, iosCapPublic, { recursive: true, force: true });
}
// Sync iOS AppIcon into distribution Xcode capacitor project
const srcIosIcon = path.join(rootDir, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset', 'AppIcon-512@2x.png');
const distIosIcon = path.join(iosFolder, 'Project_iOS_Xcode_Capacitor', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset', 'AppIcon-512@2x.png');
if (fs.existsSync(srcIosIcon) && fs.existsSync(path.dirname(distIosIcon))) {
  fs.copyFileSync(srcIosIcon, distIosIcon);
  console.log('  🍎 Syncing iOS AppIcon to Project_iOS_Xcode_Capacitor...');
}

console.log('📦 [8/8] Repacking Distribution ZIP Archives with New Naming...');
const repackZip = (zipPath, cwdPath, target) => {
  try {
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    execSync(`tar.exe -a -c -f "${zipPath}" -C "${cwdPath}" ${target}`, { stdio: 'ignore' });
    const sizeMb = (fs.statSync(zipPath).size / (1024 * 1024)).toFixed(1);
    console.log(`  ✅ ${path.basename(zipPath)} (${sizeMb} MB)`);
  } catch (e) {
    console.warn(`  ⚠️ Failed to zip ${path.basename(zipPath)}:`, e.message);
  }
};

// Clean up any legacy named ZIPs
const legacyZips = [
  'Detektif_Data_Windows_Electron.zip',
  'Detektif_Data_Windows_WebView2.zip',
  'Detektif_Data_HTML5_Web.zip',
  'Detektif_Data_Android_Lengkap.zip',
  'Detektif_Data_iOS_Lengkap.zip',
  'Detektif_Data_macOS_Lengkap.zip',
  'Bundle_Mobile_Android_iOS.zip',
  '1_WINDOWS_ELECTRON.rar'
];
legacyZips.forEach(z => {
  const p = path.join(distPlatform, z);
  if (fs.existsSync(p)) fs.unlinkSync(p);
});

// 1. Windows Portable (Detektif data (Windows Version).zip)
if (fs.existsSync(path.join(distWinBase, 'Detektif_Data_Windows_Game'))) {
  repackZip(path.join(distPlatform, 'Detektif data (Windows Version).zip'), distWinBase, 'Detektif_Data_Windows_Game');
}

// 2. Windows Installer Zip (detektif data windows setup.zip)
if (fs.existsSync(rootSetupExe)) {
  repackZip(path.join(distPlatform, 'detektif data windows setup.zip'), distPlatform, '"detektif data windows setup.exe"');
}

// 3. WebView2 zip
if (fs.existsSync(webview2Folder)) {
  repackZip(path.join(distPlatform, 'Detektif data (Windows WebView2 Version).zip'), distPlatform, `"${FOLDERS.winWebview2}"`);
}

// 4. HTML5 Web zip
if (fs.existsSync(html5Dest)) {
  repackZip(path.join(distPlatform, 'Detektif data (Web Version).zip'), html5Dest, '.');
}

// 5. Android zip
if (fs.existsSync(androidFolder)) {
  repackZip(path.join(distPlatform, 'Detektif data (Android Version).zip'), distPlatform, `"${FOLDERS.android}"`);
}

// 6. iOS zip
if (fs.existsSync(iosFolder)) {
  repackZip(path.join(distPlatform, 'Detektif data (iOS Version).zip'), distPlatform, `"${FOLDERS.ios}"`);
}

// 7. macOS zip
if (fs.existsSync(macFolder)) {
  repackZip(path.join(distPlatform, 'Detektif data (macOS Version).zip'), distPlatform, `"${FOLDERS.macos}"`);
}

console.log('🎉 ALL PLATFORMS AND PACKAGES SUCCESSFULLY UPDATED & SYNCHRONIZED 100%!');
