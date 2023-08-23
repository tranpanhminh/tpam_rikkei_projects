import React from "react";

// Import AdminPage
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHeader from "./components/admin-site/partials/AdminHeader/AdminHeader";
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
import Page404 from "./components/client-site/layouts/404";
import AdminUsersPage from "./components/admin-site/layouts/AdminUsersPage";
import AdminProductsPage from "./components/admin-site/layouts/AdminProductsPage";
import AdminServicesPage from "./components/admin-site/layouts/AdminServicesPage";
import AdminCouponPage from "./components/admin-site/layouts/AdminCouponPage";
import AdminBookingPage from "./components/admin-site/layouts/AdminBookingPage";
import AdminOrderPage from "./components/admin-site/layouts/AdminOrderPage";

function App() {
  return (
    <>
      {/* <ClientPage /> */}
      {/* <AdminPage /> */}
      {/* <ClientProfileHeader /> */}
      <BrowserRouter>
        <Routes>
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
            path="/admin/manage-coupons"
            element={<AdminCouponPage />}
          ></Route>
          <Route path="/user" element={<ClientProfilePage />}></Route>
          <Route path="/logout" element={<ClientHomePage />}></Route>
          <Route path="/user" element={<ClientProfilePage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
