const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const audioDir = path.join(rootDir, 'public', 'audio');
const scratchDir = path.join(rootDir, 'scratch');
const reloVoiceServiceFile = path.join(rootDir, 'src', 'services', 'reloVoiceService.js');

if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

// Locate ffmpeg binary
const possibleFfmpegs = [
  'C:\\Program Files\\Win Movie Maker\\ffmpeg.exe',
  'C:\\Program Files\\BlueStacks_nxt\\ffmpeg.exe'
];

let ffmpegPath = possibleFfmpegs.find(p => fs.existsSync(p));
if (!ffmpegPath) {
  try {
    const { execSync } = require('child_process');
    const systemFfmpeg = execSync('where ffmpeg', { encoding: 'utf8' }).trim().split(/\r?\n/)[0];
    if (systemFfmpeg && fs.existsSync(systemFfmpeg)) {
      ffmpegPath = systemFfmpeg;
    }
  } catch {}
}

if (!ffmpegPath) {
  console.error('❌ Error: ffmpeg.exe could not be found on the system.');
  process.exit(1);
}

console.log(`🎙️ Using FFmpeg: ${ffmpegPath}`);
console.log('🔄 Scanning for remaining .wav files in public/audio...');

function getWavFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getWavFiles(fullPath));
    } else if (file.toLowerCase().endsWith('.wav')) {
      results.push(fullPath);
    }
  });
  return results;
}

const wavFiles = getWavFiles(audioDir);
console.log(`Found ${wavFiles.length} .wav files to convert.\n`);

let totalOriginalBytes = 0;
let totalConvertedBytes = 0;
let convertedCount = 0;

const tempIn = path.join(scratchDir, 'temp_audio_in.wav');
const tempOut = path.join(scratchDir, 'temp_audio_out.mp3');

for (let i = 0; i < wavFiles.length; i++) {
  const wavPath = wavFiles[i];
  const mp3Path = wavPath.substring(0, wavPath.length - 4) + '.mp3';
  const originalSize = fs.statSync(wavPath).size;
  totalOriginalBytes += originalSize;

  process.stdout.write(`[${i + 1}/${wavFiles.length}] Converting: ${path.basename(wavPath).slice(0, 50)}... `);

  try {
    // Copy to short scratch path to bypass Windows 260 char MAX_PATH limit
    fs.copyFileSync(wavPath, tempIn);

    execFileSync(ffmpegPath, [
      '-i', tempIn,
      '-codec:a', 'libmp3lame',
      '-b:a', '128k',
      tempOut,
      '-y',
      '-loglevel', 'error'
    ]);

    if (fs.existsSync(tempOut) && fs.statSync(tempOut).size > 0) {
      fs.copyFileSync(tempOut, mp3Path);
      const mp3Size = fs.statSync(mp3Path).size;
      totalConvertedBytes += mp3Size;
      const reduction = Math.round((1 - mp3Size / originalSize) * 100);
      console.log(`OK! (${Math.round(originalSize / 1024)}KB -> ${Math.round(mp3Size / 1024)}KB, -${reduction}%)`);
      
      // Delete original WAV file to save space
      fs.unlinkSync(wavPath);
      convertedCount++;
    } else {
      console.log('FAILED (output missing or 0 bytes)');
    }
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  } finally {
    if (fs.existsSync(tempIn)) fs.unlinkSync(tempIn);
    if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
  }
}

console.log('\n──────────────────────────────────────────────────────────');
console.log(`🎉 Conversion finished! Converted ${convertedCount} of ${wavFiles.length} files.`);
if (totalOriginalBytes > 0) {
  const origMb = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
  const newMb = (totalConvertedBytes / (1024 * 1024)).toFixed(2);
  const savedMb = ((totalOriginalBytes - totalConvertedBytes) / (1024 * 1024)).toFixed(2);
  const pctSaved = Math.round((1 - totalConvertedBytes / totalOriginalBytes) * 100);
  console.log(`📊 Original Size : ${origMb} MB`);
  console.log(`📊 Converted Size: ${newMb} MB`);
  console.log(`💾 Saved         : ${savedMb} MB (-${pctSaved}%)`);
}
console.log('──────────────────────────────────────────────────────────\n');

// Ensure all occurrences in reloVoiceService.js are .mp3
if (fs.existsSync(reloVoiceServiceFile)) {
  let content = fs.readFileSync(reloVoiceServiceFile, 'utf8');
  const countMatches = (content.match(/\.wav/gi) || []).length;
  if (countMatches > 0) {
    console.log(`📝 Updating ${countMatches} remaining audio references in reloVoiceService.js from .wav to .mp3...`);
    content = content.replace(/\.wav/gi, '.mp3');
    fs.writeFileSync(reloVoiceServiceFile, content, 'utf8');
    console.log(`✅ All references updated to .mp3!`);
  } else {
    console.log(`✅ reloVoiceService.js is already fully referencing .mp3 files.`);
  }
}
