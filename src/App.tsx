import React, { useEffect } from "react";

// Import AdminPage
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import ClientCartPage from "./components/client-site/layouts/ClientCartPage";
import ClientHomePage from "./components/client-site/layouts/ClientHomePage";
import ClientLoginPage from "./components/client-site/layouts/ClientLoginPage";
import ClientProductCategoryPage from "./components/client-site/layouts/ClientProductCategoryPage";
import ClientProductDetailPage from "./components/client-site/layouts/ClientProductDetailPage";
import ClientProfilePage from "./components/client-site/layouts/ClientProfilePage";
import ClientSignupPage from "./components/client-site/layouts/ClientSignupPage";
import ClientServicesPage from "./components/client-site/layouts/ClientServicesPage";
import ClientAboutPage from "./components/client-site/layouts/ClientAboutPage";
import ClientServiceDetailPage from "./components/client-site/layouts/ClientServiceDetailPage";
import Page404 from "../src/components/common/NotFoundPage/404";
import AdminUsersPage from "./components/admin-site/layouts/AdminUsersPage";
import AdminProductsPage from "./components/admin-site/layouts/AdminProductsPage";
import AdminServicesPage from "./components/admin-site/layouts/AdminServicesPage";
import AdminCouponPage from "./components/admin-site/layouts/AdminCouponPage";
import AdminBookingPage from "./components/admin-site/layouts/AdminBookingPage";
import AdminOrderPage from "./components/admin-site/layouts/AdminOrderPage";
import MyProfile from "./components/client-site/layouts/UserProfile/MyProfile";
import MyOrders from "./components/client-site/layouts/UserProfile/MyOrders";
import MyNewsletter from "./components/client-site/layouts/UserProfile/MyNewsletter";
import MyBooking from "./components/client-site/layouts/UserProfile/MyBooking";
import ClientSearchPage from "./components/client-site/layouts/ClientSearchPage";
import AdminSubscribersPage from "./components/admin-site/layouts/AdminSubscribersPage";

export function RoleNavigation() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      (getLoginData.role === "admin" && location.pathname.includes("/user")) ||
      (getLoginData.role === "admin" && location.pathname.includes("/cart")) ||
      (getLoginData.role === "admin" &&
        location.pathname.includes("/signup")) ||
      (getLoginData.role === "admin" && location.pathname.includes("/login"))
    ) {
      // Redirect to "/"
      navigate("/");
    }
    if (
      (getLoginData.role === "customer" &&
        location.pathname.includes("/admin")) ||
      (getLoginData.role === "customer" &&
        location.pathname.includes("/signup")) ||
      (getLoginData.role === "customer" && location.pathname.includes("/login"))
    ) {
      // Redirect to "/"
      navigate("/");
    }
    if (
      (!getLoginData && location.pathname.includes("/cart")) ||
      (!getLoginData && location.pathname.includes("/admin")) ||
      (!getLoginData && location.pathname.includes("/user"))
    ) {
      // Redirect to "/"
      navigate("/");
    }
  }, [getLoginData.role, location.pathname, navigate]);

  return null; // Return null or an empty component
}

function App() {
  return (
    <>
      {/* <ClientPage /> */}
      {/* <AdminPage /> */}
      {/* <ClientProfileHeader /> */}
      <BrowserRouter>
        <RoleNavigation />
        <Routes>
          {<Route></Route>}
          <Route path="/" element={<ClientHomePage />}></Route>
          <Route path="/about" element={<ClientAboutPage />}></Route>
          <Route path="/cart" element={<ClientCartPage />}></Route>
          <Route path="/login" element={<ClientLoginPage />}></Route>
          <Route path="/signup" element={<ClientSignupPage />}></Route>
          <Route
            path="/products"
            element={<ClientProductCategoryPage />}
          ></Route>
          <Route
            path="/products/:productId"
            element={<ClientProductDetailPage />}
          ></Route>
          <Route path="/services" element={<ClientServicesPage />}></Route>
          <Route
            path="/services/:serviceId"
            element={<ClientServiceDetailPage />}
          ></Route>
          <Route path="/admin/" element={<AdminUsersPage />}></Route>
          <Route
            path="/admin/manage-users"
            element={<AdminUsersPage />}
          ></Route>
          <Route
            path="/admin/manage-products"
            element={<AdminProductsPage />}
          ></Route>
          <Route
            path="/admin/manage-orders"
            element={<AdminOrderPage />}
          ></Route>
          <Route
            path="/admin/manage-services"
            element={<AdminServicesPage />}
          ></Route>{" "}
          <Route
            path="/admin/manage-booking"
            element={<AdminBookingPage />}
          ></Route>
          <Route
            path="/admin/manage-subscribers"
            element={<AdminSubscribersPage />}
          ></Route>
          <Route
            path="/admin/manage-coupons"
            element={<AdminCouponPage />}
          ></Route>
          <Route path="/user" element={<MyProfile />}></Route>
          <Route path="/user/my-profile" element={<MyProfile />}></Route>
          <Route path="/user/my-orders" element={<MyOrders />}></Route>
          <Route path="/user/my-booking" element={<MyBooking />}></Route>
          <Route path="/user/my-newsletter" element={<MyNewsletter />}></Route>
          <Route path="/user/my-orders" element={<AdminOrderPage />}></Route>
          <Route path="/user/my-booking" element={<AdminBookingPage />}></Route>
          <Route path="/user" element={<ClientProfilePage />}></Route>
          <Route path="/" element={<ClientHomePage />}></Route>
          <Route path="/search/:searchTerm" element={<ClientSearchPage />}></Route>
          <Route path="/user" element={<ClientProfilePage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
