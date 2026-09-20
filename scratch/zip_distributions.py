import os
import subprocess

def zip_packages():
    base = os.path.abspath('DISTRIBUSI_GAME_ALL_PLATFORM')
    
    platforms = [
        ('1_WINDOWS_ELECTRON', 'Detektif_Data_Windows_Electron.zip'),
        ('2_ANDROID', 'Detektif_Data_Android_Lengkap.zip'),
        ('3_MACOS', 'Detektif_Data_macOS_Lengkap.zip'),
        ('4_IOS', 'Detektif_Data_iOS_Lengkap.zip'),
        ('5_WINDOWS_WEBVIEW2', 'Detektif_Data_Windows_WebView2.zip'),
        ('BUNDLE_MOBILE_ANDROID_DAN_IOS', 'Bundle_Mobile_Android_iOS.zip')
    ]
    
    for folder, zip_name in platforms:
        folder_path = os.path.join(base, folder)
        zip_path = os.path.join(base, zip_name)
        if os.path.exists(folder_path):
            print(f"[*] Archiving {folder} -> {zip_name}...")
            try:
                cmd = f'tar.exe -a -c -f "{zip_path}" -C "{base}" "{folder}"'
                subprocess.run(cmd, shell=True, check=True)
                size_mb = os.path.getsize(zip_path) / (1024 * 1024)
                print(f"    [+] Created: {zip_name} ({size_mb:.1f} MB)")
            except Exception as e:
                print(f"    [-] Error creating {zip_name}: {e}")

if __name__ == '__main__':
    zip_packages()
