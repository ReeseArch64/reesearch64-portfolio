import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { type Project } from '@/lib/data';
import { ExternalLink } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none bg-secondary border-border hover:border-primary/50">
      <CardHeader className="p-0">
        <Link href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="block relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="object-cover"
            data-ai-hint={project.dataAiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="mb-2 text-xl font-headline">{project.title}</CardTitle>
        <p className="text-muted-foreground">{project.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
         <Link href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          View Project <ExternalLink className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
