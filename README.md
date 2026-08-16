# Pro Нейронки — сайт-визитка

Одностраничный сайт эксперта по нейросетям: курсы, отзывы, контакты.

**Стек:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4
Сторонних UI-библиотек, иконочных паков и рантайм-API нет — только эти три пакета и React.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
```

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Дев-сервер |
| `npm run build` | Продакшен-сборка |
| `npm run start` | Запуск собранного приложения |
| `npm run lint` | ESLint |
| `npm run typecheck` | Проверка типов без сборки |

## Что заполнить перед публикацией

Весь текст и данные вынесены в `src/content/` — верстку для этого трогать не нужно.

1. **`src/content/site.ts`** — домен, ссылки на мессенджеры, имя автора.
   Домен также задаётся переменной окружения `NEXT_PUBLIC_SITE_URL` (влияет на canonical, Open Graph и `sitemap.xml`).
2. **`src/content/about.ts`** — текст «Обо мне» и цифры в блоке статистики.
   Цифры сейчас выдуманные, их обязательно нужно заменить на реальные.
3. **Изображения** в `public/images/` — сейчас это SVG-заглушки.
   Положите свои файлы и поправьте пути в `src/content/*.ts`.
   Когда все картинки станут растровыми (webp/jpg), из `next.config.ts` можно удалить блок `images` — он нужен только для заглушек.
4. **`design/og-image.svg`** — обложка ссылки в соцсетях.
   После правки пересоберите растр: `node design/build-og.mjs` (нужен `playwright` и Chromium, в зависимостях проекта его нет).

## Структура

```
src/
├── app/            маршруты, layout, sitemap.ts, robots.ts, иконки
├── components/
│   ├── layout/     Header, MobileMenu, Footer, Logo
│   ├── sections/   секции главной страницы
│   └── ui/         переиспользуемые примитивы и иконки
├── content/        весь текст и данные сайта
├── hooks/          useInView, useLockBodyScroll
├── lib/            cn(), метаданные и JSON-LD
└── types/          доменные типы
```

**Клиентских компонентов ровно четыре** — `Header`, `MobileMenu`, `Reveal` и хуки к ним.
Всё остальное рендерится на сервере, поэтому в браузер уезжает минимум JavaScript.
Аккордеон FAQ сделан на нативных `<details>` и работает вообще без скриптов.

## Секции главной

Hero → Что вы получите → Курсы → Обо мне → Как проходит обучение → Отзывы → Призыв → FAQ → Контакты

Секции «Обо мне», «Как проходит обучение», FAQ и футер добавлены сверх исходного макета:
на «Обо мне» вёл пункт меню, но самой секции не было, а остальное закрывает типовые вопросы посетителя.

## SEO

- Метаданные, Open Graph и Twitter Card — `src/lib/seo.ts`
- `sitemap.xml` и `robots.txt` — `src/app/sitemap.ts` и `src/app/robots.ts`
- Разметка schema.org (`Person`, `WebSite`, `Course`, `FAQPage`) собирается из тех же данных, что и видимый текст
- Все страницы полностью статические (SSG)

## Добавить страницы курсов

Заготовка под это уже есть: у каждого курса в `src/content/courses.ts` заполнен `slug`.
Понадобится создать `src/app/courses/[slug]/page.tsx` с `generateStaticParams` и `generateMetadata`,
поменять `href` в `src/components/sections/Courses.tsx` и добавить страницы в `sitemap.ts`.
