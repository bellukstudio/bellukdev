import { Hero } from "@/components/sections/Hero";
import { Overview } from "@/components/sections/Overview";
import { SkillGrid } from "@/components/sections/SkillGrid";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Overview />
      <SkillGrid />
      <ProjectGrid />
      <ExperienceTimeline />
      <ContactForm />
    </>
  );
}
