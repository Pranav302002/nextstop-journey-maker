import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Lock, RefreshCw, Phone, Filter, MessageCircle, Mail, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PHONE, PHONE2, EMAIL } from "@/lib/constants";

const ADMIN_PASSWORD = "NextStop@2003";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (attempts >= 3) {
      setError("Too many attempts. Please try again later.");
      return;
    }
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setAttempts(a => a + 1);
      setError(`Incorrect password (${3 - attempts - 1} attempts remaining)`);
    }
  };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (data) setBookings(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetchBookings();
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, [authenticated, fetchBookings]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    fetchBookings();
  };

  const filtered = bookings.filter(b => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (b.customer_name?.toLowerCase().includes(q) || b.customer_phone?.includes(q) || b.booking_ref?.toLowerCase().includes(q));
    }
    return true;
  });

  const todaysBookings = bookings.filter(b => {
    const today = new Date().toISOString().split("T")[0];
    return b.created_at?.startsWith(today);
  }).length;

  const totalRevenue = bookings.filter(b => b.payment_status === "paid").reduce((sum, b) => sum + (Number(b.total_price) || 0), 0);
  const pendingCount = bookings.filter(b => b.status === "pending").length;

  if (!authenticated) {
    return (
      <>
        <meta name="robots" content="noindex, nofollow" />
        <div className="min-h-screen bg-muted flex items-center justify-center px-4">
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleLogin} className="bg-card rounded-2xl p-8 shadow-elevated max-w-sm w-full">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-center mb-6">Admin Login</h1>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm bg-background focus:outline-none focus:border-primary mb-3" disabled={attempts >= 3} />
            {error && <p className="text-destructive text-sm mb-3">{error}</p>}
            <button type="submit" disabled={attempts >= 3} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold disabled:opacity-50">Login</button>
          </motion.form>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <h1 className="text-lg font-bold">NextStop Admin</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 {PHONE}</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 {PHONE2}</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {EMAIL}</span>
            <button onClick={fetchBookings} className="flex items-center gap-1 bg-primary-foreground/10 px-3 py-1.5 rounded-lg hover:bg-primary-foreground/20 transition-colors">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-extrabold text-foreground">{bookings.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Today's Bookings</p>
            <p className="text-2xl font-extrabold text-secondary">{todaysBookings}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-extrabold text-accent">{pendingCount}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Revenue (Paid)</p>
            <p className="text-2xl font-extrabold text-[#25D366]">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {["all", "pending", "confirmed", "cancelled"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
            ))}
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name/phone/ref..." className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm bg-background" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Ref", "Name", "Phone", "Pickup", "Dest.", "Date", "Vehicle", "Days", "Dist.", "Base", "Driver", "Total", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left p-3 font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-mono text-xs">{b.booking_ref || b.id.substring(0, 8)}</td>
                  <td className="p-3 font-medium whitespace-nowrap">{b.customer_name}</td>
                  <td className="p-3 whitespace-nowrap">{b.customer_phone}</td>
                  <td className="p-3 whitespace-nowrap">{b.pickup_location}</td>
                  <td className="p-3 whitespace-nowrap">{b.destination}</td>
                  <td className="p-3 whitespace-nowrap">{b.travel_date}</td>
                  <td className="p-3 whitespace-nowrap">{b.vehicle_type}</td>
                  <td className="p-3">{b.number_of_days}</td>
                  <td className="p-3">{b.billable_distance || b.estimated_distance}</td>
                  <td className="p-3">₹{Number(b.base_fare || 0).toLocaleString()}</td>
                  <td className="p-3">₹{Number(b.driver_allowance || 0).toLocaleString()}</td>
                  <td className="p-3 font-semibold">₹{Number(b.total_price || 0).toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      b.status === "confirmed" ? "bg-[#25D366]/10 text-[#25D366]" :
                      b.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                      "bg-accent/10 text-accent"
                    }`}>{b.status}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1 flex-wrap">
                      {b.status !== "confirmed" && (
                        <button onClick={() => updateStatus(b.id, "confirmed")} className="px-2 py-1 rounded text-xs bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20">Confirm</button>
                      )}
                      {b.status !== "cancelled" && (
                        <button onClick={() => updateStatus(b.id, "cancelled")} className="px-2 py-1 rounded text-xs bg-destructive/10 text-destructive hover:bg-destructive/20">Cancel</button>
                      )}
                      <a href={`tel:+91${b.customer_phone}`} className="px-2 py-1 rounded text-xs bg-primary/10 text-primary hover:bg-primary/20">Call</a>
                      <a href={`https://wa.me/91${b.customer_phone}?text=${encodeURIComponent(`Hello ${b.customer_name}, your NextStop booking #${b.booking_ref || b.id.substring(0, 8)} from ${b.pickup_location} to ${b.destination} on ${b.travel_date} is confirmed. Fare: ₹${Number(b.total_price || 0).toLocaleString()} + toll & parking extra. Driver details will be shared soon. - NextStop Tours +91 ${PHONE}`)}`} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded text-xs bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20">
                        <MessageCircle className="w-3 h-3 inline" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={14} className="p-8 text-center text-muted-foreground">No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
