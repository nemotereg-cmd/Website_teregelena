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
 * от него зависят прозрачность и размытие. Форма орбиты — в таблице orbits.
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

const names = [
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
] as const satisfies readonly NeuralName[];

type Label = (typeof names)[number]["label"];

/**
 * Расширенный взгляд на тот же массив. `as const` выше нужен только ради
 * Label — без него имена стали бы просто строками и таблица орбит потеряла
 * бы проверку на пропуски. Но `as const` заодно делает необязательные поля
 * отсутствующими у части элементов, поэтому для перебора берём общий тип.
 */
const layers: readonly (NeuralName & { label: Label })[] = names;

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
 * Чем ближе имя, тем заметнее наплыв — так же, как ведут себя предметы
 * разной удалённости при движении наблюдателя.
 *
 * Размах намеренно небольшой: крупное имя, раздуваясь, лезет правым краем
 * за силуэт, а левым — к заголовку первого экрана. Основную работу делает
 * прозрачность, увеличение только поддерживает её.
 */
const depthMotion = {
  near: { opacity: "0.35", scaleMin: "0.88", scaleMax: "1.06" },
  mid:  { opacity: "0.25", scaleMin: "0.9",  scaleMax: "1.05" },
  far:  { opacity: "0.2",  scaleMin: "0.92", scaleMax: "1.04" },
} as const;

type Orbit = {
  /** Радиусы эллипса в em — привязаны к кеглю имени и уменьшаются вместе с ним. */
  rx: string;
  ry: string;
  /** Период обхода орбиты и период «дыхания». */
  spin: string;
  breath: string;
  /** Сдвиги фазы — отрицательные, чтобы имя стартовало с середины цикла. */
  spinDelay: string;
  breathDelay: string;
  /** Обходить орбиту против часовой стрелки. */
  reverse?: boolean;
};

/**
 * Орбита у каждого имени своя: где-то вытянута по вертикали, где-то по
 * горизонтали, где-то близка к кругу, и половина имён обходит её в обратную
 * сторону. Периоды подобраны некратными — соседи не попадают в такт, и слой
 * не читается как один параллельный сдвиг.
 *
 * Радиусы по горизонтали заметно меньше, чем по вертикали: вбок имя уползает
 * либо глубоко за силуэт, либо к заголовку первого экрана, а вверх-вниз места
 * сколько угодно.
 *
 * Ключ — само название, поэтому строки нельзя потерять при перестановке имён:
 * пропущенную заметит TypeScript.
 */
const orbits: Record<Label, Orbit> = {
  ChatGPT:    { rx: "0.34em", ry: "0.85em", spin: "38s", breath: "23s", spinDelay: "-5s",  breathDelay: "-7s" },
  Veo:        { rx: "0.62em", ry: "0.30em", spin: "47s", breath: "19s", spinDelay: "-19s", breathDelay: "-21s", reverse: true },
  Claude:     { rx: "0.26em", ry: "0.70em", spin: "33s", breath: "29s", spinDelay: "-31s", breathDelay: "-3s",  reverse: true },
  Perplexity: { rx: "0.30em", ry: "0.60em", spin: "52s", breath: "21s", spinDelay: "-8s",  breathDelay: "-17s" },
  Seedance:   { rx: "0.55em", ry: "0.55em", spin: "41s", breath: "31s", spinDelay: "-24s", breathDelay: "-26s", reverse: true },
  Grok:       { rx: "0.45em", ry: "0.75em", spin: "59s", breath: "25s", spinDelay: "-13s", breathDelay: "-9s" },
  Midjourney: { rx: "0.40em", ry: "0.50em", spin: "36s", breath: "27s", spinDelay: "-37s", breathDelay: "-14s", reverse: true },
  Suno:       { rx: "0.58em", ry: "0.34em", spin: "44s", breath: "20s", spinDelay: "-2s",  breathDelay: "-30s" },
  Kling:      { rx: "0.70em", ry: "0.70em", spin: "50s", breath: "24s", spinDelay: "-28s", breathDelay: "-5s",  reverse: true },
  ElevenLabs: { rx: "0.36em", ry: "0.66em", spin: "35s", breath: "30s", spinDelay: "-16s", breathDelay: "-23s" },
  Runway:     { rx: "0.60em", ry: "0.42em", spin: "55s", breath: "22s", spinDelay: "-11s", breathDelay: "-12s", reverse: true },
};

function motionStyle(name: NeuralName & { label: Label }): CSSProperties {
  const depth = depthMotion[name.depth];
  const orbit = orbits[name.label];

  return {
    "--orbit-rx": orbit.rx,
    "--orbit-ry": orbit.ry,
    "--orbit-opacity": depth.opacity,
    "--orbit-scale-min": depth.scaleMin,
    "--orbit-scale-max": depth.scaleMax,
    "--orbit-spin": orbit.spin,
    "--orbit-breath": orbit.breath,
    "--orbit-spin-delay": orbit.spinDelay,
    "--orbit-breath-delay": orbit.breathDelay,
    "--orbit-spin-direction": orbit.reverse ? "reverse" : "normal",
  } as CSSProperties;
}

export function HeroNeuralNames() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {layers.map((name) => (
        <span
          key={name.label}
          style={motionStyle(name)}
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
