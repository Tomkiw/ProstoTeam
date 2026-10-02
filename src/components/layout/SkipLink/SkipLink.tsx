import { useTranslations } from 'next-intl';
import { MAIN_CONTENT_ID } from '@/lib/constants';
import styles from './SkipLink.module.css';

/**
 * Перше посилання на сторінці: з клавіатури одразу до вмісту, повз лого, меню й перемикач мов.
 * Звичайний <a>, а не Link: це перехід усередині сторінки, роутер тут не потрібен.
 */
export function SkipLink() {
  const t = useTranslations('common');

  return (
    <a href={`#${MAIN_CONTENT_ID}`} className={styles.link}>
      {t('skipToContent')}
    </a>
  );
}
