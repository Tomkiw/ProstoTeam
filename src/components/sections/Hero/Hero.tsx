import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { TEAM } from '@/data/team';
import { cn } from '@/lib/cn';
import { SECTION_IDS } from '@/lib/constants';
import { getSectionHref } from '@/lib/getSectionHref';
import { bindShortWords } from '@/lib/typography';
import styles from './Hero.module.css';
import { HeroMark } from './HeroMark';

/** Перший екран: єдиний h1 на сторінці, дві кнопки, велике лого з командою. Макет: *-hero. */
export function Hero() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className={styles.hero}>
      <Container>
        <h1 className={styles.title}>{t('hero.title')}</h1>

        <div className={styles.intro}>
          <p className={styles.lead}>{t('hero.lead')}</p>
          <div className={styles.actions}>
            <Button href={getSectionHref(SECTION_IDS.contacts)} size="lg">
              {t('common.discussProject')}
            </Button>
            <Button href={getSectionHref(SECTION_IDS.portfolio)} variant="outline" size="lg">
              {t('hero.secondaryCta')}
            </Button>
          </div>
        </div>

        <HeroMark className={styles.mark} />

        {/* До десктопа команда — списком; з 1280 список ховається, бо імена вже в кружечках лого */}
        <ul role="list" className={styles.team}>
          {TEAM.map((member) => (
            <li key={member.id} className={styles.member}>
              <span className={cn(styles.dot, styles[member.color])} aria-hidden="true" />
              {member.name[locale]}, {bindShortWords(member.shortRole[locale])}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
