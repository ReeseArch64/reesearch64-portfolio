'use client';
import Link from 'next/link';
import LanguageSwitcher from './language-switcher';
import { Locale } from '../../../i18n-config';
import { ThemeSwitcher } from './theme-switcher';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '#about', key: 'about' },
  { href: '#contact', key: 'contact' },
];

export default function Header({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href={`/?lang=${lang}`} className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="h-6 w-6"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path
              fill="currentColor"
              d="M128,24a104,104,0,1,0,104,104A104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"
            ></path>
          </svg>
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
    </motion.header>
  );
}
