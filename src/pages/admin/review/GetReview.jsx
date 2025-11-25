import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function GetReview() {
  const [reviews, setReviews] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //get token
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "review", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {

          setReviews(res.data.reviews); 
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            toast.error("Session expired. Please login again.");
            navigate("/login");
          } else if (error.response?.status === 403) {
            toast.error("Access denied. Admin only.");
            navigate("/admin");
          } else {
            toast.error("Failed to fetch reviews");
          }
          setIsLoading(false);
        });
    }
  }, [isLoading, navigate]);

  function deleteReview(reviewId) {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login first");
      return;
    }
    axios
      .delete(import.meta.env.VITE_API_URL + "review/" + reviewId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Review Deleted Successfully");
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Failed to delete review");
      });
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 p-6 relative">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Review Management
        </h1>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          {!isLoading ? (
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Comment
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reviews.map((item, index) => {
                  return (
                    <tr
                      key={item._id || index}
                      className="hover:bg-indigo-50 transition duration-150"
                    >
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.user?.img || "default_user_image.jpg"}
                            alt={item.user?.firstName}
                            className="w-10 h-10 object-cover rounded-full shadow-md"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.user?.firstName} {item.user?.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.user?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Product Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              item.product?.images?.[0] || "default_product.jpg"
                            }
                            alt={item.product?.productName}
                            className="w-12 h-12 object-cover rounded-lg shadow-md"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.product?.productName}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {item.product?.productId}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-lg">★</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {item.rating}/5
                          </span>
                        </div>
                      </td>

                      {/* Comment */}
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {item.comment}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-sm">
                        <button
                          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition duration-150"
                          onClick={() => deleteReview(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-64 flex justify-center items-center">
              <div className="w-[50px] h-[50px] border-[5px] border-gray-500 border-t-black rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {!isLoading && reviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Customers haven't left any reviews yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetReview;
