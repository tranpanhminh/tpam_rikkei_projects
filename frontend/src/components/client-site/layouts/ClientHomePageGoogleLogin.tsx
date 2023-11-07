import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
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
import NotificationSale from "../partials/NotificationSale/Notification";
import { useParams } from "react-router-dom";

function ClientHomePageGoogleLogin() {
  document.title = "PetShop | Homepage";
  const { googlelogin } = useParams();
  if (googlelogin) {
    console.log(googlelogin, "GOOGLE LOGIN");
  }
  console.log(googlelogin, "GOOGLE LOGIN");

  return (
    <>
      <ClientHeaderPC />
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
        <ClientNewsletter />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientHomePageGoogleLogin;
