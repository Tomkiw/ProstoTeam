import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { CONTACTS } from '@/data/contacts';
import { SECTION_IDS } from '@/lib/constants';
import { ContactForm } from './ContactForm';
import styles from './Contacts.module.css';

// Заглушка. Макет: m-contacts / t-contacts / d-contacts (темний фон переходить у footer).
export function Contacts() {
  const t = useTranslations('contacts');

  return (
    <section id={SECTION_IDS.contacts} className={styles.section}>
      <Container>
        <h2>{t('title')}</h2>
        <p>{t('responseTime')}</p>
        <ul className={styles.channels}>
          {CONTACTS.map((contact) => (
            <li key={contact.channel}>
              {t(`channels.${contact.channel}`)}: <a href={contact.href}>{contact.value}</a>
            </li>
          ))}
        </ul>
        <ContactForm />
      </Container>
    </section>
  );
}
