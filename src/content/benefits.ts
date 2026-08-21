import type { Benefit } from "@/types";

export const benefitsHeading = "Что вы получите на курсах";

export const benefits: Benefit[] = [
  {
    id: "text",
    icon: "text",
    title: "Работа с текстом",
    description:
      "Пишите тексты, посты, сценарии и продающие тексты с помощью нейросетей.",
  },
  {
    id: "content",
    icon: "content",
    title: "Создание контента",
    description:
      "Генерируйте изображения, видео, презентации и контент для соцсетей.",
  },
  {
    id: "analytics",
    icon: "analytics",
    title: "Аналитика и идеи",
    description:
      "Анализируйте данные, находите идеи и принимайте решения быстрее и эффективнее.",
  },
];
