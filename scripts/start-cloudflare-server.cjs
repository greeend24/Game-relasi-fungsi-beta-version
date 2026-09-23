const { spawn, execSync } = require('child_process');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const backendDir = path.join(rootDir, 'backend');
const distIndex = path.join(backendDir, 'dist', 'index.js');
const cloudflaredExe = path.join(rootDir, 'cloudflared.exe');

// 1. Bersihkan proses lama di port 3001 dan cloudflared
function cleanStaleProcesses() {
  try {
    execSync('taskkill /F /IM cloudflared.exe', { stdio: 'ignore' });
  } catch {}

  try {
    const stdout = execSync('netstat -ano | findstr :3001 | findstr LISTENING', { encoding: 'utf8' });
    const lines = stdout.trim().split('\n');
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0' && pid !== String(process.pid)) {
        try { execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' }); } catch {}
      }
    }
  } catch {}

  try {
    execSync('ping 127.0.0.1 -n 2 >nul');
  } catch {}
}

function killProcessTree(proc) {
  if (!proc) return;
  try {
    if (proc.pid) {
      execSync(`taskkill /F /T /PID ${proc.pid}`, { stdio: 'ignore' });
    }
  } catch {}
  try { proc.kill(); } catch {}
}

function copyToClipboard(text) {
  try {
    const proc = spawn('clip', [], { stdio: ['pipe', 'ignore', 'ignore'] });
    proc.stdin.write(text);
    proc.stdin.end();
  } catch {}
}

