import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Route, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/integrations/supabase/client";

const Packages = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("routes").select("*").eq("is_active", true).order("distance_km").then(({ data }) => {
      if (data) setRoutes(data);
      setLoading(false);
    });
  }, []);

  const destinations = [...new Set(routes.map(r => r.to_city))];
  const filtered = filter ? routes.filter(r => r.to_city === filter) : routes;

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Tour Packages & Routes" subtitle="Affordable outstation cab packages from Pune to popular destinations" />

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <button onClick={() => setFilter("")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!filter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>All</button>
            {destinations.map(d => (
              <button key={d} onClick={() => setFilter(d)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{d}</button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading routes...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((route, i) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
                >
                  <div className="bg-gradient-primary p-5 text-primary-foreground">
                    <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
                      <Route className="w-4 h-4" />
                      {route.distance_km} km
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
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Sedan</span><span className="font-semibold">₹{Number(route.base_price_sedan).toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">SUV</span><span className="font-semibold">₹{Number(route.base_price_suv).toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Tempo</span><span className="font-semibold">₹{Number(route.base_price_tempo).toLocaleString()}</span></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">Starting from</p>
                    <p className="text-2xl font-extrabold text-secondary">₹{Number(route.base_price_sedan).toLocaleString()}</p>
                    <Link
                      to={`/booking?from=${encodeURIComponent(route.from_city)}&to=${encodeURIComponent(route.to_city)}`}
                      className="mt-4 w-full bg-accent text-accent-foreground py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      Book Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Packages;
