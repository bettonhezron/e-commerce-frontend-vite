import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/HomePage";
import ProductListingPage from "./pages/products/ProductListingPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrderHistoryPage from "./pages/orders/OrderHistoryPage";
import UserProfilePage from "./pages/profile/UserProfilePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
