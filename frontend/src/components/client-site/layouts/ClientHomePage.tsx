import React, { useEffect } from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientServices from "../partials/ClientServices/ClientFeaturedServices";
import ClientPromotionGroup from "../partials/ClientPromotionGroup/ClientPromotionGroup";
import ClientFeaturedCategories from "../partials/ClientFeaturedCategories/ClientFeaturedCategories";
import ClientAboutStore from "../partials/ClientAboutStore/ClientAboutStore";
import ClientFeaturedProducts from "../partials/ClientFeaturedProducts/ClientFeaturedProducts";
import ClientSaleOff from "../partials/ClientSaleOff/ClientSaleOff";
import ClientReviews from "../partials/ClientReviews/ClientReviews";
import ClientNewsletter from "../partials/ClientNewsletter/ClientNewsletter";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";
import { useNavigate, useSearchParams } from "react-router-dom";
import { googleCallback } from "../../../api/users.api";

function ClientHomePage() {
  document.title = "PetShop | Homepage";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (searchParams.get("googleAuth")) {
    const token: any = searchParams.get("googleAuth");
    localStorage.setItem("token", token?.toString());
    navigate("/");
  }
  // useEffect(() => {
  //   const handleGoogleRedirect = async () => {
  //     try {
  //       const response: any = await googleCallback();
  //       localStorage.setItem("token", response);
  //       console.log(response);
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Error handling Google redirect:", error);
  //     }
  //   };

  //   handleGoogleRedirect();
  // }, []);
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

export default ClientHomePage;
