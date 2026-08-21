"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

import type { VideoTestimonial } from "@/types";
import { cn } from "@/lib/cn";

import { PlayIcon } from "./icons/ui-icons";
import { VideoLightbox } from "./VideoLightbox";

type VideoTestimonialsProps = {
  items: VideoTestimonial[];
};

/**
 * Сетка видеоотзывов: обложка с кнопкой play, ролик открывается поверх страницы.
 *
 * Ключевое решение — видео не грузится, пока его не запросили. На странице
 * лежат только обложки по несколько десятков килобайт, а сами файлы весят
 * мегабайты. Открой мы их обычным <video> прямо в сетке, браузер начал бы
 * тянуть все четыре сразу и первый экран стал бы заметно тяжелее.
 */
export function VideoTestimonials({ items }: VideoTestimonialsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    // Возвращаем фокус на карточку, с которой открыли, — иначе после закрытия
    // он улетает в начало страницы.
    lastTriggerRef.current?.focus();
  }, []);

  const active = openIndex === null ? null : items[openIndex];
  const caption = active
    ? [active.name, active.role].filter(Boolean).join(" · ")
    : undefined;

  return (
    <>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setOpenIndex(index);
              }}
              aria-label={
                item.name
                  ? `Смотреть видеоотзыв: ${item.name}`
                  : `Смотреть видеоотзыв ${index + 1}`
              }
              className={cn(
                "group relative block w-full overflow-hidden rounded-card",
                "shadow-card ring-1 ring-hairline transition-[transform,box-shadow] duration-300 ease-soft",
                "hover:-translate-y-1 hover:shadow-card-hover",
              )}
            >
              <span className="relative block aspect-9/16 w-full">
                <Image
                  src={item.poster}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 45vw"
                  className="object-cover transition-transform duration-500 ease-soft group-hover:scale-105"
                />

                {/* Затемнение снизу: под ним читается подпись, а сверху кадр остаётся чистым. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-night/80 via-night/10 to-transparent"
                />

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 left-1/2 inline-flex size-14 -translate-x-1/2 -translate-y-1/2",
                    "items-center justify-center rounded-full bg-white/95 text-brand shadow-float",
                    "transition-transform duration-300 ease-soft group-hover:scale-110",
                  )}
                >
                  <PlayIcon className="size-6 translate-x-0.5" />
                </span>

                {item.duration ? (
                  <span className="absolute top-3 right-3 rounded-full bg-night/70 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {item.duration}
                  </span>
                ) : null}

                {item.name || item.role ? (
                  <span className="absolute inset-x-3 bottom-3 flex flex-col text-left text-white">
                    {item.name ? (
                      <span className="text-sm font-bold">{item.name}</span>
                    ) : null}
                    {item.role ? (
                      <span className="text-[11px] leading-snug text-white/80">{item.role}</span>
                    ) : null}
                  </span>
                ) : null}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <VideoLightbox
        src={active?.src ?? null}
        poster={active?.poster}
        caption={caption || undefined}
        onClose={close}
      />
    </>
  );
}
