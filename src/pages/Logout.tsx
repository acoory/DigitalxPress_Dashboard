import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Logout() {
  const { setUser, setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    logout();
  });

  return <></>;
}
