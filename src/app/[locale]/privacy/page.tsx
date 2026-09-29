import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { initRequestLocale } from '@/i18n/initRequestLocale';
import type { LocaleParams } from '@/types/i18n';
import styles from './page.module.css';

type PrivacyPageProps = {
  params: LocaleParams;
};

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const locale = await initRequestLocale(params);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return { title: t('title') };
}

// Заглушка: текст політики додамо, коли визначимося, куди відправляється форма і які дані зберігаємо.
export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const locale = await initRequestLocale(params);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <h1>{t('title')}</h1>
        <p>{t('stub')}</p>
      </Container>
    </section>
  );
}
