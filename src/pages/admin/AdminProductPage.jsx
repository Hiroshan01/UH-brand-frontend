import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "product").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 p-6 relative">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Products Management
        </h1>
        <Link
          to="/admin/add-product"
          className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition duration-200 text-2xl"
          title="Add Product"
        >
          +
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden scroll-x">
        <div className="overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Product ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Category & Size
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Label Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-indigo-50 transition duration-150"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={item.images[0]}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg shadow-md"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.productId}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {item.category} - {item.size}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="line-through text-gray-500">
                        Rs. {item.labelledPrice}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">
                      Rs. {item.price}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.stock > 50
                            ? "bg-green-100 text-green-800"
                            : item.stock > 20
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition duration-150">
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition duration-150">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Products Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start by adding your first product
            </p>
            <Link
              to="/admin/add-product"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
            >
              Add Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProductPage;
