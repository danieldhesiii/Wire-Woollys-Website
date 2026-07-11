import Image from "next/image";
import { Star, MapPin, Phone, ArrowRight } from "lucide-react";
import { business } from "@/lib/business";
import { img } from "@/lib/images";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 md:pt-40 md:pb-24">
      {/* soft ambient wash, not a flat gradient block */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--ochre) 35%, transparent), transparent 70%)",
        }}
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-eyebrow text-muted-foreground">
              <span className="flex items-center gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
              5.0 on Google · Warley, Brentwood
            </span>
          </Reveal>

          <h1 className="mt-6 text-display text-foreground">
            Grooming that
            <br />
            your dog{" "}
            <span className="relative whitespace-nowrap text-primary">
              actually
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-accent"
              >
                <path
                  d="M2 8 C 40 3, 80 3, 120 6 S 180 9, 198 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            enjoys.
          </h1>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              A small, independent grooming studio in Warley — unhurried,
              hands-on and a little bit obsessed with getting every coat right.
              From wiry terriers to woolly doodles.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/book"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-[var(--moss-deep)]"
              >
                Book your dog in
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary/50"
              >
                <Phone className="h-4 w-4 text-primary" /> {business.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { n: "5.0", l: "Star rated" },
                { n: "All", l: "Breeds & coats" },
                { n: "1-to-1", l: "Never rushed" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-heading text-3xl text-primary">{s.n}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Imagery — single clean frame, nothing overlapping */}
        <Reveal delay={0.12}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-xl shadow-black/10 lg:max-w-none">
            <Image
              src={img.heroMain}
              alt="A freshly groomed dog looking happy"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            {/* contained location badge, sitting inside the frame */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/90 px-3.5 py-2 shadow-sm backdrop-blur">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                Firsgrove Cres · Warley
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
