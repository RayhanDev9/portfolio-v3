/**
 * =============================================================================
 * PROJECTS MODULE
 * Menampilkan Showcase Grid karya/proyek dengan sistem filter kategori dan
 * rendering metadata kolaborasi tim (FE, BE, UI/UX).
 * =============================================================================
 */
import { projectsData } from "../data/projects.data.js";

export function initProjects() {
  const grid = document.getElementById("projectsGrid");
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  if (!grid) return;

  function renderProjects(filter = "all") {
    const filtered =
      filter === "all"
        ? projectsData
        : projectsData.filter((p) => p.category === filter);

    grid.innerHTML = filtered
      .map(
        (project) => `
      <div class="project-card group rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 flex flex-col justify-between">
        <!-- Thumbnail (16:9) -->
        <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="block aspect-[16/9] overflow-hidden relative bg-gray-900 border-b border-white/10 cursor-pointer" title="${project.title}">
          <img src="${project.img}" alt="${project.alt}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
          ${
            project.collab
              ? `
          <span class="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-950/85 backdrop-blur-md border border-purple-500/30 text-purple-300 flex items-center gap-1.5 shadow-lg">
            <svg class="w-3.5 h-3.5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <span>${project.collab}</span>
          </span>`
              : ""
          }
          <span class="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gray-950/85 backdrop-blur-md border border-white/15 text-emerald-400 flex items-center gap-1.5 shadow-lg">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>Live Demo
          </span>
        </a>

        <!-- Content -->
        <div class="p-6 md:p-7 flex flex-col flex-grow justify-between gap-5">
          <div class="space-y-3">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <h3 class="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
                ${project.title}
              </h3>
              ${
                project.role
                  ? `
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0">
                ${project.role}
              </span>`
                  : ""
              }
            </div>
            <p class="text-sm text-gray-300/80 leading-relaxed">
              ${project.description}
            </p>
            
            <!-- Tech Badges -->
            <div class="flex flex-wrap gap-1.5 pt-1">
              ${project.skills
                .map(
                  (s) =>
                    `<span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">${s}</span>`,
                )
                .join("")}
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-2">
            <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-purple-600 group-hover:border-purple-500 shadow-md">
              <span>Visit Website</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
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
          "font-semibold",
        );
        b.classList.add(
          "bg-white/5",
          "text-gray-300",
          "border-white/10",
          "font-medium",
        );
      });
      btn.classList.remove(
        "bg-white/5",
        "text-gray-300",
        "border-white/10",
        "font-medium",
      );
      btn.classList.add(
        "bg-purple-600",
        "text-white",
        "border-purple-500",
        "shadow-lg",
        "shadow-purple-500/20",
        "font-semibold",
      );

      renderProjects(filter);
    });
  });

  renderProjects("all");
}
