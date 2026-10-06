# Rencana Perbaikan: Tooltip Skill Utuh di Atas & Menghilangkan Teks Default di Dekat Kursor (Portfolio-v3)

Dokumen ini berisi analisis akar masalah dan rencana teknis terperinci untuk memperbaiki tampilan nama skill saat di-hover:
1. Memperbaiki tampilan tooltip kustom di atas kartu skill agar tampil **utuh dan tidak terpotong** oleh `overflow-hidden`.
2. Menghilangkan teks ganda bawaan browser yang muncul di dekat kursor mouse saat di-hover.

---

## 1. Analisis & Akar Masalah

Berdasarkan tangkapan layar (*screenshot*) yang dikirimkan, terdapat 2 hal yang terjadi:

### A. Masalah 1: Tooltip di Atas Terpotong (Hanya Kelihatan Ujung Bawah & Panah Segitiga)
- **Akar Masalah Teknis:**
  - Kontainer carousel di [index.html](index.html#L443) memiliki kelas `overflow-hidden` dengan padding vertikal `py-6` (padding atas hanya 24px):
    ```html
    <div class="carousel w-full overflow-hidden py-6 -my-2">
    ```
  - Pada [js/script.js](js/script.js#L461), elemen tooltip diposisikan melayang ke atas dengan kelas `-top-10` dan saat hover naik ke `-top-11` (-44px), ditambah tinggi kotak tooltip itu sendiri (~28px):
    ```html
    <div class="pointer-events-none rounded-2xl absolute -top-10 left-1/2 -translate-x-1/2 ... group-hover/skill:-top-11 ...">
      <div class="px-2.5 py-1 text-xs ...">${skill.name}</div>
      <div class="w-0 h-0 mx-auto border-t-4 ..."></div>
    </div>
    ```
  - **Penyebab Terpotong:**
    Puncak tooltip mencapai **~70px di atas kartu**, sedangkan batas ruang atas kontainer hanya **24px (`py-6`)**. Karena kontainer memiliki `overflow-hidden`, browser secara otomatis memotong (*clipping*) bagian atas tooltip yang melebihi 24px tersebut.
- **Solusi:**
  Tingkatkan padding atas kontainer carousel skill dari `py-6` (24px) menjadi **`pt-16` (64px)** dengan padding bawah seimbang `pb-6` dan margin negatif penyeimbang `-my-4`:
  `<div class="carousel w-full overflow-hidden pt-16 pb-6 -my-4">`
  Ruang 64px ini memberikan keleluasaan penuh bagi tooltip untuk mengapung secara utuh tanpa terpotong sedikit pun.

---

### B. Masalah 2: Teks Muncul di Dekat Kursor Mouse
- **Akar Masalah Teknis:**
  - Pada [js/script.js](js/script.js#L460), kartu skill diberi atribut HTML bawaan `title`:
    ```javascript
    <div class="item-logo ... cursor-pointer" title="${skill.name}">
    ```
  - Atribut `title` adalah fitur bawaan browser yang secara otomatis menampilkan kotak teks kecil (*native browser tooltip*) tepat di samping kursor mouse beberapa saat setelah di-hover.
- **Solusi:**
  Hapus atribut `title="${skill.name}"` dari elemen kartu skill di `js/script.js`.
  Dengan demikian:
  - Teks bawaan browser di dekat kursor mouse **tidak akan muncul lagi**.
  - Teks nama skill **hanya akan muncul satu-satunya di atas kartu** melalui custom floating tooltip yang elegan dan telah diperbaiki.

---

## 2. Rencana Perubahan Kode

### A. Berkas `index.html` (Baris ~443)

Perbarui kelas kontainer carousel skill agar memberikan ruang vertikal atas yang cukup bagi tooltip:

```html
<!-- SEBELUM: -->
<div class="carousel w-full overflow-hidden py-6 -my-2">
  <div class="track flex gap-6 w-max px-4 animate-marquee-reverse"></div>
</div>

<!-- SESUDAH: -->
<div class="carousel w-full overflow-hidden pt-16 pb-6 -my-4">
  <div class="track flex gap-6 w-max px-4 animate-marquee-reverse"></div>
</div>
```

---

### B. Berkas `js/script.js` (Fungsi `renderCarouselTracks`)

Hapus atribut `title="${skill.name}"` dari kartu skill:

```javascript
// SEBELUM:
tracks[0].innerHTML = combinedSkills
  .map(
    (skill) => `
  <div class="item-logo rounded-2xl group/skill relative h-12 w-24 md:h-16 md:w-32 shrink-0 flex items-center justify-center bg-white/5 border border-white/10 p-3 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer" title="${skill.name}">
    <img src="${skill.src}" alt="${skill.name}" class="h-full object-contain max-w-full transition-transform duration-300 group-hover/skill:scale-110" />

    <!-- Floating Tooltip -->
    <div class="pointer-events-none rounded-2xl absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 scale-90 group-hover/skill:opacity-100 group-hover/skill:scale-100 group-hover/skill:-top-11 transition-all duration-75 ease-out z-30">
      <div class="px-2.5 py-1 text-xs rounded-2xl font-medium text-white bg-gray-900/95 border border-white/15 rounded-md shadow-xl backdrop-blur-md whitespace-nowrap">
        ${skill.name}
      </div>
      <div class="w-0 h-0 mx-auto border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900/95"></div>
    </div>
  </div>
`,
  )
  .join("");

// SESUDAH (Hapus atribut title="${skill.name}"):
tracks[0].innerHTML = combinedSkills
  .map(
    (skill) => `
  <div class="item-logo rounded-2xl group/skill relative h-12 w-24 md:h-16 md:w-32 shrink-0 flex items-center justify-center bg-white/5 border border-white/10 p-3 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer">
    <img src="${skill.src}" alt="${skill.name}" class="h-full object-contain max-w-full transition-transform duration-300 group-hover/skill:scale-110" />

    <!-- Floating Tooltip -->
    <div class="pointer-events-none rounded-2xl absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 scale-90 group-hover/skill:opacity-100 group-hover/skill:scale-100 group-hover/skill:-top-11 transition-all duration-75 ease-out z-30">
      <div class="px-2.5 py-1 text-xs rounded-2xl font-medium text-white bg-gray-900/95 border border-white/15 rounded-md shadow-xl backdrop-blur-md whitespace-nowrap">
        ${skill.name}
      </div>
      <div class="w-0 h-0 mx-auto border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900/95"></div>
    </div>
  </div>
`,
  )
  .join("");
```

---

## 3. Tahapan Eksekusi (Action Checklist)

- [x] **Langkah 1**: Perbarui padding kontainer carousel skill di [index.html](index.html) dari `py-6 -my-2` menjadi `pt-16 pb-6 -my-4` agar tooltip memiliki ruang vertikal yang cukup dan tidak terpotong oleh `overflow-hidden`.
- [x] **Langkah 2**: Hapus atribut `title="${skill.name}"` pada template rendering skill di [js/script.js](js/script.js) agar tidak memunculkan tooltip bawaan browser di samping kursor.
- [x] **Langkah 3**: Jalankan `npm run build` untuk mengompilasi CSS terbaru.
- [x] **Langkah 4**: Lakukan verifikasi visual di browser:
  - Teks nama skill mengapung secara utuh dan jelas di atas kartu saat di-hover.
  - Tidak ada lagi kotak teks bawaan browser yang muncul di dekat kursor mouse.
- [x] **Langkah 5**: Lakukan git commit dan push ke repository GitHub.
