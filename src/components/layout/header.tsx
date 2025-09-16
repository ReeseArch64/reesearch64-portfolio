import Link from 'next/link';
import { Cpu } from 'lucide-react';
import LanguageSwitcher from './language-switcher';
import { Locale } from '../../../i18n-config';
import { ThemeSwitcher } from './theme-switcher';

const navLinks = [
  { href: '#about', key: 'about' },
  { href: '#skills', key: 'skills' },
  { href: '#contact', key: 'contact' },
];

export default function Header({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href={`/?lang=${lang}`} className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">ReeseArch64</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/?lang=${lang}${link.href}`}
                  className="transition-colors hover:text-primary"
                >
                  {dictionary[link.key]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <LanguageSwitcher lang={lang} />
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
