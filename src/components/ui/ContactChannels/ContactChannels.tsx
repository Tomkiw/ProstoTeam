import { useTranslations } from 'next-intl';
import { ChannelIcon } from '@/components/ui/ChannelIcon';
import { CONTACTS } from '@/data/contacts';
import { cn } from '@/lib/cn';
import styles from './ContactChannels.module.css';

const MESSENGERS = CONTACTS.filter((contact) => contact.channel !== 'email');
const EMAIL = CONTACTS.find((contact) => contact.channel === 'email');

type ContactChannelsProps = {
  className?: string;
};

/**
 * Кнопки месенджерів з логотипами й пошта під ними — для темного фону (контакти, мобільне меню).
 * Месенджер — кнопка: відкриває чат одним дотиком. Пошту часто копіюють, тож адресу видно повністю.
 */
export function ContactChannels({ className }: ContactChannelsProps) {
  const t = useTranslations('contacts.channels');

  return (
    <div className={cn(styles.root, className)}>
      {MESSENGERS.length > 0 && (
        <ul role="list" className={styles.messengers}>
          {MESSENGERS.map((contact) => (
            <li key={contact.channel}>
              <a href={contact.href} className={styles.messenger}>
                <ChannelIcon channel={contact.channel} className={styles.icon} />
                {t(contact.channel)}
              </a>
            </li>
          ))}
        </ul>
      )}
      {EMAIL && (
        <a href={EMAIL.href} className={styles.email}>
          <ChannelIcon channel="email" className={styles.icon} />
          <span className="visually-hidden">{`${t('email')}: `}</span>
          {EMAIL.value}
        </a>
      )}
    </div>
  );
}
