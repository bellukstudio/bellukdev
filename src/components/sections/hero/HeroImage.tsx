import Image from "next/image";

export function HeroImage({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  if (!src) {
    return (
      <div className="relative h-64 w-64 shrink-0 rounded-full border border-neon-blue/40 bg-surface/40 md:h-80 md:w-80" />
    );
  }

  return (
    <div className="relative h-64 w-64 shrink-0 md:h-80 md:w-80">
      <div className="absolute inset-0 rounded-full bg-neon-blue/20 blur-2xl" />
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-neon-blue/60 shadow-neon-blue">
        <Image src={src} alt={alt} fill className="object-cover" priority />
      </div>
    </div>
  );
}
