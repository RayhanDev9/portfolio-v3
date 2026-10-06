import fs from "fs";
import path from "path";
import sharp from "sharp";

const TARGET_DIR = path.resolve("asset/img");
const SUPPORTED_EXTS = [".png", ".jpg", ".jpeg", ".webp"];
const shouldDeleteSource = process.argv.includes("--delete-source");

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_EXTS.includes(ext)) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function convertImages() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`Folder tidak ditemukan: ${TARGET_DIR}`);
    return;
  }

  const files = getFilesRecursively(TARGET_DIR);

  if (files.length === 0) {
    console.log("Tidak ada gambar (.png, .jpg, .jpeg, .webp) yang perlu dikonversi.");
    return;
  }

  console.log(`Ditemukan ${files.length} file gambar untuk dikonversi ke .avif...\n`);

  let totalOriginal = 0;
  let totalConverted = 0;

  for (const filePath of files) {
    const parsed = path.parse(filePath);
    const outputPath = path.join(parsed.dir, `${parsed.name}.avif`);
    const originalSize = fs.statSync(filePath).size;

    try {
      await sharp(filePath)
        .avif({ quality: 80, effort: 4 })
        .toFile(outputPath);

      const convertedSize = fs.statSync(outputPath).size;
      const reduction = (
        ((originalSize - convertedSize) / originalSize) *
        100
      ).toFixed(1);

      totalOriginal += originalSize;
      totalConverted += convertedSize;

      console.log(
        `✓ ${parsed.base} -> ${parsed.name}.avif | ${formatBytes(originalSize)} -> ${formatBytes(convertedSize)} (-${reduction}%)`
      );

      if (shouldDeleteSource) {
        fs.unlinkSync(filePath);
        console.log(`  (File asli ${parsed.base} dihapus)`);
      }
    } catch (err) {
      console.error(`✗ Gagal mengonversi ${parsed.base}:`, err.message);
    }
  }

  const totalSaved = (
    ((totalOriginal - totalConverted) / totalOriginal) *
    100
  ).toFixed(1);
  console.log(
    `\nSelesai! Total ukuran: ${formatBytes(totalOriginal)} -> ${formatBytes(totalConverted)} (Hemat ${totalSaved}%)`
  );
}

convertImages();
