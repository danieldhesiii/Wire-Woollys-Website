"use client";

import { Phone, CalendarDays } from "lucide-react";
import { business } from "@/lib/business";

// Always-there Call / Book bar on mobile — the two actions that matter, one tap away.
export function MobileBar() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/90 backdrop-blur-md">
      <div className="grid grid-cols-2 gap-2 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={business.phoneHref}
          className="flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-secondary py-3 text-sm font-semibold text-primary"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href="/#book"
          className="flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          <CalendarDays className="h-4 w-4" /> Book
        </a>
      </div>
    </div>
  );
}
