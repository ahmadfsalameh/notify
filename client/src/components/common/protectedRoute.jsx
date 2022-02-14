import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Home from "../../layouts/home";

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(UserContext);
  return token ? element : <Home />;
};

export default ProtectedRoute;
