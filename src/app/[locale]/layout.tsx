import type { Metadata } from 'next';
import { Manrope, Unbounded } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { pickClientMessages } from '@/i18n/clientMessages';
import { initRequestLocale } from '@/i18n/initRequestLocale';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { MAIN_CONTENT_ID } from '@/lib/constants';
import { TITLE_TEMPLATE } from '@/lib/metadata';
import { getSiteUrl, isIndexingAllowed } from '@/lib/site';
import type { LocaleParams } from '@/types/i18n';
import '../globals.css';

// Без preload: next/font і так описує всі набори символів (латиниця, польські ą ę ł ż, кирилиця),
// а браузер вантажить лише ті, що є на сторінці. З preload кожна мова тягнула б наперед усі —
// /pl вантажив би кирилицю, а /uk польські літери (разом ~250 KB шрифтів на сторінку).
const manrope = Manrope({
  variable: '--font-manrope',
  display: 'swap',
  preload: false,
});

const unbounded = Unbounded({
  variable: '--font-unbounded',
  display: 'swap',
  preload: false,
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: LocaleParams;
};

type LocaleMetadataProps = {
  params: LocaleParams;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleMetadataProps): Promise<Metadata> {
  const locale = await initRequestLocale(params);
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: getSiteUrl(),
    title: { default: t('title'), template: TITLE_TEMPLATE },
    description: t('description'),
    twitter: { card: 'summary_large_image' },
    // Поки нема власного домену, сайт закритий від пошуку (див. lib/site.ts)
    robots: isIndexingAllowed() ? undefined : { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = await initRequestLocale(params);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={cn(manrope.variable, unbounded.variable)}
      // Next вимикає плавну прокрутку з globals.css на час переходу між сторінками
      data-scroll-behavior="smooth"
    >
      <body>
        {/* Без messages провайдер віддав би в браузер усі переклади сайту */}
        <NextIntlClientProvider messages={pickClientMessages(messages)}>
          <SkipLink />
          <Header />
          <main id={MAIN_CONTENT_ID}>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
