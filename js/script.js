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
  const closeMenu = document.querySelector(".close-menu");
  const navMobile = document.querySelector(".nav-mobile");
  const topBarMobileEl = document.querySelector(".top-bar-mobile");
  const topBarDekstopEl = document.querySelector(".top-bar-dekstop");
  const glitchWords = [
    "x7z_k0d3_9q",
    "c0d3_fl0w_99",
    "d3v_m0d3_xx",
    "n3t_runn3r_z",
  ];

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

  async function executeMenuTransition(menuStateText) {
    if (menuStateText === "Menu") {
      navMobile.classList.remove("hidden");
      openMenu.textContent = "";
      closeMenu.textContent = "Close";
      topBarMobileEl.classList.add("hidden", "opacity-0");
      await delay(100);
      requestAnimationFrame(() => {
        navMobile.classList.remove("scale-y-0", "opacity-0");
        navMobile.classList.add("scale-y-100", "opacity-100");
      });
    } else {
      navMobile.classList.remove("scale-y-100", "opacity-100");
      navMobile.classList.add("scale-y-0", "opacity-0");
      await delay(100);
      closeMenu.textContent = "";
      openMenu.textContent = "Menu";
      topBarMobileEl.classList.remove("hidden", "opacity-0");
      requestAnimationFrame(() => navMobile.classList.add("hidden"));
    }
  }

  async function triggerMenuGlitchEffect(finalText, buttonElement) {
    for (let i = 0; i < glitchWords.length; i++) {
      buttonElement.textContent =
        i !== glitchWords.length - 1 ? glitchWords[i] : finalText;
      await delay(50);
    }
    await delay(80);
    executeMenuTransition(finalText);
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

  // Event Listeners Mobile Toggle Menu
  if (openMenu && closeMenu) {
    openMenu.addEventListener("click", () =>
      triggerMenuGlitchEffect("Menu", openMenu),
    );
    closeMenu.addEventListener("click", () =>
      triggerMenuGlitchEffect("Close", closeMenu),
    );
  }

  // Execution Modul
  handleStickyNavbar(topBarMobileEl);
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
      { threshold: 0.15 },
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

const skillProjectSection = () => {
  // DATA DATA BERBENTUK OBJECT (Mencegah duplikasi manual di HTML)
  const skillsData = [
    { name: "HTML", src: "asset/svg/skill/html-5.svg" },
    { name: "CSS", src: "asset/svg/skill/css-3.svg" },
    { name: "JS", src: "asset/svg/skill/javascript.svg" },
    { name: "TypeScript", src: "asset/svg/skill/typescript.svg" },
    { name: "React", src: "asset/svg/skill/react.svg" },
    { name: "Redux", src: "asset/svg/skill/redux.svg" },
    { name: "React Query", src: "asset/svg/skill/react-query.svg" },
    { name: "React Router", src: "asset/svg/skill/react-router.svg" },
    { name: "Tailwind", src: "asset/svg/skill/tailwind.svg" },
    { name: "Vite", src: "asset/svg/skill/vite.svg" },
    { name: "Framer Motion", src: "asset/svg/skill/framer-motion.svg" },
    { name: "Axios", src: "asset/svg/skill/axios.svg" },
    { name: "Git", src: "asset/svg/skill/git.svg" },
    { name: "GitHub", src: "asset/svg/skill/github.svg" },
    { name: "Sass", src: "asset/svg/skill/sass.svg" },
    { name: "Bootstrap-4", src: "asset/svg/skill/bootstrap-4.svg" },
    { name: "Jquery", src: "asset/svg/skill/jquery.svg" },
    { name: "Json", src: "asset/svg/skill/json.svg" },
    { name: "C++", src: "asset/svg/skill/cplusplus.svg" },
  ];


  const projectsData = [
    {
      title: "Fast React Pizza",
      description: "Interactive pizza ordering application featuring live cart management and SPA client-side routing.",
      skills: ["React 18", "Redux Toolkit", "React Router", "Tailwind CSS", "Vite"],
      url: "https://rayhandev9.github.io/fast-pizza/menu",
      img: "asset/img/project/fast-pizza.avif",
      alt: "Fast React Pizza",
    },
    {
      title: "Siap Kerja",
      description: "Interactive career preparation platform integrated with AI-driven career recommendations and curated courses.",
      skills: ["React", "Redux Toolkit", "Gemini AI", "Framer Motion", "Vite"],
      url: "https://rayhandev9.github.io/siap-kerja/#/landingPage",
      img: "asset/img/project/siap-kerja.avif",
      alt: "Siap Kerja",
    },
    {
      title: "Danu Satya Portfolio",
      description: "Official production portfolio website built for a Graphic and Motion Designer.",
      skills: ["React 19", "TypeScript", "Tailwind CSS v4", "Lucide Icons", "Vite"],
      url: "https://danusatya.my.id/",
      img: "asset/img/project/portfolio-danu.avif",
      alt: "Danu Satya Portfolio",
    },
    {
      title: "TK PAUD Permata",
      description: "Official educational institutional web profile with custom live domain and responsive design.",
      skills: ["Front-End Arch", "HTML5/CSS3", "JavaScript", "Responsive UI", "SEO"],
      url: "https://permatabelajar.my.id/",
      img: "asset/img/project/tk.avif",
      alt: "TK PAUD Permata",
    },
    {
      title: "Mading Kampus",
      description: "Digital campus magazine web portal for publishing student articles, news, and campus announcements.",
      skills: ["Tailwind CSS", "HTML5 Semantic", "JavaScript", "Responsive Design"],
      url: "https://rayhandev9.github.io/mading-kampus/",
      img: "asset/img/project/mading-kampus.avif",
      alt: "Mading Kampus",
    },
    {
      title: "Store Radeva",
      description: "Modern e-commerce catalog landing page featuring interactive product showcases and navigation.",
      skills: ["CSS Layout", "Flexbox/Grid", "DOM Manipulation", "Interactive UI"],
      url: "https://rayhandev9.github.io/radeva/",
      img: "asset/img/project/store-radeva.avif",
      alt: "Store Radeva",
    },
    {
      title: "Company Profile ISC",
      description: "Community profile website showcasing community identity, tech events, and contact channels.",
      skills: ["Semantic HTML", "Responsive Web", "CSS Animation", "Clean Layout"],
      url: "https://rayhandev9.github.io/company-profile-isc/",
      img: "asset/img/project/isc.avif",
      alt: "Company Profile ISC",
    },
    {
      title: "Pig Game",
      description: "Interactive 2-player dice game with turn-based state logic and 100-point winning condition.",
      skills: ["JavaScript Logic", "State Management", "DOM Events", "CSS Transition"],
      url: "https://pig-game-virid-delta.vercel.app/",
      img: "asset/img/project/game.avif",
      alt: "Pig Game",
    },
    {
      title: "First Portfolio",
      description: "My first web development milestone representing the foundation of my coding journey.",
      skills: ["HTML5", "CSS3", "Flexbox", "Vanilla JavaScript"],
      url: "https://first-portfolio-hkyum9qh0-rayhans-projects-6dbf92f1.vercel.app/",
      img: "asset/img/project/portfolio-frist.avif",
      alt: "First Portfolio",
    },
  ];

  function renderCarouselTracks() {
    const tracks = document.querySelectorAll("#skill-project .carousel .track");
    if (tracks.length < 2) return;

    // Loop & Rendering data Skill (Track Pertama)
    // Otomatis melakukan duplikasi array [...skillsData, ...skillsData] untuk infinite loop carousel
    const combinedSkills = [...skillsData, ...skillsData];
    tracks[0].innerHTML = combinedSkills
      .map(
        (skill) => `
      <div class="item-logo rounded-2xl group/skill relative h-12 w-24 md:h-16 md:w-32 shrink-0 flex items-center justify-center bg-white/5 border border-white/10  p-3 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer" title="${skill.name}">
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

    // Loop & Rendering data Project (Track Kedua)
    // Otomatis melakukan duplikasi array [...projectsData, ...projectsData] untuk infinite loop carousel
    const combinedProjects = [...projectsData, ...projectsData];
    tracks[1].innerHTML = combinedProjects
      .map(
        (project) => `
      <div class="item group/proj relative h-52 sm:h-64 md:h-72 w-[280px] sm:w-[380px] md:w-[460px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-xl">
        <a href="${project.url}" target="_blank" class="block w-full h-full relative" title="${project.title}">
          <!-- Thumbnail Image -->
          <img src="${project.img}" alt="${project.alt}" class="w-full h-full object-cover aspect-[16/9] transition-transform duration-500 ease-out group-hover/proj:scale-105" />

          <!-- Sharp Solid Gradient Overlay (Tanpa backdrop-blur, Teks 100% Tajam) -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-0 group-hover/proj:opacity-100 transition-opacity duration-300">
            <div class="antialiased">
              <!-- Title & External Link Icon -->
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide truncate pr-2">${project.title}</h4>
                <span class="p-1 sm:p-1.5 rounded-full bg-white/10 text-white/90 shrink-0 group-hover/proj:bg-purple-600 transition-colors duration-200">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </span>
              </div>

              <!-- Description -->
              <p class="text-[11px] sm:text-xs md:text-sm text-gray-200 line-clamp-2 mb-2 sm:mb-3 leading-relaxed">${project.description}</p>
              
              <!-- Skill Badges -->
              <div class="flex flex-wrap gap-1 sm:gap-1.5">
                ${project.skills.map((s) => `<span class="px-2 py-0.5 text-[9px] sm:text-[11px] font-medium rounded-md bg-purple-500/25 text-purple-200 border border-purple-500/40 whitespace-nowrap">${s}</span>`).join("")}
              </div>
            </div>
          </div>
        </a>
      </div>
    `,
      )
      .join("");
  }

  // Event listener untuk menghentikan animasi track secara independen saat di-hover
  function initCarouselHoverPause() {
    const carousels = document.querySelectorAll("#skill-project .carousel");
    carousels.forEach((carousel) => {
      const track = carousel.querySelector(".track");
      if (!track) return;

      carousel.addEventListener("mouseenter", () => {
        track.style.animationPlayState = "paused";
      });

      carousel.addEventListener("mouseleave", () => {
        track.style.animationPlayState = "running";
      });
    });
  }

  renderCarouselTracks();
  initCarouselHoverPause();
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
  skillProjectSection();
  contactSection();
});
