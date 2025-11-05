import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu"; // මේක add කරන්න
import CloseIcon from "@mui/icons-material/Close"; // මේක add කරන්න
import { useState } from "react";
import logo from "../assets/logo.jpg";

function Header() {
  const [isDropDown, setIsDropDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

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
          <div className="text-2xl font-bold">
            <Link to="/">
              <img
                src={logo}
                alt="MyBrand Logo"
                className="h-10 w-auto rounded md:h-12"
              />
            </Link>
          </div>

          {/* Desktop Menu Items - Mobile hide  */}
          <ul className="hidden md:flex gap-6">
            <li>
              <Link to="/" className="hover:text-blue-600 transition font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition font-bold"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-blue-600 transition font-bold"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition font-bold"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop Icons - Mobile  hide  */}
          <div className="hidden md:flex gap-2 items-center">
            <button className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition">
              <SearchIcon style={{ color: "black" }} />
            </button>
            <button className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition">
              <ShoppingCartIcon style={{ color: "black" }} />
            </button>

            {/* Person Icon with Dropdown */}
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
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition font-bold"
                    onClick={() => setIsDropDown(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition font-bold"
                    onClick={() => setIsDropDown(false)}
                  >
                    Registration
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Icon - Desktop hide */}
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

        {/* Mobile Menu - Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {/* Mobile Menu Items */}
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/"
                  className="block hover:text-blue-600 transition font-bold"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block hover:text-blue-600 transition font-bold"
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block hover:text-blue-600 transition font-bold"
                  onClick={toggleMobileMenu}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block hover:text-blue-600 transition font-bold"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile Icons */}
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <button className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition">
                <SearchIcon style={{ color: "black" }} />
              </button>
              <button className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition">
                <ShoppingCartIcon style={{ color: "black" }} />
              </button>
              <button className="bg-white text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition">
                <PersonIcon style={{ color: "black" }} />
              </button>
            </div>

            {/* Mobile Login/Register Buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <Link
                to="/login"
                className="block px-4 py-2 text-center bg-black text-white rounded-lg hover:bg-gray-800 transition font-bold"
                onClick={toggleMobileMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-bold"
                onClick={toggleMobileMenu}
              >
                Registration
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
