import { MessageCircle } from "lucide-react";

function WhatsAppFloat() {
  const phoneNumber = "940705919569";
  const message = "Hi! I'm interested in UH Brand clothing.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 cursor-pointer group"
      title="Chat with us on WhatsApp"
    >
      <div className="relative">
        {/* Floating Button */}
        <div className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform group-hover:scale-110">
          <MessageCircle size={32} />
        </div>

        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
      </div>

      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat on WhatsApp
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-gray-800"></div>
      </div>
    </div>
  );
}

export default WhatsAppFloat;
