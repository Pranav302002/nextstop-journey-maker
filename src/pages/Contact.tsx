import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHeading from "@/components/SectionHeading";
import { PHONE, PHONE2, PHONE_LINK, PHONE2_LINK, EMAIL, WHATSAPP_PREFILLED, DEFAULT_WHATSAPP_MSG, LOCATION } from "@/lib/constants";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="Contact Us" subtitle="Have questions? We'd love to hear from you. Reach out anytime!" />

          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {submitted ? (
                <div className="bg-card rounded-2xl p-8 shadow-card text-center">
                  <h3 className="text-xl font-bold text-foreground">Thank you!</h3>
                  <p className="text-muted-foreground mt-2">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 shadow-card space-y-4">
                  <h3 className="text-xl font-bold text-foreground mb-4">Send us a Message</h3>
                  <input type="text" required placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
                  <input type="tel" required placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
                  <input type="email" placeholder="Email (optional)" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary" />
                  <textarea rows={4} required placeholder="Your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-secondary resize-none" />
                  <button type="submit" className="w-full bg-accent text-accent-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <a href={PHONE_LINK} className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><Phone className="w-5 h-5 text-primary" /></div>
                    <div><p className="text-sm text-muted-foreground">Primary</p><p className="font-medium">+91 {PHONE.replace(/(\d{5})(\d{5})/, "$1 $2")}</p></div>
                  </a>
                  <a href={PHONE2_LINK} className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><Phone className="w-5 h-5 text-primary" /></div>
                    <div><p className="text-sm text-muted-foreground">Secondary</p><p className="font-medium">+91 {PHONE2.replace(/(\d{5})(\d{5})/, "$1 $2")}</p></div>
                  </a>
                  <a href={WHATSAPP_PREFILLED(DEFAULT_WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors">
                    <div className="w-10 h-10 bg-[#25D366]/10 rounded-lg flex items-center justify-center"><MessageCircle className="w-5 h-5 text-[#25D366]" /></div>
                    <div><p className="text-sm text-muted-foreground">WhatsApp</p><p className="font-medium">Chat with us</p></div>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center"><Mail className="w-5 h-5 text-accent" /></div>
                    <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium text-foreground">{EMAIL}</p></div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center"><MapPin className="w-5 h-5 text-secondary" /></div>
                    <div><p className="text-sm text-muted-foreground">Address</p><p className="font-medium text-foreground">{LOCATION}</p></div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl overflow-hidden shadow-card h-64">
                <iframe
                  src="https://maps.google.com/maps?q=NextStop+Tours+%26+Travels+Ambika+Nagar+CIDCO+Chhatrapati+Sambhajinagar&output=embed"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location Map"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Contact;
