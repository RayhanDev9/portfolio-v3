const nav = () => {
  const openMenu = document.querySelector(".open-menu");
  const closeMenu = document.querySelector(".close-menu");
  const navMobile = document.querySelector(".nav-mobile");
  const topBarMobileEl = document.querySelector(".top-bar-mobile");
  const data = ["x7z_k0d3_9q", "rmh#b!ru_xx", "jlns0r3_zz9", "t3h_h4ng4t__x"];

  function topBarMobile() {
    document.addEventListener("scroll", () => {
      const cordinat = topBarMobileEl.getBoundingClientRect();
      console.info();

      if (window.pageYOffset > cordinat.bottom) {
        setTimeout(() => {
          topBarMobileEl.classList.add(
            "fixed",
            "bg-white/10",
            "backdrop-blur-md",
          );
        }, 50);
      } else {
        topBarMobileEl.classList.remove(
          "fixed",
          "bg-white/10",
          "backdrop-blur-md",
        );
      }
    });
  }
  topBarMobile();

  function mobile() {
    // function animasi menu open and close
    async function animaiMenu(text) {
      if (text === "Menu") {
        navMobile.classList.remove("hidden");
        openMenu.textContent = "";
        closeMenu.textContent = "Close";
        topBarMobileEl.classList.add("hidden", "opacity-0");

        await delay(100);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            navMobile.classList.remove("scale-y-0", "opacity-0");
            navMobile.classList.add("scale-y-100", "opacity-100");
            // document.body.classList.add("overflow-hidden");
          });
        });
      } else {
        navMobile.classList.remove("scale-y-100", "opacity-100");
        navMobile.classList.add("scale-y-0", "opacity-0");

        await delay(100);
        closeMenu.textContent = "";
        openMenu.textContent = "Menu";
        topBarMobileEl.classList.remove("hidden", "opacity-0");

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            navMobile.classList.add("hidden");
            // document.body.classList.remove("overflow-hidden");
          });
        });
      }
    }
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function runText(text, menu) {
      for (let i = 0; i < data.length; i++) {
        menu.textContent = i !== data.length - 1 ? data[i] : text;

        await delay(50);
      }

      await delay(80);

      animaiMenu(text);
    }

    openMenu.addEventListener("click", () => {
      runText("Menu", openMenu);
    });

    closeMenu.addEventListener("click", () => {
      runText("Close", closeMenu);
    });
  }
  mobile();

  function actionNavLinks() {
    const navLinks = [...document.querySelectorAll(".nav-menu > a")];
    console.info(navLinks);

    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.forEach((link) => {
          link.classList.remove("active-link-nav");
        });

        this.classList.add("active-link-nav");
      });
    });
  }
  actionNavLinks();
};

nav();

const initGrid = () => {
  const grid = document.getElementById("gridCursor");

  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;

  let targetX = currentX;
  let targetY = currentY;

  let hideTimeout;

  const showGrid = () => {
    grid.classList.remove("opacity-0", "scale-0");
    grid.classList.add("opacity-70", "scale-100");
  };

  const hideGrid = () => {
    grid.classList.remove("opacity-70", "scale-100");
    grid.classList.add("opacity-0", "scale-0");
  };

  const isMobile = window.matchMedia("(max-width: 1024px)").matches;

  // DESKTOP
  if (!isMobile) {
    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      showGrid();

      clearTimeout(hideTimeout);
    });

    document.addEventListener("mouseleave", hideGrid);
  }

  // MOBILE
  if (isMobile) {
    window.addEventListener("scroll", () => {
      targetX = window.innerWidth / 2;

      // sedikit di atas tengah layar
      targetY = window.innerHeight * 0.4 + window.scrollY * 0.05;

      showGrid();

      clearTimeout(hideTimeout);
    });
  }

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    grid.style.left = `${currentX}px`;
    grid.style.top = `${currentY}px`;

    requestAnimationFrame(animate);
  }

  animate();
};

initGrid();

