"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SmoothScroll from "@/components/nurv/SmoothScroll";
import ScrollVideo from "@/components/nurv/ScrollVideo";

/**
 * The front-page opening: a pure, scroll-scrubbed film of Nurv building itself
 * from blueprint to finished landmark. Nothing is drawn over the frame once it
 * has loaded. The existing jalour.com homepage follows directly below it.
 *
 * Under prefers-reduced-motion the scrub is dropped for a static first frame
 * and normal document scrolling.
 */

const VIDEO_SRC = "/media/nurv-construction-reveal.mp4";
const FIRST_FRAME = "/images/nurv/first-frame.jpg";

export default function HomeIntro() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <>
      <SmoothScroll />

      {reduced ? (
        <section
          className="relative h-[100svh] w-full overflow-hidden bg-[#0B0A0B]"
          aria-label="Nurv, El Shorouk — the site as a blueprint"
        >
          <Image
            src={FIRST_FRAME}
            alt="Nurv, El Shorouk — the site drawn as an architectural blueprint"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </section>
      ) : (
        <ScrollVideo
          src={VIDEO_SRC}
          poster={FIRST_FRAME}
          heightVh={460}
          label="Nurv building itself from blueprint to landmark, scrubbed by scroll"
        />
      )}
    </>
  );
}
