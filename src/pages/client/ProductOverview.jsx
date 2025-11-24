import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react"; // 'Loader' is often an older name, 'LoaderCircle' or 'Loader2' is common
import ImageSlider from "../../components/ImageSlider";
import { addCart, getCart } from "../../../utils/cart";
import { Rating } from "@mui/material";
import { ChevronRight } from "lucide-react";

function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const navigate = useNavigate();

  const fetchReviews = async (pId) => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "review/" + pId
      );
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (newRating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    if (newComment.trim().length < 5) {
      toast.error("Comment must be at least 5 characters long.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to submit a review.");
      navigate("/login");
      return;
    }

    setIsReviewSubmitting(true);

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "review",
        {
          productId: product.productId,
          rating: newRating,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        toast.success("Review submitted successfully!");
        setNewRating(0);
        setNewComment("");
        fetchReviews(productId);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to submit review.";
      if (error.response && error.response.status === 409) {
        toast.error(
          "You have already reviewed this product. Please update your existing review."
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "product/" + productId)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setStatus("success");
        fetchReviews(productId);
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
          <div className="mt-16 border-t pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Customer Reviews ({reviews.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* 🔴 Left Column: Write a Review Form */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Share Your Experience
                </h3>
                <form
                  onSubmit={handleReviewSubmit}
                  className="space-y-4 bg-gray-50 p-6 rounded-lg"
                >
                  {/* Rating Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Rating
                    </label>
                    <Rating
                      name="simple-controlled"
                      value={newRating}
                      onChange={(event, newValue) => {
                        setNewRating(newValue);
                      }}
                      size="large"
                    />
                  </div>

                  {/* Comment Input */}
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      rows="4"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-gray-500 focus:border-gray-500"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="What did you like or dislike about this product?"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isReviewSubmitting}
                    className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors 
                                ${
                                  isReviewSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gray-900 hover:bg-gray-700"
                                }`}
                  >
                    {isReviewSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>

              {/* 🟢 Right Column: Display Existing Reviews */}
              <div className="md:col-span-2 space-y-8">
                {reviews.length === 0 ? (
                  <p className="text-gray-600 italic">
                    Be the first to review this product!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-b pb-6 last:border-b-0"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={review.user.img || "default_user_image.jpg"}
                          alt={review.user.firstName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-semibold text-gray-800">
                          {review.user.firstName} {review.user.lastName}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Rating
                          value={review.rating}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                        <span className="ml-2 text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductOverview;
