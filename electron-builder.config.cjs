/**
 * Electron Builder Configuration
 * Packages the game as a lightweight Windows installer (.exe)
 */

/** @type {import('electron-builder').Configuration} */
const config = {
  appId: 'com.detektifdata.game',
  productName: 'Detektif Data',
  copyright: 'Copyright © 2024 Detektif Data',

  directories: {
    output: 'dist-electron',
    buildResources: 'electron-assets',
  },

  // Files shipped inside app.asar (Only core Electron shell scripts)
  files: [
    'electron/main.cjs',
    'electron/preload.cjs',
    'electron/loading.html',
  ],

  // extraResources: Backend JS & single shared frontend dist bundle
  extraResources: [
    // Backend compiled JS (outside asar so fork() can run node process)
    {
      from: 'backend/dist',
      to: 'backend/dist',
    },
    // Backend production node_modules (pruned of TypeScript compiler & esbuild binaries)
    {
      from: 'backend/node_modules',
      to: 'backend/node_modules',
      filter: [
        '**/*',
        '!**/typescript/**',
        '!**/@typescript/**',
        '!**/esbuild/**',
        '!**/@esbuild/**',
        '!**/tsx/**',
        '!**/drizzle-kit/**',
        '!**/@types/**',
        '!**/*.map',
        '!**/*.md',
        '!**/test/**',
        '!**/tests/**',
        '!**/docs/**',
      ],
    },
    // Single consolidated frontend bundle (contains all assets, images, audios, and fonts)
    {
      from: 'dist',
      to: 'frontend/dist',
    },
  ],

  // Windows build target: generates both win-unpacked directory and nsis installer
  win: {
    target: [
      { target: 'dir', arch: ['x64'] },
      { target: 'nsis', arch: ['x64'] }
    ],
  },

  // NSIS Installer settings
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'Detektif Data',
  },

  compression: 'maximum',
  publish: null,
};

module.exports = config;
