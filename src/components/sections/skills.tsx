import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { skills } from '@/lib/data';
import { CheckCircle } from 'lucide-react';

export default function SkillsSection() {
  const categories = Object.keys(skills) as (keyof typeof skills)[];

  return (
    <section id="skills" className="w-full py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">What I Do</h2>
        <p className="mt-4 text-lg text-muted-foreground">My specialties to bring your ideas to life.</p>
        <div className="mt-10 flex justify-center">
          <Tabs defaultValue={categories[0]} className="w-full max-w-4xl">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-auto flex-wrap">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="mt-6 text-base text-muted-foreground text-left max-w-2xl mx-auto">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(skills[category]).map((skill) => (
                            <li key={skill.name} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <div>
                                    <span className="font-semibold">{skill.name}</span>
                                    <p className="text-sm text-muted-foreground">{skill.proficiency}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
