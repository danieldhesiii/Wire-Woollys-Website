import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import { business } from "@/lib/business";

// Bricolage Grotesque: a contemporary display grotesque with real character —
// friendly and distinctive, deliberately not the "elegant template serif" look.
const heading = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

// Hanken Grotesk: warm, humanist body sans with a bit more personality than a
// neutral system font.
const body = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wireandwoolly.co.uk"),
  title: {
    default: `${business.name} — Dog Grooming in Warley, Brentwood`,
    template: `%s · ${business.name}`,
  },
  description:
    "Independent dog grooming in Warley, Brentwood. Full grooms, hand-stripping and puppy introductions by an award-worthy, 5-star rated groomer. Book online.",
  keywords: [
    "dog grooming Warley",
    "dog groomer Brentwood",
    "hand stripping",
    "puppy grooming",
    "Wire & Woolly",
  ],
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
  openGraph: {
    title: `${business.name} — Dog Grooming in Warley, Brentwood`,
    description:
      "Independent, 5-star dog grooming in Warley, Brentwood. Book your dog in online.",
    type: "website",
    locale: "en_GB",
    images: [{ url: "/gallery/cocker-red.jpg", width: 474, height: 1024, alt: business.name }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
