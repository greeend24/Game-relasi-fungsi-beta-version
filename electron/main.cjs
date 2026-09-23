const { app, BrowserWindow, shell, ipcMain, globalShortcut, session } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');
const fs = require('fs');
const http = require('http');
const https = require('https');

// ─────────────────────────────────────────────
// 1. Strict Single-Instance Lock (Prevents Duplicate App Launches)
// ─────────────────────────────────────────────
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  console.log('[Electron] Duplicate instance detected. Terminating immediately.');
  app.quit();
  process.exit(0);
}

// ─────────────────────────────────────────────
// 2. Chromium Optimization Flags (Merge Services & Disable Redundant Helpers)
// ─────────────────────────────────────────────
app.commandLine.appendSwitch('disable-features', 'AudioServiceOutOfProcess,NetworkServiceOutOfProcess');
app.commandLine.appendSwitch('disable-breakpad');
app.commandLine.appendSwitch('disable-crash-reporter');
app.commandLine.appendSwitch('disable-component-update');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');

// ─────────────────────────────────────────────
// Constants, Ports & Remote Server
// ─────────────────────────────────────────────
const isDev = !app.isPackaged;
const BACKEND_PORT = 3001;
const STATIC_NGROK_DOMAIN = 'scooter-thickness-stony.ngrok-free.dev';
const ONLINE_GAME_URL = `https://${STATIC_NGROK_DOMAIN}`;

let mainWindow = null;

function getResourcesPath() {
  if (isDev) return path.join(__dirname, '..');
  return process.resourcesPath;
}

function getBackendPath() {
  if (isDev) return path.join(__dirname, '..', 'backend', 'dist', 'index.js');
  return path.join(getResourcesPath(), 'backend', 'dist', 'index.js');
}

function getUserDataPath() {
  return app.getPath('userData');
}

/**
 * Otomatis sinkronkan database master (dari project / backend / resources)
 * ke AppData agar perubahan di Server Admin (seperti ganti password) otomatis aktif di game Electron!
 */
function autoSyncDatabase(userDataPath) {
  try {
    const targetDb = path.join(userDataPath, 'detektif_data.db');
    const candidateMasters = [
      path.join(getResourcesPath(), 'backend', 'detektif_data.db'),
      path.join(__dirname, '..', 'backend', 'detektif_data.db'),
      path.join(process.cwd(), 'backend', 'detektif_data.db'),
    ];

    for (const master of candidateMasters) {
      if (fs.existsSync(master)) {
        if (!fs.existsSync(targetDb)) {
          fs.copyFileSync(master, targetDb);
          console.log('[Electron] Inisialisasi database awal dari master:', master);
          return;
        } else {
          const masterStat = fs.statSync(master);
          const targetStat = fs.statSync(targetDb);
          // Jika database master lebih baru daripada di AppData (misal admin baru saja ubah password)
          if (masterStat.mtimeMs > targetStat.mtimeMs + 1000) {
            fs.copyFileSync(master, targetDb);
            console.log('[Electron] Berhasil auto-sync database terbaru dari master ke AppData:', master);
            return;
          }
        }
      }
    }
  } catch (e) {
    console.warn('[Electron] Auto-sync database warning:', e.message);
  }
}

/**
 * Dapatkan URL server update remote:
 * 1. Prioritas utama: file server_url.txt di folder game (untuk konfigurasi lab sekolah)
 * 2. Default: Domain Ngrok Server Resmi (https://scooter-thickness-stony.ngrok-free.dev)
 */
function getRemoteServerUrl() {
  try {
    const candidates = [
      path.join(process.cwd(), 'server_url.txt'),
      path.join(path.dirname(process.execPath), 'server_url.txt'),
      path.join(getResourcesPath(), 'server_url.txt'),
      path.join(getUserDataPath(), 'server_url.txt'),
      path.join(__dirname, '..', 'server_url.txt'),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        const raw = fs.readFileSync(c, 'utf-8');
        const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        const validUrlLine = lines.find(l => !l.startsWith('#'));
        if (validUrlLine) {
          return (validUrlLine.startsWith('http://') || validUrlLine.startsWith('https://'))
            ? validUrlLine.replace(/\/+$/, '')
            : `http://${validUrlLine}`.replace(/\/+$/, '');
        }
      }
    }
  } catch {}
  return 'http://127.0.0.1:3001';
}

