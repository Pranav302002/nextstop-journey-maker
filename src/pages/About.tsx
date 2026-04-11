import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Shield, Target, Eye, Heart, Clock, BadgeDollarSign } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const values = [
  { icon: Shield, title: "Safety First", desc: "Verified drivers, maintained vehicles, and sanitized interiors for every trip." },
  { icon: Heart, title: "Customer Comfort", desc: "We prioritize your comfort with AC vehicles, clean interiors, and courteous service." },
  { icon: BadgeDollarSign, title: "Affordable Rates", desc: "Transparent pricing with no hidden charges — value for every rupee." },
  { icon: Clock, title: "Punctuality", desc: "We respect your time with on-time pickups and reliable schedules." },
];

const About = () => (
  <>
    <Header />
    <main className="pt-20 md:pt-24">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="About NextStop Tours & Travels" subtitle="Your trusted travel partner across Maharashtra and beyond." />
          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
            <p>Welcome to <strong className="text-foreground">NextStop Tours and Travels</strong> — Pune's growing and trusted travel service provider. We specialize in cab booking, outstation travel, airport transfers, religious tours, and customized group travel solutions.</p>
            <p>Founded with a passion for making travel accessible, comfortable, and affordable for every Indian family, we have served thousands of happy customers across Maharashtra. Whether it's a quick airport transfer or a week-long pilgrimage, we bring the same level of dedication and professionalism to every trip.</p>
            <p>Our well-maintained fleet includes everything from economical sedans to luxury Urbania coaches — ensuring the right vehicle for every occasion and budget.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 shadow-card">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">To provide safe, comfortable, and affordable travel experiences that create lasting memories for every traveller.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 shadow-card">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">To become Maharashtra's most loved and trusted tours & travels company — known for quality service, transparency, and customer satisfaction.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Why Customers Trust Us" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-bold text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default About;
