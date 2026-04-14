export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          base_fare: number | null
          billable_distance: number | null
          booking_ref: string | null
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string
          destination: string
          driver_allowance: number | null
          estimated_distance: number | null
          id: string
          number_of_days: number
          passengers: number
          payment_status: string
          pickup_location: string
          pickup_time: string
          price_per_km: number | null
          return_date: string | null
          secret_token: string | null
          source: string | null
          special_requests: string | null
          status: string
          toll_parking_note: string | null
          total_price: number | null
          tour_package: string | null
          travel_date: string
          trip_type: string | null
          vehicle_type: string
        }
        Insert: {
          base_fare?: number | null
          billable_distance?: number | null
          booking_ref?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          destination: string
          driver_allowance?: number | null
          estimated_distance?: number | null
          id?: string
          number_of_days?: number
          passengers: number
          payment_status?: string
          pickup_location: string
          pickup_time: string
          price_per_km?: number | null
          return_date?: string | null
          secret_token?: string | null
          source?: string | null
          special_requests?: string | null
          status?: string
          toll_parking_note?: string | null
          total_price?: number | null
          tour_package?: string | null
          travel_date: string
          trip_type?: string | null
          vehicle_type: string
        }
        Update: {
          base_fare?: number | null
          billable_distance?: number | null
          booking_ref?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          destination?: string
          driver_allowance?: number | null
          estimated_distance?: number | null
          id?: string
          number_of_days?: number
          passengers?: number
          payment_status?: string
          pickup_location?: string
          pickup_time?: string
          price_per_km?: number | null
          return_date?: string | null
          secret_token?: string | null
          source?: string | null
          special_requests?: string | null
          status?: string
          toll_parking_note?: string | null
          total_price?: number | null
          tour_package?: string | null
          travel_date?: string
          trip_type?: string | null
          vehicle_type?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string
          description: string | null
          distance_km: number
          from_city: string
          highlights: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          number_of_days: number
          to_city: string
          trip_type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          distance_km: number
          from_city: string
          highlights?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          number_of_days?: number
          to_city: string
          trip_type?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          distance_km?: number
          from_city?: string
          highlights?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          number_of_days?: number
          to_city?: string
          trip_type?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          customer_name: string
          id: string
          is_active: boolean
          location: string | null
          rating: number
          review: string
          trip: string | null
        }
        Insert: {
          customer_name: string
          id?: string
          is_active?: boolean
          location?: string | null
          rating?: number
          review: string
          trip?: string | null
        }
        Update: {
          customer_name?: string
          id?: string
          is_active?: boolean
          location?: string | null
          rating?: number
          review?: string
          trip?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          id: string
          image_url: string | null
          is_ac: boolean
          is_active: boolean
          model_examples: string | null
          name: string
          price_per_km: number
          seats: number
        }
        Insert: {
          id?: string
          image_url?: string | null
          is_ac?: boolean
          is_active?: boolean
          model_examples?: string | null
          name: string
          price_per_km: number
          seats: number
        }
        Update: {
          id?: string
          image_url?: string | null
          is_ac?: boolean
          is_active?: boolean
          model_examples?: string | null
          name?: string
          price_per_km?: number
          seats?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
