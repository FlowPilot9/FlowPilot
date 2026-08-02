import { z } from "zod";
import { supabase } from "@/lib/supabase";
import type { FormValidationMessages } from "@/i18n";

export function createContactFormSchema(messages: FormValidationMessages) {
  return z.object({
    name: z.string().min(2, messages.nameMin),
    company: z.string().optional(),
    email: z.string().email(messages.emailInvalid),
    message: z.string().min(10, messages.messageMin),
    website: z.string().optional(), // honeypot — trebuie să rămână gol
    consent: z.boolean().refine((v) => v === true, {
      message: messages.consentRequired,
    }),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

export function createWaitlistFormSchema(messages: FormValidationMessages) {
  return z.object({
    email: z.string().email(messages.emailInvalid),
    website: z.string().optional(), // honeypot — trebuie să rămână gol
    consent: z.boolean().refine((v) => v === true, {
      message: messages.consentRequired,
    }),
  });
}

export type WaitlistFormValues = z.infer<ReturnType<typeof createWaitlistFormSchema>>;

/**
 * Trimite un lead din formularul de Contact.
 *
 * Nu se face INSERT direct pe tabelă: RLS blochează complet accesul
 * anon/authenticated pe `contact_leads`. Singura cale e funcția
 * `submit_contact_lead` (SECURITY DEFINER), care validează din nou datele
 * pe server și aplică rate limiting per IP înainte de a scrie în baza de date.
 */
export async function submitContactLead(params: {
  name: string;
  company?: string;
  email: string;
  message: string;
}): Promise<void> {
  const { error } = await supabase.rpc("submit_contact_lead", {
    p_name: params.name,
    p_company: params.company ?? null,
    p_email: params.email,
    p_message: params.message,
  });

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Trimite un lead din formularul de Waitlist (Coming Soon).
 * Vezi comentariul de la submitContactLead — aceeași abordare securizată.
 */
export async function submitWaitlistLead(params: { email: string }): Promise<void> {
  const { error } = await supabase.rpc("submit_waitlist_lead", {
    p_email: params.email,
  });

  if (error) {
    throw new Error(error.message);
  }
}
