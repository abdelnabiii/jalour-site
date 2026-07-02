import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";
import ContactForm from "@/components/ContactForm";

function fmtEGP(n: number) {
  return "EGP " + Math.round(n).toLocaleString("en-EG");
}

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

      {/* Overview */}
      <section className="border-b border-white/10 bg-jalour-black py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 md:px-10">
          <div className="md:col-span-2">
            {project.description.map((paragraph, i) => (
              <p key={i} className="mb-4 text-sm leading-relaxed text-jalour-grey">
                {paragraph}
              </p>
            ))}
            {project.partnerName && (
              <p className="mt-6 text-xs tracking-jalour uppercase text-jalour-grey">
                Developed in partnership with{" "}
                <span className="text-jalour-white">{project.partnerName}</span>
              </p>
            )}

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
              href="/investor"
              className="border border-jalour-blue px-7 py-3 text-center text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:bg-jalour-blue"
            >
              ROI & Payment Calculator &rarr;
            </a>
            <a
              href="#interested"
              className="border border-white/30 px-7 py-3 text-center text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:border-jalour-blue hover:text-jalour-blue"
            >
              Register Interest
            </a>
          </div>
        </div>
      </section>

      {/* Investment model */}
      {project.investmentModel && (
        <section className="border-b border-white/10 bg-jalour-black py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="text-xs tracking-jalour uppercase text-jalour-grey">
              Fractional Ownership
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight text-jalour-white md:text-4xl">
              Own Part of {project.name}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-jalour-grey">
              Ground-floor commercial units divided into {project.investmentModel.sharesPerUnit} equal shares —
              individually priced, professionally managed, income-generating from Year{" "}
              {project.investmentModel.rentalIncomeStartYear}, with capital appreciation from Year{" "}
              {project.investmentModel.appreciationStartYear}.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Entry From",
                  value: fmtEGP(project.investmentModel.entryFrom),
                  note: "per share",
                },
                {
                  label: "Ownership Per Share",
                  value: project.investmentModel.ownershipPerShare,
                  note: `of selected unit (${project.investmentModel.sharesPerUnit} shares total)`,
                },
                {
                  label: "Max Instalment Term",
                  value: `${project.investmentModel.maxTermMonths} months`,
                  note: project.investmentModel.interestFree ? "interest-free" : "",
                },
                {
                  label: "Rental Income Starts",
                  value: `Year ${project.investmentModel.rentalIncomeStartYear}`,
                  note: `Capital appreciation from Year ${project.investmentModel.appreciationStartYear}`,
                },
              ].map((stat) => (
                <div key={stat.label} className="bg-jalour-black p-8">
                  <span className="text-xs tracking-jalour uppercase text-jalour-grey">
                    {stat.label}
                  </span>
                  <p className="mt-3 font-display text-2xl font-semibold uppercase text-jalour-blue">
                    {stat.value}
                  </p>
                  {stat.note && (
                    <p className="mt-1 text-xs text-jalour-grey">{stat.note}</p>
                  )}
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="mt-14">
              <p className="text-xs tracking-jalour uppercase text-jalour-grey">
                How It Works
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: "01",
                    title: "Choose a Unit & Share Count",
                    body: `Pick from ${project.units?.length ?? 11} ground floor units and decide how many shares — 1 to ${project.investmentModel.maxSharesPerUnit} — you'd like to hold in it.`,
                  },
                  {
                    step: "02",
                    title: "Finance at Your Pace",
                    body: `Instalments run up to ${project.investmentModel.maxTermMonths} months, interest-free, calculated on your share investment only — never the full unit value.`,
                  },
                  {
                    step: "03",
                    title: "Receive Your Contract",
                    body: "Your ownership is documented as a registered share interest in the physical unit — held in your name.",
                  },
                  {
                    step: "04",
                    title: "Collect Returns",
                    body: `Capital appreciation applies from Year ${project.investmentModel.appreciationStartYear}. Rental income is distributed from Year ${project.investmentModel.rentalIncomeStartYear} after construction and leasing.`,
                  },
                ].map((item) => (
                  <div key={item.step} className="border-t border-jalour-blue pt-6">
                    <span className="font-display text-3xl font-semibold text-jalour-blue/30">
                      {item.step}
                    </span>
                    <h3 className="mt-3 font-display text-sm font-semibold uppercase tracking-jalour text-jalour-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-jalour-grey">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <a
                href="/investor"
                className="inline-block border border-jalour-blue bg-jalour-blue px-7 py-3 text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:bg-transparent hover:text-jalour-blue"
              >
                Open ROI & Payment Calculator &rarr;
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
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

      {/* Register interest */}
      <section id="interested" className="bg-jalour-black py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">
            Register Interest
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold uppercase leading-tight text-jalour-white md:text-4xl">
            Tell us what you&rsquo;re looking for
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-jalour-grey">
            Our team will reach out with tailored unit recommendations and a
            personalised payment plan within one business day.
          </p>
          <div className="mt-10 max-w-xl">
            <ContactForm projectName={project.name} />
          </div>
        </div>
      </section>
    </div>
  );
}
