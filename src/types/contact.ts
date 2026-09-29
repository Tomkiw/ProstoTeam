/** Підпис каналу береться з перекладів: contacts.channels.<channel>. */
export type ContactChannel = 'telegram' | 'email' | 'phone';

export type Contact = {
  channel: ContactChannel;
  value: string;
  href: string;
};
