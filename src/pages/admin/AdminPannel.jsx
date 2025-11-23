import { Link, Route, Routes } from "react-router-dom";
import { Package, Users, ShoppingCart, Star } from "lucide-react";
import AdminProductPage from "./AdminProductPage";
import AddProduct from "./Product/AddProduct";
import EditProduct from "./Product/EditProduct";
import OrderPage from "./orderPage/OrderPage";
import GetUser from "./user/GetUser";
import AddUser from "./user/UserAdd";
import UpdateUser from "./user/UserUpdate";

function AdminPannel() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex">
      <div className="w-[300px] h-screen bg-gradient-to-b from-black-600 to-blue-800 flex items-center flex-col shadow-2xl py-8 gap-4">
        <Link
          to="/admin/"
          className="w-4/5 px-6 py-4 bg-white text-black-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center hover:bg-indigo-50 flex items-center justify-center gap-3"
        >
          <Package className="w-5 h-5" />
          Admin Home
        </Link>

        <Link
          to="/admin/products"
          className="w-4/5 px-6 py-4 bg-white text-black-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center hover:bg-indigo-50 flex items-center justify-center gap-3"
        >
          <Package className="w-5 h-5" />
          Products
        </Link>
        <Link
          to="/admin/users"
          className="w-4/5 px-6 py-4 bg-white text-black-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center hover:bg-indigo-50 flex items-center justify-center gap-3"
        >
          <Users className="w-5 h-5" />
          Users
        </Link>
        <Link
          to="/admin/orders"
          className="w-4/5 px-6 py-4 bg-white text-black-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center hover:bg-indigo-50 flex items-center justify-center gap-3"
        >
          <ShoppingCart className="w-5 h-5" />
          Oders
        </Link>
        <Link
          to="/admin/reviews"
          className="w-4/5 px-6 py-4 bg-white text-black-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center hover:bg-indigo-50 flex items-center justify-center gap-3"
        >
          <Star className="w-5 h-5" />
          Reviews
        </Link>
      </div>
      <div className="h-screen w-[calc(100%-300px)] bg-white p-8">
        <Routes path="/*">
          <Route path="/products" element={<AdminProductPage />} />
          <Route path="/users" element={<GetUser />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route
            path="/reviews"
            element={
              <div className="flex items-center gap-4">
                <Star className="w-12 h-12 text-indigo-600" />
                <h1 className="text-5xl font-bold text-slate-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Reviews
                </h1>
              </div>
            }
          />

          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/add-users" element={<AddUser />} />
          <Route path="/edit-user" element={<UpdateUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPannel;
