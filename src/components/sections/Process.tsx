import { processHeading, processSteps } from "@/content/about";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** «Как проходит обучение» — снимает главное возражение «а что там внутри». */
export function Process() {
  return (
    <Section id="process" spacing="tight">
      <Container>
        <SectionHeading
          title={processHeading}
          subtitle="Четыре шага от первого сообщения до готовых сценариев под ваши задачи."
        />

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 80} className="h-full">
                <div className="relative flex h-full flex-col gap-3 rounded-card bg-surface p-6 ring-1 ring-hairline shadow-card">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-linear-to-br from-violet to-magenta text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-ink-muted">
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
