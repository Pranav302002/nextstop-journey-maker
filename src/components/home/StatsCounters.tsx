import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users, Map, MapPin, Car } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "Happy Customers" },
  { icon: Map, value: 12000, suffix: "+", label: "Trips Completed" },
  { icon: MapPin, value: 150, suffix: "+", label: "Destinations Covered" },
  { icon: Car, value: 50, suffix: "+", label: "Vehicles Available" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        let start = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  return <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-secondary">{count.toLocaleString()}{suffix}</div>;
};

const StatsCounters = () => (
  <section className="py-16 md:py-20 bg-gradient-primary">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-14 h-14 bg-card/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <s.icon className="w-7 h-7 text-accent" />
            </div>
            <Counter target={s.value} suffix={s.suffix} />
            <p className="text-card/80 text-sm font-medium mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsCounters;
