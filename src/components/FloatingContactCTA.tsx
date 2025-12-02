import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const FloatingContactCTA = () => {
  const restaurantPhone = "+919876543210"; // Replace with your actual phone
  const whatsappMessage = "Hi! I'd like to know more about Spice Terra";

  const contacts = [
    {
      icon: Phone,
      label: "Call Us",
      href: `tel:${restaurantPhone}`,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${restaurantPhone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-24 right-8 z-40 flex flex-col gap-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      {contacts.map((contact) => (
        <motion.a
          key={contact.label}
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${contact.color} ${contact.hoverColor} p-3 rounded-full text-white shadow-lg transition-all`}
          aria-label={contact.label}
          title={contact.label}
        >
          <contact.icon className="w-6 h-6" />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default FloatingContactCTA;
