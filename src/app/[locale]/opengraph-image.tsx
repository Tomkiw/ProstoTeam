import { ImageResponse } from 'next/og';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { BRAND_NAME } from '@/lib/constants';
import type { LocaleParams } from '@/types/i18n';

export const alt = BRAND_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// next/og не бачить CSS-змінних і модулів: кольори з globals.css тут, стилі — інлайн
const COLORS = {
  background: '#1b2130',
  text: '#ffffff',
  primary: '#2f4bff',
  accent: '#ff7a1a',
} as const;

const FONT_FAMILY = 'Unbounded';
const FONT_WEIGHT = 600;
const LOGO_FONT_SIZE = 56;
// Як у компоненті Logo: кружечок — 0.6 від розміру літер
const LOGO_DOT_SIZE = LOGO_FONT_SIZE * 0.6;

/**
 * Бере з Google Fonts лише потрібні літери Unbounded у TTF:
 * next/og не читає woff2, а його шрифт за замовчуванням не має кирилиці.
 */
async function loadFont(text: string): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${FONT_FAMILY}:wght@${FONT_WEIGHT}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl)).text();
  const fontUrl = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];

  if (!fontUrl) {
    throw new Error('OG image: Google Fonts не віддав шрифт');
  }

  const response = await fetch(fontUrl);

  if (!response.ok) {
    throw new Error(`OG image: шрифт не завантажився (${response.status})`);
  }

  return response.arrayBuffer();
}

type OpenGraphImageProps = {
  params: LocaleParams;
};

// Картинки збираються один раз під час деплою, а не на кожен запит (і шрифт тягнеться теж один раз)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Прев'ю посилання в месенджерах і соцмережах: лого й заголовок Hero мовою сторінки. */
export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale: requestedLocale } = await params;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const title = t('title');
  const font = await loadFont(`prst${title}`);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: 80,
        background: COLORS.background,
        color: COLORS.text,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: LOGO_FONT_SIZE,
          lineHeight: 1,
          letterSpacing: -1,
        }}
      >
        <span>pr</span>
        <span
          style={{
            width: LOGO_DOT_SIZE,
            height: LOGO_DOT_SIZE,
            margin: '0 4px',
            borderRadius: '50%',
            background: COLORS.primary,
          }}
        />
        <span>st</span>
        <span
          style={{
            width: LOGO_DOT_SIZE,
            height: LOGO_DOT_SIZE,
            marginLeft: 4,
            borderRadius: '50%',
            background: COLORS.accent,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          maxWidth: 1000,
          fontSize: 76,
          lineHeight: 1.1,
          letterSpacing: -2,
        }}
      >
        {title}
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: FONT_FAMILY, data: font, weight: FONT_WEIGHT, style: 'normal' }],
    },
  );
}
