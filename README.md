# Rencana Perbaikan: Animasi Hujan Stabil & Bebas Penumpukan di Bagian Bawah (Portfolio-v3)

Dokumen ini berisi analisis akar masalah dan rencana teknis terperinci untuk mengatasi masalah penumpukan (*accumulation*) dan ketidakkonsistenan kecepatan animasi hujan (*matrix rain background*).

---

## 1. Analisis Akar Masalah (Kenapa Hujan Menumpuk di Bawah?)

Setelah menganalisis berkas [js/script.js](js/script.js#L104-L150) dan [src/input.css](src/input.css#L62-L93), ditemukan **3 akar masalah teknis** yang menyebabkan hujan menumpuk dan melambat di bagian bawah:

### Akar Masalah 1: Jarak Tempuh Berbeda, Tetapi Durasi Waktu Sama (Kecepatan Tidak Stabil)
- Pada [js/script.js](js/script.js#L116-L137):
  - `--top` diacak di sepanjang tinggi dokumen (`Math.random() * document.documentElement.scrollHeight`), misalnya dari 0px hingga 3500px.
  - Setiap tetesan diberikan durasi animasi `--speed` yang hampir seragam (~25 hingga 30 detik).
- Pada [src/input.css](src/input.css#L80-L93):
  ```css
  @keyframes jalan {
    from {
      top: calc(var(--top) - 50px);
    }
    to {
      top: 100%; /* Dasar dokumen */
    }
  }
  ```
- **Dampak Matematis:**
  - Tetesan di bagian atas (`--top = 100px`): Menempuh jarak ~3400px dalam 28 detik = **~121 px/detik** (Cepat).
  - Tetesan di bagian bawah (`--top = 3300px`): Menempuh jarak hanya 200px dalam 28 detik = **~7.1 px/detik** (Sangat Lambat / Bergerak seperti siput).
  - Tetesan air yang di-spawn di bawah bergerak **17x lebih lambat** dibanding di atas!

---

### Akar Masalah 2: Loop Animasi Terperangkap di Bagian Bawah
- Pada `@keyframes jalan`, titik awal animasi (`from`) adalah `top: calc(var(--top) - 50px)`.
- Ketika tetesan mencapai dasar (`to: 100%`), animasi mengulang kembali ke `from`.
- Akibatnya, tetesan yang memiliki nilai `--top` tinggi **TIDAK PERNAH kembali ke atas halaman**! Tetesan tersebut hanya berputar-putar di area sempit di dasar halaman.
- Ratusan tetesan yang dibuat di area bawah akhirnya terperangkap dan terus menumpuk di dasar halaman (Contact / Footer).

---

### Akar Masalah 3: Wadah `.container-rain` Bersifat `absolute` di Seluruh Dokumen (Performa Berat & Tidak Realistis)
- Di [index.html](index.html#L17-L19):
  ```html
  <div class="container-rain absolute inset-0 w-screen h-full pointer-events-none -z-50 overflow-hidden"></div>
  ```
- Ukuran wadah mengikuti tinggi total dokumen (~3500px–4000px).
- Hujan di dunia nyata (dan animasi modern) adalah efek atmosferik yang bergerak melintasi **viewport (layar pandang)** pengguna, bukan menempel kaku memanjang di seluruh dokumen web.

---

## 2. Rencana Solusi Teknis

Untuk membuat kecepatan hujan **100% stabil dari atas ke bawah** dan **tanpa penumpukan**:

### Solusi 1: Ubah Wadah Hujan Menjadi `fixed` (Viewport-Based Atmospheric Rain)
- Ubah `.container-rain` dari `absolute` menjadi `fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden`.
- **Keuntungan:**
  1. Hujan jatuh alami melintasi layar pandang pengguna yang sedang aktif, di section mana pun pengguna berada (Home, About, Journey, Work, atau Contact).
  2. Jarak tempuh untuk SEMUA tetesan selalu sama (dari `-20px` di atas layar hingga `105vh` di bawah layar).
  3. Mengurangi beban DOM dan GPU browser secara drastis (hanya butuh ~30–45 tetesan aktif di layar dibanding ratusan elemen statis di dokumen panjang).

---

### Solusi 2: Standardisasi Jalur Jatuh di `@keyframes` (Dari Atas Layar ke Bawah Layar)
- Ubah `@keyframes jalan` di [src/input.css](src/input.css):
  ```css
  @keyframes jalan {
    0% {
      top: -20px;
      opacity: 0;
    }
    10% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      top: 105vh;
      opacity: 0;
    }
  }
  ```
- Setiap tetesan jatuh dari atas layar (`-20px`) hingga keluar dari bawah layar (`105vh`), lalu memudar (*fade out*) dan me-loop kembali dari atas. Tidak ada lagi tetesan yang diam atau tersangkut di bawah.

---

### Solusi 3: Sebar Tetesan Secara Instan Menggunakan `animation-delay` Negatif
- Di [js/script.js](js/script.js):
  - Hapus perhitungan posisi acak `getRandomY()` dan durasi yang bergantung pada tinggi dokumen.
  - Tentukan kecepatan jatuh konstan yang alami: misalnya **1.8 detik hingga 3.0 detik** untuk melintasi layar.
  - Untuk menyebarkan tetesan air secara merata di layar saat pertama kali halaman dimuat (agar tidak ada jeda kosong), gunakan **delay negatif**:
    ```javascript
    const duration = 1.8 + Math.random() * 1.2; // 1.8s - 3.0s (stabil dan natural)
    rainDrop.style.setProperty("--speed", `${duration.toFixed(2)}s`);
    rainDrop.style.animationDelay = `-${(Math.random() * duration).toFixed(2)}s`;
    ```
  - **Efek Delay Negatif:** Browser langsung memulai animasi di posisi acak di tengah-tengah jalur jatuhnya saat halaman pertama kali dibuka, namun dengan kecepatan konstan yang sama persis dan loop yang selalu kembali ke atas layar!

---

## 3. Rencana Perubahan Kode

### A. Berkas `index.html` (Baris ~17)

```html
<!-- SEBELUM: -->
<div
  class="container-rain absolute inset-0 w-screen h-full pointer-events-none -z-50 overflow-hidden"
></div>

<!-- SESUDAH: -->
<div
  class="container-rain fixed inset-0 w-full h-screen pointer-events-none -z-50 overflow-hidden"
></div>
```

---

### B. Berkas `src/input.css` (Baris ~62–93)

```css
/* SEBELUM: */
.rain {
  @apply w-[1px] h-[12px] absolute opacity-80;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), skyblue);
  top: var(--top);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  box-shadow:
    0 0 3px #faffff,
    0 0 8px #faffff;
  animation:
    jalan var(--speed) linear infinite,
    fadeOut 3s linear infinite;
}

@keyframes jalan {
  from {
    left: var(--geserX);
    top: calc(var(--top) - 50px);
    opacity: 1;
  }
  to {
    left: var(--geserX);
    top: 100%;
  }
}

/* SESUDAH: */
.rain {
  position: absolute;
  width: 1.5px;
  height: 16px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), #38bdf8);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-35deg);
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
  pointer-events: none;
  animation: jalanHujan var(--speed) linear infinite;
}

@keyframes jalanHujan {
  0% {
    top: -25px;
    opacity: 0;
  }
  15% {
    opacity: 0.75;
  }
  85% {
    opacity: 0.75;
  }
  100% {
    top: 105vh;
    opacity: 0;
  }
}
```

---

### C. Berkas `js/script.js` (Fungsi `initBackgroundRainEffect`)

```javascript
// SESUDAH:
function initBackgroundRainEffect() {
  const containerRain = document.querySelector(".container-rain");
  if (!containerRain) return;

  // Menyesuaikan kepadatan hujan berdasarkan lebar layar (responsif)
  function getMaxRainCount() {
    return Math.min(Math.floor(window.innerWidth / 28), 50);
  }

  function getRandomX() {
    return Math.floor(Math.random() * window.innerWidth);
  }

  function spawnRainDrop() {
    const currentRain = containerRain.querySelectorAll(".rain");
    if (currentRain.length >= getMaxRainCount()) return;

    const rainDrop = document.createElement("div");
    rainDrop.classList.add("rain");

    // Kecepatan stabil alami (2.0s - 3.2s melintasi seluruh tinggi viewport)
    const duration = 2.0 + Math.random() * 1.2;
    // Delay negatif agar langsung tersebar merata saat halaman dimuat
    const delay = -(Math.random() * duration);

    rainDrop.style.left = `${getRandomX()}px`;
    rainDrop.style.setProperty("--speed", `${duration.toFixed(2)}s`);
    rainDrop.style.animationDelay = `${delay.toFixed(2)}s`;

    containerRain.appendChild(rainDrop);
  }

  const rainInterval = setInterval(() => {
    const currentRain = containerRain.querySelectorAll(".rain");
    if (currentRain.length >= getMaxRainCount()) {
      clearInterval(rainInterval);
    } else {
      spawnRainDrop();
    }
  }, 30);
}
```

---

## 4. Tahapan Eksekusi (Action Checklist)

- [x] **Langkah 1**: Perbarui wadah `.container-rain` di [index.html](index.html) menjadi `fixed inset-0 w-full h-screen`.
- [x] **Langkah 2**: Perbarui gaya CSS `.rain` dan `@keyframes jalanHujan` di [src/input.css](src/input.css) agar jalur animasi bergerak dari `-25px` ke `105vh`.
- [x] **Langkah 3**: Perbarui fungsi `initBackgroundRainEffect()` di [js/script.js](js/script.js) dengan kecepatan konstan stabil dan *negative animation delay*.
- [x] **Langkah 4**: Jalankan `npm run build` untuk mengompilasi CSS terbaru.
- [x] **Langkah 5**: Lakukan verifikasi visual di browser:
  - Kecepatan hujan stabil dan konsisten dari atas hingga bawah layar.
  - Tidak ada tetesan yang melambat, tertinggal, atau menumpuk di area bawah (Contact / Footer).
  - Tetesan tersebar merata secara instan tanpa menunggu proses jatuh dari nol.
- [x] **Langkah 6**: Lakukan git commit dan push ke repository GitHub.
