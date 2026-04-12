import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Lock, RefreshCw, Phone, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_PASSWORD = "NextStop@2003";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    // Use anon key directly for admin reads - RLS requires auth
    // For simplicity, read via service approach
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

  const filtered = statusFilter === "all" ? bookings : bookings.filter(b => b.status === statusFilter);
  const totalRevenue = bookings.filter(b => b.status === "confirmed").reduce((sum, b) => sum + (Number(b.total_price) || 0), 0);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleLogin} className="bg-card rounded-2xl p-8 shadow-elevated max-w-sm w-full">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-center mb-6">Admin Login</h1>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-3 border-2 border-border rounded-xl text-sm bg-background focus:outline-none focus:border-primary mb-3" />
          {error && <p className="text-destructive text-sm mb-3">{error}</p>}
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold">Login</button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">NextStop Admin</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 88881 92806</span>
            <button onClick={fetchBookings} className="flex items-center gap-1 bg-primary-foreground/10 px-3 py-1.5 rounded-lg hover:bg-primary-foreground/20 transition-colors">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-extrabold text-foreground">{bookings.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Confirmed Revenue</p>
            <p className="text-2xl font-extrabold text-secondary">₹{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-extrabold text-accent">{bookings.filter(b => b.status === "pending").length}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {["all", "pending", "confirmed", "cancelled"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold text-muted-foreground">ID</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Customer</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Phone</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Route</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Date</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Vehicle</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Price</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Status</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-mono text-xs">{b.id.substring(0, 8)}</td>
                  <td className="p-3 font-medium">{b.customer_name}</td>
                  <td className="p-3">{b.customer_phone}</td>
                  <td className="p-3">{b.from_city} → {b.to_city}</td>
                  <td className="p-3">{b.travel_date}</td>
                  <td className="p-3">{b.vehicle_type}</td>
                  <td className="p-3 font-semibold">₹{Number(b.total_price || 0).toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      b.status === "confirmed" ? "bg-[#25D366]/10 text-[#25D366]" :
                      b.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                      "bg-accent/10 text-accent"
                    }`}>{b.status}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {b.status !== "confirmed" && (
                        <button onClick={() => updateStatus(b.id, "confirmed")} className="px-2 py-1 rounded text-xs bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20">Confirm</button>
                      )}
                      {b.status !== "cancelled" && (
                        <button onClick={() => updateStatus(b.id, "cancelled")} className="px-2 py-1 rounded text-xs bg-destructive/10 text-destructive hover:bg-destructive/20">Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="p-8 text-center text-muted-foreground">No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
