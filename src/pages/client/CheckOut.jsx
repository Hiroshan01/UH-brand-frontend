import { useState } from "react";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  MapPin,
  User,
  Phone,
  Package,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function CheckOut() {
  const location = useLocation();
  // Using an array for cart state initialization from location.state
  const [cart, setCart] = useState(location.state?.cart || []);
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNo2, setPhoneNo2] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [fullName, setFullName] = useState("");
  const [zipCode, setZipCode] = useState("");
  // These states seem product-specific and might be better handled per-item in a real application,

  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");

  const ELECTORAL_DISTRICTS = [
    { id: 1, name: "Colombo", province: "Western" },
    { id: 2, name: "Gampaha", province: "Western" },
    { id: 3, name: "Kalutara", province: "Western" },
    { id: 4, name: "Kandy", province: "Central" },
    { id: 5, name: "Matale", province: "Central" },
    { id: 6, name: "Nuwara Eliya", province: "Central" },
    { id: 7, name: "Galle", province: "Southern" },
    { id: 8, name: "Matara", province: "Southern" },
    { id: 9, name: "Hambantota", province: "Southern" },
    { id: 10, name: "Jaffna", province: "Northern" },
    { id: 11, name: "Vanni", province: "Northern" },
    { id: 12, name: "Batticaloa", province: "Eastern" },
    { id: 13, name: "Digamadulla (Ampara)", province: "Eastern" },
    { id: 14, name: "Trincomalee", province: "Eastern" },
    { id: 15, name: "Kurunegala", province: "North Western" },
    { id: 16, name: "Puttalam", province: "North Western" },
    { id: 17, name: "Anuradhapura", province: "North Central" },
    { id: 18, name: "Polonnaruwa", province: "North Central" },
    { id: 19, name: "Badulla", province: "Uva" },
    { id: 20, name: "Monaragala", province: "Uva" },
    { id: 21, name: "Ratnapura", province: "Sabaragamuwa" },
    { id: 22, name: "Kegalle", province: "Sabaragamuwa" },
  ];

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  }

  function removeFromCart(index) {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  }

  function changeQty(index, qty) {
    const newCart = [...cart];
    const newQty = newCart[index].qty + qty;
    if (newQty <= 0) {
      removeFromCart(index);
    } else {
      newCart[index].qty = newQty;
      setCart(newCart);
    }
  }

  function handleDistrictChange(e) {
    const districtId = parseInt(e.target.value);
    const district = ELECTORAL_DISTRICTS.find((d) => d.id === districtId);
    setSelectedDistrict(district);
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please Login first");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    if (!selectedDistrict || !fullName || !address || !phoneNo) {
      toast.error(
        "Please fill in all required delivery details (Name, Address, Phone, District)"
      );
      return;
    }

    const orderInformation = {
      products: cart.map((item) => ({
        productId: item.productId,
        qty: item.qty,
      })),
      address: address,
      phone: phoneNo,
      phone2: phoneNo2,
      district: {
        id: selectedDistrict.id,
        name: selectedDistrict.name,
        province: selectedDistrict.province,
      },
      fullName: fullName,
      zipCode: zipCode,
      // NOTE: These fields should ideally be per-product in the cart items,
      // but are included here as global form fields based on the original structure.
      size: size,
      category: category,
      color: color,
    };

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "order/",
        orderInformation,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Order Placed Successfully!");
      setCart([]); // Clear cart after successful order
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to place order");
    }
  }

  const isCartEmpty = cart.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-500 mb-8 text-center border-b-2 pb-4">
          🛒 Secure Checkout
        </h1>

        <div className="flex flex-col lg:flex-row-reverse gap-8">
          {/* Right Side (Cart Items - Takes 2/5 on Large Screens, Full on Mobile) */}
          <div className="lg:w-2/5 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingCart size={24} className="text-green-500" /> Your Cart (
              {cart.length} Items)
            </h2>
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
              {isCartEmpty ? (
                <div className="p-8 text-center bg-white rounded-xl shadow-lg">
                  <p className="text-xl text-gray-500">Your cart is empty.</p>
                  <Link
                    to="/products"
                    className="text-green-500 hover:text-green-600 mt-2 block font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={item.productId + index} 
                    className="bg-white rounded-xl shadow-lg transition-all duration-300 p-4 relative border border-gray-100 hover:border-green-200"
                  >
                    {/* Desktop Layout */}
                    <div className="hidden sm:flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0 border border-gray-200"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <div className="mt-1">
                          {item.labellPrice > item.price ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 line-through">
                                LKR {item.labellPrice.toFixed(2)}
                              </span>
                              <span className="text-sm font-bold text-emerald-600">
                                LKR {item.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm font-bold text-gray-900">
                              LKR {item.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() => changeQty(index, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all active:scale-95"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-gray-900">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => changeQty(index, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all active:scale-95"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Total: LKR {(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(index)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 ml-2 flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Mobile Layout */}
                    <div className="sm:hidden">
                      <div className="flex gap-3 items-start mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border border-gray-200"
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <div className="mt-1">
                            {item.labellPrice > item.price ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 line-through">
                                  LKR {item.labellPrice.toFixed(2)}
                                </span>
                                <span className="text-sm font-bold text-emerald-600">
                                  LKR {item.price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm font-bold text-gray-900">
                                LKR {item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(index)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() => changeQty(index, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all active:scale-95"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-gray-900">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => changeQty(index, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all active:scale-95"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-500">Subtotal</p>
                          <p className="text-lg font-bold text-gray-900">
                            LKR {(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Total Summary */}
            <div className="mt-6 p-4 bg-white rounded-xl shadow-lg border-2 border-emerald-100">
              <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Total Order Value:</span>
                <span className="text-emerald-600">
                  LKR {getTotal().toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Shipping costs will be calculated based on the district.
              </p>
            </div>
          </div>

          {/* Left Side (Checkout Form - Takes 3/5 on Large Screens, Full on Mobile) */}
          <div className="lg:w-3/5 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={24} className="text-red-500" /> Delivery Information
            </h2>

            <div className="w-full h-auto min-h-[100px] shadow-2xl rounded-2xl p-6 bg-white border-4 border-green-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                {/* Phone 1 */}
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    placeholder="Primary Phone"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                  />
                </div>
                {/* Phone 2 */}
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    placeholder="Secondary Phone (Optional)"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={phoneNo2}
                    onChange={(e) => setPhoneNo2(e.target.value)}
                  />
                </div>
                {/* ZIP Code */}
                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code *"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                {/* District Select */}
                <div className="relative sm:col-span-2">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <select
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white appearance-none"
                    value={selectedDistrict?.id || ""}
                    onChange={handleDistrictChange}
                    required
                  >
                    <option value="">Select District *</option>
                    {ELECTORAL_DISTRICTS.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name} - {district.province}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Full Address */}
                <div className="relative sm:col-span-2">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-4 text-gray-400"
                  />
                  <textarea
                    placeholder="Full Address (Street, City, etc.) *"
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                {/* --- Optional Product Attributes (moved to a separate section) --- */}
              </div>

              <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3 border-t pt-4">
                Optional Product Preferences (If applicable)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category */}
                <select
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Men-Women">Men-Women(Both)</option>
                  <option value="Kids">Kids</option>
                </select>
                {/* Size */}
                <select
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="S | M | L | XL">S | M | L | XL</option>
                </select>
                {/* Color */}
                <input
                  type="text"
                  placeholder="Cloth Color"
                  className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>

              <button
                className={`w-full ${
                  isCartEmpty
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-6 text-lg`}
                onClick={placeOrder}
                disabled={isCartEmpty}
              >
                {isCartEmpty
                  ? "Cart is Empty"
                  : `Place Order - LKR ${getTotal().toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Custom scrollbar for better visual on cart items (optional) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}

export default CheckOut;
