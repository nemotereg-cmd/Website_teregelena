import type { Testimonial } from "@/types";

export const testimonialsHeading = "Отзывы учеников";

/**
 * Аватары — нейтральные векторные силуэты в `public/images/testimonials/`.
 * Реальных фотографий учеников нет, и ставить вместо них стоковые лица
 * нельзя: это выдавало бы чужих людей за авторов отзывов.
 */
export const testimonials: Testimonial[] = [
  {
    id: "anna",
    quote:
      "Курс дал мне системное понимание нейросетей. Теперь экономлю кучу времени на рутинных задачах!",
    author: "Анна С.",
    role: "Маркетолог",
    avatar: "/images/testimonials/anna.svg",
  },
  {
    id: "igor",
    quote:
      "Очень практично и понятно. Каждый урок — готовое решение, которое сразу применяешь в работе.",
    author: "Игорь П.",
    role: "Предприниматель",
    avatar: "/images/testimonials/igor.svg",
  },
  {
    id: "maria",
    quote:
      "Елена объясняет сложные вещи простым языком. Лучшее обучение по нейросетям, которое я проходила!",
    author: "Мария К.",
    role: "SMM-специалист",
    avatar: "/images/testimonials/maria.svg",
  },
];

/** Тёмная карточка-призыв. В макете стояла четвёртой в сетке отзывов. */
export const testimonialsCta = {
  title: "Нейросети — это не будущее. Это ваш шаг вперёд уже сейчас.",
  description: "Начните обучение и измените свой подход к работе и жизни.",
  action: "Записаться на курс",
} as const;
