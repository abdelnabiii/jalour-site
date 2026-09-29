"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollVideoProps = {
  /** Path to the video, e.g. /media/clip.mp4 */
  src: string;
  /** Poster shown while the video loads and as the first painted frame. */
  poster?: string;
  /** Total scroll distance the scrub occupies, in viewport heights. */
  heightVh?: number;
  /** Optional overlay content, rendered inside the pinned viewport. */
  children?: ReactNode;
  /**
   * Called every animation frame with the raw scroll progress (0..1) of the
   * scene. Imperative by design — update DOM through refs here, never React
   * state, so scrolling never triggers a re-render.
   */
  onProgress?: (progress: number) => void;
  className?: string;
  /** Accessible label for the scene region. */
  label?: string;
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/**
 * A native <video> scrubbed by scroll position, full-bleed within its own
 * pinned viewport. No canvas — the <video> element is what the viewer sees.
 *
 * ScrollTrigger only ever writes a *target time*. A single rAF loop tracks an
 * internal playhead toward that target and is the only thing that ever seeks
 * the decoder. Tracking is deliberately tight (light, frame-rate-independent
 * smoothing) so the frame stays glued to the scroll position rather than
 * drifting in behind it. A seek is never issued while one is in flight: the
 * newest requested time is retained and applied on the `seeked` event, so the
 * decoder is never flooded (which is what makes a scrub stutter) and there is
 * no backlog or backward jump from a stale value.
 *
 * The video source is never dropped on cleanup, so the effect is safe under
 * React StrictMode's development double-invoke.
 */
export default function ScrollVideo({
  src,
  poster,
  heightVh = 460,
  children,
  onProgress,
  className = "",
  label,
}: ScrollVideoProps) {
  const driverRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [buffered, setBuffered] = useState(0);

  // Keep the latest onProgress without re-running the engine effect.
  const onProgressRef = useRef<typeof onProgress>(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  // ---- Loading + buffered indicator (light React state, updated rarely) ----
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setReady(true);
    const onBuffer = () => {
      const d = video.duration;
      if (d && video.buffered.length) {
        setBuffered(
          clamp(video.buffered.end(video.buffered.length - 1) / d, 0, 1),
        );
      }
    };

    if (video.readyState >= 2) markReady();
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("progress", onBuffer);
    video.addEventListener("timeupdate", onBuffer);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("progress", onBuffer);
      video.removeEventListener("timeupdate", onBuffer);
    };
  }, []);

  // ---- The scrub engine ----
  useEffect(() => {
    const driver = driverRef.current;
    const video = videoRef.current;
    if (!driver || !video) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // static fallback is rendered by the parent

    gsap.registerPlugin(ScrollTrigger);

    let duration = video.duration || 0;
    let progress = 0; // raw scroll progress 0..1
    let target = 0; // desired video time from scroll
    let playhead = 0; // tracked time actually driving the decoder
    let seeking = false;
    let pending: number | null = null; // newest time requested during a seek
    let last = performance.now();

    // Pointer parallax (desktop, fine pointer, motion allowed only).
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let pxTarget = 0;
    let pyTarget = 0;
    let px = 0;
    let py = 0;

    const SEEK_EPS = 1 / 60; // ~one frame; below this a seek is not worth it
    // High damping = the playhead essentially snaps to the scroll position each
    // frame. Lenis already smooths the scroll itself, so extra easing here only
    // reads as lag; keep it minimal.
    const LAMBDA = 20;
    const MAX_PARALLAX = 12; // px

    const readDuration = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        duration = video.duration;
      }
    };
    readDuration();
    video.addEventListener("loadedmetadata", readDuration);

    const onSeeked = () => {
      seeking = false;
      if (pending != null) {
        const t = pending;
        pending = null;
        if (Math.abs(t - video.currentTime) > SEEK_EPS) {
          video.currentTime = t;
          seeking = true;
        }
      }
    };
    video.addEventListener("seeked", onSeeked);

    // iOS/Safari will not let currentTime move until the element has played
    // once. A muted, in-place play→pause on first interaction unlocks it.
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {});
      } else {
        video.pause();
      }
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
    };
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("pointerdown", unlock, { passive: true });

    const onPointerMove = (e: PointerEvent) => {
      pxTarget = (e.clientX / window.innerWidth - 0.5) * 2;
      pyTarget = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    // ScrollTrigger's ONLY job: record the target time and raw progress.
    const st = ScrollTrigger.create({
      trigger: driver,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress = self.progress;
        target = self.progress * duration;
      },
      onRefresh: (self) => {
        progress = self.progress;
        target = self.progress * duration;
      },
    });

    let rafId = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const ease = 1 - Math.exp(-LAMBDA * dt);

      // Track the internal playhead toward the scroll-driven target. With a
      // high LAMBDA this is all but instant, so the frame stays on the scroll.
      playhead += (target - playhead) * ease;

      if (duration > 0) {
        const want = clamp(playhead, 0, duration - 0.001);
        if (!seeking) {
          if (Math.abs(want - video.currentTime) > SEEK_EPS) {
            video.currentTime = want;
            seeking = true;
          }
        } else {
          // A seek is in flight: keep only the newest desired time.
          pending = want;
        }
      }

      // Parallax, eased on the same clock — no second rAF loop.
      if (finePointer && parallaxRef.current) {
        px += (pxTarget - px) * ease;
        py += (pyTarget - py) * ease;
        parallaxRef.current.style.transform = `translate3d(${(-px * MAX_PARALLAX).toFixed(2)}px, ${(-py * MAX_PARALLAX).toFixed(2)}px, 0)`;
      }

      onProgressRef.current?.(progress);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
      video.removeEventListener("loadedmetadata", readDuration);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("pointermove", onPointerMove);
      // Deliberately NOT clearing video.src — dropping it here breaks the
      // StrictMode remount and forces a full re-download.
    };
  }, []);

  return (
    <section
      ref={driverRef}
      className={`relative ${className}`}
      style={{ height: `${heightVh}vh` }}
      aria-label={label}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0B0A0B]">
        <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
          <video
            ref={videoRef}
            className="h-full w-full scale-[1.06] object-cover"
            src={src}
            poster={poster}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>

        {/* Optional overlay — Section 1 passes none, keeping the frame pure. */}
        {children}

        {/* Loading overlay — the only thing ever drawn over the frame, and
            only until the first frames land. Carries the buffered indicator. */}
        <div
          className="absolute inset-0 flex flex-col justify-end gap-4 bg-[#0B0A0B] px-6 pb-[clamp(2.5rem,6vh,4.5rem)] md:px-10 transition-opacity duration-700"
          style={{
            opacity: ready ? 0 : 1,
            pointerEvents: ready ? "none" : "auto",
          }}
          aria-hidden={ready}
        >
          <div className="flex items-end justify-between gap-6">
            <p
              className="text-[#6b6b6b]"
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                lineHeight: 1.7,
              }}
            >
              Nurv — El Shorouk
              <br />
              <span className="text-[#2E7CCC]">Loading the film…</span>
            </p>
            <p
              className="text-[#6b6b6b]"
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {Math.round(buffered * 100)}%
            </p>
          </div>
          <div className="h-px w-full bg-white/10">
            <div
              className="h-full origin-left bg-[#2E7CCC] transition-transform duration-300"
              style={{ transform: `scaleX(${buffered})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
