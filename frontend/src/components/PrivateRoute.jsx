/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Determine authentication status
  const isAuthenticated =
    localStorage.getItem("token");

  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
