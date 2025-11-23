import { useNavigate, useParams } from "react-router-dom";
// Removed unused 'Product' import
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react"; // 'Loader' is often an older name, 'LoaderCircle' or 'Loader2' is common
import ImageSlider from "../../components/ImageSlider";
import { addCart, getCart } from "../../../utils/cart";

function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "product/" + productId)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        toast.error("Something Went Wrong");
      });
  }, [productId]); // Added productId as a dependency

  // Loading State
  if (status === "loading") {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <LoaderCircle className="w-16 h-16 animate-spin text-gray-900" />
      </div>
    );
  }

  // Error State
  if (status === "error") {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <h1 className="text-2xl text-red-600">Failed to load product.</h1>
      </div>
    );
  }

  // Success State
  return (
    <>
      {status === "success" && (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Image Slider */}
            <div className="w-full md:flex-1 flex justify-center items-start">
              <ImageSlider images={product.images} />
            </div>

            {/* Right Column: Product Details */}
            <div className="w-full md:flex-1 flex flex-col pt-4">
              {/* Category */}
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {product.category}
              </span>

              {/* Product Name */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 my-3">
                {product.productName}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-4xl font-bold text-red-600">
                  LKR. {product.price}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  LKR. {product.labelledPrice}
                </span>
              </div>

              {/* Stock & Size */}
              <div className="flex items-center gap-6 text-lg my-4">
                {product.stock > 0 ? (
                  <span className="font-medium text-green-600">In Stock</span>
                ) : (
                  <span className="font-medium text-red-600">Out of Stock</span>
                )}
                <span className="text-gray-700">
                  Size: <span className="font-semibold">{product.size}</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 my-6">
                <button
                  className="
                    flex-1 py-3 px-6 rounded-lg 
                    bg-white border-2 border-gray-900 text-gray-900 
                    font-semibold text-lg hover:bg-gray-100 transition-all cursor-pointer"
                  onClick={() => {
                    console.log("Old cart");
                    console.log(getCart());
                    addCart(product, 1);
                    toast.success("Product added to cart!");
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        cart: [
                          {
                            productId: product.productId,
                            name: product.productName,
                            image: product.images[0],
                            price: product.price,
                            labellPrice: product.labelledPrice,
                            qty: 1,
                          },
                        ],
                      },
                    });
                  }}
                  className="
                    flex-1 py-3 px-6 rounded-lg 
                    bg-gray-900 border-2 border-gray-900 text-white 
                    font-semibold text-lg hover:bg-gray-700 transition-all cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {/* Assuming your product object has a 'description' field */}
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductOverview;
