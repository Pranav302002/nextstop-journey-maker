import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const faqs = [
  { q: "How do I book a trip?", a: "You can book through our website booking form, call us directly, or send a WhatsApp message. Our team will confirm your booking within minutes." },
  { q: "Do you provide airport pickup and drop?", a: "Yes! We offer airport pickup and drop services for Aurangabad (Chhatrapati Sambhajinagar) Airport with on-time guarantee." },
  { q: "Can I book round trip services?", a: "Absolutely! We offer one-way, round trip, and multi-day package tours. Choose what suits your travel plan best." },
  { q: "Are drivers experienced and verified?", a: "All our drivers are professionally trained, background-verified, and experienced with long-distance routes across Maharashtra." },
  { q: "Do you offer group booking vehicles?", a: "Yes, we have Tempo Travellers (12-17 seats) and Urbania luxury buses for group travel, corporate events, and weddings." },
  { q: "How is the fare calculated?", a: "Fares are calculated based on vehicle type and distance (per km rates). Tolls, parking, and waiting charges may apply additionally." },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeading title="Frequently Asked Questions" subtitle="Got questions? We've got answers." />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
