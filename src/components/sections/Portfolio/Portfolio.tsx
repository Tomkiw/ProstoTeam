import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { PROJECTS } from '@/data/projects';
import { SECTION_IDS } from '@/lib/constants';
import { ProjectCard } from './ProjectCard';
import styles from './Portfolio.module.css';

// Заглушка. Макет: m-portfolio / t-portfolio / d-portfolio.
// На 1440 ширину картки (7 чи 5 колонок) краще рахувати з індексу — тоді нові проєкти стають у сітку самі.
export function Portfolio() {
  const t = useTranslations('portfolio');

  return (
    <section id={SECTION_IDS.portfolio} className={styles.section}>
      <Container>
        <h2>{t('title')}</h2>
        {PROJECTS.length > 0 && (
          <ul className={styles.list}>
            {PROJECTS.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
