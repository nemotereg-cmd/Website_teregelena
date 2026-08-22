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

export function GeminiMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2c.5 5.2 4.3 9 9.5 10-5.2 1-9 4.8-9.5 10-.5-5.2-4.3-9-9.5-10 5.2-1 9-4.8 9.5-10Z"
        fill="#4285F4"
      />
    </svg>
  );
}

export function RunwayMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="#16123A" strokeWidth="1.7" />
      <path d="M9 8.5h4a2.6 2.6 0 0 1 0 5.2H9V8.5Zm0 5.2 4.6 5.1" stroke="#16123A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SunoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="#E8562A" strokeWidth="2" strokeLinecap="round">
        <path d="M4 10.5v3M8 7v10M12 4.5v15M16 7.5v9M20 10.5v3" />
      </g>
    </svg>
  );
}

export function KandinskyMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="9" r="5.2" fill="#7B61FF" />
      <path d="M15.4 9.6 20.6 19H10.2l5.2-9.4Z" fill="#21A038" opacity="0.9" />
    </svg>
  );
}

export function PerplexityMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <g stroke="#20808D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4.5v15" />
        <path d="M12 8.6 7 4.9v5.4H4.2v6.1H7v3.7l5-4.4" />
        <path d="M12 8.6 17 4.9v5.4h2.8v6.1H17v3.7l-5-4.4" />
      </g>
    </svg>
  );
}
