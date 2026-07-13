import { Phone, MapPin, Clock } from "lucide-react";
import { business } from "@/lib/business";
import { Container } from "./container";
import { Wordmark } from "./wordmark";
import { FacebookIcon } from "./social-icons";

export function Footer() {
  return (
    <footer className="grain bg-[var(--ink)] text-[var(--cream)]">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--cream)]/70">
              {business.tagline} Independent, kind and a little bit obsessed with
              a good finish.
            </p>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--cream)]/20 px-4 py-2 text-sm font-medium text-[var(--cream)] transition-colors hover:bg-[var(--cream)]/10"
            >
              <FacebookIcon className="h-4 w-4" /> Follow on Facebook
            </a>
          </div>

          <div>
            <h4 className="text-eyebrow text-[var(--cream)]/60">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["/#services", "Services & prices"],
                ["/#gallery", "Gallery"],
                ["/#reviews", "Reviews"],
                ["/#about", "About us"],
                ["/#book", "Book online"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[var(--cream)]/80 transition-colors hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow text-[var(--cream)]/60">Visit &amp; contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-[var(--cream)]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href={business.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {business.address.full}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={business.phoneHref} className="hover:text-accent tabular-nums">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>Sat 8:30am · Mon–Fri by appointment</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--cream)]/15 pt-6 text-xs text-[var(--cream)]/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>Warley · Brentwood · Essex</p>
        </div>
      </Container>
    </footer>
  );
}
