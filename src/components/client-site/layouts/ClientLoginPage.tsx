import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import LoginForm from "../partials/LoginSignUp/LoginForm";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";
function ClientLoginPage() {
  return (
    <>
      {/* Login Page */}
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        <ClientBanner />
        <LoginForm />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientLoginPage;
