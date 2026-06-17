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
    "rmh#b!ru_xx",
    "jlns0r3_zz9",
    "t3h_h4ng4t__x",
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
    return Math.floor(window.innerWidth / 10);
  }

  function getRandomX() {
    return Math.floor(Math.random() * window.innerWidth);
  }

  function getRandomY() {
    return Math.floor(Math.random() * document.documentElement.scrollHeight);
  }

  function getRainSpeed() {
    const totalHeight = document.documentElement.scrollHeight;
    const baseSpeed = (totalHeight / 1000) * 8;
    return baseSpeed + Math.random() * 3;
  }

  function spawnRainDrop() {
    const currentRain = containerRain.querySelectorAll(".rain");
    if (currentRain.length >= getMaxRainCount()) return;

    const rainDrop = document.createElement("div");
    rainDrop.classList.add("rain");

    rainDrop.style.setProperty("--speed", `${getRainSpeed()}s`);
    rainDrop.style.setProperty("--geserX", `${getRandomX()}px`);
    rainDrop.style.setProperty("--top", `${getRandomY()}px`);
    rainDrop.style.setProperty("--geserY", `-20px`);
    rainDrop.style.animationDelay = `${Math.random() * 0.5}s`;

    containerRain.appendChild(rainDrop);
  }

  const rainInterval = setInterval(() => {
    const currentRain = containerRain.querySelectorAll(".rain");
    if (currentRain.length >= getMaxRainCount()) {
      clearInterval(rainInterval);
    } else {
      spawnRainDrop();
    }
  }, 40);
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
    "rmh#b!ru_xx",
    "jlns0r3_zz9",
    "t3h_h4ng4t__x",
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
    { name: "Tailwind", src: "asset/svg/skill/tailwind.svg" },
    { name: "Git", src: "asset/svg/skill/git.svg" },
    { name: "GitHub", src: "asset/svg/skill/github.svg" },
    { name: "Sass", src: "asset/svg/skill/sass.svg" },
    { name: "Json", src: "asset/svg/skill/json.svg" },
    { name: "Jquery", src: "asset/svg/skill/jquery.svg" },
    { name: "Bootstrap-4", src: "asset/svg/skill/bootstrap-4.svg" },
  ];

  const projectsData = [
    {
      url: "https://pig-game-virid-delta.vercel.app/",
      img: "asset/img/project/game.avif",
      alt: "Game",
    },
    {
      url: "https://rayhandev9.github.io/company-profile-isc/",
      img: "asset/img/project/isc.avif",
      alt: "Isc",
    },
    {
      url: "https://first-portfolio-hkyum9qh0-rayhans-projects-6dbf92f1.vercel.app/",
      img: "asset/img/project/portfolio-frist.avif",
      alt: "Portfolio First",
    },
    {
      url: "https://rayhandev9.github.io/radeva/",
      img: "asset/img/project/store-radeva.avif",
      alt: "store-radeva",
    },
    {
      url: "https://permatabelajar.my.id/",
      img: "asset/img/project/tk.avif",
      alt: "TK",
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
      <div class="item-logo h-12 w-24 md:h-16 md:w-32 shrink-0 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl p-3">
        <img src="${skill.src}" alt="${skill.name}" class="h-full object-contain max-w-full" />
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
      <div class="item h-32 sm:h-48 md:h-64 w-[calc((100vw-48px)/3)] md:w-[455px] shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
        <a href="${project.url}" target="_blank">
          <img src="${project.img}" alt="${project.alt}" class="w-full h-full object-cover aspect-[16/9]" />
        </a>
      </div>
    `,
      )
      .join("");
  }

  renderCarouselTracks();
};

const contactSection = () => {
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

  function registerSendMessageEvent() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      const waNumber = "6285692097048";
      const textWA = `Halo, nama saya *${name}*.\n\n*Subjek:* ${subject}\n\n*Pesan:*\n${message}`;

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
