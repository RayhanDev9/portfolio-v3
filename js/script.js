/**
 * =========================================================================
 * FEATURE GLOBAL (GLOBAL FUNCTIONS)
 * Feature yang bersifat umum, independen, dan bisa dipakai di mana saja.
 * =========================================================================
 */

// Utility: Fungsi pembantu untuk membuat jeda waktu (delay)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Global Scramble Text Effect (Intersection Observer)
function initTextScrambleAnimation() {
  const randomWords = [
    "x7z_k0d3_9q",
    "c0d3_fl0w_99",
    "d3v_m0d3_xx",
    "n3t_runn3r_z",
    "v01d_w4lk3r_7",
    "c0ff33_0v3rd0s3",
    "n1ght_r1d3r_99",
  ];

  const targetElements = document.querySelectorAll(".text-loop");
  if (targetElements.length === 0) return;

  async function animateElement(element) {
    const originalText = element.textContent;

    for (let i = 0; i < randomWords.length; i++) {
      element.textContent = randomWords[i];
      await delay(70);
    }
    element.textContent = originalText;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  targetElements.forEach((element) => observer.observe(element));
}

// Global Grid Cursor Follower
function initGridCursorEffect() {
  const grid = document.getElementById("gridCursor");
  if (!grid) return;

  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;

  const isMobile = window.matchMedia("(max-width: 1024px)").matches;

  function showGrid() {
    grid.classList.remove("opacity-0", "scale-0");
    grid.classList.add("opacity-70", "scale-100");
  }

  function hideGrid() {
    grid.classList.remove("opacity-70", "scale-100");
    grid.classList.add("opacity-0", "scale-0");
  }

  function handleDesktopMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;
    showGrid();
  }

  function handleMobileScroll() {
    targetX = window.innerWidth / 2;
    targetY = window.innerHeight * 0.4 + window.scrollY * 0.05;
    showGrid();
  }

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    grid.style.left = `${currentX}px`;
    grid.style.top = `${currentY}px`;
    requestAnimationFrame(animate);
  }

  if (!isMobile) {
    window.addEventListener("mousemove", handleDesktopMove);
    document.addEventListener("mouseleave", hideGrid);
  } else {
    window.addEventListener("scroll", handleMobileScroll);
  }

  animate();
}

