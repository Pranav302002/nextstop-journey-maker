import { motion } from "framer-motion";
import { Shield, Clock, BadgeDollarSign, Star, Car, Headphones } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const features = [
  { icon: Shield, title: "Safe Travel", desc: "Verified drivers and sanitized vehicles for every trip." },
  { icon: Star, title: "Professional Drivers", desc: "Experienced, courteous, and well-trained chauffeurs." },
  { icon: BadgeDollarSign, title: "Affordable Pricing", desc: "Transparent rates with no hidden charges." },
  { icon: Clock, title: "On-Time Pickup", desc: "We value your time — punctuality guaranteed." },
  { icon: Car, title: "Clean Vehicles", desc: "Well-maintained, comfortable, and spotless fleet." },
  { icon: Headphones, title: "24/7 Booking Support", desc: "Reach us anytime for queries and bookings." },
];

const WhyChooseUs = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <SectionHeading title="Why Choose Us" subtitle="We go the extra mile so you can enjoy every mile of your journey." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all text-center"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <f.icon className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
