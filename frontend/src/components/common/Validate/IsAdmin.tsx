import jwtDecode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

function IsAdmin() {
  const token: any = localStorage.getItem("token") || "";
  let data: any;
  if (token) {
    data = jwtDecode(token);
  } else {
    data = "";
  }

  if (!data) {
    return <Navigate to="/access-denied" />;
  }
  if (data && data.role_id === 3) {
    return <Navigate to="/access-denied" />;
  }

  if (data?.role_id === 2 && data?.status_id === 2) {
    return <Navigate to="/access-denied" />;
  }

  return <Outlet />;
}

export default IsAdmin;
