import { cn } from "@/lib/utils";

// Text-led wordmark with a small hand-drawn paw emblem. Deliberately typographic
// rather than a generic "AI logo" — the italic ampersand does the character work.
export function Wordmark({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className={cn("h-8 w-8", light ? "text-[var(--cream)]" : "text-primary")}
        aria-hidden
        fill="none"
      >
        <circle
          cx="20"
          cy="20"
          r="19"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.35"
        />
        {/* paw */}
        <g fill="currentColor">
          <ellipse cx="20" cy="24" rx="5.5" ry="4.5" />
          <circle cx="13" cy="18.5" r="2.4" />
          <circle cx="17" cy="15" r="2.4" />
          <circle cx="23" cy="15" r="2.4" />
          <circle cx="27" cy="18.5" r="2.4" />
        </g>
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg tracking-tight",
            light ? "text-[var(--cream)]" : "text-foreground"
          )}
        >
          Wire <span className="italic font-normal text-accent">&amp;</span> Woolly
        </span>
        <span
          className={cn(
            "text-[0.6rem] font-semibold uppercase tracking-[0.28em]",
            light ? "text-[var(--cream)]/70" : "text-muted-foreground"
          )}
        >
          Dog Grooming
        </span>
      </span>
    </span>
  );
}
