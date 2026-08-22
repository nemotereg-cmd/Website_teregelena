import { statement } from "@/content/site";

import { Container } from "@/components/ui/Container";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * Плашка-манифест сразу под первым экраном.
 *
 * Тёмная — чтобы разделить два светлых блока подряд: без неё первый экран
 * перетекал в преимущества без паузы. Заголовка здесь намеренно нет: это
 * одна фраза, а не раздел, и лишний h2 сбивал бы структуру страницы.
 */
export function Statement() {
  return (
    <Section spacing="tight">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-panel bg-night px-6 py-10 text-center text-white sm:px-10 sm:py-12 lg:py-14">
            {/* Свечение из макета — чистый CSS, без картинки. */}
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/4 size-72 rounded-full bg-violet/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -right-10 -bottom-28 size-72 rounded-full bg-magenta/20 blur-3xl"
            />

            <p className="relative mx-auto max-w-3xl text-2xl leading-snug font-extrabold text-balance sm:text-3xl lg:text-4xl">
              {statement.lead} <GradientText>{statement.accent}</GradientText>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
