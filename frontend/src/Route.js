import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "./AppContext";

export const ProtectedRoute = ({ auth, Component }) => {
  const { isLoading } = useContext(AppContext);
  return isLoading || auth ? <Component /> : <Navigate to="/login" />;
};
