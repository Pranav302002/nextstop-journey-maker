import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { EMAIL, PHONE } from "@/lib/constants";

const PrivacyPolicy = () => (
  <>
    <Header />
    <main className="pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeading title="Privacy Policy" />
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p>At NextStop Tours and Travels, we respect your privacy and are committed to protecting the personal information you share with us.</p>
          <h3 className="text-foreground font-bold text-lg">Information We Collect</h3>
          <p>We collect only the information necessary to process your booking: your name, phone number, and email address.</p>
          <h3 className="text-foreground font-bold text-lg">How We Use Your Information</h3>
          <p>Your information is used exclusively for booking confirmation, trip coordination, and customer support. We will never sell, rent, or share your personal data with third parties.</p>
          <h3 className="text-foreground font-bold text-lg">Data Security</h3>
          <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</p>
          <h3 className="text-foreground font-bold text-lg">Contact</h3>
          <p>For privacy-related queries, contact us at <a href={`mailto:${EMAIL}`} className="text-secondary">{EMAIL}</a>.</p>
        </div>
      </div>
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default PrivacyPolicy;
