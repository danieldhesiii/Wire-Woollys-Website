import Image from "next/image";
import { cn } from "@/lib/utils";
import { logo } from "@/lib/images";

// Brand mark: the studio's own circular logo badge paired with the wordmark.
export function Wordmark({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src={logo}
        alt="Wire & Woolly Dog Grooming"
        width={44}
        height={44}
        priority
        className="h-11 w-11 rounded-full object-cover"
      />
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
