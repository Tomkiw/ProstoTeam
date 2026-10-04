/** Підпис каналу береться з перекладів: contacts.channels.<channel>. Дзвінків не плануємо — лише месенджери й пошта. */
export type ContactChannel = 'telegram' | 'whatsapp' | 'viber' | 'email';

export type Contact = {
  channel: ContactChannel;
  value: string;
  href: string;
};
