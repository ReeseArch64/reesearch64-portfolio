import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AboutSection({ dictionary }: { dictionary: any }) {
  return (
    <section id="about" className="w-full py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">{dictionary.title}</h2>
            <p className="text-muted-foreground">
              {dictionary.p1}
            </p>
            <p className="text-muted-foreground">
              {dictionary.p2}
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Avatar className="w-64 h-64 lg:w-80 lg:h-80 shadow-lg">
              <AvatarImage src="https://avatars.githubusercontent.com/u/195439767?v=4" alt="Developer Portrait" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
}
