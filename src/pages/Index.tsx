import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesHighlight from "@/components/home/ServicesHighlight";
import PricingSection from "@/components/home/PricingSection";
import LazySection from "@/components/LazySection";
import { lazy, Suspense } from "react";

const PackagesGrid = lazy(() => import("@/components/home/PackagesGrid"));
const VehicleFleet = lazy(() => import("@/components/home/VehicleFleet"));
const WhyChooseUs = lazy(() => import("@/components/home/WhyChooseUs"));
const StatsCounters = lazy(() => import("@/components/home/StatsCounters"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTABanner = lazy(() => import("@/components/home/CTABanner"));
const GoogleMap = lazy(() => import("@/components/home/GoogleMap"));

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <HowItWorks />
      <ServicesHighlight />
      <PricingSection />
      <LazySection height="h-96">
        <Suspense fallback={null}><PackagesGrid limit={6} /></Suspense>
      </LazySection>
      <LazySection height="h-96">
        <Suspense fallback={null}><VehicleFleet /></Suspense>
      </LazySection>
      <LazySection height="h-64">
        <Suspense fallback={null}><WhyChooseUs /></Suspense>
      </LazySection>
      <LazySection height="h-48">
        <Suspense fallback={null}><StatsCounters /></Suspense>
      </LazySection>
      <LazySection height="h-64">
        <Suspense fallback={null}><TestimonialsSection /></Suspense>
      </LazySection>
      <LazySection height="h-80">
        <Suspense fallback={null}><GoogleMap /></Suspense>
      </LazySection>
      <LazySection height="h-64">
        <Suspense fallback={null}><FAQSection /></Suspense>
      </LazySection>
      <LazySection height="h-64">
        <Suspense fallback={null}><CTABanner /></Suspense>
      </LazySection>
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
