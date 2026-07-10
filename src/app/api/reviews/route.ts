import { NextResponse } from "next/server";
import { getApprovedReviews, addReview } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const reviews = await getApprovedReviews();
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { name, dog, rating, body } = (payload ?? {}) as Record<string, unknown>;

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanBody = typeof body === "string" ? body.trim() : "";
  const numRating = Number(rating);

  if (cleanName.length < 2) {
    return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  }
  if (cleanBody.length < 10) {
    return NextResponse.json(
      { error: "Please write a little more about your visit." },
      { status: 400 }
    );
  }
  if (!Number.isFinite(numRating) || numRating < 1 || numRating > 5) {
    return NextResponse.json({ error: "Please choose a star rating." }, { status: 400 });
  }

  await addReview({
    name: cleanName.slice(0, 60),
    dog: typeof dog === "string" ? dog.trim().slice(0, 60) : undefined,
    rating: Math.round(numRating),
    body: cleanBody.slice(0, 800),
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thank you! Your review has been sent and will appear once it's approved.",
  });
}
