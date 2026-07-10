"use client";

import { useMemo, useState } from "react";
import {
  CalendarPlus,
  Download,
  Check,
  Phone,
  CalendarDays,
  Clock,
  Dog,
} from "lucide-react";
import { serviceCategories } from "@/lib/services";
import { business } from "@/lib/business";
import {
  buildEvent,
  googleCalendarUrl,
  icsDataUri,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";

type Confirmed = {
  service: string;
  dogName: string;
  date: string;
  time: string;
};

const TIME_SLOTS = [
  "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
  "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00",
];

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (res.ok) {
      setConfirmed({
        service: String(payload.service),
        dogName: String(payload.dogName),
        date: String(payload.date),
        time: String(payload.time),
      });
      setStatus("done");
    } else {
      setStatus("error");
      setError(data.error ?? "Something went wrong. Please call us instead.");
    }
  }

  if (status === "done" && confirmed) {
    const event = buildEvent(confirmed);
    const gcal = googleCalendarUrl(event);
    const ics = icsDataUri(event);
    const prettyDate = new Date(`${confirmed.date}T${confirmed.time}`).toLocaleDateString(
      "en-GB",
      { weekday: "long", day: "numeric", month: "long" }
    );

    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-5 font-heading text-3xl text-foreground">
          Request received!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Thanks — we&apos;ve got your request for{" "}
          <strong className="text-foreground">{confirmed.service}</strong> for{" "}
          <strong className="text-foreground">{confirmed.dogName}</strong> on{" "}
          <strong className="text-foreground">
            {prettyDate} at {confirmed.time}
          </strong>
          . We&apos;ll confirm the slot with you shortly. Pop it in your calendar
          so you don&apos;t forget:
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={gcal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-[var(--moss-deep)]"
          >
            <CalendarPlus className="h-4 w-4" /> Add to Google Calendar
          </a>
          <a
            href={ics}
            download="wire-and-woolly-appointment.ics"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/50"
          >
            <Download className="h-4 w-4 text-primary" /> Apple / Outlook (.ics)
          </a>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Need to change something?{" "}
          <a href={business.phoneHref} className="font-semibold text-primary hover:underline">
            Call {business.phone}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" placeholder="Jane Smith" required />
        <Field label="Phone" name="phone" type="tel" placeholder="07…" required />
        <Field
          label="Email (optional)"
          name="email"
          type="email"
          placeholder="you@email.com"
        />
        <Field
          label="Dog's name"
          name="dogName"
          placeholder="Bertie"
          icon={<Dog className="h-4 w-4" />}
          required
        />
        <Field
          label="Breed (optional)"
          name="breed"
          placeholder="Border Terrier"
        />

        <div>
          <Label>Service</Label>
          <select
            name="service"
            required
            defaultValue=""
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>
              Choose a groom…
            </option>
            {serviceCategories.map((cat) => (
              <optgroup key={cat.id} label={cat.name}>
                {cat.items.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                    {item.priceFrom != null ? ` — from £${item.priceFrom}` : ""}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <Label>
            <CalendarDays className="mr-1 inline h-3.5 w-3.5" /> Preferred date
          </Label>
          <input
            type="date"
            name="date"
            required
            min={today}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <Label>
            <Clock className="mr-1 inline h-3.5 w-3.5" /> Preferred time
          </Label>
          <select
            name="time"
            required
            defaultValue=""
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>
              Pick a time…
            </option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <Label>Anything we should know? (optional)</Label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Nervous around dryers, matted behind the ears, first visit…"
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-[var(--moss-deep)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request this appointment"}
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
        <Phone className="h-3.5 w-3.5" />
        Prefer to talk? Call{" "}
        <a href={business.phoneHref} className="font-semibold text-primary hover:underline">
          {business.phone}
        </a>
      </p>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
            icon && "pl-10"
          )}
        />
      </div>
    </div>
  );
}
