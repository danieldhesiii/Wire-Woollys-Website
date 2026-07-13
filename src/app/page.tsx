import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { Services } from "@/components/site/services";
import { Gallery } from "@/components/site/gallery";
import { BeforeAfter } from "@/components/site/before-after";
import { Reviews } from "@/components/site/reviews";
import { About } from "@/components/site/about";
import { Visit } from "@/components/site/visit";
import { CTA } from "@/components/site/cta";
import { Booking } from "@/components/site/booking";
import { Footer } from "@/components/site/footer";
import { MobileBar } from "@/components/site/mobile-bar";
import { getApprovedReviews } from "@/lib/store";

// Render on request so newly-approved reviews appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function Home() {
  const reviews = await getApprovedReviews();

  return (
    <>
      <Header />
      <main className="grain">
        <Hero />
        <TrustStrip />
        <Services />
        <Gallery />
        <BeforeAfter />
        <Reviews initial={reviews} />
        <About />
        <CTA />
        <Visit />
        <Booking />
      </main>
      <Footer />
      <MobileBar />
      <div className="h-16 md:hidden" aria-hidden />
    </>
  );
}
