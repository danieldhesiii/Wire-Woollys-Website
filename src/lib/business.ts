// Single source of truth for the business's real details.
// Pulled from the Google Business listing supplied in the brief.
// NOTE: opening hours are PROVISIONAL — the Google snapshot only showed
// "Opens 8:30 am Sat". Confirm with the owner and update `hours` below.

export const business = {
  name: "Wire & Woolly Dog Grooming",
  shortName: "Wire & Woolly",
  tagline: "Warm, unhurried dog grooming in the heart of Warley.",
  rating: 5.0,
  reviewCount: 2,
  category: "Dog groomer · Warley, Brentwood",

  phone: "07540 476281",
  phoneHref: "tel:+447540476281",
  whatsappHref: "https://wa.me/447540476281",

  address: {
    line1: "21 Firsgrove Crescent",
    area: "Warley",
    city: "Brentwood",
    postcode: "CM14 5JL",
    full: "21 Firsgrove Cres, Warley, Brentwood CM14 5JL",
  },

  // Google Maps
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=21+Firsgrove+Cres,+Warley,+Brentwood+CM14+5JL",
  mapsEmbed:
    "https://www.google.com/maps?q=21+Firsgrove+Cres,+Warley,+Brentwood+CM14+5JL&output=embed",
  mapsListing:
    "https://www.google.com/maps/search/?api=1&query=Wire+%26+Woolly+Dog+Grooming+Warley",
  // Deep link to leave a Google review (search fallback until Place ID is known).
  googleReviewUrl:
    "https://www.google.com/maps/search/?api=1&query=Wire+%26+Woolly+Dog+Grooming+Warley",

  social: {
    // Per the brief, this is the Facebook page to use for the business.
    facebook:
      "https://www.facebook.com/p/Studio-77-Dog-grooming-61586800400854/",
    // Instagram handle to be confirmed — used by the auto-embed gallery.
    instagram: "",
  },

  // Provisional — confirm with owner.
  hoursProvisional: true,
  hours: [
    { day: "Monday", value: "By appointment" },
    { day: "Tuesday", value: "8:30am – 5:00pm" },
    { day: "Wednesday", value: "8:30am – 5:00pm" },
    { day: "Thursday", value: "8:30am – 5:00pm" },
    { day: "Friday", value: "8:30am – 5:00pm" },
    { day: "Saturday", value: "8:30am – 3:00pm" },
    { day: "Sunday", value: "Closed" },
  ],
} as const;

export type Business = typeof business;
