import type { LocalizedString } from './i18n';

/** Колір кружечка-аватара: primary — синій, accent — помаранчевий. */
export type TeamMemberColor = 'primary' | 'accent';

export type TeamMember = {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  /** Коротка роль для hero: «фронтенд і фулстек». */
  shortRole: LocalizedString;
  bio: LocalizedString;
  stack: string[];
  color: TeamMemberColor;
};
