import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Оптимизатор картинок по умолчанию отказывается обрабатывать SVG.
     * Сейчас все изображения — это временные SVG-заглушки из public/,
     * то есть исключительно наши собственные файлы, никаких внешних
     * источников не подключено. CSP ниже дополнительно запрещает скрипты
     * внутри SVG.
     *
     * Когда заглушки заменят на реальные фотографии (webp/jpg) — весь
     * блок images можно удалить.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
