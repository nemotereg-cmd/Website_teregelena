import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

/**
 * Явно помечаем маршрут статическим. Без этого `output: "export"` падает:
 * Next не берётся сам решать, можно ли запечь роут в файл.
 */
export const dynamic = "force-static";

/** Отдаётся по /robots.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
