const fs = require('fs');
const path = require('path');
const resedit = require('resedit');

async function patchExeIcon(exePath, iconPath) {
  if (!fs.existsSync(exePath)) {
    console.warn('Exe not found:', exePath);
    return false;
  }
  if (!fs.existsSync(iconPath)) {
    console.error('Icon not found:', iconPath);
    return false;
  }

  console.log(`🔨 Patching PE icon resource into: ${exePath}`);
  const exeBuffer = fs.readFileSync(exePath);
  const executable = resedit.NtExecutable.from(exeBuffer);
  const res = resedit.NtExecutableResource.from(executable);

  const iconBuffer = fs.readFileSync(iconPath);
  const iconFile = resedit.Data.IconFile.from(iconBuffer);

  // Find existing language or default to en-US (1033)
  const viList = resedit.Resource.VersionInfo.fromEntries(res.entries);
  let langId = 1033;
  if (viList.length > 0) {
    const langs = viList[0].getAllLanguagesForStringValues();
    if (langs.length > 0 && langs[0].lang) {
      langId = langs[0].lang;
    }
  }

  // Replace RT_GROUP_ICON and RT_ICON resources
  resedit.Resource.IconGroupEntry.replaceIconsForResource(
    res.entries,
    1,
    langId,
    iconFile.icons.map(i => i.data)
  );

  res.outputResource(executable);
  const newExeBuffer = Buffer.from(executable.generate());
  fs.writeFileSync(exePath, newExeBuffer);
  console.log(`✅ Successfully embedded new game icon into: ${path.basename(exePath)} (${newExeBuffer.length} bytes)`);
  return true;
}

async function run() {
  const rootDir = path.resolve(__dirname, '..');
  const iconPath = path.join(rootDir, 'electron-assets', 'icon.ico');

  const candidates = [
    'D:\\File Penting\\File S2\\Thesis Project\\Game Relasi Fungsi siap main\\Detektif data (Windows Version)\\Detektif_Data_Windows_Game\\Detektif Data.exe',
    'D:\\File Penting\\File S2\\Thesis Project\\Game Relasi Fungsi siap main\\1_WINDOWS_ELECTRON\\Detektif_Data_Windows_Game\\Detektif Data.exe',
    path.join(rootDir, 'DISTRIBUSI_GAME_ALL_PLATFORM', 'Detektif data (Windows Version)', 'Detektif_Data_Windows_Game', 'Detektif Data.exe'),
    path.join(rootDir, 'DISTRIBUSI_GAME_ALL_PLATFORM', '1_WINDOWS_ELECTRON', 'Detektif_Data_Windows_Game', 'Detektif Data.exe'),
    path.join(rootDir, 'dist-electron', 'win-unpacked', 'Detektif Data.exe'),
  ];

  let patched = 0;
  for (const exe of candidates) {
    if (fs.existsSync(exe)) {
      const ok = await patchExeIcon(exe, iconPath);
      if (ok) patched++;
    }
  }

  console.log(`🎉 Done! Patched ${patched} executable(s).`);
}

run().catch(err => {
  console.error('Failed to patch icon:', err);
  process.exit(1);
});
