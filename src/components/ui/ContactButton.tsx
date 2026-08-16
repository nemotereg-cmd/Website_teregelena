import type { ContactChannel } from "@/types";

import { contactIcons } from "./icons/brand-icons";
import { cn } from "@/lib/cn";

type ContactButtonProps = {
  channel: ContactChannel;
  className?: string;
};

/** Крупная кнопка мессенджера из секции «Связаться со мной». */
export function ContactButton({ channel, className }: ContactButtonProps) {
  const { Icon, colorClass } = contactIcons[channel.id];

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center justify-center gap-3 rounded-card bg-surface px-6 py-5",
        "ring-1 ring-hairline shadow-card transition-[transform,box-shadow,--tw-ring-color] duration-300 ease-soft",
        "hover:-translate-y-1 hover:shadow-card-hover hover:ring-violet/40",
        className,
      )}
    >
      <Icon className={cn("size-7 shrink-0", colorClass)} />
      <span className="flex flex-col">
        <span className="font-bold">{channel.label}</span>
        {channel.hint ? (
          <span className="text-xs text-ink-muted">{channel.hint}</span>
        ) : null}
      </span>
    </a>
  );
}
