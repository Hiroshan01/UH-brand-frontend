import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}users/login`,
        {
          email: email,
          password: password,
        }
      );
      toast.success("Login Successful");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
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
              Sign Up <LockOpenIcon fontSize="large" />
            </h1>
          </div>

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
            <LoginIcon /> LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
