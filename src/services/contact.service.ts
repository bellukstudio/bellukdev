
import { supabase } from "@/lib/supabase";
import type { ContactInput, ServiceResult } from "@/types";

/**
 * Inserts a new contact message using the public anon client.
 *
 * Do not chain .select() after insert because anonymous
 * visitors are intentionally not allowed to read contacts.
 */
export async function sendContactMessage(
  input: ContactInput
): Promise<ServiceResult<null>> {
  const { error } = await supabase.from("contacts").insert({
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
  });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: null, error: null };
}
