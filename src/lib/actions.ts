'use server';

import { z } from 'zod';

export async function submitContactForm(prevState: any, formData: FormData) {

  const dictionary = prevState.dictionary;

  const contactSchema = z.object({
    name: z.string().min(2, dictionary.validation.name_min),
    email: z.string().email(dictionary.validation.email_invalid),
    message: z.string().min(10, dictionary.validation.message_min),
  });

  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: dictionary.validation.correct_errors,
      success: false,
      dictionary,
    };
  }

  // In a real application, you would send an email or save to a database.
  console.log('Form data submitted:', validatedFields.data);

  return {
    message: dictionary.validation.success_message,
    errors: {},
    success: true,
    dictionary,
  };
}
