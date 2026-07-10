import type { Metadata } from "next";
import { Star, ShieldCheck, Clock, PhoneCall } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileBar } from "@/components/site/mobile-bar";
import { Container } from "@/components/site/container";
import { BookingForm } from "@/components/site/booking-form";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "Book your dog's groom at Wire & Woolly in Warley, Brentwood. Choose your service, date and time — we'll confirm your slot.",
};

const reassurances = [
  { icon: Star, title: "5.0 rated", body: "Trusted by local dog owners." },
  { icon: ShieldCheck, title: "No deposit online", body: "We'll confirm before anything's charged." },
  { icon: Clock, title: "Never rushed", body: "One dog at a time, always." },
  { icon: PhoneCall, title: "Real people", body: `Call us on ${business.phone}.` },
];

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="grain pt-28 pb-20 sm:pt-32">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Intro / reassurance */}
          <div className="lg:pt-6">
            <span className="text-eyebrow text-accent">Booking</span>
            <h1 className="mt-3 font-heading text-4xl text-foreground sm:text-5xl">
              Let&apos;s get your dog booked in
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Fill in a few details and we&apos;ll be in touch to confirm. It
              takes about a minute — and you can pop the appointment straight
              into your calendar afterwards.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {reassurances.map((r) => (
                <li
                  key={r.title}
                  className="rounded-2xl border border-border bg-card p-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary">
                    <r.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-2.5 font-heading text-base text-foreground">
                    {r.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <BookingForm />
        </Container>
      </main>
      <Footer />
      <MobileBar />
      <div className="h-16 md:hidden" aria-hidden />
    </>
  );
}
