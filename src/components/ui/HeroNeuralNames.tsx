import { cn } from "@/lib/cn";

/**
 * Названия нейросетей крупным шрифтом позади портрета.
 *
 * Разный размер, наклон, прозрачность и размытие дают глубину: имена
 * ближе к краю читаются чётче, дальние тонут в фоне, а середину заслоняет
 * фигура — из-за этого слой воспринимается объёмным, а не плоской надписью.
 *
 * Серверный компонент: анимации и реакции на курсор здесь нет, поэтому
 * в браузер не уезжает ни строчки JavaScript.
 *
 * `tone` — оттенок из палитры сайта, `depth` — насколько имя «далеко»:
 * от него зависят прозрачность и сила размытия.
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

/** Дальше имя — прозрачнее и мягче: так слои не спорят за внимание. */
const depths = {
  near: "opacity-35 blur-[1.5px]",
  mid: "opacity-25 blur-[2.5px]",
  far: "opacity-20 blur-[4px]",
} as const;

export function HeroNeuralNames() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {names.map((name) => (
        <span
          key={name.label}
          className={cn(
            "absolute font-extrabold tracking-tight whitespace-nowrap",
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
