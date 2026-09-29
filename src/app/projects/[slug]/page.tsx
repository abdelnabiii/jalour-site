import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";

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
                Apply for Investor Access &rarr;
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

      {/* Why fractional ownership — investment philosophy */}
      {project.investmentModel && (
        <section className="border-b border-white/10 bg-jalour-black py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid gap-16 md:grid-cols-2">
              <div>
                <p className="text-xs tracking-jalour uppercase text-jalour-grey">
                  Why We Built This
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight text-jalour-white md:text-4xl">
                  We Believe Every Serious Investor Deserves a Seat at the Table
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-jalour-grey">
                  For too long, premium commercial real estate was accessible only to institutions
                  and a handful of ultra-high-net-worth individuals. A single unit at NURV could
                  cost upwards of EGP 6 million — placing it out of reach for most serious investors,
                  regardless of their ambition or capability.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
                  We designed the fractional model to change that. By dividing each unit into{" "}
                  {project.investmentModel.sharesPerUnit} equal shares, we make it possible to enter
                  from as little as{" "}
                  <span className="text-jalour-white font-medium">
                    {fmtEGP(project.investmentModel.entryFrom)}
                  </span>{" "}
                  — without compromising on the quality, location, or returns of the asset itself.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
                  Your share is legally yours. The rental income is yours. The appreciation is yours.
                  We simply made it possible for more people to own a piece of something real.
                </p>
              </div>

              <div>
                <p className="text-xs tracking-jalour uppercase text-jalour-grey">
                  This Is Just the Beginning
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight text-jalour-white md:text-4xl">
                  Start Small. Grow With Us.
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-jalour-grey">
                  We are not looking for one-time transactions. We are building a community of investors
                  who grow with Jalour — project by project, share by share.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
                  Start with one share. As rental income begins in Year{" "}
                  {project.investmentModel.rentalIncomeStartYear} and your asset appreciates, reinvest
                  your returns into more shares — or into the next Jalour project. There is no ceiling
                  on where this journey takes you.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
                  The investors who start early and stay consistent are the ones who build real wealth.
                  NURV is your first step.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden bg-white/10">
                  {[
                    { label: "Year 1", note: "Capital appreciation begins" },
                    { label: `Year ${project.investmentModel.rentalIncomeStartYear}`, note: "Rental income distributed" },
                    { label: "Year 5+", note: "Reinvest & compound" },
                  ].map((item) => (
                    <div key={item.label} className="bg-jalour-black p-5">
                      <p className="font-display text-lg font-semibold uppercase text-jalour-blue">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-jalour-grey">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Register interest — gated investor form */}
      <section id="interested" className="bg-jalour-black py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <p className="text-xs tracking-jalour uppercase text-jalour-grey">
                Start Your Journey
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight text-jalour-white md:text-4xl">
                Ready to Invest?
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-jalour-grey">
                Click below to begin your investor application. The process takes under three
                minutes. Qualified applicants get immediate access to the full pricing dashboard
                and payment scenarios.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-jalour-grey">
                Our team will follow up personally within one business day with a tailored
                recommendation based on your profile and budget.
              </p>
              <div className="mt-10 flex flex-col gap-4 max-w-xs">
                <a
                  href="/investor"
                  className="border border-jalour-blue bg-jalour-blue px-7 py-4 text-center text-xs tracking-jalour uppercase text-jalour-white transition-colors hover:bg-transparent hover:text-jalour-blue"
                >
                  Apply for Investor Access &rarr;
                </a>
                <a
                  href="tel:17836"
                  className="border border-white/20 px-7 py-4 text-center text-xs tracking-jalour uppercase text-jalour-grey transition-colors hover:border-jalour-blue hover:text-jalour-white"
                >
                  Call Us: 17836
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {[
                {
                  step: "01",
                  title: "Apply in 3 Minutes",
                  body: "Fill in your investor profile — no ID required, no documents, just a few questions about you and your goals.",
                },
                {
                  step: "02",
                  title: "Instant Dashboard Access",
                  body: "Qualifying investors get immediate access to the full NURV pricing and ROI dashboard, with real numbers for every unit.",
                },
                {
                  step: "03",
                  title: "Personal Follow-Up",
                  body: "A Jalour advisor reaches out within one business day with a tailored unit recommendation and payment plan built around your budget.",
                },
                {
                  step: "04",
                  title: "Secure Your Share",
                  body: "Choose your unit and share count, sign your contract, and begin your journey as a NURV investor.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <span className="font-display text-2xl font-semibold text-jalour-blue/25 shrink-0 leading-none mt-1">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-jalour text-jalour-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-jalour-grey">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
