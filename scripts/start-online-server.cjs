const { spawn, execSync } = require('child_process');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const backendDir = path.join(rootDir, 'backend');
const ngrokExe = path.join(rootDir, 'ngrok.exe');
const STATIC_DOMAIN = 'scooter-thickness-stony.ngrok-free.dev';
const PUBLIC_URL = `https://${STATIC_DOMAIN}`;

// 1. Bersihkan proses lama / zombie sebelum memulai
function cleanStaleProcesses() {
  try {
    execSync('taskkill /F /IM ngrok.exe', { stdio: 'ignore' });
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

  // Beri jeda sejenak agar OS Windows melepaskan port socket secara tuntas
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

cleanStaleProcesses();

console.clear();
console.log('====================================================================');
console.log('  🦉 DETEKTIF DATA - SERVER ONLINE GAME (PERMANENT STATIC DOMAIN)');
console.log('====================================================================\n');
console.log('[1/3] Memulai server backend data lokal...');

// Pastikan build dist backend sudah ada, jika belum compile otomatis
const distIndex = path.join(backendDir, 'dist', 'index.js');
if (!fs.existsSync(distIndex)) {
  console.log('      File build belum tersedia, menjalankan npm run build...');
  try {
    execSync('npm run build', { cwd: backendDir, stdio: 'inherit' });
  } catch (err) {
    console.error('      Gagal build backend:', err);
    process.exit(1);
  }
}

// Auto-Sync: Pastikan database Server & Game Electron selalu sinkron dengan versi terbaru
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
        console.log('      [Auto-Sync] Data terbaru dari Game Electron berhasil disinkronkan ke Server!');
      } else if (bStat.mtimeMs > eStat.mtimeMs + 1000) {
        fs.copyFileSync(backendDb, electronDb);
        console.log('      [Auto-Sync] Data Server terbaru berhasil disinkronkan ke Game Electron!');
      }
    } else if (fs.existsSync(backendDb) && !fs.existsSync(electronDb)) {
      const targetDir = path.dirname(electronDb);
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      fs.copyFileSync(backendDb, electronDb);
    }
  }
} catch (e) {}

// 2. Start Backend Server
let backendExitedPrematurely = false;
const backendProcess = spawn('node', ['dist/index.js'], {
  cwd: backendDir,
  env: {
    ...process.env,
    PORT: '3001',
    NODE_ENV: 'production',
    BETTER_AUTH_URL: PUBLIC_URL,
    FRONTEND_URL: PUBLIC_URL,
  },
  stdio: 'inherit',
});

backendProcess.on('error', (err) => {
  console.error('\n\x1b[31m[Backend Error]:\x1b[0m', err.message);
});

backendProcess.on('exit', (code) => {
  backendExitedPrematurely = true;
  if (code !== 0 && code !== null) {
    console.error(`\n\x1b[31m[Backend Exit]: Server backend terhenti dengan exit code ${code}\x1b[0m`);
  }
});

// Helper: check if backend is ready
function waitForBackend(maxAttempts = 50) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(() => {
      if (backendExitedPrematurely) {
        clearInterval(interval);
        return reject(new Error('Backend server terhenti mendadak sebelum siap menerima koneksi'));
      }

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
        return reject(new Error('Backend health check timed out setelah 50 kali percobaan'));
      }
    }, 800);
  });
}

function copyToClipboard(text) {
  try {
    const proc = spawn('clip', [], { stdio: ['pipe', 'ignore', 'ignore'] });
    proc.stdin.write(text);
    proc.stdin.end();
  } catch {}
}

