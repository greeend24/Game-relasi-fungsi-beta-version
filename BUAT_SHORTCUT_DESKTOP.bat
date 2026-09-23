@echo off
title Buat Shortcut Desktop - Detektif Data
cd /d "%~dp0"

echo ================================================================
echo   MEMBUAT SHORTCUT 1-KLIK DI DESKTOP
echo ================================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "$WshShell = New-Object -ComObject WScript.Shell; $d = [Environment]::GetFolderPath('Desktop'); @('Deploy Server Ngrok (Detektif Data).lnk', 'Server Guru - Cloudflare (Detektif Data).lnk', 'Server Guru & Admin Dashboard (Cloudflare).lnk') | ForEach-Object { $p = Join-Path $d $_; if (Test-Path $p) { Remove-Item $p -Force } }; $s1 = $WshShell.CreateShortcut(\"$d\Deploy Server Cloudflare (Detektif Data).lnk\"); $s1.TargetPath = \"$PSScriptRoot\JALANKAN_SERVER_INTERNET.bat\"; $s1.WorkingDirectory = \"$PSScriptRoot\"; $s1.Description = \"Server Data Online dan Panel Guru (Cloudflare)\"; $s1.IconLocation = \"$env:SystemRoot\System32\shell32.dll,14\"; $s1.Save(); $s2 = $WshShell.CreateShortcut(\"$d\Server Lab Komputer Lokal (Detektif Data).lnk\"); $s2.TargetPath = \"$PSScriptRoot\JALANKAN_SERVER_ADMIN.bat\"; $s2.WorkingDirectory = \"$PSScriptRoot\"; $s2.Description = \"Server Data Lab Komputer (Lokal Wi-Fi)\"; $s2.IconLocation = \"$env:SystemRoot\System32\shell32.dll,18\"; $s2.Save()"

echo.
echo [BERHASIL] 2 Shortcut berhasil dipasang di Desktop:
echo 1. "Deploy Server Cloudflare (Detektif Data)" -^> Server online: otomatis buka panel guru + buat link siswa
echo 2. "Server Lab Komputer Lokal (Detektif Data)" -^> Server offline lab komputer (Wi-Fi lokal)
echo.
pause
