import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientHeaderMobile from "../partials/ClientHeader/ClientHeaderMobile";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientServices from "../partials/ClientServices/ClientServices";
import ClientPromotionGroup from "../partials/ClientPromotionGroup/ClientPromotionGroup";
import ClientFeaturedCategories from "../partials/ClientFeaturedCategories/ClientFeaturedCategories";
import ClientAboutStore from "../partials/ClientAboutStore/ClientAboutStore";
import ClientFeaturedProducts from "../partials/ClientFeaturedProducts/ClientFeaturedProducts";
import ClientSaleOff from "../partials/ClientSaleOff/ClientSaleOff";
import ClientReviews from "../partials/ClientReviews/ClientReviews";
import ClientNewsletter from "../partials/ClientNewsletter/ClientNewsletter";
import ClientFooter from "../partials/ClientFooter/ClientFooter";

function ClientHomePage() {
  return (
    <>
      {/* Homepage */}
      <ClientHeaderPC />
      <ClientHeaderMobile />
      <div className="main">
        {" "}
        <ClientBanner />
        <ClientPromotionGroup />
        <ClientFeaturedCategories />
        <ClientAboutStore />
        <ClientServices />
        <ClientFeaturedProducts />
        <ClientSaleOff />
        <ClientReviews />
        <ClientNewsletter />{" "}
      </div>
      <ClientFooter />
    </>
  );
}

export default ClientHomePage;
