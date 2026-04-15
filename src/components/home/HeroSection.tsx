import { useState, useEffect } from "react";
import { MapPin, ArrowRight, Phone, Star, Shield, Clock, Users, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { PHONE_LINK, WHATSAPP_PREFILLED, DEFAULT_WHATSAPP_MSG, calcFare } from "@/lib/constants";
import { getCachedVehiclesAndRoutes } from "@/lib/cache";

const trustBadges = [
  { icon: Users, label: "5000+ Happy Customers" },
  { icon: Star, label: "4.9★ Google Rating" },
  { icon: Clock, label: "24/7 Support" },
  { icon: Shield, label: "100% Safe & Verified" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [days, setDays] = useState(1);
  const [routes, setRoutes] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    getCachedVehiclesAndRoutes().then(({ vehicles: v, routes: r }) => {
      setRoutes(r);
      setVehicles(v);
    });
  }, []);

  const matchedRoute = routes.find(r => r.to_city === destination || r.name === destination);
  const selectedVehicle = vehicles.find(v => v.name === vehicleType);
  const fare = matchedRoute && selectedVehicle
    ? calcFare(matchedRoute.distance_km, days, Number(selectedVehicle.price_per_km), matchedRoute.to_city === "Local")
    : null;

  const handleQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("pickup", "Chhatrapati Sambhajinagar");
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);
    if (vehicleType) params.set("vehicle", vehicleType);
    if (passengers > 1) params.set("passengers", String(passengers));
    if (days > 1) params.set("days", String(days));
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Ajanta Caves Heritage"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scale(1.05)", willChange: "transform" }}
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-32 md:py-0">
        <div className="max-w-5xl mx-auto">
          <div className="text-center animate-[fadeUp_0.8s_ease-out]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-card leading-[1.1] tracking-tight">
              Explore Every Journey{" "}
              <span className="relative inline-block">
                <span className="text-accent">with NextStop</span>
                <span className="absolute -bottom-2 left-0 h-1.5 bg-accent/60 rounded-full animate-[expandWidth_0.8s_ease-out_1s_forwards]" style={{ width: 0 }} />
              </span>
            </h1>
            <p className="mt-6 text-card/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Reliable cab services and tour packages from Chhatrapati Sambhajinagar
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate("/booking")} className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-accent/30">
                Book Now <ArrowRight className="w-4 h-4" />
              </button>
              <a href={PHONE_LINK} className="bg-card/15 backdrop-blur-md text-card border border-card/20 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-card/25 transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href={WHATSAPP_PREFILLED(DEFAULT_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <button onClick={() => navigate("/packages")} className="bg-card/15 backdrop-blur-md text-card border border-card/20 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-card/25 transition-colors">
                Explore Packages <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Booking Widget */}
          <form
            onSubmit={handleQuote}
            className="mt-10 bg-card/10 backdrop-blur-lg border border-card/20 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto animate-[fadeUp_0.8s_ease-out_0.4s_both]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
              <select value={destination} onChange={e => setDestination(e.target.value)} className="px-3 py-3 rounded-xl bg-card text-foreground text-sm font-medium appearance-none cursor-pointer lg:col-span-2">
                <option value="">Destination</option>
                {routes.map(r => <option key={r.id} value={r.to_city}>{r.to_city} ({r.distance_km}km)</option>)}
              </select>
              <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)} className="px-3 py-3 rounded-xl bg-card text-foreground text-sm font-medium" />
              <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="px-3 py-3 rounded-xl bg-card text-foreground text-sm font-medium appearance-none cursor-pointer">
                <option value="">Vehicle</option>
                {vehicles.map(v => <option key={v.id} value={v.name}>{v.name} - ₹{v.price_per_km}/km</option>)}
              </select>
              <input type="number" min={1} max={20} value={passengers} onChange={e => setPassengers(Number(e.target.value))} placeholder="Passengers" className="px-3 py-3 rounded-xl bg-card text-foreground text-sm font-medium" />
              <input type="number" min={1} max={10} value={days} onChange={e => setDays(Number(e.target.value))} placeholder="Days" className="px-3 py-3 rounded-xl bg-card text-foreground text-sm font-medium" />
              <button type="submit" className="bg-accent text-accent-foreground px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-accent/30">
                Get Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {fare && (
              <div className="mt-3 text-center">
                <p className="text-card font-bold text-lg">Estimated Fare: ₹{fare.totalPrice.toLocaleString()}</p>
                <p className="text-card/70 text-xs mt-1">* Min 300 km/day. Toll, parking & driver allowance extra.</p>
              </div>
            )}
          </form>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4 animate-[fadeUp_0.8s_ease-out_0.8s_both]">
            {trustBadges.map(b => (
              <div key={b.label} className="flex items-center gap-2 bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full text-card text-sm font-medium">
                <b.icon className="w-4 h-4 text-accent" />
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
