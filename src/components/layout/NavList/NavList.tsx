import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { NAV_SECTIONS } from '@/lib/constants';
import { getSectionHref } from '@/lib/getSectionHref';

type NavListProps = {
  className?: string;
  linkClassName?: string;
  /** Напр. закрити мобільне меню після кліку. */
  onNavigate?: () => void;
};

/** Спільний список пунктів меню для header, мобільного меню й footer. Стилі передає батько. */
export function NavList({ className, linkClassName, onNavigate }: NavListProps) {
  const t = useTranslations('nav');

  return (
    <ul className={className}>
      {NAV_SECTIONS.map((section) => (
        <li key={section}>
          <Link href={getSectionHref(section)} className={linkClassName} onClick={onNavigate}>
            {t(section)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
