import type { Course } from "@/types";

export const coursesHeading = "Курсы";

/**
 * Порядок в массиве = порядок карточек на странице.
 *
 * Картинки лежат в `public/images/courses/`. Чтобы заменить — положите файл
 * рядом и поправьте путь в поле `image`.
 *
 * `tags` — короткие метки аудитории под карточкой. Количество уроков из них
 * убрано: цифры нигде не сверялись.
 */
export const courses: Course[] = [
  {
    slug: "neuroseti-s-nulya",
    title: "Нейросети с нуля",
    description:
      "Освойте нейросети с нуля и начните применять их уже сегодня.",
    image: "/images/courses/course-01.jpg",
    theme: "rose",
    tags: ["Для начинающих"],
  },
  {
    slug: "chatgpt-dlya-biznesa",
    title: "ChatGPT для бизнеса",
    description:
      "Используйте ChatGPT для автоматизации задач и роста вашего бизнеса.",
    image: "/images/courses/course-02.jpg",
    theme: "violet",
    tags: ["Для бизнеса"],
  },
  {
    slug: "sozdanie-kontenta",
    title: "Создание контента с нейросетями",
    description:
      "Генерируйте тексты, изображения и видео для любых задач и платформ.",
    image: "/images/courses/course-03.jpg",
    theme: "amber",
    tags: ["Для авторов"],
  },
  {
    slug: "dlya-kompaniy",
    title: "Нейросети для компаний",
    description:
      "Корпоративное обучение команды под задачи вашего бизнеса.",
    // Картинка временно осталась от прежнего курса — ждёт замены.
    image: "/images/courses/course-04.jpg",
    theme: "azure",
    tags: ["Для команд"],
  },
];
