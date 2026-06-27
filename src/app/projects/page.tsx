import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | JALOUR",
  description: "Commercial projects, residential projects, and office spaces by JALOUR.",
};

const PROJECTS = [
  {
    name: "Project One",
    category: "Commercial Projects",
    status: "Coming Soon",
  },
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

      <section className="bg-jalour-black py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden bg-white/10 px-6 md:grid-cols-3 md:px-10">
          {PROJECTS.map((project) => (
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
