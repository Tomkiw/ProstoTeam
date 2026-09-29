'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { NavList } from '@/components/layout/NavList';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { SECTION_IDS } from '@/lib/constants';
import { getSectionHref } from '@/lib/getSectionHref';
import styles from './MobileMenu.module.css';

/** Бургер і повноекранне меню для 375 / 768. На 1440 ховається — там меню в header. */
export function MobileMenu() {
  const t = useTranslations();
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const openButton = openButtonRef.current;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      // preventScroll: після кліку на якір сторінка не повинна стрибати назад до бургера.
      openButton?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <div className={styles.root}>
      <button
        ref={openButtonRef}
        type="button"
        className={styles.toggle}
        aria-label={t('header.openMenu')}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleOpen}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 7h14M3 13h14" />
        </svg>
      </button>

      <div id={panelId} className={styles.panel} hidden={!isOpen}>
        <div className={styles.top}>
          <Logo tone="light" onClick={handleClose} />
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            aria-label={t('header.closeMenu')}
            onClick={handleClose}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        <nav aria-label={t('nav.label')}>
          <NavList
            linkClassName={styles.navLink}
            className={styles.navList}
            onNavigate={handleClose}
          />
        </nav>

        <div className={styles.bottom}>
          <LanguageSwitcher />
          <Button
            href={getSectionHref(SECTION_IDS.contacts)}
            size="lg"
            isFullWidth
            onClick={handleClose}
          >
            {t('common.discussProject')}
          </Button>
        </div>
      </div>
    </div>
  );
}
