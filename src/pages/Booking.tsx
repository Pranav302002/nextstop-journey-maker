import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Calendar, Clock, Users, Car, Send, CheckCircle, ArrowLeft, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { CITIES, VEHICLE_OPTIONS } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";

const STEPS = ["Trip Details", "Personal Details", "Confirmation"];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [vehicleType, setVehicleType] = useState("");

  // Step 2
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Routes from Supabase
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("routes").select("*").eq("is_active", true).then(({ data }) => {
      if (data) setRoutes(data);
    });
  }, []);

  useEffect(() => {
    const f = searchParams.get("from") || searchParams.get("pickup") || "";
    const t = searchParams.get("to") || searchParams.get("destination") || "";
    const d = searchParams.get("date") || "";
    if (f) setFromCity(f);
    if (t) setToCity(t);
    if (d) setTravelDate(d);
  }, [searchParams]);

  const matchedRoute = useMemo(() => {
    if (!fromCity || !toCity) return null;
    return routes.find(r =>
      r.from_city.toLowerCase() === fromCity.toLowerCase() &&
      r.to_city.toLowerCase() === toCity.toLowerCase()
    ) || routes.find(r =>
      r.to_city.toLowerCase() === fromCity.toLowerCase() &&
      r.from_city.toLowerCase() === toCity.toLowerCase()
    );
  }, [fromCity, toCity, routes]);

  const estimatedFare = useMemo(() => {
    if (!matchedRoute || !vehicleType) return 0;
    const v = VEHICLE_OPTIONS.find(o => o.type === vehicleType);
    if (!v) return 0;
    return matchedRoute.distance_km * v.rate;
  }, [matchedRoute, vehicleType]);

  const distanceKm = matchedRoute?.distance_km || 0;

  const today = new Date().toISOString().split("T")[0];

  const clearError = (key: string) => setErrors(e => ({ ...e, [key]: "" }));

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!fromCity) e.fromCity = "Select pickup city";
    if (!toCity) e.toCity = "Select destination";
    if (fromCity && toCity && fromCity === toCity) e.toCity = "Destination must differ from pickup";
    if (!travelDate) e.travelDate = "Select travel date";
    if (!vehicleType) e.vehicleType = "Select a vehicle";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name required";
    if (!phone.trim() || !/^\d{10}$/.test(phone)) e.phone = "Valid 10-digit phone required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required";
    if (!pickupAddress.trim()) e.pickupAddress = "Pickup address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && validateStep1()) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleConfirm = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from("bookings").insert({
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim(),
        from_city: fromCity,
        to_city: toCity,
        travel_date: travelDate,
        travel_time: travelTime || null,
        passengers,
        vehicle_type: vehicleType,
        pickup_address: pickupAddress.trim(),
        special_requests: specialRequests.trim() || null,
        total_price: estimatedFare || null,
        status: "pending",
        payment_status: "unpaid",
      }).select("id").single();

      if (error) throw error;
      setBookingId(data.id.substring(0, 8).toUpperCase());
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMsg = `Hi! My booking ID is ${bookingId}. I just booked ${fromCity} to ${toCity} on ${travelDate}`;
  const whatsappUrl = `https://wa.me/919822995657?text=${encodeURIComponent(whatsappMsg)}`;

  const inputClass = "w-full px-4 py-3 border-2 border-border rounded-xl text-sm bg-background focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading title="Book Your Trip" subtitle="Plan your journey in 3 easy steps" />

          {/* Step indicator */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    step === i ? "bg-primary text-primary-foreground shadow-sm" :
                    step > i ? "bg-[#25D366]/10 text-[#25D366]" : "bg-muted text-muted-foreground"
                  }`}>
                    {step > i ? <CheckCircle className="w-4 h-4" /> : <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs font-bold">{i + 1}</span>}
                    <span className="hidden sm:inline">{s}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className="w-8 h-0.5 bg-border rounded-full" />}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {/* STEP 1: Trip Details */}
              {step === 0 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-card rounded-3xl p-6 md:p-10 shadow-elevated space-y-6">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Trip Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">From City <span className="text-destructive">*</span></label>
                      <select value={fromCity} onChange={e => { setFromCity(e.target.value); clearError("fromCity"); }} className={selectClass}>
                        <option value="">Select pickup city</option>
                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.fromCity && <p className="text-destructive text-xs mt-1">{errors.fromCity}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">To City <span className="text-destructive">*</span></label>
                      <select value={toCity} onChange={e => { setToCity(e.target.value); clearError("toCity"); }} className={selectClass}>
                        <option value="">Select destination</option>
                        {CITIES.filter(c => c !== fromCity).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.toCity && <p className="text-destructive text-xs mt-1">{errors.toCity}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Travel Date <span className="text-destructive">*</span></label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="date" min={today} value={travelDate} onChange={e => { setTravelDate(e.target.value); clearError("travelDate"); }} className={`${inputClass} pl-11`} />
                      </div>
                      {errors.travelDate && <p className="text-destructive text-xs mt-1">{errors.travelDate}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Travel Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="time" value={travelTime} onChange={e => setTravelTime(e.target.value)} className={`${inputClass} pl-11`} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Passengers</label>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <input type="range" min={1} max={12} value={passengers} onChange={e => setPassengers(Number(e.target.value))} className="flex-1 accent-secondary" />
                      <span className="font-bold text-secondary w-8 text-center">{passengers}</span>
                    </div>
                  </div>

                  {/* Vehicle Selection */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">Select Vehicle <span className="text-destructive">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {VEHICLE_OPTIONS.map(v => {
                        const price = distanceKm > 0 ? distanceKm * v.rate : 0;
                        return (
                          <button
                            key={v.type}
                            type="button"
                            onClick={() => { setVehicleType(v.type); clearError("vehicleType"); }}
                            className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                              vehicleType === v.type
                                ? "border-secondary bg-secondary/5 shadow-md"
                                : "border-border hover:border-secondary/40"
                            }`}
                          >
                            <div className="text-2xl mb-2">{v.icon}</div>
                            <p className="font-bold text-foreground">{v.type}</p>
                            <p className="text-xs text-muted-foreground">{v.features}</p>
                            <p className="text-xs text-muted-foreground">{v.seats} seats</p>
                            <p className="font-bold text-secondary mt-2">₹{v.rate}/km</p>
                            {price > 0 && (
                              <p className="text-xs text-accent font-semibold mt-1">≈ ₹{price.toLocaleString()}</p>
                            )}
                            {vehicleType === v.type && (
                              <div className="absolute top-2 right-2">
                                <CheckCircle className="w-5 h-5 text-secondary" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {errors.vehicleType && <p className="text-destructive text-xs mt-1">{errors.vehicleType}</p>}
                  </div>

                  {/* Live fare estimate */}
                  {estimatedFare > 0 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-secondary/5 border-2 border-secondary/20 rounded-2xl p-5 text-center">
                      <p className="text-sm text-muted-foreground">Estimated Fare ({distanceKm} km)</p>
                      <p className="text-3xl font-extrabold text-secondary mt-1">₹{estimatedFare.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-2">Final fare may vary based on tolls, parking & waiting charges.</p>
                    </motion.div>
                  )}

                  <button type="button" onClick={handleNext} className="w-full bg-accent text-accent-foreground py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Personal Details */}
              {step === 1 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-3 bg-card rounded-3xl p-6 md:p-10 shadow-elevated space-y-5">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Your Details</h3>

                    <div>
                      <label className="text-sm font-semibold mb-2 block">Full Name <span className="text-destructive">*</span></label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input value={name} onChange={e => { setName(e.target.value); clearError("name"); }} className={`${inputClass} pl-11`} placeholder="e.g. Rajesh Patil" />
                      </div>
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Phone Number <span className="text-destructive">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input value={phone} onChange={e => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); clearError("phone"); }} className={`${inputClass} pl-11`} placeholder="10-digit mobile" maxLength={10} />
                      </div>
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Email <span className="text-destructive">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="email" value={email} onChange={e => { setEmail(e.target.value); clearError("email"); }} className={`${inputClass} pl-11`} placeholder="your@email.com" />
                      </div>
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Pickup Address <span className="text-destructive">*</span></label>
                      <textarea value={pickupAddress} onChange={e => { setPickupAddress(e.target.value); clearError("pickupAddress"); }} rows={2} className={`${inputClass} resize-none`} placeholder="Full pickup address..." />
                      {errors.pickupAddress && <p className="text-destructive text-xs mt-1">{errors.pickupAddress}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Special Requests</label>
                      <textarea value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Any special requirements..." />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep(0)} className="flex-1 flex items-center justify-center gap-2 border-2 border-border py-3.5 rounded-2xl font-semibold hover:bg-muted transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button onClick={handleConfirm} disabled={loading} className="flex-1 bg-accent text-accent-foreground py-3.5 rounded-2xl font-bold shadow-lg shadow-accent/20 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {loading ? <><span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" /> Submitting...</> : <>Confirm Booking <CheckCircle className="w-5 h-5" /></>}
                      </button>
                    </div>
                  </div>

                  {/* Right side summary */}
                  <div className="lg:col-span-2">
                    <div className="bg-card rounded-3xl p-6 shadow-elevated sticky top-28">
                      <h4 className="font-bold text-foreground mb-4">Booking Summary</h4>
                      <div className="space-y-3 text-sm">
                        {[
                          ["Route", `${fromCity} → ${toCity}`],
                          ["Distance", distanceKm > 0 ? `${distanceKm} km` : "—"],
                          ["Date", travelDate || "—"],
                          ...(travelTime ? [["Time", travelTime]] : []),
                          ["Vehicle", vehicleType || "—"],
                          ["Passengers", String(passengers)],
                        ].map(([l, v]) => (
                          <div key={l as string} className="flex justify-between">
                            <span className="text-muted-foreground">{l}</span>
                            <span className="font-semibold">{v}</span>
                          </div>
                        ))}
                      </div>
                      {estimatedFare > 0 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-secondary">Total Fare</span>
                            <span className="text-2xl font-extrabold text-secondary">₹{estimatedFare.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Confirmation */}
              {step === 2 && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-3xl p-10 md:p-14 shadow-elevated text-center max-w-2xl mx-auto">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }} className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-[#25D366]" />
                  </motion.div>
                  <h3 className="text-3xl font-extrabold text-foreground">Booking Confirmed!</h3>
                  <p className="text-muted-foreground mt-3">Your booking reference ID:</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-secondary/10 text-secondary px-6 py-3 rounded-2xl">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-2xl font-extrabold tracking-wider">{bookingId}</span>
                  </div>

                  <div className="bg-muted/50 rounded-2xl p-5 mt-6 text-left space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span className="font-semibold">{fromCity} → {toCity}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold">{travelDate}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Vehicle</span><span className="font-semibold">{vehicleType}</span></div>
                    {estimatedFare > 0 && <div className="flex justify-between pt-2 border-t border-border"><span className="font-semibold text-secondary">Total</span><span className="font-extrabold text-secondary text-lg">₹{estimatedFare.toLocaleString()}</span></div>}
                  </div>

                  <p className="text-muted-foreground mt-6 text-base leading-relaxed">
                    Our team will call you within <strong>30 minutes</strong> to confirm your booking.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg">
                      <MessageCircle className="w-6 h-6" /> Chat on WhatsApp
                    </a>
                    <Link to="/booking" onClick={() => window.location.reload()} className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      Book Another Trip
                    </Link>
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
