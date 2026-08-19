import { cn } from "@/lib/cn";

type SectionProps = {
  /** Якорь для навигации. Совпадает с href в `nav` из content/site.ts. */
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Насколько плотно секция прижата к соседям по вертикали. */
  spacing?: "normal" | "tight";
  /** Фоновая полоса. Соседние секции с одинаковым фоном сливаются в блок. */
  background?: "canvas" | "soft";
};

/**
 * Обёртка секции: вертикальные отступы, фон и якорь.
 *
 * `scroll-mt-*` компенсирует высоту закреплённой шапки — без него переход
 * по якорю прячет заголовок под хедером.
 */
export function Section({
  id,
  children,
  className,
  spacing = "normal",
  background = "canvas",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 lg:scroll-mt-28",
        /*
         * Отступы соседних секций складываются, поэтому здесь половина
         * желаемого просвета: py-14 сверху и снизу дают между двумя
         * секциями 112px, а не 112 у каждой.
         */
        spacing === "normal" ? "py-10 sm:py-12 lg:py-14" : "py-6 sm:py-8 lg:py-10",
        background === "soft" && "bg-canvas-soft",
        className,
      )}
    >
      {children}
    </section>
  );
}
