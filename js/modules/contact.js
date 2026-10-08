/**
 * =============================================================================
 * CONTACT MODULE
 * Mengelola animasi reveal pada section kontak dan form pengiriman pesan WhatsApp.
 * =============================================================================
 */

export function initContact() {
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

      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const subject = document.getElementById("subject")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      const waNumber = "6285692097048";
      const textWA = [
        `Halo Muhamad Rayhan,`,
        ``,
        `Saya menghubungi Anda melalui formulir kontak portfolio (rayhandev.my.id).`,
        ``,
        `────────────────────────`,
        `*Informasi Kontak:*`,
        `• *Nama:* ${name}`,
        email ? `• *Email:* ${email}` : null,
        `• *Perihal:* ${subject}`,
        `────────────────────────`,
        ``,
        `*Pesan:*`,
        message,
        ``,
        `────────────────────────`,
        `Terima kasih atas waktu dan perhatiannya.`,
      ]
        .filter(Boolean)
        .join("\n");

      window.open(
        `https://wa.me/${waNumber}?text=${encodeURIComponent(textWA)}`,
        "_blank",
      );
    });
  }

  initContactReveal();
  registerSendMessageEvent();
}
