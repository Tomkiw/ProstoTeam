import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import styles from './not-found.module.css';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <h1>{t('title')}</h1>
        <p>{t('text')}</p>
        <Button href="/" size="lg">
          {t('backHome')}
        </Button>
      </Container>
    </section>
  );
}
