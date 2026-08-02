import { z } from "zod";
import { supabase } from "@/lib/supabase";
import type { FormValidationMessages } from "@/i18n";

export function createContactFormSchema(messages: FormValidationMessages) {
  return z.object({
    name: z.string().min(2, messages.nameMin),
    company: z.string().optional(),
    email: z.string().email(messages.emailInvalid),
    message: z.string().min(10, messages.messageMin),
    // Honeypot — must stay empty. Deliberately obscure name/id: common
    // honeypot names like "website" or "url" get picked up by Chrome's
    // autofill heuristics on multi-field forms (esp. once a form also has
    // name/company), silently filling this hidden field and causing real
    // submissions to be dropped. An unrecognizable name avoids that.
    hpToken: z.string().optional(),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

export function createWaitlistFormSchema(messages: FormValidationMessages) {
  return z.object({
    email: z.string().email(messages.emailInvalid),
    hpToken: z.string().optional(), // honeypot — must stay empty
  });
}

export type WaitlistFormValues = z.infer<ReturnType<typeof createWaitlistFormSchema>>;

type LeadType = "contact" | "waitlist";

interface SubmitLeadParams {
  type: LeadType;
  email: string;
  name?: string;
  company?: string;
  message?: string;
}

/**
 * Inserts a lead into Supabase. Row Level Security only allows INSERT
 * from anonymous clients, so this is safe to call from the browser.
 */
export async function submitLead(params: SubmitLeadParams): Promise<void> {
  const { error } = await supabase.from("leads").insert({
    type: params.type,
    email: params.email,
    name: params.name ?? null,
    company: params.company ?? null,
    message: params.message ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
