# Panduan & Catatan Teknis: Sinkronisasi Multi-Device & Deployment Akun
**Game Edukasi: Detektif Data : Relasi & Fungsi**

Dokumen ini menjelaskan penyebab kendala akun antar-laptop, arsitektur solusi **Online Cloud Sync + Offline Continuity**, serta panduan implementasi agar akun dan progres siswa dapat tersinkronisasi mulus di berbagai perangkat (laptop/HP).

---

## 1. Mengapa Akun di Laptop Lain Tidak Ter-deploy ke Server/Laptop Utama?

Berdasarkan investigasi pada kode frontend, backend, dan database SQLite:

1. **Alamat Server Terkunci ke Domain Ngrok Sementara (`scooter-thickness-stony.ngrok-free.dev`)**:
   - Di file `src/services/apiService.js` dan `src/services/authClient.js`, alamat server masih mengarah ke URL ngrok gratis.
   - Domain ngrok gratis bersifat sementara dan otomatis mati saat terminal ngrok laptop utama tertutup atau sleep.
   - Saat laptop lain mencoba mendaftar/login, koneksi ke ngrok tersebut gagal (*Network Error / Bad Gateway*).

2. **Akun Terisolasi di Cache Lokal Laptop Siswa (*Local DB Fallback*)**:
   - Karena gagal menghubungi server, sistem secara otomatis mengaktifkan fitur *offline fallback* dan menyimpan akun hanya di `localStorage` / SQLite lokal laptop siswa tersebut (`detektif_local_users_db`).
   - Akibatnya, data tersebut tidak pernah terkirim (*deploy*) ke database master di laptop admin/server (`detektif_data.db`).

3. **Database Master Belum Tersambung Dua Arah secara Real-Time**:
   - Setiap laptop yang menjalankan game Electron memiliki file `detektif_data.db` sendiri di `AppData/Roaming/detektif-data-relasi-fungsi/`.
   - Tanpa adanya proses *push* data lokal ke server pusat saat kembali online, laptop A dan laptop B tidak saling mengetahui akun satu sama lain.

---

## 2. Arsitektur Solusi: "Online Cloud Sync + Offline Continuity"

Sistem ini dirancang dengan prinsip **Hybrid Offline-First**:
* Siswa tetap bisa bermain kapan saja meskipun koneksi internet/server terputus.
* Begitu ada koneksi (online), seluruh data otomatis tersinkronisasi dua arah ke server pusat.

```
┌─────────────────────────────────────────────────────────┐
│               SERVER PUSAT (Laptop Admin / VPS)         │
│          Database Master (SQLite / LibSQL / Cloud)      │
│      - Tabel: user, account, user_stats, progress       │
└───────────────────────────▲─────────────────────────────┘
                            │
               ┌────────────┴────────────┐
   (Auto Sync / Wi-Fi LAN / Ngrok Online)│ (Two-Way Sync)
               │                         │
┌──────────────▼──────────┐   ┌──────────▼──────────────┐
│       LAPTOP A          │   │        LAPTOP B         │
│  - Main Online/Offline  │   │  - Login Akun Sama      │
│  - Simpan Cache Lokal   │   │  - Langsung Tarik Nilai │
│  - Auto Push ke Server  │   │    & Progres Laptop A   │
└─────────────────────────┘   └─────────────────────────┘
```

### Skenario Penggunaan:
1. **Siswa Mendaftar di Laptop A (Kondisi Online / Tersambung Server)**:
   - Akun langsung tersimpan di Server Pusat dan dicadangkan di memori lokal Laptop A.
2. **Siswa Pindah ke Laptop B (Kondisi Online)**:
   - Siswa cukup mengetikkan username & password di Laptop B.
   - Laptop B mengambil data dari server, lalu mengunduh semua progres (chapter yang sudah tamat, bintang, skor, dan lencana) dari Laptop A.
3. **Laptop B Tiba-tiba Mati Lampu / Tanpa Internet (Offline)**:
   - Siswa tetap bisa login dan melanjutkan game di Laptop B menggunakan akun dan progres yang sudah tersimpan di cache lokal.
4. **Laptop B Kembali Terhubung (Online)**:
   - Fitur *Background Auto-Sync* otomatis mengirimkan progres baru yang dimainkan saat offline ke Server Pusat (*conflict resolution*: progres dan skor tertinggi yang dipertahankan).

---

## 3. Komponen Teknis yang Diperbarui

### A. Backend (`backend/src/`)
1. **Endpoint Sinkronisasi Akun & Progres Offline (`POST /api/progress/sync-offline`)**:
   - Menerima kumpulan data akun yang sempat dibuat/dimainkan secara offline.
   - Mendaftarkan user ke tabel `user`, `account` (dengan enkripsi password Better Auth), dan tabel `user_stats`.
   - Menggabungkan progres subbab dan kuis menggunakan prinsip *Highest Score & Latest Progress*.
2. **Endpoint Daftar Seluruh Pengguna (`GET /api/users/list`)**:
   - Mengembalikan daftar username dan nama lengkap dari server pusat untuk papan *Pilih Akun*.

### B. Frontend (`src/services/`)
1. **Konfigurasi URL Server Dinamis (`apiService.js` & `authClient.js`)**:
   - Mendukung alamat server lokal LAN (misal: `http://192.168.1.xxx:3001`) atau domain online.
   - Menyimpan URL server kustom di `localStorage` sehingga bisa diubah langsung dari game tanpa perlu *re-compile*.
2. **Antrean Sinkronisasi Otomatis (*Background Queue* di `storageService.js`)**:
   - Berjalan otomatis setiap 20 detik atau saat status jaringan berubah menjadi online (hijau).
   - Mengirim semua data bertanda `hasUnsyncedData: true` ke endpoint `/api/progress/sync-offline`.
   - Mengunduh profil terbaru dari server saat login.

### C. Antarmuka Guru / Pengaturan Jaringan (`SettingsModal.jsx` / `AuthScreen.jsx`)
- Menampilkan status koneksi server secara jelas (🟢 Terhubung / 🔴 Terputus).
- Tombol atau input untuk mengganti alamat IP Server (sangat berguna di lab sekolah dengan Wi-Fi lokal).

---

## 4. Panduan Menghubungkan Laptop Siswa ke Laptop Server di Lab Sekolah (Offline LAN)

Jika sekolah **tidak memiliki internet luar**, Anda bisa menjadikan laptop Anda sebagai **Server Pusat Lokal (Host)**:

1. **Hubungkan Semua Laptop ke Wi-Fi / Hotspot yang Sama** (bisa pakai Wi-Fi router tanpa internet atau hotspot HP).
2. **Cek Alamat IP Laptop Anda (Host Server)**:
   - Buka Command Prompt di laptop utama: ketik `ipconfig`.
   - Lihat bagian *IPv4 Address*, misalnya: `192.168.1.15`.
3. **Jalankan Server di Laptop Utama**:
   - Jalankan `npm run server` di folder backend (port 3001).
4. **Di Laptop Siswa**:
   - Buka game, atur alamat server ke: `http://192.168.1.15:3001`.
   - Semua laptop siswa sekarang otomatis mendaftar dan menyetor nilai langsung ke laptop utama Anda secara real-time!

---

*Catatan ini telah disimpan ke repositori proyek agar dapat digunakan sebagai dokumentasi teknis pada naskah Tesis S2.*
