# Rencana Perbaikan: Teks Project Tajam & Pemisahan Hover Pause Carousel (Portfolio-v3)

Dokumen ini berisi analisis akar masalah dan rencana perbaikan terperinci untuk 2 kendala yang ditemukan pada portofolio.

---

## 1. Analisis & Akar Masalah

### Kendala 1: Teks Project Ikut Buram Saat Hover
- **Gejala:** Saat kartu project di-hover, teks judul, deskripsi, dan badge skill terlihat kabur (*fuzzy/blurry*) dan tidak tajam.
- **Akar Masalah Teknis:**
  1. **`backdrop-blur-[2px]` pada container teks:** Filter `backdrop-filter: blur(...)` pada Chromium/browser memaksa seluruh elemen anak (termasuk teks) masuk ke layer rasterisasi komposit GPU, yang sering merusak *subpixel font rendering*.
  2. **Subpixel Transform (`translate-y-3` ke `translate-y-0`):** Transformasi vertikal pada teks ukuran kecil (`text-[11px]`, `text-xs`) menyebabkan teks berhenti di koordinat piksel pecahan (*fractional pixel*), sehingga huruf tampak buram.
  3. **Gradien kurang kontras:** Gradien sebelumnya (`to-transparent/20`) membiarkan detail gambar di belakang teks tetap tembus, mengurangi ketajaman kontras tulisan.

- **Solusi Perbaikan:**
  1. Hapus `backdrop-blur-[2px]` dari container teks.
  2. Gunakan gradien gelap solid beresolusi tinggi: `bg-gradient-to-t from-gray-950 via-gray-950/95 to-transparent` agar latar belakang teks gelap pekat dan kontras 100% tanpa efek blur GPU.
  3. Hindari *fractional transform* pada teks, gunakan transisi opasitas murni (`transition-opacity duration-300`) atau `transform-none` dengan `-webkit-font-smoothing: antialiased`.
  4. Tingkatkan warna teks deskripsi dari `text-gray-300` menjadi `text-gray-200` atau `text-white/90` agar sangat tajam dan mudah dibaca.

---

