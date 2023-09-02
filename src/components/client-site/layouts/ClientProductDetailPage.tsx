import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ProductsCategoryBreadCrumb from "../partials/Breadcrumbs/ProductsCategoryBreadcrumb";
import ClientProductDetail from "../partials/ClientProductDetail/ClientProductDetail";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";

function ClientProductDetailPage() {
  return (
    <>
      {/* Client Product Detail Page */}
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        <ClientBanner />
        <ProductsCategoryBreadCrumb />
        <ClientProductDetail />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientProductDetailPage;
