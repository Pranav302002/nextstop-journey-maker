import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { PHONE_LINK, WHATSAPP_PREFILLED, BOOKING_WHATSAPP_MSG } from "@/lib/constants";

const CTABanner = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-gradient-primary rounded-3xl p-10 md:p-16 text-center overflow-hidden"
      >
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-card/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm text-card text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent" /> Limited Time Offers Available
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-card leading-tight">Ready to Start Your Journey?</h2>
          <p className="text-card/80 mt-5 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light">
            Book your trip today and experience the comfort and reliability of NextStop Tours and Travels.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="group bg-accent text-accent-foreground px-10 py-4 rounded-2xl font-bold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
              Book Your Trip <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={PHONE_LINK} className="flex items-center gap-2 bg-card text-foreground px-8 py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a href={WHATSAPP_PREFILLED(BOOKING_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-card px-8 py-4 rounded-2xl font-bold text-base shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTABanner;
