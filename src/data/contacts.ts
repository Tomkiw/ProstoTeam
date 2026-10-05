import type { Contact } from '@/types/contact';

/*
 * Порядок тут = порядок кнопок на сайті. href заповнити разом зі значеннями:
 *   telegram — 'https://t.me/<нік>'
 *   whatsapp — 'https://wa.me/48XXXXXXXXX' (номер з кодом країни, без «+» і пробілів)
 *   viber    — 'viber://chat?number=%2B48XXXXXXXXX' (%2B — це «+»)
 *   email    — 'mailto:<пошта>'
 * Канал без href краще прибрати зі списку, ніж лишати кнопку в нікуди.
 */
export const CONTACTS: Contact[] = [
  { channel: 'telegram', value: '[@нікнейм]', href: '#' },
  { channel: 'whatsapp', value: '[номер]', href: '#' },
  { channel: 'viber', value: '[номер]', href: '#' },
  { channel: 'email', value: '[пошта студії]', href: '#' },
];
