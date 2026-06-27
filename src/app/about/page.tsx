import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | JALOUR",
  description: "JALOUR's visual identity, creative concept, and core values.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-white/10 bg-jalour-black py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">About</p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold uppercase leading-tight text-jalour-white md:text-6xl">
            Jalour Visual Identity
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-jalour-grey">
            JALOUR&rsquo;s identity is built around a bold, high-contrast
            design language where humans are cast in shadow and the space
            around them glows. This intentional reversal of light highlights
            not the person, but their presence &mdash; making the individual
            feel larger, deeper, and more iconic.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-jalour-black py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-jalour text-jalour-white">
              The Creative Concept
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
              The glow is not decoration; it is a declaration of confidence,
              clarity, and design-led thinking. By placing light behind the
              subject, JALOUR creates a silhouette effect that feels
              cinematic, architectural, and powerful. It reflects a belief
              that great spaces don&rsquo;t just frame people &mdash; they
              amplify them.
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

      <section className="bg-jalour-black py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">
            This visual system supports the brand&rsquo;s core values
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              { title: "Glow Different", copy: "Standing apart through bold, confident design." },
              { title: "Live Bold", copy: "Architecture and spaces that feel larger than life." },
              { title: "Building Focus", copy: "Refined transformation, beyond just spaces." },
            ].map((item) => (
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
    </div>
  );
}
