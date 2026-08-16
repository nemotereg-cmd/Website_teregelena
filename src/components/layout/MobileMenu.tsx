"use client";

import { useEffect, useRef } from "react";

import { contacts, nav, primaryContactHref } from "@/content/site";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/cn";

import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/icons/ui-icons";
import { contactIcons } from "@/components/ui/icons/brand-icons";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Выдвижное меню для экранов уже lg. Рендерится всегда — анимируется прозрачностью. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(open);

  // Escape закрывает меню — привычное поведение любого оверлея.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-night/40 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Меню сайта"
        className={cn(
          "absolute inset-x-0 top-0 flex max-h-dvh flex-col gap-6 overflow-y-auto",
          "rounded-b-panel bg-canvas px-5 pt-5 pb-8 shadow-card-hover",
          "transition-transform duration-300 ease-soft",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="flex items-center justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-hairline"
            aria-label="Закрыть меню"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <nav aria-label="Основная навигация">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-hairline py-4 text-lg font-semibold transition-colors hover:text-brand"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button href={primaryContactHref} size="lg" fullWidth onClick={onClose}>
          Связаться
        </Button>

        <ul className="flex items-center justify-center gap-3">
          {contacts.map((channel) => {
            const { Icon, colorClass } = contactIcons[channel.id];
            return (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-12 items-center justify-center rounded-full bg-surface ring-1 ring-hairline"
                  aria-label={channel.label}
                >
                  <Icon className={cn("size-6", colorClass)} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
