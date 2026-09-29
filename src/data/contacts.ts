import type { Contact } from '@/types/contact';

// href заповнити разом зі значеннями: 'https://t.me/<нік>', 'mailto:<пошта>', 'tel:+48...'
export const CONTACTS: Contact[] = [
  { channel: 'telegram', value: '[@нікнейм]', href: '#' },
  { channel: 'email', value: '[пошта студії]', href: '#' },
  { channel: 'phone', value: '[номер]', href: '#' },
];
