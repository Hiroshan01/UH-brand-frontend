import { Link, Route, Routes } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingCart,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function SalesDashboard() {
  const [salesData, setSalesData] = useState([]);
  const [todaySales, setTodaySales] = useState({ revenue: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSalesData();
    fetchTodaySales();
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

  const fetchTodaySales = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        return;
      }

      const response = await axios.get(
        import.meta.env.VITE_API_URL + "order/sales/today",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = response.data.data || response.data;
      setTodaySales({
        revenue: data.totalSales || 0,
        orders: data.totalOrders || 0,
      });
    } catch (e) {
      console.error("Failed to fetch today's sales:", e);
    }
  };

  const calculateTotals = () => {
    const data = Array.isArray(salesData) ? salesData : [];

    const totalRevenue = data.reduce((sum, item) => sum + item.totalSales, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.totalOrders, 0);
    return { totalRevenue, totalOrders };
  };

  const formatMonthYear = (monthYear) => {
    if (!monthYear) return "N/A";

    const [year, month] = monthYear.split("-");
    const date = new Date(year, parseInt(month) - 1);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getTodayFormatted = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
    <div className="w-full h-full overflow-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-5 text-slate-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        Sales Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Today's Sales Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs sm:text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Today's Sales
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                LKR {todaySales.revenue.toFixed(2)}
              </h2>
              <p className="text-purple-100 text-xs sm:text-sm mt-1">
                {todaySales.orders} orders
              </p>
            </div>
            <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-purple-200" />
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs sm:text-sm font-medium">
                Total Revenue
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                LKR {totalRevenue.toFixed(2)}
              </h2>
            </div>
            <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-blue-200" />
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs sm:text-sm font-medium">
                Total Orders
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                {totalOrders}
              </h2>
            </div>
            <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-green-200" />
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            Sales Overview
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Avg Order Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Today's Sales Row */}
              <tr className="bg-purple-50 hover:bg-purple-100 transition-colors">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-bold text-purple-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {getTodayFormatted()}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-900">
                  LKR {todaySales.revenue.toFixed(2)}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-900">
                  {todaySales.orders}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-900">
                  LKR{" "}
                  {todaySales.orders > 0
                    ? (todaySales.revenue / todaySales.orders).toFixed(2)
                    : "0.00"}
                </td>
              </tr>

              {/* Monthly Sales Rows */}
              {salesData.map((item, index) => {
                const avgOrderValue =
                  item.totalOrders > 0
                    ? (item.totalSales / item.totalOrders).toFixed(2)
                    : "0.00";

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatMonthYear(item.monthYear)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      LKR {item.totalSales.toFixed(2)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.totalOrders}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
