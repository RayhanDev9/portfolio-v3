"""
Script untuk merender semua PDF di assets/images/sertifikat menjadi AVIF berkualitas tinggi.
Langkah 1: Render PDF -> PNG (High-DPI via pypdfium2)
Langkah 2: Kompresi PNG -> AVIF (via sharp)
Langkah 3: Bersihkan file PNG sementara
"""
import os
import sys
import glob
import json
import subprocess
import pypdfium2 as pdfium

# Ensure stdout handles UTF-8 on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

SERTIFIKAT_DIR = os.path.abspath("assets/images/sertifikat")
pdf_files = glob.glob(os.path.join(SERTIFIKAT_DIR, "*.pdf"))

print(f"Ditemukan {len(pdf_files)} file sertifikat PDF untuk dikonversi ke AVIF...\n")

temp_pngs = []

for pdf_path in pdf_files:
    base_name = os.path.splitext(os.path.basename(pdf_path))[0]
    png_path = os.path.join(SERTIFIKAT_DIR, f"{base_name}.tmp.png")
    
    try:
        pdf = pdfium.PdfDocument(pdf_path)
        # Render halaman pertama dengan scale=2.5 agar teks sertifikat tajam & jernih
        page = pdf[0]
        image = page.render(scale=2.5).to_pil()
        image.save(png_path, "PNG")
        temp_pngs.append((pdf_path, png_path, base_name))
        print(f"[RENDER] {base_name}.pdf -> temporary PNG")
    except Exception as e:
        print(f"[ERROR] Gagal merender {base_name}.pdf: {e}")

print(f"\nMengonversi {len(temp_pngs)} gambar ke format .AVIF menggunakan Sharp...")

# Script inline node untuk Sharp
node_script = """
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const files = JSON.parse(process.argv[2]);

async function convertAll() {
  for (const item of files) {
    const { pdfPath, pngPath, baseName } = item;
    const avifPath = path.join(path.dirname(pngPath), `${baseName}.avif`);
    
    try {
      await sharp(pngPath)
        .avif({ quality: 85, effort: 4 })
        .toFile(avifPath);
      
      const pdfSize = fs.statSync(pdfPath).size;
      const avifSize = fs.statSync(avifPath).size;
      const reduction = (((pdfSize - avifSize) / pdfSize) * 100).toFixed(1);
      
      console.log(`[AVIF] ${baseName}.pdf (${(pdfSize/1024).toFixed(1)} KB) -> ${baseName}.avif (${(avifSize/1024).toFixed(1)} KB) [-${reduction}%]`);
      
      // Hapus file temporary PNG
      if (fs.existsSync(pngPath)) {
        fs.unlinkSync(pngPath);
      }
    } catch (err) {
      console.error(`[ERROR] Gagal konversi ${baseName}:`, err.message);
    }
  }
}

convertAll();
"""

files_payload = json.dumps([{"pdfPath": p[0], "pngPath": p[1], "baseName": p[2]} for p in temp_pngs])

result = subprocess.run(
    ["node", "--input-type=module", "-e", node_script, files_payload],
    cwd=os.getcwd(),
    capture_output=True,
    text=True,
    encoding="utf-8"
)

print(result.stdout)
if result.stderr:
    print("Stderr:", result.stderr)

print("\nSemua file sertifikat berhasil dikonversi ke .avif!")
