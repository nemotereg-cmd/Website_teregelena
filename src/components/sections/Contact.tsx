import { contacts } from "@/content/site";

import { ContactButton } from "@/components/ui/ContactButton";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  return (
    <Section id="contacts">
      <Container>
        <SectionHeading
          title="Связаться со мной"
          subtitle="Напишите в удобный мессенджер — отвечу и помогу выбрать курс под вашу задачу."
        />

        <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          {contacts.map((channel, index) => (
            <li key={channel.id}>
              <Reveal delay={index * 80}>
                <ContactButton channel={channel} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
