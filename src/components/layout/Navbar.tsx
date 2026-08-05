import Link from "next/link";
import { SITE } from "@/constants/site";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-neon-blue/10 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#"
          className="font-display text-lg text-neon-blue tracking-wider"
        >
          &lt;dev/&gt;
        </Link>
        <ul className="hidden gap-8 md:flex">
          {SITE.navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-sm text-white/70 transition-colors hover:text-neon-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
