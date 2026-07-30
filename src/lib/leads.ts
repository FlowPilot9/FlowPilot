import { z } from "zod";
import { supabase } from "@/lib/supabase";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional(), // honeypot — trebuie să rămână gol
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const waitlistFormSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  website: z.string().optional(), // honeypot — trebuie să rămână gol
});

export type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

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
