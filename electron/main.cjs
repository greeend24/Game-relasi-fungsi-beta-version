const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
const BACKEND_PORT = 3001;
const FRONTEND_PORT = 3000;

let mainWindow = null;
let backendProcess = null;
let serverReady = false;

// ─────────────────────────────────────────────
// Resolve Paths
// ─────────────────────────────────────────────

function getResourcesPath() {
  if (isDev) {
    return path.join(__dirname, '..');
  }
  return process.resourcesPath;
}

function getBackendPath() {
  if (isDev) {
    return path.join(__dirname, '..', 'backend', 'dist', 'index.js');
  }
  return path.join(getResourcesPath(), 'backend', 'dist', 'index.js');
}

function getUserDataPath() {
  return app.getPath('userData');
}

// ─────────────────────────────────────────────
// Start Embedded Backend Server
// ─────────────────────────────────────────────

function startBackendServer() {
  return new Promise((resolve, reject) => {
    const userDataPath = getUserDataPath();
    const backendEntry = getBackendPath();

    console.log('[Electron] isDev:', isDev);
    console.log('[Electron] Starting backend from:', backendEntry);
    console.log('[Electron] User data path:', userDataPath);
    console.log('[Electron] resourcesPath:', process.resourcesPath);

    // Ensure user data directory exists
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true });
    }

    // Check backend file exists before trying to fork
    if (!fs.existsSync(backendEntry)) {
      return reject(new Error(
        `Backend tidak ditemukan di:\n${backendEntry}\n\nPastikan backend sudah di-compile.`
      ));
    }

    const env = {
      ...process.env,
      NODE_ENV: isDev ? 'development' : 'production',
      PORT: String(BACKEND_PORT),
      ELECTRON_USER_DATA: userDataPath,
      ELECTRON_RESOURCES_PATH: process.resourcesPath || getResourcesPath(),
      BETTER_AUTH_URL: `http://localhost:${BACKEND_PORT}`,
      BETTER_AUTH_SECRET: 'detektif-data-offline-secret-2024',
      FRONTEND_URL: isDev ? `http://localhost:${FRONTEND_PORT}` : `http://localhost:${BACKEND_PORT}`,
    };

    // Capture stderr so we can show it in error dialog
    let stderrOutput = '';

    // Use system node (not Electron's node) to run the ESM backend
    // process.execPath is Electron's binary; we need Node.js
    // Try to find node in PATH, fallback to process.execPath
    const nodeBin = process.platform === 'win32' ? 'node.exe' : 'node';

    backendProcess = spawn(nodeBin, [backendEntry], {
      env,
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    });

    backendProcess.stdout.on('data', (data) => {
      process.stdout.write('[backend] ' + data.toString());
    });

    backendProcess.stderr.on('data', (data) => {
      const msg = data.toString();
      stderrOutput += msg;
      process.stderr.write('[backend-err] ' + msg);
    });

    backendProcess.on('message', (msg) => {
      if (msg === 'server-ready') {
        console.log('[Electron] Backend server is ready!');
        serverReady = true;
        resolve();
      }
    });

    backendProcess.on('error', (err) => {
      console.error('[Electron] Backend spawn error:', err);
      reject(err);
    });

    backendProcess.on('exit', (code) => {
      console.log('[Electron] Backend process exited with code:', code);
      if (!serverReady) {
        const details = stderrOutput
          ? `\n\nError detail:\n${stderrOutput.slice(0, 800)}`
          : '';
        reject(new Error(`Backend exited before ready (code: ${code})${details}`));
      }
    });

    // Timeout after 20 seconds
    setTimeout(() => {
      if (!serverReady) {
        console.warn('[Electron] Backend ready timeout — proceeding anyway');
        resolve();
      }
    }, 20000);
  });
}

// ─────────────────────────────────────────────
// Wait for Port
// ─────────────────────────────────────────────

