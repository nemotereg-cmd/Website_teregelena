import { author, contacts, nav, site } from "@/content/site";

import { Container } from "@/components/ui/Container";
import { contactIcons } from "@/components/ui/icons/brand-icons";
import { Logo } from "./Logo";

/** Футера в макете не было — добавлен как обязательный элемент сайта-визитки. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-white">
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/60">{author.description}</p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Навигация в подвале">
              <h2 className="text-sm font-bold text-white/90">Разделы</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-sm font-bold text-white/90">Связь</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {contacts.map((channel) => {
                  const { Icon } = contactIcons[channel.id];
                  return (
                    <li key={channel.id}>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                      >
                        <Icon className="size-4.5 shrink-0" />
                        {channel.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
          © {year} {site.name}. Все права защищены.
        </div>
      </Container>
    </footer>
  );
}
