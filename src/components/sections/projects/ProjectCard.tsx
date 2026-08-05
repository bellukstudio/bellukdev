import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex flex-col overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-surface">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs text-white/30">
            no preview
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-white">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
          {project.description}
        </p>

        {project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-neon-green/30 px-2 py-0.5 font-mono text-[11px] text-neon-green"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-xs text-white/60 hover:text-neon-blue"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-xs text-white/60 hover:text-neon-blue"
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
