import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  { name: "Rajesh Patil", rating: 5, review: "Amazing service from NextStop! The driver was very professional and the vehicle was spotless. Will definitely book again for our family trips." },
  { name: "Sneha Kulkarni", rating: 5, review: "Booked a Shirdi trip for my parents. Everything was perfectly arranged — pickup on time, comfortable Innova, and very polite driver." },
  { name: "Amit Deshmukh", rating: 5, review: "Best cab service in Pune! We used NextStop for our corporate event and everything went smoothly. Highly recommended." },
  { name: "Priya Joshi", rating: 4, review: "Lonavala weekend getaway was fantastic. The booking process was easy and the vehicle was very clean. Great value for money." },
  { name: "Vikram Sharma", rating: 5, review: "I regularly use NextStop for airport pickups. Never been late, always clean cars, and very reasonable rates. Excellent service!" },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="What Our Customers Say" subtitle="Real reviews from happy travellers who chose NextStop." />
        <div className="max-w-2xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl p-8 md:p-10 shadow-card text-center"
            >
              <Quote className="w-10 h-10 text-accent/30 mx-auto mb-4" />
              <p className="text-foreground text-lg leading-relaxed italic">"{testimonials[current].review}"</p>
              <div className="flex justify-center gap-1 mt-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-5 h-5 ${j < testimonials[current].rating ? "text-accent fill-accent" : "text-border"}`} />
                ))}
              </div>
              <p className="text-foreground font-semibold mt-3">{testimonials[current].name}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
