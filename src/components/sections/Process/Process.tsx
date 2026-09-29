import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SECTION_IDS } from '@/lib/constants';
import styles from './Process.module.css';

// Порядок кроків. Ключі збігаються з process.steps.* у перекладах.
const PROCESS_STEPS = ['talk', 'structure', 'build', 'launch', 'support'] as const;

// Заглушка. Макет: m-process / t-process / d-process.
export function Process() {
  const t = useTranslations('process');

  return (
    <section id={SECTION_IDS.process} className={styles.section}>
      <Container>
        <h2>{t('title')}</h2>
        <ol className={styles.steps}>
          {PROCESS_STEPS.map((step) => (
            <li key={step}>{t(`steps.${step}.title`)}</li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
