const fs = require('fs');
const cp = require('child_process');

const exePath = 'D:\\New folder (2)\\Game-Relasi-Fungsi\\DISTRIBUSI_GAME_ALL_PLATFORM\\5_WINDOWS_WEBVIEW2\\Detektif Data (WebView2).exe';

// Decompile / inspect IL or test run
try {
  // Let's check with powershell reflection
  const psScript = `
Add-Type -AssemblyName System.Reflection
$bytes = [System.IO.File]::ReadAllBytes('${exePath.replace(/\\/g, '\\\\')}')
$asm = [System.Reflection.Assembly]::Load($bytes)
$type = $asm.GetType('DetektifDataWebView2.Program')
$methods = $type.GetMethods([System.Reflection.BindingFlags]'Static,NonPublic,Public')
foreach ($m in $methods) {
    Write-Host "Method: $($m.Name)"
    $body = $m.GetMethodBody()
    if ($body) {
        Write-Host "  MaxStack: $($body.MaxStackSize)"
        Write-Host "  Locals: $($body.LocalVariables.Count)"
        $il = $body.GetILAsByteArray()
        Write-Host "  IL Bytes: $($il.Length)"
    }
}
`;
  const out = cp.execSync('powershell -NoProfile -ExecutionPolicy Bypass -Command -', { input: psScript }).toString();
  console.log(out);
} catch (e) {
  console.error(e.message);
  if (e.stdout) console.log(e.stdout.toString());
  if (e.stderr) console.error(e.stderr.toString());
}
