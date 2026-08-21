import type { VideoTestimonial } from "@/types";

export const testimonialsHeading = "Отзывы учеников";

/**
 * ============================================================================
 * НУЖНО ДОПОЛНИТЬ: имена авторов отзывов
 * ============================================================================
 * Поля `name` пустые: на самих записях имена не звучат и не подписаны, а
 * придумывать их нельзя — это выдавало бы вымышленных людей за реальных
 * учеников. Заполните `name` и `role`, и подписи появятся на карточках сами.
 *
 * Роль во втором отзыве взята с титра на самом видео.
 *
 * Файлы лежат в `public/videos/`, обложки — в `public/images/testimonials/`.
 * Обложка нарезана кадром из того же ролика: до нажатия play видео вообще
 * не скачивается, поэтому вес страницы от количества отзывов не растёт.
 */
export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "review-1",
    src: "/videos/review-1.mp4",
    poster: "/images/testimonials/review-1.jpg",
    duration: "0:21",
  },
  {
    id: "review-2",
    src: "/videos/review-2.mp4",
    poster: "/images/testimonials/review-2.jpg",
    role: "Предприниматель, прокат мототехники в Уфе",
    duration: "0:39",
  },
  {
    id: "review-3",
    src: "/videos/review-3.mp4",
    poster: "/images/testimonials/review-3.jpg",
    duration: "1:00",
  },
  {
    id: "review-4",
    src: "/videos/review-4.mp4",
    poster: "/images/testimonials/review-4.jpg",
    duration: "0:25",
  },
];

/** Тёмная плашка-призыв. В макете была четвёртой карточкой в сетке отзывов. */
export const testimonialsCta = {
  title: "Нейросети — это не будущее. Это ваш шаг вперёд уже сейчас.",
  description: "Начните обучение и измените свой подход к работе и жизни.",
  action: "Записаться на курс",
} as const;
