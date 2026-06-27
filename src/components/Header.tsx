import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-jalour-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-jalour text-jalour-white"
        >
          JALOUR<span className="align-super text-xs">®</span>
        </Link>
        <nav className="hidden items-center gap-10 text-xs tracking-jalour uppercase text-jalour-grey md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-jalour-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden border border-jalour-blue px-5 py-2 text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:bg-jalour-blue md:inline-block"
        >
          Get in Touch
        </Link>
      </div>
    </header>
  );
}
