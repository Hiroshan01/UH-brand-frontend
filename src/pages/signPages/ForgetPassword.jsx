import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function sentOtp() {
    axios
      .post(import.meta.env.VITE_API_URL + "users/send-otp", { email })
      .then(() => {
        setOtpSent(true);
        toast.success("OTP sent to your email");
      })
      .catch((error) => {
        toast.error("Failed to send OTP",error);
      });
  }

  function verifyOtp() {
    axios
      .post(import.meta.env.VITE_API_URL + "users/reset-password", {
        email,
        otp,
        newPassword,
      })
      .then(() => {
        toast.success("OTP verification successful");
        navigate("/login");
      })
      .catch(() => {
        toast.error("OTP verification failed");
      });
  }
  return (
    <div className="w-full min-h-screen bg-[url('/hero-1.jpg')] bg-center bg-cover flex flex-col justify-center items-center p-4">
      {otpSent ? (
        <div className="w-[90%] sm:w-[400px] backdrop-blur-md bg-white/10  p-6 rounded-2xl shadow-md">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={verifyOtp}
            className="w-full bg-black rounded-2xl text-white p-2  hover:bg-gray-600 transition-all duration-300"
          >
            Verify OTP
          </button>
          <button
            onClick={() => setOtpSent(false)}
            className="w-full bg-gray-300 text-black p-2 rounded-2xl hover:bg-gray-400 mt-4"
          >
            Resend OTP
          </button>
        </div>
      ) : (
        <div className="w-[90%] sm:w-[400px] backdrop-blur-md bg-white/10  p-6 rounded-2xl shadow-md">
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={sentOtp}
            className="w-full bg-black rounded-2xl text-white p-2  hover:bg-gray-600 transition-all duration-300"
          >
            Send OTP
          </button>
        </div>
      )}
    </div>
  );
}
