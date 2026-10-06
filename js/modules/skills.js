/**
 * =============================================================================
 * SKILLS MODULE
 * Menampilkan Categorized Bento Grid keahlian teknis (Core, Styling, Tools).
 * =============================================================================
 */
import { skillCategories } from "../data/skills.data.js";

export function initSkills() {
  const container = document.getElementById("skillsContainer");
  if (!container) return;

  container.innerHTML = skillCategories
    .map(
      (cat) => `
    <div class="p-6 md:p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div class="flex items-center gap-3.5 mb-6">
          <div class="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-105 transition-all">
            ${cat.icon}
          </div>
          <div>
            <h3 class="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">${cat.title}</h3>
            <p class="text-xs text-gray-400">${cat.description}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          ${cat.skills
            .map(
              (s) => `
            <div class="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-200 group/pill">
              <img src="${s.src}" alt="${s.name}" class="w-5 h-5 object-contain shrink-0 transition-transform group-hover/pill:scale-110" loading="lazy" />
              <span class="text-xs font-medium text-gray-300 group-hover/pill:text-white transition-colors truncate">${s.name}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}
