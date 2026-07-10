import { Phone, ArrowRight } from "lucide-react";
import { business } from "@/lib/business";
import { Container } from "./container";
import { Reveal } from "./reveal";

export function CTA() {
  return (
    <section className="py-8 sm:py-12">
      <Container>
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-14 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-2xl"
              style={{ background: "var(--ochre)" }}
            />
            <h2 className="relative mx-auto max-w-2xl font-heading text-3xl text-primary-foreground sm:text-5xl">
              Ready to treat your dog to a proper pamper?
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-primary-foreground/80">
              Book online in under a minute, or give us a ring — we&apos;re happy
              to help you pick the right groom.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/book"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cream)] px-7 py-3.5 text-base font-semibold text-primary transition-transform hover:scale-[1.02]"
              >
                Book an appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--cream)]/30 px-7 py-3.5 text-base font-semibold text-primary-foreground hover:bg-[var(--cream)]/10"
              >
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
