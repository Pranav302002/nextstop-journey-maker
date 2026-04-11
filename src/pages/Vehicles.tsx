import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import VehicleFleet from "@/components/home/VehicleFleet";
import FareEstimator from "@/components/FareEstimator";
import CTABanner from "@/components/home/CTABanner";

const Vehicles = () => (
  <>
    <Header />
    <main className="pt-20 md:pt-24">
      <VehicleFleet />
      <FareEstimator />
      <CTABanner />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Vehicles;
