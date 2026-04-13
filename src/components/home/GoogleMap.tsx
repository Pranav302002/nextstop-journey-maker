import SectionHeading from "@/components/SectionHeading";

const GoogleMap = () => (
  <section className="py-16 md:py-20 bg-muted">
    <div className="container mx-auto px-4">
      <SectionHeading title="Find Us" subtitle="We're based in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra" />
      <div className="max-w-4xl mx-auto bg-card rounded-2xl overflow-hidden shadow-card h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120617.74578901057!2d75.24165825!3d19.8761653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb98f0a8e3cb57%3A0x5e7b7d2f90cd47d1!2sChhatrapati%20Sambhajinagar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="NextStop Tours Location"
        />
      </div>
    </div>
  </section>
);

export default GoogleMap;
