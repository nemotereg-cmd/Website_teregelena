import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { Courses } from "@/components/sections/Courses";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { buildHomeJsonLd } from "@/lib/seo";

export default function HomePage() {
  const jsonLd = buildHomeJsonLd();

  return (
    <>
      <Hero />
      <Benefits />
      <Courses />
      <About />
      <Process />
      <Testimonials />
      <CtaBanner />
      <Faq />
      <Contact />

      {/*
        Разметка schema.org: автор, курсы и FAQ. Строка формируется из тех же
        данных, что и видимый текст, поэтому расхождений между разметкой и
        страницей быть не может.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
