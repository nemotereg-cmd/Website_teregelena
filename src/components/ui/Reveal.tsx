"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  /** Задержка в миллисекундах — для каскада внутри сетки карточек. */
  delay?: number;
  className?: string;
};

/**
 * Плавно проявляет содержимое при попадании в экран.
 *
 * Клиентский компонент, но `children` приходят пропсом из серверного
 * дерева — значит сама разметка остаётся серверной и в бандл не попадает.
 * При `prefers-reduced-motion` и при отключённом JS содержимое видно сразу
 * (см. globals.css и <noscript> в layout).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "reveal-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
