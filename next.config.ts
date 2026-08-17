import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Оптимизатор картинок по умолчанию отказывается обрабатывать SVG.
     * Нужен он здесь ровно ради трёх аватаров в отзывах — это наши
     * собственные файлы из public/, никаких внешних источников не подключено.
     * CSP ниже дополнительно запрещает скрипты внутри SVG.
     *
     * Если аватары когда-нибудь заменят на фотографии, весь блок images
     * можно удалить.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
