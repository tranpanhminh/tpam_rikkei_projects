// import "crypto-browserify";
// import "stream-browserify";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function IsAdmin() {
  const token: any = localStorage.getItem("token");
  const location = useLocation();

  const data: any = jwtDecode(token);
  if (data?.role_id !== 1 && data?.role_id !== 2) {
    return <Navigate to="/access-denied" />;
  }

  return <Outlet />;
}

export default IsAdmin;
