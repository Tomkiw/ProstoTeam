import type { Locale } from 'next-intl';

/** Текст усіма мовами сайту. Якщо якусь мову пропустити — TypeScript підсвітить помилку. */
export type LocalizedString = Record<Locale, string>;

/** params сторінок і layout усередині app/[locale]. */
export type LocaleParams = Promise<{ locale: string }>;
