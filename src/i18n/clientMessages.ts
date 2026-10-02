import type { Messages } from 'next-intl';

/**
 * Переклади, які потрібні в браузері — лише для клієнтських компонентів: мобільне меню
 * (з лого, пунктами меню й перемикачем мов), форма заявки й сторінка помилки.
 * Решту тексту сервер уже вставив у HTML, тож політику, описи послуг і SEO-тексти в браузер не веземо.
 *
 * Додаєте useTranslations у клієнтський компонент ('use client' або все, що він рендерить) —
 * додайте сюди його розділ, інакше в браузері замість тексту буде ключ.
 */
export function pickClientMessages(messages: Messages) {
  const { common, nav, header, languageSwitcher, contacts, contactForm, errorPage } = messages;

  return { common, nav, header, languageSwitcher, contacts, contactForm, errorPage };
}
