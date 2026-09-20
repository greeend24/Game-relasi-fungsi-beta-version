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
echo   DETEKTIF DATA - SERVER ONLINE INTERNET (NGROK 1-KLIK)
echo ================================================================
echo.
echo Sedang menyiapkan server data dan menghubungkan ke internet (Ngrok)...
echo.

node scripts\start-online-server.cjs

echo.
echo ================================================================
echo   Server Data & Ngrok telah dinonaktifkan / terhenti.
echo ================================================================
echo.
pause


