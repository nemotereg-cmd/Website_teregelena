"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

import { FloatingBadge } from "./FloatingBadge";
import {
  ChatGptMark,
  ClaudeMark,
  GeminiMark,
  KandinskyMark,
  MidjourneyMark,
  PerplexityMark,
  RunwayMark,
  SunoMark,
} from "./icons/ai-icons";

/**
 * Плашки нейросетей вокруг портрета.
 *
 * `position` — раскладка вокруг фигуры: правая колонка держится ближе к
 * краю, чтобы не перекрывать лицо и плечи.
 * `depth` — насколько сильно плашка смещается за курсором. Разные значения
 * дают ощущение глубины: ближние слои двигаются заметнее дальних.
 * `compact` — попадает ли плашка в мобильный ряд: там места мало, и восемь
 * штук развалились бы на четыре строки.
 */
const badges = [
  { label: "ChatGPT", icon: <ChatGptMark className="size-5" />, position: "top-[6%] left-0", depth: 20, compact: true },
  { label: "Claude", icon: <ClaudeMark className="size-5" />, position: "top-[28%] -left-4", depth: 26, compact: true },
  { label: "Midjourney", icon: <MidjourneyMark className="size-5" />, position: "top-[52%] -left-2", depth: 16, compact: true },
  { label: "Perplexity", icon: <PerplexityMark className="size-5" />, position: "top-[76%] left-4", depth: 22, compact: false },
  { label: "Gemini", icon: <GeminiMark className="size-5" />, position: "top-[12%] right-0", depth: 24, compact: true },
  { label: "Suno", icon: <SunoMark className="size-5" />, position: "top-[36%] -right-3", depth: 14, compact: false },
  { label: "Runway", icon: <RunwayMark className="size-5" />, position: "top-[60%] right-0", depth: 20, compact: false },
  { label: "Kandinsky", icon: <KandinskyMark className="size-5" />, position: "top-[84%] right-6", depth: 28, compact: false },
];

export function HeroBadges() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    // Параллакс — украшение: на тач-экранах курсора нет, а при просьбе
    // убрать анимации его быть не должно.
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      // Считаем не чаще кадра: pointermove сыплется десятками событий в секунду.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = layer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Нормируем по половине окна: у края экрана смещение выходит на максимум.
        const clamp = (v: number) => Math.max(-1, Math.min(1, v));
        setPointer({
          x: clamp((event.clientX - centerX) / (window.innerWidth / 2)),
          y: clamp((event.clientY - centerY) / (window.innerHeight / 2)),
        });
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    /*
      Слой не ловит курсор целиком — иначе он перекрыл бы портрет.
      Наведение доступно только самим плашкам.
    */
    <div ref={layerRef} className="pointer-events-none absolute inset-0 hidden sm:block">
        {badges.map((badge, index) => (
          <span
            key={badge.label}
            className={cn("absolute transition-transform duration-300 ease-soft", badge.position)}
            style={{
              transform: `translate3d(${pointer.x * badge.depth}px, ${pointer.y * badge.depth}px, 0)`,
            }}
          >
            <FloatingBadge
              label={badge.label}
              icon={badge.icon}
              floatDelay={index * 400}
              className="pointer-events-auto"
            />
          </span>
        ))}
    </div>
  );
}

/**
 * Мобильный вариант: плашки идут рядом под фотографией.
 *
 * Живёт отдельным компонентом, потому что рендерится вне квадратного
 * контейнера с портретом — внутри него ряд вылез бы за фиксированную высоту.
 */
export function HeroBadgesRow() {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:hidden">
      {badges
        .filter((badge) => badge.compact)
        .map((badge) => (
          <FloatingBadge
            key={badge.label}
            label={badge.label}
            icon={badge.icon}
            className="px-3 py-2"
          />
        ))}
    </div>
  );
}
