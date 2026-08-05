import { getProfile } from "@/services/profile.service";
import { getSkills } from "@/services/skill.service";
import { getProjects } from "@/services/project.service";
import { getExperiences } from "@/services/experience.service";
import { DownloadPortfolioButton } from "@/components/portfolio-pdf/DownloadPortfolioButton";

export async function PortfolioPdfButtonWrapper() {
  const [{ data: profile }, { data: skills }, { data: projects }, { data: experiences }] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getProjects(),
      getExperiences(),
    ]);

  // No profile yet → nothing meaningful to put in a PDF.
  if (!profile) return null;

  return (
    <DownloadPortfolioButton
      profile={profile}
      skills={skills ?? []}
      projects={projects ?? []}
      experiences={experiences ?? []}
    />
  );
}