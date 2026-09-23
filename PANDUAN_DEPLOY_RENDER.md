# 🚀 Panduan Deploy 100% Gratis di Render.com (Online 24 Jam)

Panduan ini menjelaskan cara mempublikasikan game **Detektif Data (Relasi & Fungsi)** ke cloud internet secara **100% Gratis**, online **24 jam non-stop**, tanpa perlu menyalakan laptop guru/peneliti.

---

## 🌟 Keuntungan Deploy di Render.com
1. **100% Gratis Selamanya** (Free Tier tanpa perlu memasukkan kartu kredit).
2. **Server Terdekat (Singapura)**: Akses cepat dan responsif dari Indonesia.
3. **URL HTTPS Resmi & Aman**: Otomatis mendapatkan SSL gratis (contoh: `https://detektif-data-relasi-fungsi.onrender.com`).
4. **All-in-One**: Game frontend, API backend, dan Dashboard Admin Peneliti langsung aktif dalam satu link yang sama.
5. **Auto-Deploy**: Setiap kali Anda melakukan `git push` ke GitHub, Render akan otomatis memperbarui game ke versi terbaru.

---

## 📋 Langkah-Langkah Deploy (Hanya 3 Menit)

### Langkah 1: Push Kode Terbaru ke GitHub
Pastikan seluruh perubahan terbaru di laptop sudah ter-upload ke repositori GitHub:
Buka Terminal/CMD di folder game dan jalankan:
```bash
git add .
git commit -m "feat: setup cloudflare tunnel and render deployment config"
git push origin main
```

---

### Langkah 2: Buka dan Masuk ke Render.com
1. Buka situs [https://render.com](https://render.com).
2. Klik tombol **GET STARTED FOR FREE** atau **Sign In**.
3. Pilih **Sign in with GitHub** (gunakan akun GitHub yang sama dengan repositori game).

---

### Langkah 3: Sambungkan Repositori Game
Ada 2 cara mudah, **Cara A (Blueprint / Otomatis)** sangat direkomendasikan karena project ini sudah dilengkapi file konfigurasi `render.yaml`:

#### Cara A: Menggunakan Blueprint (Rekomendasi - Otomatis 1-Klik)
1. Di Dashboard Render, klik tombol **New +** (kanan atas) lalu pilih **Blueprint**.
2. Pilih repositori **`Game-relasi-fungsi-beta-version`**.
3. Render akan otomatis mendeteksi file `render.yaml`.
4. Beri nama instance (atau biarkan default), lalu klik tombol **Apply**.
5. Render akan langsung memulai proses build dan deploy secara otomatis!

#### Cara B: Menggunakan Web Service Manual
Jika ingin mengatur secara manual:
1. Klik **New +** -> pilih **Web Service**.
2. Pilih repositori **`Game-relasi-fungsi-beta-version`**.
3. Isi kolom pengaturan berikut:
   - **Name**: `detektif-data-relasi-fungsi` (atau nama lain sesuai keinginan)
   - **Region**: `Singapore (Southeast Asia)`
   - **Branch**: `main`
   - **Root Directory**: *(kosongkan)*
   - **Environment**: `Node`
   - **Build Command**: `npm run build:render`
   - **Start Command**: `npm run start:render`
   - **Instance Type**: `Free`
4. Di bagian **Environment Variables**, tambahkan:
   - `NODE_ENV` = `production`
   - `ADMIN_PASSWORD` = `adminrelo2026`
5. Klik **Create Web Service**.

---

### Langkah 4: Tunggu Proses Build Selesai
1. Render akan menjalankan proses kompilasi Vite frontend dan backend TypeScript (membutuhkan waktu sekitar 1–2 menit).
2. Setelah log menampilkan:
   ```
   🦉 Detektif Data Backend running on port 10000
   ==> Your service is live 🎉
   ```
3. Game Anda sudah resmi online!

---

### Langkah 5: Bagikan Link ke Siswa & Akses Admin
Di bagian atas dashboard Render, Anda akan melihat URL publik game Anda, misalnya:
👉 **`https://detektif-data-relasi-fungsi.onrender.com`**

- **Untuk Siswa:** Bagikan URL utama di atas. Siswa dapat langsung bermain di HP / laptop tanpa instalasi apa pun.
- **Untuk Peneliti / Guru:** Buka URL di atas ditambah `/admin`, misalnya:
  👉 **`https://detektif-data-relasi-fungsi.onrender.com/admin`**
  *(Gunakan password admin: `adminrelo2026` untuk melihat rekap nilai, grafik pemahaman, dan unduh Excel).*
