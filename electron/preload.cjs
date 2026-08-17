const { contextBridge, ipcRenderer } = require('electron');

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
});
