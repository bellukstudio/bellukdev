import Image from "next/image";
import { getExperiences } from "@/services/experience.service";
import { SectionHeading } from "@/components/ui/SectionHeading";

function formatDate(date: string | null) {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export async function ExperienceTimeline() {
  const { data: experiences } = await getExperiences();

  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="04 · path" title="Experience" />

        {!experiences || experiences.length === 0 ? (
          <p className="font-mono text-sm text-white/40">
            {"> no experience yet. add rows to the `experiences` table."}
          </p>
        ) : (
          <ol className="relative border-l border-neon-blue/20 pl-8">
            {experiences.map((exp) => (
              <li key={exp.id} className="mb-12 last:mb-0">
                <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-neon-blue bg-background shadow-neon-blue" />

                <div className="flex items-center gap-3">
                  {exp.logo && (
                    <div className="relative h-8 w-8 overflow-hidden rounded bg-surface">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="font-display text-lg text-white">
                    {exp.position}{" "}
                    <span className="text-white/50">· {exp.company}</span>
                  </h3>
                </div>

                <p className="mt-1 font-mono text-xs text-neon-green">
                  {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {exp.description}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
