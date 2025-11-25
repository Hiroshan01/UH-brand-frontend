import axios from "axios";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      setIsLoading(false);
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "order", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Failed to fetch orders");
        setIsLoading(false);
      });
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setActiveOrder(null);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    setIsUpdating(true);
    axios
      .put(
        import.meta.env.VITE_API_URL + `order/${orderId}/${newStatus}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        toast.success("Order status updated successfully");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
        setActiveOrder({ ...activeOrder, status: newStatus });
        setIsUpdating(false);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Failed to update status");
        setIsUpdating(false);
      });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 p-6 relative">
      <h1 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-4">
        Order Management
      </h1>
      {isLoading ? (
        <h1 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Loading...
        </h1>
      ) : (
        <div className="overflow-x-auto">
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={() => {}}
            onRequestClose={closeModal}
            contentLabel="Order Details Modal"
            className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-2xl outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="w-full max-h-[90vh] overflow-y-auto border-4 border-indigo-500 rounded-lg p-6">
              {activeOrder && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
                    Order Details
                  </h2>

                  {/* Customer Information */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <p>
                        <strong>Order ID:</strong> {activeOrder.orderId}
                      </p>
                      <p>
                        <strong>Customer Name:</strong> {activeOrder.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong> {activeOrder.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {activeOrder.phone}
                      </p>
                      {activeOrder.phone2 && (
                        <p>
                          <strong>Phone 2:</strong> {activeOrder.phone2}
                        </p>
                      )}
                      <p>
                        <strong>Address:</strong> {activeOrder.address}
                      </p>
                      <p>
                        <strong>District:</strong>{" "}
                        {activeOrder.district?.name || activeOrder.district}
                      </p>
                      <p>
                        <strong>Zip Code:</strong> {activeOrder.zipCode}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(activeOrder.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`font-bold ${
                            activeOrder.status === "pending"
                              ? "text-yellow-500"
                              : activeOrder.status === "completed"
                              ? "text-green-600"
                              : activeOrder.status === "cancelled"
                              ? "text-red-500"
                              : "text-blue-500"
                          }`}
                        >
                          {activeOrder.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Products Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      Products
                    </h3>
                    <div className="space-y-4">
                      {activeOrder.products &&
                        activeOrder.products.map((product, index) => (
                          <div
                            key={product._id || index}
                            className="border border-gray-200 rounded-lg p-4 bg-white"
                          >
                            <div className="flex flex-col md:flex-row gap-4">
                              {/* Product Images */}
                              {product.productInfo?.image &&
                                product.productInfo.image.length > 0 && (
                                  <div className="flex-shrink-0">
                                    <img
                                      src={product.productInfo.image[0]}
                                      alt={product.productInfo.name}
                                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                    />
                                    {product.productInfo.image.length > 1 && (
                                      <div className="flex gap-2 mt-2 overflow-x-auto">
                                        {product.productInfo.image
                                          .slice(1, 4)
                                          .map((img, imgIndex) => (
                                            <img
                                              key={imgIndex}
                                              src={img}
                                              alt={`${
                                                product.productInfo.name
                                              } ${imgIndex + 2}`}
                                              className="w-16 h-16 object-cover rounded border border-gray-200"
                                            />
                                          ))}
                                      </div>
                                    )}
                                  </div>
                                )}

                              {/* Product Details */}
                              <div className="flex-grow">
                                <h4 className="font-semibold text-lg text-gray-800 mb-2">
                                  {product.productInfo?.name || "Product"}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <p>
                                    <strong>Product ID:</strong>{" "}
                                    {product.productInfo?.productId}
                                  </p>
                                  <p>
                                    <strong>Category:</strong>{" "}
                                    {product.productInfo?.category}
                                  </p>
                                  <p>
                                    <strong>Size:</strong>{" "}
                                    {product.productInfo?.size}
                                  </p>
                                  <p>
                                    <strong>Quantity:</strong>{" "}
                                    {product.quantity}
                                  </p>
                                  <p>
                                    <strong>Price:</strong> Rs.{" "}
                                    {product.productInfo?.price}
                                  </p>
                                  <p>
                                    <strong>Subtotal:</strong> Rs.{" "}
                                    {(product.productInfo?.price || 0) *
                                      product.quantity}
                                  </p>
                                </div>
                                {product.productInfo?.description && (
                                  <p className="text-sm text-gray-600 mt-2">
                                    <strong>Description:</strong>{" "}
                                    {product.productInfo.description.substring(
                                      0,
                                      150
                                    )}
                                    {product.productInfo.description.length >
                                    150
                                      ? "..."
                                      : ""}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        {activeOrder.labelTotal && (
                          <p className="text-sm text-gray-600">
                            <strong>Label Total:</strong> Rs.{" "}
                            {activeOrder.labelTotal}
                          </p>
                        )}
                        <p className="text-xl font-bold text-gray-800">
                          <strong>Total Amount:</strong> Rs. {activeOrder.total}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Change Section */}
                  <div className="mb-6">
                    <label
                      htmlFor="statusSelect"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Change Order Status:
                    </label>
                    <select
                      id="statusSelect"
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        if (newStatus && newStatus !== activeOrder.status) {
                          updateOrderStatus(activeOrder.orderId, newStatus);
                        }
                      }}
                      value={activeOrder.status}
                      disabled={isUpdating}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="returned">Returned</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={closeModal}
                      className="bg-gray-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-600 focus:outline-none transition-all"
                      disabled={isUpdating}
                    >
                      Close
                    </button>
                    <button
                      onClick={handlePrint}
                      className="bg-green-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-600 focus:outline-none transition-all"
                      disabled={isUpdating}
                    >
                      Print
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>

          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Address
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  District
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.map((item, index) => {
                return (
                  <tr
                    key={item._id || index}
                    className="hover:bg-indigo-50 transition duration-150 cursor-pointer"
                    onClick={() => {
                      setIsOpen(true);
                      setActiveOrder(item);
                    }}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.orderId}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.phone}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.address}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.district?.name || item.district}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Rs. {item.total}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "pending"
                            ? "text-yellow-500"
                            : item.status === "completed"
                            ? "text-green-600"
                            : item.status === "cancelled"
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
