import { getProjects } from "@/services/project.service";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";

export async function ProjectGrid() {
  const { data: projects } = await getProjects();

  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="03 · work" title="Projects" />
        {!projects || projects.length === 0 ? (
          <p className="font-mono text-sm text-white/40">
            {"> no projects yet. add rows to the `projects` table."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
