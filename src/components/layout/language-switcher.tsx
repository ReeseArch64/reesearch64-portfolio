'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { i18n, Locale } from '../../../i18n-config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', locale);
    return `${pathName}?${params.toString()}`;
  };

  const localeDisplayNames: { [key in Locale]: string } = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {i18n.locales.map((locale) => {
          return (
            <DropdownMenuItem key={locale} asChild>
              <Link href={redirectedPathName(locale)}>
                {localeDisplayNames[locale]}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
