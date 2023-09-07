import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ProductsCategoryBreadCrumb from "../partials/Breadcrumbs/ProductsCategoryBreadcrumb";
import ClientListProducts from "../partials/ClientFeaturedProducts/ClientListProducts";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";
import { Outlet } from "react-router-dom";
function ClientProductCategoryPage() {
  document.title = "Products Category | PetShop";

  return (
    // <>
    //   <ClientHeaderPC />
    //   <div className="main">
    //     <ClientBanner />
    //     <ProductsCategoryBreadCrumb />
    //     <ClientListProducts />
    //   </div>
    //   <ClientFooter />
    //   <NotificationSale />
    // </>

    <>
      <ClientHeaderPC />
      <div className="main">
        <ClientBanner />
        <ProductsCategoryBreadCrumb />
        <Outlet />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientProductCategoryPage;
