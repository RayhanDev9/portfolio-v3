# Rencana Pengembangan: Penambahan Detail Project & Kontribusi Skill (Portfolio-v3)

Dokumen ini berisi rencana komprehensif untuk meningkatkan bagian **Project Carousel** agar setiap project memiliki identitas yang jelas: **apa fungsi proyek tersebut**, serta **skill dan peran apa saja yang Anda kontribusikan** dalam pembuatannya.

---

## 1. Analisis Kebutuhan

### Kondisi Saat Ini
- Di [js/script.js](js/script.js), data project hanya berisi `url`, `img`, dan `alt`:
  ```javascript
  {
    url: "https://rayhandev9.github.io/fast-pizza/menu",
    img: "asset/img/project/fast-pizza.avif",
    alt: "Fast Pizza"
  }
  ```
- Di layar, pengunjung hanya melihat gambar yang meluncur pada carousel. Pengunjung (terutama recruiter/klien) **tidak mengetahui**:
  1. Web/aplikasi tersebut dibuat untuk apa (*problem statement & features*).
  2. Teknologi apa saja yang dipakai.
  3. Bagian mana yang dikerjakan oleh Anda (*your role & contribution*).

### Tujuan Peningkatan
- Setiap kartu project memberikan informasi instan dan jelas mengenai **nama**, **tujuan proyek**, dan **tag skill/teknologi** yang Anda gunakan.
- Portofolio beralih dari sekadar *"galeri screenshot"* menjadi *"portofolio rekayasa web yang profesional"*.

---

## 2. Inventaris Data Project (9 Project Lengkap)

Berikut adalah pemetaan data detail untuk masing-masing proyek yang akan dimasukkan ke dalam `projectsData`:

| No | Project | Kategori | Deskripsi Proyek (*Apa Proyek Ini?*) | Skill / Kontribusi Anda |
|:---|:---|:---|:---|:---|
| 1 | **Fast React Pizza** | Web App / E-Commerce | Aplikasi restoran interaktif untuk eksplorasi menu, pemesanan pizza real-time, dan manajemen keranjang belanja. | `React 18`, `Redux Toolkit`, `React Router`, `Tailwind CSS`, `Vite` |
| 2 | **Siap Kerja** | Web Platform / AI | Platform karier & persiapan kerja dengan pengalaman UI interaktif dan integrasi kecerdasan buatan (LLM). | `React`, `Redux Toolkit`, `Google Gemini AI SDK`, `Framer Motion`, `Headless UI`, `Vite` |
| 3 | **Danu Satya Portfolio** | Client Portfolio (Live) | Website portofolio resmi production untuk seorang Graphic & Simple Motion Designer profesional. | `React 19`, `TypeScript`, `Tailwind CSS v4`, `Lucide Icons`, `Vite`, `Responsive UI` |
| 4 | **TK Permata Belajar** | School Profile (Live) | Website profil institusi pendidikan anak usia dini resmi dengan custom domain aktif (`permatabelajar.my.id`). | `Front-End Architecture`, `HTML5/CSS3`, `Vanilla JS`, `Mobile First`, `SEO & Deployment` |
| 5 | **Mading Kampus** | Portal Informasi | Web portal digital majalah dinding kampus untuk publikasi artikel, pengumuman, dan berita mahasiswa. | `Tailwind CSS`, `HTML5 Semantic`, `JavaScript`, `Card Grid Layout`, `Responsive Design` |
| 6 | **Store Radeva** | Landing Page Catalog | Landing page katalog toko online modern dengan etalase produk dan navigasi responsif. | `Modern CSS Layout`, `Flexbox/Grid`, `JavaScript DOM`, `Interactive UI` |
| 7 | **Company Profile ISC** | Corporate Web | Website profil perusahaan untuk menampilkan identitas bisnis, layanan, dan saluran kontak resmi. | `Semantic Markup`, `Responsive Web Design`, `CSS Animation`, `Clean Architecture` |
| 8 | **Pig Game** | Interactive Web Game | Game dadu 2 pemain berbasis logika giliran pemain (*turn-based state*) hingga mencapai target 100 poin. | `JavaScript Game Logic`, `State Management (Vanilla)`, `DOM Manipulation`, `CSS Transition` |
| 9 | **First Portfolio** | Personal Website | Rekam jejak portofolio pertama sebagai fondasi awal perjalanan pembelajaran web development. | `HTML5`, `CSS3`, `Flexbox`, `JavaScript Dasar` |

---

## 3. Pilihan Pendekatan Desain UI / UX

### Opsi A: Modern Glassmorphism Hover Overlay (Sangat Direkomendasikan ⭐)
- **Mekanisme:**
  - Kartu di track carousel tetap berjalan otomatis dan berhenti saat di-hover (`group-hover:[animation-play-state:paused]`).
  - Saat kartu di-hover, muncul lapisan **Glassmorphism Overlay** gelap dari bawah dengan transisi *slide-up* dan *fade-in* yang halus:
    - **Header:** Nama Project + Ikon panah eksternal (`↗`).
    - **Deskripsi:** Ringkasan 1–2 kalimat yang padat dan informatif.
    - **Skill Badges:** Tag kecil berbentuk pill berisi skill yang Anda kontribusikan (misal: `React`, `TypeScript`, `Tailwind`).
    - **Aksi:** Tombol "Kunjungi Website ↗".
