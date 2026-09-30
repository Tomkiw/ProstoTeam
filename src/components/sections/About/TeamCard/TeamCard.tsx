import { useLocale } from 'next-intl';
import { cn } from '@/lib/cn';
import type { TeamMember } from '@/types/team';
import styles from './TeamCard.module.css';

type TeamCardProps = {
  member: TeamMember;
};

/** Картка учасника команди: кружечок кольору з лого, ім'я, роль, опис і стек. */
export function TeamCard({ member }: TeamCardProps) {
  const locale = useLocale();

  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <span className={cn(styles.avatar, styles[member.color])} aria-hidden="true" />
        <div className={styles.identity}>
          <h3 className={styles.name}>{member.name[locale]}</h3>
          <p className={styles.role}>{member.role[locale]}</p>
        </div>
      </div>
      <p className={styles.bio}>{member.bio[locale]}</p>
      <p className={styles.stack}>{member.stack.join(', ')}</p>
    </article>
  );
}
