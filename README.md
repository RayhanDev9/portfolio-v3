# Analisis & Rekomendasi Desain: Pemisahan Section Skill & Project

Dokumen ini berisi evaluasi mendalam mengenai tata letak section **Skills & Projects** saat ini, alasan psikologi visual dan UX mengapa layout saat ini terasa kurang rapi, serta **3 opsi rekomendasi desain** terbaik untuk portofolio profesional kelas atas.

---

## 1. Evaluasi Kondisi Saat Ini (Apa yang Sedang Terjadi?)

Saat ini pada `#skill-project`, terdapat dua jenis konten yang digabung dalam satu section dengan dua infinite horizontal marquee carousel:
* **Track Atas:** Logo-logo Skill bergerak ke **kanan** (`animate-marquee-reverse`).
* **Track Bawah:** Kartu-kartu Project bergerak ke **kiri** (`animate-marquee`).

```text
+----------------------------------------------------------------------------------------------------+
|  [Skills & Projects]                                                                               |
|                                                                                                    |
|  [Track 1: SKILL LOGOS]    --->  [React] [TS] [Tailwind] [Vite] [Next]  ---> (Bergerak ke Kanan)    |
|                                                                                                    |
|  [Track 2: PROJECT CARDS]  <---  [Fast Pizza]  [Siap Kerja]  [Danu Satya] <--- (Bergerak ke Kiri) |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Mengapa Terasa "Kurang Rapih" & Kurang Sreg? (Analisis UX & Visual)

### 1. Tabrakan Arah Gerak (*Visual Friction & Fatigue*)
Secara neuro-visual, mata manusia kesulitan fokus ketika dua baris objek besar bergerak ke **arah yang saling berlawanan** (satu ke kanan, satu ke kiri) pada kecepatan konstan. Hal ini menimbulkan rasa "sibuk", melelahkan di mata, dan membuat layout terasa tidak tenang (*cluttered*).

### 2. Mismatch Hierarki Nilai (*Value Hierarchy*)
* **Skill** hanyalah *tools* (alat pendukung).
* **Project** adalah *bukti nyata / mahakarya* yang dinilai oleh recruiter, HR, dan calon klien.
Ketika digabung berdempetan, Project kehilangan panggung utamanya (*spotlight*). Klien yang ingin mengevaluasi keahlian teknis Anda terdistraksi oleh logo-logo skill yang terus melintas di atasnya.

### 3. Kendala Interaksi pada Objek Bergerak
Project card memuat informasi penting (screenshot, judul, deskripsi, tech stack, link demo). Ketika card terus berjalan:
* Pengunjung harus "mengejar" card dengan jari atau mouse.
* Membaca deskripsi project terasa terburu-buru.
* Pola *single-click untuk baca* dan *double-click untuk buka* di mobile adalah solusi darurat untuk carousel bergerak, tetapi pada kartu statis biasa, pengunjung bisa langsung melihat teks tanpa trik klik ganda.

### 4. Recruiter Behavior (Kebiasaan HR & Klien)
Rata-rata recruiter hanya meluangkan **10–15 detik** di sebuah portofolio. Mereka ingin melihat:
1. *Apa saja project terbaiknya?*
2. *Bagaimana tampilannya secara sekilas?*
3. *Di mana tombol Live Demo & Source Code GitHub-nya?*
Format carousel membuat recruiter harus menunggu project favorit mereka muncul bergantian.

---

## 3. Tiga (3) Opsi Rekomendasi Solusi

---

### OPSI 1 (SANGAT DIREKOMENDASIKAN): Pisahkan Menjadi 2 Section Mandiri

> **Konsep:** Pisahkan secara tegas menjadi section **Skills & Technologies** dan section **Featured Projects**.

#### A. Section Skills: Clean Categorized Grid atau Minimal Logo Strip
* **Pilihan A1 (Categorized Bento Grid):** Kelompokkan skill ke dalam 3 kartu bersih:
  * **Frontend Core:** React, TypeScript, Next.js, JavaScript, HTML5, CSS3.
  * **Styling & Animation:** Tailwind CSS, Framer Motion, Sass.
  * **Tools & Ecosystem:** Vite, Git, GitHub, Redux Toolkit, React Query.
  * *Kelebihan:* Teks nama skill langsung terbaca (tidak perlu hover/tap), rapi, terlihat sangat matang dan profesional.
* **Pilihan A2 (Infinite Marquee Single-Row):** Tetap gunakan marquee, tapi **hanya 1 baris logo skill yang berjalan lambat dan elegan** sebagai aksen pembatas antar-section.

#### B. Section Projects: Modern Showcase Grid (2 Kolom Desktop, 1 Kolom Mobile)
* Tampilkan project dalam **Grid Statis** yang kokoh (misal: 6 project unggulan).
* Setiap kartu memiliki:
  * Screenshot project tajam dengan efek hover zoom halus.
  * Judul & badge kategori.
  * Ringkasan solusi/fitur utama (langsung terbaca tanpa perlu diklik dulu).
  * Tech stack pills.
  * **Dua tombol aksi jelas:** `[ Live Demo ↗ ]` dan `[ GitHub ↗ ]`.
* Ada tombol filter opsional di atas: `[ All ] [ React & SPA ] [ Landing Page ] [ Games ]`.

---

### OPSI 2: Tetap 1 Section, tetapi Gunakan Sistem Tab Switcher

> **Konsep:** Tetap hemat ruang vertikal dengan 1 section bernama **"Work & Expertise"**, tetapi kontennya dipisah via Tab.

```text
+----------------------------------------------------------------------------------------------------+
|  Work & Expertise                                                                                  |
|                                                                                                    |
|              [ 📁 Featured Projects (Aktif) ]      [ ⚡ Skills & Tools ]                           |
|                                                                                                    |
|  +-------------------------------------+   +-------------------------------------+                 |
|  | [Project 1: Fast React Pizza]       |   | [Project 2: Siap Kerja Platform]    |                 |
|  | Screenshot Preview                  |   | Screenshot Preview                  |                 |
|  | Deskripsi & Tech Stack              |   | Deskripsi & Tech Stack              |                 |
|  | [Live Demo ↗]  [Source Code]        |   | [Live Demo ↗]  [Source Code]        |                 |
|  +-------------------------------------+   +-------------------------------------+                 |
+----------------------------------------------------------------------------------------------------+
```

* **Kelebihan:** Halaman tidak bertambah panjang, pengunjung bisa memilih apa yang ingin dilihat, tidak ada dua baris animasi yang saling bertabrakan.
* **Kekurangan:** Pengunjung yang malas mengklik tab mungkin tidak melihat daftar skill.

---

### OPSI 3: Infinite Marquee Khusus Skills, Swiper / Slider Interaktif untuk Projects

> **Konsep:** Skill tetap memakai marquee 1 baris, sedangkan Project menggunakan slider horizontal interaktif bertombol panah (Next/Prev) atau swipe sentuh.

* Skill berjalan otomatis di atas sebagai *banner teknologi*.
* Di bawahnya, Project ditampilkan dalam card carousel besar bertombol `[ < ]` dan `[ > ]` atau indikator titik dots.
* Card tidak bergerak otomatis tanpa izin user (*user-driven scrolling*).

---

## 4. Perbandingan Lengkap Ketiga Opsi

| Kriteria Evaluasi | Opsi 1: Pisahkan Section (Grid) | Opsi 2: Tab Switcher | Opsi 3: Slider Bertombol | Kondisi Saat Ini (2 Marquee) |
|:---|:---:|:---:|:---:|:---:|
| **Kerapian Visual** | ⭐⭐⭐⭐⭐ (Sangat Rapi) | ⭐⭐⭐⭐ (Rapi) | ⭐⭐⭐ (Cukup) | ⭐⭐ (Kurang Rapi) |
| **Kenyamanan Mobile (UX)** | ⭐⭐⭐⭐⭐ (Sangat Alami) | ⭐⭐⭐⭐ (Mudah) | ⭐⭐⭐⭐ (Mudah) | ⭐⭐ (Butuh trick klik) |
| **Kesan Recruiter / Klien** | ⭐⭐⭐⭐⭐ (Standar Top Dev) | ⭐⭐⭐⭐ (Interaktif) | ⭐⭐⭐ (Standar) | ⭐⭐⭐ (Terlalu ramai) |
| **Kejelasan Info Project** | ⭐⭐⭐⭐⭐ (Langsung Terlihat) | ⭐⭐⭐⭐⭐ (Langsung Terlihat) | ⭐⭐⭐⭐ (Cukup Jelas) | ⭐⭐ (Tertutup overlay) |
| **Kemudahan Maintenance** | ⭐⭐⭐⭐⭐ (Sangat Mudah) | ⭐⭐⭐⭐ (Mudah) | ⭐⭐⭐ (Medium) | ⭐⭐⭐ (Kompleks) |

---

## 5. Rekomendasi Langkah Selanjutnya

Saran terbaik dari kami adalah **Opsi 1 (Pemisahan Total)**:
1. **Buat `#skills` sebagai section tersendiri**:
   - Berupa kartu bento bersih yang mengelompokkan skill Anda (*Frontend Core, Styling & Animation, Tools & State Management*).
2. **Buat `#projects` sebagai section utama portofolio**:
   - Berupa kartu grid 2 kolom yang mewah, lengkap dengan tombol langsung ke Live Demo dan Source Code.
   - Di mobile, kartu berderet ke bawah secara vertikal natural, sehingga user cukup scroll santai dan langsung membaca deskripsi tanpa kebingungan.

---

*Silakan pelajari rekomendasi di atas. Jika Anda setuju dengan Opsi 1 (atau lebih menyukai opsi lainnya), beri tahu saya dan kita bisa langsung mengimplementasikannya!*
