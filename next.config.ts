import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Без шляху плагін сам знаходить src/i18n/request.ts
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
