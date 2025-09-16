import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn, FadeInStagger } from '../motion/fade-in';
import { Lightbulb, Server, Bot, Wrench } from 'lucide-react';

export default function SkillsSection({ dictionary }: { dictionary: any }) {

  const skillsData = {
    frontend: {
      title: dictionary.frontend,
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      skills: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    },
    backend: {
      title: dictionary.backend,
      icon: <Server className="h-8 w-8 text-primary" />,
      skills: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    },
    ai_ml: {
      title: dictionary.ai_ml,
      icon: <Bot className="h-8 w-8 text-primary" />,
      skills: ['Genkit', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain'],
    },
    tools: {
      title: dictionary.tools,
      icon: <Wrench className="h-8 w-8 text-primary" />,
      skills: ['Docker', 'Kubernetes', 'Google Cloud', 'AWS', 'Git & CI/CD'],
    },
  };
  
  return (
    <section id="skills" className="w-full py-24 sm:py-32">
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
        <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(skillsData).map((category, index) => (
            <FadeIn key={index}>
              <Card className="h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-col items-center text-center">
                  {category.icon}
                  <CardTitle className="mt-4">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
