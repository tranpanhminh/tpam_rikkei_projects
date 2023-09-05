import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";
import SpecialPage from "../partials/ClientSpecialPage/SpecialPage";

function ClientSpecialPage() {
  return (
    <>
      <ClientHeaderPC />
      <div className="main">
        <SpecialPage />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientSpecialPage;
