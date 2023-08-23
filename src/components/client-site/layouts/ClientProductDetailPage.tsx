import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientHeaderMobile from "../partials/ClientHeader/ClientHeaderMobile";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ProductsCategoryBreadCrumb from "../partials/Breadcrumbs/ProductsCategoryBreadCrumb";
import ClientProductDetail from "../partials/ClientProductDetail/ClientProductDetail";
import ClientFooter from "../partials/ClientFooter/ClientFooter";

function ClientCartPage() {
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
    </>
  );
}

export default ClientCartPage;
