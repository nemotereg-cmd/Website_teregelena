import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/content/site";
import { baseMetadata } from "@/lib/seo";

import "./globals.css";

/**
 * Шрифт скачивается на этапе сборки и раздаётся с нашего домена — в рантайме
 * никаких запросов к Google. Подмножество cyrillic обязательно: без него
 * русский текст отрисуется системным шрифтом.
 */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#faf8ff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.lang} className={`${manrope.variable} h-full`}>
      <head>
        {/*
          Блоки с анимацией появления стартуют прозрачными и проявляются по
          IntersectionObserver. Без JS показываем их сразу, иначе страница
          осталась бы пустой.
        */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
