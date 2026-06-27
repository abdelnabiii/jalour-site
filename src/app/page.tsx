import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  const featured = PROJECTS.find((p) => p.slug === "nurv");

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <Image
          src="/images/nurv/hero.jpg"
          alt="Nurv by Jalour"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-jalour-black/80 via-jalour-black/70 to-jalour-black" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-10">
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
                image: "/images/nurv/hero.jpg",
              },
              {
                title: "Immersive Spaces",
                copy: "Environments that amplify the people within them.",
                image: "/images/nurv/wellness-lounge.jpg",
              },
              {
                title: "Refined Transformation",
                copy: "Architecture and design-led thinking, end to end.",
                image: "/images/nurv/roof-track.jpg",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-jalour-blue pt-6">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold uppercase tracking-jalour text-jalour-white">
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

      {/* Featured project */}
      {featured && (
        <section className="border-t border-white/10 bg-jalour-black py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="text-xs tracking-jalour uppercase text-jalour-grey">
              Featured Project
            </p>
            <Link
              href={`/projects/${featured.slug}`}
              className="group mt-8 grid gap-8 md:grid-cols-2 md:items-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.heroImage}
                  alt={featured.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div>
                <span className="text-xs tracking-jalour uppercase text-jalour-grey">
                  {featured.category} &mdash; {featured.location}
                </span>
                <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-jalour text-jalour-white md:text-5xl">
                  {featured.name}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-jalour-grey">
                  {featured.summary}
                </p>
                <span className="mt-6 inline-block text-xs tracking-jalour uppercase text-jalour-blue underline-offset-4 group-hover:underline">
                  View Project &rarr;
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Built for business */}
      <section className="border-t border-white/10 bg-jalour-black py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">
            More Than Square Meters
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold uppercase leading-tight text-jalour-white md:text-4xl">
            Real Value
          </h2>
          <div className="mt-10 grid gap-2 sm:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/jalour/desk-call.jpg"
                alt="Built on expertise, designed for business"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jalour-black/80 to-transparent p-6">
                <p className="text-xs tracking-jalour uppercase text-jalour-white">
                  Built on Expertise, Designed for Business
                </p>
              </div>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/jalour/meeting-table.jpg"
                alt="More than square meters, real value"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jalour-black/80 to-transparent p-6">
                <p className="text-xs tracking-jalour uppercase text-jalour-white">
                  A New Class of Workspace Awaits
                </p>
              </div>
            </div>
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
