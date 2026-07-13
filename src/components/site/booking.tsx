import { Star, ShieldCheck, Clock, PhoneCall } from "lucide-react";
import { business } from "@/lib/business";
import { Container } from "./container";
import { BookingForm } from "./booking-form";
import { Reveal, SplitText } from "./reveal";

const reassurances = [
  { icon: Star, title: "5.0 rated", body: "Trusted by local dog owners." },
  { icon: ShieldCheck, title: "No deposit online", body: "We'll confirm before anything's charged." },
  { icon: Clock, title: "Never rushed", body: "One dog at a time, always." },
  { icon: PhoneCall, title: "Real people", body: `Call us on ${business.phone}.` },
];

export function Booking() {
  return (
    <section id="book" className="scroll-mt-24 py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Intro / reassurance */}
        <div className="lg:pt-6">
          <span className="text-eyebrow text-accent">Booking</span>
          <SplitText
            text="Let's get your dog booked in"
            className="mt-3 font-heading text-4xl text-foreground sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-muted-foreground">
              Fill in a few details and we&apos;ll be in touch to confirm. It
              takes about a minute — and you can pop the appointment straight
              into your calendar afterwards.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {reassurances.map((r, i) => (
              <Reveal key={r.title} delay={0.06 * i}>
                <li className="rounded-2xl border border-border bg-card p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary">
                    <r.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-2.5 font-heading text-base text-foreground">
                    {r.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{r.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.12}>
          <BookingForm />
        </Reveal>
      </Container>
    </section>
  );
}
