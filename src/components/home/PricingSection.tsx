import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/integrations/supabase/client";
import { PRICING_NOTE } from "@/lib/constants";

const PricingSection = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("vehicles").select("*").eq("is_active", true).order("price_per_km").then(({ data }) => {
      if (data) setVehicles(data);
    });
  }, []);

  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <SectionHeading title="Simple & Transparent Pricing" subtitle="No hidden charges — know exactly what you pay." />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-semibold text-foreground">Vehicle</th>
                  <th className="text-center p-4 font-semibold text-foreground">Seats</th>
                  <th className="text-center p-4 font-semibold text-foreground">Price / km</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(v => (
                  <tr key={v.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="p-4">
                      <p className="font-bold text-foreground">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.model_examples}</p>
                    </td>
                    <td className="p-4 text-center font-medium">{v.seats}</td>
                    <td className="p-4 text-center font-bold text-secondary">₹{Number(v.price_per_km)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-card rounded-xl p-4 shadow-card text-center">
              <span className="text-2xl">📏</span>
              <p className="font-bold text-foreground mt-2">Minimum 300 km billing per day</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-card text-center">
              <span className="text-2xl">🛣️</span>
              <p className="font-bold text-foreground mt-2">Toll & parking charges extra at actuals</p>
            </div>
            <div className="bg-card rounded-xl p-4 shadow-card text-center">
              <span className="text-2xl">👨‍✈️</span>
              <p className="font-bold text-foreground mt-2">Driver allowance ₹300/day outstation, ₹250/day local</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
