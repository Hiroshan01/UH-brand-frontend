import React from "react";
import { Frown } from "lucide-react"; // Using Lucide-React for the icon
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="text-center">
        <Frown className="w-24 h-24 mx-auto mb-6 text-gray-400" />
        <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-300 mb-8">
          Page Not Found
        </p>
        <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
