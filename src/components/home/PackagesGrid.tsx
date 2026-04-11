import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight, Star } from "lucide-react";
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
    <section className="py-20 md:py-28">
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
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={images[pkg.id]} alt={pkg.title} loading="lazy" width={640} height={512} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">{pkg.category}</span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-card text-xs font-medium">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{pkg.destination}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground leading-snug">{pkg.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{pkg.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <span className="text-xl font-extrabold text-secondary">{pkg.price}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 text-accent fill-accent" />)}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to="/booking" className="flex-1 text-center bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-sm hover:shadow-md">
                    Book Now
                  </Link>
                  <a href={WHATSAPP_PREFILLED(`Hi! I'm interested in the ${pkg.title} package.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 w-11 rounded-xl text-sm transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {limit && (
          <div className="text-center mt-12">
            <Link to="/packages" className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-10 py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              View All Packages <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesGrid;
