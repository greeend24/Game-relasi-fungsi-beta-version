import fs from 'fs';
import path from 'path';

const voiceServiceContent = fs.readFileSync('src/services/reloVoiceService.js', 'utf8');

// Match `file: "..."` or `file: '...'`
const regex = /file:\s*("([^"]+)"|'([^']+)')/g;
let match;
let total = 0;
let missing = 0;

while ((match = regex.exec(voiceServiceContent)) !== null) {
  total++;
  let filePath = match[2] || match[3];
  if (filePath.startsWith('/')) {
    filePath = filePath.substring(1);
  }
  const fullPath = path.join('public', filePath);
  if (!fs.existsSync(fullPath)) {
    console.error('❌ MISSING AUDIO FILE ON DISK:', fullPath);
    missing++;
  } else {
    console.log('✅ FOUND:', filePath);
  }
}

console.log(`\nAudited ${total} voice lines in reloVoiceService.js. Missing: ${missing}`);
if (missing > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL AUDIO TRACKS VERIFIED SUCCESSFULLY!');
}