/**
 * ⚡ In-App Asset Hot-Updater (OTA)
 * Memeriksa pembaruan frontend terbaru dari server dan menyimpannya di AppData (userData/cached_frontend)
 * sehingga laptop siswa selalu otomatis update materi, visual, dan soal terbaru tanpa perlu install ulang!
 */
async function checkAndApplyHotUpdate(remoteServerUrl, userDataPath) {
  return new Promise((resolve) => {
    try {
      const manifestUrl = `${remoteServerUrl}/api/updates/manifest`;
      console.log('[AutoUpdater] 🔍 Memeriksa pembaruan game dari:', manifestUrl);

      const client = manifestUrl.startsWith('https') ? https : http;
      const req = client.get(manifestUrl, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        timeout: 2500,
      }, (res) => {
        if (res.statusCode !== 200) {
          console.log(`[AutoUpdater] Server update merespon status ${res.statusCode}. Menggunakan berkas lokal.`);
          return resolve(false);
        }

        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', async () => {
          try {
            const manifest = JSON.parse(body);
            if (!manifest || !manifest.success || !manifest.buildTimestamp) {
              return resolve(false);
            }

            const cachedDir = path.join(userDataPath, 'cached_frontend');
            const updateRecordFile = path.join(userDataPath, 'last_update.json');
            let localTimestamp = 0;

            if (fs.existsSync(updateRecordFile)) {
              try {
                const record = JSON.parse(fs.readFileSync(updateRecordFile, 'utf-8'));
                localTimestamp = record.buildTimestamp || 0;
              } catch {}
            }

            // Jika sudah versi terbaru dan index.html ada di cache, lewati download
            if (localTimestamp >= manifest.buildTimestamp && fs.existsSync(path.join(cachedDir, 'index.html'))) {
              console.log(`[AutoUpdater] ✅ Game sudah versi terbaru (Build: ${manifest.buildTimestamp}).`);
              return resolve(false);
            }

            console.log(`[AutoUpdater] 🚀 Pembaruan baru terdeteksi! (Server: ${manifest.buildTimestamp} vs Lokal: ${localTimestamp})`);
            console.log('[AutoUpdater] 📥 Mengunduh pembaruan materi & visual ke laptop...');

            fs.mkdirSync(path.join(cachedDir, 'assets'), { recursive: true });

            // 1. Tulis index.html terbaru
            if (manifest.indexHtml) {
              fs.writeFileSync(path.join(cachedDir, 'index.html'), manifest.indexHtml, 'utf-8');
            }

            // 2. Unduh setiap file JS/CSS baru di dist/assets
            const assets = manifest.assets || [];
            let downloadCount = 0;

            for (const asset of assets) {
              const targetPath = path.join(cachedDir, asset.path);
              if (fs.existsSync(targetPath)) continue;

              const fileUrl = `${remoteServerUrl}/${asset.path}`;
              try {
                await new Promise((resolveFile, rejectFile) => {
                  const reqFile = client.get(fileUrl, {
                    headers: { 'ngrok-skip-browser-warning': 'true' },
                    timeout: 8000,
                  }, (resFile) => {
                    if (resFile.statusCode !== 200) {
                      return rejectFile(new Error(`Status ${resFile.statusCode}`));
                    }
                    const fileStream = fs.createWriteStream(targetPath);
                    resFile.pipe(fileStream);
                    fileStream.on('finish', () => {
                      fileStream.close();
                      downloadCount++;
                      resolveFile();
                    });
                  });
                  reqFile.on('error', rejectFile);
                  reqFile.on('timeout', () => {
                    reqFile.destroy();
                    rejectFile(new Error('Timeout'));
                  });
                });
              } catch (e) {
                console.warn(`[AutoUpdater] Gagal mengunduh aset ${asset.path}:`, e.message);
              }
            }

            fs.writeFileSync(updateRecordFile, JSON.stringify({
              buildTimestamp: manifest.buildTimestamp,
              downloadCount,
              updatedAt: new Date().toISOString(),
            }, null, 2), 'utf-8');

            console.log(`[AutoUpdater] 🎉 Berhasil menerapkan pembaruan! (${downloadCount} aset baru disinkronkan)`);
            resolve(true);
          } catch (e) {
            console.warn('[AutoUpdater] Parse manifest error:', e.message);
            resolve(false);
          }
        });
      });

      req.on('error', (e) => {
        console.log('[AutoUpdater] Tidak dapat terhubung ke server update (Offline mode aktif):', e.message);
        resolve(false);
      });

      req.on('timeout', () => {
        req.destroy();
        console.log('[AutoUpdater] Timeout koneksi ke server update. Melanjutkan mode lokal.');
        resolve(false);
      });
    } catch (err) {
      console.warn('[AutoUpdater] Error:', err.message);
      resolve(false);
    }
  });
}

