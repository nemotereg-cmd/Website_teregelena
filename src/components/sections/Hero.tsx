import Image from "next/image";

import { author } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GradientText } from "@/components/ui/GradientText";
import { ArrowRightIcon } from "@/components/ui/icons/ui-icons";
import { HeroNeuralNames } from "@/components/ui/HeroNeuralNames";

export function Hero() {
  return (
    <section id="top" className="hero-glow relative overflow-hidden pt-6 pb-10 lg:pt-10 lg:pb-14">
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

          {/* Визуал первого экрана: портрет поверх слоя с названиями нейросетей. */}
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full bg-linear-to-br from-violet/30 to-magenta/30 blur-3xl"
              />
              {/* Названия нейросетей — слоем позади фигуры. */}
              <HeroNeuralNames />

              {/*
                PNG с прозрачным фоном: силуэт лежит прямо на свечении, без
                подложки — как в макете. Тень отделяет фигуру от лавандового
                фона, а маска растворяет низ: кадр обрезан по бедро, и без неё
                платье обрывалось бы жёсткой горизонтальной линией.
              */}
              <Image
                src="/images/hero/portrait.png"
                alt={`${author.name} — ${author.jobTitle}`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="relative object-contain drop-shadow-[0_18px_35px_rgb(80_50_150/0.28)] mask-b-from-92% mask-b-to-100%"
              />

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
