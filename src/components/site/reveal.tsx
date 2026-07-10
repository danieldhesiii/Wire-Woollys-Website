"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades + rises its children into view on scroll. Content is fully visible if JS
 * is off or reduced-motion is set (we only hide it once we know we can animate).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * A heading whose characters rise into place on scroll, via Splitting.js + GSAP.
 */
export function SplitText({
  text,
  className,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) return;

    let ctx: gsap.Context | undefined;
    // Splitting.js touches `document`, so load it only in the browser.
    import("splitting").then(({ default: Splitting }) => {
      if (!ref.current) return;
      const results = Splitting({ target: el, by: "chars" });
      const chars = results?.[0]?.chars ?? [];
      if (!chars.length) return;
      ctx = gsap.context(() => {
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(chars, {
          yPercent: 120,
          opacity: 0,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.018,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      }, el);
    });
    return () => ctx?.revert();
  }, [text]);

  return (
    <Tag
      ref={ref}
      data-splitting
      className={className}
      style={{ overflow: "hidden" }}
    >
      {text}
    </Tag>
  );
}
