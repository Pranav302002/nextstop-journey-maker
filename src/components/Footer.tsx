import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { PHONE, PHONE_LINK, WHATSAPP_LINK } from "@/lib/constants";
import logo from "@/assets/logo.jfif";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div>
          <img src={logo} alt="NextStop" className="h-14 w-auto mb-4 rounded-lg bg-card p-1" />
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Your trusted travel partner for comfortable rides, memorable experiences, and hassle-free bookings across Maharashtra and beyond.
          </p>
          <div className="flex gap-3 mt-4">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2.5 rounded-lg transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href={PHONE_LINK} className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2.5 rounded-lg transition-colors">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {[["Home", "/"], ["About Us", "/about"], ["Tour Packages", "/packages"], ["Vehicles", "/vehicles"], ["Book Now", "/booking"], ["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} to={to} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">{label}</Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Our Services</h4>
          <ul className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            {["Local Sightseeing", "Outstation Tours", "Airport Pickup & Drop", "Corporate Travel", "Group Bookings", "Religious Tours", "Wedding Transport"].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/80">
            <a href={PHONE_LINK} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4 shrink-0" />
              {PHONE}
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <MessageCircle className="w-4 h-4 shrink-0" />
              WhatsApp Us
            </a>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 shrink-0 mt-0.5" />
              info@nextstoptours.com
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              Pune, Maharashtra, India
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 py-4">
      <p className="text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} NextStop Tours and Travels. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
