"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives smooth scrolling with Lenis and keeps GSAP's ScrollTrigger in sync.
 *
 * - Lenis runs off GSAP's single ticker (instead of its own rAF) so scroll
 *   animations and pinned/scrubbed timelines share one clock and never drift.
 * - `lagSmoothing(0)` disables GSAP's catch-up jumps, which fight momentum scroll.
 *
 * Wrap the app once in the root layout. It renders nothing of its own.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis();

    // Refresh ScrollTrigger positions whenever Lenis scrolls.
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker time is in seconds; Lenis expects milliseconds.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
