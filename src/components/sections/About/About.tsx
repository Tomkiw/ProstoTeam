import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TEAM } from '@/data/team';
import { SECTION_IDS } from '@/lib/constants';
import styles from './About.module.css';
import { TeamCard } from './TeamCard';

// Порядок переваг. Ключі збігаються з about.features.* у перекладах.
const ABOUT_FEATURES = ['noJargon', 'handover'] as const;

/**
 * Про команду. Порядок у DOM — мобільний (заголовок, лід, картки, переваги);
 * на 1440 grid ставить переваги в ліву колонку під лід, а картки — праворуч.
 */
export function About() {
  const t = useTranslations('about');

  return (
    <section id={SECTION_IDS.about} className={styles.section}>
      <Container className={styles.layout}>
        <SectionTitle className={styles.title}>{t('title')}</SectionTitle>
        <p className={styles.lead}>{t('lead')}</p>

        {TEAM.length > 0 && (
          <ul role="list" className={styles.team}>
            {TEAM.map((member) => (
              <li key={member.id}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        )}

        <ul role="list" className={styles.features}>
          {ABOUT_FEATURES.map((feature) => (
            <li key={feature} className={styles.feature}>
              <h3 className={styles.featureTitle}>{t(`features.${feature}.title`)}</h3>
              <p className={styles.featureText}>{t(`features.${feature}.text`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
