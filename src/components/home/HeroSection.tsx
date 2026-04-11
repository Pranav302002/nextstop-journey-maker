import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { PHONE_LINK, WHATSAPP_PREFILLED, BOOKING_WHATSAPP_MSG } from "@/lib/constants";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img src={heroBg} alt="Scenic highway through Western Ghats" className="absolute inset-0 w-full h-full object-cover scale-105" width={1920} height={1080} />
    {/* Premium gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/50 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
    
    {/* Decorative elements */}
    <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
    <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

    <div className="relative z-10 container mx-auto px-4 py-32 md:py-0">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-card/15 backdrop-blur-md border border-card/20 px-5 py-2 rounded-full text-sm font-medium mb-8 text-card"
          >
            <MapPin className="w-4 h-4 text-accent" />
            Your Journey Begins With NextStop
          </motion.span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-card leading-[1.1] tracking-tight">
            Explore Every Journey with{" "}
            <span className="relative inline-block">
              <span className="text-accent">NextStop</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-1.5 bg-accent/60 rounded-full"
              />
            </span>
          </h1>
          
          <p className="mt-8 text-card/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Comfortable rides, trusted service, and memorable travel experiences for every trip across Maharashtra and beyond.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4"
        >
          <Link to="/booking" className="group relative bg-accent text-accent-foreground px-8 py-4 rounded-2xl font-bold text-base shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300">
            Book Now
            <span className="absolute inset-0 rounded-2xl bg-card/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link to="/packages" className="bg-card/10 backdrop-blur-md text-card border-2 border-card/25 px-8 py-4 rounded-2xl font-bold text-base hover:bg-card/20 hover:border-card/40 transition-all duration-300">
            Explore Packages
          </Link>
          <a href={PHONE_LINK} className="flex items-center gap-2 bg-card text-foreground px-7 py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <Phone className="w-5 h-5" /> Call Now
          </a>
          <a href={WHATSAPP_PREFILLED(BOOKING_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-card px-7 py-4 rounded-2xl font-bold text-base shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <MessageCircle className="w-5 h-5" /> WhatsApp Us
          </a>
        </motion.div>
      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <ChevronDown className="w-8 h-8 text-card/50" />
    </motion.div>
  </section>
);

export default HeroSection;
