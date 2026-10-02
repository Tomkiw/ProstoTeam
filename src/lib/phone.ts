import {
  type CountryCode,
  getCountryCallingCode,
  type PhoneNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js/max';
import type { Locale } from 'next-intl';
import type { PhoneCountryOption } from '@/types/phone';
import { OTHER_PHONE_COUNTRY } from './constants';

// Лише для сервера: повні дані libphonenumber (~150 KB) у браузер не потрапляють —
// форма отримує готовий список країн пропсом, а номер перевіряє sendLead.

/** З цих країн номери не приймаємо навіть через «Інша країна» і «+код». */
const EXCLUDED_COUNTRIES: readonly CountryCode[] = ['RU', 'BY'];

/** Нагорі списку — основні ринки. */
const PRIORITY_COUNTRIES: readonly CountryCode[] = ['PL', 'UA'];

/**
 * Решта списку, за абеткою мовою сторінки: ЄС, сусіди й країни, де багато наших клієнтів.
 * Хто не знайде себе — обирає «Інша країна» й вводить номер із «+».
 */
const LISTED_COUNTRIES: readonly CountryCode[] = [
  // ЄС, крім Польщі
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  // Інша Європа
  'GB',
  'NO',
  'CH',
  'MD',
  'GE',
  'TR',
  // Поза Європою
  'US',
  'CA',
  'IL',
  'AE',
  'AU',
];

/** Країна, вибрана за замовчуванням, залежно від мови сторінки. */
export const DEFAULT_PHONE_COUNTRY: Record<Locale, CountryCode> = {
  en: 'PL',
  pl: 'PL',
  uk: 'UA',
};

function isListedCountry(code: string): code is CountryCode {
  return [...PRIORITY_COUNTRIES, ...LISTED_COUNTRIES].some((country) => country === code);
}

function toCountryOption(code: CountryCode, regionNames: Intl.DisplayNames): PhoneCountryOption {
  const dialCode = getCountryCallingCode(code);

  return {
    code,
    label: `${regionNames.of(code) ?? code} +${dialCode}`,
    shortLabel: `${code} +${dialCode}`,
  };
}

/**
 * Список для форми: Польща й Україна, далі решта за абеткою мовою сторінки
 * (назви з вбудованого Intl, без перекладів), наприкінці — «Інша країна».
 */
export function getPhoneCountryOptions(
  locale: Locale,
  otherCountryLabel: string,
): PhoneCountryOption[] {
  const regionNames = new Intl.DisplayNames([locale], { type: 'region' });
  const collator = new Intl.Collator(locale);

  const listedOptions = LISTED_COUNTRIES.map((code) => toCountryOption(code, regionNames)).sort(
    (first, second) => collator.compare(first.label, second.label),
  );

  return [
    ...PRIORITY_COUNTRIES.map((code) => toCountryOption(code, regionNames)),
    ...listedOptions,
    { code: OTHER_PHONE_COUNTRY, label: otherCountryLabel, shortLabel: '+…' },
  ];
}

function parsePhoneForCountry(countryCode: string, phone: string): PhoneNumber | undefined {
  // «Інша країна»: без країни за замовчуванням бібліотека приймає лише номер з «+» і кодом
  if (countryCode === OTHER_PHONE_COUNTRY) return parsePhoneNumberFromString(phone);
  if (isListedCountry(countryCode)) return parsePhoneNumberFromString(phone, countryCode);
  return undefined;
}

/**
 * Номер у міжнародному форматі (+48 512 345 678) або null, якщо такого номера не існує
 * чи він з виключеної країни. Код +7 у Казахстану й Росії спільний — бібліотека розрізняє їх за діапазонами.
 */
export function formatValidPhone(countryCode: string, phone: string): string | null {
  const phoneNumber = parsePhoneForCountry(countryCode, phone);

  if (!phoneNumber?.isValid()) return null;
  if (phoneNumber.country && EXCLUDED_COUNTRIES.includes(phoneNumber.country)) return null;

  return phoneNumber.formatInternational();
}
