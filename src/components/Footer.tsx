import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-jalour-black">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo className="h-6 w-auto" />
            <p className="mt-4 max-w-xs text-xs tracking-jalour uppercase text-jalour-grey">
              Beyond Spaces. Building Focus.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs tracking-jalour uppercase text-jalour-grey">
            <Link href="/" className="hover:text-jalour-blue">Home</Link>
            <Link href="/about" className="hover:text-jalour-blue">About</Link>
            <Link href="/projects" className="hover:text-jalour-blue">Projects</Link>
            <Link href="/contact" className="hover:text-jalour-blue">Contact</Link>
          </div>

          <div className="flex flex-col gap-2 text-xs tracking-jalour uppercase text-jalour-grey">
            <a href="mailto:info@jalour.com" className="hover:text-jalour-blue">
              info@jalour.com
            </a>
            <span>www.jalour.com</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] tracking-jalour uppercase text-jalour-grey/70 md:flex-row md:items-center md:justify-between">
          <span>&copy; {new Date().getFullYear()} JALOUR. All rights reserved.</span>
          <span>Commercial Projects &mdash; Residential Projects &mdash; Office Spaces</span>
        </div>
      </div>
    </footer>
  );
}