- **Kelebihan:**
  - Tidak merusak tata letak carousel yang sudah rapi dan elegan.
  - Sangat memukau (*visually stunning*) di desktop dan responsif di mobile.
  - Langsung menyajikan informasi tanpa perlu navigasi halaman baru.

---

### Opsi B: Interactive Project Detail Modal / Popup
- **Mekanisme:**
  - Di carousel hanya ada thumbnail + judul kecil.
  - Saat kartu diklik, browser membuka modal pop-up mewah di tengah layar:
    - Gambar project berukuran besar.
    - Deskripsi lengkap & tantangan teknis.
    - Daftar lengkap teknologi dan kontribusi spesifik.
    - Dua tombol aksi: "Live Demo ↗" dan "Source Code (jika ada) ↗".
- **Kelebihan:** Memberikan ruang penjelasan yang sangat mendalam layaknya studi kasus (*case study*).
- **Kekurangan:** Memerlukan klik ekstra bagi pengunjung yang hanya ingin membaca kilat.

---

### Opsi C: Hybrid (Hover Card Overlay + Modal Detail)
- Saat di-hover, muncul rangkuman cepat (Opsi A).
- Dilengkapi tombol "Detail Proyek" jika ingin membaca studi kasus di dalam modal (Opsi B).

---

## 4. Rencana Perubahan Kode (Menggunakan Opsi A)

### 1. File `js/script.js`
Perbarui array `projectsData` dengan metadata lengkap:
```javascript
const projectsData = [
  {
    title: "Fast React Pizza",
    description: "Aplikasi restoran pizza interaktif dengan live cart management dan routing SPA.",
    skills: ["React 18", "Redux Toolkit", "React Router", "Tailwind CSS", "Vite"],
    url: "https://rayhandev9.github.io/fast-pizza/menu",
    img: "asset/img/project/fast-pizza.avif",
    alt: "Fast Pizza",
  },
  {
    title: "Siap Kerja",
    description: "Platform karier interaktif dengan integrasi Generative AI dan animasi fluid.",
    skills: ["React", "Redux Toolkit", "Gemini AI", "Framer Motion", "Vite"],
    url: "https://rayhandev9.github.io/siap-kerja/#/landingPage",
    img: "asset/img/project/siap-kerja.avif",
    alt: "Siap Kerja",
  },
  // ... project lainnya
];
```

Perbarui template rendering `tracks[1]` (Track Project):
```html
<div class="item group/proj relative h-44 sm:h-56 md:h-72 w-[85vw] xs:w-[75vw] sm:w-[420px] md:w-[480px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-xl">
  <!-- Gambar Project -->
  <img src="${project.img}" alt="${project.alt}" class="w-full h-full object-cover aspect-[16/9] transition-transform duration-500 group-hover/proj:scale-105" />

  <!-- Glassmorphism Hover Overlay -->
  <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/85 to-transparent/30 p-5 flex flex-col justify-end opacity-0 group-hover/proj:opacity-100 transition-all duration-300">
    <div class="translate-y-4 group-hover/proj:translate-y-0 transition-transform duration-300">
      <div class="flex items-center justify-between mb-1.5">
        <h4 class="text-base sm:text-lg font-bold text-white tracking-wide">${project.title}</h4>
        <a href="${project.url}" target="_blank" class="p-1.5 rounded-full bg-white/10 hover:bg-purple-600 text-white transition-colors" title="Kunjungi Website">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
      <p class="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-3 leading-relaxed">${project.description}</p>
      
      <!-- Badges Skill -->
      <div class="flex flex-wrap gap-1.5">
        ${project.skills.map(s => `<span class="px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">${s}</span>`).join('')}
      </div>
    </div>
  </div>
</div>
```

---

## 5. Tahapan Eksekusi (Action Checklist)

- [x] **Langkah 1**: Perbarui struktur array `projectsData` di `js/script.js` dengan judul, deskripsi, dan array skill kontribusi.
- [x] **Langkah 2**: Perbarui template markup rendering `tracks[1]` di `js/script.js` untuk menyematkan overlay glassmorphism dan badge skill.
- [x] **Langkah 3**: Sesuaikan dimensi kartu carousel agar proporsional dan nyaman dibaca di layar HP maupun laptop.
- [x] **Langkah 4**: Jalankan `npm run build` untuk mengompilasi utility Tailwind CSS yang baru digunakan.
- [x] **Langkah 5**: Lakukan pengujian visual dan interaksi hover di browser.
- [x] **Langkah 6**: Lakukan git commit dan push ke GitHub.
