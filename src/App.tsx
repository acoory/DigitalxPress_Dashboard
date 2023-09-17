import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import Logout from "./pages/Logout";
import Reservation from "./pages/Reservation";
import Profil from "./pages/Profil";
import Horaires_Services from "./pages/Horaires_Services";
import Produits from "./pages/Produits";
import Horaire from "./pages/Horaire";
import Table from "./pages/Table";

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const location = useLocation();

  const checkUser = async () => {
    const admin = await localStorage.getItem("admin");

    if (admin) {
      setIsAuthenticated(true);
      setUser(JSON.parse(admin));
      if (location.pathname === "/") {
        navigate("/dashboard");
      }
      navigate(location.pathname);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Logout />
          </PrivateRoute>
        }
      />
      <Route
        path="/reservations"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Reservation />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Profil />
          </PrivateRoute>
        }
      />
      <Route
        path="/horaire"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Horaire/>
          </PrivateRoute>
        }
      />
       <Route
        path="/table"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Table/>
          </PrivateRoute>
        }
      />
      <Route
        path="/produits"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Produits />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default App;
