import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, ArrowRight, Star, Snowflake } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { WHATSAPP_PREFILLED, PRICING_NOTE } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";

import vehicleSedan from "@/assets/vehicle-sedan.jpg";
import vehicleErtiga from "@/assets/vehicle-ertiga.jpg";
import vehicleInnova from "@/assets/vehicle-innova.jpg";
import vehicleCrysta from "@/assets/vehicle-crysta.jpg";
import vehicleHycross from "@/assets/vehicle-hycross.jpg";
import vehicleTempo from "@/assets/vehicle-tempo.jpg";
import vehicleUrbania from "@/assets/vehicle-urbania.jpg";

const vehicleImages: Record<string, string> = {
  "Sedan": vehicleSedan,
  "Ertiga": vehicleErtiga,
  "Innova": vehicleInnova,
  "Innova Crysta": vehicleCrysta,
  "Innova Hycross": vehicleHycross,
  "Tempo Traveller": vehicleTempo,
  "Luxury Urbania": vehicleUrbania,
};

const popularVehicles = ["Innova Crysta", "Innova Hycross", "Luxury Urbania"];

const VehicleFleet = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("vehicles").select("*").eq("is_active", true).order("price_per_km").then(({ data }) => {
      if (data) setVehicles(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our Vehicle Fleet" subtitle="Choose from our range of well-maintained, comfortable vehicles for every type of journey." />
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="bg-card rounded-2xl h-80 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group relative"
              >
                {popularVehicles.includes(v.name) && (
                  <div className="absolute top-3 right-3 z-10 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Popular
                  </div>
                )}
                <div className="h-44 overflow-hidden bg-muted">
                  <img
                    src={vehicleImages[v.name] || vehicleSedan}
                    alt={v.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground">{v.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{v.model_examples}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {v.seats} seats</span>
                    {v.is_ac && <span className="flex items-center gap-1"><Snowflake className="w-3 h-3" /> AC</span>}
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-secondary">₹{Number(v.price_per_km)}</span>
                    <span className="text-sm text-muted-foreground font-medium">/km</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Min 300 km/day • Driver allowance extra</p>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/booking?vehicle=${encodeURIComponent(v.name)}`} className="flex-1 text-center bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-sm hover:shadow-md">
                      Book Vehicle
                    </Link>
                    <a href={WHATSAPP_PREFILLED(`Hi! I'd like to book a ${v.name}.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-muted hover:bg-border text-foreground w-11 rounded-xl text-sm transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <p className="text-center text-xs text-muted-foreground mt-8">{PRICING_NOTE}</p>
      </div>
    </section>
  );
};

export default VehicleFleet;
