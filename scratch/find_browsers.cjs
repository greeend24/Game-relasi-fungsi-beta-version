const cp = require('child_process');

function getAppPath(exeName) {
  try {
    const out = cp.execSync(`reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${exeName}" /ve`).toString();
    const match = out.match(/REG_SZ\s+(.*)/);
    return match ? match[1].trim() : null;
  } catch (e) {
    try {
      const out = cp.execSync(`reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${exeName}" /ve`).toString();
      const match = out.match(/REG_SZ\s+(.*)/);
      return match ? match[1].trim() : null;
    } catch (e2) {
      return null;
    }
  }
}

console.log('chrome:', getAppPath('chrome.exe'));
console.log('brave:', getAppPath('brave.exe'));
console.log('msedge:', getAppPath('msedge.exe'));
console.log('opera:', getAppPath('opera.exe'));
