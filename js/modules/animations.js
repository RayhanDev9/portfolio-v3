/**
 * =============================================================================
 * ANIMATIONS & EFFECTS MODULE
 * Mengelola efek visual interaktif: Grid Cursor, Matrix Rain, Text Scramble,
 * Intersection Observer scroll reveals, dan Back to Top button.
 * =============================================================================
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Global Scramble Text Effect (Intersection Observer)
export function initTextScrambleAnimation() {
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
export function initGridCursorEffect() {
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
export function initBackgroundRainEffect() {
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

    const duration = 6.6 + Math.random() * 1.2;
    const dropDelay = -(Math.random() * duration);

    rainDrop.style.left = `${getRandomX()}px`;
    rainDrop.style.setProperty("--speed", `${duration.toFixed(2)}s`);
    rainDrop.style.animationDelay = `${dropDelay.toFixed(2)}s`;

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

// Unified Scroll Reveals for All Sections (Hero, About, Journey, Skills, Projects, Certs, Contact, Footer)
export function initScrollReveals() {
  const revealElements = document.querySelectorAll(
    ".reveal-on-scroll, .home-animasi, .reveal, .timeline-item, .timeline-item-mobile, .contact-animasi",
  );

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            // Clean up initial legacy utility classes
            el.classList.remove(
              "opacity-0",
              "translate-y-8",
              "translate-y-10",
              "-translate-y-10",
            );
            // Apply standardized revealed state
            el.classList.add(
              "opacity-100",
              "translate-y-0",
              "is-revealed",
              "reveal-visible",
            );
            revealObserver.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // Journey Timeline Progress Animation
  const journeySection = document.getElementById("journey");
  const timelineProgress = document.getElementById("timeline-progress");
  if (journeySection && timelineProgress) {
    const journeyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timelineProgress.style.width = "100%";
            journeyObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    journeyObserver.observe(journeySection);
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

