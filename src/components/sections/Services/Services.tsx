import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SERVICES } from '@/data/services';
import { SECTION_IDS } from '@/lib/constants';
import { bindShortWords } from '@/lib/typography';
import { DiscussServiceLink } from './DiscussServiceLink';
import styles from './Services.module.css';

// Порядок колонок таблиці (з 1280). Ключі збігаються з services.columns.* у перекладах.
const SERVICE_COLUMNS = ['service', 'includes'] as const;

/**
 * Послуги: до десктопа — список, з 1280 — таблиця. Макет: *-services.
 * Колонок «Термін» і «Ціна» з макета нема, доки ціни не визначені (TODO.md).
 */
export function Services() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <section id={SECTION_IDS.services} className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <SectionTitle>{t('title')}</SectionTitle>
          <p className={styles.note}>{t('note')}</p>
        </div>

        {/* Підписи колонок видно лише з 1280; скрінрідер читає підписи з <dt> у рядках */}
        <div className={styles.head} aria-hidden="true">
          {SERVICE_COLUMNS.map((column) => (
            <span key={column}>{t(`columns.${column}`)}</span>
          ))}
        </div>

        <ul role="list" className={styles.list}>
          {SERVICES.map((service) => (
            <li key={service.id} className={styles.row}>
              <h3 className={styles.name}>{service.title[locale]}</h3>
              <p className={styles.description}>{bindShortWords(service.description[locale])}</p>
              <div className={styles.discuss}>
                <DiscussServiceLink
                  serviceId={service.id}
                  label={t('discuss')}
                  serviceTitle={service.title[locale]}
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
