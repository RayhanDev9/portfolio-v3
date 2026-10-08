<div align="center">

  # ⚡ Muhamad Rayhan — Portfolio v3
  
  **Modern, High-Performance & Modular Personal Developer Portfolio**

  [![Website](https://img.shields.io/badge/Live_Website-rayhandev.my.id-8B5CF6?style=for-the-badge&logo=google-chrome&logoColor=white)](https://rayhandev.my.id/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](LICENSE)
  [![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

  <p align="center">
    <a href="#-overview">Overview</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-certificates-showcase-plan">Certificates Plan</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-contact--socials">Contact</a>
  </p>
</div>

---

## 🌟 Overview

Selamat datang di repositori resmi **Portfolio v3** milik **Muhamad Rayhan** ([rayhandev.my.id](https://rayhandev.my.id/)). 

Website ini dirancang dengan standar arsitektur **Enterprise / Senior Front-End Developer**—mengombinasikan estetika visual gelap modern (*glassmorphism*, *grid cursor tracking*, *matrix rain effect*) dengan arsitektur kode modular berbasis **Vite**, **HTML Component Partials (`vite-plugin-html-inject`)**, **Tailwind CSS v4**, dan **Vanilla ES6 Modules**.

---

## 🛠️ Tech Stack & Architecture

### **Core Frontend**
* **HTML5**: Arsitektur modular menggunakan komponen terpisah per section (`src/components/*.html`).
* **Tailwind CSS v4**: Utility-first framework dengan kustomisasi tema dan performa kompilasi instan.
* **JavaScript (ES6 Modules)**: Logika terenkapsulasi secara terpisah antara *Data Layer* (`js/data/`) dan *UI Modules* (`js/modules/`).

### **Tooling & Optimization**
* **Vite 8 & Vite Plugin HTML Inject**: Bundler super cepat dengan *Hot Module Replacement* (HMR) dan injeksi komponen HTML statis saat *build-time*.
* **Sharp (`scripts/convert-to-avif.js`)**: Pipeline otomatis kompresi dan konversi aset gambar raster ke format generasi terbaru (**AVIF**).
* **SEO & Semantic Architecture**: Terintegrasi OpenGraph, Twitter Cards, Schema.org JSON-LD (Person), dynamic XML Sitemap, dan `robots.txt`.

---

## ✨ Key Features

- 📱 **100% Responsive & Mobile-First**: Dioptimalkan dari smartphone layar kecil hingga monitor Ultra-Wide 4K.
- 🧩 **Modular Component Architecture**: Source code HTML terpotong rapi per section tanpa mengorbankan kecepatan load dan keramahan SEO.
- 🎯 **Interactive Project Showcase**: Filter kategori instan (*All*, *Web Apps*, *Landing & Profile*, *Games & Logic*) lengkap dengan badge kolaborasi tim (*FE, BE, UI/UX*).
- ⚡ **Zero Framework Overhead**: Menggunakan Vanilla JavaScript murni yang menghasilkan bundle sangat ringan (~19 kB JS gzipped) dan *first contentful paint* (FCP) yang instan.
- 🎨 **Rich Visual Micro-Interactions**:
  - Interactive grid cursor follower.
  - Text scramble decoding animation saat scroll reveal.
  - Matrix digital rain ambient background.
  - Smart mobile navbar (auto-hide saat scroll ke bawah, auto-show saat scroll ke atas).

---

## 📁 Project Structure

```text
portfolio-v3/
├── 📁 assets/                     # Aset statis terorganisir
│   ├── 📁 icons/
│   │   ├── 📁 tech/               # 21 Logo SVG keahlian teknis (React, TS, Vite, dll.)
│   │   ├── 📁 social/             # Ikon media sosial (GitHub, WA, IG, Gmail)
│   │   └── 📁 ui/                 # Ikon antarmuka (location.svg, people.svg)
│   └── 📁 images/
│       ├── 📁 profile/            # Foto profil berformat AVIF
│       └── 📁 projects/           # 9 Thumbnail showcase karya
│
├── 📁 src/
│   ├── 📁 components/             # 🧩 Komponen HTML Murni terpisah
│   │   ├── 📄 header.html         # Navbar desktop & drawer mobile
│   │   ├── 📄 hero.html           # Home / Hero introduction section
│   │   ├── 📄 about.html          # Profil & ringkasan spesialisasi
│   │   ├── 📄 journey.html        # Learning & career journey timeline
│   │   ├── 📄 skills.html         # Tech stack & toolkit showcase
│   │   ├── 📄 projects.html       # Portfolio showcase & filter buttons
│   │   ├── 📄 contact.html        # Form kontak & kanal pesan
│   │   └── 📄 footer.html         # Footer & smooth back-to-top trigger
│   │
│   └── 📄 input.css               # Tailwind source stylesheet
│
├── 📁 js/                         # Arsitektur Modular ES6 (Clean Architecture)
│   ├── 📄 main.js                 # App Bootstrap / Entrypoint utama
│   ├── 📁 data/                   # Single Source of Truth
│   │   ├── 📄 projects.data.js    # Data proyek, live demo, dan metadata collab
│   │   └── 📄 skills.data.js      # Data kategori & keahlian teknis
│   │
│   └── 📁 modules/                # Modul UI & Fitur Terpisah
│       ├── 📄 navigation.js       # Sticky navbar, active scrollspy, drawer mobile
│       ├── 📄 projects.js         # Filter & rendering kartu proyek
│       ├── 📄 skills.js           # Rendering bento grid keahlian
│       ├── 📄 contact.js          # Direct WhatsApp trigger & animasi kontak
│       └── 📄 animations.js       # Cursor effect, text scramble & rain background
│
├── 📁 scripts/                    # Utility & automation scripts
│   └── 📄 convert-to-avif.js      # Sharp AVIF image batch converter
│
├── 📄 index.html                  # File HTML utama (memuat komponen via <load src="..." />)
├── 📄 vite.config.js              # Konfigurasi Vite & HTML injector
├── 📄 package.json                # Dependencies & script commands
├── 📄 CNAME                       # Domain kustom (rayhandev.my.id)
├── 📄 robots.txt                  # Search engine crawler directives
└── 📄 sitemap.xml                 # SEO search index sitemap
```

---

## 📜 🎯 Verified Credentials & Certificates Showcase (10 Sertifikat)

Fitur showcase sertifikasi dan kredensial terverifikasi pada portfolio, dikelompokkan ke dalam 3 kategori utama: **Kompetisi / Hackathon**, **Udemy**, dan **Codepolitan**.

### 1. 📁 Struktur Data & Pemetaan Aset (`assets/images/sertifikat/`)

Seluruh sertifikat dikonversi dan dioptimasi ke format generasi terbaru beresolusi tinggi (`.avif`):

#### 🏆 Kategori 1: Kompetisi & Hackathon (1 Sertifikat)
| File Asset (.avif) | Judul Sertifikat / Kegiatan | Penyelenggara | Keterampilan Utama |
| :--- | :--- | :--- | :--- |
| `hackathon.avif` | *Hackathon: Innovating Beyond The Code* | HIMTIF (Himpunan Mahasiswa Teknik Informatika) | Hackathon, Problem Solving, Rapid Prototyping, Web Dev, Teamwork |

#### 🅰️ Kategori 2: Udemy (3 Kursus)
| File Asset (.avif) | Judul Sertifikat / Kursus | Instruktur / Institusi | Topik Utama |
| :--- | :--- | :--- | :--- |
| `html-css-bang-jonas-udamy.avif` | *Build Responsive Real-World Websites with HTML and CSS* | Jonas Schmedtmann | HTML5, CSS3 Modern, Flexbox, CSS Grid, Responsive Design |
| `javascript-bang-jonas-udamy.avif` | *The Complete JavaScript Course 2024: From Zero to Expert!* | Jonas Schmedtmann | JavaScript ES6+, OOP, Asynchronous, Architecture, DOM |
| `javascript-mas-eko-udamy.avif` | *Pemrograman JavaScript: Pemula sampai Mahir* | Eko Kurniawan Khannedy (PZN) | Fondasi JavaScript, Standard Library, Web API |

#### 🅱️ Kategori 3: Codepolitan (6 Kursus)
| File Asset (.avif) | Judul Sertifikat / Kursus | Instruktur / Institusi | Topik Utama |
| :--- | :--- | :--- | :--- |
| `html-dasar.avif` | *Belajar Dasar HTML* | Ahmad Hakim (Codepolitan) | Struktur Semantik HTML5 & Web Layout |
| `css.avif` | *Belajar Dasar CSS* | Alucard (Codepolitan) | Styling Dasar, Box Model, Selector & Positioning |
| `boostrap.avif` | *Belajar CSS Framework Bootstrap* | Ahmad Hakim (Codepolitan) | Bootstrap Grid System & UI Components |
| `git.avif` | *Belajar Git & GitHub untuk Pemula* | Nusendra Hanggarawan (Codepolitan) | Version Control, Branching & Git Flow |
| `javascript.avif` | *Belajar JavaScript Dasar* | Ahmad Hakim (Codepolitan) | Sintaks Dasar, Logika Percabangan & Loop |
| `ajax.avif` | *Belajar AJAX & Asynchronous Web API* | Ahmad Hakim (Codepolitan) | XMLHttpRequest, Fetch API & JSON Data Handling |

---

### 2. 🏗️ Arsitektur Komponen & Data Layer

Mengikuti pola desain **Modular Clean Architecture**:

```text
portfolio-v3/
├── 📁 assets/images/sertifikat/       # 10 file .avif (high-dpi, lossless AVIF)
├── 📁 js/
│   ├── 📁 data/
│   │   └── 📄 certificates.data.js    # Single source of truth ('kompetisi', 'udemy', 'codepolitan')
│   └── 📁 modules/
│       ├── 📄 certificates.js         # Filter render, dynamic badge counter, dan modal lightbox
│       └── 📄 contact.js              # WhatsApp direct message generator & form validation
├── 📁 src/components/
│   ├── 📄 certificates.html           # Komponen HTML section + filter tabs + modal overlay
│   └── 📄 contact.html                # Form kontak interaktif dengan icon WhatsApp resmi
└── 📄 index.html                      # Hasil build injeksi komponen modular
```

---

### 3. 🎨 Fitur Interaktif & Pengalaman Pengguna (UI/UX)

1. **Filter Tabs Interaktif**:
   - **All (10)**: Menampilkan seluruh sertifikat dengan pagination adaptif.
   - **Kompetisi (1)**: Filter khusus sertifikat hackathon dengan aksen warna amber/emas.
   - **Udemy (3)**: Kursus spesialisasi intensif dengan aksen ungu/fuchsia.
   - **Codepolitan (6)**: Sertifikasi pemrograman web dasar & Git dengan aksen emerald.
2. **Dynamic Pagination & Counter**:
   - Limit awal 3 kartu dengan tombol interaktif *"Lihat Sertifikat Lainnya (+N)"* / *"Tampilkan Lebih Sedikit"*.
3. **Modal Lightbox Resolusi Penuh**:
   - Preview pop-up fullscreen tanpa crop (`object-contain`), backdrop blur, badge platform, dan navigasi escape key.
4. **Form Kontak WhatsApp Terstruktur**:
   - Pesan WhatsApp otomatis diformat rapi mencakup Nama, Email, Subjek, dan Isi Pesan dengan divider modern.
   - Menggunakan icon WhatsApp resmi dari aset internal (`assets/icons/social/whatsapp.svg`).
5. **Google Analytics 4 Terintegrasi**:
   - Menggunakan tracking ID `G-RFQHPC5GQG` untuk analitik pengunjung real-time.

---

## 🚀 Getting Started

### 1. Prasyarat (*Prerequisites*)
Pastikan Anda telah menginstal:
* [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru)
* [NPM](https://www.npmjs.com/)

### 2. Kloning Repositori
```bash
git clone https://github.com/RayhanDev9/portfolio-v3.git
cd portfolio-v3
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Menjalankan Development Server
```bash
npm run dev
```
Buka browser di `http://localhost:5173` untuk melihat tampilan website secara lokal dengan fitur Hot Module Replacement (HMR).

### 5. Build untuk Production
```bash
npm run build
```
Perintah ini akan mengompilasi CSS Tailwind dan mem-bundle seluruh komponen HTML ke dalam folder `dist/` yang siap dideploy.

### 6. Konversi Gambar Otomatis ke AVIF (Opsional)
```bash
npm run convert:avif
```

---

## 📬 Contact & Socials

* **Website**: [rayhandev.my.id](https://rayhandev.my.id/)
* **Email**: [m.rayhanoi26@gmail.com](mailto:m.rayhanoi26@gmail.com)
* **GitHub**: [@RayhanDev9](https://github.com/RayhanDev9)
* **Instagram**: [@m.rayhanoi26](https://www.instagram.com/m.rayhanoi26)
* **WhatsApp**: [+62 856-9209-7048](https://wa.me/6285692097048)

---

<div align="center">
  <sub>Designed & Developed with ❤️ by <b>Muhamad Rayhan</b>. Released under the <a href="LICENSE">MIT License</a>.</sub>
</div>
