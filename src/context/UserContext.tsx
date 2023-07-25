import React, { useState, createContext } from "react";

export const UserContext = createContext({
  user: [],
  setUser: (_user: any) => {},
  isAuthenticated: false,
  setIsAuthenticated: (_isAuthenticated: boolean) => {},
});

export const UserConsumer = ({ children }: any) => {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
