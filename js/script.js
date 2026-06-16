const nav = () => {
  const openMenu = document.querySelector(".open-menu");
  const closeMenu = document.querySelector(".close-menu");
  const navMobile = document.querySelector(".nav-mobile");
  const data = ["x7z_k0d3_9q", "rmh#b!ru_xx", "jlns0r3_zz9", "t3h_h4ng4t__x"];

  function mobile() {
    // function animasi menu open and close
    async function animaiMenu(text) {
      if (text === "Menu") {
        navMobile.classList.remove("hidden");
        openMenu.textContent = "";
        closeMenu.textContent = "Close";

        await delay(200);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            navMobile.classList.remove("scale-y-0", "opacity-0");
            navMobile.classList.add("scale-y-100", "opacity-100");
          });
        });
      } else {
        navMobile.classList.remove("scale-y-100", "opacity-100");
        navMobile.classList.add("scale-y-0", "opacity-0");

        await delay(200);
        closeMenu.textContent = "";
        openMenu.textContent = "Menu";

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            navMobile.classList.add("hidden");
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

      await delay(100);

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

  const containerHomeText = document.querySelector(".container-home-text");

  // Untuk text home
  function textHome() {
    containerHomeText.classList.remove("opacity-0");
    containerHomeText.classList.remove("opacity-100");
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
            entry.target.classList.remove("opacity-0", "translate-y-8");
            console.info("in");
          } else {
            entry.target.classList.add("opacity-0", "translate-y-8");
          }
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
