'use client';

import { Link } from '@/i18n/navigation';
import { SECTION_IDS, SERVICE_SELECT_EVENT } from '@/lib/constants';
import { getSectionHref } from '@/lib/getSectionHref';
import styles from './DiscussServiceLink.module.css';

type DiscussServiceLinkProps = {
  serviceId: string;
  /** Тексти — готові з сервера: так у браузер не йде розділ перекладів services. */
  label: string;
  serviceTitle: string;
};

/**
 * «Обговорити →» у рядку послуги: веде до форми заявки й одразу вибирає там цю послугу.
 * Без JS — просто посилання на форму.
 */
export function DiscussServiceLink({ serviceId, label, serviceTitle }: DiscussServiceLinkProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent(SERVICE_SELECT_EVENT, { detail: serviceId }));
  };

  return (
    <Link href={getSectionHref(SECTION_IDS.contacts)} className={styles.link} onClick={handleClick}>
      {label}
      {/* Шість однакових «Обговорити» скрінрідеру не розрізнити — додаємо назву послуги */}
      <span className="visually-hidden">{`: ${serviceTitle}`}</span>
      <svg
        className={styles.icon}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </Link>
  );
}
