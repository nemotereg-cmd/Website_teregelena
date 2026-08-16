type ClassValue = string | false | null | undefined;

/**
 * Склеивает classNames, отбрасывая пустые значения.
 *
 * Намеренно не тянем `clsx`/`tailwind-merge`: на статичном лендинге
 * конфликтующих утилит не возникает, а условные классы решаются вот этими
 * пятью строками.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
