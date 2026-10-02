export const BRAND_NAME = 'PROSTO';

/** Має збігатися з брейкпоінтом desktop у CSS. */
export const DESKTOP_MEDIA_QUERY = '(min-width: 1440px)';

/** id секцій — це якорі в URL (/en#services), тому не перейменовувати без потреби. */
export const SECTION_IDS = {
  /** Верх сторінки — сам header: лого веде сюди, і хедер лишається на екрані. */
  top: 'top',
  about: 'about',
  services: 'services',
  portfolio: 'portfolio',
  process: 'process',
  contacts: 'contacts',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** Варіант «Інша країна» біля поля телефону: тоді номер вводять повністю, з «+» і кодом країни. */
export const OTHER_PHONE_COUNTRY = 'OTHER';

/** Пункти меню в header, мобільному меню й footer — у порядку макета. Ключі збігаються з nav.* у перекладах. */
export const NAV_SECTIONS = [
  SECTION_IDS.about,
  SECTION_IDS.services,
  SECTION_IDS.portfolio,
  SECTION_IDS.process,
  SECTION_IDS.contacts,
] as const;
