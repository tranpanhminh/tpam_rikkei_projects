import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientCart from "../partials/ClientCart/ClientCart";
import ClientFooter from "../partials/ClientFooter/ClientFooter";

function ClientCartPage() {
  return (
    <>
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        <ClientBanner />
        <ClientCart />
      </div>
      <ClientFooter />
    </>
  );
}

export default ClientCartPage;
