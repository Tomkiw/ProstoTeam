import type { Metadata } from 'next';
import { About } from '@/components/sections/About';
import { Contacts } from '@/components/sections/Contacts';
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { initRequestLocale } from '@/i18n/initRequestLocale';
import { getPageMetadata } from '@/lib/metadata';
import type { LocaleParams } from '@/types/i18n';

type HomePageProps = {
  params: LocaleParams;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const locale = await initRequestLocale(params);
  return getPageMetadata({ locale, href: '/' });
}

export default async function HomePage({ params }: HomePageProps) {
  await initRequestLocale(params);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Contacts />
    </>
  );
}
