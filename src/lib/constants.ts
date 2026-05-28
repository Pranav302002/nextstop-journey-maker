export const PHONE = "8888192806";
export const PHONE2 = "9822995657";
export const EMAIL = "contactnextstoptravels02@gmail.com";
export const WHATSAPP_LINK = `https://wa.me/91${PHONE}`;
export const PHONE_LINK = `tel:+91${PHONE}`;
export const PHONE2_LINK = `tel:+91${PHONE2}`;
export const WHATSAPP_PREFILLED = (msg: string) =>
  `https://wa.me/91${PHONE}?text=${encodeURIComponent(msg)}`;

export const DEFAULT_WHATSAPP_MSG = "Hello NextStop Tours and Travels, I would like to book a trip from Chhatrapati Sambhajinagar. Please share details.";

export const BUSINESS_NAME = "NextStop Tours and Travels";
export const LOCATION = "N2, Galli No.1, Ambika Nagar, CIDCO, Chhatrapati Sambhajinagar, Maharashtra - 431003";
export const TAGLINE = "Your trusted travel partner from Chhatrapati Sambhajinagar";

// Google Business Profile links
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/7zFpZYtjxSk1q6t19";
export const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=NextStop+Tours+%26+Travels+Ambika+Nagar+CIDCO+Chhatrapati+Sambhajinagar&output=embed";
// Opens the listing; user can tap "Write a review" from there.
export const GOOGLE_REVIEW_URL = "https://maps.app.goo.gl/7zFpZYtjxSk1q6t19";

export const MIN_KM_PER_DAY = 300;
export const DRIVER_ALLOWANCE_OUTSTATION = 300;
export const DRIVER_ALLOWANCE_LOCAL = 250;

export const PRICING_NOTE = "* Minimum 300 km billing per day applies. Toll, parking charges extra at actuals. Driver allowance extra as applicable.";

export const VEHICLE_IMAGES: Record<string, string> = {
  "Sedan": "/vehicle-sedan.jpg",
  "Ertiga": "/vehicle-ertiga.jpg",
  "Innova": "/vehicle-innova.jpg",
  "Innova Crysta": "/vehicle-crysta.jpg",
  "Innova Hycross": "/vehicle-hycross.jpg",
  "Tempo Traveller": "/vehicle-tempo.jpg",
  "Luxury Urbania": "/vehicle-urbania.jpg",
};

export const calcFare = (
  distance: number,
  days: number,
  pricePerKm: number,
  isLocal: boolean = false
) => {
  const minKm = MIN_KM_PER_DAY * days;
  const billableDistance = Math.max(distance, minKm);
  const baseFare = billableDistance * pricePerKm;
  const driverAllowance = (isLocal ? DRIVER_ALLOWANCE_LOCAL : DRIVER_ALLOWANCE_OUTSTATION) * days;
  const totalPrice = baseFare + driverAllowance;
  return { billableDistance, baseFare, driverAllowance, totalPrice, minKm };
};
