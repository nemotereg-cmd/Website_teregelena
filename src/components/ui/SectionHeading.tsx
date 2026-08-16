import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  /** Уровень заголовка. На странице должен быть ровно один h1 — он в Hero. */
  as?: "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Tag className="text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
        {title}
      </Tag>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-base text-pretty text-ink-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
