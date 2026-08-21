import { courses, coursesHeading } from "@/content/courses";

import { Container } from "@/components/ui/Container";
import { CourseCard } from "@/components/ui/CourseCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Courses() {
  return (
    <Section id="courses">
      <Container>
        <SectionHeading
          title={coursesHeading}
          subtitle="Четыре программы под разные задачи — от первого знакомства с нейросетями до обучения целой команды."
        />

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <li key={course.slug}>
              <Reveal delay={index * 80} className="h-full">
                {/*
                  Пока отдельных страниц курсов нет, карточка ведёт в контакты.
                  Когда появится /courses/[slug] — меняется только этот href.
                */}
                <CourseCard course={course} href="#contacts" />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
