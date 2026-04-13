import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { WHATSAPP_PREFILLED, DEFAULT_WHATSAPP_MSG } from "@/lib/constants";

const WhatsAppButton = () => (
  <motion.a
    href={WHATSAPP_PREFILLED(DEFAULT_WHATSAPP_MSG)}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center gap-2 px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
    aria-label="Chat on WhatsApp"
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  >
    <div className="relative">
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
    </div>
    <span className="font-semibold text-sm hidden sm:inline">Chat with us</span>
  </motion.a>
);

export default WhatsAppButton;
