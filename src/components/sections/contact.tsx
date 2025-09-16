'use client';

import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn, FadeInStagger } from '../motion/fade-in';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);


const socialLinks = [
  {
    name: 'github',
    href: 'https://github.com',
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: 'linkedin',
    href: 'https://linkedin.com',
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: 'instagram',
    href: 'https://instagram.com',
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: 'email',
    href: 'mailto:your-email@example.com',
    icon: <Mail className="h-5 w-5" />,
  },
  {
    name: 'whatsapp',
    href: 'https://wa.me/YOUR_WHATSAPP_NUMBER',
    icon: <WhatsAppIcon />,
  },
];

export default function ContactSection({ dictionary }: { dictionary: any }) {
  return (
    <section id="contact" className="w-full py-24 sm:py-32 bg-secondary">
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
        <FadeInStagger stagger={0.1} className="mx-auto mt-10 flex max-w-lg justify-center gap-4">
          {socialLinks.map((link, index) => (
             <FadeIn key={index}>
              <Button variant="ghost" size="icon" asChild>
                <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  {link.icon}
                </Link>
              </Button>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
