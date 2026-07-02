import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | JALOUR",
  description:
    "Jalour's purpose, mission, values, and visual identity as a premium commercial and administrative real estate company.",
};

const PARTNERS = [
  {
    name: "Meadis Group",
    role: "Development Partner",
    description:
      "Strategic co-developer on Nurv, El Shorouk — bringing market expertise and operational depth to Jalour's first landmark commercial destination.",
    // AR: [partner description in Arabic — to be supplied]
  },
  // Add additional partners here
];

const PARTNER_TESTIMONIALS: {
  quote: string;
  author: string;
  title: string;
  company: string;
}[] = [
  // Testimonials from partners will be added here.
  // Structure: { quote: "...", author: "Name", title: "Title", company: "Company" }
];

const VALUES = [
  {
    title: "Excellence in Service",
    copy: "We deliver beyond expectations, making business operations smoother, more efficient, and more enjoyable for tenants.",
  },
  {
    title: "Innovation with Purpose",
    copy: "We continuously enhance our spaces to meet the evolving needs of businesses in dynamic markets.",
  },
  {
    title: "Empowerment",
    copy: "We create environments that let clients focus on their core business, free from workspace distractions.",
  },
  {
    title: "Integrity and Trust",
    copy: "Honesty, transparency, and reliability in every business dealing and interaction.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-white/10 bg-jalour-black py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">About</p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold uppercase leading-tight text-jalour-white md:text-6xl">
            Beyond Spaces. Building Focus.
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-jalour-grey">
            We believe businesses deserve more than just an address. They
            deserve to be freed from uncalled-for distractions and provided
            with exceptional spaces, so they can thrive and focus on what
            truly drives them forward.
          </p>
        </div>
      </section>

      <section className="relative aspect-[16/7] w-full overflow-hidden border-b border-white/10">
        <Image
          src="/images/nurv/day-night.jpg"
          alt="Jalour development"
          fill
          className="object-cover"
        />
      </section>

      <section className="border-b border-white/10 bg-jalour-black py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-jalour text-jalour-white">
              Mission
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
              We create exceptional environments through personalized care,
              cutting-edge innovation, and unparalleled service, allowing
              businesses to thrive, focus, and grow in spaces designed for
              their highest potential.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-jalour text-jalour-white">
              Vision
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
              To be the leading force in transforming commercial and
              administrative real estate, setting new standards in
              workspace experiences, and empowering businesses to grow and
              innovate in world-class environments.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-jalour-black py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">
            Brand Values
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {VALUES.map((item) => (
              <div key={item.title} className="border-t border-jalour-blue pt-6">
                <h3 className="font-display text-xl font-semibold uppercase tracking-jalour text-jalour-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-jalour-grey">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-b border-white/10 bg-jalour-black py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">
            Partners
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight text-jalour-white md:text-4xl">
            Built Together
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-jalour-grey">
            Jalour develops projects in partnership with best-in-class operators
            and investors who share our commitment to quality and impact.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="border border-white/10 p-8 hover:border-jalour-blue/40 transition-colors"
              >
                <span className="text-xs tracking-jalour uppercase text-jalour-blue">
                  {partner.role}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold uppercase tracking-jalour text-jalour-white">
                  {partner.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-jalour-grey">
                  {partner.description}
                </p>
              </div>
            ))}
            {/* Placeholder for additional partners */}
            <div className="border border-dashed border-white/10 p-8 flex items-center justify-center">
              <p className="text-center text-xs tracking-jalour uppercase text-jalour-grey/40">
                More partners to be announced
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Testimonials */}
      {PARTNER_TESTIMONIALS.length > 0 ? (
        <section className="bg-jalour-black py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="text-xs tracking-jalour uppercase text-jalour-grey">
              From Our Partners
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {PARTNER_TESTIMONIALS.map((t) => (
                <blockquote
                  key={t.author}
                  className="border-l-2 border-jalour-blue pl-6"
                >
                  <p className="text-sm leading-relaxed text-jalour-grey">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4">
                    <span className="text-xs tracking-jalour uppercase text-jalour-white">
                      {t.author}
                    </span>
                    <span className="ml-2 text-xs text-jalour-grey">
                      — {t.title}, {t.company}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-jalour-black py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="text-xs tracking-jalour uppercase text-jalour-grey">
              From Our Partners
            </p>
            <div className="mt-8 border border-dashed border-white/10 p-12 text-center">
              <p className="text-xs tracking-jalour uppercase text-jalour-grey/40">
                Partner testimonials coming soon
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
