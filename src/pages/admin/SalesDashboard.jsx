import { Link, Route, Routes } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingCart,
  Star,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function SalesDashboard() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        toast.error("Please login first");
        return;
      }

      setLoading(true);
      setError(null);

      const response = await axios.get(
        import.meta.env.VITE_API_URL + "order/sales",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      let incomingData = response.data;

      if (Array.isArray(response.data.data)) {
        incomingData = response.data.data;
      }

      if (!Array.isArray(incomingData)) {
        incomingData = [];
      }

      setSalesData(incomingData);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to fetch sales data");
      toast.error(e.response?.data?.message || "Failed to fetch sales data");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const data = Array.isArray(salesData) ? salesData : [];

    const totalRevenue = data.reduce((sum, item) => sum + item.totalSales, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.totalOrders, 0);
    return { totalRevenue, totalOrders };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl text-gray-600">Loading sales data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  const { totalRevenue, totalOrders } = calculateTotals();

  return (
    <div className="w-full h-full overflow-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Sales Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Revenue</p>
              <h2 className="text-3xl font-bold mt-2">
                LKR {totalRevenue.toFixed(2)}
              </h2>
            </div>
            <DollarSign className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Orders</p>
              <h2 className="text-3xl font-bold mt-2">{totalOrders}</h2>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200" />
          </div>
        </div>
      </div>

      {/* Monthly Sales Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Monthly Sales</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Avg Order Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((item, index) => {
                const avgOrderValue =
                  item.totalOrders > 0
                    ? (item.totalSales / item.totalOrders).toFixed(2)
                    : 0;

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.monthYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      LKR {item.totalSales.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      LKR {avgOrderValue}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesDashboard;
