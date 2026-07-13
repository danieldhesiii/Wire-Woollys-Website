"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { img } from "@/lib/images";
import { Container } from "./container";
import { Reveal, SplitText } from "./reveal";

function Slider({
  before,
  after,
  dog,
}: {
  before: string;
  after: string;
  dog: string;
}) {
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <figure>
      <div
        ref={frameRef}
        className="group relative aspect-[4/5] w-full touch-none select-none overflow-hidden rounded-[2rem] shadow-xl shadow-black/10"
        onPointerMove={(e) => {
          if (e.buttons === 1) move(e.clientX);
        }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
      >
        {/* After (full) */}
        <Image
          src={after}
          alt={`${dog} after grooming`}
          fill
          sizes="(max-width: 768px) 90vw, 45vw"
          className="object-cover"
        />
        <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
          After
        </span>

        {/* Before (clipped to the left of the handle) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`${dog} before grooming`}
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            Before
          </span>
        </div>

        {/* Handle */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="h-full w-0.5 bg-[var(--cream)] shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
          <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--cream)] text-primary shadow-lg">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>

        {/* Keyboard-accessible control */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal ${dog} before and after grooming`}
          className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-4 text-center text-sm font-medium text-muted-foreground">
        {dog} · drag to compare
      </figcaption>
    </figure>
  );
}

export function BeforeAfter() {
  return (
    <section id="transformations" className="scroll-mt-24 bg-secondary/40 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-eyebrow text-accent">Before &amp; after</span>
          <SplitText
            text="See the difference a groom makes"
            className="mt-3 font-heading text-4xl text-foreground sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-muted-foreground">
              Same dog, same visit. Drag the slider to reveal each transformation
              — from matted and overgrown to comfortable, clean and neat.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-10 sm:grid-cols-2">
          {img.transformations.map((t, i) => (
            <Reveal key={t.dog} delay={0.08 * i}>
              <Slider before={t.before} after={t.after} dog={t.dog} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
