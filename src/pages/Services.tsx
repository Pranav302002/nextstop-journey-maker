import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicesHighlight from "@/components/home/ServicesHighlight";
import CTABanner from "@/components/home/CTABanner";

const Services = () => (
  <>
    <Header />
    <main className="pt-20 md:pt-24">
      <ServicesHighlight />
      <CTABanner />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Services;
