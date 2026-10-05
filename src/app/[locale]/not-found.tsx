import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import styles from './not-found.module.css';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.text}>{t('text')}</p>
        <div className={styles.actions}>
          <Button href="/" size="lg">
            {t('backHome')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
