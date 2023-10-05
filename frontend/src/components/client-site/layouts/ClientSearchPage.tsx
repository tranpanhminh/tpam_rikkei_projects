import React from "react";
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import SearchPage from "../../common/SearchPage/SearchPage";
import NotificationSale from "../partials/NotificationSale/Notification";

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
      <NotificationSale />
    </>
  );
}

export default ClientSearchPage;
