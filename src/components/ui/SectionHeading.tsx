export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-green mb-2">
        {`// ${eyebrow}`}
      </p>
      <h2 className="font-display text-3xl md:text-4xl text-white">
        {title}
      </h2>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-neon-blue to-transparent" />
    </div>
  );
}