### Kendala 2: Carousel Skill & Project Berhenti Bersamaan Saat Di-Hover
- **Gejala:** Ketika kursor diarahkan ke icon skill, track project di bawahnya ikut berhenti. Sebaliknya, saat project di-hover, track skill di atasnya ikut berhenti.
- **Akar Masalah Teknis:**
  Di [index.html](index.html#L434), kelas `group` diletakkan di elemen induk section:
  ```html
  <section id="skill-project" class="py-24 overflow-hidden group">
    <!-- Track 1 Skill -->
    <div class="track ... group-hover:[animation-play-state:paused]"></div>
    
    <!-- Track 2 Project -->
    <div class="track ... group-hover:[animation-play-state:paused]"></div>
  </section>
  ```
  Karena kedua track mendengarkan `group-hover` dari section yang sama, maka hover di area mana pun di section tersebut akan menghentikan **kedua track secara bersamaan**.

- **Solusi Perbaikan:**
  Pisahkan kontrol hover dengan **Named Groups** Tailwind CSS (`group/skills` dan `group/projects`) di masing-masing kontainer carousel:
  1. Hapus `group` dari `<section id="skill-project">`.
  2. Berikan `group/skills` pada carousel skill, dan pasang `group-hover/skills:[animation-play-state:paused]` pada track skill.
  3. Berikan `group/projects` pada carousel project, dan pasang `group-hover/projects:[animation-play-state:paused]` pada track project.
  4. **Hasilnya:** Hover pada skill hanya menghentikan carousel skill (project tetap jalan). Hover pada project hanya menghentikan carousel project (skill tetap jalan).

---

## 2. Rencana Perubahan Kode

### A. Berkas `index.html`
Perbarui markup bagian `#skill-project`:
```html
<!-- SEBELUM: -->
<section id="skill-project" class="py-24 overflow-hidden group">
  ...
  <div class="carousel w-full overflow-hidden py-6 -my-2">
    <div class="track ... group-hover:[animation-play-state:paused]"></div>
  </div>
  <div class="carousel w-full overflow-hidden">
    <div class="track ... group-hover:[animation-play-state:paused]"></div>
  </div>
</section>

<!-- SESUDAH: -->
<section id="skill-project" class="py-24 overflow-hidden">
  ...
  <!-- Track 1: Skill Carousel (Hanya berhenti jika skill di-hover) -->
  <div class="carousel group/skills w-full overflow-hidden py-6 -my-2">
    <div class="track flex gap-6 w-max px-4 animate-marquee-reverse group-hover/skills:[animation-play-state:paused]"></div>
  </div>

  <!-- Track 2: Project Carousel (Hanya berhenti jika project di-hover) -->
  <div class="carousel group/projects w-full overflow-hidden">
    <div class="track flex gap-4 w-max px-4 animate-marquee group-hover/projects:[animation-play-state:paused]"></div>
  </div>
</section>
```

---

### B. Berkas `js/script.js`
Perbarui template markup rendering `tracks[1]` (Track Project):
```html
<div class="item group/proj relative h-52 sm:h-64 md:h-72 w-[280px] sm:w-[380px] md:w-[460px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-xl">
  <a href="${project.url}" target="_blank" class="block w-full h-full relative" title="${project.title}">
    <!-- Thumbnail Image -->
    <img src="${project.img}" alt="${project.alt}" class="w-full h-full object-cover aspect-[16/9] transition-transform duration-500 ease-out group-hover/proj:scale-105" />

    <!-- Sharp Solid Gradient Overlay (Tanpa backdrop-blur, Teks 100% Tajam) -->
    <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover/proj:opacity-100 transition-opacity duration-300">
      <div class="antialiased">
        <!-- Title & Icon -->
        <div class="flex items-center justify-between mb-1.5">
          <h4 class="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide truncate pr-2">${project.title}</h4>
          <span class="p-1 sm:p-1.5 rounded-full bg-white/10 text-white/90 shrink-0 group-hover/proj:bg-purple-600 transition-colors duration-200">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </span>
        </div>

        <!-- Description (Teks Kontras Tinggi & Bersih) -->
        <p class="text-[11px] sm:text-xs md:text-sm text-gray-200 line-clamp-2 mb-2 sm:mb-3 leading-relaxed">${project.description}</p>
        
        <!-- Skill Badges -->
        <div class="flex flex-wrap gap-1 sm:gap-1.5">
          ${project.skills.map((s) => `<span class="px-2 py-0.5 text-[9px] sm:text-[11px] font-medium rounded-md bg-purple-500/25 text-purple-200 border border-purple-500/40 whitespace-nowrap">${s}</span>`).join("")}
        </div>
      </div>
    </div>
  </a>
</div>
```

---

## 3. Tahapan Eksekusi (Action Checklist)

- [x] **Langkah 1**: Perbarui `index.html` untuk memisahkan hover pause antara carousel skill (`group/skills`) dan project (`group/projects`).
- [x] **Langkah 2**: Perbarui `js/script.js` untuk menghilangkan `backdrop-blur` dan subpixel transform pada overlay project, menggantinya dengan gradien pekat kontras tinggi dan rendering antialiased yang tajam.
- [x] **Langkah 3**: Jalankan `npm run build` untuk mengompilasi utility Tailwind CSS.
- [x] **Langkah 4**: Uji coba visual di browser untuk memastikan:
  - Teks project terlihat sangat tajam tanpa ada efek buram.
  - Hover pada skill hanya menghentikan skill (project tetap jalan).
  - Hover pada project hanya menghentikan project (skill tetap jalan).
- [x] **Langkah 5**: Lakukan git commit dan push ke GitHub.
