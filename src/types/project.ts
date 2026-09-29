import type { LocalizedString } from './i18n';

/** Від типу залежать бейдж на картці й текст посилання («Відкрити сайт» / «Відкрити бота»). */
export type ProjectKind = 'website' | 'webapp' | 'shop' | 'telegramBot';

export type ProjectTag = {
  id: string;
  label: LocalizedString;
};

export type Project = {
  /** Унікальний і незмінний — використовується як key. */
  id: string;
  title: string;
  url: string;
  /** Адреса в «рядку браузера» над скріншотом, без https://. */
  displayUrl: string;
  kind: ProjectKind;
  description: LocalizedString;
  tags?: ProjectTag[];
  isInDevelopment?: boolean;
  stack?: string[];
  /** Шлях від /public, напр. '/images/projects/mindterms.png'. Поки нема — картка показує заглушку. */
  screenshot?: string;
};
