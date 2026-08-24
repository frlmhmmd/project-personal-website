# Muhammad Firly - Personal Portfolio Website

Personal Portfolio Website modern dengan tema *Deep-Void & Cyber Neon*, didesain khusus untuk **Muhammad Firly** dengan spesialisasi di bidang **Backend Development**, **Internet of Things (IoT) Hardware Engineering**, serta **Data Science & AI**.

---

## 🌟 Fitur Utama Website

1. **Direct Download CV ATS-Friendly**:
   - Integrasi tombol download Curriculum Vitae format ATS (`cv_ats/CV_Muhammad_Firly_ATS.pdf`) di Navbar Desktop, Mobile Drawer, Hero CTA Section, dan About Me.
   - Dilengkapi notifikasi Toast dan efek audio saat pengunduhan dimulai.

2. **SEO & OpenGraph Rich Snippet Meta Tags**:
   - Tag OpenGraph & Twitter Card lengkap (`og:title`, `og:image`, `og:description`, `og:url`, dll.) untuk tampilan pratinjau yang memukau saat link dibagikan di WhatsApp, LinkedIn, Twitter/X, dan Facebook.
   - Structured Data JSON-LD Schema.org (`Person` & `WebSite`) untuk visibilitas optimal pada mesin pencari Google.

3. **Audio / Micro-Interaction Sound Effects (Web Audio API)**:
   - Synthesizer suara sci-fi murni berbasis browser Web Audio API (zero external asset, instan tanpa latency).
   - Efek suara futuristik untuk klik tombol, hover micro-ticks, modal lightbox open/close sweep, serta success chime untuk copy email & download CV.
   - Floating widget di pojok kiri bawah untuk toggle `SFX: ON / OFF` dengan status tersimpan di `localStorage`.

4. **Media Recognition & Press Coverage (Radar Bekasi)**:
   - Section liputan media resmi dari surat kabar & portal online **Radar Bekasi** (04 Agustus 2026) terkait inovasi uji coba sistem monitoring IoT di Jalan Mayor Madmuin Hasibuan, Bekasi Timur.

5. **Desain Cyberpunk / Deep Void Modern & Splash Screen**:
   - Splash screen intro elegan dengan logo inisial "F", cyber glowing ring, dan *snappy auto-dismiss*.
   - Dark background (`#020617`) dengan aksen neon cyan (`#38BDF8`), efek glassmorphism, dan glowing orbital rings.
   - Interactive WebGL Canvas Shader background yang merespons pergerakan kursor mouse.
   - Efek dinamis typing text pada headline hero section.

6. **Showcase Foto Profil & Hardware IoT Lengkap**:
   - Foto profil resmi dari `profil/firly.png` dengan animasi floating dan orbital ring glow.
   - Showcase 4 prototype perangkat keras dari folder `gambar-alat-project/` (`alat1.png` - `alat4.png`).
   - Showcase 2 hasil pengujian dan sistem monitoring dari folder `ujicoba-alat/` (`foto_monitoring1.png`, `foto_monitoring2.png`).
   - Filter interaktif kategori: *All Works*, *Hardware Prototype*, dan *Monitoring & Testing*.

7. **Showcase Sertifikasi Resmi & Lightbox Modal**:
   - Menampilkan 6 sertifikat resmi dari folder `gambar-sertifikasi/`:
     - *Belajar Dasar AI (Artificial Intelligence)* - Dicoding
     - *Belajar Dasar Data Science* - Dicoding
     - *Belajar Dasar Pemrograman Python* - Dicoding
     - *Belajar Dasar SQL* - Dicoding
     - *Belajar Dasar Visualisasi Data* - Dicoding
     - *IT Essentials: PC Hardware and Software* - Cisco Networking Academy
   - **Interactive Lightbox Modal**: Klik kartu sertifikat atau foto alat mana pun untuk melihat gambar resolusi penuh, navigasi panah kiri/kanan, dan tombol ESC.

8. **Interaktivitas & Kontak Cepat**:
   - Tombol salin email instan (`muhammadfirly68@gmail.com`) dengan **Toast Notification**.
   - Direct WhatsApp integration (`0881-0110-57900`).
   - Formulir kontak langsung (`mailto:`).
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

## 📤 Panduan Lengkap Update ke Repository GitHub

Untuk mengirim (*push*) seluruh pembaruan terbaru ke repository GitHub Anda (`frlmhmmd/project-personal-website`), jalankan perintah berikut secara berurutan di terminal / PowerShell:

```bash
# 1. Masuk ke folder project (jika belum)
cd "c:\Users\Windows 11\OneDrive\Documents\project-personal-website"

# 2. Cek status file yang telah diubah
git status

# 3. Tambahkan semua file yang diperbarui ke staging area
git add .

# 4. Buat commit dengan pesan deskriptif
git commit -m "feat: add ATS CV download, rich SEO OpenGraph tags, and Web Audio SFX engine"

# 5. Push perubahan ke GitHub branch main
git push origin main
```

Setelah `git push` selesai, GitHub Pages akan otomatis memperbarui website online Anda dalam beberapa detik di:
👉 **`https://frlmhmmd.github.io/project-personal-website/`**

---

## 📁 Struktur Folder Project

```
project-personal-website/
├── index.html                   # Halaman utama portofolio (SEO & OpenGraph ready)
├── css/
│   └── style.css                # Custom style, glassmorphism, SFX & CV styles
├── js/
│   ├── main.js                  # Logika interaktif, SFX synth, typing, filter, modal
│   └── shader.js                # WebGL interactive background shader
├── profil/
│   └── firly.png                # Foto profil Muhammad Firly
├── cv_ats/
│   └── CV_Muhammad_Firly_ATS.pdf # Curriculum Vitae format ATS resmi
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