// Helper: Test Live Ngrok Connection
function verifyNgrokPublicUrl() {
  return new Promise((resolve) => {
    const req = https.get(
      `${PUBLIC_URL}/api/health`,
      {
        headers: { 'ngrok-skip-browser-warning': '1' },
        timeout: 7000,
      },
      (res) => {
        let body = '';
        res.on('data', (c) => { body += c; });
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve({ success: true });
          } else if (body.includes('ERR_NGROK_725') || body.includes('bandwidth limit')) {
            resolve({
              success: false,
              code: 'ERR_NGROK_725',
              message: 'Kuota Bandwidth Bulanan Akun Ngrok Habis (Limit 1 GB/bulan tercapai).'
            });
          } else {
            resolve({
              success: false,
              code: `HTTP_${res.statusCode}`,
              message: `Server merespons dengan status code ${res.statusCode}`
            });
          }
        });
      }
    );
    req.on('error', (err) => resolve({ success: false, code: 'CONN_ERROR', message: err.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ success: false, code: 'TIMEOUT', message: 'Waktu tunggu koneksi habis (timeout)' });
    });
  });
}

async function main() {
  try {
    await waitForBackend();
    console.log('\n[2/3] Menghubungkan ke Domain Tetap Ngrok...');

    if (!fs.existsSync(ngrokExe)) {
      console.error('\n\x1b[31m[ERROR] File ngrok.exe tidak ditemukan di folder:\x1b[0m', ngrokExe);
      killProcessTree(backendProcess);
      process.exit(1);
    }

    const tunnelProcess = spawn(
      ngrokExe,
      ['http', '3001', '--url', STATIC_DOMAIN, '--log', 'stdout', '--log-format', 'json'],
      { stdio: ['ignore', 'pipe', 'pipe'] }
    );

    let isReady = false;

    async function handleLog(chunk) {
      const text = chunk.toString();

      // Deteksi pesan error dari ngrok
      if (text.includes('"lvl":"eror"') || (text.includes('"err":') && !text.includes('"err":null'))) {
        try {
          const lines = text.trim().split('\n');
          for (const line of lines) {
            if (line.includes('"lvl":"eror"') || (line.includes('"err":') && !line.includes('"err":null'))) {
              const parsed = JSON.parse(line);
              console.error(`\n\x1b[31m[Kendala Ngrok]:\x1b[0m ${parsed.err || parsed.msg || line}`);
              if (parsed.err && parsed.err.includes('ERR_NGROK_3200')) {
                console.log('\x1b[33m💡 Solusi: Sesi sebelumnya masih tercatat di server Ngrok. Harap tunggu 30-60 detik lalu jalankan kembali.\x1b[0m');
              } else if (parsed.err && parsed.err.includes('ERR_NGROK_108')) {
                console.log('\x1b[33m💡 Solusi: Akun gratis Ngrok dibatasi 1 tunnel bersamaan. Pastikan tidak ada terminal Ngrok lain yang aktif.\x1b[0m');
              }
            }
          }
        } catch {
          console.error(`\n\x1b[31m[Ngrok Log]:\x1b[0m ${text.trim()}`);
        }
      }

      if ((text.includes('started tunnel') || text.includes(STATIC_DOMAIN)) && !isReady) {
        isReady = true;
        copyToClipboard(PUBLIC_URL);

        // Verifikasi ping live ke internet
        const checkRes = await verifyNgrokPublicUrl();

        console.log('\n====================================================================');
        if (checkRes.success) {
          console.log('  🎉 SERVER ONLINE PERMANEN AKTIF! (DATA GAME SIAP DIGUNAKAN)');
        } else {
          console.log('  ⚠️  PERINGATAN: SERVER LOKAL AKTIF, TETAPI JALUR ONLINE NGROK BERKENDALA!');
        }
        console.log('====================================================================\n');
        console.log('  🌐 ALAMAT SERVER TETAP (UNTUK SISWA DI HP / LAPTOP DI RUMAH):');
        console.log(`  👉 \x1b[32m\x1b[1m${PUBLIC_URL}\x1b[0m`);

        if (checkRes.success) {
          console.log('  📡 Status Internet : \x1b[32m\x1b[1m🟢 ONLINE & TERVERIFIKASI AKTIF\x1b[0m\n');
        } else if (checkRes.code === 'ERR_NGROK_725') {
          console.log('  📡 Status Internet : \x1b[31m\x1b[1m🔴 DIBLOKIR NGROK (KUOTA BANDWIDTH BULANAN HABIS)\x1b[0m');
          console.log('  ⚠️  \x1b[31mDetail Kendala:\x1b[0m Akun Ngrok Anda telah mencapai batas bandwidth bulanan (Limit 1 GB/bulan).');
          console.log('     Meskipun sinyal laptop Anda bagus, server Ngrok memblokir request masuk (ERR_NGROK_725).\n');
          console.log('  💡 SOLUSI REKOMENDASI:');
          console.log('     1. [TERBAIK DI LAB/KELAS] Gunakan file "JALANKAN_SERVER_ADMIN.bat"');
          console.log('        Cukup hubungkan laptop siswa & laptop guru ke 1 Wi-Fi / Hotspot yang sama.');
          console.log('        100% Bebas Kuota, Tanpa Ngrok, & Kecepatan Maksimal!');
          console.log('     2. Daftar akun Ngrok baru gratis di https://dashboard.ngrok.com untuk mendapatkan token baru.');
          console.log('     3. Atau gunakan Cloudflare Tunnel (gratis tanpa limit kuota bandwidth).\n');
        } else {
          console.log(`  📡 Status Internet : \x1b[33m🟡 ${checkRes.message || 'SEDANG MENSTABILKAN KONEKSI...'}\x1b[0m\n`);
        }

        console.log('  📊 LINK DASHBOARD ADMIN (Untuk Rekap Nilai Siswa / Download Excel):');
        console.log(`  👉 \x1b[36m\x1b[1mhttp://localhost:3001/admin\x1b[0m (Akses Cepat Lokal Laptop Guru)`);
        console.log(`     (atau via internet: ${PUBLIC_URL}/admin)\n`);
        console.log('  🔑 Password Admin : \x1b[33madminrelo2026\x1b[0m\n');
        console.log('  🖥️  Monitor Traffic Ngrok : \x1b[35mhttp://127.0.0.1:4040\x1b[0m (Web UI Resmi Ngrok)\n');
        console.log('====================================================================');
        console.log('  💡 CATATAN PENTING:');
        console.log('  1. Mengapa browser yang terbuka http://127.0.0.1:3001/admin?');
        console.log('     Karena ini komputer induk Anda. Akses lokal 127.0.0.1 jauh lebih');
        console.log('     cepat, hemat kuota internet, dan tanpa beban delay jaringan.');
        console.log('  2. Untuk SISWA (di HP / laptop masing-masing):');
        console.log(`     Bagikan link publik Ngrok: ${PUBLIC_URL}`);
        console.log('  3. Biarkan jendela Command Prompt ini tetap terbuka selama');
        console.log('     siswa bermain atau selama Anda merekap nilai.');
        console.log('====================================================================\n');

        try {
          execSync('start "" "http://127.0.0.1:3001/admin"', { stdio: 'ignore' });
        } catch {}
      }
    }

    tunnelProcess.stdout.on('data', handleLog);
    tunnelProcess.stderr.on('data', handleLog);

    tunnelProcess.on('exit', (code) => {
      console.log(`\n\x1b[31m[PERINGATAN] Ngrok terputus / ditutup (exit code: ${code})\x1b[0m`);
      if (!isReady) {
        console.log('💡 Ngrok gagal tersambung. Pastikan laptop terhubung ke internet dan token Ngrok valid.\n');
      }
      killProcessTree(backendProcess);
      process.exit(code || 0);
    });

    const cleanup = () => {
      console.log('\nMematikan server dan tunnel...');
      killProcessTree(tunnelProcess);
      killProcessTree(backendProcess);
      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
  } catch (err) {
    console.error('\n\x1b[31m[Gagal Menjalankan Server]:\x1b[0m', err.message);
    killProcessTree(backendProcess);
    process.exit(1);
  }
}

main();
