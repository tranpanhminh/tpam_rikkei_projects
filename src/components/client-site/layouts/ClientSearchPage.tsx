import React from "react";
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import SearchPage from "../../common/SearchPage/SearchPage";

function ClientSearchPage() {
  return (
    <>
      {/* Client Product Detail Page */}
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        <ClientBanner />
        <SearchPage />
      </div>
      <ClientFooter />
    </>
  );
}

export default ClientSearchPage;
