import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | JALOUR",
  description:
    "Jalour's purpose, mission, values, and visual identity as a premium commercial and administrative real estate company.",
};

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

      <section className="bg-jalour-black py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-jalour text-jalour-white">
              The Creative Concept
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
              JALOUR&rsquo;s visual identity is built around a bold,
              high-contrast design language where humans are cast in shadow
              and the space around them glows. This intentional reversal of
              light highlights not the person, but their presence &mdash;
              making the individual feel larger, deeper, and more iconic.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-jalour text-jalour-white">
              The J
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
              At the heart of JALOUR&rsquo;s identity stands a single,
              iconic element: the letter J. Simple in form, yet rich in
              meaning &mdash; the J becomes a visual symbol of strength,
              clarity, and presence. It introduces the brand not just by
              name, but by attitude.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
