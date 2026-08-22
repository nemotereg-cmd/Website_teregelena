import type { Metadata } from "next";

import { courses } from "@/content/courses";
import { author, contacts, site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/**
 * Базовые метаданные приложения. Наследуются всеми страницами, каждая
 * может переопределить нужные поля своим экспортом `metadata`.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: author.name }],
  creator: author.name,
  applicationName: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "education",
};

/**
 * Структурированные данные главной страницы: кто автор, чему учит,
 * как связаться и ответы на частые вопросы.
 *
 * Отдаётся одним графом с перекрёстными @id — так поисковик понимает,
 * что Person, WebSite и Course относятся к одному и тому же проекту.
 */
export function buildHomeJsonLd() {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: author.name,
        jobTitle: author.jobTitle,
        description: author.description,
        url: siteUrl,
        knowsAbout: [
          "Нейросети",
          "Искусственный интеллект",
          "ChatGPT",
          "Автоматизация процессов",
          "Генерация контента",
        ],
        sameAs: contacts.map((contact) => contact.href),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: site.name,
        description: site.description,
        inLanguage: site.lang,
        publisher: { "@id": personId },
      },
      ...courses.map((course) => ({
        "@type": "Course",
        "@id": `${siteUrl}/#course-${course.slug}`,
        name: course.title,
        // В разметку отдаём полное описание: на карточке видна только первая
        // фраза, а поисковику полезен весь текст курса.
        description: [course.lead, ...course.details].join(" "),
        inLanguage: site.lang,
        provider: { "@id": personId },
        // Для расширенного сниппета Google дополнительно ждёт hasCourseInstance
        // (формат, длительность) и offers (цена). Намеренно не заполняю —
        // выдумывать эти цифры нельзя, добавьте их вместе с реальными данными.
      })),
    ],
  };
}
