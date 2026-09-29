import type { TeamMember } from '@/types/team';

export const TEAM: TeamMember[] = [
  {
    id: 'roman',
    name: { en: 'Roman', pl: 'Roman', uk: 'Роман' },
    role: {
      en: 'Frontend & full-stack developer',
      pl: 'Frontend i full-stack developer',
      uk: 'Фронтенд і фулстек-розробник',
    },
    shortRole: {
      en: 'frontend & full-stack',
      pl: 'frontend i full-stack',
      uk: 'фронтенд і фулстек',
    },
    bio: {
      en: 'Builds responsive interfaces and writes the server side: authentication, databases, integrations.',
      pl: 'Tworzy responsywne interfejsy i pisze część serwerową: autoryzację, bazy danych, integracje.',
      uk: 'Верстає адаптивні інтерфейси й пише серверну частину: авторизацію, бази даних, інтеграції.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    color: 'primary',
  },
  {
    id: 'ihor',
    name: { en: 'Ihor', pl: 'Ihor', uk: 'Ігор' },
    role: { en: '[Role in the team]', pl: '[Rola w zespole]', uk: '[Роль у команді]' },
    shortRole: { en: '[role]', pl: '[rola]', uk: '[роль]' },
    bio: {
      en: '[What you do in projects]',
      pl: '[Czym zajmujesz się w projektach]',
      uk: '[Що робить у проєктах]',
    },
    stack: ['[Технології та інструменти]'],
    color: 'accent',
  },
];
