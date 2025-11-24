import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SvgIcon from "@mui/material/SvgIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logo from "../assets/logo.jpg";

export default function Footer() {
  // Custom TikTok Icon component
  function TikTokIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </SvgIcon>
    );
  }
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <a
              href="https://web.facebook.com/100085929074407/photos/?_rdc=1&_rdr#"
              className="flex items-center mb-4 hover:opacity-80 transition"
            >
              <img
                src={logo}
                className="h-12 w-12 me-3 rounded-lg object-cover"
                alt="UH Brand Logo"
              />
              <span className="text-2xl font-bold">UH Brand</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your destination for premium quality clothing. Style meets comfort
              in every piece.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a
                href="https://web.facebook.com/100085929074407/photos/?_rdc=1&_rdr#"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-600 transition duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/uhbrand_/"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-pink-600 transition duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@uhbrand_?is_from_webapp=1&sender_device=pc"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-black transition duration-300"
                aria-label="Twitter"
              >
                <TikTokIcon className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0705919569"
                  className="text-gray-400 hover:text-white transition flex items-start group"
                >
                  <PhoneIcon
                    className="mr-3 mt-0.5 text-gray-500 group-hover:text-white transition"
                    fontSize="small"
                  />
                  <span>070 591 9569</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:uhbrand.97@gmail.com"
                  className="text-gray-400 hover:text-white transition flex items-start group"
                >
                  <EmailIcon
                    className="mr-3 mt-0.5 text-gray-500 group-hover:text-white transition"
                    fontSize="small"
                  />
                  <span>uhbrand.97@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=85/6 A Nalandarama Road patiragoda, Maharagama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition flex items-start group"
                >
                  <LocationOnIcon
                    className="mr-3 mt-0.5 text-gray-500 group-hover:text-white transition flex-shrink-0"
                    fontSize="small"
                  />
                  <span>
                    85/6 A Nalandarama Road patiragoda, Maharagama, Sri Lanka,
                    10280
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Legal
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Return Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm text-gray-400">
            © 2025{" "}
            <a href="/" className="hover:text-white transition font-semibold">
              UH Brand™
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤</span>
            <span>in Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
