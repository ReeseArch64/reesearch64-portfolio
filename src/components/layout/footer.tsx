import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} AI Hub Portfolio. All Rights Reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
