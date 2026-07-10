import Image from "next/image";
import Script from "next/script";
import { Camera } from "lucide-react";
import { business } from "@/lib/business";
import { img } from "@/lib/images";
import { Container } from "./container";
import { Reveal, SplitText } from "./reveal";
import { FacebookIcon, InstagramIcon } from "./social-icons";

// Auto-updating gallery.
// When NEXT_PUBLIC_BEHOLD_FEED_ID is set, we render the Behold widget, which
// mirrors the owner's Instagram automatically — new posts appear here with no
// code changes. Until that's connected, a curated grid keeps the demo looking
// full. (Behold: https://behold.so — free tier; owner connects their account once.)
const beholdId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-eyebrow text-accent">Fresh from the studio</span>
            <SplitText
              text="Our latest happy customers"
              className="mt-3 font-heading text-4xl text-foreground sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg text-muted-foreground">
                Straight from our socials — every time we post a new groom, it
                lands right here.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <div className="flex gap-3">
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40"
              >
                <FacebookIcon className="h-4 w-4 text-primary" /> Facebook
              </a>
              {business.social.instagram && (
                <a
                  href={`https://instagram.com/${business.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/40"
                >
                  <InstagramIcon className="h-4 w-4 text-primary" /> Instagram
                </a>
              )}
            </div>
          </Reveal>
        </div>

        {beholdId ? (
          <>
            <div data-behold-id={beholdId} className="mt-12" />
            <Script src="https://w.behold.so/widget.js" type="module" strategy="lazyOnload" />
          </>
        ) : (
          <Reveal delay={0.05}>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {img.gallery.map((src, i) => (
                <div
                  key={src}
                  className={`group relative overflow-hidden rounded-2xl ${
                    i === 0 || i === 5 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={src}
                    alt="A recently groomed dog"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[var(--ink)]/0 transition-colors duration-300 group-hover:bg-[var(--ink)]/20" />
                </div>
              ))}
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <Camera className="h-4 w-4" />
              Connect the studio&apos;s Instagram to auto-populate this gallery.
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
