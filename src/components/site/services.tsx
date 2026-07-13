"use client";

import { useState } from "react";
import Image from "next/image";
import { Scissors, Heart, Sparkles, Plus, Check, ArrowRight } from "lucide-react";
import { serviceCategories, priceNote } from "@/lib/services";
import { img } from "@/lib/images";
import { Container } from "./container";
import { Reveal, SplitText } from "./reveal";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Scissors,
  Heart,
  Sparkles,
  Plus,
};

const categoryImage: Record<string, string> = {
  signature: img.service.signature,
  puppy: img.service.puppy,
  spa: img.service.spa,
  extras: img.service.extras,
};

export function Services() {
  const [active, setActive] = useState(serviceCategories[0].id);
  const current =
    serviceCategories.find((c) => c.id === active) ?? serviceCategories[0];

  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <span className="text-eyebrow text-accent">What we do</span>
          <SplitText
            text="A menu built around your dog"
            className="mt-3 font-heading text-4xl text-foreground sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-muted-foreground">
              Pick a category to see what&apos;s included. Every groom is tailored
              on the day to your dog&apos;s coat, size and temperament.
            </p>
          </Reveal>
        </div>

        {/* Category tabs */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {serviceCategories.map((c) => {
              const Icon = icons[c.icon] ?? Scissors;
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                    on
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {c.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Category feature card */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative aspect-[4/3] w-full">
              <Image
                key={current.id}
                src={categoryImage[current.id]}
                alt={current.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/70 via-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-heading text-2xl text-[var(--cream)]">
                  {current.name}
                </h3>
                <p className="mt-1 max-w-xs text-sm text-[var(--cream)]/85">
                  {current.tagline}
                </p>
              </div>
            </div>
            <div className="p-6">
              <a
                href="/#book"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Book {current.name.toLowerCase()}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Items list */}
          <div className="flex flex-col divide-y divide-border rounded-3xl border border-border bg-card px-6">
            {current.items.map((item) => (
              <div key={item.name} className="flex items-start gap-4 py-5">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <Check className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h4 className="font-heading text-lg text-foreground">
                      {item.name}
                      {item.popular && (
                        <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 align-middle text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--clay)]">
                          Most loved
                        </span>
                      )}
                    </h4>
                    {item.priceFrom != null && (
                      <span className="font-heading text-lg text-primary">
                        from £{item.priceFrom}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                  {item.duration && (
                    <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                      {item.duration}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={0.05}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            {priceNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
