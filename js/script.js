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
