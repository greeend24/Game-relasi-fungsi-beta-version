const cp = require('child_process');

function queryReg(key) {
  try {
    return cp.execSync(`reg query "${key}"`).toString();
  } catch (e) {
    return '';
  }
}

console.log('--- HKLM App Paths ---');
console.log(queryReg('HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths'));

console.log('--- HKLM WOW64 App Paths ---');
console.log(queryReg('HKLM\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\App Paths'));

console.log('--- HKCU App Paths ---');
console.log(queryReg('HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths'));

console.log('--- Default HTTP Handler ---');
console.log(queryReg('HKCU\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice'));
