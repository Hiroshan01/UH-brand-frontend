import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

function UserTag(props) {
  const [name, setName] = useState(props.name);
  const [loading, setLoading] = useState(true);
  const [userImg, setUserImg] = useState(props.imgLink);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.user) {
          const { firstName, lastName, img, role } = response.data.user;
          setName(`${firstName} ${lastName}`);
          setUserRole(role);

          if (img) {
            setUserImg(img);
          }
        }
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("logout"));
        }

        setName("User");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("logout"));

    if (props.onLogout) {
      props.onLogout();
    }

    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    // User role to redirect
    if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole === "customer") {
      navigate("/customer");
    }
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center mr-6">
        <div className="animate-pulse flex items-center">
          <div className="rounded-full bg-gray-300 w-[50px] h-[50px]"></div>
          <div className="ml-3 bg-gray-300 h-4 w-24 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mr-6" ref={dropdownRef}>
      <div
        className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
        onClick={toggleDropdown}
      >
        <img
          className="rounded-full w-[50px] h-[50px] object-cover border-2 border-black"
          src={userImg}
          alt="User Avatar"
        />
        <span className="text-purple-500 ml-3 font-extrabold">{name}</span>

        {/* Dropdown arrow icon */}
        <svg
          className={`ml-2 w-4 h-4 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* Profile Link - Customer හෝ Admin නම් විතරක් පෙන්වන්න */}
          {(userRole === "customer" || userRole === "admin") && (
            <button
              onClick={handleProfileClick}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-50 transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Profile
            </button>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-1"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserTag;
