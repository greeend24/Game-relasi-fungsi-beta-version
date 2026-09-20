@echo off
title Buat Shortcut Desktop - Detektif Data
cd /d "%~dp0"

echo ================================================================
echo   MEMBUAT SHORTCUT 1-KLIK DI DESKTOP
echo ================================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "$WshShell = New-Object -ComObject WScript.Shell; $s = $WshShell.CreateShortcut(\"$([Environment]::GetFolderPath('Desktop'))\Deploy Server Ngrok (Detektif Data).lnk\"); $s.TargetPath = \"$PSScriptRoot\JALANKAN_SERVER_INTERNET.bat\"; $s.WorkingDirectory = \"$PSScriptRoot\"; $s.Description = \"Klik 1 kali untuk menyalakan Server Data & Ngrok Online secara otomatis\"; $s.IconLocation = \"$env:SystemRoot\System32\shell32.dll,14\"; $s.Save()"

echo.
echo [BERHASIL] Shortcut berhasil dipasang di Desktop komputermu!
echo Nama Icon: "Deploy Server Ngrok (Detektif Data)"
echo.
echo Sekarang kamu bisa menyalakan server internet Ngrok langsung dari Desktop
echo tanpa perlu membuka aplikasi Antigravity sama sekali!
echo.
pause