// ─────────────────────────────────────────────
// 3. Start Backend In-Process (Zero Extra Child Processes)
// ─────────────────────────────────────────────
async function startBackendInProcess() {
  const userDataPath = getUserDataPath();
  const backendEntry = getBackendPath();

  console.log('[Electron] Loading backend in-process from:', backendEntry);
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true });
  }

  // Otomatis sinkronkan database sebelum backend libSQL dihidupkan
  autoSyncDatabase(userDataPath);

  process.env.PORT = String(BACKEND_PORT);
  process.env.ELECTRON_USER_DATA = userDataPath;
  process.env.NODE_ENV = isDev ? 'development' : 'production';
  process.env.ELECTRON_RESOURCES_PATH = process.resourcesPath || getResourcesPath();
  process.env.BETTER_AUTH_URL = `http://localhost:${BACKEND_PORT}`;
  process.env.FRONTEND_URL = `http://localhost:${BACKEND_PORT}`;

  if (!fs.existsSync(backendEntry)) {
    console.warn('[Electron] Backend dist not found at:', backendEntry);
    return;
  }

  try {
    const fileUrl = pathToFileURL(backendEntry).href;
    await import(fileUrl);
    console.log('[Electron] Backend Express server active in-process on port', BACKEND_PORT);
  } catch (err) {
    console.error('[Electron] In-process backend startup error:', err);
  }
}

// ─────────────────────────────────────────────
// 4. Fast Port Polling
// ─────────────────────────────────────────────
async function waitForPort(port, maxRetries = 25, retryDelay = 20, timeout = 100) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/api/health`, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
        req.setTimeout(timeout, () => {
          req.destroy();
          reject(new Error('timeout'));
        });
      });
      return true;
    } catch {
      await new Promise(r => setTimeout(r, retryDelay));
    }
  }
  return false;
}

// ─────────────────────────────────────────────
// 5. Create Single Main Window (Directly Full In-Game)
// ─────────────────────────────────────────────
async function createMainWindow() {
  const appIconIco = path.join(__dirname, '..', 'public', 'assets', 'Logo game', 'logo game icon.ico');
  const appIconPng = path.join(__dirname, '..', 'public', 'assets', 'Logo game', 'logo game icon.png');
  const faviconIco = path.join(__dirname, '..', 'public', 'favicon.ico');
  const iconPath = fs.existsSync(appIconIco) ? appIconIco : (fs.existsSync(faviconIco) ? faviconIco : appIconPng);

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: 'Detektif Data : Game Relasi & Fungsi',
    icon: iconPath,
    fullscreen: true,
    kiosk: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
      backgroundThrottling: false,
    },
    show: false,
    backgroundColor: '#FAF7F2',
  });

  mainWindow.once('ready-to-show', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // Snappy fallback reveal to guarantee zero blank waiting time
  setTimeout(() => {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
      mainWindow.show();
      mainWindow.focus();
    }
  }, 600);

  mainWindow.on('blur', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.focus();
    }
  });

  // Re-try loading gracefully if server is still binding
  mainWindow.webContents.on('did-fail-load', async (event, errorCode, errorDescription, validatedURL) => {
    console.warn(`[Electron] Retrying load (${errorCode}: ${errorDescription}) on ${validatedURL}`);
    setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.loadURL(`http://127.0.0.1:${BACKEND_PORT}`);
      }
    }, 150);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    cleanupAndExit();
  });
}

