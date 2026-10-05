import { type AbstractIntlMessages, hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { bindShortWords } from '@/lib/typography';
import { routing } from './routing';

/** Нерозривні пробіли в усіх перекладах одразу — щоб не розставляти їх руками в JSON. */
function bindShortWordsDeep(messages: AbstractIntlMessages): AbstractIntlMessages {
  return Object.fromEntries(
    Object.entries(messages).map(([key, value]) => [
      key,
      typeof value === 'string' ? bindShortWords(value) : bindShortWordsDeep(value),
    ]),
  );
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: bindShortWordsDeep((await import(`../../messages/${locale}.json`)).default),
  };
});
