import { supabase } from "@/lib/supabase";
import type { Profile, ServiceResult } from "@/types";

function mapProfile(row: {
  id: string;
  name: string;
  title: string;
  overview: string;
  photo: string | null;
  cv_url: string | null;
  github: string | null;
  linkedin: string | null;
  email: string | null;
}): Profile {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    overview: row.overview,
    photo: row.photo,
    cvUrl: row.cv_url,
    github: row.github,
    linkedin: row.linkedin,
    email: row.email,
  };
}

/**
 * Fetches the single portfolio owner profile.
 * Assumes one row in `profiles` (the site owner).
 */
export async function getProfile(): Promise<ServiceResult<Profile>> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    return { data: null, error: error.message };
  }

  if (!data) {
    return { data: null, error: "Profile not found" };
  }

  return { data: mapProfile(data), error: null };
}
