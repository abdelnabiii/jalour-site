import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-b from-jalour-blue-dark via-jalour-black to-jalour-black">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 8px)",
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-32 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">
            Jalour &mdash; 2025
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold uppercase leading-[1.05] tracking-tight text-jalour-white md:text-7xl">
            Beyond Spaces.
            <br />
            Building Focus.
          </h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed tracking-jalour uppercase text-jalour-grey">
            Glow Different. Live Bold. A real estate company shaping
            commercial, residential, and office spaces with bold,
            design-led clarity.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="border border-jalour-blue bg-jalour-blue px-7 py-3 text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:bg-transparent hover:text-jalour-blue"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 px-7 py-3 text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:border-jalour-blue hover:text-jalour-blue"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="border-t border-white/10 bg-jalour-black py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">
            This visual system supports the brand&rsquo;s core values
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Bold Living",
                copy: "Spaces designed to make presence felt, not just seen.",
              },
              {
                title: "Immersive Spaces",
                copy: "Environments that amplify the people within them.",
              },
              {
                title: "Refined Transformation",
                copy: "Architecture and design-led thinking, end to end.",
              },
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

      {/* CTA band */}
      <section className="border-t border-white/10 bg-jalour-blue py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-10">
          <h2 className="max-w-xl font-display text-3xl font-semibold uppercase leading-tight text-jalour-white md:text-4xl">
            You don&rsquo;t just see Jalour. You stand in it.
          </h2>
          <Link
            href="/contact"
            className="border border-jalour-white px-7 py-3 text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:bg-jalour-white hover:text-jalour-blue"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
