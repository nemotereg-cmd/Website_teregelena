"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

import type { GallerySlide } from "@/types";
import { cn } from "@/lib/cn";

import { ArrowRightIcon, PlayIcon } from "./icons/ui-icons";
import { VideoLightbox } from "./VideoLightbox";

type CarouselProps = {
  images: GallerySlide[];
  className?: string;
  /** Загружать первый кадр приоритетно (если карусель в первом экране). */
  priority?: boolean;
  /**
   * Как кадр ложится в рамку:
   *   "cover"   — обычная фотография заполняет рамку целиком, лишнее обрезается;
   *   "contain" — вырезанный силуэт вписывается внутрь, низ растворяется
   *               в подложке, чтобы обрезанная по бедро фигура не обрывалась.
   */
  fit?: "cover" | "contain";
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
export function Carousel({ images, className, priority, fit = "cover" }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [openVideo, setOpenVideo] = useState<GallerySlide | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const closeVideo = useCallback(() => {
    setOpenVideo(null);
    lastTriggerRef.current?.focus();
  }, []);

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
      aria-label="Фотографии и видео автора"
      tabIndex={hasControls ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <div
        className={cn(
          "relative size-full overflow-hidden rounded-panel shadow-card ring-1 ring-white",
          // Подложка видна только у вписанных силуэтов; фото закрывает её целиком.
          fit === "contain" && "bg-linear-to-b from-canvas-soft to-[#F9E7F1]",
        )}
      >
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
                className={cn(
                  fit === "cover"
                    ? "object-cover"
                    : "object-contain mask-b-from-94% mask-b-to-100%",
                )}
              />

              {/*
                Слайд с роликом. Видео вертикальное, а рамка карусели шире,
                поэтому внутри неё кадр обрезался бы почти на треть — вместо
                этого показываем обложку, а ролик открываем поверх страницы
                в его собственных пропорциях.
              */}
              {image.video ? (
                <button
                  type="button"
                  onClick={(event) => {
                    lastTriggerRef.current = event.currentTarget;
                    setOpenVideo(image);
                  }}
                  aria-label={`Смотреть видео: ${image.alt}`}
                  className="group/play absolute inset-0 flex items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-night/25 transition-colors duration-300 group-hover/play:bg-night/35"
                  />
                  <span
                    aria-hidden="true"
                    className="relative inline-flex size-14 items-center justify-center rounded-full bg-white/95 text-brand shadow-float transition-transform duration-300 ease-soft group-hover/play:scale-110"
                  >
                    <PlayIcon className="size-6 translate-x-0.5" />
                  </span>
                  {image.video.duration ? (
                    <span className="absolute top-3 right-3 rounded-full bg-night/70 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {image.video.duration}
                    </span>
                  ) : null}
                </button>
              ) : null}
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
                aria-label={`Слайд ${i + 1} из ${total}`}
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
            Слайд {index + 1} из {total}
          </p>
        </>
      ) : null}

      <VideoLightbox
        src={openVideo?.video?.src ?? null}
        poster={openVideo?.src}
        onClose={closeVideo}
      />
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
      aria-label={isPrev ? "Предыдущий слайд" : "Следующий слайд"}
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