async function waitForPort(port, maxRetries = 30) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/api/health`, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
        req.setTimeout(1000, () => reject(new Error('timeout')));
      });
      return true;
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  return false;
}

// ─────────────────────────────────────────────
// Show Splash Screen while loading
// ─────────────────────────────────────────────

function createSplashWindow() {
  const splash = new BrowserWindow({
    width: 480,
    height: 320,
    frame: false,
    transparent: false,
    alwaysOnTop: true,
    resizable: false,
    center: true,
    backgroundColor: '#1a1a2e',
    webPreferences: { nodeIntegration: false },
  });
  splash.loadFile(path.join(__dirname, 'loading.html'));
  return splash;
}

// ─────────────────────────────────────────────
// Create Main Window
// ─────────────────────────────────────────────

function createMainWindow() {
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
    },
    show: false, // show after content loads
    backgroundColor: '#1a1a2e',
  });

  // Enable Strict Full-Screen Kiosk Lockdown Mode
  mainWindow.setKiosk(true);
  mainWindow.setFullScreen(true);
  mainWindow.setAlwaysOnTop(true, 'screen-saver');

  // Automatically reclaim focus if user attempts to switch window/tab
  mainWindow.on('blur', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.focus();
      mainWindow.setAlwaysOnTop(true, 'screen-saver');
      mainWindow.setFullScreen(true);
    }
  });

  // Load the app
  if (isDev) {
    // Dev: load Vite dev server
    mainWindow.loadURL(`http://127.0.0.1:${FRONTEND_PORT}`);
    mainWindow.webContents.openDevTools();
  } else {
    // Production: load backend HTTP server which serves all static dist files cleanly
    mainWindow.loadURL(`http://127.0.0.1:${BACKEND_PORT}`);
  }

  // Show window when ready to avoid blank screen flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.setFullScreen(true);
  });

  // Open external links in browser, not in Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ─────────────────────────────────────────────
// App Lifecycle
// ─────────────────────────────────────────────

app.whenReady().then(async () => {
  // Show splash screen immediately
  const splash = createSplashWindow();

  try {
    console.log('[Electron] App ready. Checking backend...');

    const isAlreadyRunning = await waitForPort(BACKEND_PORT, 2);
    if (isAlreadyRunning) {
      console.log('[Electron] Backend is already active on port 3001.');
    } else {
      try {
        await startBackendServer();
        await waitForPort(BACKEND_PORT, 10);
      } catch (backendErr) {
        console.warn('[Electron] Backend startup warning (proceeding offline):', backendErr.message);
      }
    }

    createMainWindow();

    // Close splash once main window is ready
    if (mainWindow) {
      mainWindow.once('ready-to-show', () => {
        if (splash && !splash.isDestroyed()) splash.close();
      });
    } else {
      if (splash && !splash.isDestroyed()) splash.close();
    }

    // Register IPC exit handlers
    ipcMain.handle('exit-app', () => {
      cleanup();
      app.quit();
    });
    ipcMain.handle('app-quit', () => {
      cleanup();
      app.quit();
    });

    // Register global shortcuts to block Alt+Tab, Alt+F4, Win key tab switching
    const { globalShortcut } = require('electron');
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

  } catch (err) {
    console.error('[Electron] Startup error:', err);
    if (splash && !splash.isDestroyed()) splash.close();
    createMainWindow();
  }
});


// Quit when all windows are closed
app.on('window-all-closed', () => {
  cleanup();
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// ─────────────────────────────────────────────
// Cleanup
// ─────────────────────────────────────────────

function cleanup() {
  try {
    const { globalShortcut } = require('electron');
    globalShortcut.unregisterAll();
  } catch {}
  if (backendProcess) {
    console.log('[Electron] Terminating backend process...');
    backendProcess.kill('SIGTERM');
    backendProcess = null;
  }
}

app.on('before-quit', cleanup);
process.on('exit', cleanup);
