import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

/**
 * Названия нейросетей крупным шрифтом позади портрета.
 *
 * Разный размер, наклон, прозрачность и размытие дают глубину: имена
 * ближе к краю читаются чётче, дальние тонут в фоне, а середину заслоняет
 * фигура — из-за этого слой воспринимается объёмным, а не плоской надписью.
 *
 * Имена медленно ходят по своим орбитам и по дороге проявляются и гаснут —
 * анимация целиком на CSS (см. hero-orbit и hero-breathe в globals.css),
 * поэтому компонент остаётся серверным и в браузер не уезжает ни строчки
 * JavaScript. На курсор слой по-прежнему не реагирует.
 *
 * `tone` — оттенок из палитры сайта, `depth` — насколько имя «далеко»:
 * от него зависят прозрачность, размытие и размах орбиты.
 */
type NeuralName = {
  label: string;
  /** Раскладка внутри квадрата с портретом. */
  position: string;
  /** Кегль: базовый для мобильных, дальше по брейкпоинтам. */
  size: string;
  tone: "violet" | "magenta" | "brand";
  depth: "near" | "mid" | "far";
  /** Лёгкий наклон — чтобы слой не выглядел таблицей. */
  rotate?: string;
  /** Прятать на узких экранах: там квадрат меньше и имена налезают друг на друга. */
  compact?: boolean;
};

const names: NeuralName[] = [
  // Левая колонка — вдоль свободного края слева от фигуры.
  { label: "ChatGPT",    position: "top-[1%] left-0 sm:left-[-8%]",   size: "text-3xl sm:text-4xl lg:text-5xl", tone: "violet",  depth: "near", rotate: "-rotate-3", compact: true },
  { label: "Veo",        position: "top-[17%] left-[12%]",  size: "text-xl sm:text-2xl lg:text-3xl",  tone: "brand",   depth: "far",  rotate: "rotate-2" },
  { label: "Claude",     position: "top-[30%] left-0 sm:left-[-12%]", size: "text-3xl sm:text-5xl lg:text-6xl", tone: "magenta", depth: "near", rotate: "rotate-2",  compact: true },
  { label: "Perplexity", position: "top-[49%] left-0 sm:left-[-14%]", size: "text-2xl sm:text-3xl lg:text-4xl", tone: "brand",   depth: "mid",  rotate: "-rotate-1", compact: true },
  { label: "Seedance",   position: "top-[66%] left-0 sm:left-[-8%]",  size: "text-lg sm:text-2xl lg:text-3xl",  tone: "magenta", depth: "mid",  rotate: "rotate-1" },
  { label: "Grok",       position: "top-[81%] left-0 sm:left-[-4%]",  size: "text-2xl sm:text-3xl lg:text-4xl", tone: "brand",   depth: "near", rotate: "-rotate-2", compact: true },

  // Правая колонка. Отрицательные отступы выводят имена за квадрат, но не за
  // секцию: по бокам от контейнера остаётся запас. Включаются только с sm —
  // на узком экране квадрат почти во всю ширину, и имена обрезал бы край.
  { label: "Midjourney", position: "top-[7%] right-0 sm:right-[-8%]",  size: "text-2xl sm:text-3xl lg:text-4xl", tone: "magenta", depth: "mid",  rotate: "rotate-2",  compact: true },
  { label: "Suno",       position: "top-[25%] right-0 sm:right-[-4%]", size: "text-2xl sm:text-4xl lg:text-5xl", tone: "violet",  depth: "near", rotate: "-rotate-2", compact: true },
  { label: "Kling",      position: "top-[41%] right-[6%]",  size: "text-lg sm:text-xl lg:text-2xl",   tone: "violet",  depth: "mid" },
  { label: "ElevenLabs", position: "top-[60%] right-0 sm:right-[-6%]", size: "text-xl sm:text-3xl lg:text-4xl",  tone: "violet",  depth: "mid",  rotate: "rotate-2",  compact: true },
  { label: "Runway",     position: "top-[85%] right-[0%]",  size: "text-lg sm:text-2xl lg:text-3xl",  tone: "magenta", depth: "mid" },
];

const tones = {
  violet: "text-violet",
  magenta: "text-magenta",
  brand: "text-brand",
} as const;

/** Дальше имя — мягче размытие: так слои не спорят за внимание. */
const depths = {
  near: "blur-[1.5px]",
  mid: "blur-[2.5px]",
  far: "blur-[4px]",
} as const;

/**
 * Чем ближе имя, тем шире его орбита и заметнее наплыв — так же, как ведут
 * себя предметы разной удалённости при движении наблюдателя.
 */
const depthMotion = {
  near: { rx: "1.15em", ry: "0.7em",  opacity: "0.35", scaleMin: "0.82", scaleMax: "1.12" },
  mid:  { rx: "0.85em", ry: "0.52em", opacity: "0.25", scaleMin: "0.86", scaleMax: "1.08" },
  far:  { rx: "0.6em",  ry: "0.36em", opacity: "0.2",  scaleMin: "0.9",  scaleMax: "1.05" },
} as const;

/**
 * Длительности и сдвиги фазы считаются от порядкового номера, а не берутся
 * случайными: случайные разъехались бы между сервером и браузером и React
 * ругался бы на несовпадение разметки.
 *
 * Значения подобраны так, чтобы у соседних имён не совпадали ни период
 * обхода, ни период «дыхания». Сдвиги отрицательные — каждое имя стартует
 * с середины своего цикла, иначе при загрузке страницы весь слой проявился
 * бы разом.
 */
function motionStyle(name: NeuralName, index: number): CSSProperties {
  const depth = depthMotion[name.depth];

  // Сторона берётся из той же раскладки, что и позиция, — держать её
  // отдельным полем значило бы дублировать одно и то же в двух местах.
  const towardCenter = name.position.includes("right-") ? "-" : "";

  return {
    "--orbit-rx": depth.rx,
    // Центр орбиты сдвинут внутрь на радиус: имя гуляет только к середине
    // квадрата и никогда не заходит дальше своей исходной точки наружу.
    "--orbit-cx": `${towardCenter}${depth.rx}`,
    "--orbit-ry": depth.ry,
    "--orbit-opacity": depth.opacity,
    "--orbit-scale-min": depth.scaleMin,
    "--orbit-scale-max": depth.scaleMax,
    "--orbit-spin": `${34 + index * 3}s`,
    "--orbit-breath": `${19 + ((index * 5) % 13)}s`,
    "--orbit-spin-delay": `-${index * 7}s`,
    "--orbit-breath-delay": `-${index * 11}s`,
  } as CSSProperties;
}

export function HeroNeuralNames() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {names.map((name, index) => (
        <span
          key={name.label}
          style={motionStyle(name, index)}
          className={cn(
            "hero-orbiting absolute font-extrabold tracking-tight whitespace-nowrap",
            name.position,
            name.size,
            tones[name.tone],
            depths[name.depth],
            name.rotate,
            // На узких экранах квадрат меньше, и часть имён налезала бы друг
            // на друга — там оставляем только крупные.
            !name.compact && "hidden sm:block",
          )}
        >
          {name.label}
        </span>
      ))}
    </div>
  );
}
