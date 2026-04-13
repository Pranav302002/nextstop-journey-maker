import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { EMAIL, PHONE } from "@/lib/constants";

const CancellationPolicy = () => (
  <>
    <Header />
    <main className="pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeading title="Cancellation Policy" />
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <h3 className="text-foreground font-bold text-lg">Cancellation Terms</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>24+ hours before trip:</strong> Free cancellation, full refund.</li>
            <li><strong>Within 24 hours:</strong> 50% cancellation charge applies.</li>
            <li><strong>No-show:</strong> No refund will be provided.</li>
          </ul>
          <h3 className="text-foreground font-bold text-lg">Refund Process</h3>
          <p>Refunds will be processed within 5-7 working days from the date of cancellation approval.</p>
          <h3 className="text-foreground font-bold text-lg">Contact for Cancellation</h3>
          <p>To cancel a booking, please contact us at:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Phone: +91 {PHONE.replace(/(\d{5})(\d{5})/, "$1 $2")}</li>
            <li>Email: <a href={`mailto:${EMAIL}`} className="text-secondary">{EMAIL}</a></li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default CancellationPolicy;
