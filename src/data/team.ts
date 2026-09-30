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
    role: { en: 'Full-stack developer', pl: 'Full-stack developer', uk: 'Фулстек-розробник' },
    shortRole: { en: 'full-stack', pl: 'full-stack', uk: 'фулстек' },
    bio: {
      en: 'Works on both the client and the server side: brings ideas and turns them into a working website.',
      pl: 'Pisze zarówno część kliencką, jak i serwerową: proponuje pomysły i zamienia je w działającą stronę.',
      uk: 'Пише і клієнтську, і серверну частину: пропонує ідеї та доводить їх до робочого сайту.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'MongoDB', 'HTML', 'CSS'],
    color: 'accent',
  },
];
