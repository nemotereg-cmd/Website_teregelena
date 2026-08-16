import type { ContactChannelId } from "@/types";

import type { IconProps } from "./ui-icons";

/**
 * Глифы мессенджеров и логотип. Нарисованы упрощённо и наследуют
 * `currentColor` — фирменный цвет задаётся классом на родителе,
 * поэтому одна и та же иконка работает и на светлом, и на тёмном фоне.
 */

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 3.7 2.9 10.9c-1 .4-1 1.8.03 2.14l4.6 1.5 1.77 5.4c.24.72 1.16.92 1.68.37l2.5-2.63 4.65 3.42c.63.46 1.53.12 1.7-.65l3.2-14.9c.2-.9-.7-1.65-1.53-1.32ZM8.9 13.9l9.1-5.6-7.4 6.6-.3 3.2-1.4-4.2Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.1-1.33A10 10 0 1 0 12 2Zm0 1.9a8.1 8.1 0 1 1-4.1 15.08l-.3-.18-3.02.79.8-2.94-.2-.31A8.1 8.1 0 0 1 12 3.9Z" />
      <path d="M9.3 7.4c-.2-.45-.4-.46-.6-.47h-.5a1 1 0 0 0-.72.34C7.2 7.6 6.7 8.1 6.7 9.1c0 1 .74 1.98.84 2.12.1.13 1.42 2.28 3.5 3.1 1.73.69 2.08.55 2.46.51.38-.03 1.22-.5 1.4-.98.17-.48.17-.9.12-.98-.05-.09-.19-.14-.4-.24-.2-.1-1.22-.6-1.4-.67-.2-.07-.33-.1-.47.1-.13.2-.53.67-.65.8-.12.14-.24.16-.44.06a5.6 5.6 0 0 1-1.65-1.02 6.2 6.2 0 0 1-1.14-1.42c-.12-.2-.01-.31.09-.41l.3-.35c.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.44-1.09-.62-1.49Z" />
    </svg>
  );
}

export function MaxIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.6c-5.3 0-9.6 3.9-9.6 8.7 0 2.75 1.42 5.2 3.63 6.79v3.2c0 .5.56.8.98.53l2.86-1.86c.68.13 1.4.2 2.13.2 5.3 0 9.6-3.9 9.6-8.86S17.3 2.6 12 2.6Z" />
      <path
        d="M8.2 14.3V9.5l2.4 2.9 2.4-2.9v4.8"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m14.6 9.6 2.6 4.7m0-4.7-2.6 4.7"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Соответствие идентификатора канала иконке и фирменному цвету. */
export const contactIcons: Record<
  ContactChannelId,
  { Icon: (props: IconProps) => React.ReactElement; colorClass: string }
> = {
  telegram: { Icon: TelegramIcon, colorClass: "text-telegram" },
  whatsapp: { Icon: WhatsAppIcon, colorClass: "text-whatsapp" },
  max: { Icon: MaxIcon, colorClass: "text-max" },
};

/** Знак логотипа — четырёхлепестковая «искра» из макета. */
export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-mark-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
      </defs>
      <path
        d="M16 1.8c1.1 4.5 3.2 7.6 6.4 9.4-3.2 1.8-5.3 4.9-6.4 9.4-1.1-4.5-3.2-7.6-6.4-9.4 3.2-1.8 5.3-4.9 6.4-9.4Z"
        fill="url(#logo-mark-gradient)"
      />
      <path
        d="M16 11.4c1.1 4.5 3.2 7.6 6.4 9.4-3.2 1.8-5.3 4.9-6.4 9.4-1.1-4.5-3.2-7.6-6.4-9.4 3.2-1.8 5.3-4.9 6.4-9.4Z"
        fill="url(#logo-mark-gradient)"
        opacity="0.75"
      />
    </svg>
  );
}
