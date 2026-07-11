"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star, Quote, PenLine, X } from "lucide-react";
import "swiper/css";
import type { Review } from "@/lib/reviews";
import { business } from "@/lib/business";
import { Container } from "./container";
import { Reveal, SplitText } from "./reveal";
import { cn } from "@/lib/utils";

function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("inline-flex text-accent", className)} aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < n ? "fill-current" : "opacity-25")}
        />
      ))}
    </span>
  );
}

export function Reviews({ initial }: { initial: Review[] }) {
  const [reviews] = useState<Review[]>(initial);
  const [formOpen, setFormOpen] = useState(false);

  // A seamless loop needs plenty of slides. If the studio only has a few
  // reviews, repeat them so the marquee never runs out and jumps.
  const slides = reviews.length >= 6 ? reviews : [...reviews, ...reviews, ...reviews];

  return (
    <section id="reviews" className="scroll-mt-24 overflow-hidden bg-secondary/40 py-20 sm:py-28">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="text-eyebrow text-accent">Kind words</span>
          <SplitText
            text="Loved by local dogs & their humans"
            className="mt-3 font-heading text-4xl text-foreground sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Stars n={5} className="[&_svg]:h-5 [&_svg]:w-5" />
              <span className="text-lg font-semibold text-foreground">
                {business.rating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">rated on Google</span>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <button
              onClick={() => setFormOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--moss-deep)]"
            >
              <PenLine className="h-4 w-4" /> Leave a review
            </button>
          </Reveal>
        </div>
      </Container>

      {/* Moving carousel — full-bleed, softly faded at both edges so it reads as
          intentional rather than cut off. */}
      <div
        className="reviews-swiper mt-14"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)",
        }}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={24}
          loop
          loopAdditionalSlides={slides.length}
          speed={5000}
          grabCursor
          allowTouchMove
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
        >
          {slides.map((r, i) => (
            <SwiperSlide key={`${r.id}-${i}`} className="!w-[86vw] max-w-sm sm:!w-[380px]">
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
                <Quote className="h-7 w-7 text-accent/50" />
                <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-foreground/90">
                  {r.body}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <Stars n={r.rating} />
                  <p className="mt-2 font-heading text-base text-foreground">
                    {r.name}
                  </p>
                  {r.dog && (
                    <p className="text-sm text-muted-foreground">{r.dog}</p>
                  )}
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {formOpen && <ReviewForm onClose={() => setFormOpen(false)} />}
    </section>
  );
}

function ReviewForm({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        dog: fd.get("dog"),
        rating,
        body: fd.get("body"),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("done");
      setMessage(data.message ?? "Thank you!");
    } else {
      setStatus("error");
      setMessage(data.error ?? "Something went wrong.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-[var(--ink)]/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-border bg-background p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "done" ? (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
              <Star className="h-7 w-7 fill-current" />
            </div>
            <h3 className="mt-4 font-heading text-2xl text-foreground">Thank you!</h3>
            <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-2xl text-foreground">Leave a review</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We&apos;d love to hear how your dog got on.
            </p>
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Your rating
                </label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const val = i + 1;
                    return (
                      <button
                        type="button"
                        key={val}
                        onMouseEnter={() => setHover(val)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(val)}
                        aria-label={`${val} star`}
                        className="p-0.5"
                      >
                        <Star
                          className={cn(
                            "h-7 w-7 transition-colors",
                            (hover || rating) >= val
                              ? "fill-accent text-accent"
                              : "text-border"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Your name" placeholder="e.g. Sarah" required />
                <Field name="dog" label="Your dog (optional)" placeholder="e.g. Bertie, Border Terrier" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Your review
                </label>
                <textarea
                  name="body"
                  required
                  rows={4}
                  placeholder="Tell us about your visit…"
                  className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-destructive">{message}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--moss-deep)] disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Submit review"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Reviews appear once approved. Prefer Google?{" "}
                <a
                  href={business.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Review us there
                </a>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
