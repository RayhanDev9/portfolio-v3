(function () {
  // Menggunakan const karena referensi elemen DOM tidak berubah
  const heroSection  = document.getElementById('hero-section');
  const desktopCards = heroSection.querySelectorAll('.hidden.md\\:block .float-card');
  const mobileCards  = heroSection.querySelectorAll('.block.md\\:hidden .float-card-m');
  
  const mq = window.matchMedia('(min-width: 768px)');
  let ticking = false; // Menggunakan let karena nilainya akan diubah-ubah (true/false)

  // ===== DESKTOP: kartu mengikuti arah pergerakan mouse =====
  function onMouseMove(e) {
    const mx = (e.clientX / window.innerWidth) - 0.5;   // -0.5 .. 0.5
    const my = (e.clientY / window.innerHeight) - 0.5;  // -0.5 .. 0.5

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        desktopCards.forEach(function (card) {
          const depth = parseFloat(card.dataset.depth) || 30;
          const tx = mx * depth;
          const ty = my * depth;
          card.style.transform = 'translate(' + tx.toFixed(2) + 'px, ' + ty.toFixed(2) + 'px)';
        });
        ticking = false;
      });
    }
  }

  function resetDesktop() {
    desktopCards.forEach(function (card) { card.style.transform = ''; });
  }

  // ===== MOBILE: kartu bergerak sesuai progres scroll =====
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height + vh;
        
        // progress 0 -> section baru masuk viewport, 1 -> section sudah lewat
        let progress = (vh - rect.top) / total;
        progress = Math.min(Math.max(progress, 0), 1);
        const offsetFactor = (progress - 0.5) * 2; // -1 .. 1

        mobileCards.forEach(function (card) {
          const speed = parseFloat(card.dataset.speed) || 0.2;
          const ty = offsetFactor * speed * 100; // px
          card.style.transform = 'translateY(' + ty.toFixed(2) + 'px)';
        });
        ticking = false;
      });
    }
  }

  function resetMobile() {
    mobileCards.forEach(function (card) { card.style.transform = ''; });
  }

  function bindForViewport() {
    if (mq.matches) {
      // desktop aktif
      window.addEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      resetMobile();
    } else {
      // mobile aktif
      window.removeEventListener('mousemove', onMouseMove);
      window.addEventListener('scroll', onScroll, { passive: true });
      resetDesktop();
      onScroll();
    }
  }

  // Inisialisasi awal & listener responsive
  if (heroSection) {
    bindForViewport();
    mq.addEventListener('change', bindForViewport);
  }
})();