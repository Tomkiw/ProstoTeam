import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'outline' | 'dark';
type ButtonSize = 'md' | 'lg';

type BaseButtonProps = {
  children: ReactNode;
  /** primary — помаранчева, outline — з рамкою, dark — темна (CTA в header). */
  variant?: ButtonVariant;
  /** md — кнопка в header, lg — у hero, формі, мобільному меню. */
  size?: ButtonSize;
  isFullWidth?: boolean;
  className?: string;
  onClick?: () => void;
};

type ButtonAsLinkProps = BaseButtonProps & {
  href: ComponentProps<typeof Link>['href'];
};

type ButtonAsButtonProps = BaseButtonProps & {
  href?: never;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

/** З `href` рендериться посиланням (з урахуванням мови), без — звичайною кнопкою. */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    isFullWidth = false,
    className,
    onClick,
  } = props;
  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    isFullWidth && styles.fullWidth,
    className,
  );

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      disabled={props.disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