// 2. Download cloudflared.exe jika belum ada
async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const getUrl = (currentUrl) => {
      https.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return getUrl(res.headers.location);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Download gagal dengan status code: ${res.statusCode}`));
        }

        const totalBytes = parseInt(res.headers['content-length'] || '0', 10);
        let downloadedBytes = 0;
        const fileStream = fs.createWriteStream(destPath);

        res.on('data', (chunk) => {
          downloadedBytes += chunk.length;
          fileStream.write(chunk);
          if (totalBytes > 0) {
            const percent = ((downloadedBytes / totalBytes) * 100).toFixed(1);
            const mb = (downloadedBytes / (1024 * 1024)).toFixed(1);
            const totalMb = (totalBytes / (1024 * 1024)).toFixed(1);
            process.stdout.write(`\r      ⬇️  Mengunduh Cloudflare Tunnel... ${percent}% (${mb}/${totalMb} MB)`);
          }
        });

        res.on('end', () => {
          fileStream.end();
          console.log('\n      ✅ Download selesai!');
          resolve();
        });

        res.on('error', (err) => {
          fileStream.close();
          fs.unlink(destPath, () => {});
          reject(err);
        });
      }).on('error', reject);
    };

    getUrl(url);
  });
}

async function ensureCloudflared() {
  if (fs.existsSync(cloudflaredExe)) {
    return;
  }
  console.log('   📦 Binary cloudflared.exe belum ditemukan di folder game.');
  console.log('      Mengunduh binary resmi Cloudflare Tunnel (Windows x64)...');
  const downloadUrl = 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe';
  const tempPath = path.join(rootDir, 'cloudflared.tmp.exe');
  
  try {
    await downloadFile(downloadUrl, tempPath);
    if (fs.existsSync(cloudflaredExe)) {
      try { fs.unlinkSync(cloudflaredExe); } catch {}
    }
    fs.renameSync(tempPath, cloudflaredExe);
    console.log('      🎉 Cloudflare Tunnel siap digunakan!\n');
  } catch (err) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    throw new Error(`Gagal mengunduh cloudflared: ${err.message}`);
  }
}

// 3. Helper: Tunggu hingga backend server siap
let backendProcess = null;

function waitForBackend(maxAttempts = 50) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      process.stdout.write('.');
      const req = http.get('http://127.0.0.1:3001/api/health', (res) => {
        res.resume();
        if (res.statusCode === 200) {
          clearInterval(interval);
          console.log(' \x1b[32mOK!\x1b[0m');
          return resolve();
        }
      });

      req.on('error', () => {});
      req.setTimeout(1200, () => {
        req.destroy();
      });

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        return reject(new Error('Backend server tidak merespons setelah 40 detik'));
      }
    }, 800);
  });
}

// 4. Main Function
async function main() {
  cleanStaleProcesses();

  console.clear();
  console.log('====================================================================');
  console.log('  🦉 DETEKTIF DATA - SERVER ONLINE GAME & DASHBOARD GURU');
  console.log('====================================================================\n');

  try {
    console.log('[1/3] Memeriksa Cloudflare Tunnel...');
    await ensureCloudflared();

    console.log('\n[2/3] Memulai server data lokal (Port 3001)...');

    if (!fs.existsSync(distIndex)) {
      console.log('      Mengompilasi backend TypeScript...');
      execSync('npm run build', { cwd: backendDir, stdio: 'inherit' });
    }

    // Auto-Sync database game Electron & Server
    try {
      const appData = process.env.APPDATA;
      if (appData) {
        const electronDb = path.join(appData, 'detektif-data-relasi-fungsi', 'detektif_data.db');
        const backendDb = path.join(backendDir, 'detektif_data.db');
        if (fs.existsSync(electronDb) && fs.existsSync(backendDb)) {
          const eStat = fs.statSync(electronDb);
          const bStat = fs.statSync(backendDb);
          if (eStat.mtimeMs > bStat.mtimeMs + 1000) {
            fs.copyFileSync(electronDb, backendDb);
          } else if (bStat.mtimeMs > eStat.mtimeMs + 1000) {
            fs.copyFileSync(backendDb, electronDb);
          }
        } else if (fs.existsSync(backendDb) && !fs.existsSync(electronDb)) {
          const targetDir = path.dirname(electronDb);
          if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
          fs.copyFileSync(backendDb, electronDb);
        }
      }
    } catch {}

    backendProcess = spawn('node', ['dist/index.js'], {
      cwd: backendDir,
      env: { ...process.env, PORT: '3001', NODE_ENV: 'development' },
      stdio: 'inherit',
    });

    backendProcess.on('error', (err) => {
      console.error('\n[Backend Error]:', err);
    });

    await waitForBackend();

    console.log('\n[3/3] Membuka jalur internet aman (Cloudflare Tunnel)...');

    const tunnelProcess = spawn(
      cloudflaredExe,
      ['tunnel', '--url', 'http://localhost:3001', '--no-autoupdate'],
      { stdio: ['ignore', 'pipe', 'pipe'] }
    );

    let publicUrl = null;
    let isReady = false;

    function parseOutput(chunk) {
      const text = chunk.toString();
      const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
      if (match && !isReady) {
        isReady = true;
        publicUrl = match[0];
        copyToClipboard(publicUrl);

        console.log('\n====================================================================');
        console.log('  🎉 SERVER GURU & ONLINE SISWA AKTIF');
        console.log('====================================================================\n');
        console.log('  📊 DASHBOARD GURU (TELAH DIBUKA OTOMATIS DI BROWSER):');
        console.log('  👉 \x1b[36m\x1b[1mhttp://127.0.0.1:3001/admin\x1b[0m (Akses Cepat Lokal Laptop Guru)');
        console.log(`     (atau via internet: ${publicUrl}/admin)\n`);
        console.log('  🔑 Password Admin Guru : \x1b[33madminrelo2026\x1b[0m\n');
        console.log('  🌐 ALAMAT GAME ONLINE (UNTUK SISWA DI HP / LAPTOP):');
        console.log(`  👉 \x1b[32m\x1b[1m${publicUrl}\x1b[0m`);
        console.log('     \x1b[33m(Telah disalin otomatis ke Clipboard! Tinggal Paste/Bagikan ke Siswa)\x1b[0m\n');
        console.log('====================================================================');
        console.log('  💡 PETUNJUK GURU:');
        console.log('  1. Halaman admin rekap nilai terbuka otomatis di browsermu.');
        console.log('  2. Cukup paste link hijau ke WhatsApp grup siswa.');
        console.log('  3. Siswa langsung main di HP/laptop masing-masing.');
        console.log('  4. Nilai, progress materi & kuis siswa akan masuk otomatis realtime.');
        console.log('  5. Biarkan jendela Command Prompt ini tetap terbuka selama mengajar.');
        console.log('  6. Tekan Ctrl + C untuk menonaktifkan server.');
        console.log('====================================================================\n');

        // Buka otomatis browser Chrome/Edge guru ke halaman Admin Dashboard
        try {
          execSync('start "" "http://127.0.0.1:3001/admin"', { stdio: 'ignore' });
        } catch {}

        // Simpan URL aktif ke server_url.txt
        try {
          fs.writeFileSync(path.join(rootDir, 'server_url.txt'), `# Cloudflare Live URL\n${publicUrl}\n`);
        } catch {}
      }
    }

    tunnelProcess.stdout.on('data', parseOutput);
    tunnelProcess.stderr.on('data', parseOutput);

    tunnelProcess.on('exit', (code) => {
      console.log(`\nCloudflare Tunnel dinonaktifkan (exit code: ${code}).`);
      if (backendProcess) killProcessTree(backendProcess);
      process.exit(0);
    });

    const cleanup = () => {
      console.log('\nMenutup server data dan Cloudflare Tunnel...');
      killProcessTree(tunnelProcess);
      if (backendProcess) killProcessTree(backendProcess);
      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

  } catch (err) {
    console.error('\n\x1b[31m[ERROR]\x1b[0m', err.message);
    if (backendProcess) killProcessTree(backendProcess);
    process.exit(1);
  }
}

main();