// Global Matrix Rain Background
function initBackgroundRainEffect() {
  const containerRain = document.querySelector(".container-rain");
  if (!containerRain) return;

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
    const duration = 6.6 + Math.random() * 1.2;
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

/**
 * =========================================================================
 * COMPONENT / SECTION MODULARS
 * Logika enkapsulasi terpisah per masing-masing modul/bagian halaman web.
 * =========================================================================
 */

const navigationModule = () => {
  const openMenu = document.querySelector(".open-menu");
  const navMobile = document.querySelector(".nav-mobile");
  const navMobileContent = document.querySelector(".nav-mobile-content");
  const topBarMobileEl = document.querySelector(".top-bar-mobile");
  const topBarDekstopEl = document.querySelector(".top-bar-dekstop");
  let isMenuOpen = false;

  const glitchWords = ["x7z_9q", "c0d3_99", "d3v_xx"];

  // Efek teks glitch cepat & responsif untuk tombol menu
  async function triggerButtonGlitch(finalText, buttonElement) {
    if (!buttonElement) return;
    for (let i = 0; i < glitchWords.length; i++) {
      buttonElement.textContent = glitchWords[i];
      await delay(30);
    }
    buttonElement.textContent = finalText;
  }

  // Buka Mobile Menu Drawer
  function openMobileMenu() {
    if (!navMobile) return;
    isMenuOpen = true;
    navMobile.classList.remove("opacity-0", "pointer-events-none");
    navMobile.classList.add("opacity-100", "pointer-events-auto");
    if (navMobileContent) {
      navMobileContent.classList.remove("scale-95");
      navMobileContent.classList.add("scale-100");
    }
    document.body.style.overflow = "hidden";
    triggerButtonGlitch("Close", openMenu);
  }

  // Tutup Mobile Menu Drawer
  function closeMobileMenu() {
    if (!navMobile) return;
    isMenuOpen = false;
    navMobile.classList.remove("opacity-100", "pointer-events-auto");
    navMobile.classList.add("opacity-0", "pointer-events-none");
    if (navMobileContent) {
      navMobileContent.classList.remove("scale-100");
      navMobileContent.classList.add("scale-95");
    }
    document.body.style.overflow = "";
    triggerButtonGlitch("Menu", openMenu);
  }

  // Toggle buka/tutup mobile menu
  function toggleMobileMenu() {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (openMenu) {
    openMenu.addEventListener("click", toggleMobileMenu);
  }

  // Tutup jika klik area luar kartu menu (backdrop)
  if (navMobile) {
    navMobile.addEventListener("click", (e) => {
      if (e.target === navMobile) {
        closeMobileMenu();
      }
    });
  }

  // Tutup menu otomatis jika salah satu link navigasi mobile diklik
  if (navMobile) {
    const mobileLinks = navMobile.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });
  }

  // Auto-hide Top Bar Mobile saat scroll ke bawah & muncul kembali saat scroll ke atas (Mobile Only)
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

  function handleMobileScrollNavbar() {
    // Hanya berlaku pada layar mobile (< 1024px)
    if (window.innerWidth >= 1024) {
      if (topBarMobileEl) {
        topBarMobileEl.classList.remove("-translate-y-full");
      }
      return;
    }

    // Jangan sembunyikan top bar jika menu drawer sedang terbuka
    if (isMenuOpen) return;

    const currentScrollY =
      window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = currentScrollY - lastScrollY;

    if (!topBarMobileEl) return;

    if (currentScrollY <= 20) {
      // Dekat puncak halaman: selalu tampil & transparan
      topBarMobileEl.classList.remove("-translate-y-full");
      topBarMobileEl.classList.remove(
        "bg-gray-950/80",
        "backdrop-blur-md",
        "border-b",
        "border-white/5",
        "shadow-lg",
      );
    } else {
      // Saat digulir: beri background frosted glass halus
      topBarMobileEl.classList.add(
        "bg-gray-950/80",
        "backdrop-blur-md",
        "border-b",
        "border-white/5",
        "shadow-lg",
      );

      // Scroll ke bawah: sembunyikan navbar
      if (scrollDelta > 8 && currentScrollY > 80) {
        topBarMobileEl.classList.add("-translate-y-full");
      }
      // Scroll ke atas: munculkan navbar kembali
      else if (scrollDelta < -8) {
        topBarMobileEl.classList.remove("-translate-y-full");
      }
    }

    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
  }

  window.addEventListener("scroll", handleMobileScrollNavbar, {
    passive: true,
  });
  window.addEventListener("resize", handleMobileScrollNavbar, {
    passive: true,
  });

  // Desktop Navbar Sticky Handling
  function handleStickyNavbar(element) {
    if (!element) return;
    document.addEventListener("scroll", () => {
      const coordinate = element.getBoundingClientRect();
      if (window.pageYOffset > coordinate.bottom) {
        setTimeout(
          () =>
            element.classList.add(
              "fixed",
              "bg-gray-950/40",
              "backdrop-blur-md",
            ),
          50,
        );
      } else {
        element.classList.remove("fixed", "bg-gray-950/40", "backdrop-blur-md");
      }
    });
  }

  function initNavigationActiveStateEventClick() {
    const navLinks = document.querySelectorAll(".nav-menu > a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.forEach((item) => item.classList.remove("active-link-nav"));
        this.classList.add("active-link-nav");
      });
    });
  }

  function initNavigationScrollSpy() {
    const navLinks = document.querySelectorAll(".nav-menu > a");
    const sections = [];

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const section = document.querySelector(targetId);
        if (section) sections.push(section);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active-link-nav");
              } else {
                link.classList.remove("active-link-nav");
              }
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Execution Modul
  handleStickyNavbar(topBarDekstopEl);
  initNavigationActiveStateEventClick();
  initNavigationScrollSpy();
};

const homeSection = () => {
  function initHomeReveal() {
    const revealElements = document.querySelectorAll(".home-animasi");
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "-translate-y-10");
            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
              "reveal-visible",
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.15 },
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  initHomeReveal();
};

const aboutSection = () => {
  function initAboutReveal() {
    const revealEl = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );

    revealEl.forEach((element) => observer.observe(element));
  }

  initAboutReveal();
};

const journeySection = () => {
  function initJourneyReveal() {
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
      { threshold: 0.3 },
    );

    items.forEach((item) => observer.observe(item));
  }

  initJourneyReveal();
};

/**
 * -----------------------------------------------------------------------------
 * 5. SKILLS SECTION
 * Menampilkan Categorized Bento Grid keahlian teknis (Core, Styling, Tools).
 * -----------------------------------------------------------------------------
 */
