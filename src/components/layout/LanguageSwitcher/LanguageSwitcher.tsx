'use client';

import { type Locale, useLocale, useTranslations } from 'next-intl';
import { type MouseEvent, useState } from 'react';
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

type LanguageSwitcherTone = 'dark' | 'light';

type LanguageSwitcherProps = {
  /** dark — на світлому фоні (header), light — на темному (мобільне меню). Як у Logo. */
  tone?: LanguageSwitcherTone;
  className?: string;
};

/** Ctrl / Cmd / Shift-клік відкриває мову в новій вкладці чи вікні — ця сторінка лишається як є. */
function isPlainClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function LanguageSwitcher({ tone = 'dark', className }: LanguageSwitcherProps) {
  const t = useTranslations('languageSwitcher');
  const currentLocale = useLocale();
  // Шлях без мовного префікса: з /pl/privacy перемикаємось на /uk/privacy, а не на головну.
  const pathname = usePathname();
  // Пігулка стоїть під активною мовою, а після кліку одразу їде до вибраної: сторінки іншої мови
  // next-intl не завантажує наперед, і без цього клік на повільному інтернеті здавався б «мертвим».
  // Скидати стан не треба: зі зміною мови layout монтується заново.
  const [selectedLocale, setSelectedLocale] = useState<Locale>(currentLocale);
  const pillIndex = routing.locales.indexOf(selectedLocale);

  return (
    <nav aria-label={t('label')} className={className}>
      <div className={cn(styles.switcher, styles[tone])} style={{ '--pill-index': pillIndex }}>
        <span className={styles.pill} aria-hidden="true" />
        <ul role="list" className={styles.list}>
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
                  className={cn(styles.link, locale === selectedLocale && styles.selected)}
                  onClick={(event) => {
                    if (isPlainClick(event)) setSelectedLocale(locale);
                  }}
                >
                  {/* Видимий код — теж у назві посилання: голосове керування шукає посилання за написом
                      («натисни PL», WCAG 2.5.3). Після коду скрінрідер читає повну назву мови */}
                  {LOCALE_LABELS[locale]}
                  <span className="visually-hidden">{`, ${LOCALE_NAMES[locale]}`}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
