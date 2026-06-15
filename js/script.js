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

  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const scrollingDown = currentY > lastScrollY;

        containerImgHomeEl.forEach((el) => {
          if (scrollingDown) {
            el.style.transform = "translateY(2px)";
          } else {
            el.style.transform = "translateY(-2px)";
          }
        });

        lastScrollY = currentY;
        ticking = false;
      });

      ticking = true;
    }
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function animateImages() {
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
  }

  animateImages();
};

home();
