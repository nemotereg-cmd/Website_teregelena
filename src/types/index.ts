/**
 * Доменные типы сайта. Всё, что описано здесь, наполняется данными
 * из `src/content/*` и рендерится компонентами из `src/components/*`.
 */

export type NavItem = {
  label: string;
  /** Якорь на главной (`#courses`) или обычный путь (`/privacy`). */
  href: string;
};

/** Идентификатор мессенджера — определяет иконку и фирменный цвет кнопки. */
export type ContactChannelId = "telegram" | "whatsapp" | "max";

export type ContactChannel = {
  id: ContactChannelId;
  label: string;
  href: string;
  /** Подпись под названием: @username, номер телефона и т.п. */
  hint?: string;
};

/** Ключ иконки для карточки выгоды. См. `src/components/ui/icons/benefit-icons.tsx`. */
export type BenefitIconId = "text" | "content" | "automation" | "analytics";

export type Benefit = {
  id: string;
  title: string;
  description: string;
  icon: BenefitIconId;
};

/** Цветовая тема карточки курса — задаёт градиент фона и цвет номера. */
export type CourseTheme = "rose" | "violet" | "amber" | "azure";

export type Course = {
  /** Используется как якорь и как будущий сегмент URL `/courses/[slug]`. */
  slug: string;
  title: string;
  description: string;
  /** Путь к изображению внутри `public/`. */
  image: string;
  theme: CourseTheme;
  /** Короткие метки под заголовком: уровень, длительность, формат. */
  tags?: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type AboutStat = {
  value: string;
  label: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};
