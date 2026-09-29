import { notFound } from 'next/navigation';
import { hasLocale, type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { LocaleParams } from '@/types/i18n';
import { routing } from './routing';

/**
 * Перевіряє мову з URL і вмикає для неї статичний рендер.
 * Викликати першим рядком у кожному layout / page / generateMetadata всередині app/[locale].
 */
export async function initRequestLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return locale;
}
