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
 * Закріплений угорі, після прокрутки стає нижчим — лише CSS, див. Header.module.css.
 * 375: лого, «Написати» і бургер. 768: кнопка стає «Обговорити проєкт».
 * З 1024: меню, перемикач мов і кнопка; бургер ховається.
 * id="top" тут нема навмисно: на #top браузер і Next самі прокручують на початок сторінки,
 * а якір на закріпленому header не прокрутив би нікуди — header і так на екрані.
 */
export function Header() {
  const t = useTranslations();

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo />

        <nav aria-label={t('nav.label')} className={styles.desktopNav}>
          <NavList className={styles.navList} />
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher className={styles.languageSwitcher} />
          <Button href={getSectionHref(SECTION_IDS.contacts)} variant="dark">
            <span className={styles.ctaShort}>{t('header.ctaShort')}</span>
            <span className={styles.ctaFull}>{t('common.discussProject')}</span>
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
