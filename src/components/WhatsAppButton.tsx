import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/919822995657"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center gap-2 px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
    aria-label="Chat on WhatsApp"
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  >
    <MessageCircle className="w-6 h-6" />
    <span className="font-semibold text-sm hidden sm:inline">Chat with us</span>
  </motion.a>
);

export default WhatsAppButton;
