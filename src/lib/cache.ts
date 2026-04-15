import { supabase } from "@/integrations/supabase/client";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  ts: number;
}

export async function getCached<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const entry: CacheEntry<T> = JSON.parse(raw);
      if (Date.now() - entry.ts < CACHE_TTL) return entry.data;
    }
  } catch {}
  const data = await fetchFn();
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
  return data;
}

export async function fetchVehiclesAndRoutes() {
  const [vehiclesRes, routesRes] = await Promise.all([
    supabase.from("vehicles").select("*").eq("is_active", true).order("price_per_km"),
    supabase.from("routes").select("*").eq("is_active", true).order("distance_km"),
  ]);
  return {
    vehicles: vehiclesRes.data || [],
    routes: routesRes.data || [],
  };
}

export async function getCachedVehiclesAndRoutes() {
  return getCached("nextstop_vr", fetchVehiclesAndRoutes);
}
