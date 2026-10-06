# 🚀 Portfolio Architecture & Codebase Refactoring Plan

Dokumen ini berisi rencana strategis (*blueprint plan*) untuk merapikan dan menstandarisasi struktur folder serta arsitektur kode **Portfolio v3** (`rayhandev.my.id`) agar memenuhi standar **Enterprise / Senior Front-End Developer**.

---

## 1. Evaluasi Struktur Saat Ini vs Target Profesional

### A. Kondisi Saat Ini (Current State)
Saat ini proyek berjalan dengan baik, namun struktur file masih memiliki beberapa karakteristik yang bisa ditingkatkan:
* **Script Utilitas Mengambang di Root**: `convert-to-avif.js` berada langsung di root folder bersama file konfigurasi.
* **JavaScript Monolitik (780+ Baris)**: Seluruh data (project, skills, journey), DOM rendering, event listeners, form handling, dan animasi berada dalam satu file `js/script.js`.
* **Penamaan Folder Aset Tunggal (*Singular*)**: Menggunakan `asset/` alih-alih konvensi standar industri `assets/`.
* **Typo pada Nama Aset**: `asset/svg/peploe.svg` (seharusnya `people.svg`).
* **Pencampuran Data & Presentasi**: Data proyek dan keahlian di-hardcode di dalam fungsi rendering JavaScript.

```text
📁 portfolio-v3/ (Kondisi Saat Ini)
├── 📄 CNAME
├── 📄 README.md
├── 📄 convert-to-avif.js          <-- Script utilitas di root
├── 📄 googlead7f7ffb81753b79.html
├── 📄 index.html
├── 📄 package.json
├── 📄 robots.txt
├── 📄 sitemap.xml
├── 📁 asset/                     <-- Singular naming
│   ├── 📁 img/
│   │   ├── 📁 profile/
│   │   └── 📁 project/
│   └── 📁 svg/
│       ├── 📄 location.svg
│       ├── 📄 peploe.svg         <-- Typo nama file
│       ├── 📁 skill/
│       └── 📁 social-media/
├── 📁 css/
│   └── 📄 output.css
├── 📁 js/
│   └── 📄 script.js              <-- Monolitik (780 baris: Data + Logic + DOM)
└── 📁 src/
    └── 📄 input.css
```

---

### B. Target Struktur Profesional (Target State)
Struktur yang modular, bersih, mudah dimaintain, dan memisahkan antara **Data**, **Logic**, **Styles**, dan **Assets**:

```text
📁 portfolio-v3/ (Target Profesional)
├── 📁 .github/                   # (Opsional) CI/CD Automation
│   └── 📁 workflows/
│       └── 📄 deploy.yml
│
├── 📁 assets/                    # Konvensi standar industri (plural)
│   ├── 📁 icons/                 # Ikon SVG terorganisir
│   │   ├── 📁 tech/              # Logo skill & tech stack (21 SVGs)
│   │   ├── 📁 social/            # Ikon social media
│   │   └── 📁 ui/                # Ikon antarmuka (location.svg, people.svg, dll.)
│   └── 📁 images/                # Gambar raster / format AVIF
│       ├── 📁 profile/           # Foto profil personal
│       └── 📁 projects/          # Screenshot showcase karya
│
├── 📁 css/                       # Output bundle hasil kompilasi
│   └── 📄 output.css
│
├── 📁 js/                        # Modular ES6 Architecture (Clean Code)
│   ├── 📄 main.js                # App Bootstrap / Entrypoint utama
│   │
│   ├── 📁 data/                  # Single Source of Truth (Mudah di-update)
│   │   ├── 📄 projects.data.js   # Daftar showcase proyek & metadata collab
│   │   ├── 📄 skills.data.js     # Kategori & daftar keahlian
│   │   └── 📄 journey.data.js    # Data timeline pengalaman & pendidikan
│   │
│   └── 📁 modules/               # Modul UI & Fitur Terpisah (Single Responsibility)
│       ├── 📄 navigation.js      # Active link scroll, navbar desktop & mobile
│       ├── 📄 projects.js        # Filter kategori & rendering kartu proyek
│       ├── 📄 skills.js          # Rendering kartu bento keahlian
│       ├── 📄 contact.js         # Form handling & validasi pesan
│       └── 📄 animations.js      # Scroll reveal, observer, efek interaktif
│
├── 📁 scripts/                   # Utility & automation scripts
│   └── 📄 convert-to-avif.js     # Script kompresi gambar Sharp
│
├── 📁 src/                       # Source stylesheet
│   └── 📄 input.css              # Custom Tailwind CSS rules & base styles
│
├── 📄 .gitignore
├── 📄 CNAME                      # Custom domain (rayhandev.my.id)
├── 📄 googlead7f7ffb81753b79.html
├── 📄 index.html                 # Struktur semantik HTML
├── 📄 package.json               # Config & NPM build scripts
├── 📄 package-lock.json
├── 📄 robots.txt                 # Konfigurasi perayap search engine
├── 📄 sitemap.xml                # SEO sitemap
└── 📄 README.md                  # Dokumentasi arsitektur proyek
```

---

## 2. Analisis Keuntungan Refaktorisasi

