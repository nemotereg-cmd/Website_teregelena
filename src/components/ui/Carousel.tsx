"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

import type { GalleryImage } from "@/types";
import { cn } from "@/lib/cn";

import { ArrowRightIcon } from "./icons/ui-icons";

type CarouselProps = {
  images: GalleryImage[];
  className?: string;
  /** Загружать первый кадр приоритетно (если карусель в первом экране). */
  priority?: boolean;
};

/**
 * Карусель фотографий со стрелками по бокам.
 *
 * Написана на состоянии React и CSS-трансформе — сторонний слайдер сюда
 * не нужен: все кадры лежат в одной строке, а смена сводится к сдвигу
 * дорожки на 100% ширины.
 *
 * Что учтено:
 *   • при одном кадре стрелки и точки скрываются — управлять нечем;
 *   • листание закольцовано в обе стороны;
 *   • стрелки влево-вправо работают с клавиатуры, когда фокус внутри;
 *   • невидимые кадры скрыты от скринридера и не ловят фокус;
 *   • анимацию отключает prefers-reduced-motion (правило в globals.css).
 */
export function Carousel({ images, className, priority }: CarouselProps) {
  const [index, setIndex] = useState(0);

  const total = images.length;
  const hasControls = total > 1;

  const go = useCallback(
    (direction: 1 | -1) => {
      // Остаток от деления с поправкой на отрицательное — чтобы листалось по кругу.
      setIndex((current) => (current + direction + total) % total);
    },
    [total],
  );

  /*
   * Обработчик висит именно на внешнем контейнере — том, что получает фокус.
   * События клавиатуры всплывают вверх, поэтому слушатель на вложенной
   * панели их не увидел бы.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!hasControls) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  return (
    <div
      className={cn("relative", className)}
      role="group"
      aria-roledescription="карусель"
      aria-label="Фотографии автора"
      tabIndex={hasControls ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <div className="relative size-full overflow-hidden rounded-panel bg-linear-to-b from-canvas-soft to-[#F9E7F1] shadow-card ring-1 ring-white">
        <div
          className="flex size-full transition-transform duration-500 ease-soft"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((image, i) => (
            <div
              key={image.src}
              className="relative size-full shrink-0"
              aria-hidden={i !== index}
              inert={i !== index ? true : undefined}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={priority && i === 0}
                sizes="(min-width: 1024px) 40vw, 85vw"
                className="object-contain mask-b-from-94% mask-b-to-100%"
              />
            </div>
          ))}
        </div>
      </div>

      {hasControls ? (
        <>
          <CarouselButton direction="prev" onClick={() => go(-1)} />
          <CarouselButton direction="next" onClick={() => go(1)} />

          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Фотография ${i + 1} из ${total}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 ease-soft",
                  i === index ? "w-6 bg-violet" : "w-2 bg-ink-muted/30 hover:bg-ink-muted/50",
                )}
              />
            ))}
          </div>

          {/* Смену кадра озвучиваем отдельно: сами картинки скрыты от озвучки. */}
          <p aria-live="polite" className="sr-only">
            Фотография {index + 1} из {total}
          </p>
        </>
      ) : null}
    </div>
  );
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Предыдущая фотография" : "Следующая фотография"}
      className={cn(
        "absolute top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center",
        "rounded-full bg-surface/90 text-ink shadow-card ring-1 ring-hairline backdrop-blur-sm",
        "transition-[background-color,transform] duration-200 ease-soft",
        "hover:bg-surface hover:scale-105 active:scale-95",
        isPrev ? "left-2 sm:-left-5" : "right-2 sm:-right-5",
      )}
    >
      <ArrowRightIcon className={cn("size-5", isPrev && "rotate-180")} />
    </button>
  );
}
