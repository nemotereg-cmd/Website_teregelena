import type { ContactChannel, NavItem } from "@/types";

/**
 * ============================================================================
 * ЗАПОЛНИТЬ ПЕРЕД ПУБЛИКАЦИЕЙ
 * ============================================================================
 * Ссылки и домен ниже — заглушки. Замените их на реальные:
 *   • siteUrl        — боевой домен (влияет на canonical, OG и sitemap.xml)
 *   • contacts[].href — ссылки на мессенджеры
 *   • author         — имя, роль и описание эксперта
 * Остального кода это не касается: всё тянется отсюда.
 */

/** Домен без слэша на конце. Переопределяется переменной NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pro-neuronki.ru"
).replace(/\/$/, "");

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
