import { Toaster } from "react-hot-toast";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Headers";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AdminPannel from "./pages/admin/AdminPannel";
import { LogIn } from "lucide-react";
import Login from "./pages/signPages/Login";
import Register from "./pages/signPages/Register";
import Product from "./pages/client/Product";
import ProductOverview from "./pages/client/ProductOverview";
import ProductCart from "./pages/client/ProductCart";
import CheckOut from "./pages/client/CheckOut";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgotPassword from "./pages/signPages/ForgetPassword";
import NotFoundPage from "./pages/NotFound";
import WhatsAppFloat from "./pages/WhatsappFloat";

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <div>
          <Toaster position="top-right" />
          <Header />
          <Routes path="/*">
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Product />} />
            <Route path="/product-overview/:id" element={<ProductOverview />} />
            <Route path="/cart" element={<ProductCart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/send-otp" element={<ForgotPassword />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/admin/*" element={<AdminPannel />} />
          </Routes>
          <Footer />
          <WhatsAppFloat />
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
