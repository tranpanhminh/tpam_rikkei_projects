import React from "react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function IsLogin() {
  const [hasToken, setHasToken] = useState(localStorage.getItem("token"));
  const location = useLocation();

  return hasToken ? <Navigate to="/" /> : <Outlet />;
}

export default IsLogin;
