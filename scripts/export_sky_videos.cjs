const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('ignore-gpu-blocklist');

const OUTPUT_DIR = 'D:\\File Penting\\File S2\\Thesis Project\\Video\\Langit biru';
const DEFAULT_DURATION_SEC = 300; // 5 minutes (300 seconds)
const FPS = 60;

const SCENES = [
  { timeMode: 'pagi', fileName: '1_langit_pagi_1080p60.mp4' },
  { timeMode: 'siang', fileName: '2_langit_siang_1080p60.mp4' },
  { timeMode: 'sore', fileName: '3_langit_sore_1080p60.mp4' },
  { timeMode: 'malam', fileName: '4_langit_malam_1080p60.mp4' }
];

const args = process.argv.slice(2);
const targetSceneArg = args[0] || 'all';
const durationArg = parseInt(args[1], 10) || DEFAULT_DURATION_SEC;

const jobsToRun = (targetSceneArg === 'all')
  ? SCENES
  : SCENES.filter(s => s.timeMode.toLowerCase() === targetSceneArg.toLowerCase());

if (jobsToRun.length === 0) {
  console.error(`Invalid scene argument: "${targetSceneArg}". Choose from: all, pagi, siang, sore, malam.`);
  process.exit(1);
}

app.whenReady().then(async () => {
  console.log('====================================================');
  console.log('SKY VIDEO EXPORT PIPELINE (1080p 60FPS MP4)');
  console.log('Destination:', OUTPUT_DIR);
  console.log(`Duration per scene: ${durationArg}s (${(durationArg / 60).toFixed(1)} minutes)`);
  console.log(`Frame Rate: ${FPS} FPS (${durationArg * FPS} frames per scene)`);
  console.log('Scenes to render:', jobsToRun.map(j => j.timeMode).join(', '));
  console.log('====================================================\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.webContents.on('console-message', (event, level, message) => {
    if (message.startsWith('[RENDERER]') || message.startsWith('[PROGRESS]')) {
      console.log(message);
    } else if (level === 3) {
      console.error('[RENDERER ERROR]:', message);
    }
  });

  await win.loadFile(path.join(__dirname, 'export_sky_renderer.html'));

  let currentJobIndex = 0;
  const overallStartTime = Date.now();

  function runNextJob() {
    if (currentJobIndex >= jobsToRun.length) {
      const overallElapsed = ((Date.now() - overallStartTime) / 1000 / 60).toFixed(1);
      console.log('\n====================================================');
      console.log(`🎉 ALL ${jobsToRun.length} SCENES EXPORTED SUCCESSFULLY IN ${overallElapsed} MINUTES!`);
      console.log('Output Directory:');
      console.log(`📁 ${OUTPUT_DIR}`);
      console.log('Files:');
      jobsToRun.forEach(j => {
        const p = path.join(OUTPUT_DIR, j.fileName);
        if (fs.existsSync(p)) {
          const szMb = (fs.statSync(p).size / (1024 * 1024)).toFixed(1);
          console.log(`  - ${j.fileName} (${szMb} MB)`);
        }
      });
      console.log('====================================================');
      app.quit();
      return;
    }

    const job = jobsToRun[currentJobIndex];
    const outputPath = path.join(OUTPUT_DIR, job.fileName);

    console.log(`\n----------------------------------------------------`);
    console.log(`>>> [${currentJobIndex + 1}/${jobsToRun.length}] EXPORTING SCENE: ${job.timeMode.toUpperCase()}`);
    console.log(`File: ${job.fileName}`);
    console.log(`----------------------------------------------------`);

    ipcMain.once('job-done', (event, data) => {
      console.log(`✓ FINISHED: Scene "${job.timeMode}" exported in ${data.totalTimeSec}s`);
      currentJobIndex++;
      runNextJob();
    });

    win.webContents.send('start-export', {
      timeMode: job.timeMode,
      durationSec: durationArg,
      fps: FPS,
      outputPath
    });
  }

  runNextJob();
});
