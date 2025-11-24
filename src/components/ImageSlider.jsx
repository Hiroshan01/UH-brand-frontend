import { useState } from "react";

function ImageSlider(props) {
  const images = props.images || []; 
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    // Optional: Show a placeholder if there are no images
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="w-full h-auto aspect-[1/1] bg-gray-200 rounded-xl shadow-lg flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Main Image */}
      <div className="w-full h-auto aspect-[1/1] overflow-hidden rounded-xl shadow-lg">
        <img
          src={images[currentIndex]}
          alt="Product Image"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="w-full flex justify-center items-center gap-4 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            className={`
              w-20 h-20 object-cover rounded-lg cursor-pointer 
              border-2 transition-all duration-200
              ${
                index === currentIndex
                  ? "border-gray-900 shadow-md" 
                  : "border-transparent hover:border-gray-400"
              }
            `}
            src={image}
            alt={`Product thumbnail ${index + 1}`}
            onClick={() => {
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;