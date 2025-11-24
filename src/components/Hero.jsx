import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
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

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gray-900">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image.url} alt={image.title} className="object-cover" />
            {/* Dark Overlay - image  */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-heading mb-4 animate-fade-in">
                {image.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 animate-fade-in font-sans">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-10"
      >
        <ChevronRight size={32} />
      </button>

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
