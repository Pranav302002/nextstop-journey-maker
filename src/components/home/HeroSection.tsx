import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Phone, Star, Shield, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { CITIES } from "@/lib/constants";

const trustBadges = [
  { icon: Users, label: "10,000+ Happy Customers" },
  { icon: Star, label: "4.9★ Rating" },
  { icon: Clock, label: "24/7 Support" },
  { icon: Shield, label: "100% Safe" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="Scenic highway through Western Ghats" className="absolute inset-0 w-full h-full object-cover scale-105" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-32 md:py-0">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-card/15 backdrop-blur-md border border-card/20 px-5 py-2 rounded-full text-sm font-medium mb-8 text-card">
              <MapPin className="w-4 h-4 text-accent" />
              Your Journey Begins With NextStop
            </motion.span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-card leading-[1.1] tracking-tight">
              Pune's Most Trusted{" "}
              <span className="relative inline-block">
                <span className="text-accent">Cab & Tour</span>
                <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1, duration: 0.8 }} className="absolute -bottom-2 left-0 h-1.5 bg-accent/60 rounded-full" />
              </span>{" "}
              Service
            </h1>

            <p className="mt-8 text-card/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Outstation cabs, tour packages, airport transfers — available 24/7
            </p>
          </motion.div>

          {/* Quick Booking Widget */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleQuote}
            className="mt-10 bg-card/10 backdrop-blur-lg border border-card/20 rounded-2xl p-4 md:p-6 max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <select value={from} onChange={e => setFrom(e.target.value)} className="px-4 py-3 rounded-xl bg-card text-foreground text-sm font-medium appearance-none cursor-pointer">
                <option value="">From City</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={to} onChange={e => setTo(e.target.value)} className="px-4 py-3 rounded-xl bg-card text-foreground text-sm font-medium appearance-none cursor-pointer">
                <option value="">To City</option>
                {CITIES.filter(c => c !== from).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)} className="px-4 py-3 rounded-xl bg-card text-foreground text-sm font-medium" />
              <button type="submit" className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-accent/30">
                Get Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {trustBadges.map(b => (
              <div key={b.label} className="flex items-center gap-2 bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full text-card text-sm font-medium">
                <b.icon className="w-4 h-4 text-accent" />
                {b.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
