import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

/**
 * Отдаётся по /sitemap.xml. Сейчас страница одна; когда появятся
 * /courses/[slug], сюда добавится их перебор из content/courses.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
