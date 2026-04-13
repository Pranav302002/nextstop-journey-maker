import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";

const TermsAndConditions = () => (
  <>
    <Header />
    <main className="pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeading title="Terms & Conditions" />
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <h3 className="text-foreground font-bold text-lg">Pricing</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Minimum 300 km billing per day applies for all vehicles.</li>
            <li>Toll and parking charges are extra and paid at actuals by the customer.</li>
            <li>Driver allowance of ₹300 per day for outstation trips and ₹250 per day for local/within city trips is charged extra.</li>
            <li>Fares are subject to change without prior notice.</li>
          </ul>
          <h3 className="text-foreground font-bold text-lg">Booking</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>All bookings are subject to vehicle availability.</li>
            <li>Booking confirmation will be provided via phone call or WhatsApp within 30 minutes.</li>
            <li>The customer is responsible for providing accurate pickup location and contact details.</li>
          </ul>
          <h3 className="text-foreground font-bold text-lg">Liability</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>NextStop Tours and Travels is not liable for delays caused by traffic, weather, or road conditions.</li>
            <li>Passengers are advised to carry valid identification during travel.</li>
          </ul>
          <h3 className="text-foreground font-bold text-lg">Governing Law</h3>
          <p>These terms are governed by the laws of Maharashtra, India.</p>
        </div>
      </div>
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default TermsAndConditions;
