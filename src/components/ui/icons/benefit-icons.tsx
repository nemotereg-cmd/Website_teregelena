import type { BenefitIconId } from "@/types";

import type { IconProps } from "./ui-icons";

/**
 * Иконки для секции «Что вы получите». В макете это объёмные 3D-рендеры;
 * здесь — векторные эквиваленты с теми же градиентами. Векторы весят
 * считаные байты, масштабируются без потерь и не требуют загрузки картинок.
 *
 * id градиентов должны быть уникальны в пределах документа, поэтому у
 * каждой иконки свой префикс.
 */

function TextIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bi-text" x1="10" y1="8" x2="38" y2="40">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
      </defs>
      <rect x="8" y="6" width="26" height="34" rx="5" fill="url(#bi-text)" opacity="0.18" />
      <path
        d="M15 15h13M15 22h13M15 29h8"
        stroke="url(#bi-text)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="m33 27 7.2 7.2-3.6 1.1-1.1 3.6L28.3 31.7 33 27Z"
        fill="url(#bi-text)"
      />
    </svg>
  );
}

function ContentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bi-content" x1="6" y1="10" x2="42" y2="38">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect x="6" y="10" width="36" height="28" rx="6" fill="url(#bi-content)" opacity="0.18" />
      <rect
        x="6"
        y="10"
        width="36"
        height="28"
        rx="6"
        stroke="url(#bi-content)"
        strokeWidth="2.4"
      />
      <circle cx="17" cy="20" r="3.4" fill="url(#bi-content)" />
      <path
        d="m10 34 9-9 6.5 6.5L31 26l7 8"
        stroke="url(#bi-content)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnalyticsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bi-analytics" x1="8" y1="40" x2="40" y2="8">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="7" y="26" width="7" height="15" rx="3" fill="url(#bi-analytics)" opacity="0.45" />
      <rect x="17.5" y="18" width="7" height="23" rx="3" fill="url(#bi-analytics)" opacity="0.7" />
      <rect x="28" y="9" width="7" height="32" rx="3" fill="url(#bi-analytics)" />
      <path
        d="M9 20 19 12l7 5 11-9"
        stroke="url(#bi-analytics)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  );
}

export const benefitIcons: Record<BenefitIconId, (props: IconProps) => React.ReactElement> = {
  text: TextIcon,
  content: ContentIcon,
  analytics: AnalyticsIcon,
};

/** Пастельная подложка под иконкой — свой оттенок на каждую карточку. */
export const benefitIconBackgrounds: Record<BenefitIconId, string> = {
  text: "bg-[#FDECF5]",
  content: "bg-[#F0EAFE]",
  analytics: "bg-[#E8EBFD]",
};
