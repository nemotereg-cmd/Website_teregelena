import { testimonials, testimonialsHeading } from "@/content/testimonials";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <SectionHeading title={testimonialsHeading} />

        {/*
          В макете четвёртой ячейкой сетки стояла тёмная карточка-призыв.
          Она вынесена в отдельный блок CtaBanner: разный смысл — разные блоки,
          и отзывы остаются честной сеткой из одних отзывов.
        */}
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.id}>
              <Reveal delay={index * 80} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
