import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight, Route } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { WHATSAPP_PREFILLED, PRICING_NOTE, calcFare } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";

interface Props { limit?: number }

const PackagesGrid = ({ limit }: Props) => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = supabase.from("routes").select("*").eq("is_active", true).order("distance_km");
    q.then(({ data }) => {
      if (data) setRoutes(data);
      setLoading(false);
    });
  }, []);

  const items = limit ? routes.slice(0, limit) : routes;

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading title="Popular Tour Packages" subtitle="Handpicked travel experiences from Chhatrapati Sambhajinagar." />
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="bg-card rounded-2xl h-64 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((route, i) => {
              const startingPrice = calcFare(route.distance_km, route.number_of_days, 12, route.to_city === "Local").totalPrice;
              return (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="bg-gradient-primary p-5 text-primary-foreground">
                    <div className="flex items-center justify-between text-sm opacity-80 mb-2">
                      <span className="flex items-center gap-1"><Route className="w-4 h-4" /> {route.distance_km} km</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {route.number_of_days} day{route.number_of_days > 1 ? "s" : ""}</span>
                    </div>
                    <h3 className="text-lg font-bold">{route.name}</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{route.from_city}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>{route.to_city}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    {route.description && <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{route.description}</p>}
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="text-2xl font-extrabold text-secondary">₹{startingPrice.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">* Toll, parking & driver allowance extra</p>
                    <div className="mt-4 flex gap-2">
                      <Link
                        to={`/booking?pickup=${encodeURIComponent(route.from_city)}&destination=${encodeURIComponent(route.to_city)}&days=${route.number_of_days}`}
                        className="flex-1 text-center bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-sm hover:shadow-md"
                      >
                        Book Now
                      </Link>
                      <a href={WHATSAPP_PREFILLED(`Hi! I'm interested in the ${route.name} package.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 w-11 rounded-xl text-sm transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        {limit && routes.length > (limit || 0) && (
          <div className="text-center mt-12">
            <Link to="/packages" className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-10 py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              View All Packages <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesGrid;
