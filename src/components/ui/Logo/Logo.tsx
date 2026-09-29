import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { SECTION_IDS } from '@/lib/constants';
import { getSectionHref } from '@/lib/getSectionHref';
import styles from './Logo.module.css';

type LogoTone = 'dark' | 'light';

type LogoProps = {
  /** dark — на світлому фоні, light — на темному (мобільне меню, footer). */
  tone?: LogoTone;
  className?: string;
  onClick?: () => void;
};

/** «pr●st●»: кружечки замість «о» — синій і помаранчевий. Розмір задається font-size. */
export function Logo({ tone = 'dark', className, onClick }: LogoProps) {
  const t = useTranslations('common');

  return (
    <Link
      href={getSectionHref(SECTION_IDS.hero)}
      aria-label={t('homeLabel')}
      className={cn(styles.logo, styles[tone], className)}
      onClick={onClick}
    >
      <span>pr</span>
      <span className={cn(styles.dot, styles.dotPrimary)} />
      <span>st</span>
      <span className={cn(styles.dot, styles.dotAccent)} />
    </Link>
  );
}
