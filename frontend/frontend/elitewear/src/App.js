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
        <Route path="/add-product" element={user ? <CreateProduct />: <WelcomePage />} />
        <Route path="/all-vendors" element={user ? <AllVendors />: <WelcomePage />} />
        <Route path="/vendor-products" element={user ?<VendorProducts />: <WelcomePage />} />

        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-products" element={user ?<AdminProductPage />: <WelcomePage />} />
        <Route path="/csr-login" element={<CSRLogin />} />

        <Route path="/vendor-profile" element={user ?<VendorProfile />: <WelcomePage />} />
        <Route path="/vendor-register" element={user ?<RegisterVendor />: <WelcomePage />} />
        <Route path="/all-users" element={user ?<AllUsers />: <WelcomePage />} />
        <Route path="/vendor-update" element={user ?<UpdateVendorProfile />: <WelcomePage />} />

        <Route path="/update-product/:id" element={user ?<UpdateProduct />: <WelcomePage />} />
        <Route path="/vendor-orders" element={user ?<VendorOrderListPage />: <WelcomePage />} />
        <Route path="/vendor-notifications" element={user ?<VendorNotifications />: <WelcomePage />} />
        <Route path="/csr-orders" element={user ?<CSROrderList />: <WelcomePage />} />
        <Route path="/csr-notifications" element={user ?<CSRNotificationList />: <WelcomePage />} />

      </Routes>
    </Router>
  );
}

export default App;
