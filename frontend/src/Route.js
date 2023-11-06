import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ auth, Component }) => {
  return auth ? <Component /> : <Navigate to="/login" />;
};
