import { useState, useEffect } from "react";

export default function Banner() {
  const images = [
    { url: "/banner/UH.png" }, 
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-md mt-5">
      {/* Images */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={`Banner ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
