import type { Profile } from "@/types";

export function HeroContent({ profile }: { profile: Profile }) {
  return (
    <div className="max-w-xl">
      <p className="font-mono text-sm text-neon-green mb-3">
        {"> whoami"}
      </p>
      <h1 className="font-display text-4xl md:text-6xl text-white leading-tight">
        {profile.name}
      </h1>
      <p className="mt-3 font-mono text-lg text-neon-blue">{profile.title}</p>
      <p className="mt-6 text-white/60 leading-relaxed">{profile.overview}</p>
    </div>
  );
}
