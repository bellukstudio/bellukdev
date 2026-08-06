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

type DescriptionBlock = {
  heading: string | null;
  lines: string[];
};

/**
 * Parse deskripsi menjadi blok-blok.
 * Baris yang diawali `#` dianggap sebagai heading baru,
 * baris-baris setelahnya (sebelum heading berikutnya) jadi list item di bawah heading itu.
 * Baris tanpa heading di awal (sebelum ada `#` pertama) dianggap paragraf biasa.
 */
function parseDescription(description: string): DescriptionBlock[] {
  const lines = description
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const blocks: DescriptionBlock[] = [];
  let current: DescriptionBlock | null = null;

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,6}\s*(.+)$/);

    if (headingMatch) {
      // mulai blok baru setiap ketemu heading
      current = { heading: headingMatch[1].replace(/:$/, "").trim(), lines: [] };
      blocks.push(current);
    } else if (current) {
      current.lines.push(line);
    } else {
      // belum ada heading sama sekali -> paragraf polos
      current = { heading: null, lines: [line] };
      blocks.push(current);
    }
  }

  return blocks;
}

function ExperienceDescription({ description }: { description: string }) {
  const blocks = parseDescription(description);

  return (
    <div className="mt-3 space-y-4">
      {blocks.map((block, i) => (
        <div key={i}>
          {block.heading && (
            <h4 className="font-mono text-sm font-semibold text-white/80">
              {block.heading}
            </h4>
          )}
          {block.lines.length > 1 ? (
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-white/60">
              {block.lines.map((line, j) => (
                <li key={j}>{line}</li>
              ))}
            </ul>
          ) : (
            <p
              className={
                block.heading
                  ? "mt-1 text-sm leading-relaxed text-white/60"
                  : "text-sm leading-relaxed text-white/60"
              }
            >
              {block.lines[0]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
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
                <ExperienceDescription description={exp.description} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
