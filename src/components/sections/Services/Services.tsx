import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SERVICES } from '@/data/services';
import { SECTION_IDS } from '@/lib/constants';
import styles from './Services.module.css';

// Заглушка. Макет: m-services / t-services / d-services (на 1440 — таблиця з колонками services.columns.*).
export function Services() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <section id={SECTION_IDS.services} className={styles.section}>
      <Container>
        <h2>{t('title')}</h2>
        <ul className={styles.list}>
          {SERVICES.map((service) => (
            <li key={service.id}>{service.title[locale]}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
