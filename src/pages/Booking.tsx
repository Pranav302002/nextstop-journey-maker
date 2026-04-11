import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Calendar, Clock, Users, Car, FileText, Send, CheckCircle, ArrowLeft, Sparkles } from "lucide-react";
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
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Valid 10-digit phone number required";
    if (!form.pickup.trim()) e.pickup = "Pickup location is required";
    if (!form.destination.trim()) e.destination = "Destination is required";
    if (!form.travelDate) e.travelDate = "Travel date is required";
    if (!form.passengers) e.passengers = "Number of passengers required";
    if (!form.vehicleType) e.vehicleType = "Please select a vehicle type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep("summary");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setBookingId(generateBookingId());
      setLoading(false);
      setStep("success");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const rate = form.vehicleType ? VEHICLE_RATES[form.vehicleType]?.rate || 0 : 0;
  const km = parseFloat(form.distance) || 0;
  const estimatedFare = rate * km;

  const InputField = ({ icon: Icon, label, required, error, children }: { icon: React.ElementType; label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
    <div>
      <label className="text-sm font-semibold text-foreground mb-2 block flex items-center gap-1">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        {children}
      </div>
      {error && <p className="text-destructive text-xs mt-1.5 font-medium">{error}</p>}
    </div>
  );

  const inputClass = "w-full pl-11 pr-4 py-3 border-2 border-border rounded-xl text-sm bg-background focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all placeholder:text-muted-foreground/60";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  // Step indicators
  const steps = [
    { label: "Trip Details", active: step === "form" },
    { label: "Review", active: step === "summary" },
    { label: "Confirmed", active: step === "success" },
  ];

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Book Your Trip" subtitle="Fill in your travel details and we'll get back to you within minutes." />

          {/* Step indicator */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2">
              {steps.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    s.active ? "bg-primary text-primary-foreground shadow-sm" : 
                    (step === "success" || (step === "summary" && i === 0)) ? "bg-[#25D366]/10 text-[#25D366]" : "bg-muted text-muted-foreground"
                  }`}>
                    {(step === "success" || (step === "summary" && i === 0)) && !s.active ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    )}
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && <div className="w-8 h-0.5 bg-border rounded-full" />}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {step === "form" && (
                <motion.form key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleReview} className="bg-card rounded-3xl p-6 md:p-10 shadow-elevated space-y-6">
                  
                  <div className="bg-muted/50 rounded-2xl p-4 mb-2">
                    <h3 className="font-bold text-foreground text-base flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Personal Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField icon={User} label="Full Name" required error={errors.name}>
                      <input type="text" value={form.name} onChange={e => update("name", e.target.value)} className={inputClass} placeholder="e.g. Rajesh Patil" />
                    </InputField>
                    <InputField icon={Phone} label="Phone Number" required error={errors.phone}>
                      <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} className={inputClass} placeholder="10-digit mobile number" maxLength={10} />
                    </InputField>
                    <InputField icon={Mail} label="Email Address">
                      <input type="email" value={form.email} onChange={e => update("email", e.target.value)} className={inputClass} placeholder="your@email.com" />
                    </InputField>
                  </div>

                  <div className="bg-muted/50 rounded-2xl p-4">
                    <h3 className="font-bold text-foreground text-base flex items-center gap-2"><MapPin className="w-5 h-5 text-secondary" /> Trip Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField icon={MapPin} label="Pickup Location" required error={errors.pickup}>
                      <input type="text" value={form.pickup} onChange={e => update("pickup", e.target.value)} className={inputClass} placeholder="e.g. Pune Station" />
                    </InputField>
                    <InputField icon={MapPin} label="Destination" required error={errors.destination}>
                      <input type="text" value={form.destination} onChange={e => update("destination", e.target.value)} className={inputClass} placeholder="e.g. Shirdi" />
                    </InputField>
                    <InputField icon={Calendar} label="Travel Date" required error={errors.travelDate}>
                      <input type="date" value={form.travelDate} onChange={e => update("travelDate", e.target.value)} className={inputClass} />
                    </InputField>
                    <InputField icon={Calendar} label="Return Date">
                      <input type="date" value={form.returnDate} onChange={e => update("returnDate", e.target.value)} className={inputClass} />
                    </InputField>
                    <InputField icon={Clock} label="Pickup Time">
                      <input type="time" value={form.pickupTime} onChange={e => update("pickupTime", e.target.value)} className={inputClass} />
                    </InputField>
                    <InputField icon={Users} label="Passengers" required error={errors.passengers}>
                      <input type="number" min="1" max="50" value={form.passengers} onChange={e => update("passengers", e.target.value)} className={inputClass} placeholder="e.g. 4" />
                    </InputField>
                  </div>

                  <div className="bg-muted/50 rounded-2xl p-4">
                    <h3 className="font-bold text-foreground text-base flex items-center gap-2"><Car className="w-5 h-5 text-accent" /> Vehicle & Package</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField icon={Car} label="Vehicle Type" required error={errors.vehicleType}>
                      <select value={form.vehicleType} onChange={e => update("vehicleType", e.target.value)} className={selectClass}>
                        <option value="">Select Vehicle</option>
                        {Object.keys(VEHICLE_RATES).map(v => <option key={v} value={v}>{v} — ₹{VEHICLE_RATES[v].rate}/km</option>)}
                      </select>
                    </InputField>
                    <InputField icon={FileText} label="Tour Package">
                      <select value={form.tourPackage} onChange={e => update("tourPackage", e.target.value)} className={selectClass}>
                        <option value="">None (Custom Trip)</option>
                        {TOUR_PACKAGES.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                      </select>
                    </InputField>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-3 block">Trip Type</label>
                      <div className="flex gap-2 flex-wrap">
                        {[["one-way", "One Way"], ["round-trip", "Round Trip"], ["package", "Package Tour"]].map(([val, label]) => (
                          <label key={val} className={`cursor-pointer px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                            form.tripType === val ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-muted-foreground hover:border-border/80"
                          }`}>
                            <input type="radio" name="tripType" value={val} checked={form.tripType === val} onChange={e => update("tripType", e.target.value)} className="sr-only" />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <InputField icon={MapPin} label="Estimated Distance (KM)">
                      <input type="number" min="1" value={form.distance} onChange={e => update("distance", e.target.value)} className={inputClass} placeholder="e.g. 150" />
                    </InputField>
                  </div>

                  {estimatedFare > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-secondary/5 border-2 border-secondary/20 rounded-2xl p-5 text-center">
                      <p className="text-sm text-muted-foreground">Estimated Trip Fare</p>
                      <p className="text-3xl font-extrabold text-secondary mt-1">₹{estimatedFare.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-2">Final fare may vary based on tolls, parking & waiting charges.</p>
                    </motion.div>
                  )}

                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Special Requests / Notes</label>
                    <textarea rows={3} value={form.notes} onChange={e => update("notes", e.target.value)} className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm bg-background focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 resize-none transition-all placeholder:text-muted-foreground/60" placeholder="Any special requirements..." />
                  </div>

                  <button type="submit" className="w-full bg-accent text-accent-foreground py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                    Review Booking <Send className="w-5 h-5" />
                  </button>
                </motion.form>
              )}

              {step === "summary" && (
                <motion.div key="summary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-card rounded-3xl p-6 md:p-10 shadow-elevated">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Review Your Booking</h3>
                  <p className="text-muted-foreground text-sm mb-8">Please verify your trip details before confirming.</p>
                  
                  <div className="space-y-0 rounded-2xl border-2 border-border overflow-hidden">
                    {[
                      ["Full Name", form.name],
                      ["Phone", form.phone],
                      ["Pickup", form.pickup],
                      ["Destination", form.destination],
                      ["Travel Date", form.travelDate],
                      ...(form.returnDate ? [["Return Date", form.returnDate]] : []),
                      ...(form.pickupTime ? [["Pickup Time", form.pickupTime]] : []),
                      ["Vehicle", form.vehicleType],
                      ["Passengers", form.passengers],
                      ["Trip Type", form.tripType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())],
                      ...(form.tourPackage ? [["Package", form.tourPackage]] : []),
                    ].map(([label, val], i) => (
                      <div key={label} className={`flex justify-between items-center px-5 py-3.5 text-sm ${i % 2 === 0 ? "bg-muted/30" : "bg-card"}`}>
                        <span className="text-muted-foreground font-medium">{label}</span>
                        <span className="font-semibold text-foreground text-right">{val}</span>
                      </div>
                    ))}
                    {estimatedFare > 0 && (
                      <div className="flex justify-between items-center px-5 py-4 bg-secondary/5 border-t-2 border-secondary/20">
                        <span className="text-secondary font-semibold">Estimated Fare</span>
                        <span className="font-extrabold text-secondary text-2xl">₹{estimatedFare.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setStep("form")} className="flex-1 flex items-center justify-center gap-2 border-2 border-border text-foreground py-3.5 rounded-2xl font-semibold hover:bg-muted transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Edit Details
                    </button>
                    <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-accent text-accent-foreground py-3.5 rounded-2xl font-bold shadow-lg shadow-accent/20 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                      {loading ? (
                        <><span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" /> Submitting...</>
                      ) : (
                        <>Confirm Booking <CheckCircle className="w-5 h-5" /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-3xl p-10 md:p-14 shadow-elevated text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-8"
                  >
                    <CheckCircle className="w-12 h-12 text-[#25D366]" />
                  </motion.div>
                  <h3 className="text-3xl font-extrabold text-foreground">Booking Submitted!</h3>
                  <p className="text-muted-foreground mt-3 text-base">Your booking reference ID:</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-secondary/10 text-secondary px-6 py-3 rounded-2xl">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-2xl font-extrabold tracking-wider">{bookingId}</span>
                  </div>
                  <p className="text-muted-foreground mt-6 text-base leading-relaxed max-w-md mx-auto">
                    Our team will contact you shortly to confirm your booking. You can also reach us on WhatsApp for faster response.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <button onClick={() => { setForm(initialForm); setStep("form"); setErrors({}); }} className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-bold hover:opacity-90 transition-opacity">
                      Book Another Trip
                    </button>
                  </div>
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
