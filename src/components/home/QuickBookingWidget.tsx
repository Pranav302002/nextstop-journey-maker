import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Car, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VEHICLE_RATES } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";

const QuickBookingWidget = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ pickup: "", destination: "", date: "", vehicle: "", passengers: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(form);
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <SectionHeading title="Quick Booking" subtitle="Plan your trip in seconds — fill in the details and get started." />
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl shadow-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end"
        >
          <div className="lg:col-span-1">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Pickup</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="e.g. Pune" value={form.pickup} onChange={e => setForm({...form, pickup: e.target.value})} className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="e.g. Mumbai" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Travel Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Vehicle</label>
            <div className="relative">
              <Car className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <select value={form.vehicle} onChange={e => setForm({...form, vehicle: e.target.value})} className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary appearance-none">
                <option value="">Select Vehicle</option>
                {Object.keys(VEHICLE_RATES).map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="lg:col-span-1">
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Passengers</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input type="number" min="1" max="50" placeholder="e.g. 4" value={form.passengers} onChange={e => setForm({...form, passengers: e.target.value})} className="w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>
          <button type="submit" className="bg-accent text-accent-foreground px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            Book Now <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default QuickBookingWidget;
