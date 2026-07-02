import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SOCIAL_LINKS } from "@/lib/social";

export const metadata: Metadata = {
  title: "Contact | JALOUR",
  description: "Get in touch with JALOUR.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-white/10 bg-jalour-black py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">Contact</p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold uppercase leading-tight text-jalour-white md:text-6xl">
            Start a Conversation
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-jalour-grey">
            Tell us about your project, space, or partnership idea. We
            usually respond within one business day.
          </p>
        </div>
      </section>

      <section className="bg-jalour-black py-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:px-10">
          <ContactForm />

          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-display text-xl font-semibold uppercase tracking-jalour text-jalour-white">
                Hotline
              </h2>
              <a
                href="tel:17836"
                className="mt-3 inline-block text-sm text-jalour-grey hover:text-jalour-blue"
              >
                17836
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold uppercase tracking-jalour text-jalour-white">
                Email
              </h2>
              <a
                href="mailto:info@jalour.com"
                className="mt-3 inline-block text-sm text-jalour-grey hover:text-jalour-blue"
              >
                info@jalour.com
              </a>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold uppercase tracking-jalour text-jalour-white">
                Focus Areas
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-jalour-grey">
                Commercial Projects &mdash; Residential Projects &mdash;
                Office Spaces
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold uppercase tracking-jalour text-jalour-white">
                Web
              </h2>
              <p className="mt-3 text-sm text-jalour-grey">www.jalour.com</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold uppercase tracking-jalour text-jalour-white">
                Follow Us
              </h2>
              <div className="mt-3 flex gap-6">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm tracking-jalour uppercase text-jalour-grey hover:text-jalour-blue"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
