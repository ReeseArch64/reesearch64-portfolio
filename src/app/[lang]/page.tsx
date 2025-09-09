import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import ContactSection from '@/components/sections/contact';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '../../../i18n-config';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col min-h-dvh">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow">
        <HeroSection dictionary={dictionary.hero} />
        <AboutSection dictionary={dictionary.about} />
        <SkillsSection dictionary={dictionary.skills} />
        <ContactSection dictionary={dictionary.contact} />
      </main>
      <Footer dictionary={dictionary.footer} />
    </div>
  );
}
