import Image from "next/image";

import type { Testimonial } from "@/types";

import { QuoteIcon } from "./icons/ui-icons";
import { Card } from "./Card";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card interactive className="flex h-full flex-col gap-5 p-6">
      <QuoteIcon className="size-7 text-[#F0A9C6]" />

      {/* blockquote + figcaption — семантика цитаты с указанием автора. */}
      <figure className="flex h-full flex-col gap-5">
        <blockquote className="text-sm leading-relaxed text-pretty text-ink-soft">
          {testimonial.quote}
        </blockquote>

        <figcaption className="mt-auto flex items-center gap-3">
          <Image
            src={testimonial.avatar}
            alt=""
            width={44}
            height={44}
            sizes="44px"
            className="size-11 rounded-full object-cover ring-1 ring-hairline"
          />
          <span className="flex flex-col">
            <span className="text-sm font-bold">{testimonial.author}</span>
            <span className="text-xs text-ink-muted">{testimonial.role}</span>
          </span>
        </figcaption>
      </figure>
    </Card>
  );
}
