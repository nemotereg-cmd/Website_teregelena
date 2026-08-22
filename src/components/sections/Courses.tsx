import { courses, coursesHeading } from "@/content/courses";

import { Container } from "@/components/ui/Container";
import { CourseGrid } from "@/components/ui/CourseGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Courses() {
  return (
    <Section id="courses">
      <Container>
        <SectionHeading
          title={coursesHeading}
          subtitle="Четыре программы под разные задачи — от первого знакомства с нейросетями до внедрения ИИ в компании."
        />

        {/* Карточка показывает одну фразу, полное описание — в окне по клику. */}
        <CourseGrid courses={courses} />
      </Container>
    </Section>
  );
}
