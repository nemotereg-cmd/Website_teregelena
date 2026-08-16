import { site } from "@/content/site";
import { cn } from "@/lib/cn";

import { LogoMark } from "@/components/ui/icons/brand-icons";

type LogoProps = {
  className?: string;
  /** На тёмном фоне (футер) название должно быть белым. */
  tone?: "dark" | "light";
};

export function Logo({ className, tone = "dark" }: LogoProps) {
  return (
    <a
      href="#top"
      className={cn("inline-flex items-center gap-2.5 rounded-lg", className)}
      aria-label={`${site.name} — на главную`}
    >
      <LogoMark className="size-7 shrink-0" />
      <span
        className={cn(
          "text-lg font-extrabold tracking-tight",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        {site.name}
      </span>
    </a>
  );
}
