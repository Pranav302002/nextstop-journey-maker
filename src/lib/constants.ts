export const PHONE = "9822995657";
export const PHONE2 = "8888192806";
export const WHATSAPP_LINK = `https://wa.me/91${PHONE}`;
export const PHONE_LINK = `tel:+91${PHONE}`;
export const WHATSAPP_PREFILLED = (msg: string) =>
  `https://wa.me/91${PHONE}?text=${encodeURIComponent(msg)}`;

export const BOOKING_WHATSAPP_MSG = `Hello NextStop Tours and Travels, I want to book a trip.

Name:
Pickup:
Destination:
Travel Date:
Vehicle Type:
Passengers:`;

export const CITIES = [
  "Pune", "Mumbai", "Nashik", "Shirdi", "Mahabaleshwar",
  "Lonavala", "Goa", "Aurangabad", "Hyderabad",
];

export const VEHICLE_OPTIONS = [
  { type: "Sedan", rate: 12, seats: 4, features: "AC, Comfortable", icon: "🚗" },
  { type: "SUV", rate: 16, seats: 6, features: "AC, Spacious", icon: "🚙" },
  { type: "Tempo Traveller", rate: 22, seats: 12, features: "AC, Groups", icon: "🚐" },
];

export const VEHICLE_RATES: Record<string, { seats: string; rate: number; features: string }> = {
  "Sedan": { seats: "4 Seater", rate: 12, features: "AC, Comfortable, Fuel Efficient" },
  "SUV": { seats: "6-7 Seater", rate: 16, features: "Spacious, AC, Luggage Space" },
  "Tempo Traveller": { seats: "12 Seater", rate: 22, features: "Group Travel, AC, Pushback Seats" },
};

export const TOUR_PACKAGES = [
  { id: "shirdi", title: "Shirdi Darshan", destination: "Shirdi", duration: "1 Day", price: "₹2,500", category: "Religious Tours", description: "Visit the holy shrine of Sai Baba with comfortable transport and guided darshan experience." },
  { id: "ajanta-ellora", title: "Ajanta & Ellora Caves", destination: "Aurangabad", duration: "2 Days / 1 Night", price: "₹5,500", category: "Weekend Getaways", description: "Explore the UNESCO World Heritage caves with expert guides and comfortable stay." },
  { id: "lonavala", title: "Lonavala Getaway", destination: "Lonavala", duration: "2 Days / 1 Night", price: "₹3,500", category: "Hill Station Trips", description: "Enjoy scenic hills, waterfalls, and chikki — a perfect weekend escape from Pune." },
  { id: "mahabaleshwar", title: "Mahabaleshwar Delight", destination: "Mahabaleshwar", duration: "2 Days / 1 Night", price: "₹4,500", category: "Hill Station Trips", description: "Strawberry farms, scenic viewpoints, and boat rides at Maharashtra's favorite hill station." },
  { id: "nashik", title: "Nashik Darshan", destination: "Nashik", duration: "1 Day", price: "₹3,000", category: "Religious Tours", description: "Visit Trimbakeshwar, Panchvati, Sula Vineyards, and more on a spiritual-cultural day trip." },
  { id: "mumbai", title: "Pune to Mumbai", destination: "Mumbai", duration: "1 Day", price: "₹3,500", category: "Family Tours", description: "Gateway of India, Marine Drive, local food tour — experience Mumbai in one exciting day." },
  { id: "jyotirling", title: "Jyotirling Darshan", destination: "Multiple", duration: "5 Days / 4 Nights", price: "₹15,000", category: "Religious Tours", description: "Complete pilgrimage covering multiple Jyotirling temples across Maharashtra." },
];
