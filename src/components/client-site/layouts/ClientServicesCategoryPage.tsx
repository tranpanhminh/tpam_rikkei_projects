import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import ClientListServices from "../partials/ClientServices/ClientListServices";
import ProductsServiceBreadCrumb from "../partials/Breadcrumbs/ServiceCategoryBreadcrumb";
import NotificationSale from "../partials/NotificationSale/Notification";
import { Outlet } from "react-router-dom";

function ClientServicesCategoryPage() {
  return (
    // <>
    //   <ClientHeaderPC />
    //   <div className="main">
    //     <ClientBanner />
    //     <ProductsServiceBreadCrumb />
    //     <ClientListServices />
    //   </div>
    //   <ClientFooter />
    //   <NotificationSale />
    // </>

    <>
      <ClientHeaderPC />
      <div className="main">
        <ClientBanner />
        <ProductsServiceBreadCrumb />
        <Outlet />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientServicesCategoryPage;
