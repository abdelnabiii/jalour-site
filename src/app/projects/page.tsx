import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import ProjectCarousel from "@/components/ProjectCarousel";

export const metadata: Metadata = {
  title: "Projects | JALOUR",
  description: "Commercial projects, residential projects, and office spaces by JALOUR.",
};

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
            A growing portfolio of bold, design-led developments. Select a
            project to see full details.
          </p>
        </div>
      </section>

      <section className="bg-jalour-black py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ProjectCarousel projects={PROJECTS} />
        </div>
      </section>
    </div>
  );
}
