// import "crypto-browserify";
// import "stream-browserify";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function IsCustomer() {
  const token: any = localStorage.getItem("token");
  // const location = useLocation();
  let data: any;
  if (token) {
    data = jwtDecode(token);
  } else {
    data = "";
  }
  if ((data && data?.role_id !== 3) || !data) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default IsCustomer;
