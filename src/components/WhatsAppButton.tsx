import { MessageCircle } from "lucide-react";
import { WHATSAPP_PREFILLED, BOOKING_WHATSAPP_MSG } from "@/lib/constants";

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_PREFILLED(BOOKING_WHATSAPP_MSG)}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-primary-foreground p-4 rounded-full shadow-elevated transition-all hover:scale-110"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

export default WhatsAppButton;
