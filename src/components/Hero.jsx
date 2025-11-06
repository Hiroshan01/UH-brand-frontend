import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  // Images array - මේ තියෙන්නේ අපේ ඡායාරූප 5ක array එකක්
  const images = [
    {
      url: "/hero-1.jpg",
      title: "UH Branded clothes",
      description: "UH Branded clothes",
    },
    {
      url: "/hero-01.png",
      title: "Beautiful Sunset",
      description:
        "New arrival Oversized T-Shirt Cute and full of charm UNISEX T-Shirt♥️",
    },
    {
      url: "/hero-02.png",
      title: "UHB Fashion Beautiful ",
      description:
        "🖤💜🩶🩷Cute, compact, and full of charm New arrival rib frocks🖤💜🩶🩷",
    },
    {
      url: "/hero-03.png",
      title: "UHB Fashion Beautiful paste",
      description: "Hey, it's a pastel color Collection!❤️",
    },
    {
      url: "/hero-04.png",
      title: "Come shop with UH Brand ",
      description: "To become a fresh, fashionable person💓😎",
    },
  ];

  // State - මේකෙන් හදන්නේ දැනට පෙන්නන image එකේ index එක store කරන්න
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide function - මේක ස්වයංක්‍රීයව slider එක චලනය කරනවා
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // 4000ms = 4 seconds - සෑම තත්පර 4කට වරක් image එක වෙනස් වෙනවා

    // Cleanup function - component එක unmount වෙනකොට timer එක නවත්තනවා
    return () => clearInterval(timer);
  }, []);

  // Previous button function - ඊළඟ image එකට යන්න
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  // Next button function - කලින් image එකට යන්න
  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Dot navigation - dot එකක් click කරන කොට ඒ image එකට යන්න
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gray-900">
      {/* Images Container - මේ තියෙන්නේ සියලුම images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image.url} alt={image.title} className="object-cover" />
            {/* Dark Overlay - image එක මත අඳුරු layer එකක් */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text Content - image එක මත text එන්නේ */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-heading mb-4 animate-fade-in">
                {image.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 animate-fade-in font-sans">
                {image.description}
              </p>
              <Link
                to="/products"
                className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-500 transition-all duration-300 hover:scale-105"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button - වම් පැත්තේ arrow button එක */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Next Button - දකුණු පැත්තේ arrow button එක */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots Navigation - පහළ තියෙන dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
