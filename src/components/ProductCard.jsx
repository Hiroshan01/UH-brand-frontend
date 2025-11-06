import React from "react";
import { ShoppingCart, Heart } from "lucide-react";

function ProductCard({ product }) {
  const discountPercentage =
    product.labelledPrice && product.price
      ? Math.round(
          ((product.labelledPrice - product.price) / product.labelledPrice) *
            100
        )
      : 0;

  return (
    <div className="w-[300px] h-[420px] bg-white shadow-lg rounded-xl m-2 flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative group m-5">
      {/*(Discount Label) */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
          -{discountPercentage}%
        </div>
      )}

      {/*(Favorite Button) */}
      <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-gray-100">
        <Heart className="w-5 h-5 text-gray-600" />
      </button>

      {/*(Product Image) */}
      <div className="w-full h-[220px] bg-gray-100 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.productName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Not Image
          </div>
        )}
      </div>

      {/*(Product Details) */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          {/*(Category and Size) */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-black text-white px-2 py-1 rounded">
              {product.category}
            </span>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              Size: {product.size}
            </span>
          </div>

          {/*(Product Name) */}
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
            {product.productName}
          </h3>

          {/* (Price) */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-gray-900">
              Rs. {product.price?.toLocaleString()}
            </span>
            {product.labelledPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                Rs. {product.labelledPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/*(Stock Status) */}
          <div className="text-sm text-gray-600">
            {product.stock > 0 ? (
              <span className="text-shadow-gray-700 font-medium">
                In Stock ({product.stock} remaining)
              </span>
            ) : (
              <span className="text-red-600 font-medium">Out Of Stock</span>
            )}
          </div>
        </div>

        {/* (Action Buttons) */}
        <button
          disabled={!product.isAvailable || product.stock === 0}
          className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed mt-3"
        >
          <ShoppingCart className="w-5 h-5" />
          {product.stock > 0 ? "Add to cart" : "Out Of Stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
