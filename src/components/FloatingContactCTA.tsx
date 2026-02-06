import { useState } from "react";
import { createPortal } from "react-dom";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import WhatsAppModal from "./WhatsAppModal";
import WhatsAppIcon from "./WhatsAppIcon";

const FloatingContactCTA = () => {
  const restaurantPhone = "+7570904130"; // Replace with your actual phone
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const contacts = [
    {
      icon: Phone,
      label: "Call Us",
      href: `tel:${restaurantPhone}`,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      action: "link",
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      href: "#",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      action: "modal",
    },
  ];

  const handleContactClick = (contact: any) => {
    if (contact.action === "modal") {
      setIsWhatsAppOpen(true);
      return;
    }

    // For link actions, open the href. For tel: links use location.href so mobile opens dialer.
    if (contact.action === "link" && contact.href) {
      try {
        if (contact.href.startsWith("tel:")) {
          window.location.href = contact.href;
        } else {
          window.open(contact.href, "_blank");
        }
      } catch (e) {
        // fallback
        window.open(contact.href, "_blank");
      }
    }
  };

  const floating = (
    <>
      <motion.div
        // Render as fixed at viewport and keep overflow visible so expanded menu isn't clipped
          className="fixed bottom-24 right-8 z-[99999] flex flex-col gap-4 pointer-events-auto"
        style={{ overflow: "visible" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {contacts.map((contact) => (
          <motion.button
            key={contact.label}
            onClick={() => handleContactClick(contact)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${contact.color} ${contact.hoverColor} p-3 rounded-full text-white shadow-lg transition-all cursor-pointer`}
            aria-label={contact.label}
            title={contact.label}
            style={{ overflow: "visible" }}
          >
            <contact.icon className="w-6 h-6" />
          </motion.button>
        ))}
      </motion.div>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />
    </>
  );

  // Render portal at document.body so parent stacking contexts or overflow don't clip it
  if (typeof document !== "undefined") {
    return createPortal(floating, document.body);
  }

  return floating;
};

export default FloatingContactCTA;
