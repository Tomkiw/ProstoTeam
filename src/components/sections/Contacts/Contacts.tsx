import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { CONTACTS } from '@/data/contacts';
import { SERVICES } from '@/data/services';
import { SECTION_IDS } from '@/lib/constants';
import { DEFAULT_PHONE_COUNTRY, getPhoneCountryOptions } from '@/lib/phone';
import { ContactForm } from './ContactForm';
import styles from './Contacts.module.css';

/** Контакти й форма заявки; темний фон продовжується у footer. Макет: *-contacts. */
export function Contacts() {
  const t = useTranslations('contacts');
  const tForm = useTranslations('contactForm');
  const locale = useLocale();
  const serviceOptions = SERVICES.map((service) => ({
    value: service.id,
    label: service.title[locale],
  }));

  return (
    <section id={SECTION_IDS.contacts} className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <SectionTitle size="lg" className={styles.title}>
            {t('title')}
          </SectionTitle>
          <p className={styles.responseTime}>{t('responseTime')}</p>
          <ul role="list" className={styles.channels}>
            {CONTACTS.map((contact) => (
              <li key={contact.channel} className={styles.channel}>
                <span className={styles.channelLabel}>{t(`channels.${contact.channel}`)}</span>
                <a href={contact.href} className={styles.channelLink}>
                  {contact.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.form}>
          <ContactForm
            serviceOptions={serviceOptions}
            phoneCountries={getPhoneCountryOptions(locale, tForm('otherCountry'))}
            defaultPhoneCountry={DEFAULT_PHONE_COUNTRY[locale]}
          />
        </div>
      </Container>
    </section>
  );
}
