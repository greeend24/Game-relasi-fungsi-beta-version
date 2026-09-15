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
// 4. Wait For Port
// ─────────────────────────────────────────────
async function waitForPort(port, maxRetries = 25, retryDelay = 100, timeout = 400) {
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
// 4b. Check Ngrok Online Server
// ─────────────────────────────────────────────
function checkNgrokOnline(timeoutMs = 6000, retries = 2) {
  return new Promise((resolve) => {
    let attempt = 0;
    function tryCheck() {
      attempt++;
      const req = https.get(
        `${ONLINE_GAME_URL}/api/health`,
        {
          headers: { 'ngrok-skip-browser-warning': 'true' },
          timeout: timeoutMs,
        },
        (res) => {
          if (res.statusCode === 200) {
            resolve(true);
          } else if (attempt <= retries) {
            setTimeout(tryCheck, 600);
          } else {
            resolve(false);
          }
        }
      );
      req.on('error', () => {
        if (attempt <= retries) setTimeout(tryCheck, 600);
        else resolve(false);
      });
      req.on('timeout', () => {
        req.destroy();
        if (attempt <= retries) setTimeout(tryCheck, 600);
        else resolve(false);
      });
    }
    tryCheck();
  });
}

// ─────────────────────────────────────────────
// 5. Create Single Main Window (Directly Full In-Game, No External Splash)
// ─────────────────────────────────────────────
async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: 'Detektif Data — Game Relasi & Fungsi',
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

  mainWindow.setKiosk(true);
  mainWindow.setFullScreen(true);
  mainWindow.setAlwaysOnTop(true, 'screen-saver');

    mainWindow.once('ready-to-show', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.setAlwaysOnTop(true, 'screen-saver');
      mainWindow.setFullScreen(true);
      mainWindow.setKiosk(true);
    }
  });

  // Fallback reveal in case ready-to-show is delayed
  setTimeout(() => {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
      mainWindow.show();
      mainWindow.focus();
    }
  }, 800);

  mainWindow.on('blur', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.focus();
      mainWindow.setAlwaysOnTop(true, 'screen-saver');
      mainWindow.setFullScreen(true);
    }
  });

  // Re-try loading gracefully if server is still binding
  mainWindow.webContents.on('did-fail-load', async (event, errorCode, errorDescription, validatedURL) => {
    console.warn(`[Electron] Gagal memuat (${errorCode}: ${errorDescription}) pada ${validatedURL}`);
    const isAlreadyActive = await waitForPort(BACKEND_PORT, 1, 10, 50);
    if (!isAlreadyActive) {
      await startBackendInProcess();
      await waitForPort(BACKEND_PORT, 25, 50, 150);
    }
    setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.loadURL(`http://127.0.0.1:${BACKEND_PORT}`);
      }
    }, 300);
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
// 7. App Initialization (Direct In-Game Startup)
// ─────────────────────────────────────────────
app.whenReady().then(async () => {
  console.log('[Electron] Initializing directly into game window...');

  // Automatically attach ngrok-skip-browser-warning on all outbound requests to bypass Ngrok interstitial page
  try {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
      details.requestHeaders['ngrok-skip-browser-warning'] = 'true';
      callback({ requestHeaders: details.requestHeaders });
    });
  } catch (e) {
    console.warn('[Electron] webRequest interceptor error:', e);
  }

  // 1. Create window immediately (hidden until ready-to-show to prevent blank screen)
  await createMainWindow();

  // 2. Ensure local backend is active to serve bundled frontend assets locally
  const isAlreadyActive = await waitForPort(BACKEND_PORT, 1, 10, 50);
  if (!isAlreadyActive) {
    console.log('[Electron] Memulai server lokal in-process...');
    await startBackendInProcess();
    await waitForPort(BACKEND_PORT, 25, 50, 150);
  } else {
    console.log('[Electron] Server port backend lokal sudah aktif di port', BACKEND_PORT);
  }

  // 3. Render game locally from bundled assets
  if (mainWindow && !mainWindow.isDestroyed()) {
    console.log(`[Electron] 🚀 Memuat tampilan game dari aset lokal: http://127.0.0.1:${BACKEND_PORT}`);
    mainWindow.loadURL(`http://127.0.0.1:${BACKEND_PORT}`);
  }

  // IPC Exit Handlers
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
