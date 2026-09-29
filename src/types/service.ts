import type { LocalizedString } from './i18n';

export type Service = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  duration: LocalizedString;
  /** Готовий рядок разом з валютою — для кожної мови може бути своя (PLN, UAH, EUR). */
  price: LocalizedString;
};
