// Спільне для форми (браузер) і sendLead (сервер): одні й ті самі правила з обох боків.

/** Значення select «Інше» — коли жодна послуга не підходить. */
export const OTHER_SERVICE = 'other';

/**
 * Поле-пастка: людина його не бачить, а бот заповнює. Назва навмисно не схожа на звичні поля
 * (company, email…): інакше автозаповнення браузера підставить туди дані й справжню заявку відсіє як бота.
 */
export const HONEYPOT_FIELD = 'bot-field';

/** Мова сайту, з якої прийшла заявка, — щоб відповісти тією ж мовою. */
export const LOCALE_FIELD = 'locale';

/** Код країни для телефону (ISO: PL, UA…). */
export const PHONE_COUNTRY_FIELD = 'phoneCountry';

export const LEAD_LIMITS = {
  name: 100,
  contact: 30,
  message: 2000,
} as const;

// Від 4 до 15 цифр: коротших номерів не буває, довших не дозволяє стандарт E.164
const PHONE_MIN_DIGITS = 4;
const PHONE_MAX_DIGITS = 15;
const PHONE_ALLOWED_CHARS = /^[\d\s().+-]+$/;

/** Порядок як у формі: перше порожнє поле отримує фокус. */
export const REQUIRED_LEAD_FIELDS = ['name', 'contact'] as const;

export type RequiredLeadField = (typeof REQUIRED_LEAD_FIELDS)[number];

/** required — поле порожнє, invalid — заповнене, але не схоже на телефон. */
export type LeadFieldError = 'required' | 'invalid';

export type LeadErrors = Partial<Record<RequiredLeadField, LeadFieldError>>;

export type Lead = {
  name: string;
  /** Номер телефону без коду країни (або з ним, якщо людина ввела «+…»). */
  contact: string;
  phoneCountry: string;
  service: string;
  message: string;
};

function readField(formData: FormData, field: keyof Lead): string {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

export function readLead(formData: FormData): Lead {
  return {
    name: readField(formData, 'name'),
    contact: readField(formData, 'contact'),
    phoneCountry: readField(formData, 'phoneCountry'),
    service: readField(formData, 'service'),
    message: readField(formData, 'message'),
  };
}

/** Груба перевірка для браузера. Точну, за правилами країни, робить сервер (lib/phone.ts). */
export function isPlausiblePhone(phone: string): boolean {
  const digitCount = phone.replace(/\D/g, '').length;

  return (
    PHONE_ALLOWED_CHARS.test(phone) &&
    digitCount >= PHONE_MIN_DIGITS &&
    digitCount <= PHONE_MAX_DIGITS
  );
}

export function getLeadErrors(lead: Lead): LeadErrors {
  const errors: LeadErrors = {};

  if (!lead.name) {
    errors.name = 'required';
  }

  if (!lead.contact) {
    errors.contact = 'required';
  } else if (!isPlausiblePhone(lead.contact)) {
    errors.contact = 'invalid';
  }

  return errors;
}

/** Перше поле з помилкою в порядку форми — на нього переводимо фокус. */
export function getFirstInvalidField(errors: LeadErrors): RequiredLeadField | undefined {
  return REQUIRED_LEAD_FIELDS.find((field) => errors[field]);
}
