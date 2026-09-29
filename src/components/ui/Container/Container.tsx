import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Обмежує ширину контенту й дає бокові відступи з макета: 20 / 32 / 80 px. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}
