import React from "react";
import "./App.css";

// Import AdminPage
import AdminPage from "./components/admin-site/AdminPage";
import ClientPage from "./components/client-site/ClientPage";
import ClientProfileHeader from "./components/client-site/partials/ClientProfile/ClientProfileHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHeader from "./components/admin-site/partials/AdminHeader/AdminHeader";
import ClientCartPage from "./components/client-site/layouts/ClientCartPage";
import ClientHomePage from "./components/client-site/layouts/ClientHomePage";
import ClientLoginPage from "./components/client-site/layouts/ClientLoginPage";
import ClientProductCategoryPage from "./components/client-site/layouts/ClientProductCategoryPage";
import ClientProductDetailPage from "./components/client-site/layouts/ClientProductDetailPage";
import ClientProfilePage from "./components/client-site/layouts/ClientProfilePage";
import ClientSignupPage from "./components/client-site/layouts/ClientSignupPage";

function App() {
  return (
    <>
      {/* <ClientPage /> */}
      {/* <AdminPage /> */}
      {/* <ClientProfileHeader /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientHomePage />}></Route>
          {/* <Route path="/about" element={<ClientAboutPage />}></Route> */}
          <Route path="/cart" element={<ClientCartPage />}></Route>
          <Route path="/login" element={<ClientLoginPage />}></Route>
          <Route path="/signup" element={<ClientSignupPage />}></Route>
          <Route
            path="/products"
            element={<ClientProductCategoryPage />}
          ></Route>
          {/* <Route
            path="/services"
            element={<ClientServicesCategoryPage />}
          ></Route> */}
          <Route
            path="/products/:productId"
            element={<ClientProductDetailPage />}
          ></Route>
          <Route path="/admin" element={<AdminHeader />}></Route>
          <Route path="/user" element={<ClientProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
