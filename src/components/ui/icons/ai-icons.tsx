import type { IconProps } from "./ui-icons";

/**
 * Значки нейросетей для «пилюль» на первом экране. Нарисованы упрощённо
 * и служат подписью к названию рядом, а не заменой фирменного знака.
 */

export function ChatGptMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.2 19.6 7.6v8.8L12 20.8 4.4 16.4V7.6L12 3.2Z"
        stroke="#0F9D76"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 8v8M8.2 9.9l7.6 4.2M15.8 9.9l-7.6 4.2"
        stroke="#0F9D76"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ClaudeMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="#D97757" strokeWidth="1.9" strokeLinecap="round">
        <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3 6.3 17.7" />
      </g>
      <circle cx="12" cy="12" r="2.6" fill="#D97757" />
    </svg>
  );
}

export function MidjourneyMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M11 4.5 4.5 17H11V4.5Z"
        stroke="#16123A"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13 8.5 19.5 17H13V8.5Z"
        stroke="#16123A"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M3 20h18" stroke="#16123A" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
