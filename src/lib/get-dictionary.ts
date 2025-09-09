import 'server-only';
import type { Locale } from '../../i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We do not want to use dynamic imports hiding potential bugs
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
  pt: () => import('@/dictionaries/pt.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
