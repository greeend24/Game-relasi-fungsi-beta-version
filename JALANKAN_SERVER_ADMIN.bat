@echo off
title Server Data & Admin Dashboard - Game Relasi & Fungsi
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

:: Jalankan server backend lokal dengan pengecekan kesiapan otomatis
node scripts\start-admin-server.cjs

if %errorlevel% neq 0 (
  echo.
  echo Server terhenti atau terjadi kendala.
  pause
)

