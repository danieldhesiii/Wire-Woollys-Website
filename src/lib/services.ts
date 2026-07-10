// Service menu, organised into the "different categories" the owner asked for.
// Prices are indicative "from" guides — final price depends on breed, size, coat
// condition and temperament. Confirm the real numbers with the owner.

export type ServiceItem = {
  name: string;
  desc: string;
  priceFrom?: number;
  duration?: string;
  popular?: boolean;
};

export type ServiceCategory = {
  id: string;
  name: string;
  tagline: string;
  /** lucide-react icon name */
  icon: string;
  items: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "signature",
    name: "Signature Grooms",
    tagline: "The full works, tailored to your dog's coat and character.",
    icon: "Scissors",
    items: [
      {
        name: "The Full Groom",
        desc: "Bath, blow-dry, full brush-out, breed-appropriate clip or scissor finish, nails, ears and a spritz of cologne. Your dog leaves box-fresh.",
        priceFrom: 40,
        duration: "1.5–2.5 hrs",
        popular: true,
      },
      {
        name: "The Wire — Hand-Strip",
        desc: "Traditional hand-stripping for wire-coated terriers, schnauzers and spaniels. Keeps the coat's colour, texture and weatherproofing the way it's meant to be.",
        priceFrom: 55,
        duration: "2–3 hrs",
      },
      {
        name: "The Woolly — Doodle & Poodle Styling",
        desc: "Scissor-styled finishes for poodles, doodles and curly coats. Teddy trims, clean faces, fluffy legs — you choose the look.",
        priceFrom: 50,
        duration: "2–3 hrs",
      },
      {
        name: "Bath, Brush & Tidy",
        desc: "A freshen-up between full grooms: bath, blow-dry, brush, feet, face and sanitary tidy. No full clip.",
        priceFrom: 28,
        duration: "45–75 mins",
      },
    ],
  },
  {
    id: "puppy",
    name: "Puppy & First-Timers",
    tagline: "Gentle, patient introductions so grooming is never scary.",
    icon: "Heart",
    items: [
      {
        name: "Puppy Introduction",
        desc: "A short, calm first visit — sights, sounds, a little bath and lots of fuss. All about building confidence, not the perfect haircut.",
        priceFrom: 20,
        duration: "30–45 mins",
        popular: true,
      },
      {
        name: "Puppy Groom",
        desc: "A gentle first proper groom once your pup is settled — bath, tidy, nails and ears at a pace that suits them.",
        priceFrom: 30,
        duration: "1–1.5 hrs",
      },
    ],
  },
  {
    id: "spa",
    name: "Spa & Wellbeing",
    tagline: "A little extra pampering — kind on skin, coat and nerves.",
    icon: "Sparkles",
    items: [
      {
        name: "De-Shed Treatment",
        desc: "Deep de-shedding bath and blow-out for double-coated breeds. Dramatically less hair around the house.",
        priceFrom: 35,
        duration: "1–1.5 hrs",
      },
      {
        name: "Blueberry Facial",
        desc: "A gentle, tear-free facial that brightens and softens the coat around the eyes and muzzle. Smells lovely too.",
        priceFrom: 6,
      },
      {
        name: "Sensitive-Skin Bath",
        desc: "Soothing, hypoallergenic wash for itchy or delicate skin, with a careful conditioning finish.",
        priceFrom: 12,
      },
    ],
  },
  {
    id: "extras",
    name: "Little Extras",
    tagline: "Quick top-ups — pop in or add to any groom.",
    icon: "Plus",
    items: [
      { name: "Nail Clip & File", desc: "Trimmed and smoothed, no snags.", priceFrom: 8 },
      { name: "Ear Clean & Pluck", desc: "Clean, checked and comfortable.", priceFrom: 6 },
      { name: "Teeth Brushing", desc: "Fresh breath and a healthier smile.", priceFrom: 6 },
      { name: "De-Matting", desc: "Careful, kind removal of knots (priced on the day).", priceFrom: 10 },
    ],
  },
];

export const priceNote =
  "Prices are a guide, from. The final quote depends on your dog's breed, size, coat condition and how they get on with grooming — we'll always confirm before we start.";
