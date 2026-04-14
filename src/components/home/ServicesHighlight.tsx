import { motion } from "framer-motion";
import { MapPin, Plane, Users as UsersIcon, Car as CarIcon, Mountain, Church, Calendar, Briefcase } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";

const services = [
  { icon: MapPin, title: "Local Sightseeing", desc: "Ajanta, Ellora, Grishneshwar and more" },
  { icon: Mountain, title: "Outstation Cabs", desc: "Comfortable long distance travel" },
  { icon: Plane, title: "Airport Transfers", desc: "Aurangabad Airport pickup and drop" },
  { icon: Briefcase, title: "Corporate Travel", desc: "Business trips and employee transport" },
  { icon: Church, title: "Religious Tours", desc: "Jyotirlinga, Shirdi, Shani Shingnapur" },
  { icon: UsersIcon, title: "Group Tours", desc: "Tempo and Urbania for large groups" },
  { icon: Calendar, title: "Custom Packages", desc: "Tailored itineraries on request" },
  { icon: CarIcon, title: "Intercity Transfers", desc: "Mumbai, Pune & other regular routes" },
];

const ServicesHighlight = () => (
  <section className="py-16 md:py-20 bg-muted">
    <div className="container mx-auto px-4">
      <SectionHeading title="Our Services" subtitle="From heritage tours to long-distance travel — we've got you covered." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5">{s.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/services" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
          Explore All Services
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesHighlight;
