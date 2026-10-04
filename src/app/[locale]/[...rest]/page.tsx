import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { initRequestLocale } from '@/i18n/initRequestLocale';
import type { LocaleParams } from '@/types/i18n';

type CatchAllPageProps = {
  params: LocaleParams;
};

// not-found.tsx не підтримує metadata, тож назву вкладки для 404 задаємо тут — на сторінці, що її викликає
export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata> {
  const locale = await initRequestLocale(params);
  const t = await getTranslations({ locale, namespace: 'notFound' });

  return { title: t('title') };
}

// Ловить невідомі адреси (/en/abc), щоб показати нашу локалізовану 404 з header і footer,
// а не стандартну англомовну сторінку Next.js.
export default function CatchAllPage() {
  notFound();
}
