// import "crypto-browserify";
// import "stream-browserify";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function IsCustomer() {
  const token: any = localStorage.getItem("token");
  const location = useLocation();

  const data: any = jwtDecode(token);
  if (data?.role_id !== 3) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default IsCustomer;
