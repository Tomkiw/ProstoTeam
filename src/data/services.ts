import type { Service } from '@/types/service';

export const SERVICES: Service[] = [
  {
    id: 'landing',
    title: { en: 'Landing page', pl: 'Landing page', uk: 'Лендинг' },
    description: {
      en: 'A single page that explains what you offer and collects leads.',
      pl: 'Jedna strona, która wyjaśnia, co oferujesz, i zbiera zgłoszenia.',
      uk: 'Одна сторінка, яка пояснює, що ви пропонуєте, і збирає заявки.',
    },
  },
  {
    id: 'business-site',
    title: { en: 'Business website', pl: 'Strona firmowa', uk: 'Корпоративний сайт' },
    description: {
      en: 'A few pages about your company, services and contacts. Multilingual if needed.',
      pl: 'Kilka podstron o firmie, usługach i kontakcie. Może być w kilku językach.',
      uk: 'Кілька сторінок про компанію, послуги й контакти. Можна кількома мовами.',
    },
  },
  {
    id: 'shop',
    title: { en: 'Online store', pl: 'Sklep internetowy', uk: 'Інтернет-магазин' },
    description: {
      en: 'Catalogue, cart, online payments and order notifications.',
      pl: 'Katalog, koszyk, płatności online i powiadomienia o zamówieniach.',
      uk: 'Каталог, кошик, онлайн-оплата й сповіщення про замовлення.',
    },
  },
  {
    id: 'web-app',
    title: { en: 'Web application', pl: 'Aplikacja webowa', uk: 'Вебзастосунок' },
    description: {
      en: 'User accounts, sign-up and working with data.',
      pl: 'Panel użytkownika, rejestracja i praca z danymi.',
      uk: 'Особистий кабінет, реєстрація, робота з даними.',
    },
  },
  {
    id: 'telegram-bot',
    title: { en: 'Telegram bot', pl: 'Bot Telegram', uk: 'Telegram-бот' },
    description: {
      en: 'Leads, bookings, a catalogue or newsletters right in Telegram.',
      pl: 'Zgłoszenia, zapisy na usługi, katalog lub newslettery w Telegramie.',
      uk: 'Заявки, запис на послуги, каталог чи розсилки в Telegram.',
    },
  },
  {
    id: 'support',
    title: { en: 'Support', pl: 'Wsparcie', uk: 'Підтримка' },
    description: {
      en: 'Updates, fixes and new sections after launch.',
      pl: 'Aktualizacje, poprawki i nowe sekcje po uruchomieniu.',
      uk: 'Оновлення, виправлення й нові розділи після запуску.',
    },
  },
];
