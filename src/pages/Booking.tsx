import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Calendar, Clock, Users, Car, CheckCircle, ArrowLeft, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { calcFare, PRICING_NOTE, PHONE, PHONE_LINK } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";

const STEPS = ["Trip Details", "Personal Details", "Confirmation"];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Data from Supabase
  const [routes, setRoutes] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  // Step 1
  const [tripType, setTripType] = useState("one_way");
  const [pickup, setPickup] = useState("Chhatrapati Sambhajinagar");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [numDays, setNumDays] = useState(1);
  const [passengers, setPassengers] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [tourPackage, setTourPackage] = useState("");
  const [estimatedDistance, setEstimatedDistance] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");

  // Step 2
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    supabase.from("routes").select("*").eq("is_active", true).order("distance_km").then(({ data }) => { if (data) setRoutes(data); });
    supabase.from("vehicles").select("*").eq("is_active", true).order("price_per_km").then(({ data }) => { if (data) setVehicles(data); });
  }, []);

  useEffect(() => {
    const p = searchParams.get("pickup") || searchParams.get("from");
    const d = searchParams.get("destination") || searchParams.get("to");
    const dt = searchParams.get("date");
    const v = searchParams.get("vehicle");
    const ps = searchParams.get("passengers");
    const dy = searchParams.get("days");
    if (p) setPickup(p);
    if (d) setDestination(d);
    if (dt) setTravelDate(dt);
    if (v) setVehicleType(v);
    if (ps) setPassengers(Number(ps));
    if (dy) setNumDays(Number(dy));
  }, [searchParams]);

  // Auto-fill distance from route
  useEffect(() => {
    if (!destination) return;
    const route = routes.find(r => r.to_city === destination || r.name === destination);
    if (route) {
      setEstimatedDistance(route.distance_km);
      if (route.number_of_days > 1) setNumDays(route.number_of_days);
      if (route.trip_type === "package") {
        setTripType("package_tour");
        setTourPackage(route.name);
      }
    }
  }, [destination, routes]);

  const selectedVehicle = vehicles.find(v => v.name === vehicleType);
  const isLocal = destination === "Local" || tripType === "package_tour";
  const effectiveDistance = tripType === "round_trip" ? estimatedDistance * 2 : estimatedDistance;

  const fareCalc = useMemo(() => {
    if (!selectedVehicle || estimatedDistance <= 0) return null;
    return calcFare(effectiveDistance, numDays, Number(selectedVehicle.price_per_km), isLocal);
  }, [selectedVehicle, effectiveDistance, numDays, isLocal]);

  const clearError = (key: string) => setErrors(e => ({ ...e, [key]: "" }));

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!pickup.trim()) e.pickup = "Pickup location required";
    if (!destination) e.destination = "Select destination";
    if (!travelDate) e.travelDate = "Select travel date";
    if (!pickupTime) e.pickupTime = "Select pickup time";
    if (!vehicleType) e.vehicleType = "Select a vehicle";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name required";
    if (!phone.trim() || !/^\d{10}$/.test(phone)) e.phone = "Valid 10-digit phone required";
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
      const ref = `NS${Date.now().toString(36).toUpperCase()}`;
      const billableDistance = fareCalc?.billableDistance || 0;
      const baseFare = fareCalc?.baseFare || 0;
      const driverAllowance = fareCalc?.driverAllowance || 0;
      const totalPrice = fareCalc?.totalPrice || 0;

      const { data, error } = await supabase.from("bookings").insert({
        booking_ref: ref,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || null,
        pickup_location: pickup.trim(),
        destination: destination,
        travel_date: travelDate,
        return_date: tripType === "round_trip" ? returnDate || null : null,
        pickup_time: pickupTime,
        number_of_days: numDays,
        passengers,
        vehicle_type: vehicleType,
        price_per_km: selectedVehicle ? Number(selectedVehicle.price_per_km) : null,
        trip_type: tripType,
        tour_package: tourPackage || null,
        estimated_distance: estimatedDistance,
        billable_distance: billableDistance,
        base_fare: baseFare,
        driver_allowance: driverAllowance,
        toll_parking_note: "Extra at actuals",
        total_price: totalPrice,
        special_requests: specialRequests.trim() || null,
        status: "pending",
        payment_status: "unpaid",
        source: "website",
      }).select("booking_ref").single();

      if (error) throw error;
      setBookingRef(data.booking_ref || ref);
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMsg = `Hello NextStop! Booking #${bookingRef} confirmed. Trip: ${pickup} to ${destination} on ${travelDate}. Vehicle: ${vehicleType}. Passengers: ${passengers}. Estimated Fare: ₹${fareCalc?.totalPrice?.toLocaleString() || "—"} + toll & parking extra.`;
  const whatsappUrl = `https://wa.me/91${PHONE}?text=${encodeURIComponent(whatsappMsg)}`;

  const inputClass = "w-full px-4 py-3 border-2 border-border rounded-xl text-sm bg-background focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  const destinations = [...new Set(routes.map(r => r.to_city))];

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

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 0 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-3 bg-card rounded-3xl p-6 md:p-10 shadow-elevated space-y-5">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Trip Details</h3>

                    {/* Trip Type */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Trip Type</label>
                      <div className="flex gap-2">
                        {[["one_way", "One Way"], ["round_trip", "Round Trip"], ["package_tour", "Package Tour"]].map(([val, label]) => (
                          <button key={val} type="button" onClick={() => setTripType(val)} className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${tripType === val ? "border-secondary bg-secondary/5 text-secondary" : "border-border text-muted-foreground"}`}>
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Pickup Location <span className="text-destructive">*</span></label>
                        <input value={pickup} onChange={e => { setPickup(e.target.value); clearError("pickup"); }} className={inputClass} placeholder="Chhatrapati Sambhajinagar" />
                        {errors.pickup && <p className="text-destructive text-xs mt-1">{errors.pickup}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Destination <span className="text-destructive">*</span></label>
                        <select value={destination} onChange={e => { setDestination(e.target.value); clearError("destination"); }} className={selectClass}>
                          <option value="">Select destination</option>
                          {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {errors.destination && <p className="text-destructive text-xs mt-1">{errors.destination}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Travel Date <span className="text-destructive">*</span></label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="date" min={today} value={travelDate} onChange={e => { setTravelDate(e.target.value); clearError("travelDate"); }} className={`${inputClass} pl-11`} />
                        </div>
                        {errors.travelDate && <p className="text-destructive text-xs mt-1">{errors.travelDate}</p>}
                      </div>
                      {tripType === "round_trip" && (
                        <div>
                          <label className="text-sm font-semibold mb-2 block">Return Date</label>
                          <input type="date" min={travelDate || today} value={returnDate} onChange={e => setReturnDate(e.target.value)} className={inputClass} />
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Pickup Time <span className="text-destructive">*</span></label>
                        <div className="relative">
                          <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="time" value={pickupTime} onChange={e => { setPickupTime(e.target.value); clearError("pickupTime"); }} className={`${inputClass} pl-11`} />
                        </div>
                        {errors.pickupTime && <p className="text-destructive text-xs mt-1">{errors.pickupTime}</p>}
                      </div>
                      {tripType === "package_tour" && (
                        <div>
                          <label className="text-sm font-semibold mb-2 block">Number of Days</label>
                          <input type="number" min={1} max={10} value={numDays} onChange={e => setNumDays(Number(e.target.value))} className={inputClass} />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Passengers</label>
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <input type="range" min={1} max={20} value={passengers} onChange={e => setPassengers(Number(e.target.value))} className="flex-1 accent-secondary" />
                          <span className="font-bold text-secondary w-8 text-center">{passengers}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Estimated Distance (km)</label>
                        <input type="number" min={1} value={estimatedDistance} onChange={e => setEstimatedDistance(Number(e.target.value))} className={inputClass} />
                      </div>
                    </div>

                    {/* Vehicle Selection */}
                    <div>
                      <label className="text-sm font-semibold mb-3 block">Select Vehicle <span className="text-destructive">*</span></label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {vehicles.map(v => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => { setVehicleType(v.name); clearError("vehicleType"); }}
                            className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                              vehicleType === v.name
                                ? "border-secondary bg-secondary/5 shadow-md"
                                : "border-border hover:border-secondary/40"
                            }`}
                          >
                            <p className="font-bold text-foreground">{v.name}</p>
                            <p className="text-xs text-muted-foreground">{v.model_examples}</p>
                            <p className="text-xs text-muted-foreground">{v.seats} seats • AC</p>
                            <p className="font-bold text-secondary mt-2">₹{Number(v.price_per_km)}/km</p>
                            {vehicleType === v.name && (
                              <div className="absolute top-2 right-2">
                                <CheckCircle className="w-5 h-5 text-secondary" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      {errors.vehicleType && <p className="text-destructive text-xs mt-1">{errors.vehicleType}</p>}
                    </div>

                    {tripType === "package_tour" && (
                      <div>
                        <label className="text-sm font-semibold mb-2 block">Tour Package (optional)</label>
                        <select value={tourPackage} onChange={e => setTourPackage(e.target.value)} className={selectClass}>
                          <option value="">Select package</option>
                          {routes.filter(r => r.trip_type === "package").map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-semibold mb-2 block">Special Requests</label>
                      <textarea value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Any special requirements..." />
                    </div>

                    <button type="button" onClick={handleNext} className="w-full bg-accent text-accent-foreground py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      Continue <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Fare Estimator Card */}
                  <div className="lg:col-span-2">
                    <div className="bg-card rounded-3xl p-6 shadow-elevated sticky top-28">
                      <h4 className="font-bold text-foreground mb-4">Fare Estimate</h4>
                      {fareCalc ? (
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">Distance</span><span className="font-semibold">{estimatedDistance} km</span></div>
                          {tripType === "round_trip" && <div className="flex justify-between"><span className="text-muted-foreground">Round trip</span><span className="font-semibold">{effectiveDistance} km</span></div>}
                          <div className="flex justify-between"><span className="text-muted-foreground">Min billable</span><span className="font-semibold">{fareCalc.minKm} km ({numDays} day × 300)</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Billable distance</span><span className="font-bold">{fareCalc.billableDistance} km</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Vehicle rate</span><span className="font-semibold">₹{Number(selectedVehicle?.price_per_km)}/km</span></div>
                          <div className="border-t border-border pt-3" />
                          <div className="flex justify-between"><span className="text-muted-foreground">Base Fare</span><span className="font-semibold">₹{fareCalc.baseFare.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Driver Allowance</span><span className="font-semibold">₹{fareCalc.driverAllowance.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Toll & Parking</span><span className="font-semibold text-accent">Extra at actuals</span></div>
                          <div className="border-t border-border pt-3" />
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-secondary text-base">TOTAL ESTIMATE</span>
                            <span className="text-2xl font-extrabold text-secondary">₹{fareCalc.totalPrice.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">* Final fare may vary based on actual distance and tolls.</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Select destination and vehicle to see fare estimate.</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-xl">{PRICING_NOTE}</p>
                    </div>
                  </div>
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
                      <label className="text-sm font-semibold mb-2 block">Email (optional)</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={`${inputClass} pl-11`} placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Pickup Address <span className="text-destructive">*</span></label>
                      <textarea value={pickupAddress} onChange={e => { setPickupAddress(e.target.value); clearError("pickupAddress"); }} rows={2} className={`${inputClass} resize-none`} placeholder="Full pickup address..." />
                      {errors.pickupAddress && <p className="text-destructive text-xs mt-1">{errors.pickupAddress}</p>}
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
                          ["Trip Type", tripType.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())],
                          ["Route", `${pickup} → ${destination}`],
                          ["Distance", estimatedDistance > 0 ? `${estimatedDistance} km` : "—"],
                          ["Date", travelDate || "—"],
                          ["Time", pickupTime || "—"],
                          ["Days", String(numDays)],
                          ["Vehicle", vehicleType || "—"],
                          ["Passengers", String(passengers)],
                        ].map(([l, v]) => (
                          <div key={l as string} className="flex justify-between">
                            <span className="text-muted-foreground">{l}</span>
                            <span className="font-semibold">{v}</span>
                          </div>
                        ))}
                      </div>
                      {fareCalc && (
                        <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">Base Fare</span><span className="font-semibold">₹{fareCalc.baseFare.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Driver Allowance</span><span className="font-semibold">₹{fareCalc.driverAllowance.toLocaleString()}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Toll & Parking</span><span className="text-accent font-semibold">Extra</span></div>
                          <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="font-semibold text-secondary">Total</span>
                            <span className="text-2xl font-extrabold text-secondary">₹{fareCalc.totalPrice.toLocaleString()}</span>
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
                  <p className="text-muted-foreground mt-3">Your booking reference:</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-secondary/10 text-secondary px-6 py-3 rounded-2xl">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-2xl font-extrabold tracking-wider">#{bookingRef}</span>
                  </div>

                  <div className="bg-muted/50 rounded-2xl p-5 mt-6 text-left space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span className="font-semibold">{pickup} → {destination}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold">{travelDate}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Vehicle</span><span className="font-semibold">{vehicleType}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Passengers</span><span className="font-semibold">{passengers}</span></div>
                    {fareCalc && (
                      <>
                        <div className="border-t border-border pt-2" />
                        <div className="flex justify-between"><span className="text-muted-foreground">Base Fare</span><span className="font-semibold">₹{fareCalc.baseFare.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Driver Allowance</span><span className="font-semibold">₹{fareCalc.driverAllowance.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Toll & Parking</span><span className="text-accent font-semibold">Extra at actuals</span></div>
                        <div className="flex justify-between pt-2 border-t border-border"><span className="font-semibold text-secondary">Total Estimate</span><span className="font-extrabold text-secondary text-lg">₹{fareCalc.totalPrice.toLocaleString()}</span></div>
                      </>
                    )}
                  </div>

                  <p className="text-muted-foreground mt-6 text-base leading-relaxed">
                    Our team will call you on <strong>+91 {PHONE.replace(/(\d{5})(\d{5})/, "$1 $2")}</strong> within <strong>30 minutes</strong> to confirm your booking.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Note: Toll and parking charges will be extra at actuals.</p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg">
                      <MessageCircle className="w-6 h-6" /> Send Booking on WhatsApp
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-3">
                    <Link to="/booking" onClick={() => window.location.reload()} className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      Book Another Trip
                    </Link>
                    <a href={PHONE_LINK} className="border-2 border-border px-8 py-3 rounded-2xl font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" /> Call Us: +91 {PHONE.replace(/(\d{5})(\d{5})/, "$1 $2")}
                    </a>
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
