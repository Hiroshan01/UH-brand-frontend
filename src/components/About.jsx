import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 m-10">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Our UH Brand
          </h1>
          <div className="w-24 h-1 bg-gray-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Crafting quality clothing with passion and dedication since our
            inception
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-black p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Founded with a vision to revolutionize fashion, we've been
              dedicated to bringing you the finest quality clothing that
              combines style, comfort, and affordability.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Every piece in our collection is carefully curated to ensure you
              look and feel your best. From casual wear to elegant designs,
              we've got something special for everyone.
            </p>
          </div>

          <div className="bg-black p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              To provide exceptional clothing that empowers individuals to
              express their unique style while maintaining the highest standards
              of quality and sustainability.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We believe fashion should be accessible to everyone without
              compromising on craftsmanship or ethical practices.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition duration-300">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quality</h3>
              <p className="text-gray-300 text-sm">
                Premium materials and expert craftsmanship in every piece
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition duration-300">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Sustainability
              </h3>
              <p className="text-gray-300 text-sm">
                Committed to eco-friendly practices and ethical sourcing
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition duration-300">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Style</h3>
              <p className="text-gray-300 text-sm">
                Trendy designs that help you express your unique personality
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition duration-300">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Trust</h3>
              <p className="text-gray-300 text-sm">
                Building lasting relationships through transparency and service
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-black rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                10K+
              </p>
              <p className="text-gray-400 text-sm md:text-base">
                Happy Customers
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                500+
              </p>
              <p className="text-gray-400 text-sm md:text-base">Products</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                5
              </p>
              <p className="text-gray-400 text-sm md:text-base">
                Years Experience
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                100%
              </p>
              <p className="text-gray-400 text-sm md:text-base">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Upgrade Your Wardrobe?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our collection and discover pieces that speak to your style
          </p>
          <Link
            to="/products"
            className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-500 transition-all duration-300 hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
