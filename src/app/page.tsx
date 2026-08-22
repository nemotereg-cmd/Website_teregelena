import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Courses } from "@/components/sections/Courses";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Statement } from "@/components/sections/Statement";
import { Testimonials } from "@/components/sections/Testimonials";
import { buildHomeJsonLd } from "@/lib/seo";

export default function HomePage() {
  const jsonLd = buildHomeJsonLd();

  return (
    <>
      <Hero />
      <Statement />
      <About />
      <Courses />
      <Process />
      <Testimonials />
      <Contact />

      {/*
        Разметка schema.org: автор и курсы. Строка формируется из тех же
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
