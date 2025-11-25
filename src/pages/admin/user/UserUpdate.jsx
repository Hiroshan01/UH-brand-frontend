import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import mediaUpload from "../../../../utils/mediaUpload";

function UpdateUser() {
  const navigate = useNavigate();
  const location = useLocation();

  const userId =
    location.state?.userId || location.state?.id || location.state?._id;

  const [firstName, setFirstName] = useState(location.state?.firstName || "");
  const [lastName, setLastName] = useState(location.state?.lastName || "");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(location.state?.role || "customer");
  const [isBlock, setIsBlock] = useState(location.state?.isBlock || false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function updateUsers(e) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please Login first");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = null;

      // Upload image if one is selected
      if (image) {
        const loadingToast = toast.loading("Uploading image...");
        try {
          imageUrl = await mediaUpload(image);
          toast.dismiss(loadingToast);
          toast.success("Image uploaded successfully");
        } catch (uploadError) {
          toast.dismiss(loadingToast);
          toast.error("Image upload failed: " + uploadError);
          setLoading(false);
          return;
        }
      }

      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: role,
        isBlock: isBlock === "true" || isBlock === true,
        ...(imageUrl && { img: imageUrl }),
      };

      if (password && password.trim() !== "") {
        userData.password = password;
      }

      const apiUrl = import.meta.env.VITE_API_URL + "users/" + userId;

      await axios.put(apiUrl, userData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      toast.success("User updated Successfully");
      navigate("/admin/users");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Editing User ID:</strong> {userId}
          </p>
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Update User
        </h1>

        <form
          onSubmit={updateUsers}
          className="space-y-6 bg-slate-50 p-8 rounded-2xl shadow-lg"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password - Optional */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password{" "}
              <span className="text-gray-500">
                (Optional - leave blank to keep current)
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter new password or leave blank"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {/* Is Block */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Status <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
              value={isBlock.toString()}
              onChange={(e) => setIsBlock(e.target.value)}
              required
            >
              <option value="false">Active (Not Blocked)</option>
              <option value="true">Blocked</option>
            </select>
          </div>

          {/* User Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              onChange={(e) => setImage(e.target.files[0] || null)}
            />
            {image && (
              <div className="mt-2 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-green-600 font-medium">
                  Selected: {image.name}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Link
              to="/admin/users"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200 text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Updating User...
                </span>
              ) : (
                "Update User"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
