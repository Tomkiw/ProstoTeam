import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './SectionTitle.module.css';

type SectionTitleSize = 'md' | 'lg';

type SectionTitleProps = {
  children: ReactNode;
  /** md — більшість секцій (44px на 1440), lg — контакти (52px на 1440). */
  size?: SectionTitleSize;
  className?: string;
};

/** Заголовок секції (h2) за макетом: 26 / 36 / 44px. Колір успадковує від секції. */
export function SectionTitle({ children, size = 'md', className }: SectionTitleProps) {
  return <h2 className={cn(styles.title, styles[size], className)}>{children}</h2>;
}
