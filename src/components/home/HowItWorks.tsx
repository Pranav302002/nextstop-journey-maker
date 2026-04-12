import { motion } from "framer-motion";
import { MapPin, Car, ThumbsUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  { icon: MapPin, title: "Choose Your Route", desc: "Pick from 50+ destinations across Maharashtra", color: "bg-primary" },
  { icon: Car, title: "Select & Book", desc: "Choose your vehicle, enter details, instant confirmation", color: "bg-secondary" },
  { icon: ThumbsUp, title: "Ride Comfortably", desc: "Professional driver, AC cab, on-time pickup guaranteed", color: "bg-accent" },
];

const HowItWorks = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <SectionHeading title="How It Works" subtitle="Book your trip in 3 easy steps" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className={`w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <s.icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-extrabold text-muted-foreground/20 mb-2">0{i + 1}</div>
            <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
