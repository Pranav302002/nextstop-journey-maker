import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { TOUR_PACKAGES } from "@/lib/constants";
import { WHATSAPP_PREFILLED } from "@/lib/constants";

import destShirdi from "@/assets/dest-shirdi.jpg";
import destAjanta from "@/assets/dest-ajanta.jpg";
import destLonavala from "@/assets/dest-lonavala.jpg";
import destMahabaleshwar from "@/assets/dest-mahabaleshwar.jpg";
import destNashik from "@/assets/dest-nashik.jpg";
import destMumbai from "@/assets/dest-mumbai.jpg";
import destJyotirling from "@/assets/dest-jyotirling.jpg";

const images: Record<string, string> = {
  shirdi: destShirdi,
  "ajanta-ellora": destAjanta,
  lonavala: destLonavala,
  mahabaleshwar: destMahabaleshwar,
  nashik: destNashik,
  mumbai: destMumbai,
  jyotirling: destJyotirling,
};

interface Props { limit?: number }

const PackagesGrid = ({ limit }: Props) => {
  const items = limit ? TOUR_PACKAGES.slice(0, limit) : TOUR_PACKAGES;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Popular Tour Packages" subtitle="Handpicked travel experiences designed for comfort, adventure, and spiritual bliss." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={images[pkg.id]} alt={pkg.title} loading="lazy" width={640} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">{pkg.category}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground">{pkg.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{pkg.destination}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{pkg.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-secondary">From {pkg.price}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link to="/booking" className="flex-1 text-center bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Book Now</Link>
                  <a href={WHATSAPP_PREFILLED(`Hi! I'm interested in the ${pkg.title} package.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-muted text-foreground px-3 py-2 rounded-lg text-sm hover:bg-border transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {limit && (
          <div className="text-center mt-10">
            <Link to="/packages" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              View All Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesGrid;
