"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/projects";

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs tracking-jalour uppercase text-jalour-grey">
          All Projects
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scrollByCard(-1)}
            className="border border-white/20 px-4 py-2 text-xs uppercase text-jalour-white transition-colors hover:border-jalour-blue hover:text-jalour-blue"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => scrollByCard(1)}
            className="border border-white/20 px-4 py-2 text-xs uppercase text-jalour-white transition-colors hover:border-jalour-blue hover:text-jalour-blue"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-px overflow-x-auto scroll-smooth bg-white/10"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project) => {
          const card = (
            <div className="relative flex aspect-[4/5] w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden bg-jalour-black p-8 sm:w-[360px]">
              {project.heroImage && (
                <Image
                  src={project.heroImage}
                  alt={project.name}
                  fill
                  className="absolute inset-0 object-cover opacity-50 transition-opacity group-hover:opacity-70"
                  sizes="360px"
                />
              )}
              <div className="relative z-10">
                <span className="text-xs tracking-jalour uppercase text-jalour-grey">
                  {project.category}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-semibold uppercase tracking-jalour text-jalour-white">
                  {project.name}
                </h3>
                <span className="mt-2 inline-block text-xs tracking-jalour uppercase text-jalour-blue">
                  {project.status}
                </span>
              </div>
            </div>
          );

          if (project.comingSoon) {
            return (
              <div key={project.slug} className="group">
                {card}
              </div>
            );
          }

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group"
            >
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
