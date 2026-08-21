import type { CourseTheme } from "@/types";

/** Пастельные градиенты карточек курсов, взятые с макета. */
export const courseThemes: Record<CourseTheme, { surface: string }> = {
  rose: { surface: "bg-linear-to-b from-rose-from to-rose-to" },
  violet: { surface: "bg-linear-to-b from-violet-from to-violet-to" },
  amber: { surface: "bg-linear-to-b from-amber-from to-amber-to" },
  azure: { surface: "bg-linear-to-b from-azure-from to-azure-to" },
};
