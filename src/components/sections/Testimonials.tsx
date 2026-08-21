import { testimonialsHeading, videoTestimonials } from "@/content/testimonials";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoTestimonials } from "@/components/ui/VideoTestimonials";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <SectionHeading
          title={testimonialsHeading}
          subtitle="Живые отзывы с обучения — нажмите на карточку, чтобы посмотреть."
        />

        {/*
          В макете четвёртой ячейкой сетки стояла тёмная карточка-призыв.
          Она вынесена в отдельный блок CtaBanner: разный смысл — разные блоки,
          и отзывы остаются честной сеткой из одних отзывов.
        */}
        <Reveal>
          <VideoTestimonials items={videoTestimonials} />
        </Reveal>
      </Container>
    </Section>
  );
}
