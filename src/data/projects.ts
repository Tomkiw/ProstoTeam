import type { Project } from '@/types/project';

/**
 * Портфоліо. Щоб додати проєкт:
 * 1. Допишіть об'єкт у кінець масиву (порядок тут = порядок на сайті).
 * 2. Покладіть скріншот у public/images/projects/ і вкажіть шлях у `screenshot`.
 * Опис і теги — одразу трьома мовами, інакше TypeScript не пропустить.
 */
export const PROJECTS: Project[] = [
  {
    id: 'mindterms',
    title: 'mindterms',
    url: 'https://mindterms.vercel.app',
    displayUrl: 'mindterms.vercel.app',
    kind: 'website',
    tags: [{ id: 'languages', label: { en: '3 languages', pl: '3 języki', uk: '3 мови' } }],
    description: {
      en: 'A plain-language psychology glossary: 48 concepts across 12 topics, with evidence levels and sources.',
      pl: 'Słownik psychologii prostym językiem: 48 pojęć w 12 tematach, z poziomami dowodów i źródłami.',
      uk: 'Довідник з психології простою мовою: 48 понять у 12 темах, з рівнями доказовості та джерелами.',
    },
  },
  {
    id: 'cosmogram',
    title: 'Cosmogram',
    url: 'https://cosmogram-front.vercel.app',
    displayUrl: 'cosmogram-front.vercel.app',
    kind: 'webapp',
    isInDevelopment: true,
    description: {
      en: 'Astrology and numerology: sign-up, destiny matrix calculation, interface in three languages.',
      pl: 'Astrologia i numerologia: rejestracja, obliczanie matrycy przeznaczenia, interfejs w trzech językach.',
      uk: 'Астрологія та нумерологія: реєстрація, розрахунок матриці долі, інтерфейс трьома мовами.',
    },
    stack: ['Next.js', 'React', 'Zustand', 'Express', 'MongoDB', 'Cloudinary'],
  },
  {
    id: 'getmatch-ua',
    title: 'GetMatch UA',
    url: 'https://t.me/getmatch_ua_bot',
    displayUrl: 't.me/getmatch_ua_bot',
    kind: 'telegramBot',
    description: {
      en: 'A dating bot: sign-up, profile browsing and mutual likes that open a chat.',
      pl: 'Bot randkowy: rejestracja, przeglądanie profili i wzajemne polubienia z przejściem do czatu.',
      uk: 'Бот знайомств: реєстрація, перегляд анкет і взаємні лайки з переходом у чат.',
    },
    stack: ['Node.js', 'TypeScript', 'Telegraf', 'Express', 'MongoDB'],
  },
  {
    id: 'recipool',
    title: 'Recipool',
    url: 'https://recipool.vercel.app',
    displayUrl: 'recipool.vercel.app',
    kind: 'webapp',
    description: {
      en: 'A shared recipe book: search and filters, sign-up, favourites and publishing your own recipes with photos.',
      pl: 'Wspólna książka kucharska: wyszukiwanie i filtry, rejestracja, ulubione przepisy i publikowanie własnych ze zdjęciami.',
      uk: 'Спільна книга рецептів: пошук і фільтри, реєстрація, улюблені рецепти й публікація власних з фото.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'TanStack Query', 'Zustand', 'Express', 'MongoDB'],
  },
];
