'use client';

import { useEffect } from 'react';
import { SECTION_IDS } from '@/lib/constants';

/** Ctrl / Cmd / Shift-клік відкриває посилання в новій вкладці чи вікні — прокручувати тут нічого не треба. */
function isPlainClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

/** Посилання веде на той самий якір, що вже стоїть в адресі: /uk#contacts → /uk#contacts. */
function isCurrentHashLink(link: HTMLAnchorElement) {
  const url = new URL(link.href);

  return (
    url.hash !== '' &&
    url.origin === location.origin &&
    url.pathname === location.pathname &&
    url.search === location.search &&
    url.hash === location.hash
  );
}

/**
 * Next.js не прокручує, якщо клікнути посилання на якір, що вже стоїть в адресі: вдруге «Обговорити»,
 * «Контакти» в меню чи лого — і нічого не відбувається. Без Next браузер прокрутив би знову,
 * тож повертаємо цю поведінку одним слухачем для всіх посилань сайту.
 * Плавність і відступ під закріплений header дають scroll-behavior і scroll-padding-top з globals.css.
 */
export function SameHashScroll() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!isPlainClick(event) || !(event.target instanceof Element)) return;

      const link = event.target.closest('a[href]');
      if (!(link instanceof HTMLAnchorElement) || link.target === '_blank') return;
      if (!isCurrentHashLink(link)) return;

      const id = decodeURIComponent(link.hash.slice(1));

      // На #top елемента нема навмисно (див. SECTION_IDS) — це початок сторінки
      if (id === SECTION_IDS.top) {
        window.scrollTo({ top: 0 });
      } else {
        document.getElementById(id)?.scrollIntoView();
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
