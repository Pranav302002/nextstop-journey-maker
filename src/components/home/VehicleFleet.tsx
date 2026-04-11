import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, ArrowRight, Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { VEHICLE_RATES, WHATSAPP_PREFILLED } from "@/lib/constants";

import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleSuv from "@/assets/vehicle-suv.jpg";
import vehicleErtiga from "@/assets/vehicle-ertiga.jpg";
import vehicleInnova from "@/assets/vehicle-innova.jpg";
import vehicleCrysta from "@/assets/vehicle-crysta.jpg";
import vehicleHycross from "@/assets/vehicle-hycross.jpg";
import vehicleTempo from "@/assets/vehicle-tempo.jpg";
import vehicleUrbania from "@/assets/vehicle-urbania.jpg";

const vehicleImages: Record<string, string> = {
  "Sedan": vehicleSedan,
  "SUV": vehicleSuv,
  "Ertiga": vehicleErtiga,
  "Innova": vehicleInnova,
  "Innova Crysta": vehicleCrysta,
  "Innova Hycross": vehicleHycross,
  "Tempo Traveller": vehicleTempo,
  "Urbania": vehicleUrbania,
};

const popularVehicles = ["Innova Crysta", "Innova Hycross", "Urbania"];

const VehicleFleet = () => {
  const vehicles = Object.entries(VEHICLE_RATES);

  return (
    <section className="py-20 md:py-28 bg-muted/50">
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
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group relative"
            >
              {popularVehicles.includes(name) && (
                <div className="absolute top-3 right-3 z-10 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Popular
                </div>
              )}
              <div className="h-44 overflow-hidden bg-muted">
                <img
                  src={vehicleImages[name]}
                  alt={name}
                  loading="lazy"
                  width={800}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground">{name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1.5">
                  <Users className="w-4 h-4" /> {info.seats}
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{info.features}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-secondary">₹{info.rate}</span>
                  <span className="text-sm text-muted-foreground font-medium">/km</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to="/booking" className="flex-1 text-center bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-sm hover:shadow-md">
                    Book Vehicle
                  </Link>
                  <a href={WHATSAPP_PREFILLED(`Hi! I'd like to book a ${name}.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-muted hover:bg-border text-foreground w-11 rounded-xl text-sm transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleFleet;
