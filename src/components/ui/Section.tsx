import { cn } from "@/lib/cn";

type SectionProps = {
  /** Якорь для навигации. Совпадает с href в `nav` из content/site.ts. */
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Насколько плотно секция прижата к соседям по вертикали. */
  spacing?: "normal" | "tight";
};

/**
 * Обёртка секции: вертикальные отступы и якорь.
 *
 * `scroll-mt-*` компенсирует высоту закреплённой шапки — без него переход
 * по якорю прячет заголовок под хедером.
 */
export function Section({ id, children, className, spacing = "normal" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 lg:scroll-mt-28",
        spacing === "normal" ? "py-16 sm:py-20 lg:py-24" : "py-10 sm:py-12 lg:py-16",
        className,
      )}
    >
      {children}
    </section>
  );
}
