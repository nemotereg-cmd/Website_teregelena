import { faq, faqHeading } from "@/content/faq";

import { Container } from "@/components/ui/Container";
import { PlusIcon } from "@/components/ui/icons/ui-icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Аккордеон на нативных <details>/<summary>: раскрытие, доступность
 * с клавиатуры и работа без JavaScript — из коробки браузера. Клиентский
 * компонент и обработчики здесь не нужны вовсе.
 */
export function Faq() {
  return (
    <Section id="faq">
      <Container>
        <SectionHeading title={faqHeading} />

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3">
          {faq.map((item, index) => (
            <Reveal key={item.id} delay={index * 60}>
              <details className="group rounded-card bg-surface ring-1 ring-hairline shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                  <span className="text-pretty">{item.question}</span>
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-canvas-soft text-ink transition-transform duration-300 ease-soft group-open:rotate-45">
                    <PlusIcon className="size-4" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-pretty text-ink-muted">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