const skillsSection = () => {
  const skillCategories = [
    {
      title: "Core Languages & Foundation",
      description: "Fundamental programming languages & core web foundation",
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
      skills: [
        { name: "HTML5", src: "asset/svg/skill/html-5.svg" },
        { name: "CSS3", src: "asset/svg/skill/css-3.svg" },
        { name: "JavaScript", src: "asset/svg/skill/javascript.svg" },
        { name: "TypeScript", src: "asset/svg/skill/typescript.svg" },
        { name: "C++", src: "asset/svg/skill/cplusplus.svg" },
        { name: "Vite", src: "asset/svg/skill/vite.svg" },
      ],
    },
    {
      title: "Styling & UI Components",
      description: "Design systems, CSS frameworks & fluid UI animations",
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>`,
      skills: [
        { name: "Tailwind CSS", src: "asset/svg/skill/tailwind.svg" },
        { name: "Framer Motion", src: "asset/svg/skill/framer-motion.svg" },
        { name: "Sass", src: "asset/svg/skill/sass.svg" },
        { name: "Bootstrap", src: "asset/svg/skill/bootstrap-4.svg" },
        { name: "Lucide Icons", src: "asset/svg/skill/lucide.svg" },
        { name: "Responsive UI", src: "asset/svg/skill/responsive.svg" },
      ],
    },
    {
      title: "Libraries, State & APIs",
      description: "Client-side architecture, state orchestration & tools",
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
      skills: [
        { name: "React", src: "asset/svg/skill/react.svg" },
        { name: "React Router", src: "asset/svg/skill/react-router.svg" },
        { name: "Redux Toolkit", src: "asset/svg/skill/redux.svg" },
        { name: "React Query", src: "asset/svg/skill/react-query.svg" },
        { name: "Axios", src: "asset/svg/skill/axios.svg" },
        { name: "RESTful APIs", src: "asset/svg/skill/json.svg" },
        { name: "jQuery", src: "asset/svg/skill/jquery.svg" },
        { name: "Git & GitHub", src: "asset/svg/skill/github.svg" },
      ],
    },
  ];

  const container = document.getElementById("skillsContainer");
  if (!container) return;

  container.innerHTML = skillCategories
    .map(
      (cat) => `
    <div class="p-6 md:p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div class="flex items-center gap-3.5 mb-6">
          <div class="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-105 transition-all">
            ${cat.icon}
          </div>
          <div>
            <h3 class="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">${cat.title}</h3>
            <p class="text-xs text-gray-400">${cat.description}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          ${cat.skills
            .map(
              (s) => `
            <div class="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-200 group/pill">
              <img src="${s.src}" alt="${s.name}" class="w-5 h-5 object-contain shrink-0 transition-transform group-hover/pill:scale-110" loading="lazy" />
              <span class="text-xs font-medium text-gray-300 group-hover/pill:text-white transition-colors truncate">${s.name}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `,
    )
    .join("");
};

/**
 * -----------------------------------------------------------------------------
 * 6. PROJECTS SECTION
 * Menampilkan Showcase Grid karya/proyek dengan sistem filter kategori.
 * -----------------------------------------------------------------------------
 */
const projectsSection = () => {
  const projectsData = [
    {
      title: "Fast React Pizza",
      category: "app",
      description: "Interactive pizza ordering application featuring live cart management, SPA client-side routing, and real-time order tracking.",
      skills: ["React 18", "Redux Toolkit", "React Router", "Tailwind CSS", "Vite"],
      url: "https://rayhandev9.github.io/fast-pizza",
      img: "asset/img/project/fast-pizza.avif",
      alt: "Fast React Pizza",
    },
    {
      title: "Siap Kerja",
      category: "app",
      description: "Interactive career preparation platform integrated with AI-driven career recommendations and curated skill modules.",
      skills: ["React", "Redux Toolkit", "Gemini AI", "Framer Motion", "Vite"],
      url: "https://rayhandev9.github.io/siap-kerja/#/landingPage",
      img: "asset/img/project/siap-kerja.avif",
      alt: "Siap Kerja",
    },
    {
      title: "Danu Satya Portfolio",
      category: "landing",
      description: "Official production portfolio website built for a Graphic & Motion Designer with bespoke typography and dark aesthetics.",
      skills: ["React 19", "TypeScript", "Tailwind CSS v4", "Lucide Icons", "Vite"],
      url: "https://danusatya.my.id/",
      img: "asset/img/project/portfolio-danu.avif",
      alt: "Danu Satya Portfolio",
    },
    {
      title: "TK PAUD Permata",
      category: "landing",
      description: "Official educational institutional web profile with custom live domain and responsive interactive design.",
      skills: ["Front-End Arch", "HTML5/CSS3", "JavaScript", "Responsive UI", "SEO"],
      url: "https://permatabelajar.my.id/",
      img: "asset/img/project/tk.avif",
      alt: "TK PAUD Permata",
    },
    {
      title: "Mading Kampus",
      category: "landing",
      description: "Digital campus magazine web portal for publishing student articles, news, and campus announcements.",
      skills: ["Tailwind CSS", "HTML5 Semantic", "JavaScript", "Responsive Design"],
      url: "https://rayhandev9.github.io/mading-kampus/",
      img: "asset/img/project/mading-kampus.avif",
      alt: "Mading Kampus",
    },
    {
      title: "Store Radeva",
      category: "landing",
      description: "Modern e-commerce catalog landing page featuring interactive product showcases and intuitive navigation.",
      skills: ["CSS Layout", "Flexbox/Grid", "DOM Manipulation", "Interactive UI"],
      url: "https://rayhandev9.github.io/radeva/",
      img: "asset/img/project/store-radeva.avif",
      alt: "Store Radeva",
    },
    {
      title: "Company Profile ISC",
      category: "landing",
      description: "Community profile website showcasing community identity, tech events, and contact channels.",
      skills: ["Semantic HTML", "Responsive Web", "CSS Animation", "Clean Layout"],
      url: "https://rayhandev9.github.io/company-profile-isc/",
      img: "asset/img/project/isc.avif",
      alt: "Company Profile ISC",
    },
    {
      title: "Pig Game",
      category: "interactive",
      description: "Interactive 2-player dice game with turn-based state logic and 100-point winning condition.",
      skills: ["JavaScript Logic", "State Management", "DOM Events", "CSS Transition"],
      url: "https://pig-game-virid-delta.vercel.app/",
      img: "asset/img/project/game.avif",
      alt: "Pig Game",
    },
    {
      title: "First Portfolio",
      category: "landing",
      description: "My first web development milestone representing the foundation of my coding journey.",
      skills: ["HTML5", "CSS3", "Flexbox", "Vanilla JavaScript"],
      url: "https://first-portfolio-hkyum9qh0-rayhans-projects-6dbf92f1.vercel.app/",
      img: "asset/img/project/portfolio-frist.avif",
      alt: "First Portfolio",
    },
  ];

  const grid = document.getElementById("projectsGrid");
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  if (!grid) return;

  function renderProjects(filter = "all") {
    const filtered =
      filter === "all"
        ? projectsData
        : projectsData.filter((p) => p.category === filter);

    grid.innerHTML = filtered
      .map(
        (project) => `
      <div class="project-card group rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 flex flex-col justify-between">
        <!-- Thumbnail (16:9) -->
        <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="block aspect-[16/9] overflow-hidden relative bg-gray-900 border-b border-white/10 cursor-pointer" title="${project.title}">
          <img src="${project.img}" alt="${project.alt}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
          <span class="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gray-950/85 backdrop-blur-md border border-white/15 text-emerald-400 flex items-center gap-1.5 shadow-lg">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>Live Demo
          </span>
        </a>

        <!-- Content -->
        <div class="p-6 md:p-7 flex flex-col flex-grow justify-between gap-5">
          <div class="space-y-3">
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
                ${project.title}
              </h3>
            </div>
            <p class="text-sm text-gray-300/80 leading-relaxed">
              ${project.description}
            </p>
            
            <!-- Tech Badges -->
            <div class="flex flex-wrap gap-1.5 pt-1">
              ${project.skills.map((s) => `<span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">${s}</span>`).join("")}
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-2">
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-purple-600 group-hover:border-purple-500 shadow-md">
              <span>Visit Website</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  // Filter click events
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => {
        b.classList.remove("bg-purple-600", "text-white", "border-purple-500", "shadow-lg", "shadow-purple-500/20", "font-semibold");
        b.classList.add("bg-white/5", "text-gray-300", "border-white/10", "font-medium");
      });
      btn.classList.remove("bg-white/5", "text-gray-300", "border-white/10", "font-medium");
      btn.classList.add("bg-purple-600", "text-white", "border-purple-500", "shadow-lg", "shadow-purple-500/20", "font-semibold");

      renderProjects(filter);
    });
  });

  renderProjects("all");
};

const contactSection = () => {
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
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.15 },
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  function registerSendMessageEvent() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      const waNumber = "6285692097048";
      const textWA = `Hello, my name is *${name}*.\n\n*Subject:* ${subject}\n\n*Message:*\n${message}`;

      window.open(
        `https://wa.me/${waNumber}?text=${encodeURIComponent(textWA)}`,
        "_blank",
      );
    });
  }

  initContactReveal();
  registerSendMessageEvent();
};

/**
 * -----------------------------------------------------------------------------
 * 7. FOOTER MODULE
 * Mengelola fitur interaktif pada footer (Back to Top smooth scroll).
 * -----------------------------------------------------------------------------
 */
const footerModule = () => {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

/**
 * =========================================================================
 * APPLICATION KICKSTARTER
 * Menjalankan seluruh sistem script setelah DOMContentLoaded sepenuhnya siap.
 * =========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  // Global Features
  initGridCursorEffect();
  initBackgroundRainEffect();
  initTextScrambleAnimation();

  // Modular Sections
  navigationModule();
  homeSection();
  aboutSection();
  journeySection();
  skillsSection();
  projectsSection();
  contactSection();
  footerModule();
});
