# Wire & Woolly Dog Grooming — Website

Marketing site + booking flow for **Wire & Woolly Dog Grooming**, an independent
groomer in Warley, Brentwood. Built with Next.js 16, TypeScript and Tailwind v4.

## Highlights

- **Warm, hand-crafted design** — bone/moss/ochre palette, Fraunces display type,
  photography-led. Deliberately *not* a generic template.
- **Categorised services** — Signature Grooms, Puppy & First-Timers, Spa &
  Wellbeing, Little Extras (tabbed).
- **Online booking** → saves the request, then offers **Add to Google Calendar**
  and a **.ics** download.
- **Reviews** — auto-scrolling Swiper carousel + on-site submission (held for
  moderation), seeded with the real 5.0 Google reviews.
- **Auto-updating gallery** — Behold.so widget mirrors the studio's Instagram; a
  curated grid stands in until it's connected.
- **Prominent contact** — phone in the header, floating Call/Book bar on mobile.
- Smooth scroll (Lenis synced to GSAP), Splitting.js heading animation, fully
  responsive, reduced-motion aware.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

No configuration needed — reviews/bookings use a local file store and the gallery
shows a curated grid until you add the env vars below.

## Optional integrations (`.env.local`, see `.env.example`)

| Feature | Env vars | Notes |
| --- | --- | --- |
| Persistent reviews + bookings | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Run `supabase/schema.sql` first. |
| Auto-updating gallery | `NEXT_PUBLIC_BEHOLD_FEED_ID` | Free feed at behold.so; owner connects Instagram once. |

Moderating reviews: submissions arrive with `approved = false`. Flip to `true`
in the Supabase dashboard (or the local `.data/reviews.json`) and they appear in
the carousel.

## Architecture

```
src/
  app/
    page.tsx              Home (all sections)
    book/page.tsx         Booking page
    api/reviews/route.ts  GET approved / POST new (moderated)
    api/bookings/route.ts POST a booking request
  components/site/        Header, Hero, Services, Gallery, Reviews, Booking, …
  lib/
    business.ts           Single source of truth for NAP + hours
    services.ts           Service menu (categorised)
    reviews.ts            Types + seed reviews
    store.ts              Supabase-or-local data layer
    calendar.ts           Google Calendar link + .ics builder
    images.ts             Placeholder photography (swap for real photos)
```

## ⚠️ Before going live — swap the placeholders

- [ ] **Opening hours** in `src/lib/business.ts` (`hours` is provisional — Google
      only showed "Opens 8:30am Sat").
- [ ] **Photography** in `src/lib/images.ts` — replace Unsplash URLs with the
      studio's own grooming photos.
- [ ] **Seed reviews** in `src/lib/reviews.ts` — replace the illustrative
      placeholders with the real Google reviews.
- [ ] **Instagram handle** in `business.social.instagram` + connect Behold.
- [ ] **Google review link** — replace the search URL in `business.googleReviewUrl`
      with the real Place ID deep link.
- [ ] Confirm the **Facebook page** (brief linked "Studio 77 Dog grooming").
- [ ] Provision **Supabase** for production (a file store won't persist on Vercel).
