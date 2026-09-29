import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { NavList } from '@/components/layout/NavList';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { SECTION_IDS } from '@/lib/constants';
import { getSectionHref } from '@/lib/getSectionHref';
import styles from './Header.module.css';

/**
 * 375: лого + бургер. 768: + кнопка «Обговорити проєкт».
 * 1440: меню, перемикач мов і кнопка; бургер ховається.
 */
export function Header() {
  const t = useTranslations();

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo />

        <nav aria-label={t('nav.label')} className={styles.desktopNav}>
          <NavList className={styles.navList} linkClassName={styles.navLink} />
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher className={styles.languageSwitcher} />
          {/* Обгортка керує видимістю: display на самій кнопці конфліктував би з її CSS-модулем */}
          <div className={styles.cta}>
            <Button href={getSectionHref(SECTION_IDS.contacts)} variant="dark">
              {t('common.discussProject')}
            </Button>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
