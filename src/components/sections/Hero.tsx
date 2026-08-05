import { getProfile } from "@/services/profile.service";
import { HeroContent } from "@/components/sections/hero/HeroContent";
import { HeroImage } from "@/components/sections/hero/HeroImage";
import { HeroButtons } from "@/components/sections/hero/HeroButtons";
import { ScrollIndicator } from "@/components/sections/hero/ScrollIndicator";

export async function Hero() {
  const { data: profile, error } = await getProfile();

  if (error || !profile) {
    return (
      <section className="relative flex min-h-screen items-center justify-center px-6">
        <p className="font-mono text-neon-green/70">
          {"> profile not found. seed the `profiles` table in Supabase."}
        </p>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:justify-between">
        <div>
          <HeroContent profile={profile} />
          <HeroButtons profile={profile} />
        </div>
        <HeroImage src={profile.photo} alt={profile.name} />
      </div>
      <ScrollIndicator />
    </section>
  );
}
