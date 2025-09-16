import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ContactSection from '@/components/sections/contact';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale, i18n } from '../../i18n-config';
import { FadeIn } from '@/components/motion/fade-in';
import ProjectsSection from '@/components/sections/projects';
import SkillsSection from '@/components/sections/skills';

type HomePageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};


export default async function Home({ searchParams }: HomePageProps) {
  const lang = (searchParams.lang as Locale) || i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col min-h-dvh">
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="flex-grow">
        <HeroSection dictionary={dictionary.hero} lang={lang}/>
        <FadeIn>
          <AboutSection dictionary={dictionary.about} />
        </FadeIn>
        <FadeIn>
          <ProjectsSection dictionary={dictionary.projects} />
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

export const metadata = {
  title: 'ReeseArch64',
  description: 'ReeseArch64 - AI-powered solutions and automations.',
};
