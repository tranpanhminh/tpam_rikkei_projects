import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientAboutStore from "../partials/ClientAboutStore/ClientAboutStore";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
// import image from "../../../assets/images/about-store.jpg";

function ClientHomePage() {
  return (
    <>
      {/* Homepage */}
      <ClientHeaderPC />
      <div className="main">
        <ClientBanner />
        <ClientAboutStore />
      </div>
      <ClientFooter />
    </>
  );
}

export default ClientHomePage;
