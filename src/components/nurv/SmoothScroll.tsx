"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Smooth scrolling for scroll-driven scenes.
 *
 * Lenis is driven exclusively through GSAP's ticker — there is no second
 * requestAnimationFrame loop — and every Lenis scroll is forwarded to
 * ScrollTrigger.update so pinned/scrubbed triggers stay in lockstep.
 *
 * Under prefers-reduced-motion it does nothing at all: native scrolling is
 * left untouched, which also preserves keyboard scroll, anchor jumps and the
 * browser's own accessibility behaviour. The effect tears everything down on
 * unmount, so it is safe under React StrictMode's double-invoke in dev and on
 * route changes.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // Leave touch to the platform: native momentum scroll on mobile is
      // both smoother and more accessible than a JS re-implementation.
      syncTouch: false,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // One ticker, one clock. GSAP already runs a rAF; Lenis rides it.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
