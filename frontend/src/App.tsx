import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientCartPage from "./components/client-site/layouts/ClientCartPage";
import ClientHomePage from "./components/client-site/layouts/ClientHomePage";
import ClientLoginPage from "./components/client-site/layouts/ClientLoginPage";
import ClientProductCategoryPage from "./components/client-site/layouts/ClientProductCategoryPage";
import ClientSignupPage from "./components/client-site/layouts/ClientSignupPage";
import ClientAboutPage from "./components/client-site/layouts/ClientAboutPage";
import Page404 from "../src/components/common/NotFoundPage/404";
import ClientBlogCategory from "./components/client-site/layouts/ClientBlogCategory";
import BlogPost from "./components/client-site/partials/ClientPost/BlogPost/BlogPost";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";
import ClientSpecialPage from "./components/client-site/layouts/ClientSpecialPage";
import AdminMainPage from "./components/admin-site/layouts/AdminMainPage";
import ManageUsers from "./components/admin-site/partials/ManageUsers/ManageUsers";
import ManageProducts from "./components/admin-site/partials/ManageProducts/ManageProducts";
import ManageBooking from "./components/admin-site/partials/ManageBooking/ManageBooking";
import ManageOrders from "./components/admin-site/partials/ManageOrders/ManageOrders";
import ManageServices from "./components/admin-site/partials/ManageServices/ManageServices";
import ManageCoupons from "./components/admin-site/partials/ManageCoupon/ManageCoupons";
import ManagePosts from "./components/admin-site/partials/ManagePosts/ManagePosts";
import ManageComments from "./components/admin-site/partials/ManageComments/ManageComments";
import Report from "./components/admin-site/partials/Report/Report";
import ClientMainPage from "../src/components/client-site/layouts/ClientMainPage";
import ClientEditProfile from "./components/client-site/partials/ClientProfile/ClientMyProfile/ClientMyProfile";
import ClientOrder from "./components/client-site/partials/ClientProfile/ClientOrder/ClientOrder";
import ClientBooking from "./components/client-site/partials/ClientProfile/ClientBooking/ClientBooking";
import ClientCoupons from "./components/client-site/partials/ClientProfile/ClientCoupons/ClientCoupons";
import ClientListProducts from "./components/client-site/partials/ClientFeaturedProducts/ClientListProducts";
import ClientProductDetail from "./components/client-site/partials/ClientProductDetail/ClientProductDetail";
import ClientListServices from "./components/client-site/partials/ClientServices/ClientListServices";
import ClientServicesCategoryPage from "./components/client-site/layouts/ClientServicesCategoryPage";
import ClientServiceDetail from "./components/client-site/partials/ClientServices/ClientServiceDetail";
import BlogCategory from "./components/client-site/partials/ClientPost/BlogCategory/BlogCategory";
import ClientSearchPage from "./components/client-site/layouts/ClientSearchPage";
import AccessDenied from "./components/common/AccessDenied/AccessDenied";
import IsLogin from "./components/common/Validate/IsLogin";
import IsAdmin from "./components/common/Validate/IsAdmin";
import IsCustomer from "./components/common/Validate/IsCustomer";
import ManageVendors from "./components/admin-site/partials/ManageVendors/ManageVendors";
import ResetPasswordForm from "./components/client-site/partials/LoginSignUp/ResetPasswordForm";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { notification } from "antd";
import { getDataLogin } from "./api/users.api";
const socket = io(`${process.env.REACT_APP_BACK_END}`);

export function RoleNavigation() {
  return null; // Return null or an empty component
}

function App() {
  const [user, setUser] = useState<any>(null);
  const fetchUser = async () => {
    const result = await getDataLogin();
    return setUser(result);
  };

  useEffect(() => {
    fetchUser();

    if (user?.role_id === 1 || user?.role_id === 2) {
      socket.on("newOrder", (order) => {
        notification.success({
          message: `${order}`,
        });
      });
      return () => {
        socket.disconnect();
      };
    }
  }, []);

  return (
    <>
      {/* <ClientPage /> */}
      {/* <AdminPage /> */}
      {/* <ClientProfileHeader /> */}
      <BrowserRouter>
        <ScrollToTop />
        <RoleNavigation />
        <Routes>
          <Route path="/" element={<ClientHomePage />}></Route>
          <Route path="/about" element={<ClientAboutPage />}></Route>

          {/* Route của Admin */}
          <Route element={<IsAdmin />}>
            <Route path="/admin" element={<AdminMainPage />}>
              <Route index element={<ManageUsers />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-products" element={<ManageProducts />} />
              <Route path="manage-orders" element={<ManageOrders />} />
              <Route path="manage-services" element={<ManageServices />} />
              <Route path="manage-booking" element={<ManageBooking />} />
              <Route path="manage-vendors" element={<ManageVendors />} />
              {/* <Route
                path="manage-subscribers"
                element={<ManageSubscribers />}
              /> */}
              <Route path="manage-coupons" element={<ManageCoupons />} />
              <Route path="manage-posts" element={<ManagePosts />} />
              <Route path="manage-comments" element={<ManageComments />} />
              <Route path="report" element={<Report />} />
            </Route>
          </Route>

          {/* Route của User */}
          <Route element={<IsCustomer />}>
            <Route path="/user" element={<ClientMainPage />}>
              <Route index element={<ClientEditProfile />} />
              <Route path="my-profile" element={<ClientEditProfile />} />
              <Route path="my-orders" element={<ClientOrder />} />
              <Route path="my-booking" element={<ClientBooking />} />
              <Route path="my-coupons" element={<ClientCoupons />} />
            </Route>
            <Route path="/cart" element={<ClientCartPage />}></Route>
          </Route>

          {/* Route của chuyên mục Products */}
          <Route path="/products" element={<ClientProductCategoryPage />}>
            <Route index element={<ClientListProducts />} />
            <Route path=":productId" element={<ClientProductDetail />}></Route>
          </Route>

          {/* Route của chuyên mục Services */}
          <Route path="/services" element={<ClientServicesCategoryPage />}>
            <Route index element={<ClientListServices />} />
            <Route path=":serviceId" element={<ClientServiceDetail />}></Route>
          </Route>

          {/* Route của chuyên mục Blogs */}
          <Route path="/blogs" element={<ClientBlogCategory />}>
            <Route index element={<BlogCategory />} />
            <Route path=":postId" element={<BlogPost />}></Route>
          </Route>

          {/* Route của Search */}
          <Route
            path="/search/:searchTerm"
            element={<ClientSearchPage />}
          ></Route>

          {/* Route của Special Page */}
          <Route
            path="/special-page/:pageName"
            element={<ClientSpecialPage />}
          ></Route>

          {/* Route của Page 404 */}
          <Route path="*" element={<Page404 />}></Route>
          <Route path="access-denied" element={<AccessDenied />}></Route>
          <Route path="404" element={<Page404 />}></Route>

          {/* Kiểm tra User đã Login chưa */}
          <Route element={<IsLogin />}>
            <Route path="/login" element={<ClientLoginPage />}></Route>
            <Route path="/signup" element={<ClientSignupPage />}></Route>
            <Route
              path="reset-password"
              element={<ResetPasswordForm />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
