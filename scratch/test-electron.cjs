const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  
  await win.loadURL('about:blank');
  const result = await win.webContents.executeJavaScript(`
    JSON.stringify({
      mp4: MediaRecorder.isTypeSupported('video/mp4'),
      mp4H264: MediaRecorder.isTypeSupported('video/mp4; codecs=avc1'),
      webm: MediaRecorder.isTypeSupported('video/webm; codecs=vp9'),
      webmH264: MediaRecorder.isTypeSupported('video/webm; codecs=h264')
    })
  `);
  console.log('SUPPORT_RESULT:', result);
  app.quit();
});
