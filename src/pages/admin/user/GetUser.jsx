import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function GetUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading == true) {
      axios
        .get(import.meta.env.VITE_API_URL + "users/get_users")
        .then((res) => {
          setUsers(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  function deleteUser(userId) {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login first");
      return;
    }

    axios
      .delete(import.meta.env.VITE_API_URL + "users/" + userId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("User Detected Successfully");
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 p-6 relative">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          User Management
        </h1>
        <Link
          to="/admin/add-users"
          className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition duration-200 text-2xl"
          title="Add Product"
        >
          +
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden scroll-x">
        <div className="overflow-y-auto">
          {!isLoading ? (
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    User Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    User State
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-indigo-50 transition duration-150"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={user.img}
                          alt={user.userName}
                          className="w-16 h-16 object-cover rounded-lg shadow-md"
                        />
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-green-600">
                        {user.firstName + " " + user.lastName}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        <span
                          className={
                            user.isBlock ? "text-red-600" : "text-green-600"
                          }
                        >
                          {user.isBlock ? "Blocked" : "Unblocked"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              navigate("/admin/edit-user", {
                                state: {
                                  userId: user._id, 
                                  firstName: user.firstName,
                                  lastName: user.lastName,
                                  email: user.email,
                                  role: user.role,
                                  isBlock: user.isBlock,
                                },
                              });
                            }}
                            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition duration-150"
                          >
                            Edit
                          </button>
                          <button
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition duration-150"
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-[50px] h-[50px] border-[5px] border-gray-500 border-t-black rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Users Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Hi doing marking increase the customers
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetUser;
