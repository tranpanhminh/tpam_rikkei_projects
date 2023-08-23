import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientHeaderMobile from "../partials/ClientHeader/ClientHeaderMobile";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ProductsCategoryBreadCrumb from "../partials/Breadcrumbs/ProductsCategoryBreadCrumb";
import ClientListProducts from "../partials/ClientFeaturedProducts/ClientListProducts";
import ClientFooter from "../partials/ClientFooter/ClientFooter";

function ClientProductCategoryPage() {
  return (
    <>
      {/* Product Category */}
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        <ClientBanner />
        <ProductsCategoryBreadCrumb />
        <ClientListProducts />
      </div>
      <ClientFooter />
    </>
  );
}

export default ClientProductCategoryPage;
