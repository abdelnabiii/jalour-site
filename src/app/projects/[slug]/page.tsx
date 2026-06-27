import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return PROJECTS.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} | JALOUR`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || project.comingSoon) {
    notFound();
  }

  return (
    <div>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden border-b border-white/10">
        {project.heroImage && (
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-jalour-black via-jalour-black/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
          <Link
            href="/projects"
            className="text-xs tracking-jalour uppercase text-jalour-grey hover:text-jalour-blue"
          >
            &larr; All Projects
          </Link>
          <p className="mt-6 text-xs tracking-jalour uppercase text-jalour-grey">
            {project.category} &mdash; {project.location}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold uppercase leading-tight text-jalour-white md:text-6xl">
            {project.name}
          </h1>
          {project.tagline && (
            <p className="mt-3 text-sm italic tracking-wide text-jalour-grey">
              {project.tagline}
            </p>
          )}
          <span className="mt-4 inline-block text-xs tracking-jalour uppercase text-jalour-blue">
            {project.status}
          </span>
        </div>
      </section>

      <section className="border-b border-white/10 bg-jalour-black py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 md:px-10">
          <div className="md:col-span-2">
            {project.description.map((paragraph, i) => (
              <p
                key={i}
                className="mb-4 text-sm leading-relaxed text-jalour-grey"
              >
                {paragraph}
              </p>
            ))}

            {project.floors && (
              <div className="mt-10 grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2 md:grid-cols-4">
                {project.floors.map((item) => (
                  <div key={item.floor} className="bg-jalour-black p-6">
                    <span className="text-xs tracking-jalour uppercase text-jalour-blue">
                      {item.floor}
                    </span>
                    <p className="mt-2 font-display text-sm font-semibold uppercase tracking-jalour text-jalour-white">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 md:col-start-3">
            {project.brochureUrl && (
              <a
                href={project.brochureUrl}
                download
                className="border border-jalour-blue bg-jalour-blue px-7 py-3 text-center text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:bg-transparent hover:text-jalour-blue"
              >
                Download Brochure
              </a>
            )}
            <a
              href="#interested"
              className="border border-white/30 px-7 py-3 text-center text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:border-jalour-blue hover:text-jalour-blue"
            >
              I&rsquo;m Interested
            </a>
          </div>
        </div>
      </section>

      {project.gallery.length > 1 && (
        <section className="border-b border-white/10 bg-jalour-black py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="mb-10 text-xs tracking-jalour uppercase text-jalour-grey">
              Gallery
            </p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {project.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="interested" className="bg-jalour-black py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">
            Interested in {project.name}?
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold uppercase leading-tight text-jalour-white md:text-4xl">
            Tell us a bit about what you&rsquo;re looking for
          </h2>
          <div className="mt-10 max-w-xl">
            <ContactForm projectName={project.name} />
          </div>
        </div>
      </section>
    </div>
  );
}
