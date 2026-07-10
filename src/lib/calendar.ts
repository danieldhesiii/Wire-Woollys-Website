import { business } from "./business";

// Turns a confirmed booking into calendar artefacts: a Google Calendar "add event"
// link and a downloadable .ics file. Both are generated client-safe (no secrets).

export type CalendarEvent = {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
};

export function buildEvent(input: {
  service: string;
  dogName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMins?: number;
}): CalendarEvent {
  const start = new Date(`${input.date}T${input.time}:00`);
  const end = new Date(start.getTime() + (input.durationMins ?? 120) * 60000);
  return {
    title: `${input.service} — ${input.dogName} @ ${business.shortName}`,
    description: `${input.service} for ${input.dogName} at ${business.name}. Questions? Call ${business.phone}.`,
    location: business.address.full,
    start,
    end,
  };
}

// Google's format: YYYYMMDDTHHMMSS in local-floating time (no trailing Z).
function fmtLocal(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `T${p(d.getHours())}${p(d.getMinutes())}00`
  );
}

export function googleCalendarUrl(e: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    details: e.description,
    location: e.location,
    dates: `${fmtLocal(e.start)}/${fmtLocal(e.end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function icsContent(e: CalendarEvent): string {
  const uid = `${Date.now()}@wireandwoolly`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wire & Woolly//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmtLocal(new Date())}`,
    `DTSTART:${fmtLocal(e.start)}`,
    `DTEND:${fmtLocal(e.end)}`,
    `SUMMARY:${escapeIcs(e.title)}`,
    `DESCRIPTION:${escapeIcs(e.description)}`,
    `LOCATION:${escapeIcs(e.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function escapeIcs(s: string): string {
  return s.replace(/[\\,;]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
}

export function icsDataUri(e: CalendarEvent): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent(e))}`;
}
