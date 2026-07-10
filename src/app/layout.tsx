import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import { business } from "@/lib/business";

// Fraunces: a warm, optical serif with real personality — carries the headings.
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

// Geist: clean neutral grotesque for body copy.
const geist = Geist({
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
  openGraph: {
    title: `${business.name} — Dog Grooming in Warley, Brentwood`,
    description:
      "Independent, 5-star dog grooming in Warley, Brentwood. Book your dog in online.",
    type: "website",
    locale: "en_GB",
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
      className={`${fraunces.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
