import { cn } from "@/lib/cn";

type FloatingBadgeProps = {
  label: string;
  icon: React.ReactNode;
  className?: string;
  /** Сдвигает фазу «парения», чтобы пилюли не качались синхронно. */
  floatDelay?: number;
};

/**
 * Белая «пилюля» с названием нейросети на первом экране.
 * Позиционируется классами извне — компонент отвечает только за вид.
 */
export function FloatingBadge({ label, icon, className, floatDelay = 0 }: FloatingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-2xl bg-surface/95 px-4 py-2.5",
        "shadow-float ring-1 ring-white/60 backdrop-blur-sm",
        "motion-safe:animate-[float_6s_ease-in-out_infinite]",
        // Наведение: плашка чуть увеличивается и подсвечивается. Анимация
        // «парения» живёт на этом же элементе, поэтому масштаб задаём через
        // scale-*, а не через transform — иначе они перебивали бы друг друга.
        "transition-[scale,box-shadow,--tw-ring-color] duration-300 ease-soft",
        "hover:scale-110 hover:shadow-card-hover hover:ring-violet/40",
        className,
      )}
      style={floatDelay ? { animationDelay: `${floatDelay}ms` } : undefined}
    >
      <span className="inline-flex size-6 items-center justify-center">{icon}</span>
      <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
    </span>
  );
}
