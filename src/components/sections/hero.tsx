'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveDown } from 'lucide-react';
import { FadeInStagger, FadeIn } from '@/components/motion/fade-in';
import { motion } from 'framer-motion';
import { Locale } from '../../../i18n-config';

export default function HeroSection({ dictionary, lang }: { dictionary: any, lang: Locale }) {
  return (
    <section
      id="home"
      className="relative w-full h-[calc(100dvh-4rem)] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/30 via-background to-background"></div>
      <div className="container relative mx-auto max-w-7xl px-4 text-center">
        <FadeInStagger className="flex flex-col items-center text-center">
          <FadeIn>
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {dictionary.title}
            </h1>
          </FadeIn>
          <FadeIn>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              {dictionary.subtitle}
            </p>
          </FadeIn>
          <FadeIn>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href={`/?lang=${lang}#contact`}>{dictionary.contact}</Link>
              </Button>
            </div>
          </FadeIn>
        </FadeInStagger>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Link href={`/?lang=${lang}#about`} aria-label="Scroll to about section">
            <MoveDown className="w-8 h-8 text-muted-foreground" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
