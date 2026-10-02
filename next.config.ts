import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Без шляху плагін сам знаходить src/i18n/request.ts
const withNextIntl = createNextIntlPlugin();

// Базові заголовки безпеки для всіх адрес. Повна Content-Security-Policy — окремою задачею:
// її треба узгодити зі скриптами Next і шрифтами, інакше сайт зламається
const SECURITY_HEADERS = [
  // Браузер не вгадує тип файлу за вмістом
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Іншим сайтам — лише наш домен, без шляху й параметрів
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Камера, мікрофон і геолокація сайту не потрібні; browsing-topics — без рекламного профілю
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // Сайт не можна вбудувати в чужий iframe (клікджекінг): CSP — для сучасних браузерів, X-Frame-Options — для старих
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Frame-Options', value: 'DENY' },
];

const nextConfig: NextConfig = {
  // Без заголовка X-Powered-By: Next.js — не підказуємо, на чому зроблено сайт
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
};

export default withNextIntl(nextConfig);
