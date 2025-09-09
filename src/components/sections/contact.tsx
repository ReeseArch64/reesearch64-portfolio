'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : 'Send Message'}
    </Button>
  );
}

export default function ContactSection() {
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Message Sent!",
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <section id="contact" className="w-full py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Contact Me</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind or want to connect? Drop me a line.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-lg">
          <form ref={formRef} action={dispatch} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-base">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your Name" required className="mt-2 text-base" />
              {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required className="mt-2 text-base"/>
              {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="message" className="text-base">Message</Label>
              <Textarea id="message" name="message" required rows={5} placeholder="Let's build something amazing together." className="mt-2 text-base"/>
              {state.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message}</p>}
            </div>
            <div>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
