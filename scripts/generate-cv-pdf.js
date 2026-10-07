import path from "path";
import fs from "fs";
import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const HTML_FILE = path.resolve("cv-muhamad-rayhan.html");
const OUTPUT_PDF = path.resolve("CV_Muhamad_Rayhan.pdf");

async function generatePDF() {
  console.log("Generating CV PDF using Puppeteer Core...");
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.goto(`file://${HTML_FILE}`, { waitUntil: "networkidle0" });

  await page.pdf({
    path: OUTPUT_PDF,
    format: "A4",
    printBackground: true,
    margin: {
      top: "4mm",
      bottom: "4mm",
      left: "9mm",
      right: "9mm",
    },
  });

  await browser.close();
  console.log(`✓ PDF successfully written to ${OUTPUT_PDF}`);

  // Copy to Desktop and Downloads
  const userProfile = process.env.USERPROFILE;
  if (userProfile) {
    const desktopPath = path.join(userProfile, "Desktop", "CV_Muhamad_Rayhan.pdf");
    const downloadsPath = path.join(userProfile, "Downloads", "CV_Muhamad_Rayhan.pdf");
    const backupDownloadsPath = path.join(userProfile, "Downloads", "CV_Muhamad_Rayhan_12pt.pdf");

    try {
      fs.copyFileSync(OUTPUT_PDF, desktopPath);
      console.log(`✓ Copied to Desktop: ${desktopPath}`);
    } catch (e) {
      console.warn("Could not copy to Desktop:", e.message);
    }

    try {
      fs.copyFileSync(OUTPUT_PDF, downloadsPath);
      console.log(`✓ Copied to Downloads: ${downloadsPath}`);
    } catch (e) {
      console.warn("Downloads file locked, copying to backup filename:", e.message);
      try {
        fs.copyFileSync(OUTPUT_PDF, backupDownloadsPath);
        console.log(`✓ Copied to Downloads with new name: ${backupDownloadsPath}`);
      } catch (err) {
        console.error("Failed to copy to backup downloads:", err.message);
      }
    }
  }
}

generatePDF().catch((err) => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
