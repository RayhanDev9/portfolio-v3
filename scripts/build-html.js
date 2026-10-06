import fs from "fs";
import path from "path";

const TEMPLATE_PATH = path.resolve("src/template.html");
const OUTPUT_PATH = path.resolve("index.html");

function buildHTML() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error("Template tidak ditemukan:", TEMPLATE_PATH);
    return;
  }

  let html = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  // Regex untuk mencocokkan <load src="..." /> atau <load ="..." />
  const loadRegex = /<load\s+(?:src=)?["']([^"']+)["']\s*(?:\/>|><\/load>)/g;

  html = html.replace(loadRegex, (match, componentPath) => {
    const resolvedPath = path.resolve(componentPath);
    if (fs.existsSync(resolvedPath)) {
      console.log(`✓ Injecting component: ${componentPath}`);
      return fs.readFileSync(resolvedPath, "utf-8");
    } else {
      console.warn(`⚠ Component tidak ditemukan: ${resolvedPath}`);
      return `<!-- Missing component: ${componentPath} -->`;
    }
  });

  fs.writeFileSync(OUTPUT_PATH, html, "utf-8");
  console.log(`\n🎉 Berhasil menyusun root index.html dari src/components/!`);
}

buildHTML();
