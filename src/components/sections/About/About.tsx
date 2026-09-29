import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { TEAM } from '@/data/team';
import { SECTION_IDS } from '@/lib/constants';
import styles from './About.module.css';

// Заглушка. Макет: m-about / t-about / d-about. Переваги — about.features.* у перекладах.
export function About() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section id={SECTION_IDS.about} className={styles.section}>
      <Container>
        <h2>{t('title')}</h2>
        <ul className={styles.team}>
          {TEAM.map((member) => (
            <li key={member.id}>
              {member.name[locale]} — {member.role[locale]}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
