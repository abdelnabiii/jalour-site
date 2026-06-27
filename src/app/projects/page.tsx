import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | JALOUR",
  description: "Commercial projects, residential projects, and office spaces by JALOUR.",
};

const UPCOMING_PROJECTS = [
  {
    name: "Project Two",
    category: "Residential Projects",
    status: "Coming Soon",
  },
  {
    name: "Project Three",
    category: "Office Spaces",
    status: "Coming Soon",
  },
];

const NURV_FLOORS = [
  { floor: "Ground Floor", label: "The Dining Experience" },
  { floor: "First Floor", label: "The Lifestyle Floor" },
  { floor: "Second Floor", label: "The Wellness Arena" },
  { floor: "Roof", label: "The On-Air Track" },
];

export default function ProjectsPage() {
  return (
    <div>
      <section className="border-b border-white/10 bg-jalour-black py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-xs tracking-jalour uppercase text-jalour-grey">Projects</p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold uppercase leading-tight text-jalour-white md:text-6xl">
            Commercial. Residential. Office Spaces.
          </h1>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-jalour-grey">
            A growing portfolio of bold, design-led developments. Details for
            each project will be published here as they launch.
          </p>
        </div>
      </section>

      {/* Nurv featured project */}
      <section className="border-b border-white/10 bg-jalour-black py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-jalour-blue pt-6">
            <div>
              <span className="text-xs tracking-jalour uppercase text-jalour-grey">
                Commercial Projects &mdash; El Shorouk, Cairo
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-jalour text-jalour-white md:text-5xl">
                Nurv
              </h2>
            </div>
            <span className="text-xs tracking-jalour uppercase text-jalour-blue">
              Opening 2026
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-jalour-grey">
            A place that inspires, a place that belongs. Nurv is an upscale,
            trendy, and vibrant lifestyle destination developed by Jalour in
            partnership with Meadis Group &mdash; a new way to experience El
            Shorouk through a curated mix of high-end restaurants, retail,
            wellness, and culture.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-jalour-grey">
            Nurv caters to a discerning clientele aged 21 and up &mdash;
            professionals, families, and lifestyle enthusiasts who value
            quality, style, and convenience, seeking more than just
            shopping.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2 md:grid-cols-4">
            {NURV_FLOORS.map((item) => (
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
        </div>
      </section>

      {/* Other / upcoming projects */}
      <section className="bg-jalour-black py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden bg-white/10 px-6 md:grid-cols-3 md:px-10">
          {UPCOMING_PROJECTS.map((project) => (
            <div
              key={project.name}
              className="flex aspect-[4/5] flex-col justify-between bg-jalour-black p-8"
            >
              <span className="text-xs tracking-jalour uppercase text-jalour-grey">
                {project.category}
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold uppercase tracking-jalour text-jalour-white">
                  {project.name}
                </h2>
                <span className="mt-2 inline-block text-xs tracking-jalour uppercase text-jalour-blue">
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
