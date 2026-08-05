import { getSkills } from "@/services/skill.service";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export async function SkillGrid() {
  const { data: skills } = await getSkills();

  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="02 · stack" title="Skills" />
        {!skills || skills.length === 0 ? (
          <p className="font-mono text-sm text-white/40">
            {"> no skills yet. add rows to the `skills` table."}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {skills.map((skill) => (
              <Card
                key={skill.id}
                className="flex flex-col items-center gap-3 p-6 text-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="h-10 w-10 object-contain"
                  loading="lazy"
                />
                <span className="font-mono text-sm text-white/80">
                  {skill.name}
                </span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
