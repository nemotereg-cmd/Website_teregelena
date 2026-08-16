import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  /** Светлая карточка на белом или тёмная плашка-призыв. */
  tone?: "light" | "night";
  /** Реакция на наведение — только там, где карточка кликабельна. */
  interactive?: boolean;
  className?: string;
};

/** Базовая поверхность: скругление, фон, обводка и тень. */
export function Card({ children, tone = "light", interactive, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card transition-[transform,box-shadow] duration-300 ease-soft",
        tone === "light"
          ? "bg-surface ring-1 ring-hairline shadow-card"
          : "bg-night text-white shadow-card",
        interactive && "hover:-translate-y-1 hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
