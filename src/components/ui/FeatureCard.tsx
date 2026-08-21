import type { Benefit } from "@/types";

import { benefitIconBackgrounds, benefitIcons } from "./icons/benefit-icons";
import { Card } from "./Card";
import { cn } from "@/lib/cn";

type FeatureCardProps = {
  benefit: Benefit;
};

/** Карточка секции «Что вы получите на курсах». */
export function FeatureCard({ benefit }: FeatureCardProps) {
  const Icon = benefitIcons[benefit.icon];

  return (
    <Card interactive className="flex h-full flex-col gap-4 p-6">
      <span
        className={cn(
          "inline-flex size-16 items-center justify-center rounded-full",
          benefitIconBackgrounds[benefit.icon],
        )}
      >
        <Icon className="size-9" />
      </span>
      {/*
        Резерв в две строки нужен только в полосе 768–900px: там колонки
        самые узкие и часть заголовков переносится, из-за чего описания
        соседних карточек разъезжаются. Шире 900px все заголовки в одну
        строку, и резерв снимается — иначе висела бы пустая строка.
        Диапазон замерен в браузере.
      */}
      <h3 className="text-lg font-bold min-[768px]:max-[899px]:min-h-14">{benefit.title}</h3>
      <p className="text-sm leading-relaxed text-pretty text-ink-muted">{benefit.description}</p>
    </Card>
  );
}
