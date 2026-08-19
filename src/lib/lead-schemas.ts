import { z } from "zod";
import type { FormValidationMessages } from "@/i18n";

// Doar validare (zod) — fără import din supabase.ts. Se încarcă static,
// odată cu formularul, ca zodResolver să aibă schema disponibilă imediat.
// Funcțiile de trimitere efectivă (care ating @supabase/supabase-js) stau
// separat în lib/leads.ts și se încarcă doar la submit, prin import()
// dinamic — vezi Contact.tsx / ComingSoon.tsx.

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
    consent: z.boolean().refine((v) => v === true, {
      message: messages.consentRequired,
    }),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;
