import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import UserTag from "./UserTag";

function Header() {
  const [isDropDown, setIsDropDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(token !== null);
    };

    checkAuthStatus();

    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("logout", checkAuthStatus);
    window.addEventListener("loginSuccess", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("logout", checkAuthStatus);
      window.removeEventListener("loginSuccess", checkAuthStatus);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropDown(!isDropDown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-2xl">
      <nav className="container mx-auto px-4 py-4">
        {/* Top Bar - Logo, Icons, Hamburger */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-serif">
            <Link to="/">
              <img
                src={logo}
                alt="MyBrand Logo"
                className="h-10 w-auto rounded md:h-12"
              />
            </Link>
          </div>

          {/* Desktop Menu Items */}
          <ul className="hidden md:flex gap-6">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400 transition font-serif"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Products"
                className="hover:text-gray-400 transition font-serif"
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-gray-400 transition font-serif"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop Icons and User Section */}
          <div className="hidden md:flex gap-2 items-center">
            <Link
              to="/cart"
              className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition"
            >
              <ShoppingCartIcon style={{ color: "black" }} />
            </Link>

            {/*  User login UserTag */}
            {isLoggedIn ? (
              <UserTag
                imgLink="https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png"
                onLogout={() => setIsLoggedIn(false)}
              />
            ) : (
              /* Login dropdown */
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition"
                >
                  <PersonIcon style={{ color: "black" }} />
                </button>

                {/* Dropdown Menu */}
                {isDropDown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition font-serif"
                      onClick={() => setIsDropDown(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition font-serif"
                      onClick={() => setIsDropDown(false)}
                    >
                      Registration
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-blue-600 p-2"
          >
            {isMobileMenuOpen ? (
              <CloseIcon style={{ color: "black" }} />
            ) : (
              <MenuIcon style={{ color: "black" }} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {/* Mobile Menu Items */}
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/"
                  className="block hover:text-blue-600 transition font-serif"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/Products"
                  className="block hover:text-blue-600 transition font-serif"
                  onClick={toggleMobileMenu}
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block hover:text-blue-600 transition font-serif"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile Icons */}
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Link
                to="/cart"
                className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition"
              >
                <ShoppingCartIcon style={{ color: "black" }} />
              </Link>
            </div>

            {/*Mobile Login/Register හෝ UserTag */}
            {isLoggedIn ? (
              <div className="mt-4 pt-4 border-t">
                <UserTag
                  imgLink="https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png"
                  onLogout={() => {
                    setIsLoggedIn(false);
                    toggleMobileMenu();
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-center bg-black text-white rounded-lg hover:bg-gray-800 transition font-serif"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-serif"
                  onClick={toggleMobileMenu}
                >
                  Registration
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
