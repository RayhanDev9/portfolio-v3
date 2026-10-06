/**
 * =============================================================================
 * NAVIGATION MODULE
 * Mengelola navbar responsif (Desktop sticky & Mobile drawer with auto-hide).
 * =============================================================================
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function initNavigation() {
  const openMenu = document.querySelector(".open-menu");
  const navMobile = document.querySelector(".nav-mobile");
  const navMobileContent = document.querySelector(".nav-mobile-content");
  const topBarMobileEl = document.querySelector(".top-bar-mobile");
  const topBarDekstopEl = document.querySelector(".top-bar-dekstop");
  let isMenuOpen = false;

  const glitchWords = ["x7z_9q", "c0d3_99", "d3v_xx"];

  // Efek teks glitch responsif untuk tombol menu
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
    if (window.innerWidth >= 1024) {
      if (topBarMobileEl) {
        topBarMobileEl.classList.remove("-translate-y-full");
      }
      return;
    }

    if (isMenuOpen) return;

    const currentScrollY =
      window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = currentScrollY - lastScrollY;

    if (!topBarMobileEl) return;

    if (currentScrollY <= 20) {
      topBarMobileEl.classList.remove("-translate-y-full");
      topBarMobileEl.classList.remove(
        "bg-gray-950/80",
        "backdrop-blur-md",
        "border-b",
        "border-white/5",
        "shadow-lg",
      );
    } else {
      topBarMobileEl.classList.add(
        "bg-gray-950/80",
        "backdrop-blur-md",
        "border-b",
        "border-white/5",
        "shadow-lg",
      );

      if (scrollDelta > 8 && currentScrollY > 80) {
        topBarMobileEl.classList.add("-translate-y-full");
      } else if (scrollDelta < -8) {
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

  handleStickyNavbar(topBarDekstopEl);
  initNavigationActiveStateEventClick();
  initNavigationScrollSpy();
}
