import { About } from '@/components/sections/About';
import { Contacts } from '@/components/sections/Contacts';
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { initRequestLocale } from '@/i18n/initRequestLocale';
import type { LocaleParams } from '@/types/i18n';

type HomePageProps = {
  params: LocaleParams;
};

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
