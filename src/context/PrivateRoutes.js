import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./UserAuthContext";

export const PrivateRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Outlet /> : <Navigate to="Login" />;
};
