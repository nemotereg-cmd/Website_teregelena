import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FloatingBadge } from "@/components/ui/FloatingBadge";
import { GradientText } from "@/components/ui/GradientText";
import { ArrowRightIcon } from "@/components/ui/icons/ui-icons";
import {
  ChatGptMark,
  ClaudeMark,
  MidjourneyMark,
} from "@/components/ui/icons/ai-icons";

const badges = [
  { label: "ChatGPT", icon: <ChatGptMark className="size-5" /> },
  { label: "Claude", icon: <ClaudeMark className="size-5" /> },
  { label: "Midjourney", icon: <MidjourneyMark className="size-5" /> },
];

export function Hero() {
  return (
    <section id="top" className="hero-glow relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <div className="max-w-xl">
            {/*
              Единственный h1 на странице. Размер задан через clamp, чтобы
              заголовок тёк плавно, а не прыгал на брейкпоинтах.
            */}
            <h1 className="text-[clamp(1.85rem,6.2vw,3.5rem)] leading-[1.12] font-extrabold tracking-tight text-balance">
              Искусственный интеллект — ваш инструмент{" "}
              <GradientText>роста и свободы</GradientText>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-ink-muted sm:text-lg">
              Практические курсы по нейросетям для всех, кто хочет работать быстрее,
              эффективнее и создавать больше.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href="#courses"
                size="lg"
                iconRight={<ArrowRightIcon className="size-5" />}
                className="max-sm:w-full"
              >
                Выбрать курс
              </Button>
              <Button href="#about" variant="light" size="lg" className="max-sm:w-full">
                Обо мне
              </Button>
            </div>
          </div>

          {/* Визуал первого экрана. На мобильных пилюли уходят под фото в ряд. */}
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <div
                aria-hidden="true"
                className="absolute inset-[8%] rounded-full bg-linear-to-br from-violet/25 to-magenta/25 blur-3xl"
              />
              <Image
                src="/images/hero/portrait.svg"
                alt="Автор курсов за работой с нейросетями"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="relative object-contain"
              />

              {/* Пилюли позиционируются абсолютно только начиная с sm. */}
              <div className="pointer-events-none absolute inset-0 hidden sm:block">
                <FloatingBadge
                  {...badges[0]}
                  className="absolute top-[14%] left-0"
                  floatDelay={0}
                />
                <FloatingBadge
                  {...badges[1]}
                  className="absolute top-[40%] -left-2"
                  floatDelay={800}
                />
                <FloatingBadge
                  {...badges[2]}
                  className="absolute top-[66%] left-2"
                  floatDelay={1600}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:hidden">
              {badges.map((badge) => (
                <FloatingBadge key={badge.label} {...badge} className="px-3 py-2" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
