import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Fuel, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { VEHICLE_RATES, WHATSAPP_PREFILLED } from "@/lib/constants";

const VehicleFleet = () => {
  const vehicles = Object.entries(VEHICLE_RATES);

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our Vehicle Fleet" subtitle="Choose from our range of well-maintained, comfortable vehicles for every type of journey." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map(([name, info], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all group"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Fuel className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Users className="w-4 h-4" /> {info.seats}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{info.features}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-secondary">₹{info.rate}</span>
                <span className="text-sm text-muted-foreground">/km</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link to="/booking" className="flex-1 text-center bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Book Vehicle
                </Link>
                <a href={WHATSAPP_PREFILLED(`Hi! I'd like to book a ${name}.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-muted text-foreground px-3 py-2.5 rounded-lg text-sm hover:bg-border transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleFleet;
