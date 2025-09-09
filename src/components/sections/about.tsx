import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
            <p className="text-muted-foreground">
              For over a decade, I've been immersed in the world of software development, specializing in creating intelligent, automated, and robust web systems. My journey has taken me from building scalable backend architectures to pioneering AI-driven solutions that solve real-world problems.
            </p>
            <p className="text-muted-foreground">
              My expertise lies at the intersection of Artificial Intelligence, workflow automation using tools like n8n, and full-stack web development. I'm passionate about writing clean, efficient code and architecting systems that are not only powerful but also maintainable and a joy to work with. I thrive on tackling complex challenges and turning innovative ideas into tangible, high-impact products.
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
