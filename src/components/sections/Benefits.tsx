import { benefits, benefitsHeading } from "@/content/benefits";

import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Benefits() {
  return (
    <Section id="benefits">
      <Container>
        {/* Светлая панель со скруглением — как в макете. */}
        <div className="rounded-panel bg-surface/70 px-4 py-10 ring-1 ring-white sm:px-8 lg:px-12 lg:py-14">
          <SectionHeading title={benefitsHeading} />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <li key={benefit.id}>
                <Reveal delay={index * 80} className="h-full">
                  <FeatureCard benefit={benefit} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
