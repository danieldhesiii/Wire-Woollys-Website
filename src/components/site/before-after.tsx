"use client";

import { useState } from "react";
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

  return (
    <figure>
      <div className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-2xl shadow-xl shadow-black/10 sm:rounded-[2rem]">
        {/* After (full) */}
        <Image
          src={after}
          alt={`${dog} after grooming`}
          fill
          draggable={false}
          sizes="(max-width: 640px) 45vw, 45vw"
          className="pointer-events-none object-cover"
        />
        <span className="pointer-events-none absolute right-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-semibold text-primary-foreground shadow-sm sm:right-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
          After
        </span>

        {/* Before (clipped to the left of the handle) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`${dog} before grooming`}
            fill
            draggable={false}
            sizes="(max-width: 640px) 45vw, 45vw"
            className="object-cover"
          />
          <span className="absolute left-2 top-2 z-10 rounded-full bg-background/90 px-2 py-0.5 text-[0.6rem] font-semibold text-foreground shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
            Before
          </span>
        </div>

        {/* Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="h-full w-0.5 bg-[var(--cream)] shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
          <div className="absolute top-1/2 left-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--cream)] text-primary shadow-lg sm:h-11 sm:w-11">
            <MoveHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>

        {/* Full-cover control: drag anywhere to compare (also keyboard-accessible) */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal ${dog} before and after grooming`}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-center text-xs font-medium text-muted-foreground sm:mt-4 sm:text-sm">
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

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:gap-10">
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
