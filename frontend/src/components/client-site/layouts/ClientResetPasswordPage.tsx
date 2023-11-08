import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";
import ResetPasswordForm from "../partials/LoginSignUp/ResetPasswordForm";

function ClientResetPassword() {
  document.title = "Reset Password | PetShop";

  return (
    <>
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        <ClientBanner />
        <ResetPasswordForm />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientResetPassword;
