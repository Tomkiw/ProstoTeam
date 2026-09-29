import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SECTION_IDS } from '@/lib/constants';
import styles from './Hero.module.css';

// Заглушка. Макет: m-hero / t-hero / d-hero. Команда для «кружечків» — TEAM з '@/data/team'.
export function Hero() {
  const t = useTranslations('hero');

  return (
    <section id={SECTION_IDS.hero} className={styles.hero}>
      <Container>
        <h1>{t('title')}</h1>
      </Container>
    </section>
  );
}
