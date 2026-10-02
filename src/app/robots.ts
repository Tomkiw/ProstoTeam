import type { MetadataRoute } from 'next';
import { getSiteUrl, isIndexingAllowed } from '@/lib/site';

/**
 * Обхід дозволяємо завжди: якщо закрити його тут, пошуковик не побачить noindex на сторінках
 * і може лишити адреси в індексі. Від індексації *.vercel.app захищає саме noindex (див. lib/site.ts).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    ...(isIndexingAllowed() ? { sitemap: new URL('/sitemap.xml', getSiteUrl()).toString() } : {}),
  };
}
