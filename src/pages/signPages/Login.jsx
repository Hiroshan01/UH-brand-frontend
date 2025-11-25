import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (res) => {
      setGoogleLoading(true);
      const accessToken = res.access_token;

      axios
        .post(`${import.meta.env.VITE_API_URL}users/login/google`, {
          accessToken: accessToken,
        })
        .then((res) => {
          toast.success("Google Login Successful!");

          localStorage.setItem("token", res.data.token);

          window.dispatchEvent(new Event("loginSuccess"));

          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data?.message || "Google login failed");
          } else if (error.request) {
            toast.error("Network error. Please check your connection");
          } else {
            toast.error("Google login failed. Please try again.");
          }
        })
        .finally(() => {
          setGoogleLoading(false);
        });
    },
    onError: () => {
      toast.error("Google authentication failed");
      setGoogleLoading(false);
    },
  });

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}users/login`,
        {
          email: email,
          password: password,
        }
      );

      toast.success("Login Successful");

      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("loginSuccess"));
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      if (e.response) {
        const status = e.response.status;
        const errorMessage = e.response.data?.message || e.response.data;

        if (status === 401 || status === 400) {
          toast.error("Incorrect email or password");
        } else if (status === 404) {
          toast.error("User not found");
        } else if (status === 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error(errorMessage || "Login failed");
        }
      } else if (e.request) {
        toast.error("Network error. Please check your connection");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[url('/hero-1.jpg')] bg-center bg-cover flex flex-col justify-center items-center p-4">
      {/* Empty Left Section: Hidden on mobile, only visible on screens sized 'sm' and up. */}
      <div className="hidden sm:w-[50%] sm:h-full"></div>

      <div className="w-full flex justify-center items-center sm:w-[50%] sm:h-full">
        {/* Login Box: Full width on mobile, constrained by max-w-sm, dynamic height (min-h-[400px]) */}
        <div className="w-full max-w-sm p-6 backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-serif font-extrabold text-3xl text-white">
              Sign In <LockOpenIcon fontSize="large" className="text-white" />
            </h1>
          </div>

          {/* Email Input: w-full for responsiveness, improved styling (rounded-lg, focus ring) */}
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Email"
            value={email}
            type="email"
            disabled={loading}
            className="w-full h-12 border rounded-lg my-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          {/* Password Input: w-full for responsiveness, improved styling */}
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Password"
            value={password}
            type="password"
            disabled={loading}
            className="w-full h-12 border rounded-lg my-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <Link className="text-1xl font-semibold" to="/send-otp">
            Forget password ?
          </Link>
          {/* Button: w-full for responsiveness, enhanced styling and loading state */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 mt-6 bg-black rounded-full text-xl font-bold text-white transition-colors hover:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                {/* Loading Spinner */}
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              <>
                <LoginIcon /> LOGIN
              </>
            )}
          </button>

          <button
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full h-12 mt-6 bg-black border-gray-300 rounded-full text-xl font-bold text-white transition-colors hover:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {googleLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                Signing in with Google...
              </>
            ) : (
              <>
                <GrGoogle className="text-xl" />
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
