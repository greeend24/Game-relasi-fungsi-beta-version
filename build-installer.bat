@echo off
chcp 65001 > nul
title Detektif Data - Build Installer

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║          DETEKTIF DATA - Build Installer (.exe)          ║
echo ╚══════════════════════════════════════════════════════════╝
echo.

:: Check Node.js
node --version > nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js tidak ditemukan!
    echo         Install dari: https://nodejs.org
    pause
    exit /b 1
)

echo [1/4] Membangun Frontend (React)...
echo ─────────────────────────────────────────
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build gagal!
    pause
    exit /b 1
)
echo [OK] Frontend berhasil di-build ke folder dist/
echo.

echo [2/4] Membangun Backend (TypeScript → JavaScript)...
echo ─────────────────────────────────────────
cd backend
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Backend build gagal!
    cd ..
    pause
    exit /b 1
)
cd ..
echo [OK] Backend berhasil di-compile ke folder backend/dist/
echo.

echo [3/4] Membuat installer Windows (.exe)...
echo ─────────────────────────────────────────
call npx electron-builder build --win --x64 --config electron-builder.config.cjs
if %errorlevel% neq 0 (
    echo [ERROR] Electron packaging gagal!
    pause
    exit /b 1
)
echo.

echo [4/4] Selesai!
echo ─────────────────────────────────────────
echo.
echo ✅ Installer berhasil dibuat!
echo    Lokasi: dist-electron\Detektif Data Setup.exe
echo.
echo Kamu bisa mendistribusikan file installer tersebut.
echo Pengguna cukup double-click untuk install dan main!
echo.
pause
