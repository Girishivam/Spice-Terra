import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Send, HelpCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import WhatsAppIcon from "./WhatsAppIcon";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData?: {
    items: any[];
    total: number;
    customerName?: string;
    customerPhone?: string;
    address?: string;
  } | null;
}

const WhatsAppModal = ({ isOpen, onClose, orderData }: WhatsAppModalProps) => {
  const { cart } = useCart();
  const [activeTab, setActiveTab] = useState<"support" | "order" | "bill">("support");
  const [message, setMessage] = useState("");
  const [hasOrder, setHasOrder] = useState(false);

  const restaurantPhone = "6394993583"; // Replace with your actual phone number
  const restaurantName = "Spice terra";

  useEffect(() => {
    if (orderData?.items && orderData.items.length > 0) {
      setHasOrder(true);
      setActiveTab("order");
    } else if (cart && cart.length > 0) {
      setHasOrder(true);
      setActiveTab("order");
    }
  }, [orderData, cart]);

  // Reset state when modal closes
  const handleClose = () => {
    setMessage("");
    onClose();
  };

  // Generate order bill
  const generateBill = () => {
    const items = orderData?.items || cart || [];
    const total = orderData?.total || items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const customerName = orderData?.customerName || "Customer";
    const customerPhone = orderData?.customerPhone || "Not provided";
    const address = orderData?.address || "Not provided";

    let billText = `*SPICE TERRA - ORDER CONFIRMATION*\n\n`;
    billText += `📋 *ORDER DETAILS*\n`;
    billText += `${"=".repeat(40)}\n\n`;
    billText += `*Items Ordered:*\n`;

    items.forEach((item, index) => {
      billText += `${index + 1}. ${item.name}\n`;
      billText += `   Qty: ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}\n`;
    });

    billText += `\n${"=".repeat(40)}\n`;
    billText += `*Subtotal:* ₹${(total * 0.9).toFixed(2)}\n`;
    billText += `*Tax (10%):* ₹${(total * 0.1).toFixed(2)}\n`;
    billText += `*Total:* ₹${total.toFixed(2)}\n\n`;

    billText += `*DELIVERY DETAILS*\n`;
    billText += `${"=".repeat(40)}\n`;
    billText += `Name: ${customerName}\n`;
    billText += `Phone: ${customerPhone}\n`;
    billText += `Address: ${address}\n\n`;

    billText += `*Estimated Delivery:* 30-45 minutes\n`;
    billText += `*Order Status:* Pending Confirmation\n\n`;

    billText += `Thank you for ordering from ${restaurantName}! 🙏\n`;
    billText += `For support, reply to this message.`;

    return billText;
  };

  // Generate support message
  const generateSupportMessage = () => {
    let msg = `Hi ${restaurantName},\n\n`;
    msg += message || "I'd like to inquire about your services.";
    return msg;
  };

  // Handle WhatsApp actions
  const handleSendMessage = (messageType: "order" | "support" | "bill") => {
    let whatsappMessage = "";

    switch (messageType) {
      case "order":
        if (hasOrder) {
          whatsappMessage = generateBill();
        } else {
          whatsappMessage = "Hi! I'd like to place an order. Please check your current menu.";
        }
        break;
      case "bill":
        whatsappMessage = generateBill();
        break;
      case "support":
        whatsappMessage = generateSupportMessage();
        break;
    }

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${restaurantPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const handleDownloadBill = () => {
    const billContent = generateBill();
    const element = document.createElement("a");
    const file = new Blob([billContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `spice-terra-bill-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pt-20 sm:pt-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black bg-opacity-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative bg-white rounded-3xl w-11/12 sm:w-full max-w-md shadow-2xl max-h-[70vh] sm:max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <WhatsAppIcon className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-bold">WhatsApp Support</h2>
                  <p className="text-sm text-green-50">Direct connection to {restaurantName}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-green-700 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b bg-gray-50">
              <button
                onClick={() => setActiveTab("support")}
                className={`flex-1 py-4 px-4 text-center font-medium transition ${
                  activeTab === "support"
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <HelpCircle className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Support</span>
              </button>
              {hasOrder && (
                <>
                  <button
                    onClick={() => setActiveTab("order")}
                    className={`flex-1 py-4 px-4 text-center font-medium transition ${
                      activeTab === "order"
                        ? "border-b-2 border-green-500 text-green-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Send className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Order</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("bill")}
                    className={`flex-1 py-4 px-4 text-center font-medium transition ${
                      activeTab === "bill"
                        ? "border-b-2 border-green-500 text-green-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <FileText className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Bill</span>
                  </button>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Support Tab */}
              {activeTab === "support" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">How can we help?</h3>
                    <p className="text-sm text-blue-800">
                      Chat directly with our customer care team for inquiries, complaints, or special requests.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-gray-600">Quick replies:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Delivery Status?",
                        "Menu Details?",
                        "Special Request",
                        "Complaint",
                      ].map((quick) => (
                        <button
                          key={quick}
                          onClick={() => setMessage(quick)}
                          className="text-xs px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                        >
                          {quick}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSendMessage("support")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send via WhatsApp
                  </Button>
                </motion.div>
              )}

              {/* Order Tab */}
              {activeTab === "order" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">Order Confirmation</h3>
                    <p className="text-sm text-green-800">
                      Send your order details to our WhatsApp for immediate confirmation and status updates.
                    </p>
                  </div>

                  {cart && cart.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Items in Order:</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 p-3 rounded-lg">
                        {cart.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-gray-700">
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-300 pt-2 mt-2 font-semibold text-gray-900 flex justify-between">
                          <span>Total:</span>
                          <span>
                            ₹
                            {cart
                              .reduce((sum, item) => sum + item.price * item.quantity, 0)
                              .toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        No items in cart. Add items from the menu first!
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={() => handleSendMessage("order")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3"
                    disabled={cart.length === 0}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Order to WhatsApp
                  </Button>
                </motion.div>
              )}

              {/* Bill Tab */}
              {activeTab === "bill" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="font-semibold text-amber-900 mb-2">Invoice & Receipt</h3>
                    <p className="text-sm text-amber-800">
                      Download or share your order bill via WhatsApp for reference.
                    </p>
                  </div>

                  {cart && cart.length > 0 ? (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-gray-700 space-y-2 font-mono text-xs max-h-64 overflow-y-auto">
                        <p className="font-bold text-center">SPICE TERRA</p>
                        <p className="text-center">ORDER CONFIRMATION</p>
                        <p className="text-center">{"-".repeat(30)}</p>
                        <p className="font-semibold">Items:</p>
                        {cart.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <p className="text-center">{"-".repeat(30)}</p>
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>
                            ₹
                            {cart
                              .reduce((sum, item) => sum + item.price * item.quantity, 0)
                              .toFixed(2)}
                          </span>
                        </div>
                        <p className="text-center text-xs">Est. Delivery: 30-45 min</p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleDownloadBill}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Bill
                        </Button>
                        <Button
                          onClick={() => handleSendMessage("bill")}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Share via WhatsApp
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        No items to generate bill. Add items from the menu first!
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t text-xs text-gray-600 text-center">
              <p>Powered by {restaurantName} 🍜</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppModal;
