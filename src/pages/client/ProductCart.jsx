import { useState } from "react";
import {
  addCart,
  getCart,
  getTotal,
  removeFromCart,
} from "../../../utils/cart";
import { Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCart() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left ">
          Shopping Cart
        </h1>

        <div className="w-[300px] h-auto min-h-[100px] shadow-2xl flex flex-col justify-center items-center rounded-2xl m-5 p-5">
          <p className="text-2xl text-secondary font-bold">
            Total:
            <span className="text-emerald-600 font-bold p-2">
              LKR {getTotal().toFixed(2)}
            </span>
          </p>
          <Link
            to="/checkout"
            state={{
              cart: cart,
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 mt-3"
          >
            Proceed to Checkout
          </Link>
        </div>

        <div className="space-y-4">
          {cart.map((item) => (
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
                      if (item.qty > 1) {
                        addCart(item, -1);
                        setCart(getCart());
                      }
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
                      addCart(item, 1);
                      setCart(getCart());
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
                    removeFromCart(item.productId);
                    setCart(getCart());
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
                      removeFromCart(item.productId);
                      setCart(getCart());
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
                      onClick={() => {
                        if (item.qty > 1) {
                          addCart(item, -1);
                          setCart(getCart());
                        }
                      }}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 active:scale-95 transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-base font-semibold text-gray-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => {
                        addCart(item, 1);
                        setCart(getCart());
                      }}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 active:scale-95 transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-0.5">Total</p>
                    <p className="text-xl font-bold text-gray-900">
                      LKR {(item.price * item.qty).toFixed(2)}
                    </p>
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

export default ProductCart;
