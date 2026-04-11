import { motion } from "framer-motion";
import { Shield, Clock, BadgeDollarSign, Star, Car, Headphones, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const features = [
  { icon: Shield, title: "Safe Travel", desc: "Background-verified drivers and sanitized vehicles on every trip.", color: "text-primary", bg: "bg-primary/10" },
  { icon: Star, title: "Professional Drivers", desc: "Experienced, courteous, and well-trained chauffeurs you can trust.", color: "text-accent", bg: "bg-accent/10" },
  { icon: BadgeDollarSign, title: "Affordable Pricing", desc: "Transparent per-km rates with absolutely no hidden charges.", color: "text-secondary", bg: "bg-secondary/10" },
  { icon: Clock, title: "On-Time Pickup", desc: "We respect your time — guaranteed punctual pickups, every time.", color: "text-primary", bg: "bg-primary/10" },
  { icon: Car, title: "Clean Vehicles", desc: "Regularly serviced, spotless interiors, and air-conditioned comfort.", color: "text-accent", bg: "bg-accent/10" },
  { icon: Headphones, title: "24/7 Booking Support", desc: "Call or WhatsApp us anytime — we're always here for you.", color: "text-secondary", bg: "bg-secondary/10" },
];

const trustBadges = [
  "1000+ Verified Trips",
  "4.8★ Customer Rating",
  "100% On-Time Record",
  "All-India Permit Vehicles",
];

const WhyChooseUs = () => (
  <section className="py-20 md:py-28 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/3" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/3" />
    
    <div className="container mx-auto px-4 relative z-10">
      <SectionHeading title="Why Choose NextStop" subtitle="We go the extra mile so you can enjoy every mile of your journey." />
      
      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {trustBadges.map(badge => (
          <span key={badge} className="inline-flex items-center gap-1.5 bg-card border border-border px-4 py-2 rounded-full text-sm font-medium text-foreground shadow-sm">
            <CheckCircle className="w-4 h-4 text-[#25D366]" />
            {badge}
          </span>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-card rounded-2xl p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center group"
          >
            <div className={`w-16 h-16 ${f.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
              <f.icon className={`w-8 h-8 ${f.color}`} />
            </div>
            <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
