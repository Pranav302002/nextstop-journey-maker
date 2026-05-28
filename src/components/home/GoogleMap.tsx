import SectionHeading from "@/components/SectionHeading";
import { GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL, LOCATION } from "@/lib/constants";
import { MapPin, Star, ExternalLink } from "lucide-react";

const GoogleMap = () => (
  <section className="py-16 md:py-20 bg-muted">
    <div className="container mx-auto px-4">
      <SectionHeading title="Find Us" subtitle="Visit our office in CIDCO, Chhatrapati Sambhajinagar" />
      <div className="max-w-4xl mx-auto bg-card rounded-2xl overflow-hidden shadow-card h-80">
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="NextStop Tours Location"
        />
      </div>
      <div className="max-w-4xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-card rounded-2xl p-5 shadow-card">
        <div className="flex items-start gap-3 text-sm text-foreground">
          <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <span>{LOCATION}</span>
        </div>
        <div className="flex gap-3 shrink-0">
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors">
            <ExternalLink className="w-4 h-4" /> Get Directions
          </a>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors">
            <Star className="w-4 h-4" /> Write a Review
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default GoogleMap;
