'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import styles from './error.module.css';

type ErrorPageProps = {
  /** Людині не показуємо: у продакшні там службовий текст, а помилку з сервера видно в логах за error.digest. */
  error: Error & { digest?: string };
  /** Заново запитує й рендерить сторінку. У Next 16.3 замінив reset. */
  retry: () => void;
};

/**
 * Збій під час рендеру сторінки. Header і footer лишаються на місці (цю межу помилок огортає layout),
 * а замість вмісту — пояснення, «Спробувати ще раз» і шлях на головну. Error boundary — лише клієнтський компонент.
 */
export default function ErrorPage({ retry }: ErrorPageProps) {
  const t = useTranslations('errorPage');

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.text}>{t('text')}</p>
        <div className={styles.actions}>
          <Button size="lg" onClick={retry}>
            {t('retry')}
          </Button>
          <Button href="/" variant="outline" size="lg">
            {t('backHome')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
