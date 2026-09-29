type ClassValue = string | false | null | undefined;

/** Склеює CSS-класи й пропускає порожні — щоб не тягнути залежність clsx. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
