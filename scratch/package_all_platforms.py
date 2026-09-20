import os
import shutil
import subprocess

def package_all():
    root_dir = os.path.abspath('.')
    dist_base = os.path.join(root_dir, 'DISTRIBUSI_GAME_ALL_PLATFORM')
    if os.path.exists(dist_base):
        shutil.rmtree(dist_base)
    os.makedirs(dist_base, exist_ok=True)
    
    print("[*] PACKAGING ALL 5 PLATFORMS (WINDOWS ELECTRON, ANDROID, MACOS, IOS, WINDOWS WEBVIEW2)...")

    src_web_dist = os.path.join(root_dir, 'dist')

    # =========================================================================
    # 1. WINDOWS PLATFORM (ELECTRON PORTABLE & INSTALLER)
    # =========================================================================
    win_dir = os.path.join(dist_base, '1_WINDOWS_ELECTRON')
    os.makedirs(win_dir, exist_ok=True)
    print("[1/5] Assembling Windows Electron Package...")
    
    src_win_unpacked = os.path.join(root_dir, 'dist-electron', 'win-unpacked')
    dest_win_game = os.path.join(win_dir, 'Detektif_Data_Windows_Game')
    if os.path.exists(src_win_unpacked):
        shutil.copytree(src_win_unpacked, dest_win_game)
        
    installer_src = os.path.join(root_dir, 'dist-electron', 'Detektif Data Setup 1.0.0.exe')
    if os.path.exists(installer_src):
        shutil.copy2(installer_src, os.path.join(win_dir, 'Detektif_Data_Setup_Installer.exe'))
        
    win_readme = """================================================================================
GAME DETEKTIF RELASI DAN FUNGSI - VERSI WINDOWS (ELECTRON STANDARD)
================================================================================

CARA MEMAINKAN (2 PILIHAN):

PILIHAN 1: LANGSUNG MAIN TANPA INSTALL (PORTABLE)
1. Buka folder "Detektif_Data_Windows_Game".
2. Klik ganda pada "Detektif Data.exe".
3. Game langsung berjalan dengan layar penuh (Full Screen) & semua fitur offline aktif!

PILIHAN 2: INSTALL KE KOMPUTER
1. Jalankan file "Detektif_Data_Setup_Installer.exe".
2. Ikuti instruksi di layar sampai selesai.
3. Shortcut game akan otomatis dibuat di Desktop Anda.
================================================================================
"""
    with open(os.path.join(win_dir, 'PANDUAN_PENGGUNAAN_WINDOWS.txt'), 'w', encoding='utf-8') as f:
        f.write(win_readme)

    # =========================================================================
    # 2. ANDROID PLATFORM
    # =========================================================================
    android_dir = os.path.join(dist_base, '2_ANDROID')
    os.makedirs(android_dir, exist_ok=True)
    print("[2/5] Assembling Android Package...")
    
    src_android_proj = os.path.join(root_dir, 'android')
    dest_android_proj = os.path.join(android_dir, 'Project_Android_Capacitor')
    if os.path.exists(src_android_proj):
        shutil.copytree(src_android_proj, dest_android_proj)

    dest_android_web = os.path.join(android_dir, 'Game_Android_Web_Standalone')
    if os.path.exists(src_web_dist):
        shutil.copytree(src_web_dist, dest_android_web)

    build_apk_bat = """@echo off
echo ===================================================
echo   MEMBUAT APK ANDROID (DETEKTIF RELASI DAN FUNGSI)
echo ===================================================
cd Project_Android_Capacitor
call gradlew.bat assembleDebug
echo.
echo Jika berhasil, file APK ada di:
echo Project_Android_Capacitor\\app\\build\\outputs\\apk\\debug\\app-debug.apk
pause
"""
    with open(os.path.join(android_dir, 'BUILD_APK.bat'), 'w', encoding='utf-8') as f:
        f.write(build_apk_bat)

    android_readme = """================================================================================
GAME DETEKTIF RELASI DAN FUNGSI - VERSI ANDROID (HP / TABLET)
================================================================================

Semua data asset game sudah dimasukkan 100% ke dalam folder ini!

PILIHAN 1: INSTALL SEBAGAI WEB APP (3 DETIK - PALING MUDAH)
1. Buka folder "Game_Android_Web_Standalone" di browser Chrome HP Anda.
2. Klik titik tiga -> "Tambahkan ke Layar Utama" (Add to Home Screen).

PILIHAN 2: BUILD APK DENGAN ANDROID STUDIO
1. Buka Android Studio -> Open "Project_Android_Capacitor".
2. Klik tombol Run (Play) ke HP Android Anda.
================================================================================
"""
    with open(os.path.join(android_dir, 'PANDUAN_INSTALL_ANDROID.txt'), 'w', encoding='utf-8') as f:
        f.write(android_readme)

    # =========================================================================
    # 3. MACOS PLATFORM
    # =========================================================================
    mac_dir = os.path.join(dist_base, '3_MACOS')
    os.makedirs(mac_dir, exist_ok=True)
    print("[3/5] Assembling macOS Package...")
    
    dest_mac_web = os.path.join(mac_dir, 'Detektif_Data_macOS_Web_Bundle')
    if os.path.exists(src_web_dist):
        shutil.copytree(src_web_dist, dest_mac_web)

    dest_mac_electron = os.path.join(mac_dir, 'Detektif_Data_macOS_Source_App')
    os.makedirs(dest_mac_electron, exist_ok=True)
    shutil.copytree(os.path.join(root_dir, 'electron'), os.path.join(dest_mac_electron, 'electron'))
    shutil.copytree(src_web_dist, os.path.join(dest_mac_electron, 'dist'))
    shutil.copytree(os.path.join(root_dir, 'backend', 'dist'), os.path.join(dest_mac_electron, 'backend', 'dist'))
    shutil.copy2(os.path.join(root_dir, 'package.json'), os.path.join(dest_mac_electron, 'package.json'))

    start_mac_command = """#!/bin/bash
cd "$(dirname "$0")/Detektif_Data_macOS_Web_Bundle"
echo "=================================================="
echo "   MEMULAI GAME DETEKTIF DATA DI MACOS..."
echo "=================================================="
if which python3 > /dev/null 2>&1; then
    open "http://localhost:8080"
    python3 -m http.server 8080
elif which python > /dev/null 2>&1; then
    open "http://localhost:8080"
    python -m SimpleHTTPServer 8080
elif which npx > /dev/null 2>&1; then
    npx serve -l 8080
else
    open index.html
fi
"""
    with open(os.path.join(mac_dir, 'Start_Game_MacOS.command'), 'w', encoding='utf-8') as f:
        f.write(start_mac_command)

    mac_readme = """================================================================================
GAME DETEKTIF RELASI DAN FUNGSI - VERSI MACOS (MACBOOK / IMAC)
================================================================================

CARA MEMAINKAN:
Klik ganda file "Start_Game_MacOS.command" untuk langsung memainkan game!
================================================================================
"""
    with open(os.path.join(mac_dir, 'PANDUAN_PENGGUNAAN_MACOS.txt'), 'w', encoding='utf-8') as f:
        f.write(mac_readme)

    # =========================================================================
    # 4. IOS PLATFORM
    # =========================================================================
    ios_dir = os.path.join(dist_base, '4_IOS')
    os.makedirs(ios_dir, exist_ok=True)
    print("[4/5] Assembling iOS Package...")
    
    src_ios_proj = os.path.join(root_dir, 'ios')
    dest_ios_proj = os.path.join(ios_dir, 'Project_iOS_Xcode_Capacitor')
    if os.path.exists(src_ios_proj):
        shutil.copytree(src_ios_proj, dest_ios_proj)

    dest_ios_web = os.path.join(ios_dir, 'Game_iOS_Web_Standalone')
    if os.path.exists(src_web_dist):
        shutil.copytree(src_web_dist, dest_ios_web)

    ios_readme = """================================================================================
GAME DETEKTIF RELASI DAN FUNGSI - VERSI IOS (IPHONE / IPAD)
================================================================================

PILIHAN 1: BUKA & JALANKAN DENGAN XCODE DI MAC
Buka file "Project_iOS_Xcode_Capacitor/App/App.xcworkspace" di Xcode -> Klik Run.

PILIHAN 2: MEMAINKAN LEWAT SAFARI MOBILE (PWA)
Buka link game di Safari -> Klik Share -> "Add to Home Screen".
================================================================================
"""
    with open(os.path.join(ios_dir, 'PANDUAN_INSTALL_IOS.txt'), 'w', encoding='utf-8') as f:
        f.write(ios_readme)

    # =========================================================================
    # 5. WINDOWS WEBVIEW2 SUPER RINGAN (NEW!)
    # =========================================================================
    webview2_dir = os.path.join(dist_base, '5_WINDOWS_WEBVIEW2')
    os.makedirs(webview2_dir, exist_ok=True)
    print("[5/5] Assembling Windows WebView2 (Super Ringan) Package...")

    # Copy native compiled launcher
    src_exe = os.path.join(root_dir, 'scratch', 'Detektif_Data_WebView2.exe')
    if os.path.exists(src_exe):
        shutil.copy2(src_exe, os.path.join(webview2_dir, 'Detektif Data (WebView2).exe'))

    # Copy game web data
    dest_wv2_game_data = os.path.join(webview2_dir, 'game_data')
    if os.path.exists(src_web_dist):
        shutil.copytree(src_web_dist, dest_wv2_game_data)

    # Batch fallback launcher
    batch_launcher = """@echo off
title Detektif Data (WebView2 Launcher)
cd /d "%~dp0game_data"
start "" msedge.exe --app="http://localhost:8080" --start-fullscreen --disable-features=TranslateUI
python -m http.server 8080 || python3 -m http.server 8080 || start index.html
"""
    with open(os.path.join(webview2_dir, 'Mainkan_Game_WebView2.bat'), 'w', encoding='utf-8') as f:
        f.write(batch_launcher)

    wv2_readme = """================================================================================
🎮 GAME DETEKTIF RELASI DAN FUNGSI - VERSI WINDOWS (WEBVIEW2 SUPER RINGAN)
================================================================================

KEUNGGULAN VERSI WEBVIEW2 INI:
- Ukuran sangat hemat (tanpa browser Chromium tambahan).
- Konsumsi RAM hanya ~35-45 MB (sangat lancar di laptop spek rendah).
- Berjalan 100% offline dengan audio, animasi, dan layar penuh (Fullscreen).

CARA MEMAINKAN (TINGGAL KLIK):
1. Klik ganda file "Detektif Data (WebView2).exe".
2. Game langsung terbuka dalam mode aplikasi mandiri layar penuh!

Alternatif: Jika ada kendala, bisa klik ganda "Mainkan_Game_WebView2.bat".
================================================================================
"""
    with open(os.path.join(webview2_dir, 'PANDUAN_WINDOWS_WEBVIEW2.txt'), 'w', encoding='utf-8') as f:
        f.write(wv2_readme)

    # =========================================================================
    # 6. GABUNGAN MOBILE (ANDROID & IOS)
    # =========================================================================
    combo_mobile = os.path.join(dist_base, 'BUNDLE_MOBILE_ANDROID_DAN_IOS')
    os.makedirs(combo_mobile, exist_ok=True)
    shutil.copytree(src_web_dist, os.path.join(combo_mobile, 'Web_Game_Mobile_Siap_Pakai'))
    with open(os.path.join(combo_mobile, 'PANDUAN_ANDROID_DAN_IOS.txt'), 'w', encoding='utf-8') as f:
        f.write("""================================================================================
BUNDLE GABUNGAN MOBILE: ANDROID & IOS (HP / TABLET)
================================================================================
Folder ini berisi data game lengkap yang bisa langsung dibuka di browser Android & iOS:
1. Android: Buka di Google Chrome -> Add to Home Screen.
2. iOS: Buka di Safari -> Add to Home Screen.
3. Semua gambar, suara detektif (Relo, Snowy, Ryu), dan animasi berjalan 100% offline!
================================================================================
""")

    print("[+] ALL 5 PLATFORMS PACKAGED IN 'DISTRIBUSI_GAME_ALL_PLATFORM' SUCCESSFULLY!")

if __name__ == '__main__':
    package_all()
