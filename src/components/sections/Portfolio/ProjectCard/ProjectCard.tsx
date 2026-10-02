import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import type { Project } from '@/types/project';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
  project: Project;
};

// Скріншот на всю ширину картки; на 1440 широка картка займає 7 з 12 колонок (≈740px)
const SCREENSHOT_SIZES = '(min-width: 1440px) 740px, (min-width: 768px) 50vw, 100vw';

/** Стрілка ↗: посилання веде на інший сайт і відкривається в новій вкладці. */
function ExternalLinkIcon() {
  return (
    <svg
      className={styles.linkIcon}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 11l6-6M6 5h5v5" />
    </svg>
  );
}

/** Картка проєкту: «вікно браузера» зі скріншотом, бейджі, опис, стек і посилання. */
export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('portfolio');
  const locale = useLocale();
  const isBot = project.kind === 'telegramBot';
  const linkLabel = isBot ? t('openBot') : t('openSite');
  // Багатомовний проєкт показуємо тією ж мовою, якою відкрито наш сайт
  const screenshot =
    typeof project.screenshot === 'string' ? project.screenshot : project.screenshot?.[locale];

  return (
    <article className={styles.card}>
      {/* Люди клікають по картинці, тож усе «вікно» — посилання. Воно дублює текстове посилання нижче,
          тому від клавіатури й скрінрідера сховане: інакше одне й те саме прозвучить двічі */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className={styles.browser}
      >
        <div className={styles.toolbar}>
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.address}>{project.displayUrl}</span>
        </div>
        {/* Поки скріншота нема, видно сірий фон рамки — це і є заглушка */}
        <div className={styles.screen}>
          {screenshot && (
            <Image
              src={screenshot}
              alt={t('screenshotAlt', { title: project.title })}
              fill
              sizes={SCREENSHOT_SIZES}
              className={styles.screenshot}
            />
          )}
        </div>
      </a>

      <ul className={styles.badges}>
        <li className={styles.badge}>{t(`kinds.${project.kind}`)}</li>
        {project.tags?.map((tag) => (
          <li key={tag.id} className={styles.badge}>
            {tag.label[locale]}
          </li>
        ))}
        {project.isInDevelopment && (
          <li className={cn(styles.badge, styles.inDevelopment)}>{t('inDevelopment')}</li>
        )}
      </ul>

      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description[locale]}</p>
      {project.stack && project.stack.length > 0 && (
        <p className={styles.stack}>{project.stack.join(', ')}</p>
      )}
      <a className={styles.link} href={project.url} target="_blank" rel="noopener noreferrer">
        {linkLabel}
        <span className="visually-hidden">{` ${project.title}, ${t('opensInNewTab')}`}</span>
        <ExternalLinkIcon />
      </a>
    </article>
  );
}
