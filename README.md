# Rencana Pembaruan Skill Portofolio (Portfolio-v3)

Dokumen ini berisi rencana komprehensif untuk menyelaraskan keahlian yang ditampilkan pada portofolio dengan keahlian nyata yang telah dipelajari dan dibangun di GitHub ([RayhanDev9](https://github.com/RayhanDev9)), dengan tetap mempertahankan teknologi lama sebagai jejak pencapaian.

---

## 1. Prinsip & Batasan Pembaruan
- **Teknologi Lama Tetap Dipertahankan**: Semua 10 skill awal (HTML, CSS, JS, Tailwind, Git, GitHub, Sass, JSON, jQuery, Bootstrap 4) tetap ada sebagai catatan perjalanan dan pencapaian.
- **Keluarga PHP / Laravel Ditiadakan**: Tidak menyertakan PHP, Laravel, atau Sanctum.
- **Backend Eksperimental & Next.js Ditiadakan**: Tidak menyertakan Bun, Elysia, Drizzle, maupun Next.js.
- **Fokus Keahlian**: Front-End Modern, Ekosistem React, TypeScript Lanjutan, State Management, Tools Modern, dan Fondasi Algoritma.

---

## 2. Pemetaan Skill (Lama + Baru)

### A. Skill Lama yang Dipertahankan (10 Skill)
| No | Nama Skill | Path Icon | Status |
|:---|:---|:---|:---|
| 1 | HTML | `asset/svg/skill/html-5.svg` | Tersedia |
| 2 | CSS | `asset/svg/skill/css-3.svg` | Tersedia |
| 3 | JS | `asset/svg/skill/javascript.svg` | Tersedia |
| 4 | Tailwind | `asset/svg/skill/tailwind.svg` | Tersedia |
| 5 | Git | `asset/svg/skill/git.svg` | Tersedia |
| 6 | GitHub | `asset/svg/skill/github.svg` | Tersedia |
| 7 | Sass | `asset/svg/skill/sass.svg` | Tersedia |
| 8 | Json | `asset/svg/skill/json.svg` | Tersedia |
| 9 | Jquery | `asset/svg/skill/jquery.svg` | Tersedia |
| 10 | Bootstrap-4 | `asset/svg/skill/bootstrap-4.svg` | Tersedia |

### B. Skill Baru yang Akan Ditambahkan (9 Skill)
| No | Nama Skill | Bukti Nyata di Repositori | Rencana File Icon |
|:---|:---|:---|:---|
| 11 | **React** | `fast-pizza`, `portfolio-danu`, `siap-kerja`, `materi-belajar/react` | `asset/svg/skill/react.svg` |
| 12 | **TypeScript** | `portfolio-danu` (`tsc -b`), repo `typescript`, `materi-belajar/typescript` | `asset/svg/skill/typescript.svg` |
| 13 | **Redux Toolkit** | `fast-pizza`, `siap-kerja` (`@reduxjs/toolkit`) | `asset/svg/skill/redux.svg` |
| 14 | **React Query** | `materi-belajar/react/react-query` (TanStack Query) | `asset/svg/skill/react-query.svg` |
| 15 | **React Router** | `fast-pizza`, `materi-belajar/react/react-router` | `asset/svg/skill/react-router.svg` |
| 16 | **Vite** | Build tool di `fast-pizza`, `portfolio-danu`, `siap-kerja` | `asset/svg/skill/vite.svg` |
| 17 | **Framer Motion** | Animasi di `siap-kerja` (`framer-motion`) | `asset/svg/skill/framer-motion.svg` |
| 18 | **Axios** | `materi-belajar/ajax/library-axios.html`, `react-query` utils | `asset/svg/skill/axios.svg` |
| 19 | **C++** | `materi-belajar/c++` (Fondasi logika & algoritma) | `asset/svg/skill/cplusplus.svg` |

---

## 3. Rencana Perubahan Berkas

### 1. `asset/svg/skill/`
Menambahkan 9 berkas SVG resmi beresolusi tajam dan teroptimasi:
- `react.svg`
- `typescript.svg`
- `redux.svg`
- `react-query.svg`
- `react-router.svg`
- `vite.svg`
- `framer-motion.svg`
- `axios.svg`
- `cplusplus.svg`

### 2. `js/script.js`
Memperbarui array `skillsData` di fungsi `skillProjectSection()` agar memuat seluruh 19 skill:
```javascript
const skillsData = [
  // Fondasi & Teknologi Awal
  { name: "HTML", src: "asset/svg/skill/html-5.svg" },
  { name: "CSS", src: "asset/svg/skill/css-3.svg" },
  { name: "JS", src: "asset/svg/skill/javascript.svg" },
  { name: "Bootstrap-4", src: "asset/svg/skill/bootstrap-4.svg" },
  { name: "Sass", src: "asset/svg/skill/sass.svg" },
  { name: "Jquery", src: "asset/svg/skill/jquery.svg" },
  { name: "Json", src: "asset/svg/skill/json.svg" },
  { name: "C++", src: "asset/svg/skill/cplusplus.svg" },
  { name: "Git", src: "asset/svg/skill/git.svg" },
  { name: "GitHub", src: "asset/svg/skill/github.svg" },

  // Ekosistem Modern & Tingkat Lanjut
  { name: "Tailwind", src: "asset/svg/skill/tailwind.svg" },
  { name: "TypeScript", src: "asset/svg/skill/typescript.svg" },
  { name: "React", src: "asset/svg/skill/react.svg" },
  { name: "Redux", src: "asset/svg/skill/redux.svg" },
  { name: "React Query", src: "asset/svg/skill/react-query.svg" },
  { name: "React Router", src: "asset/svg/skill/react-router.svg" },
  { name: "Vite", src: "asset/svg/skill/vite.svg" },
  { name: "Framer Motion", src: "asset/svg/skill/framer-motion.svg" },
  { name: "Axios", src: "asset/svg/skill/axios.svg" },
];
```

### 3. `index.html`
- **Journey Section (2026)**:
  - Memperbarui deskripsi pencapaian 2026 agar lebih mencerminkan produksi nyata:
    - *Dari*: *"Enhancing front-end skills with React.js and Figma."*
    - *Menjadi*: *"Building production-ready web apps with React.js, TypeScript, Redux Toolkit, TanStack Query, and Framer Motion."*
- **About Section**:
  - Memperhalus deskripsi singkat agar menonjolkan spesialisasi Front-End Modern (React & TypeScript).

---

## 4. Tahapan Eksekusi (Action Checklist)

- [x] **Langkah 1**: Buat 9 berkas icon SVG baru di folder `asset/svg/skill/`.
- [x] **Langkah 2**: Perbarui array `skillsData` di `js/script.js`.
- [x] **Langkah 3**: Perbarui teks deskripsi tahun 2026 dan about di `index.html`.
- [x] **Langkah 4**: Uji visual dan kelancaran build CSS Tailwind.
- [x] **Langkah 5**: Lakukan git commit dan push ke GitHub.
