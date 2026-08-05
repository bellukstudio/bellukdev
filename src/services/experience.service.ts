import { supabase } from "@/lib/supabase";
import type { Experience, ServiceResult } from "@/types";

function mapExperience(row: {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
  logo: string | null;
}): Experience {
  return {
    id: row.id,
    company: row.company,
    position: row.position,
    startDate: row.start_date,
    endDate: row.end_date,
    description: row.description,
    logo: row.logo,
  };
}

/** Fetches work experience, most recent first. */
export async function getExperiences(): Promise<ServiceResult<Experience[]>> {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data.map(mapExperience), error: null };
}
