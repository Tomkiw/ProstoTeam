import type { SectionId } from './constants';

/** Посилання на секцію головної. Об'єкт, а не '#id', — щоб працювало й з інших сторінок (напр. /privacy). */
export function getSectionHref(id: SectionId) {
  return { pathname: '/', hash: id };
}
