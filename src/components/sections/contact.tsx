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

function SubmitButton({ dictionary }: { dictionary: any }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {dictionary.sending}</> : dictionary.send}
    </Button>
  );
}

export default function ContactSection({ dictionary }: { dictionary: any }) {
  const initialState = { message: null, errors: {}, success: false, dictionary };
  const [state, dispatch] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(state.success && state.message) {
      toast({
        title: dictionary.toast.success_title,
        description: state.message,
      });
      formRef.current?.reset();
    } else if (!state.success && state.message) {
      toast({
        variant: "destructive",
        title: dictionary.toast.error_title,
        description: state.message,
      });
    }
  }, [state, toast, dictionary]);

  return (
    <section id="contact" className="w-full py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dictionary.subtitle}
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-lg">
          <form ref={formRef} action={dispatch} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-base">{dictionary.name}</Label>
              <Input id="name" name="name" type="text" placeholder={dictionary.name_placeholder} required className="mt-2 text-base" />
              {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-base">{dictionary.email}</Label>
              <Input id="email" name="email" type="email" placeholder={dictionary.email_placeholder} required className="mt-2 text-base"/>
              {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="message" className="text-base">{dictionary.message}</Label>
              <Textarea id="message" name="message" required rows={5} placeholder={dictionary.message_placeholder} className="mt-2 text-base"/>
              {state.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message}</p>}
            </div>
            <div>
              <SubmitButton dictionary={dictionary.submit_button} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
