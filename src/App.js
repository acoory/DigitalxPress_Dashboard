import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Dashboard from "./pages/Dashboard";
// require("dotenv").config();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default App;
