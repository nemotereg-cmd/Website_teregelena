"use client";

import { useCallback, useEffect, useRef } from "react";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

import { CloseIcon } from "./icons/ui-icons";

type VideoLightboxProps = {
  /** Путь к ролику. `null` — окно закрыто и в DOM ничего не остаётся. */
  src: string | null;
  poster?: string;
  /** Подпись под плеером: имя и роль автора отзыва. */
  caption?: string;
  onClose: () => void;
};

/**
 * Окно просмотра ролика поверх страницы.
 *
 * Общее для видеоотзывов и карусели «Обо мне»: оба показывают вертикальное
 * видео 9:16, и дублировать логику закрытия, фокуса и блокировки прокрутки
 * в двух местах было бы лишним.
 *
 * Плеер отображается в своих пропорциях — вписывать вертикальный ролик в
 * чужую рамку нельзя, обрежется треть кадра.
 */
export function VideoLightbox({ src, poster, caption, onClose }: VideoLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = src !== null;

  useLockBodyScroll(isOpen);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр видео"
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-full flex-col items-center"
        // Клик по самому плееру не должен закрывать окно.
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть видео"
          className="mb-3 inline-flex size-11 items-center justify-center self-end rounded-full bg-white/95 text-ink shadow-card transition-transform hover:scale-105"
        >
          <CloseIcon className="size-5" />
        </button>

        {/*
          key на src заставляет React пересоздать элемент при смене ролика:
          иначе в плеере остался бы предыдущий. controls обязательны —
          без них видео со звуком нечем остановить.
        */}
        <video
          key={src}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="max-h-[80vh] w-auto max-w-full rounded-panel shadow-card-hover"
        />

        {caption ? <p className="mt-3 text-center text-sm text-white/80">{caption}</p> : null}
      </div>
    </div>
  );
}
