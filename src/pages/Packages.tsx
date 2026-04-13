import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Route, Filter, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { WHATSAPP_PREFILLED, calcFare, PRICING_NOTE } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";

const Packages = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("routes").select("*").eq("is_active", true).order("distance_km").then(({ data }) => {
      if (data) setRoutes(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    { key: "all", label: "All" },
    { key: "religious", label: "Religious Tours" },
    { key: "heritage", label: "Heritage Tours" },
    { key: "outstation", label: "Outstation" },
    { key: "local", label: "Local Sightseeing" },
  ];

  const filtered = routes.filter(r => {
    if (filter === "all") return true;
    if (filter === "religious") return ["Shirdi", "Grishneshwar", "Shani Shingnapur", "Nashik", "Bhimashankar", "Maharashtra"].some(t => r.to_city.includes(t) || r.name.includes(t));
    if (filter === "heritage") return ["Ajanta", "Ellora"].some(t => r.name.includes(t));
    if (filter === "outstation") return r.trip_type === "one_way";
    if (filter === "local") return r.to_city === "Local";
    return true;
  });

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Tour Packages & Routes" subtitle="Affordable cab packages from Chhatrapati Sambhajinagar to popular destinations" />

          <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {categories.map(c => (
              <button key={c.key} onClick={() => setFilter(c.key)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{c.label}</button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1,2,3,4].map(i => <div key={i} className="bg-card rounded-2xl h-72 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((route, i) => {
                const startingPrice = calcFare(route.distance_km, route.number_of_days, 12, route.to_city === "Local").totalPrice;
                return (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
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
                          className="flex-1 text-center bg-accent text-accent-foreground py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                        >
                          Book Now
                        </Link>
                        <a href={WHATSAPP_PREFILLED(`Hi! I'm interested in the ${route.name} package from Sambhajinagar.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 w-11 rounded-xl transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          <p className="text-center text-xs text-muted-foreground mt-8">{PRICING_NOTE}</p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Packages;
