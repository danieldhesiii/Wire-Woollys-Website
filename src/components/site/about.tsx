import Image from "next/image";
import { PawPrint } from "lucide-react";
import { img } from "@/lib/images";
import { Container } from "./container";
import { Reveal, SplitText } from "./reveal";

const promises = [
  {
    title: "One dog at a time",
    body: "No stacked appointments, no cage dryers, no rushing. Your dog gets our full attention from arrival to pick-up.",
  },
  {
    title: "The right technique for the coat",
    body: "Hand-stripping for wiry coats, scissor work for the woolly ones. We do what keeps the coat healthy — not just what's quick.",
  },
  {
    title: "Honest, friendly advice",
    body: "We'll show you how to keep on top of matting at home and never upsell you something your dog doesn't need.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-secondary/40 py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] shadow-xl shadow-black/10">
              <Image
                src={img.about}
                alt="A groomer gently caring for a dog"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 max-w-[200px] rounded-2xl border border-border bg-background p-4 shadow-lg sm:-right-6">
              <p className="font-heading text-lg text-primary">
                &ldquo;Wire &amp; Woolly&rdquo;
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Two coats, one philosophy — treat every dog like it&apos;s our own.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <span className="text-eyebrow text-accent">Our story</span>
          <SplitText
            text="A little studio with a big soft spot for dogs"
            className="mt-3 font-heading text-4xl text-foreground sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Wire &amp; Woolly started with a simple idea: grooming should be a
              calm, kind experience — for the dog and for you. Tucked away on
              Firsgrove Crescent in Warley, we keep things small on purpose so
              every dog leaves relaxed, comfortable and looking their best.
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i}>
                <div className="flex gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <PawPrint className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
