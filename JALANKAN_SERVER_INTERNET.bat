@echo off
title Server Data & Admin Dashboard (Online Internet) - Game Relasi & Fungsi
cd /d "%~dp0"

:: Pastikan Node.js terdeteksi
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo ================================================================
  echo   [PERINGATAN] Node.js belum terinstall atau belum masuk PATH!
  echo ================================================================
  echo Silakan unduh dan install Node.js dari https://nodejs.org terlebih dahulu.
  echo.
  pause
  exit /b 1
)

echo ================================================================
echo   DETEKTIF DATA - SERVER ONLINE INTERNET
echo ================================================================
echo.
echo Sedang menyiapkan server data dan menghubungkan ke jalur internet online...
echo.

node scripts\start-cloudflare-server.cjs

echo.
echo ================================================================
echo   Server Cloudflare telah dinonaktifkan / terhenti.
echo ================================================================
echo.
pause