// ─────────────────────────────────────────────
// 6. Second Instance Handler (Focus Existing Window)
// ─────────────────────────────────────────────
app.on('second-instance', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.setFullScreen(true);
  }
});

// ─────────────────────────────────────────────
// 7. App Initialization (Online-First Check + Auto Hot-Updater)
// ─────────────────────────────────────────────
app.whenReady().then(async () => {
  console.log('[Electron] Initializing game environment with Auto Hot-Updater...');

  // Automatically attach ngrok-skip-browser-warning on all outbound requests to bypass Ngrok interstitial page
  try {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
      details.requestHeaders['ngrok-skip-browser-warning'] = 'true';
      callback({ requestHeaders: details.requestHeaders });
    });
  } catch (e) {
    console.warn('[Electron] webRequest interceptor error:', e);
  }

  const userDataPath = getUserDataPath();
  const remoteServerUrl = getRemoteServerUrl();

  // 1. Cek & terapkan hot-update secara cepat (maksimal 2.5s)
  let hotUpdateApplied = false;
  try {
    hotUpdateApplied = await checkAndApplyHotUpdate(remoteServerUrl, userDataPath);
  } catch (e) {
    console.warn('[Electron] Hot-update check failed:', e.message);
  }

  // 2. Concurrently start local backend and prepare game window
  const backendPromise = (async () => {
    await startBackendInProcess();
    await waitForPort(BACKEND_PORT, 25, 20, 100);
  })();

  const windowPromise = createMainWindow();

  // 3. Wait for both in parallel
  await Promise.all([backendPromise, windowPromise]);

  // 4. Render game locally (yang otomatis menyajikan versi terbaru dari cached_frontend jika baru diupdate!)
  if (mainWindow && !mainWindow.isDestroyed()) {
    console.log(`[Electron] 🚀 Memuat tampilan game: http://127.0.0.1:${BACKEND_PORT} (Hot Update: ${hotUpdateApplied ? 'Applied' : 'Up-to-date/Local'})`);
    mainWindow.loadURL(`http://127.0.0.1:${BACKEND_PORT}`);
  }

  // IPC Handlers
  ipcMain.handle('check-for-updates', async () => {
    const updated = await checkAndApplyHotUpdate(remoteServerUrl, userDataPath);
    return { updated };
  });

  ipcMain.handle('get-remote-url', () => remoteServerUrl);

  ipcMain.handle('exit-app', () => {
    console.log('[Electron] Exit request received via IPC.');
    cleanupAndExit();
  });

  ipcMain.handle('app-quit', () => {
    console.log('[Electron] Quit request received via IPC.');
    cleanupAndExit();
  });

  // Global Shortcuts for Kiosk Mode
  ['Alt+Tab', 'Alt+F4', 'Alt+Escape', 'Control+Escape', 'Meta', 'Super'].forEach((shortcut) => {
    try {
      globalShortcut.register(shortcut, () => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.focus();
          mainWindow.setAlwaysOnTop(true, 'screen-saver');
          mainWindow.setFullScreen(true);
        }
      });
    } catch {}
  });
});

app.on('window-all-closed', () => {
  cleanupAndExit();
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createMainWindow();
  }
});

// ─────────────────────────────────────────────
// 8. Instant Clean Shutdown (Zero Stragglers)
// ─────────────────────────────────────────────
function cleanupAndExit() {
  console.log('[Electron] Forcefully shutting down all processes and audio...');
  try {
    globalShortcut.unregisterAll();
  } catch {}

  // Destroy all windows immediately to silence any audio and stop rendering
  try {
    BrowserWindow.getAllWindows().forEach((win) => {
      if (win && !win.isDestroyed()) {
        try { win.webContents.stop(); } catch {}
        win.destroy();
      }
    });
  } catch {}

  try {
    app.exit(0);
  } catch {}

  try {
    process.exit(0);
  } catch {}
}

app.on('before-quit', cleanupAndExit);
app.on('will-quit', cleanupAndExit);
process.on('exit', cleanupAndExit);
process.on('SIGINT', cleanupAndExit);
process.on('SIGTERM', cleanupAndExit);
