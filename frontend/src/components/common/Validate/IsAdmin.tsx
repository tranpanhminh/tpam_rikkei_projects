// import "crypto-browserify";
// import "stream-browserify";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { message, notification } from "antd";

function IsAdmin() {
  const token: any = localStorage.getItem("token") || "";
  // const location = useLocation();
  let data: any;
  if (token) {
    data = jwtDecode(token);
  } else {
    data = "";
  }
  if ((data && data?.role_id !== 1) || (data && data?.role_id !== 2) || !data) {
    return <Navigate to="/access-denied" />;
  }

  if (data?.role_id === 2 && data?.status_id === 2) {
    return <Navigate to="/access-denied" />;
  }

  return <Outlet />;
}

export default IsAdmin;
