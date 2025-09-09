
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import SkillsSection from '@/components/sections/skills';
import ContactSection from '@/components/sections/contact';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '../../../i18n-config';
import { FadeIn } from '@/components/motion/fade-in';

type HomePageProps = {
  params: { lang: Locale };
};


export default async function Home({ params: { lang } }: HomePageProps) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col min-h-dvh">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow">
        <HeroSection dictionary={dictionary.hero} />
        <FadeIn>
          <AboutSection dictionary={dictionary.about} />
        </FadeIn>
        <FadeIn>
          <SkillsSection dictionary={dictionary.skills} />
        </FadeIn>
        <FadeIn>
          <ContactSection dictionary={dictionary.contact} />
        </FadeIn>
      </main>
      <Footer dictionary={dictionary.footer} />
    </div>
  );
}
