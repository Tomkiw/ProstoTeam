import type { NextRequest } from 'next/server';
import type { Locale } from 'next-intl';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Vercel додає цей заголовок до кожного запиту. Локально його немає — тоді діє routing.defaultLocale.
const COUNTRY_HEADER = 'x-vercel-ip-country';

const LOCALE_BY_COUNTRY: Partial<Record<string, Locale>> = {
  PL: 'pl',
  UA: 'uk',
};

function getLocaleByCountry(request: NextRequest): Locale {
  const country = request.headers.get(COUNTRY_HEADER)?.toUpperCase();
  return (country && LOCALE_BY_COUNTRY[country]) || routing.defaultLocale;
}

/**
 * next-intl визначає мову так: cookie (ручний вибір) → мова браузера → defaultLocale.
 * Підміняючи defaultLocale мовою країни, отримуємо гео лише як запасний варіант:
 * українець у Польщі з українським браузером усе одно потрапить на /uk.
 */
export function proxy(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    ...routing,
    defaultLocale: getLocaleByCountry(request),
  });

  return handleI18nRouting(request);
}

export const config = {
  // Пропускаємо API, службові шляхи Next.js / Vercel і файли з розширенням (зображення, favicon).
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
