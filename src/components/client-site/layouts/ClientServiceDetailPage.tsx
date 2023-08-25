import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import ClientServiceDetail from "./../partials/ClientServices/ClientServiceDetail";
import ServiceCategoryBreadcrumb from "../partials/Breadcrumbs/ServiceCategoryBreadcrumb";

function ClientServiceDetailPage() {
  return (
    <>
      {/* Client Product Detail Page */}
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        <ClientBanner />
        <ServiceCategoryBreadcrumb />
        <ClientServiceDetail />
      </div>
      <ClientFooter />
    </>
  );
}

export default ClientServiceDetailPage;
