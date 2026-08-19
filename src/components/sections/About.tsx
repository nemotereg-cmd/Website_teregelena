import {
  aboutHeading,
  aboutImages,
  aboutLead,
  aboutParagraphs,
  aboutStats,
} from "@/content/about";

import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Секции не было в макете, хотя пункт меню «Обо мне» на неё ссылался.
 * Для сайта-визитки эксперта это ключевой блок доверия.
 */
export function About() {
  return (
    <Section id="about" background="soft">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
              <div
                aria-hidden="true"
                className="absolute -inset-3 bottom-10 rounded-panel bg-linear-to-br from-violet/20 to-magenta/20 blur-2xl"
              />
              {/*
                Силуэты вырезаны, поэтому под ними лежит светлая панель с
                градиентом: без опоры фигура на фоне секции «висела» бы
                в пустоте. Панель и маска низа живут внутри Carousel.
              */}
              {/*
                Пока в карусели вырезанный силуэт — режим "contain". Когда
                придут обычные фотографии с фоном, здесь достаточно убрать
                fit: по умолчанию кадр заполняет рамку целиком.
              */}
              <Carousel images={aboutImages} className="aspect-4/5" fit="contain" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <SectionHeading align="left" title={aboutHeading} />

              <p className="mt-5 text-lg font-semibold text-pretty text-ink-soft">{aboutLead}</p>

              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-pretty text-ink-muted">
                  {paragraph}
                </p>
              ))}

              <dl className="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-card bg-surface p-4 ring-1 ring-hairline shadow-card"
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl font-extrabold text-gradient">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs text-ink-muted">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
