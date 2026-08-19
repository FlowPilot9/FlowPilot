import { supabase } from "@/lib/supabase";

// Doar funcțiile de trimitere efectivă (ating @supabase/supabase-js).
// Schema de validare (zod) a fost mutată în lib/lead-schemas.ts, care se
// încarcă static odată cu formularul; acest fișier se încarcă doar la
// submit, printr-un import() dinamic în Contact.tsx / ComingSoon.tsx, ca
// să nu tragem clientul Supabase la page load degeaba.

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