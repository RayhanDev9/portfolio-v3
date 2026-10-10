/**
 * =============================================================================
 * APPLICATION MAIN ENTRYPOINT
 * Mengimpor dan menginisialisasi seluruh modul aplikasi secara terstruktur.
 * =============================================================================
 */

import { initNavigation } from "./modules/navigation.js";
import { initSkills } from "./modules/skills.js";
import { initCertificates } from "./modules/certificates.js";
import { initProjects } from "./modules/projects.js";
import { initContact } from "./modules/contact.js";
import {
  initGridCursorEffect,
  initBackgroundRainEffect,
  initTextScrambleAnimation,
  initScrollReveals,
} from "./modules/animations.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Modul Navigasi & Sections (Render Konten Dinamis)
  initSkills();
  initCertificates();
  initProjects();
  initNavigation();
  initContact();

  // 2. Inisialisasi Efek Global & Animasi Scroll Reveal Terpadu
  initGridCursorEffect();
  initBackgroundRainEffect();
  initTextScrambleAnimation();
  initScrollReveals();
});
