import { useLocale, useTranslations } from 'next-intl';
import type { Project } from '@/types/project';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
  project: Project;
};

// Заглушка. Ще немає: «рамки браузера» зі скріншотом (next/image), бейджів kind/tags/isInDevelopment, стеку.
export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('portfolio');
  const locale = useLocale();
  const linkLabel = project.kind === 'telegramBot' ? t('openBot') : t('openSite');

  return (
    <article className={styles.card}>
      <h3>{project.title}</h3>
      <p>{project.description[locale]}</p>
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {linkLabel}
      </a>
    </article>
  );
}
