'use server';

import { hasLocale } from 'next-intl';
import { SERVICES } from '@/data/services';
import { routing } from '@/i18n/routing';
import { formatValidPhone } from '@/lib/phone';
import { sendTelegramMessage } from '@/lib/telegram';
import {
  HONEYPOT_FIELD,
  LEAD_LIMITS,
  LOCALE_FIELD,
  OTHER_SERVICE,
  getLeadErrors,
  readLead,
  type Lead,
  type LeadErrors,
} from './lead';

export type SendLeadResult =
  { status: 'success' } | { status: 'invalid'; errors: LeadErrors } | { status: 'error' };

// Заявки читаємо ми, тож повідомлення в Telegram — українською
const MESSAGE_TITLE = 'Нова заявка з сайту';
const OTHER_SERVICE_TITLE = 'Інше';
const EMPTY_VALUE = '—';

/** Назва послуги для повідомлення; null — якщо прийшло значення, якого у формі нема. */
function getServiceTitle(serviceId: string): string | null {
  if (serviceId === '') return EMPTY_VALUE;
  if (serviceId === OTHER_SERVICE) return OTHER_SERVICE_TITLE;
  return SERVICES.find((service) => service.id === serviceId)?.title.uk ?? null;
}

function isWithinLimits(lead: Lead): boolean {
  return (
    lead.name.length <= LEAD_LIMITS.name &&
    lead.contact.length <= LEAD_LIMITS.contact &&
    lead.message.length <= LEAD_LIMITS.message
  );
}

function formatLeadMessage(
  lead: Lead,
  phone: string,
  serviceTitle: string,
  locale: string,
): string {
  return [
    MESSAGE_TITLE,
    `Ім’я: ${lead.name}`,
    `Телефон: ${phone}`,
    `Послуга: ${serviceTitle}`,
    `Про проєкт: ${lead.message || EMPTY_VALUE}`,
    `Мова сайту: ${locale}`,
  ].join('\n');
}

/** Перевіряє заявку ще раз (браузеру не довіряємо) і пересилає її в Telegram. */
export async function sendLead(formData: FormData): Promise<SendLeadResult> {
  // Бот заповнив пастку: удаємо успіх, щоб не підказувати, що заявку відсіяно
  if (formData.get(HONEYPOT_FIELD)) {
    return { status: 'success' };
  }

  const lead = readLead(formData);
  const errors = getLeadErrors(lead);

  if (Object.keys(errors).length > 0) {
    return { status: 'invalid', errors };
  }

  // Браузер перевіряє номер грубо, тут — за правилами країни
  const phone = formatValidPhone(lead.phoneCountry, lead.contact);

  if (!phone) {
    return { status: 'invalid', errors: { contact: 'invalid' } };
  }

  const locale = formData.get(LOCALE_FIELD);
  const serviceTitle = getServiceTitle(lead.service);

  // Сюди потрапляє лише підроблений запит: форма не дає ввести зайве чи обрати іншу послугу
  if (!hasLocale(routing.locales, locale) || !serviceTitle || !isWithinLimits(lead)) {
    return { status: 'error' };
  }

  const isSent = await sendTelegramMessage(formatLeadMessage(lead, phone, serviceTitle, locale));
  return isSent ? { status: 'success' } : { status: 'error' };
}
