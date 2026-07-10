"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Wordmark } from "./wordmark";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#about", label: "About" },
  { href: "/#visit", label: "Visit" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/70 py-2.5"
          : "bg-transparent py-4"
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        <Link href="/" aria-label={business.name} className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={business.phoneHref}
            className="group flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Phone className="h-4 w-4" />
            </span>
            <span className="tabular-nums">{business.phone}</span>
          </a>
          <a
            href="/book"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-[var(--moss-deep)] transition-colors"
          >
            Book now
          </a>
        </div>

        <button
          className="md:hidden grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-0 z-40 bg-background transition-transform duration-300",
          open ? "translate-y-0" : "-translate-y-full pointer-events-none"
        )}
      >
        <Container className="flex h-full flex-col pt-24 pb-10">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 font-heading text-2xl text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href={business.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-secondary py-4 text-base font-semibold text-primary"
            >
              <Phone className="h-4 w-4" /> {business.phone}
            </a>
            <a
              href="/book"
              onClick={() => setOpen(false)}
              className="rounded-full bg-primary py-4 text-center text-base font-semibold text-primary-foreground"
            >
              Book an appointment
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
