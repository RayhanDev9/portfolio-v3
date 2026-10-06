# Rencana Fitur: Tampilan Nama Skill saat Hover (Portfolio-v3)

Dokumen ini berisi rencana teknis dan desain untuk menampilkan nama skill saat kursor diarahkan (*hover*) ke masing-masing icon skill pada carousel portofolio.

---

## 1. Analisis Kebutuhan & Masalah Teknis

### A. Kondisi Saat Ini
Saat ini pada `js/script.js`, elemen logo skill dirender sebagai berikut:
```html
<div class="item-logo h-12 w-24 md:h-16 md:w-32 shrink-0 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl p-3">
  <img src="${skill.src}" alt="${skill.name}" class="h-full object-contain max-w-full" />
</div>
```
- Pengunjung tidak mengetahui nama teknologi dari beberapa icon yang bentuknya abstrak (seperti Vite, Axios, TanStack Query, Framer Motion) kecuali membuka inspect element.

### B. Tantangan Teknis (Overflow Clipping)
Container carousel di `index.html` menggunakan `overflow-hidden`:
```html
<div class="carousel w-full overflow-hidden">
  <div class="track ...">...</div>
</div>
```
Jika kita membuat tooltip melayang di atas card (`-top-10`), ada risiko tooltip **terpotong (*clipped*)** oleh `overflow-hidden` jika tidak diberi ruang vertikal yang cukup.
**Solusi:** Menambahkan padding vertikal (misalnya `py-6 -my-2` atau `py-5`) pada container/track carousel agar tooltip memiliki ruang melayang tanpa terpotong batas container.

---

## 2. Pilihan Desain Tampilan Nama Skill

### Opsi 1: Modern Floating Glassmorphism Tooltip (Sangat Direkomendasikan ⭐)
- **Konsep:** Saat kartu di-hover, muncul balon tooltip melayang di atas kartu dengan efek kaca gelap (*dark glassmorphism*), teks putih tajam, border subtle, dan panah segitiga (*caret*).
- **Animasi Halus:** Transisi lembut (*fade-in + slide-up + scale*) dalam 200–300ms.
- **Micro-Interaction:** Icon di dalam card membesar halus (`scale-105`), dan border card berubah menjadi glow ungu (`border-purple-500/40`).
- **Aksesibilitas:** Menambahkan atribut `title="${skill.name}"` untuk screen-reader dan SEO.

**Struktur Kode Opsi 1:**
```html
<div class="item-logo group/skill relative h-12 w-24 md:h-16 md:w-32 shrink-0 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl p-3 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer" title="${skill.name}">
  
  <!-- Icon Logo -->
  <img src="${skill.src}" alt="${skill.name}" class="h-full object-contain max-w-full transition-transform duration-300 group-hover/skill:scale-110" />

  <!-- Floating Tooltip -->
  <div class="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 scale-90 group-hover/skill:opacity-100 group-hover/skill:scale-100 group-hover/skill:-top-11 transition-all duration-200 ease-out z-30">
    <div class="px-2.5 py-1 text-xs font-medium text-white bg-gray-900/95 border border-white/15 rounded-md shadow-xl backdrop-blur-md whitespace-nowrap">
      ${skill.name}
    </div>
    <!-- Panah Segitiga Bawah -->
    <div class="w-0 h-0 mx-auto border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900/95"></div>
  </div>
</div>
```

---

### Opsi 2: Bottom Label Overlay (Di Bawah Icon)
- **Konsep:** Nama skill muncul melayang di bawah kartu (`-bottom-9`).
- **Kelebihan:** Tidak menabrak track project di bawahnya jika jarak antar baris carousel cukup lebar.

---

### Opsi 3: Native Browser Tooltip
- **Konsep:** Hanya menambahkan atribut `title="${skill.name}"` pada elemen `<div>` atau `<img>`.
- **Kelebihan:** Sangat mudah tanpa penambahan styling.
- **Kekurangan:** Munculnya lambat (ada delay 1-2 detik bawaan browser), tampilan kaku dan tidak modern.

---

## 3. Rencana Perubahan Kode (Menggunakan Opsi 1)

### 1. Berkas: `index.html`
- Pada bagian `#skill-project`, beri padding vertikal pada carousel skill:
  ```html
  <div class="carousel w-full overflow-hidden py-6 -my-2">
    <div class="track ..."></div>
  </div>
  ```

### 2. Berkas: `js/script.js`
- Pada fungsi `renderCarouselTracks()`, perbarui template string rendering `tracks[0]` (Track Skill) dengan Opsi 1 yang dilengkapi:
  - Kelas `group/skill relative`
  - Floating Tooltip dengan nama `${skill.name}`
  - Panah segitiga subtle
  - Efek hover glow & zoom pada logo

---

## 4. Tahapan Eksekusi (Action Checklist)

- [x] **Langkah 1**: Update container carousel skill di `index.html` dengan padding vertikal agar tooltip bebas melayang tanpa terpotong.
- [x] **Langkah 2**: Update template generator `tracks[0]` di `js/script.js` untuk menyisipkan elemen floating tooltip.
- [x] **Langkah 3**: Jalankan `npm run build` untuk memastikan semua kelas Tailwind terkompilasi.
- [x] **Langkah 4**: Uji coba visual di browser untuk memastikan tooltip muncul mulus saat di-hover dan teks tidak terpotong.
- [x] **Langkah 5**: Lakukan git commit dan push ke GitHub.
