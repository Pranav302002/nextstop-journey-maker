import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { PHONE_LINK, WHATSAPP_PREFILLED, BOOKING_WHATSAPP_MSG } from "@/lib/constants";

const HeroSection = () => (
  <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
    <img src={heroBg} alt="Scenic highway" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
    <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
    
    <div className="relative z-10 container mx-auto px-4 py-32 md:py-40 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <span className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent-foreground border border-accent/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <MapPin className="w-4 h-4" />
          Your Journey Begins With NextStop
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-card leading-tight max-w-5xl mx-auto">
          Explore Every Journey with{" "}
          <span className="text-accent">NextStop Tours & Travels</span>
        </h1>
        <p className="mt-6 text-card/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Comfortable rides, trusted service, and memorable travel experiences for every trip.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4"
      >
        <Link to="/booking" className="bg-accent text-accent-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base hover:opacity-90 transition-opacity shadow-lg">
          Book Now
        </Link>
        <Link to="/packages" className="bg-card/10 backdrop-blur-sm text-card border border-card/20 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base hover:bg-card/20 transition-colors">
          Explore Packages
        </Link>
        <a href={PHONE_LINK} className="flex items-center gap-2 bg-card text-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base hover:bg-muted transition-colors">
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <a href={WHATSAPP_PREFILLED(BOOKING_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-card px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-base hover:opacity-90 transition-opacity">
          <MessageCircle className="w-4 h-4" /> WhatsApp Us
        </a>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
