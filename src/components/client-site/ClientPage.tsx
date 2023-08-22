import React from "react";
// Import Client Partials

// Import CSS
import "../client-site/ClientPage.css";
import "../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import ClientProductDetail from "./partials/ClientProductDetail/ClientProductDetail";
import ClientHomePage from "./layouts/ClientHomePage";

function ClientPage() {
  return (
    <>
      <ClientHomePage />
    </>
  );
}

export default ClientPage;
