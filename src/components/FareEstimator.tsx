import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Car, Calendar } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { calcFare, PRICING_NOTE } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";

const FareEstimator = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [distance, setDistance] = useState("");
  const [days, setDays] = useState("1");

  useEffect(() => {
    supabase.from("vehicles").select("*").eq("is_active", true).order("price_per_km").then(({ data }) => {
      if (data) setVehicles(data);
    });
  }, []);

  const km = parseFloat(distance) || 0;
  const numDays = parseInt(days) || 1;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Fare Estimator" subtitle="Compare fares across all vehicles instantly." />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-card rounded-2xl p-6 md:p-8 shadow-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Distance (KM)</label>
              <div className="relative">
                <Calculator className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="number" min="1" placeholder="e.g. 150" value={distance} onChange={e => setDistance(e.target.value)} className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Number of Days</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="number" min="1" max="10" value={days} onChange={e => setDays(e.target.value)} className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
            </div>
          </div>

          {km > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-muted-foreground">Vehicle</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground">Seats</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground">Rate</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground">Billable KM</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground">Base Fare</th>
                    <th className="text-left p-3 font-semibold text-muted-foreground">Driver</th>
                    <th className="text-left p-3 font-semibold text-secondary">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(v => {
                    const f = calcFare(km, numDays, Number(v.price_per_km));
                    return (
                      <tr key={v.id} className="border-b border-border/50">
                        <td className="p-3 font-medium">{v.name}</td>
                        <td className="p-3">{v.seats}</td>
                        <td className="p-3">₹{Number(v.price_per_km)}/km</td>
                        <td className="p-3">{f.billableDistance} km</td>
                        <td className="p-3">₹{f.baseFare.toLocaleString()}</td>
                        <td className="p-3">₹{f.driverAllowance.toLocaleString()}</td>
                        <td className="p-3 font-bold text-secondary">₹{f.totalPrice.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-4">{PRICING_NOTE}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FareEstimator;
