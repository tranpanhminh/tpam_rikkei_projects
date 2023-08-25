import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import AboutStore from "../partials/ClientAboutStore/AboutStore";
// import image from "../../../assets/images/about-store.jpg";

function ClientHomePage() {
  return (
    <>
      {/* Homepage */}
      <ClientHeaderPC />
      <div className="main">
        <ClientBanner />
        <AboutStore />
      </div>
      <ClientFooter />
    </>
  );
}

export default ClientHomePage;
