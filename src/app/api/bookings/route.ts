import { NextResponse } from "next/server";
import { addBooking } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const p = (payload ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(p.name);
  const email = str(p.email);
  const phone = str(p.phone);
  const dogName = str(p.dogName);
  const breed = str(p.breed);
  const service = str(p.service);
  const date = str(p.date);
  const time = str(p.time);
  const notes = str(p.notes);

  const required = { name, phone, dogName, service, date, time };
  const missing = Object.entries(required)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    return NextResponse.json(
      { error: `Please complete: ${missing.join(", ")}.` },
      { status: 400 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  const booking = await addBooking({
    name: name.slice(0, 80),
    email: email.slice(0, 120),
    phone: phone.slice(0, 40),
    dogName: dogName.slice(0, 60),
    breed: breed.slice(0, 60),
    service: service.slice(0, 80),
    date,
    time,
    notes: notes.slice(0, 500),
  });

  return NextResponse.json({ ok: true, booking });
}
