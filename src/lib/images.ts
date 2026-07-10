// PLACEHOLDER photography (Unsplash) — swap these for the owner's real photos
// of their own grooming work before going live. All verified to resolve.
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const img = {
  heroMain: U("photo-1633722715463-d30f4f325e24", 1400), // groomed dog portrait
  heroSmall: U("photo-1591946614720-90a587da4a36", 800), // dog being bathed
  about: U("photo-1601758228041-f3b2795255f1", 1000),
  service: {
    signature: U("photo-1587300003388-59208cc962cb", 900),
    puppy: U("photo-1450778869180-41d0601e046e", 900),
    spa: U("photo-1583337130417-3346a1be7dee", 900),
    extras: U("photo-1548199973-03cce0bbc87b", 900),
  },
  gallery: [
    U("photo-1552053831-71594a27632d", 700),
    U("photo-1518717758536-85ae29035b6d", 700),
    U("photo-1477884213360-7e9d7dcc1e48", 700),
    U("photo-1444212477490-ca407925329e", 700),
    U("photo-1534361960057-19889db9621e", 700),
    U("photo-1587300003388-59208cc962cb", 700),
    U("photo-1601758228041-f3b2795255f1", 700),
    U("photo-1583337130417-3346a1be7dee", 700),
  ],
};
