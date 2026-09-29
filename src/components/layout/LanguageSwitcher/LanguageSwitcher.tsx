'use client';

import { type Locale, useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import styles from './LanguageSwitcher.module.css';

// Для української показуємо «UA»: «UK» поруч з «EN» читається як Велика Британія.
// Код мови в URL і атрибуті lang лишається `uk`.
const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  pl: 'PL',
  uk: 'UA',
};

// Назва мови нею ж самою — так її впізнає носій, яка б мова сайту не була відкрита.
const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  pl: 'Polski',
  uk: 'Українська',
};

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const t = useTranslations('languageSwitcher');
  const currentLocale = useLocale();
  // Шлях без мовного префікса: з /pl/privacy перемикаємось на /uk/privacy, а не на головну.
  const pathname = usePathname();

  return (
    <nav aria-label={t('label')} className={className}>
      <ul className={styles.list}>
        {routing.locales.map((locale) => {
          const isCurrent = locale === currentLocale;

          return (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                hrefLang={locale}
                lang={locale}
                aria-current={isCurrent ? 'true' : undefined}
                className={cn(styles.link, isCurrent && styles.current)}
              >
                <span aria-hidden="true">{LOCALE_LABELS[locale]}</span>
                <span className="visually-hidden">{LOCALE_NAMES[locale]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
