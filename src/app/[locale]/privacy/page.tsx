import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { CONTACTS } from '@/data/contacts';
import { initRequestLocale } from '@/i18n/initRequestLocale';
import { getPageMetadata } from '@/lib/metadata';
import type { LocaleParams } from '@/types/i18n';
import styles from './page.module.css';

type PrivacyPageProps = {
  params: LocaleParams;
};

// Порядок розділів. Ключі збігаються з privacy.sections.* у перекладах.
const PRIVACY_SECTIONS = [
  'controller',
  'data',
  'purpose',
  'recipients',
  'retention',
  'rights',
  'cookies',
  'changes',
] as const;

// Права за GDPR у порядку статей 15–21 і право на скаргу. Ключі — privacy.rightsList.*
const PRIVACY_RIGHTS = [
  'access',
  'rectification',
  'erasure',
  'restriction',
  'portability',
  'objection',
  'complaint',
] as const;

// Пошта для питань щодо даних — та сама, що в контактах сайту
const EMAIL_CONTACT = CONTACTS.find((contact) => contact.channel === 'email');

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const locale = await initRequestLocale(params);
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const metadata = await getPageMetadata({ locale, href: '/privacy', title: t('title') });

  // Юридична сторінка: у пошуку вона не потрібна
  return { ...metadata, robots: { index: false, follow: true } };
}

/** Політика конфіденційності: що збирає форма заявки, навіщо, кому передається і які права має людина. */
export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const locale = await initRequestLocale(params);
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t('title')}</h1>
            <p className={styles.updated}>{t('updated')}</p>
          </header>
          <p className={styles.lead}>{t('intro')}</p>

          {PRIVACY_SECTIONS.map((section) => (
            <section key={section} className={styles.block}>
              <h2 className={styles.heading}>{t(`sections.${section}.title`)}</h2>
              <p className={styles.text}>
                {t.rich(`sections.${section}.text`, {
                  address: EMAIL_CONTACT?.value ?? '',
                  email: (chunks) =>
                    EMAIL_CONTACT ? <a href={EMAIL_CONTACT.href}>{chunks}</a> : chunks,
                })}
              </p>
              {section === 'rights' && (
                <>
                  <ul className={styles.list}>
                    {PRIVACY_RIGHTS.map((right) => (
                      <li key={right}>{t(`rightsList.${right}`)}</li>
                    ))}
                  </ul>
                  <p className={styles.text}>{t('sections.rights.outro')}</p>
                </>
              )}
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
