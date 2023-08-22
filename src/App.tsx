import React from "react";
import "./App.css";

// Import AdminPage
import AdminPage from "./components/admin-site/AdminPage";
import ClientPage from "./components/client-site/ClientPage";
import ClientProfileHeader from "./components/client-site/partials/ClientProfile/ClientProfileHeader";

function App() {
  return (
    <>
      {/* <ClientPage /> */}
      <AdminPage />
      {/* <ClientProfileHeader /> */}
    </>
  );
}

export default App;
