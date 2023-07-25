import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (admin) {
      setIsAuthenticated(true);
      setUser(JSON.parse(admin));
      navigate("/dashboard");
    } else {
      setIsAuthenticated(false);
      setUser([]);
    }
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
