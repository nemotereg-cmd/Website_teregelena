import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Иконка справа от текста — например стрелка в CTA. */
  iconRight?: React.ReactNode;
  /** Растянуть на всю ширину контейнера (нужно на мобильных). */
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps &
  Omit<React.ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<React.ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonProps = AnchorProps | NativeButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[transform,background-color,color,box-shadow] duration-200 ease-soft " +
  "hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-float hover:bg-brand-hover",
  secondary: "bg-ink text-white hover:bg-night-soft",
  light:
    "bg-surface text-ink ring-1 ring-hairline shadow-card hover:ring-violet/40 hover:shadow-card-hover",
  ghost: "text-ink hover:text-brand hover:-translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
};

/**
 * Кнопка-ссылка или обычная кнопка — решается наличием `href`.
 *
 * Внешние ссылки (http…) автоматически открываются в новой вкладке
 * с rel="noopener noreferrer": все контакты в мессенджерах ведут наружу.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    iconRight,
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

  const content = (
    <>
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (typeof rest.href === "string") {
    const { href, target, rel, ...anchorProps } = rest as Omit<AnchorProps, keyof CommonProps>;
    const isExternal = /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        className={classes}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const { type, ...buttonProps } = rest as Omit<NativeButtonProps, keyof CommonProps>;

  return (
    <button type={type ?? "button"} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
