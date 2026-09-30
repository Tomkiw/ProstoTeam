// Спільне для форми (браузер) і sendLead (сервер): одні й ті самі правила з обох боків.

/** Значення select «Інше» — коли жодна послуга не підходить. */
export const OTHER_SERVICE = 'other';

/** Поле-пастка: людина його не бачить, а бот заповнює. */
export const HONEYPOT_FIELD = 'company';

/** Мова сайту, з якої прийшла заявка, — щоб відповісти тією ж мовою. */
export const LOCALE_FIELD = 'locale';

export const LEAD_LIMITS = {
  name: 100,
  contact: 100,
  message: 2000,
} as const;

/** Порядок як у формі: перше порожнє поле отримує фокус. */
export const REQUIRED_LEAD_FIELDS = ['name', 'contact'] as const;

export type RequiredLeadField = (typeof REQUIRED_LEAD_FIELDS)[number];

export type Lead = {
  name: string;
  contact: string;
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
    service: readField(formData, 'service'),
    message: readField(formData, 'message'),
  };
}

export function getMissingFields(lead: Lead): RequiredLeadField[] {
  return REQUIRED_LEAD_FIELDS.filter((field) => lead[field] === '');
}
