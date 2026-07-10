// Review types + seed data.
//
// IMPORTANT: The business currently has 2 real Google reviews (5.0). The entries
// below are ILLUSTRATIVE PLACEHOLDERS for the demo carousel so it doesn't look
// empty — they should be replaced with the owner's real Google reviews before
// going live. New reviews submitted through the site are stored separately and
// only appear once approved.

export type Review = {
  id: string;
  name: string;
  dog?: string;
  rating: number; // 1–5
  body: string;
  createdAt: string; // ISO
  approved: boolean;
  source: "seed" | "web" | "google";
};

export const seedReviews: Review[] = [
  {
    id: "seed-1",
    name: "Sarah H.",
    dog: "Bertie, Border Terrier",
    rating: 5,
    body:
      "Bertie always comes home looking (and smelling) amazing. You can tell he's actually relaxed there — no stress, no rush. Proper hand-stripping done the right way. Wouldn't take him anywhere else.",
    createdAt: "2025-05-18T10:00:00.000Z",
    approved: true,
    source: "seed",
  },
  {
    id: "seed-2",
    name: "James P.",
    dog: "Willow, Cockapoo",
    rating: 5,
    body:
      "First groomer that's had the patience to win Willow over. She used to shake in the car — now she trots straight in. Lovely teddy trim every time and honest advice on keeping her coat matt-free.",
    createdAt: "2025-06-02T09:30:00.000Z",
    approved: true,
    source: "seed",
  },
  {
    id: "seed-3",
    name: "Denise M.",
    dog: "Alfie, Miniature Schnauzer",
    rating: 5,
    body:
      "Absolutely brilliant with Alfie. His schnauzer beard has never looked so sharp and they really take the time to get it right. Warm, friendly and clearly love the dogs.",
    createdAt: "2025-06-21T14:15:00.000Z",
    approved: true,
    source: "seed",
  },
  {
    id: "seed-4",
    name: "Tom & Rachel",
    dog: "Nala, Cavapoo puppy",
    rating: 5,
    body:
      "Took Nala for her first puppy introduction and it was so gentle. No pressure, just a calm little visit to get her used to it. You can tell they genuinely care about getting puppies off to the right start.",
    createdAt: "2025-07-01T11:00:00.000Z",
    approved: true,
    source: "seed",
  },
];
