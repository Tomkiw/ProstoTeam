'use client';

import type { ComponentProps, FocusEvent, PointerEvent, ReactNode } from 'react';
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
  /** Недоступна, але, на відміну від disabled, лишається у фокусі — напр. поки надсилається форма. */
  'aria-disabled'?: boolean;
};

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

// Коло заливки росте з точки, де курсор увійшов у кнопку, і стискається туди, де вийшов.
function setFillOrigin(event: PointerEvent<HTMLElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty('--fill-x', `${event.clientX - rect.left}px`);
  target.style.setProperty('--fill-y', `${event.clientY - rect.top}px`);
}

// З клавіатури курсора немає — коло росте з центру (значення за замовчуванням у CSS).
function resetFillOrigin(event: FocusEvent<HTMLElement>) {
  if (!event.currentTarget.matches(':focus-visible')) return;
  event.currentTarget.style.removeProperty('--fill-x');
  event.currentTarget.style.removeProperty('--fill-y');
}

const FILL_HANDLERS = {
  onPointerEnter: setFillOrigin,
  onPointerLeave: setFillOrigin,
  onFocus: resetFillOrigin,
};

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
      <Link href={props.href} className={classes} onClick={onClick} {...FILL_HANDLERS}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      disabled={props.disabled}
      aria-disabled={props['aria-disabled']}
      className={classes}
      onClick={onClick}
      {...FILL_HANDLERS}
    >
      {children}
    </button>
  );
}
