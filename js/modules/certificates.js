/**
 * =============================================================================
 * CERTIFICATES MODULE
 * Menampilkan grid sertifikat terverifikasi (Udemy & Codepolitan), filter kategori,
 * dan modal lightbox pop-up untuk melihat sertifikat dalam resolusi penuh.
 * =============================================================================
 */
import { certificatesData } from "../data/certificates.data.js";

export function initCertificates() {
  const grid = document.getElementById("certificatesGrid");
  const filterBtns = document.querySelectorAll(".cert-filter-btn");
  const modal = document.getElementById("certificateModal");
  const modalContent = document.getElementById("certModalContent");
  const modalClose = document.getElementById("certModalClose");
  const modalImg = document.getElementById("certModalImg");
  const modalTitle = document.getElementById("certModalTitle");
  const modalIssuer = document.getElementById("certModalIssuer");
  const modalBadge = document.getElementById("certModalBadge");

  if (!grid) return;

  function openModal(cert) {
    if (!modal) return;
    modalImg.src = cert.img;
    modalImg.alt = cert.alt;
    modalTitle.textContent = cert.title;
    modalIssuer.innerHTML = `Issuer / Instructor: <span class="text-white font-semibold">${cert.issuer}</span>`;

    if (cert.platform === "udemy") {
      modalBadge.className =
        "px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30";
      modalBadge.textContent = "Udemy";
    } else {
      modalBadge.className =
        "px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      modalBadge.textContent = "Codepolitan";
    }

    modal.classList.remove("hidden");
    // Trigger transition
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      modal.classList.add("flex", "opacity-100");
      if (modalContent) {
        modalContent.classList.remove("scale-95");
        modalContent.classList.add("scale-100");
      }
    });

    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add("opacity-0");
    if (modalContent) {
      modalContent.classList.remove("scale-100");
      modalContent.classList.add("scale-95");
    }
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex", "opacity-100");
      document.body.style.overflow = "";
      if (modalImg) modalImg.src = "";
    }, 250);
  }

  // Event listener modal close
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  function renderCertificates(filter = "all") {
    const filtered =
      filter === "all"
        ? certificatesData
        : certificatesData.filter((c) => c.platform === filter);

    grid.innerHTML = filtered
      .map((cert) => {
        const isUdemy = cert.platform === "udemy";
        const badgeClass = isUdemy
          ? "bg-purple-950/90 text-purple-300 border-purple-500/40"
          : "bg-emerald-950/90 text-emerald-300 border-emerald-500/40";
        const dotClass = isUdemy ? "bg-purple-400" : "bg-emerald-400";

        return `
        <div class="cert-card group rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 flex flex-col justify-between">
          <!-- Thumbnail Image (Clickable for Modal) -->
          <div
            data-id="${cert.id}"
            class="open-cert-preview block aspect-[16/10] overflow-hidden relative bg-gray-900 border-b border-white/10 cursor-pointer"
            title="Click to expand ${cert.title}"
          >
            <img
              src="${cert.img}"
              alt="${cert.alt}"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            
            <!-- Platform Badge -->
            <span class="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${badgeClass} flex items-center gap-1.5 shadow-lg">
              <span class="w-2 h-2 rounded-full ${dotClass}"></span>
              <span>${cert.platformName}</span>
            </span>

            <!-- Zoom Indicator Overlay -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span class="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
                <span>View Certificate</span>
              </span>
            </div>
          </div>

          <!-- Content Details -->
          <div class="p-5 md:p-6 flex flex-col flex-grow justify-between gap-4">
            <div class="space-y-2.5">
              <div class="flex items-start justify-between gap-2">
                <h3 class="text-base md:text-lg font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight line-clamp-2">
                  ${cert.title}
                </h3>
              </div>

              <p class="text-xs font-medium text-purple-300/90 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="truncate">${cert.issuer}</span>
              </p>

              <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                ${cert.desc}
              </p>

              <!-- Skill Badges -->
              <div class="flex flex-wrap gap-1 pt-1">
                ${cert.skills
                  .slice(0, 3)
                  .map(
                    (s) =>
                      `<span class="px-2 py-0.5 text-[11px] font-medium rounded-md bg-white/5 text-gray-300 border border-white/10">${s}</span>`
                  )
                  .join("")}
              </div>
            </div>

            <!-- Action Button -->
            <div class="pt-2">
              <button
                type="button"
                data-id="${cert.id}"
                class="open-cert-preview w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-purple-600 active:scale-[0.98] border border-white/10 hover:border-purple-500 text-xs font-semibold text-white transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Preview Certificate</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    // Attach click listeners to cards and preview buttons
    grid.querySelectorAll(".open-cert-preview").forEach((btn) => {
      btn.addEventListener("click", () => {
        const certId = btn.getAttribute("data-id");
        const cert = certificatesData.find((c) => c.id === certId);
        if (cert) openModal(cert);
      });
    });
  }

  // Filter click events
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => {
        b.classList.remove(
          "bg-purple-600",
          "text-white",
          "border-purple-500",
          "shadow-lg",
          "shadow-purple-500/20",
          "font-semibold"
        );
        b.classList.add(
          "bg-white/5",
          "text-gray-300",
          "border-white/10",
          "font-medium"
        );
      });
      btn.classList.remove(
        "bg-white/5",
        "text-gray-300",
        "border-white/10",
        "font-medium"
      );
      btn.classList.add(
        "bg-purple-600",
        "text-white",
        "border-purple-500",
        "shadow-lg",
        "shadow-purple-500/20",
        "font-semibold"
      );

      renderCertificates(filter);
    });
  });

  renderCertificates("all");
}
