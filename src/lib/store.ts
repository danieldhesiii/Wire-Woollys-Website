import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { getSupabase, hasSupabase } from "./supabase";
import { seedReviews, type Review } from "./reviews";

// Data access layer. Uses Supabase when configured, otherwise a local JSON file
// (ephemeral on serverless, persistent in local dev) so the demo always works.

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dogName: string;
  breed: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
  createdAt: string;
};

const DATA_DIR = process.env.DATA_DIR || path.join(os.tmpdir(), "wire-woolly");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/* ----------------------------- Reviews ----------------------------- */

export async function getApprovedReviews(): Promise<Review[]> {
  if (hasSupabase) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (!error && data) {
      const rows = data.map(rowToReview);
      // Blend seed placeholders in only if the owner hasn't added real ones yet.
      return rows.length ? rows : seedReviews;
    }
  }
  const stored = await readJson<Review[]>(REVIEWS_FILE, []);
  const all = [...seedReviews, ...stored];
  return all.filter((r) => r.approved);
}

export async function addReview(input: {
  name: string;
  dog?: string;
  rating: number;
  body: string;
}): Promise<Review> {
  const review: Review = {
    id: newId("rev"),
    name: input.name,
    dog: input.dog,
    rating: input.rating,
    body: input.body,
    createdAt: new Date().toISOString(),
    approved: false, // held for moderation
    source: "web",
  };

  if (hasSupabase) {
    const sb = getSupabase()!;
    const { error } = await sb.from("reviews").insert({
      name: review.name,
      dog: review.dog ?? null,
      rating: review.rating,
      body: review.body,
      approved: false,
      source: "web",
      created_at: review.createdAt,
    });
    if (!error) return review;
  }

  const stored = await readJson<Review[]>(REVIEWS_FILE, []);
  stored.push(review);
  await writeJson(REVIEWS_FILE, stored);
  return review;
}

function rowToReview(row: Record<string, unknown>): Review {
  return {
    id: String(row.id),
    name: String(row.name),
    dog: (row.dog as string) || undefined,
    rating: Number(row.rating),
    body: String(row.body),
    createdAt: String(row.created_at),
    approved: Boolean(row.approved),
    source: (row.source as Review["source"]) || "web",
  };
}

/* ----------------------------- Bookings ----------------------------- */

export async function addBooking(
  input: Omit<Booking, "id" | "createdAt">
): Promise<Booking> {
  const booking: Booking = {
    ...input,
    id: newId("bk"),
    createdAt: new Date().toISOString(),
  };

  if (hasSupabase) {
    const sb = getSupabase()!;
    const { error } = await sb.from("bookings").insert({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      dog_name: booking.dogName,
      breed: booking.breed,
      service: booking.service,
      date: booking.date,
      time: booking.time,
      notes: booking.notes ?? null,
      created_at: booking.createdAt,
    });
    if (!error) return booking;
  }

  const stored = await readJson<Booking[]>(BOOKINGS_FILE, []);
  stored.push(booking);
  await writeJson(BOOKINGS_FILE, stored);
  return booking;
}
