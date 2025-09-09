import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/lib/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">O que eu faço</h2>
        <p className="mt-4 text-lg text-muted-foreground">Minhas especialidades para transformar suas ideias em realidade.</p>
        <div className="mt-10 flex justify-center">
          <Tabs defaultValue="Inteligência Artificial e Machine Learning" className="w-full max-w-4xl">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto flex-wrap md:h-10">
              {Object.keys(skills).map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
            <TooltipProvider>
              {Object.entries(skills).map(([category, skillList]) => (
                <TabsContent key={category} value={category}>
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {skillList.map((skill) => (
                      <Tooltip key={skill.name}>
                        <TooltipTrigger asChild>
                           <Badge variant="outline" className="text-lg py-2 px-4 cursor-default border-primary/50 text-primary">
                            {skill.name}
                           </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{skill.proficiency}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </TooltipProvider>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
