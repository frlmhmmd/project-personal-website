# Muhammad Firly - Personal Portfolio Website

Personal Portfolio Website modern dengan tema *Deep-Void & Cyber Neon*, didesain khusus untuk **Muhammad Firly** dengan spesialisasi di bidang **Backend Development**, **Internet of Things (IoT) Hardware Engineering**, serta **Data Science & AI**.

---

## 🌟 Fitur Utama Website

1. **Desain Cyberpunk / Deep Void Modern & Splash Screen**:
   - Splash screen intro elegan dengan logo inisial "F", cyber-minimalist glowing container, dan smooth state dismiss.
   - Dark background (`#020617`) dengan aksen neon cyan (`#38BDF8`), efek glassmorphism, dan glowing orbital rings.
   - Interactive WebGL Canvas Shader background yang merespons pergerakan kursor mouse.
   - Efek dinamis typing text pada headline hero section.

2. **Showcase Foto Profil & Hardware IoT Lengkap**:
   - Foto profil resmi dari `profil/firly.png` dengan animasi floating dan orbital ring glow.
   - Showcase 4 prototype perangkat keras dari folder `gambar-alat-project/` (`alat1.png` - `alat4.png`).
   - Showcase 2 hasil pengujian dan sistem monitoring dari folder `ujicoba-alat/` (`foto_monitoring1.png`, `foto_monitoring2.png`).
   - Filter interaktif kategori: *All Works*, *Hardware Prototype*, dan *Monitoring & Testing*.

3. **Showcase Sertifikasi Resmi & Lightbox Modal**:
   - Menampilkan 6 sertifikat resmi dari folder `gambar-sertifikasi/`:
     - *Belajar Dasar AI (Artificial Intelligence)* - Dicoding
     - *Belajar Dasar Data Science* - Dicoding
     - *Belajar Dasar Pemrograman Python* - Dicoding
     - *Belajar Dasar SQL* - Dicoding
     - *Belajar Dasar Visualisasi Data* - Dicoding
     - *IT Essentials: PC Hardware and Software* - Cisco Networking Academy
   - **Interactive Lightbox Modal**: Klik kartu sertifikat atau foto alat mana pun untuk melihat gambar resolusi penuh, navigasi panah kiri/kanan, dan tombol ESC.

4. **Interaktivitas & User Experience**:
   - Navigasi responsif (Desktop & Mobile Drawer Menu).
   - Tombol salin email instan (`muhammadfirly68@gmail.com`) dengan **Toast Notification**.
   - Direct WhatsApp integration (`0881-0110-57900`).
   - Formulir kontak langsung yang otomatis membuka email client (`mailto:`).
   - Active ScrollSpy pada navigation bar.

---

## 🚀 Cara Menjalankan Secara Lokal (Preview)

Website ini dibuat dengan arsitektur web murni (HTML5, Tailwind via CDN, Vanilla JS & CSS, WebGL) sehingga **tidak memerlukan instalasi dependensi atau build server yang rumit**.

### Cara 1: Menggunakan Python (Simple HTTP Server)
Buka terminal / PowerShell di folder project ini dan jalankan:
```bash
python -m http.server 8000
```
Buka browser dan akses: `http://localhost:8000`

### Cara 2: Menggunakan VS Code Live Server / Double-Click
Cukup buka file `index.html` langsung di browser favorit Anda (Chrome, Edge, Firefox, Brave).

---

## 🌐 Cara Hosting ke GitHub Pages (1-Klik)

Website ini sudah 100% siap dihosting ke **GitHub Pages** secara gratis.

### Langkah-langkah:
1. Push branch `main` ke repository GitHub `frlmhmmd/project-personal-website`.
2. Buka repository Anda di browser GitHub:
   - Klik tab **Settings** > Pilih menu **Pages** di sebelah kiri.
   - Pada bagian **Build and deployment > Source**, pilih **GitHub Actions** (atau **Deploy from a branch** > `main` > `/ (root)`).
3. Website portofolio Anda akan langsung aktif dan bisa diakses di: `https://frlmhmmd.github.io/project-personal-website/`!

*(Opsional: File workflow `.github/workflows/deploy.yml` juga sudah disertakan jika Anda ingin menggunakan GitHub Actions).*

---

## 📁 Struktur Folder Project

```
project-personal-website/
├── index.html                   # Halaman utama portofolio
├── css/
│   └── style.css                # Custom style, glassmorphism, animasi & lightbox
├── js/
│   ├── main.js                  # Logika interaktif, typing, filter, modal, toast
│   └── shader.js                # WebGL interactive background shader
├── profil/
│   └── firly.png                # Foto profil Muhammad Firly
├── gambar-sertifikasi/          # 6 Sertifikat resmi terverifikasi
│   ├── Belajar_Dasar_Data_Science.png
│   ├── Belajar_Dasar_Python.png
│   ├── Belajar_Dasar_Sql.png
│   ├── Belajar_Dasar_Visualisasi_Data.png
│   ├── ItEssentials.png
│   └── Sertifikat_Belajar_Dasar_Ai.png
├── gambar-alat-project/         # 4 Dokumentasi prototype perangkat keras
│   ├── alat1.png
│   ├── alat2.png
│   ├── alat3.png
│   └── alat4.png
├── ujicoba-alat/                # 2 Foto hasil uji coba & dashboard monitoring
│   ├── foto_monitoring1.png
│   └── foto_monitoring2.png
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages automated workflow
└── README.md                    # Dokumentasi panduan lengkap
```
