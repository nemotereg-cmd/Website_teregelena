"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { Course } from "@/types";
import { primaryContactHref } from "@/content/site";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/cn";

import { Button } from "./Button";
import { CourseCard } from "./CourseCard";
import { Reveal } from "./Reveal";
import { ArrowRightIcon, CloseIcon } from "./icons/ui-icons";
import { courseThemes } from "./course-theme";

type CourseGridProps = {
  courses: Course[];
};

/**
 * Сетка курсов с окном подробностей.
 *
 * Полное описание курса — три-пять абзацев: на карточке столько текста
 * сделало бы её огромной, а разная длина у соседей сломала бы выравнивание.
 * Поэтому карточка показывает одну фразу, а остальное раскрывается поверх
 * страницы по клику.
 */
export function CourseGrid({ courses }: CourseGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = openIndex !== null;
  useLockBodyScroll(isOpen);

  const close = useCallback(() => {
    setOpenIndex(null);
    // Возвращаем фокус на карточку, с которой открыли.
    lastTriggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  const active = openIndex === null ? null : courses[openIndex];

  return (
    <>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course, index) => (
          <li key={course.slug}>
            <Reveal delay={index * 80} className="h-full">
              <CourseCard
                course={course}
                onOpen={(trigger) => {
                  lastTriggerRef.current = trigger;
                  setOpenIndex(index);
                }}
              />
            </Reveal>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/70 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative max-h-full w-full max-w-lg overflow-y-auto rounded-panel bg-surface shadow-card-hover"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={cn("relative", courseThemes[active.theme].surface)}>
              <div className="relative mx-5 mt-5 aspect-4/3 overflow-hidden rounded-2xl shadow-card">
                <Image
                  src={active.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 512px, 90vw"
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-bold text-balance text-ink">{active.title}</h3>
                <p className="mt-3 leading-relaxed text-pretty text-ink-soft">{active.lead}</p>
              </div>
            </div>

            <div className="p-5">
              {active.details.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-sm leading-relaxed text-pretty text-ink-muted first:mt-0"
                >
                  {paragraph}
                </p>
              ))}

              <Button
                href={primaryContactHref}
                size="md"
                fullWidth
                iconRight={<ArrowRightIcon className="size-5" />}
                className="mt-6"
              >
                Записаться на курс
              </Button>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Закрыть описание курса"
              className="absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition-transform hover:scale-105"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
