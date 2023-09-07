import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientCart from "../partials/ClientCart/ClientCart";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";
function ClientCartPage() {
  document.title = "Cart | PetShop";

  return (
    <>
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        <ClientBanner />
        <ClientCart />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientCartPage;
