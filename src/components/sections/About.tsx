import Image from "next/image";

import {
  aboutHeading,
  aboutImage,
  aboutLead,
  aboutParagraphs,
  aboutStats,
} from "@/content/about";
import { author } from "@/content/site";

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
    <Section id="about">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="relative mx-auto aspect-4/5 w-full max-w-sm lg:max-w-md">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-panel bg-linear-to-br from-violet/20 to-magenta/20 blur-2xl"
              />
              {/*
                Силуэт вырезан, поэтому под ним лежит светлая панель с
                градиентом: без опоры фигура на белом фоне секции «висела» бы
                в пустоте. Само фото — object-contain, чтобы не обрезать голову.
              */}
              <div className="relative size-full overflow-hidden rounded-panel bg-linear-to-b from-canvas-soft to-[#F9E7F1] shadow-card ring-1 ring-white">
                <Image
                  src={aboutImage}
                  alt={`${author.name} — ${author.jobTitle}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 85vw"
                  className="object-contain mask-b-from-94% mask-b-to-100%"
                />
              </div>
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
