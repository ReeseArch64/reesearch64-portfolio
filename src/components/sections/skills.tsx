import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle } from 'lucide-react';

export default function SkillsSection({ dictionary }: { dictionary: any }) {
  const categories = Object.keys(dictionary.categories);

  return (
    <section id="skills" className="w-full py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">{dictionary.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{dictionary.subtitle}</p>
        <div className="mt-10 flex justify-center">
          <Tabs defaultValue={categories[0]} className="w-full max-w-4xl">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-auto flex-wrap">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>{dictionary.categories[category].title}</TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="mt-6 text-base text-muted-foreground text-left max-w-2xl mx-auto">
                    <p>{dictionary.categories[category].description}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
