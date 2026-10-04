import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SERVICES } from '@/data/services';
import { SECTION_IDS } from '@/lib/constants';
import { bindShortWords } from '@/lib/typography';
import { DiscussServiceLink } from './DiscussServiceLink';
import styles from './Services.module.css';

// Порядок колонок таблиці (з 1280). Ключі збігаються з services.columns.* у перекладах.
const SERVICE_COLUMNS = ['service', 'includes', 'duration', 'price'] as const;

/** Послуги з термінами й цінами: до десктопа — список, з 1280 — таблиця. Макет: *-services. */
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
              <dl className={styles.terms}>
                <div className={styles.duration}>
                  <dt className="visually-hidden">{t('columns.duration')}</dt>
                  <dd>{service.duration[locale]}</dd>
                </div>
                <div className={styles.price}>
                  <dt className="visually-hidden">{t('columns.price')}</dt>
                  <dd>{service.price[locale]}</dd>
                </div>
              </dl>
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
