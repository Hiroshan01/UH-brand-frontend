import { useState } from "react";

import { Trash2, Minus, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function CheckOut() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNo2, setPhoneNo2] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [fullName, setFullName] = useState("");
  const [zipCode, setZipCode] = useState("");

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

  //Return the total
  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  }

  // Accept index as a parameter
  function removeFromCart(index) {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  }

  // Accept index and qty as parameters
  function changeQty(index, qty) {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    } else {
      const newCart = [...cart];
      newCart[index].qty = newQty;
      setCart(newCart);
    }
  }
  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please Login first");
    }
    const orderInformation = {
      products: [],
      address: address,
      phone: phoneNo,
      phone2: phoneNo2,
      district: selectedDistrict,
      fullName: fullName,
      zipCode: zipCode,
    };

    for (let i = 0; i < cart.length; i++) {
      const item = {
        productId: cart[i].productId,
        qty: cart[i].qty,
      };
      orderInformation.products[i] = item;
    }
    await axios
      .post(import.meta.env.VITE_API_URL + "order/", orderInformation, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Place Order Successfully");
      })
      .catch((e) => {
        console.log(e.response.data.message);
        toast.error(e.response.data.message);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left ">
          CheckOut
        </h1>

        <div className="w-[550px] h-auto min-h-[100px] shadow-2xl flex flex-col justify-center items-center rounded-2xl m-5 p-2">
          <p className="text-2xl text-secondary font-bold">
            Total:
            <span className="text-emerald-600 font-bold p-2">
              {/* LKR {getTotal.toFixed(2)} */}
              LKR {getTotal().toFixed(2)}
            </span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Full Name"
              className="px-10 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone 1"
              className="px-10 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone 2"
              className="px-10 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              value={phoneNo2}
              onChange={(e) => setPhoneNo2(e.target.value)}
            />
            <input
              type="number"
              placeholder="ZIP CODE"
              className="px-10 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <select
              className="px-10 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {ELECTORAL_DISTRICTS.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name} - {district.province}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Full Address"
              className="px-10 py-2 text-sm rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Link
            to="/checkout"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 mt-3"
            onClick={() => placeOrder()}
          >
            Place Order
          </Link>
        </div>

        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={item.productId}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 relative"
            >
              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center gap-4">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {item.productId}
                  </p>
                  <div className="mt-2">
                    {item.labellPrice > item.price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          LKR {item.labellPrice.toFixed(2)}
                        </span>
                        <span className="text-lg font-semibold text-emerald-600">
                          LKR {item.price.toFixed(2)}
                        </span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                          {Math.round(
                            ((item.labellPrice - item.price) /
                              item.labellPrice) *
                              100
                          )}
                          % OFF
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-semibold text-gray-900">
                        LKR {item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
                  <button
                    onClick={() => {
                      changeQty(index, -1);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center text-lg font-semibold text-gray-900">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => {
                      changeQty(index, 1);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-right min-w-[120px]">
                  <p className="text-sm text-gray-500 mb-1">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    LKR {(item.price * item.qty).toFixed(2)}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    removeFromCart(index);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 ml-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Mobile Layout */}
              <div className="sm:hidden">
                <div className="flex gap-3 mb-4">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                      {item.name}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.productId}
                    </p>
                    <div className="mt-2">
                      {item.labellPrice > item.price ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-gray-400 line-through">
                            LKR {item.labellPrice.toFixed(2)}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold text-emerald-600">
                              LKR {item.price.toFixed(2)}
                            </span>
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              {Math.round(
                                ((item.labellPrice - item.price) /
                                  item.labellPrice) *
                                  100
                              )}
                              % OFF
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-base font-semibold text-gray-900">
                          LKR {item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Delete Button - Mobile */}
                  <button
                    onClick={() => {
                      removeFromCart(index);
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95 flex-shrink-0 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Quantity and Total - Mobile */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5">
                    <button
                      onClick={() => {}}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 active:scale-95 transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-base font-semibold text-gray-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => {}}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 active:scale-95 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-0.5">Total</p>
                    <p className="text-xl font-bold text-gray-900">LKR {}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {/* <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">
              Subtotal
            </span>
            <span className="text-2xl font-bold text-gray-900">
              LKR{" "}
              {cart
                .reduce((sum, item) => sum + item.price * item.qty, 0)
                .toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 active:scale-98 transition-all shadow-lg hover:shadow-xl">
            Proceed to Checkout
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default CheckOut;
