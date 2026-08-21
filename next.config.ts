import type { NextConfig } from "next";

/*
 * Настроек нет намеренно.
 *
 * Раньше здесь стоял блок images с dangerouslyAllowSVG — он требовался
 * ради SVG-заглушек в аватарах отзывов. Заглушки заменены видеоотзывами,
 * через оптимизатор больше не проходит ни одного SVG, и флаг убран:
 * держать послабление безопасности без надобности не стоит.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
