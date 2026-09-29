import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pl', 'uk'],
  defaultLocale: 'en',
  // Префікс у кожному URL (/en, /pl, /uk): чисті hreflang для SEO і окремий кеш на кожну мову.
  localePrefix: 'always',
});
