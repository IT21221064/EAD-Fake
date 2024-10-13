import logo from "./logo.svg";
import "./App.css";
import { useAuthContext } from "./hooks/useAutContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProduct from "./components/pages/CreateProductPages/CreateProduct";
import VendorProducts from "./components/pages/VendorProductsPages/VendorProducts";

import VendorLogin from "./components/pages/VendorLoginPages/VendorLogin";
import AdminLogin from "./components/pages/AdminLoginPages/AdminLogin";
import CSRLogin from "./components/pages/CSRloginPages/CSRLogin";
import VendorProfile from "./components/pages/VendorProfilePages/VendorProfilePage";
import RegisterVendor from "./components/pages/RegisterVendorPages/RegisterVendor";
import AllUsers from "./components/pages/AllUsersPages/AllUsers";
import UpdateVendorProfile from "./components/pages/VendorUpdatePages/VendorUpdatePage";
import AllVendors from "./components/pages/AllVendors/AllVendors";
import UpdateProduct from "./components/pages/UpdateProduct/UpdateProduct";
import VendorOrderListPage from "./components/pages/VendorOrderPages/VendorOrderListPage";
import CSROrderList from "./components/pages/CSROrderPages/CSROrderList";
import CSRNotificationList from "./components/pages/CSRNotificationPages/CSRNotificationList";
import VendorNotifications from "./components/pages/VendorNotificationsPages/VendorNotifications";
import AdminProductPage from "./components/pages/AdminProductPages/AdminProductPage";
import WelcomePage from "./components/pages/WelcomePage/WelcomePage";

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/add-product" element={<CreateProduct />} />
        <Route path="/all-vendors" element={<AllVendors />} />
        <Route path="/vendor-products" element={<VendorProducts />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-products" element={<AdminProductPage />} />
        <Route path="/csr-login" element={<CSRLogin />} />
        <Route path="/vendor-profile" element={<VendorProfile />} />
        <Route path="/vendor-register" element={<RegisterVendor />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/vendor-update" element={<UpdateVendorProfile />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/vendor-orders" element={<VendorOrderListPage />} />
        <Route path="/vendor-notifications" element={<VendorNotifications />} />
        <Route path="/csr-orders" element={<CSROrderList />} />
        <Route path="/csr-notifications" element={<CSRNotificationList />} />
      </Routes>
    </Router>
  );
}

export default App;
