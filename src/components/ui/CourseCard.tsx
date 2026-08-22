import Image from "next/image";

import type { Course } from "@/types";

import { ArrowRightIcon } from "./icons/ui-icons";
import { courseThemes } from "./course-theme";
import { cn } from "@/lib/cn";

type CourseCardProps = {
  course: Course;
  /** Открыть описание. Элемент передаётся, чтобы вернуть на него фокус. */
  onOpen: (trigger: HTMLButtonElement) => void;
};

export function CourseCard({ course, onOpen }: CourseCardProps) {
  const theme = courseThemes[course.theme];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-panel p-5",
        "shadow-card transition-[transform,box-shadow] duration-300 ease-soft",
        "hover:-translate-y-1 hover:shadow-card-hover focus-within:-translate-y-1",
        theme.surface,
      )}
    >
      {/*
        Иллюстрации курсов — полнокадровые, со своим фоном, поэтому подаём их
        как плитку со скруглением и object-cover, а не как объект без фона.
      */}
      <div className="relative mb-5 aspect-4/3 w-full overflow-hidden rounded-2xl shadow-card">
        <Image
          src={course.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
        />
      </div>

      {/*
        Текст идёт сразу под картинкой, а не прижат к низу карточки: иначе
        заголовки начинались бы на разной высоте — у каждой карточки своя
        длина описания. Метки уходят вниз отдельно, через mt-auto.
      */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/*
          Резерв высоты под самый длинный заголовок («AI-трансформация для
          крупных компаний») — иначе описания соседних карточек разъезжаются
          по вертикали. Диапазоны не пересекаются намеренно: так порядок
          правил в готовом CSS не влияет на результат. Значения замерены в
          браузере на каждом шаге в 16px:
            до 640px — резерва нет: карточки идут одна под другой,
                       выравнивать нечего, а пустая строка была бы заметна;
            640–1023 — две колонки, две строки (56px);
            1024–1039 — включилась сетка из четырёх колонок, но окно ещё
                        узкое: заголовок занимает четыре строки (112px);
            1040–1199 — три строки (84px);
            от 1200px — колонка шире, хватает двух строк.
        */}
        <h3
          className={cn(
            "text-xl font-bold text-balance text-ink",
            "min-[640px]:max-[1023px]:min-h-14",
            "min-[1024px]:max-[1039px]:min-h-28",
            "min-[1040px]:max-[1199px]:min-h-21",
            "min-[1200px]:min-h-14",
          )}
        >
          {course.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft/85">
          {course.lead}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-4">
          {course.tags?.length ? (
            <ul className="flex flex-wrap gap-1.5">
              {course.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}

          {/*
            Кружок со стрелкой — визуальный акцент. Кликабельна вся карточка
            через растянутую ссылку ниже, поэтому иконка скрыта от скринридера.
          */}
          <span
            aria-hidden="true"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-ink transition-[background-color,transform] duration-300 ease-soft group-hover:translate-x-0.5 group-hover:bg-white"
          >
            <ArrowRightIcon className="size-5" />
          </span>
        </div>
      </div>

      {/*
        Растянутая кнопка: карточка нажимается целиком, но в дереве
        доступности это один элемент управления.
      */}
      <button
        type="button"
        onClick={(event) => onOpen(event.currentTarget)}
        className="absolute inset-0 rounded-panel"
        aria-label={`Курс «${course.title}» — открыть описание`}
      />
    </article>
  );
}
