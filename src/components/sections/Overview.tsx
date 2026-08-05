import { getProfile } from "@/services/profile.service";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function Overview() {
  const { data: profile } = await getProfile();

  if (!profile) return null;

  return (
    <section id="overview" className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="01 · about" title="Overview" />
        <p className="text-lg leading-relaxed text-white/70">
          {profile.overview}
        </p>
      </div>
    </section>
  );
}
