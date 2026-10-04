export const BRAND_NAME = 'PROSTO';

/** З цієї ширини header показує десктопне меню, а бургер ховається. Має збігатися з CSS (Header, MobileMenu). */
export const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';

/** id секцій — це якорі в URL (/en#services), тому не перейменовувати без потреби. */
export const SECTION_IDS = {
  /**
   * Верх сторінки: сюди веде лого. Елемента з таким id нема навмисно —
   * на #top браузер (за стандартом HTML) і Next самі прокручують на початок сторінки.
   */
  top: 'top',
  about: 'about',
  services: 'services',
  portfolio: 'portfolio',
  process: 'process',
  contacts: 'contacts',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** id тегу main: сюди веде посилання «Перейти до вмісту». */
export const MAIN_CONTENT_ID = 'main';

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
