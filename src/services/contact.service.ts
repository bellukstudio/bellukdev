import { supabase } from "@/lib/supabase";
import type { ContactInput, ServiceResult } from "@/types";

/**
 * Inserts a new contact message. Relies on an RLS policy that allows
 * public INSERT (but not SELECT/UPDATE/DELETE) on `contacts`.
 */
export async function sendContactMessage(
  input: ContactInput
): Promise<ServiceResult<{ id: string }>> {
  const { data, error } = await supabase
    .from("contacts")
    .insert({
      name: input.name,
      email: input.email,
      message: input.message,
    })
    .select("id")
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