const home = () => {
  const containerImgHomeEl = [
    ...document.querySelectorAll(".container-home-img"),
  ];
  const containerImgHomeChildEl = [
    ...document.querySelectorAll(".container-home-img > div"),
  ];

  const homeAnimasi = document.querySelectorAll(".home-animasi");

  // Untuk text home
  function textHome() {
    homeAnimasi.forEach((item) => {
      item.classList.remove("opacity-0");
      item.classList.remove("opacity-100");
    });
  }

  function scrollDiractionAnimation() {
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const scrollingDown = currentY > lastScrollY;

          containerImgHomeEl.forEach((el) => {
            if (scrollingDown) {
              el.style.transform = "translateY(8px)";
            } else {
              el.style.transform = "translateY(-8px)";
            }
          });

          lastScrollY = currentY;
          ticking = false;
        });

        ticking = true;
      }
    });
  }

  function mouseDiractionAnimation() {
    let lastX = 0;
    let lastY = 0;
    let ticking = false;

    window.addEventListener("mousemove", (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentX = e.clientX;
          const currentY = e.clientY;

          const diffX = (currentX - lastX) * 0.3;
          const diffY = (currentY - lastY) * 0.3;

          containerImgHomeEl.forEach((el) => {
            el.style.transform = `translate(${diffX}px, ${diffY}px)`;
          });

          lastX = currentX;
          lastY = currentY;
          ticking = false;
        });

        ticking = true;
      }
    });
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function animate() {
    // Tahap 1
    for (const item of containerImgHomeChildEl) {
      item.classList.remove("opacity-0", "scale-0");
      await delay(400);
    }

    await delay(700);
    // Tahap 2
    for (const item of containerImgHomeChildEl) {
      item.classList.remove("home-img-init");
      // await delay(700);
    }

    await delay(700);

    textHome();

    scrollDiractionAnimation();
    mouseDiractionAnimation();
  }

  animate();
};

home();

const about = () => {
  function initRevealAnimation() {
    const revealEl = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. Munculkan elemen dengan menghapus class transparansi & geser
            entry.target.classList.remove("opacity-0", "translate-y-8");

            // 2. KUNCI UTAMA: Hentikan pengamatan agar efeknya HANYA SEKALI
            observer.unobserve(entry.target);

            console.info("in");
          }
          // Bagian 'else' dihapus karena kita tidak ingin menyembunyikan elemen lagi saat di-scroll menjauh
        });
      },
      {
        threshold: 0.15,
      },
    );

    revealEl.forEach((element) => {
      observer.observe(element);
      console.info(element);
    });
  }

  initRevealAnimation();
};

about();

const journey = () => {
  const items = document.querySelectorAll(
    ".timeline-item, .timeline-item-mobile",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  items.forEach((item) => observer.observe(item));
};

journey();

const contact = () => {
  function initContactObserver() {
    // Mengambil elemen dengan ID contact
    const revealElements = document.querySelectorAll("#contact");

    // Mengubah nama variabel dari 'observer' menjadi 'myObserver' agar tidak bentrok dengan nama fungsi
    const myObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Munculkan elemen
            entry.target.classList.remove("opacity-0", "translate-y-8");

            // Hentikan pengamatan (Menggunakan nama variabel baru)
            myObserver.unobserve(entry.target);

            console.info("Section contact masuk layar & animasi dijalankan");
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    revealElements.forEach((element) => {
      myObserver.observe(element);
    });
  }

  // Jalankan fungsi
  initContactObserver();
  function sendMessge() {
    document
      .getElementById("contactForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        // Ambil data inputan
        const name = document.getElementById("name").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Contoh: Alihkan ke email bawaan pengguna (Mailto)
        // Anda juga bisa menggantinya dengan integrasi EmailJS, Formspree, atau Web3Forms
        const wa = "6285692097048";
        const textWA = `Halo, nama saya *${name}*.\n\n*Subjek:* ${subject}\n\n*Pesan:*\n${message}`;

        // Gunakan window.open dengan parameter '_blank' agar membuka di tab baru
        window.open(
          `https://wa.me/${wa}?text=${encodeURIComponent(textWA)}`,
          "_blank",
        );
      });
  }

  sendMessge();
};

contact();

