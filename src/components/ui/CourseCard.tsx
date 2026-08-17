import Image from "next/image";

import type { Course } from "@/types";

import { ArrowRightIcon } from "./icons/ui-icons";
import { courseThemes } from "./course-theme";
import { cn } from "@/lib/cn";

type CourseCardProps = {
  course: Course;
  /** Порядковый номер начиная с 1 — рисуется как 01, 02, … */
  position: number;
  /** Куда ведёт карточка. Сейчас это якорь контактов. */
  href: string;
  /** Приоритетная загрузка для карточек, попадающих в первый экран. */
  priority?: boolean;
};

export function CourseCard({ course, position, href, priority }: CourseCardProps) {
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
      <span
        className={cn(
          "inline-flex w-fit items-center rounded-lg px-2.5 py-1 text-xs font-bold text-white",
          theme.badge,
        )}
      >
        {String(position).padStart(2, "0")}
      </span>

      {/*
        Иллюстрации курсов — полнокадровые, со своим фоном, поэтому подаём их
        как плитку со скруглением и object-cover, а не как объект без фона.
      */}
      <div className="relative my-5 aspect-4/3 w-full overflow-hidden rounded-2xl shadow-card">
        <Image
          src={course.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
        />
      </div>

      <div className="mt-auto flex items-end gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-balance text-ink">{course.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-soft/85">
            {course.description}
          </p>
          {course.tags?.length ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {course.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-white/60 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/*
          Кружок со стрелкой — визуальный акцент. Кликабельна вся карточка
          через растянутую ссылку ниже, поэтому иконка скрыта от скринридера.
        */}
        <span
          aria-hidden="true"
          className="mb-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-ink transition-[background-color,transform] duration-300 ease-soft group-hover:translate-x-0.5 group-hover:bg-white"
        >
          <ArrowRightIcon className="size-5" />
        </span>
      </div>

      {/* Растянутая ссылка: карточка кликабельна целиком, но в DOM это одна ссылка. */}
      <a
        href={href}
        className="absolute inset-0 rounded-panel"
        aria-label={`Курс «${course.title}» — узнать подробнее`}
      />
    </article>
  );
}
