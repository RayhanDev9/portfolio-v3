import fs from "fs";
import path from "path";
import sharp from "sharp";

const DIR = path.resolve("assets/images/sertifikat");
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".tmp.png"));

console.log(`Ditemukan ${files.length} gambar untuk dikonversi ke AVIF...\n`);

let totalOriginal = 0;
let totalConverted = 0;

for (const file of files) {
  const baseName = file.replace(".tmp.png", "");
  const pngPath = path.join(DIR, file);
  const pdfPath = path.join(DIR, `${baseName}.pdf`);
  const avifPath = path.join(DIR, `${baseName}.avif`);

  const pdfSize = fs.existsSync(pdfPath) ? fs.statSync(pdfPath).size : fs.statSync(pngPath).size;

  try {
    await sharp(pngPath)
      .avif({ quality: 85, effort: 4 })
      .toFile(avifPath);

    const avifSize = fs.statSync(avifPath).size;
    const reduction = (((pdfSize - avifSize) / pdfSize) * 100).toFixed(1);

    totalOriginal += pdfSize;
    totalConverted += avifSize;

    console.log(
      `✓ ${baseName}.pdf (${(pdfSize / 1024).toFixed(1)} KB) -> ${baseName}.avif (${(avifSize / 1024).toFixed(1)} KB) [Hemat ${reduction}%]`
    );

    // Hapus file temporary PNG
    fs.unlinkSync(pngPath);
  } catch (err) {
    console.error(`✗ Gagal konversi ${baseName}:`, err.message);
  }
}

const totalReduction = (((totalOriginal - totalConverted) / totalOriginal) * 100).toFixed(1);
console.log(
  `\nSelesai! Ukuran Total: ${(totalOriginal / 1024).toFixed(1)} KB -> ${(totalConverted / 1024).toFixed(1)} KB (Hemat ${totalReduction}%)\n`
);
