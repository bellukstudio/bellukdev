import { supabase } from "@/lib/supabase";
import type { Project, ServiceResult } from "@/types";

function mapProject(row: {
  id: string;
  title: string;
  description: string;
  image: string | null;
  github: string | null;
  demo: string | null;
  tech_stack: string[] | null;
  featured: boolean;
}): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image,
    github: row.github,
    demo: row.demo,
    techStack: row.tech_stack ?? [],
    featured: row.featured,
  };
}

/** Fetches all projects, featured first. */
export async function getProjects(): Promise<ServiceResult<Project[]>> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("featured", { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data.map(mapProject), error: null };
}

/** Fetches only featured projects, for a condensed homepage view. */
export async function getFeaturedProjects(): Promise<ServiceResult<Project[]>> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true);

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: data.map(mapProject), error: null };
}
