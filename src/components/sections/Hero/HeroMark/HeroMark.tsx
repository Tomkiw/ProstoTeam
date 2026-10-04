import { useLocale } from 'next-intl';
import { TEAM } from '@/data/team';
import { cn } from '@/lib/cn';
import { bindShortWords } from '@/lib/typography';
import type { TeamMember } from '@/types/team';
import styles from './HeroMark.module.css';

type HeroMarkProps = {
  className?: string;
};

type MarkCircleProps = {
  member?: TeamMember;
  className: string;
};

/** Кружечок-«о» в лого. На десктопі (з 1280) усередині — ім'я й роль учасника команди. */
function MarkCircle({ member, className }: MarkCircleProps) {
  const locale = useLocale();

  return (
    <span className={cn(styles.circle, className)}>
      {member && (
        <span className={styles.member}>
          <span className={styles.name}>{member.name[locale]}</span>
          <span className={styles.role}>{bindShortWords(member.shortRole[locale])}</span>
        </span>
      )}
    </span>
  );
}

/**
 * Велике лого «pr●st●» під заголовком Hero. Літери декоративні й приховані від скрінрідерів.
 * Кружечки за лого завжди синій, потім помаранчевий; у них — перший і другий учасник з TEAM.
 */
export function HeroMark({ className }: HeroMarkProps) {
  const [firstMember, secondMember] = TEAM;

  return (
    <div className={cn(styles.mark, className)}>
      <span aria-hidden="true">pr</span>
      <MarkCircle member={firstMember} className={styles.circleFirst} />
      <span aria-hidden="true">st</span>
      <MarkCircle member={secondMember} className={styles.circleSecond} />
    </div>
  );
}
