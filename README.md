# Rencana Perbaikan: Konsistensi Background & Single-Trigger Reveal Section Contact (Portfolio-v3)

Dokumen ini berisi analisis detail dan rencana teknis untuk mengimplementasikan 2 kebutuhan perbaikan pada **Section Contact**:
1. Menyelaraskan latar belakang (*background*) Section Contact agar konsisten dengan section lainnya.
2. Mengubah animasi reveal Section Contact agar hanya muncul **sekali saja** (*trigger once*) saat pengguna pertama kali menggulir (*scroll*) ke section tersebut.

---

## 1. Analisis & Akar Masalah

### Kebutuhan 1: Konsistensi Background Section Contact
- **Kondisi Saat Ini:**
  - Section lain (`#home`, `#about`, `#journey`, dan `#skill-project`) tidak menetapkan kelas warna latar belakang tersendiri (bersifat transparan). Semuanya mewarisi warna latar global dari `<body>` (`bg-gray-950`), sehingga efek hujan latar belakang (`.container-rain` dengan `-z-50`) dan efek *grid cursor* interaktif (`#gridCursor`) dapat terlihat mengalir mulus tanpa terputus.
  - Section `#contact` saat ini didefinisikan dengan:
    ```html
    <section id="contact" class="py-24 bg-gray-950 text-white relative overflow-hidden z-20">
    ```
  - Deklarasi kelas `bg-gray-950` dan `z-20` pada `#contact` menciptakan lapisan latar belakang opak/padat yang **menutupi dan memutus efek hujan partikel**, sehingga saat pengguna mencapai area contact, transisi latar belakang tampak terpotong secara visual (*hard cut*).
- **Solusi Teknis:**
  - Hapus kelas `bg-gray-950` dari elemen `<section id="contact">`.
  - Jadikan Section Contact transparan konsisten dengan section lainnya (`py-24 relative overflow-hidden`), sehingga mewarisi latar belakang global secara alami.
  - Pertahankan elemen aksen pencahayaan lembut (*ambient glow*) di dalamnya (`bg-purple-600/10` dan `bg-blue-600/10` dengan `blur-3xl pointer-events-none`) agar tetap memiliki estetika visual premium yang menyatu indah dengan efek hujan dan kursor.

---

### Kebutuhan 2: Animasi Reveal Section Contact Hanya Muncul Sekali (Once)
- **Kondisi Saat Ini:**
  - Pada berkas `js/script.js` di dalam fungsi `contactSection()` -> `initContactReveal()`, terdapat logika pengamat persimpangan viewport (*IntersectionObserver*) berikut:
    ```javascript
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "-translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
          } else {
            entry.target.classList.remove("opacity-100", "translate-y-0");
            entry.target.classList.add("opacity-0", "-translate-y-10");
          }
        });
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.15 },
    );
    ```
  - **Kelemahan Logika:**
    1. **Adanya blok `else`:** Setiap kali pengguna menggulir menjauhi section contact (ke atas atau ke bawah), elemen-elemen contact dipaksa kembali menjadi transparan (`opacity-0`) dan bergeser (`-translate-y-10`). Ketika pengguna kembali lagi, animasi berulang kembali secara berulang-ulang (*repetitive re-animation*).
    2. **Tidak ada `observer.unobserve(entry.target)`:** Elemen terus diamati tanpa henti, bukannya dilepas setelah animasi pertama kali selesai.
    3. **Ketidaksinkronan kelas inisial:** Di HTML, judul menggunakan `translate-y-10`, sedangkan kolom detail kontak dan kartu formulir menggunakan `translate-y-8`. Logika sebelumnya hanya menghapus `-translate-y-10`, bukan kelas aslinya.
- **Solusi Teknis:**
  - Hapus seluruh blok `else` pada observer.
  - Hapus kelas inisial secara menyeluruh: `opacity-0`, `translate-y-10`, `translate-y-8`, dan `-translate-y-10`.
  - Tambahkan kelas aktif: `opacity-100` dan `translate-y-0`.
  - Panggil `observer.unobserve(entry.target)` segera setelah elemen mulai masuk ke viewport (`entry.isIntersecting`).
  - Pola ini sejalan dan konsisten dengan implementasi `homeSection` dan `aboutSection` yang sudah berjalan dengan stabil.

---

## 2. Rencana Perubahan Kode

### A. Berkas `index.html`
Ubah tag pembuka `<section id="contact">` pada baris ~460:

```html
<!-- SEBELUM: -->
<section
  id="contact"
  class="py-24 bg-gray-950 text-white relative overflow-hidden z-20"
>

<!-- SESUDAH: -->
<section
  id="contact"
  class="py-24 text-white relative overflow-hidden"
>
```

> **Catatan:** Menghapus `bg-gray-950` dan `z-20` agar partikel hujan latar belakang (`-z-50`) serta efek interaktif kursor tetap mengalir tembus secara konsisten seperti pada section-section sebelumnya.

---

### B. Berkas `js/script.js`
Perbarui fungsi `initContactReveal` di dalam modul `contactSection`:

```javascript
// SEBELUM:
function initContactReveal() {
  const revealElements = document.querySelectorAll(".contact-animasi");
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "-translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0");
        } else {
          entry.target.classList.remove("opacity-100", "translate-y-0");
          entry.target.classList.add("opacity-0", "-translate-y-10");
        }
      });
    },
    { rootMargin: "0px 0px -50px 0px", threshold: 0.15 },
  );

  revealElements.forEach((el) => observer.observe(el));
}

// SESUDAH:
function initContactReveal() {
  const revealElements = document.querySelectorAll(".contact-animasi");
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(
            "opacity-0",
            "translate-y-10",
            "translate-y-8",
            "-translate-y-10",
          );
          entry.target.classList.add("opacity-100", "translate-y-0");
          // Menghentikan pengamatan agar animasi hanya terpicu SEKALI saja
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -50px 0px", threshold: 0.15 },
  );

  revealElements.forEach((el) => observer.observe(el));
}
```

---

## 3. Tahapan Eksekusi (Action Checklist)

- [x] **Langkah 1**: Perbarui elemen `<section id="contact">` di [index.html](index.html) dengan menghapus kelas `bg-gray-950` dan `z-20`.
- [x] **Langkah 2**: Perbarui logika `initContactReveal` di [js/script.js](js/script.js) untuk menambahkan `observer.unobserve(entry.target)` dan menghapus blok reset `else`.
- [x] **Langkah 3**: Jalankan `npm run build` untuk memastikan file stylesheet Tailwind tetap terkompilasi rapi.
- [x] **Langkah 4**: Uji coba visual di browser untuk memastikan:
  - Efek hujan dan estetika latar belakang menyatu mulus tanpa batas patah (*seamless*) saat berpindah dari section Work/Project ke Contact.
  - Elemen Section Contact (judul, deskripsi, info kontak, form) muncul dengan transisi halus saat pertama kali masuk ke layar.
  - Saat pengguna scroll ke atas dan kembali ke Contact, elemen tetap terlihat dan tidak melakukan animasi ulang (*single trigger*).
- [x] **Langkah 5**: Lakukan git commit dan push ke remote repository GitHub.
