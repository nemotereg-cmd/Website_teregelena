import { processHeading, processSteps } from "@/content/about";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** «Как проходит обучение» — снимает главное возражение «а что там внутри». */
export function Process() {
  return (
    <Section id="process" spacing="tight" background="soft">
      <Container>
        <SectionHeading
          title={processHeading}
          subtitle="Четыре шага — от разбора ваших задач до решений, которыми вы пользуетесь самостоятельно."
        />

        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 80} className="h-full">
                <div className="relative flex h-full flex-col rounded-card bg-surface p-6 ring-1 ring-hairline shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet to-magenta text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-ink-soft">
                      {step.label}
                    </span>
                  </div>

                  {/*
                    Резерв высоты под заголовок: в две колонки и в четыре часть
                    названий переносится на вторую строку, и без резерва
                    описания соседних карточек начинались бы на разной высоте.
                  */}
                  <h3 className="mt-4 text-lg font-bold text-balance sm:min-h-14">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
