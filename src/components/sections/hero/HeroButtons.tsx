import { Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Profile } from "@/types";

export function HeroButtons({ profile }: { profile: Profile }) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {profile.cvUrl && (
        <Button href={profile.cvUrl} target="_blank">
          <Download size={16} /> Download CV
        </Button>
      )}
      {profile.github && (
        <Button href={profile.github} target="_blank" variant="ghost">
          <Github size={16} /> GitHub
        </Button>
      )}
      {profile.linkedin && (
        <Button href={profile.linkedin} target="_blank" variant="ghost">
          <Linkedin size={16} /> LinkedIn
        </Button>
      )}
    </div>
  );
}
