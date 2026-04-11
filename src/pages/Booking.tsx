import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Calendar, Clock, Users, Car, FileText, Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { VEHICLE_RATES, TOUR_PACKAGES } from "@/lib/constants";

const generateBookingId = () => "NS" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

interface FormData {
  name: string; phone: string; email: string; pickup: string; destination: string;
  travelDate: string; returnDate: string; pickupTime: string; passengers: string;
  vehicleType: string; tourPackage: string; tripType: string; distance: string; notes: string;
}

const initialForm: FormData = {
  name: "", phone: "", email: "", pickup: "", destination: "",
  travelDate: "", returnDate: "", pickupTime: "", passengers: "",
  vehicleType: "", tourPackage: "", tripType: "one-way", distance: "", notes: "",
};

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [step, setStep] = useState<"form" | "summary" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const pre: Partial<FormData> = {};
    if (searchParams.get("pickup")) pre.pickup = searchParams.get("pickup")!;
    if (searchParams.get("destination")) pre.destination = searchParams.get("destination")!;
    if (searchParams.get("date")) pre.travelDate = searchParams.get("date")!;
    if (searchParams.get("vehicle")) pre.vehicleType = searchParams.get("vehicle")!;
    if (searchParams.get("passengers")) pre.passengers = searchParams.get("passengers")!;
    if (Object.keys(pre).length) setForm(f => ({ ...f, ...pre }));
  }, [searchParams]);

  const update = (key: keyof FormData, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Valid phone number required";
    if (!form.pickup.trim()) e.pickup = "Pickup location is required";
    if (!form.destination.trim()) e.destination = "Destination is required";
    if (!form.travelDate) e.travelDate = "Travel date is required";
    if (!form.passengers) e.passengers = "Number of passengers required";
    if (!form.vehicleType) e.vehicleType = "Please select a vehicle";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setStep("summary");
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setBookingId(generateBookingId());
      setLoading(false);
      setStep("success");
    }, 1500);
  };

  const rate = form.vehicleType ? VEHICLE_RATES[form.vehicleType]?.rate || 0 : 0;
  const km = parseFloat(form.distance) || 0;
  const estimatedFare = rate * km;

  const inputClass = "w-full pl-10 pr-3 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary";
  const errorClass = "text-destructive text-xs mt-1";

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="Book Your Trip" subtitle="Fill in your travel details and we'll get back to you within minutes." />

          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {step === "form" && (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleReview} className="bg-card rounded-2xl p-6 md:p-8 shadow-card space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Full Name *</label>
                      <div className="relative"><User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="text" value={form.name} onChange={e => update("name", e.target.value)} className={inputClass} placeholder="Your full name" /></div>
                      {errors.name && <p className={errorClass}>{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Phone Number *</label>
                      <div className="relative"><Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} className={inputClass} placeholder="10-digit number" /></div>
                      {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                      <div className="relative"><Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="email" value={form.email} onChange={e => update("email", e.target.value)} className={inputClass} placeholder="your@email.com" /></div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Pickup Location *</label>
                      <div className="relative"><MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="text" value={form.pickup} onChange={e => update("pickup", e.target.value)} className={inputClass} placeholder="e.g. Pune" /></div>
                      {errors.pickup && <p className={errorClass}>{errors.pickup}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Destination *</label>
                      <div className="relative"><MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="text" value={form.destination} onChange={e => update("destination", e.target.value)} className={inputClass} placeholder="e.g. Mumbai" /></div>
                      {errors.destination && <p className={errorClass}>{errors.destination}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Travel Date *</label>
                      <div className="relative"><Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="date" value={form.travelDate} onChange={e => update("travelDate", e.target.value)} className={inputClass} /></div>
                      {errors.travelDate && <p className={errorClass}>{errors.travelDate}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Return Date</label>
                      <div className="relative"><Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="date" value={form.returnDate} onChange={e => update("returnDate", e.target.value)} className={inputClass} /></div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Pickup Time</label>
                      <div className="relative"><Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="time" value={form.pickupTime} onChange={e => update("pickupTime", e.target.value)} className={inputClass} /></div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Passengers *</label>
                      <div className="relative"><Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="number" min="1" max="50" value={form.passengers} onChange={e => update("passengers", e.target.value)} className={inputClass} placeholder="e.g. 4" /></div>
                      {errors.passengers && <p className={errorClass}>{errors.passengers}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Vehicle Type *</label>
                      <div className="relative"><Car className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <select value={form.vehicleType} onChange={e => update("vehicleType", e.target.value)} className={`${inputClass} appearance-none`}>
                          <option value="">Select Vehicle</option>
                          {Object.keys(VEHICLE_RATES).map(v => <option key={v} value={v}>{v} — ₹{VEHICLE_RATES[v].rate}/km</option>)}
                        </select>
                      </div>
                      {errors.vehicleType && <p className={errorClass}>{errors.vehicleType}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Tour Package</label>
                      <div className="relative"><FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <select value={form.tourPackage} onChange={e => update("tourPackage", e.target.value)} className={`${inputClass} appearance-none`}>
                          <option value="">None</option>
                          {TOUR_PACKAGES.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Trip Type</label>
                      <div className="flex gap-3 mt-1">
                        {[["one-way", "One Way"], ["round-trip", "Round Trip"], ["package", "Package Tour"]].map(([val, label]) => (
                          <label key={val} className="flex items-center gap-1.5 text-sm text-foreground cursor-pointer">
                            <input type="radio" name="tripType" value={val} checked={form.tripType === val} onChange={e => update("tripType", e.target.value)} className="accent-secondary" />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Estimated Distance (KM)</label>
                      <div className="relative"><MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" /><input type="number" min="1" value={form.distance} onChange={e => update("distance", e.target.value)} className={inputClass} placeholder="e.g. 150" /></div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Special Requests / Notes</label>
                    <textarea rows={3} value={form.notes} onChange={e => update("notes", e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary resize-none" placeholder="Any special requirements..." />
                  </div>
                  <button type="submit" className="w-full bg-accent text-accent-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    Review Booking <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              )}

              {step === "summary" && (
                <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                  <h3 className="text-xl font-bold text-foreground mb-6">Booking Summary</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      ["Name", form.name], ["Phone", form.phone], ["Pickup", form.pickup],
                      ["Destination", form.destination], ["Travel Date", form.travelDate],
                      ["Vehicle", form.vehicleType], ["Passengers", form.passengers],
                      ["Trip Type", form.tripType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-foreground">{val}</span>
                      </div>
                    ))}
                    {estimatedFare > 0 && (
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Estimated Fare</span>
                        <span className="font-bold text-secondary text-lg">₹{estimatedFare.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setStep("form")} className="flex-1 border border-border text-foreground py-3 rounded-xl font-medium hover:bg-muted transition-colors">Edit</button>
                    <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-accent text-accent-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                      {loading ? "Submitting..." : "Confirm Booking"}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl p-8 md:p-12 shadow-card text-center">
                  <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#25D366]" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Booking Submitted!</h3>
                  <p className="text-muted-foreground mt-3">Your booking reference ID:</p>
                  <p className="text-2xl font-bold text-secondary mt-2">{bookingId}</p>
                  <p className="text-muted-foreground mt-4">Our team will contact you shortly to confirm your booking.</p>
                  <button onClick={() => { setForm(initialForm); setStep("form"); }} className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                    Book Another Trip
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Booking;
