import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { PHONE_LINK, WHATSAPP_PREFILLED, BOOKING_WHATSAPP_MSG } from "@/lib/constants";

const CTABanner = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-primary rounded-3xl p-8 md:p-14 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-card">Ready to Start Your Journey?</h2>
        <p className="text-card/80 mt-4 text-lg max-w-xl mx-auto">Book your trip today and experience the comfort and reliability of NextStop Tours and Travels.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/booking" className="bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Book Your Trip
          </Link>
          <a href={PHONE_LINK} className="flex items-center gap-2 bg-card text-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-muted transition-colors">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a href={WHATSAPP_PREFILLED(BOOKING_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-card px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTABanner;
