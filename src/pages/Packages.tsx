import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PackagesGrid from "@/components/home/PackagesGrid";
import CTABanner from "@/components/home/CTABanner";

const Packages = () => (
  <>
    <Header />
    <main className="pt-20 md:pt-24">
      <PackagesGrid />
      <CTABanner />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Packages;
