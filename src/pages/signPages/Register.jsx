import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    if (!firstName || !lastName || !email || !password) {
      toast.error("Fill All Fields!");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}users`, {
        firstName,
        lastName,
        email,
        password,
      });
      toast.success("Registration Successful");
      navigate("/login");
    } catch (e) {
      toast.error(e.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/hero-1.jpg')] bg-center bg-cover flex flex-col justify-center items-center p-4">
      <div className="hidden sm:w-[50%] sm:h-full"> </div>
      <div className="w-full flex justify-center items-center sm:w-[50%] sm:h-full">
        <div className="w-full max-w-sm p-6 backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl flex flex-col justify-center items-center">
          {/* Header */}
          <div className="mb-4">
            <h1 className="font-serif font-bold text-3xl text-white">
              Register <HowToRegIcon fontSize="large" className="text-white" />
            </h1>
          </div>

          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="First Name"
            value={firstName}
            className="w-full h-12 border rounded-lg my-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Last Name"
            value={lastName}
            className="w-full h-12 border rounded-lg my-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            value={email}
            type="email"
            className="w-full h-12 border rounded-lg my-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            value={password}
            type="password"
            className="w-full h-12 border rounded-lg my-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button: Use w-full for full width on mobile. */}
          <button
            onClick={handleLogin}
            className="w-full h-12 mt-4 bg-black rounded-full text-lg font-bold text-white transition duration-300 hover:bg-gray-800"
          >
            <LoginIcon /> Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
