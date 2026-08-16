import type { Course } from "@/types";

export const coursesHeading = "Курсы";

/**
 * Порядок в массиве задаёт номера карточек (01, 02, …) — отдельное поле
 * с индексом не нужно, нумерация считается при рендере.
 *
 * Картинки лежат в `public/images/courses/`. Сейчас это SVG-заглушки:
 * положите на их место свои изображения и поправьте путь в поле `image`.
 */
export const courses: Course[] = [
  {
    slug: "neuroseti-s-nulya",
    title: "Нейросети с нуля",
    description:
      "Освойте нейросети с нуля и начните применять их уже сегодня.",
    image: "/images/courses/course-01.svg",
    theme: "rose",
    tags: ["Для начинающих", "8 уроков"],
  },
  {
    slug: "chatgpt-dlya-biznesa",
    title: "ChatGPT для бизнеса",
    description:
      "Используйте ChatGPT для автоматизации задач и роста вашего бизнеса.",
    image: "/images/courses/course-02.svg",
    theme: "violet",
    tags: ["Для бизнеса", "10 уроков"],
  },
  {
    slug: "sozdanie-kontenta",
    title: "Создание контента с нейросетями",
    description:
      "Генерируйте тексты, изображения и видео для любых задач и платформ.",
    image: "/images/courses/course-03.svg",
    theme: "amber",
    tags: ["Для авторов", "12 уроков"],
  },
  {
    slug: "ai-agenty-i-avtomatizaciya",
    title: "AI-агенты и автоматизация",
    description:
      "Создавайте AI-агентов и автоматизируйте процессы на новом уровне.",
    image: "/images/courses/course-04.svg",
    theme: "azure",
    tags: ["Продвинутый", "9 уроков"],
  },
];
