import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { BRAND_NAME } from './constants';

/** Заголовок підсторінки: «Політика конфіденційності — PROSTO». */
export const TITLE_TEMPLATE = `%s — ${BRAND_NAME}`;

// Open Graph чекає локаль у форматі мова_КРАЇНА
const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  pl: 'pl_PL',
  uk: 'uk_UA',
};

type PageMetadataOptions = {
  locale: Locale;
  /** Шлях без мови: '/' або '/privacy'. */
  href: string;
  /** Назва підсторінки без бренду. Для головної не передаємо — береться metadata.title. */
  title?: string;
};

/**
 * canonical і Open Graph конкретної сторінки.
 * hreflang окремо не задаємо: next-intl уже віддає його в HTTP-заголовку Link.
 */
export async function getPageMetadata({
  locale,
  href,
  title,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const url = getPathname({ href, locale });

  return {
    // Навіть title: undefined стирає заголовок з layout, тому ключ додаємо лише для підсторінок
    ...(title ? { title } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: BRAND_NAME,
      title: title ? TITLE_TEMPLATE.replace('%s', title) : t('title'),
      description: t('description'),
      url,
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((otherLocale) => otherLocale !== locale)
        .map((otherLocale) => OG_LOCALES[otherLocale]),
    },
  };
}
