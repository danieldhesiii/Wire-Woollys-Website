import { MapPin, Phone, Navigation, Clock } from "lucide-react";
import { business } from "@/lib/business";
import { Container } from "./container";
import { Reveal, SplitText } from "./reveal";
import { FacebookIcon } from "./social-icons";

export function Visit() {
  return (
    <section id="visit" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <span className="text-eyebrow text-accent">Find us</span>
          <SplitText
            text="Pop in on Firsgrove Crescent"
            className="mt-3 font-heading text-4xl text-foreground sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-muted-foreground">
              Easy to reach in Warley, Brentwood. Give us a call or book online —
              we&apos;ll always confirm your slot before your visit.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Map */}
          <Reveal className="overflow-hidden rounded-3xl border border-border bg-card">
            <iframe
              title="Map to Wire & Woolly Dog Grooming"
              src={business.mapsEmbed}
              className="h-full min-h-[340px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          {/* Details */}
          <div className="grid gap-4">
            <Reveal className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg text-foreground">Address</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {business.address.line1}
                    <br />
                    {business.address.area}, {business.address.city}
                    <br />
                    {business.address.postcode}
                  </p>
                  <a
                    href={business.mapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    <Navigation className="h-4 w-4" /> Get directions
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal className="rounded-3xl border border-border bg-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-heading text-lg text-foreground">Call</h3>
                <a
                  href={business.phoneHref}
                  className="mt-1 block text-sm font-semibold tabular-nums text-primary hover:underline"
                >
                  {business.phone}
                </a>
                <a
                  href={business.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
                >
                  <FacebookIcon className="h-4 w-4" /> Message us
                </a>
              </Reveal>

              <Reveal className="rounded-3xl border border-border bg-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-heading text-lg text-foreground">Hours</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {business.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-3">
                      <span>{h.day.slice(0, 3)}</span>
                      <span className="text-foreground/80">{h.value}</span>
                    </li>
                  ))}
                </ul>
                {business.hoursProvisional && (
                  <p className="mt-3 text-[0.7rem] leading-snug text-muted-foreground/70">
                    * Indicative hours — please confirm when booking.
                  </p>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
