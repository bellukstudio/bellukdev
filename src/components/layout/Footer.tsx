export function Footer() {
  return (
    <footer className="border-t border-neon-blue/10 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center font-mono text-xs text-white/40">
        <p>
          {`> built with Next.js, Supabase & a lot of neon `}
          <span className="text-neon-green">— {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
}
