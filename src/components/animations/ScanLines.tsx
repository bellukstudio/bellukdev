export function ScanLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Static fine scanline texture, like a CRT/terminal */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Single traveling scan beam */}
      <div className="absolute inset-x-0 h-24 animate-scanline bg-gradient-to-b from-transparent via-neon-blue/10 to-transparent" />
    </div>
  );
}
