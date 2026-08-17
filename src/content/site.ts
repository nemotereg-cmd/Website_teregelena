import type { ContactChannel, NavItem } from "@/types";

/**
 * ============================================================================
 * ЗАПОЛНИТЬ ПЕРЕД ПУБЛИКАЦИЕЙ
 * ============================================================================
 * Здесь живут название, тексты и контакты. Остального кода это не касается:
 * всё тянется отсюда.
 *
 * Домен задаётся не тут, а переменной окружения NEXT_PUBLIC_SITE_URL —
 * см. `src/lib/site-url.ts`.
 */

export const site = {
  name: "Pro Нейронки",
  /** Заголовок вкладки на главной. */
  title: "Pro Нейронки — практические курсы по нейросетям",
  description:
    "Практические курсы по нейросетям для всех, кто хочет работать быстрее, эффективнее и создавать больше. ChatGPT, Claude, Midjourney, AI-агенты и автоматизация.",
  keywords: [
    "курсы по нейросетям",
    "обучение нейросетям",
    "ChatGPT для бизнеса",
    "курс по искусственному интеллекту",
    "AI-агенты",
    "автоматизация с нейросетями",
    "Midjourney обучение",
    "нейросети с нуля",
  ],
  locale: "ru_RU",
  lang: "ru",
} as const;

export const author = {
  name: "Елена",
  /** Используется в JSON-LD (schema.org/Person) и в секции «Обо мне». */
  jobTitle: "Эксперт по нейросетям, автор курсов",
  description:
    "Помогаю людям и бизнесу внедрять нейросети в повседневную работу — без теории ради теории и без технического жаргона.",
} as const;

export const nav: NavItem[] = [
  { label: "Курсы", href: "#courses" },
  { label: "Обо мне", href: "#about" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Контакты", href: "#contacts" },
];

export const contacts: ContactChannel[] = [
  {
    id: "telegram",
    label: "Telegram",
    // В ссылке t.me имя пишется без «собачки» — она только для отображения.
    href: "https://t.me/Elena_Teregulova",
    hint: "@Elena_Teregulova",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    // wa.me ждёт номер в международном формате: код страны, только цифры, без «+».
    href: "https://wa.me/79279448889",
    hint: "+7 927 944-88-89",
  },
  {
    id: "max",
    label: "MAX",
    href: "https://max.ru/username",
    hint: "@username",
  },
];

/** Основная кнопка призыва к действию — ведёт в первый указанный мессенджер. */
export const primaryContactHref = contacts[0].href;
