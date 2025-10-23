import { useState, useEffect } from "react";
import heroV1 from "../assets"

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/hero-1.jpg",
    "https://cdn.pixabay.com/photo/2025/06/11/07/42/creepers-9653850_960_720.jpg",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
          Welcome to Our Site
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mb-10">
          Discover amazing experiences with stunning visuals
        </p>
        <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 p-3 rounded-full transition-all"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-30 hover:bg-opacity-50 p-3 rounded-full transition-all"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`h-3 rounded-full transition-all ${
              i === currentImage
                ? "bg-white w-8"
                : "bg-white bg-opacity-50 w-3 hover:bg-opacity-75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
