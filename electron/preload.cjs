const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

let preconfiguredServerUrl = '';
try {
  const candidates = [
    path.join(process.cwd(), 'server_url.txt'),
    path.join(path.dirname(process.execPath), 'server_url.txt'),
    path.join(__dirname, '..', 'server_url.txt'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      const raw = fs.readFileSync(c, 'utf-8').trim();
      if (raw && !raw.startsWith('#')) {
        preconfiguredServerUrl = (raw.startsWith('http://') || raw.startsWith('https://'))
          ? raw
          : `http://${raw}`;
        break;
      }
    }
  }
} catch (e) {
  console.warn('[Preload] Failed reading server_url.txt:', e.message);
}

// Expose safe APIs to renderer (React app)
contextBridge.exposeInMainWorld('electronAPI', {
  // App version info
  getVersion: () => ipcRenderer.invoke('get-version'),
  
  // Platform detection
  platform: process.platform,
  
  // Exit & Quit App
  exitApp: () => ipcRenderer.invoke('exit-app'),
  quitApp: () => ipcRenderer.invoke('app-quit'),

  // Notify the app is running inside Electron
  isElectron: true,

  // Preconfigured server IP from server_url.txt for zero-config lab deployments
  preconfiguredServerUrl,

  // Check and apply hot update from server
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  getRemoteUrl: () => ipcRenderer.invoke('get-remote-url'),
});