const rainLogic = () => {
  // 1. Batasi jumlah maksimal hujan yang boleh ada di layar
  const maxRainCount = () => {
    const screnx = window.innerWidth;
    return Math.floor(Number(screnx) / 10);
  };

  // 2. Posisi random untuk X (Horizontal)
  const randomValueX = () => {
    const screnx = window.innerWidth;
    return Math.floor(Math.random() * Number(screnx));
  };

  // 3. Posisi random untuk Y (Vertical) - Menggunakan scrollHeight
  const randomValueY = () => {
    const totalHeight = document.documentElement.scrollHeight;
    return Math.floor(Math.random() * totalHeight);
  };

  // 4. Speed hujan SLOW MOTION yang stabil
  const speedRain = () => {
    const totalHeight = document.documentElement.scrollHeight;

    // Angka diganti ke 8 agar pas (tidak macet total seperti 900).
    // Berarti per 1000px tinggi web, butuh sekitar 8-10 detik untuk jatuh.
    const baseSpeed = (totalHeight / 1000) * 8;

    return baseSpeed + Math.random() * 3;
  };

  // 5. Membuat satu tetes hujan & langsung pasang CSS-nya
  const spawnRainDrop = () => {
    const containerRain = document.querySelector(".container-rain");
    if (!containerRain) return;

    // Cek jika jumlah hujan di layar sudah terlalu banyak, jangan bikin baru lagi
    const currentRain = containerRain.querySelectorAll(".rain");
    if (currentRain.length >= maxRainCount()) return;

    // Buat elemen baru
    const rainDrop = document.createElement("div");
    rainDrop.classList.add("rain");

    // Pasang property CSS langsung ke elemen yang baru dibuat (lebih aman daripada :last-child)
    rainDrop.style.setProperty("--speed", `${speedRain()}s`);
    rainDrop.style.setProperty("--geserX", `${randomValueX()}px`);
    rainDrop.style.setProperty("--top", `${randomValueY()}px`);
    rainDrop.style.setProperty("--geserY", `-20px`);

    // Beri delay acak super tipis agar terasa lebih halus organiknya
    rainDrop.style.animationDelay = `${Math.random() * 0.5}s`;

    // Masukkan ke container
    containerRain.appendChild(rainDrop);
  };

  // KUNCI UTAMA: Mengganti loop 'for' dengan interval waktu (Interval Spawning)
  // Fungsi spawnRainDrop akan dipanggil setiap 40 milidetik (muncul bergantian, tidak barengan)
  const rainInterval = setInterval(() => {
    const containerRain = document.querySelector(".container-rain");
    if (containerRain) {
      const currentRain = containerRain.querySelectorAll(".rain");
      if (currentRain.length >= maxRainCount()) {
        // Jika kapasitas hujan maksimal sudah terpenuhi, hentikan interval pembuatannya
        clearInterval(rainInterval);
      } else {
        spawnRainDrop();
      }
    }
  }, 40); // Ubah angka 40 ini (makin kecil makin cepat badainya kumpul)
};

// Jalankan fungsi setelah halaman siap
document.addEventListener("DOMContentLoaded", rainLogic);

// Fungsi bantuan untuk membuat jeda waktu (delay)

function initTextScrambleAnimation() {
  // 1. Data acak untuk efek glitch/scramble
  const randomWords = [
    "x7z_k0d3_9q",
    "rmh#b!ru_xx",
    "jlns0r3_zz9",
    "t3h_h4ng4t__x",
    "v01d_w4lk3r_7",
    "c0ff33_0v3rd0s3",
    "n1ght_r1d3r_99",
  ];

  // Fungsi bantuan delay (ditaruh di dalam agar fungsi menjadi self-contained)
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 2. Ambil semua elemen dengan class .text-loop
  const targetElements = document.querySelectorAll(".text-loop");
  if (targetElements.length === 0) return;

  // 3. Fungsi inti untuk animasi per elemen
  async function animateElement(element) {
    // Ambil dan simpan teks asli elemen tersebut sebelum diacak
    const originalText = element.textContent;

    // Jalankan efek acak teks
    for (let i = 0; i < randomWords.length; i++) {
      element.textContent = randomWords[i];
      await delay(70); // Kecepatan glitch (70ms)
    }

    // Kembalikan ke teks asli masing-masing elemen
    element.textContent = originalText;
  }

  // 4. Setup IntersectionObserver untuk mendeteksi scroll
  const observerOptions = {
    root: null,
    threshold: 0.5, // Aktif jika 50% elemen masuk ke layar
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Jalankan animasi khusus untuk elemen yang sedang terlihat saja
        animateElement(entry.target);

        // Jika ingin animasi hanya berjalan SEKALI SAJA seumur hidup, aktifkan baris di bawah:
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 5. Daftarkan semua elemen ke observer
  targetElements.forEach((element) => observer.observe(element));
}

// Eksekusi fungsi utama
initTextScrambleAnimation();
