const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const localAppData = process.env.LOCALAPPDATA;
if (!localAppData) {
  console.error('No LOCALAPPDATA environment variable');
  process.exit(1);
}

const targetDir = path.join(localAppData, 'ms-playwright-go', '1.57.0');
const packageDir = path.join(targetDir, 'package');

console.log('Target driver directory:', targetDir);

// 1. Ensure directories exist
fs.mkdirSync(packageDir, { recursive: true });

// 2. Copy node.exe
const nodeExePath = process.execPath;
const destNodeExe = path.join(targetDir, 'node.exe');
console.log('Copying node executable from', nodeExePath, 'to', destNodeExe);
fs.copyFileSync(nodeExePath, destNodeExe);

// 3. Create playwright.cmd
const cmdContent = `@echo off\r\n"%~dp0node.exe" "%~dp0package\\cli.js" %*\r\n`;
fs.writeFileSync(path.join(targetDir, 'playwright.cmd'), cmdContent, 'utf8');
console.log('Created playwright.cmd');

// 4. Install playwright-core in packageDir
console.log('Installing playwright-core into packageDir...');
execSync('npm install --no-save --no-audit playwright-core', {
  cwd: targetDir,
  stdio: 'inherit'
});

// 5. Copy node_modules/playwright-core contents directly into packageDir
const sourceCoreDir = path.join(targetDir, 'node_modules', 'playwright-core');
if (fs.existsSync(sourceCoreDir)) {
  console.log('Copying playwright-core files to package directory...');
  function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }
  copyRecursiveSync(sourceCoreDir, packageDir);
  console.log('playwright-core contents copied successfully!');
}

// 6. Verify package/cli.js exists
const cliJsPath = path.join(packageDir, 'cli.js');
console.log('cli.js exists:', fs.existsSync(cliJsPath));

// 7. Test running playwright.cmd
try {
  const result = execSync(`"${path.join(targetDir, 'playwright.cmd')}" --version`, { encoding: 'utf8' });
  console.log('Playwright driver test result:', result.trim());
} catch (err) {
  console.error('Playwright driver test failed:', err.message);
}
