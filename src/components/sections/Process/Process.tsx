import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SECTION_IDS } from '@/lib/constants';
import styles from './Process.module.css';

// Порядок кроків. Ключі збігаються з process.steps.* у перекладах.
const PROCESS_STEPS = ['talk', 'structure', 'build', 'launch', 'support'] as const;

/** Етапи роботи: до 1440 — список з номерами, на 1440 — п'ять колонок. Макет: *-process. */
export function Process() {
  const t = useTranslations('process');

  return (
    <section id={SECTION_IDS.process} className={styles.section}>
      <Container>
        <SectionTitle>{t('title')}</SectionTitle>
        <ol role="list" className={styles.steps}>
          {PROCESS_STEPS.map((step, index) => (
            <li key={step} className={styles.step}>
              <span className={styles.number}>{index + 1}</span>
              <h3 className={styles.title}>{t(`steps.${step}.title`)}</h3>
              <p className={styles.text}>{t(`steps.${step}.text`)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
