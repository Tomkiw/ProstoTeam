import { notFound } from 'next/navigation';

// Ловить невідомі адреси (/en/abc), щоб показати нашу локалізовану 404 з header і footer,
// а не стандартну англомовну сторінку Next.js.
export default function CatchAllPage() {
  notFound();
}
