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

function App() {
  return (
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
          {/* 
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
    
          <Route path="/test-page" element={<TestPage />} /> */}
          <Route path="/*" element={<h1>404 Not Found!</h1>} />

          <Route path="/admin/*" element={<AdminPannel />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
