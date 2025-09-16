import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { FadeIn, FadeInStagger } from '../motion/fade-in';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function ProjectsSection({ dictionary }: { dictionary: any }) {
  const projects = [
    {
      title: dictionary.p1_title,
      description: dictionary.p1_desc,
      image: getPlaceholderImage('project-1'),
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: dictionary.p2_title,
      description: dictionary.p2_desc,
      image: getPlaceholderImage('project-2'),
      demoUrl: '#',
      codeUrl: '#',
    },
    {
      title: dictionary.p3_title,
      description: dictionary.p3_desc,
      image: getPlaceholderImage('project-3'),
      demoUrl: '#',
      codeUrl: '#',
    },
  ];

  return (
    <section id="projects" className="w-full py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">{dictionary.title}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-lg text-muted-foreground">
              {dictionary.subtitle}
            </p>
          </FadeIn>
        </div>
        <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <FadeIn key={index}>
              <Card className="flex h-full flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <Image 
                  src={project.image.src} 
                  alt={project.title} 
                  width={project.image.width}
                  height={project.image.height}
                  data-ai-hint={project.image.aiHint}
                  className="w-full object-cover" 
                />
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="pt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <div className="flex w-full justify-end gap-2">
                    <Button variant="outline" asChild>
                      <Link href={project.demoUrl}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {dictionary.live_demo}
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href={project.codeUrl}>
                        <Github className="mr-2 h-4 w-4" />
                        {dictionary.view_code}
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
