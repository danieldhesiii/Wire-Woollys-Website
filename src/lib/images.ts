// Real photography of the studio's own grooming work. Files live in /public/gallery.
const G = (name: string) => `/gallery/${name}`;

export const logo = "/brand/logo.png";

export const img = {
  heroMain: G("cocker-red.jpg"), // freshly groomed red cocker spaniel
  about: G("crufts.jpg"), // show-standard grooming at Crufts
  service: {
    signature: G("cockapoo-rest.jpg"),
    puppy: G("puppy.jpg"),
    spa: G("doodle-white-2.jpg"),
    extras: G("schnauzer-toy.jpg"),
  },
  gallery: [
    G("cocker-red.jpg"),
    G("cockapoo-apricot.jpg"),
    G("doodle-white.jpg"),
    G("schnauzer-2.jpg"),
    G("pom-2.jpg"),
    G("puppy.jpg"),
    G("cockapoo-rest.jpg"),
    G("doodle-white-2.jpg"),
  ],
  // Before → after transformations (same dog, same session).
  transformations: [
    {
      dog: "Miniature Schnauzer",
      before: G("ba-schnauzer-before.jpg"),
      after: G("ba-schnauzer-after.jpg"),
    },
    {
      dog: "Cockapoo",
      before: G("ba-poodle-before.jpg"),
      after: G("ba-poodle-after.jpg"),
    },
  ],
};
