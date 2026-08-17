/**
 * Адрес сайта — основа для canonical, Open Graph, sitemap.xml и robots.txt.
 *
 * Живёт отдельно от `content/site.ts` намеренно: тот модуль импортируют
 * клиентские компоненты (шапка, мобильное меню), и переменные окружения
 * без префикса NEXT_PUBLIC_ в браузерную сборку не попадают. Здесь же
 * модуль читают только серверные файлы — метаданные, sitemap и robots.
 *
 * Порядок разрешения:
 *   1. NEXT_PUBLIC_SITE_URL — задайте его, когда появится свой домен;
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel подставляет сам, поэтому
 *      даже без настроек сайт ссылается на собственный адрес, а не на
 *      чужой домен: неверный canonical поисковик считает дубликатом и
 *      может вовсе не проиндексировать страницу;
 *   3. localhost — режим разработки.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
