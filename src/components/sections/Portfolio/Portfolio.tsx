import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PROJECTS } from '@/data/projects';
import { SECTION_IDS } from '@/lib/constants';
import { ProjectCard } from './ProjectCard';
import styles from './Portfolio.module.css';

/** Наші роботи: 375 — колонка, 768 — дві колонки, 1440 — сітка 7/5 → 5/7. Макет: *-portfolio. */
export function Portfolio() {
  const t = useTranslations('portfolio');

  return (
    <section id={SECTION_IDS.portfolio} className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <SectionTitle>{t('title')}</SectionTitle>
          <p className={styles.note}>{t('note')}</p>
        </div>
        {PROJECTS.length > 0 && (
          <ul role="list" className={styles.list}>
            {PROJECTS.map((project) => (
              <li key={project.id} className={styles.item}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
