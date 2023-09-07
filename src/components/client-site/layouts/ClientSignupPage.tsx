import React from "react";
// Import Client Partials
import ClientHeaderPC from "../partials/ClientHeader/ClientHeaderPC";
import ClientBanner from "../partials/ClientBanner/ClientBanner";
import SignupForm from "../partials/LoginSignUp/SignupForm";
import ClientFooter from "../partials/ClientFooter/ClientFooter";
import NotificationSale from "../partials/NotificationSale/Notification";

function ClientSignupPage() {
  document.title = "Sign Up | PetShop";

  return (
    <>
      {/* Signup Page */}
      <ClientHeaderPC />
      {/* <ClientHeaderMobile /> */}
      <div className="main">
        <ClientBanner />
        <SignupForm />
      </div>
      <ClientFooter />
      <NotificationSale />
    </>
  );
}

export default ClientSignupPage;
