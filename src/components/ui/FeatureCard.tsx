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
      <h3 className="text-lg font-bold">{benefit.title}</h3>
      <p className="text-sm leading-relaxed text-pretty text-ink-muted">{benefit.description}</p>
    </Card>
  );
}
