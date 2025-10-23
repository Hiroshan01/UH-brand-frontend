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
      toast.error(e.response?.data || "Login failed");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/hero-1.jpg')] bg-center bg-cover flex  justify-evenly items-center">
      <div className="w-[50%] h-full"> </div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[400px] h-[500px] backdrop-blur-md rounded-2xl shadow-2xl flex flex-col justify-center items-center">
          <div>
            <h1 className="font-serif font-bold text-2xl">
              Register <HowToRegIcon fontSize="large" />
            </h1>
          </div>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="First Name"
            value={firstName}
            className="w-[300px] h-[50px] border rounded-[10px] my-[20px] px-4"
          />
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Last Name"
            value={lastName}
            className="w-[300px] h-[50px] border rounded-[10px] my-[20px] px-4"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            value={email}
            className="w-[300px] h-[50px] border rounded-[10px] my-[20px] px-4"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            value={password}
            type="password"
            className="w-[300px] h-[50px] border rounded-[10px] my-[20px] px-4"
          />
          <button
            onClick={handleLogin}
            className="w-[300px] h-[50px] bg-black rounded-[20px] text-[20px] font-bold text-white"
          >
            <LoginIcon /> Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