| Aspek | Sebelum Refaktorisasi | Sesudah Refaktorisasi | Dampak Positif |
| :--- | :--- | :--- | :--- |
| **Maintainability** | Edit 1 fitur harus membuka file 780 baris | Modul terisolasi per fitur (50–120 baris/file) | Mengurangi risiko konflik kode (*merge conflict*) & bug |
| **Update Konten** | Tambah proyek baru harus mengedit kode render | Cukup tambah objek di `projects.data.js` | Sangat cepat menambah karya baru tanpa sentuh DOM |
| **Keterbacaan (Clean Code)** | File script campur aduk | Menerapkan prinsip *Single Responsibility Principle* | Menunjukkan kedewasaan arsitektur kode ke recruiter |
| **Konsistensi Aset** | Nama singular & folder berserak | Standar plural `assets/icons/` & `assets/images/` | Memudahkan optimasi dan manajemen aset web |
| **Struktur Root** | Script build bercampur dengan config | Root bersih, utilitas masuk folder `scripts/` | Standar repositori open-source kelas atas |

---

## 3. Rencana Eksekusi Bertahap (Safe Migration Roadmap)

Karena situs ini sudah aktif secara langsung (*production*) di domain `rayhandev.my.id` melalui GitHub Pages, refaktorisasi wajib dilakukan secara **aman tanpa merusak jalur aset (*zero 404 broken links*)**.

### 🔹 Fase 1: Pembersihan Root & Folder Scripts
1. Buat folder `scripts/`.
2. Pindahkan `convert-to-avif.js` ke dalam `scripts/convert-to-avif.js`.
3. Sesuaikan script di `package.json`:
   ```json
   "scripts": {
     "dev": "tailwindcss -i ./src/input.css -o ./css/output.css --watch",
     "build": "tailwindcss -i ./src/input.css -o ./css/output.css --minify",
     "convert:avif": "node scripts/convert-to-avif.js",
     "convert:avif:clean": "node scripts/convert-to-avif.js --delete-source"
   }
   ```
4. Pastikan path `TARGET_DIR` di dalam `scripts/convert-to-avif.js` tetap akurat.

---

### 🔹 Fase 2: Modularisasi JavaScript (ES6 Modules)
Pisahkan `js/script.js` menjadi struktur modular berbasis ES6:

1. **Folder `js/data/`**:
   * `projects.data.js`: Berisi array `projectsData` (termasuk tag `collab`, `role`, link, dan screenshot).
   * `skills.data.js`: Berisi array `skillCategories` (3 kategori rapi).
   * `journey.data.js`: Berisi array timeline `journeyData`.

2. **Folder `js/modules/`**:
   * `navigation.js`: Mengatur scrollspy active nav, smooth scroll, dan mobile drawer toggle.
   * `projects.js`: Mengatur render grid kartu proyek dan filter klik (`all`, `app`, `landing`, `interactive`).
   * `skills.js`: Mengatur render kartu keahlian.
   * `contact.js`: Mengatur submit contact form dan notifikasi.
   * `animations.js`: Mengatur `IntersectionObserver` untuk animasi reveal dan scroll loop.

3. **File `js/main.js`**:
   * Mengimpor dan menginisialisasi modul setelah event `DOMContentLoaded`:
   ```javascript
   import { initNavigation } from './modules/navigation.js';
   import { initSkills } from './modules/skills.js';
   import { initProjects } from './modules/projects.js';
   import { initContact } from './modules/contact.js';
   import { initAnimations } from './modules/animations.js';

   document.addEventListener('DOMContentLoaded', () => {
     initNavigation();
     initSkills();
     initProjects();
     initContact();
     initAnimations();
   });
   ```

4. **Update `index.html`**:
   Ganti tag script menjadi:
   ```html
   <script type="module" src="js/main.js"></script>
   ```

---

### 🔹 Fase 3: Restrukturisasi Folder Aset & Migrasi Path
1. Buat struktur folder baru di bawah `assets/`:
   * `assets/images/profile/` & `assets/images/projects/`
   * `assets/icons/tech/`, `assets/icons/social/`, `assets/icons/ui/`
2. Pindahkan file aset dari `asset/` ke `assets/`.
3. Perbaiki nama typo: `asset/svg/peploe.svg` ➔ `assets/icons/ui/people.svg`.
4. Lakukan pembaruan path referensi di:
   * `index.html` (gambar profil, favicon, ikon).
   * `js/data/projects.data.js` (thumbnail proyek).
   * `js/data/skills.data.js` (ikon skill SVG).
   * `scripts/convert-to-avif.js` (target directory).

---

### 🔹 Fase 4: Pengujian & Build Validasi
1. Jalankan `npm run build` untuk memvalidasi Tailwind CSS bundle.
2. Uji fungsionalitas lokal:
   * [ ] Seluruh gambar thumbnail proyek dan profil termuat sempurna (tidak ada 404).
   * [ ] Seluruh filter proyek (`All`, `Web Apps`, `Landing & Profile`, `Games & Logic`) berjalan mulus.
   * [ ] Fitur navigasi desktop & mobile drawer berfungsi normal.
   * [ ] Contact form event berjalan lancar.
3. Commit dan push perubahan terstruktur ke branch `main`.

---

## 4. Status Implementasi

- [ ] **Fase 1**: Relokasi Script Utilitas ke `scripts/`
- [ ] **Fase 2**: Pemisahan Data & Modul ES6 JavaScript
- [ ] **Fase 3**: Standarisasi Folder `assets/` & Audit Path
- [ ] **Fase 4**: Verifikasi Akhir & Production Release

---
*Dokumen ini diperbarui secara berkala sebagai panduan resmi peningkatan kualitas kode RayhanDev Portfolio.*
