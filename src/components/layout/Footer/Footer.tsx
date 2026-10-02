import { useTranslations } from 'next-intl';
import { NavList } from '@/components/layout/NavList';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Link } from '@/i18n/navigation';
import { BRAND_NAME } from '@/lib/constants';
import styles from './Footer.module.css';

export function Footer() {
  const t = useTranslations('nav');
  const tPrivacy = useTranslations('privacy');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <Logo tone="light" className={styles.logo} />
          <nav aria-label={t('footerLabel')} className={styles.nav}>
            <NavList className={styles.navList} linkClassName={styles.navLink} />
          </nav>
          {/* Політика конфіденційності має бути доступна з будь-якої сторінки (RODO) */}
          <div className={styles.legal}>
            <p>
              © {year} {BRAND_NAME}
            </p>
            <Link href="/privacy" className={styles.legalLink}>
              {tPrivacy('title')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
