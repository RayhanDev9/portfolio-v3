/**
 * =============================================================================
 * CONTACT MODULE
 * Mengelola form pengiriman pesan WhatsApp pada section kontak.
 * (Animasi reveal dikelola secara terpusat oleh js/modules/animations.js)
 * =============================================================================
 */

export function initContact() {
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

  registerSendMessageEvent();
}

