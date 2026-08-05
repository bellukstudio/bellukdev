import { supabase } from "@/lib/supabase";
import type { Skill, ServiceResult } from "@/types";

/** Fetches all skills for the skill grid. */
export async function getSkills(): Promise<ServiceResult<Skill[]>> {
  const { data, error } = await supabase.from("skills").select("*").order("name");

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
