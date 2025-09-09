import Image from 'next/image';

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
            <Image
              src="https://picsum.photos/400/500"
              alt="Developer Portrait"
              width={400}
              height={500}
              className="rounded-lg shadow-lg aspect-[4/5] object-cover"
              data-ai-hint="developer portrait"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
