import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PackagesGrid from "@/components/home/PackagesGrid";
import VehicleFleet from "@/components/home/VehicleFleet";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StatsCounters from "@/components/home/StatsCounters";
import ServicesHighlight from "@/components/home/ServicesHighlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTABanner from "@/components/home/CTABanner";
import PricingSection from "@/components/home/PricingSection";
import GoogleMap from "@/components/home/GoogleMap";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <HowItWorks />
      <ServicesHighlight />
      <PricingSection />
      <PackagesGrid limit={6} />
      <VehicleFleet />
      <WhyChooseUs />
      <StatsCounters />
      <TestimonialsSection />
      <GoogleMap />
      <FAQSection />
      <CTABanner />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
