const { spawn, execSync } = require('child_process');
const path = require('path');
const http = require('http');
const fs = require('fs');
const os = require('os');

const rootDir = path.resolve(__dirname, '..');
const backendDir = path.join(rootDir, 'backend');
const distIndex = path.join(backendDir, 'dist', 'index.js');

// 1. Bersihkan proses lama yang nyangkut di port 3001
function cleanStaleProcesses() {
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
  } catch {
    // Tidak ada proses di port 3001
  }
}

cleanStaleProcesses();

console.clear();
console.log('====================================================================');
console.log('  🦉 DETEKTIF DATA - SERVER DATA & PANEL ADMIN (LOCAL LOKAL)');
console.log('====================================================================\n');
console.log('[1/2] Sedang menginisialisasi server data lokal...');

// Pastikan build dist backend sudah ada, jika belum compile otomatis
if (!fs.existsSync(distIndex)) {
  console.log('      File build belum tersedia, menjalankan npm run build...');
  try {
    execSync('npm run build', { cwd: backendDir, stdio: 'inherit' });
  } catch (err) {
    console.error('      Gagal build backend:', err);
    process.exit(1);
  }
}

// Auto-Sync: Jika game dimainkan di Electron dan datanya lebih baru, sinkronkan ke backend
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

// 2. Jalankan Server Backend
const backendProcess = spawn('node', ['dist/index.js'], {
  cwd: backendDir,
  env: { ...process.env, PORT: '3001', NODE_ENV: 'development' },
  stdio: 'inherit',
});

backendProcess.on('error', (err) => {
  console.error('[Backend Error]:', err);
});

// Helper: Tunggu hingga server benar-benar siap dan merespons health check
function waitForBackend(maxAttempts = 60) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      process.stdout.write('.');
      const req = http.get('http://127.0.0.1:3001/api/health', (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          console.log(' OK!');
          return resolve();
        }
      });

      req.on('error', () => {
        // Server belum siap menerima koneksi, coba lagi
      });

      req.setTimeout(1000, () => {
        req.destroy();
      });

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        return reject(new Error('Backend health check timed out setelah 60 detik'));
      }
    }, 500);
  });
}

function getLocalIp() {
  try {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          return net.address;
        }
      }
    }
  } catch {}
  return null;
}

async function main() {
  try {
    await waitForBackend();
    const localIp = getLocalIp();

    console.log('\n====================================================================');
    console.log('  🎉 SERVER DATA & DASHBOARD ADMIN BERHASIL AKTIF!');
    console.log('====================================================================\n');
    console.log('  🌐 AKSES LOKAL DI KOMPUTER INI:');
    console.log('  👉 Panel Admin : \x1b[36m\x1b[1mhttp://127.0.0.1:3001/admin\x1b[0m');
    console.log('  👉 Game Web    : \x1b[32m\x1b[1mhttp://127.0.0.1:3001\x1b[0m\n');

    if (localIp) {
      console.log('  📶 AKSES DARI PERANGKAT LAIN (1 JARINGAN WI-FI / LAN):');
      console.log(`  👉 Panel Admin : http://${localIp}:3001/admin`);
      console.log(`  👉 Game Web    : http://${localIp}:3001\n`);
    }

    console.log('  🔑 PASSWORD ADMIN : \x1b[33m\x1b[1madminrelo2026\x1b[0m\n');
    console.log('====================================================================');
    console.log('  💡 PETUNJUK:');
    console.log('  - Halaman admin akan terbuka otomatis di browsermu sekarang.');
    console.log('  - JANGAN TUTUP jendela Command Prompt ini selama menggunakan');
    console.log('    dashboard admin atau saat siswa sedang bermain.');
    console.log('  - Tekan Ctrl + C pada jendela ini jika ingin mematikan server.');
    console.log('====================================================================\n');

    // Buka browser HANYA SETELAH server terbukti siap menerima koneksi
    try {
      execSync('start "" "http://127.0.0.1:3001/admin"', { stdio: 'ignore' });
    } catch {}

    const cleanup = () => {
      console.log('\nMematikan server backend...');
      try { backendProcess.kill(); } catch {}
      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    backendProcess.on('exit', (code) => {
      console.log('\nServer backend berhenti (exit code:', code, ')');
      process.exit(code || 0);
    });

  } catch (err) {
    console.error('\nGagal memulai server backend:', err.message);
    try { backendProcess.kill(); } catch {}
    process.exit(1);
  }
}

main();
