import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jfif";
import { PHONE_LINK, WHATSAPP_PREFILLED, DEFAULT_WHATSAPP_MSG } from "@/lib/constants";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-[72px] px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="NextStop Tours and Travels" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a href={WHATSAPP_PREFILLED(DEFAULT_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-card px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <Link to="/booking" className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-sm shadow-accent/20">
            Book Now
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3">
                <a href={PHONE_LINK} className="flex-1 flex items-center justify-center gap-2 bg-muted text-foreground px-4 py-3 rounded-xl text-sm font-semibold">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <Link to="/booking" onClick={() => setOpen(false)} className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-xl text-sm font-bold">
                  Book Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
