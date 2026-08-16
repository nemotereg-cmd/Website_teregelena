/**
 * Собирает растровые иконки из SVG-исходников.
 *
 *   node design/build-og.mjs
 *
 * Запускается вручную и только когда меняются исходники — в обычной сборке
 * не участвует, поэтому playwright не нужен в зависимостях проекта.
 * Требует установленного Chromium: npx playwright install chromium
 *
 *   design/og-image.svg  →  public/og-image.png      обложка ссылки в соцсетях
 *   src/app/icon.svg     →  src/app/apple-icon.png   иконка на iOS
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const jobs = [
  { from: "design/og-image.svg", to: "public/og-image.png", width: 1200, height: 630 },
  { from: "src/app/icon.svg", to: "src/app/apple-icon.png", width: 180, height: 180 },
];

const browser = await chromium.launch();

for (const job of jobs) {
  const context = await browser.newContext({
    viewport: { width: job.width, height: job.height },
  });
  const page = await context.newPage();

  const svg = readFileSync(resolve(root, job.from), "utf8");
  await page.setContent(
    `<!doctype html><style>*{margin:0;padding:0}` +
      `html,body{width:${job.width}px;height:${job.height}px;overflow:hidden}` +
      `svg{display:block;width:${job.width}px;height:${job.height}px}</style>${svg}`,
    { waitUntil: "networkidle" },
  );

  writeFileSync(resolve(root, job.to), await page.screenshot({ type: "png" }));
  console.log(`${job.from} → ${job.to}`);
  await context.close();
}

await browser.close();
