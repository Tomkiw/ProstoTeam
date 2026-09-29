'use client';

import { useTranslations } from 'next-intl';
import { useId } from 'react';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { NavList } from '@/components/layout/NavList';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { CONTACTS } from '@/data/contacts';
import { SECTION_IDS } from '@/lib/constants';
import { getSectionHref } from '@/lib/getSectionHref';
import type { ContactChannel } from '@/types/contact';
import styles from './MobileMenu.module.css';
import { useMobileMenu } from './useMobileMenu';

// У макеті в меню лише Telegram і пошта; телефон — у секції контактів.
const MENU_CONTACT_CHANNELS: ContactChannel[] = ['telegram', 'email'];
const MENU_CONTACTS = CONTACTS.filter((contact) => MENU_CONTACT_CHANNELS.includes(contact.channel));

/** Бургер і повноекранне меню для 375 / 768. На 1440 ховається — там меню в header. */
export function MobileMenu() {
  const t = useTranslations();
  const panelId = useId();
  const {
    isOpen,
    open: handleOpen,
    close: handleClose,
    panelRef,
    openButtonRef,
    closeButtonRef,
  } = useMobileMenu();

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

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.label')}
        className={styles.panel}
        hidden={!isOpen}
      >
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
            variant="stacked"
            linkClassName={styles.navLink}
            className={styles.navList}
            onNavigate={handleClose}
          />
        </nav>

        <div className={styles.bottom}>
          <LanguageSwitcher />

          <div className={styles.bottomRow}>
            {/* Обгортка: на 375 розтягує кнопку на всю ширину, на 768 — повертає природну */}
            <div className={styles.cta}>
              <Button href={getSectionHref(SECTION_IDS.contacts)} size="lg" onClick={handleClose}>
                {t('common.discussProject')}
              </Button>
            </div>

            {MENU_CONTACTS.length > 0 && (
              <ul className={styles.contacts}>
                {MENU_CONTACTS.map((contact) => (
                  <li key={contact.channel} className={styles.contact}>
                    <span className={styles.contactLabel}>
                      {t(`contacts.channels.${contact.channel}`)}
                    </span>
                    <a href={contact.href} className={styles.contactLink}>
                      {contact.value}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
