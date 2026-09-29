import { useTranslations } from 'next-intl';
import styles from './ContactForm.module.css';

// Заглушка. Підписи й плейсхолдери полів — contactForm.* у перекладах, опції select — SERVICES з '@/data/services'.
// Куди відправляти заявку, ще не вирішено (можливо Telegram-бот) — тоді й з'явиться 'use client' та обробник.
export function ContactForm() {
  const t = useTranslations('contactForm');

  return (
    <div className={styles.card}>
      <h3>{t('title')}</h3>
    </div>
  );
}
