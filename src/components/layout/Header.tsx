"use client";

import { useCallback, useEffect, useState } from "react";

import { nav, primaryContactHref } from "@/content/site";
import { cn } from "@/lib/cn";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MenuIcon } from "@/components/ui/icons/ui-icons";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Закреплённая шапка. Клиентский компонент по двум причинам: состояние
 * мобильного меню и подложка, которая появляется после начала прокрутки.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled ? "bg-canvas/85 shadow-card backdrop-blur-md" : "bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />

          <nav className="hidden lg:block" aria-label="Основная навигация">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[15px] font-medium text-ink-soft transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href={primaryContactHref} size="sm" className="hidden sm:inline-flex">
              Связаться
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-hairline lg:hidden"
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
