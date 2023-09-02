import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import ClientListServices from "../partials/ClientServices/ClientListServices";
import ProductsServiceBreadCrumby from "../partials/Breadcrumbs/ServiceCategoryBreadcrumb";
import NotificationSale from "../partials/NotificationSale/Notification";

function ClientHomePage() {
  return (
    <>
      {/* Homepage */}
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        {" "}
        <ClientBanner />
        <ProductsServiceBreadCrumby />
        <ClientListServices />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientHomePage;
