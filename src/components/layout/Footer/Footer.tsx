import { useTranslations } from 'next-intl';
import { NavList } from '@/components/layout/NavList';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { BRAND_NAME } from '@/lib/constants';
import styles from './Footer.module.css';

export function Footer() {
  const t = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <Logo tone="light" className={styles.logo} />
          <nav aria-label={t('footerLabel')}>
            <NavList className={styles.navList} linkClassName={styles.navLink} />
          </nav>
          <p className={styles.copyright}>
            © {year} {BRAND_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
}
