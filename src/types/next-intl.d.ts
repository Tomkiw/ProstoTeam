import type { routing } from '@/i18n/routing';
import type messages from '../../messages/en.json';

// Типізує next-intl: Locale стає 'en' | 'pl' | 'uk', а ключі перекладів перевіряються за en.json.
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
