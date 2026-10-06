/**
 * =============================================================================
 * APPLICATION MAIN ENTRYPOINT
 * Mengimpor dan menginisialisasi seluruh modul aplikasi secara terstruktur.
 * =============================================================================
 */

import { initNavigation } from "./modules/navigation.js";
import { initSkills } from "./modules/skills.js";
import { initProjects } from "./modules/projects.js";
import { initContact } from "./modules/contact.js";
import {
  initGridCursorEffect,
  initBackgroundRainEffect,
  initTextScrambleAnimation,
  initScrollReveals,
} from "./modules/animations.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Efek Global & Animasi
  initGridCursorEffect();
  initBackgroundRainEffect();
  initTextScrambleAnimation();
  initScrollReveals();

  // 2. Inisialisasi Modul Navigasi & Sections
  initNavigation();
  initSkills();
  initProjects();
  initContact();
});
