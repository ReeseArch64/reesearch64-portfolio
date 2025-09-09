import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoveDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full h-[calc(100dvh-4rem)] flex items-center justify-center">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/30 via-background to-background"></div>
      <div className="container relative mx-auto max-w-7xl px-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Senior AI & Web Developer
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
          Building intelligent systems and automated workflows with 10 years of experience.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#contact">Contact Me</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#skills">My Skills</Link>
          </Button>
        </div>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="#about" aria-label="Scroll to about section">
          <MoveDown className="w-8 h-8 text-muted-foreground animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
