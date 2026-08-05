import { Hero } from "@/components/sections/Hero";
import { Overview } from "@/components/sections/Overview";
import { SkillGrid } from "@/components/sections/SkillGrid";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ContactForm } from "@/components/sections/ContactForm";
import { PortfolioPdfButtonWrapper } from "@/components/portfolio-pdf/PortfolioPdfButtonWrapper";

// Revalidate this page's data every 60s (ISR) instead of caching the
// build-time fetch forever. Without this, content added to Supabase
// *after* the last build/deploy never shows up until the next deploy.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <SkillGrid />
      <ProjectGrid />
      <ExperienceTimeline />
      <ContactForm />
      <PortfolioPdfButtonWrapper />
    </>
  );
}