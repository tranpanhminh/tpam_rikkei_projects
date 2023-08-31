import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import AboutStore from "../partials/ClientAboutStore/AboutStore";
function CLientAboutPage() {
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

export default CLientAboutPage;
