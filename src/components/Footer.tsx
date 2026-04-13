import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jfif";
import { PHONE, PHONE2, PHONE_LINK, PHONE2_LINK, EMAIL, WHATSAPP_PREFILLED, DEFAULT_WHATSAPP_MSG, LOCATION } from "@/lib/constants";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div>
          <img src={logo} alt="NextStop" className="h-14 w-auto mb-4 rounded-lg bg-card p-1" />
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Your trusted travel partner from Chhatrapati Sambhajinagar. Reliable cabs, tour packages, and airport transfers across Maharashtra.
          </p>
          <div className="flex gap-3 mt-4">
            <a href={WHATSAPP_PREFILLED(DEFAULT_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2.5 rounded-lg transition-colors">
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
            {[["Home", "/"], ["Packages", "/packages"], ["Vehicles", "/vehicles"], ["Book Now", "/booking"], ["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} to={to} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">{label}</Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Services</h4>
          <ul className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            {["Local Sightseeing", "Outstation Cabs", "Airport Transfer", "Religious Tours", "Corporate Travel", "Group Tours"].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/80">
            <a href={PHONE_LINK} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4 shrink-0" />
              +91 {PHONE.replace(/(\d{5})(\d{5})/, "$1 $2")}
            </a>
            <a href={PHONE2_LINK} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4 shrink-0" />
              +91 {PHONE2.replace(/(\d{5})(\d{5})/, "$1 $2")}
            </a>
            <a href={WHATSAPP_PREFILLED(DEFAULT_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <MessageCircle className="w-4 h-4 shrink-0" />
              WhatsApp Us
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-4 h-4 shrink-0" />
              {EMAIL}
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              {LOCATION}
            </div>
          </div>
          <a href={WHATSAPP_PREFILLED(DEFAULT_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#20BD5A] transition-colors">
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-primary-foreground/50">
          © 2025 NextStop Tours and Travels. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-primary-foreground/50">
          <Link to="/privacy-policy" className="hover:text-primary-foreground/80 transition-colors">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-primary-foreground/80 transition-colors">Terms & Conditions</Link>
          <Link to="/cancellation-policy" className="hover:text-primary-foreground/80 transition-colors">Cancellation Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
