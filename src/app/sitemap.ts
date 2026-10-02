import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getSiteUrl } from '@/lib/site';

// Сторінки для пошуку. /privacy закрита noindex, тому її тут нема.
const INDEXED_HREFS = ['/'];

function getLocalizedUrl(href: string, locale: Locale): string {
  return new URL(getPathname({ href, locale }), getSiteUrl()).toString();
}

/** Кожна сторінка — всіма мовами, з hreflang на кожну версію та x-default на автовибір мови. */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXED_HREFS.flatMap((href) => {
    const languages: Partial<Record<Locale, string>> = Object.fromEntries(
      routing.locales.map((locale) => [locale, getLocalizedUrl(href, locale)]),
    );

    return routing.locales.map((locale) => ({
      url: getLocalizedUrl(href, locale),
      alternates: {
        languages: { ...languages, 'x-default': new URL(href, getSiteUrl()).toString() },
      },
    }));
  });
}
