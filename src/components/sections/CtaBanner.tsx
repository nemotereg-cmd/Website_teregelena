import { primaryContactHref } from "@/content/site";
import { testimonialsCta } from "@/content/testimonials";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/icons/ui-icons";

/** Тёмная плашка-призыв. В макете была четвёртой карточкой в сетке отзывов. */
export function CtaBanner() {
  return (
    <Section spacing="tight">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-panel bg-night px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16">
            {/* Неоновое свечение из макета — чистый CSS, без картинки. */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-16 size-80 rounded-full bg-violet/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-10 size-72 rounded-full bg-magenta/20 blur-3xl"
            />

            <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-extrabold text-balance sm:text-3xl lg:text-4xl">
                  {testimonialsCta.title}
                </h2>
                <p className="mt-4 text-pretty text-white/70">{testimonialsCta.description}</p>
              </div>

              <Button
                href={primaryContactHref}
                size="lg"
                iconRight={<ArrowRightIcon className="size-5" />}
                className="max-lg:w-full"
              >
                {testimonialsCta.action}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
