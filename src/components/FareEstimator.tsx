import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Car } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { VEHICLE_RATES } from "@/lib/constants";

const FareEstimator = () => {
  const [vehicle, setVehicle] = useState("");
  const [distance, setDistance] = useState("");

  const rate = vehicle ? VEHICLE_RATES[vehicle]?.rate || 0 : 0;
  const km = parseFloat(distance) || 0;
  const fare = rate * km;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-xl">
        <SectionHeading title="Fare Estimator" subtitle="Get an instant fare estimate for your trip." />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-6 md:p-8 shadow-card"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Vehicle Type</label>
              <div className="relative">
                <Car className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <select value={vehicle} onChange={e => setVehicle(e.target.value)} className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary appearance-none">
                  <option value="">Select Vehicle</option>
                  {Object.keys(VEHICLE_RATES).map(v => (
                    <option key={v} value={v}>{v} — ₹{VEHICLE_RATES[v].rate}/km</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Distance (KM)</label>
              <div className="relative">
                <Calculator className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input type="number" min="1" placeholder="e.g. 150" value={distance} onChange={e => setDistance(e.target.value)} className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
            </div>
          </div>

          {fare > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 bg-muted rounded-xl p-5 text-center">
              <p className="text-sm text-muted-foreground">Estimated Fare</p>
              <p className="text-3xl font-bold text-secondary mt-1">₹{fare.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-3">Final fare may vary based on tolls, parking, waiting charges, and trip type.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FareEstimator;
