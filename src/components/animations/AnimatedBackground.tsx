import { ElectricLines } from "@/components/animations/ElectricLines";
import { GlowParticles } from "@/components/animations/GlowParticles";
import { MouseGlow } from "@/components/animations/MouseGlow";
import { ScanLines } from "@/components/animations/ScanLines";

/**
 * Fixed, full-viewport background stack. Layered from most subtle (grid)
 * to most vivid (scan beam), all behind page content (-z-10) and
 * non-interactive so they never block clicks or hurt readability.
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-background">
      <ElectricLines />
      <GlowParticles />
      <ScanLines />
      <MouseGlow />
      {/* Vignette to keep text readable over the effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_85%)]" />
    </div>
  );
}
