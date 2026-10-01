const LOCAL_SITE_URL = 'http://localhost:3000';

/**
 * Адреса сайту для canonical, Open Graph і sitemap.
 * SITE_URL — власний домен (задати у Vercel, коли з'явиться); без нього — продакшн-адреса *.vercel.app.
 */
export function getSiteUrl(): URL {
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const fallbackUrl = productionHost ? `https://${productionHost}` : LOCAL_SITE_URL;

  return new URL(process.env.SITE_URL || fallbackUrl);
}

/**
 * Індексуємо лише продакшн із власним доменом (SITE_URL).
 * *.vercel.app і прев'ю закриті, інакше потраплять у пошук дублем.
 */
export function isIndexingAllowed(): boolean {
  return process.env.VERCEL_ENV === 'production' && Boolean(process.env.SITE_URL);
}
