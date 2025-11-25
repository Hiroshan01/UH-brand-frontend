import React, { useState } from "react";

function Gallery() {
  const galleryImages = [
    {
      id: 1,
      url: "./gallery/571453552_806531092221186_7199501254564172623_n.jpg",
      title: "SINGLE JERSEY UNISEX PRINTED  T-SHIRT",
      category: "T-SHIRT",
    },
    {
      id: 2,
      url: "/gallery/fone.jpg",
      title:
        "SINGLE JERSEY UNISEX PRINTED  T-SHIRT Hello, Girls and Boys Explore the Unisex Collection—available now!",
      category: "POP-CONE",
    },
    {
      id: 3,
      url: "/hero-5.jpg",
      title: "Urban Style",
      category: "Mix-Fashion",
    },
    {
      id: 4,
      url: "/gallery/ftwo.jpg",
      title:
        "SINGLE JERSEY UNISEX PRINTED  T-SHIRT Hello, Girls and Boys Explore the Unisex Collection—available now!",
      category: "POP-CONE",
    },
    {
      id: 5,
      url: "./gallery/one.jpg",
      title: "SINGLE JERSEY UNISEX PRINTED  T-SHIRT",
      category: "T-SHIRT",
    },
    {
      id: 6,
      url: "/hero-4.jpg",
      title: "#blackboy #blackboy #uhbfashion",
      category: "Mix-Fashion",
    },
    {
      id: 7,
      url: "./gallery/573633391_806531012221194_6676388200494214263_n.jpg",
      title: "SINGLE JERSEY UNISEX PRINTED  T-SHIRT",
      category: "T-SHIRT",
    },
    {
      id: 8,
      url: "/gallery/fthree.jpg",
      title:
        "SINGLE JERSEY UNISEX PRINTED  T-SHIRT Hello, Girls and Boys Explore the Unisex Collection—available now!",
      category: "POP-CONE",
    },
    {
      id: 9,
      url: "/hero-3.jpg",
      title: "#blackboy #uhbfashion",
      category: "Mix-Fashion",
    },
    {
      id: 10,
      url: "./gallery/two.jpg",
      title: "SINGLE JERSEY UNISEX PRINTED  T-SHIRT",
      category: "T-SHIRT",
    },
    {
      id: 11,
      url: "/gallery/fone.jpg",
      title:
        "SINGLE JERSEY UNISEX PRINTED  T-SHIRT Hello, Girls and Boys Explore the Unisex Collection—available now!",
      category: "POP-CONE",
    },
    {
      id: 12,
      url: "/hero-2.jpg",
      title: "Urban Style",
      category: "Mix-Fashion",
    },
    {
      id: 13,
      url: "/gallery/ffive.jpg",
      title:
        "SINGLE JERSEY UNISEX PRINTED  T-SHIRT Hello, Girls and Boys Explore the Unisex Collection—available now!",
      category: "POP-CONE",
    },
    {
      id: 14,
      url: "./gallery/two.jpg",
      title: "SINGLE JERSEY UNISEX PRINTED  T-SHIRT",
      category: "T-SHIRT",
    },
    {
      id: 15,
      url: "/hero-1.jpg",
      title: "#uhbrand",
      category: "Mix-Fashion",
    },
    {
      id: 16,
      url: "./gallery/four.jpg",
      title: "SINGLE JERSEY UNISEX PRINTED  T-SHIRT",
      category: "T-SHIRT",
    },
    {
      id: 17,
      url: "/gallery/fsix.jpg",
      title:
        "SINGLE JERSEY UNISEX PRINTED  T-SHIRT Hello, Girls and Boys Explore the Unisex Collection—available now!",
      category: "POP-CONE",
    },
    {
      id: 18,
      url: "/hero-6.jpg",
      title: "UH Branded clothes",
      category: "Mix-Fashion",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "T-SHIRT", "POP-CONE", "Mix-Fashion"];

  const filteredImages =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 m-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Gallery
          </h1>
          <div className="w-24 h-1 bg-gray-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our latest clothing collections and discover your perfect
            style
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${
                filter === category
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer bg-black"
              onClick={() => openModal(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-80 object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">
              No images found in this category
            </p>
          </div>
        )}
      </div>

      {/* Modal for full image view */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl w-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-400 transition z-10"
            >
              ×
            </button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image info */}
            <div className="bg-gray-800 p-4 rounded-b-lg">
              <h2 className="text-white text-2xl font-bold mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-gray-300">
                Category: {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
