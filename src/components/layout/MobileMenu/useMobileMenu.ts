import { useEffect, useRef, useState } from 'react';
import { DESKTOP_MEDIA_QUERY } from '@/lib/constants';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Tab і Shift+Tab ходять по колу всередині контейнера й не виходять на сторінку під меню. */
function keepFocusInside(event: KeyboardEvent, container: HTMLElement) {
  const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const isFocusOutside = !container.contains(document.activeElement);

  if (event.shiftKey && (document.activeElement === first || isFocusOutside)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (document.activeElement === last || isFocusOutside)) {
    event.preventDefault();
    first.focus();
  }
}

/** Стан і поведінка повноекранного мобільного меню. */
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // Поки меню відкрите: фокус усередині, сторінка під ним не прокручується, Escape закриває.
  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    const openButton = openButtonRef.current;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      } else if (event.key === 'Tab' && panel) {
        keepFocusInside(event, panel);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      // preventScroll: після кліку на якір сторінка не повинна стрибати назад до бургера.
      openButton?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  // На десктопі бургер ховається, тож відкрите меню лишилося б без кнопки закриття.
  useEffect(() => {
    if (!isOpen) return;

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isOpen]);

  return { isOpen, open, close, panelRef, openButtonRef, closeButtonRef };
}
