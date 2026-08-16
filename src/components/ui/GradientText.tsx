import { cn } from "@/lib/cn";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
};

/** Фиолетово-пурпурный акцент внутри заголовка. Утилита описана в globals.css. */
export function GradientText({ children, className }: GradientTextProps) {
  return <span className={cn("text-gradient", className)}>{children}</span>;
}
