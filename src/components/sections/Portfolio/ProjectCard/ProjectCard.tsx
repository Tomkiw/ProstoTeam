import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { bindShortWords } from '@/lib/typography';
import type { Project } from '@/types/project';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
  project: Project;
};

// Скріншот на всю ширину картки; з 1280 широка картка займає 7 з 12 колонок (до ≈740px на 1440)
const SCREENSHOT_SIZES = '(min-width: 1280px) 740px, (min-width: 768px) 50vw, 100vw';

type ExternalLinkIconProps = {
  className: string;
};

/** Стрілка ↗: посилання веде на інший сайт і відкривається в новій вкладці. */
function ExternalLinkIcon({ className }: ExternalLinkIconProps) {
  return (
    <svg
      className={className}
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
        rel="noopener"
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
          {/* Постійна ↗: на телефоні наведення нема, тож про нову вкладку підказує вона */}
          <ExternalLinkIcon className={styles.toolbarIcon} />
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
          {/* Видима підказка при наведенні на скрін: що відкриється нова вкладка */}
          <span className={styles.screenHint}>
            <span className={styles.screenHintLabel}>
              {t('openInNewTab')}
              <ExternalLinkIcon className={styles.linkIcon} />
            </span>
          </span>
        </div>
      </a>

      <ul role="list" className={styles.badges}>
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
      <p className={styles.description}>{bindShortWords(project.description[locale])}</p>
      {project.stack && project.stack.length > 0 && (
        <p className={styles.stack}>{project.stack.join(', ')}</p>
      )}
      {/* Лише noopener: noreferrer сховав би від аналітики наших же проєктів, що відвідувач прийшов звідси */}
      <a className={styles.link} href={project.url} target="_blank" rel="noopener">
        {linkLabel}
        <span className="visually-hidden">{` ${project.title}, ${t('opensInNewTab')}`}</span>
        <ExternalLinkIcon className={styles.linkIcon} />
      </a>
    </article>
  );
}
