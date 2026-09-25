import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuthenticated } from "../services/authService";

function ProtectedRoute() {
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;