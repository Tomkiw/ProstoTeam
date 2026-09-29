import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { NAV_SECTIONS } from '@/lib/constants';
import { getSectionHref } from '@/lib/getSectionHref';
import styles from './NavList.module.css';

type NavListVariant = 'inline' | 'stacked';

type NavListProps = {
  /** inline — рядок (header, footer), stacked — великий список мобільного меню. */
  variant?: NavListVariant;
  className?: string;
  linkClassName?: string;
  /** Напр. закрити мобільне меню після кліку. */
  onNavigate?: () => void;
};

/** Спільний список пунктів меню для header, мобільного меню й footer. Розкладку передає батько. */
export function NavList({
  variant = 'inline',
  className,
  linkClassName,
  onNavigate,
}: NavListProps) {
  const t = useTranslations('nav');

  return (
    <ul className={cn(styles[variant], className)}>
      {NAV_SECTIONS.map((section) => (
        <li key={section}>
          <Link
            href={getSectionHref(section)}
            className={cn(styles.link, linkClassName)}
            onClick={onNavigate}
          >
            <span className={styles.label}>{t(section)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
