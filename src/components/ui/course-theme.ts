import type { CourseTheme } from "@/types";

/**
 * Цветовые схемы карточек курсов. Пастельные градиенты взяты с макета,
 * цвет номера подобран так, чтобы контраст с подложкой оставался читаемым.
 */
export const courseThemes: Record<CourseTheme, { surface: string; badge: string }> = {
  rose: {
    surface: "bg-linear-to-b from-rose-from to-rose-to",
    badge: "bg-[#DB2777]",
  },
  violet: {
    surface: "bg-linear-to-b from-violet-from to-violet-to",
    badge: "bg-[#6D28D9]",
  },
  amber: {
    surface: "bg-linear-to-b from-amber-from to-amber-to",
    badge: "bg-[#EA580C]",
  },
  azure: {
    surface: "bg-linear-to-b from-azure-from to-azure-to",
    badge: "bg-[#1D4ED8]",
  },
};
