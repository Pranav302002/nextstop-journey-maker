import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/integrations/supabase/client";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase.from("testimonials").select("*").eq("is_active", true).then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data);
    });
  }, []);

  if (testimonials.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading title="What Our Customers Say" subtitle="Real reviews from happy travellers who chose NextStop." />
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated text-center relative"
            >
              <Quote className="w-12 h-12 text-accent/20 mx-auto mb-6" />
              <p className="text-foreground text-lg md:text-xl leading-relaxed font-light italic">
                "{testimonials[current].review}"
              </p>
              <div className="flex justify-center gap-1 mt-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-5 h-5 ${j < testimonials[current].rating ? "text-accent fill-accent" : "text-border"}`} />
                ))}
              </div>
              <div className="mt-4">
                <p className="text-foreground font-bold text-lg">{testimonials[current].customer_name}</p>
                <p className="text-muted-foreground text-sm">{testimonials[current].location}</p>
                {testimonials[current].trip && <p className="text-accent text-xs font-medium mt-1">{testimonials[current].trip}</p>}
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="w-12 h-12 rounded-full bg-card shadow-card hover:shadow-card-hover flex items-center justify-center transition-all hover:-translate-y-0.5">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-accent w-8" : "bg-border hover:bg-muted-foreground/30"}`} />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full bg-card shadow-card hover:shadow-card-hover flex items-center justify-center transition-all hover:-translate-y-0.5">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
