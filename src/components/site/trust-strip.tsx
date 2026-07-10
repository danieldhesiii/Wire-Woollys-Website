import { PawPrint } from "lucide-react";

const items = [
  "Hand-stripping done properly",
  "Puppy introductions",
  "Doodle & poodle styling",
  "Nervous & senior dogs welcome",
  "Kind, low-stress grooming",
  "Small-batch, never a conveyor belt",
  "5.0 rated by local owners",
];

// Auto-scrolling reassurance strip. Duplicated once so the loop is seamless.
export function TrustStrip() {
  return (
    <div className="marquee-pause border-y border-border bg-primary text-primary-foreground">
      <div className="flex overflow-hidden py-3.5">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-8 text-sm font-medium">
              <PawPrint className="h-4 w-4 text-accent" />
              {t}
            </span>
          ))}
        </div>
        <div
          className="animate-marquee flex shrink-0 items-center gap-8 pr-8"
          aria-hidden
        >
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-8 text-sm font-medium">
              <PawPrint className="h-4 w-4 text-accent" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
